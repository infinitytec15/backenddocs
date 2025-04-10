import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-blue-900/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Pronto para transformar a gestão dos seus documentos?
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de profissionais e empresas que já estão
            economizando tempo e aumentando a segurança com o DocSafe Brasil.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-base h-12 w-full sm:w-auto px-6">
                Começar Gratuitamente
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contato">
              <Button
                variant="outline"
                className="text-base h-12 rounded-full w-full sm:w-auto px-6"
              >
                Falar com um Consultor
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
