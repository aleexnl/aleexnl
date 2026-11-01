import { describe, expect, it } from "vitest";
import { enrichProjects } from "../src/data/projects";
import type { GithubRepo } from "../src/types/github";

function repository(name: string, stars: number): GithubRepo {
	return {
		name,
		description: "API description must not replace editorial content",
		html_url: `https://github.com/aleexnl/${name}`,
		language: "TypeScript",
		stargazers_count: stars,
		fork: false,
	};
}

describe("curated projects", () => {
	it("preserves editorial order regardless of GitHub ordering or popularity", () => {
		const projects = enrichProjects([
			repository("unrelated-popular-repository", 999),
			repository("aleexnl", 25),
			repository("android-autoclicker", 0),
			repository("aleexnl-library-management", 3),
		]);
		expect(projects.map(({ id }) => id)).toEqual([
			"library",
			"android",
			"portfolio",
		]);
		expect(projects.map(({ stars }) => stars)).toEqual([3, 0, 25]);
		expect(projects[0].name).toBe("Library Management");
	});

	it("keeps every project and source link available during a GitHub outage", () => {
		const projects = enrichProjects([]);
		expect(projects).toHaveLength(3);
		for (const project of projects) {
			expect(project.stars).toBeUndefined();
			expect(project.technologies.length).toBeGreaterThan(0);
			expect(project.source).toBe(
				`https://github.com/aleexnl/${project.repository}`,
			);
		}
	});

	it("enriches only the matching repository when an API page is incomplete", () => {
		const projects = enrichProjects([repository("android-autoclicker", 7)]);
		expect(projects.map(({ stars }) => stars)).toEqual([
			undefined,
			7,
			undefined,
		]);
	});
});
