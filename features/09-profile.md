# Profile

**Status:** 🟡 Works locally, backend to do
**Started:** 2026-10-27 · **Last updated:** 2026-10-27
**Files:** `frontend/src/pages/ProfilePage.jsx`, `frontend/src/context/ProfileContext.js`, `frontend/src/context/ProfileProvider.jsx`

## Why
The profile is the input to the AI: the "describe yourself" text is used to find jobs and calculate the match score.

## Done
- [x] 2026-10-27: Shared profile state with Context (`useProfile()` → `profile`, `saveProfile`). Profile shape: `{ name, photo, about }`.
- [x] 2026-10-27: Change display name.
- [x] 2026-10-27: Upload a profile photo: checks type and size (≤ 5 MB), crops it to a square, and resizes it to 256×256 with a `<canvas>`. Remove photo falls back to initials.
- [x] 2026-10-27: "Describe yourself" textarea (max 2000 chars, live counter, hint text on what to write).
- [x] 2026-10-27: Draft → Save flow. Edits stay in a draft until **Save changes**. **Cancel** resets. Both buttons are disabled until something changes. Shows success/error messages.
- [x] 2026-10-27: Navbar avatar and name update after saving.
- [x] 2026-10-27: Persists in `localStorage` (key `nextrole.profile`).

## To do
- [ ] Store the profile via `GET/PUT /api/profile` (needs [Jobs API](05-jobs-api.md) + [Database](11-database.md)).
- [ ] Upload the photo to the server instead of storing it as a data URL.
- [ ] Add a `profile_version` that increases on every save, so cached AI matches know when to recalculate (see [AI matching](13-ai-matching.md)).
- [ ] Optional structured fields: skills list, years of experience, preferred location / job type.
- [ ] Warn before leaving the page with unsaved changes.

## What I learned
- **Draft state:** without it, the navbar would change on every keystroke and there would be no way to cancel.
- **Resizing images:** phone photos are several MB. A 256px JPEG is about 20 KB and fits easily in localStorage (about 5 MB total).
- **Hidden file input + ref:** the native file picker is hard to style, so a styled button calls `inputRef.current.click()`.
