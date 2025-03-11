import { render } from "@testing-library/react";
import { LanguagesIcon } from "../../../src/components/icons/LanguagesIcon";

describe("LanguagesIcon", () => {
  it("renders with default className", () => {
    const { container } = render(<LanguagesIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("w-5", "h-5", "text-blue-500");
  });

  it("renders with custom className", () => {
    const customClass = "custom-size";
    const { container } = render(<LanguagesIcon className={customClass} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass(customClass);
  });

  it("renders with correct stroke attributes", () => {
    const { container } = render(<LanguagesIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("fill", "none");
    expect(svg).toHaveAttribute("stroke", "currentColor");
    const path = container.querySelector("path");
    expect(path?.getAttribute("stroke-linecap")).toBe("round");
    expect(path?.getAttribute("stroke-linejoin")).toBe("round");
    expect(path?.getAttribute("stroke-width")).toBe("2");
  });
});
