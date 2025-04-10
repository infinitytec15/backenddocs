import { motion } from "framer-motion";
import { IconScene } from "./3d/IconScene";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function MainFeaturesSection() {
  const features = [
    {
      title: "Assinatura Digital Avançada",
      description:
        "Assine documentos com validade jurídica em qualquer lugar, com total conformidade legal.",
      iconType: "crown",
      color: "#4f46e5",
      highlights: [
        "Certificado ICP-Brasil",
        "Assinatura em lote",
        "Carimbo de tempo",
      ],
    },
    {
      title: "Segurança de Nível Bancário",
      description:
        "Proteção completa para seus documentos com criptografia de ponta a ponta e backups automáticos.",
      iconType: "sparkles",
      color: "#06b6d4",
      highlights: [
        "Criptografia AES-256",
        "Redundância geográfica",
        "Conformidade LGPD",
      ],
    },
    {
      title: "Controle Total de Acesso",
      description:
        "Defina permissões granulares e compartilhe com segurança com sua equipe e parceiros.",
      iconType: "rocket",
      color: "#ec4899",
      highlights: [
        "Permissões por usuário",
        "Registro de atividades",
        "Links temporários",
      ],
    },
    {
      title: "Automação Inteligente",
      description:
        "Automatize fluxos de trabalho e processos de aprovação para aumentar a produtividade.",
      iconType: "star",
      color: "#f59e0b",
      highlights: [
        "Fluxos personalizáveis",
        "Lembretes automáticos",
        "Integrações via API",
      ],
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900 overflow-hidden">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Funcionalidades Revolucionárias
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Transforme a maneira como você gerencia documentos e contratos com
              nossas ferramentas de última geração
            </p>
          </motion.div>
          <div className="absolute -z-10 w-96 h-96 bg-gradient-to-r from-brand-200/20 to-cyan-200/20 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800/90 rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100/60 dark:border-gray-700/40 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-gradient-to-br from-gray-100/80 to-white/20 dark:from-gray-700/30 dark:to-gray-800/10 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="flex items-start gap-6">
                <div className="h-24 w-24 sm:h-28 sm:w-28 flex-shrink-0 relative">
                  <motion.div
                    animate={{
                      rotateY: [0, 15, 0, -15, 0],
                      rotateZ: [0, 5, 0, -5, 0],
                      scale: [1, 1.08, 1, 1.08, 1],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                    }}
                    className="relative z-10"
                  >
                    <IconScene
                      iconType={feature.iconType}
                      color={feature.color}
                      interactive={true}
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white dark:from-gray-700/50 dark:to-gray-800/30 rounded-full blur-xl opacity-70 group-hover:opacity-100 group-hover:blur-2xl transition-all duration-500"></div>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {feature.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {feature.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300 border border-brand-100 dark:border-brand-800"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link to="/funcionalidades">
            <Button className="btn-primary text-base h-12 px-8">
              Explorar Todas as Funcionalidades
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
