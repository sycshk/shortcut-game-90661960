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
    topic: 'NetSuite Consolidation'
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
    topic: 'Oracle FCCS'
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
    topic: 'Oracle FCCS'
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
    topic: 'NetSuite Consolidation'
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
    topic: 'Jedox Technology'
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
    topic: 'Oracle FCCS'
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
    topic: 'Oracle FCCS'
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
    topic: 'Oracle FCCS'
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
    topic: 'NetSuite Consolidation'
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
    topic: 'Jedox Consolidation'
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
    topic: 'Oracle FCCS'
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
    topic: 'Oracle FCCS'
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
    topic: 'Oracle PBCS'
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
    topic: 'NetSuite EPM'
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
    topic: 'Oracle PBCS'
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
    topic: 'Oracle PBCS'
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
    topic: 'Jedox Planning'
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
    topic: 'NetSuite EPM'
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
    topic: 'Oracle PBCS'
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
    topic: 'Oracle PBCS'
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
    topic: 'Oracle EPM'
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
    topic: 'Jedox Technology'
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
    topic: 'Oracle PBCS'
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
    topic: 'NetSuite EPM'
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
    topic: 'Oracle Technology'
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
    topic: 'NetSuite Close Management'
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
    topic: 'Oracle EPM'
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
    topic: 'Oracle FCCS'
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
    topic: 'Jedox Technology'
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
    topic: 'Oracle FCCS Security'
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
    topic: 'NetSuite Integration'
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
