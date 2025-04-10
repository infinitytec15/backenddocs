import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Trophy, Star, Award, Zap, Target, TrendingUp } from "lucide-react";

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  index: number;
}

function BenefitCard({ icon, title, description, color }: BenefitCardProps) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700`}
    >
      <div
        className={`h-14 w-14 rounded-full ${color} flex items-center justify-center mb-4`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
    </div>
  );
}

export function BenefitsPackageSection() {
  const benefits = [
    {
      icon: <Trophy className="h-7 w-7 text-white" />,
      title: "Sistema de Pontuação",
      description:
        "Ganhe pontos ao completar tarefas e manter seus documentos organizados.",
      color: "bg-amber-500",
    },
    {
      icon: <Star className="h-7 w-7 text-white" />,
      title: "Níveis de Experiência",
      description:
        "Evolua de iniciante a especialista conforme utiliza as funcionalidades do sistema.",
      color: "bg-blue-500",
    },
    {
      icon: <Award className="h-7 w-7 text-white" />,
      title: "Conquistas Desbloqueáveis",
      description:
        "Desbloqueie conquistas especiais ao atingir marcos importantes na plataforma.",
      color: "bg-purple-500",
    },
    {
      icon: <Zap className="h-7 w-7 text-white" />,
      title: "Desafios Semanais",
      description:
        "Participe de desafios semanais para ganhar pontos extras e recompensas exclusivas.",
      color: "bg-green-500",
    },
    {
      icon: <Target className="h-7 w-7 text-white" />,
      title: "Metas Personalizadas",
      description:
        "Defina suas próprias metas de produtividade e acompanhe seu progresso.",
      color: "bg-red-500",
    },
    {
      icon: <TrendingUp className="h-7 w-7 text-white" />,
      title: "Ranking de Usuários",
      description:
        "Compare seu desempenho com outros usuários e suba no ranking da plataforma.",
      color: "bg-indigo-500",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-brand-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Gamificação que Transforma Produtividade
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Torne a gestão de documentos mais engajante e divertida com nosso
            sistema de gamificação exclusivo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              color={benefit.color}
              index={index}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/gamificacao">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg h-12 px-8">
              Saiba Mais Sobre Gamificação
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
