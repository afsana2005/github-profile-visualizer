
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  const technologies = [
    "React",
    "Tailwind CSS",
    "GitHub API",
    "Node.js",
    "Express.js",
    "Google Gemini AI",
  ];

  return (
    <footer className="relative mt-16 border-t border-slate-200 bg-white dark:border-white/10 dark:bg-[#090d16]">

      {/* Gradient Top Border */}
      <div className="h-[2px] w-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400"></div>

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">

          {/* Project Information */}
          <div className="md:col-span-2">

            <div className="flex items-center gap-3 text-xl font-extrabold text-slate-900 dark:text-white">
              <FaGithub className="text-3xl text-blue-500" />
              GitHub Profile Visualizer
            </div>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-400">
              Explore GitHub developers, analyze coding activity,
              compare profiles, and discover insights with
              AI-powered developer analytics.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-5 text-2xl text-slate-500 dark:text-slate-400">

              <a
                aria-label="GitHub"
                href="https://github.com/afsana2005"
                target="_blank"
                rel="noreferrer"
                className="transition hover:-translate-y-1 hover:text-blue-500"
              >
                <FaGithub />
              </a>

              <a
                aria-label="LinkedIn"
                href="https://www.linkedin.com/in/syeda-afsana-khatun-19248a356"
                target="_blank"
                rel="noreferrer"
                className="transition hover:-translate-y-1 hover:text-blue-500"
              >
                <FaLinkedin />
              </a>

              <a
                aria-label="Instagram"
                href="https://www.instagram.com/clasiiccharm20242024"
                target="_blank"
                rel="noreferrer"
                className="transition hover:-translate-y-1 hover:text-pink-500"
              >
                <FaInstagram />
              </a>

            </div>
          </div>

          {/* Explore Navigation */}
          <div>

            <h3 className="mb-5 text-base font-bold text-slate-900 dark:text-white">
              Explore
            </h3>

            <div className="flex flex-col gap-4 text-sm font-medium text-slate-500 dark:text-slate-400">

              <Link to="/" className="transition hover:translate-x-1 hover:text-blue-500">
                Home
              </Link>

              <Link to="/compare" className="transition hover:translate-x-1 hover:text-blue-500">
                Compare
              </Link>

              <Link to="/favorites" className="transition hover:translate-x-1 hover:text-blue-500">
                Favorites
              </Link>

              <Link to="/#search" className="transition hover:translate-x-1 hover:text-blue-500">
                AI Insights
              </Link>

            </div>
          </div>

        </div>

        {/* Technology Stack */}
        <div className="mt-12 border-t border-slate-200 pt-8 dark:border-white/10">

          <h3 className="mb-5 text-sm font-bold text-slate-900 dark:text-white">
            Built with
          </h3>

          <div className="flex flex-wrap gap-3">

            {technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-600 transition hover:border-blue-500 hover:text-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
              >
                {tech}
              </span>
            ))}

          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 text-center text-xs text-slate-400 dark:border-white/10 sm:flex-row">

          <p>
            © {new Date().getFullYear()} GitHub Profile Visualizer.
            All rights reserved.
          </p>

          <p>
            Designed & Developed with
            <span className="mx-1 text-red-500">♥</span>
          </p>

        </div>

      </div>
    </footer>
  );
}
