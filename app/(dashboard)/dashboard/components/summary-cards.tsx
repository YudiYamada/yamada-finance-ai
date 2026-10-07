import {
  EyeIcon,
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";

import AddTransactionButton from "@/components/add-transaction-button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

import SummaryCard from "./summary-card";

interface SummaryCardsProps {
  month?: string;
}

const SummaryCards = async ({ month }: SummaryCardsProps) => {
  const where = {
    date: {
      gte: new Date(`2026-${month}-01`),
      lte: new Date(`2026-${month}-31`),
    },
  };

  const depositsTotal = Number(
    (
      await prisma.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: {
          amount: true,
        },
      })
    )._sum?.amount,
  );
  const investmentsTotal = Number(
    (
      await prisma.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: {
          amount: true,
        },
      })
    )._sum?.amount,
  );
  const expessesTotal = Number(
    (
      await prisma.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: {
          amount: true,
        },
      })
    )._sum?.amount,
  );

  const balance = depositsTotal - investmentsTotal - expessesTotal;

  return (
    <div className="mt-7.75">
      <div>
        <Card className="bg-background">
          <CardHeader>
            <CardTitle className="text-muted-foreground flex items-center gap-2 text-[14px] font-semibold">
              <WalletIcon />
              Balance
            </CardTitle>
            <CardDescription className="flex items-center gap-2 text-4xl font-bold">
              {Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(balance)}
              <EyeIcon />
            </CardDescription>
            <CardAction className="flex h-full items-center">
              <AddTransactionButton />
            </CardAction>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <SummaryCard
          icon={
            <PiggyBankIcon className="bg-accent-foreground text-accent rounded-md p-1" />
          }
          title="Invested"
          amount={investmentsTotal}
        />

        <SummaryCard
          icon={
            <TrendingUpIcon className="rounded-md bg-green-950 p-1 text-green-400" />
          }
          title="Received"
          amount={depositsTotal}
        />

        <SummaryCard
          icon={
            <TrendingDownIcon className="rounded-md bg-red-950 p-1 text-red-400" />
          }
          title="Spent"
          amount={expessesTotal}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
