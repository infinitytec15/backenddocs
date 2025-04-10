import React, { useState } from "react";
import DashboardLayout from "../dashboard/layout/DashboardLayout-pt";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Lock,
  Bell,
  Shield,
  CreditCard,
  LogOut,
  Mail,
  Phone,
  Globe,
  Building,
  MapPin,
} from "lucide-react";
import { useAuth } from "../../../supabase/auth";

const Profile = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("perfil");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Meu Perfil</h1>
        <p className="text-gray-500">
          Gerencie suas informações pessoais e configurações
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm lg:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
                  alt={user?.email || ""}
                />
                <AvatarFallback>
                  {user?.user_metadata?.full_name?.[0] || user?.email?.[0]}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold text-gray-900">
                {user?.user_metadata?.full_name || "Usuário"}
              </h2>
              <p className="text-gray-500">{user?.email}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                Alterar Foto
              </Button>
            </div>

            <div className="space-y-1">
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 h-10 rounded-xl text-sm font-medium ${activeTab === "perfil" ? "bg-blue-50 text-blue-600 hover:bg-blue-100" : "text-gray-700 hover:bg-gray-100"}`}
                onClick={() => handleTabChange("perfil")}
              >
                <User
                  className={`h-5 w-5 ${activeTab === "perfil" ? "text-blue-600" : "text-gray-500"}`}
                />
                Informações Pessoais
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 h-10 rounded-xl text-sm font-medium ${activeTab === "senha" ? "bg-blue-50 text-blue-600 hover:bg-blue-100" : "text-gray-700 hover:bg-gray-100"}`}
                onClick={() => handleTabChange("senha")}
              >
                <Lock
                  className={`h-5 w-5 ${activeTab === "senha" ? "text-blue-600" : "text-gray-500"}`}
                />
                Senha e Segurança
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 h-10 rounded-xl text-sm font-medium ${activeTab === "notificacoes" ? "bg-blue-50 text-blue-600 hover:bg-blue-100" : "text-gray-700 hover:bg-gray-100"}`}
                onClick={() => handleTabChange("notificacoes")}
              >
                <Bell
                  className={`h-5 w-5 ${activeTab === "notificacoes" ? "text-blue-600" : "text-gray-500"}`}
                />
                Notificações
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 h-10 rounded-xl text-sm font-medium ${activeTab === "privacidade" ? "bg-blue-50 text-blue-600 hover:bg-blue-100" : "text-gray-700 hover:bg-gray-100"}`}
                onClick={() => handleTabChange("privacidade")}
              >
                <Shield
                  className={`h-5 w-5 ${activeTab === "privacidade" ? "text-blue-600" : "text-gray-500"}`}
                />
                Privacidade
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 h-10 rounded-xl text-sm font-medium ${activeTab === "pagamento" ? "bg-blue-50 text-blue-600 hover:bg-blue-100" : "text-gray-700 hover:bg-gray-100"}`}
                onClick={() => handleTabChange("pagamento")}
              >
                <CreditCard
                  className={`h-5 w-5 ${activeTab === "pagamento" ? "text-blue-600" : "text-gray-500"}`}
                />
                Métodos de Pagamento
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-10 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={() => signOut()}
              >
                <LogOut className="h-5 w-5 text-red-500" />
                Sair
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm lg:col-span-3">
          <CardContent className="p-6">
            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsContent value="perfil" className="mt-0">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Informações Pessoais
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="fullName"
                          className="text-sm font-medium text-gray-700"
                        >
                          Nome Completo
                        </Label>
                        <Input
                          id="fullName"
                          placeholder="Seu nome completo"
                          defaultValue={user?.user_metadata?.full_name || ""}
                          className="h-10 rounded-lg border-gray-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-sm font-medium text-gray-700"
                        >
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue={user?.email || ""}
                          className="h-10 rounded-lg border-gray-200"
                          disabled
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="phone"
                          className="text-sm font-medium text-gray-700"
                        >
                          Telefone
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <Input
                            id="phone"
                            placeholder="(00) 00000-0000"
                            className="h-10 rounded-lg border-gray-200 pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="website"
                          className="text-sm font-medium text-gray-700"
                        >
                          Website
                        </Label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <Input
                            id="website"
                            placeholder="www.seusite.com.br"
                            className="h-10 rounded-lg border-gray-200 pl-10"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Informações da Empresa
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="company"
                          className="text-sm font-medium text-gray-700"
                        >
                          Nome da Empresa
                        </Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <Input
                            id="company"
                            placeholder="Nome da sua empresa"
                            className="h-10 rounded-lg border-gray-200 pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="position"
                          className="text-sm font-medium text-gray-700"
                        >
                          Cargo
                        </Label>
                        <Input
                          id="position"
                          placeholder="Seu cargo na empresa"
                          className="h-10 rounded-lg border-gray-200"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label
                          htmlFor="address"
                          className="text-sm font-medium text-gray-700"
                        >
                          Endereço
                        </Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <Input
                            id="address"
                            placeholder="Endereço completo"
                            className="h-10 rounded-lg border-gray-200 pl-10"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-6">
                      Salvar Alterações
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="senha" className="mt-0">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Senha e Segurança
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="currentPassword"
                        className="text-sm font-medium text-gray-700"
                      >
                        Senha Atual
                      </Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        placeholder="Digite sua senha atual"
                        className="h-10 rounded-lg border-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="newPassword"
                        className="text-sm font-medium text-gray-700"
                      >
                        Nova Senha
                      </Label>
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder="Digite sua nova senha"
                        className="h-10 rounded-lg border-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="confirmPassword"
                        className="text-sm font-medium text-gray-700"
                      >
                        Confirmar Nova Senha
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirme sua nova senha"
                        className="h-10 rounded-lg border-gray-200"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="text-md font-medium text-gray-900 mb-3">
                      Autenticação de Dois Fatores
                    </h4>
                    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Autenticação de Dois Fatores (2FA)
                        </p>
                        <p className="text-xs text-gray-500">
                          Adicione uma camada extra de segurança à sua conta
                        </p>
                      </div>
                      <Switch id="2fa" />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-6">
                      Atualizar Senha
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notificacoes" className="mt-0">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Preferências de Notificações
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Notificações por Email
                        </p>
                        <p className="text-xs text-gray-500">
                          Receba atualizações sobre documentos, contratos e
                          atividades da conta
                        </p>
                      </div>
                      <Switch id="emailNotifications" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Notificações no Sistema
                        </p>
                        <p className="text-xs text-gray-500">
                          Receba notificações dentro da plataforma
                        </p>
                      </div>
                      <Switch id="systemNotifications" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Lembretes de Vencimento
                        </p>
                        <p className="text-xs text-gray-500">
                          Receba lembretes sobre documentos e contratos próximos
                          do vencimento
                        </p>
                      </div>
                      <Switch id="expirationReminders" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Atualizações de Marketing
                        </p>
                        <p className="text-xs text-gray-500">
                          Receba novidades, dicas e ofertas especiais
                        </p>
                      </div>
                      <Switch id="marketingUpdates" />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-6">
                      Salvar Preferências
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="privacidade" className="mt-0">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Configurações de Privacidade
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Perfil Público
                        </p>
                        <p className="text-xs text-gray-500">
                          Permitir que outros usuários vejam seu perfil
                        </p>
                      </div>
                      <Switch id="publicProfile" />
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Histórico de Atividades
                        </p>
                        <p className="text-xs text-gray-500">
                          Armazenar histórico de suas atividades na plataforma
                        </p>
                      </div>
                      <Switch id="activityHistory" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Cookies de Análise
                        </p>
                        <p className="text-xs text-gray-500">
                          Permitir cookies para melhorar a experiência do
                          usuário
                        </p>
                      </div>
                      <Switch id="analyticsCookies" defaultChecked />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="text-md font-medium text-gray-900 mb-3">
                      Exportação e Exclusão de Dados
                    </h4>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        variant="outline"
                        className="border-gray-200 text-gray-700 hover:bg-gray-50"
                      >
                        Exportar Meus Dados
                      </Button>
                      <Button
                        variant="outline"
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        Solicitar Exclusão da Conta
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pagamento" className="mt-0">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Métodos de Pagamento
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center p-4 border border-gray-100 rounded-xl">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          Cartão de crédito terminando em 4242
                        </p>
                        <p className="text-xs text-gray-500">
                          Expira em 12/2025
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          Editar
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          Remover
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                    <Plus className="h-4 w-4" />
                    Adicionar Novo Método de Pagamento
                  </Button>

                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="text-md font-medium text-gray-900 mb-3">
                      Endereço de Cobrança
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="billingName"
                          className="text-sm font-medium text-gray-700"
                        >
                          Nome Completo
                        </Label>
                        <Input
                          id="billingName"
                          placeholder="Nome no cartão"
                          className="h-10 rounded-lg border-gray-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="billingAddress"
                          className="text-sm font-medium text-gray-700"
                        >
                          Endereço
                        </Label>
                        <Input
                          id="billingAddress"
                          placeholder="Endereço de cobrança"
                          className="h-10 rounded-lg border-gray-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="billingCity"
                          className="text-sm font-medium text-gray-700"
                        >
                          Cidade
                        </Label>
                        <Input
                          id="billingCity"
                          placeholder="Cidade"
                          className="h-10 rounded-lg border-gray-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="billingZip"
                          className="text-sm font-medium text-gray-700"
                        >
                          CEP
                        </Label>
                        <Input
                          id="billingZip"
                          placeholder="00000-000"
                          className="h-10 rounded-lg border-gray-200"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-6">
                        Salvar Endereço
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
