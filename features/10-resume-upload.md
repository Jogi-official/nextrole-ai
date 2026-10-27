# Resume upload

**Status:** 🟡 UI only
**Started:** 2026-10-27 · **Last updated:** 2026-10-27
**Files:** `frontend/src/pages/ProfilePage.jsx` (right-hand "Resume" card)

## Why
The resume gives the AI much better information than a short description, which makes match scores more accurate.

## Done
- [x] 2026-10-27: Resume card on the right of the Profile page (stacks below the form on smaller screens).
- [x] 2026-10-27: Drag-and-drop zone or click to browse.
- [x] 2026-10-27: Accepts PDF / DOC / DOCX up to 5 MB, with error messages.
- [x] 2026-10-27: Shows the chosen file (type badge, name, size) with a Remove button.
- [x] 2026-10-27: Note telling the user the file isn't uploaded yet.

## To do
- [ ] Upload endpoint in Node (multipart form data, e.g. with `multer`).
- [ ] Node sends the file to the Python AI service → extract text with `pypdf`.
- [ ] Save the extracted text in `profiles` and bump `profile_version`.
- [ ] Show the uploaded resume after a refresh (it's only in component state right now, so it disappears).
- [ ] Upload progress and errors in the UI.

## What I learned
- **Drag and drop:** `onDragOver` must call `event.preventDefault()`, or the browser opens the file instead of dropping it.
- **`input.value = ""` after picking:** lets you pick the same file again (otherwise `onChange` doesn't fire).
