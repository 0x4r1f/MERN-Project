// src/components/SearchBar.jsx
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ data, setFiltered }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(filtered);
  }, [query, data]);

  return (
    <div className="relative mb-6">
      <input
        type="text"
        placeholder="Search by name..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <FaSearch className="absolute right-3 top-2.5 text-gray-400" />
    </div>
  );
}
