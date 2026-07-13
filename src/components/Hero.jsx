import { FaGithub } from "react-icons/fa";
import SearchBar from "./SearchBar";

function Hero() {
  return (
<section className="bg-gradient-to-b from-gray-900 to-black text-white min-h-[90vh] flex items-center justify-center">
      <div className="max-w-5xl mx-auto px-6 text-center">

        {/* GitHub Icon */}
        <div className="flex justify-center mb-6">
          <FaGithub className="text-7xl text-blue-500" />
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          Discover GitHub Developers
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          Search GitHub profiles, explore repositories, analyze
          coding statistics, compare developers, and visualize
          GitHub data beautifully.
        </p>

          {/* Search Bar */}
        <SearchBar />

      </div>
    </section>
  );
}

export default Hero;
