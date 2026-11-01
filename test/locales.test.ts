import { describe, expect, it } from "vitest";
import ca from "../messages/ca.json";
import en from "../messages/en.json";
import errors from "../messages/errors.json";
import es from "../messages/es.json";
import { LocaleDataSchema } from "../src/schemas/locale";

function leafEntries(value: unknown, prefix = ""): [string, unknown][] {
	if (value !== null && typeof value === "object") {
		return Object.entries(value).flatMap(([key, child]) =>
			leafEntries(child, prefix ? `${prefix}.${key}` : key),
		);
	}
	return [[prefix, value]];
}

describe("localized portfolio content", () => {
	it("keeps the isolated error boundary translations complete in every locale", () => {
		expect(Object.keys(errors).sort()).toEqual(["ca", "en", "es"]);
		for (const [locale, messages] of Object.entries(errors)) {
			expect(Object.keys(messages).sort()).toEqual(
				Object.keys(errors.en).sort(),
			);
			for (const [key, value] of Object.entries(messages)) {
				expect(typeof value, `${locale}.${key}`).toBe("string");
				expect(value.trim().length, `${locale}.${key}`).toBeGreaterThan(0);
			}
		}
	});

	for (const [locale, messages] of Object.entries({ en, es, ca })) {
		it(`${locale} preserves validated career, education and language data`, () => {
			const data = LocaleDataSchema.parse(messages);
			expect(data.experience.items).toHaveLength(en.experience.items.length);
			expect(data.education.items).toHaveLength(en.education.items.length);
			expect(data.languages.items).toHaveLength(3);
			expect(data.experience.items[0].responsibilities.length).toBeGreaterThan(
				0,
			);
		});

		it(`${locale} has every translation key with nonempty text`, () => {
			const entries = leafEntries(messages);
			expect(entries.map(([key]) => key).sort()).toEqual(
				leafEntries(en)
					.map(([key]) => key)
					.sort(),
			);
			for (const [key, value] of entries) {
				expect(typeof value, `${locale}.${key}`).toBe("string");
				expect(String(value).trim().length, `${locale}.${key}`).toBeGreaterThan(
					0,
				);
			}
		});
	}
});
