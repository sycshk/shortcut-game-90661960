import { useState, useCallback, useEffect } from 'react';
import { GameState, Difficulty, DIFFICULTY_CONFIG, LeaderboardEntry, DifficultyLevel, LEVEL_CONFIG, ShortcutChallenge, Category } from '@/types/game';
import { shuffleArray, getShortcutsByLevelAndCategory, shortcutChallenges } from '@/data/shortcuts';
import { leaderboardService } from '@/services/leaderboardService';

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
  questionType: 'keyboard',
  lastAnswerCorrect: null,
  waitingForNext: false,
  multipleChoiceOptions: undefined,
};

// Generate multiple choice options for a shortcut
const generateMultipleChoiceOptions = (correctKeys: string[], allShortcuts: ShortcutChallenge[]): string[][] => {
  const options: string[][] = [correctKeys];
  const otherShortcuts = allShortcuts.filter(s => s.keys.join('+') !== correctKeys.join('+'));
  const shuffled = shuffleArray(otherShortcuts);
  
  // Add 3 wrong options
  for (let i = 0; i < Math.min(3, shuffled.length); i++) {
    options.push(shuffled[i].keys);
  }
  
  return shuffleArray(options);
};

export const useGameState = () => {
  const [state, setState] = useState<GameState>(initialState);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [playerName, setPlayerName] = useState<string>('');
  const [isPaused, setIsPaused] = useState(false);

  const handlePause = useCallback((paused: boolean) => {
    setIsPaused(paused);
  }, []);
  const startSetup = useCallback(() => {
    setState(prev => ({ ...prev, status: 'setup' }));
  }, []);

  const goToAnalytics = useCallback(() => {
    setState(prev => ({ ...prev, status: 'analytics' }));
  }, []);

  const goToDailyChallenge = useCallback(() => {
    setState(prev => ({ ...prev, status: 'dailyChallenge' }));
  }, []);

  const startDailyChallenge = useCallback((dailyShortcuts: ShortcutChallenge[]) => {
    const firstOptions = generateMultipleChoiceOptions(dailyShortcuts[0].keys, shortcutChallenges);
    
    setState({
      ...initialState,
      status: 'playing',
      category: null,
      difficulty: 'medium',
      level: 'essentials',
      currentShortcutIndex: 0,
      score: 0,
      correctAnswers: 0,
      totalQuestions: dailyShortcuts.length,
      timeRemaining: 20, // 20 seconds for daily challenge
      shortcuts: dailyShortcuts,
      currentStreak: 0,
      bestStreak: 0,
      questionType: 'keyboard',
      lastAnswerCorrect: null,
      waitingForNext: false,
      multipleChoiceOptions: firstOptions,
    });
  }, []);

  const startGame = useCallback((difficulty: Difficulty, level: DifficultyLevel) => {
    const levelConfig = LEVEL_CONFIG[level];
    // Get shortcuts from all categories (mixed)
    const available = getShortcutsByLevelAndCategory(level);
    const gameShortcuts = shuffleArray(available).slice(0, levelConfig.questionsCount);
    
    // First question is always keyboard type
    const firstOptions = generateMultipleChoiceOptions(gameShortcuts[0].keys, shortcutChallenges);
    
    setState({
      ...initialState,
      status: 'playing',
      category: null, // Mixed categories
      difficulty,
      level,
      currentShortcutIndex: 0,
      score: 0,
      correctAnswers: 0,
      totalQuestions: gameShortcuts.length,
      timeRemaining: levelConfig.timePerQuestion,
      shortcuts: gameShortcuts,
      currentStreak: 0,
      bestStreak: 0,
      questionType: 'keyboard',
      lastAnswerCorrect: null,
      waitingForNext: false,
      multipleChoiceOptions: firstOptions,
    });
  }, []);

  const recordAnswer = useCallback((isCorrect: boolean, userAnswer: string[], userEmail?: string) => {
    const currentShortcut = state.shortcuts[state.currentShortcutIndex];
    if (!currentShortcut) return;

    const config = state.level ? LEVEL_CONFIG[state.level] : DIFFICULTY_CONFIG[state.difficulty || 'easy'];
    const timeSpent = config.timePerQuestion - state.timeRemaining;

    leaderboardService.addAnswerRecord({
      email: userEmail || '',
      shortcutId: currentShortcut.id,
      shortcutDescription: currentShortcut.description,
      category: currentShortcut.category,
      level: currentShortcut.level,
      isCorrect,
      userAnswer,
      correctAnswer: currentShortcut.keys,
      timeSpent,
    });
  }, [state.shortcuts, state.currentShortcutIndex, state.level, state.difficulty, state.timeRemaining]);

  const checkAnswer = useCallback((pressedKeys: string[]) => {
    if (state.waitingForNext) return;
    
    const currentShortcut = state.shortcuts[state.currentShortcutIndex];
    if (!currentShortcut || !state.difficulty) return;

    const config = state.level ? LEVEL_CONFIG[state.level] : DIFFICULTY_CONFIG[state.difficulty];
    
    const normalizedPressed = pressedKeys.map(k => k.toUpperCase()).sort();
    const normalizedExpected = currentShortcut.keys.map(k => k.toUpperCase()).sort();
    
    const isCorrect = 
      normalizedPressed.length === normalizedExpected.length &&
      normalizedPressed.every((key, index) => key === normalizedExpected[index]);

    // Record the answer
    recordAnswer(isCorrect, pressedKeys);

    if (isCorrect) {
      // Streak bonus: 1 point for streak 1, 2 for streak 2, etc.
      const newStreak = state.currentStreak + 1;
      const streakBonus = newStreak;
      const points = config.pointsPerCorrect + streakBonus;
      
      setFeedback('correct');
      
      setState(prev => ({
        ...prev,
        score: prev.score + points,
        correctAnswers: prev.correctAnswers + 1,
        currentStreak: prev.currentStreak + 1,
        bestStreak: Math.max(prev.bestStreak, prev.currentStreak + 1),
        lastAnswerCorrect: true,
        waitingForNext: true,
      }));

      setTimeout(() => {
        setFeedback(null);
        moveToNext(true);
      }, 800);
    } else {
      setFeedback('incorrect');
      setState(prev => ({ 
        ...prev, 
        currentStreak: 0,
        lastAnswerCorrect: false,
        waitingForNext: true,
      }));

      // Wait 3 seconds on wrong answer so they don't accidentally submit again
      setTimeout(() => {
        setFeedback(null);
        moveToNext(false);
      }, 3000);
    }
  }, [state.shortcuts, state.currentShortcutIndex, state.difficulty, state.timeRemaining, state.level, state.currentStreak, state.waitingForNext, recordAnswer]);

  const moveToNext = useCallback((wasCorrect: boolean) => {
    setState(prev => {
      if (prev.currentShortcutIndex >= prev.shortcuts.length - 1) {
        return { ...prev, status: 'results', waitingForNext: false };
      }
      
      const config = prev.level ? LEVEL_CONFIG[prev.level] : (prev.difficulty ? DIFFICULTY_CONFIG[prev.difficulty] : DIFFICULTY_CONFIG.easy);
      const nextIndex = prev.currentShortcutIndex + 1;
      const nextShortcut = prev.shortcuts[nextIndex];
      
      // If last answer was wrong, next question is multiple choice
      // Otherwise, randomly choose (70% keyboard, 30% multiple choice)
      const nextQuestionType = !wasCorrect ? 'multipleChoice' : (Math.random() > 0.3 ? 'keyboard' : 'multipleChoice');
      
      const options = generateMultipleChoiceOptions(nextShortcut.keys, shortcutChallenges);
      
      return {
        ...prev,
        currentShortcutIndex: nextIndex,
        timeRemaining: config.timePerQuestion,
        showHint: false,
        questionType: nextQuestionType,
        lastAnswerCorrect: null,
        waitingForNext: false,
        multipleChoiceOptions: options,
      };
    });
  }, []);

  const handleMultipleChoiceAnswer = useCallback((selectedKeys: string[]) => {
    checkAnswer(selectedKeys);
  }, [checkAnswer]);

  const timeOut = useCallback(() => {
    if (state.waitingForNext) return;
    
    const currentShortcut = state.shortcuts[state.currentShortcutIndex];
    if (currentShortcut) {
      recordAnswer(false, []);
    }
    
    setFeedback('incorrect');
    setState(prev => ({ 
      ...prev, 
      currentStreak: 0,
      lastAnswerCorrect: false,
      waitingForNext: true,
    }));
    
    setTimeout(() => {
      setFeedback(null);
      moveToNext(false);
    }, 3000);
  }, [moveToNext, recordAnswer, state.shortcuts, state.currentShortcutIndex, state.waitingForNext]);

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

  const getLeaderboard = useCallback(async (): Promise<LeaderboardEntry[]> => {
    return leaderboardService.getTop(10);
  }, []);

  const saveToLeaderboard = useCallback((name: string, email?: string) => {
    if (!state.difficulty) return;
    
    setPlayerName(name);
    
    // Use leaderboard service to add and sync
    leaderboardService.addEntry({
      name,
      score: state.score,
      accuracy: Math.round((state.correctAnswers / state.totalQuestions) * 100),
      category: state.category as Category || 'general',
      difficulty: state.difficulty,
      level: state.level || undefined,
      streak: state.bestStreak,
    }, email);
  }, [state]);

  // Auto-save when game ends
  useEffect(() => {
    if (state.status === 'results' && playerName && state.score > 0) {
      // Already saved via saveToLeaderboard
    }
  }, [state.status, playerName, state.score]);

  // Timer effect - pauses when isPaused is true
  useEffect(() => {
    if (state.status !== 'playing' || feedback || state.mode === 'practice' || state.waitingForNext || isPaused) return;

    const timer = setInterval(() => {
      setState(prev => {
        if (prev.timeRemaining <= 1) {
          return { ...prev, timeRemaining: 0 };
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.status, feedback, state.mode, state.waitingForNext, isPaused]);

  useEffect(() => {
    if (state.status === 'playing' && state.timeRemaining === 0 && !feedback && state.mode !== 'practice' && !state.waitingForNext && !isPaused) {
      timeOut();
    }
  }, [state.status, state.timeRemaining, feedback, timeOut, state.mode, state.waitingForNext, isPaused]);

  return {
    state,
    feedback,
    playerName,
    isPaused,
    startSetup,
    startGame,
    checkAnswer,
    handleMultipleChoiceAnswer,
    resetGame,
    toggleHint,
    getLeaderboard,
    saveToLeaderboard,
    goToAnalytics,
    goToDailyChallenge,
    startDailyChallenge,
    setPlayerName,
    handlePause,
  };
};
