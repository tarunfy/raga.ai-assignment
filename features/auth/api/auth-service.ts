import { FirebaseError } from "firebase/app";
import { firebaseAuthProvider } from "@/features/auth/api/firebase-auth-provider";
import type { AuthCredentials, AuthStateListener } from "@/features/auth/types";

const authProvider = firebaseAuthProvider;

/**
 * Signs a user into the configured authentication provider.
 *
 * @param credentials - The validated email and password payload
 */
export const signIn = (credentials: AuthCredentials) =>
  authProvider.signIn(credentials);

/**
 * Registers a user and resolves with the normalized authenticated user object.
 *
 * @param credentials - The validated email and password payload
 */
export const signUp = (credentials: AuthCredentials) =>
  authProvider.signUp(credentials);

/**
 * Signs the current user out of the active authentication provider.
 */
export const signOutUser = () => authProvider.signOut();

/**
 * Returns the currently authenticated user when available.
 */
export const getCurrentUser = () => authProvider.getCurrentUser();

/**
 * Subscribes to auth state changes through the active provider.
 *
 * @param listener - The callback that should receive user updates
 */
export const subscribeToAuthState = (listener: AuthStateListener) =>
  authProvider.subscribeToAuthState(listener);

/**
 * Normalizes provider-specific auth errors into reviewer-friendly UI copy.
 *
 * @param error - The unknown thrown authentication error
 */
export const getAuthErrorMessage = (error: unknown) => {
  if (!(error instanceof FirebaseError)) {
    return "We could not complete the authentication request. Please try again.";
  }

  switch (error.code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/invalid-credential":
    case "auth/invalid-login-credentials":
      return "The email or password is incorrect.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/network-request-failed":
      return "Your network connection appears unstable. Please try again.";
    case "auth/too-many-requests":
      return "Too many attempts were made. Please wait a moment and try again.";
    case "auth/weak-password":
      return "Choose a stronger password with at least 8 characters.";
    default:
      return "Authentication failed. Please try again.";
  }
};
