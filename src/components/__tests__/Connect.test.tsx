import { render, screen } from "@testing-library/react";
import { Connect } from "../Connect";

describe("Connect", () => {
  it("renders connect section with social links", () => {
    render(<Connect />);

    expect(screen.getByText("Connect")).toBeInTheDocument();
    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByText("GitHub")).toBeInTheDocument();

    const linkedinLink = screen.getByRole("link", { name: /linkedin/i });
    const githubLink = screen.getByRole("link", { name: /github/i });

    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/alejandro-nieto-luque/"
    );
    expect(githubLink).toHaveAttribute("href", "https://github.com/aleexnl");

    expect(linkedinLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("target", "_blank");
  });
});
