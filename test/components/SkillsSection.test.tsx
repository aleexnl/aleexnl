import { render, screen } from "@testing-library/react";
import { SkillsSection } from "../../src/components/SkillsSection";

describe("SkillsSection", () => {
  it("renders all skills", () => {
    render(<SkillsSection />);

    expect(screen.getByText(".NET Development")).toBeInTheDocument();
    expect(screen.getByText("Azure DevOps")).toBeInTheDocument();
    expect(screen.getByText("GitHub")).toBeInTheDocument();
    expect(screen.getByText("Android Development")).toBeInTheDocument();
    expect(screen.getByText("iOS Development")).toBeInTheDocument();
  });

  it("renders with correct layout classes", () => {
    const { container } = render(<SkillsSection />);
    const skillsContainer = container.firstChild as HTMLElement;
    expect(skillsContainer).toHaveClass("flex", "flex-wrap", "gap-2");
  });
});
