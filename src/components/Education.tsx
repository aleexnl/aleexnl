import type { Education as EducationType } from "../types/education";
import { Card } from "./Card";
import { EducationItem } from "./EducationItem";
import { EducationIcon } from "./icons/EducationIcon";

interface EducationProps {
	items: EducationType[];
}

export function Education({ items }: EducationProps) {
	return (
		<Card title="Education" icon={<EducationIcon />}>
			<div className="space-y-8">
				{items.map((item) => (
					<EducationItem key={item.title} {...item} />
				))}
			</div>
		</Card>
	);
}
