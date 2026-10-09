# Horizon Properties — Development Guide

## Stack
- **Vite 5 + React 18 + TypeScript** — frontend SPA
- **Tailwind CSS** — styling (config in `tailwind.config.js`)
- **Framer Motion** — subtle entrance/hover animations
- **React Router DOM** — routing (`/`, `/properties`, `/properties/:slug`)
- **Lucide React** — icons

## Running Locally
```bash
npm install
npm run dev   # serves on http://localhost:3000
```

## Docker (Base44 sandbox)
```bash
docker compose -f docker-compose.base44.yml up -d --build
```
- Node 22-slim base, source bind-mounted at `/app`
- `npm install` runs on container start, then `npm run dev`
- Vite dev server binds `0.0.0.0:3000` with live reload
- Healthcheck: `GET /` via node fetch

## Project Structure
```
src/
  components/   — reusable UI (Header, Footer, PropertyCard, Button, ImageGallery, etc.)
  sections/    — homepage sections (Hero, About, FeaturedProperties, Services, Team, CTA)
  pages/       — route pages (Home, Properties, PropertyDetail)
  data/        — static data (properties, team, services)
  hooks/       — useFavorites (localStorage-backed)
```

## Design System
- **Navy** `#0A192F` — primary backgrounds, headers, CTAs
- **Champagne** `#C5A059` — accents, labels, fine borders, icons
- **Ivory** `#F8F5F0` — secondary section backgrounds
- **Surface** `#F5F7FA` — CTA banner background
- Font: **Plus Jakarta Sans** (loaded via Google Fonts in `index.html`)
- Typography scale uses `clamp()` for fluid responsive sizing

## Key Decisions
- Property data is static in `src/data/properties.ts` — structured for easy future DB connection
- Favorites persist in `localStorage` (key: `horizon-favorites`)
- Property carousel uses native scroll-snap + mouse drag (no heavy carousel library)
- Images use Unsplash CDN with `?w=&q=80&auto=format&fit=crop` params
- All images lazy-loaded except hero (fetchPriority high)
