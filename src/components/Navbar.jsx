import { FaGithub } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <FaGithub className="text-3xl text-blue-500" />
          <h1 className="text-2xl font-bold">
            GitHub Profile Visualizer
          </h1>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex gap-8 text-lg">
          <li className="hover:text-blue-400 cursor-pointer transition">
            Home
          </li>

          <li className="hover:text-blue-400 cursor-pointer transition">
            Compare
          </li>

          <li className="hover:text-blue-400 cursor-pointer transition">
            Favorites
          </li>
        </ul>

        {/* Dark Mode Toggle */}
        <ThemeToggle />

      </div>
    </nav>
  );
}

export default Navbar;
