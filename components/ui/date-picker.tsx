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

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant={"outline"}
            data-empty={!date}
            className="data-[empty=true]:text-muted-foreground text-foreground border-input hover:text-foreground flex h-9 w-full items-center justify-start gap-2 rounded-md bg-transparent px-3 py-1 text-base font-normal shadow-xs transition-colors hover:bg-transparent md:text-sm"
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
          className="text-foreground bg-transparent"
        />
      </PopoverContent>
    </Popover>
  );
}
