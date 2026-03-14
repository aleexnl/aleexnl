import type React from "react";

interface ResponsibilityItemProps {
	responsibility: string;
}

export const ResponsibilityItem: React.FC<ResponsibilityItemProps> = ({
	responsibility,
}) => {
	return (
		<li className="flex items-start text-sm text-gray-600 dark:text-gray-400">
			<span className="text-gray-400 mr-2 select-none">–</span>
			{responsibility}
		</li>
	);
};
