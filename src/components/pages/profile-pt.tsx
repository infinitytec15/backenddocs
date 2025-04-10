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
                onClick={() => signOut()