import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const palettes = [
  { id: "midnight", label: "Midnight Indigo" },
  { id: "emerald", label: "Deep Emerald" },
  { id: "sunset", label: "Sunset Amber" },
  { id: "rose", label: "Rose Noir" },
  { id: "daylight", label: "Daylight" },
] as const;

export const heroLayouts = [
  { id: "split", label: "Split" },
  { id: "centered", label: "Centered" },
  { id: "spotlight", label: "Spotlight" },
] as const;

export type PaletteId = (typeof palettes)[number]["id"];
export type HeroLayoutId = (typeof heroLayouts)[number]["id"];

export type ThemeState = {
  palette: PaletteId;
  fontScale: number;
  heroLayout: HeroLayoutId;
};

const DEFAULTS: ThemeState = {
  palette: "midnight",
  fontScale: 1,
  heroLayout: "split",
};

const STORAGE_KEY = "portfolio-theme";

type ThemeContextValue = ThemeState & {
  setTheme: (patch: Partial<ThemeState>) => void;
  reset: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeState>(DEFAULTS);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setThemeState({ ...DEFAULTS, ...(JSON.parse(raw) as Partial<ThemeState>) });
    } catch {
      /* ignore malformed storage */
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset["palette"] = theme.palette;
    root.style.setProperty("--font-scale", String(theme.fontScale));
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
    } catch {
      /* storage unavailable */
    }
  }, [theme]);

  const setTheme = useCallback((patch: Partial<ThemeState>) => {
    setThemeState((prev) => ({ ...prev, ...patch }));
  }, []);

  const reset = useCallback(() => setThemeState(DEFAULTS), []);

  const value = useMemo(() => ({ ...theme, setTheme, reset }), [theme, setTheme, reset]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}