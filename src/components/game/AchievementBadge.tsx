import { Achievement, RARITY_COLORS, getRarityLabel } from '@/data/achievements';
import { cn } from '@/lib/utils';
import { Lock } from 'lucide-react';

interface AchievementBadgeProps {
  achievement: Achievement;
  unlocked: boolean;
  progress?: number;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const AchievementBadge = ({ 
  achievement, 
  unlocked, 
  progress = 0,
  showDetails = true,
  size = 'md'
}: AchievementBadgeProps) => {
  const Icon = achievement.icon;
  const rarityStyle = RARITY_COLORS[achievement.rarity];
  
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };
  
  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <div className={cn(
      'relative group rounded-xl p-3 transition-all',
      unlocked 
        ? `${rarityStyle.bg} ${rarityStyle.border} border-2` 
        : 'bg-muted/30 border border-muted/50 opacity-60'
    )}>
      {/* Animated glow for legendary */}
      {unlocked && achievement.rarity === 'legendary' && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 animate-pulse" />
      )}
      
      <div className="relative flex items-center gap-3">
        {/* Icon */}
        <div className={cn(
          'flex items-center justify-center rounded-xl',
          sizeClasses[size],
          unlocked ? achievement.bgColor : 'bg-muted/50'
        )}>
          {unlocked ? (
            <Icon className={cn(iconSizes[size], achievement.color)} />
          ) : (
            <Lock className={cn(iconSizes[size], 'text-muted-foreground')} />
          )}
        </div>
        
        {showDetails && (
          <div className="flex-1 min-w-0">
            <div className={cn(
              'font-semibold text-sm truncate',
              unlocked ? '' : 'text-muted-foreground'
            )}>
              {achievement.name}
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {achievement.description}
            </div>
            
            {/* Progress bar for locked achievements */}
            {!unlocked && progress > 0 && (
              <div className="mt-1.5 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary/60 rounded-full transition-all"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            )}
            
            {/* Rarity tag */}
            <span className={cn(
              'inline-block mt-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full',
              rarityStyle.bg,
              rarityStyle.text
            )}>
              {getRarityLabel(achievement.rarity)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
