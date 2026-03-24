"use client";

import { usePathname, useRouter } from "next/navigation";
import { type PropsWithChildren, startTransition, useEffect } from "react";
import { FullScreenLoader } from "@/components/common/feedback/full-screen-loader/full-screen-loader";
import { useUser } from "@/hooks/use-user";

/**
 * Prevents unauthenticated access to protected routes.
 *
 * @param children - The protected route content
 */
export const AuthGuard = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useUser();

  useEffect(() => {
    if (!(isLoading || isAuthenticated)) {
      startTransition(() => {
        router.replace(`/auth?next=${encodeURIComponent(pathname)}`);
      });
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <FullScreenLoader
        description="Securing access to your workspace."
        title="Validating your session"
      />
    );
  }

  return children;
};
