import { useMemo, useState } from "react";
import { FaUsers, FaBook, FaUserFriends, FaStar, FaCodeBranch, FaTrophy } from "react-icons/fa";
import { getGithubUser, getGithubRepos } from "../services/githubApi";

function number(value) { return Number(value || 0).toLocaleString(); }

export default function Compare() {
  const [names, setNames] = useState(["", ""]);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function compare(event) {
    event.preventDefault();
    const first = names[0].trim();
    const second = names[1].trim();
    if (!first || !second) { setError("Enter two GitHub usernames to compare."); return; }
    if (first.toLowerCase() === second.toLowerCase()) { setError("Please enter two different usernames."); return; }
    setLoading(true); setError(""); setProfiles([]);
    try {
      const results = await Promise.all([first, second].map(async (login) => {
        const [user, repos] = await Promise.all([getGithubUser(login), getGithubRepos(login)]);
        return { user, repos };
      }));
      setProfiles(results);
    } catch (err) { setError(err.message || "Unable to compare these profiles."); }
    finally { setLoading(false); }
  }

  const summaries = useMemo(() => profiles.map(({ user, repos }) => ({
    stars: repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0),
    forks: repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0),
    languages: [...new Set(repos.map((repo) => repo.language).filter(Boolean))].sort(),
    topRepo: [...repos].sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))[0],
    user,
  })), [profiles]);

  const metrics = [
    { label: "Followers", key: "followers", icon: <FaUsers />, kind: "user" },
    { label: "Following", key: "following", icon: <FaUserFriends />, kind: "user" },
    { label: "Public repositories", key: "public_repos", icon: <FaBook />, kind: "user" },
    { label: "Stars (loaded repos)", key: "stars", icon: <FaStar />, kind: "summary" },
    { label: "Forks (loaded repos)", key: "forks", icon: <FaCodeBranch />, kind: "summary" },
  ];
  const winner = (metric) => {
    if (summaries.length !== 2) return -1;
    const values = summaries.map((item) => metric.kind === "user" ? Number(item.user[metric.key] || 0) : Number(item[metric.key] || 0));
    return values[0] === values[1] ? -1 : values[0] > values[1] ? 0 : 1;
  };

  return <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
    <p className="section-kicker text-center">SIDE-BY-SIDE INSIGHTS</p><h1 className="page-title">Advanced developer comparison</h1><p className="page-subtitle">Compare profile reach, repository impact, languages and standout projects.</p>
    <form onSubmit={compare} className="surface-card mx-auto mt-9 grid max-w-4xl gap-3 rounded-2xl p-5 sm:grid-cols-[1fr_auto_1fr_auto] sm:items-center">
      <input value={names[0]} onChange={(event) => setNames([event.target.value, names[1]])} placeholder="First GitHub username" className="field" aria-label="First GitHub username" />
      <span className="text-center text-sm font-black text-blue-500">VS</span>
      <input value={names[1]} onChange={(event) => setNames([names[0], event.target.value])} placeholder="Second GitHub username" className="field" aria-label="Second GitHub username" />
      <button disabled={loading} className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-500 disabled:opacity-60">{loading ? "Comparing..." : "Compare"}</button>
    </form>
    {error && <p role="alert" className="mt-5 text-center text-sm text-red-500">{error}</p>}
    {profiles.length === 2 && <>
      <div className="mt-9 grid gap-4 md:grid-cols-2">{summaries.map((item) => <article key={item.user.id} className="surface-card rounded-3xl p-6 text-center"><img src={item.user.avatar_url} alt={`${item.user.login} avatar`} className="mx-auto h-24 w-24 rounded-2xl"/><h2 className="mt-4 text-2xl font-extrabold text-slate-900 dark:text-white">{item.user.name || item.user.login}</h2><p className="text-blue-500">@{item.user.login}</p><a href={item.user.html_url} target="_blank" rel="noreferrer" className="mt-3 inline-block text-xs font-bold text-blue-500 hover:underline">Open GitHub profile ↗</a><div className="mt-5 flex flex-wrap justify-center gap-2"><span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-600 dark:text-blue-300">{item.languages.length} languages</span><span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-300">{number(item.stars)} stars</span></div><p className="mt-4 text-xs text-slate-500">{item.topRepo ? `Top project: ${item.topRepo.name} (${number(item.topRepo.stargazers_count)} stars)` : "No public repositories loaded"}</p></article>)}</div>
      <div className="surface-card mt-5 overflow-hidden rounded-2xl p-5 sm:p-6"><div className="mb-5 flex items-center gap-2"><FaTrophy className="text-amber-500"/><h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Metric-by-metric comparison</h3></div><div className="space-y-5">{metrics.map((metric) => { const values = summaries.map((item) => metric.kind === "user" ? item.user[metric.key] : item[metric.key]); const max = Math.max(1, ...values.map(Number)); const best = winner(metric); return <div key={metric.key}><div className="mb-2 flex flex-wrap items-center justify-between gap-2"><span className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">{metric.icon}{metric.label}</span>{best >= 0 && <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">@{summaries[best].user.login} leads</span>}</div><div className="grid gap-3 sm:grid-cols-2">{values.map((value, index) => <div key={summaries[index].user.id}><div className="mb-1 flex justify-between text-xs text-slate-500"><span>@{summaries[index].user.login}</span><strong className="text-slate-800 dark:text-white">{number(value)}</strong></div><div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10"><div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${(Number(value || 0) / max) * 100}%` }}/></div></div>)}</div></div>; })}</div><p className="mt-5 text-xs leading-5 text-slate-400">Stars and forks are totals from up to 100 repositories loaded for each developer. This comparison describes public GitHub metrics, not coding ability or overall developer quality.</p></div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">{summaries.map((item) => <section key={item.user.id} className="surface-card rounded-2xl p-5"><h3 className="font-extrabold text-slate-900 dark:text-white">@{item.user.login} · Language profile</h3><div className="mt-3 flex flex-wrap gap-2">{item.languages.length ? item.languages.map((lang) => <span key={lang} className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-white/10 dark:text-slate-300">{lang}</span>) : <span className="text-sm text-slate-500">No language data</span>}</div></section>)}</div>
    </>}
  </section>;
}
