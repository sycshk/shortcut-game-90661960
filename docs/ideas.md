# Future Improvement Ideas for Elufa Systems Shortcut Game

This document tracks potential features and enhancements for future development cycles.

## 1. Gameplay & Mechanics
- **Multiplayer "Duel" Mode:** Real-time 1v1 battles where users race to enter shortcuts faster than their opponent.
- **Spaced Repetition System (SRS):** Implement an algorithm (like Anki) to resurface missed shortcuts at increasing intervals, ensuring long-term retention.
- **"Boss Battles":** End-of-level challenges requiring a sequence of rapid-fire shortcuts (e.g., "Format a Table" sequence) to defeat a virtual boss.
- **Custom Loadouts:** Allow users to build a custom "playlist" of shortcuts they specifically want to practice (e.g., strictly "Excel Macros" or "PowerPoint Formatting").
- **Voice Command Mode:** Accessibility feature or challenge mode where users must speak the action for a shortcut, or vice versa.

## 2. Technical & Platform
- **Electron / Desktop App Wrapper:** Packaging the web app as a desktop application would allow capturing "illegal" browser keys (Ctrl+W, Alt+Tab, Win Key) that are currently blocked or hard to intercept in a browser environment.
- **SSO Integration:** Integrate with Elufa Systems' Azure AD / Microsoft 365 for seamless Single Sign-On, removing the need for separate registration.
- **PWA / Offline Support:** Enhance the Service Worker to allow full offline gameplay, syncing progress to the leaderboard once connectivity is restored.

## 3. Content & Learning
- **Interactive Context:** Instead of just text hints, display a GIF or small video clip showing the shortcut being performed in the actual software context.
- **"Why Use It?" Tooltips:** Add short tips explaining *when* a professional would use this shortcut (e.g., "Use Ctrl+D to quickly copy formulas down a column without dragging").
- **Community Database:** Allow staff to suggest and vote on new shortcuts to add to the global database.
