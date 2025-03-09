import React from "react";

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
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold">{title}</h3>
        <span className="text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">
          {period}
        </span>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mt-1">{institution}</p>
    </div>
  );
}
