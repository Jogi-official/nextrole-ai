# CLAUDE.md

Guidance for Claude Code when working in this repository.

## How to talk to me (most important)

I am learning. **Always explain as if I don't know anything yet.**

- For every change, explain **what** you did, **why** you did it that way, and **what would go wrong** if we didn't.
- Define new terms the first time they appear (e.g. "middleware", "CORS", "props", "migration").
- When there are several ways to do something, tell me which one we picked and why the others weren't chosen.
- Prefer small steps I can follow and run myself over large changes all at once.
- After a change, tell me how to run or test it so I can see it working.
- If I'm about to do something that's a bad practice, stop and teach me the better way.
- Add in features.md whenever i finish some task with the details about the feature

## What this project is

**NextRole.ai** — an AI job finder. It pulls real job listings, compares them to the user's profile/resume, and shows a match score, matching/missing skills, and reasons a job fits. It's a learning project; `README.md` holds the full roadmap (Phases 1–5), architecture, DB schema plan, and AI matching design — read it before larger tasks.

Target architecture:

```
React (frontend/) ──► Node + Express (jobs_api/) ──► SQL Server
                              │
                              ▼
                     Python + FastAPI (ai-service/, not built yet) ──► Ollama / OpenAI
```

- React talks **only** to the Node API.
- Node owns all database access.
- The Python AI service is stateless and private (never called from the browser, never touches the DB).

## Current state (what actually exists)

| Folder / file                  | Status                                                                                                                     |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `frontend/`                    | UI complete, but **all data is hard-coded mock data** inside the components. No API calls yet.                             |
| `jobs_api/`                    | Express skeleton. `/api/health` works; `/api/jobs` and `/api/jobs/:id` are stubs (`[]` / 404). No database connection yet. |
| `main.py`, `utils/jobs_api.py` | Python prototype that fetches jobs from the Remotive API. Planned to move into `ai-service/`.                              |
| `database/`                    | Empty folder (untracked). `schema.sql` described in README doesn't exist yet.                                              |

We're at the start of **README Phase 1** (Node API + SQL Server with mock data).

## Commands

There is no test suite and no root-level build. Each service runs from its own folder.

```bash
# Frontend (Vite dev server, http://localhost:5173)
cd frontend
npm install
npm run dev        # dev server with hot reload
npm run build      # production build -> frontend/dist
npm run lint       # ESLint

# Jobs API (http://localhost:4000)
cd jobs_api
npm install
cp .env.example .env
npm run dev        # node --watch, auto-restarts on file changes
npm start

# Python prototype (from repo root, uses uv)
uv sync
uv run main.py
```

## Code layout and conventions

### Frontend (`frontend/src`)

- React 19 + Vite 8, plain JavaScript (`.jsx`), ES modules.
- **Routing:** React Router v8 (`react-router` package — import from `"react-router"`, not `react-router-dom`). `BrowserRouter` is in `main.jsx`; routes are in `App.jsx`: `/` → `Main` (Home), `/saved` → `components/Main/pages/SavedPage`, `/profile` → `components/Main/pages/ProfilePage`, anything else (`*`) → `components/Main/pages/NotFoundPage`. Use `<Link>`/`<NavLink>` for internal links, never `<a href>` (that reloads the page).
- **Shared state** lives in `src/context/`: `ProfileProvider` (name, photo as data URL, "about me" prompt) and `SavedJobsProvider` (saved job ids). Read them with the `useProfile()` / `useSavedJobs()` hooks. Context + hook are in a `.js` file and the Provider in a `.jsx` file because the `react-refresh` lint rule wants component files to export only components. Both currently persist to `localStorage` (via `context/storage.js`) as a stand-in until the API has `/api/profile` and `/api/saved`.
- Mock jobs list is in `src/data/jobs.js` (shared by Home and Saved). `JobDetails.jsx` still has its own richer mock `jobDetails` object.
- Resume upload on the Profile page is **UI only**: the file stays in component state and isn't sent anywhere (README Phase 3 will wire it to Node → Python).
- `components/Main/Main.jsx` is a 3-column CSS grid: `Sidebar` (filters) | `JobListings` | `JobDetails`. Child components live in `components/Main/components/`.
- `components/Navbar/` — `Logo`, `SectionNavigator`, `Profile`.
- `components/Icon.jsx` — inline SVG icon set; use `<Icon name="..." />` and add new icons to the `icons` map rather than adding an icon library.
- **Styling is mixed on purpose:** layout containers (`Main`, `Sidebar`, `Navbar`) use **CSS Modules** (`*.module.css`, imported as `styles`); newer/inner components (`JobListings`, `JobDetails`, `Navbar` markup) use **Tailwind** utility classes. Follow whichever style the file you're editing already uses.
- Job _selection_ is not shared yet — `JobDetails` takes a `jobId` prop (defaults to `1`); nothing passes the selected card from `JobListings` to it.
- Mock job shape (in `data/jobs.js`): `{ id, title, company, location, experience, type, level, match, description, skills[], posted }`. Keep the future API response compatible with this.

### Jobs API (`jobs_api/src`)

- Express 5, ES modules (`"type": "module"`), no build step.
- `server.js` starts the server; `app.js` builds the app (CORS, JSON body parsing, routes, 404 handler, error handler). Keeping them separate lets tests import `app` without opening a port.
- Routes go in `src/routes/*.js` as an `express.Router()` and are mounted in `app.js` under `/api/...`.
- Env vars are loaded by Node itself via `--env-file-if-exists=.env` (no `dotenv` package needed). See `.env.example`.

### Python

- Managed with **uv** (`pyproject.toml`, `uv.lock`), Python ≥ 3.10, virtualenv in `.venv/`.

## Known issues / gotchas

- Always run `npm install` from inside the service folder (`frontend/` or `jobs_api/`), never the repo root. Tailwind was once installed at the root by mistake, which broke the frontend build.
- **Database mismatch:** README and plan say **SQL Server** (`mssql` package), but the TODO comments in `jobs_api/src/routes/jobs.js` say "MySQL". SQL Server is the intended choice.
- **No root `.gitignore`**, so `utils/__pycache__/` got committed. Add one with `node_modules/`, `.env`, `__pycache__/`, `.venv/`, `dist/`.
- `.vscode/launch.json` points Chrome at port 8080, but Vite runs on 5173.
- Never commit `.env` files or API keys.
- Don't scrape LinkedIn/Indeed (terms of service) — use APIs like Remotive, Adzuna, JSearch, Greenhouse/Lever.

## AI design rule (for Phase 4)

Don't let the LLM invent the match score. **LLM extracts** structured skills (validated with Pydantic) → **code computes** the score from set overlap → **LLM explains** the result. Cache results by `(profile_version, job_id)`. Details in README "How the AI Match Works".
