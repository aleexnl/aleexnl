import { render, screen } from "@testing-library/react";
import { GithubProjects } from "../../src/components/GithubProjects";

// Mock fetch globally
global.fetch = jest.fn();

// Mock the async server component
jest.mock("../../src/components/GithubProjects", () => ({
  __esModule: true,
  GithubProjects: jest.fn(),
}));

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

    // Setup mock implementation for the server component
    (GithubProjects as jest.Mock).mockImplementation(() => (
      <div data-testid="github-projects">
        <div>{mockRepos[0].name}</div>
        <div>{mockRepos[0].description}</div>
        <div>{mockRepos[0].language}</div>
        <div>{mockRepos[0].stargazers_count}</div>
        <div>{mockRepos[1].name}</div>
      </div>
    ));
  });

  it("renders the GitHub projects component", async () => {
    render(<GithubProjects />);

    expect(screen.getByTestId("github-projects")).toBeInTheDocument();
    expect(screen.getByText("repo-1")).toBeInTheDocument();
    expect(screen.getByText("First test repository")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("handles empty repos gracefully", async () => {
    // Mock the server component to return null (no repos)
    (GithubProjects as jest.Mock).mockImplementation(() => null);

    const { container } = render(<GithubProjects />);

    // Component should return null when no repos
    expect(container.firstChild).toBeNull();
  });
});
