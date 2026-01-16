import { useEffect, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { leaderboardService, AnswerRecord } from '@/services/leaderboardService';
import { Category, CATEGORY_CONFIG, DifficultyLevel, LEVEL_CONFIG } from '@/types/game';
import { shortcutChallenges } from '@/data/shortcuts';
import { ArrowLeft, BarChart3, Target, TrendingUp, AlertTriangle, Trophy, Monitor, Table, Presentation, Keyboard, History, CheckCircle2, XCircle, Clock, Filter, Search, FileText, Table2, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnalyticsScreenProps {
  onBack: () => void;
  userEmail?: string;
}

const CategoryIcon = ({ category, className = "h-5 w-5" }: { category: Category; className?: string }) => {
  const icons: Record<Category, any> = {
    windows: Monitor,
    excel: Table,
    powerpoint: Presentation,
    general: Keyboard,
    'google-sheets': Table2,
    'google-docs': FileText,
    'google-slides': Presentation,
  };
  const Icon = icons[category] || Keyboard;
  return <Icon className={className} />;
};

const LEVEL_COLORS: Record<DifficultyLevel, string> = {
  essentials: 'bg-green-500/10 text-green-600 border-green-500/30',
  implementation: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
  architect: 'bg-purple-500/10 text-purple-600 border-purple-500/30',
  guru: 'bg-orange-500/10 text-orange-600 border-orange-500/30',
};

export const AnalyticsScreen = ({ onBack, userEmail }: AnalyticsScreenProps) => {
  const [categoryAnalysis, setCategoryAnalysis] = useState<Record<Category, { correct: number; total: number; accuracy: number; weakShortcuts: string[] }> | null>(null);
  const [overallStats, setOverallStats] = useState<any>(null);
  const [weakShortcuts, setWeakShortcuts] = useState<{ description: string; category: Category; accuracy: number }[]>([]);
  const [recentSessions, setRecentSessions] = useState<any[]>([]);
  const [answerHistory, setAnswerHistory] = useState<AnswerRecord[]>([]);
  const [historyFilter, setHistoryFilter] = useState<'all' | 'wrong' | 'correct'>('all');
  const [isLoading, setIsLoading] = useState(true);
  
  // Shortcuts Library state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel | 'all'>('all');

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [catAnalysis, stats, weak, sessions, history] = await Promise.all([
          leaderboardService.getCategoryAnalysis(userEmail),
          leaderboardService.getOverallStats(userEmail),
          leaderboardService.getWeakShortcuts(userEmail),
          leaderboardService.getRecentSessions(5, userEmail),
          leaderboardService.getAnswerHistory(userEmail)
        ]);
        setCategoryAnalysis(catAnalysis);
        setOverallStats(stats);
        setWeakShortcuts(weak);
        setRecentSessions(sessions);
        setAnswerHistory(history);
      } catch (error) {
        console.error('Failed to load analytics:', error);
      }
      setIsLoading(false);
    };
    loadData();
  }, [userEmail]);

  const categories: Category[] = ['windows', 'excel', 'powerpoint', 'general', 'google-sheets', 'google-docs', 'google-slides'];
  
  // Get all unique categories from shortcuts for library
  const shortcutCategories = useMemo(() => {
    const cats = new Set(shortcutChallenges.map(s => s.category));
    return Array.from(cats) as Category[];
  }, []);

  // Filter shortcuts based on search, category, and level
  const filteredShortcuts = useMemo(() => {
    return shortcutChallenges.filter(shortcut => {
      const matchesSearch = searchQuery === '' || 
        shortcut.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shortcut.keys.join(' ').toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || shortcut.category === selectedCategory;
      const matchesLevel = selectedLevel === 'all' || shortcut.level === selectedLevel;
      
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchQuery, selectedCategory, selectedLevel]);

  // Group shortcuts by category
  const groupedShortcuts = useMemo(() => {
    const groups: Record<string, typeof shortcutChallenges> = {};
    filteredShortcuts.forEach(shortcut => {
      if (!groups[shortcut.category]) {
        groups[shortcut.category] = [];
      }
      groups[shortcut.category].push(shortcut);
    });
    return groups;
  }, [filteredShortcuts]);

  const totalShortcuts = shortcutChallenges.length;

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

  // Filter answer history
  const filteredHistory = answerHistory.filter(record => {
    if (historyFilter === 'wrong') return !record.isCorrect;
    if (historyFilter === 'correct') return record.isCorrect;
    return true;
  });

  // Get wrong answers for practice reference
  const wrongAnswers = answerHistory.filter(r => !r.isCorrect);
  const uniqueWrongShortcuts = new Map<string, AnswerRecord>();
  wrongAnswers.forEach(record => {
    if (!uniqueWrongShortcuts.has(record.shortcutId)) {
      uniqueWrongShortcuts.set(record.shortcutId, record);
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen animated-bg p-4 flex items-center justify-center">
        <div className="glass-card p-8 text-center">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

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

        {/* Tabs for different views */}
        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="library" className="gap-1">
              <BookOpen className="h-3 w-3" />
              Library
            </TabsTrigger>
          </TabsList>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-4">
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
                            {new Date(session.date).toLocaleDateString()} at {new Date(session.date).toLocaleTimeString()}
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
          </TabsContent>

          {/* Answer History Tab */}
          <TabsContent value="history" className="space-y-4">
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <History className="h-5 w-5 text-primary" />
                    Answer History
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <select
                      value={historyFilter}
                      onChange={(e) => setHistoryFilter(e.target.value as 'all' | 'wrong' | 'correct')}
                      className="text-sm bg-transparent border rounded px-2 py-1"
                    >
                      <option value="all">All Answers</option>
                      <option value="wrong">Wrong Only</option>
                      <option value="correct">Correct Only</option>
                    </select>
                  </div>
                </div>
                <CardDescription>
                  {filteredHistory.length} answers ({wrongAnswers.length} incorrect)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredHistory.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No answer history yet. Play some games to see your history!
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {filteredHistory.slice(0, 50).map((record, index) => (
                      <div 
                        key={index} 
                        className={cn(
                          'p-3 rounded-lg border',
                          record.isCorrect ? 'bg-success/5 border-success/20' : 'bg-destructive/5 border-destructive/20'
                        )}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              {record.isCorrect ? (
                                <CheckCircle2 className="h-4 w-4 text-success" />
                              ) : (
                                <XCircle className="h-4 w-4 text-destructive" />
                              )}
                              <span className="font-medium text-sm">{record.shortcutDescription}</span>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <CategoryIcon category={record.category} />
                                {CATEGORY_CONFIG[record.category].label}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {record.timeSpent}s
                              </span>
                            </div>
                          </div>
                          <div className="text-right text-sm">
                            <div className="font-mono">
                              {record.isCorrect ? (
                                <span className="text-success">{record.correctAnswer.join(' + ')}</span>
                              ) : (
                                <div className="space-y-1">
                                  <div className="text-destructive line-through">
                                    {record.userAnswer.length > 0 ? record.userAnswer.join(' + ') : 'No answer'}
                                  </div>
                                  <div className="text-success">
                                    ✓ {record.correctAnswer.join(' + ')}
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {new Date(record.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Practice Guide Tab */}
          <TabsContent value="practice" className="space-y-4">
            {/* Shortcuts to Practice */}
            <Card className="glass-card border-secondary/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-secondary" />
                  Shortcuts to Practice
                </CardTitle>
                <CardDescription>Based on your accuracy, these shortcuts need more practice</CardDescription>
              </CardHeader>
              <CardContent>
                {weakShortcuts.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Great job! No weak shortcuts found. Keep playing to track more.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {weakShortcuts.map((shortcut, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded border bg-muted/30">
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
                )}
              </CardContent>
            </Card>

            {/* Wrong Answers Reference */}
            {uniqueWrongShortcuts.size > 0 && (
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-destructive" />
                    Learn From Mistakes
                  </CardTitle>
                  <CardDescription>Quick reference for shortcuts you've missed</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 md:grid-cols-2">
                    {Array.from(uniqueWrongShortcuts.values()).slice(0, 10).map((record, index) => (
                      <div key={index} className="p-3 rounded-lg border bg-card">
                        <div className="flex items-center gap-2 mb-2">
                          <CategoryIcon category={record.category} />
                          <span className="font-medium text-sm">{record.shortcutDescription}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">Correct:</span>
                          <div className="flex gap-1">
                            {record.correctAnswer.map((key, i) => (
                              <kbd key={i} className="kbd-key text-xs px-2 py-1">
                                {key}
                              </kbd>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Shortcuts Library Tab */}
          <TabsContent value="library" className="space-y-4">
            {/* Search and Filters */}
            <Card className="glass-card">
              <CardContent className="pt-4 space-y-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search shortcuts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-9"
                  />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1 flex-wrap">
                    <Filter className="h-3 w-3 text-muted-foreground" />
                    <Button
                      variant={selectedCategory === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory('all')}
                      className="h-6 text-xs px-2"
                    >
                      All
                    </Button>
                    {shortcutCategories.map(category => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className="h-6 text-xs px-2 gap-1"
                      >
                        <CategoryIcon category={category} className="h-3 w-3" />
                        {CATEGORY_CONFIG[category]?.label || category}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Level Filter */}
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="text-xs text-muted-foreground">Level:</span>
                  <Button
                    variant={selectedLevel === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedLevel('all')}
                    className="h-6 text-xs px-2"
                  >
                    All
                  </Button>
                  {(['essentials', 'implementation', 'architect', 'guru'] as DifficultyLevel[]).map(level => (
                    <Button
                      key={level}
                      variant={selectedLevel === level ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedLevel(level)}
                      className="h-6 text-xs px-2"
                    >
                      {LEVEL_CONFIG[level].label}
                    </Button>
                  ))}
                </div>

                <div className="text-xs text-muted-foreground">
                  Showing {filteredShortcuts.length} of {totalShortcuts} shortcuts
                </div>
              </CardContent>
            </Card>

            {/* Shortcuts List */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {Object.entries(groupedShortcuts).map(([category, shortcuts]) => (
                <Card key={category} className="glass-card">
                  <CardHeader className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <CategoryIcon category={category as Category} className="h-4 w-4" />
                      <CardTitle className="text-sm">
                        {CATEGORY_CONFIG[category as Category]?.label || category}
                      </CardTitle>
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {shortcuts.length}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 px-4 pb-3">
                    <div className="grid gap-1.5">
                      {shortcuts.map(shortcut => (
                        <div
                          key={shortcut.id}
                          className="flex items-center justify-between p-2 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{shortcut.description}</span>
                              <Badge 
                                variant="outline" 
                                className={cn('text-[10px] h-4 px-1', LEVEL_COLORS[shortcut.level])}
                              >
                                {LEVEL_CONFIG[shortcut.level].label}
                              </Badge>
                            </div>
                            {shortcut.hint && (
                              <p className="text-[10px] text-muted-foreground mt-0.5">
                                💡 {shortcut.hint}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-0.5 ml-2">
                            {shortcut.keys.map((key, index) => (
                              <span key={index} className="flex items-center">
                                <kbd className="px-1.5 py-0.5 text-xs font-mono bg-muted rounded border shadow-sm">
                                  {key}
                                </kbd>
                                {index < shortcut.keys.length - 1 && (
                                  <span className="mx-0.5 text-muted-foreground text-xs">+</span>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredShortcuts.length === 0 && (
                <Card className="glass-card">
                  <CardContent className="py-8 text-center">
                    <Keyboard className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <h3 className="font-medium text-sm">No shortcuts found</h3>
                    <p className="text-xs text-muted-foreground">
                      Try adjusting your search or filters
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
