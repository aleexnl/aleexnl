import { z } from "zod";
import type { GithubRepo } from "../types/github";

const GithubRepoSchema = z.object({
	name: z.string(),
	description: z.string().nullable().default(""),
	html_url: z.string().url(),
	language: z.string().nullable().default(""),
	stargazers_count: z.number(),
	fork: z.boolean(),
});

export async function getGithubRepos(): Promise<GithubRepo[]> {
	try {
		const res = await fetch(
			"https://api.github.com/users/aleexnl/repos?sort=stars&per_page=30",
			{
				next: { tags: ["github-repos"], revalidate: 86400 },
				headers: { Accept: "application/vnd.github.v3+json" },
			},
		);
		if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);
		const data: unknown = await res.json();
		const parsed = z.array(GithubRepoSchema).safeParse(data);
		if (!parsed.success) {
			console.error("GitHub API response validation failed:", parsed.error);
			return [];
		}
		return parsed.data.filter((repo) => !repo.fork).slice(0, 6);
	} catch (error) {
		console.error("Error fetching GitHub repos:", error);
		return [];
	}
}
