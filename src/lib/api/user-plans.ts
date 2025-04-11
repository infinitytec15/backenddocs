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
  startDate?: string,
  endDate?: string,
  status: string = "active",
  autoRenew: boolean = true,
): Promise<UserPlan | null> {
  const now = startDate || new Date().toISOString();

  // Calculate end date (30 days from now) if not provided
  let finalEndDate = endDate;
  if (!finalEndDate) {
    const endDateObj = new Date();
    endDateObj.setDate(endDateObj.getDate() + 30);
    finalEndDate = endDateObj.toISOString();
  }

  const { data, error } = await supabase
    .from("user_plans")
    .insert({
      user_id: userId,
      plan_id: planId,
      start_date: now,
      end_date: finalEndDate,
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
  try {
    // Get the user's signup date
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("signup_date")
      .eq("id", userId)
      .single();

    if (userError) {
      console.error("Error fetching user signup date:", userError);

      // If we can't find the user, create a record with current date
      if (userError.code === "PGRST116") {
        const { error: insertError } = await supabase.from("users").insert({
          id: userId,
          signup_date: new Date().toISOString(),
        });

        if (insertError) {
          console.error("Error creating user record:", insertError);
        } else {
          console.log("Created new user record with signup date");
          return false; // New trial period
        }
      }

      return false; // For now, assume trial is not over to allow access
    }

    if (!userData?.signup_date) {
      console.log("No signup date found, updating with current date");
      // Update the user with a signup date if it's missing
      await supabase
        .from("users")
        .update({ signup_date: new Date().toISOString() })
        .eq("id", userId);
      return false; // New trial period
    }

    // Calculate if 7 days have passed since signup
    const signupDate = new Date(userData.signup_date);
    const currentDate = new Date();
    const trialDurationMs = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    const isOver =
      currentDate.getTime() - signupDate.getTime() > trialDurationMs;

    console.log("Trial period calculation:", {
      signupDate,
      currentDate,
      daysPassed:
        (currentDate.getTime() - signupDate.getTime()) / (24 * 60 * 60 * 1000),
      isOver,
    });

    return isOver;
  } catch (error) {
    console.error("Unexpected error in isTrialPeriodOver:", error);
    return false; // For now, assume trial is not over to allow access
  }
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
