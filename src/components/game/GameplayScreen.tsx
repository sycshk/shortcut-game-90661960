import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { GameState, DIFFICULTY_CONFIG, LEVEL_CONFIG } from '@/types/game';
import { useKeyboardCapture } from '@/hooks/useKeyboardCapture';
import { cn } from '@/lib/utils';
import { Timer, Target, CheckCircle2, XCircle, Flame, Lightbulb } from 'lucide-react';

interface GameplayScreenProps {
  state: GameState;
  feedback: 'correct' | 'incorrect' | null;
  onAnswer: (keys: string[]) => void;
  onToggleHint?: () => void;
}

export const GameplayScreen = ({ state, feedback, onAnswer, onToggleHint }: GameplayScreenProps) => {
  const currentShortcut = state.shortcuts[state.currentShortcutIndex];
  const config = state.level ? LEVEL_CONFIG[state.level] : (state.difficulty ? DIFFICULTY_CONFIG[state.difficulty] : DIFFICULTY_CONFIG.easy);
  const progress = ((state.currentShortcutIndex) / state.totalQuestions) * 100;
  const timeProgress = (state.timeRemaining / config.timePerQuestion) * 100;

  const { lastCombination } = useKeyboardCapture(state.status === 'playing' && !feedback, onAnswer);

  if (!currentShortcut) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center animated-bg p-4">
      {/* Header Stats */}
      <div className="mb-6 w-full max-w-2xl animate-fade-in">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>Question {state.currentShortcutIndex + 1} of {state.totalQuestions}</span>
          <div className="flex items-center gap-4">
            {state.currentStreak > 0 && (
              <div className={cn('streak-counter', state.currentStreak >= 3 && 'active')}>
                <Flame className={cn('h-4 w-4', state.currentStreak >= 3 ? 'streak-fire' : 'text-muted-foreground')} />
                <span className="font-semibold text-warning">{state.currentStreak} streak</span>
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
          {state.mode !== 'practice' && (
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
            </div>
            <h2 className="text-3xl font-display font-bold mb-2">{currentShortcut.description}</h2>
            <p className="text-muted-foreground">Press the correct keyboard shortcut</p>
            
            {/* Hint Button */}
            {currentShortcut.hint && onToggleHint && (
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
            
            {state.showHint && currentShortcut.hint && (
              <p className="mt-2 text-sm text-primary/80 italic animate-fade-in">
                💡 {currentShortcut.hint}
              </p>
            )}
          </div>

          {/* Keyboard Input Display */}
          <div className="flex flex-col items-center">
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

            {/* Feedback Display */}
            {feedback && (
              <div className={cn(
                'flex items-center gap-2 mt-4 px-6 py-3 rounded-full font-medium animate-scale-in',
                feedback === 'correct' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
              )}>
                {feedback === 'correct' ? (
                  <>
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Correct! +{state.currentStreak > 1 ? `streak bonus!` : ''}</span>
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
          <span className="font-semibold text-warning">{state.bestStreak}</span>
        </div>
        {state.level && (
          <div className="flex items-center gap-2">
            <span>Level:</span>
            <span className={cn('font-semibold', LEVEL_CONFIG[state.level].color)}>
              {LEVEL_CONFIG[state.level].label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
