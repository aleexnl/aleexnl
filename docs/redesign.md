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

## Gates 2–5: implementation and verification

Gate 2: actual desktop (1440px) and mobile (390px) screenshots of hero, navigation
and first project reviewed before extending the design. Gate 3: three editorial
projects, visible career, grouped expertise, about, education, languages and
contact completed. Manrope replaces Roboto through next/font. No runtime
package was added or removed.

Gate 4 independent SEO/performance and accessibility reviews led to fixes for
cookie-sensitive English switching, contact focus contrast, menu focus order,
JSON-LD escaping, contentinfo landmark and locale-stable social artwork.
Production tests exposed inherited loading boundaries hiding content without
JavaScript; both redundant boundaries were removed. A noscript navigation is
provided. Translated 404s now remain inside the locale shell.

The global translation provider was removed. The client error boundary imports
only its tiny error dictionary. Vercel telemetry is retained on Vercel deployments
(VERCEL=1), and omitted on local/non-Vercel servers without collection endpoints.

Gate 5 checks, production Next 16.4.2 / React 19.3.1:
- Immutable Yarn install passed; lockfile unchanged.
- Biome check and strict TypeScript check passed.
- Vitest: 19 tests passed.
- Production build passed; all three homepage locales are SSG, social image static.
- Playwright: 26 tests passed across desktop/mobile Chromium.

Browser coverage includes locales, cookie-sensitive language switching, menu and
keyboard focus, reduced motion, no-JavaScript content, dark mode, overflow at
320/390/768/1440px, metadata/JSON-LD, social PNG dimensions and revalidation,
sitemap/robots and translated 404s. No final homepage runtime/hydration errors.
Light/dark desktop/mobile screenshots and social artwork were saved and visually
inspected in artifacts/ (ignored by Git).

### Measured results

Lighthouse 13.6.0 mobile performance on the localhost production build, simulated
4x CPU slowdown and mobile network, 412x823 viewport:
- Performance: **99**.
- LCP: **752ms**; total blocking time: **124ms**; CLS: **0.000**.
- Report: artifacts/lighthouse-mobile-final.json.

Separate browser mobile Lighthouse: accessibility **100**, best practices **100**,
SEO **92**. Its sole SEO failure is canonical/hreflang origin mismatch between
localhost and production URLs. Metadata and language relationships pass targeted
browser assertions. A deployed-domain Lighthouse SEO run remains required;
do not report SEO 100 for this local redesign audit. These scores exclude local
Vercel telemetry and are lab measurements, not field results or WCAG certification.

Decoded resource sizes in the same browser/local production setup, Spanish:

| Resource   |      Baseline |         Final |
| ---------- | ------------: | ------------: |
| HTML       |  80,203 bytes |  58,368 bytes |
| JavaScript | 508,045 bytes | 464,303 bytes |
| Fonts      |  37,520 bytes |  24,436 bytes |

These are decoded body sizes, not compressed transfer sizes. The baseline rendered
dynamically; final homepages are prerendered. Deployed baseline LCP (694ms) and
final localhost LCP (99ms) have different delivery conditions and must not be
presented as a speed improvement. INP and field Core Web Vitals remain unmeasured.

### Remaining content and environment limits

Approved project screenshots, verified outcomes and fuller contribution details
are needed before deeper case studies. Artwork is explicitly labeled as diagrams
or identity studies; no product screenshots or results were invented.

Automated coverage uses Chromium; Safari/Firefox and real-device checks remain
follow-up validation. Existing Vite configuration emits a future-loader warning;
tests pass and no unrelated tooling migration was introduced.

This branch has not been pushed or deployed.
