import { QuizQuestion } from '../consolidationQuiz';

// NetSuite EPM Questions - 42 total (14 beginner, 14 intermediate, 14 advanced)
export const NETSUITE_QUESTIONS: QuizQuestion[] = [
  // ==========================================
  // BEGINNER (14 questions)
  // ==========================================
  {
    id: 'ns-b-1',
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
    explanation: 'An Elimination Subsidiary is a special entity used to record intercompany elimination entries during consolidation.',
    topic: 'NetSuite Consolidation',
    tool: 'netsuite'
  },
  {
    id: 'ns-b-2',
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
    explanation: 'NSPB uses the NSPB Sync SuiteApp and EPM Connector to sync data via Saved Searches.',
    topic: 'NetSuite Integration',
    tool: 'netsuite'
  },
  {
    id: 'ns-b-3',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is NSPB in NetSuite?',
    options: [
      'NetSuite Sales and Billing',
      'NetSuite Planning and Budgeting',
      'NetSuite Purchase Backend',
      'NetSuite Payroll Bureau'
    ],
    correctIndex: 1,
    explanation: 'NSPB stands for NetSuite Planning and Budgeting, the EPM module for planning and forecasting.',
    topic: 'NetSuite Basics',
    tool: 'netsuite'
  },
  {
    id: 'ns-b-4',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is a "Subsidiary" in NetSuite?',
    options: [
      'A subsidiary company',
      'An organizational unit representing a legal entity, branch, or division',
      'A product category',
      'A user group'
    ],
    correctIndex: 1,
    explanation: 'Subsidiaries represent legal entities, branches, or divisions within the NetSuite organizational structure.',
    topic: 'NetSuite Structure',
    tool: 'netsuite'
  },
  {
    id: 'ns-b-5',
    category: 'general',
    difficulty: 'beginner',
    question: 'What does "OneWorld" refer to in NetSuite?',
    options: [
      'A single worldwide server',
      'Multi-subsidiary management capability for global organizations',
      'A charity initiative',
      'Single sign-on feature'
    ],
    correctIndex: 1,
    explanation: 'NetSuite OneWorld enables management of multiple subsidiaries, currencies, and tax jurisdictions.',
    topic: 'NetSuite Features',
    tool: 'netsuite'
  },
  {
    id: 'ns-b-6',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is a "Saved Search" in NetSuite commonly used for?',
    options: [
      'Finding lost documents',
      'Creating reusable queries for reporting, analytics, and feeding data to NSPB',
      'Saving user preferences',
      'Bookmarking web pages'
    ],
    correctIndex: 1,
    explanation: 'Saved Searches are powerful, reusable queries used for reporting and as data sources for NSPB.',
    topic: 'NetSuite Reporting',
    tool: 'netsuite'
  },
  {
    id: 'ns-b-7',
    category: 'consolidation',
    difficulty: 'beginner',
    question: 'What is "Consolidated Exchange Rate" in NetSuite?',
    options: [
      'A fixed exchange rate',
      'The rate used to convert subsidiary currencies to parent/reporting currency',
      'A premium rate',
      'A negotiated rate'
    ],
    correctIndex: 1,
    explanation: 'Consolidated Exchange Rates convert subsidiary currencies to the parent\'s reporting currency for consolidated reports.',
    topic: 'NetSuite Currency',
    tool: 'netsuite'
  },
  {
    id: 'ns-b-8',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is a "Budget" in NetSuite?',
    options: [
      'A limit on spending',
      'A record type for storing planned financial amounts by account and period',
      'A report type',
      'A user permission'
    ],
    correctIndex: 1,
    explanation: 'Budgets in NetSuite store planned financial amounts that can be compared to actuals in reports.',
    topic: 'NetSuite Budgeting',
    tool: 'netsuite'
  },
  {
    id: 'ns-b-9',
    category: 'general',
    difficulty: 'beginner',
    question: 'What is a "Financial Report" in NetSuite?',
    options: [
      'A news article about finance',
      'A formatted report showing financial data like Balance Sheet or Income Statement',
      'A user profile',
      'A transaction log'
    ],
    correctIndex: 1,
    explanation: 'Financial Reports are formatted outputs displaying Balance Sheet, Income Statement, and other financial statements.',
    topic: 'NetSuite Reporting',
    tool: 'netsuite'
  },
  {
    id: 'ns-b-10',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is the "Accounting Period" in NetSuite?',
    options: [
      'How long to keep records',
      'A defined time period (month, quarter) for organizing and closing financial data',
      'Payment terms',
      'Audit duration'
    ],
    correctIndex: 1,
    explanation: 'Accounting Periods define time segments for organizing transactions and performing period closes.',
    topic: 'NetSuite Periods',
    tool: 'netsuite'
  },
  {
    id: 'ns-b-11',
    category: 'general',
    difficulty: 'beginner',
    question: 'What is "Intercompany" in NetSuite?',
    options: [
      'Between companies',
      'Transactions between subsidiaries of the same parent organization',
      'International companies',
      'Company comparisons'
    ],
    correctIndex: 1,
    explanation: 'Intercompany refers to transactions between subsidiaries that must be tracked and eliminated in consolidation.',
    topic: 'NetSuite Intercompany',
    tool: 'netsuite'
  },
  {
    id: 'ns-b-12',
    category: 'consolidation',
    difficulty: 'beginner',
    question: 'What is a "Chart of Accounts" in NetSuite?',
    options: [
      'A graphical chart',
      'The list of all financial accounts used for recording transactions',
      'A seating chart',
      'An org chart'
    ],
    correctIndex: 1,
    explanation: 'The Chart of Accounts is the complete list of accounts (assets, liabilities, equity, revenue, expenses) used for transactions.',
    topic: 'NetSuite Accounts',
    tool: 'netsuite'
  },
  {
    id: 'ns-b-13',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is a "Dashboard" in NetSuite?',
    options: [
      'Car dashboard',
      'A customizable homepage displaying KPIs, reports, and shortcuts',
      'A control panel',
      'A settings page'
    ],
    correctIndex: 1,
    explanation: 'Dashboards are customizable homepages with portlets showing key data, reports, and shortcuts.',
    topic: 'NetSuite Interface',
    tool: 'netsuite'
  },
  {
    id: 'ns-b-14',
    category: 'general',
    difficulty: 'beginner',
    question: 'What is "SuiteScript" in NetSuite?',
    options: [
      'A font style',
      'JavaScript-based programming language for customizing NetSuite',
      'A scripted demo',
      'Customer scripts'
    ],
    correctIndex: 1,
    explanation: 'SuiteScript is NetSuite\'s JavaScript-based language for custom business logic and automation.',
    topic: 'NetSuite Customization',
    tool: 'netsuite'
  },

  // ==========================================
  // INTERMEDIATE (14 questions)
  // ==========================================
  {
    id: 'ns-i-1',
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
    explanation: 'The Eliminate checkbox marks an account for automatic reversal of intercompany transactions during consolidation.',
    topic: 'NetSuite Consolidation',
    tool: 'netsuite'
  },
  {
    id: 'ns-i-2',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is Predictive Planning in NetSuite Planning and Budgeting?',
    options: [
      'Manual forecasting based on gut feeling',
      'AI/ML algorithms that detect anomalies and generate forecasts from historical data',
      'Copying last year\'s budget',
      'Planning based on competitor analysis'
    ],
    correctIndex: 1,
    explanation: 'Predictive Planning uses AI/ML algorithms to analyze historical data and generate intelligent forecasts.',
    topic: 'NetSuite AI',
    tool: 'netsuite'
  },
  {
    id: 'ns-i-3',
    category: 'general',
    difficulty: 'intermediate',
    question: 'What is the Period Close Checklist in NetSuite?',
    options: [
      'A list of accounting periods',
      'A role-based workflow dashboard monitoring close tasks',
      'A list of fiscal year settings',
      'A report of closed transactions'
    ],
    correctIndex: 1,
    explanation: 'The Period Close Checklist is a dashboard with role-based tasks tracking close activities.',
    topic: 'NetSuite Close',
    tool: 'netsuite'
  },
  {
    id: 'ns-i-4',
    category: 'consolidation',
    difficulty: 'intermediate',
    question: 'What is "Multi-Currency" in NetSuite OneWorld?',
    options: [
      'Multiple payment methods',
      'Ability to transact and report in multiple currencies with automatic conversion',
      'International pricing',
      'Currency trading'
    ],
    correctIndex: 1,
    explanation: 'Multi-Currency enables transactions in different currencies with automatic conversion to base/reporting currencies.',
    topic: 'NetSuite Currency',
    tool: 'netsuite'
  },
  {
    id: 'ns-i-5',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is "Approval Workflow" in NetSuite?',
    options: [
      'Email approvals',
      'Automated routing of transactions/records for review and approval based on rules',
      'User registration approval',
      'Report approval'
    ],
    correctIndex: 1,
    explanation: 'Approval Workflows route transactions through approval chains based on configurable rules and conditions.',
    topic: 'NetSuite Workflow',
    tool: 'netsuite'
  },
  {
    id: 'ns-i-6',
    category: 'consolidation',
    difficulty: 'intermediate',
    question: 'What is "Revaluation" in NetSuite?',
    options: [
      'Asset appraisal',
      'Adjusting foreign currency balances to current exchange rates with gain/loss recognition',
      'Stock revaluation',
      'Inventory recount'
    ],
    correctIndex: 1,
    explanation: 'Revaluation adjusts foreign currency monetary balances to current rates, recording exchange gains/losses.',
    topic: 'NetSuite Currency',
    tool: 'netsuite'
  },
  {
    id: 'ns-i-7',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is a "Report Builder" in NetSuite?',
    options: [
      'A construction tool',
      'Interface for creating custom reports with drag-and-drop fields and filters',
      'A report viewer',
      'A PDF generator'
    ],
    correctIndex: 1,
    explanation: 'Report Builder is the interface for creating custom reports by selecting fields, filters, and layouts.',
    topic: 'NetSuite Reporting',
    tool: 'netsuite'
  },
  {
    id: 'ns-i-8',
    category: 'general',
    difficulty: 'intermediate',
    question: 'What is "SuiteFlow" in NetSuite?',
    options: [
      'Cash flow analysis',
      'Point-and-click workflow automation tool',
      'Network flow',
      'Data flow diagram'
    ],
    correctIndex: 1,
    explanation: 'SuiteFlow is NetSuite\'s visual workflow builder for automating business processes without coding.',
    topic: 'NetSuite Automation',
    tool: 'netsuite'
  },
  {
    id: 'ns-i-9',
    category: 'consolidation',
    difficulty: 'intermediate',
    question: 'What is "Financial Statement Layout" in NetSuite?',
    options: [
      'Page formatting',
      'Custom row/column configurations for financial reports',
      'Document layout',
      'Screen layout'
    ],
    correctIndex: 1,
    explanation: 'Financial Statement Layouts define which rows (accounts) and columns (periods, comparisons) appear in reports.',
    topic: 'NetSuite Reporting',
    tool: 'netsuite'
  },
  {
    id: 'ns-i-10',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is "Allocation" in NetSuite?',
    options: [
      'Resource assignment',
      'Distributing amounts from one account/department to others based on schedules',
      'Memory allocation',
      'Space allocation'
    ],
    correctIndex: 1,
    explanation: 'Allocations distribute amounts (like shared costs) across accounts, departments, or locations using schedules.',
    topic: 'NetSuite Allocations',
    tool: 'netsuite'
  },
  {
    id: 'ns-i-11',
    category: 'general',
    difficulty: 'intermediate',
    question: 'What is "Segment" in NetSuite?',
    options: [
      'A market segment',
      'Custom classification dimension for tracking beyond standard dimensions',
      'A line segment',
      'A customer segment'
    ],
    correctIndex: 1,
    explanation: 'Segments are custom classification dimensions (like Project, Region) for additional tracking and reporting.',
    topic: 'NetSuite Structure',
    tool: 'netsuite'
  },
  {
    id: 'ns-i-12',
    category: 'consolidation',
    difficulty: 'intermediate',
    question: 'What is "Book-to-Tax" in NetSuite?',
    options: [
      'Bookkeeping to taxation',
      'Tracking differences between GAAP and tax accounting treatments',
      'Book sales tax',
      'Textbook taxation'
    ],
    correctIndex: 1,
    explanation: 'Book-to-Tax tracks differences between financial reporting (GAAP) and tax reporting requirements.',
    topic: 'NetSuite Tax',
    tool: 'netsuite'
  },
  {
    id: 'ns-i-13',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is "Revenue Recognition" in NetSuite?',
    options: [
      'Recognizing sales people',
      'Recording revenue according to accounting standards (ASC 606)',
      'Revenue reporting',
      'Income identification'
    ],
    correctIndex: 1,
    explanation: 'Revenue Recognition ensures revenue is recorded when earned per accounting standards like ASC 606.',
    topic: 'NetSuite Revenue',
    tool: 'netsuite'
  },
  {
    id: 'ns-i-14',
    category: 'general',
    difficulty: 'intermediate',
    question: 'What is "SuiteAnalytics Workbook" in NetSuite?',
    options: [
      'A training workbook',
      'Self-service analytics tool for creating custom reports and visualizations',
      'A spreadsheet',
      'A documentation tool'
    ],
    correctIndex: 1,
    explanation: 'SuiteAnalytics Workbook provides self-service analytics with drag-and-drop report and visualization building.',
    topic: 'NetSuite Analytics',
    tool: 'netsuite'
  },

  // ==========================================
  // ADVANCED (14 questions)
  // ==========================================
  {
    id: 'ns-a-1',
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
    explanation: 'Multi-Book Accounting allows a single transaction to be recorded differently for different standards.',
    topic: 'NetSuite Multi-GAAP',
    tool: 'netsuite'
  },
  {
    id: 'ns-a-2',
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
    explanation: 'Saved Searches for NSPB integration must use the prefix "customsearch_nspbcs" for EPM Connector recognition.',
    topic: 'NetSuite Integration',
    tool: 'netsuite'
  },
  {
    id: 'ns-a-3',
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
    explanation: 'Financial Statement Columns define report layouts: periods to show, comparisons, and variance calculations.',
    topic: 'NetSuite Reporting',
    tool: 'netsuite'
  },
  {
    id: 'ns-a-4',
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
    explanation: 'SuiteAnalytics Connect provides ODBC/JDBC drivers for external BI tools to query NetSuite data via SQL.',
    topic: 'NetSuite Integration',
    tool: 'netsuite'
  },
  {
    id: 'ns-a-5',
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
    explanation: 'Oracle EPM Cloud connects to NetSuite using Token-Based Authentication and retrieves data via Saved Searches.',
    topic: 'NetSuite EPM Integration',
    tool: 'netsuite'
  },
  {
    id: 'ns-a-6',
    category: 'consolidation',
    difficulty: 'advanced',
    question: 'What is "Consolidated Exchange Rate Types" in NetSuite?',
    options: [
      'Rate categories',
      'Different rate types (Average, Current, Historical) for different account types in consolidation',
      'Premium rates',
      'Negotiated rates'
    ],
    correctIndex: 1,
    explanation: 'Different rate types are applied to different account types: Average for P&L, Current for monetary, Historical for equity.',
    topic: 'NetSuite Currency',
    tool: 'netsuite'
  },
  {
    id: 'ns-a-7',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is "SuiteScript 2.0" vs "1.0" in NetSuite?',
    options: [
      'Version numbers only',
      '2.0 uses modern JavaScript patterns (modules, promises) vs. 1.0\'s simpler syntax',
      '2.0 is faster',
      '1.0 is deprecated'
    ],
    correctIndex: 1,
    explanation: 'SuiteScript 2.0 uses modern JavaScript patterns including modules and promises for better code organization.',
    topic: 'NetSuite Development',
    tool: 'netsuite'
  },
  {
    id: 'ns-a-8',
    category: 'consolidation',
    difficulty: 'advanced',
    question: 'What is "Global Inventory Relationship" in NetSuite OneWorld?',
    options: [
      'Worldwide inventory',
      'Linking inventory items across subsidiaries for intercompany supply chain',
      'Global stock market',
      'International shipping'
    ],
    correctIndex: 1,
    explanation: 'Global Inventory Relationship enables inventory transfers between subsidiaries with proper IC accounting.',
    topic: 'NetSuite Intercompany',
    tool: 'netsuite'
  },
  {
    id: 'ns-a-9',
    category: 'general',
    difficulty: 'advanced',
    question: 'What is "Account Mapping" in NetSuite for GAAP differences?',
    options: [
      'Geographic mapping',
      'Linking accounts to different chart of accounts for multi-book reporting',
      'User account mapping',
      'Database mapping'
    ],
    correctIndex: 1,
    explanation: 'Account Mapping links primary book accounts to secondary book accounts for multi-GAAP reporting.',
    topic: 'NetSuite Multi-Book',
    tool: 'netsuite'
  },
  {
    id: 'ns-a-10',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is "Advanced Revenue Management" (ARM) in NetSuite?',
    options: [
      'Sales management',
      'Complex revenue recognition with multiple element arrangements and time-based rules',
      'Pricing management',
      'Discount management'
    ],
    correctIndex: 1,
    explanation: 'ARM handles complex revenue recognition including multiple deliverables, time-based recognition, and ASC 606 compliance.',
    topic: 'NetSuite Revenue',
    tool: 'netsuite'
  },
  {
    id: 'ns-a-11',
    category: 'consolidation',
    difficulty: 'advanced',
    question: 'What is "Translation Adjustment Account" in NetSuite?',
    options: [
      'Language translation',
      'Equity account capturing currency translation gains/losses for foreign subsidiaries',
      'Adjustment journal',
      'Variance account'
    ],
    correctIndex: 1,
    explanation: 'The Translation Adjustment Account (CTA equivalent) captures FX gains/losses from subsidiary consolidation.',
    topic: 'NetSuite Currency',
    tool: 'netsuite'
  },
  {
    id: 'ns-a-12',
    category: 'general',
    difficulty: 'advanced',
    question: 'What is "SuiteBundle" in NetSuite?',
    options: [
      'A product bundle',
      'Packaged customizations (scripts, workflows, records) for deployment across accounts',
      'Software bundle',
      'Data bundle'
    ],
    correctIndex: 1,
    explanation: 'SuiteBundles package customizations for deployment, enabling distribution of solutions across accounts.',
    topic: 'NetSuite Deployment',
    tool: 'netsuite'
  },
  {
    id: 'ns-a-13',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is "Statistical Account" in NetSuite?',
    options: [
      'An account for statistics',
      'Non-financial account for tracking units, headcount, or other metrics',
      'A summary account',
      'An average account'
    ],
    correctIndex: 1,
    explanation: 'Statistical Accounts track non-monetary quantities like headcount, units, or square footage for analysis.',
    topic: 'NetSuite Accounts',
    tool: 'netsuite'
  },
  {
    id: 'ns-a-14',
    category: 'consolidation',
    difficulty: 'advanced',
    question: 'What is "Period End Journal" in NetSuite consolidation?',
    options: [
      'Year-end journal',
      'Automated or manual entries for period-end adjustments like accruals and eliminations',
      'Daily journal',
      'Closing journal'
    ],
    correctIndex: 1,
    explanation: 'Period End Journals record adjustments needed at period close including accruals, deferrals, and eliminations.',
    topic: 'NetSuite Close',
    tool: 'netsuite'
  }
];
