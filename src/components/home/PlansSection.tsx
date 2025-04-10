import { useState } from "react";
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

export function PlansSection() {
  const [billingPeriod, setBillingPeriod] = useState("monthly");

  // Pricing multipliers for different billing periods
  const periodMultipliers = {
    monthly: 1,
    semiannual: 0.9, // 10% discount
    annual: 0.8, // 20% discount
  };

  // Base prices for monthly billing
  const basePrices = {
    start: 29,
    basic: 49,
    professional: 99,
    enterprise: 249,
  };

  // Calculate price based on billing period
  const calculatePrice = (basePrice) => {
    const price = Math.round(basePrice * periodMultipliers[billingPeriod]);
    return `R$${price}`;
  };

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

  const plans = [
    {
      name: "Start",
      price: calculatePrice(basePrices.start),
      period: getPeriodText(),
      icon: <Sparkles className="h-8 w-8 text-blue-500" />,
      color: "blue",
      features: [
        "50 documentos",
        "5 contratos/mês",
        "Suporte por email",
        "Compartilhamento básico",
      ],
      popular: false,
    },
    {
      name: "Básico",
      price: calculatePrice(basePrices.basic),
      period: getPeriodText(),
      icon: <Rocket className="h-8 w-8 text-indigo-500" />,
      color: "indigo",
      features: [
        "100 documentos",
        "10 contratos/mês",
        "Suporte por email",
        "Compartilhamento básico",
        "Assinatura digital básica",
      ],
      popular: false,
    },
    {
      name: "Profissional",
      price: calculatePrice(basePrices.professional),
      period: getPeriodText(),
      icon: <Star className="h-8 w-8 text-purple-500" />,
      color: "purple",
      features: [
        "500 documentos",
        "50 contratos/mês",
        "Suporte prioritário",
        "Cofre digital",
        "Compartilhamento avançado",
        "Modelos de contratos",
      ],
      popular: true,
    },
    {
      name: "Empresarial",
      price: calculatePrice(basePrices.enterprise),
      period: getPeriodText(),
      icon: <Crown className="h-8 w-8 text-amber-500" />,
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
    },
  ];

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
          <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl inline-flex">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`bg-white dark:bg-gray-800 border-2 rounded-2xl overflow-hidden ${plan.popular ? `border-${plan.color}-300 relative` : `border-gray-200 dark:border-gray-700 hover:border-${plan.color}-200 dark:hover:border-${plan.color}-700 transition-all`}`}
            >
              {plan.popular && (
                <div
                  className={`absolute top-0 right-0 bg-${plan.color}-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl`}
                >
                  POPULAR
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className={`rounded-full p-3 bg-${plan.color}-100 dark:bg-${plan.color}-900/30 mr-3`}
                  >
                    {plan.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {plan.name}
                  </h3>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  {plan.price}
                  <span className="text-lg font-normal text-gray-500 dark:text-gray-400">
                    /{plan.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-6 min-h-[180px]">
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
                <Link to="/planos">
                  <Button
                    className={`w-full ${plan.popular ? `bg-${plan.color}-600 hover:bg-${plan.color}-700 text-white` : "bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white"}`}
                  >
                    Escolher Plano
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Plan */}
        <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
            <MessageSquare className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold mb-3">
            Precisa de um plano personalizado?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            Temos soluções sob medida para empresas de todos os tamanhos. Entre
            em contato conosco para discutir suas necessidades específicas.
          </p>
          <Link to="/planos">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Solicitar Proposta
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
