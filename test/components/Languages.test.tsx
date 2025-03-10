import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Languages } from "../../src/components/Languages";

describe("Languages", () => {
  it("renders languages section heading", () => {
    render(<Languages />);
    expect(screen.getByText("Languages")).toBeInTheDocument();
  });

  it("renders languages icon", () => {
    const { container } = render(<Languages />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("text-blue-500");
  });

  it("renders all languages with their levels", () => {
    render(<Languages />);

    // Check languages
    expect(screen.getByText("Spanish")).toBeInTheDocument();
    expect(screen.getByText("Catalan")).toBeInTheDocument();
    expect(screen.getByText("English")).toBeInTheDocument();

    // Check levels
    const nativeLevels = screen.getAllByText("Native");
    expect(nativeLevels).toHaveLength(2);
    expect(screen.getByText("Fluent")).toBeInTheDocument();
  });

  it("renders with correct container styling", () => {
    const { container } = render(<Languages />);
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveClass(
      "bg-white",
      "dark:bg-gray-800",
      "rounded-2xl",
      "shadow-sm",
      "hover:shadow-md",
      "transition-shadow",
      "p-6",
      "md:p-8"
    );
  });
});
