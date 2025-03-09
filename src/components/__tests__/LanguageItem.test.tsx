import { render, screen } from "@testing-library/react";
import { LanguageItem } from "../LanguageItem";

describe("LanguageItem", () => {
  const defaultProps = {
    name: "English",
    level: "Native",
  };

  it("renders the language name", () => {
    render(<LanguageItem {...defaultProps} />);
    expect(screen.getByText(defaultProps.name)).toBeInTheDocument();
  });

  it("renders the language level", () => {
    render(<LanguageItem {...defaultProps} />);
    expect(screen.getByText(defaultProps.level)).toBeInTheDocument();
  });

  it("renders with different props", () => {
    const props = {
      name: "Spanish",
      level: "B2",
    };
    render(<LanguageItem {...props} />);
    expect(screen.getByText(props.name)).toBeInTheDocument();
    expect(screen.getByText(props.level)).toBeInTheDocument();
  });
});
