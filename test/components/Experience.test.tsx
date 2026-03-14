import { render, screen } from "@testing-library/react";
import { Experience } from "../../src/components/Experience";
import { experiences } from "../fixtures/experience";

describe("Experience", () => {
	it("renders the section with items", async () => {
		const component = await Experience({ items: experiences });
		render(component);

		// With mocked getTranslations, key is returned as value
		expect(
			screen.getByRole("heading", { name: /experience/i }),
		).toBeInTheDocument();
	});

	it("renders all experience job titles", async () => {
		const component = await Experience({ items: experiences });
		render(component);

		expect(screen.getByText("Fullstack Developer")).toBeInTheDocument();
		expect(screen.getByText("Web Applications Developer")).toBeInTheDocument();
		expect(screen.getByText("IT Services Technician")).toBeInTheDocument();
	});

	it("renders toggle buttons for each item", async () => {
		const component = await Experience({ items: experiences });
		render(component);

		// Each experience item has a toggle button; label comes from mock (key)
		const buttons = screen.getAllByRole("button");
		expect(buttons).toHaveLength(experiences.length);
	});
});
