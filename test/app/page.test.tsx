import { render, screen } from "@testing-library/react";
import Home from "../../src/app/[locale]/page";

vi.mock("../../src/components/Skills", () => ({
	Skills: () => <div data-testid="skills-component">Skills Mock</div>,
}));

vi.mock("../../src/components/Education", () => ({
	Education: () => <div data-testid="education-component">Education Mock</div>,
}));

vi.mock("../../src/components/Experience", () => ({
	Experience: () => (
		<div data-testid="experience-component">Experience Mock</div>
	),
}));

vi.mock("../../src/components/Languages", () => ({
	Languages: () => <div data-testid="languages-component">Languages Mock</div>,
}));

vi.mock("../../src/components/Connect", () => ({
	Connect: () => <div data-testid="connect-component">Connect Mock</div>,
}));

vi.mock("../../src/components/GithubProjects", () => ({
	GithubProjects: () => (
		<div data-testid="github-projects-component">Github Projects Mock</div>
	),
}));

vi.mock("../../src/components/LocaleSwitcher", () => ({
	LocaleSwitcher: () => (
		<div data-testid="locale-switcher">Locale Switcher Mock</div>
	),
}));

vi.mock("../../../messages/en.json", () => ({
	default: {
		experience: { items: [] },
		education: { items: [] },
		languages: { items: [] },
	},
}));

describe("Home Page", () => {
	const params = Promise.resolve({ locale: "en" });

	it("renders the page with all components", async () => {
		const HomeComponent = await Home({ params });
		render(HomeComponent);

		const headingElement = screen.getByRole("heading", { level: 1 });
		expect(headingElement).toHaveTextContent("Alejandro Nieto Luque");

		expect(screen.getByTestId("experience-component")).toBeInTheDocument();
		expect(screen.getByTestId("education-component")).toBeInTheDocument();
		expect(screen.getByTestId("connect-component")).toBeInTheDocument();
		expect(screen.getByTestId("skills-component")).toBeInTheDocument();
		expect(screen.getByTestId("languages-component")).toBeInTheDocument();
	});

	it("renders footer with current year", async () => {
		const HomeComponent = await Home({ params });
		render(HomeComponent);

		const currentYear = new Date().getFullYear().toString();
		const footerText = screen.getByText((content) => {
			return (
				content.includes(currentYear) &&
				content.includes("Alejandro Nieto Luque")
			);
		});
		expect(footerText).toBeInTheDocument();
	});
});
