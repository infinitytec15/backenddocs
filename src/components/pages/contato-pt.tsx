import { useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function ContatoPt() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulação de envio - em produção, conectar com backend
    setTimeout(() => {
      toast({
        title: "Mensagem enviada",
        description: "Agradecemos seu contato. Retornaremos em breve!",
      });
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      <SiteHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-brand-50/50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
            Entre em Contato
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Estamos aqui para ajudar. Preencha o formulário abaixo ou utilize um
            de nossos canais de atendimento.
          </p>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 gradient-text">
                Envie uma mensagem
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Nome
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu.email@exemplo.com"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Mensagem
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Como podemos ajudar?"
                    required
                    className="w-full min-h-[150px]"
                  />
                </div>

                <Button
                  type="submit"
                  className="btn-primary w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-8 gradient-text">
                  Informações de Contato
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-brand-100 dark:bg-brand-900/20 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Email</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        contato@docsafebrasil.com.br
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        suporte@docsafebrasil.com.br
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-brand-100 dark:bg-brand-900/20 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Telefone</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        +55 (11) 3456-7890
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        +55 (11) 98765-4321
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-brand-100 dark:bg-brand-900/20 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Endereço</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Av. Paulista, 1000 - Bela Vista
                        <br />
                        São Paulo - SP, 01310-100
                        <br />
                        Brasil
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-12">
                <h3 className="text-xl font-semibold mb-4">
                  Siga-nos nas redes sociais
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-brand-100 dark:bg-brand-900/20 p-3 rounded-full hover:bg-brand-200 dark:hover:bg-brand-800/30 transition-colors"
                  >
                    <Instagram className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-brand-100 dark:bg-brand-900/20 p-3 rounded-full hover:bg-brand-200 dark:hover:bg-brand-800/30 transition-colors"
                  >
                    <Facebook className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-brand-100 dark:bg-brand-900/20 p-3 rounded-full hover:bg-brand-200 dark:hover:bg-brand-800/30 transition-colors"
                  >
                    <Linkedin className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
