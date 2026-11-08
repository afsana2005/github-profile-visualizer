import { FaUsers, FaUserFriends, FaBook, FaCode, FaHeart, FaRegHeart, FaMapMarkerAlt, FaBuilding, FaLink } from "react-icons/fa";
import StatsCard from "./StatsCard";
import DeveloperAnalytics from "./analytics/DeveloperAnalytics";
import RepositoryInsights from "./RepositoryInsights";
import DeveloperReportButton from "./DeveloperReportButton";
import AIProfileAnalyzer from "./AIProfileAnalyzer";
import AIWorkbench from "./AIWorkbench";
import { useFavorites } from "../context/FavoritesContext";

export default function ProfileCard({ user, repos = [] }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  if (!user) return null;
  const saved = isFavorite(user.login);

  return <>
    <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <div className="surface-card rounded-3xl p-6 shadow-xl sm:p-9">
        <div className="flex flex-col gap-7 md:flex-row md:items-center">
          <img src={user.avatar_url} alt={`${user.login}'s avatar`} className="h-32 w-32 rounded-3xl border-4 border-blue-500/70 object-cover shadow-xl sm:h-40 sm:w-40" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div><h2 className="break-words text-3xl font-black text-slate-900 dark:text-white sm:text-4xl">{user.name || user.login}</h2><p className="mt-1 text-lg font-semibold text-blue-500">@{user.login}</p></div>
              <button onClick={() => toggleFavorite(user)} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-pink-400 hover:text-pink-500 dark:border-white/10 dark:text-slate-200" aria-label={saved ? "Remove from favorites" : "Add to favorites"}>{saved ? <FaHeart className="text-pink-500" /> : <FaRegHeart />} {saved ? "Saved" : "Save profile"}</button>
            </div>
            <p className="mt-4 max-w-3xl leading-7 text-slate-600 dark:text-slate-300">{user.bio || "This developer has not added a bio yet."}</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
              {user.location && <span className="inline-flex items-center gap-2"><FaMapMarkerAlt />{user.location}</span>}
              {user.company && <span className="inline-flex items-center gap-2"><FaBuilding />{user.company}</span>}
              {user.blog && <a className="inline-flex items-center gap-2 text-blue-500 hover:underline" href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`} target="_blank" rel="noreferrer"><FaLink />Website</a>}
            </div>
            <div className="mt-5 flex flex-wrap gap-3"><a href={user.html_url} target="_blank" rel="noreferrer" className="inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-500">View GitHub profile ↗</a><DeveloperReportButton user={user} repos={repos} /></div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatsCard title="Followers" value={user.followers} icon={<FaUsers />} color="text-blue-500" />
          <StatsCard title="Following" value={user.following} icon={<FaUserFriends />} color="text-emerald-500" />
          <StatsCard title="Repositories" value={user.public_repos} icon={<FaBook />} color="text-violet-500" />
          <StatsCard title="Gists" value={user.public_gists} icon={<FaCode />} color="text-amber-500" />
        </div>
        {repos.length > 0 && <div className="mt-9"><div className="mb-5 flex items-end justify-between gap-3"><div><p className="section-kicker">RECENT WORK</p><h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">Latest repositories</h3></div><span className="text-sm text-slate-500">{Math.min(repos.length, 6)} featured</span></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{repos.slice(0, 6).map((repo) => <article key={repo.id} className="repo-card flex min-w-0 flex-col rounded-2xl border border-slate-200 p-5 dark:border-white/10"><a href={repo.html_url} target="_blank" rel="noreferrer" className="break-words text-base font-bold text-blue-600 hover:underline dark:text-blue-400">{repo.name}</a><p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-400">{repo.description || "No description provided."}</p><div className="mt-5 flex flex-wrap gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400"><span>★ {repo.stargazers_count}</span><span>⑂ {repo.forks_count}</span>{repo.language && <span>{repo.language}</span>}</div></article>)}</div></div>}
      </div>
    </section>
    <AIProfileAnalyzer user={user} repos={repos} />
    <AIWorkbench user={user} repos={repos} />
    <DeveloperAnalytics user={user} repos={repos} />
    <RepositoryInsights repos={repos} username={user.login} />
  </>;
}
