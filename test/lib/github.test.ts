import { getGithubRepos } from "../../src/lib/github";

const mockRepos = [
	{
		name: "repo-1",
		description: "First repository",
		html_url: "https://github.com/aleexnl/repo-1",
		language: "TypeScript",
		stargazers_count: 10,
		fork: false,
	},
	{
		name: "repo-2",
		description: "Second repository",
		html_url: "https://github.com/aleexnl/repo-2",
		language: "JavaScript",
		stargazers_count: 5,
		fork: false,
	},
	{
		name: "forked-repo",
		description: "A forked repository",
		html_url: "https://github.com/aleexnl/forked-repo",
		language: "Python",
		stargazers_count: 100,
		fork: true,
	},
];

describe("getGithubRepos", () => {
	beforeEach(() => {
		vi.stubGlobal("fetch", vi.fn());
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it("returns parsed and filtered repos on success", async () => {
		vi.mocked(fetch).mockResolvedValueOnce(
			new Response(JSON.stringify(mockRepos), { status: 200 }),
		);

		const repos = await getGithubRepos();

		expect(repos).toHaveLength(2);
		expect(repos[0].name).toBe("repo-1");
		expect(repos[1].name).toBe("repo-2");
	});

	it("filters out forked repositories", async () => {
		vi.mocked(fetch).mockResolvedValueOnce(
			new Response(JSON.stringify(mockRepos), { status: 200 }),
		);

		const repos = await getGithubRepos();

		const forked = repos.find((r) => r.fork === true);
		expect(forked).toBeUndefined();
	});

	it("returns at most 6 repositories", async () => {
		const manyRepos = Array.from({ length: 10 }, (_, i) => ({
			name: `repo-${i}`,
			description: `Repo ${i}`,
			html_url: `https://github.com/aleexnl/repo-${i}`,
			language: "TypeScript",
			stargazers_count: i,
			fork: false,
		}));

		vi.mocked(fetch).mockResolvedValueOnce(
			new Response(JSON.stringify(manyRepos), { status: 200 }),
		);

		const repos = await getGithubRepos();
		expect(repos.length).toBeLessThanOrEqual(6);
	});

	it("returns empty array when API responds with non-ok status", async () => {
		vi.mocked(fetch).mockResolvedValueOnce(new Response(null, { status: 403 }));

		const repos = await getGithubRepos();
		expect(repos).toEqual([]);
	});

	it("returns empty array when fetch throws a network error", async () => {
		vi.mocked(fetch).mockRejectedValueOnce(new Error("Network error"));

		const repos = await getGithubRepos();
		expect(repos).toEqual([]);
	});

	it("returns empty array when API response fails Zod validation", async () => {
		const invalidData = [{ invalid: "shape" }];
		vi.mocked(fetch).mockResolvedValueOnce(
			new Response(JSON.stringify(invalidData), { status: 200 }),
		);

		const repos = await getGithubRepos();
		expect(repos).toEqual([]);
	});

	it("handles repos with null description and language", async () => {
		const reposWithNulls = [
			{
				name: "null-fields-repo",
				description: null,
				html_url: "https://github.com/aleexnl/null-fields-repo",
				language: null,
				stargazers_count: 3,
				fork: false,
			},
		];

		vi.mocked(fetch).mockResolvedValueOnce(
			new Response(JSON.stringify(reposWithNulls), { status: 200 }),
		);

		const repos = await getGithubRepos();
		expect(repos).toHaveLength(1);
		// Zod nullable() preserves null values; default("") only applies to undefined
		expect(repos[0].description).toBeNull();
		expect(repos[0].language).toBeNull();
	});

	it("calls the GitHub API with correct headers", async () => {
		vi.mocked(fetch).mockResolvedValueOnce(
			new Response(JSON.stringify([]), { status: 200 }),
		);

		await getGithubRepos();

		expect(fetch).toHaveBeenCalledWith(
			"https://api.github.com/users/aleexnl/repos?sort=stars&per_page=30",
			expect.objectContaining({
				headers: { Accept: "application/vnd.github.v3+json" },
			}),
		);
	});
});
