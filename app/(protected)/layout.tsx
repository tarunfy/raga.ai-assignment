import type { ReactNode } from "react";
import { AppShell } from "@/components/common/layout/app-shell/app-shell";
import { AuthGuard } from "@/features/auth/components/auth-guard/auth-guard";

interface ProtectedLayoutProps {
  children: ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => (
  <AuthGuard>
    <AppShell>{children}</AppShell>
  </AuthGuard>
);

export default ProtectedLayout;
