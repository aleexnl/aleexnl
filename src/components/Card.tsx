import type React from "react";

interface CardProps {
	title: string;
	icon?: React.ReactNode;
	children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, icon, children }) => {
	return (
		<div>
			<h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
				{icon && <span>{icon}</span>}
				{title}
			</h2>
			{children}
		</div>
	);
};
