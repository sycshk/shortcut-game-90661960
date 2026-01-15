import { UserProfile, GameStats, INITIAL_GAME_STATS } from '@/types/game';

const USER_KEY = 'elufa-user-profile';
const STATS_KEY = 'elufa-game-stats';

// Allowed domains for enterprise SSO simulation
const ENTERPRISE_DOMAINS = ['elufa.com', 'company.com'];

export const authService = {
  // Validate email format
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Check if email belongs to enterprise domain
  isEnterpriseDomain: (email: string): boolean => {
    const domain = email.split('@')[1]?.toLowerCase();
    return ENTERPRISE_DOMAINS.includes(domain);
  },

  // Extract organization from email domain
  getOrganizationFromEmail: (email: string): string | undefined => {
    const domain = email.split('@')[1]?.toLowerCase();
    if (!domain) return undefined;
    
    // Extract company name from domain (e.g., company.com -> Company)
    const name = domain.split('.')[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  },

  // Create new user profile
  createUserProfile: (email: string, name?: string): UserProfile => {
    const profile: UserProfile = {
      id: Date.now().toString(),
      email,
      name: name || email.split('@')[0],
      organization: authService.getOrganizationFromEmail(email),
      createdAt: new Date().toISOString(),
      stats: { ...INITIAL_GAME_STATS },
    };
    
    localStorage.setItem(USER_KEY, JSON.stringify(profile));
    return profile;
  },

  // Login user (create or retrieve profile)
  login: (email: string): UserProfile | null => {
    if (!authService.isValidEmail(email)) {
      return null;
    }

    // Check if user already exists
    const existingUser = authService.getCurrentUser();
    if (existingUser && existingUser.email === email) {
      return existingUser;
    }

    // Create new profile
    return authService.createUserProfile(email);
  },

  // Guest login
  loginAsGuest: (): UserProfile => {
    const guestId = `guest-${Date.now()}`;
    return authService.createUserProfile(`${guestId}@guest.local`, 'Guest');
  },

  // Get current logged-in user
  getCurrentUser: (): UserProfile | null => {
    try {
      const stored = localStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  // Update user profile
  updateProfile: (updates: Partial<UserProfile>): UserProfile | null => {
    const current = authService.getCurrentUser();
    if (!current) return null;

    const updated = { ...current, ...updates };
    localStorage.setItem(USER_KEY, JSON.stringify(updated));
    return updated;
  },

  // Update user stats
  updateStats: (newStats: Partial<GameStats>): UserProfile | null => {
    const current = authService.getCurrentUser();
    if (!current) return null;

    const updated = {
      ...current,
      stats: { ...current.stats, ...newStats },
    };
    localStorage.setItem(USER_KEY, JSON.stringify(updated));
    return updated;
  },

  // Logout user
  logout: (): void => {
    localStorage.removeItem(USER_KEY);
  },

  // Check if user is logged in
  isLoggedIn: (): boolean => {
    return authService.getCurrentUser() !== null;
  },

  // Get user display name
  getDisplayName: (): string => {
    const user = authService.getCurrentUser();
    return user?.name || 'Guest';
  },
};
