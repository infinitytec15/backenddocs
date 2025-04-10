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
    const { documentId, action } = await req.json();

    if (!documentId) {
      return new Response(
        JSON.stringify({ error: "Document ID is required" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    // Get the document
    const { data: document, error: documentError } = await supabaseClient
      .from("documents")
      .select("*")
      .eq("id", documentId)
      .single();

    if (documentError) {
      return new Response(JSON.stringify({ error: "Document not found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      });
    }

    // Check if the user has access to the document
    const { data: access, error: accessError } = await supabaseClient.rpc(
      "check_document_access",
      { document_id: documentId, user_id: user.id },
    );

    if (accessError || !access) {
      return new Response(JSON.stringify({ error: "Access denied" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 403,
      });
    }

    let result;
    switch (action) {
      case "process":
        // Simulate document processing
        result = {
          message: "Document processing started",
          status: "processing",
          documentId,
          estimatedCompletionTime: new Date(Date.now() + 60000).toISOString(),
        };
        break;
      case "analyze":
        // Simulate document analysis
        result = {
          message: "Document analysis completed",
          status: "completed",
          documentId,
          analysis: {
            pageCount: Math.floor(Math.random() * 20) + 1,
            wordCount: Math.floor(Math.random() * 5000) + 100,
            entities: ["Person", "Organization", "Date", "Money"].slice(
              0,
              Math.floor(Math.random() * 4) + 1,
            ),
            sentiment: ["positive", "negative", "neutral"][
              Math.floor(Math.random() * 3)
            ],
          },
        };
        break;
      case "extract":
        // Simulate text extraction
        result = {
          message: "Text extraction completed",
          status: "completed",
          documentId,
          text: "This is a sample extracted text from the document. The actual content would be extracted from the document file.",
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
      action: `document_${action}`,
      entity_type: "documents",
      entity_id: documentId,
      profile_id: user.id,
      organization_id: document.organization_id,
      metadata: { result },
    });

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
