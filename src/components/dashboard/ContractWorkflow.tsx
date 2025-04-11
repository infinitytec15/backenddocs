import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileSignature, Upload, Edit, Link, Send } from "lucide-react";

// Import tab components
import UploadTab from "./ContractWorkflow/UploadTab";
import EditTab from "./ContractWorkflow/EditTab";
import FormTab from "./ContractWorkflow/FormTab";
import LinkTab from "./ContractWorkflow/LinkTab";
import SignTab from "./ContractWorkflow/SignTab";

interface ContractWorkflowProps {
  contractId?: string;
  onUpload?: (file: File) => Promise<void>;
  onCreateForm?: () => void;
  onEditFields?: () => void;
  onGenerateLink?: () => void;
  onSendToSign?: () => void;
}

const ContractWorkflow = ({
  contractId,
  onUpload,
  onCreateForm,
  onEditFields,
  onGenerateLink,
  onSendToSign,
}: ContractWorkflowProps) => {
  const [activeTab, setActiveTab] = useState("upload");
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <Card className="w-full bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
      <CardHeader className="bg-gray-50 border-b border-gray-100 pb-3">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <FileSignature className="h-5 w-5 text-blue-500" />
          Contract Workflow
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-5 rounded-none bg-gray-50 border-b border-gray-100">
            <TabsTrigger
              value="upload"
              className="data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
            >
              <div className="flex flex-col items-center gap-1 py-2">
                <Upload className="h-4 w-4" />
                <span className="text-xs">Upload</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="edit"
              className="data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
              disabled={!contractId}
            >
              <div className="flex flex-col items-center gap-1 py-2">
                <Edit className="h-4 w-4" />
                <span className="text-xs">Edit</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="form"
              className="data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
              disabled={!contractId}
            >
              <div className="flex flex-col items-center gap-1 py-2">
                <FileSignature className="h-4 w-4" />
                <span className="text-xs">Form</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="link"
              className="data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
              disabled={!contractId}
            >
              <div className="flex flex-col items-center gap-1 py-2">
                <Link className="h-4 w-4" />
                <span className="text-xs">Link</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="sign"
              className="data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
              disabled={!contractId}
            >
              <div className="flex flex-col items-center gap-1 py-2">
                <Send className="h-4 w-4" />
                <span className="text-xs">Sign</span>
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="p-6">
            <UploadTab
              onUpload={onUpload || (async () => {})}
              isUploading={isUploading}
              progress={progress}
              setProgress={setProgress}
              setIsUploading={setIsUploading}
              setActiveTab={setActiveTab}
            />
          </TabsContent>

          <TabsContent value="edit" className="p-6">
            {contractId && (
              <EditTab
                contractId={contractId}
                onEditFields={onEditFields || (() => {})}
              />
            )}
          </TabsContent>

          <TabsContent value="form" className="p-6">
            {contractId && (
              <FormTab contractId={contractId} onCreateForm={onCreateForm} />
            )}
          </TabsContent>

          <TabsContent value="link" className="p-6">
            {contractId && (
              <LinkTab
                contractId={contractId}
                onGenerateLink={onGenerateLink}
              />
            )}
          </TabsContent>

          <TabsContent value="sign" className="p-6">
            {contractId && (
              <SignTab contractId={contractId} onSendToSign={onSendToSign} />
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ContractWorkflow;
