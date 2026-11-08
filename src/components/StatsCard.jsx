export default function StatsCard({ title, value, icon, color = "text-blue-500" }) {
  return <div className="surface-card rounded-2xl p-5 text-center transition duration-300 hover:-translate-y-1"><div className={`mb-3 flex justify-center text-2xl ${color}`}>{icon}</div><p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{title}</p><p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">{Number(value || 0).toLocaleString()}</p></div>;
}
