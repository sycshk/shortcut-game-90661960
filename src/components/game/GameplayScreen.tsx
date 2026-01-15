import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { GameState, DIFFICULTY_CONFIG, LEVEL_CONFIG } from '@/types/game';
import { useKeyboardCapture, useFullscreen } from '@/hooks/useKeyboardCapture';
import { cn } from '@/lib/utils';
import { Timer, Target, CheckCircle2, XCircle, Flame, Lightbulb, Minimize2, Clock } from 'lucide-react';

interface GameplayScreenProps {
  state: GameState;
  feedback: 'correct' | 'incorrect' | null;
  onAnswer: (keys: string[]) => void;
  onMultipleChoiceAnswer: (keys: string[]) => void;
  onToggleHint?: () => void;
}

export const GameplayScreen = ({ state, feedback, onAnswer, onMultipleChoiceAnswer, onToggleHint }: GameplayScreenProps) => {
  const currentShortcut = state.shortcuts[state.currentShortcutIndex];
  const config = state.level ? LEVEL_CONFIG[state.level] : (state.difficulty ? DIFFICULTY_CONFIG[state.difficulty] : DIFFICULTY_CONFIG.easy);
  const progress = ((state.currentShortcutIndex) / state.totalQuestions) * 100;
  const timeProgress = (state.timeRemaining / config.timePerQuestion) * 100;

  const isMultipleChoice = state.questionType === 'multipleChoice';

  // Handle keyboard input for both keyboard and multiple choice questions
  const handleKeyboardAnswer = (keys: string[]) => {
    if (feedback || state.waitingForNext) return;
    
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
  };

  // Always capture keyboard when playing (for both keyboard and multiple choice)
  const isKeyboardActive = state.status === 'playing' && !feedback && !state.waitingForNext;
  const { lastCombination } = useKeyboardCapture(isKeyboardActive, handleKeyboardAnswer);
  const { isFullscreen, enterFullscreen, exitFullscreen } = useFullscreen();

  // Enter fullscreen when gameplay starts
  useEffect(() => {
    if (state.status === 'playing' && !isFullscreen) {
      enterFullscreen();
    }
  }, [state.status, isFullscreen, enterFullscreen]);

  if (!currentShortcut) return null;

  return (
    <div className={cn(
      "flex min-h-screen flex-col items-center justify-center animated-bg p-4",
      isFullscreen && "fullscreen-mode"
    )}>
      {/* Fullscreen indicator */}
      {isFullscreen && (
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
      {state.waitingForNext && feedback === 'incorrect' && (
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
              <div className={cn('streak-counter', state.currentStreak >= 3 && 'active')}>
                <Flame className={cn('h-4 w-4', state.currentStreak >= 3 ? 'streak-fire' : 'text-muted-foreground')} />
                <span className="font-semibold text-secondary">{state.currentStreak} streak</span>
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

            {/* Feedback Display */}
            {feedback && (
              <div className={cn(
                'flex items-center gap-2 mt-4 px-6 py-3 rounded-full font-medium animate-scale-in',
                feedback === 'correct' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
              )}>
                {feedback === 'correct' ? (
                  <>
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Correct! {state.currentStreak > 1 ? 'Streak bonus!' : ''}</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5" />
                    <span>Wrong! It was: {currentShortcut.keys.join(' + ')}</span>
                  </>
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
