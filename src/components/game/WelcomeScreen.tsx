import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Keyboard, Trophy, Zap, Medal, LogOut } from 'lucide-react';
import { LeaderboardEntry } from '@/types/game';
import { leaderboardService } from '@/services/leaderboardService';
import { cn } from '@/lib/utils';

interface WelcomeScreenProps {
  onStart: () => void;
  userEmail?: string;
  onLogout?: () => void;
}

export const WelcomeScreen = ({ onStart, userEmail, onLogout }: WelcomeScreenProps) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLeaderboard = async () => {
      await leaderboardService.init();
      setEntries(leaderboardService.getTop(10));
      setIsLoading(false);
    };
    loadLeaderboard();
  }, []);

  const getMedalColor = (index: number) => {
    if (index === 0) return 'text-yellow-500';
    if (index === 1) return 'text-gray-400';
    if (index === 2) return 'text-amber-600';
    return 'text-muted-foreground';
  };

  // Get username from email
  const userName = userEmail ? userEmail.split('@')[0] : '';

  return (
    <div className="flex min-h-screen items-center justify-center animated-bg p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-6">
        {/* Welcome Card */}
        <Card className="text-center glass-card animate-fade-in">
          <CardHeader className="space-y-4">
            {/* User info and logout */}
            {userEmail && onLogout && (
              <div className="flex items-center justify-between text-sm text-muted-foreground -mt-2">
                <span className="truncate">Welcome, <span className="font-medium text-foreground">{userName}</span></span>
                <Button variant="ghost" size="sm" onClick={onLogout} className="text-muted-foreground hover:text-destructive">
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </div>
            )}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 glow-primary">
              <Keyboard className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-display font-bold text-gradient">
              Elufa Shortcut Master
            </CardTitle>
            <CardDescription className="text-base">
              Master keyboard shortcuts through fun, interactive challenges
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground">
              <div className="stat-card flex flex-col items-center gap-1 p-2">
                <Zap className="h-5 w-5 text-primary" />
                <span className="font-medium text-xs">4 Levels</span>
              </div>
              <div className="stat-card flex flex-col items-center gap-1 p-2">
                <Keyboard className="h-5 w-5 text-primary" />
                <span className="font-medium text-xs">70+ Shortcuts</span>
              </div>
              <div className="stat-card flex flex-col items-center gap-1 p-2">
                <Trophy className="h-5 w-5 text-secondary" />
                <span className="font-medium text-xs">Compete</span>
              </div>
            </div>
            
            <Button onClick={onStart} size="lg" className="btn-elufa w-full text-lg">
              Start Game
            </Button>
            
            <p className="text-xs text-muted-foreground">
              Windows • Excel • PowerPoint • General shortcuts
            </p>
          </CardContent>
        </Card>

        {/* Leaderboard Card */}
        <Card className="glass-card animate-fade-in">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <Trophy className="h-6 w-6 text-yellow-500" />
              <div>
                <CardTitle className="text-xl">Leaderboard</CardTitle>
                <CardDescription className="text-sm">Top 10 scores</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">
                <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                <p className="text-sm">Loading...</p>
              </div>
            ) : entries.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Trophy className="h-10 w-10 mx-auto mb-3 opacity-20" />
                <p className="text-sm">No scores yet!</p>
                <p className="text-xs">Be the first to complete a challenge.</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                {entries.map((entry, index) => (
                  <div
                    key={entry.id}
                    className={cn(
                      'flex items-center gap-3 rounded-lg border p-3 transition-colors',
                      index < 3 && 'bg-muted/50'
                    )}
                  >
                    <div className={cn('flex h-7 w-7 items-center justify-center font-bold text-sm', getMedalColor(index))}>
                      {index < 3 ? (
                        <Medal className="h-5 w-5" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{entry.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {entry.level || 'Mixed'} • {entry.accuracy}%
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">{entry.score}</div>
                      <div className="text-xs text-muted-foreground">pts</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
