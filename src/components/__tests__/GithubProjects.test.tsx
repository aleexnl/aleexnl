import { render, screen, waitFor } from "@testing-library/react";
import { GithubProjects } from "../GithubProjects";

// Mock fetch globally
global.fetch = jest.fn();

describe("GithubProjects", () => {
  const mockRepos = [
    {
      name: "repo-1",
      description: "First test repository",
      html_url: "https://github.com/test/repo1",
      language: "TypeScript",
      stargazers_count: 10,
    },
    {
      name: "repo-2",
      description: "Second test repository",
      html_url: "https://github.com/test/repo2",
      language: "JavaScript",
      stargazers_count: 20,
    },
  ];

  beforeEach(() => {
    // Reset all mocks before each test
    jest.resetAllMocks();
    // Setup fetch mock
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve(mockRepos),
    });
  });

  it("fetches and renders repositories", async () => {
    render(<GithubProjects />);

    // Wait for the first repo to be displayed
    await waitFor(() => {
      expect(screen.getByText("repo-1")).toBeInTheDocument();
    });

    expect(screen.getByText("First test repository")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("handles fetch error gracefully", async () => {
    // Mock fetch to reject
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Failed to fetch"));

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(<GithubProjects />);

    // Component should return null on error
    await waitFor(() => {
      expect(document.body.textContent).toBe("");
    });

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
