import { BadgeJapaneseYen, LockIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
        <div className="mt-8 space-y-1.5">
          <div className="relative">
            <UserIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input placeholder="Email" type="email" className="pl-9" />
          </div>

          <div className="relative">
            <LockIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input placeholder="Password" type="password" className="pl-9" />
          </div>
          <div className="flex justify-end">
            <Button
              variant="ghost"
              className="text-muted-foreground px-0 text-sm font-light italic hover:bg-transparent"
            >
              Forgot your password?
            </Button>
          </div>
          <Button className="mt-3 w-full">Sign In</Button>
          <div className="mt-3 text-center">
            <span className="text-muted-foreground text-sm font-medium">
              New Here?{" "}
            </span>
            <Link href="/sign-up" className="text-primary">
              Create Account
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

export default SignInPage;
