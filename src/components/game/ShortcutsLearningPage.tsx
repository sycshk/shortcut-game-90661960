import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ArrowLeft, 
  Search, 
  Keyboard, 
  Monitor, 
  Table, 
  Presentation, 
  FileText,
  Table2,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { shortcutChallenges } from '@/data/shortcuts';
import { Category, DifficultyLevel, CATEGORY_CONFIG, LEVEL_CONFIG } from '@/types/game';

interface ShortcutsLearningPageProps {
  onBack: () => void;
}

const CATEGORY_ICONS: Record<Category, React.ReactNode> = {
  windows: <Monitor className="h-4 w-4" />,
  excel: <Table className="h-4 w-4" />,
  powerpoint: <Presentation className="h-4 w-4" />,
  general: <Keyboard className="h-4 w-4" />,
  'google-sheets': <Table2 className="h-4 w-4" />,
  'google-docs': <FileText className="h-4 w-4" />,
  'google-slides': <Presentation className="h-4 w-4" />,
};

const LEVEL_COLORS: Record<DifficultyLevel, string> = {
  essentials: 'bg-green-500/10 text-green-600 border-green-500/30',
  implementation: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
  architect: 'bg-purple-500/10 text-purple-600 border-purple-500/30',
  guru: 'bg-orange-500/10 text-orange-600 border-orange-500/30',
};

export const ShortcutsLearningPage = ({ onBack }: ShortcutsLearningPageProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel | 'all'>('all');

  // Get all unique categories from shortcuts
  const categories = useMemo(() => {
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

  return (
    <div className="min-h-screen animated-bg p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gradient">Shortcuts Library</h1>
            <p className="text-muted-foreground">
              Learn all {totalShortcuts} keyboard shortcuts
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="glass-card">
          <CardContent className="pt-6 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search shortcuts by description or keys..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Category:</span>
                <div className="flex flex-wrap gap-1">
                  <Button
                    variant={selectedCategory === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('all')}
                    className="h-7 text-xs"
                  >
                    All
                  </Button>
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="h-7 text-xs gap-1"
                    >
                      {CATEGORY_ICONS[category]}
                      {CATEGORY_CONFIG[category]?.label || category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Level Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Level:</span>
              <div className="flex gap-1">
                <Button
                  variant={selectedLevel === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedLevel('all')}
                  className="h-7 text-xs"
                >
                  All Levels
                </Button>
                {(['essentials', 'implementation', 'architect', 'guru'] as DifficultyLevel[]).map(level => (
                  <Button
                    key={level}
                    variant={selectedLevel === level ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedLevel(level)}
                    className="h-7 text-xs"
                  >
                    {LEVEL_CONFIG[level].label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Results count */}
            <div className="text-sm text-muted-foreground">
              Showing {filteredShortcuts.length} of {totalShortcuts} shortcuts
            </div>
          </CardContent>
        </Card>

        {/* Shortcuts List */}
        <div className="space-y-6">
          {Object.entries(groupedShortcuts).map(([category, shortcuts]) => (
            <Card key={category} className="glass-card">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  {CATEGORY_ICONS[category as Category]}
                  <CardTitle className="text-lg">
                    {CATEGORY_CONFIG[category as Category]?.label || category}
                  </CardTitle>
                  <Badge variant="secondary" className="ml-auto">
                    {shortcuts.length} shortcuts
                  </Badge>
                </div>
                <CardDescription>
                  {CATEGORY_CONFIG[category as Category]?.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {shortcuts.map(shortcut => (
                    <div
                      key={shortcut.id}
                      className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{shortcut.description}</span>
                          <Badge 
                            variant="outline" 
                            className={cn('text-xs', LEVEL_COLORS[shortcut.level])}
                          >
                            {LEVEL_CONFIG[shortcut.level].label}
                          </Badge>
                        </div>
                        {shortcut.hint && (
                          <p className="text-xs text-muted-foreground mt-1">
                            💡 {shortcut.hint}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-1 ml-4">
                        {shortcut.keys.map((key, index) => (
                          <span key={index}>
                            <kbd className="px-2 py-1 text-sm font-mono bg-muted rounded border shadow-sm">
                              {key}
                            </kbd>
                            {index < shortcut.keys.length - 1 && (
                              <span className="mx-1 text-muted-foreground">+</span>
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
              <CardContent className="py-12 text-center">
                <Keyboard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg">No shortcuts found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
