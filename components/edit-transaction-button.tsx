"use client";

import { PencilIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import UpsertTransactionDialog from "@/components/upsert-transaction-dialog";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@/generated/prisma/enums";

interface EditTransactionButtonProps {
  transaction: {
    id: string;
    name: string;
    type: TransactionType;
    amount: number;
    category?: TransactionCategory;
    paymentMethod: TransactionPaymentMethod;
    date: Date;
    createdAt?: Date;
    updatedAt?: Date;
    userId?: string;
  };
}

const EditTransactionButton = ({ transaction }: EditTransactionButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
        <PencilIcon className="h-4 w-4" />
      </Button>

      <UpsertTransactionDialog
        isLoading={isLoading}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setIsLoading={setIsLoading}
        defaultValues={{
          ...transaction,
          amount: Number(transaction.amount),
          category: transaction.category ?? TransactionCategory.OTHER,
        }}
        transactionId={transaction.id}
      />
    </>
  );
};

export default EditTransactionButton;
