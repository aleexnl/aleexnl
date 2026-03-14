import type React from "react";

interface LanguageItemProps {
	name: string;
	level: string;
}

export const LanguageItem: React.FC<LanguageItemProps> = ({ name, level }) => {
	return (
		<li className="flex items-center justify-between">
			<span className="text-sm text-gray-700 dark:text-gray-300">{name}</span>
			<span className="text-sm text-gray-400">{level}</span>
		</li>
	);
};
