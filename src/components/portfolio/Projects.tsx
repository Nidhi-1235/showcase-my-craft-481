import { useSuspenseQuery } from "@tanstack/react-query";
import { getRepos } from "@/lib/github.functions";
import { profile } from "@/data/resume";

export const reposQueryOptions = {
  queryKey: ["github-repos"],
  queryFn: () => getRepos(),
  staleTime: 10 * 60_000,
};

export function Projects() {
  const { data } = useSuspenseQuery(reposQueryOptions);

  if (data.error || data.repos.length === 0) {
    return (
      <p className="text-muted-foreground">
        {data.error ?? "No public repositories to show yet."} You can browse everything on{" "}
        <a href={profile.github} target="_blank" rel="noreferrer" className="text-glow underline">
          github.com/{profile.githubUser}
        </a>
        .
      </p>
    );
  }

  return (
    <>
      <ul className="grid gap-5 md:grid-cols-2">
        {data.repos.map((repo) => (
          <li
            key={repo.id}
            className="group relative rounded-2xl border border-border bg-card/70 p-6 transition hover:border-glow/70 hover:bg-card"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-lg font-semibold text-foreground">
                <a href={repo.url} target="_blank" rel="noreferrer" className="hover:text-glow">
                  {repo.name.replace(/[-_]/g, " ")}
                </a>
              </h3>
              {repo.stars > 0 && (
                <span className="shrink-0 rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
                  ★ {repo.stars}
                </span>
              )}
            </div>
            <p className="mt-3 min-h-12 text-sm leading-relaxed text-muted-foreground">
              {repo.description ?? "No description provided."}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {repo.language && (
                <span className="rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">
                  {repo.language}
                </span>
              )}
              {repo.topics.slice(0, 3).map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                >
                  {topic}
                </span>
              ))}
              {repo.homepage && (
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-auto text-xs font-medium text-glow hover:underline"
                >
                  Live demo →
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
      <a
        href={profile.github}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-block text-sm font-medium text-glow hover:underline"
      >
        View all repositories on GitHub →
      </a>
    </>
  );
}