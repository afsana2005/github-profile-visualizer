import { FiSearch } from "react-icons/fi";

function SearchBar() {
  return (
    <section
      id="search"
      className="mt-12 flex justify-center px-4"
    >
      <div className="flex w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl">

        <input
          type="text"
          placeholder="Enter GitHub Username..."
          className="flex-1 px-6 py-4 text-lg bg-gray-800 text-white outline-none"
        />

        <button
          className="bg-blue-600 hover:bg-blue-700 transition px-8 flex items-center gap-2 text-white font-semibold"
        >
          <FiSearch />
          Search
        </button>

      </div>
    </section>
  );
}

export default SearchBar;
