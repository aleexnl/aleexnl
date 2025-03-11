import { render } from "@testing-library/react";
import { CodeIcon } from "../../../src/components/icons/CodeIcon";

describe("CodeIcon", () => {
  it("renders with default className", () => {
    const { container } = render(<CodeIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("w-3.5", "h-3.5");
  });

  it("renders with custom className", () => {
    const customClass = "custom-size";
    const { container } = render(<CodeIcon className={customClass} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass(customClass);
  });

  it("renders with correct stroke attributes", () => {
    const { container } = render(<CodeIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("fill", "none");
    expect(svg).toHaveAttribute("stroke", "currentColor");
    const path = container.querySelector("path");
    expect(path?.getAttribute("stroke-linecap")).toBe("round");
    expect(path?.getAttribute("stroke-linejoin")).toBe("round");
    expect(path?.getAttribute("stroke-width")).toBe("2");
  });
});
