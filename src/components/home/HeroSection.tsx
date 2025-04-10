import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IconScene } from "./3d/IconScene";
import gsap from "gsap";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação do título e subtítulo com melhor performance
      gsap.from(".hero-title", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });

      // Animação dos botões com delay reduzido
      gsap.from(".hero-buttons", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.4,
        ease: "power3.out",
      });

      // Animação dos cards de funcionalidades com stagger otimizado
      gsap.from(".feature-card", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.6,
        ease: "back.out(1.5)",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="hero-gradient pt-16 pb-16 sm:pt-20 sm:pb-20 md:pt-28 md:pb-28 lg:pt-32 lg:pb-32 overflow-hidden bg-gradient-to-b from-white via-brand-50 to-white dark:from-gray-900 dark:via-brand-950/20 dark:to-gray-900"
    >
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        {/* Título da seção de funcionalidades */}
        <div className="text-center mb-12 mt-16 relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-brand-700 dark:text-brand-300 animate-float">
            Principais Funcionalidades
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Conheça as ferramentas que transformarão sua gestão de documentos e
            contratos
          </p>
          <div className="absolute -z-10 w-64 h-64 bg-gradient-to-r from-brand-200/30 to-cyan-200/30 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* Cards de funcionalidades com ícones 3D */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 relative z-10">
          {/* Card 1 - Assinatura Digital */}
          <div className="feature-card bg-gradient-to-br from-brand-50 to-white dark:from-brand-900/80 dark:to-gray-800/90 rounded-xl sm:rounded-2xl p-5 sm:p-7 shadow-lg hover:shadow-2xl transition-all duration-300 border border-brand-100/60 dark:border-brand-700/40 flex flex-col items-center text-center hover:scale-105 group">
            <div className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 mb-4 sm:mb-5 relative">
              <div className="absolute inset-0 bg-brand-100/50 dark:bg-brand-900/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-70"></div>
              <div className="relative z-10">
                <IconScene
                  iconType="crown"
                  color="#4f46e5"
                  interactive={true}
                />
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-brand-700 dark:text-brand-300 group-hover:text-brand-600 dark:group-hover:text-brand-200 transition-colors">
              Assinatura Digital
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">
              Assine documentos com validade jurídica de qualquer lugar, em
              segundos e com total segurança.
            </p>
            <ul className="text-left text-xs sm:text-sm space-y-2 sm:space-y-3 w-full">
              <li className="flex items-start">
                <span className="text-brand-600 mr-2 mt-0.5 flex-shrink-0">
                  ✓
                </span>
                <span>
                  Assinatura com certificado digital ICP-Brasil e conformidade
                  com MP 2.200-2
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-600 mr-2 mt-0.5 flex-shrink-0">
                  ✓
                </span>
                <span>
                  Assinatura em lote para múltiplos documentos com
                  rastreabilidade completa
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-600 mr-2 mt-0.5 flex-shrink-0">
                  ✓
                </span>
                <span>
                  Verificação de autenticidade e integridade com carimbo de
                  tempo
                </span>
              </li>
            </ul>
          </div>

          {/* Card 2 - Armazenamento Seguro */}
          <div className="feature-card bg-gradient-to-br from-cyan-50 to-white dark:from-cyan-900/80 dark:to-gray-800/90 rounded-xl sm:rounded-2xl p-5 sm:p-7 shadow-lg hover:shadow-2xl transition-all duration-300 border border-cyan-100/60 dark:border-cyan-700/40 flex flex-col items-center text-center hover:scale-105 group">
            <div className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 mb-4 sm:mb-5 relative">
              <div className="absolute inset-0 bg-cyan-100/50 dark:bg-cyan-900/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-70"></div>
              <div className="relative z-10">
                <IconScene
                  iconType="sparkles"
                  color="#06b6d4"
                  interactive={true}
                />
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-cyan-600 dark:text-cyan-300 group-hover:text-cyan-500 dark:group-hover:text-cyan-200 transition-colors">
              Armazenamento Seguro
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">
              Seus documentos protegidos com criptografia de ponta a ponta e
              backup automático em múltiplos servidores.
            </p>
            <ul className="text-left text-xs sm:text-sm space-y-2 sm:space-y-3 w-full">
              <li className="flex items-start">
                <span className="text-cyan-600 mr-2 mt-0.5 flex-shrink-0">
                  ✓
                </span>
                <span>
                  Criptografia AES-256 para todos os arquivos e transmissão
                  segura via TLS 1.3
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-600 mr-2 mt-0.5 flex-shrink-0">
                  ✓
                </span>
                <span>
                  Backup automático em múltiplos servidores com redundância
                  geográfica
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-600 mr-2 mt-0.5 flex-shrink-0">
                  ✓
                </span>
                <span>
                  Conformidade com LGPD, ISO 27001 e outras normas
                  internacionais
                </span>
              </li>
            </ul>
          </div>

          {/* Card 3 - Controle de Acesso */}
          <div className="feature-card bg-gradient-to-br from-pink-50 to-white dark:from-pink-900/80 dark:to-gray-800/90 rounded-xl sm:rounded-2xl p-5 sm:p-7 shadow-lg hover:shadow-2xl transition-all duration-300 border border-pink-100/60 dark:border-pink-700/40 flex flex-col items-center text-center hover:scale-105 group">
            <div className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 mb-4 sm:mb-5 relative">
              <div className="absolute inset-0 bg-pink-100/50 dark:bg-pink-900/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-70"></div>
              <div className="relative z-10">
                <IconScene
                  iconType="rocket"
                  color="#ec4899"
                  interactive={true}
                />
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-pink-600 dark:text-pink-300 group-hover:text-pink-500 dark:group-hover:text-pink-200 transition-colors">
              Controle de Acesso
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">
              Defina permissões granulares e compartilhe com segurança com sua
              equipe e parceiros externos.
            </p>
            <ul className="text-left text-xs sm:text-sm space-y-2 sm:space-y-3 w-full">
              <li className="flex items-start">
                <span className="text-pink-600 mr-2 mt-0.5 flex-shrink-0">
                  ✓
                </span>
                <span>
                  Permissões granulares por usuário, grupo e função com
                  hierarquia de acesso
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-600 mr-2 mt-0.5 flex-shrink-0">
                  ✓
                </span>
                <span>
                  Registro detalhado de acessos, alterações e tentativas de
                  acesso não autorizadas
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-600 mr-2 mt-0.5 flex-shrink-0">
                  ✓
                </span>
                <span>
                  Compartilhamento seguro com links temporários e autenticação
                  em dois fatores
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Gradiente de fundo */}
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
      </div>
    </div>
  );
}
