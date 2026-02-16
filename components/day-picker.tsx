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
}: {
  setState: (state: React.SetStateAction<SearchTerm>) => void;
  mode?: string;
}) {
  const [date, setDate] = React.useState<Date>();

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
  }, [date, mode, setState]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground w-full bg-transparent justify-between text-left font-normal py-5 border-neutral-900/40"
        >
          {date ? format(date, "PPP") : <span>Pick a date</span>}
          <Calendar1Icon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={setDate} defaultMonth={date} />
      </PopoverContent>
    </Popover>
  );
}
