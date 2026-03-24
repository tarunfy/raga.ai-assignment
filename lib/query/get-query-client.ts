import { isServer, QueryClient } from "@tanstack/react-query";

/**
 * Creates a fresh QueryClient instance with sensible defaults for mock-backed data.
 */
const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 60_000,
      },
    },
  });

let browserQueryClient: QueryClient | undefined;

/**
 * Returns a browser singleton QueryClient and a fresh server instance when needed.
 */
export const getQueryClient = () => {
  if (isServer) {
    return createQueryClient();
  }

  browserQueryClient ??= createQueryClient();

  return browserQueryClient;
};
