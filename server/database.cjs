const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Database path - use /opt/shortcut-game/data in production, local in dev
const DATA_DIR = process.env.NODE_ENV === 'production' 
  ? '/opt/shortcut-game/data' 
  : path.join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, 'game.db');
const db = new Database(DB_PATH);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Create tables
db.exec(`
  -- Users table
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    display_name TEXT,
    organization TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    last_active TEXT DEFAULT (datetime('now'))
  );

  -- Leaderboard entries
  CREATE TABLE IF NOT EXISTS leaderboard (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    name TEXT NOT NULL,
    email TEXT,
    score INTEGER NOT NULL,
    accuracy REAL,
    category TEXT,
    level TEXT,
    difficulty TEXT,
    streak INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  -- Game sessions
  CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    email TEXT,
    date TEXT DEFAULT (datetime('now')),
    level TEXT,
    category TEXT,
    mode TEXT,
    score INTEGER,
    correct_answers INTEGER,
    total_questions INTEGER,
    accuracy REAL,
    time_spent INTEGER,
    streak INTEGER DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  -- Answer history
  CREATE TABLE IF NOT EXISTS answer_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    email TEXT,
    shortcut_id TEXT,
    shortcut_name TEXT,
    category TEXT,
    level TEXT,
    is_correct INTEGER,
    user_answer TEXT,
    correct_answer TEXT,
    time_spent INTEGER,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  -- Daily challenges
  CREATE TABLE IF NOT EXISTS daily_challenges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    email TEXT,
    date TEXT NOT NULL,
    completed INTEGER DEFAULT 0,
    score INTEGER,
    accuracy REAL,
    shortcuts TEXT,
    completed_at TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE(email, date)
  );

  -- Daily streaks
  CREATE TABLE IF NOT EXISTS daily_streaks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    email TEXT UNIQUE NOT NULL,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_completed_date TEXT,
    total_days INTEGER DEFAULT 0,
    badges TEXT DEFAULT '[]',
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  -- Mini game scores
  CREATE TABLE IF NOT EXISTS mini_games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    email TEXT NOT NULL,
    game_type TEXT NOT NULL,
    high_score INTEGER DEFAULT 0,
    games_played INTEGER DEFAULT 0,
    best_accuracy REAL,
    last_played TEXT DEFAULT (datetime('now')),
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE(email, game_type)
  );

  -- Create indexes for common queries
  CREATE INDEX IF NOT EXISTS idx_leaderboard_score ON leaderboard(score DESC);
  CREATE INDEX IF NOT EXISTS idx_leaderboard_email ON leaderboard(email);
  CREATE INDEX IF NOT EXISTS idx_sessions_email ON sessions(email);
  CREATE INDEX IF NOT EXISTS idx_sessions_date ON sessions(date DESC);
  CREATE INDEX IF NOT EXISTS idx_history_email ON answer_history(email);
  CREATE INDEX IF NOT EXISTS idx_daily_email_date ON daily_challenges(email, date);
  CREATE INDEX IF NOT EXISTS idx_mini_games_email ON mini_games(email);
  CREATE INDEX IF NOT EXISTS idx_mini_games_score ON mini_games(high_score DESC);
`);

console.log('📦 Database initialized at:', DB_PATH);

module.exports = db;
