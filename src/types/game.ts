export type ShortcutCategory = 'os' | 'office';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Shortcut {
  id: string;
  task: string;
  keys: string[];
  category: ShortcutCategory;
  difficulty: Difficulty;
}

export interface GameState {
  status: 'welcome' | 'setup' | 'playing' | 'results';
  category: ShortcutCategory | null;
  difficulty: Difficulty | null;
  currentShortcutIndex: number;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeRemaining: number;
  shortcuts: Shortcut[];
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  accuracy: number;
  category: ShortcutCategory;
  difficulty: Difficulty;
  date: string;
}

export const DIFFICULTY_CONFIG = {
  easy: { timePerQuestion: 15, pointsPerCorrect: 10, questionsCount: 10 },
  medium: { timePerQuestion: 10, pointsPerCorrect: 20, questionsCount: 12 },
  hard: { timePerQuestion: 6, pointsPerCorrect: 30, questionsCount: 15 },
} as const;
