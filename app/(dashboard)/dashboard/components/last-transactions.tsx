import {
  ArrowLeftRight,
  Banknote,
  ChevronRightIcon,
  CreditCard,
  FileText,
  QrCode,
  Wallet,
} from "lucide-react";
import Link from "next/link";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Transaction,
  TransactionPaymentMethod,
  TransactionType,
} from "@/generated/prisma/client";
import { formatCurrencyUSD } from "@/utils/format-currency-usd";

export type TransactionWithNumberAmount = Omit<Transaction, "amount"> & {
  amount: number;
};

interface LastTransactionsProps {
  lastTransactions: TransactionWithNumberAmount[];
}

const getPaymentMethodIcon = (method: TransactionPaymentMethod | string) => {
  switch (String(method).toUpperCase()) {
    case "CREDIT_CARD":
    case "DEBIT_CARD":
      return <CreditCard className="h-10 w-10" />;
    case "BANK_TRANSFER":
      return <ArrowLeftRight className="h-10 w-10" />;
    case "BANK_SLIP":
      return <FileText className="h-10 w-10" />;
    case "CASH":
      return <Banknote className="h-10 w-10" />;
    case "PIX":
      return <QrCode className="h-10 w-10" />;
    default:
      return <Wallet className="h-10 w-10" />;
  }
};

const LastTransactions = ({ lastTransactions }: LastTransactionsProps) => {
  const getAmountColor = (transaction: TransactionWithNumberAmount) => {
    if (transaction.type === TransactionType.EXPENSE) {
      return "text-red-500";
    }
    if (transaction.type === TransactionType.DEPOSIT) {
      return "text-primary";
    }
    return "text-white";
  };

  const getAmountPrefix = (transaction: TransactionWithNumberAmount) => {
    if (transaction.type === TransactionType.DEPOSIT) {
      return "+";
    }
    return "-";
  };

  return (
    <ScrollArea className="border-accent-foreground h-full rounded-md border p-6">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="font-bold">Latest Transactions</CardTitle>
        <Link
          href="/transactions"
          className="border-accent-foreground flex items-center justify-center rounded-2xl border px-2 py-1.5"
        >
          See more <ChevronRightIcon />
        </Link>
      </CardHeader>
      <CardContent className="mt-6 space-y-6">
        {lastTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center rounded-lg">
                {getPaymentMethodIcon(transaction.paymentMethod)}
              </div>
              <div>
                <p className="text-sm font-bold">{transaction.name}</p>
                <p className="text-muted-foreground text-sm">
                  {new Date(transaction.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <p className={`text-sm font-bold ${getAmountColor(transaction)}`}>
              {getAmountPrefix(transaction)}
              {formatCurrencyUSD(transaction.amount)}
            </p>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default LastTransactions;
