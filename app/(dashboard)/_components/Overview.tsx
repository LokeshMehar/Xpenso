"use client";

import CategoriesStats from "@/app/(dashboard)/_components/CategoriesStats";
import StatsCards from "@/app/(dashboard)/_components/StatsCards";
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
import { UserSettings } from "@prisma/client";
import { differenceInDays } from "date-fns";
import { useState } from "react";
import { toast } from "sonner"; 

function Overview({ userSettings }: { userSettings: UserSettings }) {
  // Initialize with concrete dates
  const defaultFrom = startOfMonth(new Date());
  const defaultTo = new Date();
  
  const [selectedRange, setSelectedRange] = useState<{ from: Date; to: Date }>({
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

    setSelectedRange({ from, to });
  };

  return (
    <>
      <div className="container flex flex-wrap items-end justify-between gap-2 py-6">
        <h2 className="text-3xl font-bold pl-2 md:pl-0">Overview</h2>
        <div className={cn("grid gap-2")}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(selectedRange.from, "LLL dd, y")} -{" "}
                {format(selectedRange.to, "LLL dd, y")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={selectedRange.from}
                selected={{
                  from: selectedRange.from,
                  to: selectedRange.to
                }}
                onSelect={handleSelect}
                numberOfMonths={2}
                disabled={{ after: new Date() }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="container flex w-full flex-col gap-2">
        <StatsCards
          userSettings={userSettings}
          from={selectedRange.from}
          to={selectedRange.to}
        />
        <CategoriesStats
          userSettings={userSettings}
          from={selectedRange.from}
          to={selectedRange.to}
        />
      </div>
    </>
  );
}

export default Overview;