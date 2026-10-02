"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@/generated/prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { upsertTransactionsSchema } from "./schema";

interface upsertTransactionsParams {
  id?: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
}

export async function upsertTransactions(params: upsertTransactionsParams) {
  upsertTransactionsSchema.parse(params);
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const { id, ...data } = params;

  if (id) {
    await prisma.transaction.update({
      where: { id },
      data: {
        ...data,
        userId: session.user.id,
      },
    });
  } else {
    await prisma.transaction.create({
      data: {
        ...data,
        userId: session.user.id,
      },
    });
  }

  revalidatePath("/dashboard/transactions");
}
