import type { Metadata } from "next";
import { AuthScreen } from "@/features/auth/components/auth-screen/auth-screen";
import { GuestGuard } from "@/features/auth/components/guest-guard/guest-guard";

export const metadata: Metadata = {
  title: "Authentication",
};

const AuthPage = () => (
  <GuestGuard>
    <AuthScreen />
  </GuestGuard>
);

export default AuthPage;
