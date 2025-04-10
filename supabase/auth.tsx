import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import { getDefaultPlan, createUserPlan } from "../src/lib/api/user-plans";

type AuthContextType = {
  user: User | null;
  loading: boolean;
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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state (signed in, signed out, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
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

        // Get the default plan ID (lowest price active plan)
        const defaultPlanId = await getDefaultPlan();

        if (defaultPlanId) {
          // Create a user plan entry
          await createUserPlan(data.user.id, defaultPlanId);
          console.log(
            `User ${data.user.id} subscribed to default plan ${defaultPlanId}`,
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
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
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
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
