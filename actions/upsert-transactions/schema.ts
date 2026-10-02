import z from "zod";

import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@/generated/prisma/enums";

export const upsertTransactionsSchema = z.object({
  name: z.string().trim().min(1).max(32),
  amount: z.number().min(0.01).positive(),
  type: z.enum(TransactionType),
  category: z.enum(TransactionCategory),
  paymentMethod: z.enum(TransactionPaymentMethod),
  date: z.date({
    error: (issue) => (issue.input === undefined ? "Required" : "Invalid date"),
  }),
});
