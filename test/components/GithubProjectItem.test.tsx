import { render, screen } from "@testing-library/react";
import { GithubProjectItem } from "../../src/components/GithubProjectItem";

describe("GithubProjectItem", () => {
	const mockRepo = {
		name: "test-repo",
		description: "A test repository",
		html_url: "https://github.com/test/repo",
		language: "TypeScript",
		stargazers_count: 42,
		fork: false,
	};

	it("renders repository information correctly", () => {
		render(<GithubProjectItem repo={mockRepo} />);

		expect(screen.getByText("test-repo")).toBeInTheDocument();
		expect(screen.getByText("A test repository")).toBeInTheDocument();
		expect(screen.getByText("TypeScript")).toBeInTheDocument();
		expect(screen.getByText("42")).toBeInTheDocument();

		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", "https://github.com/test/repo");
		expect(link).toHaveAttribute("target", "_blank");
		expect(link).toHaveAttribute("rel", "noopener noreferrer");
	});

	it("renders accessible aria-label with repo name", () => {
		render(<GithubProjectItem repo={mockRepo} />);

		const link = screen.getByRole("link");
		expect(link).toHaveAttribute(
			"aria-label",
			"test-repo (opens in new tab)",
		);
	});

	it("handles repository without language", () => {
		const repoWithoutLang = { ...mockRepo, language: null };
		render(<GithubProjectItem repo={repoWithoutLang} />);

		expect(screen.getByText("test-repo")).toBeInTheDocument();
		expect(screen.queryByText("TypeScript")).not.toBeInTheDocument();
	});

	it("renders language dot with known language color for TypeScript", () => {
		const { container } = render(<GithubProjectItem repo={mockRepo} />);

		const dot = container.querySelector("span[style]");
		expect(dot).toBeInTheDocument();
		expect(dot).toHaveStyle({ backgroundColor: "#3178c6" });
	});

	it("renders language dot with fallback color for unknown language", () => {
		const repoUnknownLang = { ...mockRepo, language: "UnknownLang" };
		const { container } = render(<GithubProjectItem repo={repoUnknownLang} />);

		const dot = container.querySelector("span[style]");
		expect(dot).toBeInTheDocument();
		expect(dot).toHaveStyle({ backgroundColor: "#6b7280" });
	});

	it("renders correct color for JavaScript", () => {
		const jsRepo = { ...mockRepo, language: "JavaScript" };
		const { container } = render(<GithubProjectItem repo={jsRepo} />);

		const dot = container.querySelector("span[style]");
		expect(dot).toHaveStyle({ backgroundColor: "#f1e05a" });
	});

	it("renders correct color for C#", () => {
		const csRepo = { ...mockRepo, language: "C#" };
		const { container } = render(<GithubProjectItem repo={csRepo} />);

		const dot = container.querySelector("span[style]");
		expect(dot).toHaveStyle({ backgroundColor: "#178600" });
	});

	it("does not render language dot when language is null", () => {
		const repoNoLang = { ...mockRepo, language: null };
		const { container } = render(<GithubProjectItem repo={repoNoLang} />);

		const dot = container.querySelector("span[style]");
		expect(dot).not.toBeInTheDocument();
	});
});
