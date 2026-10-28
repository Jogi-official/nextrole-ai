# Features

One file per feature. Each file tracks **what's done** (with dates) and **what still needs doing**, so this folder becomes the history of the project.

## Index

| # | Feature | Status | Last updated |
| --- | --- | --- | --- |
| 01 | [Project setup](01-project-setup.md) | ✅ Done | 2026-10-27 |
| 02 | [Navbar](02-navbar.md) | ✅ Done | 2026-10-27 |
| 03 | [Sidebar filters](03-sidebar-filters.md) | 🟡 Search works, other filters to do | 2026-10-28 |
| 04 | [Job listings & details](04-job-listings-and-details.md) | 🟡 UI done, logic to do | 2026-10-28 |
| 05 | [Jobs API (Node)](05-jobs-api.md) | 🟡 Skeleton only | 2026-10-26 |
| 06 | [Documentation](06-documentation.md) | ✅ Done (ongoing) | 2026-10-27 |
| 07 | [Routing](07-routing.md) | ✅ Done | 2026-10-28 |
| 08 | [Saved jobs](08-saved-jobs.md) | 🟡 Works locally, backend to do | 2026-10-27 |
| 09 | [Profile](09-profile.md) | 🟡 Works locally, backend to do | 2026-10-27 |
| 10 | [Resume upload](10-resume-upload.md) | 🟡 UI only | 2026-10-27 |
| 11 | [Database (SQL Server)](11-database.md) | ⬜ Planned | — |
| 12 | [Real job import](12-real-job-import.md) | ⬜ Planned | — |
| 13 | [AI matching](13-ai-matching.md) | ⬜ Planned | — |
| 14 | [Authentication](14-authentication.md) | ⬜ Planned | — |

**Status key:** ✅ Done · 🟡 Partly done · ⬜ Planned (not started)

## How to add or update a feature

1. Copy the template below into a new file: `NN-feature-name.md` (next number, lowercase, dashes).
2. When you finish something, move it from **To do** to **Done** and add the date.
3. Update the row in the index above.

```markdown
# Feature name

**Status:** ⬜ Planned
**Started:** YYYY-MM-DD · **Last updated:** YYYY-MM-DD
**Files:** `path/to/file.jsx`

## Why
What problem this solves for the user.

## Done
- [x] YYYY-MM-DD: what was finished

## To do
- [ ] what still needs doing

## What I learned
- Concepts, mistakes, and why things were done a certain way.
```
