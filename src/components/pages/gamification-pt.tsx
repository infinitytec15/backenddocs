import React, { useState } from "react";
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
  Zap,
  Target,
  Sparkles,
  Flame,
  Crown,
  Medal,
  Rocket,
  Heart,
  Calendar,
  Share2,
  Shield,
  FileText,
  Bookmark,
  Repeat,
  ArrowUp,
  BarChart3,
  Lightbulb,
  Coins,
  Gem,
  Ticket,
  Layers,
} from "lucide-react";
import { useAuth } from "../../../supabase/auth";

const Gamification = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

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
      points: 200,
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
      points: 250,
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
      points: 150,
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
      points: 100,
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
      points: 300,
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
      points: 175,
    },
    {
      id: 7,
      title: "Explorador de Modelos",
      description: "Utilize 5 modelos diferentes de documentos",
      progress: 80,
      completed: false,
      icon: <Clock className="h-5 w-5 text-yellow-500" />,
      color: "bg-yellow-100",
      textColor: "text-yellow-700",
      points: 125,
    },
    {
      id: 8,
      title: "Mestre da Organização",
      description: "Crie 10 pastas e organize seus documentos",
      progress: 90,
      completed: false,
      icon: <Clock className="h-5 w-5 text-yellow-500" />,
      color: "bg-yellow-100",
      textColor: "text-yellow-700",
      points: 150,
    },
    {
      id: 9,
      title: "Comunicador Eficiente",
      description: "Envie 20 mensagens através da plataforma",
      progress: 100,
      completed: true,
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      color: "bg-green-100",
      textColor: "text-green-700",
      points: 200,
    },
  ];

  const leaderboard = [
    {
      position: 1,
      name: "Carlos Santos",
      points: 2450,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
      badges: 8,
      streak: 45,
    },
    {
      position: 2,
      name: "Maria Oliveira",
      points: 2320,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
      badges: 7,
      streak: 38,
    },
    {
      position: 3,
      name: user?.user_metadata?.full_name || "Você",
      points: 1250,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`,
      isCurrentUser: true,
      badges: 5,
      streak: 22,
    },
    {
      position: 4,
      name: "Ana Pereira",
      points: 980,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
      badges: 4,
      streak: 15,
    },
    {
      position: 5,
      name: "Pedro Costa",
      points: 750,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro",
      badges: 3,
      streak: 10,
    },
    {
      position: 6,
      name: "Juliana Mendes",
      points: 720,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juliana",
      badges: 3,
      streak: 8,
    },
    {
      position: 7,
      name: "Roberto Alves",
      points: 680,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto",
      badges: 2,
      streak: 7,
    },
    {
      position: 8,
      name: "Fernanda Lima",
      points: 650,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fernanda",
      badges: 2,
      streak: 6,
    },
  ];

  const rewards = [
    {
      id: 1,
      title: "Desconto de 10% na renovação",
      points: 500,
      icon: <Gift className="h-5 w-5 text-pink-500" />,
      color: "bg-pink-100",
      description: "Ganhe um desconto exclusivo na sua próxima renovação",
      popular: false,
    },
    {
      id: 2,
      title: "Armazenamento extra (5GB)",
      points: 1000,
      icon: <Layers className="h-5 w-5 text-purple-500" />,
      color: "bg-purple-100",
      description: "Aumente seu espaço de armazenamento por 3 meses",
      popular: true,
    },
    {
      id: 3,
      title: "Acesso a modelos premium",
      points: 1500,
      icon: <FileText className="h-5 w-5 text-blue-500" />,
      color: "bg-blue-100",
      description: "Desbloqueie modelos exclusivos por 2 meses",
      popular: false,
    },
    {
      id: 4,
      title: "Upgrade para plano superior (1 mês)",
      points: 2500,
      icon: <Crown className="h-5 w-5 text-amber-500" />,
      color: "bg-amber-100",
      description: "Experimente todos os recursos do plano superior",
      popular: true,
    },
    {
      id: 5,
      title: "Certificado de Usuário Expert",
      points: 800,
      icon: <Award className="h-5 w-5 text-green-500" />,
      color: "bg-green-100",
      description: "Receba um certificado digital para compartilhar",
      popular: false,
    },
    {
      id: 6,
      title: "Sessão de consultoria (30min)",
      points: 2000,
      icon: <Lightbulb className="h-5 w-5 text-yellow-500" />,
      color: "bg-yellow-100",
      description: "Agende uma sessão com nossos especialistas",
      popular: false,
    },
  ];

  const pointsActivities = [
    {
      activity: "Adicionar documento",
      points: 10,
      icon: <FileText className="h-4 w-4 text-blue-600" />,
      color: "bg-blue-100",
    },
    {
      activity: "Criar contrato",
      points: 25,
      icon: <FileText className="h-4 w-4 text-purple-600" />,
      color: "bg-purple-100",
    },
    {
      activity: "Proteger documento no cofre",
      points: 15,
      icon: <Shield className="h-4 w-4 text-indigo-600" />,
      color: "bg-indigo-100",
    },
    {
      activity: "Acesso diário",
      points: 5,
      icon: <Calendar className="h-4 w-4 text-green-600" />,
      color: "bg-green-100",
    },
    {
      activity: "Compartilhar documento",
      points: 8,
      icon: <Share2 className="h-4 w-4 text-cyan-600" />,
      color: "bg-cyan-100",
    },
    {
      activity: "Completar perfil",
      points: 50,
      icon: <User className="h-4 w-4 text-orange-600" />,
      color: "bg-orange-100",
    },
    {
      activity: "Convidar amigo",
      points: 100,
      icon: <Users className="h-4 w-4 text-pink-600" />,
      color: "bg-pink-100",
    },
    {
      activity: "Assinar contrato",
      points: 20,
      icon: <Bookmark className="h-4 w-4 text-amber-600" />,
      color: "bg-amber-100",
    },
  ];

  const badges = [
    {
      name: "Iniciante",
      icon: <Star className="h-8 w-8 text-blue-500" />,
      description: "Primeiros passos no sistema",
      color: "bg-blue-100",
      unlocked: true,
    },
    {
      name: "Explorador",
      icon: <Rocket className="h-8 w-8 text-purple-500" />,
      description: "Explorou todas as seções do sistema",
      color: "bg-purple-100",
      unlocked: true,
    },
    {
      name: "Organizador",
      icon: <Layers className="h-8 w-8 text-indigo-500" />,
      description: "Mantém seus documentos bem organizados",
      color: "bg-indigo-100",
      unlocked: true,
    },
    {
      name: "Protetor",
      icon: <Shield className="h-8 w-8 text-green-500" />,
      description: "Prioriza a segurança dos documentos",
      color: "bg-green-100",
      unlocked: true,
    },
    {
      name: "Colaborador",
      icon: <Users className="h-8 w-8 text-cyan-500" />,
      description: "Compartilha e colabora ativamente",
      color: "bg-cyan-100",
      unlocked: true,
    },
    {
      name: "Mestre dos Contratos",
      icon: <FileText className="h-8 w-8 text-amber-500" />,
      description: "Especialista em gerenciar contratos",
      color: "bg-amber-100",
      unlocked: false,
    },
    {
      name: "Usuário Fiel",
      icon: <Heart className="h-8 w-8 text-red-500" />,
      description: "Usa o sistema consistentemente",
      color: "bg-red-100",
      unlocked: false,
    },
    {
      name: "Campeão",
      icon: <Crown className="h-8 w-8 text-yellow-500" />,
      description: "Alcançou o topo do ranking",
      color: "bg-yellow-100",
      unlocked: false,
    },
  ];

  const levels = [
    {
      level: 1,
      name: "Iniciante",
      minPoints: 0,
      maxPoints: 500,
      color: "bg-blue-500",
    },
    {
      level: 2,
      name: "Aprendiz",
      minPoints: 500,
      maxPoints: 1000,
      color: "bg-indigo-500",
    },
    {
      level: 3,
      name: "Avançado",
      minPoints: 1000,
      maxPoints: 2000,
      color: "bg-purple-500",
    },
    {
      level: 4,
      name: "Especialista",
      minPoints: 2000,
      maxPoints: 3500,
      color: "bg-pink-500",
    },
    {
      level: 5,
      name: "Mestre",
      minPoints: 3500,
      maxPoints: 5000,
      color: "bg-amber-500",
    },
    {
      level: 6,
      name: "Lendário",
      minPoints: 5000,
      maxPoints: null,
      color: "bg-red-500",
    },
  ];

  // Encontrar o nível atual do usuário
  const userPoints = 1250;
  const currentLevel = levels.find(
    (level) =>
      userPoints >= level.minPoints &&
      (level.maxPoints === null || userPoints < level.maxPoints),
  );

  // Calcular progresso para o próximo nível
  const nextLevel = levels.find(
    (level) => level.level === (currentLevel?.level || 0) + 1,
  );
  const progressToNextLevel = nextLevel
    ? ((userPoints - (currentLevel?.minPoints || 0)) /
        ((nextLevel?.minPoints || 0) - (currentLevel?.minPoints || 0))) *
      100
    : 100;

  // Função para renderizar o ícone de nível
  const renderLevelIcon = (level) => {
    switch (level) {
      case 1:
        return <Star className="h-6 w-6" />;
      case 2:
        return <Zap className="h-6 w-6" />;
      case 3:
        return <Target className="h-6 w-6" />;
      case 4:
        return <Medal className="h-6 w-6" />;
      case 5:
        return <Trophy className="h-6 w-6" />;
      case 6:
        return <Crown className="h-6 w-6" />;
      default:
        return <Star className="h-6 w-6" />;
    }
  };

  return (
    <DashboardLayout>
      {/* Header com animação */}
      <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-lg">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
        <div className="absolute -bottom-12 -left-12 h-60 w-60 rounded-full bg-white/10 blur-3xl"></div>

        <div className="relative z-10">
          <h1 className="mb-2 text-3xl font-bold">Gamificação</h1>
          <p className="mb-6 text-lg text-blue-100">
            Ganhe pontos, conquiste selos e troque por recompensas exclusivas
          </p>

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => setActiveTab("overview")}
              className={`rounded-full px-4 py-2 ${activeTab === "overview" ? "bg-white text-blue-700" : "bg-white/20 hover:bg-white/30"}`}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Visão Geral
            </Button>
            <Button
              onClick={() => setActiveTab("achievements")}
              className={`rounded-full px-4 py-2 ${activeTab === "achievements" ? "bg-white text-blue-700" : "bg-white/20 hover:bg-white/30"}`}
            >
              <Trophy className="mr-2 h-4 w-4" />
              Conquistas
            </Button>
            <Button
              onClick={() => setActiveTab("rewards")}
              className={`rounded-full px-4 py-2 ${activeTab === "rewards" ? "bg-white text-blue-700" : "bg-white/20 hover:bg-white/30"}`}
            >
              <Gift className="mr-2 h-4 w-4" />
              Recompensas
            </Button>
            <Button
              onClick={() => setActiveTab("leaderboard")}
              className={`rounded-full px-4 py-2 ${activeTab === "leaderboard" ? "bg-white text-blue-700" : "bg-white/20 hover:bg-white/30"}`}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Ranking
            </Button>
            <Button
              onClick={() => setActiveTab("badges")}
              className={`rounded-full px-4 py-2 ${activeTab === "badges" ? "bg-white text-blue-700" : "bg-white/20 hover:bg-white/30"}`}
            >
              <Award className="mr-2 h-4 w-4" />
              Selos
            </Button>
          </div>
        </div>
      </div>

      {activeTab === "overview" && (
        <>
          {/* Resumo de Pontos e Nível */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-6">
            <Card className="col-span-2 border border-gray-100 bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden">
              <div className="relative p-6">
                <div className="absolute -right-10 top-0 h-32 w-32 rounded-full bg-blue-50 opacity-70 blur-2xl"></div>

                <div className="relative z-10 flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {userPoints.toLocaleString()} pontos
                    </h2>
                    <p className="text-gray-500 flex items-center">
                      <span
                        className={`mr-2 h-3 w-3 rounded-full ${currentLevel?.color}`}
                      ></span>
                      Nível {currentLevel?.level}: {currentLevel?.name}
                    </p>
                  </div>
                  <div
                    className={`h-16 w-16 rounded-full ${currentLevel?.color} bg-opacity-20 flex items-center justify-center`}
                  >
                    {renderLevelIcon(currentLevel?.level)}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">
                      Progresso para Nível {nextLevel?.level || "Máximo"}
                    </span>
                    <span>
                      {userPoints.toLocaleString()} /{" "}
                      {nextLevel?.minPoints?.toLocaleString() || "Máximo"}
                    </span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={`h-full ${currentLevel?.color}`}
                      style={{
                        width: `${progressToNextLevel}%`,
                        transition: "width 1s ease-in-out",
                      }}
                    ></div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-green-100 text-green-700 border-green-200 px-3 py-1 rounded-full">
                    <CheckCircle className="h-3.5 w-3.5 mr-1" />{" "}
                    {achievements.filter((a) => a.completed).length} conquistas
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200 px-3 py-1 rounded-full">
                    <Star className="h-3.5 w-3.5 mr-1" /> Posição #
                    {leaderboard.find((u) => u.isCurrentUser)?.position || 3}
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-700 border-purple-200 px-3 py-1 rounded-full">
                    <TrendingUp className="h-3.5 w-3.5 mr-1" /> +18% este mês
                  </Badge>
                  <Badge className="bg-amber-100 text-amber-700 border-amber-200 px-3 py-1 rounded-full">
                    <Flame className="h-3.5 w-3.5 mr-1" /> 22 dias consecutivos
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="border border-gray-100 bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden">
              <CardHeader className="pb-2 pt-5">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Como ganhar pontos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 max-h-[280px] overflow-y-auto pr-2">
                  {pointsActivities.map((activity, index) => (
                    <li
                      key={index}
                      className="flex items-start group hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    >
                      <div
                        className={`h-7 w-7 rounded-full ${activity.color} flex items-center justify-center mr-2 mt-0.5`}
                      >
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {activity.activity}
                        </p>
                        <div className="flex items-center">
                          <p className="text-xs text-gray-500">
                            +{activity.points} pontos
                          </p>
                          <div className="ml-2 flex">
                            {Array.from({
                              length: Math.min(
                                5,
                                Math.ceil(activity.points / 10),
                              ),
                            }).map((_, i) => (
                              <Coins
                                key={i}
                                className="h-3 w-3 text-amber-400"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Próximas Conquistas e Recompensas Populares */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-6">
            <Card className="border border-gray-100 bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden">
              <CardHeader className="pb-2 pt-5">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-amber-500" />
                  Próximas Conquistas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements
                    .filter((a) => !a.completed)
                    .slice(0, 3)
                    .map((achievement) => (
                      <div
                        key={achievement.id}
                        className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow group hover:border-blue-100"
                      >
                        <div className="flex items-center mb-3">
                          <div
                            className={`h-10 w-10 rounded-full ${achievement.color} flex items-center justify-center mr-3 group-hover:scale-110 transition-transform`}
                          >
                            <Trophy
                              className={`h-5 w-5 ${achievement.textColor}`}
                            />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                              {achievement.title}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {achievement.description}
                            </p>
                          </div>
                          <div className="ml-auto text-xs font-semibold text-amber-500 bg-amber-50 px-2 py-1 rounded-full">
                            +{achievement.points} pts
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="font-medium text-gray-500">
                              {achievement.progress}%
                            </span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                            <div
                              className="h-full bg-blue-500"
                              style={{
                                width: `${achievement.progress}%`,
                                transition: "width 1s ease-in-out",
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <Button
                  variant="ghost"
                  className="w-full mt-4 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  onClick={() => setActiveTab("achievements")}
                >
                  Ver todas as conquistas
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-gray-100 bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden">
              <CardHeader className="pb-2 pt-5">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                  <Gift className="h-5 w-5 mr-2 text-pink-500" />
                  Recompensas Populares
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rewards
                    .filter((r) => r.popular)
                    .map((reward) => (
                      <div
                        key={reward.id}
                        className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow group hover:border-pink-100"
                      >
                        <div className="flex items-center">
                          <div
                            className={`h-10 w-10 rounded-full ${reward.color} flex items-center justify-center mr-3 group-hover:scale-110 transition-transform`}
                          >
                            {reward.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900 group-hover:text-pink-600 transition-colors">
                              {reward.title}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {reward.description}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className={`rounded-full ml-2 ${reward.points <= userPoints ? "border-pink-200 text-pink-600 hover:bg-pink-50" : "border-gray-200 text-gray-400 cursor-not-allowed"}`}
                            disabled={reward.points > userPoints}
                          >
                            {reward.points <= userPoints
                              ? "Resgatar"
                              : `${reward.points} pts`}
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
                <Button
                  variant="ghost"
                  className="w-full mt-4 text-pink-600 hover:text-pink-700 hover:bg-pink-50"
                  onClick={() => setActiveTab("rewards")}
                >
                  Ver todas as recompensas
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Ranking e Selos */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card className="border border-gray-100 bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden">
              <CardHeader className="pb-2 pt-5">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
                  Ranking Semanal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.slice(0, 5).map((user, index) => (
                    <div
                      key={index}
                      className={`flex items-center p-3 rounded-xl transition-colors ${user.isCurrentUser ? "bg-blue-50 border border-blue-100" : "hover:bg-gray-50"}`}
                    >
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${index === 0 ? "bg-yellow-100 text-yellow-700" : index === 1 ? "bg-gray-200 text-gray-700" : index === 2 ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-700"}`}
                      >
                        {user.position}
                      </div>
                      <Avatar className="h-10 w-10 mr-3 border-2 border-white shadow-sm">
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
                        <div className="flex items-center">
                          <p className="text-xs text-gray-500 mr-2">
                            {user.points} pontos
                          </p>
                          <Badge className="bg-amber-50 text-amber-700 text-xs px-1.5 py-0.5 rounded-sm">
                            <Flame className="h-3 w-3 mr-0.5" />
                            {user.streak} dias
                          </Badge>
                        </div>
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
                  onClick={() => setActiveTab("leaderboard")}
                >
                  Ver ranking completo
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-gray-100 bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden">
              <CardHeader className="pb-2 pt-5">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-indigo-500" />
                  Seus Selos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {badges.slice(0, 8).map((badge, index) => (
                    <div
                      key={index}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl ${badge.unlocked ? badge.color : "bg-gray-100"} hover:shadow-sm transition-all cursor-pointer group`}
                    >
                      <div className="mb-2 group-hover:scale-110 transition-transform">
                        {badge.unlocked ? (
                          badge.icon
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                            <Lock className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                      <p
                        className={`text-xs font-medium text-center ${badge.unlocked ? "text-gray-900" : "text-gray-500"}`}
                      >
                        {badge.name}
                      </p>
                    </div>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  className="w-full mt-4 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                  onClick={() => setActiveTab("badges")}
                >
                  Ver todos os selos
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {activeTab === "achievements" && (
        <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
              <Trophy className="h-6 w-6 mr-2 text-amber-500" />
              Conquistas e Desafios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`border ${achievement.completed ? "border-green-100" : "border-gray-100"} rounded-xl p-4 hover:shadow-sm transition-shadow group`}
                >
                  <div className="flex items-center mb-3">
                    <div
                      className={`h-12 w-12 rounded-full ${achievement.color} flex items-center justify-center mr-3 group-hover:scale-110 transition-transform`}
                    >
                      <Trophy className={`h-6 w-6 ${achievement.textColor}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {achievement.title}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {achievement.description}
                      </p>
                    </div>
                    <div className="ml-2 text-xs font-semibold text-amber-500 bg-amber-50 px-2 py-1 rounded-full">
                      +{achievement.points} pts
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
                        {achievement.completed ? (
                          <Badge className="bg-green-100 text-green-700 px-2 py-0.5">
                            <CheckCircle className="h-3 w-3 mr-1" /> Completo
                          </Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-700 px-2 py-0.5">
                            <Clock className="h-3 w-3 mr-1" /> Em progresso
                          </Badge>
                        )}
                      </span>
                    </div>
                    <Progress
                      value={achievement.progress}
                      className={`h-2 bg-gray-100 ${achievement.completed ? "text-green-500" : "text-blue-500"}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "rewards" && (
        <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
              <Gift className="h-6 w-6 mr-2 text-pink-500" />
              Recompensas Disponíveis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {rewards.map((reward) => (
                <div
                  key={reward.id}
                  className="flex items-center p-4 border border-gray-100 hover:border-pink-100 rounded-xl transition-all hover:shadow-sm group"
                >
                  <div
                    className={`h-14 w-14 rounded-full ${reward.color} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform`}
                  >
                    {reward.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <h3 className="text-base font-medium text-gray-900 group-hover:text-pink-600 transition-colors">
                        {reward.title}
                      </h3>
                      {reward.popular && (
                        <Badge className="ml-2 bg-pink-100 text-pink-700 px-2 py-0.5 text-xs">
                          <Flame className="h-3 w-3 mr-1" /> Popular
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      {reward.description}
                    </p>
                    <div className="flex items-center">
                      <div className="flex items-center mr-4">
                        <Coins className="h-4 w-4 text-amber-500 mr-1" />
                        <span className="text-sm font-medium text-gray-700">
                          {reward.points} pontos
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`rounded-full ${reward.points <= userPoints ? "border-pink-200 text-pink-600 hover:bg-pink-50" : "border-gray-200 text-gray-400 cursor-not-allowed"}`}
                        disabled={reward.points > userPoints}
                      >
                        {reward.points <= userPoints
                          ? "Resgatar"
                          : "Pontos insuficientes"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Convide amigos e ganhe pontos
                  </h3>
                  <p className="text-sm text-gray-600">
                    Ganhe 100 pontos para cada amigo que se cadastrar usando seu
                    link
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 bg-white rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-500 flex items-center">
                  https://docflow.com.br/convite/seu-codigo-unico
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartilhar Link
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "leaderboard" && (
        <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
              <BarChart3 className="h-6 w-6 mr-2 text-blue-500" />
              Ranking de Usuários
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Top 3 com destaque */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                {leaderboard.slice(0, 3).map((user, index) => (
                  <div
                    key={index}
                    className={`flex-1 rounded-xl p-5 ${index === 0 ? "bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-100" : index === 1 ? "bg-gradient-to-br from-gray-50 to-slate-50 border border-gray-200" : "bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100"} ${user.isCurrentUser ? "ring-2 ring-blue-400 ring-offset-2" : ""}`}
                  >
                    <div className="flex flex-col items-center">
                      <div className="relative mb-3">
                        <div
                          className={`absolute -top-1 -right-1 h-6 w-6 rounded-full ${index === 0 ? "bg-yellow-400" : index === 1 ? "bg-gray-400" : "bg-amber-400"} flex items-center justify-center text-white font-bold text-xs z-10`}
                        >
                          {user.position}
                        </div>
                        <Avatar
                          className={`h-16 w-16 border-4 ${index === 0 ? "border-yellow-300" : index === 1 ? "border-gray-300" : "border-amber-300"}`}
                        >
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                      </div>
                      <h3 className="text-base font-semibold text-gray-900 mb-1">
                        {user.name}
                        {user.isCurrentUser && " (Você)"}
                      </h3>
                      <div className="flex items-center mb-2">
                        <Coins className="h-4 w-4 text-amber-500 mr-1" />
                        <span className="font-bold text-gray-700">
                          {user.points} pontos
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-purple-100 text-purple-700 px-2 py-0.5">
                          <Award className="h-3 w-3 mr-1" /> {user.badges} selos
                        </Badge>
                        <Badge className="bg-red-100 text-red-700 px-2 py-0.5">
                          <Flame className="h-3 w-3 mr-1" /> {user.streak} dias
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Restante do ranking */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Outros Participantes
                </h3>
                <div className="space-y-3">
                  {leaderboard.slice(3).map((user, index) => (
                    <div
                      key={index}
                      className={`flex items-center p-3 rounded-xl transition-colors ${user.isCurrentUser ? "bg-blue-50 border border-blue-100" : "bg-white hover:bg-gray-50 border border-gray-100"}`}
                    >
                      <div className="h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center mr-3 text-sm font-medium text-gray-700">
                        {user.position}
                      </div>
                      <Avatar className="h-9 w-9 mr-3">
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
                        <div className="flex items-center">
                          <p className="text-xs text-gray-500 mr-2">
                            {user.points} pontos
                          </p>
                          <Badge className="bg-red-50 text-red-700 text-xs px-1.5 py-0.5 rounded-sm">
                            <Flame className="h-3 w-3 mr-0.5" />
                            {user.streak} dias
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Badge className="bg-purple-50 text-purple-700 text-xs px-1.5 py-0.5 rounded-sm mr-2">
                          <Award className="h-3 w-3 mr-0.5" />
                          {user.badges}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "badges" && (
        <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
              <Award className="h-6 w-6 mr-2 text-indigo-500" />
              Selos e Conquistas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className={`p-5 rounded-xl ${badge.unlocked ? badge.color : "bg-gray-100"} border ${badge.unlocked ? "border-" + badge.color.replace("bg-", "").replace("-100", "-200") : "border-gray-200"} hover:shadow-md transition-all group cursor-pointer`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                      {badge.unlocked ? (
                        badge.icon
                      ) : (
                        <Lock className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                    <h3
                      className={`text-base font-semibold mb-2 ${badge.unlocked ? "text-gray-900" : "text-gray-500"}`}
                    >
                      {badge.name}
                    </h3>
                    <p
                      className={`text-sm ${badge.unlocked ? "text-gray-700" : "text-gray-500"}`}
                    >
                      {badge.description}
                    </p>
                    {badge.unlocked ? (
                      <Badge className="mt-3 bg-green-100 text-green-700 px-2 py-1">
                        <CheckCircle className="h-3 w-3 mr-1" /> Desbloqueado
                      </Badge>
                    ) : (
                      <Badge className="mt-3 bg-gray-200 text-gray-600 px-2 py-1">
                        <Lock className="h-3 w-3 mr-1" /> Bloqueado
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
};

export default Gamification;

const User = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
};

const Lock = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
};
