"use client";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { FerrisWheel } from "lucide-react";
import { toast } from "sonner";

const options: Option[] = [
  { label: "announcement", value: "Announcement" },
  { label: "blog", value: "Blog" },
  { label: "guide", value: "Guide" },
];

const mockSearch = async (value: string): Promise<Option[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = options.filter((option) => option.value.includes(value));
      resolve(res);
    }, 1000);
  });
};

export async function CategoryInput() {
  return (
    <div className="flex w-full flex-col gap-5 px-10">
      <MultipleSelector
        maxSelected={3}
        onMaxSelected={(maxLimit) => {
          toast(`You have reached max selected: ${maxLimit}`);
        }}
        onSearch={async (value) => {
          const res = await mockSearch(value);
          return res;
        }}
        defaultOptions={[]}
        creatable
        placeholder="trying to search 'a' to get more options..."
        loadingIndicator={
          <FerrisWheel className="motion-preset-fade-sm animate-spin" />
        }
        emptyIndicator={
          <p className="w-full text-center text-lg leading-10 text-muted-foreground">
            no results found.
          </p>
        }
      />
    </div>
  );
}
