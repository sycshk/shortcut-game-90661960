// App version - update this when deploying new features
export const APP_VERSION = '2.1.0';

// Auto-generated at build time by Vite plugin
declare const __BUILD_TIME__: string;
declare const __BUILD_DATE__: string;

export const BUILD_TIME = typeof __BUILD_TIME__ !== 'undefined' ? __BUILD_TIME__ : new Date().toISOString();
export const BUILD_DATE = typeof __BUILD_DATE__ !== 'undefined' ? __BUILD_DATE__ : new Date().toISOString().split('T')[0];

// Version history:
// 2.1.0 - Mini games (Snake, EPM Quiz), unified leaderboard, mini game achievements
// 2.0.0 - Avatars, Hall of Fame, profile page, achievements system
// 1.5.0 - Daily challenges, streaks, analytics
// 1.0.0 - Initial release with shortcut game
