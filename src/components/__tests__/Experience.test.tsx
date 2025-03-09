import { render, screen } from "@testing-library/react";
import { Experience } from "../Experience";

describe("Experience", () => {
  it("renders the section title with icon", () => {
    render(<Experience />);
    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(document.querySelector("svg")).toBeInTheDocument();
  });

  it("renders all experience items", () => {
    render(<Experience />);

    // Check for the presence of example experiences
    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    expect(screen.getByText("Web Developer Intern")).toBeInTheDocument();

    // Check for periods
    expect(screen.getByText("2021 - Present")).toBeInTheDocument();
    expect(screen.getByText("2020 - 2021")).toBeInTheDocument();

    // Check for companies
    expect(screen.getByText("Company Name")).toBeInTheDocument();
    expect(screen.getByText("Internship Company")).toBeInTheDocument();
  });

  it("renders with correct container styling", () => {
    const { container } = render(<Experience />);
    const mainContainer = container.firstChild as HTMLElement;

    expect(mainContainer).toHaveClass(
      "bg-white",
      "dark:bg-gray-800",
      "rounded-2xl",
      "shadow-sm",
      "hover:shadow-md",
      "transition-shadow"
    );
  });
});
