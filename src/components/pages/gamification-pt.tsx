import React from "react";
import DashboardLayout from "../dashboard/layout/DashboardLayout-pt";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  Trophy,
  Star,
  Gift,
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../../../supabase/auth";

const Gamification = () => {
  const { user } = useAuth();

  const achievements = [
    {
      id: 1,
      title: "Organizador Profissional",
      description: "Adicione 20 documentos ao sistema",
      progress: 100,
      completed: true,
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      color: "bg-green-100",
      textColor: "text-green-700",
    },
    {
      id: 2,
      title: "Mestre dos Contratos",
      description: "Crie e assine 10 contratos",
      progress: 80,
      completed: false,
      icon: <Clock className="h-5 w-5 text-yellow-500" />,
      color: "bg-yellow-100",
      textColor: "text-yellow-700",
    },
    {
      id: 3,
      title: "Guardião Digital",
      description: "Proteja 5 documentos no cofre digital",
      progress: 100,
      completed: true,
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      color: "bg-green-100",
      textColor: "text-green-700",
    },
    {
      id: 4,
      title: "Colaborador Ativo",
      description: "Compartilhe documentos com 5 pessoas",
      progress: 60,
      completed: false,
      icon: <Clock className="h-5 w-5 text-yellow-500" />,
      color: "bg-yellow-100",
      textColor: "text-yellow-700",
    },
    {
      id: 5,
      title: "Usuário Fiel",
      description: "Use o sistema por 30 dias consecutivos",
      progress: 40,
      completed: false,
      icon: <Clock className="h-5 w-5 text-yellow-500" />,
      color: "bg-yellow-100",
      textColor: "text-yellow-700",
    },
    {
      id: 6,
      title: "Especialista em Segurança",
      description: "Ative todas as opções de segurança da conta",
      progress: 100,
      completed: true,
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      color: "bg-green-100",
      textColor: "text-green-700",
    },
  ];

  const leaderboard = [
    {
      position: 1,
      name: "Carlos Santos",
      points: 2450,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    },
    {
      position: 2,
      name: "Maria Oliveira",
      points: 2320,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    },
    {
      position: 3,
      name: user?.user_metadata?.full_name || "Você",
      points: 1250,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`,
      isCurrentUser: true,
    },
    {
      position: 4,
      name: "Ana Pereira",
      points: 980,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    },
    {
      position: 5,
      name: "Pedro Costa",
      points: 750,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro",
    },
  ];

  const rewards = [
    {
      id: 1,
      title: "Desconto de 10% na renovação",
      points: 500,
      icon: <Gift className="h-5 w-5 text-pink-500" />,
      color: "bg-pink-100",
    },
    {
      id: 2,
      title: "Armazenamento extra (5GB)",
      points: 1000,
      icon: <Gift className="h-5 w-5 text-purple-500" />,
      color: "bg-purple-100",
    },
    {
      id: 3,
      title: "Acesso a modelos premium",
      points: 1500,
      icon: <Gift className="h-5 w-5 text-blue-500" />,
      color: "bg-blue-100",
    },
    {
      id: 4,
      title: "Upgrade para plano superior (1 mês)",
      points: 2500,
      icon: <Gift className="h-5 w-5 text-green-500" />,
      color: "bg-green-100",
    },
  ];

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Gamificação</h1>
        <p className="text-gray-500">
          Ganhe pontos, conquiste selos e troque por recompensas
        </p>
      </div>

      {/* Resumo de Pontos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  1.250 pontos
                </h2>
                <p className="text-gray-500">Nível 3: Usuário Avançado</p>
              </div>
              <div className="h-16 w-16 rounded-full bg-yellow-100 flex items-center justify-center">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="font-medium">
                  Progresso para o próximo nível
                </span>
                <span>1.250 / 2.000</span>
              </div>
              <Progress value={62.5} className="h-2.5 bg-gray-100" />
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge className="bg-green-100 text-green-700 border-green-200 px-3 py-1 rounded-full">
                <CheckCircle className="h-3.5 w-3.5 mr-1" /> 3 conquistas
              </Badge>
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 px-3 py-1 rounded-full">
                <Star className="h-3.5 w-3.5 mr-1" /> Posição #3
              </Badge>
              <Badge className="bg-purple-100 text-purple-700 border-purple-200 px-3 py-1 rounded-full">
                <TrendingUp className="h-3.5 w-3.5 mr-1" /> +18% este mês
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Como ganhar pontos
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                  <CheckCircle className="h-3.5 w-3.5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Adicionar documentos
                  </p>
                  <p className="text-xs text-gray-500">
                    +10 pontos por documento
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mr-2 mt-0.5">
                  <CheckCircle className="h-3.5 w-3.5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Criar contratos
                  </p>
                  <p className="text-xs text-gray-500">
                    +25 pontos por contrato
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-2 mt-0.5">
                  <CheckCircle className="h-3.5 w-3.5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Proteger documentos
                  </p>
                  <p className="text-xs text-gray-500">
                    +15 pontos por documento no cofre
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                  <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Uso diário do sistema
                  </p>
                  <p className="text-xs text-gray-500">
                    +5 pontos por dia de acesso
                  </p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Conquistas */}
      <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold text-gray-900">
            Conquistas e Selos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center mb-3">
                  <div
                    className={`h-10 w-10 rounded-full ${achievement.color} flex items-center justify-center mr-3`}
                  >
                    <Trophy className={`h-5 w-5 ${achievement.textColor}`} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {achievement.title}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {achievement.description}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span
                      className={`font-medium ${achievement.completed ? "text-green-600" : "text-gray-500"}`}
                    >
                      {achievement.progress}%
                    </span>
                    <span className="flex items-center">
                      {achievement.icon}
                    </span>
                  </div>
                  <Progress
                    value={achievement.progress}
                    className={`h-1.5 bg-gray-100 ${achievement.completed ? "text-green-500" : ""}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ranking e Recompensas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold text-gray-900">
              Ranking Semanal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaderboard.map((user, index) => (
                <div
                  key={index}
                  className={`flex items-center p-3 rounded-xl transition-colors ${user.isCurrentUser ? "bg-blue-50 border border-blue-100" : "hover:bg-gray-50"}`}
                >
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${index === 0 ? "bg-yellow-100 text-yellow-700" : index === 1 ? "bg-gray-200 text-gray-700" : index === 2 ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-700"}`}
                  >
                    {user.position}
                  </div>
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p
                      className={`text-sm font-medium ${user.isCurrentUser ? "text-blue-700" : "text-gray-900"}`}
                    >
                      {user.name}
                      {user.isCurrentUser && " (Você)"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user.points} pontos
                    </p>
                  </div>
                  {index < 3 && (
                    <div className="h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center">
                      <Trophy
                        className={`h-3.5 w-3.5 ${index === 0 ? "text-yellow-600" : index === 1 ? "text-gray-600" : "text-amber-600"}`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              className="w-full mt-4 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              Ver ranking completo
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold text-gray-900">
              Recompensas Disponíveis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rewards.map((reward) => (
                <div
                  key={reward.id}
                  className="flex items-center p-3 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <div
                    className={`h-10 w-10 rounded-full ${reward.color} flex items-center justify-center mr-3`}
                  >
                    {reward.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {reward.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {reward.points} pontos necessários
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`rounded-full ${reward.points <= 1250 ? "border-blue-200 text-blue-600 hover:bg-blue-50" : "border-gray-200 text-gray-400 cursor-not-allowed"}`}
                    disabled={reward.points > 1250}
                  >
                    {reward.points <= 1250 ? "Resgatar" : "Bloqueado"}
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">
                    Convide amigos e ganhe pontos
                  </h4>
                  <p className="text-xs text-gray-500">
                    Ganhe 100 pontos para cada amigo que se cadastrar
                  </p>
                </div>
              </div>
              <Button className="w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl">
                Convidar Amigos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Gamification;
