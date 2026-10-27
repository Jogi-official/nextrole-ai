# Project setup

**Status:** ✅ Done
**Started:** 2026-10-15 · **Last updated:** 2026-10-27
**Files:** `pyproject.toml`, `uv.lock`, `main.py`, `utils/jobs_api.py`, `frontend/package.json`, `frontend/vite.config.js`

## Why
Get the basic tools in place: Python for the AI side, React for the UI.

## Done
- [x] 2026-10-15: Python project with **uv**. First prototype was a web scraper (`Utils/scraper.py`, BeautifulSoup) in a notebook (`jobfinder.ipynb`).
- [x] 2026-10-17: Replaced scraping with the **Remotive API** (`utils/jobs_api.py`, `fetch_jobs()`), run from `main.py`. Removed the notebook.
- [x] 2026-10-17: Created the React app with **Vite** in `frontend/`.
- [x] 2026-10-17: Added **Tailwind CSS v4** with Navbar (commit `3a8482a`).
- [x] 2026-10-26: Removed root `package.json`; Node packages belong inside each service folder.
- [x] 2026-10-27: Fixed broken build (`ENOENT ... tailwindcss/index.css`). Installed `tailwindcss` + `@tailwindcss/vite` 4.3.3 inside `frontend/`, deleted stray root `node_modules/`.

## To do
- [ ] Add a root `.gitignore` (`node_modules/`, `.env`, `__pycache__/`, `.venv/`, `dist/`).
- [ ] Remove committed `utils/__pycache__/` from git.
- [ ] Move Python files (`main.py`, `utils/`, `pyproject.toml`, `uv.lock`) into `ai-service/`.
- [ ] Fix `.vscode/launch.json` port (8080 → 5173).

## What I learned
- **Scraping vs APIs:** scraping breaks when a site's HTML changes and can break terms of service. A public API (Remotive) returns clean JSON and is allowed.
- **Where `npm install` runs matters.** Packages go into the `node_modules` next to the `package.json` you're in. Tailwind ended up in the root by mistake. It only "worked" because Node searches parent folders, and it broke as soon as a tool looked in `frontend/node_modules` directly.
- **`package.json` is the shopping list.** If a package isn't listed there, a fresh clone won't install it.
