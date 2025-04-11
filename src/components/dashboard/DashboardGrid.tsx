import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  BarChart2,
  Users,
  Clock,
  FileText,
  FileSignature,
  Shield,
  Award,
  ChevronRight,
  Link as LinkIcon,
  Upload,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
} from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Skeleton } from "@/components/ui/skeleton";

interface ProjectCardProps {
  title: string;
  progress: number;
  team: Array<{ name: string; avatar: string }>;
  dueDate: string;
}

interface ActivityProps {
  icon: React.ReactNode;
  title: string;
  time: string;
  avatar: string;
  name: string;
}

interface DashboardGridProps {
  projects?: ProjectCardProps[];
  isLoading?: boolean;
  onTabChange?: (tab: string) => void;
  userName?: string;
  activities?: ActivityProps[];
}

const defaultProjects: ProjectCardProps[] = [
  {
    title: "Website Redesign",
    progress: 75,
    team: [
      {
        name: "Alice",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
      },
      {
        name: "Bob",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
      },
      {
        name: "Charlie",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
      },
    ],
    dueDate: "2024-04-15",
  },
  {
    title: "Mobile App Development",
    progress: 45,
    team: [
      {
        name: "David",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      },
      {
        name: "Eve",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eve",
      },
    ],
    dueDate: "2024-05-01",
  },
  {
    title: "Marketing Campaign",
    progress: 90,
    team: [
      {
        name: "Frank",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Frank",
      },
      {
        name: "Grace",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Grace",
      },
      {
        name: "Henry",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Henry",
      },
    ],
    dueDate: "2024-03-30",
  },
];

const defaultActivities: ActivityProps[] = [
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
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=User",
    name: "Você",
  },
];

const ProjectCard = ({ title, progress, team, dueDate }: ProjectCardProps) => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium text-gray-900">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center">
          <BarChart2 className="h-4 w-4 text-gray-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-gray-500">Progress</span>
              <span className="text-gray-900">{progress}%</span>
            </div>
            <Progress
              value={progress}
              className="h-2 bg-gray-100 rounded-full"
              style={
                {
                  backgroundColor: "rgb(243, 244, 246)",
                } as React.CSSProperties
              }
            />
          </div>
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <Clock className="h-4 w-4" />
              <span>Due {dueDate}</span>
            </div>
            <div className="flex -space-x-2">
              {team.map((member, i) => (
                <Avatar
                  key={i}
                  className="h-7 w-7 border-2 border-white shadow-sm"
                >
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="bg-blue-100 text-blue-800 font-medium">
                    {member.name[0]}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const DashboardGrid = ({
  projects = defaultProjects,
  isLoading = false,
  onTabChange = () => {},
  userName = "Usuário",
  activities = defaultActivities,
}: DashboardGridProps) => {
  const [loading, setLoading] = useState(isLoading);

  // Update the userName in activities
  const updatedActivities = activities.map((activity) => {
    if (activity.name === "Você") {
      return {
        ...activity,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`,
      };
    }
    return activity;
  });

  // Simulate loading for demo purposes
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Handle file upload
  const handleFileUpload = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.png";
    fileInput.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        // Here you would implement the actual file upload logic
        console.log("File selected for upload:", file.name);
        // For demo purposes, show an alert
        alert(`Iniciando upload de ${file.name}`);
      }
    };
    fileInput.click();
  };

  if (loading) {
    return (
      <div className="p-6 h-full">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <Card
              key={index}
              className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm h-[220px] flex items-center justify-center"
            >
              <div className="flex flex-col items-center justify-center p-6">
                <div className="relative">
                  <div className="h-12 w-12 rounded-full border-4 border-gray-100 border-t-blue-500 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-4 w-4 rounded-full bg-blue-500/20 animate-pulse" />
                  </div>
                </div>
                <p className="mt-4 text-sm font-medium text-gray-500">
                  Loading project data...
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Summary Cards */}
        <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium text-gray-900">
              Total Projects
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
              <BarChart2 className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900">
              {projects.length}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Active projects this month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium text-gray-900">
              Team Members
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-purple-50 flex items-center justify-center">
              <Users className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900">12</div>
            <p className="text-sm text-gray-500 mt-1">Active contributors</p>
          </CardContent>
        </Card>
        <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium text-gray-900">
              Upcoming Deadlines
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-orange-50 flex items-center justify-center">
              <CalendarDays className="h-4 w-4 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900">5</div>
            <p className="text-sm text-gray-500 mt-1">Due this week</p>
          </CardContent>
        </Card>

        {/* Project Cards */}
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}

        {/* Quick Action Buttons */}
        <div className="lg:col-span-3 mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white h-auto py-3 rounded-xl flex flex-col items-center justify-center gap-2"
              onClick={handleFileUpload}
            >
              <Upload className="h-5 w-5" />
              <span className="text-sm font-medium">Upload Documento</span>
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white h-auto py-3 rounded-xl flex flex-col items-center justify-center gap-2"
              onClick={() => onTabChange("contratos")}
            >
              <FileSignature className="h-5 w-5" />
              <span className="text-sm font-medium">Criar Contrato</span>
            </Button>
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 text-white h-auto py-3 rounded-xl flex flex-col items-center justify-center gap-2"
              onClick={() => onTabChange("cofre")}
            >
              <Shield className="h-5 w-5" />
              <span className="text-sm font-medium">Proteger Arquivo</span>
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white h-auto py-3 rounded-xl flex flex-col items-center justify-center gap-2"
              onClick={() => {
                // In a real app, this would open a sharing modal
                alert(
                  "Funcionalidade de indicação de amigo será implementada em breve!",
                );
              }}
            >
              <LinkIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Indicar Amigo</span>
            </Button>
          </div>
        </div>

        {/* Recent Activities Section */}
        <div className="lg:col-span-2">
          <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm">
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
                {updatedActivities.map((activity, index) => (
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
                      <AvatarImage src={activity.avatar} alt={activity.name} />
                      <AvatarFallback>{activity.name[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                className="w-full mt-4 text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-sm"
              >
                Ver todas as atividades
                <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Storage Section */}
        <div className="lg:col-span-1">
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
                    <span className="text-gray-500">Espaço utilizado</span>
                    <span className="text-gray-900 font-medium">
                      2.4 GB / 10 GB
                    </span>
                  </div>
                  <Progress value={24} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
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
                      1.2 GB
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
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
                      0.8 GB
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
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
                      0.4 GB
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={handleFileUpload}
                >
                  <Upload className="h-4 w-4 mr-2" /> Fazer upload
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardGrid;
