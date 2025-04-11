import { useState } from "react";
import InvoiceUpload from "@/components/dashboard/InvoiceUpload";
import { Button } from "@/components/ui/button";

export default function InvoiceUploadStoryboard() {
  const [showUpload, setShowUpload] = useState(true);
  const withdrawalAmount = 250.0;

  return (
    <div className="bg-gray-100 p-8 flex flex-col items-center justify-center min-h-screen">
      {!showUpload && (
        <Button
          onClick={() => setShowUpload(true)}
          className="mb-4 bg-blue-600 hover:bg-blue-700"
        >
          Show Invoice Upload
        </Button>
      )}

      {showUpload && (
        <div className="max-w-md w-full">
          <InvoiceUpload
            withdrawalAmount={withdrawalAmount}
            onSuccess={() => {
              setShowUpload(false);
              alert("Invoice uploaded successfully!");
            }}
            onCancel={() => setShowUpload(false)}
          />
        </div>
      )}
    </div>
  );
}
