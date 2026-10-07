import { Decimal } from "@prisma/client/runtime/client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SummaryCardProps {
  icon: React.ReactNode;
  title: string;
  amount: number | Decimal;
}

const SummaryCard = ({ icon, title, amount }: SummaryCardProps) => {
  return (
    <Card className="bg-background mt-7.75">
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
