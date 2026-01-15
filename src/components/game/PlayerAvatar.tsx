import { cn } from '@/lib/utils';
import { AVATARS, RARITY_COLORS } from '@/data/achievements';

interface PlayerAvatarProps {
  email?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showBorder?: boolean;
}

// Get avatar from localStorage for a user
const getSelectedAvatar = (email?: string): string => {
  if (!email) return '😊';
  try {
    const key = `avatar-${email}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      const avatar = AVATARS.find(a => a.id === saved);
      if (avatar) return avatar.emoji;
    }
  } catch (e) {
    console.error('Error getting avatar:', e);
  }
  return '😊';
};

// Get avatar rarity for styling
const getAvatarRarity = (email?: string): 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' => {
  if (!email) return 'common';
  try {
    const key = `avatar-${email}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      const avatar = AVATARS.find(a => a.id === saved);
      if (avatar) return avatar.rarity;
    }
  } catch (e) {
    console.error('Error getting avatar rarity:', e);
  }
  return 'common';
};

export const PlayerAvatar = ({ email, size = 'md', className, showBorder = true }: PlayerAvatarProps) => {
  const emoji = getSelectedAvatar(email);
  const rarity = getAvatarRarity(email);
  const rarityColors = RARITY_COLORS[rarity];
  
  const sizeClasses = {
    sm: 'h-6 w-6 text-sm',
    md: 'h-8 w-8 text-base',
    lg: 'h-10 w-10 text-lg',
  };

  return (
    <div 
      className={cn(
        'flex items-center justify-center rounded-full',
        sizeClasses[size],
        showBorder && `border-2 ${rarityColors.border}`,
        rarityColors.bg,
        className
      )}
    >
      <span className="select-none">{emoji}</span>
    </div>
  );
};

export { getSelectedAvatar, getAvatarRarity };
