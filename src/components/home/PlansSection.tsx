import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Sparkles,
  Rocket,
  Star,
  Crown,
  MessageSquare,
} from "lucide-react";
import { PlansIconFallback } from "./PlansIconFallback";
import { AnimatedBadge } from "./3d/AnimatedBadge";
import { getPlans, Plan } from "@/lib/api/plans";

export function PlansSection() {
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch plans from the database
  useEffect(() => {
    async function loadPlans() {
      try {
        const plansData = await getPlans();
        setPlans(plansData);
      } catch (error) {
        console.error("Error loading plans:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPlans();
  }, []);

  // Get period display text
  const getPeriodText = () => {
    switch (billingPeriod) {
      case "monthly":
        return "mensal";
      case "semiannual":
        return "semestral";
      case "annual":
        return "anual";
      default:
        return "mensal";
    }
  };

  // Get price based on billing period
  const getPrice = (plan: Plan) => {
    switch (billingPeriod) {
      case "monthly":
        return `R$${plan.price_monthly}`;
      case "semiannual":
        return `R$${plan.price_semiannual}`;
      case "annual":
        return `R$${plan.price_annual}`;
      default:
        return `R$${plan.price_monthly}`;
    }
  };

  // Fallback plans in case database fetch fails
  const fallbackPlans = [
    {
      id: "1",
      name: "Start",
      price_monthly: 29,
      price_semiannual: 26,
      price_annual: 23,
      iconType: "sparkles",
      color: "blue",
      features: [
        "50 documentos",
        "5 contratos/mês",
        "Suporte por email",
        "Compartilhamento básico",
      ],
      popular: false,
      active: true,
    },
    {
      id: "2",
      name: "Básico",
      price_monthly: 49,
      price_semiannual: 44,
      price_annual: 39,
      iconType: "rocket",
      color: "indigo",
      features: [
        "100 documentos",
        "10 contratos/mês",
        "Suporte por email",
        "Compartilhamento básico",
        "Assinatura digital básica",
      ],
      popular: true,
      active: true,
    },
    {
      id: "3",
      name: "Profissional",
      price_monthly: 99,
      price_semiannual: 89,
      price_annual: 79,
      iconType: "star",
      color: "purple",
      features: [
        "500 documentos",
        "50 contratos/mês",
        "Suporte prioritário",
        "Cofre digital",
        "Compartilhamento avançado",
        "Modelos de contratos",
      ],
      popular: false,
      active: true,
    },
    {
      id: "4",
      name: "Empresarial",
      price_monthly: 249,
      price_semiannual: 224,
      price_annual: 199,
      iconType: "crown",
      color: "amber",
      features: [
        "Documentos ilimitados",
        "Contratos ilimitados",
        "Suporte 24/7",
        "Cofre digital",
        "API personalizada",
        "Usuários ilimitados",
      ],
      popular: false,
      active: true,
    },
  ];

  // Use fallback plans if loading or no plans from database
  const displayPlans = plans.length > 0 ? plans : fallbackPlans;

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
            Planos para Todos os Tamanhos
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Escolha o plano ideal para suas necessidades de gerenciamento de
            documentos
          </p>
        </div>

        {/* Seleção de Período de Cobrança */}
        <div className="mb-12 flex flex-col items-center">
          <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl inline-flex flex-wrap justify-center">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${billingPeriod === "monthly" ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"}`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBillingPeriod("semiannual")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${billingPeriod === "semiannual" ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"}`}
            >
              Semestral
              <span className="ml-1 text-xs font-bold text-green-500">
                -10%
              </span>
            </button>
            <button
              onClick={() => setBillingPeriod("annual")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${billingPeriod === "annual" ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"}`}
            >
              Anual
              <span className="ml-1 text-xs font-bold text-green-500">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Planos */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {displayPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`bg-white dark:bg-gray-800 border-2 rounded-2xl overflow-hidden relative ${plan.popular ? `border-${plan.color}-300` : `border-gray-200 dark:border-gray-700 hover:border-${plan.color}-200 dark:hover:border-${plan.color}-700 transition-all`}`}
              >
                {plan.popular && (
                  <AnimatedBadge text="MAIS VENDIDO" color={plan.color} />
                )}
                <div className="p-6 pb-16">
                  <div className="flex items-center mb-4">
                    <div
                      className={`rounded-full p-3 bg-${plan.color}-100 dark:bg-${plan.color}-900/30 mr-3 h-14 w-14 flex items-center justify-center`}
                    >
                      <PlansIconFallback
                        iconType={plan.iconType}
                        color={
                          plan.color === "blue"
                            ? "#3b82f6"
                            : plan.color === "indigo"
                              ? "#6366f1"
                              : plan.color === "purple"
                                ? "#a855f7"
                                : plan.color === "amber"
                                  ? "#f59e0b"
                                  : "#3b82f6"
                        }
                        size={32}
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {plan.name}
                    </h3>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    {getPrice(plan)}
                    <span className="text-lg font-normal text-gray-500 dark:text-gray-400">
                      /{getPeriodText()}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-6 min-h-[220px]">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle
                          className={`h-5 w-5 text-${plan.color}-500 mr-2 mt-0.5 flex-shrink-0`}
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="absolute bottom-6 left-6 right-6">
                    <Button
                      className={`w-full ${plan.color === "blue" ? "bg-blue-600 hover:bg-blue-700" : plan.color === "indigo" ? "bg-indigo-600 hover:bg-indigo-700" : plan.color === "purple" ? "bg-purple-600 hover:bg-purple-700" : plan.color === "amber" ? "bg-amber-600 hover:bg-amber-700" : "bg-gray-600 hover:bg-gray-700"} text-white`}
                      onClick={() => (window.location.href = "/signup")}
                    >
                      Escolher Plano
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Custom Plan */}
        <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-4 sm:p-8 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
            <PlansIconFallback iconType="message" color="#16a34a" size={32} />
          </div>
          <h3 className="text-2xl font-bold mb-3">
            Precisa de um plano personalizado?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            Temos soluções sob medida para empresas de todos os tamanhos. Entre
            em contato conosco para discutir suas necessidades específicas.
          </p>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => (window.location.href = "/contato")}
          >
            Solicitar Proposta
          </Button>
        </div>
      </div>
    </section>
  );
}
