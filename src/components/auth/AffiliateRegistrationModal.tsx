import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Award, Info, X } from "lucide-react";
import { useAuth } from "../../../supabase/auth";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { banks } from "../../lib/brazilian-banks";

interface AffiliateRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (
    email: string,
    password: string,
    fullName: string,
    taxId: string,
    bankInfo: string,
    termsAccepted: boolean,
  ) => Promise<void>;
}

export default function AffiliateRegistrationModal({
  isOpen,
  onClose,
  onSubmit,
}: AffiliateRegistrationModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [taxId, setTaxId] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAgency, setBankAgency] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { registerAffiliateWithSignup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email) {
      setError("Email é obrigatório");
      setIsLoading(false);
      return;
    }

    if (!password || password.length < 8) {
      setError("Senha deve ter pelo menos 8 caracteres");
      setIsLoading(false);
      return;
    }

    if (!fullName) {
      setError("Nome completo é obrigatório");
      setIsLoading(false);
      return;
    }

    if (!taxId) {
      setError("CPF/CNPJ é obrigatório");
      setIsLoading(false);
      return;
    }

    if (!bankName) {
      setError("Nome do banco é obrigatório");
      setIsLoading(false);
      return;
    }

    if (!bankAgency) {
      setError("Agência bancária é obrigatória");
      setIsLoading(false);
      return;
    }

    if (!bankAccount) {
      setError("Conta bancária é obrigatória");
      setIsLoading(false);
      return;
    }

    if (!termsAccepted) {
      setError("Você precisa aceitar os termos do programa de afiliados");
      setIsLoading(false);
      return;
    }

    try {
      if (onSubmit) {
        await onSubmit(
          email,
          password,
          fullName,
          taxId,
          `${bankName}|${bankAgency}|${bankAccount}`,
          termsAccepted,
        );
      } else {
        // Use the auth context function to register the affiliate
        await registerAffiliateWithSignup(
          email,
          password,
          fullName,
          taxId,
          `${bankName}|${bankAgency}|${bankAccount}`,
        );
      }
      toast({
        title: "Registro enviado com sucesso",
        description: "Você receberá um email para confirmar sua conta.",
        duration: 5000,
      });
      onClose();
    } catch (error: any) {
      console.error("Error registering affiliate:", error);
      setError(error?.message || "Erro ao registrar como afiliado");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <DialogTitle className="text-lg font-semibold">
                Torne-se um Afiliado
              </DialogTitle>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <DialogDescription>
            Ganhe comissões recorrentes indicando novos clientes para nossa
            plataforma.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nome Completo</Label>
              <Input
                id="fullName"
                placeholder="Seu nome completo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="Crie uma senha segura"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="text-xs text-gray-500">Mínimo de 8 caracteres</p>
          </div>

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
              required
            />
          </div>

          <div className="space-y-4">
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
                    <p>Dados bancários para receber suas comissões</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bankName">Banco</Label>
              <Select value={bankName} onValueChange={setBankName} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o banco" />
                </SelectTrigger>
                <SelectContent>
                  {banks.map((bank) => (
                    <SelectItem key={bank.code} value={bank.name}>
                      {bank.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bankAgency">Agência</Label>
                <Input
                  id="bankAgency"
                  placeholder="Número da agência"
                  value={bankAgency}
                  onChange={(e) => setBankAgency(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankAccount">Conta</Label>
                <Input
                  id="bankAccount"
                  placeholder="Número da conta"
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                  required
                />
              </div>
            </div>
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
                <Link
                  to="/termos-afiliados"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  termos e condições
                </Link>{" "}
                do programa de afiliados
              </Label>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="mb-2 sm:mb-0"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? "Processando..." : "Tornar-se Afiliado"}
            </Button>
          </DialogFooter>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500">
          Já tem uma conta?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Faça login
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
