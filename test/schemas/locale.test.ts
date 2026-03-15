import {
	EducationItemSchema,
	ExperienceItemSchema,
	LanguageItemSchema,
	LocaleDataSchema,
} from "../../src/schemas/locale";

describe("ExperienceItemSchema", () => {
	it("parses a valid experience item", () => {
		const result = ExperienceItemSchema.safeParse({
			title: "Software Engineer",
			period: "2022 - Present",
			company: "Acme Corp",
			responsibilities: ["Built features", "Reviewed PRs"],
		});

		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.title).toBe("Software Engineer");
			expect(result.data.responsibilities).toHaveLength(2);
		}
	});

	it("fails when title is missing", () => {
		const result = ExperienceItemSchema.safeParse({
			period: "2022 - Present",
			company: "Acme Corp",
			responsibilities: [],
		});

		expect(result.success).toBe(false);
	});

	it("fails when responsibilities is not an array", () => {
		const result = ExperienceItemSchema.safeParse({
			title: "Engineer",
			period: "2022 - Present",
			company: "Acme",
			responsibilities: "Built features",
		});

		expect(result.success).toBe(false);
	});
});

describe("EducationItemSchema", () => {
	it("parses a valid education item", () => {
		const result = EducationItemSchema.safeParse({
			title: "BSc Computer Science",
			institution: "University of Barcelona",
			period: "2018 - 2022",
		});

		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.institution).toBe("University of Barcelona");
		}
	});

	it("fails when institution is missing", () => {
		const result = EducationItemSchema.safeParse({
			title: "BSc Computer Science",
			period: "2018 - 2022",
		});

		expect(result.success).toBe(false);
	});
});

describe("LanguageItemSchema", () => {
	it("parses a valid language item", () => {
		const result = LanguageItemSchema.safeParse({
			name: "Spanish",
			level: "Native",
		});

		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.name).toBe("Spanish");
			expect(result.data.level).toBe("Native");
		}
	});

	it("fails when level is missing", () => {
		const result = LanguageItemSchema.safeParse({ name: "Spanish" });

		expect(result.success).toBe(false);
	});
});

describe("LocaleDataSchema", () => {
	const validData = {
		experience: {
			items: [
				{
					title: "Engineer",
					period: "2022 - Present",
					company: "Acme",
					responsibilities: ["Task A"],
				},
			],
		},
		education: {
			items: [
				{
					title: "BSc CS",
					institution: "University",
					period: "2018 - 2022",
				},
			],
		},
		languages: {
			items: [{ name: "Spanish", level: "Native" }],
		},
	};

	it("parses valid locale data", () => {
		const result = LocaleDataSchema.safeParse(validData);

		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.experience.items).toHaveLength(1);
			expect(result.data.education.items).toHaveLength(1);
			expect(result.data.languages.items).toHaveLength(1);
		}
	});

	it("parses locale data with empty item arrays", () => {
		const emptyData = {
			experience: { items: [] },
			education: { items: [] },
			languages: { items: [] },
		};

		const result = LocaleDataSchema.safeParse(emptyData);
		expect(result.success).toBe(true);
	});

	it("fails when experience section is missing", () => {
		const { experience: _experience, ...withoutExperience } = validData;
		const result = LocaleDataSchema.safeParse(withoutExperience);

		expect(result.success).toBe(false);
	});

	it("fails when education section is missing", () => {
		const { education: _education, ...withoutEducation } = validData;
		const result = LocaleDataSchema.safeParse(withoutEducation);

		expect(result.success).toBe(false);
	});

	it("fails on null input", () => {
		const result = LocaleDataSchema.safeParse(null);
		expect(result.success).toBe(false);
	});

	it("fails when experience item has invalid structure", () => {
		const invalidData = {
			...validData,
			experience: {
				items: [{ title: "Engineer" }], // missing required fields
			},
		};

		const result = LocaleDataSchema.safeParse(invalidData);
		expect(result.success).toBe(false);
	});
});
