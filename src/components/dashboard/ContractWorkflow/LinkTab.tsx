import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, Copy, Check } from "lucide-react";

interface LinkTabProps {
  contractId: string;
  onGenerateLink?: () => void;
}

const LinkTab = ({ contractId, onGenerateLink }: LinkTabProps) => {
  const [generatedLink, setGeneratedLink] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateLink = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real implementation, this would call an API to generate a unique link
      // For now, we'll simulate it with a timeout and a fake link
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const baseUrl = window.location.origin;
      const uniqueId = Math.random().toString(36).substring(2, 15);
      const link = `${baseUrl}/contracts/fill/${uniqueId}?id=${contractId}`;

      setGeneratedLink(link);

      if (onGenerateLink) onGenerateLink();
    } catch (err) {
      console.error("Error generating link:", err);
      setError("Failed to generate link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <Link className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Generate Sharing Link</h3>
          <p className="text-sm text-gray-500">
            Create a link to share this contract with signatories.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
            {error}
          </div>
        )}

        {!generatedLink ? (
          <Button
            onClick={handleGenerateLink}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Generating..." : "Generate Link"}
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center">
                <Input
                  value={generatedLink}
                  readOnly
                  className="flex-1 pr-10"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="ml-2"
                  onClick={copyToClipboard}
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                This link will allow recipients to view and fill out the
                contract form.
              </p>
            </div>

            <Button
              onClick={handleGenerateLink}
              disabled={isLoading}
              variant="outline"
              className="w-full"
            >
              Generate New Link
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkTab;
