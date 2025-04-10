import { useEffect } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { PlansSection } from "@/components/home/PlansSection";
import { BenefitsPackageSection } from "@/components/home/BenefitsPackageSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
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
      <div className="bg-white dark:bg-gray-900">
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <PlansSection />
        <BenefitsPackageSection />
        <TestimonialsSection />
        <FinalCtaSection />
      </div>
    </SiteLayout>
  );
}
