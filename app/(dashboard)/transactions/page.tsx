"use client";

import { format, startOfMonth } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { MAX_DATE_RANGE_DAYS } from "@/lib/constants";
import { differenceInDays } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";

function TransactionsPage() {
  // Initialize with concrete dates
  const defaultFrom = startOfMonth(new Date());
  const defaultTo = new Date();
  
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: defaultFrom,
    to: defaultTo,
  });

  const handleSelect = (range: DateRange | undefined) => {
    if (!range) return;
    const { from, to } = range;

    // Only update if we have both dates
    if (!from || !to) return;

    if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
      toast.error(
        `The selected date range is too big. Max allowed range is ${MAX_DATE_RANGE_DAYS} days!`
      );
      return;
    }

    setDateRange({ from, to });
  };

  return (
    <>
      <div className="border-b bg-card">
        <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
          <div>
            <p className="text-3xl font-bold">Transactions history</p>
          </div>
          <div className={cn("grid gap-2")}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-[300px] justify-start text-left font-normal h-[40px]"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={{
                    from: dateRange.from,
                    to: dateRange.to
                  }}
                  onSelect={handleSelect}
                  numberOfMonths={2}
                  disabled={{ after: new Date() }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default TransactionsPage;