import { Target, Zap, Flame, Sword, Crown, Star, Calendar, Trophy, Medal, Award, Sparkles, Shield, Rocket, Brain, Clock, Heart } from 'lucide-react';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: typeof Trophy;
  color: string;
  bgColor: string;
  requirement: {
    type: 'games_played' | 'guru_completed' | 'perfect_score' | 'streak' | 'daily_streak' | 'total_score' | 'accuracy' | 'speed' | 'first_game' | 'snake_score' | 'epm_score' | 'epm_games' | 'epm_accuracy' | 'epm_mastery' | 'consolidation_perfect' | 'epm_tool_mastery';
    value: number;
    category?: string;
    level?: string;
    tool?: string;
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
  
  // Mini Game Achievements - Snake
  {
    id: 'snake_beginner',
    name: 'Snake Charmer',
    description: 'Score 50 points in Snake',
    icon: Rocket,
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    requirement: { type: 'snake_score', value: 50 },
    rarity: 'common'
  },
  {
    id: 'snake_intermediate',
    name: 'Snake Handler',
    description: 'Score 150 points in Snake',
    icon: Flame,
    color: 'text-green-500',
    bgColor: 'bg-green-500/20',
    requirement: { type: 'snake_score', value: 150 },
    rarity: 'uncommon'
  },
  {
    id: 'snake_master',
    name: 'Snake Master',
    description: 'Score 300 points in Snake',
    icon: Crown,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/20',
    requirement: { type: 'snake_score', value: 300 },
    rarity: 'rare'
  },
  {
    id: 'snake_legend',
    name: 'Serpent Legend',
    description: 'Score 500 points in Snake',
    icon: Sparkles,
    color: 'text-emerald-300',
    bgColor: 'bg-gradient-to-r from-emerald-500/20 to-green-500/20',
    requirement: { type: 'snake_score', value: 500 },
    rarity: 'legendary'
  },
  
  // Mini Game Achievements - EPM Quiz
  {
    id: 'epm_learner',
    name: 'EPM Learner',
    description: 'Complete an EPM quiz',
    icon: Brain,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    requirement: { type: 'epm_games', value: 1 },
    rarity: 'common'
  },
  {
    id: 'epm_student',
    name: 'EPM Student',
    description: 'Score 100 points in EPM Quiz',
    icon: Brain,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/20',
    requirement: { type: 'epm_score', value: 100 },
    rarity: 'uncommon'
  },
  {
    id: 'epm_expert',
    name: 'EPM Expert',
    description: 'Achieve 80% accuracy in EPM Quiz',
    icon: Target,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    requirement: { type: 'epm_accuracy', value: 80 },
    rarity: 'rare'
  },
  {
    id: 'epm_master',
    name: 'EPM Master',
    description: 'Score 150+ with 90% accuracy in EPM Quiz',
    icon: Award,
    color: 'text-purple-500',
    bgColor: 'bg-gradient-to-r from-purple-500/20 to-blue-500/20',
    requirement: { type: 'epm_mastery', value: 1 },
    rarity: 'epic'
  },
  {
    id: 'consolidation_guru',
    name: 'Consolidation Guru',
    description: 'Perfect score on Financial Consolidation topic',
    icon: Crown,
    color: 'text-indigo-400',
    bgColor: 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20',
    requirement: { type: 'consolidation_perfect', value: 1 },
    rarity: 'legendary'
  },
  
  // EPM Tool-Specific Achievements
  {
    id: 'oracle_fccs_specialist',
    name: 'FCCS Specialist',
    description: 'Score 80%+ on Oracle FCCS questions',
    icon: Award,
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    requirement: { type: 'epm_tool_mastery', value: 80, tool: 'oracle_fccs' },
    rarity: 'rare'
  },
  {
    id: 'oracle_pbcs_specialist',
    name: 'PBCS Specialist',
    description: 'Score 80%+ on Oracle PBCS questions',
    icon: Award,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
    requirement: { type: 'epm_tool_mastery', value: 80, tool: 'oracle_pbcs' },
    rarity: 'rare'
  },
  {
    id: 'jedox_specialist',
    name: 'Jedox Specialist',
    description: 'Score 80%+ on Jedox questions',
    icon: Award,
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    requirement: { type: 'epm_tool_mastery', value: 80, tool: 'jedox' },
    rarity: 'rare'
  },
  {
    id: 'netsuite_specialist',
    name: 'NetSuite EPM Specialist',
    description: 'Score 80%+ on NetSuite EPM questions',
    icon: Award,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/20',
    requirement: { type: 'epm_tool_mastery', value: 80, tool: 'netsuite' },
    rarity: 'rare'
  },
  {
    id: 'tagetik_specialist',
    name: 'Tagetik Specialist',
    description: 'Score 80%+ on CCH Tagetik questions',
    icon: Award,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    requirement: { type: 'epm_tool_mastery', value: 80, tool: 'tagetik' },
    rarity: 'rare'
  },
  {
    id: 'anaplan_specialist',
    name: 'Anaplan Specialist',
    description: 'Score 80%+ on Anaplan questions',
    icon: Award,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    requirement: { type: 'epm_tool_mastery', value: 80, tool: 'anaplan' },
    rarity: 'rare'
  },
  {
    id: 'workday_adaptive_specialist',
    name: 'Adaptive Planning Specialist',
    description: 'Score 80%+ on Workday Adaptive questions',
    icon: Award,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    requirement: { type: 'epm_tool_mastery', value: 80, tool: 'workday_adaptive' },
    rarity: 'rare'
  },
  {
    id: 'epm_polyglot',
    name: 'EPM Polyglot',
    description: 'Master 3+ EPM tools with 80% accuracy',
    icon: Sparkles,
    color: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400',
    bgColor: 'bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20',
    requirement: { type: 'epm_tool_mastery', value: 3 },
    rarity: 'epic'
  },
  {
    id: 'epm_architect',
    name: 'EPM Architect',
    description: 'Master all 7 EPM tools with 80% accuracy',
    icon: Crown,
    color: 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400',
    bgColor: 'bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20',
    requirement: { type: 'epm_tool_mastery', value: 7 },
    rarity: 'legendary'
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
