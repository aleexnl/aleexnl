import { render, screen } from "@testing-library/react";
import { Card } from "../Card";

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

  it("renders with correct styling classes", () => {
    const { container } = render(<Card {...defaultProps} />);
    const cardContainer = container.firstChild as HTMLElement;

    expect(cardContainer).toHaveClass(
      "bg-white",
      "dark:bg-gray-800",
      "rounded-2xl",
      "shadow-sm",
      "hover:shadow-md",
      "transition-shadow"
    );
  });
});
