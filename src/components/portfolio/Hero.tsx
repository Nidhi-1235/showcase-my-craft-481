import portrait from "@/assets/nidhi-portrait.jpg.asset.json";
import { profile } from "@/data/resume";

export function Hero() {
  return (
    <header className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-glow/20 blur-[110px]"
      />
      <div className="section-shell relative grid items-center gap-14 py-24 md:grid-cols-[1.15fr_0.85fr] md:py-32">
        <div className="rise">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-glow">
            {profile.location}
          </p>
          <h1 className="mt-5 text-5xl font-bold leading-[1.05] md:text-7xl">
            <span className="text-gradient">{profile.name}</span>
          </h1>
          <p className="mt-5 font-display text-lg text-foreground/90 md:text-xl">{profile.title}</p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            Building full-stack web applications and AI-powered solutions for complex, real-world
            problems.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_10px_40px_-12px_var(--color-primary)] transition hover:bg-glow"
            >
              Get in touch
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition hover:border-glow hover:text-glow"
            >
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition hover:border-glow hover:text-glow"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div
            aria-hidden
            className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/45 via-glow/20 to-transparent blur-2xl"
          />
          <img
            src={portrait.url}
            alt="Portrait of Nidhi N"
            width={1016}
            height={1536}
            className="relative aspect-[4/5] w-full rounded-[1.75rem] border border-border/80 object-cover object-top shadow-2xl"
          />
        </div>
      </div>
    </header>
  );
}