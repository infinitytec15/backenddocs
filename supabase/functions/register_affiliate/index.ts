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

    // Check if user is already an affiliate
    const { data: existingAffiliate } = await supabaseClient
      .from("affiliates")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (existingAffiliate) {
      return new Response(
        JSON.stringify({
          error: "Already registered",
          message: "You are already registered as an affiliate",
          affiliate: existingAffiliate,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    // Generate a unique referral code
    const generateCode = async (): Promise<string> => {
      // Generate a random code based on user id and timestamp
      const baseCode = user.id.substring(0, 6).toUpperCase();
      const randomPart = Math.random()
        .toString(36)
        .substring(2, 6)
        .toUpperCase();
      const code = `${baseCode}-${randomPart}`;

      // Check if the code already exists
      const { data: existingCode } = await supabaseClient
        .from("affiliates")
        .select("referral_code")
        .eq("referral_code", code)
        .single();

      // If code exists, generate a new one recursively
      if (existingCode) {
        return generateCode();
      }

      return code;
    };

    const referralCode = await generateCode();

    // Get user details
    const { data: userData, error: userDataError } = await supabaseClient
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (userDataError) {
      return new Response(
        JSON.stringify({
          error: "User data error",
          message: userDataError.message,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    // Create affiliate record
    const { data: affiliate, error: affiliateError } = await supabaseClient
      .from("affiliates")
      .insert({
        user_id: user.id,
        referral_code: referralCode,
        status: "active",
        balance: 0,
        total_earned: 0,
        total_paid: 0,
        payment_method: null,
        payment_details: null,
      })
      .select()
      .single();

    if (affiliateError) {
      return new Response(
        JSON.stringify({
          error: "Affiliate creation error",
          message: affiliateError.message,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    // Update user record to mark as affiliate
    const { error: updateUserError } = await supabaseClient
      .from("users")
      .update({ is_affiliate: true })
      .eq("id", user.id);

    if (updateUserError) {
      // Rollback affiliate creation if user update fails
      await supabaseClient.from("affiliates").delete().eq("id", affiliate.id);

      return new Response(
        JSON.stringify({
          error: "User update error",
          message: updateUserError.message,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Successfully registered as an affiliate",
        affiliate,
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
