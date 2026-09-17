import { BadgeJapaneseYen, LockIcon, MailIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SignUpPage = () => {
  return (
    <div className="grid h-screen md:grid-cols-2">
      {/* Left side content */}
      <div className="relative flex h-full w-full flex-col justify-center px-5 md:px-29">
        <h1 className="flex items-center gap-1 text-lg font-bold">
          <BadgeJapaneseYen />
          yamada finance.ai
        </h1>
        <span className="mt-8 text-4xl font-bold">Create Account</span>
        <p className="text-muted-foreground mt-3 text-[16px] font-normal">
          Join Yamada Finance AI today and take control of your finances with
          smart, personalized insights.
        </p>
        <div className="mt-8 space-y-1.5">
          <div className="relative">
            <UserIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input placeholder="Full Name" type="text" className="pl-9" />
          </div>

          <div className="relative">
            <MailIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input placeholder="Email" type="email" className="pl-9" />
          </div>

          <div className="relative">
            <LockIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input placeholder="Password" type="password" className="pl-9" />
          </div>

          <Button className="mt-3 w-full">Sign Up</Button>

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
