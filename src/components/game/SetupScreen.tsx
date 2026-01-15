import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShortcutCategory, Difficulty, DifficultyLevel, Category, LEVEL_CONFIG, CATEGORY_CONFIG } from '@/types/game';
import { Monitor, Table, Presentation, Keyboard, Zap, Target, Flame, Crown, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SetupScreenProps {
  onStart: (category: ShortcutCategory | Category, difficulty: Difficulty, level?: DifficultyLevel) => void;
  onBack: () => void;
}

const categoryIcons = {
  windows: Monitor,
  excel: Table,
  powerpoint: Presentation,
  general: Keyboard,
};

const levelIcons = {
  essentials: Zap,
  implementation: Target,
  architect: Flame,
  guru: Crown,
};

export const SetupScreen = ({ onStart, onBack }: SetupScreenProps) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [level, setLevel] = useState<DifficultyLevel | null>(null);

  const categories: { value: Category; config: (typeof CATEGORY_CONFIG)[Category] }[] = [
    { value: 'windows', config: CATEGORY_CONFIG.windows },
    { value: 'excel', config: CATEGORY_CONFIG.excel },
    { value: 'powerpoint', config: CATEGORY_CONFIG.powerpoint },
    { value: 'general', config: CATEGORY_CONFIG.general },
  ];

  const levels: { value: DifficultyLevel; config: (typeof LEVEL_CONFIG)[DifficultyLevel] }[] = [
    { value: 'essentials', config: LEVEL_CONFIG.essentials },
    { value: 'implementation', config: LEVEL_CONFIG.implementation },
    { value: 'architect', config: LEVEL_CONFIG.architect },
    { value: 'guru', config: LEVEL_CONFIG.guru },
  ];

  const handleStart = () => {
    if (category && level) {
      const difficultyMap: Record<DifficultyLevel, Difficulty> = {
        essentials: 'easy',
        implementation: 'medium',
        architect: 'hard',
        guru: 'hard',
      };
      onStart(category, difficultyMap[level], level);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center animated-bg p-4">
      <Card className="w-full max-w-2xl glass-card animate-fade-in">
        <CardHeader>
          <Button variant="ghost" size="sm" onClick={onBack} className="w-fit -ml-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <CardTitle className="text-2xl font-display">Game Setup</CardTitle>
          <CardDescription>Choose your category and difficulty level</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Category Selection */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
              Category
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categories.map(({ value, config }) => {
                const Icon = categoryIcons[value];
                return (
                  <button
                    key={value}
                    onClick={() => setCategory(value)}
                    className={cn(
                      'flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all hover:border-primary/50',
                      category === value ? 'border-primary bg-primary/5 glow-primary' : 'border-border'
                    )}
                  >
                    <div className={cn('category-icon', category === value && 'bg-primary/20')}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-medium text-sm">{config.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Level Selection */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
              Difficulty Level
            </h3>
            <div className="grid gap-2">
              {levels.map(({ value, config }) => {
                const Icon = levelIcons[value];
                return (
                  <button
                    key={value}
                    onClick={() => setLevel(value)}
                    className={cn(
                      'flex items-center gap-4 rounded-xl border-2 p-4 transition-all hover:border-primary/50 text-left',
                      level === value ? 'border-primary bg-primary/5' : 'border-border'
                    )}
                  >
                    <Icon className={cn('h-6 w-6', config.color)} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{config.label}</span>
                        <span className={cn('level-badge', `level-${value}`)}>
                          {config.questionsCount} questions
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {config.description} • {config.timePerQuestion}s per question
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <Button
            onClick={handleStart}
            size="lg"
            className="btn-elufa w-full text-lg"
            disabled={!category || !level}
          >
            Start Challenge
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
