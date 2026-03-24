"use client";

import {
  createContext,
  type ReactNode,
  startTransition,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  getCurrentUser,
  signOutUser,
  subscribeToAuthState,
} from "@/features/auth/api/auth-service";
import type { AuthContextValue, AuthUser } from "@/features/auth/types";

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provides resolved authentication state to the application tree.
 *
 * @param children - The application tree that should receive auth state
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(() => getCurrentUser());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthState((nextUser) => {
      startTransition(() => {
        setUser(nextUser);
        setIsLoading(false);
      });
    });

    return unsubscribe;
  }, []);

  const value: AuthContextValue = {
    isAuthenticated: Boolean(user),
    isLoading,
    isReady: !isLoading,
    signOutUser,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Reads the auth context value and enforces provider usage.
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within the AuthProvider.");
  }

  return context;
};
