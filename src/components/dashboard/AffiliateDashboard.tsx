import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "../../../supabase/supabase";
import { useAuth } from "../../../supabase/auth";
import {
  BarChart3,
  Copy,
  DollarSign,
  Link as LinkIcon,
  Users,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  getAffiliateData,
  getAffiliateReferrals,
  getAffiliateTransactions,
  registerAsAffiliate,
} from "@/lib/api/affiliate";

interface AffiliateData {
  id: string;
  user_id: string;
  referral_code: string;
  status: string;
  balance: number;
  total_earned: number;
  total_paid: number;
  payment_method: string | null;
  payment_details: any;
  created_at: string;
}

interface ReferralData {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  plan: string | null;
  status: string;
}

interface TransactionData {
  id: string;
  amount: number;
  type: string;
  status: string;
  created_at: string;
  description: string;
}

export default function AffiliateDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [affiliateData, setAffiliateData] = useState<AffiliateData | null>(
    null,
  );
  const [referrals, setReferrals] = useState<ReferralData[]>([]);
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchAffiliateData = async () => {
      setIsLoading(true);
      setError("");

      try {
        // Fetch affiliate data using the API function
        const affiliateData = await getAffiliateData();
        if (!affiliateData) throw new Error("Failed to fetch affiliate data");
        setAffiliateData(affiliateData);

        // Fetch referrals using the API function
        const referralsData = await getAffiliateReferrals();
        setReferrals(referralsData);

        // Fetch transactions using the API function
        const transactionsData = await getAffiliateTransactions();
        setTransactions(transactionsData);
      } catch (error) {
        console.error("Error fetching affiliate data:", error);
        setError("Erro ao carregar dados de afiliado. Tente novamente.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAffiliateData();
  }, [user]);

  const copyReferralLink = () => {
    if (!affiliateData) return;

    const referralLink = `${window.location.origin}/?ref=${affiliateData.referral_code}`;
    navigator.clipboard.writeText(referralLink);

    toast({
      title: "Link copiado!",
      description: "Link de afiliado copiado para a área de transferência.",
      duration: 3000,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        <p className="font-medium">{error}</p>
        <Button
          variant="outline"
          className="mt-2"
          onClick={() => window.location.reload()}
        >
          Tentar novamente
        </Button>
      </div>
    );
  }

  if (!affiliateData) {
    return (
      <div className="bg-yellow-50 text-yellow-700 p-6 rounded-lg text-center">
        <AlertCircle className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
        <h3 className="text-lg font-semibold mb-2">
          Você ainda não é um afiliado
        </h3>
        <p className="mb-4">
          Torne-se um afiliado para começar a ganhar comissões indicando novos
          usuários.
        </p>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={async () => {
            try {
              const result = await registerAsAffiliate();
              if (result.success) {
                toast({
                  title: "Sucesso!",
                  description:
                    "Você agora é um afiliado. Sua página será recarregada.",
                  duration: 3000,
                });
                setTimeout(() => window.location.reload(), 1000);
              } else {
                throw new Error(result.message);
              }
            } catch (error) {
              console.error("Error registering as affiliate:", error);
              setError("Erro ao registrar como afiliado. Tente novamente.");
            }
          }}
        >
          Tornar-se Afiliado
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Programa de Afiliados
          </h2>
          <p className="text-gray-500">Gerencie suas indicações e ganhos</p>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          onClick={copyReferralLink}
        >
          <LinkIcon className="h-4 w-4" />
          Copiar Link de Afiliado
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">
                Saldo Disponível
              </h3>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              R$ {affiliateData.balance.toFixed(2)}
            </div>
            <div className="text-sm text-gray-500">
              Próximo pagamento em 15/10/2024
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Total Ganho</h3>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              R$ {affiliateData.total_earned.toFixed(2)}
            </div>
            <div className="text-sm text-gray-500">
              Desde {new Date(affiliateData.created_at).toLocaleDateString()}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Indicações</h3>
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {referrals.length}
            </div>
            <div className="text-sm text-gray-500">
              {referrals.filter((r) => r.status === "active").length} ativos
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Código de Referência */}
      <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">
            Seu Código de Referência
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-50 p-4 rounded-lg border border-gray-200 font-mono text-lg">
              {affiliateData.referral_code}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12"
              onClick={() => {
                navigator.clipboard.writeText(affiliateData.referral_code);
                toast({
                  title: "Código copiado!",
                  description:
                    "Código de referência copiado para a área de transferência.",
                  duration: 3000,
                });
              }}
            >
              <Copy className="h-5 w-5" />
            </Button>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Compartilhe este código ou seu link de afiliado com amigos e
            conhecidos. Você ganhará comissões quando eles se inscreverem em um
            plano pago.
          </p>
        </CardContent>
      </Card>

      {/* Indicações */}
      <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">
            Suas Indicações
          </CardTitle>
        </CardHeader>
        <CardContent>
          {referrals.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">Você ainda não tem indicações</p>
              <p className="text-sm text-gray-400 mt-1">
                Compartilhe seu código para começar a ganhar
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Nome
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Email
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Data
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Plano
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {referrals.map((referral) => (
                    <tr
                      key={referral.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {referral.full_name}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {referral.email}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {new Date(referral.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {referral.plan || "—"}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {referral.status === "active" ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" /> Ativo
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <AlertCircle className="h-3 w-3 mr-1" /> Pendente
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Transações */}
      <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">
            Histórico de Transações
          </CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <div className="text-center py-8">
              <BarChart3 className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">Nenhuma transação encontrada</p>
              <p className="text-sm text-gray-400 mt-1">
                As comissões aparecerão aqui quando suas indicações se
                inscreverem
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Data
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Descrição
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Tipo
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Valor
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {new Date(transaction.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {transaction.description}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {transaction.type === "commission"
                          ? "Comissão"
                          : "Pagamento"}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">
                        <span
                          className={
                            transaction.type === "commission"
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {transaction.type === "commission" ? "+" : "-"} R${" "}
                          {transaction.amount.toFixed(2)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {transaction.status === "completed" ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" /> Concluído
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <AlertCircle className="h-3 w-3 mr-1" /> Pendente
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
