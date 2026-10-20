"use client";

import { CheckIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface SignatureFeature {
  text: string;
  included: boolean;
}

export interface SignatureCardProps {
  title: string;
  badgeText?: string;
  price: string;
  period?: string;
  features: SignatureFeature[];
  buttonText: string;
  buttonVariant?: "default" | "outline";
  buttonClassName?: string;
  onButtonClick?: () => void;
  isCurrentPlan?: boolean;
}

const SignatureCard = ({
  title,
  badgeText = "Atual",
  price,
  period = "/mês",
  features,
  buttonText,
  buttonVariant = "outline",
  buttonClassName,
  onButtonClick,
  isCurrentPlan = false,
}: SignatureCardProps) => {
  return (
    <Card className="bg-background text-foreground w-112.75 p-10">
      <CardHeader className="space-y-4">
        <CardTitle className="text-2xl font-semibold">{title}</CardTitle>

        {isCurrentPlan && badgeText && (
          <CardAction className="bg-primary/10 text-primary rounded-[29px] px-2.5">
            {badgeText}
          </CardAction>
        )}

        <CardDescription className="flex items-center justify-center gap-0.5">
          <span className="text-3xl">{price}</span>
          <span className="text-xl">{period}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="border-accent-foreground flex-col items-center justify-center gap-4 border-t">
        <div className="mt-10 flex flex-col gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              {feature.included ? (
                <CheckIcon className="h-4 w-4 shrink-0 text-primary/50" />
              ) : (
                <XIcon className="text-muted-foreground h-4 w-4 shrink-0" />
              )}
              <p className="text-[16px] font-normal">{feature.text}</p>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="border-t-transparent bg-transparent">
        <Button
          variant={buttonVariant}
          className={`min-w-full rounded-3xl p-5 ${buttonClassName}`}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignatureCard;
