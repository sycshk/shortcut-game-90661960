const express = require('express');
const db = require('../database.cjs');

const router = express.Router();

// GET user by email
router.get('/:email', (req, res) => {
  try {
    const { email } = req.params;
    
    const user = db.prepare(
      'SELECT * FROM users WHERE email = ?'
    ).get(email);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Update last_active
    db.prepare(
      "UPDATE users SET last_active = datetime('now') WHERE email = ?"
    ).run(email);
    
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// POST create or update user
router.post('/', (req, res) => {
  try {
    const { email, display_name, organization } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    // Check if user exists
    const existing = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    
    if (existing) {
      // Update existing user
      db.prepare(`
        UPDATE users 
        SET display_name = COALESCE(?, display_name),
            organization = COALESCE(?, organization),
            last_active = datetime('now')
        WHERE email = ?
      `).run(display_name, organization, email);
      
      const updated = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
      return res.json(updated);
    }
    
    // Create new user
    const result = db.prepare(`
      INSERT INTO users (email, display_name, organization)
      VALUES (?, ?, ?)
    `).run(email, display_name || email.split('@')[0], organization);
    
    const newUser = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating/updating user:', error);
    res.status(500).json({ error: 'Failed to create/update user' });
  }
});

// PUT update display name
router.put('/:email/name', (req, res) => {
  try {
    const { email } = req.params;
    const { display_name } = req.body;
    
    if (!display_name) {
      return res.status(400).json({ error: 'Display name is required' });
    }
    
    // Update user's display name
    const result = db.prepare(
      'UPDATE users SET display_name = ? WHERE email = ?'
    ).run(display_name, email);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Also update all leaderboard entries for this user
    db.prepare(
      'UPDATE leaderboard SET name = ? WHERE email = ?'
    ).run(display_name, email);
    
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    res.json(user);
  } catch (error) {
    console.error('Error updating display name:', error);
    res.status(500).json({ error: 'Failed to update display name' });
  }
});

// GET user stats summary
router.get('/:email/stats', (req, res) => {
  try {
    const { email } = req.params;
    
    // Get overall stats from sessions
    const stats = db.prepare(`
      SELECT 
        COUNT(*) as total_games,
        SUM(score) as total_score,
        MAX(score) as best_score,
        AVG(accuracy) as avg_accuracy,
        MAX(streak) as best_streak,
        SUM(correct_answers) as total_correct,
        SUM(total_questions) as total_questions
      FROM sessions
      WHERE email = ?
    `).get(email);
    
    // Get daily challenge stats
    const dailyStats = db.prepare(`
      SELECT 
        COUNT(*) as challenges_completed,
        AVG(score) as avg_daily_score,
        AVG(accuracy) as avg_daily_accuracy
      FROM daily_challenges
      WHERE email = ? AND completed = 1
    `).get(email);
    
    // Get streak info
    const streak = db.prepare(
      'SELECT * FROM daily_streaks WHERE email = ?'
    ).get(email);
    
    res.json({
      games: stats,
      daily: dailyStats,
      streak: streak || { current_streak: 0, longest_streak: 0, total_days: 0 }
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ error: 'Failed to fetch user stats' });
  }
});

module.exports = router;
