import { supabase } from "../../../supabase/supabase";

/**
 * Verifica se o usuário atingiu o limite de documentos do seu plano atual
 */
export async function checkDocumentLimit(): Promise<{
  canUpload: boolean;
  currentCount: number;
  limit: number;
}> {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      return { canUpload: false, currentCount: 0, limit: 0 };
    }

    // Obtém o plano atual do usuário
    const { data: userPlan, error: userPlanError } = await supabase
      .from("user_plans")
      .select("plan_id, end_date")
      .eq("user_id", userData.user.id)
      .eq("status", "active")
      .order("end_date", { ascending: false })
      .limit(1)
      .single();

    if (userPlanError || !userPlan) {
      return { canUpload: false, currentCount: 0, limit: 0 };
    }

    // Verifica se o plano está expirado
    if (userPlan.end_date) {
      const endDate = new Date(userPlan.end_date);
      const currentDate = new Date();
      if (endDate < currentDate) {
        console.warn("User plan has expired:", userPlan);
        return { canUpload: false, currentCount: 0, limit: 0 };
      }
    }

    // Obtém o limite de documentos do plano
    const { data: plan, error: planError } = await supabase
      .from("plans")
      .select("document_limit")
      .eq("id", userPlan.plan_id)
      .single();

    if (planError || !plan) {
      return { canUpload: false, currentCount: 0, limit: 0 };
    }

    // Conta quantos documentos o usuário já tem
    const { count, error: countError } = await supabase
      .from("documents")
      .select("id", { count: "exact" })
      .eq("user_id", userData.user.id);

    if (countError) {
      return { canUpload: false, currentCount: 0, limit: plan.document_limit };
    }

    const currentCount = count || 0;
    const canUpload = currentCount < plan.document_limit;

    return {
      canUpload,
      currentCount,
      limit: plan.document_limit,
    };
  } catch (error) {
    console.error("Error checking document limit:", error);
    return { canUpload: false, currentCount: 0, limit: 0 };
  }
}

/**
 * Verifica se o usuário atingiu o limite de contratos do seu plano atual
 */
export async function checkContractLimit(): Promise<{
  canCreate: boolean;
  currentCount: number;
  limit: number;
}> {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      return { canCreate: false, currentCount: 0, limit: 0 };
    }

    // Obtém o plano atual do usuário
    const { data: userPlan, error: userPlanError } = await supabase
      .from("user_plans")
      .select("plan_id, end_date")
      .eq("user_id", userData.user.id)
      .eq("status", "active")
      .order("end_date", { ascending: false })
      .limit(1)
      .single();

    if (userPlanError || !userPlan) {
      return { canCreate: false, currentCount: 0, limit: 0 };
    }

    // Verifica se o plano está expirado
    if (userPlan.end_date) {
      const endDate = new Date(userPlan.end_date);
      const currentDate = new Date();
      if (endDate < currentDate) {
        console.warn("User plan has expired:", userPlan);
        return { canCreate: false, currentCount: 0, limit: 0 };
      }
    }

    // Obtém o limite de contratos do plano
    const { data: plan, error: planError } = await supabase
      .from("plans")
      .select("contract_limit")
      .eq("id", userPlan.plan_id)
      .single();

    if (planError || !plan) {
      return { canCreate: false, currentCount: 0, limit: 0 };
    }

    // Conta quantos contratos o usuário já tem
    const { count, error: countError } = await supabase
      .from("contracts")
      .select("id", { count: "exact" })
      .eq("user_id", userData.user.id);

    if (countError) {
      return { canCreate: false, currentCount: 0, limit: plan.contract_limit };
    }

    const currentCount = count || 0;
    const canCreate = currentCount < plan.contract_limit;

    return {
      canCreate,
      currentCount,
      limit: plan.contract_limit,
    };
  } catch (error) {
    console.error("Error checking contract limit:", error);
    return { canCreate: false, currentCount: 0, limit: 0 };
  }
}

/**
 * Verifica o espaço de armazenamento disponível para o usuário
 */
export async function checkStorageLimit(): Promise<{
  canUpload: boolean;
  usedMB: number;
  limitMB: number;
  percentUsed: number;
}> {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      return { canUpload: false, usedMB: 0, limitMB: 0, percentUsed: 100 };
    }

    // Obtém o plano atual do usuário
    const { data: userPlan, error: userPlanError } = await supabase
      .from("user_plans")
      .select("plan_id, end_date")
      .eq("user_id", userData.user.id)
      .eq("status", "active")
      .order("end_date", { ascending: false })
      .limit(1)
      .single();

    if (userPlanError || !userPlan) {
      return { canUpload: false, usedMB: 0, limitMB: 0, percentUsed: 100 };
    }

    // Verifica se o plano está expirado
    if (userPlan.end_date) {
      const endDate = new Date(userPlan.end_date);
      const currentDate = new Date();
      if (endDate < currentDate) {
        console.warn("User plan has expired:", userPlan);
        return { canUpload: false, usedMB: 0, limitMB: 0, percentUsed: 100 };
      }
    }

    // Obtém o limite de armazenamento do plano
    const { data: plan, error: planError } = await supabase
      .from("plans")
      .select("storage_limit_mb")
      .eq("id", userPlan.plan_id)
      .single();

    if (planError || !plan) {
      return { canUpload: false, usedMB: 0, limitMB: 0, percentUsed: 100 };
    }

    // Calcula o espaço usado pelos documentos
    const { data: documents, error: documentsError } = await supabase
      .from("documents")
      .select("file_size")
      .eq("user_id", userData.user.id);

    if (documentsError) {
      return {
        canUpload: false,
        usedMB: 0,
        limitMB: plan.storage_limit_mb,
        percentUsed: 0,
      };
    }

    // Calcula o espaço usado pelos contratos
    const { data: contracts, error: contractsError } = await supabase
      .from("contracts")
      .select("file_size")
      .eq("user_id", userData.user.id);

    if (contractsError) {
      return {
        canUpload: false,
        usedMB: 0,
        limitMB: plan.storage_limit_mb,
        percentUsed: 0,
      };
    }

    // Calcula o total de bytes usados
    const totalBytes =
      documents.reduce((sum, doc) => sum + (doc.file_size || 0), 0) +
      contracts.reduce((sum, contract) => sum + (contract.file_size || 0), 0);

    // Converte para MB
    const usedMB = totalBytes / 1048576;
    const percentUsed = (usedMB / plan.storage_limit_mb) * 100;

    return {
      canUpload: usedMB < plan.storage_limit_mb,
      usedMB,
      limitMB: plan.storage_limit_mb,
      percentUsed,
    };
  } catch (error) {
    console.error("Error checking storage limit:", error);
    return { canUpload: false, usedMB: 0, limitMB: 0, percentUsed: 100 };
  }
}
