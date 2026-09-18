import { BadgeJapaneseYen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import SignUpForm from "./components/sign-up-form";

const SignUpPage = () => {
  return (
    <div className="grid h-screen md:grid-cols-2">
      {/* Left side content */}
      <div className="relative flex h-full w-full flex-col justify-center px-5 md:px-29">
        <h1 className="flex items-center gap-1 text-lg">
          <BadgeJapaneseYen />
          yamada finance.ai
        </h1>
        <span className="mt-8 text-4xl font-bold">Create Account</span>
        <p className="text-muted-foreground mt-3 text-[16px] font-normal">
          Join Yamada Finance AI today and take control of your finances with
          smart, personalized insights.
        </p>
        <div className="mt-8 space-y-1.5">
          <SignUpForm />

          <div className="mt-3 text-center">
            <span className="text-muted-foreground text-sm font-medium">
              Already have an account?{" "}
            </span>
            <Link href="/sign-in" className="text-primary">
              Sign In
            </Link>
          </div>
        </div>
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

export default SignUpPage;
