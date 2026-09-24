"use client";

import AddTransactionButton from "@/components/add-transaction-button";
import { DataTable } from "@/components/ui/data-table";
import { getTransactions } from "@/data-access/transactions";

import { columns } from "./_components/columns";

interface TransactionsClientPageProps {
  transactions: Awaited<ReturnType<typeof getTransactions>>;
}

const TransactionsClientPage = ({
  transactions,
}: TransactionsClientPageProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <AddTransactionButton />
      </div>
      <DataTable columns={columns} data={transactions} />
    </div>
  );
};

export default TransactionsClientPage;
