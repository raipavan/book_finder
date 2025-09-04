/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { User, BookOpen, Calendar } from "lucide-react";

export default function Filters({ value, onChange, onClear }) {
  const [author, setAuthor] = useState(value.author || "");
  const [subject, setSubject] = useState(value.subject || "");
  const [yearFrom, setYearFrom] = useState(value.yearFrom || "");
  const [yearTo, setYearTo] = useState(value.yearTo || "");

  useEffect(() => {
    const t = setTimeout(() => {
      onChange({ author, subject, yearFrom, yearTo });
    }, 400);
    return () => clearTimeout(t);
  }, [author, subject, yearFrom, yearTo, onChange]);

  const clear = () => {
    setAuthor("");
    setSubject("");
    setYearFrom("");
    setYearTo("");
    onClear?.();
  };

  return (
    <div className="card p-5 shadow-md sticky top-6 dark:bg-gray-800">
      <h2 className="text-lg font-semibold mb-4">🔎 Filters</h2>

      <div className="grid grid-cols-1 gap-4">
        {/* Author */}
        <div>
          <label className="label flex items-center gap-2 font-medium mb-1">
            <User size={16} /> Author
          </label>
          <input
            className="input border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., J. K. Rowling"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        {/* Subject */}
        <div>
          <label className="label flex items-center gap-2 font-medium mb-1">
            <BookOpen size={16} /> Subject / Genre
          </label>
          <input
            className="input border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Fantasy"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        {/* Year Range */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label flex items-center gap-2 font-medium mb-1">
              <Calendar size={16} /> From
            </label>
            <input
              className="input border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
              type="number"
              placeholder="1950"
              value={yearFrom}
              onChange={(e) => setYearFrom(e.target.value)}
              min="0"
            />
          </div>
          <div>
            <label className="label flex items-center gap-2 font-medium mb-1">
              <Calendar size={16} /> To
            </label>
            <input
              className="input border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
              type="number"
              placeholder="2025"
              value={yearTo}
              onChange={(e) => setYearTo(e.target.value)}
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Clear Filters Button */}
      <div className="mt-5">
        <button
          className="w-full btn bg-red-500 text-white hover:bg-red-600 transition"
          onClick={clear}
          type="button"
        >
          ❌ Clear Filters
        </button>
      </div>
    </div>
  );
}
