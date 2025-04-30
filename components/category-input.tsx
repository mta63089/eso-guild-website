"use client";

import {
  MultipleSelector,
  MultipleSelectorProps,
  Option,
} from "@/components/ui/multiple-selector";
import { FerrisWheel } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function CategoryInput({ ...props }: MultipleSelectorProps) {
  const [options, setOptions] = useState<Option[]>([]);

  // Fetch all categories once when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data: { id: string; name: string }[] = await res.json();

        const formattedOptions = data.map((cat) => ({
          label: cat.name,
          value: cat.name,
        }));

        setOptions(formattedOptions);
      } catch (error) {
        console.error("[CATEGORY_FETCH_ERROR]", error);
        toast.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  // Simple filter from local options
  const handleSearch = async (value: string): Promise<Option[]> => {
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(value.toLowerCase())
    );
  };

  return (
    <MultipleSelector
      {...props}
      maxSelected={5}
      creatable
      defaultOptions={options}
      onSearch={handleSearch}
      // onChange= need some sort of function here or maybe in the form above that will actually
      // save these categories to our database
      hidePlaceholderWhenSelected
      onMaxSelected={(maxLimit) => {
        toast(`You have reached the max of ${maxLimit} categories.`);
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
  );
}
