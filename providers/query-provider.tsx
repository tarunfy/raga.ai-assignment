"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { getQueryClient } from "@/lib/query/get-query-client";

const queryClient = getQueryClient();

interface QueryProviderProps {
  children: ReactNode;
}

/**
 * Provides a shared TanStack Query client to the application.
 *
 * @param children - The application tree that should receive query state
 */
export const QueryProvider = ({ children }: QueryProviderProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
