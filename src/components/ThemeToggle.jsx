import { FaMoon, FaSun } from "react-icons/fa";
import useTheme from "../hooks/useTheme";

function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="text-2xl hover:text-blue-500 transition"
    >
      {darkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
}

export default ThemeToggle;
