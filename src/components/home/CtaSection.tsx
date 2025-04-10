import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";

export function CtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-content", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-gradient-to-br from-brand-50 to-brand-100 dark:from-gray-900 dark:to-brand-900/20"
    >
      <div className="container-custom">
        <div className="cta-content max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
            Pronto para transformar a gestão dos seus documentos?
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de profissionais e empresas que já estão
            economizando tempo e aumentando a segurança com o DocSafe Brasil.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <Button className="btn-primary text-base h-12 w-full sm:w-auto">
                Começar Gratuitamente
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contato">
              <Button
                variant="outline"
                className="text-base h-12 rounded-full w-full sm:w-auto"
              >
                Falar com um Consultor
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
