import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Trophy, Award, User, Gamepad2, Target, Flame, Calendar, Crown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { leaderboardService } from '@/services/leaderboardService';
import { apiService } from '@/services/apiService';
import { getDailyStreakData } from '@/services/dailyChallengeService';
import { AchievementBadge } from './AchievementBadge';
import { ACHIEVEMENTS, AVATARS, RARITY_COLORS, Avatar } from '@/data/achievements';
import { getUserMiniGameStats } from './UnifiedLeaderboard';

interface ProfilePageProps {
  onBack: () => void;
  userEmail: string;
  displayName: string;
  onAvatarChange?: (avatarId: string) => void;
}

interface UserStats {
  gamesPlayed: number;
  totalScore: number;
  bestStreak: number;
  perfectGames: number;
  guruCompleted: number;
  dailyStreak: number;
  avgAccuracy: number;
  snakeHighScore: number;
  epmHighScore: number;
  epmBestAccuracy: number;
}

export const ProfilePage = ({ onBack, userEmail, displayName, onAvatarChange }: ProfilePageProps) => {
  const [stats, setStats] = useState<UserStats>({
    gamesPlayed: 0,
    totalScore: 0,
    bestStreak: 0,
    perfectGames: 0,
    guruCompleted: 0,
    dailyStreak: 0,
    avgAccuracy: 0,
    snakeHighScore: 0,
    epmHighScore: 0,
    epmBestAccuracy: 0
  });
  const [selectedAvatar, setSelectedAvatar] = useState<string>('default_smile');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        // Get sessions data
        const sessions = await leaderboardService.getSessions(userEmail);
        const history = await leaderboardService.getAnswerHistory(userEmail);
        
        const gamesPlayed = sessions.length;
        const totalScore = sessions.reduce((sum, s) => sum + s.score, 0);
        const bestStreak = Math.max(0, ...sessions.map(s => s.streak));
        const perfectGames = sessions.filter(s => s.accuracy === 100).length;
        const guruCompleted = sessions.filter(s => s.level === 'guru').length;
        const avgAccuracy = gamesPlayed > 0 
          ? Math.round(sessions.reduce((sum, s) => sum + s.accuracy, 0) / gamesPlayed)
          : 0;
        
        // Get daily streak from API
        const streakData = await getDailyStreakData(userEmail);
        const dailyStreak = streakData.currentStreak;
        
        // Get mini game stats
        const miniGameStats = await getUserMiniGameStats(userEmail);
        
        setStats({
          gamesPlayed,
          totalScore,
          bestStreak,
          perfectGames,
          guruCompleted,
          dailyStreak,
          avgAccuracy,
          snakeHighScore: miniGameStats.snake || 0,
          epmHighScore: miniGameStats.epm || 0,
          epmBestAccuracy: miniGameStats.epmAccuracy || 0
        });
        
        // Load saved avatar - try API first, fallback to localStorage
        const userResult = await apiService.getUser(userEmail);
        if (userResult.data?.avatar) {
          setSelectedAvatar(userResult.data.avatar);
        } else {
          // Fallback to localStorage
          const savedAvatar = localStorage.getItem(`avatar-${userEmail}`);
          if (savedAvatar) setSelectedAvatar(savedAvatar);
        }
        
      } catch (error) {
        console.error('Failed to load stats:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadStats();
  }, [userEmail]);

  // Check if achievement is unlocked
  const isAchievementUnlocked = (achievement: typeof ACHIEVEMENTS[0]) => {
    const req = achievement.requirement;
    switch (req.type) {
      case 'first_game':
        return stats.gamesPlayed >= 1;
      case 'games_played':
        return stats.gamesPlayed >= req.value;
      case 'perfect_score':
        return stats.perfectGames >= req.value;
      case 'guru_completed':
        return stats.guruCompleted >= req.value;
      case 'streak':
        return stats.bestStreak >= req.value;
      case 'daily_streak':
        return stats.dailyStreak >= req.value;
      case 'total_score':
        return stats.totalScore >= req.value;
      case 'accuracy':
        return stats.avgAccuracy >= req.value && stats.gamesPlayed >= 10;
      // Mini game achievements
      case 'snake_score':
        return stats.snakeHighScore >= req.value;
      case 'epm_score':
        return stats.epmHighScore >= req.value;
      case 'epm_games':
        return true; // Would need to track epm games played
      case 'epm_accuracy':
        return stats.epmBestAccuracy >= req.value;
      case 'epm_mastery':
        return stats.epmHighScore >= 150 && stats.epmBestAccuracy >= 90;
      default:
        return false;
    }
  };

  // Get achievement progress
  const getAchievementProgress = (achievement: typeof ACHIEVEMENTS[0]) => {
    const req = achievement.requirement;
    switch (req.type) {
      case 'first_game':
      case 'games_played':
        return (stats.gamesPlayed / req.value) * 100;
      case 'perfect_score':
        return (stats.perfectGames / req.value) * 100;
      case 'guru_completed':
        return (stats.guruCompleted / req.value) * 100;
      case 'streak':
        return (stats.bestStreak / req.value) * 100;
      case 'daily_streak':
        return (stats.dailyStreak / req.value) * 100;
      case 'total_score':
        return (stats.totalScore / req.value) * 100;
      case 'accuracy':
        return stats.gamesPlayed >= 10 ? (stats.avgAccuracy / req.value) * 100 : 0;
      // Mini game achievements
      case 'snake_score':
        return (stats.snakeHighScore / req.value) * 100;
      case 'epm_score':
        return (stats.epmHighScore / req.value) * 100;
      case 'epm_accuracy':
        return (stats.epmBestAccuracy / req.value) * 100;
      case 'epm_mastery':
        const scoreProgress = Math.min(100, (stats.epmHighScore / 150) * 50);
        const accProgress = Math.min(100, (stats.epmBestAccuracy / 90) * 50);
        return scoreProgress + accProgress;
      default:
        return 0;
    }
  };

  // Check if avatar is unlocked
  const isAvatarUnlocked = (avatar: Avatar) => {
    const req = avatar.requirement;
    switch (req.type) {
      case 'default':
        return true;
      case 'games_played':
        return stats.gamesPlayed >= (req.value || 0);
      case 'guru_completed':
        return stats.guruCompleted >= (req.value || 0);
      case 'daily_streak':
        return stats.dailyStreak >= (req.value || 0);
      case 'perfect_games':
        return stats.perfectGames >= (req.value || 0);
      case 'achievement':
        const ach = ACHIEVEMENTS.find(a => a.id === req.achievementId);
        return ach ? isAchievementUnlocked(ach) : false;
      default:
        return false;
    }
  };

  const handleAvatarSelect = async (avatarId: string) => {
    const avatar = AVATARS.find(a => a.id === avatarId);
    if (avatar && isAvatarUnlocked(avatar)) {
      setSelectedAvatar(avatarId);
      
      // Save to localStorage as backup
      localStorage.setItem(`avatar-${userEmail}`, avatarId);
      
      // Save to server if API is available
      try {
        await apiService.createOrUpdateUser({
          email: userEmail,
          avatar: avatarId
        });
      } catch (error) {
        console.warn('Failed to save avatar to server:', error);
      }
      
      onAvatarChange?.(avatarId);
    }
  };

  const unlockedAchievements = ACHIEVEMENTS.filter(a => isAchievementUnlocked(a));
  const lockedAchievements = ACHIEVEMENTS.filter(a => !isAchievementUnlocked(a));
  const unlockedAvatars = AVATARS.filter(a => isAvatarUnlocked(a));
  
  const currentAvatar = AVATARS.find(a => a.id === selectedAvatar) || AVATARS[0];

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center animated-bg p-4">
        <Card className="glass-card p-8">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground mt-4">Loading profile...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen animated-bg p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gradient">Profile</h1>
        </div>

        {/* Profile Card */}
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="text-6xl p-4 rounded-2xl bg-primary/10 border-2 border-primary/30">
                  {currentAvatar.emoji}
                </div>
                {stats.guruCompleted > 0 && (
                  <div className="absolute -top-2 -right-2 p-1 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500">
                    <Crown className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              
              {/* User Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{displayName}</h2>
                <p className="text-muted-foreground">{userEmail}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-muted-foreground">
                    {unlockedAchievements.length}/{ACHIEVEMENTS.length} achievements
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">
                    {unlockedAvatars.length}/{AVATARS.length} avatars
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="stat-card text-center p-4">
                <Gamepad2 className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{stats.gamesPlayed}</div>
                <div className="text-xs text-muted-foreground">Games Played</div>
              </div>
              <div className="stat-card text-center p-4">
                <Trophy className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
                <div className="text-2xl font-bold">{stats.totalScore.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Score</div>
              </div>
              <div className="stat-card text-center p-4">
                <Target className="h-6 w-6 mx-auto mb-2 text-emerald-500" />
                <div className="text-2xl font-bold">{stats.avgAccuracy}%</div>
                <div className="text-xs text-muted-foreground">Avg Accuracy</div>
              </div>
              <div className="stat-card text-center p-4">
                <Flame className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                <div className="text-2xl font-bold">{stats.bestStreak}</div>
                <div className="text-xs text-muted-foreground">Best Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="achievements" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="avatars" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Avatars
            </TabsTrigger>
          </TabsList>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-4 mt-4">
            {/* Unlocked */}
            {unlockedAchievements.length > 0 && (
              <Card className="glass-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    Unlocked ({unlockedAchievements.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {unlockedAchievements.map(achievement => (
                      <AchievementBadge
                        key={achievement.id}
                        achievement={achievement}
                        unlocked={true}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Locked */}
            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2 text-muted-foreground">
                  <Award className="h-5 w-5" />
                  Locked ({lockedAchievements.length})
                </CardTitle>
                <CardDescription>Keep playing to unlock more achievements!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {lockedAchievements.map(achievement => (
                    <AchievementBadge
                      key={achievement.id}
                      achievement={achievement}
                      unlocked={false}
                      progress={getAchievementProgress(achievement)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Avatars Tab */}
          <TabsContent value="avatars" className="mt-4">
            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Select Your Avatar</CardTitle>
                <CardDescription>Unlock new avatars by completing achievements and challenges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                  {AVATARS.map(avatar => {
                    const unlocked = isAvatarUnlocked(avatar);
                    const isSelected = selectedAvatar === avatar.id;
                    const rarityStyle = RARITY_COLORS[avatar.rarity];
                    
                    return (
                      <button
                        key={avatar.id}
                        onClick={() => handleAvatarSelect(avatar.id)}
                        disabled={!unlocked}
                        className={cn(
                          'relative p-3 rounded-xl text-3xl transition-all',
                          unlocked 
                            ? `${rarityStyle.bg} ${rarityStyle.border} border-2 hover:scale-110 cursor-pointer` 
                            : 'bg-muted/30 border border-muted/50 opacity-40 cursor-not-allowed',
                          isSelected && 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-110'
                        )}
                        title={unlocked ? avatar.name : `Locked: ${getAvatarRequirementText(avatar)}`}
                      >
                        {unlocked ? avatar.emoji : '🔒'}
                        
                        {/* Selected indicator */}
                        {isSelected && (
                          <div className="absolute -top-1 -right-1 p-0.5 rounded-full bg-primary">
                            <Check className="h-3 w-3 text-primary-foreground" />
                          </div>
                        )}
                        
                        {/* Rarity glow for legendary */}
                        {unlocked && avatar.rarity === 'legendary' && (
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/30 via-orange-500/30 to-red-500/30 animate-pulse pointer-events-none" />
                        )}
                      </button>
                    );
                  })}
                </div>
                
                {/* Selected Avatar Info */}
                <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{currentAvatar.emoji}</span>
                    <div>
                      <div className="font-semibold">{currentAvatar.name}</div>
                      <div className={cn('text-sm', RARITY_COLORS[currentAvatar.rarity].text)}>
                        {currentAvatar.rarity.charAt(0).toUpperCase() + currentAvatar.rarity.slice(1)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

function getAvatarRequirementText(avatar: Avatar): string {
  const req = avatar.requirement;
  switch (req.type) {
    case 'games_played':
      return `Play ${req.value} games`;
    case 'guru_completed':
      return `Complete Guru level ${req.value} times`;
    case 'daily_streak':
      return `${req.value} day daily streak`;
    case 'perfect_games':
      return `${req.value} perfect games`;
    case 'achievement':
      const ach = ACHIEVEMENTS.find(a => a.id === req.achievementId);
      return ach ? `Unlock "${ach.name}" achievement` : 'Unlock achievement';
    default:
      return '';
  }
}
