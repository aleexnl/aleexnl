import { render, screen } from "@testing-library/react";
import { GithubProjectItem } from "../../src/components/GithubProjectItem";

describe("GithubProjectItem", () => {
  const mockRepo = {
    name: "test-repo",
    description: "A test repository",
    html_url: "https://github.com/test/repo",
    language: "TypeScript",
    stargazers_count: 42,
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

  it("handles repository without language", () => {
    const repoWithoutLang = { ...mockRepo, language: "" };
    render(<GithubProjectItem repo={repoWithoutLang} />);

    expect(screen.getByText("test-repo")).toBeInTheDocument();
    expect(screen.queryByText("TypeScript")).not.toBeInTheDocument();
  });
});
