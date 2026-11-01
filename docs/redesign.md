# Portfolio redesign

## Gate 1: audit and direction

Preserve App Router, next-intl (en/es/ca, default unprefixed English), validated
career/education/language data, GitHub cache tag and revalidation endpoint,
security headers, analytics, Yarn and existing quality tools.

Replace the narrow résumé layout, API-ordered miniature cards, collapsed career
details and low-contrast labels. No project screenshots or test suites existed.
Installed dependencies were stale; synchronize with `yarn install --immutable`.

Direction: an engineering studio, with large Manrope typography, cool neutral
surfaces, ink text and restrained blue. Wide project compositions contrast with
readable career chapters. Mobile gets a single-column composition and a compact
disclosure navigation. Both OS color schemes are first-class.

Tokens: paper #f5f6f8, surface #ffffff, ink #192127, secondary #59636f,
line #d9dee4, accent #244bd6. Dark equivalents live in globals.css.
Typography: one next/font variable family; fluid display and section sizes;
body measure capped at 66ch. Layout: 1240px maximum, responsive 20–64px gutters.
Motion: one short hero sequence, interactive transforms, optional native scroll
timeline enhancement. Core content remains visible without JavaScript. Reduced
motion disables animation, transitions and smooth scrolling.

Implementation gates:
1. Audit and direction (complete).
2. Hero, navigation and first project; browser desktop/mobile review.
3. Remaining projects, career, expertise, about, education, languages, contact.
4. Independent quality and SEO/performance reviews, production browser tests.
5. Integrate fixes and repeat necessary production checks.

## Content provenance

Career, education, language proficiency and contact details retain the existing
locale files. New capabilities reflect existing responsibilities, not inferred
expertise. Swift/iOS stays an area of learning, as established in README.md.

Featured projects are explicitly ordered in src/data/projects.ts. Technical
descriptions were checked against public READMEs on 2026-11-01:
- https://github.com/aleexnl/aleexnl-library-management
- https://github.com/aleexnl/android-autoclicker
- https://github.com/aleexnl/aleexnl

Project artwork is a labeled architectural/typographic illustration, not a
product screenshot. Missing assets: approved real-device/desktop screenshots,
verified outcomes, and contribution/role detail for deeper case studies. No thin
case-study routes are added.

## Baseline

Production https://aleexnl.com/es, browser run 2026-11-01:
- Mobile Lighthouse: accessibility 100, best practices 100, SEO 100.
- Unthrottled cold-cache desktop trace: LCP 694ms, CLS 0.00.
- No field CrUX data was available; INP and performance score not measured.

These are lab observations. A localhost trace is not directly comparable with
deployed network delivery. Final results and limitations belong below after QA.
