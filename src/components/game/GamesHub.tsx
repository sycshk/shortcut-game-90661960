import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Gamepad2, Brain, Trophy, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SnakeGame } from './SnakeGame';
import { ConsolidationQuiz } from './ConsolidationQuiz';
import { UnifiedLeaderboard, saveMiniGameScore, getUserMiniGameStats } from './UnifiedLeaderboard';
import { ACHIEVEMENTS, RARITY_COLORS } from '@/data/achievements';

interface GamesHubProps {
  onBack: () => void;
  userEmail?: string;
}

type GameType = 'hub' | 'snake' | 'epm-quiz' | 'leaderboard';

interface GameCard {
  id: GameType;
  title: string;
  description: string;
  icon: string;
  color: string;
  badges?: string[];
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
const getUnlockedMiniGameAchievements = (email: string) => {
  const stats = getUserMiniGameStats(email);
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
  const [scores, setScores] = useState<Record<string, number>>({});
  const [unlockedAchievements, setUnlockedAchievements] = useState<typeof ACHIEVEMENTS>([]);

  useEffect(() => {
    if (userEmail) {
      const stats = getUserMiniGameStats(userEmail);
      setScores({
        snake: stats.snake,
        'epm-quiz': stats.epm
      });
      setUnlockedAchievements(getUnlockedMiniGameAchievements(userEmail));
    }
  }, [userEmail, currentGame]);

  const handleSnakeScoreSave = (score: number) => {
    if (userEmail) {
      saveMiniGameScore(userEmail, 'snake', score);
      setScores(prev => ({
        ...prev,
        snake: Math.max(prev.snake || 0, score)
      }));
    }
  };

  const handleQuizScoreSave = (score: number, accuracy: number) => {
    if (userEmail) {
      saveMiniGameScore(userEmail, 'epm', score, accuracy);
      setScores(prev => ({
        ...prev,
        'epm-quiz': Math.max(prev['epm-quiz'] || 0, score)
      }));
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

          {/* Stats Summary */}
          <div className="p-4 rounded-xl bg-muted/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                <span className="font-medium">Total Mini Game Score</span>
              </div>
              <span className="font-bold text-xl text-primary">
                {Object.values(scores).reduce((a, b) => a + (b || 0), 0)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
