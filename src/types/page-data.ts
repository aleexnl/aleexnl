import { ConnectItem } from "./connect";
import { Education } from "./education";
import { Experience } from "./experience";
import { Language } from "./languages";
import { Skill } from "./skills";

export interface PageData {
  connect: ConnectItem[];
  education: Education[];
  experience: Experience[];
  languages: Language[];
  skills: Skill[];
}
