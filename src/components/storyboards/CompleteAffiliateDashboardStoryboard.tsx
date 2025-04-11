import { useState } from "react";
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout-pt";
import AffiliateDashboard from "@/components/dashboard/AffiliateDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CompleteAffiliateDashboardStoryboard() {
  const [activeTab, setActiveTab] = useState("afiliados");

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          Olá, Usuário Afiliado
        </h1>
        <p className="text-gray-500">Bem-vindo ao seu painel de controle</p>
      </div>

      <Tabs
        defaultValue="afiliados"
        value={activeTab}
        onValueChange={setActiveTab}
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
            value="afiliados"
            className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 py-2.5"
          >
            Programa de Afiliados
          </TabsTrigger>
        </TabsList>

        <TabsContent value="afiliados" className="space-y-6">
          <AffiliateDashboard />
        </TabsContent>

        <TabsContent value="dashboard">
          <div className="p-6 text-center bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Dashboard Principal
            </h2>
            <p className="text-gray-500 mb-6">
              Aqui você verá um resumo de todas as suas atividades.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="documentos">
          <div className="p-6 text-center bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Meus Documentos
            </h2>
            <p className="text-gray-500 mb-6">
              Aqui você gerencia todos os seus documentos.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="contratos">
          <div className="p-6 text-center bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Meus Contratos
            </h2>
            <p className="text-gray-500 mb-6">
              Aqui você gerencia todos os seus contratos.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="cofre">
          <div className="p-6 text-center bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Cofre Digital
            </h2>
            <p className="text-gray-500 mb-6">
              Aqui você gerencia seus documentos mais importantes com segurança
              adicional.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
