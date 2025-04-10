import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, Lock, Upload, Search, Filter, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

interface VaultDocument {
  id: string;
  title: string;
  type: string;
  size: string;
  protectedAt: string;
  isEncrypted: boolean;
}

interface VaultGridProps {
  documents?: VaultDocument[];
  isLoading?: boolean;
  storageUsed?: number;
  storageLimit?: number;
  onDocumentClick?: (document: VaultDocument) => void;
  onUpload?: () => void;
}

const defaultDocuments: VaultDocument[] = [
  {
    id: "1",
    title: "Certidão de Nascimento.pdf",
    type: "PDF",
    size: "1.2 MB",
    protectedAt: "2024-06-15",
    isEncrypted: true,
  },
  {
    id: "2",
    title: "Carteira de Identidade.jpg",
    type: "JPG",
    size: "3.5 MB",
    protectedAt: "2024-06-10",
    isEncrypted: true,
  },
  {
    id: "3",
    title: "Comprovante de Residência.pdf",
    type: "PDF",
    size: "0.8 MB",
    protectedAt: "2024-06-05",
    isEncrypted: true,
  },
  {
    id: "4",
    title: "Carteira de Trabalho.pdf",
    type: "PDF",
    size: "2.1 MB",
    protectedAt: "2024-05-28",
    isEncrypted: true,
  },
  {
    id: "5",
    title: "Passaporte.pdf",
    type: "PDF",
    size: "4.3 MB",
    protectedAt: "2024-05-20",
    isEncrypted: true,
  },
];

const VaultGrid = ({
  documents = defaultDocuments,
  isLoading = false,
  storageUsed = 12.5,
  storageLimit = 20,
  onDocumentClick = () => {},
  onUpload = () => {},
}: VaultGridProps) => {
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

  const storagePercentage = (storageUsed / storageLimit) * 100;

  if (loading) {
    return (
      <div className="w-full h-full bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Cofre Digital
          </h2>
          <div className="flex gap-2">
            <div className="w-64 h-10 bg-gray-100 rounded-full animate-pulse"></div>
            <div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse"></div>
            <div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse"></div>
          </div>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm mb-6 animate-pulse">
          <div className="p-6">
            <div className="h-6 bg-gray-100 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
            <div className="h-8 bg-gray-100 rounded-full w-full mb-4"></div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-100 rounded w-1/4"></div>
              <div className="h-4 bg-gray-100 rounded w-1/4"></div>
            </div>
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(5)].map((_, index) => (
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
        <h2 className="text-2xl font-semibold text-gray-900">Cofre Digital</h2>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar documentos protegidos..."
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
          <Button
            className="rounded-full bg-blue-500 hover:bg-blue-600 text-white h-10 px-4 flex items-center gap-2"
            onClick={onUpload}
          >
            <Upload className="h-4 w-4" />
            <span className="hidden md:inline">Proteger</span>
          </Button>
        </div>
      </div>

      <Card className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm mb-6">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Uso do Armazenamento
            </h3>
            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <Shield className="h-5 w-5 text-indigo-600" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-gray-500">Espaço utilizado</span>
              <span className="text-gray-900">
                {storagePercentage.toFixed(1)}%
              </span>
            </div>
            <Progress
              value={storagePercentage}
              className="h-3 bg-gray-100 rounded-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{storageUsed} GB usado</span>
              <span>{storageLimit} GB total</span>
            </div>
          </div>
          {storagePercentage > 80 && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-lg text-sm text-yellow-700 flex items-start">
              <div className="mr-2 mt-0.5">
                <svg
                  className="h-4 w-4 text-yellow-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div>
                <p>
                  Seu armazenamento está quase cheio. Considere fazer upgrade do
                  seu plano para obter mais espaço.
                </p>
                <Button
                  variant="link"
                  className="h-auto p-0 text-yellow-700 font-medium hover:text-yellow-800 mt-1"
                >
                  Fazer upgrade
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {filteredDocuments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            Nenhum documento protegido encontrado
          </h3>
          <p className="text-sm text-gray-500">
            Adicione seus documentos importantes ao cofre para protegê-los
          </p>
          <Button
            className="mt-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 flex items-center gap-2"
            onClick={onUpload}
          >
            <Upload className="h-4 w-4" />
            Proteger Documentos
          </Button>
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
                    <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <Lock size={20} />
                    </div>
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
                    <span className="text-xs text-gray-500">
                      Protegido em {document.protectedAt}
                    </span>
                  </div>
                  <div className="flex items-center text-xs font-medium text-indigo-600">
                    <Lock className="h-3 w-3 mr-1" />
                    Criptografado
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

export default VaultGrid;
