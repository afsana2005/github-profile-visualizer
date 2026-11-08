import { NavLink } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Compare", to: "/compare" },
  { label: "Favorites", to: "/favorites" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-[#090d16]/85">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <NavLink to="/" className="flex min-w-0 items-center gap-2.5">
          <FaGithub className="shrink-0 text-3xl text-blue-500" />
          <span className="truncate text-base font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-xl">GitHub Profile Visualizer</span>
        </NavLink>
        <div className="flex items-center gap-3 sm:gap-7">
          <div className="flex items-center gap-3 text-sm font-semibold sm:gap-7 sm:text-base">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === "/"} className={({ isActive }) =>
                `transition-colors hover:text-blue-500 ${isActive ? "text-blue-500" : "text-slate-600 dark:text-slate-300"}`
              }>{item.label}</NavLink>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
