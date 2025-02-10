"use client";
import CreateCategoryDialog from "@/app/(dashboard)/_components/CreateCategoryDialog";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import React, { useCallback, useEffect } from "react";

interface Props {
  type: TransactionType;
  onChange: (value: string) => void;
}

function CategoryPicker({ type, onChange }: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");

  useEffect(() => {
    if (!value) return;
    onChange(value);
  }, [onChange, value]);

  const categoriesQuery = useQuery({
    queryKey: ["categories", type],
    queryFn: () =>
      fetch(`/api/categories?type=${type}`).then((res) => res.json()),
  });

  const selectedCategory = categoriesQuery.data?.find(
    (category: Category) => category.name === value
  );

  const successCallback = useCallback(
    (category: Category) => {
      setValue(category.name);
      setOpen(false);
    },
    [setValue]
  );

  const filteredCategories = categoriesQuery.data?.filter((category: { name: string; }) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedCategory ? selectedCategory.name : "Select category"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <div className="flex flex-col">
          <div className="flex items-center border-b px-3">
            <input
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="max-h-[300px] overflow-y-auto">
            {filteredCategories?.length === 0 && (
              <div className="p-4 text-sm text-muted-foreground">
                <p className="text-center">Category not found</p>
                <p className="text-center text-xs">Tip: Create a new category</p>
                {/* <CreateCategoryDialog onSuccess={successCallback} type={type} /> */}
              </div>
            )}
            
            <div className="flex flex-col pt-2">
              {filteredCategories?.map((category: { type: string; name: string; createdAt: Date; userId: string; icon: string; }) => (
                <div
                  key={category.createdAt.toString()}
                  className={cn(
                    "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
                    value === category.name
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                  onClick={() => {
                    setValue(category.name);
                    setSearchTerm("");
                    setOpen(false);
                  }}
                >
                  <CategoryRow category={category} />
                  {value === category.name && (
                    <Check className="ml-auto h-4 w-4 shrink-0" />
                  )}
                </div>
              ))}
              <CreateCategoryDialog onSuccess={successCallback} type={type} />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function CategoryRow({ category }: { category: Category }) {
  return (
    <div className="flex items-center gap-2">
      {category.icon}
      {category.name}
    </div>
  );
}

export default CategoryPicker;