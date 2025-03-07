import { render, screen } from "@testing-library/react";
import { Skill } from "../Skill";

describe("Skill", () => {
  it("renders skill with icon and text", () => {
    render(<Skill icon="code">.NET Development</Skill>);

    expect(screen.getByText(".NET Development")).toBeInTheDocument();
    // Check for SVG presence
    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("renders skill without icon", () => {
    render(<Skill>No Icon Skill</Skill>);

    expect(screen.getByText("No Icon Skill")).toBeInTheDocument();
    const svg = document.querySelector("svg");
    expect(svg).not.toBeInTheDocument();
  });
});
