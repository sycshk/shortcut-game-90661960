const express = require('express');
const db = require('../database.cjs');

const router = express.Router();

// GET all sessions for a user
router.get('/:email', (req, res) => {
  try {
    const { email } = req.params;
    const { limit = 50 } = req.query;
    
    const sessions = db.prepare(`
      SELECT * FROM sessions 
      WHERE email = ?
      ORDER BY date DESC
      LIMIT ?
    `).all(email, parseInt(limit));
    
    res.json({ sessions });
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

// GET recent sessions for a user
router.get('/:email/recent', (req, res) => {
  try {
    const { email } = req.params;
    const { days = 7 } = req.query;
    
    const sessions = db.prepare(`
      SELECT * FROM sessions 
      WHERE email = ?
        AND date >= datetime('now', '-' || ? || ' days')
      ORDER BY date DESC
    `).all(email, parseInt(days));
    
    res.json({ sessions });
  } catch (error) {
    console.error('Error fetching recent sessions:', error);
    res.status(500).json({ error: 'Failed to fetch recent sessions' });
  }
});

// GET overall stats
router.get('/:email/stats', (req, res) => {
  try {
    const { email } = req.params;
    
    const stats = db.prepare(`
      SELECT 
        COUNT(*) as total_games,
        SUM(score) as total_score,
        MAX(score) as best_score,
        AVG(score) as avg_score,
        AVG(accuracy) as avg_accuracy,
        MAX(streak) as best_streak,
        SUM(correct_answers) as total_correct,
        SUM(total_questions) as total_questions,
        SUM(time_spent) as total_time
      FROM sessions
      WHERE email = ?
    `).get(email);
    
    res.json(stats);
  } catch (error) {
    console.error('Error fetching session stats:', error);
    res.status(500).json({ error: 'Failed to fetch session stats' });
  }
});

// POST new session
router.post('/', (req, res) => {
  try {
    const {
      email,
      level,
      category,
      mode,
      score,
      correct_answers,
      total_questions,
      accuracy,
      time_spent,
      streak
    } = req.body;
    
    // Get or create user_id if email provided
    let userId = null;
    if (email) {
      let user = db.prepare('SELECT id FROM users WHERE email = ?').get(email);

      if (!user) {
        const displayName = email.split('@')[0];
        const domain = email.split('@')[1];
        const organization = domain ? domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1) : null;

        const result = db.prepare(`
          INSERT INTO users (email, display_name, organization)
          VALUES (?, ?, ?)
        `).run(email, displayName, organization);

        user = { id: result.lastInsertRowid };
      }

      userId = user.id;
    }
    
    const result = db.prepare(`
      INSERT INTO sessions (
        user_id, email, level, category, mode, score,
        correct_answers, total_questions, accuracy, time_spent, streak
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      userId, email, level, category, mode, score,
      correct_answers, total_questions, accuracy, time_spent, streak || 0
    );
    
    res.json({ 
      id: result.lastInsertRowid,
      message: 'Session saved successfully' 
    });
  } catch (error) {
    console.error('Error saving session:', error);
    res.status(500).json({ error: 'Failed to save session' });
  }
});

module.exports = router;
