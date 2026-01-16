const express = require('express');
const router = express.Router();
const db = require('../database.cjs');

// GET /minigames - Get all mini game scores (leaderboard)
router.get('/', (req, res) => {
  try {
    const { game_type, limit = 50 } = req.query;
    
    let query = `
      SELECT email, game_type, high_score, games_played, best_accuracy, last_played
      FROM mini_games
    `;
    const params = [];
    
    if (game_type) {
      query += ' WHERE game_type = ?';
      params.push(game_type);
    }
    
    query += ' ORDER BY high_score DESC LIMIT ?';
    params.push(parseInt(limit));
    
    const entries = db.prepare(query).all(...params);
    res.json({ entries });
  } catch (error) {
    console.error('Error fetching mini game leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch mini game leaderboard' });
  }
});

// GET /minigames/:email - Get user's mini game scores
router.get('/:email', (req, res) => {
  try {
    const { email } = req.params;
    
    const entries = db.prepare(`
      SELECT game_type, high_score, games_played, best_accuracy, last_played
      FROM mini_games
      WHERE email = ?
    `).all(email);
    
    // Convert to object keyed by game_type
    const scores = {};
    entries.forEach(entry => {
      scores[entry.game_type] = {
        highScore: entry.high_score,
        gamesPlayed: entry.games_played,
        bestAccuracy: entry.best_accuracy,
        lastPlayed: entry.last_played
      };
    });
    
    res.json({ scores });
  } catch (error) {
    console.error('Error fetching user mini game scores:', error);
    res.status(500).json({ error: 'Failed to fetch user mini game scores' });
  }
});

// POST /minigames - Save/update a mini game score
router.post('/', (req, res) => {
  try {
    const { email, game_type, score, accuracy } = req.body;
    
    if (!email || !game_type || score === undefined) {
      return res.status(400).json({ error: 'email, game_type, and score are required' });
    }
    
    // Get or create user profile
    let user = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    
    if (!user) {
      // Create user profile if it doesn't exist
      const displayName = email.split('@')[0];
      const domain = email.split('@')[1];
      const organization = domain ? domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1) : null;
      
      const result = db.prepare(`
        INSERT INTO users (email, display_name, organization)
        VALUES (?, ?, ?)
      `).run(email, displayName, organization);
      
      user = { id: result.lastInsertRowid };
      console.log('Created new user profile for:', email, 'id:', user.id);
    }
    
    const userId = user.id;
    
    // Check if entry exists
    const existing = db.prepare(`
      SELECT id, high_score, games_played, best_accuracy, last_played
      FROM mini_games
      WHERE email = ? AND game_type = ?
    `).get(email, game_type);
    
    if (existing) {
      // Update existing entry
      const newHighScore = Math.max(existing.high_score, score);
      const newBestAccuracy = accuracy !== undefined 
        ? Math.max(existing.best_accuracy || 0, accuracy)
        : existing.best_accuracy;

      // De-dupe rapid duplicate submits (e.g. React dev strict-mode / double-click)
      // Only increment games_played if the previous save wasn't within the last 3 seconds.
      db.prepare(`
        UPDATE mini_games
        SET 
          high_score = ?,
          games_played = CASE
            WHEN last_played IS NOT NULL AND last_played >= datetime('now', '-3 seconds') THEN games_played
            ELSE games_played + 1
          END,
          best_accuracy = ?,
          last_played = datetime('now'),
          user_id = COALESCE(?, user_id)
        WHERE id = ?
      `).run(newHighScore, newBestAccuracy, userId, existing.id);

      const updated = db.prepare('SELECT games_played FROM mini_games WHERE id = ?').get(existing.id);
      const newGamesPlayed = updated?.games_played ?? existing.games_played + 1;
      
      res.json({ 
        message: 'Score updated',
        highScore: newHighScore,
        gamesPlayed: newGamesPlayed,
        isNewHighScore: score > existing.high_score
      });
    } else {
      // Insert new entry
      const result = db.prepare(`
        INSERT INTO mini_games (user_id, email, game_type, high_score, games_played, best_accuracy)
        VALUES (?, ?, ?, ?, 1, ?)
      `).run(userId, email, game_type, score, accuracy || null);
      
      res.json({ 
        id: result.lastInsertRowid,
        message: 'Score created',
        highScore: score,
        gamesPlayed: 1,
        isNewHighScore: true
      });
    }
  } catch (error) {
    console.error('Error saving mini game score:', error);
    res.status(500).json({ error: 'Failed to save mini game score' });
  }
});

// GET /minigames/leaderboard/:game_type - Get leaderboard for specific game
router.get('/leaderboard/:game_type', (req, res) => {
  try {
    const { game_type } = req.params;
    const { limit = 50 } = req.query;
    
    const entries = db.prepare(`
      SELECT 
        m.email,
        m.high_score,
        m.games_played,
        m.best_accuracy,
        m.last_played,
        u.display_name
      FROM mini_games m
      LEFT JOIN users u ON m.email = u.email
      WHERE m.game_type = ?
      ORDER BY m.high_score DESC
      LIMIT ?
    `).all(game_type, parseInt(limit));
    
    // Add rank
    const rankedEntries = entries.map((entry, index) => ({
      rank: index + 1,
      email: entry.email,
      name: entry.display_name || entry.email.split('@')[0],
      highScore: entry.high_score,
      gamesPlayed: entry.games_played,
      bestAccuracy: entry.best_accuracy,
      lastPlayed: entry.last_played
    }));
    
    res.json({ entries: rankedEntries });
  } catch (error) {
    console.error('Error fetching mini game leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch mini game leaderboard' });
  }
});

// GET /minigames/unified/all - Get unified leaderboard across all games
router.get('/unified/all', (req, res) => {
  try {
    const { limit = 50 } = req.query;
    
    // Get all users with their aggregate scores
    const entries = db.prepare(`
      SELECT 
        m.email,
        u.display_name,
        SUM(m.high_score) as total_score,
        SUM(m.games_played) as total_games,
        MAX(CASE WHEN m.game_type = 'snake' THEN m.high_score ELSE 0 END) as snake_score,
        MAX(CASE WHEN m.game_type = 'epm' THEN m.high_score ELSE 0 END) as epm_score,
        MAX(CASE WHEN m.game_type = 'epm' THEN m.best_accuracy ELSE NULL END) as epm_accuracy
      FROM mini_games m
      LEFT JOIN users u ON m.email = u.email
      GROUP BY m.email
      ORDER BY total_score DESC
      LIMIT ?
    `).all(parseInt(limit));
    
    const rankedEntries = entries.map((entry, index) => ({
      rank: index + 1,
      email: entry.email,
      name: entry.display_name || entry.email.split('@')[0],
      totalScore: entry.total_score,
      totalGames: entry.total_games,
      snakeScore: entry.snake_score,
      epmScore: entry.epm_score,
      epmAccuracy: entry.epm_accuracy
    }));
    
    res.json({ entries: rankedEntries });
  } catch (error) {
    console.error('Error fetching unified leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch unified leaderboard' });
  }
});

module.exports = router;
