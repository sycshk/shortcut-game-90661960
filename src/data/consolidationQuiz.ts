export interface QuizQuestion {
  id: string;
  category: 'budget' | 'consolidation' | 'kpi' | 'general';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
}

export const CONSOLIDATION_QUESTIONS: QuizQuestion[] = [
  // Financial Consolidation - Beginner
  {
    id: 'consol-1',
    category: 'consolidation',
    difficulty: 'beginner',
    question: 'What is the primary purpose of financial consolidation?',
    options: [
      'To combine financial statements of parent and subsidiary companies',
      'To calculate individual company profits',
      'To prepare tax returns',
      'To manage inventory levels'
    ],
    correctIndex: 0,
    explanation: 'Financial consolidation combines the financial statements of a parent company and its subsidiaries to present them as a single economic entity.',
    topic: 'Consolidation Basics'
  },
  {
    id: 'consol-2',
    category: 'consolidation',
    difficulty: 'beginner',
    question: 'What are intercompany eliminations?',
    options: [
      'Removing duplicate data from systems',
      'Adjustments to remove transactions between group entities',
      'Deleting old financial records',
      'Eliminating unnecessary cost centers'
    ],
    correctIndex: 1,
    explanation: 'Intercompany eliminations remove internal transactions between group companies to avoid double-counting in consolidated statements.',
    topic: 'Intercompany Transactions'
  },
  {
    id: 'consol-3',
    category: 'consolidation',
    difficulty: 'beginner',
    question: 'What is minority interest (non-controlling interest)?',
    options: [
      'Shares held by small investors',
      'The portion of a subsidiary not owned by the parent company',
      'Interest paid on small loans',
      'Minor accounting adjustments'
    ],
    correctIndex: 1,
    explanation: 'Non-controlling interest represents the equity in a subsidiary not attributable to the parent company.',
    topic: 'Ownership & Control'
  },
  {
    id: 'consol-4',
    category: 'consolidation',
    difficulty: 'intermediate',
    question: 'When consolidating a foreign subsidiary, which rate is typically used for income statement items?',
    options: [
      'Closing rate (spot rate at period end)',
      'Historical rate at acquisition',
      'Average rate for the period',
      'Forward rate'
    ],
    correctIndex: 2,
    explanation: 'Income statement items are typically translated at the average exchange rate for the period to smooth out fluctuations.',
    topic: 'Currency Translation'
  },
  {
    id: 'consol-5',
    category: 'consolidation',
    difficulty: 'intermediate',
    question: 'What is the equity method of accounting?',
    options: [
      'Recording investments at market value',
      'Recording investment at cost plus share of profits/losses of investee',
      'Always consolidating line by line',
      'Recording investments at zero value'
    ],
    correctIndex: 1,
    explanation: 'The equity method records the investment at cost, adjusted for the investor\'s share of profits or losses of the investee (typically for 20-50% ownership).',
    topic: 'Investment Methods'
  },
  {
    id: 'consol-6',
    category: 'consolidation',
    difficulty: 'advanced',
    question: 'What is push-down accounting?',
    options: [
      'Allocating costs to lower organizational levels',
      'Recording acquisition adjustments in subsidiary\'s books',
      'Pushing transactions to the next period',
      'Depreciation acceleration method'
    ],
    correctIndex: 1,
    explanation: 'Push-down accounting records the fair value adjustments and goodwill from an acquisition directly in the subsidiary\'s separate financial statements.',
    topic: 'Acquisition Accounting'
  },
  {
    id: 'consol-7',
    category: 'consolidation',
    difficulty: 'advanced',
    question: 'In a step acquisition, how is previously held equity interest revalued?',
    options: [
      'It is not revalued',
      'At historical cost',
      'At fair value at acquisition date, with gain/loss in P&L',
      'At book value only'
    ],
    correctIndex: 2,
    explanation: 'When control is achieved through a step acquisition, previously held equity is remeasured to fair value, with any gain or loss recognized in profit or loss.',
    topic: 'Step Acquisitions'
  },

  // Budget Planning
  {
    id: 'budget-1',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is zero-based budgeting (ZBB)?',
    options: [
      'Starting each budget from zero, justifying all expenses',
      'A budget with zero variance',
      'Budgeting with no historical data',
      'Eliminating all costs'
    ],
    correctIndex: 0,
    explanation: 'Zero-based budgeting requires justifying every expense from scratch each period, rather than basing it on prior budgets.',
    topic: 'Budgeting Methods'
  },
  {
    id: 'budget-2',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is the difference between a forecast and a budget?',
    options: [
      'There is no difference',
      'Budget is a target plan; forecast is an expected outcome based on current trends',
      'Forecast is more detailed than budget',
      'Budget is updated monthly; forecast is annual'
    ],
    correctIndex: 1,
    explanation: 'A budget is a financial plan/target, while a forecast is a prediction of expected results based on current performance and trends.',
    topic: 'Planning Concepts'
  },
  {
    id: 'budget-3',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is a rolling forecast?',
    options: [
      'A forecast that automatically updates daily',
      'A forecast that extends beyond the current fiscal year on a continuous basis',
      'A forecast limited to one quarter',
      'A forecast that rolls back to historical data'
    ],
    correctIndex: 1,
    explanation: 'A rolling forecast continuously extends the planning horizon (e.g., always 12 months ahead) as each period closes.',
    topic: 'Forecasting'
  },
  {
    id: 'budget-4',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is driver-based planning?',
    options: [
      'Planning focused on transportation costs',
      'Using key business drivers to create flexible financial plans',
      'Planning done by department managers',
      'Manual planning process'
    ],
    correctIndex: 1,
    explanation: 'Driver-based planning uses operational drivers (like volume, headcount, rates) to calculate financial outcomes, enabling scenario analysis.',
    topic: 'Planning Methods'
  },
  {
    id: 'budget-5',
    category: 'budget',
    difficulty: 'advanced',
    question: 'In Anaplan, what is a "spoke" in a hub-and-spoke model?',
    options: [
      'The central data repository',
      'A connected model that feeds or receives data from the hub',
      'The primary reporting dashboard',
      'An administrator role'
    ],
    correctIndex: 1,
    explanation: 'In EPM hub-and-spoke architecture, spokes are specialized models (e.g., workforce, sales) that connect to a central hub for consolidated planning.',
    topic: 'EPM Architecture'
  },

  // KPI Development
  {
    id: 'kpi-1',
    category: 'kpi',
    difficulty: 'beginner',
    question: 'What does KPI stand for?',
    options: [
      'Key Performance Indicator',
      'Known Process Improvement',
      'Key Process Integration',
      'Knowledge Performance Index'
    ],
    correctIndex: 0,
    explanation: 'KPI stands for Key Performance Indicator - a measurable value that demonstrates how effectively an organization is achieving key objectives.',
    topic: 'KPI Basics'
  },
  {
    id: 'kpi-2',
    category: 'kpi',
    difficulty: 'beginner',
    question: 'What makes a good KPI according to the SMART criteria?',
    options: [
      'Simple, Meaningful, Accurate, Realistic, Timely',
      'Specific, Measurable, Achievable, Relevant, Time-bound',
      'Strategic, Managed, Assessed, Reported, Tracked',
      'Standard, Monitored, Automated, Reliable, Tested'
    ],
    correctIndex: 1,
    explanation: 'SMART KPIs are Specific, Measurable, Achievable, Relevant, and Time-bound - ensuring they are clear and actionable.',
    topic: 'KPI Design'
  },
  {
    id: 'kpi-3',
    category: 'kpi',
    difficulty: 'intermediate',
    question: 'What is the difference between leading and lagging indicators?',
    options: [
      'Leading are financial, lagging are operational',
      'Leading predict future performance, lagging measure past performance',
      'Leading are for executives, lagging are for managers',
      'There is no significant difference'
    ],
    correctIndex: 1,
    explanation: 'Leading indicators predict future performance (e.g., sales pipeline), while lagging indicators measure past results (e.g., revenue achieved).',
    topic: 'Indicator Types'
  },
  {
    id: 'kpi-4',
    category: 'kpi',
    difficulty: 'intermediate',
    question: 'What is EBITDA and why is it commonly used?',
    options: [
      'A tax calculation method',
      'Earnings Before Interest, Taxes, Depreciation, and Amortization - shows operational profitability',
      'An inventory valuation method',
      'A cash flow category'
    ],
    correctIndex: 1,
    explanation: 'EBITDA measures operational profitability by excluding financing and accounting decisions, making it useful for comparing companies.',
    topic: 'Financial KPIs'
  },
  {
    id: 'kpi-5',
    category: 'kpi',
    difficulty: 'advanced',
    question: 'What is the DuPont analysis model?',
    options: [
      'A chemical industry standard',
      'Breaking ROE into profitability, efficiency, and leverage components',
      'A cost allocation method',
      'An inventory management system'
    ],
    correctIndex: 1,
    explanation: 'DuPont analysis decomposes ROE into net profit margin × asset turnover × financial leverage, revealing performance drivers.',
    topic: 'Financial Analysis'
  },

  // General EPM
  {
    id: 'gen-1',
    category: 'general',
    difficulty: 'beginner',
    question: 'What does EPM stand for?',
    options: [
      'Enterprise Performance Management',
      'Electronic Payment Method',
      'Enterprise Project Monitoring',
      'External Process Management'
    ],
    correctIndex: 0,
    explanation: 'EPM (Enterprise Performance Management) encompasses processes and tools for planning, budgeting, forecasting, and analyzing business performance.',
    topic: 'EPM Basics'
  },
  {
    id: 'gen-2',
    category: 'general',
    difficulty: 'intermediate',
    question: 'What is the balanced scorecard framework?',
    options: [
      'A financial ratio analysis tool',
      'A strategic planning framework with financial, customer, process, and learning perspectives',
      'A budget balancing technique',
      'An audit checklist'
    ],
    correctIndex: 1,
    explanation: 'The Balanced Scorecard aligns activities to strategy across four perspectives: Financial, Customer, Internal Process, and Learning & Growth.',
    topic: 'Strategic Frameworks'
  },
  {
    id: 'gen-3',
    category: 'general',
    difficulty: 'advanced',
    question: 'What is XBRL and its role in financial reporting?',
    options: [
      'A programming language for EPM tools',
      'An XML-based language for standardized electronic financial reporting',
      'A database format for consolidation',
      'An Excel add-in for reporting'
    ],
    correctIndex: 1,
    explanation: 'XBRL (eXtensible Business Reporting Language) is a global standard for exchanging business information electronically.',
    topic: 'Reporting Standards'
  }
];

export const getQuestionsByCategory = (category?: 'budget' | 'consolidation' | 'kpi' | 'general') => {
  if (!category) return CONSOLIDATION_QUESTIONS;
  return CONSOLIDATION_QUESTIONS.filter(q => q.category === category);
};

export const getQuestionsByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
  return CONSOLIDATION_QUESTIONS.filter(q => q.difficulty === difficulty);
};

export const shuffleQuestions = (questions: QuizQuestion[], count: number = 10): QuizQuestion[] => {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
