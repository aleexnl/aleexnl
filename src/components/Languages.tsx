import type React from "react";
import type { Language } from "../types/languages";
import { Card } from "./Card";
import { LanguagesIcon } from "./icons/LanguagesIcon";
import { LanguageItem } from "./LanguageItem";

interface LanguagesProps {
	items: Language[];
	title: string;
}

export const Languages: React.FC<LanguagesProps> = ({ items, title }) => {
	return (
		<Card title={title} icon={<LanguagesIcon />}>
			<ul className="space-y-3">
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
