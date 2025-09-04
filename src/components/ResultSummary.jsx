/* eslint-disable react/prop-types */
export default function ResultSummary({ total, shown, query }) {
  if (!query) return null;
  return (
    <div className="text-sm text-gray-600">
      Showing <span className="font-semibold">{shown}</span> of{" "}
      <span className="font-semibold">{total}</span> results for{" "}
      <span className="font-semibold">"{query}"</span>.
    </div>
  );
}
