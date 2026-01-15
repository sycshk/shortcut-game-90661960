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
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      
      // Block Windows/Meta key - don't even track these
      if (e.key === 'Meta' || e.key === 'OS' || e.metaKey) {
        return false;
      }
      
      // Block Alt+Tab and Alt+F4 completely
      if (e.altKey && (e.key === 'Tab' || e.key === 'F4')) {
        return false;
      }
      
      // Normalize the key (convert Win/Meta to something we can track but won't trigger OS)
      const normalizedKey = normalizeKey(e.key, e.code);
      
      // Skip tracking modifier-only keys that might cause issues
      if (normalizedKey === 'Win' || normalizedKey === 'Meta' || normalizedKey === 'OS') {
        return false;
      }
      
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
      e.stopPropagation();
      return false;
    };

    // Block Alt key menu activation in browsers
    const handleAltKey = (e: KeyboardEvent) => {
      if (e.key === 'Alt' || e.altKey) {
        e.preventDefault();
      }
    };

    // Use capture phase to intercept events before they bubble
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
  // Enhanced ESC key blocking with multiple event phases
  useEffect(() => {
    if (!isGameActive) return;

    const blockEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.code === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }
    };

    // Block at multiple levels for maximum interception
    document.addEventListener('keydown', blockEscape, { capture: true });
    document.addEventListener('keyup', blockEscape, { capture: true });
    window.addEventListener('keydown', blockEscape, { capture: true });
    window.addEventListener('keyup', blockEscape, { capture: true });

    return () => {
      document.removeEventListener('keydown', blockEscape, { capture: true });
      document.removeEventListener('keyup', blockEscape, { capture: true });
      window.removeEventListener('keydown', blockEscape, { capture: true });
      window.removeEventListener('keyup', blockEscape, { capture: true });
    };
  }, [isGameActive]);

  return { isFullscreen, enterFullscreen, exitFullscreen, isGameActive };
};
