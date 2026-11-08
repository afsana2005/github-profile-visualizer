import { FaHeart, FaTrash } from "react-icons/fa";
import { useFavorites } from "../context/FavoritesContext";

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();
  return <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8"><p className="section-kicker text-center">YOUR SHORTLIST</p><h1 className="page-title">Favorite developers</h1><p className="page-subtitle">Profiles you save will stay here on this device.</p>
    {favorites.length === 0 ? <div className="surface-card mx-auto mt-10 max-w-xl rounded-3xl px-6 py-14 text-center"><FaHeart className="mx-auto text-4xl text-pink-500" /><h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">No favorites yet</h2><p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Search for a GitHub developer and tap “Save profile” to add them here.</p></div> : <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{favorites.map(user => <article key={user.id} className="surface-card flex items-center gap-4 rounded-2xl p-5"><img src={user.avatar_url} alt="" className="h-16 w-16 rounded-xl" /><div className="min-w-0 flex-1"><h2 className="truncate font-bold text-slate-900 dark:text-white">{user.name || user.login}</h2><p className="text-sm text-blue-500">@{user.login}</p><a href={user.html_url} target="_blank" rel="noreferrer" className="text-xs text-slate-500 hover:underline">View profile ↗</a></div><button onClick={() => toggleFavorite(user)} aria-label={`Remove ${user.login}`} className="rounded-lg p-2 text-slate-400 transition hover:bg-red-500/10 hover:text-red-500"><FaTrash /></button></article>)}</div>}
  </section>;
}
