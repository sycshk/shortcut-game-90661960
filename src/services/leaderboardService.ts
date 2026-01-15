import { LeaderboardEntry, Category, DifficultyLevel, GameSession, ShortcutChallenge } from '@/types/game';

const LEADERBOARD_KEY = 'elufa-leaderboard';
const SESSIONS_KEY = 'elufa-game-sessions';
const PROFILES_KEY = 'elufa-user-profiles';
const ANSWER_HISTORY_KEY = 'elufa-answer-history';
const DATA_FILE_PATH = '/data/leaderboard.json';
const MAX_ENTRIES = 100;
const MAX_SESSIONS = 50;

export interface LeaderboardFilters {
  category?: Category;
  level?: DifficultyLevel;
  timeframe?: 'today' | 'week' | 'month' | 'all';
}

export interface AnswerRecord {
  id: string;
  date: string;
  shortcutId: string;
  shortcutDescription: string;
  category: Category;
  level: DifficultyLevel;
  isCorrect: boolean;
  userAnswer: string[];
  correctAnswer: string[];
  timeSpent: number;
}

export interface UserProfileData {
  email: string;
  displayName: string;
  createdAt: string;
  lastActive: string;
}

interface LeaderboardData {
  entries: LeaderboardEntry[];
  lastUpdated: string | null;
}

// In-memory cache for leaderboard data
let cachedData: LeaderboardData | null = null;
let isInitialized = false;

