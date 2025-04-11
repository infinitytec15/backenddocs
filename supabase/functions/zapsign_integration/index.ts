import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.6";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const ZAPSIGN_API_URL = "https://api.zapsign.com.br/api/v1";

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
    const { action, contractId, signers, zapsignToken } = await req.json();

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
    if (contract.user_id !== user.id) {
      return new Response(JSON.stringify({ error: "Access denied" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 403,
      });
    }

    let result;
    switch (action) {
      case "send_to_zapsign":
        // Get the latest contract version
        const { data: contractVersion, error: versionError } =
          await supabaseClient
            .from("contract_versions")
            .select("*")
            .eq("contract_id", contractId)
            .order("version", { ascending: false })
            .limit(1)
            .single();

        if (versionError) {
          return new Response(
            JSON.stringify({ error: "Contract version not found" }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 404,
            },
          );
        }

        // Get the signers
        const { data: contractSigners, error: signersError } =
          await supabaseClient
            .from("contract_signers")
            .select("*")
            .eq("contract_id", contractId);

        if (signersError) {
          return new Response(
            JSON.stringify({ error: "Failed to get signers" }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 500,
            },
          );
        }

        // Get the file URL from storage
        const { data: fileUrl } = await supabaseClient.storage
          .from("contracts")
          .createSignedUrl(contractVersion.file_path, 60);

        if (!fileUrl?.signedUrl) {
          return new Response(
            JSON.stringify({ error: "Failed to get file URL" }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 500,
            },
          );
        }

        // Send to ZapSign
        // This is a placeholder for the actual ZapSign API integration
        // You would need to implement the actual API call to ZapSign here
        const zapsignResponse = {
          id: "zap_" + Math.random().toString(36).substring(2, 15),
          status: "pending",
          url:
            "https://app.zapsign.com.br/doc/" +
            Math.random().toString(36).substring(2, 15),
        };

        // Update the contract with ZapSign info
        await supabaseClient
          .from("contracts")
          .update({
            zapsign_id: zapsignResponse.id,
            zapsign_status: zapsignResponse.status,
            zapsign_url: zapsignResponse.url,
            status: "sent",
          })
          .eq("id", contractId);

        result = {
          message: "Contract sent to ZapSign successfully",
          zapsign_id: zapsignResponse.id,
          zapsign_url: zapsignResponse.url,
          status: "sent",
        };
        break;

      case "check_status":
        // Check status with ZapSign
        // This is a placeholder for the actual ZapSign API integration
        const status = ["pending", "signed", "completed"][
          Math.floor(Math.random() * 3)
        ];

        // Update the contract status
        await supabaseClient
          .from("contracts")
          .update({
            zapsign_status: status,
            status: status === "completed" ? "signed" : status,
          })
          .eq("id", contractId);

        result = {
          message: "Contract status updated",
          status: status,
        };
        break;

      default:
        return new Response(JSON.stringify({ error: "Invalid action" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        });
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
