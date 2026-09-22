"use client"

import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const ForgotPasswordPage = () => {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("This page is not working in the moment");
  };

  return (
    <div className="flex flex-1 items-center justify-center">
      <Card>
        <CardHeader className="space-y-2">
          <CardTitle className="text-center">Forgot Password?</CardTitle>
          <CardDescription>
            Enter your email address so that we can send you a password reset
            link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="mt-8 space-y-3" onSubmit={onSubmit}>
            <Input placeholder="E-mail" />
            <Button type="submit" className="w-full">
              Send
            </Button>
          </form>
        </CardContent>
        <CardFooter className="self-center border-none bg-transparent">
          <ArrowLeftIcon />
          <Link href="/sign-in">Back to Login</Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
