import { useEffect, useRef, useState } from "react";
import {
  FileText,
  FileSignature,
  Lock,
  Award,
  Users,
  Settings,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FeatureIconScene } from "./3d/FeatureIconScene";

gsap.registerPlugin(ScrollTrigger);

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
  index: number;
  iconType?: "document" | "shield" | "key" | "gear";
  use3DIcon?: boolean;
}

function FeatureCard({
  icon,
  title,
  description,
  iconBg,
  iconColor,
  index,
  iconType = "document",
  use3DIcon = true,
}: FeatureCardProps) {
  return (
    <div className="feature-card scroll-fade-in bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:translate-y-[-5px]">
      {use3DIcon ? (
        <div className="h-24 w-24 mb-5 mx-auto">
          <FeatureIconScene
            iconType={iconType}
            color={iconColor.replace("text-", "")}
            className="cursor-pointer"
            interactive={false}
            scale={1.2}
          />
        </div>
      ) : (
        <div
          className={`h-16 w-16 rounded-xl flex items-center justify-center mb-5 mx-auto ${iconBg}`}
        >
          <div className={`${iconColor}`}>{icon}</div>
        </div>
      )}
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Ensure component stays visible
    setIsVisible(true);

    const ctx = gsap.context(() => {
      // Animação do título da seção
      gsap.from(".features-title", {
        scrollTrigger: {
          trigger: ".features-title",
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
      });

      // Animação dos cards de recursos
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 70%",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <FileText size={28} />,
      title: "Gestão de Documentos",
      description:
        "Organize, armazene e acesse seus documentos com facilidade e segurança.",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
      iconType: "document",
    },
    {
      icon: <FileSignature size={28} />,
      title: "Contratos Inteligentes",
      description:
        "Crie e gerencie contratos dinâmicos com preenchimento automático e assinatura digital.",
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
      iconType: "document",
    },
    {
      icon: <Lock size={28} />,
      title: "Cofre Digital",
      description:
        "Proteja seus documentos mais importantes com criptografia avançada.",
      iconBg: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400",
      iconType: "shield",
    },
    {
      icon: <Award size={28} />,
      title: "Gamificação",
      description:
        "Ganhe pontos e recompensas enquanto utiliza o sistema de forma eficiente.",
      iconBg: "bg-yellow-100 dark:bg-yellow-900/30",
      iconColor: "text-yellow-600 dark:text-yellow-400",
      iconType: "key",
    },
    {
      icon: <Users size={28} />,
      title: "Colaboração em Equipe",
      description:
        "Compartilhe documentos e contratos com sua equipe e defina permissões de acesso.",
      iconBg: "bg-red-100 dark:bg-red-900/30",
      iconColor: "text-red-600 dark:text-red-400",
      iconType: "key",
    },
    {
      icon: <Settings size={28} />,
      title: "Personalização",
      description:
        "Adapte o sistema às necessidades específicas do seu negócio com opções flexíveis.",
      iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
      iconColor: "text-indigo-600 dark:text-indigo-400",
      iconType: "gear",
    },
  ];

  if (!isVisible) {
    return (
      <div className="min-h-[600px] bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900"></div>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="section-padding py-20 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900"
    >
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="features-title text-3xl md:text-4xl font-bold mb-6 gradient-text">
            Funcionalidades Poderosas
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Tudo o que você precisa para gerenciar seus documentos e contratos
            em um só lugar.
          </p>
        </div>

        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              iconBg={feature.iconBg}
              iconColor={feature.iconColor}
              index={index}
              iconType={feature.iconType}
              use3DIcon={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
