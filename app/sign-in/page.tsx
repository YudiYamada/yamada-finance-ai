import { BadgeJapaneseYen } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import { SignInForm } from "./components/sign-in-form";

const SignInPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="grid h-screen lg:grid-cols-2">
      {/* Left side content */}
      <div className="relative flex h-full w-full flex-col justify-center px-5 md:px-30 lg:px-29">
        <h1 className="flex gap-1">
          <BadgeJapaneseYen />
          yamada finance.ai
        </h1>
        <span className="mt-8 text-4xl font-bold">Welcome</span>
        <p className="text-muted-foreground mt-3 text-[16px] font-normal">
          Yamada Finance AI is a financial management platform that uses AI to
          monitor your transactions and offer personalized insights, making
          budget control easier.
        </p>

        {/* Sign In Form */}
        <SignInForm />
      </div>

      {/* Right side content */}
      <div className="relative hidden h-full w-full lg:block">
        <Image
          src="/login.jpeg"
          alt="ilustração de gráficos"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default SignInPage;
