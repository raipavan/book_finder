import { useCallback, useEffect, useMemo, useState } from 'react';
import SearchBar from './components/SearchBar.jsx';
import Filters from './components/Filters.jsx';
import BookCard from './components/BookCard.jsx';
import Pagination from './components/Pagination.jsx';
import ResultSummary from './components/ResultSummary.jsx';

const BASE = 'https://openlibrary.org/search.json';

export default function App() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ author: '', subject: '', yearFrom: '', yearTo: '' });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const hasMore = items.length < total;

  const buildUrl = useMemo(() => {
    const u = new URL(BASE);
    // Prefer fielded queries for relevance
    if (query) u.searchParams.set('title', query);
    if (filters.author) u.searchParams.set('author', filters.author);
    if (filters.subject) u.searchParams.set('subject', filters.subject);
    u.searchParams.set('page', String(page));
    // Return specific fields to reduce payload (optional but helpful)
    u.searchParams.set('fields', 'key,title,author_name,cover_i,first_publish_year,edition_count');
    u.searchParams.set('limit', '20');
    return u.toString();
  }, [query, filters.author, filters.subject, page]);

  const meetsYearFilter = (doc) => {
    const y = doc.first_publish_year;
    const from = filters.yearFrom ? Number(filters.yearFrom) : null;
    const to = filters.yearTo ? Number(filters.yearTo) : null;
    if (!y) return !(from || to); // If no year, exclude when a range is set
    if (from && y < from) return false;
    if (to && y > to) return false;
    return true;
  };

  const fetchBooks = useCallback(async () => {
    if (!query) {
      setItems([]);
      setTotal(0);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(buildUrl);
      if (!res.ok) throw new Error('Failed to fetch results.');
      const data = await res.json();
      setTotal(data.numFound || 0);
      const filtered = (data.docs || []).filter(meetsYearFilter);
      setItems((prev) => page === 1 ? filtered : [...prev, ...filtered]);
    } catch (e) {
      setError(e.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }, [buildUrl, query, page, filters.yearFrom, filters.yearTo]);

  // Trigger fetch when query/filters/page changes
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleSearch = useCallback(({ title }) => {
    setQuery(title);
    setPage(1);
  }, []);

  const handleFilters = useCallback((f) => {
    setFilters((prev) => ({ ...prev, ...f }));
    setPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ author: '', subject: '', yearFrom: '', yearTo: '' });
    setPage(1);
  }, []);

  const loadMore = () => setPage((p) => p + 1);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          📚 Book Finder
        </h1>
        <p className="text-gray-600 mt-1">
          Search Open Library by title and refine with author, subject, and year range.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-[2fr_1fr] md:items-start">
        <div className="card p-4">
          <SearchBar initialQuery={query} onSearch={handleSearch} />
          <div className="mt-3">
            <ResultSummary total={total} shown={items.length} query={query} />
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </div>
        </div>

        <Filters value={filters} onChange={handleFilters} onClear={clearFilters} />
      </div>

      <main className="mt-6">
        {loading && items.length === 0 && (
          <p className="text-center text-gray-600">Loading results…</p>
        )}

        {!loading && items.length === 0 && query && !error && (
          <p className="text-center text-gray-600">No results found. Try different keywords.</p>
        )}

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((b, i) => (
            <BookCard key={`${b.key}-${i}`} book={b} />
          ))}
        </div>

        <Pagination onLoadMore={loadMore} hasMore={hasMore} loading={loading} />
      </main>

      <footer className="mt-12 text-xs text-gray-500 text-center">
        Data from Open Library • 
      </footer>
    </div>
  );
}
