"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LockIcon, LockOpenIcon, MailIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

import { signUpSchema } from "../types/schema";

type SignUpFormProps = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormProps>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormProps) => {
    console.log("Formulário validado, enviando dados:", data);
    const { email, password, name } = data;

    await authClient.signUp.email(
      {
        email,
        password,
        name,
        callbackURL: "/dashboard",
      },
      {
        onRequest: () => {
          setIsLoading(true);
          setError(null);
        },
        onSuccess: () => {
          setIsLoading(false);
          router.push("/dashboard");
          router.refresh();
        },
        onError: (ctx) => {
          setIsLoading(false);
          setError(
            ctx.error.message ||
              "An error occurred during sign-up. Please try again.",
          );
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-1.5">
      {error && <p className="mb-2 text-sm text-red-500">{error}</p>}

      {/* Name */}
      <div className="space-y-1">
        <div className="relative">
          <UserIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Name"
            type="text"
            className="pl-9"
            {...register("name")}
          />
        </div>
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1">
        <div className="relative">
          <MailIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Email"
            type="email"
            className="pl-9"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1">
        <div className="relative">
          <LockIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Password"
            type="password"
            className="pl-9"
            {...register("password")}
          />
        </div>
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-1">
        <div className="relative">
          <LockOpenIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Confirm Password"
            type="password"
            className="pl-9"
            {...register("passwordConfirmation")}
          />
        </div>
        {errors.passwordConfirmation && (
          <p className="text-xs text-red-500">
            {errors.passwordConfirmation.message}
          </p>
        )}
      </div>

      <Button className="mt-3 w-full" disabled={isLoading} type="submit">
        {isLoading ? "Signing up..." : "Sign Up"}
      </Button>
    </form>
  );
};

export default SignUpForm;
