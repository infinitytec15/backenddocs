import { supabase } from "../../../supabase/supabase";

export interface AffiliateData {
  id: string;
  user_id: string;
  referral_code: string;
  status: string;
  balance: number;
  total_earned: number;
  total_paid: number;
  payment_method: string | null;
  payment_details: any;
  created_at: string;
}

export interface ReferralData {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  plan: string | null;
  status: string;
}

export interface TransactionData {
  id: string;
  amount: number;
  type: string;
  status: string;
  created_at: string;
  description: string;
}

/**
 * Fetches affiliate data for the current user
 */
export async function getAffiliateData(): Promise<AffiliateData | null> {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return null;

    const { data, error } = await supabase
      .from("affiliates")
      .select("*")
      .eq("user_id", userData.user.id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching affiliate data:", error);
    return null;
  }
}

/**
 * Fetches referrals for the current affiliate
 */
export async function getAffiliateReferrals(): Promise<ReferralData[]> {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return [];

    // Get affiliate data first
    const { data: affiliateData, error: affiliateError } = await supabase
      .from("affiliates")
      .select("id, referral_code")
      .eq("user_id", userData.user.id)
      .single();

    if (affiliateError) throw affiliateError;

    // Get users who were referred by this affiliate
    const { data, error } = await supabase
      .from("users")
      .select(
        "id, email, full_name, created_at, subscription_plan_id, subscription_status",
      )
      .eq("referred_by", userData.user.id);

    if (error) throw error;

    // Get plan names
    const planIds = data
      .filter((user) => user.subscription_plan_id)
      .map((user) => user.subscription_plan_id);

    let planMap = {};
    if (planIds.length > 0) {
      const { data: plans, error: plansError } = await supabase
        .from("plans")
        .select("id, name")
        .in("id", planIds);

      if (!plansError && plans) {
        planMap = plans.reduce((acc, plan) => {
          acc[plan.id] = plan.name;
          return acc;
        }, {});
      }
    }

    // Format the data
    return data.map((user) => ({
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      created_at: user.created_at,
      plan: user.subscription_plan_id
        ? planMap[user.subscription_plan_id]
        : null,
      status: user.subscription_status || "pending",
    }));
  } catch (error) {
    console.error("Error fetching affiliate referrals:", error);
    return [];
  }
}

/**
 * Fetches transactions for the current affiliate
 */
export async function getAffiliateTransactions(): Promise<TransactionData[]> {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return [];

    // Get affiliate data first
    const { data: affiliateData, error: affiliateError } = await supabase
      .from("affiliates")
      .select("id")
      .eq("user_id", userData.user.id)
      .single();

    if (affiliateError) throw affiliateError;

    // Get transactions for this affiliate
    const { data, error } = await supabase
      .from("affiliate_transactions")
      .select("*")
      .eq("affiliate_id", affiliateData.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error fetching affiliate transactions:", error);
    return [];
  }
}

/**
 * Registers the current user as an affiliate
 */
export async function registerAsAffiliate(): Promise<{
  success: boolean;
  message: string;
  data?: any;
}> {
  try {
    const { data, error } =
      await supabase.functions.invoke("register_affiliate");

    if (error) throw error;

    return {
      success: true,
      message: "Successfully registered as an affiliate",
      data,
    };
  } catch (error) {
    console.error("Error registering as affiliate:", error);
    return {
      success: false,
      message: error.message || "Error registering as affiliate",
    };
  }
}

/**
 * Calculates commissions for all pending referrals
 * This would typically be called by an admin or a scheduled function
 */
export async function calculateCommissions(): Promise<{
  success: boolean;
  message: string;
  data?: any;
}> {
  try {
    const { data, error } = await supabase.functions.invoke(
      "calculate_commissions",
      {
        body: { action: "calculate_pending_commissions" },
      },
    );

    if (error) throw error;

    return {
      success: true,
      message: "Successfully calculated commissions",
      data,
    };
  } catch (error) {
    console.error("Error calculating commissions:", error);
    return {
      success: false,
      message: error.message || "Error calculating commissions",
    };
  }
}

/**
 * Records a commission for a specific referral and plan
 */
export async function recordCommission(
  referralId: string,
  planId: string,
): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    const { data, error } = await supabase.functions.invoke(
      "calculate_commissions",
      {
        body: {
          action: "record_commission",
          referralId,
          planId,
        },
      },
    );

    if (error) throw error;

    return {
      success: true,
      message: "Successfully recorded commission",
      data,
    };
  } catch (error) {
    console.error("Error recording commission:", error);
    return {
      success: false,
      message: error.message || "Error recording commission",
    };
  }
}
