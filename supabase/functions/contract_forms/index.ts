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
    const { action, contractId, formData, formId } = await req.json();

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
      case "create_form":
        // Validate form data
        if (!formData) {
          return new Response(
            JSON.stringify({ error: "Form data is required" }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 400,
            },
          );
        }

        if (!formData.form_name || formData.form_name.trim() === "") {
          return new Response(
            JSON.stringify({ error: "Form name is required" }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 400,
            },
          );
        }

        if (formData.form_name.length > 255) {
          return new Response(
            JSON.stringify({
              error: "Form name is too long (max 255 characters)",
            }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 400,
            },
          );
        }

        // Check if a form with this name already exists for this contract
        const { data: existingForm, error: existingFormError } =
          await supabaseClient
            .from("contract_forms")
            .select("id")
            .eq("contract_id", contractId)
            .eq("form_name", formData.form_name)
            .maybeSingle();

        if (existingForm) {
          return new Response(
            JSON.stringify({
              error: "A form with this name already exists for this contract",
            }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 400,
            },
          );
        }

        // Create a new form
        const { data: newForm, error: createError } = await supabaseClient
          .from("contract_forms")
          .insert({
            contract_id: contractId,
            form_name: formData.form_name,
            form_description: formData.form_description || null,
            is_template: formData.is_template || false,
            status: "draft",
            version: 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .select()
          .single();

        if (createError) {
          return new Response(
            JSON.stringify({
              error: "Failed to create contract form",
              details: createError.message,
            }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 500,
            },
          );
        }

        result = {
          message: "Contract form created successfully",
          form: newForm,
        };
        break;

      case "get_form":
        if (!formData || !formData.formId) {
          return new Response(
            JSON.stringify({ error: "Form ID is required" }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 400,
            },
          );
        }

        // Get the form
        const { data: form, error: getFormError } = await supabaseClient
          .from("contract_forms")
          .select("*")
          .eq("contract_id", contractId)
          .eq("id", formData.formId)
          .single();

        if (getFormError) {
          return new Response(
            JSON.stringify({ error: "Contract form not found" }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 404,
            },
          );
        }

        // Get the form fields
        const { data: formFields, error: getFieldsError } = await supabaseClient
          .from("contract_fields")
          .select("*")
          .eq("contract_id", contractId)
          .order("display_order", { ascending: true });

        if (getFieldsError) {
          return new Response(
            JSON.stringify({ error: "Failed to get form fields" }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 500,
            },
          );
        }

        result = {
          message: "Contract form retrieved successfully",
          form,
          fields: formFields,
        };
        break;

      case "update_form":
        if (!formData || !formData.formId) {
          return new Response(
            JSON.stringify({ error: "Form ID is required" }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 400,
            },
          );
        }

        if (!formData.form_name || formData.form_name.trim() === "") {
          return new Response(
            JSON.stringify({ error: "Form name is required" }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 400,
            },
          );
        }

        if (formData.form_name.length > 255) {
          return new Response(
            JSON.stringify({
              error: "Form name is too long (max 255 characters)",
            }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 400,
            },
          );
        }

        // Check if the form exists
        const { data: formToUpdate, error: formExistsError } =
          await supabaseClient
            .from("contract_forms")
            .select("*")
            .eq("id", formData.formId)
            .eq("contract_id", contractId)
            .single();

        if (formExistsError) {
          return new Response(
            JSON.stringify({
              error: "Form not found or does not belong to this contract",
            }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 404,
            },
          );
        }

        // Check if another form with the same name exists (excluding this one)
        const { data: duplicateForm, error: duplicateFormError } =
          await supabaseClient
            .from("contract_forms")
            .select("id")
            .eq("contract_id", contractId)
            .eq("form_name", formData.form_name)
            .neq("id", formData.formId)
            .maybeSingle();

        if (duplicateForm) {
          return new Response(
            JSON.stringify({
              error:
                "Another form with this name already exists for this contract",
            }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 400,
            },
          );
        }

        // Update the form
        const { data: updatedForm, error: updateError } = await supabaseClient
          .from("contract_forms")
          .update({
            form_name: formData.form_name,
            form_description: formData.form_description,
            is_template: formData.is_template,
            status: formData.status,
            updated_at: new Date().toISOString(),
          })
          .eq("id", formData.formId)
          .eq("contract_id", contractId)
          .select()
          .single();

        if (updateError) {
          return new Response(
            JSON.stringify({
              error: "Failed to update contract form",
              details: updateError.message,
            }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 500,
            },
          );
        }

        result = {
          message: "Contract form updated successfully",
          form: updatedForm,
        };
        break;

      case "delete_form":
        if (!formId) {
          return new Response(
            JSON.stringify({ error: "Form ID is required" }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 400,
            },
          );
        }

        // Check if the form exists and belongs to the contract
        const { data: existingFormToDelete, error: formExistsDeleteError } =
          await supabaseClient
            .from("contract_forms")
            .select("*")
            .eq("id", formId)
            .eq("contract_id", contractId)
            .single();

        if (formExistsDeleteError) {
          return new Response(
            JSON.stringify({
              error: "Form not found or does not belong to this contract",
            }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 404,
            },
          );
        }

        // Delete the form
        const { error: deleteError } = await supabaseClient
          .from("contract_forms")
          .delete()
          .eq("id", formId)
          .eq("contract_id", contractId);

        if (deleteError) {
          return new Response(
            JSON.stringify({
              error: "Failed to delete contract form",
              details: deleteError.message,
            }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 500,
            },
          );
        }

        result = {
          message: "Contract form deleted successfully",
          formId,
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
