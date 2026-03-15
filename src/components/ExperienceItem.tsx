"use client";

import { useState } from "react";
import { DateChip } from "./DateChip";
import { ResponsibilityItem } from "./ResponsibilityItem";

interface ExperienceItemProps {
	title: string;
	period: string;
	company: string;
	responsibilities: string[];
	expandLabel: string;
	collapseLabel: string;
}

export const ExperienceItem = ({
	title,
	period,
	company,
	responsibilities,
	expandLabel,
	collapseLabel,
}: ExperienceItemProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const panelId = `exp-${title.replace(/\s+/g, "-").toLowerCase()}`;

	return (
		<div className="relative pl-8 border-l border-gray-200 dark:border-gray-700">
			<div className="absolute w-2 h-2 bg-gray-400 rounded-full -left-[5px] top-2" />
			<div className="flex justify-between items-start gap-8">
				<h3
					id={`${panelId}-heading`}
					className="text-sm font-semibold text-gray-900 dark:text-white"
				>
					{title}
				</h3>
				<DateChip date={period} />
			</div>
			<p className="text-sm text-gray-400 mt-0.5">{company}</p>
			<button
				type="button"
				aria-expanded={isOpen}
				aria-controls={panelId}
				onClick={() => setIsOpen((prev) => !prev)}
				className="mt-2 text-xs text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors"
			>
				<span aria-hidden="true">{isOpen ? "−" : "+"}</span>
				{isOpen ? collapseLabel : expandLabel}
			</button>
			<section
				id={panelId}
				aria-labelledby={`${panelId}-heading`}
				className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
			>
				<div className="overflow-hidden">
					<ul className="list-none mt-2 space-y-1.5">
						{responsibilities.map((r) => (
							<ResponsibilityItem key={r} responsibility={r} />
						))}
					</ul>
				</div>
			</section>
		</div>
	);
};
