import { useState } from "react";
import { useAuth } from "../../../supabase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import ModernAuthLayout from "./ModernAuthLayout";
import { useToast } from "@/components/ui/use-toast";
import { LockKeyhole, Mail, User } from "lucide-react";
import AffiliateRegistration from "./AffiliateRegistration";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [showAffiliateForm, setShowAffiliateForm] = useState(
    searchParams.get("affiliate") === "true",
  );
  const { signUp, registerAffiliate } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await signUp(email, password, fullName);
      toast({
        title: "Account created successfully",
        description: "Please check your email to verify your account.",
        duration: 5000,
      });
      navigate("/login");
    } catch (error: any) {
      console.error("Error creating account:", error);
      if (error?.message?.includes("roles")) {
        setError("System configuration error. Please contact support.");
      } else {
        setError(error?.message || "Error creating account. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAffiliateSubmit = async (
    taxId: string,
    bankInfo: string,
    termsAccepted: boolean,
  ) => {
    setIsLoading(true);
    setError("");

    try {
      // First create the regular account
      await signUp(email, password, fullName);

      // Then register as affiliate
      await registerAffiliate(email, taxId, bankInfo);

      toast({
        title: "Affiliate account created successfully",
        description:
          "Please check your email to verify your account. You'll be notified when your affiliate status is approved.",
        duration: 5000,
      });
      navigate("/login");
    } catch (error: any) {
      console.error("Error creating affiliate account:", error);
      if (error?.message?.includes("roles")) {
        setError("System configuration error. Please contact support.");
      } else {
        setError(
          error?.message ||
            "Error creating affiliate account. Please try again.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModernAuthLayout>
      <div className="p-8">
        <h3 className="text-xl font-semibold text-center mb-6">
          {showAffiliateForm ? "Torne-se um Afiliado" : "Create your account"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label
              htmlFor="fullName"
              className="text-sm font-medium text-gray-700 flex items-center gap-2"
            >
              <User size={16} className="text-gray-400" />
              Full Name
            </Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:border-blue-500 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 flex items-center gap-2"
            >
              <Mail size={16} className="text-gray-400" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:border-blue-500 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 flex items-center gap-2"
            >
              <LockKeyhole size={16} className="text-gray-400" />
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 rounded-xl border-gray-200 bg-gray-50/50 focus:border-blue-500 focus:ring-blue-500 transition-all"
            />
            <p className="text-xs text-gray-500 mt-1 pl-1">
              Password must be at least 8 characters
            </p>
          </div>

          {!showAffiliateForm && (
            <>
              {error && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium transition-all"
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>

              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setShowAffiliateForm(true)}
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  Quero me tornar um afiliado
                </button>
              </div>
            </>
          )}

          {showAffiliateForm && (
            <AffiliateRegistration
              email={email}
              fullName={fullName}
              onSubmit={handleAffiliateSubmit}
              isLoading={isLoading}
            />
          )}

          <div className="text-xs text-center text-gray-500 mt-4">
            By creating an account, you agree to our{" "}
            <Link
              to="/"
              className="text-blue-600 hover:underline transition-colors"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/"
              className="text-blue-600 hover:underline transition-colors"
            >
              Privacy Policy
            </Link>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Already have an account?
              </span>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/login"
              className="inline-flex justify-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 w-full transition-all"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </ModernAuthLayout>
  );
}
