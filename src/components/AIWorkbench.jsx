import { useMemo, useState } from "react";
import { FaComments, FaCodeBranch, FaGraduationCap, FaDatabase, FaPaperPlane, FaRobot } from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { chatWithGithub, reviewGithubRepository, generateCareerRoadmap, askGithubData } from "../services/aiApi";

const tabs = [
  { id: "chat", label: "GitHub Chat", icon: FaComments },
  { id: "review", label: "Repo Reviewer", icon: FaCodeBranch },
  { id: "roadmap", label: "Career Roadmap", icon: FaGraduationCap },
  { id: "data", label: "Ask GitHub Data", icon: FaDatabase },
];

function ResultPanel({ title, result, loading, error, empty }) {
  return <div className="mt-5 min-h-36 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-slate-950/40">
    <h4 className="font-bold text-slate-900 dark:text-white">{title}</h4>
    {loading ? <div className="mt-4 space-y-3"><div className="skeleton h-3 w-full rounded"/><div className="skeleton h-3 w-11/12 rounded"/><div className="skeleton h-3 w-4/5 rounded"/><div className="skeleton h-3 w-2/3 rounded"/></div>
      : error ? <p role="alert" className="mt-3 text-sm text-red-500">{error}</p>
      : result ? <div className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700 dark:text-slate-300">{result}</div>
      : <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{empty}</p>}
  </div>;
}

