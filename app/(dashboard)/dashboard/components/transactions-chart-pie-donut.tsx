"use client";

import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Pie, PieChart } from "recharts";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TransactionPercentagePerType } from "@/data-access/get-dashboard/types";
import { TransactionType } from "@/generated/prisma/enums";

import PercentageItem from "./percentage-item";

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Invested",
    color: "#808080",
  },
  [TransactionType.DEPOSIT]: {
    label: "Received",
    color: "#00FF00",
  },
  [TransactionType.EXPENSE]: {
    label: "Spent",
    color: "#FF0000",
  },
  empty: {
    label: "Empty",
    color: "#FFFFFF",
  },
} satisfies ChartConfig;

interface TransactionsChartPieDonutProps {
  typesPercentage: TransactionPercentagePerType;
  investmentsTotal: number;
  depositsTotal: number;
  expensesTotal: number;
}

export function TransactionsChartPieDonut({
  typesPercentage,
  investmentsTotal,
  depositsTotal,
  expensesTotal,
}: TransactionsChartPieDonutProps) {
  const hasData =
    depositsTotal > 0 || expensesTotal > 0 || investmentsTotal > 0;

  const chartData = hasData
    ? [
        {
          type: TransactionType.DEPOSIT,
          amount: depositsTotal,
          fill: "var(--color-DEPOSIT)",
        },
        {
          type: TransactionType.EXPENSE,
          amount: expensesTotal,
          fill: "var(--color-EXPENSE)",
        },
        {
          type: TransactionType.INVESTMENT,
          amount: investmentsTotal,
          fill: "var(--color-INVESTMENT)",
        },
      ]
    : [
        {
          type: "empty",
          amount: 1,
          fill: "var(--color-empty)",
        },
      ];

  return (
    <Card className="bg-background flex flex-col">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-62.5"
        >
          <PieChart>
            {hasData && (
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
            )}
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
              strokeWidth={hasData ? 1 : 0}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="bg-background flex-col gap-2 border-t-transparent text-sm">
        <div className="w-full space-y-3">
          <PercentageItem
            icon={<TrendingUpIcon size={16} className="text-green-500" />}
            title="Receita"
            value={typesPercentage?.[TransactionType.DEPOSIT]}
          />
          <PercentageItem
            icon={<TrendingDownIcon size={16} className="text-red-500" />}
            title="Despesas"
            value={typesPercentage?.[TransactionType.EXPENSE]}
          />
          <PercentageItem
            icon={<PiggyBankIcon size={16} />}
            title="Investido"
            value={typesPercentage?.[TransactionType.INVESTMENT]}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
