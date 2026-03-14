interface DateChipProps {
	date: string;
}

export function DateChip({ date }: DateChipProps) {
	const formattedDate = date.replace(/ - /g, " ‑ ");
	return (
		<span className="text-xs text-gray-400 whitespace-nowrap">
			{formattedDate}
		</span>
	);
}
