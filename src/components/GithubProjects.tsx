import { Card } from "./Card";
import { GithubProjectItem } from "./GithubProjectItem";
import { ProjectsIcon } from "./icons/ProjectsIcon";

export interface GithubRepo {
	name: string;
	description: string | null;
	html_url: string;
	language: string | null;
	stargazers_count: number;
}

interface GithubProjectsProps {
	repos: GithubRepo[];
	title: string;
}

export function GithubProjects({ repos, title }: GithubProjectsProps) {
	if (repos.length === 0) return null;

	return (
		<Card title={title} icon={<ProjectsIcon />}>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{repos.map((repo) => (
					<GithubProjectItem key={repo.name} repo={repo} />
				))}
			</div>
		</Card>
	);
}
