/**
 * Migration script to import existing JSON data into SQLite
 * Run this once after initial deployment to preserve historical data
 */

const fs = require('fs');
const path = require('path');
const db = require('./database.cjs');

const DATA_DIR = process.env.NODE_ENV === 'production' 
  ? '/opt/shortcut-game/public/data'
  : path.join(__dirname, '..', 'public', 'data');

function loadJsonFile(filename) {
  const filepath = path.join(DATA_DIR, filename);
  if (fs.existsSync(filepath)) {
    try {
      return JSON.parse(fs.readFileSync(filepath, 'utf8'));
    } catch (error) {
      console.warn(`⚠️  Could not parse ${filename}:`, error.message);
    }
  }
  return null;
}

function migrateLeaderboard() {
  const data = loadJsonFile('leaderboard.json');
  if (!data?.entries?.length) {
    console.log('📋 No leaderboard data to migrate');
    return 0;
  }

  const insert = db.prepare(`
    INSERT OR IGNORE INTO leaderboard (name, email, score, accuracy, category, level, difficulty, streak, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  let count = 0;
  for (const entry of data.entries) {
    try {
      insert.run(
        entry.name || 'Unknown',
        entry.email || null,
        entry.score || 0,
        entry.accuracy || 0,
        entry.category || 'all',
        entry.level || 'all',
        entry.difficulty || 'normal',
        entry.streak || 0,
        entry.date || entry.created_at || new Date().toISOString()
      );
      count++;
    } catch (e) {
      // Skip duplicates
    }
  }
  
  console.log(`📋 Migrated ${count} leaderboard entries`);
  return count;
}

function migrateProfiles() {
  const data = loadJsonFile('profiles.json');
  if (!data?.profiles || Object.keys(data.profiles).length === 0) {
    console.log('👤 No profiles to migrate');
    return 0;
  }

  const insert = db.prepare(`
    INSERT OR IGNORE INTO users (email, display_name, organization, created_at)
    VALUES (?, ?, ?, ?)
  `);

  let count = 0;
  for (const [email, profile] of Object.entries(data.profiles)) {
    try {
      insert.run(
        email,
        profile.displayName || profile.display_name || email.split('@')[0],
        profile.organization || null,
        profile.createdAt || profile.created_at || new Date().toISOString()
      );
      count++;
    } catch (e) {
      // Skip duplicates
    }
  }
  
  console.log(`👤 Migrated ${count} user profiles`);
  return count;
}

function migrateSessions() {
  const data = loadJsonFile('sessions.json');
  if (!data?.sessions?.length) {
    console.log('🎮 No sessions to migrate');
    return 0;
  }

  const insert = db.prepare(`
    INSERT INTO sessions (email, date, level, category, mode, score, correct_answers, total_questions, accuracy, time_spent, streak)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  let count = 0;
  for (const session of data.sessions) {
    try {
      insert.run(
        session.email || null,
        session.date || new Date().toISOString(),
        session.level || 'all',
        session.category || 'all',
        session.mode || 'normal',
        session.score || 0,
        session.correctAnswers || session.correct_answers || 0,
        session.totalQuestions || session.total_questions || 0,
        session.accuracy || 0,
        session.timeSpent || session.time_spent || 0,
        session.streak || 0
      );
      count++;
    } catch (e) {
      console.warn('Session migration error:', e.message);
    }
  }
  
  console.log(`🎮 Migrated ${count} game sessions`);
  return count;
}

function migrateHistory() {
  const data = loadJsonFile('history.json');
  if (!data?.records?.length) {
    console.log('📝 No answer history to migrate');
    return 0;
  }

  const insert = db.prepare(`
    INSERT INTO answer_history (email, shortcut_id, shortcut_name, category, level, is_correct, user_answer, correct_answer, time_spent, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  let count = 0;
  for (const record of data.records) {
    try {
      insert.run(
        record.email || null,
        record.shortcutId || record.shortcut_id || null,
        record.shortcutName || record.shortcut_name || null,
        record.category || 'general',
        record.level || 'all',
        record.isCorrect || record.is_correct ? 1 : 0,
        record.userAnswer || record.user_answer || null,
        record.correctAnswer || record.correct_answer || null,
        record.timeSpent || record.time_spent || 0,
        record.createdAt || record.created_at || new Date().toISOString()
      );
      count++;
    } catch (e) {
      // Skip errors
    }
  }
  
  console.log(`📝 Migrated ${count} answer records`);
  return count;
}

function runMigration() {
  console.log('\n🚀 Starting data migration from JSON to SQLite...\n');
  
  const totals = {
    leaderboard: migrateLeaderboard(),
    profiles: migrateProfiles(),
    sessions: migrateSessions(),
    history: migrateHistory()
  };
  
  console.log('\n✅ Migration complete!');
  console.log('   Total records migrated:', Object.values(totals).reduce((a, b) => a + b, 0));
  console.log('');
}

// Run if called directly
if (require.main === module) {
  runMigration();
}

module.exports = { runMigration };
