import type React from "react";
import type { Language } from "../types/languages";
import { Card } from "./Card";
import { LanguagesIcon } from "./icons/LanguagesIcon";
import { LanguageItem } from "./LanguageItem";

interface LanguagesProps {
	items: Language[];
}

export const Languages: React.FC<LanguagesProps> = ({ items }) => {
	return (
		<Card title="Languages" icon={<LanguagesIcon />}>
			<ul className="space-y-3 text-gray-700 dark:text-gray-300">
				{items.map((language) => (
					<LanguageItem
						key={language.name}
						name={language.name}
						level={language.level}
					/>
				))}
			</ul>
		</Card>
	);
};
