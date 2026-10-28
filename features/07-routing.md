# Routing

**Status:** ✅ Done
**Started:** 2026-10-27 · **Last updated:** 2026-10-28
**Files:** `frontend/src/main.jsx`, `frontend/src/App.jsx`, `frontend/src/components/Navbar/SectionNavigator.jsx`, `frontend/src/components/Main/pages/NotFoundPage.jsx`

## Why
Each section needs its own URL so the back button, refresh, and bookmarks work.

## Done
- [x] 2026-10-27: Installed `react-router` v8 (one package; `react-router-dom` isn't needed anymore).
- [x] 2026-10-27: `<BrowserRouter>` in `main.jsx`. Routes in `App.jsx`:
  - `/` → Home (`Main`)
  - `/saved` → `SavedPage`
  - `/profile` → `ProfilePage`
  - anything else (`*`) → `NotFoundPage`
- [x] 2026-10-27: Navbar tabs use `NavLink`, so the active tab is highlighted automatically.
- [x] 2026-10-28: 404 page (`NotFoundPage`) for unknown URLs, replacing the silent redirect to `/`. It shows the bad path, plus **Back to jobs**, **Go back** (`navigate(-1)`), and links to Saved/Profile.

## To do
- [ ] Switch to **Data mode** (`createBrowserRouter` + `RouterProvider`) in Phase 1, so pages can use `loader`s to fetch from the API.
- [ ] Layout route with `<Outlet />` for the Navbar (comes with Data mode).
- [ ] Error page (`errorElement`).
- [ ] When deploying: configure the host's SPA fallback (serve `index.html` for every URL).

## What I learned
- **SPA:** one HTML page; React swaps what's on screen. The router connects URLs to components.
- **React Router's 3 modes:**
  - **Declarative:** `<Routes>`/`<Route>` in JSX. What we use now.
  - **Data:** routes as an array, outside React. Adds `loader`/`action`.
  - **Framework:** a full framework, like Next.js.
- **Catch-all route (`path="*"`):** matches any URL the routes above it didn't. Showing a 404 is better than silently redirecting, because the user learns the link was wrong instead of wondering why they landed on Home.
- We chose Declarative for now because there's no API data to load yet. We'll switch when there is.