export const leaderboardService = {
  // Initialize by loading from JSON file
  init: async (): Promise<void> => {
    if (isInitialized) return;
    
    try {
      const response = await fetch(DATA_FILE_PATH);
      if (response.ok) {
        const fileData: LeaderboardData = await response.json();
        const localData = leaderboardService.getFromLocalStorage();
        
        // Merge file data with local storage (local takes priority for newer entries)
        const merged = leaderboardService.mergeEntries(fileData.entries, localData);
        cachedData = { entries: merged, lastUpdated: new Date().toISOString() };
        
        // Update local storage with merged data
        localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(merged));
      }
    } catch (error) {
      console.log('Loading from local storage only');
    }
    
    isInitialized = true;
  },

  // Merge entries from two sources, removing duplicates by id
  mergeEntries: (fileEntries: LeaderboardEntry[], localEntries: LeaderboardEntry[]): LeaderboardEntry[] => {
    const entryMap = new Map<string, LeaderboardEntry>();
    
    // Add file entries first
    fileEntries.forEach(entry => entryMap.set(entry.id, entry));

    // Override/add local entries (they're more recent)
    localEntries.forEach(entry => entryMap.set(entry.id, entry));

    return Array.from(entryMap.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_ENTRIES);
  },

  // Get from local storage
  getFromLocalStorage: (): LeaderboardEntry[] => {
    try {
      const stored = localStorage.getItem(LEADERBOARD_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  // Get all leaderboard entries
  getAll: (): LeaderboardEntry[] => {
    if (cachedData) {
      return cachedData.entries;
    }
    return leaderboardService.getFromLocalStorage();
  },

  // Get filtered and sorted leaderboard
  getFiltered: (filters?: LeaderboardFilters): LeaderboardEntry[] => {
    let entries = leaderboardService.getAll();

    if (filters?.category) {
      entries = entries.filter(e => e.category === filters.category);
    }

    if (filters?.level) {
      entries = entries.filter(e => e.level === filters.level);
    }

    if (filters?.timeframe && filters.timeframe !== 'all') {
      const now = new Date();
      let cutoff: Date;

      switch (filters.timeframe) {
        case 'today':
          cutoff = new Date(now.setHours(0, 0, 0, 0));
          break;
        case 'week':
          cutoff = new Date(now.setDate(now.getDate() - 7));
          break;
        case 'month':
          cutoff = new Date(now.setMonth(now.getMonth() - 1));
          break;
        default:
          cutoff = new Date(0);
      }

      entries = entries.filter(e => new Date(e.date) >= cutoff);
    }

    // Sort by score descending
    return entries.sort((a, b) => b.score - a.score);
  },

  // Get top entries
  getTop: (count: number = 10, filters?: LeaderboardFilters): LeaderboardEntry[] => {
    return leaderboardService.getFiltered(filters).slice(0, count);
  },

  // Add new entry and sync
  addEntry: (entry: Omit<LeaderboardEntry, 'id' | 'date'>): LeaderboardEntry => {
    const newEntry: LeaderboardEntry = {
      ...entry,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };

    const current = leaderboardService.getAll();
    const updated = [...current, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_ENTRIES);

    // Update local storage
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updated));
    
    // Update cache
    cachedData = { entries: updated, lastUpdated: new Date().toISOString() };

    // Trigger sync to persist
    leaderboardService.syncToFile();

    return newEntry;
  },

  // Sync data to file
  syncToFile: (): void => {
    const data: LeaderboardData = {
      entries: leaderboardService.getAll(),
      lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem('elufa-leaderboard-export', JSON.stringify(data, null, 2));
    console.log('Leaderboard data synced.');
  },

  // Export leaderboard as JSON file download
  exportToFile: (): void => {
    const data: LeaderboardData = {
      entries: leaderboardService.getAll(),
      lastUpdated: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leaderboard.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  // Get personal best for user
  getPersonalBest: (name: string, category?: Category): LeaderboardEntry | null => {
    const entries = leaderboardService.getAll()
      .filter(e => e.name.toLowerCase() === name.toLowerCase());

    if (category) {
      const filtered = entries.filter(e => e.category === category);
      return filtered.length > 0 
        ? filtered.reduce((best, e) => e.score > best.score ? e : best)
        : null;
    }

    return entries.length > 0
      ? entries.reduce((best, e) => e.score > best.score ? e : best)
      : null;
  },

  // Get user rank
  getRank: (name: string): number | null => {
    const entries = leaderboardService.getAll().sort((a, b) => b.score - a.score);
    const index = entries.findIndex(e => e.name.toLowerCase() === name.toLowerCase());
    return index >= 0 ? index + 1 : null;
  },

  // Clear all entries
  clear: (): void => {
    localStorage.removeItem(LEADERBOARD_KEY);
    cachedData = { entries: [], lastUpdated: new Date().toISOString() };
  },

  // ============ User Profiles ============
  
  getProfile: (email: string): UserProfileData | null => {
    try {
      const profiles = JSON.parse(localStorage.getItem(PROFILES_KEY) || '{}');
      return profiles[email] || null;
    } catch {
      return null;
    }
  },

  saveProfile: (profile: UserProfileData): void => {
    try {
      const profiles = JSON.parse(localStorage.getItem(PROFILES_KEY) || '{}');
      profiles[profile.email] = profile;
      localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
    } catch {
      console.error('Failed to save profile');
    }
  },

  updateDisplayName: (email: string, newName: string): void => {
    const profile = leaderboardService.getProfile(email);
    if (profile) {
      profile.displayName = newName;
      profile.lastActive = new Date().toISOString();
      leaderboardService.saveProfile(profile);
    }
  },

  // ============ Answer History ============

  getAnswerHistory: (email?: string): AnswerRecord[] => {
    try {
      const stored = localStorage.getItem(ANSWER_HISTORY_KEY);
      const allHistory: AnswerRecord[] = stored ? JSON.parse(stored) : [];
      return allHistory;
    } catch {
      return [];
    }
  },

  addAnswerRecord: (record: Omit<AnswerRecord, 'id' | 'date'>): void => {
    try {
      const history = leaderboardService.getAnswerHistory();
      const newRecord: AnswerRecord = {
        ...record,
        id: Date.now().toString(),
        date: new Date().toISOString(),
      };
      
      // Keep last 500 answers
      const updated = [newRecord, ...history].slice(0, 500);
      localStorage.setItem(ANSWER_HISTORY_KEY, JSON.stringify(updated));
    } catch {
      console.error('Failed to save answer record');
    }
  },

  // Get category performance analysis
  getCategoryAnalysis: (): Record<Category, { correct: number; total: number; accuracy: number; weakShortcuts: string[] }> => {
    const history = leaderboardService.getAnswerHistory();
    const categories: Category[] = ['windows', 'excel', 'powerpoint', 'general'];
    
    const analysis: Record<Category, { correct: number; total: number; accuracy: number; weakShortcuts: string[] }> = {} as any;
    
    categories.forEach(cat => {
      const catAnswers = history.filter(h => h.category === cat);
      const correct = catAnswers.filter(h => h.isCorrect).length;
      const total = catAnswers.length;
      
      // Find weak shortcuts (wrong more than 50% of time)
      const shortcutStats = new Map<string, { correct: number; total: number; description: string }>();
      catAnswers.forEach(a => {
        const stats = shortcutStats.get(a.shortcutId) || { correct: 0, total: 0, description: a.shortcutDescription };
        stats.total++;
        if (a.isCorrect) stats.correct++;
        shortcutStats.set(a.shortcutId, stats);
      });
      
      const weakShortcuts: string[] = [];
      shortcutStats.forEach((stats, id) => {
        if (stats.total >= 2 && (stats.correct / stats.total) < 0.5) {
          weakShortcuts.push(stats.description);
        }
      });
      
      analysis[cat] = {
        correct,
        total,
        accuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
        weakShortcuts,
      };
    });
    
    return analysis;
  },

  // Get shortcuts that need practice
  getWeakShortcuts: (): { description: string; category: Category; accuracy: number }[] => {
    const history = leaderboardService.getAnswerHistory();
    const shortcutStats = new Map<string, { correct: number; total: number; description: string; category: Category }>();
    
    history.forEach(a => {
      const stats = shortcutStats.get(a.shortcutId) || { correct: 0, total: 0, description: a.shortcutDescription, category: a.category };
      stats.total++;
      if (a.isCorrect) stats.correct++;
      shortcutStats.set(a.shortcutId, stats);
    });
    
    const weak: { description: string; category: Category; accuracy: number }[] = [];
    shortcutStats.forEach((stats) => {
      if (stats.total >= 2) {
        const accuracy = Math.round((stats.correct / stats.total) * 100);
        if (accuracy < 60) {
          weak.push({ description: stats.description, category: stats.category, accuracy });
        }
      }
    });
    
    return weak.sort((a, b) => a.accuracy - b.accuracy).slice(0, 10);
  },

  // ============ Game Sessions ============

  getSessions: (): GameSession[] => {
    try {
      const stored = localStorage.getItem(SESSIONS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  addSession: (session: Omit<GameSession, 'id' | 'date'>): GameSession => {
    const newSession: GameSession = {
      ...session,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };

    const current = leaderboardService.getSessions();
    const updated = [newSession, ...current].slice(0, MAX_SESSIONS);

    localStorage.setItem(SESSIONS_KEY, JSON.stringify(updated));
    return newSession;
  },

  getRecentSessions: (count: number = 10): GameSession[] => {
    return leaderboardService.getSessions().slice(0, count);
  },

  getOverallStats: () => {
    const sessions = leaderboardService.getSessions();
    const history = leaderboardService.getAnswerHistory();
    
    if (sessions.length === 0) {
      return {
        totalGames: 0,
        totalScore: 0,
        averageAccuracy: 0,
        bestStreak: 0,
        totalAnswers: history.length,
        correctAnswers: history.filter(h => h.isCorrect).length,
      };
    }

    return {
      totalGames: sessions.length,
      totalScore: sessions.reduce((sum, s) => sum + s.score, 0),
      averageAccuracy: Math.round(
        sessions.reduce((sum, s) => sum + s.accuracy, 0) / sessions.length
      ),
      bestStreak: Math.max(...sessions.map(s => s.streak)),
      totalAnswers: history.length,
      correctAnswers: history.filter(h => h.isCorrect).length,
    };
  },
};
