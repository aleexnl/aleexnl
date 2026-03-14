import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ExperienceItem } from "../../src/components/ExperienceItem";

describe("ExperienceItem", () => {
	const mockProps = {
		title: "Software Engineer",
		period: "2020 ‑ 2021",
		company: "Test Company",
		responsibilities: ["Responsibility 1", "Responsibility 2"],
		expandLabel: "Show responsibilities",
		collapseLabel: "Hide responsibilities",
	};

	it("renders title, period, and company", () => {
		render(<ExperienceItem {...mockProps} />);

		expect(screen.getByText(mockProps.title)).toBeInTheDocument();
		expect(screen.getByText(mockProps.period)).toBeInTheDocument();
		expect(screen.getByText(mockProps.company)).toBeInTheDocument();
	});

	it("hides responsibilities by default", () => {
		render(<ExperienceItem {...mockProps} />);

		const panel = document.querySelector("section");
		expect(panel).toHaveAttribute("hidden");

		const toggle = screen.getByRole("button");
		expect(toggle).toHaveAttribute("aria-expanded", "false");
		expect(toggle).toHaveTextContent(mockProps.expandLabel);
	});

	it("shows responsibilities after clicking toggle", async () => {
		render(<ExperienceItem {...mockProps} />);

		const toggle = screen.getByRole("button");
		await userEvent.click(toggle);

		expect(toggle).toHaveAttribute("aria-expanded", "true");
		expect(toggle).toHaveTextContent(mockProps.collapseLabel);

		mockProps.responsibilities.forEach((r) => {
			expect(screen.getByText(r)).toBeInTheDocument();
		});
	});

	it("collapses again after second click", async () => {
		render(<ExperienceItem {...mockProps} />);

		const toggle = screen.getByRole("button");
		await userEvent.click(toggle);
		await userEvent.click(toggle);

		expect(toggle).toHaveAttribute("aria-expanded", "false");
		const panelId = toggle.getAttribute("aria-controls");
		const panel = panelId ? document.getElementById(panelId) : null;
		expect(panel).toHaveAttribute("hidden");
	});

	it("renders with correct timeline styling", () => {
		const { container } = render(<ExperienceItem {...mockProps} />);
		const mainContainer = container.firstChild as HTMLElement;

		expect(mainContainer).toHaveClass(
			"relative",
			"pl-8",
			"border-l",
			"border-gray-200",
		);

		const timelineDot = mainContainer.querySelector("div:first-child");
		expect(timelineDot).toHaveClass(
			"absolute",
			"w-2",
			"h-2",
			"bg-gray-400",
			"rounded-full",
		);
	});
});
