"use client";

import { LockIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          router.push("/dashboard");
          router.refresh();
        },
        onError: (ctx) => {
          setError(ctx.error.message || "An error occurred during sign-in.");
          setLoading(false);
        },
      },
    );
  };

  return (
    <form onSubmit={handleSignIn} className="mt-8 space-y-4">
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-500">
          {error}
        </div>
      )}

      <div className="relative">
        <UserIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder="Email"
          type="email"
          className="pl-9"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="relative">
        <LockIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder="Password"
          type="password"
          className="pl-9"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="flex justify-end">
        <Button
          type="button"
          variant="ghost"
          className="text-muted-foreground px-0 text-sm font-light italic hover:bg-transparent"
          disabled={loading}
        >
          Forgot your password?
        </Button>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Entering" : "Sign In"}
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
