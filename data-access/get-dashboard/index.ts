import { headers } from "next/headers";

import { TransactionType } from "@/generated/prisma/enums";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { TotalExpensePerCategory, TransactionPercentagePerType } from "./types";

export const getDashboard = async (month: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  if (!/^(0[1-9]|1[0-2])$/.test(month)) {
    throw new Error("Invalid month");
  }

  const monthNumber = Number(month);
  const year = new Date().getFullYear();
  const where = {
    userId: session.user.id,
    date: {
      gte: new Date(Date.UTC(year, monthNumber - 1, 1)),
      lt: new Date(Date.UTC(year, monthNumber, 1)),
    },
  };

  const depositsTotal = Number(
    (
      await prisma.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )._sum.amount ?? 0,
  );
  const investmentsTotal = Number(
    (
      await prisma.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )._sum.amount ?? 0,
  );
  const expensesTotal = Number(
    (
      await prisma.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )._sum.amount ?? 0,
  );

  const balance = depositsTotal - investmentsTotal - expensesTotal;

  const transactionsTotal = Number(
    (
      await prisma.transaction.aggregate({
        where,
        _sum: { amount: true },
      })
    )._sum.amount ?? 0,
  );
  const percentageOfTransactions = (amount: number) =>
    transactionsTotal === 0
      ? 0
      : Math.round((amount / transactionsTotal) * 100);
  const typesPercentage: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]: percentageOfTransactions(depositsTotal),
    [TransactionType.EXPENSE]: percentageOfTransactions(expensesTotal),
    [TransactionType.INVESTMENT]: percentageOfTransactions(investmentsTotal),
  };
  const totalExpensePerCategory: TotalExpensePerCategory[] = (
    await prisma.transaction.groupBy({
      by: ["category"],
      where: {
        ...where,
        type: TransactionType.EXPENSE,
      },
      _sum: {
        amount: true,
      },
    })
  ).map((category) => ({
    category: category.category,
    totalAmount: Number(category._sum.amount),
    percentageOfTotal:
      expensesTotal === 0
        ? 0
        : Math.round((Number(category._sum.amount) / expensesTotal) * 100),
  }));
  const lastTransactions = await prisma.transaction.findMany({
    where,
    orderBy: { date: "desc" },
    take: 15,
  });
  const serializedTransactions = lastTransactions.map((transaction) => ({
    ...transaction,
    amount: Number(transaction.amount),
  }));

  return {
    balance,
    depositsTotal,
    investmentsTotal,
    expensesTotal,
    typesPercentage,
    totalExpensePerCategory,
    lastTransactions: serializedTransactions,
  };
};
