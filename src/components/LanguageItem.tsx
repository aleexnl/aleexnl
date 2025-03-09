import React from "react";

interface LanguageItemProps {
  name: string;
  level: string;
}

export const LanguageItem: React.FC<LanguageItemProps> = ({ name, level }) => {
  return (
    <li className="flex items-center justify-between">
      <span>{name}</span>
      <span className="font-medium text-blue-600 dark:text-blue-400">
        {level}
      </span>
    </li>
  );
};
