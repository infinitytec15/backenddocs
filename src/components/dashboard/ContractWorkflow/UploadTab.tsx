import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload } from "lucide-react";

interface UploadTabProps {
  onUpload: (file: File) => Promise<void>;
  isUploading: boolean;
  progress: number;
  setProgress: (progress: number) => void;
  setIsUploading: (isUploading: boolean) => void;
  setActiveTab: (tab: string) => void;
}

const UploadTab = ({
  onUpload,
  isUploading,
  progress,
  setProgress,
  setIsUploading,
  setActiveTab,
}: UploadTabProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!uploadedFile || !onUpload) return;

    setIsUploading(true);
    setProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 200);

    try {
      await onUpload(uploadedFile);
      setProgress(100);
      setTimeout(() => {
        setActiveTab("edit");
      }, 500);
    } catch (error) {
      console.error("Error uploading:", error);
    } finally {
      clearInterval(interval);
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h3 className="text-lg font-medium mb-2">Upload Contract</h3>
          <p className="text-sm text-gray-500">
            Upload your contract in PDF or DOCX format to start the process.
          </p>
        </div>

        <div
          className="border-2 border-dashed border-gray-200 rounded-lg p-8 mb-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept=".pdf,.docx,.doc"
            onChange={handleFileChange}
          />
          <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
          {uploadedFile ? (
            <div>
              <p className="text-sm font-medium">{uploadedFile.name}</p>
              <p className="text-xs text-gray-500">
                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          ) : (
            <div>
              <p className="text-sm font-medium">Click to select a file</p>
              <p className="text-xs text-gray-500">or drag and drop here</p>
            </div>
          )}
        </div>

        {isUploading && (
          <div className="mb-4">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-gray-500 mt-1 text-center">
              Uploading... {progress}%
            </p>
          </div>
        )}

        <Button
          className="w-full"
          disabled={!uploadedFile || isUploading}
          onClick={handleUpload}
        >
          {isUploading ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </div>
  );
};

export default UploadTab;
