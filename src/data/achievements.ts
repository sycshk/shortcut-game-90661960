import { Target, Zap, Flame, Sword, Crown, Star, Calendar, Trophy, Medal, Award, Sparkles, Shield, Rocket, Brain, Clock, Heart } from 'lucide-react';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: typeof Trophy;
  color: string;
  bgColor: string;
  requirement: {
    type: 'games_played' | 'guru_completed' | 'perfect_score' | 'streak' | 'daily_streak' | 'total_score' | 'accuracy' | 'speed' | 'first_game';
    value: number;
    category?: string;
    level?: string;
  };
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export interface Avatar {
  id: string;
  name: string;
  emoji: string;
  requirement: {
    type: 'default' | 'achievement' | 'games_played' | 'guru_completed' | 'daily_streak' | 'perfect_games';
    achievementId?: string;
    value?: number;
  };
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export const ACHIEVEMENTS: Achievement[] = [
  // First steps
  {
    id: 'first_blood',
    name: 'First Blood',
    description: 'Complete your first game',
    icon: Sword,
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    requirement: { type: 'first_game', value: 1 },
    rarity: 'common'
  },
  {
    id: 'getting_started',
    name: 'Getting Started',
    description: 'Play 5 games',
    icon: Rocket,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    requirement: { type: 'games_played', value: 5 },
    rarity: 'common'
  },
  {
    id: 'dedicated_player',
    name: 'Dedicated Player',
    description: 'Play 25 games',
    icon: Heart,
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/20',
    requirement: { type: 'games_played', value: 25 },
    rarity: 'uncommon'
  },
  {
    id: 'shortcut_veteran',
    name: 'Shortcut Veteran',
    description: 'Play 100 games',
    icon: Medal,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    requirement: { type: 'games_played', value: 100 },
    rarity: 'rare'
  },
  
  // Perfection
  {
    id: 'perfect_score',
    name: 'Perfect Score',
    description: 'Achieve 100% accuracy in a game',
    icon: Target,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/20',
    requirement: { type: 'perfect_score', value: 1 },
    rarity: 'uncommon'
  },
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Achieve 5 perfect games',
    icon: Star,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    requirement: { type: 'perfect_score', value: 5 },
    rarity: 'rare'
  },
  {
    id: 'flawless',
    name: 'Flawless',
    description: 'Achieve 20 perfect games',
    icon: Sparkles,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/20',
    requirement: { type: 'perfect_score', value: 20 },
    rarity: 'epic'
  },
  
  // Guru challenges
  {
    id: 'guru_slayer',
    name: 'Guru Slayer',
    description: 'Complete the Guru level',
    icon: Crown,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
    requirement: { type: 'guru_completed', value: 1 },
    rarity: 'rare'
  },
  {
    id: 'guru_master',
    name: 'Guru Master',
    description: 'Complete the Guru level 10 times',
    icon: Crown,
    color: 'text-yellow-400',
    bgColor: 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20',
    requirement: { type: 'guru_completed', value: 10 },
    rarity: 'epic'
  },
  {
    id: 'legendary',
    name: 'Legendary',
    description: 'Complete Guru level with 100% accuracy',
    icon: Crown,
    color: 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400',
    bgColor: 'bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20',
    requirement: { type: 'guru_completed', value: 1, level: 'guru' },
    rarity: 'legendary'
  },
  
  // Streaks
  {
    id: 'hot_streak',
    name: 'Hot Streak',
    description: 'Get a 5 answer streak',
    icon: Flame,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
    requirement: { type: 'streak', value: 5 },
    rarity: 'common'
  },
  {
    id: 'on_fire',
    name: 'On Fire',
    description: 'Get a 10 answer streak',
    icon: Flame,
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    requirement: { type: 'streak', value: 10 },
    rarity: 'uncommon'
  },
  {
    id: 'unstoppable',
    name: 'Unstoppable',
    description: 'Get a 15 answer streak',
    icon: Flame,
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/20',
    requirement: { type: 'streak', value: 15 },
    rarity: 'rare'
  },
  
  // Daily challenges
  {
    id: 'daily_warrior',
    name: 'Daily Warrior',
    description: 'Complete 7 daily challenges in a row',
    icon: Calendar,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/20',
    requirement: { type: 'daily_streak', value: 7 },
    rarity: 'uncommon'
  },
  {
    id: 'daily_champion',
    name: 'Daily Champion',
    description: 'Complete 30 daily challenges in a row',
    icon: Shield,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/20',
    requirement: { type: 'daily_streak', value: 30 },
    rarity: 'epic'
  },
  
  // Speed
  {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Score 200+ points in a single game',
    icon: Zap,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    requirement: { type: 'total_score', value: 200 },
    rarity: 'uncommon'
  },
  {
    id: 'lightning_fast',
    name: 'Lightning Fast',
    description: 'Score 300+ points in a single game',
    icon: Zap,
    color: 'text-violet-400',
    bgColor: 'bg-violet-500/20',
    requirement: { type: 'total_score', value: 300 },
    rarity: 'rare'
  },
  
  // Mastery
  {
    id: 'brain_power',
    name: 'Brain Power',
    description: 'Maintain 90%+ average accuracy over 10 games',
    icon: Brain,
    color: 'text-fuchsia-400',
    bgColor: 'bg-fuchsia-500/20',
    requirement: { type: 'accuracy', value: 90 },
    rarity: 'rare'
  },
  {
    id: 'grandmaster',
    name: 'Grandmaster',
    description: 'Reach 10,000 total points',
    icon: Award,
    color: 'text-amber-400',
    bgColor: 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20',
    requirement: { type: 'total_score', value: 10000 },
    rarity: 'epic'
  },
];

