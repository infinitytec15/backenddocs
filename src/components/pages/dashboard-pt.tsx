import React, { useState, useEffect } from "react";
import DashboardLayout from "../dashboard/layout/DashboardLayout-pt";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
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
  const [activeTab, setActiveTab] = useState("resumo");
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
        defaultValue="resumo"
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl p-1 mb-6 overflow-x-auto flex-nowrap">
          <TabsTrigger
            value="resumo"
            className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 py-2.5"
          >
            Resumo
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
          {isAffiliate && (
            <TabsTrigger
              value="afiliados"
              className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 py-2.5"
            >
              Programa de Afiliados
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="resumo" className="space-y-6">
          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Documentos
                  </h3>
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">24</div>
                <div className="text-sm text-gray-500 flex items-center">
                  <span className="text-green-500 flex items-center mr-1">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                    12%
                  </span>
                  desde o mês passado
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Contratos
                  </h3>
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <FileSignature className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">8</div>
                <div className="text-sm text-gray-500 flex items-center">
                  <span className="text-green-500 flex items-center mr-1">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                    5%
                  </span>
                  desde o mês passado
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-500">Cofre</h3>
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-indigo-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">5</div>
                <div className="text-sm text-gray-500 flex items-center">
                  <span className="text-red-500 flex items-center mr-1">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                    2%
                  </span>
                  desde o mês passado
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-500">Pontos</h3>
                  <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Award className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  1.250
                </div>
                <div className="text-sm text-gray-500 flex items-center">
                  <span className="text-green-500 flex items-center mr-1">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                    18%
                  </span>
                  desde o mês passado
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Atividade Recente e Armazenamento */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Atividade Recente
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
                <Button
                  variant="ghost"
                  className="w-full mt-4 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  Ver todas as atividades
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Armazenamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-900">
                        Uso Total
                      </span>
                      <span className="text-gray-500">12.5 GB / 20 GB</span>
                    </div>
                    <Progress value={62.5} className="h-2 bg-gray-100" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                          <FileText className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Documentos
                          </p>
                          <p className="text-xs text-gray-500">24 arquivos</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        5.2 GB
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                          <FileSignature className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Contratos
                          </p>
                          <p className="text-xs text-gray-500">8 arquivos</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        2.8 GB
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center mr-3">
                          <Shield className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Cofre Digital
                          </p>
                          <p className="text-xs text-gray-500">5 arquivos</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        4.5 GB
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                  >
                    Fazer upgrade
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Próximos Eventos e Tarefas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Próximos Eventos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Renovação de Contrato",
                      date: "20 Jun, 2024",
                      time: "14:00",
                      icon: <Calendar className="h-4 w-4 text-blue-500" />,
                    },
                    {
                      title: "Vencimento de Documento",
                      date: "25 Jun, 2024",
                      time: "00:00",
                      icon: <Clock className="h-4 w-4 text-red-500" />,
                    },
                    {
                      title: "Webinar: Segurança Digital",
                      date: "30 Jun, 2024",
                      time: "16:30",
                      icon: <Calendar className="h-4 w-4 text-green-500" />,
                    },
                  ].map((event, index) => (
                    <div
                      key={index}
                      className="flex items-start p-3 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                        {event.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {event.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {event.date} • {event.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  className="w-full mt-4 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  Ver calendário completo
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Tarefas Pendentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Revisar Contrato de Aluguel",
                      dueDate: "Hoje",
                      priority: "Alta",
                      status: "pending",
                    },
                    {
                      title: "Assinar Acordo de Confidencialidade",
                      dueDate: "Amanhã",
                      priority: "Média",
                      status: "pending",
                    },
                    {
                      title: "Atualizar Documentos Pessoais",
                      dueDate: "23 Jun",
                      priority: "Baixa",
                      status: "completed",
                    },
                  ].map((task, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <div className="mr-3">
                        {task.status === "completed" ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-yellow-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p
                          className={`text-sm font-medium ${task.status === "completed" ? "text-gray-500 line-through" : "text-gray-900"}`}
                        >
                          {task.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          Vence: {task.dueDate} • Prioridade: {task.priority}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-gray-200"
                      >
                        <svg
                          className="h-4 w-4 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                          />
                        </svg>
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex mt-4">
                  <Button className="flex-1 mr-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl">
                    <Plus className="h-4 w-4 mr-1" /> Nova Tarefa
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl"
                  >
                    Ver Todas
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documentos">
          <DocumentsGrid />
        </TabsContent>

        <TabsContent value="contratos">
          <ContractsGrid />
        </TabsContent>

        <TabsContent value="cofre">
          <VaultGrid />
        </TabsContent>

        <TabsContent value="afiliados">
          {isAffiliate ? (
            <AffiliateDashboard />
          ) : (
            <div className="bg-yellow-50 text-yellow-700 p-6 rounded-lg text-center">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
              <h3 className="text-lg font-semibold mb-2">
                Você ainda não é um afiliado
              </h3>
              <p className="mb-4">
                Torne-se um afiliado para começar a ganhar comissões indicando
                novos usuários.
              </p>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={async () => {
                  try {
                    const { data, error } = await supabase
                      .from("users")
                      .update({ is_affiliate: true })
                      .eq("id", user?.id)
                      .select();

                    if (error) throw error;
                    setIsAffiliate(true);
                    toast({
                      title: "Sucesso!",
                      description: "Você agora é um afiliado.",
                      duration: 3000,
                    });
                  } catch (error) {
                    console.error("Error registering as affiliate:", error);
                    toast({
                      title: "Erro",
                      description:
                        "Erro ao registrar como afiliado. Tente novamente.",
                      variant: "destructive",
                    });
                  }
                }}
              >
                Tornar-se Afiliado
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Dashboard;
