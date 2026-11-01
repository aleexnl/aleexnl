import { getTranslations } from "next-intl/server";
import { connectItems } from "../data/static-data";
import { Arrow } from "./Arrow";

export async function Contact() {
	const t = await getTranslations("portfolio");
	return (
		<>
			<section
				className="contact-section section-space"
				id="contact"
				aria-labelledby="contact-heading"
			>
				<div className="shell">
					<p className="section-kicker">{t("nav.contact")}</p>
					<h2 id="contact-heading">{t("contact.title")}</h2>
					<div className="contact-bottom">
						<p>{t("contact.intro")}</p>
						<div className="contact-links">
							{connectItems.map((item) => (
								<a className="contact-link" key={item.name} href={item.href}>
									<span>
										{item.name === "Email" ? t("contact.email") : item.name}
									</span>
									<Arrow diagonal />
								</a>
							))}
						</div>
					</div>
				</div>
			</section>
			<footer className="shell site-footer" role="contentinfo">
				<p>© {new Date().getFullYear()} Alejandro Nieto Luque</p>
				<span>{t("contact.footer")}</span>
				<a className="text-link" href="#top">
					{t("contact.back")}
					<Arrow diagonal />
				</a>
			</footer>
		</>
	);
}
