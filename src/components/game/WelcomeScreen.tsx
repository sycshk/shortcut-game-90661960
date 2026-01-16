import { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Trophy, Zap, Medal, LogOut, BarChart3, Edit2, Check, X, Gamepad2, Calendar, Flame, User } from 'lucide-react';
import { leaderboardService, UserProfileData } from '@/services/leaderboardService';
import { getDailyChallengeData, getDailyStreakData, getDailyStreakDataSync } from '@/services/dailyChallengeService';
import { apiService } from '@/services/apiService';
import { cn } from '@/lib/utils';
import { HallOfFame } from './HallOfFame';
import { PlayerAvatar } from './PlayerAvatar';
import elufaLogo from '@/assets/elufa-logo.png';

interface WelcomeScreenProps {
  onStart: () => void;
  onAnalytics: () => void;
  onDailyChallenge: () => void;
  onProfile: () => void;
  onMiniGames?: () => void;
  userEmail?: string;
  onLogout?: () => void;
}

// Custom Keyboard Shortcut Icon Component (matches login screen)
const ShortcutKeyIcon = () => (
  <div className="relative flex items-center gap-1">
    {/* Ctrl Key */}
    <div className="shortcut-icon-key w-10 h-8 rounded-lg text-xs text-primary" style={{ animationDelay: '0s' }}>
      Ctrl
    </div>
    {/* Plus symbol */}
    <span className="text-primary/60 text-sm font-light mx-0.5">+</span>
    {/* S Key */}
    <div className="shortcut-icon-key w-8 h-8 rounded-lg text-sm text-primary" style={{ animationDelay: '0.5s' }}>
      S
    </div>
  </div>
);

