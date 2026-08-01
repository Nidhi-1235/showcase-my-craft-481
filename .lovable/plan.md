## Portfolio for Nidhi N

A single-page, dark "Midnight Indigo" portfolio at `/`, built from your résumé details, with your photo in the hero and your GitHub repositories pulled in live.

### Design direction
- Palette: deep navy/indigo background (#0a0a1a → #141432) with electric indigo (#4f46e5) accents, defined as semantic tokens in `src/styles.css`.
- Type: Space Grotesk headings + DM Sans body, loaded via a font `<link>` in the root route.
- Subtle glow/gradient accents, restrained scroll-in motion, no purple-on-white generic look.

### Sections
1. **Hero** — your uploaded photo (portrait, framed with a soft indigo glow), name "Nidhi N", title "AI & Full-Stack Developer | Data Science Enthusiast", short summary line, and buttons for email / LinkedIn / GitHub.
2. **About** — full professional summary.
3. **Skills** — grouped chips: Core Languages, Web & Full-Stack, Developer Tools, Methodologies.
4. **Projects** — live cards from `github.com/Nidhi-1235`: repo name, description, primary language, stars, topics, links to repo and homepage. Sorted by recent activity, forks excluded.
5. **Experience & Achievements** — the four hackathon/pitch items (AI healthcare solution, SOLVE-A-THON 1.0, ISTE Startup Pitch, CODE MANTHAN'25).
6. **Certifications** — Elewayt Data Science, Power BI, Deloitte Forage (Data Analytics + GenAI), Infosys Springboard.
7. **Education** — timeline: VCET Puttur B.E. CSE (Data Science) 2023–2027, CGPA 8.13; PUC 2023, 79.17%; SSLC 2021, 79.16%.
8. **Contact / Footer** — Puttur, Karnataka; phone 9148630047; nidhinatesh0047@gmail.com; LinkedIn; GitHub.

### Technical notes
- Photo uploaded via the Lovable assets CLI and imported as an asset pointer (no binary in the repo).
- GitHub repos fetched through a TanStack `createServerFn` calling the public GitHub REST API (`/users/Nidhi-1235/repos`) — no token needed, cached via TanStack Query so it stays fast and rate-limit friendly. If the API is unavailable, the section falls back to a graceful message rather than blank space.
- SEO: single H1, unique title/description/og/twitter meta on the index route, alt text on the photo, semantic sections.
- Fully responsive; mobile-first spacing.

### Please confirm two details
- Your LinkedIn shows as `linkedin.com/in/nidhin` on the résumé — I'll use that as-is unless you correct it.
- Phone number will be publicly visible; tell me if you'd rather leave it off.
