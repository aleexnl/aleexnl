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
        <path d="M12 0v24" />
      </svg>
    ),
  };

  it("renders link with correct attributes", () => {
    render(<ConnectItem {...defaultProps} />);

    const link = screen.getByRole("link", { name: defaultProps.name });
    expect(link).toHaveAttribute("href", defaultProps.href);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("displays icon and name", () => {
    render(<ConnectItem {...defaultProps} />);

    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    expect(screen.getByText(defaultProps.name)).toBeInTheDocument();
  });

  it("applies custom hover colors when provided", () => {
    const customColors = {
      light: "green-600",
      dark: "green-400",
    };

    render(<ConnectItem {...defaultProps} hoverColor={customColors} />);

    const link = screen.getByRole("link");
    expect(link.className).toContain(`hover:text-${customColors.light}`);
    expect(link.className).toContain(`dark:hover:text-${customColors.dark}`);
  });
});
