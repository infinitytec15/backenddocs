import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import gsap from "gsap";

export function FinalCtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".final-cta-content", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.from(".cta-feature", {
        scrollTrigger: {
          trigger: ".cta-features",
          start: "top 80%",
        },
        opacity: 0,
        x: -20,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    "Comece gratuitamente, sem cartão de crédito",
    "Suporte técnico especializado",
    "Segurança de nível empresarial",
    "Atualizações constantes",
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-brand-900 to-blue-900 text-white"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="final-cta-content">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para revolucionar a gestão dos seus documentos?
            </h2>
            <p className="text-xl text-gray-100 mb-8">
              Junte-se a milhares de profissionais e empresas que já estão
              economizando tempo e aumentando a segurança com o DocSafe Brasil.
            </p>

            <div className="cta-features space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="cta-feature flex items-center">
                  <CheckCircle className="h-5 w-5 text-brand-300 mr-3 flex-shrink-0" />
                  <span className="text-gray-100">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button className="bg-white hover:bg-gray-100 text-brand-900 font-medium text-base h-12 px-6">
                  Começar Gratuitamente
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contato">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 text-base h-12 px-6"
                >
                  Falar com um Consultor
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute -z-10 w-full h-full bg-gradient-to-r from-brand-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Benefícios Exclusivos</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-brand-500/20 p-2 rounded-full mr-3 mt-0.5">
                    <CheckCircle className="h-5 w-5 text-brand-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Economia de Tempo</h4>
                    <p className="text-gray-300 text-sm">
                      Reduza em até 70% o tempo gasto com gestão de documentos.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-brand-500/20 p-2 rounded-full mr-3 mt-0.5">
                    <CheckCircle className="h-5 w-5 text-brand-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Segurança Garantida</h4>
                    <p className="text-gray-300 text-sm">
                      Proteção de dados com criptografia de nível militar.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-brand-500/20 p-2 rounded-full mr-3 mt-0.5">
                    <CheckCircle className="h-5 w-5 text-brand-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Conformidade Legal</h4>
                    <p className="text-gray-300 text-sm">
                      Documentos e assinaturas com total validade jurídica.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
