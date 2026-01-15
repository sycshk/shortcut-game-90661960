/**
 * API Service - Handles all communication with the SQLite backend
 * Falls back to localStorage when API is unavailable (offline support)
 */

// API environment management
const STORAGE_KEY = 'shortcut-api-environment';
const PRODUCTION_API = 'https://api.game.elufasys.com';
const LOCAL_API = 'http://localhost:3001';

function getApiBase(): string {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'production') return PRODUCTION_API;
  if (saved === 'local') return LOCAL_API;
  // Auto-detect: use production for Lovable preview or published domains
  const hostname = window.location.hostname;
  const isProduction = hostname.includes('lovable') || 
                       hostname.includes('elufasys') || 
                       hostname.endsWith('.app') ||
                       !hostname.includes('localhost');
  return isProduction ? PRODUCTION_API : LOCAL_API;
}

export function getApiEnvironment(): 'production' | 'local' | 'auto' {
  return (localStorage.getItem(STORAGE_KEY) as 'production' | 'local') || 'auto';
}

export function setApiEnvironment(env: 'production' | 'local' | 'auto'): void {
  if (env === 'auto') {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, env);
  }
  // Reload to apply changes
  window.location.reload();
}

export function getApiBaseUrl(): string {
  return getApiBase();
}

const API_BASE = getApiBase();
console.log('🔌 API Base:', API_BASE, `(${getApiEnvironment()})`);

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  offline: boolean;
}

class ApiService {
  private isOnline: boolean = true;

  constructor() {
    // Check API health on init
    this.checkHealth();
  }

