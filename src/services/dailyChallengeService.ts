import { ShortcutChallenge } from '@/types/game';
import { shortcutChallenges } from '@/data/shortcuts';
import { apiService } from './apiService';

const DAILY_CHALLENGE_KEY = 'shortcut-daily-challenge';
const DAILY_STREAK_KEY = 'shortcut-daily-streak';

export type DailyChallengeType = 'shortcuts' | 'snake' | 'epm-quiz';

export interface DailyChallengeData {
  date: string;
  completed: boolean;
  score: number;
  accuracy: number;
  shortcuts: string[]; // shortcut IDs for the day
  challengeType?: DailyChallengeType;
}

export interface DailyStreakData {
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate: string | null;
  totalDaysCompleted: number;
  badges: string[];
}

// Simple seeded random number generator
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Get the challenge type for a given date (rotates between shortcuts and mini-games)
export const getDailyChallengeType = (date: Date = new Date()): DailyChallengeType => {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  
  // Rotate: 3 days shortcuts, 1 day snake, 3 days shortcuts, 1 day epm-quiz
  const cycle = dayOfYear % 8;
  
  if (cycle === 3) return 'snake';
  if (cycle === 7) return 'epm-quiz';
  return 'shortcuts';
};

// Get challenge type info for display
export const getDailyChallengeInfo = (date: Date = new Date()): { type: DailyChallengeType; title: string; description: string; icon: string } => {
  const type = getDailyChallengeType(date);
  
  switch (type) {
    case 'snake':
      return {
        type: 'snake',
        title: 'Snake Challenge',
        description: 'Score at least 50 points in Snake to complete today\'s challenge!',
        icon: '🐍'
      };
    case 'epm-quiz':
      return {
        type: 'epm-quiz',
        title: 'EPM Quiz Challenge',
        description: 'Complete the EPM Knowledge Quiz with at least 60% accuracy!',
        icon: '📊'
      };
    default:
      return {
        type: 'shortcuts',
        title: 'Shortcut Challenge',
        description: 'Complete 10 keyboard shortcuts to master today\'s challenge!',
        icon: '⌨️'
      };
  }
};

// Get a deterministic set of shortcuts for a given date
export const getDailyShortcuts = (date: Date = new Date()): ShortcutChallenge[] => {
  const dateString = date.toISOString().split('T')[0];
  const seed = dateString.split('-').reduce((acc, part) => acc + parseInt(part), 0);
  
  // Create a shuffled copy using the seeded random
  const shuffled = [...shortcutChallenges].sort((a, b) => {
    const seedA = seed + a.id.charCodeAt(0);
    const seedB = seed + b.id.charCodeAt(0);
    return seededRandom(seedA) - seededRandom(seedB);
  });
  
  // Return 10 shortcuts for daily challenge
  return shuffled.slice(0, 10);
};

// Get today's date string
export const getTodayString = (): string => {
  return new Date().toISOString().split('T')[0];
};

// Get daily challenge data
export const getDailyChallengeData = async (email?: string): Promise<DailyChallengeData | null> => {
  // Try API first if email provided
  if (email) {
    try {
      const result = await apiService.getDailyStatus(email);
      if (result.data?.today) {
        return {
          date: result.data.today.date,
          completed: Boolean(result.data.today.completed),
          score: result.data.today.score || 0,
          accuracy: result.data.today.accuracy || 0,
          shortcuts: result.data.today.shortcuts ? JSON.parse(result.data.today.shortcuts) : []
        };
      }
    } catch (e) {
      // Fall through to localStorage
    }
  }

  try {
    const stored = localStorage.getItem(DAILY_CHALLENGE_KEY);
    if (!stored) return null;
    
    const data: DailyChallengeData = JSON.parse(stored);
    // Check if it's today's challenge
    if (data.date !== getTodayString()) {
      return null; // Old data, treat as no challenge done today
    }
    return data;
  } catch {
    return null;
  }
};

// Synchronous version for components that can't await
export const getDailyChallengeDataSync = (): DailyChallengeData | null => {
  try {
    const stored = localStorage.getItem(DAILY_CHALLENGE_KEY);
    if (!stored) return null;
    
    const data: DailyChallengeData = JSON.parse(stored);
    if (data.date !== getTodayString()) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
};

// Check if today's challenge is completed
export const isDailyChallengeCompleted = (): boolean => {
  const data = getDailyChallengeDataSync();
  return data?.completed ?? false;
};

// Save daily challenge completion
export const saveDailyChallengeCompletion = async (score: number, accuracy: number, email?: string): Promise<string[]> => {
  const today = getTodayString();
  const shortcuts = getDailyShortcuts().map(s => s.id);
  
  const data: DailyChallengeData = {
    date: today,
    completed: true,
    score,
    accuracy,
    shortcuts,
  };
  
  localStorage.setItem(DAILY_CHALLENGE_KEY, JSON.stringify(data));
  
  // Save to API if email provided
  if (email) {
    try {
      await apiService.completeDailyChallenge({
        email,
        score,
        accuracy,
        shortcuts
      });
    } catch (e) {
      console.warn('Failed to save daily challenge to API:', e);
    }
  }
  
  // Update streak locally and get new badges
  const newBadges = updateDailyStreakLocal(accuracy >= 80);
  return newBadges;
};

// Get streak data
export const getDailyStreakData = async (email?: string): Promise<DailyStreakData> => {
  // Try API first if email provided
  if (email) {
    try {
      const result = await apiService.getDailyStatus(email);
      if (result.data?.streak) {
        const streak = result.data.streak;
        return {
          currentStreak: streak.current_streak || 0,
          longestStreak: streak.longest_streak || 0,
          lastCompletedDate: streak.last_completed_date || null,
          totalDaysCompleted: streak.total_days || 0,
          badges: streak.badges ? JSON.parse(streak.badges) : []
        };
      }
    } catch (e) {
      // Fall through to localStorage
    }
  }

  return getDailyStreakDataSync();
};

// Synchronous version for local use
export const getDailyStreakDataSync = (): DailyStreakData => {
  try {
    const stored = localStorage.getItem(DAILY_STREAK_KEY);
    if (!stored) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        lastCompletedDate: null,
        totalDaysCompleted: 0,
        badges: [],
      };
    }
    return JSON.parse(stored);
  } catch {
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastCompletedDate: null,
      totalDaysCompleted: 0,
      badges: [],
    };
  }
};

