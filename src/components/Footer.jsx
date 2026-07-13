import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 text-gray-300">

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Logo */}
        <div className="text-center">

          <h2 className="text-3xl font-bold text-white flex justify-center items-center gap-3">

            <FaGithub className="text-blue-500" />

            GitHub Profile Visualizer

          </h2>

          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">

            Analyze GitHub profiles beautifully using React,
            Tailwind CSS, GitHub API, and modern UI design.

          </p>

        </div>

        {/* Navigation Links */}

        <div className="flex justify-center gap-8 mt-8 text-lg">

          <a href="#" className="hover:text-blue-500 transition">
            Home
          </a>

          <a href="#" className="hover:text-blue-500 transition">
            Compare
          </a>

          <a href="#" className="hover:text-blue-500 transition">
            Favorites
          </a>

          <a href="#" className="hover:text-blue-500 transition">
            Contact
          </a>

        </div>

        {/* Social Icons */}

        <div className="flex justify-center gap-8 mt-10 text-3xl">

          <a
            href="https://github.com/afsana2005"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-500 transition"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-500 transition"
          >
            <FaLinkedin />
          </a>

          <a
            href="#"
            className="hover:text-blue-500 transition"
          >
            <FaTwitter />
          </a>

        </div>

        {/* Copyright */}

        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-gray-500">

          © 2026 Syeda Afsana Khatun

          <br />

          Built with ❤️ using React + Tailwind CSS

        </div>

      </div>

    </footer>
  );
}

export default Footer;
