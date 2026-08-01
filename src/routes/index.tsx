import { Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { Hero } from "@/components/portfolio/Hero";
import { Section } from "@/components/portfolio/Section";
import { Projects, reposQueryOptions } from "@/components/portfolio/Projects";
import { ThemeControls } from "@/components/portfolio/ThemeControls";
import { ThemeProvider } from "@/lib/theme";
import { achievements, certifications, education, profile, skillGroups } from "@/data/resume";

const TITLE = "Nidhi N — AI & Full-Stack Developer Portfolio";
const DESCRIPTION =
  "Portfolio of Nidhi N: AI & full-stack developer, Computer Science (Data Science) undergraduate. Projects, skills, hackathon wins and certifications.";

export const Route = createFileRoute("/")({
  loader: ({ context }) => {
    context.queryClient.prefetchQuery(reposQueryOptions);
  },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: profile.title,
          email: `mailto:${profile.email}`,
          address: profile.location,
          sameAs: [profile.github, profile.linkedin],
        }),
      },
    ],
  }),
  component: Index,
  errorComponent: ({ error }) => (
    <div role="alert" className="section-shell py-24 text-muted-foreground">
      {error.message}
    </div>
  ),
});

function Index() {
  return (
    <ThemeProvider>
    <main className="min-h-screen bg-background">
      <Hero />
      <ThemeControls />

      <Section id="about" eyebrow="About" title="A developer who ships end to end">
        <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">{profile.summary}</p>
      </Section>

      <Section id="skills" eyebrow="Skills" title="Tools I build with">
        <div className="grid gap-8 md:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.label} className="rounded-2xl border border-border bg-card/60 p-6">
              <h3 className="font-display text-sm uppercase tracking-[0.16em] text-glow">
                {group.label}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-secondary px-3 py-1.5 text-sm text-secondary-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="projects" eyebrow="Projects" title="Live from my GitHub">
        <Suspense
          fallback={
            <div className="grid gap-5 md:grid-cols-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-40 animate-pulse rounded-2xl border border-border bg-card/50" />
              ))}
            </div>
          }
        >
          <Projects />
        </Suspense>
      </Section>

      <Section id="achievements" eyebrow="Experience" title="Hackathons & pitch stages">
        <ol className="relative space-y-8 border-l border-border pl-6">
          {achievements.map((item) => (
            <li key={item.title} className="relative">
              <span
                aria-hidden
                className="absolute -left-[1.9rem] top-2 h-2.5 w-2.5 rounded-full bg-glow"
              />
              <h3 className="font-display text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-1 text-sm text-glow">{item.context}</p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {item.detail}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="certifications" eyebrow="Certifications" title="Continuous learning">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <li
              key={cert.name}
              className="rounded-2xl border border-border bg-card/60 p-5 transition hover:border-glow/70"
            >
              <p className="font-display font-semibold text-foreground">{cert.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{cert.issuer}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="education" eyebrow="Education" title="Academic background">
        <div className="space-y-4">
          {education.map((entry) => (
            <div
              key={entry.school}
              className="flex flex-col gap-2 rounded-2xl border border-border bg-card/60 p-6 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="font-display font-semibold text-foreground">{entry.qualification}</p>
                <p className="mt-1 text-sm text-muted-foreground">{entry.school}</p>
              </div>
              <div className="md:text-right">
                <p className="text-sm text-glow">{entry.period}</p>
                <p className="text-sm text-muted-foreground">{entry.score}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <footer id="contact" className="border-t border-border/60 py-20">
        <div className="section-shell">
          <p className="font-display text-xs uppercase tracking-[0.28em] text-glow">Contact</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold md:text-4xl">
            Open to AI & full-stack engineering roles and internships.
          </h2>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <a href={`mailto:${profile.email}`} className="hover:text-glow">
              {profile.email}
            </a>
            <a href={`tel:${profile.phone}`} className="hover:text-glow">
              +91 {profile.phone}
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-glow">
              LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-glow">
              GitHub
            </a>
            <span>{profile.location}</span>
          </div>
          <p className="mt-12 text-xs text-muted-foreground/70">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </footer>
    </main>
    </ThemeProvider>
  );
}
