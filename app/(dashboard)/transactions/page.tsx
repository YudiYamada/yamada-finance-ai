import { getTransactions } from "@/data-access/transactions";

import TransactionsClientPage from "./transactions-client-page";

const TransactionsPage = async () => {
  const transactions = await getTransactions();
  return (
    <div className="space-y-6">
      <TransactionsClientPage transactions={transactions} />
    </div>
  );
};

export default TransactionsPage;
