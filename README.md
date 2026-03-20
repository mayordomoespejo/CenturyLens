# Dayfold

Single-page app for exploring historical events on any day of the year, powered by the Wikimedia On This Day feed API.

---

## Stack

| Layer | Technology |
|---|---|
| UI | React 19 + TypeScript |
| Build | Vite 7 |
| Data fetching | TanStack Query v5 |
| Routing | React Router v7 |
| Internationalization | i18next + react-i18next |
| Styles | SCSS |
| Data source | Wikimedia Feed API |

---

## Demo

https://dayfold-ten.vercel.app

---

## Features

- Scroll-driven radial wheel that maps scroll position to wheel rotation with snap-to-item behavior
- Date selection via a controlled month/day picker; selected date is persisted in URL search params
- Historical events fetched from the Wikimedia On This Day feed, cached indefinitely per language and date
- 11 UI languages: Arabic, German, English, Spanish, French, Italian, Portuguese, Swedish, Turkish, Ukrainian, Chinese
- Content language (Wikipedia edition) independent from UI language, persisted in localStorage
- Light and dark theme toggle, persisted across sessions
- Drag support on the radial wheel in addition to scroll

---

## Getting started

```bash
npm install
npm run dev
```

The dev server starts at http://localhost:5173.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Type-check and produce production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |
