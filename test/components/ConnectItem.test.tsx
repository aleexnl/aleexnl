import { render, screen } from "@testing-library/react";
import { ConnectItem } from "../../src/components/ConnectItem";

describe("ConnectItem", () => {
	const defaultProps = {
		href: "https://example.com",
		name: "Test Link",
		icon: (
			<svg
				data-testid="test-icon"
				className="w-5 h-5"
				fill="currentColor"
				viewBox="0 0 24 24"
			>
				<title>Test Icon</title>
				<path d="M12 0v24" />
			</svg>
		),
	};

	it("renders link with correct attributes", () => {
		render(<ConnectItem {...defaultProps} />);

		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", defaultProps.href);
		expect(link).toHaveAttribute("target", "_blank");
		expect(link).toHaveAttribute("rel", "noopener noreferrer");
	});

	it("has accessible sr-only opens in new tab text", () => {
		render(<ConnectItem {...defaultProps} />);

		expect(screen.getByText("(opens in new tab)")).toBeInTheDocument();
	});

	it("displays icon and name", () => {
		render(<ConnectItem {...defaultProps} />);

		expect(screen.getByTestId("test-icon")).toBeInTheDocument();
		expect(screen.getByText(defaultProps.name)).toBeInTheDocument();
	});
});
