import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShortcutCategory, Difficulty } from '@/types/game';
import { Monitor, FileText, Zap, Target, Flame, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SetupScreenProps {
  onStart: (category: ShortcutCategory, difficulty: Difficulty) => void;
  onBack: () => void;
}

export const SetupScreen = ({ onStart, onBack }: SetupScreenProps) => {
  const [category, setCategory] = useState<ShortcutCategory | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);

  const categories: { value: ShortcutCategory; label: string; icon: typeof Monitor; description: string }[] = [
    { value: 'os', label: 'General OS', icon: Monitor, description: 'Windows & system shortcuts' },
    { value: 'office', label: 'Office Apps', icon: FileText, description: 'Word, Excel & productivity' },
  ];

  const difficulties: { value: Difficulty; label: string; icon: typeof Zap; description: string; color: string }[] = [
    { value: 'easy', label: 'Easy', icon: Zap, description: '15 seconds, basic shortcuts', color: 'text-green-500' },
    { value: 'medium', label: 'Medium', icon: Target, description: '10 seconds, mixed shortcuts', color: 'text-yellow-500' },
    { value: 'hard', label: 'Hard', icon: Flame, description: '6 seconds, all shortcuts', color: 'text-red-500' },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <Button variant="ghost" size="sm" onClick={onBack} className="w-fit -ml-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <CardTitle className="text-2xl">Game Setup</CardTitle>
          <CardDescription>Choose your challenge preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Category Selection */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
              Shortcut Category
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {categories.map(({ value, label, icon: Icon, description }) => (
                <button
                  key={value}
                  onClick={() => setCategory(value)}
                  className={cn(
                    'flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all hover:border-primary/50',
                    category === value ? 'border-primary bg-primary/5' : 'border-border'
                  )}
                >
                  <Icon className={cn('h-8 w-8', category === value ? 'text-primary' : 'text-muted-foreground')} />
                  <span className="font-medium">{label}</span>
                  <span className="text-xs text-muted-foreground text-center">{description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Selection */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
              Difficulty Level
            </h3>
            <div className="space-y-2">
              {difficulties.map(({ value, label, icon: Icon, description, color }) => (
                <button
                  key={value}
                  onClick={() => setDifficulty(value)}
                  className={cn(
                    'flex w-full items-center gap-4 rounded-lg border-2 p-4 transition-all hover:border-primary/50 text-left',
                    difficulty === value ? 'border-primary bg-primary/5' : 'border-border'
                  )}
                >
                  <Icon className={cn('h-6 w-6', color)} />
                  <div className="flex-1">
                    <span className="font-medium">{label}</span>
                    <p className="text-xs text-muted-foreground">{description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={() => category && difficulty && onStart(category, difficulty)}
            size="lg"
            className="w-full text-lg"
            disabled={!category || !difficulty}
          >
            Start Challenge
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
