const express = require('express');
const db = require('../database');

const router = express.Router();

// GET all leaderboard entries
router.get('/', (req, res) => {
  try {
    const { category, level, difficulty, limit = 100 } = req.query;
    
    let query = 'SELECT * FROM leaderboard WHERE 1=1';
    const params = [];
    
    if (category && category !== 'all') {
      query += ' AND category = ?';
      params.push(category);
    }
    if (level && level !== 'all') {
      query += ' AND level = ?';
      params.push(level);
    }
    if (difficulty && difficulty !== 'all') {
      query += ' AND difficulty = ?';
      params.push(difficulty);
    }
    
    query += ' ORDER BY score DESC LIMIT ?';
    params.push(parseInt(limit));
    
    const entries = db.prepare(query).all(...params);
    res.json({ entries, lastUpdated: new Date().toISOString() });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// GET personal best for a user
router.get('/personal-best/:email', (req, res) => {
  try {
    const { email } = req.params;
    const { category, level } = req.query;
    
    let query = 'SELECT * FROM leaderboard WHERE email = ?';
    const params = [email];
    
    if (category && category !== 'all') {
      query += ' AND category = ?';
      params.push(category);
    }
    if (level && level !== 'all') {
      query += ' AND level = ?';
      params.push(level);
    }
    
    query += ' ORDER BY score DESC LIMIT 1';
    
    const entry = db.prepare(query).get(...params);
    res.json(entry || null);
  } catch (error) {
    console.error('Error fetching personal best:', error);
    res.status(500).json({ error: 'Failed to fetch personal best' });
  }
});

// GET user rank
router.get('/rank/:email', (req, res) => {
  try {
    const { email } = req.params;
    
    // Get user's best score
    const userBest = db.prepare(
      'SELECT MAX(score) as best_score FROM leaderboard WHERE email = ?'
    ).get(email);
    
    if (!userBest || !userBest.best_score) {
      return res.json({ rank: null });
    }
    
    // Count users with higher scores
    const rank = db.prepare(
      'SELECT COUNT(DISTINCT email) + 1 as rank FROM leaderboard WHERE score > ?'
    ).get(userBest.best_score);
    
    res.json({ rank: rank.rank, score: userBest.best_score });
  } catch (error) {
    console.error('Error fetching rank:', error);
    res.status(500).json({ error: 'Failed to fetch rank' });
  }
});

// POST new leaderboard entry
router.post('/', (req, res) => {
  try {
    const { name, email, score, accuracy, category, level, difficulty, streak } = req.body;
    
    if (!name || score === undefined) {
      return res.status(400).json({ error: 'Name and score are required' });
    }
    
    // Get user_id if email provided
    let userId = null;
    if (email) {
      const user = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
      userId = user?.id;
    }
    
    const result = db.prepare(`
      INSERT INTO leaderboard (user_id, name, email, score, accuracy, category, level, difficulty, streak)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(userId, name, email, score, accuracy, category, level, difficulty, streak || 0);
    
    res.json({ 
      id: result.lastInsertRowid,
      message: 'Entry added successfully' 
    });
  } catch (error) {
    console.error('Error adding leaderboard entry:', error);
    res.status(500).json({ error: 'Failed to add entry' });
  }
});

// PUT update user name in all entries
router.put('/update-name', (req, res) => {
  try {
    const { email, newName } = req.body;
    
    if (!email || !newName) {
      return res.status(400).json({ error: 'Email and newName are required' });
    }
    
    const result = db.prepare(
      'UPDATE leaderboard SET name = ? WHERE email = ?'
    ).run(newName, email);
    
    res.json({ 
      updated: result.changes,
      message: 'Name updated successfully' 
    });
  } catch (error) {
    console.error('Error updating name:', error);
    res.status(500).json({ error: 'Failed to update name' });
  }
});

// GET aggregated leaderboard (best per user)
router.get('/aggregated', (req, res) => {
  try {
    const { limit = 50 } = req.query;
    
    const entries = db.prepare(`
      SELECT 
        email,
        name,
        MAX(score) as best_score,
        MAX(accuracy) as best_accuracy,
        MAX(streak) as best_streak,
        COUNT(*) as games_played
      FROM leaderboard
      WHERE email IS NOT NULL
      GROUP BY email
      ORDER BY best_score DESC
      LIMIT ?
    `).all(parseInt(limit));
    
    res.json({ entries });
  } catch (error) {
    console.error('Error fetching aggregated leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch aggregated leaderboard' });
  }
});

module.exports = router;
