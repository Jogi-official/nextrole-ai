# Navbar

**Status:** ✅ Done
**Started:** 2026-10-17 · **Last updated:** 2026-10-27
**Files:** `frontend/src/components/Navbar/` (`Navbar.jsx`, `Logo.jsx`, `SectionNavigator.jsx`, `Profile.jsx`)

## Why
Top bar with the brand, the main sections (Home / Saved / Profile), and the user's avatar.

## Done
- [x] 2026-10-17: First `Navbar.jsx` with Tailwind.
- [x] 2026-10-21: Split into `Logo`, `SectionNavigator`, `Profile` components in `components/Navbar/`.
- [x] 2026-10-25: Final design, responsive (section tabs move below the logo on mobile).
- [x] 2026-10-27: Tabs are real links (`NavLink`). The blue underline follows the current page.
- [x] 2026-10-27: Logo links to Home.
- [x] 2026-10-27: Avatar shows the user's uploaded photo (or initials) and name from the profile, and links to `/profile`.

## To do
- [ ] Profile dropdown menu (the chevron does nothing yet): e.g. "Edit profile", "Log out" after [Authentication](14-authentication.md).
- [ ] Delete unused `navbar.module.css` (nothing imports it).

## What I learned
- **Component splitting:** small components (`Logo`, `Profile`…) are easier to read and change than one big file.
- **`<a href>` vs `<Link>`:** `<a>` reloads the whole page and loses React state. `<Link>` changes the URL without reloading.
- **`NavLink` + `end`:** `NavLink` gives you `isActive`. Home needs `end` because every URL starts with `/`.
