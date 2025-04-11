import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { HardDrive, Upload } from "lucide-react";
import { checkStorageLimit } from "@/lib/api/document-limits";
import { Link } from "react-router-dom";

interface StorageUsageProps {
  className?: string;
}

export default function StorageUsage({ className }: StorageUsageProps) {
  const [storageData, setStorageData] = useState({
    canUpload: true,
    usedMB: 0,
    limitMB: 100,
    percentUsed: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const data = await checkStorageLimit();
        setStorageData(data);
      } catch (error) {
        console.error("Error loading storage data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStorageData();
  }, []);

  // Determina a cor da barra de progresso com base na porcentagem usada
  const getProgressColor = () => {
    if (storageData.percentUsed >= 90) return "bg-red-500";
    if (storageData.percentUsed >= 75) return "bg-amber-500";
    return "bg-blue-500";
  };

  if (loading) {
    return (
      <div
        className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}
      >
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-2 bg-gray-200 rounded"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Armazenamento</h3>
        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
          <HardDrive className="h-5 w-5 text-blue-600" />
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">
            {storageData.usedMB.toFixed(1)} MB de {storageData.limitMB} MB
          </span>
          <span
            className={`text-xs font-medium ${storageData.percentUsed >= 90 ? "text-red-600" : storageData.percentUsed >= 75 ? "text-amber-600" : "text-blue-600"}`}
          >
            {storageData.percentUsed.toFixed(1)}%
          </span>
        </div>
        <Progress
          value={storageData.percentUsed}
          className="h-2 bg-gray-100"
          indicatorClassName={getProgressColor()}
        />
      </div>

      <div className="flex flex-col space-y-3">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50"
          disabled={!storageData.canUpload}
        >
          <Upload className="h-4 w-4" />
          Adicionar Documento
        </Button>

        {storageData.percentUsed >= 75 && (
          <Link to="/dashboard/plan">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Aumentar Armazenamento
            </Button>
          </Link>
        )}
      </div>

      {!storageData.canUpload && (
        <div className="mt-3 text-xs text-red-600 bg-red-50 p-2 rounded">
          Você atingiu o limite de armazenamento do seu plano. Faça upgrade para
          continuar adicionando documentos.
        </div>
      )}
    </div>
  );
}
