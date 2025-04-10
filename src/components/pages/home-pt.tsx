import { useEffect } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { HeroSection } from "@/components/home/HeroSection";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { CtaSection } from "@/components/home/CtaSection";
import { useAuth } from "../../../supabase/auth";
import { useNavigate } from "react-router-dom";

export default function PaginaInicial() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Se o usuário já estiver logado e tentar acessar a página inicial,
    // podemos redirecioná-lo para o dashboard (opcional)
    if (user) {
      // Comentado para permitir que usuários logados vejam a página inicial
      // navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <SiteLayout>
      {/*