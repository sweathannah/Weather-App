import { useState } from "react";
import { motion } from "framer-motion";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row flex-wrap items-center items-center gap-2 justify-center">
      <motion.input
        whileFocus={{ scale: 1.05 }}
        type="text"
        placeholder="Search city..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <motion.button
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white shadow-md lg:w-fit w-full"
      >
        Search
      </motion.button>
    </form>
  );
}

export default SearchBar;
