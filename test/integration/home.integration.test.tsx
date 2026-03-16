import { render, screen } from "@testing-library/react";
import {
	Children,
	cloneElement,
	isValidElement,
	type ReactNode,
	Suspense,
} from "react";
import caMessages from "../../messages/ca.json";
import enMessages from "../../messages/en.json";
import esMessages from "../../messages/es.json";

// Helper to recursively resolve async server components for testing
async function resolveTree(element: ReactNode): Promise<ReactNode> {
	if (!isValidElement(element)) return element;

	// Unwrap Suspense — render its children directly
	if (element.type === Suspense) {
		const children = (element.props as { children?: ReactNode }).children;
		if (children) return resolveTree(children);
		return null;
	}

	// If the component is a function (FC or async server component), call it
	if (typeof element.type === "function") {
		try {
			let result = (element.type as (...args: never[]) => unknown)(
				element.props,
			);
			if (result && typeof result === "object" && "then" in result) {
				result = await result;
			}
			if (isValidElement(result)) {
				return resolveTree(result);
			}
			return result;
		} catch {
			// Component might require React runtime (e.g. useState), keep as-is
			return element;
		}
	}

	// For HTML elements / fragments, resolve children recursively
	const props = element.props as { children?: ReactNode };
	if (props.children) {
		const childArray = Children.toArray(props.children);
		const resolvedChildren = await Promise.all(childArray.map(resolveTree));
		return cloneElement(element, {}, ...resolvedChildren);
	}

	return element;
}

// Only mock external boundaries: GitHub API and navigation
vi.mock("../../src/lib/github", () => ({
	getGithubRepos: vi.fn().mockResolvedValue([
		{
			name: "portfolio",
			description: "My portfolio website",
			html_url: "https://github.com/aleexnl/portfolio",
			language: "TypeScript",
			stargazers_count: 5,
			fork: false,
		},
		{
			name: "cool-project",
			description: "A cool project",
			html_url: "https://github.com/aleexnl/cool-project",
			language: "JavaScript",
			stargazers_count: 3,
			fork: false,
		},
	]),
}));

vi.mock("next/link", () => ({
	default: ({
		children,
		href,
		...props
	}: {
		children: React.ReactNode;
		href: string;
		[key: string]: unknown;
	}) => (
		<a href={href} {...props}>
			{children}
		</a>
	),
}));

vi.mock("../../src/i18n/navigation", () => ({
	Link: ({
		children,
		href,
		locale,
		...props
	}: {
		children: React.ReactNode;
		href: string;
		locale?: string;
		[key: string]: unknown;
	}) => (
		<a
			href={locale ? `/${locale}${href === "/" ? "" : href}` : href}
			{...props}
		>
			{children}
		</a>
	),
}));

type Messages = Record<string, Record<string, string>>;

function createTranslationFn(
	messages: Messages,
	namespace: string,
): (key: string) => string {
	const section = messages[namespace] ?? {};
	return (key: string) => section[key] ?? `${namespace}.${key}`;
}

const allMessages: Record<string, Messages> = {
	en: enMessages as unknown as Messages,
	ca: caMessages as unknown as Messages,
	es: esMessages as unknown as Messages,
};

let currentLocaleMessages: Messages = allMessages.en;

vi.mock("next-intl/server", () => ({
	getTranslations: vi.fn((namespace: string) =>
		Promise.resolve(createTranslationFn(currentLocaleMessages, namespace)),
	),
	getMessages: vi.fn(() => Promise.resolve(currentLocaleMessages)),
}));

vi.mock("next-intl", () => ({
	useTranslations: (namespace: string) =>
		createTranslationFn(currentLocaleMessages, namespace),
	useLocale: () => "en",
	NextIntlClientProvider: ({ children }: { children: React.ReactNode }) =>
		children,
}));

// Import Home after mocks are set up
import Home from "../../src/app/[locale]/page";

