"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LockIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

import { signInSchema } from "../types/schema";

type SignInFormProps = z.infer<typeof signInSchema>;

export function SignInForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormProps>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormProps) => {
    setIsLoading(true);
    setError(null);

    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          setIsLoading(false);
          router.push("/dashboard");
          router.refresh();
        },
        onError: (ctx) => {
          setIsLoading(false);
          setError(ctx.error.message || "An error occurred during sign-in.");
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-3">
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-500">
          {error}
        </div>
      )}

      {/* Email */}
      <div className="space-y-1">
        <div className="relative">
          <UserIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
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

      <div className="flex justify-end">
        <Link
          href="/forgot-password"
          className="text-muted-foreground px-0 text-sm font-light italic hover:bg-transparent"
        >
          Forgot your password?
        </Link>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Entering..." : "Sign In"}
      </Button>

      <div className="mt-3 text-center">
        <span className="text-muted-foreground text-sm font-medium">
          New Here?{" "}
        </span>
        <Link href="/sign-up" className="text-primary underline">
          Create Account
        </Link>
      </div>
    </form>
  );
}
