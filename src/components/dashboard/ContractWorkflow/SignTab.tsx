import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Plus, Trash2, User, Mail } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

interface SignTabProps {
  contractId: string;
  onSendToSign?: () => void;
}

interface Signer {
  id?: string;
  name: string;
  email: string;
}

const SignTab = ({ contractId, onSendToSign }: SignTabProps) => {
  const [signers, setSigners] = useState<Signer[]>([{ name: "", email: "" }]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL as string,
    import.meta.env.VITE_SUPABASE_ANON_KEY as string,
  );

  const addSigner = () => {
    setSigners([...signers, { name: "", email: "" }]);
  };

  const removeSigner = (index: number) => {
    if (signers.length > 1) {
      const newSigners = [...signers];
      newSigners.splice(index, 1);
      setSigners(newSigners);
    }
  };

  const updateSigner = (
    index: number,
    field: "name" | "email",
    value: string,
  ) => {
    const newSigners = [...signers];
    newSigners[index][field] = value;
    setSigners(newSigners);
  };

  const validateSigners = () => {
    for (const signer of signers) {
      if (!signer.name.trim()) {
        setError("All signers must have a name");
        return false;
      }
      if (!signer.email.trim() || !/^\S+@\S+\.\S+$/.test(signer.email)) {
        setError("All signers must have a valid email address");
        return false;
      }
    }
    return true;
  };

  const handleSendToSign = async () => {
    if (!validateSigners()) return;

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // First save the signers to the database
      const { data: signersData, error: signersError } = await supabase
        .from("contract_signers")
        .insert(
          signers.map((signer) => ({
            contract_id: contractId,
            name: signer.name,
            email: signer.email,
            status: "pending",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })),
        )
        .select();

      if (signersError) throw new Error(signersError.message);

      // Then call the ZapSign integration function
      const { data, error } = await supabase.functions.invoke(
        "zapsign_integration",
        {
          body: {
            action: "send_to_zapsign",
            contractId,
            signers: signersData,
          },
        },
      );

      if (error) throw new Error(error.message);

      setSuccess("Contract sent for signature successfully!");
      if (onSendToSign) onSendToSign();
    } catch (err) {
      console.error("Error sending contract for signature:", err);
      setError("Failed to send contract for signature. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <Send className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Send for Signature</h3>
          <p className="text-sm text-gray-500">
            Add signatories and send the contract for electronic signature.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-md text-sm">
            {success}
          </div>
        )}

        <div className="space-y-4 mb-6">
          <h4 className="font-medium text-sm">Signatories</h4>

          {signers.map((signer, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="text-sm font-medium">Signer {index + 1}</h5>
                {signers.length > 1 && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeSigner(index)}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                )}
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    value={signer.name}
                    onChange={(e) =>
                      updateSigner(index, "name", e.target.value)
                    }
                    placeholder="Full Name"
                    className="pl-10"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    value={signer.email}
                    onChange={(e) =>
                      updateSigner(index, "email", e.target.value)
                    }
                    placeholder="Email Address"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" onClick={addSigner} className="w-full">
            <Plus className="h-4 w-4 mr-2" /> Add Another Signer
          </Button>
        </div>

        <Button
          onClick={handleSendToSign}
          disabled={isLoading || success !== null}
          className="w-full"
        >
          {isLoading ? "Sending..." : "Send for Signature"}
        </Button>
      </div>
    </div>
  );
};

export default SignTab;
