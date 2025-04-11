import { useEffect, useState } from "react";
import { AlertCircle, Clock } from "lucide-react";
import { useAuth } from "../../../supabase/auth";
import { isTrialPeriodOver } from "@/lib/api/user-plans";
import { supabase } from "../../../supabase/supabase";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

interface TrialNotificationProps {
  className?: string;
}

export default function TrialNotification({
  className,
}: TrialNotificationProps) {
  const { user } = useAuth();
  const [isInTrial, setIsInTrial] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const checkTrialStatus = async () => {
      try {
        // Verifica se o período de trial acabou
        const trialOver = await isTrialPeriodOver(user.id);

        if (trialOver) {
          setIsInTrial(false);
          setLoading(false);
          return;
        }

        // Busca informações do plano de trial
        const { data, error } = await supabase
          .from("user_plans")
          .select("*")
          .eq("user_id", user.id)
          .eq("is_trial", true)
          .eq("is_active", true)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (error || !data) {
          setIsInTrial(false);
          setLoading(false);
          return;
        }

        // Calcula dias restantes
        const endDate = new Date(data.end_date);
        const now = new Date();
        const diffTime = endDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        setDaysLeft(diffDays > 0 ? diffDays : 0);
        setIsInTrial(true);
      } catch (error) {
        console.error("Error checking trial status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkTrialStatus();
  }, [user]);

  if (loading || !isInTrial) return null;

  return (
    <div
      className={`bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center justify-between ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="bg-amber-100 rounded-full p-2">
          <Clock className="h-5 w-5 text-amber-600" />
        </div>
        <div>
          <h3 className="font-medium text-amber-800">
            {daysLeft === 1
              ? "Seu período de avaliação termina amanhã"
              : `Restam ${daysLeft} dias no seu período de avaliação gratuita`}
          </h3>
          <p className="text-sm text-amber-700">
            Atualize para um plano pago para continuar usando todos os recursos.
          </p>
        </div>
      </div>
      <Link to="/dashboard/plan">
        <Button className="bg-amber-600 hover:bg-amber-700 text-white">
          Ver planos
        </Button>
      </Link>
    </div>
  );
}
