import React, { useState, useRef } from "react";
import DashboardLayout from "../dashboard/layout/DashboardLayout-pt";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
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
  Sparkles,
  Rocket,
  Star,
  Crown,
  MessageSquare,
  X,
  Send,
  Building,
  Mail,
  Phone,
  User,
} from "lucide-react";

const Plan = () => {
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    employees: "",
    message: "",
  });

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
      icon: <Sparkles className="h-10 w-10 text-blue-500" />,
      color: "blue",
      features: [
        "50 documentos",
        "5 contratos/mês",
        "Suporte por email",
        "Compartilhamento básico",
      ],
      popular: false,
      current: false,
    },
    {
      name: "Básico",
      price: calculatePrice(basePrices.basic),
      period: getPeriodText(),
      icon: <Rocket className="h-10 w-10 text-indigo-500" />,
      color: "indigo",
      features: [
        "100 documentos",
        "10 contratos/mês",
        "Suporte por email",
        "Compartilhamento básico",
        "Assinatura digital básica",
      ],
      popular: false,
      current: false,
    },
    {
      name: "Profissional",
      price: calculatePrice(basePrices.professional),
      period: getPeriodText(),
      icon: <Star className="h-10 w-10 text-purple-500" />,
      color: "purple",
      features: [
        "500 documentos",
        "50 contratos/mês",
        "Suporte prioritário",
        "Cofre digital",
        "Compartilhamento avançado",
        "Modelos de contratos",
        "Assinatura digital avançada",
      ],
      popular: true,
      current: true,
    },
    {
      name: "Empresarial",
      price: calculatePrice(basePrices.enterprise),
      period: getPeriodText(),
      icon: <Crown className="h-10 w-10 text-amber-500" />,
      color: "amber",
      features: [
        "Documentos ilimitados",
        "Contratos ilimitados",
        "Suporte 24/7",
        "Cofre digital",
        "Compartilhamento avançado",
        "Modelos de contratos",
        "API personalizada",
        "Usuários ilimitados",
        "Integrações personalizadas",
      ],
      popular: false,
      current: false,
    },
    {
      name: "Custom",
      price: "Personalizado",
      period: "",
      icon: <MessageSquare className="h-10 w-10 text-green-500" />,
      color: "green",
      features: [
        "Solução personalizada",
        "Número de documentos sob medida",
        "Suporte dedicado",
        "Recursos personalizados",
        "Integrações sob demanda",
        "Treinamento da equipe",
      ],
      isCustom: true,
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCustomFormSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    setFormSubmitted(true);

    // Reset form after 3 seconds and close dialog
    setTimeout(() => {
      setFormSubmitted(false);
      setShowCustomForm(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        employees: "",
        message: "",
      });
    }, 3000);
  };

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
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Plano {currentPlan.name}
                </h2>
                <Badge className="bg-green-100 text-green-700 border-green-200 px-2.5 py-0.5 rounded-full">
                  Ativo
                </Badge>
              </div>
              <p className="text-gray-500 text-sm sm:text-base">
                {currentPlan.price}/{currentPlan.period} • Próxima cobrança em{" "}
                {currentPlan.nextBillingDate}
              </p>
            </div>
            <div className="flex flex-wrap mt-4 md:mt-0 gap-3">
              <Button
                variant="outline"
                className="border-gray-200 text-gray-700 hover:bg-gray-50 text-sm sm:text-base w-full sm:w-auto"
              >
                Cancelar Plano
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base w-full sm:w-auto">
                Alterar Plano
              </Button>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Detalhes do Plano
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-6">
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
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      {invoice.id}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {invoice.date}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      {invoice.amount}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        className={`${invoice.status === "paid" ? "bg-green-100 text-green-700 border-green-200" : "bg-yellow-100 text-yellow-700 border-yellow-200"} px-2.5 py-0.5 rounded-full text-xs font-semibold`}
                      >
                        {invoice.status === "paid" ? "Pago" : "Pendente"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
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

      {/* Seleção de Período de Cobrança */}
      <div className="mb-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Escolha seu plano ideal
        </h2>
        <div className="bg-gray-100 p-1 rounded-xl inline-flex flex-wrap justify-center">
          <button
            onClick={() => setBillingPeriod("monthly")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${billingPeriod === "monthly" ? "bg-white shadow-sm text-blue-600" : "text-gray-600 hover:text-gray-900"}`}
          >
            Mensal
          </button>
          <button
            onClick={() => setBillingPeriod("semiannual")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${billingPeriod === "semiannual" ? "bg-white shadow-sm text-blue-600" : "text-gray-600 hover:text-gray-900"}`}
          >
            Semestral
            <span className="ml-1 text-xs font-bold text-green-500">-10%</span>
          </button>
          <button
            onClick={() => setBillingPeriod("annual")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${billingPeriod === "annual" ? "bg-white shadow-sm text-blue-600" : "text-gray-600 hover:text-gray-900"}`}
          >
            Anual
            <span className="ml-1 text-xs font-bold text-green-500">-20%</span>
          </button>
        </div>
      </div>

      {/* Planos Disponíveis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 mb-12">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={`border-2 rounded-2xl overflow-hidden ${plan.current ? `bg-${plan.color}-50 border-${plan.color}-200` : plan.popular ? `bg-white border-${plan.color}-300 relative` : plan.isCustom ? `bg-gradient-to-br from-${plan.color}-50 to-white border-${plan.color}-200` : `bg-white border-gray-200 hover:border-${plan.color}-200 transition-all`}`}
          >
            {plan.popular && !plan.current && (
              <div
                className={`absolute top-0 right-0 bg-${plan.color}-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl`}
              >
                MAIS VENDIDO
              </div>
            )}
            <div className="p-6">
              {plan.current && (
                <Badge
                  className={`bg-${plan.color}-100 text-${plan.color}-700 border-${plan.color}-200 mb-2`}
                >
                  Plano Atual
                </Badge>
              )}
              <div className="flex items-center mb-4">
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ y: [0, -5, 0], rotate: [0, 2, 0] }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                    y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    rotate: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  className={`rounded-full p-3 bg-${plan.color}-100 mr-3`}
                >
                  {plan.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-6">
                {plan.price}
                {plan.period && (
                  <span className="text-lg font-normal text-gray-500">
                    /{plan.period}
                  </span>
                )}
              </div>
              <ul className="space-y-3 mb-6 min-h-[200px]">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle
                      className={`h-5 w-5 text-${plan.color}-500 mr-2 mt-0.5 flex-shrink-0`}
                    />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${plan.current ? "bg-gray-300 text-gray-600 cursor-not-allowed" : plan.isCustom ? `bg-${plan.color}-600 hover:bg-${plan.color}-700 text-white` : plan.popular ? `bg-${plan.color}-600 hover:bg-${plan.color}-700 text-white` : "bg-gray-900 hover:bg-gray-800 text-white"}`}
                disabled={plan.current}
                onClick={() => (plan.isCustom ? setShowCustomForm(true) : null)}
              >
                {plan.current
                  ? "Plano Atual"
                  : plan.isCustom
                    ? "Solicitar Proposta"
                    : "Escolher Plano"}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Custom Plan Request Form Dialog */}
      <Dialog open={showCustomForm} onOpenChange={setShowCustomForm}>
        <DialogContent className="sm:max-w-[500px] bg-white rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-green-500" />
              Solicitar Plano Personalizado
            </DialogTitle>
            <DialogDescription>
              Preencha o formulário abaixo para receber uma proposta
              personalizada para sua empresa.
            </DialogDescription>
          </DialogHeader>

          {formSubmitted ? (
            <div className="py-6 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Solicitação Enviada!
              </h3>
              <p className="text-gray-500">
                Obrigado pelo seu interesse. Nossa equipe entrará em contato em
                breve com uma proposta personalizada.
              </p>
            </div>
          ) : (
            <form onSubmit={handleCustomFormSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Nome
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <User className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Mail className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm font-medium">
                      Empresa
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Building className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Telefone
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Phone className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employees" className="text-sm font-medium">
                    Número de Funcionários
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Users className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="employees"
                      name="employees"
                      value={formData.employees}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium">
                    Necessidades Específicas
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Descreva as necessidades específicas da sua empresa..."
                    className="min-h-[100px]"
                    required
                  />
                </div>
              </div>

              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCustomForm(false)}
                  className="w-full sm:w-auto"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Solicitação
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Plan;
