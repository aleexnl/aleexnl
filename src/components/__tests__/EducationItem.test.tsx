import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { EducationItem } from "../EducationItem";

describe("EducationItem", () => {
  const defaultProps = {
    title: "Test Education",
    institution: "Test Institution",
    period: "2022 - 2023",
  };

  it("renders title, institution and period correctly", () => {
    const { getByText } = render(<EducationItem {...defaultProps} />);

    expect(getByText(defaultProps.title)).toBeInTheDocument();
    expect(getByText(defaultProps.institution)).toBeInTheDocument();
    expect(getByText(defaultProps.period)).toBeInTheDocument();
  });

  it("renders with correct styling elements", () => {
    const { container, getByText } = render(
      <EducationItem {...defaultProps} />
    );

    // Check for timeline marker (blue circle)
    const timelineMarker = container.querySelector(
      "div.absolute.bg-blue-500.rounded-full"
    );
    expect(timelineMarker).toBeInTheDocument();

    // Check for left border indicating timeline
    const timelineBorder = container.querySelector(
      "div.border-l-2.border-blue-100"
    );
    expect(timelineBorder).toBeInTheDocument();

    // Check for period having the pill/badge style
    const periodElement = getByText(defaultProps.period);
    expect(periodElement).toHaveClass(
      "bg-blue-50",
      "dark:bg-blue-900/30",
      "rounded-full"
    );
  });
});
