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

    // Get users who were referred by this affiliate
    const { data, error } = await supabase
      .from("referrals")
      .select(
        `
        id,
        status,
        created_at,
        referred_user:referred_user_id(id, email, full_name),
        plan:plan_id(id, name)
      `,
      )
      .eq("referrer_id", userData.user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Format the data for the frontend
    return data.map((referral) => ({
      id: referral.id,
      email: referral.referred_user?.email || "Unknown",
      full_name: referral.referred_user?.full_name || "Unknown User",
      created_at: referral.created_at,
      plan: referral.plan?.name || null,
      status: referral.status || "pending",
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

    // Get transactions for this user
    const { data, error } = await supabase
      .from("affiliate_transactions")
      .select("*")
      .eq("user_id", userData.user.id)
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
    const { data, error } = await supabase.functions.invoke(
      "register_affiliate",
      {
        body: {}, // The function will use the authenticated user from the request
      },
    );

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

/**
 * Request a withdrawal of affiliate earnings
 */
export async function requestWithdrawal(
  amount: number,
  invoiceFileId: string,
): Promise<{
  success: boolean;
  message: string;
  data?: any;
}> {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      return { success: false, message: "User not authenticated", data: null };
    }

    // Call the RPC function to update the affiliate balance and create a withdrawal transaction
    const { data, error } = await supabase.rpc(
      "update_affiliate_balance_withdrawal",
      {
        p_user_id: userData.user.id,
        p_amount: amount,
        p_invoice_file_id: invoiceFileId,
      },
    );

    if (error) throw error;

    return {
      success: true,
      message: "Withdrawal request submitted successfully",
      data,
    };
  } catch (error) {
    console.error("Error requesting withdrawal:", error);
    return {
      success: false,
      message: error.message || "Error requesting withdrawal",
    };
  }
}

/**
 * Upload an invoice file for withdrawal
 */
export async function uploadInvoiceFile(
  file: File,
  onProgress?: (progress: number) => void,
): Promise<{
  success: boolean;
  message: string;
  fileId?: string;
}> {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      return { success: false, message: "User not authenticated" };
    }

    const fileName = `${userData.user.id}/${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("invoices")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
        onUploadProgress: (progress) => {
          if (onProgress) {
            const percent = (progress.loaded / progress.total) * 100;
            onProgress(percent);
          }
        },
      });

    if (error) throw error;

    return {
      success: true,
      message: "File uploaded successfully",
      fileId: data.path,
    };
  } catch (error) {
    console.error("Error uploading invoice file:", error);
    return {
      success: false,
      message: error.message || "Error uploading invoice file",
    };
  }
}
