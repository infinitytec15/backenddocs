import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

interface EditTabProps {
  contractId: string;
  onEditFields: () => void;
}

interface ContractField {
  id: string;
  contract_id: string;
  field_name: string;
  field_type: string;
  field_value?: string;
  is_required: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

const EditTab = ({ contractId, onEditFields }: EditTabProps) => {
  const [fields, setFields] = useState<ContractField[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL as string,
    import.meta.env.VITE_SUPABASE_ANON_KEY as string,
  );

  useEffect(() => {
    if (contractId) {
      fetchContractFields();
    }
  }, [contractId]);

  const fetchContractFields = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke(
        "contract_fields",
        {
          body: {
            action: "get_fields",
            contractId,
          },
        },
      );

      if (error) {
        throw new Error(error.message);
      }

      if (data && data.fields) {
        setFields(data.fields);
      }
    } catch (err) {
      console.error("Error fetching contract fields:", err);
      setError("Failed to load contract fields. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <div className="w-full max-w-md text-center">
        <Edit className="h-12 w-12 text-blue-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">Edit Contract Fields</h3>
        <p className="text-sm text-gray-500 mb-6">
          Define the fields that need to be filled in the contract.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
            {error}
          </div>
        )}

        {fields.length > 0 && (
          <div className="mb-6 text-left">
            <h4 className="text-sm font-medium mb-2">Current Fields:</h4>
            <div className="bg-gray-50 rounded-md p-3 space-y-2">
              {fields.map((field) => (
                <div
                  key={field.id}
                  className="text-sm p-2 border-b border-gray-100"
                >
                  <span className="font-medium">{field.field_name}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({field.field_type}){field.is_required && " • Required"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button onClick={onEditFields} disabled={isLoading}>
          {isLoading
            ? "Loading..."
            : fields.length > 0
              ? "Edit Fields"
              : "Add Fields"}
        </Button>
      </div>
    </div>
  );
};

export default EditTab;
