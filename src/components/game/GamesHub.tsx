import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Gamepad2, Brain, Trophy, Award, TrendingUp, Clock, Target, Flame, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SnakeGame } from './SnakeGame';
import { ConsolidationQuiz } from './ConsolidationQuiz';
import { UnifiedLeaderboard, saveMiniGameScore, getUserMiniGameStats } from './UnifiedLeaderboard';
import { ACHIEVEMENTS, RARITY_COLORS } from '@/data/achievements';
import { apiService } from '@/services/apiService';
import { toast } from '@/hooks/use-toast';

interface GamesHubProps {
  onBack: () => void;
  userEmail?: string;
}

type GameType = 'hub' | 'snake' | 'epm-quiz' | 'leaderboard';
type HubTab = 'games' | 'dashboard';

interface GameCard {
  id: GameType;
  title: string;
  description: string;
  icon: string;
  color: string;
  badges?: string[];
}

interface RecentActivity {
  game: string;
  score: number;
  date: string;
  isHighScore: boolean;
}

interface DashboardStats {
  totalGamesPlayed: number;
  totalScore: number;
  snakeHighScore: number;
  epmHighScore: number;
  snakeGamesPlayed: number;
  epmGamesPlayed: number;
  epmBestAccuracy: number;
  recentActivity: RecentActivity[];
}

const GAMES: GameCard[] = [
  {
    id: 'snake',
    title: 'Snake',
    description: 'Classic arcade game - eat food and grow!',
    icon: '🐍',
    color: 'from-green-500 to-emerald-600',
    badges: ['Arcade', 'Reflexes']
  },
  {
    id: 'epm-quiz',
    title: 'EPM Knowledge Quiz',
    description: 'Test your Enterprise Performance Management expertise',
    icon: '📊',
    color: 'from-blue-500 to-purple-600',
    badges: ['Finance', 'Learning']
  }
];

// Get mini game achievements that are unlocked
const getUnlockedMiniGameAchievements = async (email: string) => {
  const stats = await getUserMiniGameStats(email);
  const miniGameAchievements = ACHIEVEMENTS.filter(a => 
    ['snake_score', 'epm_score', 'epm_games', 'epm_accuracy', 'epm_mastery', 'consolidation_perfect'].includes(a.requirement.type)
  );
  
  return miniGameAchievements.filter(achievement => {
    const req = achievement.requirement;
    switch (req.type) {
      case 'snake_score':
        return stats.snake >= req.value;
      case 'epm_score':
        return stats.epm >= req.value;
      case 'epm_games':
        return stats.epmGames >= req.value;
      case 'epm_accuracy':
        return stats.epmAccuracy >= req.value;
      case 'epm_mastery':
        return stats.epm >= 150 && stats.epmAccuracy >= 90;
      default:
        return false;
    }
  });
};

