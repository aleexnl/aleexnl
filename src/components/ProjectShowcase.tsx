import { getTranslations } from "next-intl/server";
import { enrichProjects } from "../data/projects";
import { getGithubRepos } from "../lib/github";
import { Arrow } from "./Arrow";

export async function ProjectShowcase() {
	const [t, repositories] = await Promise.all([
		getTranslations("portfolio.work"),
		getGithubRepos(),
	]);
	const projects = enrichProjects(repositories);
	return (
		<div className="project-list">
			{projects.map((project) => (
				<article className={`project project-${project.id}`} key={project.id}>
					<figure className={`project-visual visual-${project.id}`}>
						<div className="visual-topline">
							<span>{project.name}</span>
							<span aria-hidden="true">
								{project.id === "library"
									? "{ }"
									: project.id === "android"
										? "⌘"
										: "an."}
							</span>
						</div>
						<div className="visual-content">
							{project.id === "library" ? (
								<>
									<p className="visual-title">{t("library.visual")}</p>
									<div className="architecture">
										{["layer1", "layer2", "layer3"].map((layer, i) => (
											<div
												className={`architecture-layer layer-${i}`}
												key={layer}
											>
												<span>{["API", "DOMAIN", "DATA"][i]}</span>
												<span>{t(`library.${layer}`)}</span>
												<span aria-hidden="true">{["↗", "◇", "≡"][i]}</span>
											</div>
										))}
									</div>
								</>
							) : project.id === "android" ? (
								<>
									<p className="visual-title">{t("android.visual")}</p>
									<div className="workflow">
										{["step1", "step2", "step3"].map((step, i) => (
											<div className="workflow-step" key={step}>
												<span
													className={`workflow-icon workflow-icon-${i}`}
													aria-hidden="true"
												>
													{["+", "◎", "↗"][i]}
												</span>
												<span>{t(`android.${step}`)}</span>
											</div>
										))}
									</div>
								</>
							) : (
								<>
									<p className="portfolio-logotype" aria-hidden="true">
										an<span>.</span>
									</p>
									<p className="visual-title">{t("portfolio.visual")}</p>
									<div className="locale-display" aria-hidden="true">
										<span>English</span>
										<span>Español</span>
										<span>Català</span>
									</div>
								</>
							)}
						</div>
						<figcaption>
							{t(project.kind)}
							<span>{project.language}</span>
						</figcaption>
					</figure>
					<div className="project-details">
						<div>
							<p className="section-kicker">{t(`${project.id}.category`)}</p>
							<h3>{project.name}</h3>
							<p className="project-thesis">{t(`${project.id}.title`)}</p>
						</div>
						<div className="project-story">
							<p>{t(`${project.id}.description`)}</p>
							<p>{t(`${project.id}.decision`)}</p>
							<ul
								className="technology-list"
								aria-label={t(`${project.id}.category`)}
							>
								{project.technologies.map((technology) => (
									<li key={technology}>{technology}</li>
								))}
							</ul>
							<div className="project-links">
								<a className="text-link" href={project.source}>
									{t("source")}
									<span className="sr-only">: {project.name}</span>
									<Arrow diagonal />
								</a>
								{"demo" in project && (
									<a className="text-link" href={project.demo}>
										{t("live")}
										<Arrow diagonal />
									</a>
								)}
							</div>
						</div>
					</div>
				</article>
			))}
		</div>
	);
}
