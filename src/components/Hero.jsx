import { FaGithub, FaCodeBranch, FaStar } from "react-icons/fa";
import SearchBar from "./SearchBar";

export default function Hero({ onSearch, loading }) {
  return (
    <section className="hero-bg relative isolate flex min-h-[590px] items-center overflow-hidden px-5 py-24 text-center text-white sm:min-h-[640px]">
      <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <div className="hero-icon mx-auto mb-7 grid h-20 w-20 place-items-center rounded-3xl border border-white/15 bg-white/10 text-5xl shadow-2xl shadow-blue-500/20 backdrop-blur"><FaGithub /></div>
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[.2em] text-blue-200"><FaCodeBranch /> Your developer journey, visualized</p>
        <h1 className="hero-title text-4xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">Discover the people<br className="hidden sm:block" /> behind the <span className="text-blue-400">code.</span></h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">Explore GitHub profiles, discover repositories, compare developers and turn coding activity into clear insights.</p>
        <SearchBar onSearch={onSearch} loading={loading} />
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400"><span className="inline-flex items-center gap-2"><FaGithub /> Live GitHub data</span><span className="inline-flex items-center gap-2"><FaStar className="text-amber-400" /> Repository insights</span></div>
      </div>
    </section>
  );
}
