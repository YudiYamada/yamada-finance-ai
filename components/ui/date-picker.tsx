"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  date?: Date;
  setDate: (date: Date | undefined) => void;
}

export function DatePickerDemo({ date, setDate }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            type="button"
            data-empty={!date}
            className="data-[empty=true]:text-muted-foreground border-input text-foreground hover:text-foreground flex h-9 w-full items-center justify-start gap-2 rounded-md border bg-transparent px-3 py-1 text-base font-normal shadow-xs transition-colors hover:bg-transparent md:text-sm"
          >
            <CalendarIcon className="h-4 w-4 opacity-50" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        }
      />
      <PopoverContent
        className="bg-accent-foreground text-foreground border-border w-auto rounded-lg border p-3 shadow-md"
        align="start"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          defaultMonth={date}
        />
      </PopoverContent>
    </Popover>
  );
}
