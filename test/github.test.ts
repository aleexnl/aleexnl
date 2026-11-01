import { afterEach, describe, expect, it, vi } from "vitest";
import { getGithubRepos } from "../src/lib/github";

const validRepository = {
	name: "aleexnl",
	description: null,
	html_url: "https://github.com/aleexnl/aleexnl",
	language: null,
	stargazers_count: 0,
	fork: false,
};

afterEach(() => {
	vi.restoreAllMocks();
	vi.unstubAllGlobals();
});

function mockResponse(data: unknown, ok = true, status = 200) {
	const fetchMock = vi.fn().mockResolvedValue({
		ok,
		status,
		json: vi.fn().mockResolvedValue(data),
	});
	vi.stubGlobal("fetch", fetchMock);
	return fetchMock;
}

describe("GitHub enrichment", () => {
	it("validates repositories, preserves null metadata and excludes forks", async () => {
		mockResponse([
			validRepository,
			{ ...validRepository, name: "forked", fork: true },
		]);
		expect(await getGithubRepos()).toEqual([validRepository]);
	});

	it("bounds the request duration and retains daily tagged caching", async () => {
		const signal = new AbortController().signal;
		const timeout = vi.spyOn(AbortSignal, "timeout").mockReturnValue(signal);
		const fetchMock = mockResponse([]);
		await getGithubRepos();
		expect(timeout).toHaveBeenCalledWith(5000);
		expect(fetchMock).toHaveBeenCalledWith(
			"https://api.github.com/users/aleexnl/repos?sort=full_name&per_page=100",
			expect.objectContaining({
				signal,
				next: { tags: ["github-repos"], revalidate: 86400 },
			}),
		);
	});

	it.each([403, 429, 500])("fails gracefully for HTTP %s", async (status) => {
		vi.spyOn(console, "error").mockImplementation(() => {});
		mockResponse({ message: "Unavailable" }, false, status);
		expect(await getGithubRepos()).toEqual([]);
	});

	it.each([
		{ message: "API error" },
		[{ ...validRepository, stargazers_count: "invalid" }],
		[{ ...validRepository, html_url: "invalid-url" }],
	])(
		"rejects malformed API data without leaking it to the UI",
		async (data) => {
			vi.spyOn(console, "error").mockImplementation(() => {});
			mockResponse(data);
			expect(await getGithubRepos()).toEqual([]);
		},
	);

	it("keeps enrichment optional when the network request is aborted", async () => {
		vi.spyOn(console, "error").mockImplementation(() => {});
		vi.stubGlobal(
			"fetch",
			vi.fn().mockRejectedValue(new DOMException("Timed out", "TimeoutError")),
		);
		expect(await getGithubRepos()).toEqual([]);
	});
});
