import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown, Star, Sparkles, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { leaderboardService } from '@/services/leaderboardService';

interface HallOfFameEntry {
  name: string;
  email?: string;
  score: number;
  accuracy: number;
  streak: number;
  date: string;
}

export const HallOfFame = () => {
  const [legends, setLegends] = useState<HallOfFameEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLegends = async () => {
      try {
        const entries = await leaderboardService.getHallOfFame();
        setLegends(entries);
      } catch (error) {
        console.error('Failed to load Hall of Fame:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadLegends();
  }, []);

  if (isLoading) {
    return (
      <Card className="glass-card animate-fade-in">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500">
              <Crown className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">Hall of Fame</CardTitle>
              <CardDescription className="text-sm">Legendary Guru Masters</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-muted-foreground">
            <div className="animate-spin h-6 w-6 border-2 border-yellow-500 border-t-transparent rounded-full mx-auto mb-2"></div>
            <p className="text-sm">Loading legends...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (legends.length === 0) {
    return (
      <Card className="glass-card animate-fade-in">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500">
              <Crown className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">Hall of Fame</CardTitle>
              <CardDescription className="text-sm">Legendary Guru Masters</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Crown className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm font-medium">No legends yet!</p>
            <p className="text-xs mt-1">Complete the Guru level to become a legend.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card animate-fade-in overflow-hidden">
      {/* Animated gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-red-500/20 animate-pulse pointer-events-none" />
      
      <CardHeader className="pb-3 relative">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shadow-yellow-500/30">
            <Crown className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              Hall of Fame
              <Sparkles className="h-4 w-4 text-yellow-500" />
            </CardTitle>
            <CardDescription className="text-sm">Legendary Guru Masters</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative">
        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin">
          {legends.map((legend, index) => (
            <div
              key={`${legend.name}-${legend.date}`}
              className={cn(
                'flex items-center gap-3 rounded-xl p-3 transition-all relative overflow-hidden',
                index === 0 
                  ? 'bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 border-2 border-yellow-500/50' 
                  : 'border border-yellow-500/20 bg-yellow-500/5 hover:bg-yellow-500/10'
              )}
            >
              {/* Rank indicator */}
              <div className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full',
                index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' : 'bg-yellow-500/20'
              )}>
                {index === 0 ? (
                  <Crown className="h-4 w-4 text-white" />
                ) : index < 3 ? (
                  <Star className="h-4 w-4 text-yellow-500" />
                ) : (
                  <Trophy className="h-4 w-4 text-yellow-600/60" />
                )}
              </div>
              
              {/* Player info */}
              <div className="flex-1 min-w-0">
                <div className={cn(
                  "font-semibold text-sm truncate",
                  index === 0 && "text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"
                )}>
                  {legend.name}
                  {index === 0 && <span className="ml-2">👑</span>}
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <span>{legend.accuracy}% accuracy</span>
                  {legend.streak >= 5 && (
                    <span className="text-orange-500">🔥 {legend.streak} streak</span>
                  )}
                </div>
              </div>
              
              {/* Score */}
              <div className="text-right">
                <div className={cn(
                  "font-bold",
                  index === 0 ? "text-lg text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500" : "text-yellow-600"
                )}>
                  {legend.score}
                </div>
                <div className="text-xs text-muted-foreground">pts</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
