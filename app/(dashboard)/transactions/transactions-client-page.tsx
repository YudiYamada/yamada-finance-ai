"use client";

import { DataTable } from "@/components/ui/data-table";
import { getTransactions } from "@/data-access/transactions";

import { columns } from "./_components/columns";

interface TransactionsClientPageProps {
  transactions: Awaited<ReturnType<typeof getTransactions>>;
}

const TransactionsClientPage = ({
  transactions,
}: TransactionsClientPageProps) => {
  return <DataTable columns={columns} data={transactions} />;
};

export default TransactionsClientPage;
