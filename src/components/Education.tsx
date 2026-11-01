import type { Education as EducationType } from "../types/education";
export function Education({
	items,
	title,
}: {
	items: EducationType[];
	title: string;
}) {
	return (
		<div className="education">
			<h3>{title}</h3>
			<div>
				{items.map((item) => (
					<article className="education-item" key={item.title}>
						<p className="education-period">{item.period}</p>
						<div>
							<h4>{item.title}</h4>
							<p>{item.institution}</p>
						</div>
					</article>
				))}
			</div>
		</div>
	);
}
