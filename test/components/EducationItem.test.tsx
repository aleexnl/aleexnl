import { render } from "@testing-library/react";
import { EducationItem } from "../../src/components/EducationItem";

describe("EducationItem", () => {
	const defaultProps = {
		title: "Test Education",
		institution: "Test Institution",
		period: "2022 ‑ 2023",
	};

	it("renders title, institution and period correctly", () => {
		const { getByText } = render(<EducationItem {...defaultProps} />);

		expect(getByText(defaultProps.title)).toBeInTheDocument();
		expect(getByText(defaultProps.institution)).toBeInTheDocument();
		expect(getByText(defaultProps.period)).toBeInTheDocument();
	});

	it("renders with timeline styling", () => {
		const { container } = render(<EducationItem {...defaultProps} />);

		const mainContainer = container.firstChild as HTMLElement;
		expect(mainContainer).toHaveClass(
			"relative",
			"pl-8",
			"border-l",
			"border-gray-200",
		);

		const timelineDot = mainContainer.querySelector("div:first-child");
		expect(timelineDot).toHaveClass(
			"absolute",
			"w-2",
			"h-2",
			"bg-gray-400",
			"rounded-full",
		);
	});
});
