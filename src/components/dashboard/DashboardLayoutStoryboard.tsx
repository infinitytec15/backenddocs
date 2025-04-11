import { AuthProvider } from "../../../supabase/auth";
import DashboardLayout from "./layout/DashboardLayout-pt";

export default function DashboardLayoutStoryboard() {
  return (
    <AuthProvider>
      <DashboardLayout>
        <div className="p-6 bg-white rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">Dashboard Content</h1>
          <p className="text-gray-600">
            Este é um exemplo de conteúdo do dashboard.
          </p>
        </div>
      </DashboardLayout>
    </AuthProvider>
  );
}
