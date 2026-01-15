import { LeaderboardEntry, Category, DifficultyLevel, GameSession } from '@/types/game';

const LEADERBOARD_KEY = 'elufa-leaderboard';
const SESSIONS_KEY = 'elufa-game-sessions';
const DATA_FILE_PATH = '/data/leaderboard.json';
const MAX_ENTRIES = 100;
const MAX_SESSIONS = 50;

export interface LeaderboardFilters {
  category?: Category;
  level?: DifficultyLevel;
  timeframe?: 'today' | 'week' | 'month' | 'all';
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

    // Trigger sync to persist (in a real server environment, this would write to the file)
    leaderboardService.syncToFile();

    return newEntry;
  },

  // Sync data to file (for export/download)
  syncToFile: (): void => {
    const data: LeaderboardData = {
      entries: leaderboardService.getAll(),
      lastUpdated: new Date().toISOString()
    };
    
    // Store the data that should be synced via GitHub
    // In a local Debian environment, this will be available for manual export
    localStorage.setItem('elufa-leaderboard-export', JSON.stringify(data, null, 2));
    
    console.log('Leaderboard data ready for sync. Export available in localStorage.');
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

  // Import leaderboard from JSON file
  importFromFile: async (file: File): Promise<void> => {
    const text = await file.text();
    const data: LeaderboardData = JSON.parse(text);
    
    const current = leaderboardService.getAll();
    const merged = leaderboardService.mergeEntries(data.entries, current);
    
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(merged));
    cachedData = { entries: merged, lastUpdated: new Date().toISOString() };
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

  // ============ Game Sessions ============

  // Get all game sessions
  getSessions: (): GameSession[] => {
    try {
      const stored = localStorage.getItem(SESSIONS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  // Add game session
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

  // Get recent sessions
  getRecentSessions: (count: number = 10): GameSession[] => {
    return leaderboardService.getSessions().slice(0, count);
  },

  // Get sessions by category
  getSessionsByCategory: (category: Category): GameSession[] => {
    return leaderboardService.getSessions().filter(s => s.category === category);
  },

  // Calculate category performance
  getCategoryPerformance: (): Record<Category, { accuracy: number; games: number }> => {
    const sessions = leaderboardService.getSessions();
    const categories: Category[] = ['windows', 'excel', 'powerpoint', 'general'];

    const performance: Record<Category, { accuracy: number; games: number }> = {} as any;

    categories.forEach(cat => {
      const catSessions = sessions.filter(s => s.category === cat);
      const totalAccuracy = catSessions.reduce((sum, s) => sum + s.accuracy, 0);
      performance[cat] = {
        accuracy: catSessions.length > 0 ? Math.round(totalAccuracy / catSessions.length) : 0,
        games: catSessions.length,
      };
    });

    return performance;
  },

  // Get overall stats
  getOverallStats: () => {
    const sessions = leaderboardService.getSessions();
    
    if (sessions.length === 0) {
      return {
        totalGames: 0,
        totalScore: 0,
        averageAccuracy: 0,
        bestStreak: 0,
        totalTime: 0,
      };
    }

    return {
      totalGames: sessions.length,
      totalScore: sessions.reduce((sum, s) => sum + s.score, 0),
      averageAccuracy: Math.round(
        sessions.reduce((sum, s) => sum + s.accuracy, 0) / sessions.length
      ),
      bestStreak: Math.max(...sessions.map(s => s.streak)),
      totalTime: sessions.reduce((sum, s) => sum + s.timeSpent, 0),
    };
  },
};
