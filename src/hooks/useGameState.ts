import { useState, useCallback, useEffect } from 'react';
import { GameState, ShortcutCategory, Difficulty, DIFFICULTY_CONFIG, LeaderboardEntry } from '@/types/game';
import { getShortcutsByCategory, shuffleArray } from '@/data/shortcuts';

const LEADERBOARD_KEY = 'shortcut-game-leaderboard';

export const useGameState = () => {
  const [state, setState] = useState<GameState>({
    status: 'welcome',
    category: null,
    difficulty: null,
    currentShortcutIndex: 0,
    score: 0,
    correctAnswers: 0,
    totalQuestions: 0,
    timeRemaining: 0,
    shortcuts: [],
  });

  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const startSetup = useCallback(() => {
    setState(prev => ({ ...prev, status: 'setup' }));
  }, []);

  const startGame = useCallback((category: ShortcutCategory, difficulty: Difficulty) => {
    const config = DIFFICULTY_CONFIG[difficulty];
    const availableShortcuts = getShortcutsByCategory(category, difficulty);
    const shuffled = shuffleArray(availableShortcuts).slice(0, config.questionsCount);
    
    setState({
      status: 'playing',
      category,
      difficulty,
      currentShortcutIndex: 0,
      score: 0,
      correctAnswers: 0,
      totalQuestions: shuffled.length,
      timeRemaining: config.timePerQuestion,
      shortcuts: shuffled,
    });
  }, []);

  const checkAnswer = useCallback((pressedKeys: string[]) => {
    const currentShortcut = state.shortcuts[state.currentShortcutIndex];
    if (!currentShortcut || !state.difficulty) return;

    const config = DIFFICULTY_CONFIG[state.difficulty];
    
    // Normalize and sort both arrays for comparison
    const normalizedPressed = pressedKeys.map(k => k.toUpperCase()).sort();
    const normalizedExpected = currentShortcut.keys.map(k => k.toUpperCase()).sort();
    
    const isCorrect = 
      normalizedPressed.length === normalizedExpected.length &&
      normalizedPressed.every((key, index) => key === normalizedExpected[index]);

    if (isCorrect) {
      const timeBonus = Math.floor(state.timeRemaining / 2);
      const points = config.pointsPerCorrect + timeBonus;
      
      setFeedback('correct');
      
      setState(prev => ({
        ...prev,
        score: prev.score + points,
        correctAnswers: prev.correctAnswers + 1,
      }));
    } else {
      setFeedback('incorrect');
    }

    // Clear feedback and move to next question
    setTimeout(() => {
      setFeedback(null);
      moveToNext();
    }, 800);
  }, [state.shortcuts, state.currentShortcutIndex, state.difficulty, state.timeRemaining]);

  const moveToNext = useCallback(() => {
    setState(prev => {
      if (prev.currentShortcutIndex >= prev.shortcuts.length - 1) {
        return { ...prev, status: 'results' };
      }
      
      const config = prev.difficulty ? DIFFICULTY_CONFIG[prev.difficulty] : DIFFICULTY_CONFIG.easy;
      return {
        ...prev,
        currentShortcutIndex: prev.currentShortcutIndex + 1,
        timeRemaining: config.timePerQuestion,
      };
    });
  }, []);

  const timeOut = useCallback(() => {
    setFeedback('incorrect');
    setTimeout(() => {
      setFeedback(null);
      moveToNext();
    }, 800);
  }, [moveToNext]);

  const resetGame = useCallback(() => {
    setState({
      status: 'welcome',
      category: null,
      difficulty: null,
      currentShortcutIndex: 0,
      score: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      timeRemaining: 0,
      shortcuts: [],
    });
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
      date: new Date().toISOString(),
    };

    const current = getLeaderboard();
    const updated = [...current, entry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updated));
  }, [state, getLeaderboard]);

  // Timer effect
  useEffect(() => {
    if (state.status !== 'playing' || feedback) return;

    const timer = setInterval(() => {
      setState(prev => {
        if (prev.timeRemaining <= 1) {
          return { ...prev, timeRemaining: 0 };
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.status, feedback]);

  // Check for timeout
  useEffect(() => {
    if (state.status === 'playing' && state.timeRemaining === 0 && !feedback) {
      timeOut();
    }
  }, [state.status, state.timeRemaining, feedback, timeOut]);

  return {
    state,
    feedback,
    startSetup,
    startGame,
    checkAnswer,
    resetGame,
    getLeaderboard,
    saveToLeaderboard,
  };
};
