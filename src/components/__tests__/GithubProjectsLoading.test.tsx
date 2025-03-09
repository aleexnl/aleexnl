import { render, screen } from "@testing-library/react";
import { GithubProjectsLoading } from "../GithubProjectsLoading";

describe("GithubProjectsLoading", () => {
  it("renders loading skeleton with correct title", () => {
    render(<GithubProjectsLoading />);
    expect(screen.getByText("Featured Projects")).toBeInTheDocument();
  });

  it("renders loading animation elements", () => {
    const { container } = render(<GithubProjectsLoading />);

    // Check for pulse animation class
    const pulseElement = container.querySelector(".animate-pulse");
    expect(pulseElement).toBeInTheDocument();

    // Check for loading placeholder elements
    const loadingElements = container.querySelectorAll(".bg-gray-200");
    expect(loadingElements.length).toBeGreaterThan(0);
  });
});
