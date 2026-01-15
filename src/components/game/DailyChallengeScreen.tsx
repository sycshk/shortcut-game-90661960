import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  getDailyShortcuts, 
  isDailyChallengeCompleted, 
  getDailyChallengeData,
  getDailyStreakData,
  getTimeUntilNextChallenge,
  DAILY_BADGES,
  saveDailyChallengeCompletion
} from '@/services/dailyChallengeService';
import { ArrowLeft, Calendar, Trophy, Flame, Clock, Star, CheckCircle2, Lock, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DailyChallengeScreenProps {
  onBack: () => void;
  onStartChallenge: () => void;
  userEmail?: string;
}

export const DailyChallengeScreen = ({ onBack, onStartChallenge, userEmail }: DailyChallengeScreenProps) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [challengeData, setChallengeData] = useState<ReturnType<typeof getDailyChallengeData>>(null);
  const [streakData, setStreakData] = useState(getDailyStreakData());
  const [countdown, setCountdown] = useState(getTimeUntilNextChallenge());
  
  const shortcuts = getDailyShortcuts();
  
  useEffect(() => {
    setIsCompleted(isDailyChallengeCompleted());
    setChallengeData(getDailyChallengeData());
    setStreakData(getDailyStreakData());
  }, []);
  
  // Countdown timer
  useEffect(() => {
    if (!isCompleted) return;
    
    const interval = setInterval(() => {
      setCountdown(getTimeUntilNextChallenge());
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isCompleted]);
  
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const earnedBadges = streakData.badges.map(id => ({
    id,
    ...DAILY_BADGES[id as keyof typeof DAILY_BADGES]
  }));

  return (
    <div className="min-h-screen animated-bg p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        
        {/* Daily Challenge Header */}
        <Card className="glass-card overflow-hidden">
          <div className="bg-gradient-to-r from-primary via-secondary to-primary p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-6 w-6" />
                  <span className="text-sm opacity-90">Daily Challenge</span>
                </div>
                <h1 className="text-2xl font-bold">{today}</h1>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-1">
                  <Flame className="h-5 w-5 text-yellow-300" />
                  <span className="text-2xl font-bold">{streakData.currentStreak}</span>
                </div>
                <span className="text-sm opacity-90">Day Streak</span>
              </div>
            </div>
          </div>
          
          <CardContent className="p-6">
            {isCompleted ? (
              // Completed state
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-success/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-10 w-10 text-success" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-success">Challenge Complete!</h2>
                  <p className="text-muted-foreground">You've completed today's challenge</p>
                </div>
                
                {challengeData && (
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="stat-card">
                      <div className="text-2xl font-bold text-primary">{challengeData.score}</div>
                      <div className="text-sm text-muted-foreground">Score</div>
                    </div>
                    <div className="stat-card">
                      <div className="text-2xl font-bold text-success">{challengeData.accuracy}%</div>
                      <div className="text-sm text-muted-foreground">Accuracy</div>
                    </div>
                  </div>
                )}
                
                {/* Countdown to next challenge */}
                <div className="bg-muted/30 rounded-lg p-4 mt-4">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground mb-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">Next challenge in</span>
                  </div>
                  <div className="flex justify-center gap-4 font-mono text-2xl font-bold">
                    <div className="text-center">
                      <div>{String(countdown.hours).padStart(2, '0')}</div>
                      <div className="text-xs text-muted-foreground">hrs</div>
                    </div>
                    <span>:</span>
                    <div className="text-center">
                      <div>{String(countdown.minutes).padStart(2, '0')}</div>
                      <div className="text-xs text-muted-foreground">min</div>
                    </div>
                    <span>:</span>
                    <div className="text-center">
                      <div>{String(countdown.seconds).padStart(2, '0')}</div>
                      <div className="text-xs text-muted-foreground">sec</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Not completed state
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-bold mb-2">Today's Challenge Awaits!</h2>
                  <p className="text-muted-foreground">
                    Complete 10 unique shortcuts selected just for today
                  </p>
                </div>
                
                {/* Challenge Preview */}
                <div className="bg-muted/30 rounded-lg p-4">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Gift className="h-4 w-4 text-secondary" />
                    Today's Shortcuts Preview
                  </h3>
                  <div className="space-y-2">
                    {shortcuts.slice(0, 3).map((shortcut, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">{index + 1}.</span>
                        <span>{shortcut.description}</span>
                      </div>
                    ))}
                    <div className="text-sm text-muted-foreground italic">
                      + {shortcuts.length - 3} more shortcuts...
                    </div>
                  </div>
                </div>
                
                {/* Rewards info */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 p-3 rounded-lg border bg-card">
                    <Flame className="h-5 w-5 text-warning" />
                    <div>
                      <div className="font-medium">Build Streak</div>
                      <div className="text-xs text-muted-foreground">80%+ accuracy counts</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg border bg-card">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <div>
                      <div className="font-medium">Earn Badges</div>
                      <div className="text-xs text-muted-foreground">Unlock rewards</div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={onStartChallenge} 
                  size="lg" 
                  className="w-full btn-elufa"
                >
                  <Star className="h-5 w-5 mr-2" />
                  Start Today's Challenge
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Stats Card */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Daily Challenge Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{streakData.currentStreak}</div>
                <div className="text-xs text-muted-foreground">Current Streak</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">{streakData.longestStreak}</div>
                <div className="text-xs text-muted-foreground">Best Streak</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{streakData.totalDaysCompleted}</div>
                <div className="text-xs text-muted-foreground">Days Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Badges */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="h-5 w-5 text-warning" />
              Badges
            </CardTitle>
            <CardDescription>
              Earn badges by completing daily challenges consistently
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(DAILY_BADGES).map(([id, badge]) => {
                const isEarned = streakData.badges.includes(id);
                return (
                  <div 
                    key={id}
                    className={cn(
                      'p-3 rounded-lg border text-center transition-all',
                      isEarned 
                        ? 'bg-primary/10 border-primary/30' 
                        : 'bg-muted/30 border-muted opacity-50'
                    )}
                  >
                    <div className="text-2xl mb-1">
                      {isEarned ? badge.icon : <Lock className="h-6 w-6 mx-auto text-muted-foreground" />}
                    </div>
                    <div className="font-medium text-sm">{badge.name}</div>
                    <div className="text-xs text-muted-foreground">{badge.description}</div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
