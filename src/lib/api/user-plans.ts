import { supabase } from "../../../supabase/supabase";

export interface UserPlan {
  id: string;
  user_id: string;
  plan_id: string;
  start_date: string;
  end_date: string | null;
  status: string;
  auto_renew: boolean;
  created_at: string | null;
  updated_at: string | null;
}

export interface User {
  id: string;
  signup_date: string;
  // other user fields
}

export async function createUserPlan(
  userId: string,
  planId: string,
  status: string = "active",
  autoRenew: boolean = true,
): Promise<UserPlan | null> {
  const startDate = new Date().toISOString();

  // Calculate end date (30 days from now)
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 30);

  const { data, error } = await supabase
    .from("user_plans")
    .insert({
      user_id: userId,
      plan_id: planId,
      start_date: startDate,
      end_date: endDate.toISOString(),
      status: status,
      auto_renew: autoRenew,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating user plan:", error);
    return null;
  }

  return data as UserPlan;
}

export async function getDefaultPlan(): Promise<string | null> {
  // Get the first active plan with the lowest price
  const { data, error } = await supabase
    .from("plans")
    .select("id")
    .eq("is_active", true)
    .order("price", { ascending: true })
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching default plan:", error);
    return null;
  }

  return data.id;
}

export async function getUserPlans(userId: string): Promise<UserPlan[]> {
  const { data, error } = await supabase
    .from("user_plans")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching user plans:", error);
    return [];
  }

  return data as UserPlan[];
}

export async function cancelUserPlan(userPlanId: string): Promise<boolean> {
  const { error } = await supabase
    .from("user_plans")
    .update({ status: "cancelled", auto_renew: false })
    .eq("id", userPlanId);

  if (error) {
    console.error("Error cancelling user plan:", error);
    return false;
  }

  return true;
}

export async function isTrialPeriodOver(userId: string): Promise<boolean> {
  // Get the user's signup date
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("signup_date")
    .eq("id", userId)
    .single();

  if (userError || !userData?.signup_date) {
    console.error("Error fetching user signup date:", userError);
    return true; // If we can't determine, assume trial is over to be safe
  }

  // Calculate if 7 days have passed since signup
  const signupDate = new Date(userData.signup_date);
  const currentDate = new Date();
  const trialDurationMs = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

  return currentDate.getTime() - signupDate.getTime() > trialDurationMs;
}

export async function hasActiveSubscription(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("user_plans")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "active")
    .maybeSingle();

  if (error) {
    console.error("Error checking subscription status:", error);
    return false;
  }

  return !!data; // Return true if there's an active plan
}
