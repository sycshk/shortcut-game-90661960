import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Keyboard, Trophy, Zap, BarChart3 } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
  onViewLeaderboard: () => void;
}

export const WelcomeScreen = ({ onStart, onViewLeaderboard }: WelcomeScreenProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center animated-bg p-4">
      <Card className="w-full max-w-lg text-center glass-card animate-fade-in">
        <CardHeader className="space-y-4">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10 glow-primary">
            <Keyboard className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-4xl font-display font-bold text-gradient">
            Elufa Shortcut Master
          </CardTitle>
          <CardDescription className="text-lg">
            Master keyboard shortcuts through fun, interactive challenges
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-3 text-sm text-muted-foreground">
            <div className="stat-card flex flex-col items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              <span className="font-medium">4 Levels</span>
              <span className="text-xs">Essentials to Guru</span>
            </div>
            <div className="stat-card flex flex-col items-center gap-2">
              <Keyboard className="h-6 w-6 text-primary" />
              <span className="font-medium">70+ Shortcuts</span>
              <span className="text-xs">Full curriculum</span>
            </div>
            <div className="stat-card flex flex-col items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              <span className="font-medium">Leaderboard</span>
              <span className="text-xs">Compete globally</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button onClick={onStart} size="lg" className="btn-elufa w-full text-lg">
              Start Game
            </Button>
            <Button onClick={onViewLeaderboard} variant="outline" size="lg" className="w-full">
              <Trophy className="mr-2 h-4 w-4" />
              Leaderboard
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground">
            Windows • Excel • PowerPoint • General shortcuts
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
