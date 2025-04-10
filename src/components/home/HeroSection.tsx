import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IconScene } from "./3d/IconScene";
import { Shield, Lock, FileCheck } from "lucide-react";
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

      // Animação dos destaques
      gsap.from(".hero-highlight", {
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
        {/* Header principal moderno */}
        <div className="max-w-3xl mx-auto text-center relative z-10 mb-12">
          <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 gradient-text">
            <span className="block">Documentos e Contratos</span>
            <span className="block text-brand-600 dark:text-brand-400">
              100% Seguros e Legais
            </span>
          </h1>
          <p className="hero-subtitle text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
            <strong>A plataforma completa</strong> para gerenciar, proteger e
            assinar seus documentos com segurança e simplicidade.{" "}
            <strong>Ideal para profissionais e empresas no Brasil.</strong>
          </p>
          <div className="hero-buttons flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8">
            <Link to="/signup">
              <Button className="btn-primary text-sm sm:text-base h-10 sm:h-12 w-full sm:w-auto px-6 sm:px-8 text-lg">
                Começar Agora Mesmo
              </Button>
            </Link>
            <Link to="/funcionalidades">
              <Button
                variant="outline"
                className="text-sm sm:text-base h-10 sm:h-12 rounded-full w-full sm:w-auto px-4 sm:px-6"
              >
                Ver Demonstração
              </Button>
            </Link>
          </div>

          {/* Destaques */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mt-8">
            <div className="hero-highlight flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-lg shadow-sm">
              <div className="bg-brand-100 dark:bg-brand-900/30 p-2 rounded-full mr-3">
                <Shield className="h-5 w-5 text-brand-600 dark:text-brand-400" />
              </div>
              <span className="text-sm font-medium">
                Certificado ICP-Brasil
              </span>
            </div>
            <div className="hero-highlight flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-lg shadow-sm">
              <div className="bg-brand-100 dark:bg-brand-900/30 p-2 rounded-full mr-3">
                <Lock className="h-5 w-5 text-brand-600 dark:text-brand-400" />
              </div>
              <span className="text-sm font-medium">Criptografia Avançada</span>
            </div>
            <div className="hero-highlight flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-lg shadow-sm">
              <div className="bg-brand-100 dark:bg-brand-900/30 p-2 rounded-full mr-3">
                <FileCheck className="h-5 w-5 text-brand-600 dark:text-brand-400" />
              </div>
              <span className="text-sm font-medium">Validade Jurídica</span>
            </div>
          </div>

          <div className="absolute -z-10 w-96 h-96 bg-gradient-to-r from-brand-200/30 to-cyan-200/30 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* Gradiente de fundo */}
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
      </div>
    </div>
  );
}
