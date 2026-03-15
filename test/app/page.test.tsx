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
	LocaleSwitcher: ({ locale }: { locale: string }) => (
		<div data-testid="locale-switcher" data-locale={locale}>
			Locale Switcher Mock
		</div>
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

	it("renders the locale switcher with current locale", async () => {
		const HomeComponent = await Home({ params });
		render(HomeComponent);

		const switcher = screen.getByTestId("locale-switcher");
		expect(switcher).toBeInTheDocument();
		expect(switcher).toHaveAttribute("data-locale", "en");
	});

	it("renders the github projects section inside a suspense boundary", async () => {
		const HomeComponent = await Home({ params });
		render(HomeComponent);

		expect(screen.getByTestId("github-projects-component")).toBeInTheDocument();
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

	it("renders structured data script tag", async () => {
		const HomeComponent = await Home({ params });
		const { container } = render(HomeComponent);

		const scriptTag = container.querySelector(
			'script[type="application/ld+json"]',
		);
		expect(scriptTag).toBeInTheDocument();

		const jsonLd = JSON.parse(scriptTag?.innerHTML ?? "{}");
		expect(jsonLd["@type"]).toBe("Person");
		expect(jsonLd.name).toBe("Alejandro Nieto Luque");
	});
});
