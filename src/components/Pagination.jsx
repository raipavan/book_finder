/* eslint-disable react/prop-types */
export default function Pagination({ onLoadMore, hasMore, loading }) {
  if (!hasMore) return null;
  return (
    <div className="flex justify-center my-6">
      <button
        className="btn-primary"
        onClick={onLoadMore}
        disabled={loading}
      >
        {loading ? "Loading…" : "Load more"}
      </button>
    </div>
  );
}
