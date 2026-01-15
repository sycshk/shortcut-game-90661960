import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { GameState, DIFFICULTY_CONFIG } from '@/types/game';
import { useKeyboardCapture } from '@/hooks/useKeyboardCapture';
import { cn } from '@/lib/utils';
import { Timer, Target, CheckCircle2, XCircle } from 'lucide-react';

interface GameplayScreenProps {
  state: GameState;
  feedback: 'correct' | 'incorrect' | null;
  onAnswer: (keys: string[]) => void;
}

export const GameplayScreen = ({ state, feedback, onAnswer }: GameplayScreenProps) => {
  const currentShortcut = state.shortcuts[state.currentShortcutIndex];
  const config = state.difficulty ? DIFFICULTY_CONFIG[state.difficulty] : DIFFICULTY_CONFIG.easy;
  const progress = ((state.currentShortcutIndex) / state.totalQuestions) * 100;
  const timeProgress = (state.timeRemaining / config.timePerQuestion) * 100;

  const { lastCombination } = useKeyboardCapture(state.status === 'playing' && !feedback, onAnswer);

  if (!currentShortcut) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      {/* Header Stats */}
      <div className="mb-8 w-full max-w-2xl">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>Question {state.currentShortcutIndex + 1} of {state.totalQuestions}</span>
          <span className="font-semibold text-foreground">Score: {state.score}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Main Game Card */}
      <Card className={cn(
        'w-full max-w-2xl transition-all duration-300',
        feedback === 'correct' && 'ring-4 ring-green-500/50',
        feedback === 'incorrect' && 'ring-4 ring-red-500/50'
      )}>
        <CardContent className="p-8">
          {/* Timer */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Timer className="h-4 w-4" />
                <span className="text-sm">Time Remaining</span>
              </div>
              <span className={cn(
                'font-mono text-2xl font-bold',
                state.timeRemaining <= 3 ? 'text-red-500 animate-pulse' : 'text-foreground'
              )}>
                {state.timeRemaining}s
              </span>
            </div>
            <Progress 
              value={timeProgress} 
              className={cn(
                'h-3 transition-all',
                state.timeRemaining <= 3 && '[&>div]:bg-red-500'
              )} 
            />
          </div>

          {/* Task Display */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
              <Target className="h-5 w-5" />
              <span className="uppercase tracking-wide text-sm font-medium">Your Task</span>
            </div>
            <h2 className="text-3xl font-bold mb-2">{currentShortcut.task}</h2>
            <p className="text-muted-foreground">Press the correct keyboard shortcut</p>
          </div>

          {/* Keyboard Input Display */}
          <div className="flex flex-col items-center">
            <div className="min-h-[80px] flex items-center justify-center gap-2">
              {lastCombination.length > 0 ? (
                lastCombination.map((key, index) => (
                  <span key={index}>
                    <kbd className="px-4 py-2 text-lg font-mono bg-muted rounded-lg border-2 border-border shadow-sm">
                      {key}
                    </kbd>
                    {index < lastCombination.length - 1 && (
                      <span className="mx-1 text-muted-foreground">+</span>
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
                feedback === 'correct' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
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
            )}
          </div>
        </CardContent>
      </Card>

      {/* Bottom Stats */}
      <div className="mt-6 flex items-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>Correct:</span>
          <span className="font-semibold text-green-600">{state.correctAnswers}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Difficulty:</span>
          <span className="font-semibold capitalize text-foreground">{state.difficulty}</span>
        </div>
      </div>
    </div>
  );
};
