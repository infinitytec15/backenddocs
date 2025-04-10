import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Award, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AffiliateRegistrationProps {
  email: string;
  fullName: string;
  onSubmit: (
    taxId: string,
    bankInfo: string,
    termsAccepted: boolean,
  ) => Promise<void>;
  isLoading: boolean;
}

export default function AffiliateRegistration({
  email,
  fullName,
  onSubmit,
  isLoading,
}: AffiliateRegistrationProps) {
  const [taxId, setTaxId] = useState("");
  const [bankInfo, setBankInfo] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!taxId) {
      setError("CPF/CNPJ é obrigatório");
      return;
    }

    if (!bankInfo) {
      setError("Informações bancárias são obrigatórias");
      return;
    }

    if (!termsAccepted) {
      setError("Você precisa aceitar os termos do programa de afiliados");
      return;
    }

    try {
      await onSubmit(taxId, bankInfo, termsAccepted);
    } catch (error: any) {
      setError(error?.message || "Erro ao registrar como afiliado");
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Programa de Afiliados
        </h3>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Ganhe comissões recorrentes indicando novos clientes para nossa
        plataforma. Preencha os dados adicionais abaixo para se tornar um
        afiliado.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label
              htmlFor="taxId"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              CPF/CNPJ
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>Necessário para pagamento das comissões</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="taxId"
            placeholder="000.000.000-00"
            value={taxId}
            onChange={(e) => setTaxId(e.target.value)}
            className="h-10 rounded-lg border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label
              htmlFor="bankInfo"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Informações Bancárias
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>Banco, agência e conta para receber suas comissões</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="bankInfo"
            placeholder="Banco, Agência e Conta"
            value={bankInfo}
            onChange={(e) => setBankInfo(e.target.value)}
            className="h-10 rounded-lg border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700"
          />
        </div>

        <div className="flex items-start space-x-2 pt-2">
          <Checkbox
            id="terms"
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(checked === true)}
            className="mt-1"
          />
          <div className="grid gap-1.5 leading-none">
            <Label
              htmlFor="terms"
              className="text-sm text-gray-600 dark:text-gray-400 font-normal"
            >
              Eu li e aceito os{" "}
              <a
                href="/termos-afiliados"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                termos e condições
              </a>{" "}
              do programa de afiliados
            </Label>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm p-3 rounded-lg">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-10 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all"
        >
          {isLoading ? "Processando..." : "Tornar-se Afiliado"}
        </Button>
      </form>
    </div>
  );
}
