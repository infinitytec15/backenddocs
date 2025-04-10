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
    const { action, referralId, planId } = await req.json();

    // Validate required parameters
    if (!action) {
      return new Response(
        JSON.stringify({
          error: "Missing parameters",
          message: "Action parameter is required",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    // Handle different actions
    switch (action) {
      case "calculate_pending_commissions":
        return await calculatePendingCommissions(supabaseClient, corsHeaders);
      case "record_commission":
        if (!referralId || !planId) {
          return new Response(
            JSON.stringify({
              error: "Missing parameters",
              message:
                "referralId and planId are required for record_commission action",
            }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 400,
            },
          );
        }
        return await recordCommission(
          supabaseClient,
          corsHeaders,
          referralId,
          planId,
        );
      default:
        return new Response(
          JSON.stringify({
            error: "Invalid action",
            message: `Action '${action}' is not supported`,
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
          },
        );
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});

async function calculatePendingCommissions(supabaseClient, corsHeaders) {
  // Get all active users who were referred
  const { data: referredUsers, error: referredUsersError } =
    await supabaseClient
      .from("users")
      .select("id, referred_by, subscription_plan_id, subscription_status")
      .not("referred_by", "is", null)
      .eq("subscription_status", "active");

  if (referredUsersError) {
    return new Response(
      JSON.stringify({
        error: "Database error",
        message: referredUsersError.message,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }

  // Get all plans to calculate commission rates
  const { data: plans, error: plansError } = await supabaseClient
    .from("plans")
    .select("id, price, name");

  if (plansError) {
    return new Response(
      JSON.stringify({
        error: "Database error",
        message: plansError.message,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }

  // Process each referred user
  const commissions = [];
  const now = new Date().toISOString();
  const currentMonth = now.substring(0, 7); // YYYY-MM format

  for (const user of referredUsers) {
    // Skip if no plan or referrer
    if (!user.subscription_plan_id || !user.referred_by) continue;

    // Find the plan
    const plan = plans.find((p) => p.id === user.subscription_plan_id);
    if (!plan) continue;

    // Calculate commission rate based on plan
    let commissionRate = 0.2; // Default 20%
    if (plan.name.toLowerCase().includes("profissional")) {
      commissionRate = 0.25; // 25% for Professional plan
    } else if (plan.name.toLowerCase().includes("empresarial")) {
      commissionRate = 0.3; // 30% for Enterprise plan
    }

    // Calculate commission amount
    const commissionAmount = plan.price * commissionRate;

    // Check if commission for this user and month already exists
    const { data: existingCommission, error: existingCommissionError } =
      await supabaseClient
        .from("affiliate_transactions")
        .select("id")
        .eq("referred_user_id", user.id)
        .eq("type", "commission")
        .like("created_at", `${currentMonth}%`)
        .single();

    if (
      existingCommissionError &&
      !existingCommissionError.message.includes("No rows found")
    ) {
      console.error(
        "Error checking existing commission:",
        existingCommissionError,
      );
      continue;
    }

    // Skip if commission already recorded for this month
    if (existingCommission) continue;

    // Get affiliate record
    const { data: affiliate, error: affiliateError } = await supabaseClient
      .from("affiliates")
      .select("id, user_id")
      .eq("user_id", user.referred_by)
      .single();

    if (affiliateError) {
      console.error("Error getting affiliate:", affiliateError);
      continue;
    }

    // Prepare commission record
    commissions.push({
      affiliate_id: affiliate.id,
      referred_user_id: user.id,
      amount: commissionAmount,
      type: "commission",
      status: "completed",
      description: `Comissão mensal - ${plan.name}`,
      created_at: now,
    });
  }

  // Insert commissions if any
  if (commissions.length > 0) {
    const { error: insertError } = await supabaseClient
      .from("affiliate_transactions")
      .insert(commissions);

    if (insertError) {
      return new Response(
        JSON.stringify({
          error: "Database error",
          message: insertError.message,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        },
      );
    }

    // Update affiliate balances
    for (const commission of commissions) {
      const { error: updateError } = await supabaseClient.rpc(
        "update_affiliate_balance",
        {
          p_affiliate_id: commission.affiliate_id,
          p_amount: commission.amount,
        },
      );

      if (updateError) {
        console.error("Error updating affiliate balance:", updateError);
      }
    }
  }

  return new Response(
    JSON.stringify({
      success: true,
      message: `Processed ${commissions.length} commissions`,
      commissions,
    }),
    {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    },
  );
}

async function recordCommission(
  supabaseClient,
  corsHeaders,
  referralId,
  planId,
) {
  // Get the referred user
  const { data: referredUser, error: referredUserError } = await supabaseClient
    .from("users")
    .select("id, referred_by")
    .eq("id", referralId)
    .single();

  if (referredUserError) {
    return new Response(
      JSON.stringify({
        error: "Database error",
        message: referredUserError.message,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }

  // Check if user was referred
  if (!referredUser.referred_by) {
    return new Response(
      JSON.stringify({
        error: "No referrer",
        message: "User was not referred by an affiliate",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      },
    );
  }

  // Get the plan
  const { data: plan, error: planError } = await supabaseClient
    .from("plans")
    .select("id, price, name")
    .eq("id", planId)
    .single();

  if (planError) {
    return new Response(
      JSON.stringify({
        error: "Database error",
        message: planError.message,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }

  // Calculate commission rate based on plan
  let commissionRate = 0.2; // Default 20%
  if (plan.name.toLowerCase().includes("profissional")) {
    commissionRate = 0.25; // 25% for Professional plan
  } else if (plan.name.toLowerCase().includes("empresarial")) {
    commissionRate = 0.3; // 30% for Enterprise plan
  }

  // Calculate commission amount
  const commissionAmount = plan.price * commissionRate;

  // Get affiliate record
  const { data: affiliate, error: affiliateError } = await supabaseClient
    .from("affiliates")
    .select("id, user_id")
    .eq("user_id", referredUser.referred_by)
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

  // Record the commission
  const { data: transaction, error: transactionError } = await supabaseClient
    .from("affiliate_transactions")
    .insert({
      affiliate_id: affiliate.id,
      referred_user_id: referredUser.id,
      amount: commissionAmount,
      type: "commission",
      status: "completed",
      description: `Comissão - ${plan.name}`,
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

  // Update affiliate balance
  const { error: updateError } = await supabaseClient.rpc(
    "update_affiliate_balance",
    {
      p_affiliate_id: affiliate.id,
      p_amount: commissionAmount,
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
      message: "Commission recorded successfully",
      transaction,
    }),
    {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    },
  );
}
