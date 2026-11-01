import type { GithubRepo } from "../types/github";

/** Editorial order is deliberate. GitHub is optional enrichment, never content. */
export const featuredProjects = [
	{
		id: "library",
		repository: "aleexnl-library-management",
		name: "Library Management",
		technologies: ["C#", "ASP.NET Core", "EF Core", "SQLite"],
		kind: "architecture",
	},
	{
		id: "android",
		repository: "android-autoclicker",
		name: "Android Visual Autoclicker",
		technologies: ["Python", "PySide6", "OpenCV", "ADB"],
		kind: "workflow",
	},
	{
		id: "portfolio",
		repository: "aleexnl",
		name: "aleexnl.com",
		technologies: ["Next.js", "React", "TypeScript", "next-intl"],
		kind: "typography",
		demo: "https://aleexnl.com",
	},
] as const;

export function enrichProjects(repositories: GithubRepo[]) {
	return featuredProjects.map((project) => ({
		...project,
		source: `https://github.com/aleexnl/${project.repository}`,
		stars: repositories.find((repo) => repo.name === project.repository)
			?.stargazers_count,
	}));
}
