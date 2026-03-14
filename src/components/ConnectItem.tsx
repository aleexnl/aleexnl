import Link from "next/link";

interface ConnectItemProps {
	href: string;
	icon: React.ReactNode;
	name: string;
}

export const ConnectItem = ({ href, icon, name }: ConnectItemProps) => {
	return (
		<li>
			<Link
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				aria-label={`${name} (opens in new tab)`}
				className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
			>
				{icon}
				{name}
			</Link>
		</li>
	);
};
