import { ShortcutChallenge, Shortcut, DifficultyLevel, Category } from '@/types/game';

// Full 70+ shortcut curriculum organized by level and category
export const shortcutChallenges: ShortcutChallenge[] = [
  // ============ ESSENTIALS LEVEL ============
  // Windows - Essentials
  { id: 'win-ess-1', level: 'essentials', category: 'windows', description: 'Copy selected item', keys: ['Ctrl', 'C'], hint: 'C for Copy' },
  { id: 'win-ess-2', level: 'essentials', category: 'windows', description: 'Paste from clipboard', keys: ['Ctrl', 'V'], hint: 'V is next to C on keyboard' },
  { id: 'win-ess-3', level: 'essentials', category: 'windows', description: 'Cut selected item', keys: ['Ctrl', 'X'], hint: 'X looks like scissors' },
  { id: 'win-ess-4', level: 'essentials', category: 'windows', description: 'Undo last action', keys: ['Ctrl', 'Z'], hint: 'Z for undo - last letter, go back' },
  { id: 'win-ess-5', level: 'essentials', category: 'windows', description: 'Select all items', keys: ['Ctrl', 'A'], hint: 'A for All' },
  { id: 'win-ess-6', level: 'essentials', category: 'windows', description: 'Save current file', keys: ['Ctrl', 'S'], hint: 'S for Save' },
  { id: 'win-ess-7', level: 'essentials', category: 'windows', description: 'Delete item to Recycle Bin', keys: ['Delete'], hint: 'Just the Delete key' },
  { id: 'win-ess-8', level: 'essentials', category: 'windows', description: 'Close active window', keys: ['Alt', 'F4'], hint: 'Alt + Function 4' },

  // Excel - Essentials
  { id: 'excel-ess-1', level: 'essentials', category: 'excel', description: 'Move to next cell', keys: ['Tab'], hint: 'Tab moves right' },
  { id: 'excel-ess-2', level: 'essentials', category: 'excel', description: 'Start new line in cell', keys: ['Alt', 'Enter'], hint: 'Alt + Enter for line break' },
  { id: 'excel-ess-3', level: 'essentials', category: 'excel', description: 'Edit active cell', keys: ['F2'], hint: 'F2 to edit' },
  { id: 'excel-ess-4', level: 'essentials', category: 'excel', description: 'Cancel cell entry', keys: ['Escape'], hint: 'Escape to cancel' },
  { id: 'excel-ess-5', level: 'essentials', category: 'excel', description: 'Go to cell A1', keys: ['Ctrl', 'Home'], hint: 'Home is the beginning' },

  // PowerPoint - Essentials
  { id: 'ppt-ess-1', level: 'essentials', category: 'powerpoint', description: 'Start slideshow from beginning', keys: ['F5'], hint: 'F5 to present' },
  { id: 'ppt-ess-2', level: 'essentials', category: 'powerpoint', description: 'End slideshow', keys: ['Escape'], hint: 'Escape to exit' },
  { id: 'ppt-ess-3', level: 'essentials', category: 'powerpoint', description: 'Insert new slide', keys: ['Ctrl', 'M'], hint: 'M for new slide (Make)' },
  { id: 'ppt-ess-4', level: 'essentials', category: 'powerpoint', description: 'Duplicate selected slide', keys: ['Ctrl', 'D'], hint: 'D for Duplicate' },

  // General - Essentials
  { id: 'gen-ess-1', level: 'essentials', category: 'general', description: 'Make text bold', keys: ['Ctrl', 'B'], hint: 'B for Bold' },
  { id: 'gen-ess-2', level: 'essentials', category: 'general', description: 'Make text italic', keys: ['Ctrl', 'I'], hint: 'I for Italic' },
  { id: 'gen-ess-3', level: 'essentials', category: 'general', description: 'Underline text', keys: ['Ctrl', 'U'], hint: 'U for Underline' },
  { id: 'gen-ess-4', level: 'essentials', category: 'general', description: 'Print document', keys: ['Ctrl', 'P'], hint: 'P for Print' },
  { id: 'gen-ess-5', level: 'essentials', category: 'general', description: 'Find text', keys: ['Ctrl', 'F'], hint: 'F for Find' },

  // ============ IMPLEMENTATION LEVEL ============
  // Windows - Implementation
  { id: 'win-imp-1', level: 'implementation', category: 'windows', description: 'Redo last action', keys: ['Ctrl', 'Y'], hint: 'Y for redo (opposite of Z)' },
  { id: 'win-imp-2', level: 'implementation', category: 'windows', description: 'Switch between windows', keys: ['Alt', 'Tab'], hint: 'Alt + Tab to switch' },
  { id: 'win-imp-3', level: 'implementation', category: 'windows', description: 'Open File Explorer', keys: ['Win', 'E'], hint: 'E for Explorer' },
  { id: 'win-imp-4', level: 'implementation', category: 'windows', description: 'Lock your computer', keys: ['Win', 'L'], hint: 'L for Lock' },
  { id: 'win-imp-5', level: 'implementation', category: 'windows', description: 'Minimize all windows', keys: ['Win', 'D'], hint: 'D for Desktop' },
  { id: 'win-imp-6', level: 'implementation', category: 'windows', description: 'Open new browser tab', keys: ['Ctrl', 'T'], hint: 'T for Tab' },
  { id: 'win-imp-7', level: 'implementation', category: 'windows', description: 'Close current tab', keys: ['Ctrl', 'W'], hint: 'W for close Window' },
  { id: 'win-imp-8', level: 'implementation', category: 'windows', description: 'Refresh page', keys: ['F5'], hint: 'F5 to refresh' },

  // Excel - Implementation
  { id: 'excel-imp-1', level: 'implementation', category: 'excel', description: 'Insert SUM formula', keys: ['Alt', '='], hint: 'Alt + equals for SUM' },
  { id: 'excel-imp-2', level: 'implementation', category: 'excel', description: 'Format as currency', keys: ['Ctrl', 'Shift', '4'], hint: 'Shift+4 is $ symbol' },
  { id: 'excel-imp-3', level: 'implementation', category: 'excel', description: 'Format as percentage', keys: ['Ctrl', 'Shift', '5'], hint: 'Shift+5 is % symbol' },
  { id: 'excel-imp-4', level: 'implementation', category: 'excel', description: 'Insert current date', keys: ['Ctrl', ';'], hint: 'Semicolon for date' },
  { id: 'excel-imp-5', level: 'implementation', category: 'excel', description: 'Insert current time', keys: ['Ctrl', 'Shift', ';'], hint: 'Shift+semicolon for time' },
  { id: 'excel-imp-6', level: 'implementation', category: 'excel', description: 'Apply border to cells', keys: ['Ctrl', 'Shift', '&'], hint: 'Ampersand for borders' },
  { id: 'excel-imp-7', level: 'implementation', category: 'excel', description: 'Select entire column', keys: ['Ctrl', 'Space'], hint: 'Space selects column' },
  { id: 'excel-imp-8', level: 'implementation', category: 'excel', description: 'Select entire row', keys: ['Shift', 'Space'], hint: 'Shift+Space for row' },

  // PowerPoint - Implementation
  { id: 'ppt-imp-1', level: 'implementation', category: 'powerpoint', description: 'Start from current slide', keys: ['Shift', 'F5'], hint: 'Shift+F5 from current' },
  { id: 'ppt-imp-2', level: 'implementation', category: 'powerpoint', description: 'Go to next slide in show', keys: ['N'], hint: 'N for Next' },
  { id: 'ppt-imp-3', level: 'implementation', category: 'powerpoint', description: 'Go to previous slide', keys: ['P'], hint: 'P for Previous' },
  { id: 'ppt-imp-4', level: 'implementation', category: 'powerpoint', description: 'Black screen during show', keys: ['B'], hint: 'B for Black' },
  { id: 'ppt-imp-5', level: 'implementation', category: 'powerpoint', description: 'White screen during show', keys: ['W'], hint: 'W for White' },
  { id: 'ppt-imp-6', level: 'implementation', category: 'powerpoint', description: 'Group selected objects', keys: ['Ctrl', 'G'], hint: 'G for Group' },

  // General - Implementation
  { id: 'gen-imp-1', level: 'implementation', category: 'general', description: 'Find and replace', keys: ['Ctrl', 'H'], hint: 'H for replace (Hunt)' },
  { id: 'gen-imp-2', level: 'implementation', category: 'general', description: 'Insert hyperlink', keys: ['Ctrl', 'K'], hint: 'K for hyperlinK' },
  { id: 'gen-imp-3', level: 'implementation', category: 'general', description: 'Center align text', keys: ['Ctrl', 'E'], hint: 'E for cEnter' },
  { id: 'gen-imp-4', level: 'implementation', category: 'general', description: 'Left align text', keys: ['Ctrl', 'L'], hint: 'L for Left' },
  { id: 'gen-imp-5', level: 'implementation', category: 'general', description: 'Right align text', keys: ['Ctrl', 'R'], hint: 'R for Right' },

  // ============ ARCHITECT LEVEL ============
  // Windows - Architect
  { id: 'win-arc-1', level: 'architect', category: 'windows', description: 'Open Task Manager', keys: ['Ctrl', 'Shift', 'Esc'], hint: 'Shift+Escape for Task Manager' },
  { id: 'win-arc-2', level: 'architect', category: 'windows', description: 'Take screenshot', keys: ['Win', 'Shift', 'S'], hint: 'Snipping with Shift+S' },
  { id: 'win-arc-3', level: 'architect', category: 'windows', description: 'Open Action Center', keys: ['Win', 'A'], hint: 'A for Action Center' },
  { id: 'win-arc-4', level: 'architect', category: 'windows', description: 'Open Settings', keys: ['Win', 'I'], hint: 'I for settings (Info)' },
  { id: 'win-arc-5', level: 'architect', category: 'windows', description: 'Snap window left', keys: ['Win', 'Left'], hint: 'Win + Arrow to snap' },
  { id: 'win-arc-6', level: 'architect', category: 'windows', description: 'Snap window right', keys: ['Win', 'Right'], hint: 'Win + Arrow to snap' },
  { id: 'win-arc-7', level: 'architect', category: 'windows', description: 'Open clipboard history', keys: ['Win', 'V'], hint: 'V for clipboard (like paste)' },
  { id: 'win-arc-8', level: 'architect', category: 'windows', description: 'New virtual desktop', keys: ['Win', 'Ctrl', 'D'], hint: 'D for new Desktop' },

  // Excel - Architect
  { id: 'excel-arc-1', level: 'architect', category: 'excel', description: 'Create chart from selection', keys: ['Alt', 'F1'], hint: 'F1 for quick chart' },
  { id: 'excel-arc-2', level: 'architect', category: 'excel', description: 'Open Format Cells dialog', keys: ['Ctrl', '1'], hint: '1 for Format dialog' },
  { id: 'excel-arc-3', level: 'architect', category: 'excel', description: 'Toggle formula bar', keys: ['Ctrl', 'Shift', 'U'], hint: 'U to expand/collapse' },
  { id: 'excel-arc-4', level: 'architect', category: 'excel', description: 'Insert function wizard', keys: ['Shift', 'F3'], hint: 'Shift+F3 for functions' },
  { id: 'excel-arc-5', level: 'architect', category: 'excel', description: 'Fill down from cell above', keys: ['Ctrl', 'D'], hint: 'D for Down fill' },
  { id: 'excel-arc-6', level: 'architect', category: 'excel', description: 'Fill right from left cell', keys: ['Ctrl', 'R'], hint: 'R for Right fill' },

  // PowerPoint - Architect
  { id: 'ppt-arc-1', level: 'architect', category: 'powerpoint', description: 'Open presenter view', keys: ['Alt', 'F5'], hint: 'Alt+F5 for presenter' },
  { id: 'ppt-arc-2', level: 'architect', category: 'powerpoint', description: 'Hide pointer in show', keys: ['Ctrl', 'H'], hint: 'H for Hide pointer' },
  { id: 'ppt-arc-3', level: 'architect', category: 'powerpoint', description: 'Change pointer to pen', keys: ['Ctrl', 'P'], hint: 'P for Pen' },
  { id: 'ppt-arc-4', level: 'architect', category: 'powerpoint', description: 'Erase pen annotations', keys: ['E'], hint: 'E for Erase' },
  { id: 'ppt-arc-5', level: 'architect', category: 'powerpoint', description: 'Go to slide number', keys: ['G'], hint: 'G for Go to slide' },

  // General - Architect
  { id: 'gen-arc-1', level: 'architect', category: 'general', description: 'Strikethrough text', keys: ['Ctrl', 'Shift', 'X'], hint: 'X for strikethrough' },
  { id: 'gen-arc-2', level: 'architect', category: 'general', description: 'Apply subscript', keys: ['Ctrl', '='], hint: 'Equals for subscript' },
  { id: 'gen-arc-3', level: 'architect', category: 'general', description: 'Apply superscript', keys: ['Ctrl', 'Shift', '+'], hint: 'Plus for superscript' },
  { id: 'gen-arc-4', level: 'architect', category: 'general', description: 'Increase font size', keys: ['Ctrl', 'Shift', '>'], hint: 'Greater than = bigger' },
  { id: 'gen-arc-5', level: 'architect', category: 'general', description: 'Decrease font size', keys: ['Ctrl', 'Shift', '<'], hint: 'Less than = smaller' },

  // ============ GURU LEVEL ============
  // Windows - Guru
  { id: 'win-guru-1', level: 'guru', category: 'windows', description: 'Open emoji panel', keys: ['Win', '.'], hint: 'Period for emoji panel' },
  { id: 'win-guru-2', level: 'guru', category: 'windows', description: 'Record screen', keys: ['Win', 'Alt', 'R'], hint: 'R for Record' },
  { id: 'win-guru-3', level: 'guru', category: 'windows', description: 'Switch virtual desktop', keys: ['Win', 'Ctrl', 'Left'], hint: 'Arrow to switch desktops' },
  { id: 'win-guru-4', level: 'guru', category: 'windows', description: 'Close virtual desktop', keys: ['Win', 'Ctrl', 'F4'], hint: 'F4 closes desktop' },
  { id: 'win-guru-5', level: 'guru', category: 'windows', description: 'Open Game Bar', keys: ['Win', 'G'], hint: 'G for Game bar' },
  { id: 'win-guru-6', level: 'guru', category: 'windows', description: 'Project screen', keys: ['Win', 'P'], hint: 'P for Project' },

  // Excel - Guru
  { id: 'excel-guru-1', level: 'guru', category: 'excel', description: 'Open Name Manager', keys: ['Ctrl', 'F3'], hint: 'F3 for Name Manager' },
  { id: 'excel-guru-2', level: 'guru', category: 'excel', description: 'Define name for selection', keys: ['Ctrl', 'Shift', 'F3'], hint: 'Shift+F3 for new name' },
  { id: 'excel-guru-3', level: 'guru', category: 'excel', description: 'Calculate all workbooks', keys: ['Ctrl', 'Alt', 'F9'], hint: 'Force recalculate all' },
  { id: 'excel-guru-4', level: 'guru', category: 'excel', description: 'Insert array formula', keys: ['Ctrl', 'Shift', 'Enter'], hint: 'CSE for arrays' },
  { id: 'excel-guru-5', level: 'guru', category: 'excel', description: 'Show all formulas', keys: ['Ctrl', '`'], hint: 'Backtick shows formulas' },
  { id: 'excel-guru-6', level: 'guru', category: 'excel', description: 'Group selected rows/cols', keys: ['Alt', 'Shift', 'Right'], hint: 'Arrow to group' },

  // PowerPoint - Guru
  { id: 'ppt-guru-1', level: 'guru', category: 'powerpoint', description: 'Go to last slide', keys: ['End'], hint: 'End key to last slide' },
  { id: 'ppt-guru-2', level: 'guru', category: 'powerpoint', description: 'Go to first slide', keys: ['Home'], hint: 'Home key to first' },
  { id: 'ppt-guru-3', level: 'guru', category: 'powerpoint', description: 'Show/hide slide thumbnails', keys: ['Ctrl', 'Shift', 'Tab'], hint: 'Tab toggles view' },
  { id: 'ppt-guru-4', level: 'guru', category: 'powerpoint', description: 'Change pointer to arrow', keys: ['Ctrl', 'A'], hint: 'A for Arrow pointer' },

  // General - Guru
  { id: 'gen-guru-1', level: 'guru', category: 'general', description: 'Open thesaurus', keys: ['Shift', 'F7'], hint: 'F7 for thesaurus' },
  { id: 'gen-guru-2', level: 'guru', category: 'general', description: 'Insert current date', keys: ['Alt', 'Shift', 'D'], hint: 'D for Date' },
  { id: 'gen-guru-3', level: 'guru', category: 'general', description: 'Insert current time', keys: ['Alt', 'Shift', 'T'], hint: 'T for Time' },
  { id: 'gen-guru-4', level: 'guru', category: 'general', description: 'Toggle case of text', keys: ['Shift', 'F3'], hint: 'F3 cycles case' },
  { id: 'gen-guru-5', level: 'guru', category: 'general', description: 'Insert comment', keys: ['Ctrl', 'Alt', 'M'], hint: 'M for coMment' },
];

// Helper function to get shortcuts by level and category
export const getShortcutsByLevelAndCategory = (
  level: DifficultyLevel,
  category?: Category
): ShortcutChallenge[] => {
  const levelOrder: DifficultyLevel[] = ['essentials', 'implementation', 'architect', 'guru'];
  const levelIndex = levelOrder.indexOf(level);
  
  // Include all shortcuts up to and including the selected level
  const includedLevels = levelOrder.slice(0, levelIndex + 1);
  
  let filtered = shortcutChallenges.filter(s => includedLevels.includes(s.level));
  
  if (category) {
    filtered = filtered.filter(s => s.category === category);
  }
  
  return filtered;
};

// Legacy shortcuts for backward compatibility
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
