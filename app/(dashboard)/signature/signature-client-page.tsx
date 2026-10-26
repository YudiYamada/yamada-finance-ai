import { CheckIcon, XIcon } from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import AcquirePlanButton from "./components/acquire-plan-button";

export default function SignatureClientPage() {
  return (
    <div className="flex gap-6">
      {/* Basic Plan Card */}
      <Card className="bg-background text-foreground w-112.75 p-10">
        <CardHeader className="space-y-4">
          <CardTitle className="text-2xl font-semibold">Basic Plan</CardTitle>
          <CardAction className="bg-primary/10 text-primary rounded-[29px] px-2.5">
            Current
          </CardAction>
          <CardDescription className="mb-10 flex items-center justify-center gap-0.5">
            <span className="text-3xl">$0</span>
            <span className="text-xl">/month</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="border-accent-foreground flex-col items-center justify-center gap-4 border-t">
          <div className="mt-10 flex flex-col items-start">
            <div className="flex items-center justify-center gap-3">
              <CheckIcon className="h-4 w-4 shrink-0 text-green-500" />
              <p className="text-[16px] font-normal">
                Only 10 transactions per day 7/10
              </p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <XIcon className="text-muted-foreground h-4 w-4 shrink-0" />
              <p className="text-[16px] font-normal">Unlimited AI reports</p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <XIcon className="text-muted-foreground h-4 w-4 shrink-0" />
              <p className="text-[16px] font-normal">...</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pro Plan Card */}
      <Card className="bg-background text-foreground w-112.75 p-10">
        <CardHeader className="space-y-4">
          <CardTitle className="text-2xl font-semibold">Pro Plan</CardTitle>
          <CardDescription className="mb-10 flex items-center justify-center gap-0.5">
            <span className="text-3xl">$1</span>
            <span className="text-xl">/month</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="border-accent-foreground flex-col items-center justify-center gap-4 border-t">
          <div className="mt-10 flex flex-col items-start">
            <div className="flex items-center justify-center gap-3">
              <CheckIcon className="h-4 w-4 shrink-0 text-green-500" />
              <p className="text-[16px] font-normal">Unlimited transactions</p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <CheckIcon className="h-4 w-4 shrink-0 text-green-500" />
              <p className="text-[16px] font-normal">1 AI reports per day</p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <CheckIcon className="h-4 w-4 shrink-0 text-green-500" />
              <p className="text-[16px] font-normal">...</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t-transparent bg-transparent">
          <AcquirePlanButton />
        </CardFooter>
      </Card>
    </div>
  );
}
