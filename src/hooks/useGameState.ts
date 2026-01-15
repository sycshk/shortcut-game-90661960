import { useState, useCallback, useEffect } from 'react';
import { GameState, ShortcutCategory, Difficulty, DIFFICULTY_CONFIG, LeaderboardEntry, DifficultyLevel, Category, LEVEL_CONFIG, ShortcutChallenge } from '@/types/game';
import { getShortcutsByCategory, shuffleArray, getShortcutsByLevelAndCategory, shortcutChallenges } from '@/data/shortcuts';

const LEADERBOARD_KEY = 'shortcut-game-leaderboard';

const initialState: GameState = {
  status: 'welcome',
  category: null,
  difficulty: null,
  level: null,
  mode: 'timed',
  currentShortcutIndex: 0,
  score: 0,
  correctAnswers: 0,
  totalQuestions: 0,
  timeRemaining: 0,
  shortcuts: [],
  currentStreak: 0,
  bestStreak: 0,
  hintsUsed: 0,
  showHint: false,
  isFullscreen: false,
};

export const useGameState = () => {
  const [state, setState] = useState<GameState>(initialState);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const startSetup = useCallback(() => {
    setState(prev => ({ ...prev, status: 'setup' }));
  }, []);

  const startGame = useCallback((category: ShortcutCategory | Category, difficulty: Difficulty, level?: DifficultyLevel) => {
    const config = DIFFICULTY_CONFIG[difficulty];
    
    // Use new curriculum if level is provided
    let gameShortcuts: ShortcutChallenge[];
    if (level) {
      const levelConfig = LEVEL_CONFIG[level];
      const available = getShortcutsByLevelAndCategory(level, category as Category);
      gameShortcuts = shuffleArray(available).slice(0, levelConfig.questionsCount);
    } else {
      // Legacy mode - convert old shortcuts to new format
      const legacyShortcuts = getShortcutsByCategory(category as ShortcutCategory, difficulty);
      gameShortcuts = legacyShortcuts.map(s => ({
        id: s.id,
        level: 'essentials' as DifficultyLevel,
        category: (s.category === 'os' ? 'windows' : 'general') as Category,
        description: s.task,
        keys: s.keys,
      }));
      gameShortcuts = shuffleArray(gameShortcuts).slice(0, config.questionsCount);
    }
    
    setState({
      ...initialState,
      status: 'playing',
      category,
      difficulty,
      level: level || null,
      currentShortcutIndex: 0,
      score: 0,
      correctAnswers: 0,
      totalQuestions: gameShortcuts.length,
      timeRemaining: level ? LEVEL_CONFIG[level].timePerQuestion : config.timePerQuestion,
      shortcuts: gameShortcuts,
      currentStreak: 0,
      bestStreak: 0,
    });
  }, []);

  const checkAnswer = useCallback((pressedKeys: string[]) => {
    const currentShortcut = state.shortcuts[state.currentShortcutIndex];
    if (!currentShortcut || !state.difficulty) return;

    const config = state.level ? LEVEL_CONFIG[state.level] : DIFFICULTY_CONFIG[state.difficulty];
    
    const normalizedPressed = pressedKeys.map(k => k.toUpperCase()).sort();
    const normalizedExpected = currentShortcut.keys.map(k => k.toUpperCase()).sort();
    
    const isCorrect = 
      normalizedPressed.length === normalizedExpected.length &&
      normalizedPressed.every((key, index) => key === normalizedExpected[index]);

    if (isCorrect) {
      const timeBonus = Math.floor(state.timeRemaining / 2);
      const streakBonus = Math.min(state.currentStreak * 5, 50);
      const points = config.pointsPerCorrect + timeBonus + streakBonus;
      
      setFeedback('correct');
      
      setState(prev => ({
        ...prev,
        score: prev.score + points,
        correctAnswers: prev.correctAnswers + 1,
        currentStreak: prev.currentStreak + 1,
        bestStreak: Math.max(prev.bestStreak, prev.currentStreak + 1),
      }));
    } else {
      setFeedback('incorrect');
      setState(prev => ({ ...prev, currentStreak: 0 }));
    }

    setTimeout(() => {
      setFeedback(null);
      moveToNext();
    }, 800);
  }, [state.shortcuts, state.currentShortcutIndex, state.difficulty, state.timeRemaining, state.level, state.currentStreak]);

  const moveToNext = useCallback(() => {
    setState(prev => {
      if (prev.currentShortcutIndex >= prev.shortcuts.length - 1) {
        return { ...prev, status: 'results' };
      }
      
      const config = prev.level ? LEVEL_CONFIG[prev.level] : (prev.difficulty ? DIFFICULTY_CONFIG[prev.difficulty] : DIFFICULTY_CONFIG.easy);
      return {
        ...prev,
        currentShortcutIndex: prev.currentShortcutIndex + 1,
        timeRemaining: config.timePerQuestion,
        showHint: false,
      };
    });
  }, []);

  const timeOut = useCallback(() => {
    setFeedback('incorrect');
    setState(prev => ({ ...prev, currentStreak: 0 }));
    setTimeout(() => {
      setFeedback(null);
      moveToNext();
    }, 800);
  }, [moveToNext]);

  const resetGame = useCallback(() => {
    setState(initialState);
  }, []);

  const toggleHint = useCallback(() => {
    setState(prev => ({
      ...prev,
      showHint: !prev.showHint,
      hintsUsed: prev.showHint ? prev.hintsUsed : prev.hintsUsed + 1,
    }));
  }, []);

  const getLeaderboard = useCallback((): LeaderboardEntry[] => {
    try {
      const stored = localStorage.getItem(LEADERBOARD_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }, []);

  const saveToLeaderboard = useCallback((name: string) => {
    if (!state.category || !state.difficulty) return;
    
    const entry: LeaderboardEntry = {
      id: Date.now().toString(),
      name,
      score: state.score,
      accuracy: Math.round((state.correctAnswers / state.totalQuestions) * 100),
      category: state.category,
      difficulty: state.difficulty,
      level: state.level || undefined,
      date: new Date().toISOString(),
      streak: state.bestStreak,
    };

    const current = getLeaderboard();
    const updated = [...current, entry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updated));
  }, [state, getLeaderboard]);

  useEffect(() => {
    if (state.status !== 'playing' || feedback || state.mode === 'practice') return;

    const timer = setInterval(() => {
      setState(prev => {
        if (prev.timeRemaining <= 1) {
          return { ...prev, timeRemaining: 0 };
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.status, feedback, state.mode]);

  useEffect(() => {
    if (state.status === 'playing' && state.timeRemaining === 0 && !feedback && state.mode !== 'practice') {
      timeOut();
    }
  }, [state.status, state.timeRemaining, feedback, timeOut, state.mode]);

  return {
    state,
    feedback,
    startSetup,
    startGame,
    checkAnswer,
    resetGame,
    toggleHint,
    getLeaderboard,
    saveToLeaderboard,
  };
};
