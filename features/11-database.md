# Database (SQL Server)

**Status:** ⬜ Planned
**Started:** — · **Last updated:** —
**Files:** `database/schema.sql` (to create)

## Why
Store jobs, profiles, saved jobs, and cached AI results permanently and share them across devices. Today everything is mock data or `localStorage`.

## Done
- Nothing yet (empty `database/` folder exists).

## To do
- [ ] Install SQL Server Express + SSMS, create a `job_finder` database and an app login.
- [ ] `database/schema.sql` with tables: `users`, `profiles`, `jobs`, `saved_jobs`, `job_matches`.
- [ ] `jobs` unique on `(source, external_id)` to avoid duplicates.
- [ ] Seed script with the mock jobs from `frontend/src/data/jobs.js`.
- [ ] Connect from `jobs_api` with the `mssql` package, using `DB_*` env vars.

## Notes
- SQL Server has no JSON column type. JSON goes in `NVARCHAR(MAX)` with an `ISJSON` check.
