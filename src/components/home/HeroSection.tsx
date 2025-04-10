import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Lock, FileCheck } from "lucide-react";

export function HeroSection() {
  return (
    <div className="pt-16 pb-16 sm:pt-20 sm:pb-20 md:pt-28 md:pb-28 lg:pt-32 lg:pb-32 overflow-hidden bg-gradient-to-b from-white via-blue-50 to-white dark:from-gray-900 dark:via-blue-950/20 dark:to-gray-900">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        {/* Header principal moderno */}
        <div className="max-w-3xl mx-auto text-center relative z-10 mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
            <span className="block">Documentos e Contratos</span>
            <span className="block text-blue-600 dark:text-blue-400">
              100% Seguros e Legais
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
            <strong>A plataforma completa</strong> para gerenciar, proteger e
            assinar seus documentos com segurança e simplicidade.{" "}
            <strong>Ideal para profissionais e empresas no Brasil.</strong>
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8">
            <Link to="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base h-10 sm:h-12 w-full sm:w-auto px-6 sm:px-8 text-lg">
                Começar Agora Mesmo
              </Button>
            </Link>
            <Link to="/funcionalidades">
              <Button
                variant="outline"
                className="text-sm sm:text-base h-10 sm:h-12 rounded-full w-full sm:w-auto px-4 sm:px-6"
              >
                Ver Demonstração
              </Button>
            </Link>
          </div>

          {/* Destaques */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mt-8">
            <div className="flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-lg shadow-sm">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm font-medium">
                Certificado ICP-Brasil
              </span>
            </div>
            <div className="flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-lg shadow-sm">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
                <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm font-medium">Criptografia Avançada</span>
            </div>
            <div className="flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-lg shadow-sm">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
                <FileCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm font-medium">Validade Jurídica</span>
            </div>
          </div>

          <div className="absolute -z-10 w-96 h-96 bg-gradient-to-r from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* Gradiente de fundo */}
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
      </div>
    </div>
  );
}
