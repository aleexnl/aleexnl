import React from "react";
import { DateChip } from "./DateChip";

interface EducationItemProps {
  title: string;
  institution: string;
  period: string;
}

export function EducationItem({
  title,
  institution,
  period,
}: EducationItemProps) {
  return (
    <div className="relative pl-8 border-l-2 border-blue-100 dark:border-blue-900">
      <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-1"></div>
      <div className="flex justify-between items-start gap-8">
        <h3 className="text-xl font-semibold">{title}</h3>
        <DateChip date={period} />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mt-1">{institution}</p>
    </div>
  );
}
