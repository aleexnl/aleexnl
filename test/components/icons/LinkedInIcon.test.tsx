import { render } from "@testing-library/react";
import { LinkedInIcon } from "../../../src/components/icons/LinkedInIcon";

describe("LinkedInIcon", () => {
  it("renders with default className", () => {
    const { container } = render(<LinkedInIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("w-5", "h-5");
  });

  it("renders with custom className", () => {
    const customClass = "custom-size";
    const { container } = render(<LinkedInIcon className={customClass} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass(customClass);
  });

  it("renders with correct attributes", () => {
    const { container } = render(<LinkedInIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("fill", "currentColor");
    expect(container.querySelector("path")).toBeInTheDocument();
  });
});
