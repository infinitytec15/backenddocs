import { Separator } from "@/components/ui/separator";
import { SiteHeader } from "../layout/SiteHeader";
import {
  Check,
  Shield,
  Lightbulb,
  Handshake,
  Heart,
  Clock,
  Server,
  Database,
  Vault,
  HeadphonesIcon,
} from "lucide-react";

export default function QuemSomosPt() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SiteHeader />

      {/* Cabeçalho com frase forte */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-br from-brand-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">
            Transformamos a gestão de documentos em algo simples, seguro e
            inteligente.
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Criamos uma plataforma que une tecnologia, praticidade e segurança
            pra facilitar a vida das pessoas.
          </p>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 gradient-text">
            Missão, Visão e Valores
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Missão */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-shadow p-8 border border-gray-100 dark:border-gray-800">
              <div className="h-12 w-12 rounded-full bg-brand-100 dark:bg-brand-900/20 flex items-center justify-center mb-6">
                <Check className="h-6 w-6 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Missão
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Facilitar o gerenciamento de documentos com tecnologia
                acessível.
              </p>
            </div>

            {/* Visão */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-shadow p-8 border border-gray-100 dark:border-gray-800">
              <div className="h-12 w-12 rounded-full bg-brand-100 dark:bg-brand-900/20 flex items-center justify-center mb-6">
                <Lightbulb className="h-6 w-6 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Visão
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Ser referência no Brasil em soluções documentais digitais.
              </p>
            </div>

            {/* Valores */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-shadow p-8 border border-gray-100 dark:border-gray-800">
              <div className="h-12 w-12 rounded-full bg-brand-100 dark:bg-brand-900/20 flex items-center justify-center mb-6">
                <Heart className="h-6 w-6 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Valores
              </h3>
              <div className="space-y-2">
                <p className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="h-5 w-5 rounded-full bg-brand-100 dark:bg-brand-900/20 flex items-center justify-center mr-2">
                    <Check className="h-3 w-3 text-brand-600 dark:text-brand-400" />
                  </span>
                  Simplicidade
                </p>
                <p className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="h-5 w-5 rounded-full bg-brand-100 dark:bg-brand-900/20 flex items-center justify-center mr-2">
                    <Check className="h-3 w-3 text-brand-600 dark:text-brand-400" />
                  </span>
                  Segurança
                </p>
                <p className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="h-5 w-5 rounded-full bg-brand-100 dark:bg-brand-900/20 flex items-center justify-center mr-2">
                    <Check className="h-3 w-3 text-brand-600 dark:text-brand-400" />
                  </span>
                  Inovação
                </p>
                <p className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="h-5 w-5 rounded-full bg-brand-100 dark:bg-brand-900/20 flex items-center justify-center mr-2">
                    <Check className="h-3 w-3 text-brand-600 dark:text-brand-400" />
                  </span>
                  Transparência
                </p>
                <p className="flex items-center text-gray-700 dark:text-gray-300">
                  <span className="h-5 w-5 rounded-full bg-brand-100 dark:bg-brand-900/20 flex items-center justify-center mr-2">
                    <Check className="h-3 w-3 text-brand-600 dark:text-brand-400" />
                  </span>
                  Respeito ao cliente
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 gradient-text">
            Nossa História
          </h2>

          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 border border-gray-100 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              A DocSafe Brasil nasceu em 2023, fruto da visão de profissionais
              com experiência em tecnologia e direito que identificaram uma
              lacuna no mercado brasileiro: a falta de uma solução nacional
              completa para gestão documental digital que fosse ao mesmo tempo
              segura e fácil de usar.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Surgimos para resolver os problemas de armazenamento, organização
              e assinatura de documentos que afetam empresas e profissionais de
              todos os portes, eliminando processos burocráticos e reduzindo
              custos operacionais.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Desde o início, nosso foco tem sido total no cliente,
              desenvolvendo cada funcionalidade com base em feedback real e
              necessidades do mercado brasileiro, criando uma plataforma que
              realmente faz diferença no dia a dia de quem a utiliza.
            </p>
          </div>
        </div>
      </section>

      {/* Nossa Equipe */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 gradient-text">
            Nossa Equipe
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* CEO */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 text-center border border-gray-100 dark:border-gray-800">
              <div className="h-24 w-24 mx-auto bg-gray-200 dark:bg-gray-700 rounded-full mb-4 flex items-center justify-center overflow-hidden">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=gilberto"
                  alt="Gilberto Junior"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Gilberto Junior
              </h3>
              <p className="text-brand-600 dark:text-brand-400 font-medium">
                Founder & CEO
              </p>
            </div>

            {/* CTO */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 text-center border border-gray-100 dark:border-gray-800">
              <div className="h-24 w-24 mx-auto bg-gray-200 dark:bg-gray-700 rounded-full mb-4 flex items-center justify-center overflow-hidden">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=tech"
                  alt="Líder Técnico"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Ana Silva
              </h3>
              <p className="text-brand-600 dark:text-brand-400 font-medium">
                CTO
              </p>
            </div>

            {/* Suporte */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 text-center border border-gray-100 dark:border-gray-800">
              <div className="h-24 w-24 mx-auto bg-gray-200 dark:bg-gray-700 rounded-full mb-4 flex items-center justify-center overflow-hidden">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=support"
                  alt="Especialista em Suporte"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Carlos Oliveira
              </h3>
              <p className="text-brand-600 dark:text-brand-400 font-medium">
                Suporte Especializado
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 gradient-text">
            Nossos Diferenciais
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Tecnologia 100% Brasileira */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-brand-100 dark:bg-brand-900/20 flex items-center justify-center mb-4">
                <Server className="h-8 w-8 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                Tecnologia 100% Brasileira
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Desenvolvida por brasileiros para atender às necessidades
                específicas do mercado nacional.
              </p>
            </div>

            {/* Segurança com Supabase */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-brand-100 dark:bg-brand-900/20 flex items-center justify-center mb-4">
                <Database className="h-8 w-8 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                Segurança com Supabase
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Utilizamos tecnologia de ponta para garantir a proteção total
                dos seus dados.
              </p>
            </div>

            {/* Cofre de Documentos Protegido */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-brand-100 dark:bg-brand-900/20 flex items-center justify-center mb-4">
                <Vault className="h-8 w-8 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                Cofre de Documentos Protegido
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Armazenamento seguro com criptografia avançada para seus
                documentos mais importantes.
              </p>
            </div>

            {/* Atendimento Rápido */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-brand-100 dark:bg-brand-900/20 flex items-center justify-center mb-4">
                <HeadphonesIcon className="h-8 w-8 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                Atendimento Rápido
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Suporte especializado e ágil para resolver suas dúvidas e
                necessidades.
              </p>
            </div>

            {/* Gamificação única no setor */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center md:col-span-2 lg:col-span-4 max-w-md mx-auto">
              <div className="h-16 w-16 rounded-full bg-brand-100 dark:bg-brand-900/20 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-brand-600 dark:text-brand-400"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                Gamificação única no setor
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Sistema exclusivo de recompensas que torna a experiência de
                gerenciamento documental mais engajadora e produtiva.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-brand-600 to-brand-800 dark:from-brand-800 dark:to-brand-900">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
            Pronto para transformar sua gestão documental?
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Junte-se a milhares de profissionais e empresas que já simplificaram
            seus processos com a DocSafe Brasil.
          </p>
          <a
            href="/signup"
            className="inline-flex items-center justify-center rounded-full bg-white text-brand-600 px-8 py-3 text-base font-medium shadow-lg hover:bg-gray-100 transition-colors"
          >
            Começar Gratuitamente
          </a>
        </div>
      </section>
    </div>
  );
}
