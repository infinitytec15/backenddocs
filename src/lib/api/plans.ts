import { supabase } from "../../../supabase/supabase";

export interface Plan {
  id: string;
  name: string;
  price_monthly: number;
  price_semiannual: number;
  price_annual: number;
  icon_type: string;
  color: string;
  features: string[];
  popular: boolean;
  active: boolean;
}

export async function getPlans(): Promise<Plan[]> {
  const { data, error } = await supabase
    .from("plans")
    .select("*")
    .order("price_monthly", { ascending: true });

  if (error) {
    console.error("Error fetching plans:", error);
    return [];
  }

  return data as Plan[];
}

// Admin functions
export async function createPlan(plan: Omit<Plan, "id">): Promise<Plan | null> {
  const { data, error } = await supabase
    .from("plans")
    .insert(plan)
    .select()
    .single();

  if (error) {
    console.error("Error creating plan:", error);
    return null;
  }

  return data as Plan;
}

export async function updatePlan(
  id: string,
  plan: Partial<Plan>,
): Promise<Plan | null> {
  const { data, error } = await supabase
    .from("plans")
    .update(plan)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating plan:", error);
    return null;
  }

  return data as Plan;
}

export async function deletePlan(id: string): Promise<boolean> {
  const { error } = await supabase.from("plans").delete().eq("id", id);

  if (error) {
    console.error("Error deleting plan:", error);
    return false;
  }

  return true;
}

export async function togglePlanActive(
  id: string,
  active: boolean,
): Promise<boolean> {
  const { error } = await supabase
    .from("plans")
    .update({ active })
    .eq("id", id);

  if (error) {
    console.error("Error toggling plan active status:", error);
    return false;
  }

  return true;
}

export async function togglePlanPopular(
  id: string,
  popular: boolean,
): Promise<boolean> {
  // First, set all plans to not popular if this one is being set to popular
  if (popular) {
    const { error: resetError } = await supabase
      .from("plans")
      .update({ popular: false })
      .neq("id", id);

    if (resetError) {
      console.error("Error resetting popular status:", resetError);
      return false;
    }
  }

  // Then set this plan's popular status
  const { error } = await supabase
    .from("plans")
    .update({ popular })
    .eq("id", id);

  if (error) {
    console.error("Error toggling plan popular status:", error);
    return false;
  }

  return true;
}
