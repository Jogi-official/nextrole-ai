# Sidebar filters

**Status:** 🟡 UI done, logic to do
**Started:** 2026-10-21 · **Last updated:** 2026-10-25
**Files:** `frontend/src/components/Main/components/Sidebar.jsx`, `sidebar.module.css`

## Why
Let the user narrow jobs by location, job type, experience level, and skills.

## Done
- [x] 2026-10-21: Sidebar with search, location dropdown, job type and experience checkboxes, skills input, quick-filter chips, and the AI info card.
- [x] 2026-10-21: Each filter has its own `useState`. A shared `toggleItem` helper adds/removes values from a list.
- [x] 2026-10-25: Styling polish.

## To do
- [ ] Filters don't change the job list yet. The Search button only does `console.log(...)`.
- [ ] Lift filter state up (or into the URL with `useSearchParams`) so `JobListings` can use it.
- [ ] Send filters to `GET /api/jobs?location=...&type=...&level=...&skills=...` once the [Jobs API](05-jobs-api.md) is real.
- [ ] Search input (job title / keywords) isn't stored in state yet.

## What I learned
- **Controlled inputs:** the input's value comes from state, and `onChange` updates state. React is the single source of truth.
- **Updating a list in state:** create a new array (`filter` / spread) rather than changing the old one. React notices the change because it's a new array.
