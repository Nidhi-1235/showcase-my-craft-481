import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-t border-border/60 py-20 md:py-28">
      <div className="section-shell">
        <p className="font-display text-xs uppercase tracking-[0.28em] text-glow">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold text-foreground md:text-4xl">{title}</h2>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}