export const AVATARS: Avatar[] = [
  // Default avatars
  { id: 'default_smile', name: 'Smile', emoji: '😊', requirement: { type: 'default' }, rarity: 'common' },
  { id: 'default_star', name: 'Star', emoji: '⭐', requirement: { type: 'default' }, rarity: 'common' },
  { id: 'default_fire', name: 'Fire', emoji: '🔥', requirement: { type: 'default' }, rarity: 'common' },
  { id: 'default_rocket', name: 'Rocket', emoji: '🚀', requirement: { type: 'default' }, rarity: 'common' },
  
  // Unlockable by games played
  { id: 'ninja', name: 'Ninja', emoji: '🥷', requirement: { type: 'games_played', value: 10 }, rarity: 'uncommon' },
  { id: 'wizard', name: 'Wizard', emoji: '🧙', requirement: { type: 'games_played', value: 25 }, rarity: 'uncommon' },
  { id: 'robot', name: 'Robot', emoji: '🤖', requirement: { type: 'games_played', value: 50 }, rarity: 'rare' },
  { id: 'alien', name: 'Alien', emoji: '👽', requirement: { type: 'games_played', value: 100 }, rarity: 'rare' },
  
  // Unlockable by achievements
  { id: 'sword', name: 'Warrior', emoji: '⚔️', requirement: { type: 'achievement', achievementId: 'first_blood' }, rarity: 'common' },
  { id: 'crown', name: 'Royal', emoji: '👑', requirement: { type: 'achievement', achievementId: 'guru_slayer' }, rarity: 'rare' },
  { id: 'legend', name: 'Legend', emoji: '🏆', requirement: { type: 'achievement', achievementId: 'legendary' }, rarity: 'legendary' },
  { id: 'diamond', name: 'Diamond', emoji: '💎', requirement: { type: 'achievement', achievementId: 'perfectionist' }, rarity: 'rare' },
  
  // Unlockable by daily streaks
  { id: 'calendar', name: 'Consistent', emoji: '📅', requirement: { type: 'daily_streak', value: 7 }, rarity: 'uncommon' },
  { id: 'lightning', name: 'Lightning', emoji: '⚡', requirement: { type: 'daily_streak', value: 14 }, rarity: 'rare' },
  { id: 'flame', name: 'Eternal Flame', emoji: '🔱', requirement: { type: 'daily_streak', value: 30 }, rarity: 'epic' },
  
  // Unlockable by perfect games
  { id: 'target', name: 'Bullseye', emoji: '🎯', requirement: { type: 'perfect_games', value: 1 }, rarity: 'uncommon' },
  { id: 'hundred', name: 'Hundred', emoji: '💯', requirement: { type: 'perfect_games', value: 5 }, rarity: 'rare' },
  { id: 'sparkle', name: 'Sparkle', emoji: '✨', requirement: { type: 'perfect_games', value: 10 }, rarity: 'epic' },
  { id: 'unicorn', name: 'Unicorn', emoji: '🦄', requirement: { type: 'perfect_games', value: 20 }, rarity: 'legendary' },
];

export const RARITY_COLORS = {
  common: { text: 'text-gray-400', bg: 'bg-gray-500/20', border: 'border-gray-500/30' },
  uncommon: { text: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/30' },
  rare: { text: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/30' },
  epic: { text: 'text-purple-400', bg: 'bg-purple-500/20', border: 'border-purple-500/30' },
  legendary: { text: 'text-yellow-400', bg: 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20', border: 'border-yellow-500/50' },
};

export const getRarityLabel = (rarity: Achievement['rarity']) => {
  return rarity.charAt(0).toUpperCase() + rarity.slice(1);
};
