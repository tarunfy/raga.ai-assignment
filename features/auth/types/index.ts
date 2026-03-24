/**
 * Shared credentials for authentication flows.
 */
export interface AuthCredentials {
  email: string;
  password: string;
}

/**
 * Normalized user object exposed to the rest of the application.
 */
export interface AuthUser {
  email: string | null;
  uid: string;
}

/**
 * Subscriber callback for auth state changes.
 */
export type AuthStateListener = (user: AuthUser | null) => void;

/**
 * Adapter contract for swappable authentication providers.
 */
export interface AuthProviderAdapter {
  getCurrentUser: () => AuthUser | null;
  signIn: (credentials: AuthCredentials) => Promise<AuthUser>;
  signOut: () => Promise<void>;
  signUp: (credentials: AuthCredentials) => Promise<AuthUser>;
  subscribeToAuthState: (listener: AuthStateListener) => () => void;
}

/**
 * Public auth context state consumed by app components and route guards.
 */
export interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  isReady: boolean;
  signOutUser: () => Promise<void>;
  user: AuthUser | null;
}
