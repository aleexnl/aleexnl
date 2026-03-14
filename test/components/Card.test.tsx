import { render, screen } from "@testing-library/react";
import { Card } from "../../src/components/Card";

describe("Card", () => {
	const defaultProps = {
		title: "Test Card",
		children: <div>Test Content</div>,
	};

	it("renders title and content", () => {
		render(<Card {...defaultProps} />);
		expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
		expect(screen.getByText("Test Content")).toBeInTheDocument();
	});

	it("renders icon when provided", () => {
		const icon = <svg data-testid="test-icon" />;
		render(<Card {...defaultProps} icon={icon} />);
		expect(screen.getByTestId("test-icon")).toBeInTheDocument();
	});

	it("renders title with uppercase tracking style", () => {
		render(<Card {...defaultProps} />);
		const heading = screen.getByRole("heading", { level: 2 });
		expect(heading).toHaveClass(
			"uppercase",
			"tracking-widest",
			"text-gray-400",
		);
	});
});
