import { render, screen } from "@testing-library/react";
import { ResponsibilityItem } from "@/components/ResponsibilityItem";

describe("ResponsibilityItem", () => {
  const mockResponsibility = "Test responsibility";

  it("renders the responsibility text", () => {
    render(<ResponsibilityItem responsibility={mockResponsibility} />);
    expect(screen.getByText(mockResponsibility)).toBeInTheDocument();
  });

  it("renders with bullet point", () => {
    render(<ResponsibilityItem responsibility={mockResponsibility} />);
    expect(screen.getByText("•")).toBeInTheDocument();
  });

  it("has correct list item structure", () => {
    render(<ResponsibilityItem responsibility={mockResponsibility} />);
    const listItem = screen.getByRole("listitem");
    expect(listItem).toBeInTheDocument();
    expect(listItem).toHaveClass("flex", "items-start");
  });
});
