// Seed mini game data for steve.yeung@elufasys.com
// Run this in browser console when logged in as steve.yeung

const seedMiniGameData = () => {
  const email = 'steve.yeung@elufasys.com';
  
  // Mini game scores (stored in localStorage)
  const miniGameScores = {
    [email]: {
      snake: 650,        // Legendary snake score
      epm: 180,          // High EPM quiz score
      snakeGames: 25,    // Total snake games played
      epmGames: 15,      // Total EPM quizzes completed
      epmAccuracy: 95    // Best EPM accuracy
    }
  };
  
  // Save to localStorage
  localStorage.setItem('mini-game-scores', JSON.stringify(miniGameScores));
  
  // Individual high scores for games
  localStorage.setItem(`snake-highscore-${email}`, '650');
  localStorage.setItem(`epm-quiz-highscore-${email}`, '180');
  
  // Avatar - set to legendary crown
  localStorage.setItem(`avatar-${email}`, 'legend');
  
  // Daily streak data
  localStorage.setItem('daily-streak', JSON.stringify({
    currentStreak: 30,
    longestStreak: 45,
    lastCompletedDate: new Date().toISOString().split('T')[0],
    totalDays: 60
  }));
  
  console.log('✅ Mini game data seeded for steve.yeung@elufasys.com');
  console.log('🐍 Snake high score: 650');
  console.log('📊 EPM Quiz high score: 180 (95% accuracy)');
  console.log('👑 Avatar set to: Legend');
  console.log('🔥 Daily streak: 30 days');
  
  return { success: true };
};

// Auto-run if in browser
if (typeof window !== 'undefined') {
  seedMiniGameData();
}

export { seedMiniGameData };
