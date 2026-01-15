const express = require('express');
const db = require('../database');

const router = express.Router();

// GET answer history for a user
router.get('/:email', (req, res) => {
  try {
    const { email } = req.params;
    const { limit = 500 } = req.query;
    
    const history = db.prepare(`
      SELECT * FROM answer_history 
      WHERE email = ?
      ORDER BY created_at DESC
      LIMIT ?
    `).all(email, parseInt(limit));
    
    res.json({ records: history });
  } catch (error) {
    console.error('Error fetching answer history:', error);
    res.status(500).json({ error: 'Failed to fetch answer history' });
  }
});

// GET category analysis for a user
router.get('/:email/categories', (req, res) => {
  try {
    const { email } = req.params;
    
    const analysis = db.prepare(`
      SELECT 
        category,
        COUNT(*) as total_attempts,
        SUM(CASE WHEN is_correct = 1 THEN 1 ELSE 0 END) as correct,
        ROUND(AVG(CASE WHEN is_correct = 1 THEN 100.0 ELSE 0 END), 1) as accuracy,
        AVG(time_spent) as avg_time
      FROM answer_history
      WHERE email = ?
      GROUP BY category
      ORDER BY total_attempts DESC
    `).all(email);
    
    res.json({ categories: analysis });
  } catch (error) {
    console.error('Error fetching category analysis:', error);
    res.status(500).json({ error: 'Failed to fetch category analysis' });
  }
});

// GET weak shortcuts for a user (most missed)
router.get('/:email/weak', (req, res) => {
  try {
    const { email } = req.params;
    const { limit = 10 } = req.query;
    
    const weak = db.prepare(`
      SELECT 
        shortcut_id,
        shortcut_name,
        category,
        correct_answer,
        COUNT(*) as total_attempts,
        SUM(CASE WHEN is_correct = 1 THEN 1 ELSE 0 END) as correct,
        ROUND(AVG(CASE WHEN is_correct = 1 THEN 100.0 ELSE 0 END), 1) as accuracy
      FROM answer_history
      WHERE email = ?
      GROUP BY shortcut_id
      HAVING accuracy < 70
      ORDER BY accuracy ASC, total_attempts DESC
      LIMIT ?
    `).all(email, parseInt(limit));
    
    res.json({ shortcuts: weak });
  } catch (error) {
    console.error('Error fetching weak shortcuts:', error);
    res.status(500).json({ error: 'Failed to fetch weak shortcuts' });
  }
});

// POST single answer record
router.post('/', (req, res) => {
  try {
    const {
      email,
      shortcut_id,
      shortcut_name,
      category,
      level,
      is_correct,
      user_answer,
      correct_answer,
      time_spent
    } = req.body;
    
    // Get user_id if email provided
    let userId = null;
    if (email) {
      const user = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
      userId = user?.id;
    }
    
    const result = db.prepare(`
      INSERT INTO answer_history (
        user_id, email, shortcut_id, shortcut_name, category, level,
        is_correct, user_answer, correct_answer, time_spent
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      userId, email, shortcut_id, shortcut_name, category, level,
      is_correct ? 1 : 0, user_answer, correct_answer, time_spent
    );
    
    res.json({ 
      id: result.lastInsertRowid,
      message: 'Answer recorded' 
    });
  } catch (error) {
    console.error('Error recording answer:', error);
    res.status(500).json({ error: 'Failed to record answer' });
  }
});

// POST batch answer records
router.post('/batch', (req, res) => {
  try {
    const { email, records } = req.body;
    
    if (!records || !Array.isArray(records)) {
      return res.status(400).json({ error: 'Records array is required' });
    }
    
    // Get user_id if email provided
    let userId = null;
    if (email) {
      const user = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
      userId = user?.id;
    }
    
    const insert = db.prepare(`
      INSERT INTO answer_history (
        user_id, email, shortcut_id, shortcut_name, category, level,
        is_correct, user_answer, correct_answer, time_spent
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const insertMany = db.transaction((records) => {
      for (const record of records) {
        insert.run(
          userId,
          email,
          record.shortcut_id,
          record.shortcut_name,
          record.category,
          record.level,
          record.is_correct ? 1 : 0,
          record.user_answer,
          record.correct_answer,
          record.time_spent
        );
      }
    });
    
    insertMany(records);
    
    res.json({ 
      inserted: records.length,
      message: 'Answers recorded' 
    });
  } catch (error) {
    console.error('Error recording batch answers:', error);
    res.status(500).json({ error: 'Failed to record answers' });
  }
});

module.exports = router;
