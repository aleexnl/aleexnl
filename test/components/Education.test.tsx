import { render } from "@testing-library/react";
import { Education } from "../../src/components/Education";
import { educationItems as educationItemsFixture } from "../fixtures/education";

vi.mock("../../src/components/EducationItem", () => ({
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
		const { getByRole } = render(
			<Education items={educationItemsFixture} title="Education" />,
		);
		expect(getByRole("heading", { name: /Education/i })).toBeInTheDocument();
	});

	it("renders education icon/svg", () => {
		const { container } = render(
			<Education items={educationItemsFixture} title="Education" />,
		);
		const svg = container.querySelector("svg");
		expect(svg).toBeInTheDocument();
	});

	it("renders all education items", () => {
		const { getAllByTestId } = render(
			<Education items={educationItemsFixture} title="Education" />,
		);
		const educationItems = getAllByTestId("education-item");
		expect(educationItems).toHaveLength(3);

		const titles = getAllByTestId("title");
		const institutions = getAllByTestId("institution");

		expect(titles[0].textContent).toBe(".NET Training");
		expect(titles[1].textContent).toContain("Web Application Development");
		expect(titles[2].textContent).toContain("Microcomputer Systems");

		expect(institutions[0].textContent).toBe("Vueling University");
		expect(institutions[1].textContent).toBe("Institut Esteve Terradas i Illa");
		expect(institutions[2].textContent).toBe("Institut Daniel Blanxart");
	});
});
