import { render, screen } from "@testing-library/react";
import { Skills } from "../../src/components/Skills";
import { skills } from "../fixtures/skills";

describe("Skills", () => {
  it("renders all skills", () => {
    render(<Skills items={skills} />);

    expect(screen.getByText(".NET Development")).toBeInTheDocument();
    expect(screen.getByText("Azure DevOps")).toBeInTheDocument();
    expect(screen.getByText("GitHub")).toBeInTheDocument();
    expect(screen.getByText("Android Development")).toBeInTheDocument();
    expect(screen.getByText("iOS Development")).toBeInTheDocument();
  });

  it("renders with correct layout classes", () => {
    const { container } = render(<Skills items={skills} />);
    const skillsContainer = container.querySelector(".flex.flex-wrap.gap-2");
    expect(skillsContainer).toBeInTheDocument();
  });
});
