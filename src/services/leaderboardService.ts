import { LeaderboardEntry, Category, DifficultyLevel, GameSession, ShortcutChallenge } from '@/types/game';

const LEADERBOARD_KEY = 'shortcut-leaderboard';
const SESSIONS_KEY = 'shortcut-game-sessions';
const PROFILES_KEY = 'shortcut-user-profiles';
const ANSWER_HISTORY_KEY = 'shortcut-answer-history';

// Server data file paths - these are read from public and synced to localStorage
const LEADERBOARD_FILE = '/data/leaderboard.json';
const PROFILES_FILE = '/data/profiles.json';
const SESSIONS_FILE = '/data/sessions.json';
const HISTORY_FILE = '/data/history.json';

// Export file paths (for syncing back to server)
const EXPORT_LEADERBOARD_KEY = 'shortcut-export-leaderboard';
const EXPORT_PROFILES_KEY = 'shortcut-export-profiles';
const EXPORT_SESSIONS_KEY = 'shortcut-export-sessions';
const EXPORT_HISTORY_KEY = 'shortcut-export-history';

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
  email: string;
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

interface ProfilesData {
  profiles: Record<string, UserProfileData>;
  lastUpdated: string | null;
}

interface SessionsData {
  sessions: GameSession[];
  lastUpdated: string | null;
}

interface HistoryData {
  records: AnswerRecord[];
  lastUpdated: string | null;
}

// In-memory cache
let cachedLeaderboard: LeaderboardEntry[] | null = null;
let cachedProfiles: Record<string, UserProfileData> | null = null;
let cachedSessions: GameSession[] | null = null;
let cachedHistory: AnswerRecord[] | null = null;
let isInitialized = false;

