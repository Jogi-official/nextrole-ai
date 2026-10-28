# Job listings & details

**Status:** 🟡 UI done, logic to do
**Started:** 2026-10-25 · **Last updated:** 2026-10-28
**Files:** `frontend/src/components/Main/Main.jsx`, `components/JobListings.jsx`, `components/JobDetails.jsx`, `components/CompanyLogo.jsx`, `components/Icon.jsx`, `frontend/src/data/jobs.js`

## Why
The Home screen: a list of job cards and a detail panel showing the match score, matching/missing skills, and reasons a job fits.

## Done
- [x] 2026-10-21: 3-column grid layout in `Main.jsx` (sidebar | list | details), with responsive breakpoints.
- [x] 2026-10-25: Job cards with match %, company logo, location/type/level, skills (+N more), posted date, save and apply buttons.
- [x] 2026-10-25: Sort by Most Relevant / Company A–Z / Job Title.
- [x] 2026-10-25: Details panel with a match score ring, matching & missing skills, "Why this is a great match" reasons, and an Apply link.
- [x] 2026-10-25: `Icon.jsx` (inline SVG icons) and `CompanyLogo.jsx`.
- [x] 2026-10-27: Moved mock jobs to `src/data/jobs.js` so other pages can use them.
- [x] 2026-10-27: Save buttons (card + details panel) use the shared [Saved jobs](08-saved-jobs.md) state and stay in sync.
- [x] 2026-10-28: Job list filters by the sidebar search text. The "Found N jobs" count updates to match.
- [x] 2026-10-28: "No jobs found" empty state when the search matches nothing, with a **Clear search** button.

## To do
- [ ] Clicking a card highlights it, but the details panel always shows job #1. Lift `selectedJob` up into `Main.jsx` and pass it to `JobDetails`.
- [ ] Merge the two mock data sets (`data/jobs.js` and the `jobDetails` object in `JobDetails.jsx`).
- [ ] "Back to results" button does nothing (useful on mobile).
- [ ] Apply button on cards does nothing (details panel's Apply link works).
- [ ] Load jobs from `GET /api/jobs` instead of mock data.
- [ ] Loading state (once data comes from the API).
- [ ] Real match data from [AI matching](13-ai-matching.md).

## What I learned
- **Sorting without changing state:** `[...jobs].sort(...)` copies the array first, because `.sort()` changes the original.
- **Derived data:** `filteredJobs` isn't stored in state. It's calculated from `jobs` + `search` on every render. Storing it separately would mean keeping two copies in sync, which is a common source of bugs.
- **`event.stopPropagation()`:** the save button sits inside a clickable card. Without it, saving would also select the card.
