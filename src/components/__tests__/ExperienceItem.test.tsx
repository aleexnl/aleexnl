import { render, screen } from "@testing-library/react";
import { ExperienceItem } from "../ExperienceItem";

describe("ExperienceItem", () => {
  const mockProps = {
    title: "Software Engineer",
    period: "2020 - 2021",
    company: "Test Company",
    responsibilities: ["Responsibility 1", "Responsibility 2"],
  };

  it("renders all provided information correctly", () => {
    render(<ExperienceItem {...mockProps} />);

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.period)).toBeInTheDocument();
    expect(screen.getByText(mockProps.company)).toBeInTheDocument();
    mockProps.responsibilities.forEach((responsibility) => {
      expect(screen.getByText(responsibility)).toBeInTheDocument();
    });
  });

  it("renders with correct styling classes", () => {
    const { container } = render(<ExperienceItem {...mockProps} />);

    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer).toHaveClass(
      "relative",
      "pl-8",
      "border-l-2",
      "border-blue-100",
      "dark:border-blue-900"
    );

    const timelineDot = mainContainer.querySelector("div:first-child");
    expect(timelineDot).toHaveClass(
      "absolute",
      "w-4",
      "h-4",
      "bg-blue-500",
      "rounded-full"
    );
  });
});
