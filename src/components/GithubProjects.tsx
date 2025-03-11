import { Card } from "./Card";
import { GithubProjectItem } from "./GithubProjectItem";
import { ProjectsIcon } from "./icons/ProjectsIcon";

export interface GithubRepo {
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
}

interface GithubProjectsProps {
  repos: GithubRepo[];
}

export function GithubProjects({ repos }: GithubProjectsProps) {
  if (repos.length === 0) return null;

  return (
    <Card title="Featured Projects" icon={<ProjectsIcon />}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map((repo) => (
          <GithubProjectItem key={repo.name} repo={repo} />
        ))}
      </div>
    </Card>
  );
}
