import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";

// Hook personalizado para lidar com o evento de rolagem
function useScrollPosition() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Usando useCallback para memoizar a função
  const handleScroll = useCallback(() => {
    // Verificar se estamos no navegador
    if (typeof window === "undefined") return;

    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    setIsScrolled(scrollPosition > 10);
  }, []);

  // Efeito para adicionar/remover o listener
  useEffect(() => {
    // Verificação de segurança para SSR
    if (typeof window === "undefined") return;

    // Verificação inicial
    handleScroll();

    // Adicionar listener com tratamento de erro
    try {
      window.addEventListener("scroll", handleScroll, { passive: true });
    } catch (e) {
      console.error("Erro ao adicionar evento de scroll:", e);
    }

    // Cleanup function
    return () => {
      try {
        window.removeEventListener("scroll", handleScroll);
      } catch (e) {
        console.error("Erro ao remover evento de scroll:", e);
      }
    };
  }, [handleScroll]);

  return isScrolled;
}

export function SiteHeader() {
  const isScrolled = useScrollPosition();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm" : "bg-transparent"}`}
    >
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="font-bold text-2xl gradient-text">
              DocSafe Brasil
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              Início
            </Link>
            <Link
              to="/funcionalidades"
              className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              Funcionalidades
            </Link>

            <Link
              to="/gamificacao"
              className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              Gamificação
            </Link>
            <Link
              to="/sobre"
              className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              Quem Somos
            </Link>
            <Link
              to="/contato"
              className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              Contato
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="hidden md:flex space-x-3">
              <Link to="/login">
                <Button variant="outline" className="rounded-full">
                  Entrar
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="btn-primary">Começar Grátis</Button>
              </Link>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="container-custom py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-base font-medium text-gray-700 dark:text-gray-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Início
              </Link>
              <Link
                to="/funcionalidades"
                className="text-base font-medium text-gray-700 dark:text-gray-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Funcionalidades
              </Link>

              <Link
                to="/gamificacao"
                className="text-base font-medium text-gray-700 dark:text-gray-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Gamificação
              </Link>
              <Link
                to="/sobre"
                className="text-base font-medium text-gray-700 dark:text-gray-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Quem Somos
              </Link>
              <Link
                to="/contato"
                className="text-base font-medium text-gray-700 dark:text-gray-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contato
              </Link>
            </nav>
            <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full rounded-full">
                  Entrar
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="btn-primary w-full">Começar Grátis</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
