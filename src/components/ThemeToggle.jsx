import { FaMoon, FaSun } from "react-icons/fa";
import useTheme from "../hooks/useTheme";

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();
  return (
    <button type="button" onClick={toggleTheme} aria-label="Toggle color theme"
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-amber-500 shadow-sm transition duration-300 hover:-rotate-12 hover:scale-110 dark:border-white/10 dark:bg-white/5 dark:text-sky-300">
      {darkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
}
