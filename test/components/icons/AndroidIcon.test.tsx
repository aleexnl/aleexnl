import { render } from "@testing-library/react";
import { AndroidIcon } from "../../../src/components/icons/AndroidIcon";

describe("AndroidIcon", () => {
  it("renders with default className", () => {
    const { container } = render(<AndroidIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("w-3.5", "h-3.5");
  });

  it("renders with custom className", () => {
    const customClass = "custom-size";
    const { container } = render(<AndroidIcon className={customClass} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass(customClass);
  });

  it("renders with correct viewBox and path", () => {
    const { container } = render(<AndroidIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
    expect(svg).toHaveAttribute("xmlns", "http://www.w3.org/2000/svg");
    expect(container.querySelector("path")).toBeInTheDocument();
  });
});
