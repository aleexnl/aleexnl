import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { EducationItem } from "../EducationItem";

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

  it("renders with correct styling elements", () => {
    const { getByText, container } = render(
      <EducationItem {...defaultProps} />
    );

    // Check for main container styling
    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer).toHaveClass(
      "relative",
      "pl-8",
      "border-l-2",
      "border-blue-100",
      "dark:border-blue-900"
    );

    // Check for period having the pill/badge style
    const periodElement = getByText(defaultProps.period);
    expect(periodElement).toHaveClass(
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