// Update streak after completing daily challenge (local only)
const updateDailyStreakLocal = (qualifies: boolean): string[] => {
  const streak = getDailyStreakDataSync();
  const today = getTodayString();
  const newBadges: string[] = [];
  
  if (!qualifies) {
    // Didn't qualify, streak breaks
    streak.currentStreak = 0;
    localStorage.setItem(DAILY_STREAK_KEY, JSON.stringify(streak));
    return newBadges;
  }
  
  // Check if this continues the streak
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayString = yesterday.toISOString().split('T')[0];
  
  if (streak.lastCompletedDate === yesterdayString) {
    // Continuing streak
    streak.currentStreak += 1;
  } else if (streak.lastCompletedDate !== today) {
    // Starting new streak
    streak.currentStreak = 1;
  }
  
  streak.lastCompletedDate = today;
  streak.totalDaysCompleted += 1;
  streak.longestStreak = Math.max(streak.longestStreak, streak.currentStreak);
  
  // Award badges and track newly earned ones
  const previousBadges = [...streak.badges];
  
  if (streak.totalDaysCompleted === 1 && !streak.badges.includes('first_daily')) {
    streak.badges.push('first_daily');
  }
  if (streak.currentStreak >= 3 && !streak.badges.includes('streak_3')) {
    streak.badges.push('streak_3');
  }
  if (streak.currentStreak >= 7 && !streak.badges.includes('streak_7')) {
    streak.badges.push('streak_7');
  }
  if (streak.currentStreak >= 14 && !streak.badges.includes('streak_14')) {
    streak.badges.push('streak_14');
  }
  if (streak.currentStreak >= 30 && !streak.badges.includes('streak_30')) {
    streak.badges.push('streak_30');
  }
  if (streak.currentStreak >= 60 && !streak.badges.includes('streak_60')) {
    streak.badges.push('streak_60');
  }
  if (streak.currentStreak >= 100 && !streak.badges.includes('streak_100')) {
    streak.badges.push('streak_100');
  }
  if (streak.totalDaysCompleted >= 10 && !streak.badges.includes('dedicated_10')) {
    streak.badges.push('dedicated_10');
  }
  if (streak.totalDaysCompleted >= 50 && !streak.badges.includes('dedicated_50')) {
    streak.badges.push('dedicated_50');
  }
  if (streak.totalDaysCompleted >= 100 && !streak.badges.includes('dedicated_100')) {
    streak.badges.push('dedicated_100');
  }
  
  // Calculate newly earned badges
  const earnedNewBadges = streak.badges.filter(b => !previousBadges.includes(b));
  
  localStorage.setItem(DAILY_STREAK_KEY, JSON.stringify(streak));
  
  return earnedNewBadges;
};

// Badge definitions
export const DAILY_BADGES = {
  first_daily: { name: 'First Steps', description: 'Complete your first daily challenge', icon: '🌟' },
  streak_3: { name: 'On Fire', description: '3-day daily streak', icon: '🔥' },
  streak_7: { name: 'Week Warrior', description: '7-day daily streak', icon: '⚔️' },
  streak_14: { name: 'Fortnight Fighter', description: '14-day daily streak', icon: '🛡️' },
  streak_30: { name: 'Monthly Master', description: '30-day daily streak', icon: '👑' },
  streak_60: { name: 'Two Month Titan', description: '60-day daily streak', icon: '💎' },
  streak_100: { name: 'Century Champion', description: '100-day daily streak', icon: '🏆' },
  dedicated_10: { name: 'Dedicated', description: 'Complete 10 daily challenges', icon: '💪' },
  dedicated_50: { name: 'Committed', description: 'Complete 50 daily challenges', icon: '🏅' },
  dedicated_100: { name: 'Legend', description: 'Complete 100 daily challenges', icon: '🎖️' },
} as const;

// Get time until next daily challenge
export const getTimeUntilNextChallenge = (): { hours: number; minutes: number; seconds: number } => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  const diff = tomorrow.getTime() - now.getTime();
  
  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
};
