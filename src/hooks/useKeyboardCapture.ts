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
      e.preventDefault();
      
      const normalizedKey = normalizeKey(e.key, e.code);
      
      setState(prev => {
        const newPressedKeys = new Set(prev.pressedKeys);
        newPressedKeys.add(normalizedKey);
        return {
          pressedKeys: newPressedKeys,
          lastCombination: Array.from(newPressedKeys),
        };
      });
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      e.preventDefault();
      
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
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isActive, normalizeKey, onCombination]);

  return state;
};
