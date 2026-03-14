import type { Education as EducationType } from "../types/education";
import { Card } from "./Card";
import { EducationItem } from "./EducationItem";
import { EducationIcon } from "./icons/EducationIcon";

interface EducationProps {
	items: EducationType[];
	title: string;
}

export function Education({ items, title }: EducationProps) {
	return (
		<Card title={title} icon={<EducationIcon />}>
			<div className="space-y-8">
				{items.map((item) => (
					<EducationItem key={item.title} {...item} />
				))}
			</div>
		</Card>
	);
}
