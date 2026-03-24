"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyIcon, SignInIcon } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/common/feedback/loading-spinner/loading-spinner";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/label/label";
import { getAuthErrorMessage, signIn } from "@/features/auth/api/auth-service";
import {
  type SignInFormValues,
  signInSchema,
} from "@/features/auth/schemas/sign-in-schema";

/**
 * Handles email and password authentication for existing users.
 */
export const SignInForm = () => {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<SignInFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (values: SignInFormValues) => {
    try {
      await signIn(values);
      toast.success("Welcome back. Redirecting to your dashboard.");
    } catch (error) {
      toast.error(getAuthErrorMessage(error));
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="sign-in-email">Work email</Label>
        <Input
          autoComplete="email"
          disabled={isSubmitting}
          id="sign-in-email"
          placeholder="care.lead@hospital.com"
          type="email"
          {...register("email")}
        />
        {errors.email ? (
          <p className="text-destructive text-sm">{errors.email.message}</p>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="sign-in-password">Password</Label>
        <Input
          autoComplete="current-password"
          disabled={isSubmitting}
          id="sign-in-password"
          placeholder="Enter your password"
          type="password"
          {...register("password")}
        />
        {errors.password ? (
          <p className="text-destructive text-sm">{errors.password.message}</p>
        ) : null}
      </div>
      <Button
        className="w-full"
        disabled={isSubmitting}
        size="lg"
        type="submit"
      >
        {isSubmitting ? <LoadingSpinner /> : <SignInIcon className="size-4" />}
        {isSubmitting ? "Signing in..." : "Sign in"}
      </Button>
      <div className="rounded-none border border-border/70 bg-muted/60 px-4 py-3 text-muted-foreground text-sm">
        <div className="flex items-center gap-2 text-foreground">
          <LockKeyIcon className="size-4 text-primary" />
          Real Firebase authentication
        </div>
        <p className="mt-1 leading-6">
          Your session is persisted by Firebase and validated automatically on
          refresh.
        </p>
      </div>
    </form>
  );
};
