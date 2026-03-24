import { z } from "zod/v3";

/**
 * Validation schema for the sign-up form.
 */
export const signUpSchema = z
  .object({
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password.")
      .min(8, "Password must be at least 8 characters."),
    email: z
      .string()
      .min(1, "Email is required.")
      .email("Enter a valid email address."),
    password: z
      .string()
      .min(1, "Password is required.")
      .min(8, "Password must be at least 8 characters."),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;
