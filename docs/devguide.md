# Developer Guide & Change Log
**Last Updated:** Sun Jan 18 2026

## Project Overview
**Organization:** Elufa Systems
**Application:** Shortcut Keys Game & Knowledge Quiz Platform
**Description:** A gamified learning platform for Elufa Systems staff to master shortcut keys and Enterprise Performance Management (EPM) knowledge (Workday Adaptive, Oracle, etc.).

## Architecture
- **Frontend:** React (Vite), TypeScript, Tailwind CSS, shadcn-ui.
- **Backend:** Node.js, Express.
- **Database:** SQLite (`better-sqlite3`).
- **Testing:** Vitest.

## Directory Structure
- `src/`: Frontend source code.
    - `data/`: Quiz questions and static data (e.g., `workday-adaptive.ts`).
    - `components/`: React components.
    - `pages/`: Application views.
    - `services/`: API integration services.
- `server/`: Backend server code.
    - `routes/`: API endpoints.
    - `database.cjs`: Database connection and schema.
- `public/`: Static assets.

## Development Commands
- **Start Dev Server:** `npm run dev` (Frontend & Backend typically concurrent or proxied)
- **Build:** `npm run build`
- **Test:** `npm run test`
- **Lint:** `npm run lint`

---

## Change Log
*This section tracks updates, new features, and architectural changes per build.*

### [Sun Jan 18 2026] - Keyboard Handling & UX Improvements
- **Feature:** Added Mac user detection to display a helper note ("Use Ctrl instead of Cmd") during gameplay.
- **Fix:** Implemented "Implicit Shift" logic to correctly handle character keys that require Shift (e.g., `Ctrl`+`Shift`+`=` is now accepted for `Ctrl`+`+`).
- **Fix:** Improved system interruption handling; game now clears pressed keys on window blur (Alt+Tab) to prevent "stuck" keys.
- **Docs:** Updated `docs/testcases.md` with new cases `TC-SHORT-006` and `TC-SHORT-007`.

### [Sun Jan 18 2026] - Initial Documentation
- Created `docs/devguide.md`.
- Verified existing project structure and `package.json` scripts.
- Confirmed existence of question data banks for Workday Adaptive, Tagetik, Oracle, etc.

---

## Deprecated Functions / Components
*This section tracks code that has been deprecated or removed to ensure clean history.*

- *None at this stage.*