export const leaderboardService = {
  // Initialize by loading from JSON files
  init: async (): Promise<void> => {
    if (isInitialized) return;
    
    try {
      // Load leaderboard
      const leaderboardRes = await fetch(LEADERBOARD_FILE);
      if (leaderboardRes.ok) {
        const data: LeaderboardData = await leaderboardRes.json();
        const localData = leaderboardService.getFromLocalStorage(LEADERBOARD_KEY, []);
        cachedLeaderboard = leaderboardService.mergeEntries(data.entries || [], localData);
        localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(cachedLeaderboard));
      }
    } catch {
      console.log('Loading leaderboard from localStorage only');
      cachedLeaderboard = leaderboardService.getFromLocalStorage(LEADERBOARD_KEY, []);
    }

    try {
      // Load profiles
      const profilesRes = await fetch(PROFILES_FILE);
      if (profilesRes.ok) {
        const data: ProfilesData = await profilesRes.json();
        const localProfiles = leaderboardService.getFromLocalStorage(PROFILES_KEY, {});
        cachedProfiles = { ...data.profiles, ...localProfiles };
        localStorage.setItem(PROFILES_KEY, JSON.stringify(cachedProfiles));
      }
    } catch {
      console.log('Loading profiles from localStorage only');
      cachedProfiles = leaderboardService.getFromLocalStorage(PROFILES_KEY, {});
    }

    try {
      // Load sessions
      const sessionsRes = await fetch(SESSIONS_FILE);
      if (sessionsRes.ok) {
        const data: SessionsData = await sessionsRes.json();
        const localSessions = leaderboardService.getFromLocalStorage(SESSIONS_KEY, []);
        cachedSessions = leaderboardService.mergeSessions(data.sessions || [], localSessions);
        localStorage.setItem(SESSIONS_KEY, JSON.stringify(cachedSessions));
      }
    } catch {
      console.log('Loading sessions from localStorage only');
      cachedSessions = leaderboardService.getFromLocalStorage(SESSIONS_KEY, []);
    }

    try {
      // Load history
      const historyRes = await fetch(HISTORY_FILE);
      if (historyRes.ok) {
        const data: HistoryData = await historyRes.json();
        const localHistory = leaderboardService.getFromLocalStorage(ANSWER_HISTORY_KEY, []);
        cachedHistory = leaderboardService.mergeHistory(data.records || [], localHistory);
        localStorage.setItem(ANSWER_HISTORY_KEY, JSON.stringify(cachedHistory));
      }
    } catch {
      console.log('Loading history from localStorage only');
      cachedHistory = leaderboardService.getFromLocalStorage(ANSWER_HISTORY_KEY, []);
    }
    
    isInitialized = true;
  },

  // Generic get from localStorage
  getFromLocalStorage: <T>(key: string, defaultValue: T): T => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  // Merge entries from two sources, removing duplicates by id
  mergeEntries: (fileEntries: LeaderboardEntry[], localEntries: LeaderboardEntry[]): LeaderboardEntry[] => {
    const entryMap = new Map<string, LeaderboardEntry>();
    fileEntries.forEach(entry => entryMap.set(entry.id, entry));
    localEntries.forEach(entry => entryMap.set(entry.id, entry));
    return Array.from(entryMap.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_ENTRIES);
  },

  mergeSessions: (fileSessions: GameSession[], localSessions: GameSession[]): GameSession[] => {
    const sessionMap = new Map<string, GameSession>();
    fileSessions.forEach(s => sessionMap.set(s.id, s));
    localSessions.forEach(s => sessionMap.set(s.id, s));
    return Array.from(sessionMap.values())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, MAX_SESSIONS);
  },

  mergeHistory: (fileRecords: AnswerRecord[], localRecords: AnswerRecord[]): AnswerRecord[] => {
    const recordMap = new Map<string, AnswerRecord>();
    fileRecords.forEach(r => recordMap.set(r.id, r));
    localRecords.forEach(r => recordMap.set(r.id, r));
    return Array.from(recordMap.values())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 500);
  },

  // Sync all data to export keys (for server sync)
  syncAllToExport: (): void => {
    const leaderboardData: LeaderboardData = {
      entries: cachedLeaderboard || [],
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(EXPORT_LEADERBOARD_KEY, JSON.stringify(leaderboardData, null, 2));

    const profilesData: ProfilesData = {
      profiles: cachedProfiles || {},
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(EXPORT_PROFILES_KEY, JSON.stringify(profilesData, null, 2));

    const sessionsData: SessionsData = {
      sessions: cachedSessions || [],
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(EXPORT_SESSIONS_KEY, JSON.stringify(sessionsData, null, 2));

    const historyData: HistoryData = {
      records: cachedHistory || [],
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(EXPORT_HISTORY_KEY, JSON.stringify(historyData, null, 2));

    console.log('All data synced to export keys for server persistence.');
  },

  // ============ Leaderboard ============
  
  getAll: (): LeaderboardEntry[] => {
    if (cachedLeaderboard) return cachedLeaderboard;
    return leaderboardService.getFromLocalStorage(LEADERBOARD_KEY, []);
  },

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
    return entries.sort((a, b) => b.score - a.score);
  },

  getTop: (count: number = 10, filters?: LeaderboardFilters): LeaderboardEntry[] => {
    return leaderboardService.getFiltered(filters).slice(0, count);
  },

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

    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updated));
    cachedLeaderboard = updated;
    leaderboardService.syncAllToExport();

    return newEntry;
  },

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

  getRank: (name: string): number | null => {
    const entries = leaderboardService.getAll().sort((a, b) => b.score - a.score);
    const index = entries.findIndex(e => e.name.toLowerCase() === name.toLowerCase());
    return index >= 0 ? index + 1 : null;
  },

  getAggregatedLeaderboard: (count: number = 10): { name: string; totalScore: number; gamesPlayed: number; avgAccuracy: number }[] => {
    const entries = leaderboardService.getAll();
    const userStats = new Map<string, { totalScore: number; gamesPlayed: number; totalAccuracy: number }>();
    
    entries.forEach(entry => {
      const stats = userStats.get(entry.name) || { totalScore: 0, gamesPlayed: 0, totalAccuracy: 0 };
      stats.totalScore += entry.score;
      stats.gamesPlayed += 1;
      stats.totalAccuracy += entry.accuracy;
      userStats.set(entry.name, stats);
    });
    
    const aggregated: { name: string; totalScore: number; gamesPlayed: number; avgAccuracy: number }[] = [];
    userStats.forEach((stats, name) => {
      aggregated.push({
        name,
        totalScore: stats.totalScore,
        gamesPlayed: stats.gamesPlayed,
        avgAccuracy: Math.round(stats.totalAccuracy / stats.gamesPlayed),
      });
    });
    
    return aggregated.sort((a, b) => b.totalScore - a.totalScore).slice(0, count);
  },

  updateEntriesName: (oldName: string, newName: string): void => {
    const entries = leaderboardService.getAll();
    const updated = entries.map(entry => {
      if (entry.name.toLowerCase() === oldName.toLowerCase()) {
        return { ...entry, name: newName };
      }
      return entry;
    });
    
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updated));
    cachedLeaderboard = updated;
    leaderboardService.syncAllToExport();
  },

  clear: (): void => {
    localStorage.removeItem(LEADERBOARD_KEY);
    cachedLeaderboard = [];
  },

  // ============ User Profiles ============
  
  getProfile: (email: string): UserProfileData | null => {
    if (cachedProfiles) return cachedProfiles[email] || null;
    const profiles = leaderboardService.getFromLocalStorage<Record<string, UserProfileData>>(PROFILES_KEY, {});
    return profiles[email] || null;
  },

  saveProfile: (profile: UserProfileData): void => {
    const profiles = cachedProfiles || leaderboardService.getFromLocalStorage<Record<string, UserProfileData>>(PROFILES_KEY, {});
    profiles[profile.email] = profile;
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
    cachedProfiles = profiles;
    leaderboardService.syncAllToExport();
  },

  updateDisplayName: (email: string, newName: string, oldName?: string): void => {
    const profile = leaderboardService.getProfile(email);
    if (profile) {
      const previousName = oldName || profile.displayName;
      profile.displayName = newName;
      profile.lastActive = new Date().toISOString();
      leaderboardService.saveProfile(profile);
      leaderboardService.updateEntriesName(previousName, newName);
    }
  },

  // ============ Answer History ============

  getAnswerHistory: (email?: string): AnswerRecord[] => {
    const history = cachedHistory || leaderboardService.getFromLocalStorage<AnswerRecord[]>(ANSWER_HISTORY_KEY, []);
    if (email) {
      return history.filter(h => h.email === email);
    }
    return history;
  },

  addAnswerRecord: (record: Omit<AnswerRecord, 'id' | 'date'>): void => {
    const history = cachedHistory || leaderboardService.getFromLocalStorage<AnswerRecord[]>(ANSWER_HISTORY_KEY, []);
    const newRecord: AnswerRecord = {
      ...record,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    
    const updated = [newRecord, ...history].slice(0, 500);
    localStorage.setItem(ANSWER_HISTORY_KEY, JSON.stringify(updated));
    cachedHistory = updated;
    leaderboardService.syncAllToExport();
  },

  getCategoryAnalysis: (email?: string): Record<Category, { correct: number; total: number; accuracy: number; weakShortcuts: string[] }> => {
    const history = leaderboardService.getAnswerHistory(email);
    const categories: Category[] = ['windows', 'excel', 'powerpoint', 'general'];
    
    const analysis = {} as Record<Category, { correct: number; total: number; accuracy: number; weakShortcuts: string[] }>;
    
    categories.forEach(cat => {
      const catAnswers = history.filter(h => h.category === cat);
      const correct = catAnswers.filter(h => h.isCorrect).length;
      const total = catAnswers.length;
      
      const shortcutStats = new Map<string, { correct: number; total: number; description: string }>();
      catAnswers.forEach(a => {
        const stats = shortcutStats.get(a.shortcutId) || { correct: 0, total: 0, description: a.shortcutDescription };
        stats.total++;
        if (a.isCorrect) stats.correct++;
        shortcutStats.set(a.shortcutId, stats);
      });
      
      const weakShortcuts: string[] = [];
      shortcutStats.forEach((stats) => {
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

  getWeakShortcuts: (email?: string): { description: string; category: Category; accuracy: number }[] => {
    const history = leaderboardService.getAnswerHistory(email);
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

  getSessions: (email?: string): GameSession[] => {
    const sessions = cachedSessions || leaderboardService.getFromLocalStorage<GameSession[]>(SESSIONS_KEY, []);
    if (email) {
      return sessions.filter(s => s.email === email);
    }
    return sessions;
  },

  addSession: (session: Omit<GameSession, 'id' | 'date'>): GameSession => {
    const newSession: GameSession = {
      ...session,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };

    const current = cachedSessions || leaderboardService.getFromLocalStorage<GameSession[]>(SESSIONS_KEY, []);
    const updated = [newSession, ...current].slice(0, MAX_SESSIONS);

    localStorage.setItem(SESSIONS_KEY, JSON.stringify(updated));
    cachedSessions = updated;
    leaderboardService.syncAllToExport();

    return newSession;
  },

  getRecentSessions: (count: number = 10, email?: string): GameSession[] => {
    return leaderboardService.getSessions(email).slice(0, count);
  },

  getOverallStats: (email?: string) => {
    const sessions = leaderboardService.getSessions(email);
    const history = leaderboardService.getAnswerHistory(email);
    
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

  // Export all data as downloadable files
  exportAllData: (): void => {
    const data = {
      leaderboard: { entries: cachedLeaderboard || [], lastUpdated: new Date().toISOString() },
      profiles: { profiles: cachedProfiles || {}, lastUpdated: new Date().toISOString() },
      sessions: { sessions: cachedSessions || [], lastUpdated: new Date().toISOString() },
      history: { records: cachedHistory || [], lastUpdated: new Date().toISOString() },
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shortcut-game-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },
};
