import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Link } from "react-router-dom";
import { Award, Gift, Star, Trophy, Users } from "lucide-react";

export default function BenefitsPackagePt() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SiteHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <div className="inline-block p-2 bg-brand-50 dark:bg-brand-950/30 rounded-full mb-4">
            <div className="bg-brand-100 dark:bg-brand-900/50 rounded-full px-4 py-1.5">
              <span className="text-sm font-medium text-brand-800 dark:text-brand-300">
                Programa de Benefícios
              </span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 gradient-text">
            Ganhe pontos e desbloqueie benefícios exclusivos
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Nosso programa de benefícios recompensa você por cada ação realizada
            na plataforma. Quanto mais você utiliza, mais vantagens você obtém.
          </p>
          <Button className="btn-primary text-lg px-8 py-6" size="lg">
            <Link to="/signup">Começar Agora</Link>
          </Button>
        </div>
      </section>

      {/* Como Ganhar Pontos */}
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-900 rounded-3xl my-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Como Ganhar Pontos
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Acumule pontos realizando ações diárias na plataforma
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Documentos
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Ganhe 10 pontos ao criar um novo documento e 5 pontos cada vez que
              editar um documento existente.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Contratos
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Ganhe 20 pontos ao criar um novo contrato e 15 pontos cada vez que
              um contrato for assinado.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Login Diário
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Ganhe 5 pontos por cada dia consecutivo de login na plataforma,
              com bônus para sequências.
            </p>
          </div>
        </div>
      </section>

      {/* Como Usar Pontos */}
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Como Usar Seus Pontos
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Troque seus pontos por benefícios exclusivos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-brand-50 to-blue-50 dark:from-brand-900/20 dark:to-blue-900/20 p-8 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-brand-100 dark:bg-brand-800 rounded-full flex items-center justify-center mb-4">
              <Gift className="w-6 h-6 text-brand-600 dark:text-brand-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Descontos em Planos
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Use 500 pontos para obter 10% de desconto na renovação do seu
              plano anual.
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-brand-500 rounded-full mr-2"></span>
                500 pontos = 10% de desconto
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-brand-500 rounded-full mr-2"></span>
                1000 pontos = 20% de desconto
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-brand-500 rounded-full mr-2"></span>
                2000 pontos = 40% de desconto
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-8 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mb-4">
              <Gift className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Recursos Premium
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Desbloqueie recursos exclusivos temporariamente usando seus
              pontos.
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                300 pontos = Assinaturas avançadas por 1 mês
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                400 pontos = Armazenamento extra por 1 mês
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                600 pontos = Análise de contratos por IA por 1 mês
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Ranking de Usuários */}
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-900 rounded-3xl my-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ranking de Usuários
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Compete com outros usuários e alcance o topo do ranking
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="w-12 text-center font-medium text-gray-500 dark:text-gray-400">
              Pos.
            </div>
            <div className="flex-1 font-medium text-gray-500 dark:text-gray-400">
              Usuário
            </div>
            <div className="w-24 text-center font-medium text-gray-500 dark:text-gray-400">
              Nível
            </div>
            <div className="w-24 text-center font-medium text-gray-500 dark:text-gray-400">
              Pontos
            </div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="flex items-center justify-between py-4">
              <div className="w-12 text-center">
                <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 w-6 h-6 rounded-full flex items-center justify-center">
                  1
                </span>
              </div>
              <div className="flex-1 flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 mr-3"></div>
                <span className="font-medium">Ana Silva</span>
              </div>
              <div className="w-24 text-center">
                <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 px-2 py-1 rounded-full text-xs font-medium">
                  Ouro
                </span>
              </div>
              <div className="w-24 text-center font-medium">12,450</div>
            </div>

            <div className="flex items-center justify-between py-4">
              <div className="w-12 text-center">
                <span className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 w-6 h-6 rounded-full flex items-center justify-center">
                  2
                </span>
              </div>
              <div className="flex-1 flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 mr-3"></div>
                <span className="font-medium">Carlos Mendes</span>
              </div>
              <div className="w-24 text-center">
                <span className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 px-2 py-1 rounded-full text-xs font-medium">
                  Prata
                </span>
              </div>
              <div className="w-24 text-center font-medium">9,872</div>
            </div>

            <div className="flex items-center justify-between py-4">
              <div className="w-12 text-center">
                <span className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 w-6 h-6 rounded-full flex items-center justify-center">
                  3
                </span>
              </div>
              <div className="flex-1 flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 mr-3"></div>
                <span className="font-medium">Mariana Costa</span>
              </div>
              <div className="w-24 text-center">
                <span className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-1 rounded-full text-xs font-medium">
                  Bronze
                </span>
              </div>
              <div className="w-24 text-center font-medium">7,345</div>
            </div>
          </div>
        </div>
      </section>

      {/* Emblemas e Conquistas */}
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Emblemas e Conquistas
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Desbloqueie emblemas exclusivos ao atingir marcos importantes
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Iniciante
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Crie seu primeiro documento
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Contratante
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Crie seu primeiro contrato
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Dedicado
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Faça login por 7 dias consecutivos
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center">
            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Colaborador
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Compartilhe 5 documentos com outros usuários
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-r from-brand-500 to-blue-600 rounded-3xl my-8 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Comece a ganhar pontos hoje mesmo!
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Junte-se a milhares de usuários que já estão aproveitando nosso
            programa de benefícios e desbloqueando vantagens exclusivas.
          </p>
          <Button
            className="bg-white text-brand-600 hover:bg-white/90 hover:text-brand-700 text-lg px-8 py-6"
            size="lg"
          >
            <Link to="/signup">Criar Conta Grátis</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
