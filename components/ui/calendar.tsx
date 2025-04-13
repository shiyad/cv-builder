"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames();
  return (
    <DayPicker
      classNames={{
        today: `border-blue-500`, // Add a border to today's date
        selected: `bg-blue-200 border-blue-200 text-white`, // Highlight the selected day
        root: `${defaultClassNames.root}`, // Add a shadow to the root element
        chevron: `${defaultClassNames.chevron} fill-blue-200`, // Change the color of the chevron
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";
export { Calendar };
