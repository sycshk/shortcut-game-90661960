-- ============================================
-- Seed data for steve.yeung@elufasys.com
-- Run this on your server: sqlite3 /opt/shortcut-game/data/game.db < seed-steve.sql
-- ============================================

-- Create/update user profile
INSERT OR REPLACE INTO users (id, email, display_name, organization, created_at, last_active)
VALUES (1, 'steve.yeung@elufasys.com', 'steve.yeung', 'Elufasys', datetime('now', '-30 days'), datetime('now'));

-- ============ MINI GAMES ============
-- Snake: Legendary high score
INSERT INTO mini_games (user_id, email, game_type, high_score, games_played, best_accuracy, last_played)
VALUES (1, 'steve.yeung@elufasys.com', 'snake', 750, 50, NULL, datetime('now'))
ON CONFLICT(email, game_type) DO UPDATE SET
  high_score = MAX(mini_games.high_score, 750),
  games_played = 50,
  last_played = datetime('now');

-- EPM Quiz: Legendary high score with perfect accuracy
INSERT INTO mini_games (user_id, email, game_type, high_score, games_played, best_accuracy, last_played)
VALUES (1, 'steve.yeung@elufasys.com', 'epm', 200, 30, 100, datetime('now'))
ON CONFLICT(email, game_type) DO UPDATE SET
  high_score = MAX(mini_games.high_score, 200),
  games_played = 30,
  best_accuracy = 100,
  last_played = datetime('now');

-- ============ MAIN GAME LEADERBOARD ============
-- Legendary leaderboard entries for all levels
-- Essentials level
INSERT INTO leaderboard (user_id, name, email, score, accuracy, category, level, difficulty, streak, created_at)
VALUES (1, 'steve.yeung', 'steve.yeung@elufasys.com', 150, 100, 'general', 'essentials', 'easy', 10, datetime('now', '-25 days'));

-- Implementation level
INSERT INTO leaderboard (user_id, name, email, score, accuracy, category, level, difficulty, streak, created_at)
VALUES (1, 'steve.yeung', 'steve.yeung@elufasys.com', 200, 100, 'general', 'implementation', 'medium', 10, datetime('now', '-20 days'));

-- Architect level
INSERT INTO leaderboard (user_id, name, email, score, accuracy, category, level, difficulty, streak, created_at)
VALUES (1, 'steve.yeung', 'steve.yeung@elufasys.com', 280, 100, 'general', 'architect', 'hard', 10, datetime('now', '-15 days'));

-- Guru level - LEGENDARY STATUS (multiple high scores)
INSERT INTO leaderboard (user_id, name, email, score, accuracy, category, level, difficulty, streak, created_at)
VALUES (1, 'steve.yeung', 'steve.yeung@elufasys.com', 350, 100, 'general', 'guru', 'hard', 10, datetime('now', '-10 days'));

INSERT INTO leaderboard (user_id, name, email, score, accuracy, category, level, difficulty, streak, created_at)
VALUES (1, 'steve.yeung', 'steve.yeung@elufasys.com', 400, 100, 'general', 'guru', 'hard', 12, datetime('now', '-5 days'));

INSERT INTO leaderboard (user_id, name, email, score, accuracy, category, level, difficulty, streak, created_at)
VALUES (1, 'steve.yeung', 'steve.yeung@elufasys.com', 450, 100, 'general', 'guru', 'hard', 15, datetime('now'));

-- Game sessions for stats
INSERT INTO sessions (user_id, email, date, level, category, mode, score, correct_answers, total_questions, accuracy, time_spent, streak)
VALUES 
(1, 'steve.yeung@elufasys.com', datetime('now', '-25 days'), 'essentials', 'windows', 'timed', 150, 10, 10, 100, 120, 10),
(1, 'steve.yeung@elufasys.com', datetime('now', '-20 days'), 'implementation', 'excel', 'timed', 200, 10, 10, 100, 100, 10),
(1, 'steve.yeung@elufasys.com', datetime('now', '-15 days'), 'architect', 'powerpoint', 'timed', 280, 10, 10, 100, 90, 10),
(1, 'steve.yeung@elufasys.com', datetime('now', '-10 days'), 'guru', 'general', 'timed', 350, 10, 10, 100, 80, 10),
(1, 'steve.yeung@elufasys.com', datetime('now', '-5 days'), 'guru', 'general', 'challenge', 400, 10, 10, 100, 75, 12),
(1, 'steve.yeung@elufasys.com', datetime('now'), 'guru', 'general', 'challenge', 450, 10, 10, 100, 70, 15);

-- Daily streak data
INSERT OR REPLACE INTO daily_streaks (user_id, email, current_streak, longest_streak, last_completed_date, total_days, badges)
VALUES (1, 'steve.yeung@elufasys.com', 30, 45, date('now'), 60, '["daily_warrior", "daily_champion"]');

-- Daily challenge completions
INSERT INTO daily_challenges (user_id, email, date, completed, score, accuracy, completed_at)
VALUES 
(1, 'steve.yeung@elufasys.com', date('now'), 1, 100, 100, datetime('now')),
(1, 'steve.yeung@elufasys.com', date('now', '-1 day'), 1, 95, 90, datetime('now', '-1 day')),
(1, 'steve.yeung@elufasys.com', date('now', '-2 days'), 1, 100, 100, datetime('now', '-2 days'));

-- Verify the data
SELECT 'Mini games:' as info, game_type, high_score FROM mini_games WHERE email = 'steve.yeung@elufasys.com';
SELECT 'Leaderboard entries:' as info, COUNT(*) as count FROM leaderboard WHERE email = 'steve.yeung@elufasys.com';
SELECT 'Sessions:' as info, COUNT(*) as count FROM sessions WHERE email = 'steve.yeung@elufasys.com';
SELECT 'Daily streak:' as info, current_streak, longest_streak FROM daily_streaks WHERE email = 'steve.yeung@elufasys.com';
