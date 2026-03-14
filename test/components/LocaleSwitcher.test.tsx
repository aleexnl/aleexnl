import { render, screen } from "@testing-library/react";
import { LocaleSwitcher } from "../../src/components/LocaleSwitcher";

vi.mock("../../src/i18n/navigation", () => ({
	Link: ({
		href,
		locale,
		children,
		...props
	}: {
		href: string;
		locale: string;
		children: React.ReactNode;
		[key: string]: unknown;
	}) => (
		<a href={`/${locale}${href === "/" ? "" : href}`} {...props}>
			{children}
		</a>
	),
}));

describe("LocaleSwitcher", () => {
	it("renders all locale links", () => {
		render(<LocaleSwitcher locale="en" />);

		expect(screen.getByRole("link", { name: "EN" })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "CA" })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "ES" })).toBeInTheDocument();
	});

	it("marks active locale with aria-current", () => {
		render(<LocaleSwitcher locale="en" />);

		const enLink = screen.getByRole("link", { name: "EN" });
		expect(enLink).toHaveAttribute("aria-current", "true");

		const caLink = screen.getByRole("link", { name: "CA" });
		expect(caLink).not.toHaveAttribute("aria-current");
	});

	it("marks correct locale as active when locale is ca", () => {
		render(<LocaleSwitcher locale="ca" />);

		const caLink = screen.getByRole("link", { name: "CA" });
		expect(caLink).toHaveAttribute("aria-current", "true");

		const enLink = screen.getByRole("link", { name: "EN" });
		expect(enLink).not.toHaveAttribute("aria-current");
	});

	it("marks correct locale as active when locale is es", () => {
		render(<LocaleSwitcher locale="es" />);

		const esLink = screen.getByRole("link", { name: "ES" });
		expect(esLink).toHaveAttribute("aria-current", "true");
	});

	it("has accessible nav label", () => {
		render(<LocaleSwitcher locale="en" />);

		expect(
			screen.getByRole("navigation", { name: "Language switcher" }),
		).toBeInTheDocument();
	});

	it("renders correct href for each locale", () => {
		render(<LocaleSwitcher locale="en" />);

		expect(screen.getByRole("link", { name: "EN" })).toHaveAttribute(
			"href",
			"/en",
		);
		expect(screen.getByRole("link", { name: "CA" })).toHaveAttribute(
			"href",
			"/ca",
		);
		expect(screen.getByRole("link", { name: "ES" })).toHaveAttribute(
			"href",
			"/es",
		);
	});
});
