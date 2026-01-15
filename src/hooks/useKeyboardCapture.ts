import { useEffect, useState, useCallback } from 'react';

interface KeyboardState {
  pressedKeys: Set<string>;
  lastCombination: string[];
}

export const useKeyboardCapture = (isActive: boolean, onCombination: (keys: string[]) => void) => {
  const [state, setState] = useState<KeyboardState>({
    pressedKeys: new Set(),
    lastCombination: [],
  });

  const normalizeKey = useCallback((key: string, code: string): string => {
    // Normalize key names
    if (key === 'Control') return 'Ctrl';
    if (key === 'Meta') return 'Win';
    if (code.startsWith('Key')) return code.replace('Key', '');
    if (code.startsWith('Digit')) return code.replace('Digit', '');
    if (code.startsWith('Numpad')) return code.replace('Numpad', '');
    if (code === 'Equal') return '=';
    if (code === 'Minus') return '-';
    if (code === 'Period') return '.';
    if (code === 'Comma') return ',';
    if (code === 'Slash') return '/';
    if (code === 'Backslash') return '\\';
    if (code === 'BracketLeft') return '[';
    if (code === 'BracketRight') return ']';
    if (code === 'Semicolon') return ';';
    if (code === 'Quote') return "'";
    if (code === 'Backquote') return '`';
    return key;
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent ALL default browser behaviors to block system shortcuts
      // This includes Ctrl+P (print), Ctrl+S (save), Ctrl+O (open), etc.
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      
      // Block specific dangerous combinations but still track the keys
      const blockedCombos = ['Tab', 'F4'];
      if (e.altKey && blockedCombos.includes(e.key)) {
        return;
      }
      if (e.metaKey) return; // Block Windows/Command key combinations
      
      const normalizedKey = normalizeKey(e.key, e.code);
      
      setState(prev => {
        const newPressedKeys = new Set(prev.pressedKeys);
        newPressedKeys.add(normalizedKey);
        return {
          pressedKeys: newPressedKeys,
          lastCombination: Array.from(newPressedKeys),
        };
      });
      
      return false;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      
      setState(prev => {
        if (prev.pressedKeys.size > 0) {
          // When releasing keys, check the combination
          const combination = Array.from(prev.pressedKeys);
          onCombination(combination);
        }
        
        return {
          pressedKeys: new Set(),
          lastCombination: [],
        };
      });
      
      return false;
    };

    // Block context menu
    const handleContextMenu = (e: Event) => {
      e.preventDefault();
    };

    // Use capture phase to intercept events before they bubble
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    window.addEventListener('keyup', handleKeyUp, { capture: true });
    window.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
      window.removeEventListener('keyup', handleKeyUp, { capture: true });
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [isActive, normalizeKey, onCombination]);

  return state;
};

// Hook for entering fullscreen mode with auto-recovery
export const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);

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
    } catch (err) {
      console.log('Fullscreen not available:', err);
    }
  }, []);

  const exitFullscreen = useCallback(async () => {
    setIsGameActive(false); // Mark game as no longer active
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

  // Auto-recover fullscreen when user presses ESC during active game
  useEffect(() => {
    const handleFullscreenChange = () => {
      const currentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreen(currentlyFullscreen);
      
      // If game is active and user exited fullscreen (e.g., via ESC), prompt to re-enter
      if (isGameActive && !currentlyFullscreen) {
        // Small delay to avoid immediate re-trigger
        setTimeout(() => {
          if (isGameActive) {
            enterFullscreen();
          }
        }, 100);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, [isGameActive, enterFullscreen]);

  // Intercept ESC key during game to prevent exit
  useEffect(() => {
    if (!isGameActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        // Don't exit fullscreen, keep playing
        return false;
      }
    };

    // Use capture phase to intercept before browser handles it
    document.addEventListener('keydown', handleKeyDown, { capture: true });

    return () => {
      document.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, [isGameActive]);

  return { isFullscreen, enterFullscreen, exitFullscreen, isGameActive };
};
