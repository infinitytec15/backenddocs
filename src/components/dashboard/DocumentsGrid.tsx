import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText, Download, Trash2, Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Document {
  id: string;
  title: string;
  type: string;
  size: string;
  updatedAt: string;
  createdBy?: {
    name: string;
    avatar: string;
  };
}

interface DocumentsGridProps {
  documents?: Document[];
  isLoading?: boolean;
  onDocumentClick?: (document: Document) => void;
  onDownload?: (document: Document) => void;
  onDelete?: (document: Document) => void;
}

const defaultDocuments: Document[] = [
  {
    id: "1",
    title: "Contrato de Prestação de Serviços.pdf",
    type: "PDF",
    size: "2.4 MB",
    updatedAt: "2024-06-15",
    createdBy: {
      name: "João Silva",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joao",
    },
  },
  {
    id: "2",
    title: "Relatório Financeiro 2024.xlsx",
    type: "XLSX",
    size: "1.8 MB",
    updatedAt: "2024-06-10",
    createdBy: {
      name: "Maria Oliveira",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    },
  },
  {
    id: "3",
    title: "Apresentação Comercial.pptx",
    type: "PPTX",
    size: "5.2 MB",
    updatedAt: "2024-06-05",
    createdBy: {
      name: "Carlos Santos",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    },
  },
  {
    id: "4",
    title: "Política de Privacidade.docx",
    type: "DOCX",
    size: "0.8 MB",
    updatedAt: "2024-05-28",
    createdBy: {
      name: "Ana Pereira",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    },
  },
  {
    id: "5",
    title: "Contrato de Confidencialidade.pdf",
    type: "PDF",
    size: "1.5 MB",
    updatedAt: "2024-05-20",
    createdBy: {
      name: "Pedro Costa",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro",
    },
  },
  {
    id: "6",
    title: "Orçamento Anual.xlsx",
    type: "XLSX",
    size: "3.1 MB",
    updatedAt: "2024-05-15",
    createdBy: {
      name: "Lucia Ferreira",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucia",
    },
  },
];

const DocumentsGrid = ({
  documents = defaultDocuments,
  isLoading = false,
  onDocumentClick = () => {},
  onDownload = () => {},
  onDelete = () => {},
}: DocumentsGridProps) => {
  const [loading, setLoading] = useState(isLoading);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDocuments, setFilteredDocuments] = useState(documents);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    setFilteredDocuments(
      documents.filter((doc) =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [searchTerm, documents]);

  const getFileIcon = (type: string) => {
    switch (type.toUpperCase()) {
      case "PDF":
        return (
          <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
            <FileText size={20} />
          </div>
        );
      case "DOCX":
        return (
          <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
            <FileText size={20} />
          </div>
        );
      case "XLSX":
        return (
          <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
            <FileText size={20} />
          </div>
        );
      case "PPTX":
        return (
          <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
            <FileText size={20} />
          </div>
        );
      default:
        return (
          <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
            <FileText size={20} />
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Meus Documentos
          </h2>
          <div className="flex gap-2">
            <div className="w-64 h-10 bg-gray-100 rounded-full animate-pulse"></div>
            <div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse"></div>
            <div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse"></div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <Card
              key={index}
              className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-xl shadow-sm h-[120px] animate-pulse"
            >
              <div className="p-4 flex items-center">
                <div className="h-10 w-10 rounded-lg bg-gray-100"></div>
                <div className="ml-3 flex-1">
                  <div className="h-4 bg-gray-100 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          Meus Documentos
        </h2>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar documentos..."
              className="pl-9 h-10 rounded-full bg-gray-100 border-0 text-sm focus:ring-2 focus:ring-gray-200 focus-visible:ring-gray-200 focus-visible:ring-offset-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10 border-gray-200"
          >
            <Filter className="h-4 w-4 text-gray-500" />
          </Button>
          <Button className="rounded-full bg-blue-500 hover:bg-blue-600 text-white h-10 px-4 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden md:inline">Adicionar</span>
          </Button>
        </div>
      </div>

      {filteredDocuments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <FileText className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            Nenhum documento encontrado
          </h3>
          <p className="text-sm text-gray-500">
            Tente ajustar sua busca ou adicione novos documentos
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredDocuments.map((document) => (
            <Card
              key={document.id}
              className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
              onClick={() => onDocumentClick(document)}
            >
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    {getFileIcon(document.type)}
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-900 text-sm line-clamp-1">
                        {document.title}
                      </h3>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <span>{document.type}</span>
                        <span className="mx-2">•</span>
                        <span>{document.size}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    {document.createdBy && (
                      <>
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage
                            src={document.createdBy.avatar}
                            alt={document.createdBy.name}
                          />
                          <AvatarFallback>
                            {document.createdBy.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-gray-500">
                          {document.updatedAt}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full hover:bg-blue-50 hover:text-blue-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDownload(document);
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full hover:bg-red-50 hover:text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(document);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentsGrid;
