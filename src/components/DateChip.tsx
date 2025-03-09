import React from "react";

interface DateChipProps {
  date: string;
}

export function DateChip({ date }: DateChipProps) {
  return (
    <span className="text-sm whitespace-nowrap bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">
      {date}
    </span>
  );
}
