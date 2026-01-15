import { LeaderboardEntry, Category, DifficultyLevel, GameSession, ShortcutChallenge } from '@/types/game';
import { apiService } from './apiService';

const LEADERBOARD_KEY = 'shortcut-leaderboard';
const SESSIONS_KEY = 'shortcut-game-sessions';
const PROFILES_KEY = 'shortcut-user-profiles';
const ANSWER_HISTORY_KEY = 'shortcut-answer-history';

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

// In-memory cache
let cachedLeaderboard: LeaderboardEntry[] | null = null;
let cachedProfiles: Record<string, UserProfileData> | null = null;
let cachedSessions: GameSession[] | null = null;
let cachedHistory: AnswerRecord[] | null = null;
let isInitialized = false;
let useApi = false;

export const leaderboardService = {
  // Initialize by loading from API or localStorage
  init: async (): Promise<void> => {
    if (isInitialized) return;
    
    console.group('📊 LeaderboardService Init');
    
    // Check if API is available
    useApi = await apiService.ping();
    console.log('API available:', useApi);
    
    if (useApi) {
      console.log('Using SQLite API backend');
      // API is available, we'll fetch on-demand
      isInitialized = true;
      console.groupEnd();
      return;
    }
    
    console.log('API unavailable, using localStorage fallback');
    
    // Fallback to localStorage
    cachedLeaderboard = leaderboardService.getFromLocalStorage(LEADERBOARD_KEY, []);
    cachedProfiles = leaderboardService.getFromLocalStorage(PROFILES_KEY, {});
    cachedSessions = leaderboardService.getFromLocalStorage(SESSIONS_KEY, []);
    cachedHistory = leaderboardService.getFromLocalStorage(ANSWER_HISTORY_KEY, []);
    
    console.log('Loaded from localStorage:', {
      leaderboard: cachedLeaderboard.length,
      profiles: Object.keys(cachedProfiles).length,
      sessions: cachedSessions.length,
      history: cachedHistory.length
    });
    
    console.groupEnd();
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

  // Check if using API
  isUsingApi: (): boolean => useApi,

  // ============ Leaderboard ============
  
  getAll: async (): Promise<LeaderboardEntry[]> => {
    if (useApi) {
      const result = await apiService.getLeaderboard({ limit: MAX_ENTRIES });
      if (result.data?.entries) {
        return result.data.entries.map(e => ({
          id: String(e.id),
          name: e.name,
          score: e.score,
          accuracy: e.accuracy || 0,
          category: e.category || 'all',
          level: e.level || 'all',
          difficulty: e.difficulty || 'normal',
          streak: e.streak || 0,
          date: e.created_at || new Date().toISOString()
        }));
      }
    }
    return cachedLeaderboard || leaderboardService.getFromLocalStorage(LEADERBOARD_KEY, []);
  },

  getAllSync: (): LeaderboardEntry[] => {
    return cachedLeaderboard || leaderboardService.getFromLocalStorage(LEADERBOARD_KEY, []);
  },

  getFiltered: async (filters?: LeaderboardFilters): Promise<LeaderboardEntry[]> => {
    let entries = await leaderboardService.getAll();

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

  getTop: async (count: number = 10, filters?: LeaderboardFilters): Promise<LeaderboardEntry[]> => {
    const filtered = await leaderboardService.getFiltered(filters);
    return filtered.slice(0, count);
  },

  addEntry: async (entry: Omit<LeaderboardEntry, 'id' | 'date'>, email?: string): Promise<LeaderboardEntry> => {
    const newEntry: LeaderboardEntry = {
      ...entry,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };

    if (useApi) {
      const result = await apiService.addLeaderboardEntry({
        name: entry.name,
        email,
        score: entry.score,
        accuracy: entry.accuracy,
        category: entry.category,
        level: entry.level,
        difficulty: entry.difficulty,
        streak: entry.streak
      });
      if (result.data?.id) {
        newEntry.id = String(result.data.id);
      }
    }

    // Also save to localStorage as backup
    const current = cachedLeaderboard || leaderboardService.getFromLocalStorage(LEADERBOARD_KEY, []);
    const updated = [...current, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_ENTRIES);

    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updated));
    cachedLeaderboard = updated;

    return newEntry;
  },

  getPersonalBest: async (nameOrEmail: string, category?: Category): Promise<LeaderboardEntry | null> => {
    if (useApi && nameOrEmail.includes('@')) {
      const result = await apiService.getPersonalBest(nameOrEmail, category);
      if (result.data) {
        return {
          id: String(result.data.id),
          name: result.data.name,
          score: result.data.score,
          accuracy: result.data.accuracy || 0,
          category: result.data.category || 'all',
          level: result.data.level || 'all',
          difficulty: result.data.difficulty || 'normal',
          streak: result.data.streak || 0,
          date: result.data.created_at || new Date().toISOString()
        };
      }
    }

    const entries = (await leaderboardService.getAll())
      .filter(e => e.name.toLowerCase() === nameOrEmail.toLowerCase());

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

  getRank: async (nameOrEmail: string): Promise<number | null> => {
    if (useApi && nameOrEmail.includes('@')) {
      const result = await apiService.getUserRank(nameOrEmail);
      return result.data?.rank || null;
    }

    const entries = (await leaderboardService.getAll()).sort((a, b) => b.score - a.score);
    const index = entries.findIndex(e => e.name.toLowerCase() === nameOrEmail.toLowerCase());
    return index >= 0 ? index + 1 : null;
  },

  getAggregatedLeaderboard: async (count: number = 10): Promise<{ name: string; totalScore: number; gamesPlayed: number; avgAccuracy: number }[]> => {
    if (useApi) {
      const result = await apiService.getAggregatedLeaderboard(count);
      if (result.data?.entries) {
        return result.data.entries.map(e => ({
          name: e.name,
          totalScore: e.best_score,
          gamesPlayed: e.games_played,
          avgAccuracy: Math.round(e.best_accuracy || 0)
        }));
      }
    }

    const entries = await leaderboardService.getAll();
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

  updateEntriesName: async (oldName: string, newName: string, email?: string): Promise<void> => {
    if (useApi && email) {
      await apiService.updateLeaderboardName(email, newName);
    }

    const entries = cachedLeaderboard || leaderboardService.getFromLocalStorage(LEADERBOARD_KEY, []);
    const updated = entries.map(entry => {
      if (entry.name.toLowerCase() === oldName.toLowerCase()) {
        return { ...entry, name: newName };
      }
      return entry;
    });
    
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updated));
    cachedLeaderboard = updated;
  },

  clear: (): void => {
    localStorage.removeItem(LEADERBOARD_KEY);
    cachedLeaderboard = [];
  },

  // ============ User Profiles ============
  
  getProfile: async (email: string): Promise<UserProfileData | null> => {
    if (useApi) {
      const result = await apiService.getUser(email);
      if (result.data) {
        return {
          email: result.data.email,
          displayName: result.data.display_name,
          createdAt: result.data.created_at,
          lastActive: result.data.last_active
        };
      }
    }
    
    if (cachedProfiles) return cachedProfiles[email] || null;
    const profiles = leaderboardService.getFromLocalStorage<Record<string, UserProfileData>>(PROFILES_KEY, {});
    return profiles[email] || null;
  },

  saveProfile: async (profile: UserProfileData): Promise<void> => {
    if (useApi) {
      await apiService.createOrUpdateUser({
        email: profile.email,
        display_name: profile.displayName,
        organization: undefined
      });
    }

    const profiles = cachedProfiles || leaderboardService.getFromLocalStorage<Record<string, UserProfileData>>(PROFILES_KEY, {});
    profiles[profile.email] = profile;
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
    cachedProfiles = profiles;
  },

  updateDisplayName: async (email: string, newName: string, oldName?: string): Promise<void> => {
    const profile = await leaderboardService.getProfile(email);
    if (profile) {
      const previousName = oldName || profile.displayName;
      profile.displayName = newName;
      profile.lastActive = new Date().toISOString();
      await leaderboardService.saveProfile(profile);
      await leaderboardService.updateEntriesName(previousName, newName, email);
    }

    if (useApi) {
      await apiService.updateDisplayName(email, newName);
    }
  },

  // ============ Answer History ============

  getAnswerHistory: async (email?: string): Promise<AnswerRecord[]> => {
    if (useApi && email) {
      const result = await apiService.getAnswerHistory(email);
      if (result.data?.records) {
        return result.data.records.map(r => ({
          id: String(r.id),
          date: r.created_at,
          email: r.email,
          shortcutId: r.shortcut_id,
          shortcutDescription: r.shortcut_name,
          category: r.category,
          level: r.level,
          isCorrect: Boolean(r.is_correct),
          userAnswer: r.user_answer ? r.user_answer.split('+') : [],
          correctAnswer: r.correct_answer ? r.correct_answer.split('+') : [],
          timeSpent: r.time_spent
        }));
      }
    }

    const history = cachedHistory || leaderboardService.getFromLocalStorage<AnswerRecord[]>(ANSWER_HISTORY_KEY, []);
    if (email) {
      return history.filter(h => h.email === email);
    }
    return history;
  },

  addAnswerRecord: async (record: Omit<AnswerRecord, 'id' | 'date'>): Promise<void> => {
    if (useApi) {
      await apiService.addAnswerRecord({
        email: record.email,
        shortcut_id: record.shortcutId,
        shortcut_name: record.shortcutDescription,
        category: record.category,
        level: record.level,
        is_correct: record.isCorrect,
        user_answer: record.userAnswer.join('+'),
        correct_answer: record.correctAnswer.join('+'),
        time_spent: record.timeSpent
      });
    }

    const history = cachedHistory || leaderboardService.getFromLocalStorage<AnswerRecord[]>(ANSWER_HISTORY_KEY, []);
    const newRecord: AnswerRecord = {
      ...record,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    
    const updated = [newRecord, ...history].slice(0, 500);
    localStorage.setItem(ANSWER_HISTORY_KEY, JSON.stringify(updated));
    cachedHistory = updated;
  },

  getCategoryAnalysis: async (email?: string): Promise<Record<Category, { correct: number; total: number; accuracy: number; weakShortcuts: string[] }>> => {
    if (useApi && email) {
      const result = await apiService.getCategoryAnalysis(email);
      if (result.data?.categories) {
        const categories: Category[] = ['windows', 'excel', 'powerpoint', 'general'];
        const analysis = {} as Record<Category, { correct: number; total: number; accuracy: number; weakShortcuts: string[] }>;
        
        categories.forEach(cat => {
          const catData = result.data!.categories.find(c => c.category === cat);
          analysis[cat] = {
            correct: catData?.correct || 0,
            total: catData?.total_attempts || 0,
            accuracy: catData?.accuracy || 0,
            weakShortcuts: []
          };
        });
        
        return analysis;
      }
    }

    const history = await leaderboardService.getAnswerHistory(email);
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

  getWeakShortcuts: async (email?: string): Promise<{ description: string; category: Category; accuracy: number }[]> => {
    if (useApi && email) {
      const result = await apiService.getWeakShortcuts(email);
      if (result.data?.shortcuts) {
        return result.data.shortcuts.map(s => ({
          description: s.shortcut_name,
          category: s.category,
          accuracy: s.accuracy
        }));
      }
    }

    const history = await leaderboardService.getAnswerHistory(email);
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

  getSessions: async (email?: string): Promise<GameSession[]> => {
    if (useApi && email) {
      const result = await apiService.getSessions(email);
      if (result.data?.sessions) {
        return result.data.sessions.map(s => ({
          id: String(s.id),
          email: s.email,
          date: s.date,
          level: s.level,
          category: s.category,
          mode: s.mode,
          score: s.score,
          correctAnswers: s.correct_answers,
          totalQuestions: s.total_questions,
          accuracy: s.accuracy,
          timeSpent: s.time_spent,
          streak: s.streak
        }));
      }
    }

    const sessions = cachedSessions || leaderboardService.getFromLocalStorage<GameSession[]>(SESSIONS_KEY, []);
    if (email) {
      return sessions.filter(s => s.email === email);
    }
    return sessions;
  },

  addSession: async (session: Omit<GameSession, 'id' | 'date'>): Promise<GameSession> => {
    const newSession: GameSession = {
      ...session,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };

    if (useApi) {
      const result = await apiService.addSession({
        email: session.email,
        level: session.level,
        category: session.category,
        mode: session.mode,
        score: session.score,
        correct_answers: session.correctAnswers,
        total_questions: session.totalQuestions,
        accuracy: session.accuracy,
        time_spent: session.timeSpent,
        streak: session.streak
      });
      if (result.data?.id) {
        newSession.id = String(result.data.id);
      }
    }

    const current = cachedSessions || leaderboardService.getFromLocalStorage<GameSession[]>(SESSIONS_KEY, []);
    const updated = [newSession, ...current].slice(0, MAX_SESSIONS);

    localStorage.setItem(SESSIONS_KEY, JSON.stringify(updated));
    cachedSessions = updated;

    return newSession;
  },

  getRecentSessions: async (count: number = 10, email?: string): Promise<GameSession[]> => {
    const sessions = await leaderboardService.getSessions(email);
    return sessions.slice(0, count);
  },

  getOverallStats: async (email?: string) => {
    if (useApi && email) {
      const result = await apiService.getSessionStats(email);
      if (result.data) {
        return {
          totalGames: result.data.total_games || 0,
          totalScore: result.data.total_score || 0,
          averageAccuracy: Math.round(result.data.avg_accuracy || 0),
          bestStreak: result.data.best_streak || 0,
          totalAnswers: result.data.total_questions || 0,
          correctAnswers: result.data.total_correct || 0,
        };
      }
    }

    const sessions = await leaderboardService.getSessions(email);
    const history = await leaderboardService.getAnswerHistory(email);
    
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