export const WelcomeScreen = ({ onStart, onAnalytics, onDailyChallenge, onProfile, onMiniGames, userEmail, onLogout }: WelcomeScreenProps) => {
  const [aggregatedLeaderboard, setAggregatedLeaderboard] = useState<{ name: string; totalScore: number; gamesPlayed: number; avgAccuracy: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayName, setDisplayName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState('');
  const [dailyCompleted, setDailyCompleted] = useState(false);
  const [dailyStreak, setDailyStreak] = useState(0);
  const [dataKey, setDataKey] = useState(0); // Key to force re-render of child components

  const loadData = useCallback(async () => {
    setIsLoading(true);
    await leaderboardService.init();
    
    // Get shortcut game leaderboard
    const shortcutLeaderboard = await leaderboardService.getAggregatedLeaderboard(50);
    
    // Get mini game leaderboard
    let miniGameData: Map<string, { snakeScore: number; epmScore: number; totalGames: number }> = new Map();
    try {
      const miniGameResult = await apiService.getUnifiedMiniGameLeaderboard();
      if (miniGameResult.data?.entries) {
        miniGameResult.data.entries.forEach((entry: any) => {
          const name = entry.name || entry.email?.split('@')[0] || '';
          if (name) {
            miniGameData.set(name, {
              snakeScore: entry.snakeScore || 0,
              epmScore: entry.epmScore || 0,
              totalGames: entry.totalGames || 0
            });
          }
        });
      }
    } catch (error) {
      console.warn('Failed to load mini game leaderboard:', error);
    }
    
    // Combine shortcut and mini game scores
    const combinedUsers = new Map<string, { totalScore: number; gamesPlayed: number; avgAccuracy: number }>();
    
    // Add shortcut scores
    shortcutLeaderboard.forEach(entry => {
      combinedUsers.set(entry.name, {
        totalScore: entry.totalScore,
        gamesPlayed: entry.gamesPlayed,
        avgAccuracy: entry.avgAccuracy
      });
    });
    
    // Add mini game scores
    miniGameData.forEach((scores, name) => {
      const existing = combinedUsers.get(name) || { totalScore: 0, gamesPlayed: 0, avgAccuracy: 0 };
      existing.totalScore += scores.snakeScore + scores.epmScore;
      existing.gamesPlayed += scores.totalGames;
      combinedUsers.set(name, existing);
    });
    
    // Convert to array and sort
    const combined: { name: string; totalScore: number; gamesPlayed: number; avgAccuracy: number }[] = [];
    combinedUsers.forEach((stats, name) => {
      combined.push({ name, ...stats });
    });
    combined.sort((a, b) => b.totalScore - a.totalScore);
    
    setAggregatedLeaderboard(combined.slice(0, 10));
    
    // Load or create profile
    if (userEmail) {
      let profile = await leaderboardService.getProfile(userEmail);
      if (!profile) {
        const newProfile: UserProfileData = {
          email: userEmail,
          displayName: userEmail.split('@')[0],
          createdAt: new Date().toISOString(),
          lastActive: new Date().toISOString(),
        };
        await leaderboardService.saveProfile(newProfile);
        profile = newProfile;
      }
      setDisplayName(profile.displayName);
    }
    
    // Load daily challenge status from API
    const [dailyData, streakData] = await Promise.all([
      getDailyChallengeData(userEmail),
      getDailyStreakData(userEmail)
    ]);
    setDailyCompleted(dailyData?.completed ?? false);
    setDailyStreak(streakData.currentStreak);
    
    setIsLoading(false);
    // Increment key to force HallOfFame to re-render with fresh data
    setDataKey(prev => prev + 1);
  }, [userEmail]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSaveName = async () => {
    if (tempName.trim() && userEmail && tempName.trim() !== displayName) {
      const oldName = displayName;
      await leaderboardService.updateDisplayName(userEmail, tempName.trim(), oldName);
      setDisplayName(tempName.trim());
      setIsEditingName(false);
      // Refresh leaderboard to show updated names
      const leaderboard = await leaderboardService.getAggregatedLeaderboard(10);
      setAggregatedLeaderboard(leaderboard);
    } else {
      setIsEditingName(false);
    }
  };

  const handleCancelEdit = () => {
    setTempName(displayName);
    setIsEditingName(false);
  };

  const startEditName = () => {
    setTempName(displayName);
    setIsEditingName(true);
  };

  const getMedalColor = (index: number) => {
    if (index === 0) return 'text-yellow-500';
    if (index === 1) return 'text-gray-400';
    if (index === 2) return 'text-amber-600';
    return 'text-muted-foreground';
  };

  return (
    <div className="flex min-h-screen items-center justify-center animated-bg p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-3 md:grid-cols-2 gap-6">
        {/* Welcome Card */}
        <Card className="text-center glass-card animate-fade-in">
          <CardHeader className="space-y-4">
            {/* User info and logout */}
            {userEmail && onLogout && (
              <div className="flex items-center justify-between text-sm text-muted-foreground -mt-2">
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <Input
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      className="h-8 w-32"
                      maxLength={20}
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveName();
                        if (e.key === 'Escape') handleCancelEdit();
                      }}
                    />
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleSaveName}>
                      <Check className="h-4 w-4 text-success" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCancelEdit}>
                      <X className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="truncate">Welcome, <span className="font-medium text-foreground">{displayName}</span></span>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={startEditName}>
                      <Edit2 className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                <Button variant="ghost" size="sm" onClick={onLogout} className="text-muted-foreground hover:text-destructive">
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </div>
            )}
            {/* Organization Logo */}
            <div className="mx-auto">
              <img 
                src={elufaLogo} 
                alt="Elufa" 
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="mx-auto flex h-20 w-auto items-center justify-center rounded-2xl bg-primary/5 p-4 glow-primary">
              <ShortcutKeyIcon />
            </div>
            <CardTitle className="text-3xl font-display font-bold text-gradient">
              Shortcut Master
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
                <Gamepad2 className="h-5 w-5 text-primary" />
                <span className="font-medium text-xs">70+ Shortcuts</span>
              </div>
              <div className="stat-card flex flex-col items-center gap-1 p-2">
                <Trophy className="h-5 w-5 text-secondary" />
                <span className="font-medium text-xs">Compete</span>
              </div>
            </div>
            
            <div className="space-y-3">
              {/* Daily Challenge Button */}
              <button 
                onClick={onDailyChallenge}
                className={cn(
                  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 rounded-md px-8 w-full text-lg shadow-md hover:shadow-lg",
                  dailyCompleted 
                    ? "bg-success/20 border border-success text-success hover:bg-success/30" 
                    : "bg-gradient-to-r from-primary to-secondary text-white hover:opacity-95 hover:scale-[1.01] transition-transform duration-200"
                )}
              >
                <Calendar className="mr-2 h-5 w-5" />
                {dailyCompleted ? 'Daily Complete ✓' : "Today's Challenge"}
                {dailyStreak > 0 && (
                  <span className="ml-2 flex items-center gap-1 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                    <Flame className="h-3 w-3" />
                    {dailyStreak}
                  </span>
                )}
              </button>

              <button 
                onClick={onStart}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 btn-elufa w-full text-lg"
              >
                <Gamepad2 className="mr-2 h-5 w-5" />
                Start Game
              </button>
              <Button onClick={onAnalytics} variant="outline" size="lg" className="w-full glass-button">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
              <Button onClick={onProfile} variant="ghost" size="lg" className="w-full">
                <User className="mr-2 h-4 w-4" />
                My Profile & Achievements
              </Button>
              {onMiniGames && (
                <Button onClick={onMiniGames} variant="outline" size="lg" className="w-full glass-button">
                  <Gamepad2 className="mr-2 h-4 w-4" />
                  Mini Games
                </Button>
              )}
            </div>
            
            <p className="text-xs text-muted-foreground">
              Windows • Excel • PowerPoint • Google Apps • General shortcuts
            </p>
          </CardContent>
        </Card>

        {/* Leaderboard Card */}
        <Card className="glass-card animate-fade-in">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <Trophy className="h-6 w-6 text-yellow-500" />
              <div>
                <CardTitle className="text-xl">All-Time Leaderboard</CardTitle>
                <CardDescription className="text-sm">Total points from all games</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">
                <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                <p className="text-sm">Loading...</p>
              </div>
            ) : aggregatedLeaderboard.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Trophy className="h-10 w-10 mx-auto mb-3 opacity-20" />
                <p className="text-sm">No scores yet!</p>
                <p className="text-xs">Be the first to complete a challenge.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {aggregatedLeaderboard.map((entry, index) => (
                  <div
                    key={entry.name}
                    className={cn(
                      'flex items-center gap-3 rounded-xl border p-3 transition-all glass-button',
                      index < 3 && 'bg-primary/5'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <PlayerAvatar email={undefined} size="sm" />
                      <div className={cn('flex h-6 w-6 items-center justify-center font-bold text-xs', getMedalColor(index))}>
                        {index < 3 ? (
                          <Medal className="h-4 w-4" />
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{entry.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {entry.gamesPlayed} games • {entry.avgAccuracy}% avg
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">{entry.totalScore.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">total pts</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Hall of Fame Card - use key to force refresh on data load */}
        <HallOfFame key={dataKey} />
      </div>
    </div>
  );
};
