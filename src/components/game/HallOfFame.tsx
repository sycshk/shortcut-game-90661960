import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown, Star, Sparkles, Trophy, Zap, Target, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import { leaderboardService } from '@/services/leaderboardService';
import { PlayerAvatar } from './PlayerAvatar';

interface HallOfFameEntry {
  name: string;
  email?: string;
  score: number;
  accuracy: number;
  streak: number;
  date: string;
}

// Badge definitions for Hall of Fame display
const getBadges = (entry: HallOfFameEntry) => {
  const badges: { icon: typeof Trophy; label: string; color: string; bgColor: string }[] = [];
  
  // Perfect Score badge (100% accuracy)
  if (entry.accuracy === 100) {
    badges.push({
      icon: Target,
      label: 'Perfect',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20'
    });
  }
  
  // Speed Demon badge (high score indicates speed)
  if (entry.score >= 200) {
    badges.push({
      icon: Zap,
      label: 'Speed Demon',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    });
  }
  
  // Streak Master badge (streak of 5+)
  if (entry.streak >= 5) {
    badges.push({
      icon: Flame,
      label: 'Streak Master',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20'
    });
  }
  
  return badges;
};

// Animated Crown Component
const AnimatedCrown = () => (
  <div className="relative">
    {/* Glow effect */}
    <div className="absolute inset-0 animate-pulse">
      <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-xl" />
    </div>
    {/* Sparkle particles */}
    <div className="absolute -top-1 -left-1 animate-ping">
      <Sparkles className="h-3 w-3 text-yellow-300" />
    </div>
    <div className="absolute -top-1 -right-1 animate-ping" style={{ animationDelay: '0.5s' }}>
      <Sparkles className="h-2 w-2 text-yellow-200" />
    </div>
    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 animate-ping" style={{ animationDelay: '1s' }}>
      <Sparkles className="h-2 w-2 text-orange-300" />
    </div>
    {/* Crown with floating animation */}
    <div className="relative animate-bounce" style={{ animationDuration: '2s' }}>
      <div className="p-2 rounded-full bg-gradient-to-br from-yellow-400 via-orange-400 to-yellow-500 shadow-lg shadow-yellow-500/50">
        <Crown className="h-5 w-5 text-white drop-shadow-lg" />
      </div>
    </div>
  </div>
);

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
    <Card className="glass-card animate-fade-in overflow-hidden relative">
      {/* Animated gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-orange-500/10 to-red-500/10 pointer-events-none" />
      
      {/* Animated shimmer effect for top entry */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-yellow-500/5 to-transparent pointer-events-none" />
      
      <CardHeader className="pb-3 relative">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shadow-yellow-500/30">
            <Crown className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              Hall of Fame
              <Sparkles className="h-4 w-4 text-yellow-500 animate-pulse" />
            </CardTitle>
            <CardDescription className="text-sm">Legendary Guru Masters</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative">
        <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1 scrollbar-thin">
          {legends.map((legend, index) => {
            const badges = getBadges(legend);
            const isTop = index === 0;
            
            return (
              <div
                key={`${legend.name}-${legend.date}`}
                className={cn(
                  'flex items-center gap-3 rounded-xl p-3 transition-all relative overflow-hidden group',
                  isTop 
                    ? 'bg-gradient-to-r from-yellow-500/20 via-orange-500/15 to-amber-500/20 border-2 border-yellow-500/50 shadow-lg shadow-yellow-500/10' 
                    : 'border border-yellow-500/20 bg-yellow-500/5 hover:bg-yellow-500/10'
                )}
              >
                {/* Animated shine effect for top player */}
                {isTop && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                )}
                
                {/* Avatar + Rank */}
                <div className="flex-shrink-0 relative">
                  {isTop ? (
                    <div className="relative">
                      <PlayerAvatar email={legend.email} size="lg" />
                      <div className="absolute -top-2 -right-2">
                        <AnimatedCrown />
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <PlayerAvatar email={legend.email} size="md" />
                      {index < 3 && (
                        <div className="absolute -bottom-1 -right-1 bg-yellow-500 rounded-full p-0.5">
                          <Star className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Player info */}
                <div className="flex-1 min-w-0">
                  <div className={cn(
                    "font-semibold text-sm truncate flex items-center gap-2",
                    isTop && "text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500"
                  )}>
                    {legend.name}
                    {isTop && <span className="text-base">👑</span>}
                  </div>
                  
                  {/* Badges */}
                  {badges.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {badges.map((badge, i) => {
                        const BadgeIcon = badge.icon;
                        return (
                          <span
                            key={i}
                            className={cn(
                              "inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-medium",
                              badge.bgColor,
                              badge.color
                            )}
                          >
                            <BadgeIcon className="h-2.5 w-2.5" />
                            {badge.label}
                          </span>
                        );
                      })}
                    </div>
                  )}
                  
                  {/* Stats */}
                  <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                    <span>{legend.accuracy}% acc</span>
                    {legend.streak >= 3 && (
                      <span className="text-orange-500 flex items-center gap-0.5">
                        <Flame className="h-3 w-3" />
                        {legend.streak}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Score */}
                <div className="text-right flex-shrink-0">
                  <div className={cn(
                    "font-bold tabular-nums",
                    isTop 
                      ? "text-xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500" 
                      : "text-lg text-yellow-600"
                  )}>
                    {legend.score}
                  </div>
                  <div className="text-xs text-muted-foreground">pts</div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
