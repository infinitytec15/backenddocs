import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileSignature, Plus } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

interface FormTabProps {
  contractId: string;
  onCreateForm?: () => void;
}

interface ContractForm {
  id: string;
  contract_id: string;
  form_name: string;
  form_description?: string;
  is_template: boolean;
  status: string;
  version: number;
  created_at: string;
  updated_at: string;
}

const FormTab = ({ contractId, onCreateForm }: FormTabProps) => {
  const [forms, setForms] = useState<ContractForm[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");

  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL as string,
    import.meta.env.VITE_SUPABASE_ANON_KEY as string,
  );

  useEffect(() => {
    if (contractId) {
      fetchContractForms();
    }
  }, [contractId]);

  const fetchContractForms = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("contract_forms")
        .select("*")
        .eq("contract_id", contractId)
        .order("created_at", { ascending: false });

      if (error) throw new Error(error.message);

      setForms(data || []);
    } catch (err) {
      console.error("Error fetching contract forms:", err);
      setError("Failed to load contract forms. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateForm = async () => {
    if (!formName.trim()) {
      setError("Form name is required");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke(
        "contract_forms",
        {
          body: {
            action: "create_form",
            contractId,
            formData: {
              form_name: formName,
              form_description: formDescription,
              is_template: false,
            },
          },
        },
      );

      if (error) throw new Error(error.message);

      setForms([data.form, ...forms]);
      setFormName("");
      setFormDescription("");
      setShowCreateForm(false);

      if (onCreateForm) onCreateForm();
    } catch (err) {
      console.error("Error creating form:", err);
      setError("Failed to create form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <FileSignature className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Contract Forms</h3>
          <p className="text-sm text-gray-500">
            Create and manage forms for your contract.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
            {error}
          </div>
        )}

        {!showCreateForm ? (
          <Button
            onClick={() => setShowCreateForm(true)}
            className="w-full mb-6"
          >
            <Plus className="h-4 w-4 mr-2" /> Create New Form
          </Button>
        ) : (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h4 className="font-medium text-sm mb-3">Create New Form</h4>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">
                  Form Name
                </label>
                <Input
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Enter form name"
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">
                  Description (Optional)
                </label>
                <Textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Enter form description"
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleCreateForm}
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? "Creating..." : "Create Form"}
                </Button>
                <Button
                  onClick={() => setShowCreateForm(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {isLoading && !showCreateForm ? (
          <div className="text-center py-8">
            <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
            <p className="text-sm text-gray-500">Loading forms...</p>
          </div>
        ) : forms.length > 0 ? (
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Your Forms</h4>
            {forms.map((form) => (
              <div
                key={form.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <h5 className="font-medium">{form.form_name}</h5>
                {form.form_description && (
                  <p className="text-sm text-gray-500 mt-1">
                    {form.form_description}
                  </p>
                )}
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
                  </span>
                  <span className="text-xs text-gray-500">
                    Created: {new Date(form.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !showCreateForm && (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">No forms created yet.</p>
              <p className="text-xs text-gray-400 mt-1">
                Create your first form to get started.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default FormTab;
