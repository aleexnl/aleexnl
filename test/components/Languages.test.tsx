import { render, screen } from "@testing-library/react";
import { Languages } from "../../src/components/Languages";
import { languages } from "../fixtures/languages";

describe("Languages", () => {
	it("renders languages section heading", () => {
		render(<Languages items={languages} title="Languages" />);
		expect(
			screen.getByRole("heading", { name: /Languages/i }),
		).toBeInTheDocument();
	});

	it("renders languages icon", () => {
		const { container } = render(
			<Languages items={languages} title="Languages" />,
		);
		const svg = container.querySelector("svg");
		expect(svg).toBeInTheDocument();
	});

	it("renders all languages with their levels", () => {
		render(<Languages items={languages} title="Languages" />);

		expect(screen.getByText("Spanish")).toBeInTheDocument();
		expect(screen.getByText("Catalan")).toBeInTheDocument();
		expect(screen.getByText("English")).toBeInTheDocument();

		const nativeLevels = screen.getAllByText("Native");
		expect(nativeLevels).toHaveLength(2);
		expect(screen.getByText("Fluent")).toBeInTheDocument();
	});
});
