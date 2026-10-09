import { headers } from "next/headers";

import { TransactionType } from "@/generated/prisma/enums";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { TotalExpensePerCategory, TransactionPercentagePerType } from "./types";

export const getDashboard = async (month: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Unauthorized");
  }

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
  const expensesTotal = Number(
    (
      await prisma.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: {
          amount: true,
        },
      })
    )._sum?.amount,
  );

  const balance = depositsTotal - investmentsTotal - expensesTotal;

  const transactionsTotal = Number(
    (
      await prisma.transaction.aggregate({
        where,
        _sum: { amount: true },
      })
    )._sum.amount,
  );
  const typesPercentage: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]: Math.round(
      (Number(depositsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      (Number(expensesTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.INVESTMENT]: Math.round(
      (Number(investmentsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
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
    percentageOfTotal: Math.round(
      (Number(category._sum.amount) / Number(expensesTotal)) * 100,
    ),
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
