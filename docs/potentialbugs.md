# Potential Bugs & Risk Assessment

This document identifies areas of the application that are high-risk for bugs or inconsistent behavior, requiring targeted testing.

## 1. Input & Hardware Compatibility (High Risk)
*   **Non-US Keyboard Layouts:** The current `keyboard.ts` normalization relies heavily on `event.key` and `event.code`.
    *   *Risk:* Users with AZERTY (French), QWERTZ (German), or other layouts (e.g., Dvorak) may find that keys like `A` and `Q` are swapped or symbols like `@` require different modifier combinations that the game doesn't anticipate.
    *   *Test:* Emulate different keyboard locales in OS settings.
*   **Virtual Keyboards (Tablets/Touch):**
    *   *Risk:* On iPad/Android, the virtual keyboard may not trigger standard `keydown`/`keyup` events in the same sequence as physical keyboards. It might send "Unidentified" codes or buffer input until "Enter" is pressed.
    *   *Test:* Verify gameplay on an iPad with and without an external keyboard.
*   **"Ghosting" on Low-End Hardware:**
    *   *Risk:* Some office keyboards cannot register more than 3 keys pressed simultaneously (N-Key Rollover). Complex shortcuts like `Ctrl` + `Alt` + `Shift` + `S` might fail to register all keys.

## 2. Game State & Logic
*   **Rapid-Fire Input Race Conditions:**
    *   *Risk:* If a user types extremely fast, the state update for `checkAnswer` might overlap with the transition to the next question. This could result in a key press for the *previous* question being counted for the *next* one (or vice versa), breaking streaks.
*   **Daily Challenge Timezones:**
    *   *Risk:* If the server uses UTC for "daily" resets but the client uses local time, a user might see the challenge change mid-session or get locked out if their "Tuesday" is the server's "Wednesday".
*   **Timer Drift:**
    *   *Risk:* `setInterval` is not precise. If the tab is backgrounded (and not fully paused by our logic), the browser throttles timers, potentially causing the game timer to desync from actual wall-clock time.

## 3. Network & Data Persistence
*   **Multiple Tabs/Concurrency:**
    *   *Risk:* A user opens the game in two tabs. Playing in Tab A updates the local score. Playing in Tab B uses old state. Saving from Tab B might overwrite the higher progress from Tab A.
*   **Save Failures:**
    *   *Risk:* If `saveToLeaderboard` fails (network error), there appears to be no local caching/retry mechanism. The user would lose their high score record for that session.
