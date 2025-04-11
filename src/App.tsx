import { Suspense, useEffect, useState } from "react";
import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import routes from "tempo-routes";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import Dashboard from "./components/pages/dashboard";
import Success from "./components/pages/success";
import Home from "./components/pages/home";
import PaginaInicial from "./components/pages/home-pt";
import FuncionalidadesPt from "./components/pages/funcionalidades-pt";
import BenefitsPackagePt from "./components/pages/benefits-package-pt";
import ContatoPt from "./components/pages/contato-pt";
import QuemSomosPt from "./components/pages/quem-somos-pt";
import AffiliateProgramPt from "./components/pages/affiliate-program-pt";
import { AuthProvider, useAuth } from "../supabase/auth";
import { Toaster } from "./components/ui/toaster";
import { LoadingScreen, LoadingSpinner } from "./components/ui/loading-spinner";
import { isTrialPeriodOver, hasActiveSubscription } from "./lib/api/user-plans";

function PrivateRoute({
  children,
  requiredRole = "any",
}: {
  children: React.ReactNode;
  requiredRole?: string;
}) {
  const { user, loading, userRole } = useAuth();
  const [checkingSubscription, setCheckingSubscription] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    async function checkAccess() {
      if (!user) {
        setCheckingSubscription(false);
        return;
      }

      try {
        // Check if trial period is over
        const trialOver = await isTrialPeriodOver(user.id);

        if (!trialOver) {
          // Still in trial period, grant access
          setHasAccess(true);
          setCheckingSubscription(false);
          return;
        }

        // Trial is over, check if user has an active subscription
        const hasSubscription = await hasActiveSubscription(user.id);
        setHasAccess(hasSubscription);
        setCheckingSubscription(false);
      } catch (error) {
        console.error("Error checking subscription status:", error);
        setCheckingSubscription(false);
      }
    }

    if (user && !loading) {
      checkAccess();
    } else if (!loading) {
      setCheckingSubscription(false);
    }
  }, [user, loading]);

  if (loading || checkingSubscription) {
    return <LoadingScreen text="Authenticating..." />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  if (!hasAccess) {
    // Redirect to a subscription page or show a message
    return <Navigate to="/success?subscription=required" />;
  }

  // Check if user has the required role
  if (requiredRole !== "any" && userRole !== requiredRole) {
    if (userRole === "admin" || userRole === "superadmin") {
      // Admins and superadmins can access any dashboard
      return <>{children}</>;
    }

    // Redirect to the appropriate dashboard based on role
    return <Navigate to={`/dashboard/${userRole}`} />;
  }

  return <>{children}</>;
}

// Import the RoleDashboard component
import RoleDashboard from "./components/dashboard/RoleDashboard";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PaginaInicial />} />
        <Route path="/en" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/funcionalidades" element={<FuncionalidadesPt />} />
        <Route path="/beneficios" element={<BenefitsPackagePt />} />
        <Route path="/contato" element={<ContatoPt />} />
        <Route path="/quem-somos" element={<QuemSomosPt />} />
        <Route path="/afiliados" element={<AffiliateProgramPt />} />

        {/* Default dashboard route - redirects to role-specific dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <RoleDashboard role="any" />
            </PrivateRoute>
          }
        />

        {/* Role-specific dashboard routes */}
        <Route
          path="/dashboard/user"
          element={
            <PrivateRoute requiredRole="user">
              <RoleDashboard role="user" />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/admin"
          element={
            <PrivateRoute requiredRole="admin">
              <RoleDashboard role="admin" />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/superadmin"
          element={
            <PrivateRoute requiredRole="superadmin">
              <RoleDashboard role="superadmin" />
            </PrivateRoute>
          }
        />

        {/* Dashboard feature routes */}
        <Route
          path="/dashboard/documents"
          element={
            <PrivateRoute>
              <RoleDashboard role="any" />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/contracts"
          element={
            <PrivateRoute>
              <RoleDashboard role="any" />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/vault"
          element={
            <PrivateRoute>
              <RoleDashboard role="any" />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/gamification"
          element={
            <PrivateRoute>
              <RoleDashboard role="any" />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/plan"
          element={
            <PrivateRoute>
              <RoleDashboard role="any" />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/support"
          element={
            <PrivateRoute>
              <RoleDashboard role="any" />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/settings"
          element={
            <PrivateRoute>
              <RoleDashboard role="any" />
            </PrivateRoute>
          }
        />

        <Route path="/success" element={<Success />} />
      </Routes>
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<LoadingScreen text="Loading application..." />}>
        <AppRoutes />
      </Suspense>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
