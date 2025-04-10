import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FileSignature,
  Download,
  Trash2,
  Plus,
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Contract {
  id: string;
  title: string;
  status: "draft" | "pending" | "signed" | "expired";
  createdAt: string;
  expiresAt?: string;
  parties: Array<{
    name: string;
    email: string;
    status: "pending" | "signed";
    avatar: string;
  }>;
}

interface ContractsGridProps {
  contracts?: Contract[];
  isLoading?: boolean;
  onContractClick?: (contract: Contract) => void;
  onDownload?: (contract: Contract) => void;
  onDelete?: (contract: Contract) => void;
}

const defaultContracts: Contract[] = [
  {
    id: "1",
    title: "Contrato de Prestação de Serviços",
    status: "signed",
    createdAt: "2024-06-15",
    expiresAt: "2025-06-15",
    parties: [
      {
        name: "João Silva",
        email: "joao@exemplo.com",
        status: "signed",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joao",
      },
      {
        name: "Empresa ABC Ltda",
        email: "contato@abc.com",
        status: "signed",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ABC",
      },
    ],
  },
  {
    id: "2",
    title: "Acordo de Confidencialidade",
    status: "pending",
    createdAt: "2024-06-10",
    parties: [
      {
        name: "Maria Oliveira",
        email: "maria@exemplo.com",
        status: "signed",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
      },
      {
        name: "Carlos Santos",
        email: "carlos@exemplo.com",
        status: "pending",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
      },
    ],
  },
  {
    id: "3",
    title: "Contrato de Aluguel",
    status: "draft",
    createdAt: "2024-06-05",
    parties: [
      {
        name: "Ana Pereira",
        email: "ana@exemplo.com",
        status: "pending",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
      },
    ],
  },
  {
    id: "4",
    title: "Termo de Uso do Software",
    status: "expired",
    createdAt: "2024-01-28",
    expiresAt: "2024-05-28",
    parties: [
      {
        name: "Pedro Costa",
        email: "pedro@exemplo.com",
        status: "signed",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro",
      },
      {
        name: "Lucia Ferreira",
        email: "lucia@exemplo.com",
        status: "signed",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucia",
      },
    ],
  },
];

const ContractsGrid = ({
  contracts = defaultContracts,
  isLoading = false,
  onContractClick = () => {},
  onDownload = () => {},
  onDelete = () => {},
}: ContractsGridProps) => {
  const [loading, setLoading] = useState(isLoading);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContracts, setFilteredContracts] = useState(contracts);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    setFilteredContracts(
      contracts.filter((contract) =>
        contract.title.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [searchTerm, contracts]);

  const getStatusBadge = (status: Contract["status"]) => {
    switch (status) {
      case "draft":
        return (
          <Badge
            variant="outline"
            className="bg-gray-100 text-gray-700 border-gray-200"
          >
            Rascunho
          </Badge>
        );
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-700 border-yellow-200"
          >
            Pendente
          </Badge>
        );
      case "signed":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-700 border-green-200"
          >
            Assinado
          </Badge>
        );
      case "expired":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-700 border-red-200"
          >
            Expirado
          </Badge>
        );
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const getStatusIcon = (status: Contract["status"]) => {
    switch (status) {
      case "draft":
        return <Clock className="h-4 w-4 text-gray-500" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "signed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "expired":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Meus Contratos
          </h2>
          <div className="flex gap-2">
            <div className="w-64 h-10 bg-gray-100 rounded-full animate-pulse"></div>
            <div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse"></div>
            <div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse"></div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(4)].map((_, index) => (
            <Card
              key={index}
              className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-xl shadow-sm h-[180px] animate-pulse"
            >
              <div className="p-4">
                <div className="h-4 bg-gray-100 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2 mb-4"></div>
                <div className="h-10 bg-gray-100 rounded-lg mb-4"></div>
                <div className="flex justify-between">
                  <div className="h-8 w-8 rounded-full bg-gray-100"></div>
                  <div className="h-8 w-20 bg-gray-100 rounded-full"></div>
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
        <h2 className="text-2xl font-semibold text-gray-900">Meus Contratos</h2>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar contratos..."
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
            <span className="hidden md:inline">Novo Contrato</span>
          </Button>
        </div>
      </div>

      {filteredContracts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <FileSignature className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            Nenhum contrato encontrado
          </h3>
          <p className="text-sm text-gray-500">
            Tente ajustar sua busca ou crie um novo contrato
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredContracts.map((contract) => (
            <Card
              key={contract.id}
              className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
              onClick={() => onContractClick(contract)}
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900 text-base line-clamp-1">
                    {contract.title}
                  </h3>
                  <div className="flex items-center">
                    {getStatusIcon(contract.status)}
                  </div>
                </div>

                <div className="flex items-center text-xs text-gray-500 mb-4">
                  <span>Criado em {contract.createdAt}</span>
                  {contract.expiresAt && (
                    <>
                      <span className="mx-2">•</span>
                      <span>Expira em {contract.expiresAt}</span>
                    </>
                  )}
                </div>

                <div className="mb-4">{getStatusBadge(contract.status)}</div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="flex -space-x-2">
                    {contract.parties.map((party, index) => (
                      <Avatar
                        key={index}
                        className="h-8 w-8 border-2 border-white"
                      >
                        <AvatarImage src={party.avatar} alt={party.name} />
                        <AvatarFallback>{party.name[0]}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full hover:bg-blue-50 hover:text-blue-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDownload(contract);
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
                        onDelete(contract);
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

export default ContractsGrid;
