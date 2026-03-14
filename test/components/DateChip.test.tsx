import { render, screen } from "@testing-library/react";
import { DateChip } from "../../src/components/DateChip";

describe("DateChip", () => {
	const testDate = "2020 - Present";
	const formattedTestDate = testDate.replace(/ - /g, " ‑ ");

	it("renders date text correctly", () => {
		render(<DateChip date={testDate} />);
		expect(screen.getByText(formattedTestDate)).toBeInTheDocument();
	});

	it("renders with minimal styling", () => {
		const { container } = render(<DateChip date={testDate} />);
		const chipElement = container.firstChild as HTMLElement;

		expect(chipElement).toHaveClass("text-xs", "text-gray-400");
	});
});
