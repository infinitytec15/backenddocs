import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BarChart3,
  Clock,
  CreditCard,
  FileText,
  Gift,
  Link as LinkIcon,
  MessageSquare,
  Share2,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Button } from "../ui/button";
import { SiteLayout } from "../layout/SiteLayout";

export default function AffiliateProgramPt() {
  return (
    <SiteLayout>
      <div className="bg-white dark:bg-gray-950">
        {/* Cabeçalho Impactante */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 py-20 px-4 sm:px-6 lg:px-8 text-white">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,transparent)] dark:bg-grid-white/5"></div>
          <div className="relative mx-auto max-w-5xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-6">
              Indique e Ganhe Dinheiro de Verdade!
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl">
              Seja nosso parceiro, indique novos clientes e ganhe comissões
              recorrentes toda vez que eles usarem nossa plataforma.
            </p>
            <div className="mt-10">
              <Button
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50 font-semibold text-base px-8 py-6 h-auto"
              >
                Quero ser Afiliado
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Como Funciona */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Como Funciona?
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Nosso programa de afiliados é simples, transparente e lucrativo.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: <Users className="h-10 w-10 text-blue-600" />,
                  title: "Crie sua conta",
                  description:
                    "Crie sua conta de afiliado gratuitamente em menos de 2 minutos",
                },
                {
                  icon: <Share2 className="h-10 w-10 text-blue-600" />,
                  title: "Compartilhe seu link",
                  description:
                    "Compartilhe seu link exclusivo com sua rede de contatos",
                },
                {
                  icon: <CreditCard className="h-10 w-10 text-blue-600" />,
                  title: "Gere comissões",
                  description:
                    "Cada venda através do seu link gera comissão para você",
                },
                {
                  icon: <Clock className="h-10 w-10 text-blue-600" />,
                  title: "Ganhe todo mês",
                  description:
                    "Receba comissões mensais enquanto seus indicados estiverem ativos",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-center mb-4">{step.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Benefícios de ser nosso Afiliado
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Oferecemos vantagens exclusivas para nossos parceiros afiliados.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[
                {
                  icon: <CreditCard className="h-8 w-8 text-blue-600" />,
                  title: "Comissão recorrente",
                  description:
                    "Ganhe mensalmente enquanto seus indicados permanecerem ativos",
                },
                {
                  icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
                  title: "Pagamento automático",
                  description:
                    "Receba seus pagamentos automaticamente todo mês",
                },
                {
                  icon: <LinkIcon className="h-8 w-8 text-blue-600" />,
                  title: "Link exclusivo",
                  description:
                    "Seu link personalizado para compartilhar com sua rede",
                },
                {
                  icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
                  title: "Painel de resultados",
                  description:
                    "Acompanhe suas indicações e ganhos em tempo real",
                },
                {
                  icon: <FileText className="h-8 w-8 text-blue-600" />,
                  title: "Material pronto",
                  description:
                    "Acesse materiais de divulgação profissionais e prontos para usar",
                },
                {
                  icon: <MessageSquare className="h-8 w-8 text-blue-600" />,
                  title: "Suporte dedicado",
                  description: "Conte com um suporte exclusivo para afiliados",
                },
                {
                  icon: <Users className="h-8 w-8 text-blue-600" />,
                  title: "Sem limite de indicações",
                  description:
                    "Indique quantos clientes quiser e aumente seus ganhos",
                },
                {
                  icon: <ShieldCheck className="h-8 w-8 text-blue-600" />,
                  title: "Segurança garantida",
                  description:
                    "Seus dados e pagamentos são protegidos com segurança",
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-center mb-4">
                    {benefit.icon}
                    <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quanto posso ganhar? */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Quanto posso ganhar?
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Nosso programa de afiliados oferece comissões generosas. Veja
                quanto você pode ganhar com base no número de clientes que você
                indicar e no plano que eles escolherem.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
              <div className="p-6 sm:p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Simulador de Ganhos
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg border border-blue-100 dark:border-blue-800">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      Plano Básico
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      R$49/mês por cliente
                    </p>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        20%
                      </span>
                      <span className="ml-2 text-gray-600 dark:text-gray-300">
                        de comissão
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      R$9,80 por cliente/mês
                    </p>
                  </div>

                  <div className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-lg border border-indigo-100 dark:border-indigo-800">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      Plano Profissional
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      R$99/mês por cliente
                    </p>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                        25%
                      </span>
                      <span className="ml-2 text-gray-600 dark:text-gray-300">
                        de comissão
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      R$24,75 por cliente/mês
                    </p>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900/30 p-6 rounded-lg border border-purple-100 dark:border-purple-800">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      Plano Empresarial
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      R$199/mês por cliente
                    </p>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        30%
                      </span>
                      <span className="ml-2 text-gray-600 dark:text-gray-300">
                        de comissão
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      R$59,70 por cliente/mês
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                    Exemplos de ganhos mensais
                  </h4>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-300">
                        5 clientes no Plano Básico
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        R$49,00/mês
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-300">
                        10 clientes no Plano Profissional
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        R$247,50/mês
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-300">
                        3 clientes no Plano Empresarial
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        R$179,10/mês
                      </span>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-gray-900 dark:text-white font-medium">
                        Mix de planos (5+5+2)
                      </span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">
                        R$417,90/mês
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-300 italic mb-4">
                    Os valores são apenas ilustrativos. Os ganhos reais dependem
                    do número de clientes indicados e dos planos escolhidos.
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Calcular meus ganhos
                    <BarChart3 className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Regras do Programa */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Regras do Programa
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Para garantir uma parceria transparente e justa, nosso programa
                de afiliados segue algumas regras importantes que você deve
                conhecer.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <ShieldCheck className="h-6 w-6 text-blue-600 mr-2" />
                  Elegibilidade
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Qualquer pessoa maior de 18 anos pode se tornar um afiliado
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>É necessário
                    ter uma conta bancária válida no Brasil para receber os
                    pagamentos
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Você precisa concordar com os termos e condições do programa
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Não é permitido criar contas múltiplas para o mesmo afiliado
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <CreditCard className="h-6 w-6 text-blue-600 mr-2" />
                  Comissões e Pagamentos
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    As comissões são pagas mensalmente, até o dia 15 do mês
                    seguinte
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>O valor mínimo
                    para pagamento é de R$50,00
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Comissões são pagas enquanto o cliente indicado mantiver sua
                    assinatura ativa
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Valores abaixo do mínimo acumulam para o próximo ciclo de
                    pagamento
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <LinkIcon className="h-6 w-6 text-blue-600 mr-2" />
                  Divulgação
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Use apenas materiais de marketing aprovados ou crie os seus
                    próprios seguindo nossas diretrizes
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Não é permitido o uso de spam, publicidade enganosa ou
                    práticas antiéticas
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Você deve divulgar claramente sua relação de afiliado com
                    nossa empresa
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>É proibido usar
                    nosso nome em domínios ou subdomínios sem autorização prévia
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FileText className="h-6 w-6 text-blue-600 mr-2" />
                  Termos Gerais
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Reservamos o direito de modificar os termos do programa com
                    aviso prévio de 30 dias
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Podemos encerrar a participação de qualquer afiliado que
                    viole os termos do programa
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Você pode cancelar sua participação no programa a qualquer
                    momento
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Para mais detalhes, consulte os{" "}
                    <Link
                      to="/termos-afiliados"
                      className="text-blue-600 hover:underline"
                    >
                      Termos e Condições completos
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/termos-afiliados"
                className="text-blue-600 hover:underline text-sm"
              >
                Leia os Termos e Condições completos do Programa de Afiliados
              </Link>
            </div>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
