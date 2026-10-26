# NextRole.ai — AI Job Finder

An AI-powered job finder that pulls real job listings, compares them with your profile and resume, and shows a **match score**, **matching / missing skills**, and **reasons why a role fits you**.

This is a learning project covering full-stack development (React, Node.js, MySQL) and applied AI (LLMs, structured outputs, embeddings) end to end.

![NextRole.ai UI](image.png)

---

## Table of Contents

- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Roadmap](#roadmap)
  - [Phase 1 — Node API + MySQL with mock data](#phase-1--node-api--mysql-with-mock-data)
  - [Phase 2 — Real jobs from an external API](#phase-2--real-jobs-from-an-external-api)
  - [Phase 3 — Profile section](#phase-3--profile-section)
  - [Phase 4 — AI layer](#phase-4--ai-layer)
  - [Phase 5 — Polish](#phase-5--polish)
- [How the AI Match Works](#how-the-ai-match-works)
- [UI ↔ Data Mapping](#ui--data-mapping)
- [Database Schema (draft)](#database-schema-draft)
- [Production Deployment](#production-deployment)
- [Getting Started](#getting-started)
- [Learning Tips](#learning-tips)

---

## Architecture

```
React (UI)  ──►  Node.js + Express (main API)  ──►  MySQL
                        │
                        ▼
                Python + FastAPI (AI service)  ──►  Ollama (local) / OpenAI
```

| Layer                 | Responsibility                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------------- |
| **React**             | UI only. Talks **only** to the Node API.                                                                      |
| **Node.js + Express** | Owns users, profiles, jobs, saved jobs, and all MySQL access. Fetches jobs from external APIs on a schedule.  |
| **MySQL**             | Stores jobs, profiles, and cached AI match results.                                                           |
| **Python + FastAPI**  | Stateless AI service: receives `{ profile, job }`, returns the analysis. Never touches the database directly. |
| **Ollama / OpenAI**   | The LLM. Ollama runs locally for free; OpenAI is used for comparison.                                         |

> **One codebase for both LLMs:** Ollama exposes an OpenAI-compatible endpoint at `http://localhost:11434/v1`.
> Write the AI code once with the `openai` Python SDK and switch providers by changing only `base_url` and the model name.

```python
from openai import OpenAI

# Local (free) — Ollama
client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")
MODEL = "llama3.1:8b"   # or "qwen2.5:7b"

# Cloud — OpenAI
# client = OpenAI()      # reads OPENAI_API_KEY from .env
# MODEL = "gpt-4o-mini"
```

---

## Tech Stack

| Area             | Tools                                                   |
| ---------------- | ------------------------------------------------------- |
| Frontend         | React 19, Vite, Tailwind CSS, CSS Modules               |
| Backend API      | Node.js, Express, `mysql2`, `node-cron`                 |
| Database         | MySQL                                                   |
| AI service       | Python ≥ 3.10, FastAPI, Pydantic, `openai` SDK, `pypdf` |
| LLMs             | Ollama (`llama3.1:8b` / `qwen2.5:7b`), OpenAI           |
| Package managers | npm (JS), uv (Python)                                   |

---

## Project Structure

A **monorepo**: one repository, one folder per service. Each service is self-contained — its own dependencies, its own `.env`, and (later) its own `Dockerfile`. The root only holds what ties the services together.

```
job-finder/
├── frontend/          # React (Vite)
├── api/               # Node.js + Express + MySQL   ← your "jobApi"
├── ai-service/        # Python + FastAPI
├── database/          # SQL schema / migrations
├── docker-compose.yml # starts all services together (later)
├── .gitignore
└── README.md
```

> **Why `api/` and not `jobApi/`?** It will serve users, profiles, saved jobs, and AI results — not just jobs.

### Restructure checklist (current repo → target layout)

- [ ] **Remove root `package.json` / `node_modules`** — `tailwindcss`, `@tailwindcss/vite`, and `lucide-react` belong to the frontend:
  ```bash
  cd frontend && npm install tailwindcss @tailwindcss/vite
  ```
  The frontend currently works only because Node resolves packages from parent folders; a fresh clone or production build would fail.
- [ ] **Move Python files into `ai-service/`** — `main.py`, `utils/` (incl. the Remotive prototype), `pyproject.toml`, `uv.lock`
- [ ] **Add a root `.gitignore`** — `node_modules/`, `.env`, `__pycache__/`, `.venv/`, `dist/`
- [ ] **Create `api/`** with a basic Express setup

---

## Roadmap

Build in phases — **each phase should run on its own before starting the next.**

### Phase 1 — Node API + MySQL with mock data

- [ ] Set up Express server and MySQL connection
- [ ] Create tables: `users`, `profiles`, `jobs`, `saved_jobs`, `job_matches`
- [ ] Move the mock jobs from `JobListings.jsx` into MySQL (seed script)
- [ ] Routes:
  - `GET /api/jobs` — list with filter query params (location, type, level, skills)
  - `GET /api/jobs/:id` — single job
  - `POST /api/saved` / `DELETE /api/saved/:jobId` — save / unsave
  - `GET /api/profile` / `PUT /api/profile`
- [ ] Fetch from React; wire filters, sorting, and selected job to real data

**You learn:** REST API design, SQL, connecting frontend ↔ backend.

### Phase 2 — Real jobs from an external API

- [ ] Pick a source:
  - **Remotive** — free, remote jobs (already prototyped in `utils/jobs_api.py`)
  - **Adzuna** — free tier, many countries
  - **JSearch** (RapidAPI) — aggregates many boards
  - **Greenhouse / Lever** public job-board APIs — many companies use them
- [ ] Fetch on a schedule with `node-cron`, store in MySQL, de-duplicate by `(source, external_id)`
- [ ] Never call the external API on every page load — serve from MySQL

> ⚠️ Don't scrape LinkedIn or Indeed — it violates their terms and will get blocked.

**You learn:** third-party APIs, scheduled jobs, data cleaning and de-duplication.

### Phase 3 — Profile section

- [ ] Profile page: text area for skills and career goals
- [ ] Resume upload (PDF)
- [ ] Node stores the file → sends it to Python → Python extracts text with `pypdf`
- [ ] Save the extracted text and a `profile_version` in MySQL

### Phase 4 — AI layer

The core learning part. See [How the AI Match Works](#how-the-ai-match-works).

- [ ] FastAPI endpoint `POST /analyze` taking `{ profile, job }`
- [ ] Extraction step with structured JSON output + Pydantic validation
- [ ] Deterministic scoring in code
- [ ] (Optional) embedding similarity
- [ ] LLM-written explanation
- [ ] Cache results in `job_matches`
- [ ] Compare Ollama vs OpenAI on the same test cases

**You learn:** prompt design, structured outputs, embeddings, why LLMs shouldn't do the math, and caching.

### Phase 5 — Polish

- [ ] Authentication (JWT)
- [ ] Loading states and error handling in the UI
- [ ] Run AI analysis as a background task so the UI never blocks
- [ ] Optional: Docker Compose to start everything with one command

---

## How the AI Match Works

> **Don't ask the LLM to "give a score from 0–100".** It will invent a different number every time.
> Split the work so the LLM does what it is good at (understanding text) and your code does the math.

```
Resume ──► 1. EXTRACT (LLM) ──► { skills, years, roles }   ─┐
                                                            ├──► 2. SCORE (code) ──► 3. EXPLAIN (LLM) ──► UI
Job    ──► 1. EXTRACT (LLM) ──► { required, nice_to_have } ─┘
```

1. **Extract — LLM**
   Turn the resume and each job description into structured JSON (skills, years of experience, roles).
   Use JSON mode / structured outputs and validate with **Pydantic**. Job extractions are cached once per job.

2. **Score — your code**
   - `matchingSkills` = profile skills ∩ job skills
   - `missingSkills` = job skills − profile skills
   - `match` = weighted overlap (required skills weigh more than nice-to-have)
   - _Later:_ add **embedding similarity** between resume and job text and blend it into the score

3. **Explain — LLM**
   Given the facts from step 2, the LLM writes the short summary and the "Why this is a great match" reasons. It explains — it does not decide.

**Caching:** store results in `job_matches` keyed by `(profile_version, job_id)`. The UI just reads them; the LLM is only called again when the profile or the job changes.

---

## UI ↔ Data Mapping

| UI element                                  | Source                |
| ------------------------------------------- | --------------------- |
| `match` (e.g. 92%)                          | Step 2 scoring (code) |
| `matchingSkills` / `missingSkills`          | Step 2 set comparison |
| Match summary ("Great match! …")            | Step 3 LLM            |
| `reasons` ("Why this is a great match")     | Step 3 LLM            |
| title, company, location, type, posted date | Job API → MySQL       |

---

## Database Schema (draft)

```sql
CREATE TABLE users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE profiles (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  user_id         INT NOT NULL,
  resume_text     MEDIUMTEXT,
  skills          JSON,
  goals           TEXT,
  profile_version INT NOT NULL DEFAULT 1,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE jobs (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  source           VARCHAR(50)  NOT NULL,
  external_id      VARCHAR(100) NOT NULL,
  title            VARCHAR(255) NOT NULL,
  company          VARCHAR(255),
  location         VARCHAR(255),
  type             VARCHAR(50),
  level            VARCHAR(50),
  description      MEDIUMTEXT,
  extracted_skills JSON,          -- cached LLM extraction
  apply_url        VARCHAR(500),
  posted_at        DATETIME,
  UNIQUE KEY uq_source_job (source, external_id)
);

CREATE TABLE saved_jobs (
  user_id  INT NOT NULL,
  job_id   INT NOT NULL,
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, job_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (job_id)  REFERENCES jobs(id)
);

CREATE TABLE job_matches (
  profile_id      INT NOT NULL,
  profile_version INT NOT NULL,
  job_id          INT NOT NULL,
  match_score     TINYINT NOT NULL,
  matching_skills JSON,
  missing_skills  JSON,
  summary         TEXT,
  reasons         JSON,
  model           VARCHAR(100),   -- which LLM produced it
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (profile_id, profile_version, job_id),
  FOREIGN KEY (job_id) REFERENCES jobs(id)
);
```

---

## Production Deployment

```
Browser ──► frontend  (static files: Vercel / Netlify / nginx)
               │
               ▼
            api (Node)  ──► MySQL (managed cloud MySQL)
               │
               ▼
            ai-service (Python)  ── private, not exposed publicly
```

| Service        | How it runs in production                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------------------------- |
| **frontend**   | `npm run build` → static files, host anywhere. Read the API URL from `VITE_API_URL`, never hard-code it.      |
| **api**        | The **only public backend**. Handles auth (JWT), CORS, rate limiting, and validation.                         |
| **ai-service** | Reachable **only from the API**, never from the browser — keeps the OpenAI key and LLM costs safe from abuse. |
| **MySQL**      | Managed database with automated backups.                                                                      |

- **Each service deploys independently** — e.g. redeploy the AI service without touching the frontend. This is the main benefit of the folder-per-service layout.
- **No monorepo tooling needed** (npm workspaces, Turborepo) at this size — plain folders are enough.

---

## Getting Started

### Prerequisites

- Node.js 20+
- Python 3.10+ and [uv](https://docs.astral.sh/uv/)
- MySQL 8+
- [Ollama](https://ollama.com/) (for local LLMs)

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Python (current prototype)

```bash
uv sync
uv run main.py        # fetches sample jobs from Remotive
```

> After the restructure, run these from inside `ai-service/`.

### Ollama

```bash
ollama pull llama3.1:8b
ollama serve          # serves http://localhost:11434
```

### Environment variables

Each service has its own `.env`:

```env
# frontend/.env
VITE_API_URL=http://localhost:4000

# api/.env
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=...
MYSQL_DATABASE=job_finder
AI_SERVICE_URL=http://localhost:8000
JWT_SECRET=...

# ai-service/.env
OPENAI_API_KEY=sk-...
OLLAMA_BASE_URL=http://localhost:11434/v1
```

> Keep `.env` in `.gitignore` — never commit API keys.

_Backend and AI service setup steps will be added as Phases 1 and 4 are built._

---

## Learning Tips

- **Commit at the end of every phase.** Don't start Phase 4 until Phases 1–3 work.
- **Keep prompts in files** under `ai-service/prompts/` so they're easy to tweak and compare.
- **Build a small test set** of resume ↔ job pairs and compare how Ollama and OpenAI score them — that comparison teaches a lot about model quality and consistency.
- **Log every LLM call** (prompt, model, response, time taken) while learning; it makes debugging prompts much easier.
