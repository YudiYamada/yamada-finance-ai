import { ArrowDownUpIcon } from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "./ui/button";
import { DatePickerDemo } from "./ui/date-picker";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const transaction = [
  { label: "Deposit", value: "DEPOSIT" },
  { label: "Expense", value: "EXPENSE" },
  { label: "Investment", value: "INVESTMENT" },
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

const AddTransactionButton = () => {
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

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label className="text-foreground">Title</Label>
            <Input placeholder="Title" className="text-foreground" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-foreground">Value</Label>
            <Input
              placeholder="$ 0,000.00"
              className="text-foreground"
              type="Number"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-foreground">Transaction Type</Label>
            <Select items={transaction}>
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
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-foreground">Payment Method</Label>
            <Select items={payment}>
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
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-foreground">Date</Label>
            <DatePickerDemo />
          </div>
        </form>

        <DialogFooter className="flex items-center bg-transparent px-2 sm:justify-evenly">
          <DialogClose className="hover:text-muted-foreground w-40 hover:cursor-pointer">
            Cancel
          </DialogClose>
          <Button className="w-40">Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionButton;
