import { getTranslations } from "next-intl/server";

export async function Expertise() {
	const t = await getTranslations("portfolio.expertise");
	return (
		<section
			className="expertise-section section-space"
			aria-labelledby="expertise-heading"
		>
			<div className="shell expertise-layout">
				<div className="expertise-intro">
					<h2 id="expertise-heading">{t("title")}</h2>
					<p>{t("intro")}</p>
				</div>
				<div className="expertise-list">
					{["mobile", "backend", "web", "delivery"].map((area) => (
						<article className="expertise-area" key={area}>
							<h3>{t(`${area}.title`)}</h3>
							<p>{t(`${area}.text`)}</p>
							<span>{t(`${area}.tools`)}</span>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
