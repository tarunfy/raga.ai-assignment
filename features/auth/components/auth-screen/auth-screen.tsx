"use client";

import { HeartbeatIcon } from "@phosphor-icons/react";
import { useRouter, useSearchParams } from "next/navigation";
import { startTransition } from "react";
import { Badge } from "@/components/ui/badge/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs/tabs";
import { SignInForm } from "@/features/auth/components/sign-in-form/sign-in-form";
import { SignUpForm } from "@/features/auth/components/sign-up-form/sign-up-form";

const authCopy = {
  "sign-in": {
    description:
      "Use your Firebase-backed account to continue into the healthcare workspace.",
    eyebrow: "Secure workspace access",
    title: "Welcome back",
  },
  "sign-up": {
    description:
      "Create your account to access dashboards, analytics, and patient operations.",
    eyebrow: "Create an account",
    title: "Set up your workspace",
  },
} as const;

/**
 * Renders the combined sign-in and sign-up experience for the assignment.
 */
export const AuthScreen = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab =
    searchParams.get("tab") === "sign-up" ? "sign-up" : "sign-in";
  const copy = authCopy[activeTab];

  const handleTabChange = (nextTab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", nextTab);

    startTransition(() => {
      router.replace(`/auth?${params.toString()}`);
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="grid min-h-screen w-full bg-background lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <section className="flex min-h-screen flex-col border-border lg:border-r">
          <div className="flex items-center gap-3 px-6 py-6 md:px-8">
            <div className="flex size-9 items-center justify-center border border-primary/20 bg-primary/10 text-primary">
              <HeartbeatIcon className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="font-heading font-semibold text-base">AegisCare</p>
              <p className="text-muted-foreground text-xs">Healthcare SaaS</p>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center px-6 py-10 md:px-8 lg:px-12">
            <div className="w-full max-w-md space-y-8">
              <div className="space-y-3">
                <Badge className="h-6 w-fit" variant="secondary">
                  {copy.eyebrow}
                </Badge>
                <div className="space-y-2">
                  <h1 className="font-heading font-semibold text-3xl tracking-tight md:text-4xl">
                    {copy.title}
                  </h1>
                  <p className="text-muted-foreground text-sm leading-6 md:text-base">
                    {copy.description}
                  </p>
                </div>
              </div>
              <Tabs onValueChange={handleTabChange} value={activeTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="sign-in">Sign in</TabsTrigger>
                  <TabsTrigger value="sign-up">Create account</TabsTrigger>
                </TabsList>
                <TabsContent className="pt-6" value="sign-in">
                  <SignInForm />
                </TabsContent>
                <TabsContent className="pt-6" value="sign-up">
                  <SignUpForm />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
        <aside className="relative hidden min-h-screen bg-muted lg:flex">
          <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(0deg,oklch(0.82_0.23_65),oklch(0.49_0.23_266))]" />
        </aside>
      </div>
    </div>
  );
};
