import React from "react";
import DashboardLayout from "../dashboard/layout/DashboardLayout-pt";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CreditCard,
  FileText,
  FileSignature,
  Shield,
  Users,
  CheckCircle,
  Clock,
  Calendar,
  Download,
  ArrowRight,
} from "lucide-react";

const Plan = () => {
  const currentPlan = {
    name: "Profissional",
    price: "R$99",
    period: "mensal",
    status: "active",
    nextBillingDate: "15/07/2024",
    paymentMethod: "Cartão de crédito terminando em 4242",
    features: [
      { name: "500 documentos", used: 24, limit: 500 },
      { name: "50 contratos/mês", used: 8, limit: 50 },
      { name: "Cofre digital", included: true },
      { name: "Suporte prioritário", included: true },
      { name: "Compartilhamento avançado", included: true },
      { name: "Modelos de contratos", included: true },
      { name: "API personalizada", included: false },
      { name: "Usuários ilimitados", included: false },
    ],
  };

  const plans = [
    {
      name: "Básico",
      price: "R$49",
      period: "mensal",
      features: [
        "100 documentos",
        "10 contratos/mês",
        "Suporte por email",
        "Compartilhamento básico",
      ],
      popular: false,
      current: false,
    },
    {
      name: "Profissional",
      price: "R$99",
      period: "mensal",
      features: [
        "500 documentos",
        "50 contratos/mês",
        "Suporte prioritário",
        "Cofre digital",
        "Compartilhamento avançado",
        "Modelos de contratos",
      ],
      popular: true,
      current: true,
    },
    {
      name: "Empresarial",
      price: "R$249",
      period: "mensal",
      features: [
        "Documentos ilimitados",
        "Contratos ilimitados",
        "Suporte 24/7",
        "Cofre digital",
        "Compartilhamento avançado",
        "Modelos de contratos",
        "API personalizada",
        "Usuários ilimitados",
      ],
      popular: false,
      current: false,
    },
  ];

  const invoices = [
    {
      id: "INV-2024-0003",
      date: "15/06/2024",
      amount: "R$99,00",
      status: "paid",
    },
    {
      id: "INV-2024-0002",
      date: "15/05/2024",
      amount: "R$99,00",
      status: "paid",
    },
    {
      id: "INV-2024-0001",
      date: "15/04/2024",
      amount: "R$99,00",
      status: "paid",
    },
  ];

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Meu Plano</h1>
        <p className="text-gray-500">
          Gerencie seu plano atual e veja o histórico de pagamentos
        </p>
      </div>

      {/* Plano Atual */}
      <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <div className="flex items-center mb-2">
                <h2 className="text-2xl font-bold text-gray-900 mr-2">
                  Plano {currentPlan.name}
                </h2>
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  Ativo
                </Badge>
              </div>
              <p className="text-gray-500">
                {currentPlan.price}/{currentPlan.period} • Próxima cobrança em{" "}
                {currentPlan.nextBillingDate}
              </p>
            </div>
            <div className="flex mt-4 md:mt-0 space-x-3">
              <Button
                variant="outline"
                className="border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                Cancelar Plano
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                Alterar Plano
              </Button>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Detalhes do Plano
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPlan.features
                .filter((feature) => typeof feature.used !== "undefined")
                .map((feature, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-900">
                        {feature.name}
                      </span>
                      <span className="text-gray-500">
                        {feature.used} / {feature.limit}
                      </span>
                    </div>
                    <Progress
                      value={(feature.used / feature.limit) * 100}
                      className="h-2 bg-gray-100"
                    />
                  </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {currentPlan.features
                .filter((feature) => typeof feature.included !== "undefined")
                .map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 border border-gray-100 rounded-xl"
                  >
                    {feature.included ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    ) : (
                      <Clock className="h-5 w-5 text-gray-300 mr-2" />
                    )}
                    <span
                      className={`text-sm ${feature.included ? "text-gray-900" : "text-gray-400"}`}
                    >
                      {feature.name}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Método de Pagamento
            </h3>
            <div className="flex items-center p-4 border border-gray-100 rounded-xl max-w-md">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <CreditCard className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {currentPlan.paymentMethod}
                </p>
                <p className="text-xs text-gray-500">Expira em 12/2025</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                Alterar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Histórico de Faturas */}
      <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold text-gray-900">
            Histórico de Faturas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Fatura
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Data
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Valor
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Status
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {invoice.id}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {invoice.date}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {invoice.amount}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        className={`${invoice.status === "paid" ? "bg-green-100 text-green-700 border-green-200" : "bg-yellow-100 text-yellow-700 border-yellow-200"}`}
                      >
                        {invoice.status === "paid" ? "Pago" : "Pendente"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Outros Planos */}
      <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold text-gray-900">
            Outros Planos Disponíveis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`border rounded-2xl p-6 ${plan.current ? "bg-blue-50 border-blue-200" : plan.popular ? "bg-white border-blue-200 relative" : "bg-white border-gray-200"}`}
              >
                {plan.popular && !plan.current && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                    POPULAR
                  </div>
                )}
                {plan.current && (
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-2">
                    Plano Atual
                  </Badge>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {plan.name}
                </h3>
                <div className="text-3xl font-bold text-gray-900 mb-4">
                  {plan.price}
                  <span className="text-lg font-normal text-gray-500">
                    /{plan.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${plan.current ? "bg-gray-300 text-gray-600 cursor-not-allowed" : plan.popular ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-black hover:bg-gray-800 text-white"}`}
                  disabled={plan.current}
                >
                  {plan.current ? "Plano Atual" : "Escolher Plano"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Plan;
