import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LeaderboardEntry } from '@/types/game';
import { Trophy, ArrowLeft, Medal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeaderboardScreenProps {
  entries: LeaderboardEntry[];
  onBack: () => void;
}

export const LeaderboardScreen = ({ entries, onBack }: LeaderboardScreenProps) => {
  const getMedalColor = (index: number) => {
    if (index === 0) return 'text-yellow-500';
    if (index === 1) return 'text-gray-400';
    if (index === 2) return 'text-amber-600';
    return 'text-muted-foreground';
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <Button variant="ghost" size="sm" onClick={onBack} className="w-fit -ml-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <Trophy className="h-8 w-8 text-yellow-500" />
            <div>
              <CardTitle className="text-2xl">Leaderboard</CardTitle>
              <CardDescription>Top 10 scores</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {entries.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Trophy className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>No scores yet!</p>
              <p className="text-sm">Be the first to complete a challenge.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {entries.map((entry, index) => (
                <div
                  key={entry.id}
                  className={cn(
                    'flex items-center gap-4 rounded-lg border p-4 transition-colors',
                    index < 3 && 'bg-muted/50'
                  )}
                >
                  <div className={cn('flex h-8 w-8 items-center justify-center font-bold', getMedalColor(index))}>
                    {index < 3 ? (
                      <Medal className="h-6 w-6" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{entry.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {entry.category === 'os' ? 'OS' : 'Office'} • {entry.difficulty} • {entry.accuracy}% accuracy
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg text-primary">{entry.score}</div>
                    <div className="text-xs text-muted-foreground">points</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
