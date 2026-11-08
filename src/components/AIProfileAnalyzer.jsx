import { useState } from "react";
import { FaBrain, FaLightbulb, FaChartLine, FaGraduationCap, FaShieldAlt } from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { analyzeGithubProfile } from "../services/aiApi";

function InsightGroup({ title, icon, items, accent = "blue" }) {
  const accents = {
    blue: "border-blue-500/20 bg-blue-500/5",
    green: "border-emerald-500/20 bg-emerald-500/5",
    amber: "border-amber-500/20 bg-amber-500/5",
    purple: "border-violet-500/20 bg-violet-500/5",
    slate: "border-slate-500/20 bg-slate-500/5",
  };

  return (
    <section className={`rounded-2xl border p-4 sm:p-5 ${accents[accent]}`}>
      <h4 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
        <span className="text-blue-500">{icon}</span>{title}
      </h4>
      {items.length ? (
        <ul className="mt-3 space-y-2">
          {items.map((item, index) => (
            <li key={`${title}-${index}`} className="flex gap-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : <p className="mt-3 text-sm text-slate-500">No specific observations returned.</p>}
    </section>
  );
}

export default function AIProfileAnalyzer({ user, repos }) {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    setLoading(true);
    setError("");
    setAnalysis(null);
    try {
      const result = await analyzeGithubProfile(user, repos);
      setAnalysis(result);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-8">
      <div className="surface-card overflow-hidden rounded-3xl p-5 shadow-xl sm:p-8">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div className="max-w-2xl">
            <p className="section-kicker">POWERED BY GEMINI AI</p>
            <h3 className="mt-2 flex items-center gap-3 text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">
              <span className="rounded-xl bg-blue-500/10 p-3 text-blue-500"><FaBrain /></span>
              AI Developer Analyzer
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Get an evidence-based review of @{user.login}'s public GitHub profile, with practical suggestions for improvement.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={loading}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:shadow-blue-600/30 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />Analyzing profile...</> : <><FaWandMagicSparkles />{analysis ? "Analyze again" : "Analyze with AI"}</>}
          </button>
        </div>

        {error && <div role="alert" className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-300">{error}</div>}

        {loading && (
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {[1, 2, 3, 4].map((item) => <div key={item} className="skeleton h-36 rounded-2xl" />)}
          </div>
        )}

        {analysis && !loading && (
          <div className="mt-7 space-y-5">
            <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-violet-500/10 p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-2xl border border-blue-500/20 bg-white/70 dark:bg-slate-950/50">
                  <span className="text-3xl font-black text-blue-600 dark:text-blue-400">{analysis.profileScore}<span className="text-base">/100</span></span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Profile score</span>
                </div>
                <div>
                  <h4 className="flex items-center gap-2 text-lg font-extrabold text-slate-900 dark:text-white"><FaChartLine className="text-blue-500" /> Profile overview</h4>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{analysis.summary}</p>
                </div>
              </div>
              <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">This score evaluates public profile presentation and completeness, not the developer's actual coding ability.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <InsightGroup title="Strengths" icon={<FaLightbulb />} items={analysis.strengths} accent="green" />
              <InsightGroup title="Areas to improve" icon={<FaChartLine />} items={analysis.improvements} accent="amber" />
              <InsightGroup title="Recommended skills" icon={<FaGraduationCap />} items={analysis.recommendedSkills} accent="purple" />
              <InsightGroup title="Potential career paths" icon={<FaBrain />} items={analysis.careerSuggestions} accent="blue" />
            </div>

            <InsightGroup title="Data limitations" icon={<FaShieldAlt />} items={analysis.evidenceLimitations} accent="slate" />
            <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">AI-generated guidance based only on the public profile and up to 30 repositories supplied. Review suggestions before making career decisions.</p>
          </div>
        )}

        {!analysis && !loading && !error && (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-6 text-center dark:border-white/10">
            <FaBrain className="mx-auto text-3xl text-blue-500" />
            <p className="mt-3 font-semibold text-slate-800 dark:text-slate-200">Ready to understand this developer profile?</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Select “Analyze with AI” to generate strengths, improvement ideas, skill recommendations, and career paths.</p>
          </div>
        )}
      </div>
    </section>
  );
}
