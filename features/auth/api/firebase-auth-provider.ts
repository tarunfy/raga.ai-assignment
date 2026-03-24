import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import type {
  AuthCredentials,
  AuthProviderAdapter,
  AuthUser,
} from "@/features/auth/types";
import { firebaseAuth } from "@/services/firebase";

/**
 * Maps a Firebase user into the normalized app user shape.
 *
 * @param user - The Firebase user returned by the SDK
 */
const mapFirebaseUser = (user: User): AuthUser => ({
  email: user.email,
  uid: user.uid,
});

/**
 * Firebase-backed authentication adapter.
 */
export const firebaseAuthProvider: AuthProviderAdapter = {
  getCurrentUser: () => {
    const currentUser = firebaseAuth.currentUser;

    return currentUser ? mapFirebaseUser(currentUser) : null;
  },
  signIn: async ({ email, password }: AuthCredentials) => {
    const credential = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );

    return mapFirebaseUser(credential.user);
  },
  signOut: async () => {
    await signOut(firebaseAuth);
  },
  signUp: async ({ email, password }: AuthCredentials) => {
    const credential = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );

    return mapFirebaseUser(credential.user);
  },
  subscribeToAuthState: (listener) =>
    onAuthStateChanged(firebaseAuth, (user) => {
      listener(user ? mapFirebaseUser(user) : null);
    }),
};
