import React from "react";
import { useAuth } from "../../../supabase/auth";
import TopNavigation from "./layout/TopNavigation";
import Sidebar from "./layout/Sidebar";
import DashboardGrid from "./DashboardGrid";
import TaskBoard from "./TaskBoard";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { LoadingScreen } from "../ui/loading-spinner";

interface RoleDashboardProps {
  role?: string;
}

const RoleDashboard: React.FC<RoleDashboardProps> = ({ role = "user" }) => {
  const { userRole, loading } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);

  // Function to trigger loading state for demonstration
  const handleRefresh = () => {
    setIsLoading(true);
    // Reset loading after 2 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  // If auth is still loading or role doesn't match, show loading or error
  if (loading) {
    return <LoadingScreen text="Loading dashboard..." />;
  }

  if (role !== userRole && role !== "any") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Access Denied
          </h2>
          <p className="mb-4">
            You don't have permission to access this dashboard.
          </p>
          <Button
            onClick={() => (window.location.href = "/")}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <TopNavigation />
      <div className="flex h-[calc(100vh-64px)] mt-16">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-6 pt-4 pb-2 flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              {role === "admin"
                ? "Admin Dashboard"
                : role === "superadmin"
                  ? "Super Admin Dashboard"
                  : "User Dashboard"}
            </h1>
            <Button
              onClick={handleRefresh}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 h-9 shadow-sm transition-colors flex items-center gap-2"
            >
              <RefreshCw
                className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
              {isLoading ? "Loading..." : "Refresh Dashboard"}
            </Button>
          </div>
          <div
            className={cn(
              "container mx-auto p-6 space-y-8",
              "transition-all duration-300 ease-in-out",
            )}
          >
            <DashboardGrid isLoading={isLoading} />
            <TaskBoard isLoading={isLoading} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default RoleDashboard;
