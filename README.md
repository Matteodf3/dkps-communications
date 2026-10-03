# DKPS Communications website

[Visit the live website](https://dkps-communications.netlify.app/?lang=it).

A bilingual corporate-site foundation for DKPS Communications, built with React, TypeScript, Vite and React Router. The content architecture follows the breadth of the [current DKPS site](https://dkpscommunications.com/) without reusing its visual design.

## Run

```sh
npm install
npm run dev
```

`npm run build` checks TypeScript and produces the production bundle. Routes use browser history; a deployed static host must serve `index.html` for unknown application paths.

Italian and English are available from the header switch. The choice is saved in the browser and included in internal links as `?lang=it` or `?lang=en`, so individual pages can be shared in either language. The HTML language, page title and description update with the selected language.

The homepage introduces the four system layers with a one-time path animation as they enter view. Hero and inner-page introductions use short entrance transitions. All of these respect `prefers-reduced-motion`; there is no continuous background animation.

## Site map

| Route | Purpose |
| --- | --- |
| `/` | Company and system overview |
| `/system` | Four-part architecture and communication structure |
| `/platform` | PTT platform, dispatch and available functions |
| `/devices` | Professional radio showcase and device categories |
| `/connectivity` | Cellular and international connectivity planning |
| `/industries` | Operating environments |
| `/solutions` | Single-site, multi-site, international, remote and event scenarios |
| `/plans` | Commercial scope and existing DKPS plan names |
| `/about` | DKPS approach and delivery process |
| `/contact` | Four-part operational brief with a live communication sketch |

The header covers the main exploration paths; the footer exposes every page. On mobile the menu is keyboard accessible and closes after navigation. Unknown paths show a site-level 404 screen.

## Content boundaries

The current site was inspected on 29 September 2026. Its navigation and sections cover platform, architecture, features, industries, solutions, plans, coverage, about and contact. This implementation retains those topics and adds explicit device and connectivity pages because they are central parts of the DKPS system. It also includes mountain operations and field maintenance as potential applications from the project brief, without presenting them as customer deployments.

The existing site makes specific claims about country coverage, deployment time, plan limits, reliability, encryption, pricing and past sector deployments. These are **not repeated as verified facts** here. Platform features are described as configuration-dependent. The named DKPS Connect, DKPS Connect + and DKPS Core levels come from the existing site; the new page presents them as scoping starting points, without fixed prices or technical entitlements.

The operational brief is submitted through Netlify Forms on the hosted site. A static form blueprint in `index.html` is required for Netlify's build-time detection; the React form posts the same field names. Local development and the older preview host open a reviewable `mailto:` draft because they do not process Netlify Forms. Submissions appear in the Netlify dashboard. The hosted project currently has an email notification for new form submissions to `info@dkpscommunications.com`; this setting lives in Netlify and is not tracked in this repository. The footer links to the current DKPS privacy policy until a reviewed policy is provided for this site.

The primary navigation is Home, Solutions, Products, Industries, About and the brief CTA. Deep pages for system architecture, platform, connectivity and project scope remain available through contextual links and the footer. DKPS Connect links to the external client area at `https://dkpsconnect.com` in the header and footer; it is separate from enquiries.

## Images

- The DKPS logo is from the current DKPS website.
- The [warehouse operation photograph](https://www.pexels.com/photo/industrial-warehouse-with-forklifts-in-action-36696522/) and [warehouse aisle photograph](https://www.pexels.com/photo/modern-warehouse-operations-with-employees-and-forklift-30824313/) are illustrative and do not depict DKPS customers.
- The brief also uses illustrative Pexels photography for [hotel operations](https://www.pexels.com/photo/housekeepers-changing-sheets-in-hotel-room-9462740/), [security operations](https://www.pexels.com/photo/security-officer-in-dark-control-room-with-monitors-30692441/) and [construction](https://www.pexels.com/photo/construction-workers-on-the-building-site-10202865/). These images do not depict DKPS clients.
- The Motorola TLK 110 and Hytera PNC360S cutouts are manufacturer photographs used as examples. The existing DKPS website mentions the manufacturer ranges but does not confirm these exact models as current catalogue items. Confirm model selection and image rights before publication.

The earlier three-hero comparison remains isolated at `/hero-prototypes.html` in the development server. It is not imported into the corporate-site bundle. The site foundation currently uses the operational context and equipment emphasis from the first two directions; it does not use the third system-visual hero.
