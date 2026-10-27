# Saved jobs

**Status:** 🟡 Works locally, backend to do
**Started:** 2026-10-27 · **Last updated:** 2026-10-27
**Files:** `frontend/src/pages/SavedPage.jsx`, `frontend/src/context/SavedJobsContext.js`, `frontend/src/context/SavedJobsProvider.jsx`, `frontend/src/context/storage.js`

## Why
Let the user bookmark jobs and come back to them later.

## Done
- [x] 2026-10-27: Shared saved-jobs state with React Context (`useSavedJobs()` → `savedIds`, `isSaved`, `toggleSave`).
- [x] 2026-10-27: Save buttons on job cards and in the details panel both use it, so they stay in sync.
- [x] 2026-10-27: Saved page lists saved jobs, with Remove and Apply buttons, and an empty state with a "Browse jobs" link.
- [x] 2026-10-27: Saved ids persist in `localStorage` (key `nextrole.savedJobs`), so they survive a refresh.

## To do
- [ ] Store saved jobs in the database via `POST/DELETE/GET /api/saved` (needs [Jobs API](05-jobs-api.md) + [Database](11-database.md)).
- [ ] Remove the `localStorage` stand-in after that.
- [ ] Apply button on saved cards does nothing yet.
- [ ] Clicking a saved job could open its details.
- [ ] Show the saved count on the navbar tab.

## What I learned
- **Context:** a shared box above the components, so any component can read the same data without passing props through every level.
- **Why two files:** the `react-refresh` lint rule wants `.jsx` files to export only components. So the context + hook go in `.js` and the Provider in `.jsx`.
- **localStorage can throw** (private mode, storage full), so reads and writes are wrapped in `try/catch` (`storage.js`).
