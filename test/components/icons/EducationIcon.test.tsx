import { render } from "@testing-library/react";
import { EducationIcon } from "../../../src/components/icons/EducationIcon";

describe("EducationIcon", () => {
  it("renders with default className", () => {
    const { container } = render(<EducationIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("w-5", "h-5", "text-blue-500");
  });

  it("renders with custom className", () => {
    const customClass = "custom-size";
    const { container } = render(<EducationIcon className={customClass} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass(customClass);
  });

  it("renders with correct paths", () => {
    const { container } = render(<EducationIcon />);
    const paths = container.querySelectorAll("path");
    expect(paths).toHaveLength(3);
    expect(paths[2]?.getAttribute("stroke-linecap")).toBe("round");
    expect(paths[2]?.getAttribute("stroke-linejoin")).toBe("round");
    expect(paths[2]?.getAttribute("stroke-width")).toBe("2");
  });
});
