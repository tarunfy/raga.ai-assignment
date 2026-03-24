"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircleIcon, UserPlusIcon } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/common/feedback/loading-spinner/loading-spinner";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/label/label";
import { getAuthErrorMessage, signUp } from "@/features/auth/api/auth-service";
import {
  type SignUpFormValues,
  signUpSchema,
} from "@/features/auth/schemas/sign-up-schema";

/**
 * Registers a new user account and lets Firebase auto-authenticate the session.
 */
export const SignUpForm = () => {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<SignUpFormValues>({
    defaultValues: {
      confirmPassword: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (values: SignUpFormValues) => {
    try {
      await signUp({
        email: values.email,
        password: values.password,
      });
      toast.success("Account created successfully. Redirecting you now.");
    } catch (error) {
      toast.error(getAuthErrorMessage(error));
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="sign-up-email">Work email</Label>
        <Input
          autoComplete="email"
          disabled={isSubmitting}
          id="sign-up-email"
          placeholder="care.lead@hospital.com"
          type="email"
          {...register("email")}
        />
        {errors.email ? (
          <p className="text-destructive text-sm">{errors.email.message}</p>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="sign-up-password">Password</Label>
        <Input
          autoComplete="new-password"
          disabled={isSubmitting}
          id="sign-up-password"
          placeholder="Create a password"
          type="password"
          {...register("password")}
        />
        {errors.password ? (
          <p className="text-destructive text-sm">{errors.password.message}</p>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="sign-up-confirm-password">Confirm password</Label>
        <Input
          autoComplete="new-password"
          disabled={isSubmitting}
          id="sign-up-confirm-password"
          placeholder="Confirm your password"
          type="password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword ? (
          <p className="text-destructive text-sm">
            {errors.confirmPassword.message}
          </p>
        ) : null}
      </div>
      <Button
        className="w-full"
        disabled={isSubmitting}
        size="lg"
        type="submit"
      >
        {isSubmitting ? (
          <LoadingSpinner />
        ) : (
          <UserPlusIcon className="size-4" />
        )}
        {isSubmitting ? "Creating account..." : "Create account"}
      </Button>
      <div className="rounded-none border border-primary/10 bg-primary/5 px-4 py-3 text-muted-foreground text-sm">
        <div className="flex items-center gap-2 text-foreground">
          <CheckCircleIcon className="size-4 text-primary" />
          Instant access after sign-up
        </div>
        <p className="mt-1 leading-6">
          Once the account is created, Firebase signs the user in automatically
          and the app redirects to the protected workspace.
        </p>
      </div>
    </form>
  );
};
