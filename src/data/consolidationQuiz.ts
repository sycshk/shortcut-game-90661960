// Import per-tool question banks
import { ORACLE_FCCS_QUESTIONS } from './questions/oracle-fccs';
import { ORACLE_PBCS_QUESTIONS } from './questions/oracle-pbcs';
import { JEDOX_QUESTIONS } from './questions/jedox';
import { NETSUITE_QUESTIONS } from './questions/netsuite';
import { TAGETIK_QUESTIONS } from './questions/tagetik';
import { ANAPLAN_QUESTIONS } from './questions/anaplan';
import { WORKDAY_ADAPTIVE_QUESTIONS } from './questions/workday-adaptive';

export interface QuizQuestion {
  id: string;
  category: 'budget' | 'consolidation' | 'kpi' | 'general';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
  tool?: 'oracle_fccs' | 'oracle_pbcs' | 'jedox' | 'netsuite' | 'tagetik' | 'anaplan' | 'workday_adaptive';
}

// Tool-specific configuration
export const EPM_TOOL_CONFIG = {
  oracle_fccs: {
    label: 'Oracle FCCS',
    fullName: 'Oracle Financial Consolidation and Close Cloud Service',
    icon: '🔷',
    color: 'text-red-500',
    description: 'Financial consolidation, intercompany eliminations, multi-GAAP reporting'
  },
  oracle_pbcs: {
    label: 'Oracle PBCS',
    fullName: 'Oracle Planning and Budgeting Cloud Service',
    icon: '🔶',
    color: 'text-orange-500',
    description: 'Planning units, Smart View, business rules, driver-based planning'
  },
  jedox: {
    label: 'Jedox',
    fullName: 'Jedox EPM Platform',
    icon: '🟢',
    color: 'text-green-500',
    description: 'PALO technology, Excel-Plus approach, Integrator ETL'
  },
  netsuite: {
    label: 'NetSuite EPM',
    fullName: 'NetSuite Planning, Budgeting & Close Management',
    icon: '🟠',
    color: 'text-amber-500',
    description: 'NSPB, Period Close Checklist, elimination subsidiaries'
  },
  tagetik: {
    label: 'CCH Tagetik',
    fullName: 'Wolters Kluwer CCH Tagetik',
    icon: '🟣',
    color: 'text-purple-500',
    description: 'Analytic Information Hub, Matrix Designer, regulatory compliance'
  },
  anaplan: {
    label: 'Anaplan',
    fullName: 'Anaplan Connected Planning Platform',
    icon: '🔵',
    color: 'text-blue-500',
    description: 'Hyperblock engine, hub-and-spoke, DISCO methodology, modules & line items'
  },
  workday_adaptive: {
    label: 'Workday Adaptive',
    fullName: 'Workday Adaptive Planning',
    icon: '🟡',
    color: 'text-yellow-500',
    description: 'Cube sheets, modeled sheets, OfficeConnect, versions & dimensions'
  }
} as const;

export type EPMTool = keyof typeof EPM_TOOL_CONFIG;

