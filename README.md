# CenturyLens

CenturyLens is a React 19 SPA that explores historical events for any day of the year using the Wikimedia On This Day API.

## Features

- Radial timeline synchronized with scroll and drag interactions
- Day and month selection persisted in the URL
- Light and dark theme persisted in `localStorage`
- English and Spanish translations with browser language detection
- Route-based About page with project and data source details

## Stack

| Purpose       | Library                    |
| ------------- | -------------------------- |
| UI            | React 19 + TypeScript      |
| Build         | Vite                       |
| Routing       | React Router               |
| Data fetching | TanStack Query + Fetch API |
| i18n          | i18next + react-i18next    |
| Styles        | SCSS                       |
| Data source   | Wikimedia Feed API         |

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

Development server default URL: `http://localhost:5173`.

## Architecture

- `src/components`: presentational building blocks for the shell, timeline and shared states
- `src/config`: application-level constants such as storage keys and API base URLs
- `src/hooks`: reusable state and data hooks for theme, date query params and historical events
- `src/i18n`: i18next bootstrap plus `en` and `es` locale bundles
- `src/lib`: framework setup such as the shared React Query client
- `src/pages`: route-level screens
- `src/services`: external API clients and response mapping
- `src/styles`: global design tokens, mixins and base styles
- `src/types`: shared TypeScript contracts
- `src/utils`: pure utility functions

## Data flow

1. `useTimelineDate` reads `month` and `day` from the URL and normalizes invalid values.
2. `useOnThisDayEvents` requests Wikimedia data and caches the result by date.
3. `fetchOnThisDayEvents` maps the raw API response into a stable `TimelineEvent` model.
4. `Timeline` renders the normalized events and handles scroll and pointer interactions.

## Deployment

The repo includes `netlify.toml` with SPA redirects configured for static deployment on Netlify.

## Data source

Historical data comes from the Wikimedia Feed API:

- Docs: `https://api.wikimedia.org/wiki/Feed_API/Reference/On_this_day`
- Endpoint pattern: `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/events/{month}/{day}`
