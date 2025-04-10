import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { FileText, Shield, PenTool, Users } from "lucide-react";

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".step-item", {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      icon: <FileText className="h-8 w-8 text-brand-500" />,
      title: "Crie seus documentos",
      description:
        "Crie, importe ou use modelos pré-definidos para seus documentos e contratos.",
      color: "blue",
    },
    {
      icon: <Shield className="h-8 w-8 text-indigo-500" />,
      title: "Proteja com segurança",
      description:
        "Seus documentos são criptografados e armazenados com segurança em nosso cofre digital.",
      color: "indigo",
    },
    {
      icon: <PenTool className="h-8 w-8 text-purple-500" />,
      title: "Assine digitalmente",
      description:
        "Assine seus documentos com assinatura digital válida juridicamente no Brasil.",
      color: "purple",
    },
    {
      icon: <Users className="h-8 w-8 text-green-500" />,
      title: "Compartilhe com segurança",
      description:
        "Compartilhe documentos com clientes, parceiros ou colegas com controle de acesso.",
      color: "green",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-white dark:bg-gray-900"
    >
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
            Como Funciona
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Gerencie seus documentos e contratos em quatro passos simples
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="step-item flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300"
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-${step.color}-100 dark:bg-${step.color}-900/30`}
              >
                {step.icon}
              </div>
              <div className="relative mb-6">
                <div
                  className={`w-8 h-8 rounded-full bg-${step.color}-500 flex items-center justify-center text-white font-bold text-sm absolute -top-1 -right-1`}
                >
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Linha de conexão entre os passos (visível apenas em desktop) */}
        <div className="hidden lg:block relative h-1 max-w-4xl mx-auto">
          <div className="absolute top-[-85px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
        </div>
      </div>
    </section>
  );
}
