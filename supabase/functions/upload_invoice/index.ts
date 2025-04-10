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
    // Create a Supabase client with the Auth context of the logged in user
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      },
    );

    // Get the user from the auth context
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      return new Response(
        JSON.stringify({
          error: "Unauthorized",
          message: userError?.message || "User not authenticated",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 401,
        },
      );
    }

    // Get request parameters
    const { amount, invoiceNumber, invoiceUrl, fileName } = await req.json();

    // Validate required parameters
    if (!amount || !invoiceNumber || !invoiceUrl) {
      return new Response(
        JSON.stringify({
          error: "Missing parameters",
          message: "amount, invoiceNumber, and invoiceUrl are required",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    // Get affiliate data
    const { data: affiliateData, error: affiliateError } = await supabaseClient
      .from("affiliates")
      .select("id, balance")
      .eq("user_id", user.id)
      .single();

    if (affiliateError) {
      return new Response(
        JSON.stringify({
          error: "Database error",
          message: affiliateError.message,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        },
      );
    }

    // Check if affiliate has enough balance
    if (affiliateData.balance < amount) {
      return new Response(
        JSON.stringify({
          error: "Insufficient balance",
          message: "Your balance is insufficient for this withdrawal",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    // Create withdrawal transaction
    const { data: transaction, error: transactionError } = await supabaseClient
      .from("affiliate_transactions")
      .insert({
        affiliate_id: affiliateData.id,
        amount: amount,
        type: "withdrawal",
        status: "pending",
        description: `Solicitação de saque - NF ${invoiceNumber}`,
        metadata: {
          invoice_number: invoiceNumber,
          invoice_url: invoiceUrl,
          file_name: fileName,
        },
      })
      .select()
      .single();

    if (transactionError) {
      return new Response(
        JSON.stringify({
          error: "Database error",
          message: transactionError.message,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        },
      );
    }

    // Update affiliate balance (reserve the amount)
    const { error: updateError } = await supabaseClient.rpc(
      "update_affiliate_balance_withdrawal",
      {
        p_affiliate_id: affiliateData.id,
        p_amount: amount,
      },
    );

    if (updateError) {
      return new Response(
        JSON.stringify({
          error: "Database error",
          message: updateError.message,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Withdrawal request submitted successfully",
        transaction,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
