import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GameState, LEVEL_CONFIG } from '@/types/game';
import { Trophy, RotateCcw, Home, Star, Target, Zap, BarChart3, Crown, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFullscreen } from '@/hooks/useKeyboardCapture';
import { leaderboardService } from '@/services/leaderboardService';
import { triggerPerfectGameConfetti, triggerCelebration } from '@/utils/confetti';

interface ResultsScreenProps {
  state: GameState;
  onPlayAgain: () => void;
  onHome: () => void;
  onSaveScore: (name: string) => void;
  onAnalytics: () => void;
  userEmail?: string;
  displayName?: string;
  isDailyChallenge?: boolean;
}

export const ResultsScreen = ({ state, onPlayAgain, onHome, onSaveScore, onAnalytics, userEmail, displayName, isDailyChallenge }: ResultsScreenProps) => {
  const [saved, setSaved] = useState(false);
  const { exitFullscreen } = useFullscreen();
  
  const accuracy = Math.round((state.correctAnswers / state.totalQuestions) * 100);
  
  // Exit fullscreen when results are shown
  useEffect(() => {
    exitFullscreen();
    
    // Trigger confetti based on performance
    if (accuracy === 100) {
      // Perfect game!
      setTimeout(() => triggerPerfectGameConfetti(), 300);
    } else if (accuracy >= 80) {
      // Great performance
      setTimeout(() => triggerCelebration(), 300);
    }
  }, [exitFullscreen, accuracy]);

  // Auto-save to leaderboard
  useEffect(() => {
    if (!saved && displayName && state.score > 0) {
      onSaveScore(displayName);
      setSaved(true);
      
      // Also save game session
      leaderboardService.addSession({
        email: userEmail || '',
        level: state.level || 'essentials',
        category: 'general', // Mixed
        mode: state.mode,
        score: state.score,
        correctAnswers: state.correctAnswers,
        totalQuestions: state.totalQuestions,
        accuracy,
        timeSpent: 0,
        streak: state.bestStreak,
      });
    }
  }, [saved, displayName, state, accuracy, onSaveScore]);
  
  const getPerformanceMessage = () => {
    if (accuracy === 100) return { text: 'PERFECT!', icon: Crown, color: 'text-yellow-400', isPerfect: true };
    if (accuracy >= 90) return { text: 'Outstanding!', icon: Trophy, color: 'text-yellow-500', isPerfect: false };
    if (accuracy >= 70) return { text: 'Great Job!', icon: Star, color: 'text-success', isPerfect: false };
    if (accuracy >= 50) return { text: 'Good Effort!', icon: Target, color: 'text-primary', isPerfect: false };
    return { text: 'Keep Practicing!', icon: Zap, color: 'text-secondary', isPerfect: false };
  };

  const performance = getPerformanceMessage();
  const PerformanceIcon = performance.icon;

  const levelLabel = state.level ? LEVEL_CONFIG[state.level].label : 'Mixed';

  return (
    <div className="flex min-h-screen items-center justify-center animated-bg p-4">
      <Card className={cn(
        "w-full max-w-lg text-center glass-card animate-fade-in",
        performance.isPerfect && "ring-4 ring-yellow-400/50"
      )}>
        <CardHeader className="space-y-4">
          <div className={cn(
            'mx-auto flex h-20 w-20 items-center justify-center rounded-full',
            performance.isPerfect ? 'bg-gradient-to-br from-yellow-400 to-orange-500' : 'bg-primary/10',
            performance.color
          )}>
            <PerformanceIcon className={cn("h-10 w-10", performance.isPerfect && "text-white")} />
          </div>
          <CardTitle className={cn(
            "text-3xl font-bold",
            performance.isPerfect ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-pulse" : "text-gradient"
          )}>
            {performance.text}
          </CardTitle>
          {performance.isPerfect && (
            <p className="text-yellow-500 font-medium animate-fade-in">🏆 Flawless Victory! 🏆</p>
          )}
          {isDailyChallenge && (
            <div className="flex items-center justify-center gap-2 text-sm bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-2 rounded-full">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="font-medium">Daily Challenge Complete!</span>
            </div>
          )}
          <CardDescription className="text-lg">
            You completed the <span className="font-medium text-foreground">{isDailyChallenge ? "Daily" : levelLabel}</span> challenge
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="stat-card">
              <div className="text-3xl font-bold text-primary">{state.score}</div>
              <div className="text-sm text-muted-foreground">Points</div>
            </div>
            <div className="stat-card">
              <div className="text-3xl font-bold text-success">{accuracy}%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
            <div className="stat-card">
              <div className="text-3xl font-bold">{state.correctAnswers}/{state.totalQuestions}</div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </div>
          </div>

          {/* Auto-saved notification */}
          {saved && (
            <div className="rounded-lg border border-success/30 bg-success/10 p-4 text-success">
              <p className="flex items-center justify-center gap-2">
                <Trophy className="h-4 w-4" />
                Score saved as "{displayName}"
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <div className="flex gap-3">
              <Button onClick={onPlayAgain} size="lg" className="btn-elufa flex-1">
                <RotateCcw className="mr-2 h-4 w-4" />
                Play Again
              </Button>
              <Button onClick={onHome} variant="outline" size="lg" className="flex-1">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </div>
            <Button onClick={onAnalytics} variant="ghost" size="lg" className="w-full">
              <BarChart3 className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
