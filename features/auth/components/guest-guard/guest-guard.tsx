"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { type PropsWithChildren, startTransition, useEffect } from "react";
import { FullScreenLoader } from "@/components/common/feedback/full-screen-loader/full-screen-loader";
import { getSafeRedirectPath } from "@/features/auth/utils/get-safe-redirect-path";
import { useUser } from "@/hooks/use-user";

/**
 * Redirects authenticated users away from guest-only routes like the auth page.
 *
 * @param children - The guest route content
 */
export const GuestGuard = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const nextPath = getSafeRedirectPath(searchParams.get("next"));

      startTransition(() => {
        router.replace(nextPath);
      });
    }
  }, [isAuthenticated, isLoading, router, searchParams]);

  if (isLoading || isAuthenticated) {
    return (
      <FullScreenLoader
        description="Checking your account before opening the portal."
        title="Loading your access"
      />
    );
  }

  return children;
};
