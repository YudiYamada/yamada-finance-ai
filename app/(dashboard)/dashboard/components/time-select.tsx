"use client";

import { useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const months = [
  { label: "January", value: "01" },
  { label: "February", value: "02" },
  { label: "March", value: "03" },
  { label: "April", value: "04" },
  { label: "May", value: "05" },
  { label: "June", value: "06" },
  { label: "July", value: "07" },
  { label: "August", value: "08" },
  { label: "September", value: "09" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

export function TimeSelect() {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const currentMonth = searchParams.get("month");

  const handleMonthChange = (month: string | unknown) => {
    push(`/dashboard?month=${month}`);
  };

  return (
    <Select
      items={months}
      onValueChange={(value) => handleMonthChange(value)}
      defaultValue={currentMonth}
    >
      <SelectTrigger className="w-full max-w-48 hover:cursor-pointer">
        <SelectValue placeholder="Select Month" />
      </SelectTrigger>
      <SelectContent className="bg-background text-foreground">
        <SelectGroup>
          <SelectLabel>Months</SelectLabel>
          {months.map((month) => (
            <SelectItem
              className="hover:bg-muted hover:text-muted-foreground hover:cursor-pointer"
              key={month.value}
              value={month.value}
            >
              {month.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
