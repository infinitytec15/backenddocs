import {
  FileText,
  FileSignature,
  Lock,
  Award,
  Users,
  Settings,
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
  index: number;
}

function FeatureCard({
  icon,
  title,
  description,
  iconBg,
  iconColor,
}: FeatureCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:translate-y-[-5px]">
      <div
        className={`h-16 w-16 rounded-xl flex items-center justify-center mb-5 mx-auto ${iconBg}`}
      >
        <div className={`${iconColor}`}>{icon}</div>
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white text-center">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
        {description}
      </p>
    </div>
  );
}

export function FeaturesSection() {
  const features = [
    {
      icon: <FileText size={28} />,
      title: "Gestão de Documentos",
      description:
        "Organize, armazene e acesse seus documentos com facilidade e segurança.",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: <FileSignature size={28} />,
      title: "Contratos Inteligentes",
      description:
        "Crie e gerencie contratos dinâmicos com preenchimento automático e assinatura digital.",
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: <Lock size={28} />,
      title: "Cofre Digital",
      description:
        "Proteja seus documentos mais importantes com criptografia avançada.",
      iconBg: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      icon: <Award size={28} />,
      title: "Gamificação",
      description:
        "Ganhe pontos e recompensas enquanto utiliza o sistema de forma eficiente.",
      iconBg: "bg-yellow-100 dark:bg-yellow-900/30",
      iconColor: "text-yellow-600 dark:text-yellow-400",
    },
    {
      icon: <Users size={28} />,
      title: "Colaboração em Equipe",
      description:
        "Compartilhe documentos e contratos com sua equipe e defina permissões de acesso.",
      iconBg: "bg-red-100 dark:bg-red-900/30",
      iconColor: "text-red-600 dark:text-red-400",
    },
    {
      icon: <Settings size={28} />,
      title: "Personalização",
      description:
        "Adapte o sistema às necessidades específicas do seu negócio com opções flexíveis.",
      iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
      iconColor: "text-indigo-600 dark:text-indigo-400",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Funcionalidades Poderosas
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Tudo o que você precisa para gerenciar seus documentos e contratos
            em um só lugar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              iconBg={feature.iconBg}
              iconColor={feature.iconColor}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
