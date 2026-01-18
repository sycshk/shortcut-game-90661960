# Elufa Systems Shortcut Game - Agent Guide

This document provides context and instructions for AI agents working on the Elufa Systems Shortcut Game project.

## 1. Project Overview
**Goal:** Develop a gamified learning platform for Elufa Systems staff to master keyboard shortcuts and Enterprise Performance Management (EPM) knowledge (Workday Adaptive, Oracle, etc.).
**Organization:** Elufa Systems (Consulting for System Implementation).

### Tech Stack
- **Frontend:** React 18, Vite, TypeScript.
- **Styling:** Tailwind CSS, shadcn-ui components.
- **Backend:** Node.js, Express.
- **Database:** SQLite (`better-sqlite3`).
- **Testing:** Vitest.
- **State Management:** React Query (`@tanstack/react-query`).

## 2. Build and Test Commands
Run these commands from the project root:

- **Install Dependencies:** `npm install`
- **Start Frontend Dev Server:** `npm run dev` (Runs Vite)
- **Build for Production:** `npm run build`
- **Run Tests:** `npm run test` (Runs Vitest)
- **Lint Code:** `npm run lint`

*Note: The backend server is located in `server/`. Check specific instructions for running the backend if integrating APIs.*

## 3. Code Style & Conventions
- **TypeScript:** Use strong typing. Avoid `any`. Interfaces/Types should be defined in `src/types/` or co-located if specific.
- **Components:** Functional components using Hooks. Use `shadcn-ui` components (in `src/components/ui`) whenever possible for consistency.
- **Styling:** Use Tailwind CSS utility classes. Avoid custom CSS files unless necessary (`src/App.css` exists but prefer Tailwind).
- **File Structure:**
    - `src/data/`: Static data (quiz questions).
    - `src/services/`: API integration logic.
    - `src/hooks/`: Custom React hooks.
- **Path Aliases:** Use `@/` to refer to the `src/` directory.

## 4. Testing Instructions
- **Framework:** Vitest with React Testing Library.
- **Location:** Tests are located in `src/test/` or co-located with components (`*.test.ts` or `*.test.tsx`).
- **Requirement:** When adding complex logic or services, add corresponding unit tests. Verify functionality with `npm run test` before declaring a task complete.

## 5. Documentation & Logs
- **Developer Guide:** Update `docs/devguide.md` with today's date and a summary of changes whenever significant features are added or architecture is modified.
- **Deprecated Code:** Log any deprecated functions or major refactors in the "Deprecated Functions" section of `docs/devguide.md`.

## 6. Security Considerations
- **Secrets:** Never commit API keys, passwords, or secrets to the repository. Use environment variables.
- **Data:** Ensure user input is validated, especially when adding new API endpoints in `server/`.

## 7. Commit Guidelines
- Use descriptive commit messages explaining the *why* and *what* (e.g., "feat: add Workday Adaptive quiz questions", "fix: resolve leader board calculation error").
- Keep changes atomic where possible.
