import type { GithubRepo } from "../types/github";

// Source: https://github.com/ozh/github-colors
const LANGUAGE_COLORS: Record<string, string> = {
	TypeScript: "#3178c6",
	JavaScript: "#f1e05a",
	"C#": "#178600",
	Python: "#3572A5",
	Java: "#b07219",
	Kotlin: "#A97BFF",
	Swift: "#F05138",
	Go: "#00ADD8",
	Rust: "#dea584",
	Ruby: "#701516",
	PHP: "#4F5D95",
	HTML: "#e34c26",
	CSS: "#563d7c",
	Shell: "#89e051",
	Dart: "#00B4AB",
	Vue: "#41b883",
};

interface GithubProjectItemProps {
	repo: GithubRepo;
}

export function GithubProjectItem({ repo }: GithubProjectItemProps) {
	const langColor = repo.language
		? (LANGUAGE_COLORS[repo.language] ?? "#6b7280")
		: null;

	return (
		<a
			href={repo.html_url}
			target="_blank"
			rel="noopener noreferrer"
			className="block h-full p-4 border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-colors rounded-lg"
		>
			<div className="flex flex-col h-full">
				<h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
					{repo.name}
					<span className="sr-only"> (opens in new tab)</span>
				</h3>
				<p className="text-sm text-gray-500 dark:text-gray-400 flex-grow">
					{repo.description}
				</p>
				<div className="flex items-center justify-between text-xs mt-4">
					{langColor && repo.language && (
						<span className="flex items-center text-gray-400">
							<span
								className="w-2 h-2 rounded-full mr-1"
								style={{ backgroundColor: langColor }}
							/>
							{repo.language}
						</span>
					)}
					<span className="flex items-center text-gray-400">
						<svg
							className="w-3 h-3 mr-1"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<title>Stars</title>
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
						</svg>
						{repo.stargazers_count}
					</span>
				</div>
			</div>
		</a>
	);
}
