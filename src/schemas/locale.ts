import { z } from "zod";

export const ExperienceItemSchema = z.object({
	title: z.string(),
	period: z.string(),
	company: z.string(),
	responsibilities: z.array(z.string()),
});

export const EducationItemSchema = z.object({
	title: z.string(),
	institution: z.string(),
	period: z.string(),
});

export const LanguageItemSchema = z.object({
	name: z.string(),
	level: z.string(),
});

export const LocaleDataSchema = z.object({
	experience: z.object({ items: z.array(ExperienceItemSchema) }),
	education: z.object({ items: z.array(EducationItemSchema) }),
	languages: z.object({ items: z.array(LanguageItemSchema) }),
});

export type ExperienceItem = z.infer<typeof ExperienceItemSchema>;
export type EducationItem = z.infer<typeof EducationItemSchema>;
export type LanguageItem = z.infer<typeof LanguageItemSchema>;
