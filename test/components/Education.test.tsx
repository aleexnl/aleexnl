import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Education } from "../../src/components/Education";
import { educationItems as educationItemsFixture } from "../fixtures/education";

// Mock the EducationItem component to make testing easier
jest.mock("../../src/components/EducationItem", () => ({
  EducationItem: ({
    title,
    institution,
    period,
  }: {
    title: string;
    institution: string;
    period: string;
  }) => (
    <div data-testid="education-item">
      <div data-testid="title">{title}</div>
      <div data-testid="institution">{institution}</div>
      <div data-testid="period">{period}</div>
    </div>
  ),
}));

describe("Education", () => {
  it("renders education heading correctly", () => {
    const { getByText } = render(<Education items={educationItemsFixture} />);
    expect(getByText("Education")).toBeInTheDocument();
  });

  it("renders education icon/svg", () => {
    const { container } = render(<Education items={educationItemsFixture} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("text-blue-500");
  });

  it("renders all education items", () => {
    const { getAllByTestId } = render(
      <Education items={educationItemsFixture} />
    );
    const educationItems = getAllByTestId("education-item");
    expect(educationItems).toHaveLength(3);

    // Check for specific education items
    const titles = getAllByTestId("title");
    const institutions = getAllByTestId("institution");

    // Check that expected content is present
    expect(titles[0].textContent).toBe(".NET Training");
    expect(titles[1].textContent).toContain("Web Application Development");
    expect(titles[2].textContent).toContain("Microcomputer Systems");

    expect(institutions[0].textContent).toBe("Vueling University");
    expect(institutions[1].textContent).toBe("Institut Esteve Terradas i Illa");
    expect(institutions[2].textContent).toBe("Institut Daniel Blanxart");
  });

  it("renders with correct container styling", () => {
    const { container } = render(<Education items={educationItemsFixture} />);
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveClass(
      "bg-white",
      "dark:bg-gray-800",
      "rounded-2xl",
      "shadow-sm"
    );
  });
});
