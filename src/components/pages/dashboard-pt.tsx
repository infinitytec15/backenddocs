import React, { useState, useEffect } from "react";
import DashboardLayout from "../dashboard/layout/DashboardLayout-pt";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, FileSignature, Shield, Award } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import DashboardGrid from "../dashboard/DashboardGrid";
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
  const [documentCount, setDocumentCount] = useState(0);
  const [contractCount, setContractCount] = useState(0);
  const [vaultCount, setVaultCount] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);

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

    // Fetch document counts
    const fetchDocumentCounts = async () => {
      try {
        // In a real app, these would be actual database queries
        // For now, we'll use mock data
        setDocumentCount(24);
        setContractCount(8);
        setVaultCount(5);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error("Error fetching document counts:", error);
      }
    };

    // Fetch recent activities
    const fetchRecentActivities = async () => {
      try {
        // In a real app, this would be an actual database query
        // For now, we'll use mock data
        const activities = [
          {
            icon: <FileText className="h-4 w-4 text-blue-500" />,
            title: "Relatório Financeiro 2024.xlsx adicionado",
            time: "Hoje, 10:42",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
            name: "Maria Oliveira",
          },
          {
            icon: <FileSignature className="h-4 w-4 text-purple-500" />,
            title: "Contrato de Prestação de Serviços assinado",
            time: "Ontem, 15:30",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joao",
            name: "João Silva",
          },
          {
            icon: <Shield className="h-4 w-4 text-indigo-500" />,
            title: "Certidão de Nascimento.pdf adicionado ao cofre",
            time: "15 Jun, 09:15",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
            name: "Ana Pereira",
          },
          {
            icon: <Award className="h-4 w-4 text-yellow-500" />,
            title: "Conquistou o selo 'Organizador Profissional'",
            time: "14 Jun, 11:20",
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`,
            name: "Você",
          },
        ];

        setRecentActivities(activities);
      } catch (error) {
        console.error("Error fetching recent activities:", error);
      }
    };

    checkAffiliateStatus();
    fetchDocumentCounts();
    fetchRecentActivities();
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
          <DashboardGrid
            isLoading={isLoading}
            onTabChange={handleTabChange}
            userName={user?.user_metadata?.full_name || "Usuário"}
            activities={recentActivities}
          />
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

        <TabsContent value="gamificacao">
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Sistema de Gamificação
            </h2>
            <p className="text-gray-500 mb-6">
              Acumule pontos completando tarefas e ganhe recompensas exclusivas!
            </p>
            {/* Gamification content would go here */}
          </div>
        </TabsContent>

        <TabsContent value="plano">
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Seu Plano Atual
            </h2>
            <p className="text-gray-500 mb-6">
              Gerencie seu plano e veja os recursos disponíveis.
            </p>
            {/* Plan management content would go here */}
          </div>
        </TabsContent>

        {isAffiliate && (
          <TabsContent value="afiliados">
            <AffiliateDashboard userId={user?.id} />
          </TabsContent>
        )}
      </Tabs>
    </DashboardLayout>
  );
};

export default Dashboard;
