import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.6";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Auth context of the function
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      },
    );

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    // Get the request data
    const { contractId, action, signerEmail, signerName } = await req.json();

    if (!contractId) {
      return new Response(
        JSON.stringify({ error: "Contract ID is required" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    // Get the contract
    const { data: contract, error: contractError } = await supabaseClient
      .from("contracts")
      .select("*")
      .eq("id", contractId)
      .single();

    if (contractError) {
      return new Response(JSON.stringify({ error: "Contract not found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      });
    }

    // Check if the user has access to the contract
    const isOwner = contract.created_by === user.id;
    const { data: isMember, error: memberError } = await supabaseClient
      .from("organization_members")
      .select("*")
      .eq("organization_id", contract.organization_id)
      .eq("profile_id", user.id)
      .maybeSingle();

    const { data: isSigner, error: signerError } = await supabaseClient
      .from("contract_signers")
      .select("*")
      .eq("contract_id", contractId)
      .eq("profile_id", user.id)
      .maybeSingle();

    if (!isOwner && !isMember && !isSigner) {
      return new Response(JSON.stringify({ error: "Access denied" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 403,
      });
    }

    let result;
    switch (action) {
      case "send":
        if (!isOwner && !isMember) {
          return new Response(
            JSON.stringify({
              error:
                "Only contract owners or organization members can send contracts",
            }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 403,
            },
          );
        }

        // Update contract status
        await supabaseClient
          .from("contracts")
          .update({ status: "sent" })
          .eq("id", contractId);

        result = {
          message: "Contract sent successfully",
          status: "sent",
          contractId,
        };
        break;

      case "sign":
        if (!isSigner) {
          return new Response(
            JSON.stringify({
              error: "Only designated signers can sign this contract",
            }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 403,
            },
          );
        }

        // Update signer status
        await supabaseClient
          .from("contract_signers")
          .update({
            status: "signed",
            signed_at: new Date().toISOString(),
            signature_data: "Electronic signature",
          })
          .eq("contract_id", contractId)
          .eq("profile_id", user.id);

        // Check if all signers have signed
        const { data: signers } = await supabaseClient
          .from("contract_signers")
          .select("status")
          .eq("contract_id", contractId);

        const allSigned = signers.every((signer) => signer.status === "signed");

        if (allSigned) {
          // Update contract status
          await supabaseClient
            .from("contracts")
            .update({ status: "signed" })
            .eq("id", contractId);
        }

        result = {
          message: "Contract signed successfully",
          status: "signed",
          contractId,
          allSigned,
        };
        break;

      case "add_signer":
        if (!isOwner && !isMember) {
          return new Response(
            JSON.stringify({
              error:
                "Only contract owners or organization members can add signers",
            }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 403,
            },
          );
        }

        if (!signerEmail || !signerName) {
          return new Response(
            JSON.stringify({ error: "Signer email and name are required" }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 400,
            },
          );
        }

        // Check if the signer already exists
        const { data: existingSigner } = await supabaseClient
          .from("contract_signers")
          .select("*")
          .eq("contract_id", contractId)
          .eq("email", signerEmail)
          .maybeSingle();

        if (existingSigner) {
          return new Response(
            JSON.stringify({ error: "Signer already exists" }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 400,
            },
          );
        }

        // Find profile by email
        const { data: profile } = await supabaseClient
          .from("profiles")
          .select("id")
          .eq("email", signerEmail)
          .maybeSingle();

        // Add signer
        await supabaseClient.from("contract_signers").insert({
          contract_id: contractId,
          profile_id: profile?.id || null,
          email: signerEmail,
          name: signerName,
          status: "pending",
        });

        result = {
          message: "Signer added successfully",
          contractId,
          signerEmail,
          signerName,
        };
        break;

      default:
        return new Response(JSON.stringify({ error: "Invalid action" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        });
    }

    // Log the action
    await supabaseClient.from("audit_logs").insert({
      action: `contract_${action}`,
      entity_type: "contracts",
      entity_id: contractId,
      profile_id: user.id,
      organization_id: contract.organization_id,
      metadata: { result },
    });

    // Create notification for relevant users
    if (action === "send" || action === "sign") {
      const { data: contractSigners } = await supabaseClient
        .from("contract_signers")
        .select("profile_id, email, name")
        .eq("contract_id", contractId);

      for (const signer of contractSigners) {
        if (signer.profile_id) {
          await supabaseClient.from("notifications").insert({
            profile_id: signer.profile_id,
            title:
              action === "send"
                ? "Contract Ready for Signature"
                : "Contract Signed",
            message:
              action === "send"
                ? `Contract "${contract.title}" is ready for your signature`
                : `Contract "${contract.title}" has been signed by ${user.email}`,
            notification_type: "contract",
            action_url: `/contracts/${contractId}`,
          });
        }
      }
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
