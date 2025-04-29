"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

import { cn } from "@/lib/utils";

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

function RadialProgress({ progress }: { progress: number }) {
  return (
    <div
      x-data="scrollProgress"
      className="  inline-flex items-center justify-center overflow-hidden rounded-full "
    >
      <svg className=" w-20 h-20">
        <circle
          className="text-gray-300"
          strokeWidth={"4"}
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="40"
          cy="40"
        />
        <circle
          className="text-black"
          strokeWidth="4"
          strokeDasharray={30 * 2 * Math.PI}
          strokeDashoffset={100 - (progress / 100) * 100}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="40"
          cy="40"
        />
      </svg>
      <span className="absolute text-sm text-black" x-text="`${percent}%`">
        {progress}%
      </span>
    </div>
  );
}

export { Progress, RadialProgress };
