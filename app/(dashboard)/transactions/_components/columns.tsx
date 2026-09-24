"use client";

import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { PencilIcon, TrashIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@/generated/prisma/enums";
import { formatEnumText } from "@/utils/format-enum-text";

import { type DataTableFeatures } from "../../../../lib/data-table-features";

export type TransactionTableType = {
  id: string;
  name: string;
  type: TransactionType;
  amount: number;
  category?: TransactionCategory;
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
    cell: ({ row }) => {
      const transaction = row.original;
      if (transaction.type === "DEPOSIT") {
        return (
          <Badge
            variant="outline"
            className="gap-1.5 border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-emerald-500"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            {formatEnumText(transaction.type)}
          </Badge>
        );
      }
      if (transaction.type === "EXPENSE") {
        return (
          <Badge
            variant="outline"
            className="gap-1.5 border-rose-500/20 bg-rose-500/10 px-2.5 py-1 text-rose-500"
          >
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            {formatEnumText(transaction.type)}
          </Badge>
        );
      }
      if (transaction.type === "INVESTMENT") {
        return (
          <Badge
            variant="outline"
            className="gap-1.5 border-sky-500/20 bg-sky-500/10 px-2.5 py-1 text-sky-500"
          >
            <span className="h-2 w-2 rounded-full bg-sky-500" />
            {formatEnumText(transaction.type)}
          </Badge>
        );
      }
    },
  }),
  columnHelper.accessor("category", {
    header: "Category",
    cell: ({ getValue }) => {
      const category = getValue() as string;
      return <span className="font-medium">{formatEnumText(category)}</span>;
    },
  }),
  columnHelper.accessor("paymentMethod", {
    header: "Method",
    cell: ({ getValue }) => {
      const method = getValue() as string;
      return (
        <span className="text-muted-foreground">{formatEnumText(method)}</span>
      );
    },
  }),
  columnHelper.accessor("date", {
    header: "Date",
    cell: ({ getValue }) => {
      const date = getValue() as Date;
      return new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      });
    },
  }),
  columnHelper.accessor("amount", {
    header: "Value",
    cell: ({ getValue, row }) => {
      const amount = getValue() as number;
      const type = row.original.type;

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      const colorClass =
        type === "DEPOSIT"
          ? "text-emerald-500 font-medium"
          : type === "EXPENSE"
            ? "text-rose-500 font-medium"
            : "";

      return <span className={colorClass}>{formatted}</span>;
    },
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
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
            <PencilIcon className="h-4 w-4" />
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
