import { Card } from "./Card";
import { GithubProjectItem } from "./GithubProjectItem";
import { ProjectsIcon } from "./icons/ProjectsIcon";

export interface GithubRepo {
	name: string;
	description: string | null;
	html_url: string;
	language: string | null;
	stargazers_count: number;
	fork: boolean;
}

interface GithubProjectsProps {
	repos: GithubRepo[];
	title: string;
	emptyLabel?: string;
}

export function GithubProjects({ repos, title, emptyLabel }: GithubProjectsProps) {
	return (
		<Card title={title} icon={<ProjectsIcon />}>
			{repos.length === 0 ? (
				<p className="text-sm text-gray-400 dark:text-gray-500">
					{emptyLabel ?? "No projects available."}
				</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{repos.map((repo) => (
						<GithubProjectItem key={repo.name} repo={repo} />
					))}
				</div>
			)}
		</Card>
	);
}
