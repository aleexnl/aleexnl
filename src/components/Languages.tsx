import React from "react";
import { LanguageItem } from "./LanguageItem";
import { Card } from "./Card";

interface Language {
  name: string;
  level: string;
}

export const Languages: React.FC = () => {
  const languages: Language[] = [
    { name: "Spanish", level: "Native" },
    { name: "Catalan", level: "Native" },
    { name: "English", level: "Fluent" },
  ];

  const icon = (
    <svg
      className="w-5 h-5 text-blue-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
      ></path>
    </svg>
  );

  return (
    <Card title="Languages" icon={icon}>
      <ul className="space-y-3 text-gray-700 dark:text-gray-300">
        {languages.map((language, index) => (
          <LanguageItem
            key={index}
            name={language.name}
            level={language.level}
          />
        ))}
      </ul>
    </Card>
  );
};
