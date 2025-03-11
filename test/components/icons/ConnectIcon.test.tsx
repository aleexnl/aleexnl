import { render } from "@testing-library/react";
import { ConnectIcon } from "../../../src/components/icons/ConnectIcon";

describe("ConnectIcon", () => {
  it("renders with default className", () => {
    const { container } = render(<ConnectIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("w-5", "h-5");
  });

  it("renders with custom className", () => {
    const customClass = "custom-size";
    const { container } = render(<ConnectIcon className={customClass} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass(customClass);
  });

  it("renders with correct stroke attributes", () => {
    const { container } = render(<ConnectIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("fill", "none");
    expect(svg).toHaveAttribute("stroke", "currentColor");
    const path = container.querySelector("path");
    expect(path?.getAttribute("stroke-linecap")).toBe("round");
    expect(path?.getAttribute("stroke-linejoin")).toBe("round");
    expect(path?.getAttribute("stroke-width")).toBe("2");
  });
});
