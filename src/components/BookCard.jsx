/* eslint-disable react/prop-types */
export default function BookCard({ book }) {
  const cover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : 'https://via.placeholder.com/150x220?text=No+Cover';

  const authors = book.author_name?.join(', ') || 'Unknown author';
  const firstYear = book.first_publish_year ?? 'N/A';
  const editionCount = book.edition_count ?? 0;

  return (
    <div className="card p-4 flex flex-col">
      <img
        src={cover}
        alt={book.title}
        className="w-full h-56 object-cover rounded-xl mb-3"
        loading="lazy"
      />
      <h3 className="text-lg font-semibold leading-tight">{book.title}</h3>
      <p className="text-sm text-gray-600">{authors}</p>
      <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
        <span>First published: {firstYear}</span>
        <span>•</span>
        <span>{editionCount} editions</span>
      </div>
      <a
        href={`https://openlibrary.org${book.key}`}
        target="_blank"
        rel="noreferrer"
        className="mt-3 text-sm text-blue-600 hover:underline"
      >
        View on Open Library →
      </a>
    </div>
  );
}
