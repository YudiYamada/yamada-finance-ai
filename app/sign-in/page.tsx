import { BadgeJapaneseYen } from "lucide-react";
import Image from "next/image";

import { SignInForm } from "./components/sign-in-form";

const SignInPage = () => {
  return (
    <div className="grid h-screen md:grid-cols-2">
      {/* Left side content */}
      <div className="relative flex h-full w-full flex-col justify-center px-5 md:px-29">
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
      <div className="relative hidden h-full w-full md:block">
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
