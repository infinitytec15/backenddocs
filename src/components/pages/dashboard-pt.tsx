import React, { useState, useEffect } from "react";
import DashboardLayout from "../dashboard/layout/DashboardLayout-pt";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  FileText,
  FileSignature,
  Shield,
  Award,
  Clock,
  Calendar,
  Bell,
  Plus,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Users,
  Link as LinkIcon,
  Upload,
  DollarSign,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  Sparkles,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import DocumentsGrid from "../dashboard/DocumentsGrid";
import ContractsGrid from "../dashboard/ContractsGrid";
import VaultGrid from "../dashboard/VaultGrid";
import AffiliateDashboard from "../dashboard/AffiliateDashboard";
import { useAuth } from "../../../supabase/auth";
import { supabase } from "../../../supabase/supabase";

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isAffiliate, setIsAffiliate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const checkAffiliateStatus = async () => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("is_affiliate")
          .eq("id", user.id)
          .single();

        if (error) throw error;
        setIsAffiliate(data?.is_affiliate || false);
      } catch (error) {
        console.error("Error checking affiliate status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAffiliateStatus();
  }, [user]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          Olá, {user?.user_metadata?.full_name || "Usuário"}
        </h1>
        <p className="text-gray-500">Bem-vindo ao seu painel de controle</p>
      </div>

      <Tabs
        defaultValue="dashboard"
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl p-1 mb-6 overflow-x-auto flex-nowrap">
          <TabsTrigger
            value="dashboard"
            className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 py-2.5"
          >
            Dashboard
          </TabsTrigger>
          <TabsTrigger
            value="documentos"
            className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 py-2.5"
          >
            Meus Documentos
          </TabsTrigger>
          <TabsTrigger
            value="contratos"
            className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 py-2.5"
          >
            Meus Contratos
          </TabsTrigger>
          <TabsTrigger
            value="cofre"
            className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 py-2.5"
          >
            Cofre Digital
          </TabsTrigger>
          <TabsTrigger
            value="gamificacao"
            className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 py-2.5"
          >
            Gamificação
          </TabsTrigger>
          <TabsTrigger
            value="plano"
            className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 py-2.5"
          >
            Meu Plano
          </TabsTrigger>
          {isAffiliate && (
            <TabsTrigger
              value="afiliados"
              className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 py-2.5"
            >
              Programa de Afiliados
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Total de Documentos
                  </h3>
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">24</div>
                <div className="text-sm text-gray-500 flex items-center">
                  <span className="text-green-500 flex items-center mr-1">
                    <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" />
                    12%
                  </span>
                  <span>desde o mês passado</span>
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full mt-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-sm p-0 h-auto"
                  onClick={() => setActiveTab("documentos")}
                >
                  Ver todos
                  <ChevronRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Contratos Ativos
                  </h3>
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <FileSignature className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">8</div>
                <div className="text-sm text-gray-500 flex items-center">
                  <span className="text-green-500 flex items-center mr-1">
                    <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" />
                    5%
                  </span>
                  <span>desde o mês passado</span>
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full mt-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-sm p-0 h-auto"
                  onClick={() => setActiveTab("contratos")}
                >
                  Ver todos
                  <ChevronRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Documentos no Cofre
                  </h3>
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-indigo-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">5</div>
                <div className="text-sm text-gray-500 flex items-center">
                  <span className="text-red-500 flex items-center mr-1">
                    <ArrowDownRight className="h-3.5 w-3.5 mr-0.5" />
                    2%
                  </span>
                  <span>desde o mês passado</span>
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full mt-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-sm p-0 h-auto"
                  onClick={() => setActiveTab("cofre")}
                >
                  Ver todos
                  <ChevronRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Pontos Acumulados
                  </h3>
                  <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Award className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  1.250
                </div>
                <div className="text-sm text-gray-500 flex items-center">
                  <span className="text-green-500 flex items-center mr-1">
                    <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" />
                    18%
                  </span>
                  <span>desde o mês passado</span>
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full mt-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-sm p-0 h-auto"
                  onClick={() => setActiveTab("gamificacao")}
                >
                  Ver recompensas
                  <ChevronRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Botões de Ação Rápida */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white h-auto py-3 rounded-xl flex flex-col items-center justify-center gap-2">
              <Upload className="h-5 w-5" />
              <span className="text-sm font-medium">Upload Documento</span>
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white h-auto py-3 rounded-xl flex flex-col items-center justify-center gap-2">
              <FileSignature className="h-5 w-5" />
              <span className="text-sm font-medium">Criar Contrato</span>
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white h-auto py-3 rounded-xl flex flex-col items-center justify-center gap-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm font-medium">Proteger Arquivo</span>
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white h-auto py-3 rounded-xl flex flex-col items-center justify-center gap-2">
              <LinkIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Indicar Amigo</span>
            </Button>
          </div>

          {/* Gráficos e Estatísticas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center justify-between">
                  <span>Evolução de Documentos</span>
                  <BarChart3 className="h-5 w-5 text-gray-400" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full flex items-center justify-center">
                  <div className="w-full h-full flex items-end justify-between px-2">
                    {[35, 45, 30, 50, 60, 40, 70].map((height, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className="w-10 bg-blue-500 rounded-t-md" 
                          style={{ height: `${height * 2}px` }}
                        ></div>
                        <span className="text-xs text-gray-500 mt-2">{['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'][index]}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none">
                      +24% este ano
                    </Badge>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none">
                      Meta atingida
                    </Badge>
                  </div>
                  <Button variant="ghost" className="text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto">
                    Ver detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center justify-between">
                  <span>Status dos Contratos</span>
                  <PieChart className="h-5 w-5 text-gray-400" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full flex items-center justify-center">
                  <div className="relative h-40 w-40 rounded-full overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0">
                      <div className="h-full w-full bg-gray-100 flex">
                        <div className="h-full w-[60%] bg-green-500"></div>
                        <div className="h-full w-[25%] bg-yellow-500"></div>
                        <div className="h-full w-[15%] bg-red-500"></div>
                      </div>
                    </div>
                    <div className="absolute inset-[15%] bg-white rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-900">8</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium text-gray-900">Assinados</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900 mt-1">5</span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <span className="text-sm font-medium text-gray-900">Pendentes</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900 mt-1">2</span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <span className="text-sm font-medium text-gray-900">Expirados</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900 mt-1">1</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Atividade Recente e Armazenamento */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center justify-between">
                  <span>Atividade Recente</span>
                  <Button variant="outline" size="sm" className="h-8 text-xs">
                    <Clock className="h-3.5 w-3.5 mr-1" /> Últimas 24h
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      icon: <FileText className="h-4 w-4 text-blue-500" />,
                      title: "Relatório Financeiro 2024.xlsx adicionado",
                      time: "Hoje, 10:42",
                      avatar:
                        "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
                      name: "Maria Oliveira",
                    },
                    {
                      icon: (
                        <FileSignature className="h-4 w-4 text-purple-500" />
                      ),
                      title: "Contrato de Prestação de Serviços assinado",
                      time: "Ontem, 15:30",
                      avatar:
                        "https://api.dicebear.com/7.x/avataaars/svg?seed=Joao",
                      name: "João Silva",
                    },
                    {
                      icon: <Shield className="h-4 w-4 text-indigo-500" />,
                      title: "Certidão de Nascimento.pdf adicionado ao cofre",
                      time: "15 Jun, 09:15",
                      avatar:
                        "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
                      name: "Ana Pereira",
                    },
                    {
                      icon: <Award className="h-4 w-4 text-yellow-500" />,
                      title: "Conquistou o selo 'Organizador Profissional'",
                      time: "14 Jun, 11:20",
                      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`,
                      name: user?.user_metadata?.full_name || "Você",
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start p-3 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.title}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={activity.avatar}
                          alt={activity.name}
                        />
                        <AvatarFallback>{activity.name[0]}</AvatarFallback>
                      </Avatar>
                    </div>
                  ))}
                </div>
