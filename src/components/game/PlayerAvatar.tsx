import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { AVATARS, RARITY_COLORS } from '@/data/achievements';
import { apiService } from '@/services/apiService';
import { Skeleton } from '@/components/ui/skeleton';

interface PlayerAvatarProps {
  email?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showBorder?: boolean;
}

// Cache for avatars to avoid repeated API calls
const avatarCache = new Map<string, { avatarId: string; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Get avatar from cache or localStorage (sync fallback)
const getSelectedAvatarSync = (email?: string): string => {
  if (!email) return '😊';
  
  // Check cache first
  const cached = avatarCache.get(email);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    const avatar = AVATARS.find(a => a.id === cached.avatarId);
    if (avatar) return avatar.emoji;
  }
  
  // Fallback to localStorage
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
const getAvatarRaritySync = (email?: string): 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' => {
  if (!email) return 'common';
  
  // Check cache first
  const cached = avatarCache.get(email);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    const avatar = AVATARS.find(a => a.id === cached.avatarId);
    if (avatar) return avatar.rarity;
  }
  
  // Fallback to localStorage
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

// Async function to fetch avatar from API
const fetchAvatarFromAPI = async (email: string): Promise<string | null> => {
  try {
    const result = await apiService.getUser(email);
    if (result.data?.avatar) {
      // Update cache
      avatarCache.set(email, { avatarId: result.data.avatar, timestamp: Date.now() });
      // Also update localStorage as backup
      localStorage.setItem(`avatar-${email}`, result.data.avatar);
      return result.data.avatar;
    }
  } catch (error) {
    console.warn('Failed to fetch avatar from API:', error);
  }
  return null;
};

export const PlayerAvatar = ({ email, size = 'md', className, showBorder = true }: PlayerAvatarProps) => {
  const [emoji, setEmoji] = useState(() => getSelectedAvatarSync(email));
  const [rarity, setRarity] = useState<'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'>(() => getAvatarRaritySync(email));
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (!email) return;
    
    // Check if we have a fresh cache entry
    const cached = avatarCache.get(email);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      const avatar = AVATARS.find(a => a.id === cached.avatarId);
      if (avatar) {
        setEmoji(avatar.emoji);
        setRarity(avatar.rarity);
        return;
      }
    }
    
    // Fetch from API
    setIsLoading(true);
    fetchAvatarFromAPI(email).then(avatarId => {
      if (avatarId) {
        const avatar = AVATARS.find(a => a.id === avatarId);
        if (avatar) {
          setEmoji(avatar.emoji);
          setRarity(avatar.rarity);
        }
      }
      setIsLoading(false);
    });
  }, [email]);

  const rarityColors = RARITY_COLORS[rarity];
  
  const sizeClasses = {
    sm: 'h-6 w-6 text-sm',
    md: 'h-8 w-8 text-base',
    lg: 'h-10 w-10 text-lg',
  };

  if (isLoading) {
    return (
      <Skeleton className={cn('rounded-full', sizeClasses[size], className)} />
    );
  }

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

// Export sync functions for backwards compatibility
export const getSelectedAvatar = getSelectedAvatarSync;
export const getAvatarRarity = getAvatarRaritySync;

// Export async function for components that need it
export { fetchAvatarFromAPI };