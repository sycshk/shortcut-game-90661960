import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Difficulty, DifficultyLevel, LEVEL_CONFIG } from '@/types/game';
import { Zap, Target, Flame, Crown, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SetupScreenProps {
  onStart: (difficulty: Difficulty, level: DifficultyLevel) => void;
  onBack: () => void;
}

const levelIcons = {
  essentials: Zap,
  implementation: Target,
  architect: Flame,
  guru: Crown,
};

export const SetupScreen = ({ onStart, onBack }: SetupScreenProps) => {
  const [level, setLevel] = useState<DifficultyLevel | null>(null);

  const levels: { value: DifficultyLevel; config: (typeof LEVEL_CONFIG)[DifficultyLevel] }[] = [
    { value: 'essentials', config: LEVEL_CONFIG.essentials },
    { value: 'implementation', config: LEVEL_CONFIG.implementation },
    { value: 'architect', config: LEVEL_CONFIG.architect },
    { value: 'guru', config: LEVEL_CONFIG.guru },
  ];

  const handleStart = () => {
    if (level) {
      const difficultyMap: Record<DifficultyLevel, Difficulty> = {
        essentials: 'easy',
        implementation: 'medium',
        architect: 'hard',
        guru: 'hard',
      };
      onStart(difficultyMap[level], level);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center animated-bg p-4">
      <Card className="w-full max-w-xl glass-card animate-fade-in">
        <CardHeader>
          <Button variant="ghost" size="sm" onClick={onBack} className="w-fit -ml-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <CardTitle className="text-2xl font-display">Select Difficulty</CardTitle>
          <CardDescription>
            Questions will include shortcuts from Windows, Excel, PowerPoint, and general applications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Level Selection */}
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

          <Button
            onClick={handleStart}
            size="lg"
            className="btn-elufa w-full text-lg"
            disabled={!level}
          >
            Start Challenge
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
