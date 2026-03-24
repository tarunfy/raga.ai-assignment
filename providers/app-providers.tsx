"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner/sonner";
import { TooltipProvider } from "@/components/ui/tooltip/tooltip";
import { AuthProvider } from "@/features/auth/context/auth-context";
import { NotificationRegistration } from "@/features/notifications/components/notification-registration/notification-registration";
import { QueryProvider } from "@/providers/query-provider";

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Composes the root providers required by the application.
 *
 * @param children - The application tree that should receive provider context
 */
export const AppProviders = ({ children }: AppProvidersProps) => (
  <ThemeProvider>
    <TooltipProvider>
      <QueryProvider>
        <AuthProvider>
          <NotificationRegistration />
          {children}
          <Toaster />
        </AuthProvider>
      </QueryProvider>
    </TooltipProvider>
  </ThemeProvider>
);
