import { createServerFn } from "@tanstack/react-start";

export type Repo = {
  id: number;
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  topics: string[];
  updatedAt: string;
};

export type ReposResult = { repos: Repo[]; error: string | null };

export const getRepos = createServerFn({ method: "GET" }).handler(
  async (): Promise<ReposResult> => {
    try {
      const res = await fetch(
        "https://api.github.com/users/Nidhi-1235/repos?per_page=100&sort=pushed",
        { headers: { Accept: "application/vnd.github+json", "User-Agent": "portfolio" } },
      );
      if (!res.ok) {
        console.error(`GitHub request failed [${res.status}]: ${await res.text()}`);
        return { repos: [], error: "GitHub is temporarily unavailable." };
      }
      const raw = (await res.json()) as Array<Record<string, unknown>>;
      const repos = raw
        .filter((r) => !r["fork"] && !r["archived"])
        .map((r) => ({
          id: Number(r["id"]),
          name: String(r["name"]),
          description: (r["description"] as string | null) ?? null,
          url: String(r["html_url"]),
          homepage: (r["homepage"] as string | null) || null,
          language: (r["language"] as string | null) ?? null,
          stars: Number(r["stargazers_count"] ?? 0),
          topics: Array.isArray(r["topics"]) ? (r["topics"] as string[]) : [],
          updatedAt: String(r["pushed_at"] ?? ""),
        }))
        .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
      return { repos, error: null };
    } catch (err) {
      console.error("GitHub fetch threw", err);
      return { repos: [], error: "Could not reach GitHub right now." };
    }
  },
);