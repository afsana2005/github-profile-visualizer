import { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchBar({ onSearch, loading }) {
  const [username, setUsername] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    if (username.trim()) onSearch(username.trim());
  };
  return (
    <form id="search" onSubmit={handleSubmit} className="mx-auto mt-9 flex w-full max-w-2xl flex-col gap-3 rounded-2xl border border-white/10 bg-white/10 p-2 shadow-2xl shadow-blue-950/30 backdrop-blur-xl sm:flex-row">
      <input value={username} onChange={(event) => setUsername(event.target.value)}
        aria-label="GitHub username" placeholder="Enter a GitHub username..."
        className="min-w-0 flex-1 rounded-xl bg-white px-5 py-4 text-base text-slate-900 outline-none ring-blue-500 transition focus:ring-2 dark:bg-[#111827] dark:text-white" />
      <button disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-4 font-bold text-white transition hover:bg-blue-500 disabled:cursor-wait disabled:opacity-60">
        <FiSearch />{loading ? "Searching..." : "Explore profile"}
      </button>
    </form>
  );
}
