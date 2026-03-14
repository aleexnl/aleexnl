import type React from "react";

interface SkillProps {
	icon?: React.ReactNode;
	children: React.ReactNode;
}

export function SkillItem({ icon, children }: SkillProps) {
	return (
		<span className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
			{icon}
			{children}
		</span>
	);
}
