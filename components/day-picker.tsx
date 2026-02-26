"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar1Icon } from "lucide-react";
import * as React from "react";
import { SearchTerm } from "./search/search";

export function DatePickerDemo({
  setState,
  mode = "checkin",
  defaultVal,
}: {
  setState: (state: React.SetStateAction<SearchTerm>) => void;
  mode?: string;
  defaultVal?: string;
}) {
  const initialDate =
    defaultVal && !isNaN(new Date(defaultVal).getTime()) ? new Date(defaultVal) : undefined;
  const [date, setDate] = React.useState<Date | undefined>(initialDate);

  React.useEffect(() => {
    if (date) {
      if (mode === "checkin") {
        setState((prev: SearchTerm) => ({
          ...prev,
          checkin: date as unknown as string,
        }));
      } else {
        setState((prev: SearchTerm) => ({
          ...prev,
          checkout: date as unknown as string,
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, setDate]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(2025, 0, 1); // arbitrary old date

  const daysDiff = (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

  const bookedDates = Array.from(
    { length: daysDiff },
    (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i),
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          // variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground w-full bg-input/30 justify-between text-left font-normal py-5 border-neutral-900/40 cursor-pointer text-foreground"
        >
          {date && date ? format(date, "PPP") : <span>Pick a date</span>}
          <Calendar1Icon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          defaultMonth={date}
          required={true}
          disabled={bookedDates}
          modifiers={{
            booked: bookedDates,
          }}
          modifiersClassNames={{
            booked: "[&>button]:line-through opacity-100",
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
