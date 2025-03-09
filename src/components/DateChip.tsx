import React from "react";

interface DateChipProps {
  date: string;
}

export function DateChip({ date }: DateChipProps) {
  // Replace regular hyphens with non-breaking hyphens
  const formattedDate = date.replace(/ - /g, " ‑ ");

  return (
    <span className="text-sm break-words bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full inline-block text-center">
      {formattedDate}
    </span>
  );
}