// Core questions (non-tool-specific)
const CORE_QUESTIONS: QuizQuestion[] = [
  // ==========================================
  // FINANCIAL CONSOLIDATION
  // ==========================================
  
  // Consolidation - Beginner
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
    id: 'consol-ns-1',
    category: 'consolidation',
    difficulty: 'beginner',
    question: 'In NetSuite, what is an "Elimination Subsidiary"?',
    options: [
      'A subsidiary being divested',
      'A special subsidiary record used to post intercompany elimination journal entries',
      'A subsidiary with zero balance',
      'A foreign subsidiary excluded from consolidation'
    ],
    correctIndex: 1,
    explanation: 'In NetSuite, an Elimination Subsidiary is a special entity used to record intercompany elimination entries during the consolidation process.',
    topic: 'NetSuite Consolidation',
    tool: 'netsuite'
  },
  {
    id: 'consol-fccs-1',
    category: 'consolidation',
    difficulty: 'beginner',
    question: 'In Oracle FCCS, what does the Data Source dimension track?',
    options: [
      'The geographic origin of data',
      'The origin of data such as manual entry, data load, or journal input',
      'The database server location',
      'The user who entered the data'
    ],
    correctIndex: 1,
    explanation: 'The Data Source dimension in FCCS tracks how data was entered (e.g., FCCS_Data Input, FCCS_Managed Data, FCCS_Journal Input).',
    topic: 'Oracle FCCS',
    tool: 'oracle_fccs'
  },

  // Consolidation - Intermediate
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
    id: 'consol-fccs-2',
    category: 'consolidation',
    difficulty: 'intermediate',
    question: 'In Oracle FCCS, where do intercompany eliminations get posted?',
    options: [
      'To the parent entity directly',
      'To a Plug Account defined in the intercompany account metadata',
      'To a separate elimination database',
      'To retained earnings automatically'
    ],
    correctIndex: 1,
    explanation: 'FCCS posts intercompany eliminations to Plug Accounts specified in the account metadata, at the first common parent entity.',
    topic: 'Oracle FCCS',
    tool: 'oracle_fccs'
  },
  {
    id: 'consol-fccs-3',
    category: 'consolidation',
    difficulty: 'intermediate',
    question: 'What is CTA (Cumulative Translation Adjustment) in consolidation?',
    options: [
      'A tax calculation adjustment',
      'An account that captures foreign exchange differences from translating foreign subsidiaries',
      'A cost tracking account',
      'A consolidation timing adjustment'
    ],
    correctIndex: 1,
    explanation: 'CTA captures the cumulative gains/losses from translating foreign subsidiary financials into the parent\'s reporting currency.',
    topic: 'Currency Translation'
  },
  {
    id: 'consol-ns-2',
    category: 'consolidation',
    difficulty: 'intermediate',
    question: 'In NetSuite, what does the "Eliminate" checkbox on a GL account do?',
    options: [
      'Deletes the account from the chart of accounts',
      'Flags the account for automatic intercompany elimination during consolidation',
      'Removes the account from reports',
      'Zeros out the account balance'
    ],
    correctIndex: 1,
    explanation: 'The Eliminate checkbox marks an account for automatic reversal of intercompany transactions during the consolidation process.',
    topic: 'NetSuite Consolidation',
    tool: 'netsuite'
  },
  {
    id: 'consol-jedox-1',
    category: 'consolidation',
    difficulty: 'intermediate',
    question: 'What technology powers Jedox\'s multi-dimensional database?',
    options: [
      'Oracle Database',
      'PALO in-memory OLAP technology',
      'SQL Server',
      'MongoDB'
    ],
    correctIndex: 1,
    explanation: 'Jedox uses PALO, an in-memory, cell-oriented OLAP database that enables real-time data processing and multi-dimensional analysis.',
    topic: 'Jedox Technology',
    tool: 'jedox'
  },
  {
    id: 'consol-fccs-ownership',
    category: 'consolidation',
    difficulty: 'intermediate',
    question: 'In FCCS, what happens during the "Proportion" step of consolidation?',
    options: [
      'Data is loaded proportionally across periods',
      'Ownership percentages are applied to calculate parent\'s share of subsidiary values',
      'Accounts are divided into proportional segments',
      'Currency rates are proportioned across entities'
    ],
    correctIndex: 1,
    explanation: 'The Proportion step applies ownership percentages to calculate the parent company\'s share of each subsidiary\'s values.',
    topic: 'Oracle FCCS',
    tool: 'oracle_fccs'
  },
  {
    id: 'consol-tagetik-1',
    category: 'consolidation',
    difficulty: 'intermediate',
    question: 'In CCH Tagetik, what is the "Movement" dimension used for?',
    options: [
      'Tracking physical inventory movements',
      'Tracking changes in balance sheet accounts (opening, additions, disposals, closing)',
      'Recording staff movements between departments',
      'Managing data transfers between systems'
    ],
    correctIndex: 1,
    explanation: 'The Movement dimension in Tagetik tracks how balance sheet account values change over time (e.g., opening balance, additions, disposals, FX impact, closing balance).',
    topic: 'Tagetik Dimensions',
    tool: 'tagetik'
  },

  // Consolidation - Advanced
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
  {
    id: 'consol-fccs-4',
    category: 'consolidation',
    difficulty: 'advanced',
    question: 'Which two members of the FCCS Consolidation dimension bypass standard currency translation rules?',
    options: [
      'FCCS_Proportion and FCCS_Elimination',
      'FCCS_Rate Override and FCCS_Amount Override',
      'FCCS_Entity Input and FCCS_Translated',
      'FCCS_Journal and FCCS_Data'
    ],
    correctIndex: 1,
    explanation: 'FCCS_Rate Override allows a custom exchange rate, while FCCS_Amount Override specifies an exact translated amount, bypassing standard translation.',
    topic: 'Oracle FCCS',
    tool: 'oracle_fccs'
  },
  {
    id: 'consol-fccs-5',
    category: 'consolidation',
    difficulty: 'advanced',
    question: 'In Oracle FCCS, what is the standard flow of data during consolidation?',
    options: [
      'Elimination → Proportion → Translation → Input',
      'Entity Input → Translated Currency → Proportion → Elimination',
      'Proportion → Input → Elimination → Translation',
      'Translation → Elimination → Input → Proportion'
    ],
    correctIndex: 1,
    explanation: 'FCCS consolidation flows: Entity Input → Translated Currency (if applicable) → Proportion → Elimination.',
    topic: 'Oracle FCCS',
    tool: 'oracle_fccs'
  },
  {
    id: 'consol-ns-3',
    category: 'consolidation',
    difficulty: 'advanced',
    question: 'What is Multi-Book Accounting in NetSuite?',
    options: [
      'Managing multiple physical ledger books',
      'Maintaining parallel sets of records for different accounting standards (e.g., US GAAP and IFRS)',
      'Having multiple chart of accounts',
      'Running multiple fiscal years simultaneously'
    ],
    correctIndex: 1,
    explanation: 'Multi-Book Accounting allows a single transaction to be recorded differently across multiple books for different standards like US GAAP and IFRS.',
    topic: 'NetSuite Consolidation',
    tool: 'netsuite'
  },
  {
    id: 'consol-jedox-2',
    category: 'consolidation',
    difficulty: 'advanced',
    question: 'In Jedox\'s Financial Consolidation Model, which standards are supported for automated consolidation?',
    options: [
      'Only US GAAP',
      'IFRS, US GAAP, and local GAAPs',
      'Only IFRS',
      'Tax accounting standards only'
    ],
    correctIndex: 1,
    explanation: 'Jedox supports multiple accounting standards including IFRS, US GAAP, and various local GAAPs for automated consolidation.',
    topic: 'Jedox Consolidation',
    tool: 'jedox'
  },
  {
    id: 'consol-fccs-multigaap',
    category: 'consolidation',
    difficulty: 'advanced',
    question: 'In Oracle FCCS, what happens when you enable a Multi-GAAP application?',
    options: [
      'Two custom dimensions become available',
      'The Multi-GAAP dimension is created with FCCS_IFRS member auto-generated',
      'All entities must use IFRS',
      'Currency translation is disabled'
    ],
    correctIndex: 1,
    explanation: 'Enabling Multi-GAAP creates the Multi-GAAP dimension and automatically generates FCCS_IFRS member for additional GAAP adjustments.',
    topic: 'Oracle FCCS',
    tool: 'oracle_fccs'
  },
  {
    id: 'consol-fccs-icp',
    category: 'consolidation',
    difficulty: 'advanced',
    question: 'If no intercompany options are enabled when creating an FCCS application, what happens?',
    options: [
      'FCCS_No Intercompany member is used for all data',
      'Data can be stored by intercompany partner but no eliminations occur',
      'An extra custom dimension becomes available',
      'The ICP dimension is omitted entirely'
    ],
    correctIndex: 3,
    explanation: 'When no intercompany options are enabled during FCCS application creation, the ICP (Intercompany Partner) dimension is completely omitted.',
    topic: 'Oracle FCCS',
    tool: 'oracle_fccs'
  },
  {
    id: 'consol-tagetik-2',
    category: 'consolidation',
    difficulty: 'advanced',
    question: 'What is the Analytic Information Hub (AIH) in CCH Tagetik?',
    options: [
      'A reporting dashboard',
      'A high-performance engine for handling granular operational data with Data Transformation Packages',
      'A user authentication system',
      'A cloud storage solution'
    ],
    correctIndex: 1,
    explanation: 'The AIH is a high-performance engine that handles granular operational data and supports Data Transformation Packages for operations like analytical allocations.',
    topic: 'Tagetik Architecture',
    tool: 'tagetik'
  },
  {
    id: 'consol-tagetik-3',
    category: 'consolidation',
    difficulty: 'advanced',
    question: 'Which regulatory "Starter Kits" does CCH Tagetik provide out-of-the-box?',
    options: [
      'Only basic consolidation',
      'IFRS 17, Solvency II, IFRS 16, and BEPS Pillar Two',
      'Only tax reporting',
      'SOX compliance only'
    ],
    correctIndex: 1,
    explanation: 'Tagetik provides pre-packaged Starter Kits for complex regulatory requirements including IFRS 17 (insurance), Solvency II, IFRS 16 (leases), and BEPS Pillar Two (global minimum tax).',
    topic: 'Tagetik Compliance',
    tool: 'tagetik'
  },

  // ==========================================
  // BUDGET PLANNING
  // ==========================================

  // Budget - Beginner
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
    id: 'budget-pbcs-1',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is Oracle Smart View used for in PBCS?',
    options: [
      'Viewing PDF reports',
      'A Microsoft Office add-in for data entry, analysis, and rule execution',
      'Managing user security',
      'Configuring database connections'
    ],
    correctIndex: 1,
    explanation: 'Smart View is the "lifeblood" of Oracle EPM, enabling ad hoc analysis, data submission, and business rule execution directly from Excel.',
    topic: 'Oracle PBCS',
    tool: 'oracle_pbcs'
  },
  {
    id: 'budget-ns-1',
    category: 'budget',
    difficulty: 'beginner',
    question: 'How does NetSuite Planning and Budgeting (NSPB) integrate with NetSuite ERP?',
    options: [
      'Manual data export/import only',
      'Through NSPB Sync SuiteApp and EPM Connector using Saved Searches',
      'No integration is possible',
      'Through email notifications'
    ],
    correctIndex: 1,
    explanation: 'NSPB uses the NSPB Sync SuiteApp and EPM Connector to sync data via Saved Searches, enabling drill-through from EPM reports to NetSuite transactions.',
    topic: 'NetSuite EPM',
    tool: 'netsuite'
  },
  {
    id: 'budget-tagetik-1',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What Excel-based reporting tool does CCH Tagetik provide?',
    options: [
      'Power BI Connector',
      'Matrix Designer for dynamic, reusable report combinations',
      'Crystal Reports',
      'SSRS Integration'
    ],
    correctIndex: 1,
    explanation: 'The Matrix Designer is Tagetik\'s Excel-based tool for creating highly dynamic and reusable report combinations.',
    topic: 'Tagetik Reporting',
    tool: 'tagetik'
  },

  // Budget - Intermediate
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
    id: 'budget-pbcs-2',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'In Oracle PBCS, what is a "Planning Unit"?',
    options: [
      'A currency type',
      'The basic unit of a budget representing a specific department/scenario combination',
      'A measurement unit for data',
      'A report template'
    ],
    correctIndex: 1,
    explanation: 'A Planning Unit represents the basic unit of a budget and follows a Promotional Path (Under Review, Approved, etc.) through the Approvals process.',
    topic: 'Oracle PBCS',
    tool: 'oracle_pbcs'
  },
  {
    id: 'budget-pbcs-3',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is the difference between Business Rules and Member Formulas in Oracle EPM?',
    options: [
      'They are the same thing',
      'Business Rules can include Groovy scripting; Member Formulas are dynamic calculations in the outline',
      'Member Formulas are more powerful',
      'Business Rules are read-only'
    ],
    correctIndex: 1,
    explanation: 'Business Rules (managed via Calculation Manager) can include Groovy for complex logic, while Member Formulas calculate dynamically within the Essbase outline.',
    topic: 'Oracle PBCS',
    tool: 'oracle_pbcs'
  },
  {
    id: 'budget-jedox-1',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What makes Jedox unique in its approach to budgeting?',
    options: [
      'It only works with SAP',
      'Its "Excel-Plus" approach allowing Excel as a front-end while data is stored centrally',
      'It requires specialized programming skills',
      'It only supports annual budgets'
    ],
    correctIndex: 1,
    explanation: 'Jedox uses an "Excel-Plus" approach where users work in familiar Excel while data is stored in a central, multi-dimensional PALO database.',
    topic: 'Jedox Planning',
    tool: 'jedox'
  },
  {
    id: 'budget-ns-2',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is Predictive Planning in NetSuite Planning and Budgeting?',
    options: [
      'Manual forecasting based on gut feeling',
      'AI/ML algorithms that detect anomalies and generate forecasts from historical NetSuite data',
      'Copying last year\'s budget',
      'Planning based on competitor analysis'
    ],
    correctIndex: 1,
    explanation: 'NSPB\'s Predictive Planning uses AI/ML algorithms to analyze historical NetSuite data, detect anomalies, and generate intelligent forecasts.',
    topic: 'NetSuite EPM',
    tool: 'netsuite'
  },
  {
    id: 'budget-topdown',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is the key difference between top-down and bottom-up budgeting?',
    options: [
      'Top-down starts at the highest levels and allocates down; bottom-up aggregates from department level',
      'Top-down is faster but less accurate',
      'Bottom-up is only used in small companies',
      'They produce identical results'
    ],
    correctIndex: 0,
    explanation: 'Top-down budgeting starts with executive targets allocated downward, while bottom-up aggregates detailed departmental inputs upward.',
    topic: 'Budgeting Methods'
  },
  {
    id: 'budget-tagetik-2',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is the "Analytical Workspace" in CCH Tagetik?',
    options: [
      'A reporting dashboard',
      'A flexible area for defining custom analytical dimensions beyond standard system dimensions',
      'The login portal',
      'A file storage area'
    ],
    correctIndex: 1,
    explanation: 'The Analytical Workspace in Tagetik allows organizations to define unlimited custom and analytical dimensions for detailed operational planning.',
    topic: 'Tagetik Architecture',
    tool: 'tagetik'
  },

  // Budget - Advanced
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
  {
    id: 'budget-pbcs-4',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is "Smart Push" in Oracle PBCS?',
    options: [
      'Automatic email notifications',
      'Real-time data synchronization between BSO and ASO cubes',
      'Pushing data to external systems',
      'Automatic form submission'
    ],
    correctIndex: 1,
    explanation: 'Smart Push enables real-time data synchronization between Block Storage (BSO) and Aggregate Storage (ASO) cubes in Oracle EPM.',
    topic: 'Oracle PBCS',
    tool: 'oracle_pbcs'
  },
  {
    id: 'budget-pbcs-5',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What are Substitution Variables in Oracle PBCS used for?',
    options: [
      'Replacing user names in reports',
      'Making business rules dynamic across periods (e.g., &OEP_CurYr)',
      'Substituting missing data',
      'Replacing deprecated functions'
    ],
    correctIndex: 1,
    explanation: 'Substitution Variables like &OEP_CurYr make rules and reports dynamic by automatically adapting to the current period or year.',
    topic: 'Oracle PBCS',
    tool: 'oracle_pbcs'
  },
  {
    id: 'budget-epbcs-1',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What additional frameworks does Oracle EPBCS include compared to PBCS?',
    options: [
      'Only Financials',
      'Workforce Planning, Capital Asset Planning, and Project Financial Planning',
      'Only tax planning',
      'No additional frameworks'
    ],
    correctIndex: 1,
    explanation: 'EPBCS (Enterprise PBCS) adds out-of-the-box frameworks for Workforce, Capital Assets, and Projects beyond basic financial planning.',
    topic: 'Oracle EPM',
    tool: 'oracle_pbcs'
  },
  {
    id: 'budget-jedox-2',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is the Jedox Integrator used for?',
    options: [
      'User interface design',
      'ETL processes to extract data from ERPs like SAP, Oracle, and NetSuite',
      'Creating financial reports',
      'Managing user permissions'
    ],
    correctIndex: 1,
    explanation: 'The Jedox Integrator is a powerful ETL tool for extracting data from various sources (ERPs, databases) and loading it into Jedox cubes using Groovy scripts.',
    topic: 'Jedox Technology',
    tool: 'jedox'
  },
  {
    id: 'budget-pbcs-dataform',
    category: 'budget',
    difficulty: 'advanced',
    question: 'In Oracle PBCS, what are "Flex Forms"?',
    options: [
      'Forms that automatically resize',
      'Smart View forms that allow users to add/reorder rows while maintaining integrity',
      'Flexible currency conversion forms',
      'Forms for flexible budgeting only'
    ],
    correctIndex: 1,
    explanation: 'Flex Forms in Smart View allow users to add, reorder, and modify rows in data entry forms while maintaining the underlying form integrity.',
    topic: 'Oracle PBCS',
    tool: 'oracle_pbcs'
  },
  {
    id: 'budget-ns-3',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What naming convention must NetSuite Saved Searches use to integrate with NSPB?',
    options: [
      'Any name is acceptable',
      'Must start with prefix "customsearch_nspbcs"',
      'Must include the word "budget"',
      'Must be numbered sequentially'
    ],
    correctIndex: 1,
    explanation: 'NetSuite Saved Searches for NSPB integration must use the prefix "customsearch_nspbcs" for proper EPM Connector recognition.',
    topic: 'NetSuite EPM',
    tool: 'netsuite'
  },
  {
    id: 'budget-tagetik-3',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is a Data Transformation Package (DTP) in CCH Tagetik\'s AIH?',
    options: [
      'A data compression algorithm',
      'A configurable operation for tasks like analytical allocation using custom drivers',
      'A data encryption method',
      'A backup procedure'
    ],
    correctIndex: 1,
    explanation: 'DTPs in the Analytic Information Hub perform operations like analytical allocations (e.g., allocating overhead costs using custom drivers) on granular data.',
    topic: 'Tagetik AIH',
    tool: 'tagetik'
  },
  {
    id: 'budget-tagetik-4',
    category: 'budget',
    difficulty: 'advanced',
    question: 'Which ERP has a native connector in CCH Tagetik?',
    options: [
      'Oracle E-Business Suite only',
      'SAP S/4HANA',
      'Microsoft Dynamics only',
      'QuickBooks'
    ],
    correctIndex: 1,
    explanation: 'CCH Tagetik has a native SAP S/4HANA connector, plus RESTful/OData APIs for connecting with other systems like Workday.',
    topic: 'Tagetik Integration',
    tool: 'tagetik'
  },

  // ==========================================
  // KPI DEVELOPMENT
  // ==========================================

  // KPI - Beginner
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
    id: 'kpi-variance',
    category: 'kpi',
    difficulty: 'beginner',
    question: 'What is variance analysis in the context of KPIs?',
    options: [
      'Analyzing data storage variations',
      'Comparing actual results to planned or budgeted figures to identify differences',
      'Measuring system performance variations',
      'Analyzing employee behavior differences'
    ],
    correctIndex: 1,
    explanation: 'Variance analysis compares actual performance against budget or plan to identify and explain the differences (favorable or unfavorable).',
    topic: 'Performance Analysis'
  },

  // KPI - Intermediate
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
    id: 'kpi-dso',
    category: 'kpi',
    difficulty: 'intermediate',
    question: 'What does DSO (Days Sales Outstanding) measure?',
    options: [
      'Days until product shipment',
      'Average number of days to collect receivables after a sale',
      'Days of stock remaining',
      'Duration of sales campaigns'
    ],
    correctIndex: 1,
    explanation: 'DSO measures the average number of days it takes a company to collect payment after a sale, indicating collection efficiency.',
    topic: 'Financial KPIs'
  },
  {
    id: 'kpi-cac-ltv',
    category: 'kpi',
    difficulty: 'intermediate',
    question: 'What is the relationship between CAC and LTV in SaaS metrics?',
    options: [
      'They should be equal',
      'LTV (Customer Lifetime Value) should significantly exceed CAC (Customer Acquisition Cost)',
      'CAC should always be higher',
      'They are unrelated metrics'
    ],
    correctIndex: 1,
    explanation: 'A healthy SaaS business typically has LTV:CAC ratio of 3:1 or higher, meaning customer lifetime value should be 3x the acquisition cost.',
    topic: 'Business KPIs'
  },

  // KPI - Advanced
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
  {
    id: 'kpi-eva',
    category: 'kpi',
    difficulty: 'advanced',
    question: 'What is Economic Value Added (EVA)?',
    options: [
      'Total revenue minus total costs',
      'Net operating profit after taxes minus the capital charge (cost of capital)',
      'Market value of equity',
      'Free cash flow per share'
    ],
    correctIndex: 1,
    explanation: 'EVA = NOPAT - (Invested Capital × WACC). It measures true economic profit by accounting for the cost of capital employed.',
    topic: 'Value-Based Metrics'
  },
  {
    id: 'kpi-hyperauto',
    category: 'kpi',
    difficulty: 'advanced',
    question: 'How is AI/hyperautomation being applied to variance analysis in modern EPM?',
    options: [
      'Only for generating charts',
      'Automatically generating natural language explanations for variances and anomalies',
      'Replacing all human analysts',
      'Only for data entry automation'
    ],
    correctIndex: 1,
    explanation: 'Modern EPM tools use AI to automatically analyze variances, detect anomalies, and generate natural language explanations for stakeholders.',
    topic: 'AI in EPM'
  },

  // ==========================================
  // GENERAL EPM
  // ==========================================

  // General - Beginner
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
    id: 'gen-olap',
    category: 'general',
    difficulty: 'beginner',
    question: 'What is OLAP in the context of EPM systems?',
    options: [
      'Online Liability Accounting Process',
      'Online Analytical Processing - multi-dimensional data analysis',
      'Operational Legal Audit Procedure',
      'Offline Application Protocol'
    ],
    correctIndex: 1,
    explanation: 'OLAP (Online Analytical Processing) enables multi-dimensional analysis of data, allowing users to slice and dice across dimensions like time, product, and geography.',
    topic: 'EPM Technology'
  },
  {
    id: 'gen-dim',
    category: 'general',
    difficulty: 'beginner',
    question: 'In EPM, what is a "dimension"?',
    options: [
      'The size of a report',
      'A category for organizing and analyzing data (e.g., Time, Account, Entity)',
      'The number of users',
      'The database size'
    ],
    correctIndex: 1,
    explanation: 'Dimensions are categories like Time, Account, Entity, and Scenario that define how data is organized and analyzed in multi-dimensional databases.',
    topic: 'EPM Concepts'
  },
  {
    id: 'gen-tagetik-1',
    category: 'general',
    difficulty: 'beginner',
    question: 'What are the standard system dimensions in CCH Tagetik?',
    options: [
      'Only Account and Entity',
      'Period, Scenario, Currency, Entity, Account, and Category',
      'Only Time and Version',
      'Custom dimensions only'
    ],
    correctIndex: 1,
    explanation: 'Tagetik\'s standard system dimensions include Period, Scenario, Currency, Entity, Account, and Category, with the ability to add unlimited custom dimensions.',
    topic: 'Tagetik Dimensions',
    tool: 'tagetik'
  },

  // General - Intermediate
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
    id: 'gen-cube',
    category: 'general',
    difficulty: 'intermediate',
    question: 'What is a "cube" in EPM database terminology?',
    options: [
      'A 3D visualization chart',
      'A multi-dimensional data structure storing values at dimension intersections',
      'A backup storage format',
      'A user interface component'
    ],
    correctIndex: 1,
    explanation: 'A cube is a multi-dimensional data structure where values are stored at the intersection of dimensions (e.g., Sales for January, Product A, Region East).',
    topic: 'EPM Technology'
  },
  {
    id: 'gen-bso-aso',
    category: 'general',
    difficulty: 'intermediate',
    question: 'What is the difference between BSO and ASO in Oracle Essbase?',
    options: [
      'BSO is for budgets, ASO is for actuals',
      'BSO (Block Storage) supports write-back; ASO (Aggregate Storage) is optimized for large-scale reporting',
      'ASO is newer and replaces BSO',
      'They are different compression formats'
    ],
    correctIndex: 1,
    explanation: 'BSO supports data input and calculations; ASO handles large sparse datasets for reporting. PBCS often uses both together with Smart Push.',
    topic: 'Oracle Technology',
    tool: 'oracle_pbcs'
  },
  {
    id: 'gen-ns-close',
    category: 'general',
    difficulty: 'intermediate',
    question: 'What is the Period Close Checklist in NetSuite?',
    options: [
      'A list of accounting periods',
      'A role-based workflow dashboard monitoring close tasks like data verification and certification',
      'A list of fiscal year settings',
      'A report of closed transactions'
    ],
    correctIndex: 1,
    explanation: 'The Period Close Checklist is a dashboard with role-based tasks for the financial close, tracking activities like data collection, verification, and certification.',
    topic: 'NetSuite Close Management',
    tool: 'netsuite'
  },
  {
    id: 'gen-fdm',
    category: 'general',
    difficulty: 'intermediate',
    question: 'What is Data Management (formerly FDMEE) in Oracle EPM?',
    options: [
      'Database backup utility',
      'A data loading tool using Import, Validate, Export, and Check workflow',
      'User management console',
      'Report distribution system'
    ],
    correctIndex: 1,
    explanation: 'Data Management handles data loading from various sources (Oracle Financials Cloud, HCM Cloud, flat files) using a workflow of Import, Validate, Export, and Check.',
    topic: 'Oracle EPM',
    tool: 'oracle_pbcs'
  },
  {
    id: 'gen-tagetik-2',
    category: 'general',
    difficulty: 'intermediate',
    question: 'What is "Intelligent Disclosure" in CCH Tagetik?',
    options: [
      'AI-powered data validation',
      'Integration linking consolidated data directly to Microsoft Word and PowerPoint for board reporting',
      'Automatic audit trail generation',
      'Smart data masking'
    ],
    correctIndex: 1,
    explanation: 'Intelligent Disclosure integrates consolidated financial data directly with Microsoft Word and PowerPoint for seamless board and regulatory reporting.',
    topic: 'Tagetik Reporting',
    tool: 'tagetik'
  },

  // General - Advanced
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
  },
  {
    id: 'gen-sdm',
    category: 'general',
    difficulty: 'advanced',
    question: 'What is the Supplemental Data Manager in Oracle FCCS?',
    options: [
      'A backup system',
      'A tool for collecting supporting documentation for financial statements and footnotes',
      'A secondary database',
      'A data validation tool'
    ],
    correctIndex: 1,
    explanation: 'Supplemental Data Manager collects supporting documentation (invoices, receipts) to build comprehensive statement balances and financial footnotes.',
    topic: 'Oracle FCCS',
    tool: 'oracle_fccs'
  },
  {
    id: 'gen-jedox-twin',
    category: 'general',
    difficulty: 'advanced',
    question: 'What is a "Digital Business Twin" in Jedox?',
    options: [
      'A backup of the database',
      'A dynamic model replicating business operations for scenario analysis and forecasting',
      'A duplicate user account',
      'A mirrored server'
    ],
    correctIndex: 1,
    explanation: 'Jedox\'s Digital Business Twin creates a dynamic replica of business operations, enabling real-time scenario modeling and what-if analysis.',
    topic: 'Jedox Technology',
    tool: 'jedox'
  },
  {
    id: 'gen-audit',
    category: 'general',
    difficulty: 'advanced',
    question: 'Why is segregation of duties important in EPM systems?',
    options: [
      'It makes work easier',
      'It ensures no single person can both make and approve changes, preventing fraud',
      'It reduces system load',
      'It improves data entry speed'
    ],
    correctIndex: 1,
    explanation: 'Segregation of duties is a key internal control ensuring that critical functions (input, approval, review) are performed by different individuals to prevent fraud.',
    topic: 'EPM Governance'
  },
  {
    id: 'gen-fccs-security',
    category: 'general',
    difficulty: 'advanced',
    question: 'By default, security access is set to "None" for which three dimensions in Oracle FCCS?',
    options: [
      'Year, Period, and Scenario',
      'Entity, Account, and Data Source',
      'Currency, Movement, and View',
      'Consolidation, ICP, and Multi-GAAP'
    ],
    correctIndex: 1,
    explanation: 'Entity, Account, and Data Source dimensions have security set to "None" by default, requiring explicit access grants for users.',
    topic: 'Oracle FCCS Security',
    tool: 'oracle_fccs'
  },
  {
    id: 'gen-ns-tba',
    category: 'general',
    difficulty: 'advanced',
    question: 'How does Oracle EPM Cloud connect to NetSuite for data integration?',
    options: [
      'Direct database connection',
      'Token-Based Authentication (TBA) and Saved Searches',
      'Manual file uploads only',
      'Email-based data transfer'
    ],
    correctIndex: 1,
    explanation: 'Oracle EPM Cloud connects to NetSuite using Token-Based Authentication (TBA) and retrieves data via Saved Searches with the "customsearch_nspbcs" prefix.',
    topic: 'NetSuite Integration',
    tool: 'netsuite'
  },
  {
    id: 'gen-groovy',
    category: 'general',
    difficulty: 'advanced',
    question: 'What is Groovy used for in Oracle EPM and Jedox?',
    options: [
      'User interface design',
      'Scripting complex business logic and calculations in business rules',
      'Database administration',
      'Network configuration'
    ],
    correctIndex: 1,
    explanation: 'Groovy is a scripting language used in Oracle EPM Calculation Manager and Jedox Integrator for implementing complex business logic and ETL processes.',
    topic: 'EPM Technology'
  },
  {
    id: 'gen-tagetik-3',
    category: 'general',
    difficulty: 'advanced',
    question: 'What secure protocol does CCH Tagetik recommend for connecting to external REST services?',
    options: [
      'Basic Authentication',
      'OAuth 2.0 using access tokens',
      'API Keys only',
      'NTLM Authentication'
    ],
    correctIndex: 1,
    explanation: 'Tagetik recommends OAuth 2.0 with access tokens for secure connections to external REST services and APIs.',
    topic: 'Tagetik Security',
    tool: 'tagetik'
  },
  {
    id: 'gen-tagetik-4',
    category: 'general',
    difficulty: 'advanced',
    question: 'What is CCH Tagetik\'s key differentiator compared to Oracle FCCS?',
    options: [
      'Lower cost',
      'Stronger focus on specialized regulatory Starter Kits (IFRS 17, Solvency II, BEPS) and native SAP integration',
      'Better Excel support',
      'More users supported'
    ],
    correctIndex: 1,
    explanation: 'Tagetik differentiates with pre-built regulatory Starter Kits for complex standards (IFRS 17, Solvency II, BEPS Pillar Two) and native SAP S/4HANA integration.',
    topic: 'EPM Comparison',
    tool: 'tagetik'
  },
  {
    id: 'gen-tagetik-5',
    category: 'general',
    difficulty: 'advanced',
    question: 'What does the "Dataset" concept represent in CCH Tagetik?',
    options: [
      'A backup copy of data',
      'A defined collection of data within the Analytical Workspace organized by dimensions',
      'An export file format',
      'A user group'
    ],
    correctIndex: 1,
    explanation: 'Datasets in Tagetik are defined data collections within the Analytical Workspace, organized by the selected dimensions and aggregation structures.',
    topic: 'Tagetik Architecture',
    tool: 'tagetik'
  },

  // ==========================================
  // ANAPLAN QUESTIONS
  // ==========================================
  
  // Anaplan - Beginner
  {
    id: 'anaplan-1',
    category: 'general',
    difficulty: 'beginner',
    question: 'What is the core calculation engine behind Anaplan?',
    options: [
      'Oracle Essbase',
      'Hyperblock - a proprietary in-memory engine',
      'Microsoft OLAP Services',
      'SAP HANA'
    ],
    correctIndex: 1,
    explanation: 'Anaplan uses its proprietary Hyperblock engine, which performs incremental calculations updating only cells affected by changes.',
    topic: 'Anaplan Architecture',
    tool: 'anaplan'
  },
  {
    id: 'anaplan-2',
    category: 'budget',
    difficulty: 'beginner',
    question: 'In Anaplan, what is the relationship between a Workspace and a Model?',
    options: [
      'They are the same thing',
      'Workspaces are storage areas; Models contain business logic (modules, lists, dashboards)',
      'Models contain Workspaces',
      'Workspaces are for users; Models are for admins'
    ],
    correctIndex: 1,
    explanation: 'Workspaces are the tenant storage areas, while Models are where the actual business logic, modules, lists, and dashboards reside.',
    topic: 'Anaplan Structure',
    tool: 'anaplan'
  },
  {
    id: 'anaplan-3',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is a "Module" in Anaplan?',
    options: [
      'A user interface component',
      'The primary calculation container where data is stored against dimensions',
      'A reporting template',
      'A security role'
    ],
    correctIndex: 1,
    explanation: 'Modules are the primary calculation engine in Anaplan where data is stored against dimensions like Time, Versions, and Lists.',
    topic: 'Anaplan Modules',
    tool: 'anaplan'
  },
  {
    id: 'anaplan-4',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What are "Line Items" in Anaplan?',
    options: [
      'Rows in a report',
      'The variables/calculations stored in a module (e.g., Revenue, Cost)',
      'User comments',
      'List members'
    ],
    correctIndex: 1,
    explanation: 'Line Items are the variables or calculations within a module, such as Revenue, Quantity, or Price, that define what data is being tracked.',
    topic: 'Anaplan Line Items',
    tool: 'anaplan'
  },

  // Anaplan - Intermediate
  {
    id: 'anaplan-5',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is the "Hub-and-Spoke" architecture in Anaplan?',
    options: [
      'A network topology for servers',
      'A central Data Hub with connected specialized Spoke models for specific functions',
      'A user interface pattern',
      'A backup and recovery strategy'
    ],
    correctIndex: 1,
    explanation: 'Hub-and-Spoke uses a central Data Hub as the single source of truth for master data, synced to specialized Spoke models for different planning functions.',
    topic: 'Anaplan Architecture',
    tool: 'anaplan'
  },
  {
    id: 'anaplan-6',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What does the DISCO methodology stand for in Anaplan best practices?',
    options: [
      'Data, Integration, Security, Compliance, Optimization',
      'Data, Input, System, Calculation, Output',
      'Design, Implement, Support, Configure, Operate',
      'Dimension, Import, Structure, Calculate, Output'
    ],
    correctIndex: 1,
    explanation: 'DISCO (Data, Input, System, Calculation, Output) is the standard methodology for organizing Anaplan modules for optimal performance and logic clarity.',
    topic: 'Anaplan Best Practices',
    tool: 'anaplan'
  },
  {
    id: 'anaplan-7',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is "Sparsity" in the context of Anaplan model optimization?',
    options: [
      'Empty cells in a report',
      'The ratio of empty to populated cells, which impacts performance when high',
      'A data compression technique',
      'A security restriction'
    ],
    correctIndex: 1,
    explanation: 'Sparsity refers to empty cells in dimensions. High sparsity means many empty combinations, which can waste memory and slow calculations.',
    topic: 'Anaplan Performance',
    tool: 'anaplan'
  },
  {
    id: 'anaplan-8',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is "Progressive Disclosure" in Anaplan UX design?',
    options: [
      'Gradually revealing more complex features to new users',
      'Showing detailed transactional data in separate models while surfacing key metrics in the main app',
      'Releasing new features in phases',
      'A security escalation process'
    ],
    correctIndex: 1,
    explanation: 'Progressive Disclosure allows detailed data to remain in separate models while key metrics are surfaced on unified pages in the New User Experience (NUX).',
    topic: 'Anaplan UX',
    tool: 'anaplan'
  },
  {
    id: 'anaplan-9',
    category: 'kpi',
    difficulty: 'intermediate',
    question: 'How should variance analysis be structured in Anaplan to optimize performance?',
    options: [
      'Create a separate model for variances',
      'Use Line Item Subsets instead of the Versions dimension to avoid excessive sparsity',
      'Add a custom variance dimension',
      'Calculate variances in Excel'
    ],
    correctIndex: 1,
    explanation: 'For variance analysis, using Line Item Subsets for versions avoids adding sparsity that comes with using the full Versions dimension.',
    topic: 'Anaplan Optimization',
    tool: 'anaplan'
  },

  // Anaplan - Advanced
  {
    id: 'anaplan-10',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is "Time Ranges" in Anaplan and why is it used?',
    options: [
      'Date formatting options',
      'Allowing different modules to use different time scales (e.g., 1-year vs 5-year) to optimize performance',
      'Time zone configurations',
      'Historical data retention settings'
    ],
    correctIndex: 1,
    explanation: 'Time Ranges allow different modules to operate on different time scales, enabling a 1-year operational forecast alongside a 5-year strategic plan without performance penalty.',
    topic: 'Anaplan Time',
    tool: 'anaplan'
  },
  {
    id: 'anaplan-11',
    category: 'general',
    difficulty: 'advanced',
    question: 'What is Dynamic Cell Access (DCA) in Anaplan?',
    options: [
      'Dynamic data loading',
      'Cell-level security allowing Read, Write, or No Access based on Boolean logic',
      'Automatic cell formatting',
      'Real-time collaboration features'
    ],
    correctIndex: 1,
    explanation: 'DCA provides advanced cell-level security, allowing different access (Read, Write, No Access) based on Boolean conditions in the model.',
    topic: 'Anaplan Security',
    tool: 'anaplan'
  },
  {
    id: 'anaplan-12',
    category: 'general',
    difficulty: 'advanced',
    question: 'What is ALM (Application Lifecycle Management) in Anaplan?',
    options: [
      'A third-party integration tool',
      'Framework for managing Development, Test, and Production versions of models',
      'An API management system',
      'User license management'
    ],
    correctIndex: 1,
    explanation: 'ALM provides a framework for managing model versions across Development, Test, and Production environments with structured deployment processes.',
    topic: 'Anaplan ALM',
    tool: 'anaplan'
  },
  {
    id: 'anaplan-13',
    category: 'budget',
    difficulty: 'advanced',
    question: 'Why should nested IF statements be avoided in Anaplan formulas?',
    options: [
      'They are not supported',
      'They impact performance; Boolean logic expressions are preferred',
      'They cause security issues',
      'They cannot handle null values'
    ],
    correctIndex: 1,
    explanation: 'Nested IFs are performance-intensive. Anaplan best practice recommends using Boolean logic expressions for better calculation efficiency.',
    topic: 'Anaplan Formulas',
    tool: 'anaplan'
  },
  {
    id: 'anaplan-14',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is the primary benefit of using a Data Hub in an Anaplan ecosystem?',
    options: [
      'Faster report generation',
      'Centralizing master data and reducing redundancy across spoke models',
      'Better user interface',
      'Lower licensing costs'
    ],
    correctIndex: 1,
    explanation: 'The Data Hub centralizes master data (lists, hierarchies) as a single source of truth, reducing redundancy and ensuring consistency across all spoke models.',
    topic: 'Anaplan Data Hub',
    tool: 'anaplan'
  },

  // ==========================================
  // WORKDAY ADAPTIVE PLANNING QUESTIONS
  // ==========================================
  
  // Workday Adaptive - Beginner
  {
    id: 'adaptive-1',
    category: 'general',
    difficulty: 'beginner',
    question: 'What is Workday Adaptive Planning (formerly Adaptive Insights)?',
    options: [
      'An HR management system',
      'A cloud-based EPM solution for budgeting, forecasting, and reporting',
      'A CRM platform',
      'An ERP system'
    ],
    correctIndex: 1,
    explanation: 'Workday Adaptive Planning is a cloud-based EPM solution that supports budgeting, forecasting, and reporting with intuitive modeling capabilities.',
    topic: 'Adaptive Basics',
    tool: 'workday_adaptive'
  },
  {
    id: 'adaptive-2',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is a "Cube Sheet" in Workday Adaptive Planning?',
    options: [
      'A 3D visualization',
      'A multi-dimensional grid for entering data across several dimensions (Product, Region, Channel)',
      'A pivot table export',
      'A backup file format'
    ],
    correctIndex: 1,
    explanation: 'Cube Sheets allow multi-dimensional data input and analysis across dimensions like Product, Region, or Channel, enabling users to pivot and filter dynamically.',
    topic: 'Adaptive Sheets',
    tool: 'workday_adaptive'
  },
  {
    id: 'adaptive-3',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is a "Model Sheet" (or Modeled Sheet) in Adaptive Planning?',
    options: [
      'A template for new models',
      'Row-level transactional planning for items like employees or assets',
      'A summary sheet',
      'An import configuration'
    ],
    correctIndex: 1,
    explanation: 'Model Sheets enable granular, row-level planning like Workforce or Capital Planning, where each row represents a unique record (e.g., an individual employee).',
    topic: 'Adaptive Sheets',
    tool: 'workday_adaptive'
  },
  {
    id: 'adaptive-4',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is OfficeConnect in Workday Adaptive Planning?',
    options: [
      'An email integration',
      'A Microsoft Office add-in for creating live-linked financial reports',
      'A calendar sync tool',
      'A file sharing service'
    ],
    correctIndex: 1,
    explanation: 'OfficeConnect is an add-in for Excel, Word, and PowerPoint that creates and updates financial reports using live Adaptive Planning data.',
    topic: 'Adaptive Reporting',
    tool: 'workday_adaptive'
  },

  // Workday Adaptive - Intermediate
  {
    id: 'adaptive-5',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'How does versioning work in Adaptive Planning?',
    options: [
      'Only one version is allowed',
      'Versions represent different scenarios (Actuals, Budget, Forecast, What-if) for comparison',
      'Versions are for backup purposes only',
      'Each user has their own version'
    ],
    correctIndex: 1,
    explanation: 'Versioning creates multiple iterations of budgets/forecasts representing different scenarios like Best Case, Worst Case, or Actuals for comparison.',
    topic: 'Adaptive Versions',
    tool: 'workday_adaptive'
  },
  {
    id: 'adaptive-6',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What are "Levels" in Workday Adaptive Planning?',
    options: [
      'User permission tiers',
      'Organizational hierarchy units (entities, departments, cost centers)',
      'Data quality ratings',
      'Calculation precedence'
    ],
    correctIndex: 1,
    explanation: 'Levels represent the organizational hierarchy structure in Adaptive, such as Departments, Cost Centers, or Business Units.',
    topic: 'Adaptive Hierarchy',
    tool: 'workday_adaptive'
  },
  {
    id: 'adaptive-7',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is the difference between a Standard Account and a Modeled Account?',
    options: [
      'No difference',
      'Standard accounts are for aggregated cube data; Modeled accounts enable row-level customization',
      'Standard is newer than Modeled',
      'Modeled accounts are read-only'
    ],
    correctIndex: 1,
    explanation: 'Standard accounts are used in cube sheets for aggregated data, while Modeled accounts enable detailed row-level planning and calculations.',
    topic: 'Adaptive Accounts',
    tool: 'workday_adaptive'
  },
  {
    id: 'adaptive-8',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What are "Assumptions" in an Adaptive Planning model?',
    options: [
      'Default values for missing data',
      'User-defined variables (inflation rates, exchange rates) that influence formulas',
      'Security assumptions',
      'Performance benchmarks'
    ],
    correctIndex: 1,
    explanation: 'Assumptions are user-defined variables like inflation rates or headcount growth that influence calculations, improving model flexibility.',
    topic: 'Adaptive Modeling',
    tool: 'workday_adaptive'
  },
  {
    id: 'adaptive-9',
    category: 'general',
    difficulty: 'intermediate',
    question: 'How does Adaptive Planning support cross-departmental collaboration?',
    options: [
      'Email notifications only',
      'Real-time data sharing, workflow controls, and role-based access',
      'Separate databases per department',
      'Manual data exports'
    ],
    correctIndex: 1,
    explanation: 'Adaptive supports collaboration through real-time data sharing, workflow controls for approvals, and role-based access ensuring alignment across teams.',
    topic: 'Adaptive Collaboration',
    tool: 'workday_adaptive'
  },

  // Workday Adaptive - Advanced
  {
    id: 'adaptive-10',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What are "Alternate Hierarchies" in Workday Adaptive Planning?',
    options: [
      'Backup hierarchy configurations',
      'Different rollup structures for the same data (e.g., Functional vs Legal) without duplication',
      'User-specific views',
      'Historical hierarchy versions'
    ],
    correctIndex: 1,
    explanation: 'Alternate Hierarchies allow data to be rolled up in different ways (Functional, Legal, Regional) without duplicating the underlying data.',
    topic: 'Adaptive Advanced',
    tool: 'workday_adaptive'
  },
  {
    id: 'adaptive-11',
    category: 'general',
    difficulty: 'advanced',
    question: 'How does Workday Adaptive Planning support Integrated Business Planning (IBP)?',
    options: [
      'It only supports financial planning',
      'Unified platform connecting financial, operational, workforce, and sales plans with real-time sync',
      'Through third-party integrations only',
      'IBP is not supported'
    ],
    correctIndex: 1,
    explanation: 'Adaptive provides a unified platform connecting financial, operational, workforce, and sales plans through shared models and real-time data synchronization.',
    topic: 'Adaptive IBP',
    tool: 'workday_adaptive'
  },
  {
    id: 'adaptive-12',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is driver-based modeling in Workday Adaptive Planning?',
    options: [
      'Planning focused on vehicle fleets',
      'Using operational drivers (volume, headcount, rates) to calculate financial outcomes',
      'A database driver configuration',
      'Manual data entry process'
    ],
    correctIndex: 1,
    explanation: 'Driver-based modeling links operational assumptions (headcount, unit prices, churn rates) to financial outcomes for more accurate and flexible forecasting.',
    topic: 'Adaptive Driver Modeling',
    tool: 'workday_adaptive'
  },
  {
    id: 'adaptive-13',
    category: 'general',
    difficulty: 'advanced',
    question: 'Which sheet type allows you to delete the sheet without losing the underlying account data?',
    options: [
      'Cube Sheet',
      'Model Sheet',
      'Standard Sheet',
      'Dashboard Sheet'
    ],
    correctIndex: 2,
    explanation: 'Standard Sheets can be deleted without affecting the underlying accounts because data is tied to accounts, not the sheet itself.',
    topic: 'Adaptive Architecture',
    tool: 'workday_adaptive'
  },
  {
    id: 'adaptive-14',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What tool creates dynamic, refreshable board decks in PowerPoint using Adaptive data?',
    options: [
      'Adaptive Reports',
      'OfficeConnect',
      'Smart View',
      'Tableau Connector'
    ],
    correctIndex: 1,
    explanation: 'OfficeConnect extends to PowerPoint, enabling dynamic board decks that automatically refresh with the latest Adaptive Planning data.',
    topic: 'Adaptive Reporting',
    tool: 'workday_adaptive'
  },
  {
    id: 'adaptive-15',
    category: 'general',
    difficulty: 'advanced',
    question: 'How are Calculated Accounts used in Workday Adaptive Planning?',
    options: [
      'For manual data entry only',
      'To derive values using formulas based on other accounts or assumptions',
      'For historical data storage',
      'As placeholders for future data'
    ],
    correctIndex: 1,
    explanation: 'Calculated Accounts derive their values from formulas referencing other accounts, assumptions, or dimensions, enabling dynamic computed metrics.',
    topic: 'Adaptive Calculations',
    tool: 'workday_adaptive'
  },

  // ==========================================
  // ADDITIONAL ORACLE FCCS QUESTIONS
  // ==========================================
  {
    id: 'fccs-new-1',
    category: 'consolidation',
    difficulty: 'beginner',
    question: 'In Oracle FCCS, what is the purpose of the "View" dimension?',
    options: [
      'To control user interface themes',
      'To distinguish between Periodic and Year-to-Date (YTD) data perspectives',
      'To filter report layouts',
      'To manage dashboard views'
    ],
    correctIndex: 1,
    explanation: 'The View dimension in FCCS allows you to see data in Periodic (single period) or YTD (cumulative) perspectives.',
    topic: 'Oracle FCCS',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-new-2',
    category: 'consolidation',
    difficulty: 'intermediate',
    question: 'What is the "Consol Dim" member used for in FCCS?',
    options: [
      'To consolidate databases',
      'To control how data is consolidated (Proportion, Elimination, Contribution)',
      'To manage console access',
      'To configure dimension security'
    ],
    correctIndex: 1,
    explanation: 'The Consolidation dimension controls data flow during consolidation including Proportion, Elimination, and Contribution members.',
    topic: 'Oracle FCCS',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-new-3',
    category: 'consolidation',
    difficulty: 'intermediate',
    question: 'In FCCS, what does FCCS_No Intercompany member represent?',
    options: [
      'Transactions with no value',
      'Data that is not associated with any intercompany partner',
      'Blocked intercompany transactions',
      'External customer transactions'
    ],
    correctIndex: 1,
    explanation: 'FCCS_No Intercompany is used when data is not an intercompany transaction and does not require partner matching or elimination.',
    topic: 'Oracle FCCS',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-new-4',
    category: 'consolidation',
    difficulty: 'advanced',
    question: 'What is the purpose of Configurable Consolidation Rules in FCCS?',
    options: [
      'To define user access rules',
      'To create custom consolidation logic beyond standard ownership/elimination processing',
      'To configure report formatting',
      'To set up data validation rules'
    ],
    correctIndex: 1,
    explanation: 'Configurable Consolidation Rules allow custom Groovy-based logic for complex consolidation requirements beyond standard processing.',
    topic: 'Oracle FCCS',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-new-5',
    category: 'consolidation',
    difficulty: 'advanced',
    question: 'In FCCS Ownership Management, what happens when you run "Calculate Ownership"?',
    options: [
      'It calculates dividends',
      'It computes effective ownership percentages based on direct/indirect holdings and applies to consolidation',
      'It transfers ownership to new entities',
      'It validates ownership documents'
    ],
    correctIndex: 1,
    explanation: 'Calculate Ownership computes effective ownership percentages considering direct and indirect holdings, which are then used during the Proportion consolidation step.',
    topic: 'Oracle FCCS',
    tool: 'oracle_fccs'
  },

  // ==========================================
  // ADDITIONAL ORACLE PBCS QUESTIONS
  // ==========================================
  {
    id: 'pbcs-new-1',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is "Sandboxing" in Oracle PBCS?',
    options: [
      'Creating test databases',
      'Private workspaces for users to test scenarios before committing to the main plan',
      'Database security isolation',
      'Backup process'
    ],
    correctIndex: 1,
    explanation: 'Sandboxing provides private workspaces where planners can model what-if scenarios without affecting the main plan until ready to publish.',
    topic: 'Oracle PBCS',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-new-2',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is a "Form" in Oracle PBCS?',
    options: [
      'A paper document',
      'A web-based grid interface for data entry and viewing multidimensional data',
      'A report template',
      'A user registration screen'
    ],
    correctIndex: 1,
    explanation: 'Forms are the primary data entry and viewing interface in PBCS, displaying multidimensional data in a grid layout.',
    topic: 'Oracle PBCS',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-new-3',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'In Oracle PBCS, what does "Substitution Variable" allow you to do?',
    options: [
      'Replace user names',
      'Create dynamic references to frequently changing values like current month or year',
      'Substitute currency values',
      'Replace dimension members'
    ],
    correctIndex: 1,
    explanation: 'Substitution Variables are global placeholders for values that change regularly, like &CurMonth or &CurYear, used in reports and calculations.',
    topic: 'Oracle PBCS',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-new-4',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is the purpose of "Spread Patterns" in PBCS?',
    options: [
      'To distribute data across charts',
      'To automatically allocate values across time periods based on predefined patterns',
      'To spread user access rights',
      'To replicate databases'
    ],
    correctIndex: 1,
    explanation: 'Spread Patterns allow planners to distribute annual targets across months using patterns like even spread, seasonal, or custom profiles.',
    topic: 'Oracle PBCS',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-new-5',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is the "Approvals" workflow in PBCS used for?',
    options: [
      'Document approval',
      'Managing the promotion, rejection, and sign-off of Planning Units through the budget cycle',
      'User access approval',
      'Report distribution approval'
    ],
    correctIndex: 1,
    explanation: 'The Approvals process manages Planning Unit lifecycle: submission, review, approval, rejection, and sign-off across organizational hierarchy.',
    topic: 'Oracle PBCS',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-new-6',
    category: 'budget',
    difficulty: 'advanced',
    question: 'In PBCS, what distinguishes a "Dense" dimension from a "Sparse" dimension?',
    options: [
      'Dense dimensions have more members',
      'Dense dimensions have most intersections populated; Sparse dimensions have few populated intersections',
      'Dense is for financial data; Sparse is for operational',
      'There is no difference'
    ],
    correctIndex: 1,
    explanation: 'Dense dimensions (like Accounts, Period) have most cells populated. Sparse dimensions (like Entity, Product) have few populated cells. This affects storage and performance.',
    topic: 'Oracle PBCS',
    tool: 'oracle_pbcs'
  },

  // ==========================================
  // ADDITIONAL NETSUITE EPM QUESTIONS
  // ==========================================
  {
    id: 'netsuite-new-1',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is the "Period Close Checklist" in NetSuite?',
    options: [
      'A shopping list for accountants',
      'A guided workflow of tasks for closing accounting periods systematically',
      'A calendar reminder system',
      'A security checklist'
    ],
    correctIndex: 1,
    explanation: 'The Period Close Checklist provides a structured workflow of tasks (like reconciliations, accruals) to ensure consistent and complete period closings.',
    topic: 'NetSuite EPM',
    tool: 'netsuite'
  },
  {
    id: 'netsuite-new-2',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is the NetSuite "Class" segment typically used for?',
    options: [
      'Classifying products by size',
      'Segmenting financial data by business line, product line, or channel',
      'Student class scheduling',
      'User training levels'
    ],
    correctIndex: 1,
    explanation: 'The Class segment in NetSuite is commonly used to track profitability by business line, product category, or sales channel.',
    topic: 'NetSuite EPM',
    tool: 'netsuite'
  },
  {
    id: 'netsuite-new-3',
    category: 'consolidation',
    difficulty: 'intermediate',
    question: 'How does NetSuite handle currency revaluation for open foreign transactions?',
    options: [
      'It ignores currency changes',
      'Using the Currency Revaluation feature to adjust open balances to current exchange rates',
      'Through manual journal entries only',
      'By deleting foreign transactions'
    ],
    correctIndex: 1,
    explanation: 'Currency Revaluation automatically adjusts open A/R, A/P, and bank balances to period-end exchange rates, posting gains/losses accordingly.',
    topic: 'NetSuite Consolidation',
    tool: 'netsuite'
  },
  {
    id: 'netsuite-new-4',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is "Saved Search" in NetSuite commonly used for in EPM context?',
    options: [
      'Finding lost documents',
      'Creating reusable queries for reporting, analytics, and feeding data to NSPB',
      'Saving user preferences',
      'Bookmarking web pages'
    ],
    correctIndex: 1,
    explanation: 'Saved Searches are powerful, reusable queries used for reporting, KPI dashboards, and as data sources for NSPB integration.',
    topic: 'NetSuite EPM',
    tool: 'netsuite'
  },
  {
    id: 'netsuite-new-5',
    category: 'consolidation',
    difficulty: 'advanced',
    question: 'What is the purpose of "Financial Statement Columns" in NetSuite?',
    options: [
      'Formatting text columns',
      'Customizing financial report layouts to show periods, comparisons, and calculated columns',
      'Defining database columns',
      'Setting up spreadsheet exports'
    ],
    correctIndex: 1,
    explanation: 'Financial Statement Columns define report layouts: which periods to show, comparative columns, variance calculations, and percentage columns.',
    topic: 'NetSuite Reporting',
    tool: 'netsuite'
  },
  {
    id: 'netsuite-new-6',
    category: 'general',
    difficulty: 'advanced',
    question: 'What is SuiteAnalytics Connect in NetSuite?',
    options: [
      'A VPN connection tool',
      'ODBC/JDBC connectivity for direct SQL access to NetSuite data for BI tools',
      'A social media integration',
      'Customer support chat'
    ],
    correctIndex: 1,
    explanation: 'SuiteAnalytics Connect provides ODBC/JDBC drivers allowing external BI tools to query NetSuite data directly using SQL.',
    topic: 'NetSuite Analytics',
    tool: 'netsuite'
  },
  {
    id: 'netsuite-new-7',
    category: 'general',
    difficulty: 'intermediate',
    question: 'What does "OneWorld" refer to in NetSuite?',
    options: [
      'A single worldwide server',
      'Multi-subsidiary management capability for global organizations',
      'A charity initiative',
      'Single sign-on feature'
    ],
    correctIndex: 1,
    explanation: 'NetSuite OneWorld enables management of multiple subsidiaries, currencies, and tax jurisdictions within a single instance.',
    topic: 'NetSuite EPM',
    tool: 'netsuite'
  },

  // ==========================================
  // ADDITIONAL JEDOX QUESTIONS
  // ==========================================
  {
    id: 'jedox-new-1',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is "Jedox Integrator" used for?',
    options: [
      'Connecting team members',
      'ETL tool for extracting, transforming, and loading data from various sources',
      'Integrating with social media',
      'User authentication'
    ],
    correctIndex: 1,
    explanation: 'Jedox Integrator is the built-in ETL tool for connecting to data sources, transforming data, and loading it into PALO cubes.',
    topic: 'Jedox Integration',
    tool: 'jedox'
  },
  {
    id: 'jedox-new-2',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is the "Jedox Web" component?',
    options: [
      'A website builder',
      'Browser-based interface for spreadsheet-like planning, analysis, and reporting',
      'A web hosting service',
      'Email client'
    ],
    correctIndex: 1,
    explanation: 'Jedox Web provides a browser-based spreadsheet interface for data entry, analysis, and reporting without requiring Excel installation.',
    topic: 'Jedox Interface',
    tool: 'jedox'
  },
  {
    id: 'jedox-new-3',
    category: 'general',
    difficulty: 'beginner',
    question: 'What is "Jedox Spreadsheet Add-in" (formerly Excel Plus)?',
    options: [
      'A calculator add-in',
      'Excel integration enabling direct connection to Jedox databases for planning and reporting',
      'A charting tool',
      'Spell checker'
    ],
    correctIndex: 1,
    explanation: 'The Jedox Spreadsheet Add-in connects Excel directly to PALO databases for real-time data entry, analysis, and report creation.',
    topic: 'Jedox Excel',
    tool: 'jedox'
  },
  {
    id: 'jedox-new-4',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What are "Subsets" in Jedox?',
    options: [
      'Partial data backups',
      'Dynamic filtered views of dimension elements based on criteria or rules',
      'User group definitions',
      'Database partitions'
    ],
    correctIndex: 1,
    explanation: 'Subsets are dynamic, filterable views of dimension members that can be based on attribute values, data conditions, or hierarchical positions.',
    topic: 'Jedox Dimensions',
    tool: 'jedox'
  },
  {
    id: 'jedox-new-5',
    category: 'consolidation',
    difficulty: 'intermediate',
    question: 'What are "Rules" in Jedox PALO?',
    options: [
      'Business policies',
      'Server-side calculations that derive cell values based on formulas',
      'User access rules',
      'Naming conventions'
    ],
    correctIndex: 1,
    explanation: 'PALO Rules are server-side formulas that calculate cell values on-the-fly, enabling allocations, currency conversion, and consolidation logic.',
    topic: 'Jedox Rules',
    tool: 'jedox'
  },
  {
    id: 'jedox-new-6',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is "Write-back" capability in Jedox?',
    options: [
      'Reversing transactions',
      'Users can directly enter data into OLAP cubes from Excel or web interfaces',
      'Data backup process',
      'Undo functionality'
    ],
    correctIndex: 1,
    explanation: 'Write-back allows users to input data directly into PALO cubes through Excel or web interfaces, enabling collaborative planning.',
    topic: 'Jedox Planning',
    tool: 'jedox'
  },
  {
    id: 'jedox-new-7',
    category: 'general',
    difficulty: 'advanced',
    question: 'What is Jedox "Supervision Server" functionality?',
    options: [
      'Employee monitoring',
      'High-availability clustering with automatic failover for Jedox servers',
      'Supervisor access control',
      'Log monitoring'
    ],
    correctIndex: 1,
    explanation: 'Supervision Server provides high availability through active-passive clustering with automatic failover for mission-critical deployments.',
    topic: 'Jedox Architecture',
    tool: 'jedox'
  },
  {
    id: 'jedox-new-8',
    category: 'consolidation',
    difficulty: 'advanced',
    question: 'What is the purpose of "GPU acceleration" in Jedox?',
    options: [
      'Gaming support',
      'Accelerating complex calculations using graphics processing units for faster performance',
      'Video rendering',
      'Display graphics'
    ],
    correctIndex: 1,
    explanation: 'Jedox supports GPU acceleration for complex aggregations and calculations, significantly improving performance for large datasets.',
    topic: 'Jedox Performance',
    tool: 'jedox'
  },
  {
    id: 'jedox-new-9',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is "Modelling" in Jedox Report Designer?',
    options: [
      '3D modeling',
      'Creating dynamic report templates with placeholders that automatically adapt to dimension changes',
      'Data modeling',
      'Financial forecasting'
    ],
    correctIndex: 1,
    explanation: 'Report Modelling creates dynamic templates where dimension elements serve as placeholders, automatically reflecting changes in hierarchies.',
    topic: 'Jedox Reporting',
    tool: 'jedox'
  },

  // ==========================================
  // ADDITIONAL TAGETIK QUESTIONS
  // ==========================================
  {
    id: 'tagetik-new-1',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is the "Unified Financial Platform" concept in CCH Tagetik?',
    options: [
      'A single database approach',
      'Single platform for close, consolidation, planning, reporting, and disclosure management',
      'Unified user interface theme',
      'A licensing model'
    ],
    correctIndex: 1,
    explanation: 'Tagetik provides a unified platform covering the entire Office of Finance needs: close, consolidation, planning, reporting, and disclosure.',
    topic: 'Tagetik Platform',
    tool: 'tagetik'
  },
  {
    id: 'tagetik-new-2',
    category: 'consolidation',
    difficulty: 'intermediate',
    question: 'What are "Intercompany Matching" capabilities in Tagetik?',
    options: [
      'Finding similar companies',
      'Automated matching and reconciliation of intercompany transactions with dispute management',
      'Company database search',
      'M&A target matching'
    ],
    correctIndex: 1,
    explanation: 'Tagetik\'s IC Matching automatically reconciles intercompany balances, identifies mismatches, and manages resolution workflows.',
    topic: 'Tagetik Consolidation',
    tool: 'tagetik'
  },
  {
    id: 'tagetik-new-3',
    category: 'general',
    difficulty: 'advanced',
    question: 'What is "iXBRL" tagging in CCH Tagetik used for?',
    options: [
      'Internal XML formatting',
      'Inline XBRL tagging for digital regulatory filing (SEC, ESMA, HMRC)',
      'Database indexing',
      'User interface design'
    ],
    correctIndex: 1,
    explanation: 'iXBRL tagging in Tagetik enables automated preparation of machine-readable financial reports for regulatory bodies like SEC and ESMA.',
    topic: 'Tagetik Compliance',
    tool: 'tagetik'
  }
];

// Get questions by category
export const getQuestionsByCategory = (category?: 'budget' | 'consolidation' | 'kpi' | 'general') => {
  if (!category) return CONSOLIDATION_QUESTIONS;
  return CONSOLIDATION_QUESTIONS.filter(q => q.category === category);
};

// Get questions by EPM tool
export const getQuestionsByTool = (tool: EPMTool) => {
  return CONSOLIDATION_QUESTIONS.filter(q => q.tool === tool);
};

// Get questions by difficulty
export const getQuestionsByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
  return CONSOLIDATION_QUESTIONS.filter(q => q.difficulty === difficulty);
};

// Shuffle and limit questions
export const shuffleQuestions = (questions: QuizQuestion[], count: number = 10): QuizQuestion[] => {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Get tool question count
export const getToolQuestionCount = (tool: EPMTool): number => {
  return CONSOLIDATION_QUESTIONS.filter(q => q.tool === tool).length;
};
