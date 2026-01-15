// Keyboard normalization utilities used across the app.
// The goal is to make browser key events and our shortcut dataset comparable.

export type NormalizedKeyToken =
  | 'CTRL'
  | 'SHIFT'
  | 'ALT'
  | 'WIN'
  | 'ESC'
  | 'SPACE'
  | 'UP'
  | 'DOWN'
  | 'LEFT'
  | 'RIGHT'
  | string;

export const normalizeKeyToken = (key: string): NormalizedKeyToken => {
  const raw = (key ?? '').trim();
  if (!raw) return '';

  const upper = raw.toUpperCase();

  // Modifiers
  if (upper === 'CONTROL' || upper === 'CTRL') return 'CTRL';
  if (upper === 'SHIFT') return 'SHIFT';
  if (upper === 'ALT' || upper === 'ALTGRAPH') return 'ALT';
  if (upper === 'META' || upper === 'OS' || upper === 'WIN' || upper === 'WINDOWS') return 'WIN';

  // Common synonyms
  if (upper === 'ESCAPE' || upper === 'ESC') return 'ESC';
  if (upper === ' ' || upper === 'SPACE' || upper === 'SPACEBAR') return 'SPACE';

  // Arrow keys (browser uses ArrowUp etc)
  if (upper === 'ARROWUP' || upper === 'UP') return 'UP';
  if (upper === 'ARROWDOWN' || upper === 'DOWN') return 'DOWN';
  if (upper === 'ARROWLEFT' || upper === 'LEFT') return 'LEFT';
  if (upper === 'ARROWRIGHT' || upper === 'RIGHT') return 'RIGHT';

  // Keep everything else as-is but uppercase for stable comparisons
  return upper;
};

export const isModifierToken = (key: string) => {
  const t = normalizeKeyToken(key);
  return t === 'CTRL' || t === 'SHIFT' || t === 'ALT' || t === 'WIN';
};

export const normalizeComboSignature = (keys: string[]) => {
  return keys.map(normalizeKeyToken).filter(Boolean).sort().join('+');
};

export const displayKeyToken = (key: string) => {
  const t = normalizeKeyToken(key);

  // Canonical display for special keys (match shortcut dataset strings)
  if (t === 'CTRL') return 'Ctrl';
  if (t === 'SHIFT') return 'Shift';
  if (t === 'ALT') return 'Alt';
  if (t === 'WIN') return 'Win';
  if (t === 'ESC') return 'Escape';
  if (t === 'SPACE') return 'Space';
  if (t === 'UP') return 'Up';
  if (t === 'DOWN') return 'Down';
  if (t === 'LEFT') return 'Left';
  if (t === 'RIGHT') return 'Right';

  // Function keys, digits, symbols, letters
  if (/^F\d{1,2}$/.test(t)) return t;
  if (/^[A-Z0-9]$/.test(t)) return t;

  // Friendly casing for other named keys
  if (t === 'PAGEUP') return 'PageUp';
  if (t === 'PAGEDOWN') return 'PageDown';
  if (t === 'BACKSPACE') return 'Backspace';
  if (t === 'DELETE') return 'Delete';
  if (t === 'TAB') return 'Tab';
  if (t === 'ENTER') return 'Enter';
  if (t === 'HOME') return 'Home';
  if (t === 'END') return 'End';
  if (t === 'INSERT') return 'Insert';

  // Fallback
  return key;
};
