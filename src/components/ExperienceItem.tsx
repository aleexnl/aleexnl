import type { Experience } from "../types/experience";

export function ExperienceItem({
	title,
	period,
	company,
	responsibilities,
	current,
}: Experience & { current?: string }) {
	const [name, ...location] = company.split(", ");
	return (
		<article className="career-chapter">
			<div className="career-period">
				<p>{period}</p>
				{current && <span>{current}</span>}
			</div>
			<div className="career-role">
				<h3>{name}</h3>
				<p>{title}</p>
				<span>{location.join(", ")}</span>
			</div>
			<ul className="career-responsibilities">
				{responsibilities.map((responsibility) => (
					<li key={responsibility}>{responsibility}</li>
				))}
			</ul>
		</article>
	);
}
