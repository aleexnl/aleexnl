import { render, screen } from "@testing-library/react";
import { Experience } from "../../src/components/Experience";

describe("Experience", () => {
  it("renders the section title with icon", () => {
    render(<Experience />);
    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(document.querySelector("svg")).toBeInTheDocument();
  });

  it("renders all experience items", () => {
    render(<Experience />);

    // Check for section title
    expect(screen.getByText("Experience")).toBeInTheDocument();

    // Check for updated periods
    expect(screen.getByText("May 2022 ‑ Present")).toBeInTheDocument();
    expect(screen.getByText("October 2020 ‑ May 2022")).toBeInTheDocument();
    expect(screen.getByText("November 2018 ‑ May 2021")).toBeInTheDocument();

    // Check for job titles
    expect(screen.getByText("Fullstack Developer")).toBeInTheDocument();
    expect(screen.getByText("Web Applications Developer")).toBeInTheDocument();
    expect(screen.getByText("IT Services Technician")).toBeInTheDocument();
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
