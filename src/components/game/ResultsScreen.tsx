import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { GameState, LEVEL_CONFIG } from '@/types/game';
import { Trophy, RotateCcw, Home, Star, Target, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFullscreen } from '@/hooks/useKeyboardCapture';

interface ResultsScreenProps {
  state: GameState;
  onPlayAgain: () => void;
  onHome: () => void;
  onSaveScore: (name: string) => void;
  userEmail?: string;
}

export const ResultsScreen = ({ state, onPlayAgain, onHome, onSaveScore, userEmail }: ResultsScreenProps) => {
  const [playerName, setPlayerName] = useState('');
  const [saved, setSaved] = useState(false);
  const { exitFullscreen } = useFullscreen();
  
  const accuracy = Math.round((state.correctAnswers / state.totalQuestions) * 100);
  
  // Exit fullscreen when results are shown
  useEffect(() => {
    exitFullscreen();
  }, [exitFullscreen]);

  // Pre-fill player name from email
  useEffect(() => {
    if (userEmail && !playerName) {
      setPlayerName(userEmail.split('@')[0]);
    }
  }, [userEmail, playerName]);
  
  const getPerformanceMessage = () => {
    if (accuracy >= 90) return { text: 'Outstanding!', icon: Trophy, color: 'text-yellow-500' };
    if (accuracy >= 70) return { text: 'Great Job!', icon: Star, color: 'text-success' };
    if (accuracy >= 50) return { text: 'Good Effort!', icon: Target, color: 'text-primary' };
    return { text: 'Keep Practicing!', icon: Zap, color: 'text-secondary' };
  };

  const performance = getPerformanceMessage();
  const PerformanceIcon = performance.icon;

  const handleSave = () => {
    if (playerName.trim()) {
      onSaveScore(playerName.trim());
      setSaved(true);
    }
  };

  const levelLabel = state.level ? LEVEL_CONFIG[state.level].label : 'Mixed';

  return (
    <div className="flex min-h-screen items-center justify-center animated-bg p-4">
      <Card className="w-full max-w-lg text-center glass-card animate-fade-in">
        <CardHeader className="space-y-4">
          <div className={cn('mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10', performance.color)}>
            <PerformanceIcon className="h-10 w-10" />
          </div>
          <CardTitle className="text-3xl font-bold text-gradient">{performance.text}</CardTitle>
          <CardDescription className="text-lg">
            You completed the <span className="font-medium text-foreground">{levelLabel}</span> challenge
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

          {/* Save Score */}
          {!saved ? (
            <div className="space-y-3 rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Save your score to the leaderboard</p>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  maxLength={20}
                />
                <Button onClick={handleSave} disabled={!playerName.trim()} className="btn-elufa">
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-success/30 bg-success/10 p-4 text-success">
              <p className="flex items-center justify-center gap-2">
                <Trophy className="h-4 w-4" />
                Score saved to leaderboard!
              </p>
            </div>
          )}

          {/* Action Buttons */}
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
        </CardContent>
      </Card>
    </div>
  );
};
