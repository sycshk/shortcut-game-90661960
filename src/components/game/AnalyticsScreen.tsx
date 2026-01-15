import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { leaderboardService } from '@/services/leaderboardService';
import { Category, CATEGORY_CONFIG } from '@/types/game';
import { ArrowLeft, BarChart3, Target, TrendingUp, AlertTriangle, Trophy, Monitor, Table, Presentation, Keyboard } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnalyticsScreenProps {
  onBack: () => void;
  userEmail?: string;
}

const CategoryIcon = ({ category }: { category: Category }) => {
  const icons = {
    windows: Monitor,
    excel: Table,
    powerpoint: Presentation,
    general: Keyboard,
  };
  const Icon = icons[category];
  return <Icon className="h-5 w-5" />;
};

export const AnalyticsScreen = ({ onBack, userEmail }: AnalyticsScreenProps) => {
  const [categoryAnalysis, setCategoryAnalysis] = useState<Record<Category, { correct: number; total: number; accuracy: number; weakShortcuts: string[] }> | null>(null);
  const [overallStats, setOverallStats] = useState<any>(null);
  const [weakShortcuts, setWeakShortcuts] = useState<{ description: string; category: Category; accuracy: number }[]>([]);
  const [recentSessions, setRecentSessions] = useState<any[]>([]);

  useEffect(() => {
    setCategoryAnalysis(leaderboardService.getCategoryAnalysis());
    setOverallStats(leaderboardService.getOverallStats());
    setWeakShortcuts(leaderboardService.getWeakShortcuts());
    setRecentSessions(leaderboardService.getRecentSessions(5));
  }, []);

  const categories: Category[] = ['windows', 'excel', 'powerpoint', 'general'];

  // Find weakest category
  const weakestCategory = categoryAnalysis 
    ? categories.reduce((worst, cat) => {
        const catData = categoryAnalysis[cat];
        const worstData = categoryAnalysis[worst];
        if (catData.total === 0) return worst;
        if (worstData.total === 0) return cat;
        return catData.accuracy < worstData.accuracy ? cat : worst;
      }, categories[0])
    : null;

  return (
    <div className="min-h-screen animated-bg p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Your Analytics</h1>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <Trophy className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold">{overallStats?.totalGames || 0}</div>
              <div className="text-xs text-muted-foreground">Games Played</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <Target className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{overallStats?.averageAccuracy || 0}%</div>
              <div className="text-xs text-muted-foreground">Avg Accuracy</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-success" />
              <div className="text-2xl font-bold">{overallStats?.bestStreak || 0}</div>
              <div className="text-xs text-muted-foreground">Best Streak</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <BarChart3 className="h-6 w-6 mx-auto mb-2 text-secondary" />
              <div className="text-2xl font-bold">{overallStats?.totalScore || 0}</div>
              <div className="text-xs text-muted-foreground">Total Score</div>
            </CardContent>
          </Card>
        </div>

        {/* Category Performance */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Category Performance
            </CardTitle>
            <CardDescription>
              {weakestCategory && categoryAnalysis && categoryAnalysis[weakestCategory].total > 0 && (
                <span className="text-secondary">
                  Focus on <strong>{CATEGORY_CONFIG[weakestCategory].label}</strong> - your weakest category at {categoryAnalysis[weakestCategory].accuracy}% accuracy
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {categoryAnalysis && categories.map(cat => {
              const data = categoryAnalysis[cat];
              const isWeakest = cat === weakestCategory && data.total > 0;
              
              return (
                <div key={cat} className={cn('p-3 rounded-lg border', isWeakest && 'border-secondary/50 bg-secondary/5')}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CategoryIcon category={cat} />
                      <span className="font-medium">{CATEGORY_CONFIG[cat].label}</span>
                      {isWeakest && <span className="text-xs bg-secondary/20 text-secondary px-2 py-0.5 rounded">Needs Practice</span>}
                    </div>
                    <div className="text-sm">
                      <span className={cn('font-bold', data.accuracy >= 70 ? 'text-success' : data.accuracy >= 50 ? 'text-warning' : 'text-destructive')}>
                        {data.accuracy}%
                      </span>
                      <span className="text-muted-foreground ml-2">({data.correct}/{data.total})</span>
                    </div>
                  </div>
                  <Progress value={data.accuracy} className="h-2" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Shortcuts to Practice */}
        {weakShortcuts.length > 0 && (
          <Card className="glass-card border-secondary/30">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-secondary" />
                Shortcuts to Practice
              </CardTitle>
              <CardDescription>These shortcuts need more practice based on your history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {weakShortcuts.map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded border bg-muted/30">
                    <div className="flex items-center gap-2">
                      <CategoryIcon category={shortcut.category} />
                      <span className="text-sm">{shortcut.description}</span>
                    </div>
                    <span className={cn(
                      'text-sm font-medium',
                      shortcut.accuracy < 30 ? 'text-destructive' : 'text-warning'
                    )}>
                      {shortcut.accuracy}% accuracy
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Sessions */}
        {recentSessions.length > 0 && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Recent Games</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentSessions.map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded border">
                    <div>
                      <div className="font-medium">{session.level} Level</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(session.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">{session.score} pts</div>
                      <div className="text-xs text-muted-foreground">{session.accuracy}% accuracy</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
