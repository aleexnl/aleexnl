import "@testing-library/jest-dom";

vi.mock("next-intl", () => ({
	useTranslations: () => (key: string) => key,
	useLocale: () => "en",
	NextIntlClientProvider: ({ children }: { children: React.ReactNode }) =>
		children,
}));

vi.mock("next-intl/server", () => ({
	getTranslations: () => Promise.resolve((key: string) => key),
	getMessages: () => Promise.resolve({}),
}));

vi.mock("next/navigation", () => ({
	useRouter: () => ({ push: vi.fn() }),
	usePathname: () => "/en",
}));
