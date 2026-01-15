// Difficulty Levels - 4 tier curriculum
export type DifficultyLevel = 'essentials' | 'implementation' | 'architect' | 'guru';

// Categories
export type Category = 'windows' | 'excel' | 'powerpoint' | 'general';

// Game Modes
export type GameMode = 'practice' | 'timed' | 'challenge';

// Question types
export type QuestionType = 'keyboard' | 'multipleChoice';

// Legacy types for backward compatibility
export type ShortcutCategory = 'os' | 'office';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface ShortcutChallenge {
  id: string;
  level: DifficultyLevel;
  category: Category;
  description: string;
  keys: string[];
  hint?: string;
}

// Legacy shortcut interface
export interface Shortcut {
  id: string;
  task: string;
  keys: string[];
  category: ShortcutCategory;
  difficulty: Difficulty;
}

export interface GameStats {
  totalScore: number;
  gamesPlayed: number;
  correctAnswers: number;
  totalQuestions: number;
  bestStreak: number;
  currentStreak: number;
  totalTimeSpent: number;
  categoryStats: Record<Category, { correct: number; total: number }>;
  levelStats: Record<DifficultyLevel, { correct: number; total: number }>;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  organization?: string;
  createdAt: string;
  stats: GameStats;
}

export interface GameSession {
  id: string;
  email: string;
  date: string;
  level: DifficultyLevel;
  category: Category;
  mode: GameMode;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  accuracy: number;
  timeSpent: number;
  streak: number;
}

export interface GameState {
  status: 'welcome' | 'login' | 'setup' | 'playing' | 'results' | 'dashboard' | 'analytics' | 'dailyChallenge' | 'profile';
  category: Category | ShortcutCategory | null;
  difficulty: Difficulty | null;
  level: DifficultyLevel | null;
  mode: GameMode;
  currentShortcutIndex: number;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeRemaining: number;
  shortcuts: ShortcutChallenge[];
  currentStreak: number;
  bestStreak: number;
  hintsUsed: number;
  showHint: boolean;
  isFullscreen: boolean;
  // New fields for question type handling
  questionType: QuestionType;
  lastAnswerCorrect: boolean | null;
  waitingForNext: boolean;
  multipleChoiceOptions?: string[][];
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  accuracy: number;
  category: Category | ShortcutCategory;
  difficulty: Difficulty;
  level?: DifficultyLevel;
  date: string;
  streak?: number;
}

// Difficulty Configuration
export const DIFFICULTY_CONFIG = {
  easy: { timePerQuestion: 15, pointsPerCorrect: 10, questionsCount: 10 },
  medium: { timePerQuestion: 10, pointsPerCorrect: 20, questionsCount: 12 },
  hard: { timePerQuestion: 6, pointsPerCorrect: 30, questionsCount: 15 },
} as const;

export const LEVEL_CONFIG = {
  essentials: { 
    timePerQuestion: 20, 
    pointsPerCorrect: 10, 
    questionsCount: 10,
    label: 'Essentials',
    description: 'Basic shortcuts everyone should know',
    color: 'text-primary'
  },
  implementation: { 
    timePerQuestion: 20, 
    pointsPerCorrect: 15, 
    questionsCount: 10,
    label: 'Implementation',
    description: 'Intermediate shortcuts for productivity',
    color: 'text-secondary'
  },
  architect: { 
    timePerQuestion: 20, 
    pointsPerCorrect: 20, 
    questionsCount: 10,
    label: 'Architect',
    description: 'Advanced shortcuts for power users',
    color: 'text-primary'
  },
  guru: { 
    timePerQuestion: 20, 
    pointsPerCorrect: 25, 
    questionsCount: 10,
    label: 'Guru',
    description: 'Expert-level shortcuts for masters',
    color: 'text-secondary'
  },
} as const;

export const CATEGORY_CONFIG = {
  windows: {
    label: 'Windows',
    description: 'Windows OS shortcuts',
    icon: 'Monitor'
  },
  excel: {
    label: 'Excel',
    description: 'Microsoft Excel shortcuts',
    icon: 'Table'
  },
  powerpoint: {
    label: 'PowerPoint',
    description: 'Microsoft PowerPoint shortcuts',
    icon: 'Presentation'
  },
  general: {
    label: 'General',
    description: 'Cross-application shortcuts',
    icon: 'Keyboard'
  },
} as const;

export const MODE_CONFIG = {
  practice: {
    label: 'Practice',
    description: 'No timer, learn at your own pace',
    icon: 'BookOpen',
    hasTimer: false
  },
  timed: {
    label: 'Timed',
    description: 'Race against the clock',
    icon: 'Timer',
    hasTimer: true
  },
  challenge: {
    label: 'Challenge',
    description: 'Progressive difficulty, max streak',
    icon: 'Flame',
    hasTimer: true
  },
} as const;

// Initial stats
export const INITIAL_GAME_STATS: GameStats = {
  totalScore: 0,
  gamesPlayed: 0,
  correctAnswers: 0,
  totalQuestions: 0,
  bestStreak: 0,
  currentStreak: 0,
  totalTimeSpent: 0,
  categoryStats: {
    windows: { correct: 0, total: 0 },
    excel: { correct: 0, total: 0 },
    powerpoint: { correct: 0, total: 0 },
    general: { correct: 0, total: 0 },
  },
  levelStats: {
    essentials: { correct: 0, total: 0 },
    implementation: { correct: 0, total: 0 },
    architect: { correct: 0, total: 0 },
    guru: { correct: 0, total: 0 },
  },
};
