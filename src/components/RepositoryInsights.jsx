import { useMemo, useState } from "react";
import { FaCodeBranch, FaExternalLinkAlt, FaSearch, FaStar } from "react-icons/fa";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function RepositoryInsights({ repos = [], username }) {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("all");
  const [sort, setSort] = useState("stars");
  const languages = useMemo(() => [...new Set(repos.map((repo) => repo.language).filter(Boolean))].sort(), [repos]);
  const filtered = useMemo(() => repos
    .filter((repo) => `${repo.name} ${repo.description || ""}`.toLowerCase().includes(query.toLowerCase()))
    .filter((repo) => language === "all" || repo.language === language)
    .sort((a, b) => {
      if (sort === "updated") return new Date(b.updated_at) - new Date(a.updated_at);
      if (sort === "forks") return (b.forks_count || 0) - (a.forks_count || 0);
      return (b.stargazers_count || 0) - (a.stargazers_count || 0);
    }), [repos, query, language, sort]);
  const topRepos = [...repos].sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0)).slice(0, 6);
  const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
  const totalForks = repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0);

  if (!repos.length) return null;
  return <section className="mx-auto max-w-6xl px-5 pb-14 sm:px-8">
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div><p className="section-kicker">PROJECT PERFORMANCE</p><h2 className="mt-1 text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">Repository insights</h2><p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Explore {repos.length} loaded public repositories for @{username}.</p></div>
      <div className="flex gap-3 text-sm font-bold"><span className="rounded-xl bg-amber-500/10 px-3 py-2 text-amber-600 dark:text-amber-300"><FaStar className="mr-1 inline" />{totalStars.toLocaleString()}</span><span className="rounded-xl bg-blue-500/10 px-3 py-2 text-blue-600 dark:text-blue-300"><FaCodeBranch className="mr-1 inline" />{totalForks.toLocaleString()}</span></div>
    </div>
    <div className="surface-card mb-4 rounded-2xl p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><p className="section-kicker">TOP PROJECTS</p><h3 className="mt-1 text-lg font-extrabold text-slate-900 dark:text-white">Most-starred repositories</h3></div><span className="text-xs text-slate-500">Sorted by stars</span></div>
      <div className="h-64 min-w-0"><ResponsiveContainer width="100%" height="100%"><BarChart data={topRepos} layout="vertical" margin={{ top: 4, right: 18, left: 12, bottom: 4 }}><CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(148,163,184,.2)"/><XAxis type="number" allowDecimals={false} tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false}/><YAxis type="category" dataKey="name" width={105} tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false}/><Tooltip/><Bar dataKey="stargazers_count" name="Stars" fill="#3b82f6" radius={[0, 6, 6, 0]}/></BarChart></ResponsiveContainer></div>
    </div>
    <div className="surface-card rounded-2xl p-5 sm:p-6">
      <div className="mb-4"><p className="section-kicker">REPOSITORY EXPLORER</p><h3 className="mt-1 text-lg font-extrabold text-slate-900 dark:text-white">Search and filter projects</h3></div>
      <div className="mb-5 grid gap-3 md:grid-cols-[minmax(0,1fr)_180px_180px]">
        <label className="relative"><FaSearch className="pointer-events-none absolute left-73 top-1/2 -translate-y-1/2 text-slate-400"/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search repository name or description" className="field pl-11"/></label>
        <select value={language} onChange={(event) => setLanguage(event.target.value)} className="field"><option value="all">All languages</option>{languages.map((item) => <option key={item} value={item}>{item}</option>)}</select>
        <select value={sort} onChange={(event) => setSort(event.target.value)} className="field"><option value="stars">Sort: Most stars</option><option value="forks">Sort: Most forks</option><option value="updated">Sort: Recently updated</option></select>
      </div>
      {filtered.length ? <div className="grid gap-3 md:grid-cols-2">{filtered.map((repo) => <article key={repo.id} className="repo-card flex min-w-0 flex-col rounded-xl border border-slate-200 p-4 dark:border-white/10"><div className="flex items-start justify-between gap-3"><a href={repo.html_url} target="_blank" rel="noreferrer" className="break-all font-bold text-blue-600 hover:underline dark:text-blue-400">{repo.name}</a><a href={repo.html_url} target="_blank" rel="noreferrer" aria-label={`Open ${repo.name}`} className="shrink-0 text-slate-400 hover:text-blue-500"><FaExternalLinkAlt size={12}/></a></div><p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-400">{repo.description || "No description provided."}</p><div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400"><span><FaStar className="mr-1 inline text-amber-500"/>{repo.stargazers_count || 0}</span><span><FaCodeBranch className="mr-1 inline text-blue-500"/>{repo.forks_count || 0}</span>{repo.language && <span className="rounded-full bg-slate-100 px-2 py-1 dark:bg-white/10">{repo.language}</span>}<span className="ml-auto">Updated {new Date(repo.updated_at).toLocaleDateString()}</span></div></article>)}</div> : <p className="rounded-xl bg-slate-100 px-4 py-8 text-center text-sm text-slate-500 dark:bg-white/5">No repositories match these filters.</p>}
      <p className="mt-4 text-xs text-slate-400">Showing {filtered.length} of {repos.length} loaded repositories. GitHub API pagination can be extended for accounts with more than 100 public repositories.</p>
    </div>
  </section>;
}
