import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, FileText, Lock } from "lucide-react";
import gsap from "gsap";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação do título e subtítulo
      gsap.from(".hero-title", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });

      // Animação dos botões
      gsap.from(".hero-buttons", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.6,
        ease: "power3.out",
      });

      // Animação dos ícones flutuantes
      if (iconsRef.current) {
        const icons = iconsRef.current.children;
        gsap.from(icons, {
          opacity: 0,
          scale: 0.5,
          duration: 0.8,
          stagger: 0.2,
          delay: 0.8,
          ease: "back.out(1.7)",
        });

        // Animação contínua de flutuação para os ícones
        gsap.to(icons, {
          y: "random(-20, 20)",
          rotation: "random(-15, 15)",
          duration: "random(3, 5)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: {
            each: 0.5,
            from: "random",
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="hero-gradient pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden"
    >
      <div className="container-custom relative">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
            Documentos e Contratos Seguros em um Só Lugar
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
            Gerencie, proteja e assine seus documentos com segurança e
            simplicidade. A solução completa para profissionais e empresas no
            Brasil.
          </p>
          <div className="hero-buttons flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <Button className="btn-primary text-base h-12 w-full sm:w-auto">
                Começar Gratuitamente
              </Button>
            </Link>
            <Link to="/funcionalidades">
              <Button
                variant="outline"
                className="text-base h-12 rounded-full w-full sm:w-auto"
              >
                Conhecer Funcionalidades
              </Button>
            </Link>
          </div>
        </div>

        {/* Ícones 3D flutuantes */}
        <div ref={iconsRef} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/6 transform -translate-x-1/2 -translate-y-1/2 animate-float">
            <div className="h-16 w-16 md:h-20 md:w-20 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center text-brand-500 rotate-6">
              <Shield size={32} className="text-brand-500" />
            </div>
          </div>
          <div
            className="absolute top-1/3 right-1/6 transform translate-x-1/2 -translate-y-1/2 animate-float"
            style={{ animationDelay: "1s" }}
          >
            <div className="h-16 w-16 md:h-20 md:w-20 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center text-blue-500 -rotate-12">
              <FileText size={32} className="text-blue-500" />
            </div>
          </div>
          <div
            className="absolute bottom-1/4 left-1/3 transform -translate-x-1/2 translate-y-1/2 animate-float"
            style={{ animationDelay: "2s" }}
          >
            <div className="h-16 w-16 md:h-20 md:w-20 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center text-green-500 rotate-12">
              <Lock size={32} className="text-green-500" />
            </div>
          </div>
        </div>

        {/* Gradiente de fundo */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
      </div>
    </div>
  );
}
