import { Decimal } from "@prisma/client/runtime/client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  icon: React.ReactNode;
  title: string;
  amount: number | Decimal;
  className?: string;
}

const SummaryCard = ({ icon, title, amount, className }: SummaryCardProps) => {
  return (
    <Card className={cn("bg-background mt-7.75", className)}>
      <CardHeader className="flex flex-col gap-3.5">
        <CardTitle className="text-muted-foreground flex items-center gap-2 text-[14px] font-semibold">
          {icon}
          {title}
        </CardTitle>
        <CardDescription className="flex items-center gap-2 text-2xl font-bold">
          {Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(typeof amount === "number" ? amount : amount.toNumber())}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default SummaryCard;
