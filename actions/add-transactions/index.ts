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

import { addTransactionsSchema } from "./schema";

interface AddTransactionsParams {
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
}

export async function addTransactions(params: AddTransactionsParams) {
  addTransactionsSchema.parse(params);
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  await prisma.transaction.create({
    data: { ...params, user: { connect: { id: session.user.id } } },
  });

  revalidatePath("/dashboard/transactions");
}
