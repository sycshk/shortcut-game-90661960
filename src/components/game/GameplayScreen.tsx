import { useEffect, useState, useCallback, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { GameState, DIFFICULTY_CONFIG, LEVEL_CONFIG } from '@/types/game';
import { useKeyboardCapture, useFullscreen } from '@/hooks/useKeyboardCapture';
import { cn } from '@/lib/utils';
import { Timer, Target, CheckCircle2, XCircle, Flame, Lightbulb, Minimize2, Clock, AlertTriangle, Play, Zap, Star, Trophy } from 'lucide-react';
import { triggerStreakConfetti } from '@/utils/confetti';

interface GameplayScreenProps {
  state: GameState;
  feedback: 'correct' | 'incorrect' | null;
  onAnswer: (keys: string[]) => void;
  onMultipleChoiceAnswer: (keys: string[]) => void;
  onToggleHint?: () => void;
  onPause?: (isPaused: boolean) => void;
}

export const GameplayScreen = ({ state, feedback, onAnswer, onMultipleChoiceAnswer, onToggleHint, onPause }: GameplayScreenProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const [pauseReason, setPauseReason] = useState<'focus' | 'manual' | null>(null);
  const lastStreakRef = useRef(0);

  // Trigger confetti on 10x streak
  useEffect(() => {
    if (state.currentStreak === 10 && lastStreakRef.current < 10) {
      triggerStreakConfetti();
    }
    lastStreakRef.current = state.currentStreak;
  }, [state.currentStreak]);
  
  const currentShortcut = state.shortcuts[state.currentShortcutIndex];
  const config = state.level ? LEVEL_CONFIG[state.level] : (state.difficulty ? DIFFICULTY_CONFIG[state.difficulty] : DIFFICULTY_CONFIG.easy);
  const progress = ((state.currentShortcutIndex) / state.totalQuestions) * 100;
  const timeProgress = (state.timeRemaining / config.timePerQuestion) * 100;

  const isMultipleChoice = state.questionType === 'multipleChoice';

  // Pause/Resume handlers
  const handlePause = useCallback((reason: 'focus' | 'manual') => {
    setIsPaused(true);
    setPauseReason(reason);
    onPause?.(true);
  }, [onPause]);

  const handleResume = useCallback(() => {
    setIsPaused(false);
    setPauseReason(null);
    onPause?.(false);
  }, [onPause]);

  // Focus loss detection
  useEffect(() => {
    if (state.status !== 'playing') return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handlePause('focus');
      }
    };

    const handleWindowBlur = () => {
      handlePause('focus');
    };

    const handleWindowFocus = () => {
      // Don't auto-resume, let user click to resume
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, [state.status, handlePause]);

  // Handle keyboard input for both keyboard and multiple choice questions
  const handleKeyboardAnswer = useCallback((keys: string[]) => {
    if (feedback || state.waitingForNext || isPaused) return;
    
    if (isMultipleChoice && state.multipleChoiceOptions) {
      // For multiple choice, match pressed keys to one of the options
      const pressedSorted = keys.map(k => k.toUpperCase()).sort().join('+');
      
      for (const option of state.multipleChoiceOptions) {
        const optionSorted = option.map(k => k.toUpperCase()).sort().join('+');
        if (pressedSorted === optionSorted) {
          onMultipleChoiceAnswer(option);
          return;
        }
      }
      // If no match found, still pass to regular handler (will be marked wrong)
      onAnswer(keys);
    } else {
      // Regular keyboard question
      onAnswer(keys);
    }
  }, [feedback, state.waitingForNext, isPaused, isMultipleChoice, state.multipleChoiceOptions, onMultipleChoiceAnswer, onAnswer]);

  // Always capture keyboard when playing and not paused
  const isKeyboardActive = state.status === 'playing' && !feedback && !state.waitingForNext && !isPaused;
  const { lastCombination } = useKeyboardCapture(isKeyboardActive, handleKeyboardAnswer);
  const { isFullscreen, enterFullscreen, exitFullscreen } = useFullscreen();

  // Enter fullscreen when gameplay starts
  useEffect(() => {
    if (state.status === 'playing' && !isFullscreen && !isPaused) {
      enterFullscreen();
    }
  }, [state.status, isFullscreen, isPaused, enterFullscreen]);

  if (!currentShortcut) return null;

  return (
    <div className={cn(
      "flex min-h-screen flex-col items-center justify-center animated-bg p-4 relative",
      isFullscreen && "fullscreen-mode"
    )}>
      {/* Pause Overlay */}
      {isPaused && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md animate-fade-in">
          <Card className="glass-card w-full max-w-md mx-4 text-center">
            <CardContent className="p-8 space-y-6">
              <div className="mx-auto w-20 h-20 rounded-full bg-warning/10 flex items-center justify-center">
                <AlertTriangle className="h-10 w-10 text-warning animate-pulse" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Game Paused</h2>
                {pauseReason === 'focus' ? (
                  <p className="text-muted-foreground">
                    You switched away from the game. Click below to resume playing.
                  </p>
                ) : (
                  <p className="text-muted-foreground">
                    Take a break! Click below when you're ready to continue.
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <div className="text-sm text-muted-foreground bg-muted/30 rounded-lg p-3">
                  <div className="flex justify-between mb-1">
                    <span>Current Score:</span>
                    <span className="font-bold text-primary">{state.score}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span>Question:</span>
                    <span className="font-medium">{state.currentShortcutIndex + 1} / {state.totalQuestions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Streak:</span>
                    <span className="font-medium text-secondary">{state.currentStreak}</span>
                  </div>
                </div>

                <Button 
                  onClick={handleResume} 
                  size="lg" 
                  className="w-full btn-elufa"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Resume Game
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                💡 Tip: Stay focused to maintain your streak bonus!
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Fullscreen indicator */}
      {isFullscreen && !isPaused && (
        <Button
          variant="ghost"
          size="sm"
          onClick={exitFullscreen}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <Minimize2 className="h-4 w-4 mr-1" />
          Exit Fullscreen
        </Button>
      )}

      {/* Waiting indicator after wrong answer */}
      {state.waitingForNext && feedback === 'incorrect' && !isPaused && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-muted/90 px-4 py-2 rounded-full flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 animate-spin" />
          <span>Next question in a moment...</span>
        </div>
      )}

      {/* Header Stats */}
      <div className="mb-6 w-full max-w-2xl animate-fade-in">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>Question {state.currentShortcutIndex + 1} of {state.totalQuestions}</span>
          <div className="flex items-center gap-4">
            {state.currentStreak > 0 && (
              <div className={cn(
                'streak-counter flex items-center gap-1',
                state.currentStreak >= 3 && 'active',
                state.currentStreak >= 3 && state.currentStreak < 5 && 'streak-3',
                state.currentStreak >= 5 && state.currentStreak < 10 && 'streak-5',
                state.currentStreak >= 10 && 'streak-10 streak-milestone'
              )}>
                <Flame className={cn(
                  'h-4 w-4',
                  state.currentStreak >= 10 ? 'text-primary' : 
                  state.currentStreak >= 5 ? 'text-secondary' : 
                  state.currentStreak >= 3 ? 'text-warning streak-fire' : 'text-muted-foreground'
                )} />
                <span className="font-semibold">{state.currentStreak}x</span>
                {state.currentStreak >= 10 && <Trophy className="h-4 w-4 ml-1" />}
                {state.currentStreak >= 5 && state.currentStreak < 10 && <Star className="h-4 w-4 ml-1" />}
              </div>
            )}
            <span className="font-semibold text-foreground">Score: {state.score}</span>
          </div>
        </div>
        <Progress value={progress} className="h-2 [&>div]:progress-gradient" />
      </div>

      {/* Main Game Card */}
      <Card className={cn(
        'w-full max-w-2xl glass-card transition-all duration-300 animate-scale-in',
        feedback === 'correct' && 'ring-4 ring-success/50 animate-success-pulse',
        feedback === 'incorrect' && 'ring-4 ring-destructive/50 animate-shake'
      )}>
        <CardContent className="p-8">
          {/* Timer */}
          {state.mode !== 'practice' && !state.waitingForNext && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Timer className="h-4 w-4" />
                  <span className="text-sm">Time Remaining</span>
                </div>
                <span className={cn(
                  'font-mono text-2xl font-bold',
                  state.timeRemaining <= 3 ? 'text-destructive animate-pulse' : 'text-foreground'
                )}>
                  {state.timeRemaining}s
                </span>
              </div>
              <Progress 
                value={timeProgress} 
                className={cn(
                  'h-3 transition-all',
                  state.timeRemaining <= 3 && '[&>div]:bg-destructive'
                )} 
              />
            </div>
          )}

          {/* Task Display */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
              <Target className="h-5 w-5" />
              <span className="uppercase tracking-wide text-sm font-medium">Your Task</span>
              {state.level && (
                <span className={cn('level-badge', `level-${state.level}`)}>
                  {LEVEL_CONFIG[state.level].label}
                </span>
              )}
              {isMultipleChoice && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Multiple Choice</span>
              )}
            </div>
            <h2 className="text-3xl font-display font-bold mb-2">{currentShortcut.description}</h2>
            <p className="text-muted-foreground">
              {isMultipleChoice ? 'Select the correct keyboard shortcut' : 'Press the correct keyboard shortcut'}
            </p>
            
            {/* Hint Button */}
            {currentShortcut.hint && onToggleHint && !isMultipleChoice && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleHint}
                className="mt-3 text-muted-foreground hover:text-primary"
              >
                <Lightbulb className="h-4 w-4 mr-1" />
                {state.showHint ? 'Hide Hint' : 'Show Hint'}
              </Button>
            )}
            
            {state.showHint && currentShortcut.hint && !isMultipleChoice && (
              <p className="mt-2 text-sm text-primary/80 italic animate-fade-in">
                💡 {currentShortcut.hint}
              </p>
            )}
          </div>

          {/* Input Area */}
          <div className="flex flex-col items-center">
            {isMultipleChoice ? (
              // Multiple Choice Options with keyboard support
              <div className="space-y-4 w-full max-w-md">
                {/* Show currently pressed keys for multiple choice */}
                {lastCombination.length > 0 && !feedback && (
                  <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-muted/30 border border-dashed">
                    <span className="text-sm text-muted-foreground mr-2">Pressing:</span>
                    {lastCombination.map((key, index) => (
                      <span key={index} className="flex items-center">
                        <kbd className="kbd-key text-sm">{key}</kbd>
                        {index < lastCombination.length - 1 && (
                          <span className="mx-1 text-muted-foreground">+</span>
                        )}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-3">
                  {state.multipleChoiceOptions?.map((option, index) => {
                    const optionString = option.join(' + ');
                    const isCorrectOption = option.join('+') === currentShortcut.keys.join('+');
                    const showResult = feedback !== null;
                    
                    // Highlight option if currently pressed keys match
                    const pressedSorted = lastCombination.map(k => k.toUpperCase()).sort().join('+');
                    const optionSorted = option.map(k => k.toUpperCase()).sort().join('+');
                    const isBeingPressed = !showResult && pressedSorted === optionSorted && lastCombination.length > 0;
                    
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        className={cn(
                          'h-auto py-4 px-4 text-lg font-mono transition-all',
                          showResult && isCorrectOption && 'bg-success/20 border-success text-success',
                          showResult && !isCorrectOption && 'opacity-50',
                          !showResult && 'hover:bg-primary/10 hover:border-primary',
                          isBeingPressed && 'bg-primary/20 border-primary ring-2 ring-primary'
                        )}
                        onClick={() => !feedback && !state.waitingForNext && onMultipleChoiceAnswer(option)}
                        disabled={!!feedback || state.waitingForNext}
                      >
                        {optionString}
                      </Button>
                    );
                  })}
                </div>
                
                <p className="text-center text-sm text-muted-foreground">
                  Click an option or press the shortcut keys directly
                </p>
              </div>
            ) : (
              // Keyboard Input Display
              <div className="min-h-[80px] flex items-center justify-center gap-2">
                {lastCombination.length > 0 ? (
                  lastCombination.map((key, index) => (
                    <span key={index} className="flex items-center">
                      <kbd className={cn(
                        'kbd-key',
                        feedback === 'correct' && 'kbd-key-correct',
                        feedback === 'incorrect' && 'kbd-key-incorrect'
                      )}>
                        {key}
                      </kbd>
                      {index < lastCombination.length - 1 && (
                        <span className="mx-2 text-muted-foreground">+</span>
                      )}
                    </span>
                  ))
                ) : (
                  <span className="text-muted-foreground italic">
                    Press your shortcut keys...
                  </span>
                )}
              </div>
            )}

            {/* Feedback Display with Score Breakdown */}
            {feedback && (
              <div className="flex flex-col items-center gap-3 mt-4 animate-scale-in">
                {/* Main feedback */}
                <div className={cn(
                  'flex items-center gap-2 px-6 py-3 rounded-full font-medium',
                  feedback === 'correct' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                )}>
                  {feedback === 'correct' ? (
                    <>
                      <CheckCircle2 className="h-5 w-5" />
                      <span>Correct!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5" />
                      <span>Wrong! It was: {currentShortcut.keys.join(' + ')}</span>
                    </>
                  )}
                </div>

                {/* Score breakdown for correct answers */}
                {feedback === 'correct' && (
                  <div className="flex items-center gap-4 text-sm animate-fade-in">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Target className="h-4 w-4" />
                      <span>+{config.pointsPerCorrect} base</span>
                    </div>
                    {state.currentStreak > 0 && (
                      <div className="flex items-center gap-1 text-warning">
                        <Zap className="h-4 w-4" />
                        <span>+{state.currentStreak} streak</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 font-bold text-primary">
                      <span>= {config.pointsPerCorrect + state.currentStreak} pts</span>
                    </div>
                  </div>
                )}

                {/* Streak milestone badges */}
                {feedback === 'correct' && state.currentStreak === 3 && (
                  <div className="combo-badge flex items-center gap-2">
                    <Flame className="h-4 w-4" />
                    <span>3x COMBO!</span>
                  </div>
                )}
                {feedback === 'correct' && state.currentStreak === 5 && (
                  <div className="combo-badge flex items-center gap-2" style={{ background: 'linear-gradient(135deg, hsl(0 100% 45%) 0%, hsl(330 100% 50%) 100%)' }}>
                    <Star className="h-4 w-4" />
                    <span>5x SUPER COMBO!</span>
                  </div>
                )}
                {feedback === 'correct' && state.currentStreak === 10 && (
                  <div className="combo-badge flex items-center gap-2" style={{ background: 'linear-gradient(135deg, hsl(210 100% 35%) 0%, hsl(280 100% 50%) 100%)' }}>
                    <Trophy className="h-4 w-4" />
                    <span>10x LEGENDARY!</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Bottom Stats */}
      <div className="mt-6 flex items-center gap-6 text-sm text-muted-foreground animate-fade-in">
        <div className="flex items-center gap-2">
          <span>Correct:</span>
          <span className="font-semibold text-success">{state.correctAnswers}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Best Streak:</span>
          <span className="font-semibold text-secondary">{state.bestStreak}</span>
        </div>
        {state.level && (
          <div className="flex items-center gap-2">
            <span>Level:</span>
            <span className="font-semibold text-primary">
              {LEVEL_CONFIG[state.level].label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
