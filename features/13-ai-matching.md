# AI matching

**Status:** ⬜ Planned
**Started:** — · **Last updated:** —
**Files:** `ai-service/` (to create)

## Why
The core of the app: a match score, matching/missing skills, and "why this fits you" for every job.

## Done
- Nothing yet. The UI for it already exists (score ring, skills, reasons in `JobDetails.jsx`) with mock data.

## To do
- [ ] Create `ai-service/` with FastAPI: `POST /analyze` takes `{ profile, job }`.
- [ ] Step 1, **Extract (LLM):** skills / years / roles from the profile + resume and from the job description, as JSON validated with Pydantic.
- [ ] Step 2, **Score (code):** matching = profile ∩ job skills, missing = job − profile, weighted score.
- [ ] Step 3, **Explain (LLM):** short summary + reasons, based on the step 2 facts.
- [ ] Cache results in `job_matches` by `(profile_version, job_id)`.
- [ ] Ollama locally (`llama3.1:8b` / `qwen2.5:7b`), OpenAI for comparison, using the same `openai` SDK.
- [ ] (Optional) embedding similarity blended into the score.

## Notes
- Don't ask the LLM for a 0–100 score. It gives a different number each time. The LLM understands text; the code does the math.
