import { useState } from "react";
import { useAuth } from "../../../supabase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, Link } from "react-router-dom";
import ModernAuthLayout from "./ModernAuthLayout";
import { useToast } from "@/components/ui/use-toast";
import { LockKeyhole, Mail, User } from "lucide-react";

export default function SignUpFormPt() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Create user account with trial plan
      await signUp(email, password, fullName);

      toast({
        title: "Conta criada com sucesso",
        description:
          "Bem-vindo ao seu painel! Seu período de avaliação de 7 dias começou.",
        duration: 5000,
      });
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Erro ao criar conta:", error);
      if (error?.message?.includes("roles")) {
        setError(
          "Erro de configuração do sistema. Por favor, entre em contato com o suporte.",
        );
      } else {
        setError(error?.message || "Erro ao criar conta. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModernAuthLayout>
      <div className="p-8">
        <h3 className="text-xl font-semibold text-center mb-6">
          Crie sua conta
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label
              htmlFor="fullName"
              className="text-sm font-medium text-gray-700 flex items-center gap-2"
            >
              <User size={16} className="text-gray-400" />
              Nome Completo
            </Label>
            <Input
              id="fullName"
              placeholder="João Silva"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:border-blue-500 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 flex items-center gap-2"
            >
              <Mail size={16} className="text-gray-400" />
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="nome@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:border-blue-500 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 flex items-center gap-2"
            >
              <LockKeyhole size={16} className="text-gray-400" />
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Crie uma senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:border-blue-500 focus:ring-blue-500 transition-all"
            />
            <p className="text-xs text-gray-500 mt-1 pl-1">
              A senha deve ter pelo menos 8 caracteres
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium transition-all"
          >
            {isLoading ? "Criando conta..." : "Criar conta"}
          </Button>

          <div className="text-xs text-center text-gray-500 mt-4">
            Ao criar uma conta, você concorda com nossos{" "}
            <Link
              to="/"
              className="text-blue-600 hover:underline transition-colors"
            >
              Termos de Serviço
            </Link>{" "}
            e{" "}
            <Link
              to="/"
              className="text-blue-600 hover:underline transition-colors"
            >
              Política de Privacidade
            </Link>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Já tem uma conta?
              </span>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/login"
              className="inline-flex justify-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 w-full transition-all"
            >
              Entrar
            </Link>
          </div>
        </form>
      </div>
    </ModernAuthLayout>
  );
}
