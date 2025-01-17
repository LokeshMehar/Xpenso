"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserSettings } from "@prisma/client";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Currencies, Currency } from "@/lib/currencies";
import { UpdateUserCurrency } from "@/app/wizard/_actions/userSettings";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { cn } from "@/lib/utils";

export function SimpleCurrencySelector() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = React.useState<Currency | null>(null);

  const userSettings = useQuery<UserSettings>({
    queryKey: ["userSettings"],
    queryFn: () => fetch("/api/user-settings").then((res) => res.json()),
  });

  React.useEffect(() => {
    if (!userSettings.data) return;
    const userCurrency = Currencies.find(
      (currency) => currency.value === userSettings.data.currency
    );
    if (userCurrency) setSelectedOption(userCurrency);
  }, [userSettings.data]);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const mutation = useMutation({
    mutationFn: UpdateUserCurrency,
    onSuccess: (data: UserSettings) => {
      toast.success(`Currency updated successfully 🎉`, {
        id: "update-currency",
      });
      setSelectedOption(Currencies.find((c) => c.value === data.currency) || null);
    },
    onError: (e) => {
      console.error(e);
      toast.error("Something went wrong", {
        id: "update-currency",
      });
    },
  });

  const filteredCurrencies = Currencies.filter((currency) =>
    currency.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (currency: Currency) => {
    toast.loading("Updating currency...", {
      id: "update-currency",
    });
    mutation.mutate(currency.value);
    setIsOpen(false);
  };

  return (
    <SkeletonWrapper isLoading={userSettings.isFetching}>
      <div className="relative" ref={dropdownRef}>
        <Button
          type="button"
          variant="outline"
          className="w-full justify-between"
          onClick={() => setIsOpen(!isOpen)}
          disabled={mutation.isPending}
        >
          <span>{selectedOption?.label || "Set currency"}</span>
          <svg
            className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full rounded-md border bg-popover shadow-lg">
            <div className="p-2">
              <input
                type="text"
                placeholder="Search currencies..."
                className="w-full rounded-md border px-3 py-2 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <ul className="max-h-60 overflow-auto p-2">
              {filteredCurrencies.length === 0 ? (
                <li className="py-2 text-center text-sm text-muted-foreground">
                  No results found
                </li>
              ) : (
                filteredCurrencies.map((currency) => (
                  <li key={currency.value}>
                    <button
                      className={cn(
                        "flex w-full items-center px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground",
                        "rounded-md transition-colors",
                        selectedOption?.value === currency.value && "bg-accent"
                      )}
                      onClick={() => handleSelect(currency)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedOption?.value === currency.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {currency.label}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    </SkeletonWrapper>
  );
}