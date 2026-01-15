import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Trophy, Medal, Gamepad2, Brain, Keyboard, Crown, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlayerAvatar } from './PlayerAvatar';

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

const MINI_GAME_STORAGE_KEY = 'mini-game-scores';

// Get mini game scores from localStorage
const getMiniGameScores = (): Record<string, { snake: number; epm: number; snakeGames: number; epmGames: number; epmAccuracy: number }> => {
  try {
    const stored = localStorage.getItem(MINI_GAME_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

// Save mini game score
export const saveMiniGameScore = (email: string, game: 'snake' | 'epm', score: number, accuracy?: number) => {
  const scores = getMiniGameScores();
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
};

// Get user's mini game stats
export const getUserMiniGameStats = (email: string) => {
  const scores = getMiniGameScores();
  return scores[email] || { snake: 0, epm: 0, snakeGames: 0, epmGames: 0, epmAccuracy: 0 };
};

export const UnifiedLeaderboard = ({ onBack, userEmail }: UnifiedLeaderboardProps) => {
  const [activeTab, setActiveTab] = useState<GameType>('all');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userRank, setUserRank] = useState<number | null>(null);

  useEffect(() => {
    loadLeaderboard(activeTab);
  }, [activeTab]);

  const loadLeaderboard = async (gameType: GameType) => {
    setIsLoading(true);
    
    try {
      const miniGameScores = getMiniGameScores();
      const allUsers = new Map<string, { 
        name: string; 
        email: string;
        shortcutScore: number;
        snakeScore: number;
        epmScore: number;
        gamesPlayed: number;
        bestStreak: number;
        accuracy: number;
      }>();

      // Get shortcut game data from localStorage
      const shortcutLeaderboard = JSON.parse(localStorage.getItem('shortcut-leaderboard') || '[]');
      shortcutLeaderboard.forEach((entry: any) => {
        const existing = allUsers.get(entry.name) || {
          name: entry.name,
          email: entry.email || entry.name,
          shortcutScore: 0,
          snakeScore: 0,
          epmScore: 0,
          gamesPlayed: 0,
          bestStreak: 0,
          accuracy: 0
        };
        existing.shortcutScore += entry.score;
        existing.gamesPlayed += 1;
        existing.bestStreak = Math.max(existing.bestStreak, entry.streak || 0);
        existing.accuracy = Math.max(existing.accuracy, entry.accuracy || 0);
        allUsers.set(entry.name, existing);
      });

      // Add mini game scores
      Object.entries(miniGameScores).forEach(([email, scores]) => {
        const name = email.split('@')[0];
        const existing = allUsers.get(name) || {
          name,
          email,
          shortcutScore: 0,
          snakeScore: 0,
          epmScore: 0,
          gamesPlayed: 0,
          bestStreak: 0,
          accuracy: 0
        };
        existing.snakeScore = scores.snake || 0;
        existing.epmScore = scores.epm || 0;
        existing.gamesPlayed += (scores.snakeGames || 0) + (scores.epmGames || 0);
        allUsers.set(name, existing);
      });

      // Convert to entries based on game type
      let leaderboardEntries: LeaderboardEntry[] = [];
      
      allUsers.forEach((user) => {
        let score = 0;
        switch (gameType) {
          case 'all':
            score = user.shortcutScore + user.snakeScore + user.epmScore;
            break;
          case 'shortcuts':
            score = user.shortcutScore;
            break;
          case 'snake':
            score = user.snakeScore;
            break;
          case 'epm':
            score = user.epmScore;
            break;
        }
        
        if (score > 0) {
          leaderboardEntries.push({
            rank: 0,
            name: user.name,
            email: user.email,
            score,
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
                <CardTitle className="text-2xl">Unified Leaderboard</CardTitle>
                <CardDescription>Rankings across all games</CardDescription>
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
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
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
