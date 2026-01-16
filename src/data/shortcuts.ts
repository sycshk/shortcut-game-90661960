import { ShortcutChallenge, Shortcut, DifficultyLevel, Category } from '@/types/game';

// Full 150+ shortcut curriculum organized by level and category
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
  { id: 'win-ess-9', level: 'essentials', category: 'windows', description: 'Open new document/window', keys: ['Ctrl', 'N'], hint: 'N for New' },
  { id: 'win-ess-10', level: 'essentials', category: 'windows', description: 'Open existing file', keys: ['Ctrl', 'O'], hint: 'O for Open' },
  { id: 'win-ess-11', level: 'essentials', category: 'windows', description: 'Rename selected file', keys: ['F2'], hint: 'F2 to rename' },
  { id: 'win-ess-12', level: 'essentials', category: 'windows', description: 'Search for files', keys: ['F3'], hint: 'F3 for search' },

  // Excel - Essentials
  { id: 'excel-ess-1', level: 'essentials', category: 'excel', description: 'Move to next cell', keys: ['Tab'], hint: 'Tab moves right' },
  { id: 'excel-ess-2', level: 'essentials', category: 'excel', description: 'Start new line in cell', keys: ['Alt', 'Enter'], hint: 'Alt + Enter for line break' },
  { id: 'excel-ess-3', level: 'essentials', category: 'excel', description: 'Edit active cell', keys: ['F2'], hint: 'F2 to edit' },
  { id: 'excel-ess-4', level: 'essentials', category: 'excel', description: 'Cancel cell entry', keys: ['Escape'], hint: 'Escape to cancel' },
  { id: 'excel-ess-5', level: 'essentials', category: 'excel', description: 'Go to cell A1', keys: ['Ctrl', 'Home'], hint: 'Home is the beginning' },
  { id: 'excel-ess-6', level: 'essentials', category: 'excel', description: 'Go to last cell with data', keys: ['Ctrl', 'End'], hint: 'End goes to the end' },
  { id: 'excel-ess-7', level: 'essentials', category: 'excel', description: 'Move to previous cell', keys: ['Shift', 'Tab'], hint: 'Shift+Tab moves left' },
  { id: 'excel-ess-8', level: 'essentials', category: 'excel', description: 'Confirm cell entry', keys: ['Enter'], hint: 'Enter to confirm' },

  // PowerPoint - Essentials
  { id: 'ppt-ess-1', level: 'essentials', category: 'powerpoint', description: 'Start slideshow from beginning', keys: ['F5'], hint: 'F5 to present' },
  { id: 'ppt-ess-2', level: 'essentials', category: 'powerpoint', description: 'End slideshow', keys: ['Escape'], hint: 'Escape to exit' },
  { id: 'ppt-ess-3', level: 'essentials', category: 'powerpoint', description: 'Insert new slide', keys: ['Ctrl', 'M'], hint: 'M for new slide (Make)' },
  { id: 'ppt-ess-4', level: 'essentials', category: 'powerpoint', description: 'Duplicate selected slide', keys: ['Ctrl', 'D'], hint: 'D for Duplicate' },
  { id: 'ppt-ess-5', level: 'essentials', category: 'powerpoint', description: 'Delete selected slide', keys: ['Delete'], hint: 'Delete removes slide' },
  { id: 'ppt-ess-6', level: 'essentials', category: 'powerpoint', description: 'Move slide up in order', keys: ['Ctrl', 'Up'], hint: 'Up arrow moves up' },
  { id: 'ppt-ess-7', level: 'essentials', category: 'powerpoint', description: 'Move slide down in order', keys: ['Ctrl', 'Down'], hint: 'Down arrow moves down' },

  // General - Essentials
  { id: 'gen-ess-1', level: 'essentials', category: 'general', description: 'Make text bold', keys: ['Ctrl', 'B'], hint: 'B for Bold' },
  { id: 'gen-ess-2', level: 'essentials', category: 'general', description: 'Make text italic', keys: ['Ctrl', 'I'], hint: 'I for Italic' },
  { id: 'gen-ess-3', level: 'essentials', category: 'general', description: 'Underline text', keys: ['Ctrl', 'U'], hint: 'U for Underline' },
  { id: 'gen-ess-4', level: 'essentials', category: 'general', description: 'Print document', keys: ['Ctrl', 'P'], hint: 'P for Print' },
  { id: 'gen-ess-5', level: 'essentials', category: 'general', description: 'Find text', keys: ['Ctrl', 'F'], hint: 'F for Find' },
  { id: 'gen-ess-6', level: 'essentials', category: 'general', description: 'Zoom in', keys: ['Ctrl', '+'], hint: 'Plus to zoom in' },
  { id: 'gen-ess-7', level: 'essentials', category: 'general', description: 'Zoom out', keys: ['Ctrl', '-'], hint: 'Minus to zoom out' },
  { id: 'gen-ess-8', level: 'essentials', category: 'general', description: 'Reset zoom to 100%', keys: ['Ctrl', '0'], hint: 'Zero resets zoom' },

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
  { id: 'win-imp-9', level: 'implementation', category: 'windows', description: 'Reopen closed tab', keys: ['Ctrl', 'Shift', 'T'], hint: 'Shift+T reopens tab' },
  { id: 'win-imp-10', level: 'implementation', category: 'windows', description: 'Open Run dialog', keys: ['Win', 'R'], hint: 'R for Run' },
  { id: 'win-imp-11', level: 'implementation', category: 'windows', description: 'Permanently delete file', keys: ['Shift', 'Delete'], hint: 'Shift+Delete skips bin' },
  { id: 'win-imp-12', level: 'implementation', category: 'windows', description: 'Open System Properties', keys: ['Win', 'Pause'], hint: 'Pause for system info' },
  { id: 'win-imp-13', level: 'implementation', category: 'windows', description: 'Maximize current window', keys: ['Win', 'Up'], hint: 'Up maximizes' },
  { id: 'win-imp-14', level: 'implementation', category: 'windows', description: 'Minimize current window', keys: ['Win', 'Down'], hint: 'Down minimizes' },
  { id: 'win-imp-15', level: 'implementation', category: 'windows', description: 'Switch to next tab', keys: ['Ctrl', 'Tab'], hint: 'Tab cycles tabs' },
  { id: 'win-imp-16', level: 'implementation', category: 'windows', description: 'Switch to previous tab', keys: ['Ctrl', 'Shift', 'Tab'], hint: 'Shift+Tab goes back' },

  // Excel - Implementation
  { id: 'excel-imp-1', level: 'implementation', category: 'excel', description: 'Insert SUM formula', keys: ['Alt', '='], hint: 'Alt + equals for SUM' },
  { id: 'excel-imp-2', level: 'implementation', category: 'excel', description: 'Format as currency', keys: ['Ctrl', 'Shift', '4'], hint: 'Shift+4 is $ symbol' },
  { id: 'excel-imp-3', level: 'implementation', category: 'excel', description: 'Format as percentage', keys: ['Ctrl', 'Shift', '5'], hint: 'Shift+5 is % symbol' },
  { id: 'excel-imp-4', level: 'implementation', category: 'excel', description: 'Insert current date', keys: ['Ctrl', ';'], hint: 'Semicolon for date' },
  { id: 'excel-imp-5', level: 'implementation', category: 'excel', description: 'Insert current time', keys: ['Ctrl', 'Shift', ';'], hint: 'Shift+semicolon for time' },
  { id: 'excel-imp-6', level: 'implementation', category: 'excel', description: 'Apply border to cells', keys: ['Ctrl', 'Shift', '&'], hint: 'Ampersand for borders' },
  { id: 'excel-imp-7', level: 'implementation', category: 'excel', description: 'Select entire column', keys: ['Ctrl', 'Space'], hint: 'Space selects column' },
  { id: 'excel-imp-8', level: 'implementation', category: 'excel', description: 'Select entire row', keys: ['Shift', 'Space'], hint: 'Shift+Space for row' },
  { id: 'excel-imp-9', level: 'implementation', category: 'excel', description: 'Insert new row', keys: ['Ctrl', 'Shift', '+'], hint: 'Plus inserts row' },
  { id: 'excel-imp-10', level: 'implementation', category: 'excel', description: 'Delete current row', keys: ['Ctrl', '-'], hint: 'Minus deletes row' },
  { id: 'excel-imp-11', level: 'implementation', category: 'excel', description: 'Hide selected columns', keys: ['Ctrl', '0'], hint: 'Zero hides columns' },
  { id: 'excel-imp-12', level: 'implementation', category: 'excel', description: 'Hide selected rows', keys: ['Ctrl', '9'], hint: 'Nine hides rows' },
  { id: 'excel-imp-13', level: 'implementation', category: 'excel', description: 'Apply number format', keys: ['Ctrl', 'Shift', '1'], hint: 'One for number format' },
  { id: 'excel-imp-14', level: 'implementation', category: 'excel', description: 'Apply date format', keys: ['Ctrl', 'Shift', '3'], hint: 'Three for date format' },
  { id: 'excel-imp-15', level: 'implementation', category: 'excel', description: 'Remove cell borders', keys: ['Ctrl', 'Shift', '_'], hint: 'Underscore removes borders' },
  { id: 'excel-imp-16', level: 'implementation', category: 'excel', description: 'Insert new worksheet', keys: ['Shift', 'F11'], hint: 'Shift+F11 new sheet' },

  // PowerPoint - Implementation
  { id: 'ppt-imp-1', level: 'implementation', category: 'powerpoint', description: 'Start from current slide', keys: ['Shift', 'F5'], hint: 'Shift+F5 from current' },
  { id: 'ppt-imp-2', level: 'implementation', category: 'powerpoint', description: 'Go to next slide in show', keys: ['N'], hint: 'N for Next' },
  { id: 'ppt-imp-3', level: 'implementation', category: 'powerpoint', description: 'Go to previous slide', keys: ['P'], hint: 'P for Previous' },
  { id: 'ppt-imp-4', level: 'implementation', category: 'powerpoint', description: 'Black screen during show', keys: ['B'], hint: 'B for Black' },
  { id: 'ppt-imp-5', level: 'implementation', category: 'powerpoint', description: 'White screen during show', keys: ['W'], hint: 'W for White' },
  { id: 'ppt-imp-6', level: 'implementation', category: 'powerpoint', description: 'Group selected objects', keys: ['Ctrl', 'G'], hint: 'G for Group' },
  { id: 'ppt-imp-7', level: 'implementation', category: 'powerpoint', description: 'Ungroup selected objects', keys: ['Ctrl', 'Shift', 'G'], hint: 'Shift+G ungroups' },
  { id: 'ppt-imp-8', level: 'implementation', category: 'powerpoint', description: 'Bring object to front', keys: ['Ctrl', 'Shift', 'F'], hint: 'F for Front' },
  { id: 'ppt-imp-9', level: 'implementation', category: 'powerpoint', description: 'Send object to back', keys: ['Ctrl', 'Shift', 'B'], hint: 'B for Back' },
  { id: 'ppt-imp-10', level: 'implementation', category: 'powerpoint', description: 'Select all objects on slide', keys: ['Ctrl', 'A'], hint: 'A for All' },
  { id: 'ppt-imp-11', level: 'implementation', category: 'powerpoint', description: 'Align objects left', keys: ['Alt', 'H', 'G', 'A', 'L'], hint: 'Ribbon: Home > Arrange > Align Left' },
  { id: 'ppt-imp-12', level: 'implementation', category: 'powerpoint', description: 'Show gridlines', keys: ['Shift', 'F9'], hint: 'Shift+F9 for gridlines' },

  // General - Implementation
  { id: 'gen-imp-1', level: 'implementation', category: 'general', description: 'Find and replace', keys: ['Ctrl', 'H'], hint: 'H for replace (Hunt)' },
  { id: 'gen-imp-2', level: 'implementation', category: 'general', description: 'Insert hyperlink', keys: ['Ctrl', 'K'], hint: 'K for hyperlinK' },
  { id: 'gen-imp-3', level: 'implementation', category: 'general', description: 'Center align text', keys: ['Ctrl', 'E'], hint: 'E for cEnter' },
  { id: 'gen-imp-4', level: 'implementation', category: 'general', description: 'Left align text', keys: ['Ctrl', 'L'], hint: 'L for Left' },
  { id: 'gen-imp-5', level: 'implementation', category: 'general', description: 'Right align text', keys: ['Ctrl', 'R'], hint: 'R for Right' },
  { id: 'gen-imp-6', level: 'implementation', category: 'general', description: 'Justify text', keys: ['Ctrl', 'J'], hint: 'J for Justify' },
  { id: 'gen-imp-7', level: 'implementation', category: 'general', description: 'Go to specific page/line', keys: ['Ctrl', 'G'], hint: 'G for Go to' },
  { id: 'gen-imp-8', level: 'implementation', category: 'general', description: 'Check spelling', keys: ['F7'], hint: 'F7 for spelling' },
  { id: 'gen-imp-9', level: 'implementation', category: 'general', description: 'Insert page break', keys: ['Ctrl', 'Enter'], hint: 'Enter for new page' },
  { id: 'gen-imp-10', level: 'implementation', category: 'general', description: 'Double underline text', keys: ['Ctrl', 'Shift', 'D'], hint: 'D for Double underline' },

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
  { id: 'win-arc-9', level: 'architect', category: 'windows', description: 'Open Quick Link menu', keys: ['Win', 'X'], hint: 'X for power user menu' },
  { id: 'win-arc-10', level: 'architect', category: 'windows', description: 'Open Narrator', keys: ['Win', 'Ctrl', 'Enter'], hint: 'Enter starts Narrator' },
  { id: 'win-arc-11', level: 'architect', category: 'windows', description: 'Open Magnifier', keys: ['Win', '+'], hint: 'Plus opens Magnifier' },
  { id: 'win-arc-12', level: 'architect', category: 'windows', description: 'Toggle Task View', keys: ['Win', 'Tab'], hint: 'Tab shows task view' },
  { id: 'win-arc-13', level: 'architect', category: 'windows', description: 'Open Feedback Hub', keys: ['Win', 'F'], hint: 'F for Feedback' },
  { id: 'win-arc-14', level: 'architect', category: 'windows', description: 'Connect to devices', keys: ['Win', 'K'], hint: 'K for Konnect' },
  { id: 'win-arc-15', level: 'architect', category: 'windows', description: 'Open Focus Assist settings', keys: ['Win', 'H'], hint: 'H for focus Helper' },

  // Excel - Architect
  { id: 'excel-arc-1', level: 'architect', category: 'excel', description: 'Create chart from selection', keys: ['Alt', 'F1'], hint: 'F1 for quick chart' },
  { id: 'excel-arc-2', level: 'architect', category: 'excel', description: 'Open Format Cells dialog', keys: ['Ctrl', '1'], hint: '1 for Format dialog' },
  { id: 'excel-arc-3', level: 'architect', category: 'excel', description: 'Toggle formula bar', keys: ['Ctrl', 'Shift', 'U'], hint: 'U to expand/collapse' },
  { id: 'excel-arc-4', level: 'architect', category: 'excel', description: 'Insert function wizard', keys: ['Shift', 'F3'], hint: 'Shift+F3 for functions' },
  { id: 'excel-arc-5', level: 'architect', category: 'excel', description: 'Fill down from cell above', keys: ['Ctrl', 'D'], hint: 'D for Down fill' },
  { id: 'excel-arc-6', level: 'architect', category: 'excel', description: 'Fill right from left cell', keys: ['Ctrl', 'R'], hint: 'R for Right fill' },
  { id: 'excel-arc-7', level: 'architect', category: 'excel', description: 'Toggle absolute/relative reference', keys: ['F4'], hint: 'F4 toggles $ signs' },
  { id: 'excel-arc-8', level: 'architect', category: 'excel', description: 'Select all cells with comments', keys: ['Ctrl', 'Shift', 'O'], hint: 'O for cOmments' },
  { id: 'excel-arc-9', level: 'architect', category: 'excel', description: 'Open Go To dialog', keys: ['Ctrl', 'G'], hint: 'G for Go to' },
  { id: 'excel-arc-10', level: 'architect', category: 'excel', description: 'Create table from selection', keys: ['Ctrl', 'T'], hint: 'T for Table' },
  { id: 'excel-arc-11', level: 'architect', category: 'excel', description: 'Apply scientific format', keys: ['Ctrl', 'Shift', '^'], hint: 'Caret for scientific' },
  { id: 'excel-arc-12', level: 'architect', category: 'excel', description: 'Select visible cells only', keys: ['Alt', ';'], hint: 'Semicolon for visible only' },
  { id: 'excel-arc-13', level: 'architect', category: 'excel', description: 'Unhide hidden rows', keys: ['Ctrl', 'Shift', '9'], hint: 'Shift+9 unhides rows' },
  { id: 'excel-arc-14', level: 'architect', category: 'excel', description: 'Unhide hidden columns', keys: ['Ctrl', 'Shift', '0'], hint: 'Shift+0 unhides columns' },
  { id: 'excel-arc-15', level: 'architect', category: 'excel', description: 'Add comment to cell', keys: ['Shift', 'F2'], hint: 'Shift+F2 for comment' },

  // PowerPoint - Architect
  { id: 'ppt-arc-1', level: 'architect', category: 'powerpoint', description: 'Open presenter view', keys: ['Alt', 'F5'], hint: 'Alt+F5 for presenter' },
  { id: 'ppt-arc-2', level: 'architect', category: 'powerpoint', description: 'Hide pointer in show', keys: ['Ctrl', 'H'], hint: 'H for Hide pointer' },
  { id: 'ppt-arc-3', level: 'architect', category: 'powerpoint', description: 'Change pointer to pen', keys: ['Ctrl', 'P'], hint: 'P for Pen' },
  { id: 'ppt-arc-4', level: 'architect', category: 'powerpoint', description: 'Erase pen annotations', keys: ['E'], hint: 'E for Erase' },
  { id: 'ppt-arc-5', level: 'architect', category: 'powerpoint', description: 'Go to slide number', keys: ['G'], hint: 'G for Go to slide' },
  { id: 'ppt-arc-6', level: 'architect', category: 'powerpoint', description: 'Change pointer to highlighter', keys: ['Ctrl', 'I'], hint: 'I for hIghlighter' },
  { id: 'ppt-arc-7', level: 'architect', category: 'powerpoint', description: 'Show task bar in presentation', keys: ['Ctrl', 'T'], hint: 'T for Taskbar' },
  { id: 'ppt-arc-8', level: 'architect', category: 'powerpoint', description: 'Display shortcut menu', keys: ['Shift', 'F10'], hint: 'Shift+F10 for menu' },
  { id: 'ppt-arc-9', level: 'architect', category: 'powerpoint', description: 'View all slides', keys: ['Ctrl', 'Shift', 'H'], hint: 'H for all slides (Hub)' },
  { id: 'ppt-arc-10', level: 'architect', category: 'powerpoint', description: 'Show/hide guides', keys: ['Alt', 'F9'], hint: 'Alt+F9 for guides' },

  // General - Architect
  { id: 'gen-arc-1', level: 'architect', category: 'general', description: 'Strikethrough text', keys: ['Ctrl', 'Shift', 'X'], hint: 'X for strikethrough' },
  { id: 'gen-arc-2', level: 'architect', category: 'general', description: 'Apply subscript', keys: ['Ctrl', '='], hint: 'Equals for subscript' },
  { id: 'gen-arc-3', level: 'architect', category: 'general', description: 'Apply superscript', keys: ['Ctrl', 'Shift', '+'], hint: 'Plus for superscript' },
  { id: 'gen-arc-4', level: 'architect', category: 'general', description: 'Increase font size', keys: ['Ctrl', 'Shift', '>'], hint: 'Greater than = bigger' },
  { id: 'gen-arc-5', level: 'architect', category: 'general', description: 'Decrease font size', keys: ['Ctrl', 'Shift', '<'], hint: 'Less than = smaller' },
  { id: 'gen-arc-6', level: 'architect', category: 'general', description: 'Change font', keys: ['Ctrl', 'Shift', 'F'], hint: 'F for Font' },
  { id: 'gen-arc-7', level: 'architect', category: 'general', description: 'Change font size', keys: ['Ctrl', 'Shift', 'P'], hint: 'P for Point size' },
  { id: 'gen-arc-8', level: 'architect', category: 'general', description: 'Remove formatting', keys: ['Ctrl', 'Space'], hint: 'Space clears formatting' },
  { id: 'gen-arc-9', level: 'architect', category: 'general', description: 'Copy formatting', keys: ['Ctrl', 'Shift', 'C'], hint: 'Shift+C copies format' },
  { id: 'gen-arc-10', level: 'architect', category: 'general', description: 'Paste formatting', keys: ['Ctrl', 'Shift', 'V'], hint: 'Shift+V pastes format' },
  { id: 'gen-arc-11', level: 'architect', category: 'general', description: 'Insert symbol', keys: ['Alt', 'I', 'S'], hint: 'Insert > Symbol' },
  { id: 'gen-arc-12', level: 'architect', category: 'general', description: 'Insert bullet list', keys: ['Ctrl', 'Shift', 'L'], hint: 'L for List' },

  // ============ GURU LEVEL ============
  // Windows - Guru
  { id: 'win-guru-1', level: 'guru', category: 'windows', description: 'Open emoji panel', keys: ['Win', '.'], hint: 'Period for emoji panel' },
  { id: 'win-guru-2', level: 'guru', category: 'windows', description: 'Record screen', keys: ['Win', 'Alt', 'R'], hint: 'R for Record' },
  { id: 'win-guru-3', level: 'guru', category: 'windows', description: 'Switch virtual desktop', keys: ['Win', 'Ctrl', 'Left'], hint: 'Arrow to switch desktops' },
  { id: 'win-guru-4', level: 'guru', category: 'windows', description: 'Close virtual desktop', keys: ['Win', 'Ctrl', 'F4'], hint: 'F4 closes desktop' },
  { id: 'win-guru-5', level: 'guru', category: 'windows', description: 'Open Game Bar', keys: ['Win', 'G'], hint: 'G for Game bar' },
  { id: 'win-guru-6', level: 'guru', category: 'windows', description: 'Project screen', keys: ['Win', 'P'], hint: 'P for Project' },
  { id: 'win-guru-7', level: 'guru', category: 'windows', description: 'Open Windows Ink workspace', keys: ['Win', 'W'], hint: 'W for Windows Ink' },
  { id: 'win-guru-8', level: 'guru', category: 'windows', description: 'Cycle through taskbar apps', keys: ['Win', 'T'], hint: 'T for Taskbar' },
  { id: 'win-guru-9', level: 'guru', category: 'windows', description: 'Open taskbar app by number', keys: ['Win', '1'], hint: 'Number opens nth app' },
  { id: 'win-guru-10', level: 'guru', category: 'windows', description: 'Speak selected text', keys: ['Win', 'Ctrl', 'N'], hint: 'N for Narrator read' },
  { id: 'win-guru-11', level: 'guru', category: 'windows', description: 'Open voice typing', keys: ['Win', 'H'], hint: 'H for voice (Hear)' },
  { id: 'win-guru-12', level: 'guru', category: 'windows', description: 'Start/stop screen recording', keys: ['Win', 'Alt', 'G'], hint: 'G for recording (Game)' },
  { id: 'win-guru-13', level: 'guru', category: 'windows', description: 'Toggle HDR', keys: ['Win', 'Alt', 'B'], hint: 'B for brightness/HDR' },
  { id: 'win-guru-14', level: 'guru', category: 'windows', description: 'Open Connect pane', keys: ['Win', 'K'], hint: 'K for Konnect' },

  // Excel - Guru
  { id: 'excel-guru-1', level: 'guru', category: 'excel', description: 'Open Name Manager', keys: ['Ctrl', 'F3'], hint: 'F3 for Name Manager' },
  { id: 'excel-guru-2', level: 'guru', category: 'excel', description: 'Define name for selection', keys: ['Ctrl', 'Shift', 'F3'], hint: 'Shift+F3 for new name' },
  { id: 'excel-guru-3', level: 'guru', category: 'excel', description: 'Calculate all workbooks', keys: ['Ctrl', 'Alt', 'F9'], hint: 'Force recalculate all' },
  { id: 'excel-guru-4', level: 'guru', category: 'excel', description: 'Insert array formula', keys: ['Ctrl', 'Shift', 'Enter'], hint: 'CSE for arrays' },
  { id: 'excel-guru-5', level: 'guru', category: 'excel', description: 'Show all formulas', keys: ['Ctrl', '`'], hint: 'Backtick shows formulas' },
  { id: 'excel-guru-6', level: 'guru', category: 'excel', description: 'Group selected rows/cols', keys: ['Alt', 'Shift', 'Right'], hint: 'Arrow to group' },
  { id: 'excel-guru-7', level: 'guru', category: 'excel', description: 'Ungroup selected rows/cols', keys: ['Alt', 'Shift', 'Left'], hint: 'Left arrow ungroups' },
  { id: 'excel-guru-8', level: 'guru', category: 'excel', description: 'Open Macro dialog', keys: ['Alt', 'F8'], hint: 'F8 for Macros' },
  { id: 'excel-guru-9', level: 'guru', category: 'excel', description: 'Open VBA Editor', keys: ['Alt', 'F11'], hint: 'F11 for VBA' },
  { id: 'excel-guru-10', level: 'guru', category: 'excel', description: 'Trace precedents', keys: ['Ctrl', '['], hint: 'Bracket traces back' },
  { id: 'excel-guru-11', level: 'guru', category: 'excel', description: 'Trace dependents', keys: ['Ctrl', ']'], hint: 'Bracket traces forward' },
  { id: 'excel-guru-12', level: 'guru', category: 'excel', description: 'Select direct precedents', keys: ['Ctrl', 'Shift', '{'], hint: 'Brace selects precedents' },
  { id: 'excel-guru-13', level: 'guru', category: 'excel', description: 'Select direct dependents', keys: ['Ctrl', 'Shift', '}'], hint: 'Brace selects dependents' },
  { id: 'excel-guru-14', level: 'guru', category: 'excel', description: 'Enter same data in multiple cells', keys: ['Ctrl', 'Enter'], hint: 'Ctrl+Enter fills selection' },
  { id: 'excel-guru-15', level: 'guru', category: 'excel', description: 'Repeat last action', keys: ['F4'], hint: 'F4 repeats last action' },
  { id: 'excel-guru-16', level: 'guru', category: 'excel', description: 'Open PivotTable wizard', keys: ['Alt', 'N', 'V'], hint: 'Insert > PivotTable' },

  // PowerPoint - Guru
  { id: 'ppt-guru-1', level: 'guru', category: 'powerpoint', description: 'Go to last slide', keys: ['End'], hint: 'End key to last slide' },
  { id: 'ppt-guru-2', level: 'guru', category: 'powerpoint', description: 'Go to first slide', keys: ['Home'], hint: 'Home key to first' },
  { id: 'ppt-guru-3', level: 'guru', category: 'powerpoint', description: 'Show/hide slide thumbnails', keys: ['Ctrl', 'Shift', 'Tab'], hint: 'Tab toggles view' },
  { id: 'ppt-guru-4', level: 'guru', category: 'powerpoint', description: 'Change pointer to arrow', keys: ['Ctrl', 'A'], hint: 'A for Arrow pointer' },
  { id: 'ppt-guru-5', level: 'guru', category: 'powerpoint', description: 'Show slide number in presentation', keys: ['Ctrl', 'S'], hint: 'S for Slide number' },
  { id: 'ppt-guru-6', level: 'guru', category: 'powerpoint', description: 'Switch between outline and thumbnail', keys: ['Ctrl', 'Shift', 'Tab'], hint: 'Tab switches panes' },
  { id: 'ppt-guru-7', level: 'guru', category: 'powerpoint', description: 'Open Selection Pane', keys: ['Alt', 'F10'], hint: 'F10 for Selection Pane' },
  { id: 'ppt-guru-8', level: 'guru', category: 'powerpoint', description: 'Change laser pointer color', keys: ['Ctrl', 'L'], hint: 'L for Laser' },
  { id: 'ppt-guru-9', level: 'guru', category: 'powerpoint', description: 'Rehearse timings', keys: ['Alt', 'S', 'R'], hint: 'Slideshow > Rehearse' },
  { id: 'ppt-guru-10', level: 'guru', category: 'powerpoint', description: 'Record slideshow', keys: ['Alt', 'S', 'N'], hint: 'Slideshow > Record' },

  // General - Guru
  { id: 'gen-guru-1', level: 'guru', category: 'general', description: 'Open thesaurus', keys: ['Shift', 'F7'], hint: 'F7 for thesaurus' },
  { id: 'gen-guru-2', level: 'guru', category: 'general', description: 'Insert current date', keys: ['Alt', 'Shift', 'D'], hint: 'D for Date' },
  { id: 'gen-guru-3', level: 'guru', category: 'general', description: 'Insert current time', keys: ['Alt', 'Shift', 'T'], hint: 'T for Time' },
  { id: 'gen-guru-4', level: 'guru', category: 'general', description: 'Toggle case of text', keys: ['Shift', 'F3'], hint: 'F3 cycles case' },
  { id: 'gen-guru-5', level: 'guru', category: 'general', description: 'Insert comment', keys: ['Ctrl', 'Alt', 'M'], hint: 'M for coMment' },
  { id: 'gen-guru-6', level: 'guru', category: 'general', description: 'Show/hide formatting marks', keys: ['Ctrl', 'Shift', '8'], hint: '8 shows paragraph marks' },
  { id: 'gen-guru-7', level: 'guru', category: 'general', description: 'Create nonbreaking space', keys: ['Ctrl', 'Shift', 'Space'], hint: 'Shift+Space for nonbreaking' },
  { id: 'gen-guru-8', level: 'guru', category: 'general', description: 'Insert em dash', keys: ['Alt', 'Ctrl', '-'], hint: 'Minus for em dash' },
  { id: 'gen-guru-9', level: 'guru', category: 'general', description: 'Insert en dash', keys: ['Ctrl', '-'], hint: 'Ctrl+minus for en dash' },
  { id: 'gen-guru-10', level: 'guru', category: 'general', description: 'Insert copyright symbol', keys: ['Alt', 'Ctrl', 'C'], hint: 'C for Copyright' },
  { id: 'gen-guru-11', level: 'guru', category: 'general', description: 'Insert trademark symbol', keys: ['Alt', 'Ctrl', 'T'], hint: 'T for Trademark' },
  { id: 'gen-guru-12', level: 'guru', category: 'general', description: 'Insert registered symbol', keys: ['Alt', 'Ctrl', 'R'], hint: 'R for Registered' },
  { id: 'gen-guru-13', level: 'guru', category: 'general', description: 'Small caps formatting', keys: ['Ctrl', 'Shift', 'K'], hint: 'K for small Kaps' },
  { id: 'gen-guru-14', level: 'guru', category: 'general', description: 'All caps formatting', keys: ['Ctrl', 'Shift', 'A'], hint: 'A for All caps' },
  { id: 'gen-guru-15', level: 'guru', category: 'general', description: 'Insert field code', keys: ['Ctrl', 'F9'], hint: 'F9 for field' },

  // ============ GOOGLE SHEETS ============
  // Google Sheets - Essentials
  { id: 'gsheets-ess-1', level: 'essentials', category: 'google-sheets', description: 'Paste values only', keys: ['Ctrl', 'Shift', 'V'], hint: 'Shift+V for values only' },
  { id: 'gsheets-ess-2', level: 'essentials', category: 'google-sheets', description: 'Fill down', keys: ['Ctrl', 'D'], hint: 'D for Down' },
  { id: 'gsheets-ess-3', level: 'essentials', category: 'google-sheets', description: 'Fill right', keys: ['Ctrl', 'R'], hint: 'R for Right' },
  { id: 'gsheets-ess-4', level: 'essentials', category: 'google-sheets', description: 'Insert link', keys: ['Ctrl', 'K'], hint: 'K for linK' },
  { id: 'gsheets-ess-5', level: 'essentials', category: 'google-sheets', description: 'Select current column', keys: ['Ctrl', 'Space'], hint: 'Space selects column' },
  { id: 'gsheets-ess-6', level: 'essentials', category: 'google-sheets', description: 'Select current row', keys: ['Shift', 'Space'], hint: 'Shift+Space for row' },
  
  // Google Sheets - Implementation
  { id: 'gsheets-imp-1', level: 'implementation', category: 'google-sheets', description: 'Insert comment', keys: ['Ctrl', 'Alt', 'M'], hint: 'M for comment' },
  { id: 'gsheets-imp-2', level: 'implementation', category: 'google-sheets', description: 'Move to start of sheet', keys: ['Ctrl', 'Home'], hint: 'Home is beginning' },
  { id: 'gsheets-imp-3', level: 'implementation', category: 'google-sheets', description: 'Move to end of sheet', keys: ['Ctrl', 'End'], hint: 'End goes to end' },
  { id: 'gsheets-imp-4', level: 'implementation', category: 'google-sheets', description: 'Move to next sheet tab', keys: ['Ctrl', 'Shift', 'PageDown'], hint: 'PageDown for next tab' },
  { id: 'gsheets-imp-5', level: 'implementation', category: 'google-sheets', description: 'Move to previous sheet tab', keys: ['Ctrl', 'Shift', 'PageUp'], hint: 'PageUp for previous tab' },
  { id: 'gsheets-imp-6', level: 'implementation', category: 'google-sheets', description: 'Center align', keys: ['Ctrl', 'Shift', 'E'], hint: 'E for cEnter' },
  { id: 'gsheets-imp-7', level: 'implementation', category: 'google-sheets', description: 'Left align', keys: ['Ctrl', 'Shift', 'L'], hint: 'L for Left' },
  { id: 'gsheets-imp-8', level: 'implementation', category: 'google-sheets', description: 'Right align', keys: ['Ctrl', 'Shift', 'R'], hint: 'R for Right' },
  
  // Google Sheets - Architect
  { id: 'gsheets-arc-1', level: 'architect', category: 'google-sheets', description: 'Apply borders', keys: ['Alt', 'Shift', '7'], hint: 'Alt+Shift+7 for borders' },
  { id: 'gsheets-arc-2', level: 'architect', category: 'google-sheets', description: 'Remove borders', keys: ['Alt', 'Shift', '6'], hint: 'Alt+Shift+6 removes borders' },
  { id: 'gsheets-arc-3', level: 'architect', category: 'google-sheets', description: 'Format as currency', keys: ['Ctrl', 'Shift', '4'], hint: 'Shift+4 is $ symbol' },
  { id: 'gsheets-arc-4', level: 'architect', category: 'google-sheets', description: 'Format as percentage', keys: ['Ctrl', 'Shift', '5'], hint: 'Shift+5 is % symbol' },
  { id: 'gsheets-arc-5', level: 'architect', category: 'google-sheets', description: 'Clear formatting', keys: ['Ctrl', '\\'], hint: 'Backslash clears format' },

  // ============ GOOGLE DOCS ============
  // Google Docs - Essentials
  { id: 'gdocs-ess-1', level: 'essentials', category: 'google-docs', description: 'Paste without formatting', keys: ['Ctrl', 'Shift', 'V'], hint: 'Shift+V for plain paste' },
  { id: 'gdocs-ess-2', level: 'essentials', category: 'google-docs', description: 'Increase font size', keys: ['Ctrl', 'Shift', '>'], hint: 'Greater than = larger' },
  { id: 'gdocs-ess-3', level: 'essentials', category: 'google-docs', description: 'Decrease font size', keys: ['Ctrl', 'Shift', '<'], hint: 'Less than = smaller' },
  { id: 'gdocs-ess-4', level: 'essentials', category: 'google-docs', description: 'Clear formatting', keys: ['Ctrl', '\\'], hint: 'Backslash clears format' },
  { id: 'gdocs-ess-5', level: 'essentials', category: 'google-docs', description: 'Center align', keys: ['Ctrl', 'Shift', 'E'], hint: 'E for cEnter' },
  { id: 'gdocs-ess-6', level: 'essentials', category: 'google-docs', description: 'Left align', keys: ['Ctrl', 'Shift', 'L'], hint: 'L for Left' },
  
  // Google Docs - Implementation
  { id: 'gdocs-imp-1', level: 'implementation', category: 'google-docs', description: 'Strikethrough', keys: ['Alt', 'Shift', '5'], hint: 'Alt+Shift+5 for strikethrough' },
  { id: 'gdocs-imp-2', level: 'implementation', category: 'google-docs', description: 'Superscript', keys: ['Ctrl', '.'], hint: 'Period for superscript' },
  { id: 'gdocs-imp-3', level: 'implementation', category: 'google-docs', description: 'Subscript', keys: ['Ctrl', ','], hint: 'Comma for subscript' },
  { id: 'gdocs-imp-4', level: 'implementation', category: 'google-docs', description: 'Copy text formatting', keys: ['Ctrl', 'Alt', 'C'], hint: 'Alt+C copies format' },
  { id: 'gdocs-imp-5', level: 'implementation', category: 'google-docs', description: 'Paste text formatting', keys: ['Ctrl', 'Alt', 'V'], hint: 'Alt+V pastes format' },
  { id: 'gdocs-imp-6', level: 'implementation', category: 'google-docs', description: 'Apply Heading 1', keys: ['Ctrl', 'Alt', '1'], hint: 'Alt+1 for H1' },
  { id: 'gdocs-imp-7', level: 'implementation', category: 'google-docs', description: 'Apply Heading 2', keys: ['Ctrl', 'Alt', '2'], hint: 'Alt+2 for H2' },
  { id: 'gdocs-imp-8', level: 'implementation', category: 'google-docs', description: 'Apply Normal Text', keys: ['Ctrl', 'Alt', '0'], hint: 'Alt+0 for normal' },
  
  // Google Docs - Architect
  { id: 'gdocs-arc-1', level: 'architect', category: 'google-docs', description: 'Numbered list', keys: ['Ctrl', 'Shift', '7'], hint: 'Shift+7 for numbers' },
  { id: 'gdocs-arc-2', level: 'architect', category: 'google-docs', description: 'Bulleted list', keys: ['Ctrl', 'Shift', '8'], hint: 'Shift+8 for bullets' },
  { id: 'gdocs-arc-3', level: 'architect', category: 'google-docs', description: 'Right align', keys: ['Ctrl', 'Shift', 'R'], hint: 'R for Right' },
  { id: 'gdocs-arc-4', level: 'architect', category: 'google-docs', description: 'Justify', keys: ['Ctrl', 'Shift', 'J'], hint: 'J for Justify' },
  { id: 'gdocs-arc-5', level: 'architect', category: 'google-docs', description: 'Double space', keys: ['Ctrl', '2'], hint: '2 for double spacing' },
  { id: 'gdocs-arc-6', level: 'architect', category: 'google-docs', description: 'Insert page break', keys: ['Ctrl', 'Enter'], hint: 'Enter for new page' },
  { id: 'gdocs-arc-7', level: 'architect', category: 'google-docs', description: 'Voice typing', keys: ['Ctrl', 'Shift', 'S'], hint: 'S for Speech' },
  { id: 'gdocs-arc-8', level: 'architect', category: 'google-docs', description: 'Dictionary', keys: ['Ctrl', 'Shift', 'Y'], hint: 'Y for dictionary' },

  // ============ GOOGLE SLIDES ============
  // Google Slides - Essentials
  { id: 'gslides-ess-1', level: 'essentials', category: 'google-slides', description: 'New slide', keys: ['Ctrl', 'M'], hint: 'M for new slide' },
  { id: 'gslides-ess-2', level: 'essentials', category: 'google-slides', description: 'Duplicate slide', keys: ['Ctrl', 'D'], hint: 'D for Duplicate' },
  { id: 'gslides-ess-3', level: 'essentials', category: 'google-slides', description: 'Start presentation', keys: ['Ctrl', 'F5'], hint: 'F5 to present' },
  { id: 'gslides-ess-4', level: 'essentials', category: 'google-slides', description: 'Start from current slide', keys: ['Ctrl', 'Shift', 'F5'], hint: 'Shift+F5 from current' },
  { id: 'gslides-ess-5', level: 'essentials', category: 'google-slides', description: 'Duplicate object', keys: ['Ctrl', 'D'], hint: 'D for Duplicate' },
  
  // Google Slides - Implementation
  { id: 'gslides-imp-1', level: 'implementation', category: 'google-slides', description: 'Move slide up', keys: ['Ctrl', 'Up'], hint: 'Up moves slide up' },
  { id: 'gslides-imp-2', level: 'implementation', category: 'google-slides', description: 'Move slide down', keys: ['Ctrl', 'Down'], hint: 'Down moves slide down' },
  { id: 'gslides-imp-3', level: 'implementation', category: 'google-slides', description: 'Move slide to beginning', keys: ['Ctrl', 'Shift', 'Up'], hint: 'Shift+Up to start' },
  { id: 'gslides-imp-4', level: 'implementation', category: 'google-slides', description: 'Move slide to end', keys: ['Ctrl', 'Shift', 'Down'], hint: 'Shift+Down to end' },
  { id: 'gslides-imp-5', level: 'implementation', category: 'google-slides', description: 'Group objects', keys: ['Ctrl', 'Alt', 'G'], hint: 'G for Group' },
  { id: 'gslides-imp-6', level: 'implementation', category: 'google-slides', description: 'Ungroup objects', keys: ['Ctrl', 'Alt', 'Shift', 'G'], hint: 'Shift+G ungroups' },
  { id: 'gslides-imp-7', level: 'implementation', category: 'google-slides', description: 'Insert text box', keys: ['Ctrl', 'Alt', 'T'], hint: 'T for Text box' },
  
  // Google Slides - Architect
  { id: 'gslides-arc-1', level: 'architect', category: 'google-slides', description: 'Bring to front', keys: ['Ctrl', 'Shift', 'Up'], hint: 'Shift+Up brings front' },
  { id: 'gslides-arc-2', level: 'architect', category: 'google-slides', description: 'Send to back', keys: ['Ctrl', 'Shift', 'Down'], hint: 'Shift+Down sends back' },
  { id: 'gslides-arc-3', level: 'architect', category: 'google-slides', description: 'Bring forward', keys: ['Ctrl', 'Up'], hint: 'Up brings forward' },
  { id: 'gslides-arc-4', level: 'architect', category: 'google-slides', description: 'Send backward', keys: ['Ctrl', 'Down'], hint: 'Down sends back' },
  { id: 'gslides-arc-5', level: 'architect', category: 'google-slides', description: 'Rotate by 15 degrees', keys: ['Alt', 'Right'], hint: 'Alt+Right rotates' },
  { id: 'gslides-arc-6', level: 'architect', category: 'google-slides', description: 'Toggle laser pointer', keys: ['L'], hint: 'L for Laser' },
  { id: 'gslides-arc-7', level: 'architect', category: 'google-slides', description: 'Black screen toggle', keys: ['B'], hint: 'B for Black' },
  { id: 'gslides-arc-8', level: 'architect', category: 'google-slides', description: 'White screen toggle', keys: ['W'], hint: 'W for White' },
  { id: 'gslides-arc-9', level: 'architect', category: 'google-slides', description: 'Open speaker notes', keys: ['S'], hint: 'S for Speaker notes' },
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
