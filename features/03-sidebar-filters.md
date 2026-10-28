# Sidebar filters

**Status:** 🟡 UI done, logic to do
**Started:** 2026-10-21 · **Last updated:** 2026-10-28
**Files:** `frontend/src/components/Main/components/Sidebar.jsx`, `sidebar.module.css`, `frontend/src/components/Main/Main.jsx`

## Why
Let the user narrow jobs by location, job type, experience level, and skills.

## Done
- [x] 2026-10-21: Sidebar with search, location dropdown, job type and experience checkboxes, skills input, quick-filter chips, and the AI info card.
- [x] 2026-10-21: Each filter has its own `useState`. A shared `toggleItem` helper adds/removes values from a list.
- [x] 2026-10-25: Styling polish.
- [x] 2026-10-28: Search box works. The text lives in `Main.jsx` (lifted state) and is passed to `Sidebar` (as a controlled input) and to `JobListings`. The list filters as you type, matching job title, company, or skills (case-insensitive).

## To do
- [ ] The other filters (location, type, level, skills, quick filters) don't change the job list yet. The Search button only does `console.log(...)`.
- [ ] Lift those filters into `Main.jsx` too (or into the URL with `useSearchParams`) so `JobListings` can use them.
- [ ] Send filters to `GET /api/jobs?location=...&type=...&level=...&skills=...` once the [Jobs API](05-jobs-api.md) is real.

## What I learned
- **Controlled inputs:** the input's value comes from state, and `onChange` updates state. React is the single source of truth.
- **Lifting state up:** when two sibling components need the same data, keep the state in their closest shared parent (`Main`) and pass it down as props. Siblings can't read each other's state directly.
- **Updating a list in state:** create a new array (`filter` / spread) rather than changing the old one. React notices the change because it's a new array.
