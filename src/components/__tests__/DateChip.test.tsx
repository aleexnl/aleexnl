import { render, screen } from "@testing-library/react";
import { DateChip } from "../DateChip";

describe("DateChip", () => {
  const testDate = "2020 - Present";

  it("renders date text correctly", () => {
    render(<DateChip date={testDate} />);
    expect(screen.getByText(testDate)).toBeInTheDocument();
  });

  it("renders with correct styling classes", () => {
    const { container } = render(<DateChip date={testDate} />);
    const chipElement = container.firstChild as HTMLElement;

    expect(chipElement).toHaveClass(
      "text-sm",
      "bg-blue-50",
      "dark:bg-blue-900/30",
      "text-blue-700",
      "dark:text-blue-300",
      "px-3",
      "py-1",
      "rounded-full"
    );
  });
});
