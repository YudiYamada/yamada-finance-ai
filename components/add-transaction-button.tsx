"use client";

import { ArrowDownUpIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "./ui/button";
import UpsertTransactionDialog from "./upsert-transaction-dialog";

const AddTransactionButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        className="bg-primary flex items-center justify-center gap-2 rounded-2xl px-5 py-2 text-[14px] font-bold hover:cursor-pointer hover:opacity-95"
        onClick={() => setIsOpen(true)}
      >
        Add transactions
        <ArrowDownUpIcon />
      </Button>

      <UpsertTransactionDialog
        isLoading={isLoading}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setIsLoading={setIsLoading}
      />
    </>
  );
};

export default AddTransactionButton;
