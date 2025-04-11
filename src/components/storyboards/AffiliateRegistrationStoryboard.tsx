import AffiliateRegistration from "@/components/auth/AffiliateRegistration";

export default function AffiliateRegistrationStoryboard() {
  return (
    <div className="bg-gray-100 p-8 flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Cadastro de Afiliado
        </h2>

        <AffiliateRegistration
          email="usuario@exemplo.com"
          fullName="Usuário Exemplo"
          onSubmit={async (taxId, bankInfo, termsAccepted) => {
            console.log("Form submitted:", { taxId, bankInfo, termsAccepted });
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            alert("Cadastro de afiliado enviado com sucesso!");
          }}
          isLoading={false}
        />
      </div>
    </div>
  );
}
