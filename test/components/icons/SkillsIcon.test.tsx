import { render } from "@testing-library/react";
import { SkillsIcon } from "../../../src/components/icons/SkillsIcon";

describe("SkillsIcon", () => {
	it("renders with default className", () => {
		const { container } = render(<SkillsIcon />);
		const svg = container.querySelector("svg");
		expect(svg).toBeInTheDocument();
		expect(svg).toHaveClass("w-5", "h-5");
	});

	it("renders with custom className", () => {
		const { container } = render(<SkillsIcon className="w-8 h-8" />);
		const svg = container.querySelector("svg");
		expect(svg).toHaveClass("w-8", "h-8");
		expect(svg).not.toHaveClass("w-5", "h-5");
	});

	it("renders with correct svg attributes", () => {
		const { container } = render(<SkillsIcon />);
		const svg = container.querySelector("svg");
		expect(svg).toHaveAttribute("fill", "none");
		expect(svg).toHaveAttribute("stroke", "currentColor");
		expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
	});

	it("renders with correct stroke path attributes", () => {
		const { container } = render(<SkillsIcon />);
		const path = container.querySelector("path");
		expect(path?.getAttribute("stroke-linecap")).toBe("round");
		expect(path?.getAttribute("stroke-linejoin")).toBe("round");
		expect(path?.getAttribute("stroke-width")).toBe("2");
	});

	it("renders an accessible title", () => {
		const { container } = render(<SkillsIcon />);
		const title = container.querySelector("title");
		expect(title).toBeInTheDocument();
		expect(title?.textContent).toBe("Skills");
	});
});
