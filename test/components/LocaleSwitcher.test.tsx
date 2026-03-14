import { render, screen } from "@testing-library/react";
import { LocaleSwitcher } from "../../src/components/LocaleSwitcher";

vi.mock("../../src/i18n/navigation", () => ({
	usePathname: () => "/en",
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
		render(<LocaleSwitcher />);

		expect(screen.getByRole("link", { name: "EN" })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "CA" })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "ES" })).toBeInTheDocument();
	});

	it("marks active locale with aria-current", () => {
		render(<LocaleSwitcher />);

		const enLink = screen.getByRole("link", { name: "EN" });
		expect(enLink).toHaveAttribute("aria-current", "true");

		const caLink = screen.getByRole("link", { name: "CA" });
		expect(caLink).not.toHaveAttribute("aria-current");
	});

	it("has accessible nav label", () => {
		render(<LocaleSwitcher />);

		expect(
			screen.getByRole("navigation", { name: "Language switcher" }),
		).toBeInTheDocument();
	});
});
