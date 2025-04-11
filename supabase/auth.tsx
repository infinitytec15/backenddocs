import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import { getDefaultPlan, createUserPlan } from "../src/lib/api/user-plans";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  userRole: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  registerAffiliate: (
    email: string,
    taxId: string,
    bankInfo: string,
  ) => Promise<void>;
  registerAffiliateWithSignup: (
    email: string,
    password: string,
    fullName: string,
    taxId: string,
    bankInfo: string,
  ) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProviderComponent({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        // Fetch user role from user_settings
        const { data: userSettings } = await supabase
          .from("user_settings")
          .select("role")
          .eq("user_id", currentUser.id)
          .single();

        setUserRole(userSettings?.role || "user");
      } else {
        setUserRole(null);
      }

      setLoading(false);
    });

    // Listen for changes on auth state (signed in, signed out, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        // Fetch user role from user_settings
        const { data: userSettings } = await supabase
          .from("user_settings")
          .select("role")
          .eq("user_id", currentUser.id)
          .single();

        setUserRole(userSettings?.role || "user");
      } else {
        setUserRole(null);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    // First create the user account
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) throw error;

    // If user was created successfully, subscribe them to a default plan
    if (data.user) {
      try {
        // Record signup date in the users table
        const signupDate = new Date().toISOString();
        await supabase
          .from("users")
          .update({ signup_date: signupDate })
          .eq("id", data.user.id);

        // Create user_settings entry with default role 'user'
        await supabase.from("user_settings").insert({
          user_id: data.user.id,
          role: "user",
          created_at: new Date().toISOString(),
        });

        // Get the default plan ID (lowest price active plan)
        const defaultPlanId = await getDefaultPlan();

        if (defaultPlanId) {
          // Create a user plan entry with 7-day trial period
          const startDate = new Date();
          const endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + 7); // 7-day trial

          await createUserPlan(
            data.user.id,
            defaultPlanId,
            startDate.toISOString(),
            endDate.toISOString(),
          );

          console.log(
            `User ${data.user.id} subscribed to default plan ${defaultPlanId} with 7-day trial`,
          );
        } else {
          console.warn("No default plan found for automatic subscription");
        }
      } catch (planError) {
        // Log the error but don't throw it - we still want the user to be created
        console.error("Error subscribing user to default plan:", planError);
      }
    }
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    if (data.user) {
      // Fetch user role from user_settings
      const { data: userSettings } = await supabase
        .from("user_settings")
        .select("role")
        .eq("user_id", data.user.id)
        .single();

      setUserRole(userSettings?.role || "user");
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const registerAffiliate = async (
    email: string,
    taxId: string,
    bankInfo: string,
  ) => {
    // Call the register_affiliate edge function
    const { data, error } = await supabase.functions.invoke(
      "register_affiliate",
      {
        body: { email, taxId, bankInfo },
      },
    );

    if (error) throw error;
    return data;
  };

  const registerAffiliateWithSignup = async (
    email: string,
    password: string,
    fullName: string,
    taxId: string,
    bankInfo: string,
  ) => {
    // First create the user account
    await signUp(email, password, fullName);

    // Then register as affiliate
    await registerAffiliate(email, taxId, bankInfo);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        userRole,
        signIn,
        signUp,
        signOut,
        registerAffiliate,
        registerAffiliateWithSignup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Export the component
export const AuthProvider = AuthProviderComponent;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
