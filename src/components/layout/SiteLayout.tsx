import { useEffect } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { ThemeProvider } from "./ThemeProvider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SiteLayoutProps {
  children: React.ReactNode;
}

export function SiteLayout({ children }: SiteLayoutProps) {
  useEffect(() => {
    // Inicializa as animações GSAP aqui
    const ctx = gsap.context(() => {
      // Animações gerais que serão aplicadas em todas as páginas
      gsap.from(".fade-in", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });

      // Animações baseadas em scroll
      gsap.utils.toArray(".scroll-fade-in").forEach((element) => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element as Element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.out",
        });
      });
    });

    return () => ctx.revert(); // Limpa as animações quando o componente é desmontado
  }, []);

  return (
    <ThemeProvider defaultTheme="light">
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </ThemeProvider>
  );
}
