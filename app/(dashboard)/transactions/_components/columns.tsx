"use client";

import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { ExternalLinkIcon, TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@/generated/prisma/enums";

import { type DataTableFeatures } from "../../../../components/data-table-features";

export type TransactionTableType = {
  id: string;
  name: string;
  type: TransactionType;
  amount: number;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
};

const columnHelper = createColumnHelper<
  DataTableFeatures,
  TransactionTableType
>();

export const columns: ColumnDef<DataTableFeatures, TransactionTableType>[] = [
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("type", {
    header: "Type",
  }),
  columnHelper.accessor("category", {
    header: "Category",
  }),
  columnHelper.accessor("paymentMethod", {
    header: "Method",
  }),
  columnHelper.accessor("date", {
    header: "Date",
    cell: ({ getValue }) => {
      const date = getValue() as Date;
      return new Date(date).toLocaleDateString("en-US");
    },
  }),
  columnHelper.accessor("amount", {
    header: "Value",
    cell: ({ getValue }) => {
      const amount = getValue() as number;
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    },
  }),
  columnHelper.display({
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const transaction = row.original;

      return (
        <div className="flex items-center gap-2">
          {/* View Button (Sheet trigger) */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              alert(`View transaction: ${transaction.id}`);
            }}
          >
            <ExternalLinkIcon className="h-4 w-4" />
          </Button>

          {/* Delete Button */}
          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-700"
            onClick={() => {
              alert(`Delete transaction: ${transaction.id}`);
            }}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  }),
] as ColumnDef<DataTableFeatures, TransactionTableType>[];
