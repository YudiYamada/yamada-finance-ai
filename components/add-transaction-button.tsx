"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDownUpIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@/generated/prisma/enums";
import { formatCurrencyUSD } from "@/utils/format-currency-usd";

import { Button } from "./ui/button";
import { DatePickerDemo } from "./ui/date-picker";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const transaction = [
  { label: "Deposit", value: "DEPOSIT" },
  { label: "Expense", value: "EXPENSE" },
  { label: "Investment", value: "INVESTMENT" },
];

const categoryList = [
  { label: "Housing", value: "HOUSING" },
  { label: "Transportation", value: "TRANSPORTATION" },
  { label: "Food", value: "FOOD" },
  { label: "Entertainment", value: "ENTERTAINMENT" },
  { label: "Health", value: "HEALTH" },
  { label: "Utility", value: "UTILITY" },
  { label: "Salary", value: "SALARY" },
  { label: "Education", value: "EDUCATION" },
  { label: "Other", value: "OTHER" },
];

const payment = [
  { label: "Credit Card", value: "CREDIT_CARD" },
  { label: "Debit Card", value: "DEBIT_CARD" },
  { label: "Bank Transfer", value: "BANK_TRANSFER" },
  { label: "Bank Slip", value: "BANK_SLIP" },
  { label: "Cash", value: "CASH" },
  { label: "Pix", value: "PIX" },
  { label: "Other", value: "OTHER" },
];

const formSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title must be at least 1 characters.")
    .max(32, "Title must be at most 32 characters."),
  amount: z.number().min(0.01, "Amount is required"),
  type: z.enum(TransactionType, "Select a type."),
  category: z.enum(TransactionCategory, "Select a category."),
  paymentMethod: z.enum(TransactionPaymentMethod, "Select a payment method."),
  date: z.date({
    error: (issue) => (issue.input === undefined ? "Required" : "Invalid date"),
  }),
});

const AddTransactionButton = () => {
  const form = useForm<z.input<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      amount: 0,
      type: undefined,
      category: undefined,
      paymentMethod: undefined,
      date: new Date(),
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Valores válidos:", data);
    alert("Formulário Enviado com sucesso!");
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-primary flex items-center justify-center gap-2 rounded-2xl px-5 py-2 text-[14px] font-bold hover:cursor-pointer hover:opacity-95">
        Add transactions
        <ArrowDownUpIcon />
      </DialogTrigger>
      <DialogContent className="bg-accent-foreground">
        <DialogHeader>
          <DialogTitle className="text-foreground text-center">
            Add Transaction
          </DialogTitle>
          <DialogDescription className="text-center">
            Enter the information below
          </DialogDescription>
        </DialogHeader>

        <form
          id="form-add-transaction"
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground">Title</Label>
              <Input
                placeholder="Title"
                className="text-foreground"
                {...form.register("title")}
              />
              {form.formState.errors.title && (
                <span className="text-xs text-red-400">
                  {form.formState.errors.title.message}
                </span>
              )}
            </div>

            {/* Value */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground">Value</Label>
              <Controller
                control={form.control}
                name="amount"
                render={({ field }) => {
                  const displayValue = formatCurrencyUSD(
                    String(Math.round((field.value || 0) * 100)),
                  );

                  return (
                    <Input
                      placeholder="$0.00"
                      className="text-foreground"
                      value={displayValue}
                      onChange={(e) => {
                        const numericString = e.target.value.replace(/\D/g, "");
                        const numberValue = Number(numericString) / 100;
                        field.onChange(numberValue);
                      }}
                    />
                  );
                }}
              />
              {form.formState.errors.amount && (
                <span className="text-xs text-red-400">
                  {form.formState.errors.amount.message}
                </span>
              )}
            </div>

            {/* Transaction Type */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground">Transaction Type</Label>
              <Controller
                control={form.control}
                name="type"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ""}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder="Select"
                        className="text-muted-foreground hover:cursor-pointer"
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-popover text-popover-foreground border-border border">
                      <SelectGroup className="bg-accent-foreground">
                        {transaction.map((item) => (
                          <SelectItem
                            key={item.value}
                            value={item.value}
                            className="text-muted-foreground hover:cursor-pointer"
                          >
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {form.formState.errors.type && (
                <span className="text-xs text-red-400">
                  {form.formState.errors.type.message}
                </span>
              )}
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground">Category</Label>
              <Controller
                control={form.control}
                name="category"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ""}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder="Select category"
                        className="text-muted-foreground hover:cursor-pointer"
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-popover text-popover-foreground border-border border">
                      <SelectGroup className="bg-accent-foreground">
                        {categoryList.map((item) => (
                          <SelectItem
                            key={item.value}
                            value={item.value}
                            className="text-muted-foreground hover:cursor-pointer"
                          >
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {form.formState.errors.category && (
                <span className="text-xs text-red-400">
                  {form.formState.errors.category.message}
                </span>
              )}
            </div>

            {/* Payment Method */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground">Payment Method</Label>
              <Controller
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ""}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder="Select"
                        className="text-muted-foreground hover:cursor-pointer"
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-popover text-popover-foreground border-border border">
                      <SelectGroup className="bg-accent-foreground">
                        {payment.map((item) => (
                          <SelectItem
                            key={item.value}
                            value={item.value}
                            className="text-muted-foreground hover:cursor-pointer"
                          >
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {form.formState.errors.paymentMethod && (
                <span className="text-xs text-red-400">
                  {form.formState.errors.paymentMethod.message}
                </span>
              )}
            </div>

            {/* Date */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground">Date</Label>
              <Controller
                control={form.control}
                name="date"
                render={({ field }) => (
                  <DatePickerDemo date={field.value} setDate={field.onChange} />
                )}
              />
              {form.formState.errors.date && (
                <span className="text-xs text-red-400">
                  {String(form.formState.errors.date.message)}
                </span>
              )}
            </div>
          </FieldGroup>
        </form>

        <DialogFooter className="flex items-center bg-transparent px-2 sm:justify-evenly">
          <DialogClose className="hover:text-muted-foreground border-accent w-40 rounded-xl border-2 p-1 hover:cursor-pointer">
            Cancel
          </DialogClose>
          <Button
            form="form-add-transaction"
            className="w-40 rounded-xl p-1"
            type="submit"
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionButton;
