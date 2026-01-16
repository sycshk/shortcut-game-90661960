import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Trophy, Medal, Brain, Keyboard, Crown, Flame, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlayerAvatar } from './PlayerAvatar';
import { apiService } from '@/services/apiService';

interface UnifiedLeaderboardProps {
  onBack: () => void;
  userEmail?: string;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  email?: string;
  score: number;
  gamesPlayed: number;
  bestStreak?: number;
  accuracy?: number;
}

type GameType = 'all' | 'shortcuts' | 'snake' | 'epm';
type TimeFrame = 'week' | 'lastweek' | 'alltime';

// Helper to get week boundaries
const getWeekBoundaries = (weeksAgo: number = 0): { start: Date; end: Date } => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  
  const monday = new Date(now);
  monday.setDate(now.getDate() - diffToMonday - (weeksAgo * 7));
  monday.setHours(0, 0, 0, 0);
  
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);
  
  return { start: monday, end: sunday };
};

// Format week range for display
const formatWeekRange = (start: Date, end: Date): string => {
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`;
};

// Save mini game score to server (with localStorage fallback)
export const saveMiniGameScore = async (
  email: string, 
  game: 'snake' | 'epm', 
  score: number, 
  accuracy?: number
): Promise<void> => {
  try {
    // Try to save to server first
    const result = await apiService.saveMiniGameScore({
      email,
      game_type: game,
      score,
      accuracy
    });
    
    if (result.data) {
      console.log(`✅ Mini game score saved to server: ${game} = ${score}`, result.data);
      return;
    }
  } catch (error) {
    console.warn('Failed to save to server, falling back to localStorage:', error);
  }
  
  // Fallback to localStorage if server unavailable
  const MINI_GAME_STORAGE_KEY = 'mini-game-scores';
  try {
    const stored = localStorage.getItem(MINI_GAME_STORAGE_KEY);
    const scores = stored ? JSON.parse(stored) : {};
    const userScores = scores[email] || { snake: 0, epm: 0, snakeGames: 0, epmGames: 0, epmAccuracy: 0 };
    
    if (game === 'snake') {
      userScores.snake = Math.max(userScores.snake, score);
      userScores.snakeGames = (userScores.snakeGames || 0) + 1;
    } else if (game === 'epm') {
      userScores.epm = Math.max(userScores.epm, score);
      userScores.epmGames = (userScores.epmGames || 0) + 1;
      if (accuracy !== undefined) {
        userScores.epmAccuracy = Math.max(userScores.epmAccuracy || 0, accuracy);
      }
    }
    
    scores[email] = userScores;
    localStorage.setItem(MINI_GAME_STORAGE_KEY, JSON.stringify(scores));
  } catch {
    console.error('Failed to save to localStorage');
  }
};

// Get user's mini game stats from server (with localStorage fallback)
export const getUserMiniGameStats = async (email: string): Promise<{
  snake: number;
  epm: number;
  snakeGames: number;
  epmGames: number;
  epmAccuracy: number;
}> => {
  try {
    const result = await apiService.getMiniGameScores(email);
    
    if (result.data?.scores) {
      const scores = result.data.scores;
      return {
        snake: scores.snake?.highScore || 0,
        epm: scores.epm?.highScore || 0,
        snakeGames: scores.snake?.gamesPlayed || 0,
        epmGames: scores.epm?.gamesPlayed || 0,
        epmAccuracy: scores.epm?.bestAccuracy || 0
      };
    }
  } catch (error) {
    console.warn('Failed to fetch from server, falling back to localStorage:', error);
  }
  
  // Fallback to localStorage
  const MINI_GAME_STORAGE_KEY = 'mini-game-scores';
  try {
    const stored = localStorage.getItem(MINI_GAME_STORAGE_KEY);
    const scores = stored ? JSON.parse(stored) : {};
    return scores[email] || { snake: 0, epm: 0, snakeGames: 0, epmGames: 0, epmAccuracy: 0 };
  } catch {
    return { snake: 0, epm: 0, snakeGames: 0, epmGames: 0, epmAccuracy: 0 };
  }
};

export const UnifiedLeaderboard = ({ onBack, userEmail }: UnifiedLeaderboardProps) => {
  const [activeTab, setActiveTab] = useState<GameType>('all');
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('week');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [weekLabel, setWeekLabel] = useState<string>('');

  useEffect(() => {
    loadLeaderboard(activeTab, timeFrame);
  }, [activeTab, timeFrame]);

  const loadLeaderboard = async (gameType: GameType, tf: TimeFrame) => {
    setIsLoading(true);
    
    // Calculate date boundaries based on timeframe
    let startDate: Date | null = null;
    let endDate: Date | null = null;
    
    if (tf === 'week') {
      const boundaries = getWeekBoundaries(0);
      startDate = boundaries.start;
      endDate = boundaries.end;
      setWeekLabel(formatWeekRange(startDate, endDate));
    } else if (tf === 'lastweek') {
      const boundaries = getWeekBoundaries(1);
      startDate = boundaries.start;
      endDate = boundaries.end;
      setWeekLabel(formatWeekRange(startDate, endDate));
    } else {
      setWeekLabel('All Time');
    }
    
    try {
      const allUsers = new Map<string, { 
        name: string; 
        email: string;
        totalScore: number;
        gamesPlayed: number;
        bestStreak: number;
        accuracy: number;
      }>();

      // Get all leaderboard entries (each represents a game session with its score)
      const leaderboardResult = await apiService.getLeaderboard({ limit: 1000 });
      if (leaderboardResult.data?.entries) {
        leaderboardResult.data.entries.forEach((entry: any) => {
          const entryDate = new Date(entry.created_at || entry.date);
          
          // Filter by date if timeframe is set
          if (startDate && endDate) {
            if (entryDate < startDate || entryDate > endDate) return;
          }
          
          const email = entry.email || '';
          const name = entry.name || email.split('@')[0] || 'Anonymous';
          
          if (!name) return;
          
          const existing = allUsers.get(name) || {
            name,
            email,
            totalScore: 0,
            gamesPlayed: 0,
            bestStreak: 0,
            accuracy: 0
          };
          
          // Filter by game type for shortcuts
          if (gameType === 'all' || gameType === 'shortcuts') {
            existing.totalScore += entry.score || 0;
            existing.gamesPlayed += 1;
            existing.bestStreak = Math.max(existing.bestStreak, entry.streak || 0);
            existing.accuracy = Math.max(existing.accuracy, entry.accuracy || 0);
          }
          
          allUsers.set(name, existing);
        });
      }

      // Get mini game scores
      if (gameType === 'all' || gameType === 'snake' || gameType === 'epm') {
        const miniGameResult = await apiService.getUnifiedMiniGameLeaderboard();
        if (miniGameResult.data?.entries) {
          miniGameResult.data.entries.forEach((entry: any) => {
            const name = entry.name || entry.email?.split('@')[0] || '';
            if (!name) return;
            
            const existing = allUsers.get(name) || {
              name,
              email: entry.email || name,
              totalScore: 0,
              gamesPlayed: 0,
              bestStreak: 0,
              accuracy: 0
            };
            
            // Add mini game scores based on filter
            // Note: Mini game scores are cumulative totals (sum of all games played)
            if (gameType === 'all') {
              existing.totalScore += (entry.snakeScore || 0) + (entry.epmScore || 0);
            } else if (gameType === 'snake') {
              existing.totalScore += entry.snakeScore || 0;
            } else if (gameType === 'epm') {
              existing.totalScore += entry.epmScore || 0;
            }
            existing.gamesPlayed += entry.totalGames || 0;
            
            allUsers.set(name, existing);
          });
        }
      }

      // Convert to entries
      let leaderboardEntries: LeaderboardEntry[] = [];
      
      allUsers.forEach((user) => {
        if (user.totalScore > 0) {
          leaderboardEntries.push({
            rank: 0,
            name: user.name,
            email: user.email,
            score: user.totalScore,
            gamesPlayed: user.gamesPlayed,
            bestStreak: user.bestStreak,
            accuracy: user.accuracy
          });
        }
      });

      // Sort and assign ranks
      leaderboardEntries = leaderboardEntries
        .sort((a, b) => b.score - a.score)
        .slice(0, 50)
        .map((entry, index) => ({ ...entry, rank: index + 1 }));

      setEntries(leaderboardEntries);
      
      // Find user's rank
      if (userEmail) {
        const userName = userEmail.split('@')[0];
        const found = leaderboardEntries.find(e => e.name === userName || e.email === userEmail);
        setUserRank(found?.rank || null);
      }
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getMedalColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-500';
    if (rank === 2) return 'text-gray-400';
    if (rank === 3) return 'text-amber-600';
    return 'text-muted-foreground';
  };

  const getGameIcon = (gameType: GameType) => {
    switch (gameType) {
      case 'all': return <Trophy className="h-4 w-4" />;
      case 'shortcuts': return <Keyboard className="h-4 w-4" />;
      case 'snake': return <span className="text-sm">🐍</span>;
      case 'epm': return <Brain className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center animated-bg p-4">
      <Card className="glass-card w-full max-w-2xl">
        <CardHeader>
          <Button variant="ghost" size="sm" onClick={onBack} className="w-fit -ml-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Weekly Leaderboard</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  {weekLabel} • Total points from all games
                </CardDescription>
              </div>
            </div>
            {userRank && (
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Your Rank</div>
                <div className="font-bold text-xl text-primary">#{userRank}</div>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Timeframe Selector */}
          <div className="flex gap-2 justify-center">
            <Button
              variant={timeFrame === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeFrame('week')}
              className="flex items-center gap-1"
            >
              <Calendar className="h-3 w-3" />
              This Week
            </Button>
            <Button
              variant={timeFrame === 'lastweek' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeFrame('lastweek')}
            >
              Last Week
            </Button>
            <Button
              variant={timeFrame === 'alltime' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeFrame('alltime')}
            >
              All Time
            </Button>
          </div>

          {/* Game Type Tabs */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as GameType)}>
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="all" className="flex items-center gap-1">
                {getGameIcon('all')}
                <span className="hidden sm:inline">All</span>
              </TabsTrigger>
              <TabsTrigger value="shortcuts" className="flex items-center gap-1">
                {getGameIcon('shortcuts')}
                <span className="hidden sm:inline">Shortcuts</span>
              </TabsTrigger>
              <TabsTrigger value="snake" className="flex items-center gap-1">
                {getGameIcon('snake')}
                <span className="hidden sm:inline">Snake</span>
              </TabsTrigger>
              <TabsTrigger value="epm" className="flex items-center gap-1">
                {getGameIcon('epm')}
                <span className="hidden sm:inline">EPM</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-4">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                  <p className="text-sm text-muted-foreground">Loading...</p>
                </div>
              ) : entries.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Trophy className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p className="font-medium">No scores yet!</p>
                  <p className="text-sm">Be the first to play and get on the leaderboard.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {entries.map((entry) => {
                    const isCurrentUser = userEmail && (entry.email === userEmail || entry.name === userEmail.split('@')[0]);
                    
                    return (
                      <div
                        key={`${entry.name}-${entry.rank}`}
                        className={cn(
                          'flex items-center gap-3 rounded-xl border p-3 transition-all',
                          entry.rank <= 3 && 'bg-primary/5',
                          isCurrentUser && 'ring-2 ring-primary/50 bg-primary/10'
                        )}
                      >
                        {/* Rank + Avatar */}
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            'flex h-8 w-8 items-center justify-center font-bold text-sm rounded-full',
                            entry.rank <= 3 ? getMedalColor(entry.rank) : 'text-muted-foreground'
                          )}>
                            {entry.rank <= 3 ? (
                              entry.rank === 1 ? <Crown className="h-5 w-5" /> : <Medal className="h-5 w-5" />
                            ) : (
                              <span>{entry.rank}</span>
                            )}
                          </div>
                          <PlayerAvatar email={entry.email} size="sm" />
                        </div>

                        {/* Name & Stats */}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate flex items-center gap-2">
                            {entry.name}
                            {isCurrentUser && (
                              <span className="text-xs px-1.5 py-0.5 rounded-full bg-primary/20 text-primary">You</span>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center gap-2">
                            <span>{entry.gamesPlayed} games</span>
                            {entry.bestStreak && entry.bestStreak > 0 && (
                              <span className="flex items-center gap-0.5 text-orange-500">
                                <Flame className="h-3 w-3" />
                                {entry.bestStreak}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Score */}
                        <div className="text-right">
                          <div className={cn(
                            'font-bold text-lg',
                            entry.rank === 1 ? 'text-yellow-500' : 'text-primary'
                          )}>
                            {entry.score.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">points</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Legend */}
          <div className="flex justify-center gap-4 text-xs text-muted-foreground pt-2">
            <div className="flex items-center gap-1">
              <Keyboard className="h-3 w-3" />
              <span>Shortcuts</span>
            </div>
            <div className="flex items-center gap-1">
              <span>🐍</span>
              <span>Snake</span>
            </div>
            <div className="flex items-center gap-1">
              <Brain className="h-3 w-3" />
              <span>EPM Quiz</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
