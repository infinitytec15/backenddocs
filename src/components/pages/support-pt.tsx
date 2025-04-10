import React, { useState } from "react";
import DashboardLayout from "../dashboard/layout/DashboardLayout-pt";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Search,
  HelpCircle,
  FileText,
  Book,
  Video,
  ChevronRight,
  Plus,
} from "lucide-react";

const Support = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const tickets = [
    {
      id: "TK-2024-0003",
      title: "Problema ao fazer upload de documentos",
      date: "15/06/2024",
      status: "open",
      messages: 3,
    },
    {
      id: "TK-2024-0002",
      title: "Dúvida sobre assinatura digital",
      date: "10/06/2024",
      status: "closed",
      messages: 5,
    },
    {
      id: "TK-2024-0001",
      title: "Solicitação de recurso adicional",
      date: "05/06/2024",
      status: "closed",
      messages: 4,
    },
  ];

  const faqs = [
    {
      question: "Como faço para compartilhar um documento?",
      answer:
        "Para compartilhar um documento, acesse 'Meus Documentos', selecione o documento desejado e clique no botão 'Compartilhar'. Você poderá inserir os emails dos destinatários e definir as permissões de acesso.",
    },
    {
      question: "Como funciona a assinatura digital de contratos?",
      answer:
        "Nossa assinatura digital utiliza certificação ICP-Brasil e está em conformidade com a legislação brasileira. Para assinar, basta acessar o contrato enviado, revisar o conteúdo e clicar em 'Assinar'. Você receberá um código por email ou SMS para confirmar sua identidade.",
    },
    {
      question: "O que é o Cofre Digital e como ele protege meus documentos?",
      answer:
        "O Cofre Digital é um espaço com criptografia avançada para armazenar seus documentos mais importantes. Todos os arquivos são criptografados com AES-256 e só podem ser acessados com sua senha. Nem mesmo nossa equipe consegue visualizar o conteúdo dos documentos no cofre.",
    },
  ];

  const resources = [
    {
      title: "Guia de Primeiros Passos",
      description: "Aprenda a usar todas as funcionalidades básicas do sistema",
      icon: <FileText className="h-5 w-5 text-blue-600" />,
      color: "bg-blue-100",
      link: "#",
    },
    {
      title: "Documentação Completa",
      description:
        "Acesse a documentação detalhada de todas as funcionalidades",
      icon: <Book className="h-5 w-5 text-purple-600" />,
      color: "bg-purple-100",
      link: "#",
    },
    {
      title: "Vídeos Tutoriais",
      description: "Assista a vídeos explicativos sobre o uso do sistema",
      icon: <Video className="h-5 w-5 text-green-600" />,
      color: "bg-green-100",
      link: "#",
    },
  ];

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Suporte</h1>
        <p className="text-gray-500">
          Encontre ajuda, tire dúvidas e entre em contato com nossa equipe
        </p>
      </div>

      {/* Busca e Novo Ticket */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Buscar por dúvidas frequentes..."
            className="pl-10 h-12 rounded-xl bg-white border-gray-200 text-sm focus:ring-2 focus:ring-blue-500 focus-visible:ring-blue-500 focus-visible:ring-offset-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button className="h-12 rounded-xl bg-blue-500 hover:bg-blue-600 text-white px-6 flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Abrir Novo Ticket
        </Button>
      </div>

      {/* Meus Tickets */}
      <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold text-gray-900">
            Meus Tickets
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tickets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                Nenhum ticket encontrado
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Você ainda não abriu nenhum ticket de suporte
              </p>
              <Button className="rounded-xl bg-blue-500 hover:bg-blue-600 text-white px-6">
                Abrir Novo Ticket
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Ticket
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Assunto
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Data
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Status
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {ticket.id}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        <div className="flex items-center">
                          {ticket.title}
                          <Badge className="ml-2 bg-blue-100 text-blue-700 border-blue-200">
                            {ticket.messages}
                          </Badge>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {ticket.date}
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          className={`${ticket.status === "open" ? "bg-green-100 text-green-700 border-green-200" : "bg-gray-100 text-gray-700 border-gray-200"}`}
                        >
                          {ticket.status === "open" ? "Aberto" : "Fechado"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          Ver
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Perguntas Frequentes */}
      <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold text-gray-900">
            Perguntas Frequentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-100 rounded-xl overflow-hidden"
              >
                <div className="p-4 bg-gray-50 flex items-start">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                    <HelpCircle className="h-3.5 w-3.5 text-blue-600" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {faq.question}
                  </h3>
                </div>
                <div className="p-4 border-t border-gray-100">
                  <p className="text-sm text-gray-700">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
          <Button
            variant="ghost"
            className="w-full mt-4 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            Ver todas as perguntas frequentes
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </CardContent>
      </Card>

      {/* Recursos e Contato */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold text-gray-900">
              Recursos de Ajuda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.link}
                  className="flex items-start p-4 border border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50 transition-colors"
                >
                  <div
                    className={`h-10 w-10 rounded-full ${resource.color} flex items-center justify-center mr-3`}
                  >
                    {resource.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">
                      {resource.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {resource.description}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 ml-auto" />
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold text-gray-900">
              Entre em Contato
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Nome
                </label>
                <Input
                  id="name"
                  placeholder="Seu nome"
                  className="h-10 rounded-lg border-gray-200"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="h-10 rounded-lg border-gray-200"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-700"
                >
                  Mensagem
                </label>
                <Textarea
                  id="message"
                  placeholder="Como podemos ajudar?"
                  className="min-h-[120px] rounded-lg border-gray-200"
                />
              </div>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl">
                Enviar Mensagem
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Support;
