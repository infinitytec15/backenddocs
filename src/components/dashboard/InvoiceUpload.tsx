import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { FileText, Upload, X } from "lucide-react";
import { supabase } from "../../../supabase/supabase";

interface InvoiceUploadProps {
  onSuccess: () => void;
  onCancel: () => void;
  withdrawalAmount: number;
}

export default function InvoiceUpload({
  onSuccess,
  onCancel,
  withdrawalAmount,
}: InvoiceUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      // Check file type
      if (
        !["application/pdf", "image/jpeg", "image/png", "image/jpg"].includes(
          selectedFile.type,
        )
      ) {
        setError("Formato de arquivo inválido. Use PDF, JPEG ou PNG.");
        return;
      }
      // Check file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("Arquivo muito grande. O tamanho máximo é 5MB.");
        return;
      }
      setFile(selectedFile);
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!file) {
      setError("Por favor, selecione um arquivo de nota fiscal.");
      return;
    }

    if (!invoiceNumber) {
      setError("Por favor, informe o número da nota fiscal.");
      return;
    }

    setIsUploading(true);

    try {
      // Get current user
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Usuário não autenticado");

      // Upload file to storage
      const fileName = `${userData.user.id}_${Date.now()}_${file.name}`;
      const { data: fileData, error: uploadError } = await supabase.storage
        .from("invoices")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = await supabase.storage
        .from("invoices")
        .getPublicUrl(fileName);

      // Submit withdrawal request with invoice
      const { data, error: withdrawalError } = await supabase.functions.invoke(
        "upload_invoice",
        {
          body: {
            amount: withdrawalAmount,
            invoiceNumber,
            invoiceUrl: urlData.publicUrl,
            fileName,
          },
        },
      );

      if (withdrawalError) throw withdrawalError;

      toast({
        title: "Solicitação enviada com sucesso!",
        description:
          "Sua solicitação de saque foi recebida e será processada em breve.",
        duration: 5000,
      });

      onSuccess();
    } catch (error: any) {
      console.error("Error uploading invoice:", error);
      setError(
        error?.message ||
          "Erro ao enviar nota fiscal. Por favor, tente novamente.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Enviar Nota Fiscal
        </h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onCancel}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Para realizar o saque de R$ {withdrawalAmount.toFixed(2)}, envie uma
        nota fiscal correspondente ao valor solicitado.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="invoiceNumber"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Número da Nota Fiscal
          </Label>
          <Input
            id="invoiceNumber"
            placeholder="Ex: NF-e 12345"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            className="h-10 rounded-lg border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="invoiceFile"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Arquivo da Nota Fiscal (PDF, JPEG, PNG - máx. 5MB)
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id="invoiceFile"
              type="file"
              accept=".pdf,.jpeg,.jpg,.png"
              onChange={handleFileChange}
              className="hidden"
            />
            <div
              className={`flex-1 border ${file ? "border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800" : "border-gray-200 dark:border-gray-700"} rounded-lg p-4 cursor-pointer`}
              onClick={() => document.getElementById("invoiceFile")?.click()}
            >
              {file ? (
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                    {file.name}
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
                  <Upload className="h-5 w-5" />
                  <span className="text-sm">
                    Clique para selecionar arquivo
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm p-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isUploading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isUploading ? "Enviando..." : "Enviar Nota Fiscal"}
          </Button>
        </div>
      </form>
    </div>
  );
}
