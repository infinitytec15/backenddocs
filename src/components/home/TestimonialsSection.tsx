import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Ana Silva",
      role: "Advogada",
      company: "Silva & Associados",
      content:
        "O DocSafe Brasil revolucionou a forma como gerenciamos contratos em nosso escritório. A assinatura digital com validade jurídica nos economiza horas de trabalho toda semana.",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    },
    {
      id: 2,
      name: "Carlos Mendes",
      role: "Diretor Financeiro",
      company: "Construtora Horizonte",
      content:
        "Desde que implementamos o DocSafe, reduzimos em 70% o tempo gasto com gestão de documentos. O sistema de gamificação também aumentou o engajamento da equipe.",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    },
    {
      id: 3,
      name: "Juliana Costa",
      role: "Gerente de RH",
      company: "TechBrasil Ltda",
      content:
        "A facilidade de compartilhar documentos com segurança e a organização que o sistema proporciona são incomparáveis. Recomendo para qualquer empresa que valorize eficiência.",
      rating: 4,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juliana",
    },
    {
      id: 4,
      name: "Roberto Almeida",
      role: "Contador",
      company: "Almeida Contabilidade",
      content:
        "O cofre digital do DocSafe nos dá tranquilidade para armazenar documentos sensíveis dos nossos clientes. A interface é intuitiva e o suporte é excelente.",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonials-title", {
        scrollTrigger: {
          trigger: ".testimonials-title",
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.from(".testimonial-card", {
        scrollTrigger: {
          trigger: ".testimonial-card",
          start: "top 70%",
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-white dark:bg-gray-900"
    >
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="testimonials-title text-3xl md:text-4xl font-bold mb-6 gradient-text">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Histórias reais de empresas e profissionais que transformaram sua
            gestão de documentos.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto px-4">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="testimonial-card bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center mb-6">
              <div className="mr-4">
                <img
                  src={testimonials[activeIndex].avatar}
                  alt={testimonials[activeIndex].name}
                  className="h-16 w-16 rounded-full object-cover border-2 border-brand-200 dark:border-brand-800"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {testimonials[activeIndex].name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {testimonials[activeIndex].role},{" "}
                  {testimonials[activeIndex].company}
                </p>
                <div className="flex mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < testimonials[activeIndex].rating ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"}`}
                      fill={
                        i < testimonials[activeIndex].rating
                          ? "currentColor"
                          : "none"
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
            <blockquote className="text-lg text-gray-700 dark:text-gray-300 italic mb-4">
              "{testimonials[activeIndex].content}"
            </blockquote>
          </motion.div>

          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-brand-200 dark:hover:bg-brand-700 transition-colors"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </button>
            <div className="flex space-x-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${activeIndex === index ? "w-6 bg-brand-500" : "w-2.5 bg-gray-300 dark:bg-gray-600"}`}
                  aria-label={`Ir para depoimento ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-brand-200 dark:hover:bg-brand-700 transition-colors"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
