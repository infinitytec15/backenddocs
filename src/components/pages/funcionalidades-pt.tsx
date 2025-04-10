import { motion } from "framer-motion";
import { SiteHeader } from "../layout/SiteHeader";
import { SiteFooter } from "../layout/SiteFooter";
import {
  Layers,
  Shield,
  FileText,
  Users,
  Clock,
  Lock,
  Database,
  FileKey,
  Vault,
  Trophy,
  CreditCard,
  ShieldCheck,
  Upload,
  Link,
  LayoutDashboard,
  KeyRound,
  Hash,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  isNew = false,
}: {
  icon: any;
  title: string;
  description: string;
  isNew?: boolean;
}) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center h-full"
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900 rounded-full blur-lg opacity-70"></div>
        <motion.div
          className="relative h-16 w-16 bg-blue-50 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400"
          animate={{ rotate: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        >
          <Icon size={32} />
        </motion.div>
      </div>
      <div className="flex items-center gap-2 mb-2 justify-center">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        {isNew && (
          <Badge
            variant="secondary"
            className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
          >
            Novo
          </Badge>
        )}
      </div>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </motion.div>
  );
};

const IconFeature = ({
  icon: Icon,
  title,
  isNew = false,
}: {
  icon: any;
  title: string;
  isNew?: boolean;
}) => {
  return (
    <Card className="border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 h-full">
      <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
        <div className="mb-4 text-blue-600 dark:text-blue-400">
          <Icon size={36} />
        </div>
        <div className="flex items-center gap-2 justify-center">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          {isNew && (
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            >
              Novo
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function FuncionalidadesPt() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <SiteHeader />

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto">
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Funcionalidades Poderosas para Gestão de Documentos
              </motion.h1>
              <motion.p
                className="text-xl text-gray-600 dark:text-gray-400 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Descubra como o DocSafe Brasil pode transformar a maneira como
                você gerencia seus documentos e contratos com nossas
                funcionalidades avançadas.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Icon Features Grid */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Todas as Funcionalidades
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Tudo o que você precisa para gerenciar seus documentos com
                segurança e eficiência
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
              <IconFeature icon={Database} title="Gestão de Documentos" />
              <IconFeature icon={FileText} title="Contratos Dinâmicos" />
              <IconFeature icon={Vault} title="Cofre Protegido" />
              <IconFeature
                icon={Trophy}
                title="Gamificação por Uso"
                isNew={true}
              />
              <IconFeature icon={CreditCard} title="Planos Flexíveis" />
              <IconFeature icon={ShieldCheck} title="Gestão Segura" />
              <IconFeature icon={Upload} title="Upload Fácil" />
              <IconFeature icon={Link} title="Link Compartilhável" />
              <IconFeature icon={LayoutDashboard} title="Dashboard Completo" />
              <IconFeature
                icon={Database}
                title="Segurança Supabase"
                isNew={true}
              />
              <IconFeature icon={KeyRound} title="Autenticação 2FA" />
              <IconFeature icon={Hash} title="Hash SHA256" isNew={true} />
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Recursos Principais
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Ferramentas poderosas projetadas para simplificar seu fluxo de
                trabalho e aumentar a produtividade.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={Layers}
                title="Organização Inteligente"
                description="Organize seus documentos com tags personalizadas, pastas e categorias para encontrar tudo rapidamente."
              />
              <FeatureCard
                icon={Shield}
                title="Segurança Avançada"
                description="Proteção de dados com criptografia de ponta a ponta e controles de acesso granulares."
              />
              <FeatureCard
                icon={FileText}
                title="Assinatura Digital"
                description="Assine documentos eletronicamente com validade jurídica conforme a legislação brasileira."
                isNew={true}
              />
              <FeatureCard
                icon={Users}
                title="Colaboração em Tempo Real"
                description="Trabalhe em documentos simultaneamente com sua equipe, com controle de versões."
              />
              <FeatureCard
                icon={Clock}
                title="Automação de Processos"
                description="Automatize fluxos de trabalho com lembretes, aprovações e notificações personalizadas."
              />
              <FeatureCard
                icon={Lock}
                title="Conformidade Legal"
                description="Mantenha-se em conformidade com LGPD e outras regulamentações brasileiras."
              />
            </div>
          </div>
        </section>

        {/* Advanced Features */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Recursos Avançados
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Funcionalidades exclusivas que diferenciam o DocSafe Brasil da
                concorrência.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Reconhecimento Inteligente de Documentos
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Nossa tecnologia de IA analisa automaticamente seus
                  documentos, extraindo informações importantes e
                  classificando-os corretamente sem esforço manual.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                      Extração automática de dados de notas fiscais, contratos e
                      formulários
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                      Reconhecimento de texto em português com alta precisão
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                      Indexação inteligente para pesquisas rápidas e precisas
                    </span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Fluxos de Trabalho Personalizáveis
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Crie fluxos de trabalho personalizados para aprovações,
                  revisões e processamento de documentos que se adaptam
                  perfeitamente aos processos da sua empresa.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                      Editor de fluxos de trabalho visual e intuitivo
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                      Integração com sistemas de e-mail e mensagens
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                      Regras condicionais e prazos automáticos
                    </span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
