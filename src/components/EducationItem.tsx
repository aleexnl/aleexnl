import { DateChip } from "./DateChip";

interface EducationItemProps {
	title: string;
	institution: string;
	period: string;
}

export function EducationItem({
	title,
	institution,
	period,
}: EducationItemProps) {
	return (
		<div className="relative pl-8 border-l border-gray-200 dark:border-gray-700">
			<div className="absolute w-2 h-2 bg-gray-400 rounded-full -left-[5px] top-2" />
			<div className="flex justify-between items-start gap-8">
				<h3 className="text-sm font-semibold text-gray-900 dark:text-white">
					{title}
				</h3>
				<DateChip date={period} />
			</div>
			<p className="text-sm text-gray-400 mt-0.5">{institution}</p>
		</div>
	);
}
