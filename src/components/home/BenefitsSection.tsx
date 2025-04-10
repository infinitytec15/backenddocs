import { useEffect, useRef } from "react";
import { Shield, Clock, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

function BenefitCard({
  icon,
  title,
  description,
  delay = 0,
}: BenefitCardProps) {
  return (
    <div className="scroll-fade-in bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
      <div className="feature-icon-container">{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

export function BenefitsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação do título da seção
      gsap.from(".benefits-title", {
        scrollTrigger: {
          trigger: ".benefits-title",
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
      });

      // Animação dos cards de benefícios
      gsap.from(".benefits-card", {
        scrollTrigger: {
          trigger: ".benefits-grid",
          start: "top 70%",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-gray-50 dark:bg-gray-900"
    >
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="benefits-title text-3xl md:text-4xl font-bold mb-6 gradient-text">
            Por que escolher o DocSafe Brasil?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Nossa plataforma oferece a combinação perfeita de segurança,
            simplicidade e tecnologia para gerenciar seus documentos e
            contratos.
          </p>
        </div>

        <div className="benefits-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="benefits-card">
            <BenefitCard
              icon={<Shield size={32} />}
              title="Segurança Avançada"
              description="Proteja seus documentos com criptografia de ponta a ponta e armazenamento seguro em conformidade com a LGPD."
            />
          </div>
          <div className="benefits-card">
            <BenefitCard
              icon={<Clock size={32} />}
              title="Economia de Tempo"
              description="Automatize processos de assinatura e aprovação, reduzindo o tempo gasto com tarefas administrativas."
            />
          </div>
          <div className="benefits-card">
            <BenefitCard
              icon={<Zap size={32} />}
              title="Tecnologia Inovadora"
              description="Utilize recursos avançados como reconhecimento de texto, assinatura digital e integração com outros sistemas."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
