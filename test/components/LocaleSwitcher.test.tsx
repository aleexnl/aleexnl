import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LocaleSwitcher } from "../../src/components/LocaleSwitcher";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
	useRouter: () => ({ push: mockPush }),
	usePathname: () => "/en",
}));

describe("LocaleSwitcher", () => {
	beforeEach(() => {
		mockPush.mockClear();
	});

	it("renders all locale buttons", () => {
		render(<LocaleSwitcher />);

		expect(screen.getByRole("button", { name: "EN" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "CA" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "ES" })).toBeInTheDocument();
	});

	it("marks active locale with aria-current", () => {
		render(<LocaleSwitcher />);

		const enButton = screen.getByRole("button", { name: "EN" });
		expect(enButton).toHaveAttribute("aria-current", "true");

		const caButton = screen.getByRole("button", { name: "CA" });
		expect(caButton).not.toHaveAttribute("aria-current");
	});

	it("calls router.push with new locale on click", async () => {
		render(<LocaleSwitcher />);

		await userEvent.click(screen.getByRole("button", { name: "CA" }));

		expect(mockPush).toHaveBeenCalledWith("/ca");
	});

	it("has accessible nav label", () => {
		render(<LocaleSwitcher />);

		expect(
			screen.getByRole("navigation", { name: "Language switcher" }),
		).toBeInTheDocument();
	});
});
