import React from "react";
import { LanguageItem } from "./LanguageItem";
import { Card } from "./Card";
import { LanguagesIcon } from "./icons/LanguagesIcon";
import { Language } from "../types/languages";

interface LanguagesProps {
  items: Language[];
}

export const Languages: React.FC<LanguagesProps> = ({ items }) => {
  return (
    <Card title="Languages" icon={<LanguagesIcon />}>
      <ul className="space-y-3 text-gray-700 dark:text-gray-300">
        {items.map((language, index) => (
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