export const GamesHub = ({ onBack, userEmail }: GamesHubProps) => {
  const [currentGame, setCurrentGame] = useState<GameType>('hub');
  const [activeTab, setActiveTab] = useState<HubTab>('games');
  const [scores, setScores] = useState<Record<string, number>>({});
  const [unlockedAchievements, setUnlockedAchievements] = useState<typeof ACHIEVEMENTS>([]);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);
  const [previousHighScores, setPreviousHighScores] = useState<Record<string, number>>({});

  useEffect(() => {
    const loadData = async () => {
      if (userEmail) {
        const stats = await getUserMiniGameStats(userEmail);
        setScores({
          snake: stats.snake,
          'epm-quiz': stats.epm
        });
        setPreviousHighScores({
          snake: stats.snake,
          'epm-quiz': stats.epm
        });
        const achievements = await getUnlockedMiniGameAchievements(userEmail);
        setUnlockedAchievements(achievements);
      }
    };
    loadData();
  }, [userEmail, currentGame]);

  // Load dashboard stats when tab changes
  useEffect(() => {
    if (activeTab === 'dashboard' && userEmail && !dashboardStats) {
      loadDashboardStats();
    }
  }, [activeTab, userEmail]);

  const loadDashboardStats = async () => {
    if (!userEmail) return;
    
    setIsLoadingDashboard(true);
    try {
      const stats = await getUserMiniGameStats(userEmail);
      
      // Get user stats from API for more details
      const userStatsResult = await apiService.getUserStats(userEmail);
      
      setDashboardStats({
        totalGamesPlayed: stats.snakeGames + stats.epmGames,
        totalScore: stats.snake + stats.epm,
        snakeHighScore: stats.snake,
        epmHighScore: stats.epm,
        snakeGamesPlayed: stats.snakeGames,
        epmGamesPlayed: stats.epmGames,
        epmBestAccuracy: stats.epmAccuracy,
        recentActivity: [] // Could be populated from a recent games API
      });
    } catch (error) {
      console.error('Failed to load dashboard stats:', error);
    } finally {
      setIsLoadingDashboard(false);
    }
  };

  const handleSnakeScoreSave = async (score: number) => {
    if (userEmail) {
      const previousHighScore = previousHighScores.snake || 0;
      const isNewHighScore = score > previousHighScore;
      
      await saveMiniGameScore(userEmail, 'snake', score);
      
      if (isNewHighScore) {
        setPreviousHighScores(prev => ({ ...prev, snake: score }));
        toast({
          title: "🎉 New High Score!",
          description: `You scored ${score} points in Snake! That's ${score - previousHighScore} more than your previous best!`,
        });
      }
      
      setScores(prev => ({
        ...prev,
        snake: Math.max(prev.snake || 0, score)
      }));
      
      // Refresh dashboard stats
      setDashboardStats(null);
    }
  };

  const handleQuizScoreSave = async (score: number, accuracy: number) => {
    if (userEmail) {
      const previousHighScore = previousHighScores['epm-quiz'] || 0;
      const isNewHighScore = score > previousHighScore;
      
      await saveMiniGameScore(userEmail, 'epm', score, accuracy);
      
      if (isNewHighScore) {
        setPreviousHighScores(prev => ({ ...prev, 'epm-quiz': score }));
        toast({
          title: "🏆 New High Score!",
          description: `You scored ${score} points with ${accuracy}% accuracy! That's a new personal best!`,
        });
      }
      
      setScores(prev => ({
        ...prev,
        'epm-quiz': Math.max(prev['epm-quiz'] || 0, score)
      }));
      
      // Refresh dashboard stats
      setDashboardStats(null);
    }
  };

  if (currentGame === 'snake') {
    return (
      <SnakeGame
        onBack={() => setCurrentGame('hub')}
        onScoreSave={handleSnakeScoreSave}
        userEmail={userEmail}
      />
    );
  }

  if (currentGame === 'epm-quiz') {
    return (
      <ConsolidationQuiz
        onBack={() => setCurrentGame('hub')}
        onScoreSave={handleQuizScoreSave}
        userEmail={userEmail}
      />
    );
  }

  if (currentGame === 'leaderboard') {
    return (
      <UnifiedLeaderboard
        onBack={() => setCurrentGame('hub')}
        userEmail={userEmail}
      />
    );
  }

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
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary">
                <Gamepad2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Mini Games</CardTitle>
                <CardDescription>Take a break with these fun games!</CardDescription>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCurrentGame('leaderboard')}
              className="glass-button"
            >
              <Trophy className="h-4 w-4 mr-2" />
              Leaderboard
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Tabs for Games/Dashboard */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as HubTab)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="games" className="flex items-center gap-2">
                <Gamepad2 className="h-4 w-4" />
                Games
              </TabsTrigger>
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </TabsTrigger>
            </TabsList>

            {/* Games Tab */}
            <TabsContent value="games" className="space-y-4 mt-4">
              {/* Games Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                {GAMES.map(game => (
                  <button
                    key={game.id}
                    onClick={() => setCurrentGame(game.id)}
                    className="group text-left p-4 rounded-xl border-2 border-muted-foreground/20 hover:border-primary transition-all hover:shadow-lg"
                  >
                    <div className={cn(
                      'inline-flex p-3 rounded-xl mb-3 bg-gradient-to-br',
                      game.color
                    )}>
                      <span className="text-2xl">{game.icon}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {game.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {game.badges?.map(badge => (
                        <span
                          key={badge}
                          className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                    {scores[game.id] > 0 && (
                      <div className="mt-3 pt-3 border-t border-muted flex items-center gap-2 text-sm">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span className="text-muted-foreground">Best:</span>
                        <span className="font-bold text-primary">{scores[game.id]}</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Mini Game Achievements */}
              {unlockedAchievements.length > 0 && (
                <div className="p-4 rounded-xl bg-muted/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium">Mini Game Achievements</span>
                    <span className="text-xs text-muted-foreground">({unlockedAchievements.length} unlocked)</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {unlockedAchievements.map(achievement => {
                      const AchievementIcon = achievement.icon;
                      const rarityColors = RARITY_COLORS[achievement.rarity];
                      return (
                        <div
                          key={achievement.id}
                          className={cn(
                            'flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium',
                            rarityColors.bg,
                            rarityColors.text
                          )}
                          title={achievement.description}
                        >
                          <AchievementIcon className="h-3 w-3" />
                          {achievement.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Coming Soon */}
              <div className="p-4 rounded-xl border border-dashed border-muted-foreground/30 text-center">
                <div className="text-2xl mb-2">🎮</div>
                <div className="font-medium text-muted-foreground">More games coming soon!</div>
                <div className="text-sm text-muted-foreground">Pinball, Memory Match, and more...</div>
              </div>
            </TabsContent>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-4 mt-4">
              {isLoadingDashboard ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[...Array(4)].map((_, i) => (
                      <Skeleton key={i} className="h-24 rounded-xl" />
                    ))}
                  </div>
                  <Skeleton className="h-40 rounded-xl" />
                </div>
              ) : dashboardStats ? (
                <>
                  {/* Stats Overview */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Gamepad2 className="h-4 w-4 text-primary" />
                        <span className="text-xs text-muted-foreground">Total Games</span>
                      </div>
                      <div className="text-2xl font-bold">{dashboardStats.totalGamesPlayed}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span className="text-xs text-muted-foreground">Total Score</span>
                      </div>
                      <div className="text-2xl font-bold">{dashboardStats.totalScore.toLocaleString()}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm">🐍</span>
                        <span className="text-xs text-muted-foreground">Snake Best</span>
                      </div>
                      <div className="text-2xl font-bold">{dashboardStats.snakeHighScore}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="h-4 w-4 text-blue-500" />
                        <span className="text-xs text-muted-foreground">EPM Best</span>
                      </div>
                      <div className="text-2xl font-bold">{dashboardStats.epmHighScore}</div>
                    </div>
                  </div>

                  {/* Game Breakdown */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Snake Stats */}
                    <div className="p-4 rounded-xl border bg-card">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
                          <span className="text-xl">🐍</span>
                        </div>
                        <div>
                          <h3 className="font-semibold">Snake</h3>
                          <p className="text-xs text-muted-foreground">Classic arcade fun</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-yellow-500" />
                            High Score
                          </span>
                          <span className="font-bold text-primary">{dashboardStats.snakeHighScore}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground flex items-center gap-2">
                            <Gamepad2 className="h-4 w-4" />
                            Games Played
                          </span>
                          <span className="font-medium">{dashboardStats.snakeGamesPlayed}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            Avg per Game
                          </span>
                          <span className="font-medium">
                            {dashboardStats.snakeGamesPlayed > 0 
                              ? Math.round(dashboardStats.snakeHighScore / Math.max(1, dashboardStats.snakeGamesPlayed * 0.5))
                              : 0}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* EPM Quiz Stats */}
                    <div className="p-4 rounded-xl border bg-card">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                          <Brain className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">EPM Knowledge Quiz</h3>
                          <p className="text-xs text-muted-foreground">Enterprise expertise</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-yellow-500" />
                            High Score
                          </span>
                          <span className="font-bold text-primary">{dashboardStats.epmHighScore}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground flex items-center gap-2">
                            <Target className="h-4 w-4 text-emerald-500" />
                            Best Accuracy
                          </span>
                          <span className="font-medium">{dashboardStats.epmBestAccuracy}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground flex items-center gap-2">
                            <Gamepad2 className="h-4 w-4" />
                            Quizzes Taken
                          </span>
                          <span className="font-medium">{dashboardStats.epmGamesPlayed}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-3">
                    <Button 
                      onClick={() => setCurrentGame('snake')} 
                      variant="outline" 
                      className="flex-1 glass-button"
                    >
                      <span className="mr-2">🐍</span>
                      Play Snake
                    </Button>
                    <Button 
                      onClick={() => setCurrentGame('epm-quiz')} 
                      variant="outline" 
                      className="flex-1 glass-button"
                    >
                      <Brain className="mr-2 h-4 w-4" />
                      Take Quiz
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <BarChart3 className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p className="font-medium">No stats yet</p>
                  <p className="text-sm">Play some games to see your dashboard!</p>
                  <Button onClick={() => setActiveTab('games')} className="mt-4">
                    Start Playing
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};