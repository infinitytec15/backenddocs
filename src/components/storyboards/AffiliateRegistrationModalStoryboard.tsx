import { useState } from "react";
import AffiliateRegistrationModal from "@/components/auth/AffiliateRegistrationModal";
import { Button } from "@/components/ui/button";

export default function AffiliateRegistrationModalStoryboard() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-gray-100 p-8 flex flex-col items-center justify-center min-h-screen">
      <Button
        onClick={() => setIsOpen(true)}
        className="mb-4 bg-blue-600 hover:bg-blue-700"
      >
        Open Affiliate Registration Modal
      </Button>

      <AffiliateRegistrationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={async (
          email,
          password,
          fullName,
          taxId,
          bankInfo,
          termsAccepted,
        ) => {
          console.log("Form submitted:", {
            email,
            password,
            fullName,
            taxId,
            bankInfo,
            termsAccepted,
          });
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setIsOpen(false);
        }}
      />
    </div>
  );
}