  private async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE}/health`, { 
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) {
        this.isOnline = false;
        return false;
      }
      // Verify it's actually JSON from our API, not HTML from Vite
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        this.isOnline = false;
        return false;
      }
      this.isOnline = true;
      return true;
    } catch {
      this.isOnline = false;
      return false;
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          data: null,
          error: errorData.error || `HTTP ${response.status}`,
          offline: false,
        };
      }

      const data = await response.json();
      this.isOnline = true;
      return { data, error: null, offline: false };
    } catch (error) {
      console.warn('API request failed, may be offline:', error);
      this.isOnline = false;
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Network error',
        offline: true,
      };
    }
  }

  // ============ LEADERBOARD ============

  async getLeaderboard(filters?: {
    category?: string;
    level?: string;
    difficulty?: string;
    limit?: number;
  }) {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.level) params.append('level', filters.level);
    if (filters?.difficulty) params.append('difficulty', filters.difficulty);
    if (filters?.limit) params.append('limit', String(filters.limit));

    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<{ entries: any[]; lastUpdated: string }>(
      `/leaderboard${query}`
    );
  }

  async getAggregatedLeaderboard(limit = 50) {
    return this.request<{ entries: any[] }>(
      `/leaderboard/aggregated?limit=${limit}`
    );
  }

  async getPersonalBest(email: string, category?: string, level?: string) {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (level) params.append('level', level);
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<any>(
      `/leaderboard/personal-best/${encodeURIComponent(email)}${query}`
    );
  }

  async getUserRank(email: string) {
    return this.request<{ rank: number | null; score?: number }>(
      `/leaderboard/rank/${encodeURIComponent(email)}`
    );
  }

  async addLeaderboardEntry(entry: {
    name: string;
    email?: string;
    score: number;
    accuracy?: number;
    category?: string;
    level?: string;
    difficulty?: string;
    streak?: number;
  }) {
    return this.request<{ id: number; message: string }>('/leaderboard', {
      method: 'POST',
      body: JSON.stringify(entry),
    });
  }

  async updateLeaderboardName(email: string, newName: string) {
    return this.request<{ updated: number; message: string }>(
      '/leaderboard/update-name',
      {
        method: 'PUT',
        body: JSON.stringify({ email, newName }),
      }
    );
  }

  // ============ USERS ============

  async getUser(email: string) {
    return this.request<{
      id: number;
      email: string;
      display_name: string;
      organization: string | null;
      created_at: string;
      last_active: string;
    }>(`/users/${encodeURIComponent(email)}`);
  }

  async createOrUpdateUser(userData: {
    email: string;
    display_name?: string;
    organization?: string;
  }) {
    return this.request<any>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateDisplayName(email: string, displayName: string) {
    return this.request<any>(`/users/${encodeURIComponent(email)}/name`, {
      method: 'PUT',
      body: JSON.stringify({ display_name: displayName }),
    });
  }

  async getUserStats(email: string) {
    return this.request<{
      games: any;
      daily: any;
      streak: any;
    }>(`/users/${encodeURIComponent(email)}/stats`);
  }

  // ============ SESSIONS ============

  async getSessions(email: string, limit = 50) {
    return this.request<{ sessions: any[] }>(
      `/sessions/${encodeURIComponent(email)}?limit=${limit}`
    );
  }

  async getRecentSessions(email: string, days = 7) {
    return this.request<{ sessions: any[] }>(
      `/sessions/${encodeURIComponent(email)}/recent?days=${days}`
    );
  }

  async getSessionStats(email: string) {
    return this.request<any>(
      `/sessions/${encodeURIComponent(email)}/stats`
    );
  }

  async addSession(session: {
    email?: string;
    level?: string;
    category?: string;
    mode?: string;
    score: number;
    correct_answers: number;
    total_questions: number;
    accuracy: number;
    time_spent?: number;
    streak?: number;
  }) {
    return this.request<{ id: number; message: string }>('/sessions', {
      method: 'POST',
      body: JSON.stringify(session),
    });
  }

  // ============ ANSWER HISTORY ============

  async getAnswerHistory(email: string, limit = 500) {
    return this.request<{ records: any[] }>(
      `/history/${encodeURIComponent(email)}?limit=${limit}`
    );
  }

  async getCategoryAnalysis(email: string) {
    return this.request<{ categories: any[] }>(
      `/history/${encodeURIComponent(email)}/categories`
    );
  }

  async getWeakShortcuts(email: string, limit = 10) {
    return this.request<{ shortcuts: any[] }>(
      `/history/${encodeURIComponent(email)}/weak?limit=${limit}`
    );
  }

  async addAnswerRecord(record: {
    email?: string;
    shortcut_id?: string;
    shortcut_name?: string;
    category?: string;
    level?: string;
    is_correct: boolean;
    user_answer?: string;
    correct_answer?: string;
    time_spent?: number;
  }) {
    return this.request<{ id: number; message: string }>('/history', {
      method: 'POST',
      body: JSON.stringify(record),
    });
  }

  async addAnswerRecordsBatch(email: string, records: any[]) {
    return this.request<{ inserted: number; message: string }>('/history/batch', {
      method: 'POST',
      body: JSON.stringify({ email, records }),
    });
  }

  // ============ DAILY CHALLENGES ============

  async getDailyStatus(email: string) {
    return this.request<{
      today: any | null;
      streak: {
        current_streak: number;
        longest_streak: number;
        last_completed_date: string | null;
        total_days: number;
        badges: string;
      };
    }>(`/daily/${encodeURIComponent(email)}`);
  }

  async getDailyHistory(email: string, limit = 30) {
    return this.request<{ history: any[] }>(
      `/daily/${encodeURIComponent(email)}/history?limit=${limit}`
    );
  }

  async completeDailyChallenge(data: {
    email: string;
    score: number;
    accuracy: number;
    shortcuts?: any[];
  }) {
    return this.request<{
      message: string;
      challenge: any;
      streak: any;
    }>('/daily/complete', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // ============ UTILITY ============

  get online() {
    return this.isOnline;
  }

  async ping() {
    return this.checkHealth();
  }

}

// Export singleton instance
export const apiService = new ApiService();
