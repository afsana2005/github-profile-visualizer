import { useMemo } from "react";
import { GitHubCalendar } from "react-github-calendar";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FaCodeBranch, FaStar, FaTrophy, FaBookOpen } from "react-icons/fa";
import { useThemeContext } from "../../context/ThemeContext";

const CHART_COLORS = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ec4899", "#64748b"];

function Metric({ label, value, icon, tone }) {
  return (
    <div className="analytics-metric surface-card rounded-2xl p-4 sm:p-5">
      <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-lg dark:bg-white/10 ${tone}`}>{icon}</div>
      <p className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">{typeof value === "number" ? value.toLocaleString() : value}</p>
      <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  );
}

function Panel({ title, eyebrow, children, className = "" }) {
  return (
    <section className={`surface-card min-w-0 rounded-2xl p-5 sm:p-6 ${className}`}>
      <p className="section-kicker">{eyebrow}</p>
      <h3 className="mt-1 text-lg font-extrabold text-slate-900 dark:text-white sm:text-xl">{title}</h3>
      {children}
    </section>
  );
}

export default function DeveloperAnalytics({ user, repos = [] }) {
  const { darkMode } = useThemeContext();
  const analytics = useMemo(() => {
    const stars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
    const forks = repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0);
    const languages = Object.entries(
      repos.reduce((counts, repo) => {
        if (repo.language) counts[repo.language] = (counts[repo.language] || 0) + 1;
        return counts;
      }, {})
    )
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    const monthlyActivity = Array.from({ length: 6 }, (_, index) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (5 - index), 1);
      const month = date.toLocaleString("en", { month: "short" });
      const count = repos.filter((repo) => {
        if (!repo.pushed_at) return false;
        const pushed = new Date(repo.pushed_at);
        return pushed.getMonth() === date.getMonth() && pushed.getFullYear() === date.getFullYear();
      }).length;
      return { month, repositories: count };
    });

    const topRepos = [...repos]
      .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
      .slice(0, 5);

    // This is an illustrative score based on public profile metrics, not an official GitHub rating.
    const score = Math.min(
      100,
      Math.round(
        Math.min(stars / 10, 35) +
        Math.min((user?.public_repos || 0) * 1.25, 25) +
        Math.min((user?.followers || 0) / 5, 20) +
        Math.min(forks / 5, 20)
      )
    );

    return { stars, forks, languages, monthlyActivity, topRepos, score };
  }, [repos, user]);

  if (!user) return null;

  return (
    <section className="mx-auto max-w-6xl px-5 pb-12 sm:px-8">
      <div className="mb-6">
        <p className="section-kicker">BEYOND THE PROFILE</p>
        <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">Developer analytics</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
          A closer look at @{user.login}'s public repositories, language choices and GitHub activity.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Metric label="Stars across loaded repos" value={analytics.stars} icon={<FaStar />} tone="text-amber-500" />
        <Metric label="Forks across loaded repos" value={analytics.forks} icon={<FaCodeBranch />} tone="text-emerald-500" />
        <Metric label="Languages used" value={analytics.languages.length} icon={<FaBookOpen />} tone="text-violet-500" />
        <Metric label="Developer score" value={`${analytics.score}/100`} icon={<FaTrophy />} tone="text-blue-500" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Panel title="Programming language mix" eyebrow="LANGUAGES">
          {analytics.languages.length ? (
            <div className="mt-4 grid items-center gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(120px,.8fr)]">
              <div className="h-56 min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={analytics.languages.slice(0, 7)} dataKey="count" nameKey="name" innerRadius={55} outerRadius={88} paddingAngle={3}>
                      {analytics.languages.slice(0, 7).map((entry, index) => <Cell key={entry.name} fill={CHART_COLORS[index % CHART_COLORS.length]} />)}
                    </Pie>
                    <Tooltip formatter={(value, name) => [`${value} repositories`, name]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {analytics.languages.slice(0, 7).map((language, index) => (
                  <div key={language.name} className="flex items-center justify-between gap-3 text-sm">
                    <span className="flex min-w-0 items-center gap-2 text-slate-600 dark:text-slate-300"><span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }} /> <span className="truncate">{language.name}</span></span>
                    <span className="font-bold text-slate-900 dark:text-white">{language.count}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : <p className="py-14 text-center text-sm text-slate-500">No language data is available in the loaded repositories.</p>}
          <p className="mt-2 text-xs text-slate-400">Counts represent repositories, not lines of code.</p>
        </Panel>

        <Panel title="Recently pushed repositories" eyebrow="RECENT ACTIVITY">
          <div className="mt-5 h-56 min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.monthlyActivity} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,.2)" />
                <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: "rgba(59,130,246,.08)" }} />
                <Bar dataKey="repositories" name="Repositories pushed" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-xs text-slate-400">Counts loaded repositories with a push date in each month.</p>
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.3fr_.7fr]">
        <Panel title="Contribution calendar" eyebrow="CONSISTENCY">
          <div className="calendar-wrap mt-5 overflow-x-auto pb-2">
            <GitHubCalendar
              username={user.login}
              colorScheme={darkMode ? "dark" : "light"}
              blockSize={11}
              blockMargin={4}
              fontSize={11}
              labels={{ totalCount: "{{count}} contributions in the last year" }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-400">Contribution data is provided by the calendar service and may take a moment to load.</p>
        </Panel>

        <Panel title="Top repositories" eyebrow="MOST STARRED">
          {analytics.topRepos.length ? (
            <div className="mt-4 space-y-3">
              {analytics.topRepos.map((repo, index) => (
                <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 rounded-xl border border-slate-200/80 p-3 transition hover:border-blue-400 hover:bg-blue-500/5 dark:border-white/10">
                  <span className="flex min-w-0 items-center gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-xs font-black text-blue-500">{index + 1}</span><span className="truncate text-sm font-bold text-slate-800 dark:text-slate-100">{repo.name}</span></span>
                  <span className="shrink-0 text-xs font-bold text-amber-500">★ {repo.stargazers_count}</span>
                </a>
              ))}
            </div>
          ) : <p className="py-10 text-sm text-slate-500">No public repositories found.</p>}
        </Panel>
      </div>

      <p className="mt-4 rounded-xl border border-blue-500/15 bg-blue-500/5 px-4 py-3 text-xs leading-5 text-slate-500 dark:text-slate-400">
        <strong className="text-slate-700 dark:text-slate-200">About the developer score:</strong> This is an illustrative score calculated from public repository, star, fork and follower counts. It is not an official GitHub score and should not be treated as a measure of a developer's skill.
      </p>
    </section>
  );
}
