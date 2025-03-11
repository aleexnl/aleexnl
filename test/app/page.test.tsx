import { render, screen } from "@testing-library/react";
import Home from "../../src/app/page";

jest.mock("../../src/components/Skills", () => ({
  Skills: () => <div data-testid="skills-component">Skills Mock</div>,
}));

jest.mock("../../src/components/Education", () => ({
  Education: () => <div data-testid="education-component">Education Mock</div>,
}));

jest.mock("../../src/components/Experience", () => ({
  Experience: () => (
    <div data-testid="experience-component">Experience Mock</div>
  ),
}));

jest.mock("../../src/components/Languages", () => ({
  Languages: () => <div data-testid="languages-component">Languages Mock</div>,
}));

jest.mock("../../src/components/Connect", () => ({
  Connect: () => <div data-testid="connect-component">Connect Mock</div>,
}));

jest.mock("../../src/components/GithubProjects", () => ({
  GithubProjects: () => (
    <div data-testid="github-projects-component">Github Projects Mock</div>
  ),
}));

describe("Home Page", () => {
  it("renders the page with all components", async () => {
    const HomeComponent = await Home();
    render(HomeComponent);

    // Check main heading (look for heading text content)
    const headingElement = screen.getByRole("heading", { level: 1 });
    expect(headingElement).toHaveTextContent("Alejandro Nieto Luque");
    expect(screen.getByText(/Software Developer/i)).toBeInTheDocument();

    // Check all components are rendered
    expect(screen.getByTestId("github-projects-component")).toBeInTheDocument();
    expect(screen.getByTestId("experience-component")).toBeInTheDocument();
    expect(screen.getByTestId("education-component")).toBeInTheDocument();
    expect(screen.getByTestId("connect-component")).toBeInTheDocument();
    expect(screen.getByTestId("skills-component")).toBeInTheDocument();
    expect(screen.getByTestId("languages-component")).toBeInTheDocument();
  });

  it("renders the personal statement", async () => {
    const HomeComponent = await Home();
    render(HomeComponent);

    const personalStatement = screen.getByText(
      /Motivated and adaptable professional.*learning from others\./i,
      { exact: false }
    );
    expect(personalStatement).toBeInTheDocument();
  });

  it("renders footer with current year", async () => {
    const HomeComponent = await Home();
    render(HomeComponent);

    const currentYear = new Date().getFullYear().toString();
    const footerText = screen.getByText((content, element) => {
      return (
        content.includes(currentYear) &&
        content.includes("Alejandro Nieto Luque")
      );
    });
    expect(footerText).toBeInTheDocument();
  });
});
