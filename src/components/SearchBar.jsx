/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

export default function SearchBar({ initialQuery, onSearch }) {
  const [query, setQuery] = useState(initialQuery || '');

  // Debounce typing
  useEffect(() => {
    const t = setTimeout(() => {
      if (query.trim()) onSearch({ title: query });
    }, 500);
    return () => clearTimeout(t);
  }, [query, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch({ title: query });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
      <input
        className="input"
        type="text"
        placeholder="Search by title (e.g., The Hobbit)…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search books by title"
      />
      <button type="submit" className="btn-primary">Search</button>
    </form>
  );
}
