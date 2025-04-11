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
    const { action, contractId, fields } = await req.json();

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
      case "get_fields":
        // Get all fields for the contract
        const { data: existingFields, error: fieldsError } =
          await supabaseClient
            .from("contract_fields")
            .select("*")
            .eq("contract_id", contractId)
            .order("display_order", { ascending: true });

        if (fieldsError) {
          return new Response(
            JSON.stringify({ error: "Failed to get contract fields" }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 500,
            },
          );
        }

        result = {
          message: "Contract fields retrieved successfully",
          fields: existingFields,
        };
        break;

      case "add_field":
        if (!fields || !Array.isArray(fields) || fields.length === 0) {
          return new Response(
            JSON.stringify({ error: "Fields data is required" }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 400,
            },
          );
        }

        // Get the current highest display order
        const { data: maxOrderField, error: maxOrderError } =
          await supabaseClient
            .from("contract_fields")
            .select("display_order")
            .eq("contract_id", contractId)
            .order("display_order", { ascending: false })
            .limit(1)
            .single();

        const startOrder = maxOrderField ? maxOrderField.display_order + 1 : 1;

        // Prepare fields with contract_id and display_order
        const fieldsToInsert = fields.map((field, index) => ({
          ...field,
          contract_id: contractId,
          display_order: startOrder + index,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }));

        // Insert the fields
        const { data: insertedFields, error: insertError } =
          await supabaseClient
            .from("contract_fields")
            .insert(fieldsToInsert)
            .select();

        if (insertError) {
          return new Response(
            JSON.stringify({ error: "Failed to add contract fields" }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 500,
            },
          );
        }

        result = {
          message: "Contract fields added successfully",
          fields: insertedFields,
        };
        break;

      case "update_field":
        if (!fields || !Array.isArray(fields) || fields.length === 0) {
          return new Response(
            JSON.stringify({ error: "Fields data is required" }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 400,
            },
          );
        }

        // Update each field
        const updatePromises = fields.map(async (field) => {
          if (!field.id) {
            return { error: "Field ID is required for update" };
          }

          const { data, error } = await supabaseClient
            .from("contract_fields")
            .update({
              ...field,
              updated_at: new Date().toISOString(),
            })
            .eq("id", field.id)
            .eq("contract_id", contractId)
            .select();

          return { data, error };
        });

        const updateResults = await Promise.all(updatePromises);
        const updateErrors = updateResults
          .filter((result) => result.error)
          .map((result) => result.error);

        if (updateErrors.length > 0) {
          return new Response(
            JSON.stringify({
              error: "Failed to update some contract fields",
              details: updateErrors,
            }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 500,
            },
          );
        }

        result = {
          message: "Contract fields updated successfully",
          fields: updateResults.map((result) => result.data).flat(),
        };
        break;

      case "delete_field":
        if (!fields || !Array.isArray(fields) || fields.length === 0) {
          return new Response(
            JSON.stringify({ error: "Field IDs are required" }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 400,
            },
          );
        }

        // Delete the fields
        const fieldIds = fields.map((field) => field.id);
        const { error: deleteError } = await supabaseClient
          .from("contract_fields")
          .delete()
          .in("id", fieldIds)
          .eq("contract_id", contractId);

        if (deleteError) {
          return new Response(
            JSON.stringify({ error: "Failed to delete contract fields" }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 500,
            },
          );
        }

        result = {
          message: "Contract fields deleted successfully",
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
