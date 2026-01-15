import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Keyboard, Trophy, Zap } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
  onViewLeaderboard: () => void;
}

export const WelcomeScreen = ({ onStart, onViewLeaderboard }: WelcomeScreenProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg text-center">
        <CardHeader className="space-y-4">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Keyboard className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Shortcut Master</CardTitle>
          <CardDescription className="text-lg">
            Master keyboard shortcuts through fun, interactive challenges
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="flex flex-col items-center gap-2 rounded-lg border p-4">
              <Zap className="h-6 w-6 text-primary" />
              <span>Speed Challenges</span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg border p-4">
              <Trophy className="h-6 w-6 text-primary" />
              <span>Track Progress</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button onClick={onStart} size="lg" className="w-full text-lg">
              Start Game
            </Button>
            <Button onClick={onViewLeaderboard} variant="outline" size="lg" className="w-full">
              <Trophy className="mr-2 h-4 w-4" />
              Leaderboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
