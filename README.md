# 📚 Book Finder (React + Vite + Tailwind)

A simple, fast book search app for Alex (college student) powered by the **Open Library Search API**.

## ✨ Features
- Search by **title**
- Refine by **author**, **subject/genre**, and **year range**
- Clean, responsive UI
- Infinite pagination via **Load more**
- Graceful loading, error, and empty states

## 🚀 Getting Started

```bash
# 1) Install dependencies
npm install

# 2) Start dev server
npm run dev

# 3) Build for production
npm run build
npm run preview
```

## 🔗 API
Uses Open Library Search API:
- Base: `https://openlibrary.org/search.json`
- Fielded queries: `?title=`, `&author=`, `&subject=`
- Pagination: `&page=N`
- Covers: `https://covers.openlibrary.org/b/id/{cover_i}-M.jpg`

> Note: Year filtering is applied client-side using `first_publish_year`.

## 🧱 Tech Stack
- React 18 (Vite)
- Tailwind CSS
- Native fetch + framework state

---

Made for the "Book Finder" task.
