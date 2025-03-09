import React from "react";
import { DateChip } from "./DateChip";

interface ExperienceItemProps {
  title: string;
  period: string;
  company: string;
  responsibilities: string[];
}

export const ExperienceItem: React.FC<ExperienceItemProps> = ({
  title,
  period,
  company,
  responsibilities,
}) => {
  return (
    <div className="relative pl-8 border-l-2 border-blue-100 dark:border-blue-900">
      <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-1"></div>
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold">{title}</h3>
        <DateChip date={period} />
      </div>
      <p className="text-gray-600 dark:text-gray-400 italic mt-1">{company}</p>
      <ul className="list-none mt-3 space-y-2 text-gray-700 dark:text-gray-300">
        {responsibilities.map((responsibility, index) => (
          <li key={index} className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            {responsibility}
          </li>
        ))}
      </ul>
    </div>
  );
};
