const express = require('express');
const db = require('../database.cjs');

const router = express.Router();

// GET daily challenge status for a user
router.get('/:email', (req, res) => {
  try {
    const { email } = req.params;
    const today = new Date().toISOString().split('T')[0];
    
    const challenge = db.prepare(
      'SELECT * FROM daily_challenges WHERE email = ? AND date = ?'
    ).get(email, today);
    
    const streak = db.prepare(
      'SELECT * FROM daily_streaks WHERE email = ?'
    ).get(email);
    
    res.json({
      today: challenge || null,
      streak: streak || {
        current_streak: 0,
        longest_streak: 0,
        last_completed_date: null,
        total_days: 0,
        badges: '[]'
      }
    });
  } catch (error) {
    console.error('Error fetching daily status:', error);
    res.status(500).json({ error: 'Failed to fetch daily status' });
  }
});

// GET daily challenge history for a user
router.get('/:email/history', (req, res) => {
  try {
    const { email } = req.params;
    const { limit = 30 } = req.query;
    
    const history = db.prepare(`
      SELECT * FROM daily_challenges 
      WHERE email = ?
      ORDER BY date DESC
      LIMIT ?
    `).all(email, parseInt(limit));
    
    res.json({ history });
  } catch (error) {
    console.error('Error fetching daily history:', error);
    res.status(500).json({ error: 'Failed to fetch daily history' });
  }
});

// POST complete daily challenge
router.post('/complete', (req, res) => {
  try {
    const { email, score, accuracy, shortcuts } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    const today = new Date().toISOString().split('T')[0];
    
    // Get user_id
    let userId = null;
    const user = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    userId = user?.id;
    
    // Check if already completed today
    const existing = db.prepare(
      'SELECT * FROM daily_challenges WHERE email = ? AND date = ?'
    ).get(email, today);
    
    if (existing && existing.completed) {
      return res.json({ 
        message: 'Already completed today',
        challenge: existing
      });
    }
    
    // Insert or update challenge completion
    if (existing) {
      db.prepare(`
        UPDATE daily_challenges 
        SET completed = 1, score = ?, accuracy = ?, shortcuts = ?, completed_at = datetime('now')
        WHERE email = ? AND date = ?
      `).run(score, accuracy, JSON.stringify(shortcuts || []), email, today);
    } else {
      db.prepare(`
        INSERT INTO daily_challenges (user_id, email, date, completed, score, accuracy, shortcuts, completed_at)
        VALUES (?, ?, ?, 1, ?, ?, ?, datetime('now'))
      `).run(userId, email, today, score, accuracy, JSON.stringify(shortcuts || []));
    }
    
    // Update streak
    updateStreak(email, userId, accuracy >= 80);
    
    const challenge = db.prepare(
      'SELECT * FROM daily_challenges WHERE email = ? AND date = ?'
    ).get(email, today);
    
    const streak = db.prepare(
      'SELECT * FROM daily_streaks WHERE email = ?'
    ).get(email);
    
    res.json({
      message: 'Daily challenge completed',
      challenge,
      streak
    });
  } catch (error) {
    console.error('Error completing daily challenge:', error);
    res.status(500).json({ error: 'Failed to complete daily challenge' });
  }
});

// Helper function to update streak
function updateStreak(email, userId, qualifiesForStreak) {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  let streak = db.prepare('SELECT * FROM daily_streaks WHERE email = ?').get(email);
  
  if (!streak) {
    // Create new streak record with first_daily badge
    const initialBadges = qualifiesForStreak ? ['first_daily'] : [];
    db.prepare(`
      INSERT INTO daily_streaks (user_id, email, current_streak, longest_streak, last_completed_date, total_days, badges)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      userId,
      email,
      qualifiesForStreak ? 1 : 0,
      qualifiesForStreak ? 1 : 0,
      today,
      1,
      JSON.stringify(initialBadges)
    );
    return;
  }
  
  let newCurrentStreak = streak.current_streak;
  let newLongestStreak = streak.longest_streak;
  let newTotalDays = streak.total_days + 1;
  let badges = JSON.parse(streak.badges || '[]');
  
  // Award first_daily badge if not already earned
  if (!badges.includes('first_daily')) {
    badges.push('first_daily');
  }
  
  if (qualifiesForStreak) {
    if (streak.last_completed_date === yesterday) {
      // Continuing streak
      newCurrentStreak = streak.current_streak + 1;
    } else if (streak.last_completed_date !== today) {
      // Starting new streak
      newCurrentStreak = 1;
    }
    
    // Update longest streak if needed
    if (newCurrentStreak > newLongestStreak) {
      newLongestStreak = newCurrentStreak;
    }
    
    // Award streak badges
    const streakMilestones = [3, 7, 14, 30, 60, 100];
    for (const milestone of streakMilestones) {
      const badgeId = `streak_${milestone}`;
      if (newCurrentStreak >= milestone && !badges.includes(badgeId)) {
        badges.push(badgeId);
      }
    }
    
    // Award total days badges (using dedicated_ prefix to match frontend)
    const dayMilestones = [
      { days: 10, id: 'dedicated_10' },
      { days: 50, id: 'dedicated_50' },
      { days: 100, id: 'dedicated_100' }
    ];
    for (const milestone of dayMilestones) {
      if (newTotalDays >= milestone.days && !badges.includes(milestone.id)) {
        badges.push(milestone.id);
      }
    }
  } else {
    // Broke streak
    newCurrentStreak = 0;
  }
  
  db.prepare(`
    UPDATE daily_streaks 
    SET current_streak = ?, longest_streak = ?, last_completed_date = ?, total_days = ?, badges = ?
    WHERE email = ?
  `).run(newCurrentStreak, newLongestStreak, today, newTotalDays, JSON.stringify(badges), email);
}

module.exports = router;
