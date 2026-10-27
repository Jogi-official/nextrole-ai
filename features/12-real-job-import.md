# Real job import

**Status:** ⬜ Planned
**Started:** — · **Last updated:** —
**Files:** prototype in `utils/jobs_api.py`

## Why
Show real jobs instead of mock data.

## Done
- [x] 2026-10-17: Python prototype `fetch_jobs(search, limit)` that calls the Remotive API and returns `{ id, title, company, location, url, published_at, source }`.

## To do
- [ ] Pick the source(s): Remotive, Adzuna, JSearch, Greenhouse/Lever.
- [ ] Fetch on a schedule in Node with `node-cron`, save to SQL Server.
- [ ] De-duplicate by `(source, external_id)`.
- [ ] Map API fields to our job shape (type, level, skills…).
- [ ] Never call the external API on page load. Always serve from the database.

## Notes
- Don't scrape LinkedIn or Indeed (against their terms of service, and they'll block you).
