import { useAuthContext } from "@/features/auth/context/auth-context";

/**
 * Returns the resolved authentication state for the active browser session.
 */
export const useUser = () => useAuthContext();
