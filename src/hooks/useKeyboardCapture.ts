import { useEffect, useState, useCallback, useRef } from 'react';
import { displayKeyToken, isModifierToken, normalizeComboSignature, normalizeKeyToken } from '@/utils/keyboard';

interface KeyboardState {
  pressedKeys: Set<string>;
  lastCombination: string[];
}

const normalizeKeyFromEvent = (e: KeyboardEvent): string | null => {
  // Ignore auto-repeats; they cause flicker and duplicate submissions
  if (e.repeat) return null;

  // Prefer physical code for letters/digits so it stays stable across keyboard layouts
  if (e.code?.startsWith('Key')) return e.code.replace('Key', '');
  if (e.code?.startsWith('Digit')) return e.code.replace('Digit', '');

  // Numpad special cases
  if (e.code === 'NumpadAdd') return '+';
  if (e.code === 'NumpadSubtract') return '-';
  if (e.code === 'NumpadMultiply') return '*';
  if (e.code === 'NumpadDivide') return '/';
  if (e.code === 'NumpadDecimal') return '.';
  if (e.code === 'NumpadEnter') return 'Enter';
  if (e.code?.startsWith('Numpad')) return e.code.replace('Numpad', '');

  // Arrow keys
  if (e.key?.startsWith('Arrow')) return e.key.replace('Arrow', '');

  // Space
  if (e.code === 'Space' || e.key === ' ') return 'Space';

  // Symbols where code is ambiguous due to Shift (e.g. '=' vs '+')
  if (e.code === 'Equal') return e.key; // '=' or '+' depending on Shift
  if (e.code === 'Minus') return e.key; // '-' or '_' depending on Shift

  // F-keys and other named keys come through cleanly in e.key
  return e.key || null;
};

export const useKeyboardCapture = (isActive: boolean, onCombination: (keys: string[]) => void) => {
  const [state, setState] = useState<KeyboardState>({
    pressedKeys: new Set(),
    lastCombination: [],
  });

  // Refs to avoid stale state and allow immediate submission on keydown
  const pressedKeysRef = useRef<Set<string>>(new Set());
  const lastSubmittedSigRef = useRef<string>('');

  const submitCombination = useCallback(
    (keys: string[]) => {
      const sig = normalizeComboSignature(keys);
      if (!sig) return;

      // Deduplicate submits between keydown + keyup
      if (sig === lastSubmittedSigRef.current) return;
      lastSubmittedSigRef.current = sig;

      onCombination(keys);
    },
    [onCombination]
  );

  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent browser actions where possible (not all OS/browser shortcuts can be blocked)
      e.preventDefault();
      e.stopPropagation();

      const raw = normalizeKeyFromEvent(e);
      if (!raw) return;

      // OS-reserved keys that cannot be reliably captured - skip entirely
      // These shortcuts will be handled via multiple-choice questions instead
      if (e.key === 'Meta' || e.key === 'OS' || e.metaKey) return;
      if (e.altKey && e.key === 'Tab') return;
      if (e.key === 'Escape') return; // Escape often exits fullscreen

      // Normalize to canonical token, then to a stable display label.
      const canonical = normalizeKeyToken(raw);
      const display = displayKeyToken(canonical);

      // Skip Win key tracking entirely (it will open the Start menu and steal focus)
      if (canonical === 'WIN') return;

      // Update pressed keys (track what's held down)
      const next = new Set(pressedKeysRef.current);
      next.add(display);
      pressedKeysRef.current = next;

      const combo = Array.from(next);
      setState({ pressedKeys: next, lastCombination: combo });

      // DO NOT submit on keydown - wait for keyup for reliable detection
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();

      // Get the current combination before clearing
      const combo = Array.from(pressedKeysRef.current);
      
      // Only submit if we have keys pressed
      if (combo.length > 0) {
        submitCombination(combo);
      }

      // Reset after submission
      pressedKeysRef.current = new Set();
      lastSubmittedSigRef.current = '';
      setState({ pressedKeys: new Set(), lastCombination: [] });
    };

    const handleContextMenu = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    // Block Alt key menu activation in browsers (best-effort)
    const handleAltKey = (e: KeyboardEvent) => {
      if (e.key === 'Alt' || e.altKey) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    window.addEventListener('keyup', handleKeyUp, { capture: true });
    window.addEventListener('contextmenu', handleContextMenu, { capture: true });
    document.addEventListener('keydown', handleAltKey, { capture: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
      window.removeEventListener('keyup', handleKeyUp, { capture: true });
      window.removeEventListener('contextmenu', handleContextMenu, { capture: true });
      document.removeEventListener('keydown', handleAltKey, { capture: true });
    };
  }, [isActive, submitCombination]);

  return state;
};

// Hook for entering fullscreen mode (note: browsers may force-exit fullscreen on Escape; it cannot be reliably blocked)
export const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);
  const [needsFullscreenRestore, setNeedsFullscreenRestore] = useState(false);

  const enterFullscreen = useCallback(async () => {
    try {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
      } else if ((elem as any).webkitRequestFullscreen) {
        await (elem as any).webkitRequestFullscreen();
      } else if ((elem as any).msRequestFullscreen) {
        await (elem as any).msRequestFullscreen();
      }
      setIsFullscreen(true);
      setIsGameActive(true);
      setNeedsFullscreenRestore(false);
    } catch (err) {
      console.log('Fullscreen not available:', err);
    }
  }, []);

  const exitFullscreen = useCallback(async () => {
    setIsGameActive(false);
    setNeedsFullscreenRestore(false);
    try {
      if (document.fullscreenElement) {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen();
        }
      }
      setIsFullscreen(false);
    } catch (err) {
      console.log('Exit fullscreen error:', err);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const currentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreen(currentlyFullscreen);

      // If the game is active and fullscreen was exited (usually via Escape), we must ask for a click to re-enter.
      if (isGameActive && !currentlyFullscreen) {
        setNeedsFullscreenRestore(true);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, [isGameActive]);

  return { isFullscreen, enterFullscreen, exitFullscreen, isGameActive, needsFullscreenRestore };
};
