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

    // Return the generated code
    return new Response(JSON.stringify({ referralCode }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