function setLocale(locale: string) {
	currentLocaleMessages = allMessages[locale] ?? allMessages.en;
}

async function renderHome(locale: string) {
	setLocale(locale);
	const params = Promise.resolve({ locale });
	const tree = await Home({ params });
	const resolved = await resolveTree(tree);
	return render(resolved as React.ReactElement);
}

describe("Home Page Integration", () => {
	beforeEach(() => {
		setLocale("en");
	});

	describe("English locale", () => {
		it("renders the full page with real content", async () => {
			await renderHome("en");

			// Header
			expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
				"Alejandro Nieto Luque",
			);
			expect(screen.getByText("Software Developer")).toBeInTheDocument();

			// Locale switcher links
			expect(screen.getByText("EN")).toBeInTheDocument();
			expect(screen.getByText("CA")).toBeInTheDocument();
			expect(screen.getByText("ES")).toBeInTheDocument();
		});

		it("renders experience section with real data", async () => {
			await renderHome("en");

			expect(screen.getByText("Fullstack Developer")).toBeInTheDocument();
			expect(screen.getByText("Vueling, Viladecans")).toBeInTheDocument();
			expect(
				screen.getByText("Web Applications Developer"),
			).toBeInTheDocument();
			expect(
				screen.getByText("tradEAsy, Cornellá de Llobregat, Barcelona"),
			).toBeInTheDocument();
			expect(screen.getByText("IT Services Technician")).toBeInTheDocument();
		});

		it("renders education section with real data", async () => {
			await renderHome("en");

			expect(screen.getByText(".NET Training")).toBeInTheDocument();
			expect(screen.getByText("Vueling University")).toBeInTheDocument();
			expect(
				screen.getByText(
					"Diploma in Web Application Development (EQF Level 5)",
				),
			).toBeInTheDocument();
			expect(
				screen.getByText("Institut Esteve Terradas i Illa"),
			).toBeInTheDocument();
		});

		it("renders skills from static data", async () => {
			await renderHome("en");

			expect(screen.getByText(".NET Development")).toBeInTheDocument();
			expect(screen.getByText("Azure DevOps")).toBeInTheDocument();
			expect(screen.getByText("Android Development")).toBeInTheDocument();
			expect(screen.getByText("iOS Development")).toBeInTheDocument();
		});

		it("renders connect links from static data", async () => {
			await renderHome("en");

			const links = screen.getAllByRole("link");

			const emailLink = links.find(
				(l) => l.getAttribute("href") === "mailto:alex.nieto0027@gmail.com",
			);
			expect(emailLink).toBeDefined();

			const linkedinLink = links.find(
				(l) =>
					l.getAttribute("href") ===
					"https://www.linkedin.com/in/alejandro-nieto-luque/",
			);
			expect(linkedinLink).toBeDefined();

			const githubLink = links.find(
				(l) => l.getAttribute("href") === "https://github.com/aleexnl",
			);
			expect(githubLink).toBeDefined();
		});

		it("renders languages with levels", async () => {
			await renderHome("en");

			expect(screen.getByText("Spanish")).toBeInTheDocument();
			expect(screen.getByText("Catalan")).toBeInTheDocument();
			expect(screen.getByText("English")).toBeInTheDocument();
			const nativeElements = screen.getAllByText("Native");
			expect(nativeElements.length).toBe(2); // Spanish and Catalan are both Native
			expect(screen.getByText("Fluent")).toBeInTheDocument();
		});

		it("renders GitHub projects from mocked API", async () => {
			await renderHome("en");

			expect(screen.getByText("portfolio")).toBeInTheDocument();
			expect(screen.getByText("My portfolio website")).toBeInTheDocument();
			expect(screen.getByText("cool-project")).toBeInTheDocument();
		});

		it("renders personal statement", async () => {
			await renderHome("en");

			expect(
				screen.getByText(/Motivated and adaptable professional/),
			).toBeInTheDocument();
		});

		it("renders footer with current year", async () => {
			await renderHome("en");

			const currentYear = new Date().getFullYear().toString();
			expect(
				screen.getByText(new RegExp(`© ${currentYear} Alejandro Nieto Luque`)),
			).toBeInTheDocument();
		});

		it("renders valid JSON-LD structured data", async () => {
			const { container } = await renderHome("en");

			const scriptTag = container.querySelector(
				'script[type="application/ld+json"]',
			);
			expect(scriptTag).toBeInTheDocument();

			const jsonLd = JSON.parse(scriptTag?.innerHTML ?? "{}");
			expect(jsonLd["@context"]).toBe("https://schema.org");
			expect(jsonLd["@type"]).toBe("Person");
			expect(jsonLd.name).toBe("Alejandro Nieto Luque");
			expect(jsonLd.url).toBe("https://aleexnl.com/");
			expect(jsonLd.alumniOf).toHaveLength(3);
			expect(jsonLd.alumniOf[0].name).toBe("Vueling University");
		});
	});

	describe("Catalan locale", () => {
		it("renders the page with Catalan content", async () => {
			await renderHome("ca");

			expect(
				screen.getByText("Desenvolupador de Software"),
			).toBeInTheDocument();
		});

		it("renders Catalan experience data", async () => {
			await renderHome("ca");

			expect(screen.getByText("Fullstack Developer")).toBeInTheDocument();
			expect(
				screen.getByText("Desenvolupador d'Aplicacions Web"),
			).toBeInTheDocument();
			expect(
				screen.getByText("Tècnic de Serveis Informàtics"),
			).toBeInTheDocument();
		});

		it("renders Catalan education data", async () => {
			await renderHome("ca");

			expect(screen.getByText("Formació en .NET")).toBeInTheDocument();
			expect(
				screen.getByText(
					"Tècnic Superior en Desenvolupament d'Aplicacions Web (Nivell EQF 5)",
				),
			).toBeInTheDocument();
		});

		it("renders Catalan language names", async () => {
			await renderHome("ca");

			expect(screen.getByText("Espanyol")).toBeInTheDocument();
			expect(screen.getByText("Català")).toBeInTheDocument();
			expect(screen.getByText("Anglès")).toBeInTheDocument();
		});

		it("generates correct JSON-LD URL for Catalan", async () => {
			const { container } = await renderHome("ca");

			const scriptTag = container.querySelector(
				'script[type="application/ld+json"]',
			);
			const jsonLd = JSON.parse(scriptTag?.innerHTML ?? "{}");
			expect(jsonLd.url).toBe("https://aleexnl.com/ca");
		});
	});

	describe("Spanish locale", () => {
		it("renders the page with Spanish content", async () => {
			await renderHome("es");

			expect(screen.getByText("Desarrollador de Software")).toBeInTheDocument();
		});

		it("renders Spanish experience data", async () => {
			await renderHome("es");

			expect(screen.getByText("Fullstack Developer")).toBeInTheDocument();
			expect(
				screen.getByText("Desarrollador de Aplicaciones Web"),
			).toBeInTheDocument();
			expect(
				screen.getByText("Técnico de Servicios Informáticos"),
			).toBeInTheDocument();
		});

		it("renders Spanish language names", async () => {
			await renderHome("es");

			expect(screen.getByText("Español")).toBeInTheDocument();
			expect(screen.getByText("Catalán")).toBeInTheDocument();
			expect(screen.getByText("Inglés")).toBeInTheDocument();
		});

		it("generates correct JSON-LD URL for Spanish", async () => {
			const { container } = await renderHome("es");

			const scriptTag = container.querySelector(
				'script[type="application/ld+json"]',
			);
			const jsonLd = JSON.parse(scriptTag?.innerHTML ?? "{}");
			expect(jsonLd.url).toBe("https://aleexnl.com/es");
		});
	});
});
