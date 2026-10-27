# Jobs API (Node + Express)

**Status:** 🟡 Skeleton only
**Started:** 2026-10-26 · **Last updated:** 2026-10-26
**Files:** `jobs_api/src/server.js`, `jobs_api/src/app.js`, `jobs_api/src/routes/jobs.js`, `jobs_api/.env.example`

## Why
The only backend the React app talks to. It owns the database and later calls the AI service.

## Done
- [x] 2026-10-26: Express 5 app with CORS, JSON body parsing, 404 handler, and error handler.
- [x] 2026-10-26: `server.js` (starts the server) split from `app.js` (builds the app), so tests can import the app without opening a port.
- [x] 2026-10-26: `GET /api/health` returns `{ status: "ok" }`.
- [x] 2026-10-26: Stub routes `GET /api/jobs` (returns `[]`) and `GET /api/jobs/:id` (returns 404).
- [x] 2026-10-26: `.env` loaded by Node's built-in `--env-file-if-exists` (no `dotenv` package). `npm run dev` auto-restarts with `--watch`.

## To do
- [ ] Connect to SQL Server with `mssql` (see [Database](11-database.md)). Fix the TODO comments that say "MySQL".
- [ ] `GET /api/jobs` with filters: location, type, level, skills.
- [ ] `GET /api/jobs/:id`.
- [ ] `POST /api/saved`, `DELETE /api/saved/:jobId`, `GET /api/saved` (for [Saved jobs](08-saved-jobs.md)).
- [ ] `GET /api/profile`, `PUT /api/profile` (for [Profile](09-profile.md)).
- [ ] Resume upload endpoint (for [Resume upload](10-resume-upload.md)).
- [ ] Input validation.
- [ ] Frontend reads the API URL from `VITE_API_URL`.

## What I learned
- **Middleware:** functions that run on every request, in order (`cors()`, `express.json()`…). Error handlers take 4 arguments `(err, req, res, next)`.
- **CORS:** browsers block requests to a different origin (port 5173 → 4000) unless the server allows it.
