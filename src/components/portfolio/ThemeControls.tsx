import { useState } from "react";
import { heroLayouts, palettes, useTheme } from "@/lib/theme";

export function ThemeControls() {
  const [open, setOpen] = useState(false);
  const { palette, fontScale, heroLayout, setTheme, reset } = useTheme();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-[17.5rem] rounded-2xl border border-border bg-card/95 p-5 shadow-2xl backdrop-blur">
          <p className="font-display text-xs uppercase tracking-[0.22em] text-glow">Theme</p>

          <fieldset className="mt-4">
            <legend className="text-xs font-medium text-muted-foreground">Colors</legend>
            <div className="mt-2 grid grid-cols-1 gap-1.5">
              {palettes.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setTheme({ palette: p.id })}
                  aria-pressed={palette === p.id}
                  className={`flex items-center gap-2.5 rounded-lg border px-2.5 py-2 text-left text-sm transition ${
                    palette === p.id
                      ? "border-glow text-foreground"
                      : "border-border text-muted-foreground hover:border-glow/60"
                  }`}
                >
                  <span
                    aria-hidden
                    data-palette={p.id}
                    className="h-4 w-4 shrink-0 rounded-full bg-primary ring-1 ring-border"
                  />
                  {p.label}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-4">
            <label
              htmlFor="font-scale"
              className="flex items-center justify-between text-xs font-medium text-muted-foreground"
            >
              Font scale
              <span className="text-foreground">{fontScale.toFixed(2)}×</span>
            </label>
            <input
              id="font-scale"
              type="range"
              min={0.85}
              max={1.25}
              step={0.05}
              value={fontScale}
              onChange={(e) => setTheme({ fontScale: Number(e.target.value) })}
              className="mt-2 w-full accent-[var(--color-primary)]"
            />
          </div>

          <fieldset className="mt-4">
            <legend className="text-xs font-medium text-muted-foreground">Hero layout</legend>
            <div className="mt-2 flex gap-1.5">
              {heroLayouts.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setTheme({ heroLayout: l.id })}
                  aria-pressed={heroLayout === l.id}
                  className={`flex-1 rounded-lg border px-2 py-2 text-xs transition ${
                    heroLayout === l.id
                      ? "border-glow text-foreground"
                      : "border-border text-muted-foreground hover:border-glow/60"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </fieldset>

          <button
            type="button"
            onClick={reset}
            className="mt-5 w-full rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground transition hover:border-glow hover:text-glow"
          >
            Reset to defaults
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-[0_10px_40px_-12px_var(--color-primary)] transition hover:bg-glow"
      >
        {open ? "Close" : "Theme"}
      </button>
    </div>
  );
}