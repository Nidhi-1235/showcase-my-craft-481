import portraitCutout from "@/assets/nidhi-portrait-cutout.png";
import { profile } from "@/data/resume";
import { useTheme } from "@/lib/theme";

export function Hero() {
  const { heroLayout, spin } = useTheme();
  const centered = heroLayout === "centered";
  const spotlight = heroLayout === "spotlight";

  const photo = (
    <div
      className={
        centered
          ? "relative mx-auto w-full max-w-md"
          : spotlight
            ? "relative mx-auto w-full max-w-lg"
            : "relative mx-auto w-full max-w-sm"
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[110px]"
      />
      <img
        src={portraitCutout}
        alt={`Portrait of ${profile.name}`}
        width={854}
        height={1280}
        className={`spin-stage relative w-full bg-transparent object-contain drop-shadow-[0_25px_60px_color-mix(in_oklab,var(--color-primary)_45%,transparent)] ${
          spin ? "spin-360" : ""
        }`}
      />
    </div>
  );

  const copy = (
    <div className={`rise ${centered ? "text-center" : ""}`}>
      <p className="font-display text-xs uppercase tracking-[0.3em] text-glow">{profile.location}</p>
      <h1 className="mt-5 text-5xl font-bold leading-[1.05] md:text-7xl">
        <span className="text-gradient">{profile.name}</span>
      </h1>
      <p className="mt-5 font-display text-lg text-foreground/90 md:text-xl">{profile.title}</p>
      <p
        className={`mt-6 max-w-xl text-base leading-relaxed text-muted-foreground ${
          centered ? "mx-auto" : ""
        }`}
      >
        Building full-stack web applications and AI-powered solutions for complex, real-world
        problems.
      </p>
      <div className={`mt-9 flex flex-wrap gap-3 ${centered ? "justify-center" : ""}`}>
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
  );

  return (
    <header className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-glow/20 blur-[110px]"
      />

      {centered ? (
        <div className="section-shell relative flex min-h-screen flex-col items-center justify-center gap-10 py-20">
          {photo}
          {copy}
        </div>
      ) : spotlight ? (
        <div className="section-shell relative flex min-h-screen flex-col items-center justify-center py-20">
          <div className="relative w-full">
            <div className="mx-auto max-w-2xl">{photo}</div>
            <div className="mt-[-3rem] text-center">{copy}</div>
          </div>
        </div>
      ) : (
        <div className="section-shell relative grid min-h-screen items-center gap-14 py-20 md:grid-cols-[1.15fr_0.85fr]">
          {copy}
          {photo}
        </div>
      )}
    </header>
  );
}