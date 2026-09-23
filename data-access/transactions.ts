import "server-only";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getTransactions() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Unauthorized")
  }
  const transactions = await prisma.transaction.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      date: "desc",
    }
  });

  // Converts the Decimal to a number to avoid errors when passing it to Client Components.
  return transactions.map((transaction) => ({
    ...transaction,
    amount: transaction.amount.toNumber(), 
  }));
}
