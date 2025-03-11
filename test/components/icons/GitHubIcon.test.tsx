import { render } from "@testing-library/react";
import { GitHubIcon } from "../../../src/components/icons/GitHubIcon";

describe("GitHubIcon", () => {
  it("renders with default className", () => {
    const { container } = render(<GitHubIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("w-5", "h-5");
  });

  it("renders with custom className", () => {
    const customClass = "custom-size";
    const { container } = render(<GitHubIcon className={customClass} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass(customClass);
  });

  it("renders with correct attributes", () => {
    const { container } = render(<GitHubIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("fill", "currentColor");
    expect(container.querySelector("path")).toBeInTheDocument();
  });
});
