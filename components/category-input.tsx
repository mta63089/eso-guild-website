"use client";

import { MultipleSelector, Option } from "@/components/ui/multiple-selector";
import { FerrisWheel } from "lucide-react";
import { toast } from "sonner";

interface CategoryInputProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}

const options: Option[] = [
  { label: "Announcement", value: "announcement" },
  { label: "Blog", value: "blog" },
  { label: "Guide", value: "guide" },
];

const mockSearch = async (value: string): Promise<Option[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = options.filter((option) =>
        option.label.toLowerCase().includes(value.toLowerCase())
      );
      resolve(res);
    }, 500);
  });
};

export function CategoryInput({
  selectedCategories,
  setSelectedCategories,
}: CategoryInputProps) {
  const handleChange = (selected: Option[]) => {
    const selectedValues = selected.map((option) => option.value);
    setSelectedCategories(selectedValues);
  };

  return (
    <div className="flex w-full flex-col gap-5">
      <MultipleSelector
        maxSelected={5}
        creatable
        defaultOptions={options}
        selectedValues={selectedCategories.map((value) => ({
          label: value,
          value: value,
        }))}
        onChange={handleChange}
        onMaxSelected={(maxLimit) => {
          toast(`You have reached the max of ${maxLimit} categories.`);
        }}
        onSearch={async (value) => {
          const res = await mockSearch(value);
          return res;
        }}
        placeholder="Select or create categories..."
        loadingIndicator={
          <FerrisWheel className="motion-preset-fade-sm animate-spin" />
        }
        emptyIndicator={
          <p className="w-full text-center text-muted-foreground text-sm">
            No results found.
          </p>
        }
      />
    </div>
  );
}
