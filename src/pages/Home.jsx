import { useState } from "react";
import Hero from "../components/Hero";
import ProfileCard from "../components/ProfileCard";
import Loading from "../components/Loading";
import { getGithubUser, getGithubRepos } from "../services/githubApi";

export default function Home() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(username) {
    setLoading(true); setError(""); setUser(null); setRepos([]);
    try {
      const [profile, repositories] = await Promise.all([getGithubUser(username), getGithubRepos(username)]);
      setUser(profile); setRepos(repositories);
    } catch (err) { setError(err.message || "Something went wrong."); }
    finally { setLoading(false); }
  }

  return <>
    <Hero onSearch={handleSearch} loading={loading} />
    {error && <p role="alert" className="mx-auto mt-8 max-w-2xl rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-center text-sm text-red-600 dark:text-red-300">{error}</p>}
    {loading && <Loading />}
    {user && !loading && <ProfileCard user={user} repos={repos} />}
    {!user && !loading && !error && <section className="mx-auto max-w-5xl px-5 py-16 text-center"><p className="section-kicker">BUILT FOR DEVELOPERS</p><h2 className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">Your GitHub, at a glance.</h2><p className="mx-auto mt-3 max-w-xl leading-7 text-slate-500 dark:text-slate-400">Enter any public GitHub username above to explore their profile and latest repositories.</p></section>}
  </>;
}
