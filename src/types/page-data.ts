import type { ConnectItem } from "./connect";
import type { Education } from "./education";
import type { Experience } from "./experience";
import type { Language } from "./languages";
import type { Skill } from "./skills";

export interface PageData {
	connect: ConnectItem[];
	education: Education[];
	experience: Experience[];
	languages: Language[];
	skills: Skill[];
}
