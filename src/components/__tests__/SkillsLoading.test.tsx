import { render } from "@testing-library/react";
import { SkillsLoading } from "../SkillsLoading";

describe("SkillsLoading", () => {
  it("renders loading skeleton with correct styles", () => {
    const { container } = render(<SkillsLoading />);

    const loadingElement = container.firstChild as HTMLElement;
    expect(loadingElement).toHaveClass(
      "animate-pulse",
      "h-20",
      "bg-gray-200",
      "dark:bg-gray-700",
      "rounded-2xl"
    );
  });
});