export default function AIWorkbench({ user, repos = [] }) {
  const [tab, setTab] = useState("chat");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatAnswer, setChatAnswer] = useState("");
  const [selectedRepo, setSelectedRepo] = useState(repos[0]?.name || "");
  const [readme, setReadme] = useState("");
  const [review, setReview] = useState("");
  const [goal, setGoal] = useState("Full-stack developer");
  const [roadmap, setRoadmap] = useState("");
  const [question, setQuestion] = useState("");
  const [dataAnswer, setDataAnswer] = useState("");
  const repoOptions = useMemo(() => repos.filter((repo) => !repo.fork), [repos]);

  async function run(task) {
    setBusy(true); setError("");
    try { await task(); } catch (err) { setError(err.message || "Something went wrong. Please try again."); }
    finally { setBusy(false); }
  }

  async function sendChat(event) {
    event.preventDefault();
    const text = chatInput.trim();
    if (!text || busy) return;
    const next = [...messages, { role: "user", content: text }];
    setMessages(next); setChatInput(""); setChatAnswer("");
    await run(async () => {
      const answer = await chatWithGithub(user, repos, next);
      setChatAnswer(answer);
      setMessages([...next, { role: "assistant", content: answer }]);
    });
  }

  async function doReview() {
    if (!selectedRepo) { setError("This profile has no available repositories to review."); return; }
    await run(async () => setReview(await reviewGithubRepository(user, repos, selectedRepo, readme)));
  }
  async function doRoadmap() { await run(async () => setRoadmap(await generateCareerRoadmap(user, repos, goal))); }
  async function doAsk() {
    if (!question.trim()) { setError("Enter a question about this GitHub profile first."); return; }
    await run(async () => setDataAnswer(await askGithubData(user, repos, question.trim())));
  }

  return <section className="mx-auto max-w-6xl px-5 pb-12 sm:px-8">
    <div className="surface-card overflow-hidden rounded-3xl p-5 shadow-xl sm:p-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="section-kicker">YOUR AI TOOLKIT</p><h3 className="mt-2 flex items-center gap-3 text-2xl font-black text-slate-900 dark:text-white sm:text-3xl"><span className="rounded-xl bg-violet-500/10 p-3 text-violet-500"><FaRobot/></span>AI GitHub Studio</h3><p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Four ways to explore @{user.login}'s public GitHub data with Gemini.</p></div>
        <span className="w-fit rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-xs font-bold text-violet-600 dark:text-violet-300">Gemini powered</span>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="AI tools">
        {tabs.map(({ id, label, icon: Icon }) => <button key={id} role="tab" aria-selected={tab === id} onClick={() => { setTab(id); setError(""); }} className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition ${tab === id ? "border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "border-slate-200 text-slate-600 hover:border-blue-400 dark:border-white/10 dark:text-slate-300"}`}><Icon/>{label}</button>)}
      </div>
      {error && <p role="alert" className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500">{error}</p>}

      {tab === "chat" && <div className="mt-5"><h4 className="font-bold text-slate-900 dark:text-white">Chat with this GitHub profile</h4><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Ask about repository activity, languages, stars, profile details, or project ideas.</p>
        <div className="mt-4 max-h-80 space-y-3 overflow-y-auto">{messages.map((message, index) => <div key={index} className={`max-w-[90%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === "user" ? "ml-auto bg-blue-600 text-white" : "border border-slate-200 bg-slate-50 text-slate-700 dark:border-white/10 dark:bg-slate-950/50 dark:text-slate-300"}`}><span className="mb-1 block text-[10px] font-extrabold uppercase tracking-wider opacity-70">{message.role === "user" ? "You" : "Gemini"}</span>{message.content}</div>)}</div>
        <form onSubmit={sendChat} className="mt-4 flex gap-2"><input className="field flex-1" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="e.g. What languages does this developer use most?"/><button disabled={busy || !chatInput.trim()} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 font-bold text-white disabled:opacity-50"><FaPaperPlane/><span className="hidden sm:inline">Send</span></button></form>
        {busy && <p className="mt-3 text-xs text-blue-500">Gemini is preparing an answer...</p>}
      </div>}

      {tab === "review" && <div className="mt-5"><h4 className="font-bold text-slate-900 dark:text-white">AI Repository Reviewer</h4><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Review public repository metadata and optionally paste its README for more useful documentation feedback.</p>
        <label className="mt-4 block text-sm font-semibold text-slate-700 dark:text-slate-300">Choose repository</label><select className="field mt-2" value={selectedRepo} onChange={(e) => setSelectedRepo(e.target.value)}>{repoOptions.map((repo) => <option key={repo.id} value={repo.name}>{repo.name}</option>)}</select>
        <label className="mt-4 block text-sm font-semibold text-slate-700 dark:text-slate-300">README content (optional)</label><textarea className="field mt-2 min-h-32 resize-y" value={readme} onChange={(e) => setReadme(e.target.value)} maxLength={12000} placeholder="Paste the repository README here to include documentation review..."/>
        <button onClick={doReview} disabled={busy || !selectedRepo} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white disabled:opacity-50"><FaWandMagicSparkles/>Review repository</button>
        <ResultPanel title="Repository review" result={review} loading={busy} error="" empty="Choose a repository and run the review to see practical feedback."/>
      </div>}

      {tab === "roadmap" && <div className="mt-5"><h4 className="font-bold text-slate-900 dark:text-white">AI Career Roadmap Generator</h4><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Generate a practical 30/60/90-day plan informed by visible projects and languages.</p>
        <label className="mt-4 block text-sm font-semibold text-slate-700 dark:text-slate-300">Career goal</label><input className="field mt-2" value={goal} onChange={(e) => setGoal(e.target.value)} maxLength={300} placeholder="e.g. Frontend developer, DevOps engineer, Data analyst"/>
        <button onClick={doRoadmap} disabled={busy} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white disabled:opacity-50"><FaWandMagicSparkles/>Generate my roadmap</button>
        <ResultPanel title="Your career roadmap" result={roadmap} loading={busy} empty="Enter a career goal and generate your personalized learning plan."/>
      </div>}

      {tab === "data" && <div className="mt-5"><h4 className="font-bold text-slate-900 dark:text-white">Ask Your GitHub Data</h4><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Ask questions in everyday language. Answers are based on the profile and repository data loaded above.</p>
        <form onSubmit={(e) => { e.preventDefault(); doAsk(); }} className="mt-4 space-y-3"><textarea className="field min-h-24 resize-y" value={question} onChange={(e) => setQuestion(e.target.value)} maxLength={1500} placeholder="e.g. Which repository has the most stars? What are the top programming languages?"/><button disabled={busy || !question.trim()} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white disabled:opacity-50"><FaPaperPlane/>Ask about this data</button></form>
        <ResultPanel title="Answer from GitHub data" result={dataAnswer} loading={busy} empty="Ask a question to explore this developer's public GitHub statistics."/>
      </div>}
      <p className="mt-6 border-t border-slate-200 pt-4 text-xs leading-5 text-slate-500 dark:border-white/10 dark:text-slate-400">Privacy and accuracy: only the public profile and repository data loaded by this app, plus any README text you paste, are sent to your backend for AI analysis. AI output can be inaccurate; public metadata cannot prove coding ability or private work.</p>
    </div>
  </section>;
}
