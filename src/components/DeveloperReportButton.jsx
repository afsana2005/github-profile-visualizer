import { useState } from "react";
import { jsPDF } from "jspdf";
import { FaFilePdf } from "react-icons/fa";

export default function DeveloperReportButton({ user, repos = [] }) {
  const [creating, setCreating] = useState(false);

  function downloadReport() {
    if (!user) return;
    setCreating(true);
    try {
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 16;
      let y = 20;
      const stars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
      const forks = repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0);
      const languages = [...new Set(repos.map((repo) => repo.language).filter(Boolean))];
      const addLine = (text, size = 10, color = [65, 75, 95], gap = 7) => {
        doc.setFontSize(size);
        doc.setTextColor(...color);
        const lines = doc.splitTextToSize(String(text), pageWidth - margin * 2);
        if (y + lines.length * gap > 278) { doc.addPage(); y = 20; }
        doc.text(lines, margin, y);
        y += lines.length * gap;
      };

      doc.setFillColor(12, 22, 43);
      doc.rect(0, 0, pageWidth, 48, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.text("GitHub Developer Report", margin, 22);
      doc.setFontSize(11);
      doc.setTextColor(191, 219, 254);
      doc.text(`@${user.login}`, margin, 32);
      doc.setTextColor(100, 116, 139);
      y = 61;

      addLine(user.name || user.login, 17, [15, 23, 42], 9);
      if (user.bio) addLine(user.bio, 10, [71, 85, 105], 6);
      addLine(`GitHub: ${user.html_url}`, 9, [37, 99, 235], 7);
      addLine(`Generated: ${new Date().toLocaleString()}`, 8, [100, 116, 139], 7);
      y += 4;
      addLine("PROFILE OVERVIEW", 12, [37, 99, 235], 8);
      addLine(`Followers: ${user.followers ?? 0}     Following: ${user.following ?? 0}     Public repositories: ${user.public_repos ?? 0}     Public gists: ${user.public_gists ?? 0}`);
      addLine("LOADED REPOSITORY INSIGHTS", 12, [37, 99, 235], 8);
      addLine(`Repositories analyzed: ${repos.length}     Stars in loaded repositories: ${stars}     Forks in loaded repositories: ${forks}`);
      addLine(`Languages represented: ${languages.length ? languages.join(", ") : "No language data available"}`);
      y += 3;
      addLine("TOP REPOSITORIES BY STARS", 12, [37, 99, 235], 8);
      [...repos].sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0)).slice(0, 10).forEach((repo, index) => {
        addLine(`${index + 1}. ${repo.name} — ${repo.stargazers_count || 0} stars, ${repo.forks_count || 0} forks${repo.language ? `, ${repo.language}` : ""}`, 9, [51, 65, 85], 6);
      });
      y += 4;
      addLine("DATA NOTES", 11, [37, 99, 235], 7);
      addLine("This report uses public GitHub profile data and the repositories loaded by this application. Repository totals in this report may represent only the loaded repository sample. Contribution history and private activity are not included.", 8, [100, 116, 139], 5);
      doc.save(`${user.login}-github-developer-report.pdf`);
    } finally {
      setCreating(false);
    }
  }

  return <button type="button" onClick={downloadReport} disabled={creating} className="inline-flex items-center gap-2 rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-2.5 text-sm font-bold text-blue-600 transition hover:-translate-y-0.5 hover:bg-blue-500/15 disabled:opacity-60 dark:text-blue-300">
    <FaFilePdf /> {creating ? "Preparing report..." : "Download PDF report"}
  </button>;
}
