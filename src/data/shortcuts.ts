import { Shortcut } from '@/types/game';

export const shortcuts: Shortcut[] = [
  // OS Shortcuts - Easy
  { id: 'os-1', task: 'Copy the selected text', keys: ['Ctrl', 'C'], category: 'os', difficulty: 'easy' },
  { id: 'os-2', task: 'Paste from clipboard', keys: ['Ctrl', 'V'], category: 'os', difficulty: 'easy' },
  { id: 'os-3', task: 'Cut the selected text', keys: ['Ctrl', 'X'], category: 'os', difficulty: 'easy' },
  { id: 'os-4', task: 'Undo the last action', keys: ['Ctrl', 'Z'], category: 'os', difficulty: 'easy' },
  { id: 'os-5', task: 'Select all items', keys: ['Ctrl', 'A'], category: 'os', difficulty: 'easy' },
  { id: 'os-6', task: 'Save the current file', keys: ['Ctrl', 'S'], category: 'os', difficulty: 'easy' },
  
  // OS Shortcuts - Medium
  { id: 'os-7', task: 'Redo the last action', keys: ['Ctrl', 'Y'], category: 'os', difficulty: 'medium' },
  { id: 'os-8', task: 'Find text in document', keys: ['Ctrl', 'F'], category: 'os', difficulty: 'medium' },
  { id: 'os-9', task: 'Print the document', keys: ['Ctrl', 'P'], category: 'os', difficulty: 'medium' },
  { id: 'os-10', task: 'Open a new tab', keys: ['Ctrl', 'T'], category: 'os', difficulty: 'medium' },
  { id: 'os-11', task: 'Close the current tab', keys: ['Ctrl', 'W'], category: 'os', difficulty: 'medium' },
  { id: 'os-12', task: 'Refresh the page', keys: ['Ctrl', 'R'], category: 'os', difficulty: 'medium' },
  { id: 'os-13', task: 'Open browser history', keys: ['Ctrl', 'H'], category: 'os', difficulty: 'medium' },
  
  // OS Shortcuts - Hard
  { id: 'os-14', task: 'Switch between windows', keys: ['Alt', 'Tab'], category: 'os', difficulty: 'hard' },
  { id: 'os-15', task: 'Close the current window', keys: ['Alt', 'F4'], category: 'os', difficulty: 'hard' },
  { id: 'os-16', task: 'Lock your computer', keys: ['Win', 'L'], category: 'os', difficulty: 'hard' },
  { id: 'os-17', task: 'Open Task Manager', keys: ['Ctrl', 'Shift', 'Esc'], category: 'os', difficulty: 'hard' },
  { id: 'os-18', task: 'Take a screenshot', keys: ['Win', 'Shift', 'S'], category: 'os', difficulty: 'hard' },
  { id: 'os-19', task: 'Open File Explorer', keys: ['Win', 'E'], category: 'os', difficulty: 'hard' },
  { id: 'os-20', task: 'Minimize all windows', keys: ['Win', 'D'], category: 'os', difficulty: 'hard' },
  
  // Office Shortcuts - Easy
  { id: 'office-1', task: 'Make text bold', keys: ['Ctrl', 'B'], category: 'office', difficulty: 'easy' },
  { id: 'office-2', task: 'Make text italic', keys: ['Ctrl', 'I'], category: 'office', difficulty: 'easy' },
  { id: 'office-3', task: 'Underline the text', keys: ['Ctrl', 'U'], category: 'office', difficulty: 'easy' },
  { id: 'office-4', task: 'Create a new document', keys: ['Ctrl', 'N'], category: 'office', difficulty: 'easy' },
  { id: 'office-5', task: 'Open an existing file', keys: ['Ctrl', 'O'], category: 'office', difficulty: 'easy' },
  
  // Office Shortcuts - Medium
  { id: 'office-6', task: 'Find and replace text', keys: ['Ctrl', 'H'], category: 'office', difficulty: 'medium' },
  { id: 'office-7', task: 'Insert a hyperlink', keys: ['Ctrl', 'K'], category: 'office', difficulty: 'medium' },
  { id: 'office-8', task: 'Align text to center', keys: ['Ctrl', 'E'], category: 'office', difficulty: 'medium' },
  { id: 'office-9', task: 'Align text to left', keys: ['Ctrl', 'L'], category: 'office', difficulty: 'medium' },
  { id: 'office-10', task: 'Align text to right', keys: ['Ctrl', 'R'], category: 'office', difficulty: 'medium' },
  { id: 'office-11', task: 'Justify the paragraph', keys: ['Ctrl', 'J'], category: 'office', difficulty: 'medium' },
  
  // Office Shortcuts - Hard
  { id: 'office-12', task: 'Strikethrough text', keys: ['Ctrl', 'Shift', 'S'], category: 'office', difficulty: 'hard' },
  { id: 'office-13', task: 'Insert a comment', keys: ['Ctrl', 'Alt', 'M'], category: 'office', difficulty: 'hard' },
  { id: 'office-14', task: 'Open thesaurus', keys: ['Shift', 'F7'], category: 'office', difficulty: 'hard' },
  { id: 'office-15', task: 'Insert current date', keys: ['Alt', 'Shift', 'D'], category: 'office', difficulty: 'hard' },
  { id: 'office-16', task: 'Toggle case of text', keys: ['Shift', 'F3'], category: 'office', difficulty: 'hard' },
  { id: 'office-17', task: 'Apply subscript', keys: ['Ctrl', '='], category: 'office', difficulty: 'hard' },
  { id: 'office-18', task: 'Apply superscript', keys: ['Ctrl', 'Shift', '+'], category: 'office', difficulty: 'hard' },
];

export const getShortcutsByCategory = (category: 'os' | 'office', difficulty: 'easy' | 'medium' | 'hard') => {
  const filtered = shortcuts.filter(s => s.category === category);
  
  if (difficulty === 'easy') {
    return filtered.filter(s => s.difficulty === 'easy');
  } else if (difficulty === 'medium') {
    return filtered.filter(s => s.difficulty === 'easy' || s.difficulty === 'medium');
  }
  return filtered; // hard includes all
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
