import { render, screen } from "@testing-library/react";
import { Connect } from "@/components/Connect";
import { connectItems } from "../fixtures/connect";

describe("Connect", () => {
	it("renders connect section with social links", () => {
		render(<Connect items={connectItems} />);

		expect(screen.getByRole("heading", { name: /Connect/i })).toBeInTheDocument();
		expect(screen.getAllByText("LinkedIn").length).toBeGreaterThan(0);
		expect(screen.getAllByText("GitHub").length).toBeGreaterThan(0);

		const linkedinLink = screen.getByRole("link", { name: /linkedin/i });
		const githubLink = screen.getByRole("link", { name: /github/i });

		expect(linkedinLink).toHaveAttribute(
			"href",
			"https://www.linkedin.com/in/alejandro-nieto-luque/",
		);
		expect(githubLink).toHaveAttribute("href", "https://github.com/aleexnl");

		expect(linkedinLink).toHaveAttribute("target", "_blank");
		expect(githubLink).toHaveAttribute("target", "_blank");
	});
});
