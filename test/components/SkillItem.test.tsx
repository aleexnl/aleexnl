import { render, screen } from "@testing-library/react";
import { SkillItem } from "../../src/components/SkillItem";
import { CodeIcon } from "../../src/components/icons/CodeIcon";

describe("SkillItem", () => {
  it("renders skill with icon and text", () => {
    render(<SkillItem icon={<CodeIcon />}>.NET Development</SkillItem>);

    expect(screen.getByText(".NET Development")).toBeInTheDocument();
    expect(document.querySelector("svg")).toBeInTheDocument();
  });

  it("renders skill without icon", () => {
    render(<SkillItem>No Icon Skill</SkillItem>);

    expect(screen.getByText("No Icon Skill")).toBeInTheDocument();
    expect(document.querySelector("svg")).not.toBeInTheDocument();
  });
});
