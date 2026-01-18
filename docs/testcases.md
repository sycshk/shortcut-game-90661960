# Test Cases for Elufa Systems Shortcut Game

This document outlines the test cases for the application, covering the frontend interface, game logic, and backend integration.

## 1. Authentication & User Management

| ID | Title | Pre-condition | Steps | Expected Result |
|----|-------|---------------|-------|-----------------|
| **TC-AUTH-001** | User Registration | Backend server running | 1. Navigate to Registration page.<br>2. Enter valid username/email.<br>3. Submit form. | User created in DB. Redirect to Dashboard. |
| **TC-AUTH-002** | User Login | User exists in DB | 1. Navigate to Login page.<br>2. Enter valid credentials.<br>3. Submit. | JWT/Session token received. Redirect to Dashboard. |
| **TC-AUTH-003** | Invalid Login | User exists | 1. Enter invalid password.<br>2. Submit. | Error message displayed. No redirect. |
| **TC-AUTH-004** | Session Persistence | User logged in | 1. Refresh the page.<br>2. Close and reopen browser tab. | User remains logged in without re-entering credentials. |

## 2. General Quiz Mechanics (Knowledge)

| ID | Title | Pre-condition | Steps | Expected Result |
|----|-------|---------------|-------|-----------------|
| **TC-QUIZ-001** | Start Quiz | User logged in | 1. Select "Workday Adaptive" from menu.<br>2. Click "Start". | Quiz interface loads. First question displayed. Timer starts (if applicable). |
| **TC-QUIZ-002** | Correct Answer | Quiz active | 1. Read question.<br>2. Select the correct option. | Visual feedback (Green/Check). Score increments. Next question appears. |
| **TC-QUIZ-003** | Incorrect Answer | Quiz active | 1. Select an incorrect option. | Visual feedback (Red/Cross). Correct answer highlighted/explained. Score does not increment. |
| **TC-QUIZ-004** | Quiz Completion | Last question reached | 1. Answer final question. | Results summary screen displayed with final score and "Back to Home" button. |
| **TC-QUIZ-005** | Category Selection | Dashboard | 1. Click on different categories (Oracle, Tagetik). | Correct question set loads for the selected category. |

## 3. Shortcut Key Game

| ID | Title | Pre-condition | Steps | Expected Result |
|----|-------|---------------|-------|-----------------|
| **TC-SHORT-001** | Key Press Detection | Shortcut game active | 1. Game prompts for "Save" (Ctrl+S).<br>2. Press `Ctrl` then `S`. | Application captures key combo. Action registered as correct. |
| **TC-SHORT-002** | Incorrect Combo | Shortcut game active | 1. Prompt "Copy" (Ctrl+C).<br>2. Press `Ctrl+V`. | Visual feedback indicating error. Prompt remains or user loses a "life". |
| **TC-SHORT-003** | Timer Expiry | Shortcut game active | 1. Wait for prompt timer to run out. | Question marked as missed/incorrect. |
| **TC-SHORT-004** | Modifier normalization | Shortcut game active | 1. Press Left Ctrl or Right Ctrl. | Both detected simply as 'CTRL'. |
| **TC-SHORT-005** | Mac/Win Compatibility | Mac User | 1. Press Cmd (Meta). | Detected as 'WIN'/'META' mapped to 'WIN' internally (per `keyboard.ts`). |
| **TC-SHORT-006** | System Interruption | Shortcut game active | 1. Press `Alt` + `Tab` or `Win` key. | System event triggers (focus lost). Game handles this gracefully (pauses or ignores). Does NOT register as incorrect answer. |
| **TC-SHORT-007** | Implicit Shift Logic | Shortcut game active | 1. Prompt "Zoom In" (Ctrl + +).<br>2. Press `Ctrl` + `Shift` + `=` (standard layout). | Game recognizes `Shift` was needed for character access. Registers input as correct `Ctrl + +`. |

## 4. Leaderboard & Stats

| ID | Title | Pre-condition | Steps | Expected Result |
|----|-------|---------------|-------|-----------------|
| **TC-LEAD-001** | View Leaderboard | User logged in | 1. Navigate to Leaderboard page. | List of top users displayed. Current user's rank visible. |
| **TC-LEAD-002** | Score Update | Quiz completed | 1. Finish a quiz with a high score.<br>2. Check Leaderboard. | New score reflected in the list immediately. |
| **TC-LEAD-003** | Period Filtering | Data exists | 1. Toggle between "Daily", "Weekly", "All Time". | List refreshes with appropriate data. |

## 5. Daily Challenges

| ID | Title | Pre-condition | Steps | Expected Result |
|----|-------|---------------|-------|-----------------|
| **TC-DAILY-001** | Access Challenge | Daily Challenge available | 1. Click "Daily Challenge" on Dashboard. | Challenge loads. Unique content for the day is displayed. |
| **TC-DAILY-002** | One Attempt Limit | Challenge completed | 1. Try to start Daily Challenge again. | System prevents entry. Shows "Completed" status or previous score. |

## 6. System & API

| ID | Title | Pre-condition | Steps | Expected Result |
|----|-------|---------------|-------|-----------------|
| **TC-SYS-001** | Database Connection | Server starting | 1. Run `npm run dev` (server). | Console shows successful connection to SQLite DB. |
| **TC-SYS-002** | 404 Handling | App running | 1. Navigate to `/non-existent-route`. | "Not Found" component displayed. |
| **TC-SYS-003** | API Error Handling | Server running | 1. Simulate network failure during fetch. | Frontend displays user-friendly error toast/message. |
