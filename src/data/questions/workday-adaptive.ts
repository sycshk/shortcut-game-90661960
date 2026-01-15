import { QuizQuestion } from '../consolidationQuiz';

// Workday Adaptive Planning Questions - 42 total (14 beginner, 14 intermediate, 14 advanced)
export const WORKDAY_ADAPTIVE_QUESTIONS: QuizQuestion[] = [
  // ==========================================
  // BEGINNER (14 questions)
  // ==========================================
  {
    id: 'wda-b-1',
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
    explanation: 'Workday Adaptive Planning is a cloud-based EPM solution for budgeting, forecasting, and reporting.',
    topic: 'Adaptive Basics',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-b-2',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is a "Cube Sheet" in Workday Adaptive Planning?',
    options: [
      'A 3D visualization',
      'A multi-dimensional grid for entering data across several dimensions',
      'A pivot table export',
      'A backup file format'
    ],
    correctIndex: 1,
    explanation: 'Cube Sheets allow multi-dimensional data input and analysis across dimensions like Product or Region.',
    topic: 'Adaptive Sheets',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-b-3',
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
    explanation: 'Model Sheets enable granular, row-level planning where each row represents a unique record.',
    topic: 'Adaptive Sheets',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-b-4',
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
    explanation: 'OfficeConnect is an add-in for Excel, Word, and PowerPoint with live Adaptive Planning data.',
    topic: 'Adaptive Reporting',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-b-5',
    category: 'general',
    difficulty: 'beginner',
    question: 'What is a "Standard Sheet" in Adaptive Planning?',
    options: [
      'A default template',
      'A basic spreadsheet-like interface for entering data by account and time',
      'A normalized sheet',
      'A formatting standard'
    ],
    correctIndex: 1,
    explanation: 'Standard Sheets are basic interfaces for entering data organized by accounts and time periods.',
    topic: 'Adaptive Sheets',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-b-6',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is an "Account" in Adaptive Planning?',
    options: [
      'A user account',
      'A financial account (Revenue, Expense, Asset, Liability) for storing data',
      'A login credential',
      'A customer record'
    ],
    correctIndex: 1,
    explanation: 'Accounts represent financial categories like Revenue, COGS, or Operating Expenses.',
    topic: 'Adaptive Accounts',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-b-7',
    category: 'general',
    difficulty: 'beginner',
    question: 'What is a "Dimension" in Adaptive Planning?',
    options: [
      'Size measurement',
      'A category for slicing and organizing data (like Product, Region, Department)',
      'Screen resolution',
      'Data volume'
    ],
    correctIndex: 1,
    explanation: 'Dimensions are custom categories for organizing data beyond the standard account structure.',
    topic: 'Adaptive Dimensions',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-b-8',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is a "Version" in Adaptive Planning?',
    options: [
      'Software version',
      'A scenario like Actuals, Budget, or Forecast for comparison',
      'Document version',
      'API version'
    ],
    correctIndex: 1,
    explanation: 'Versions represent different scenarios (Actuals, Budget, Forecast) for comparison and analysis.',
    topic: 'Adaptive Versions',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-b-9',
    category: 'general',
    difficulty: 'beginner',
    question: 'What is a "Level" in Adaptive Planning?',
    options: [
      'A difficulty level',
      'An organizational unit in the hierarchy (company, division, department)',
      'A user permission level',
      'A data quality level'
    ],
    correctIndex: 1,
    explanation: 'Levels represent organizational hierarchy units like Divisions, Departments, or Cost Centers.',
    topic: 'Adaptive Hierarchy',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-b-10',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is a "Report" in Adaptive Planning?',
    options: [
      'A news report',
      'A formatted view of data for analysis and presentation',
      'A bug report',
      'A status report'
    ],
    correctIndex: 1,
    explanation: 'Reports are formatted views of planning data for analysis, presentation, and sharing.',
    topic: 'Adaptive Reporting',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-b-11',
    category: 'general',
    difficulty: 'beginner',
    question: 'What is "Time Stratum" in Adaptive Planning?',
    options: [
      'Time zone',
      'The time granularity level (Year, Quarter, Month) for data entry',
      'Historical period',
      'Future timeline'
    ],
    correctIndex: 1,
    explanation: 'Time Stratum defines the granularity of time periods (Month, Quarter, Year) for data and reporting.',
    topic: 'Adaptive Time',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-b-12',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is "Dashboard" in Adaptive Planning?',
    options: [
      'Car dashboard',
      'A visual display of KPIs, charts, and key metrics',
      'Control panel',
      'Settings page'
    ],
    correctIndex: 1,
    explanation: 'Dashboards provide visual displays of key metrics and KPIs for quick insights.',
    topic: 'Adaptive Reporting',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-b-13',
    category: 'general',
    difficulty: 'beginner',
    question: 'What is "Integration" in Adaptive Planning?',
    options: [
      'Mathematical integration',
      'Connecting Adaptive to external data sources like ERPs and data warehouses',
      'Team integration',
      'Data integration'
    ],
    correctIndex: 1,
    explanation: 'Integration connects Adaptive Planning to external systems for data import and export.',
    topic: 'Adaptive Integration',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-b-14',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is "Data Import" in Adaptive Planning?',
    options: [
      'Importing products',
      'Loading data from external sources (files, systems) into Adaptive',
      'Importing settings',
      'Importing users'
    ],
    correctIndex: 1,
    explanation: 'Data Import loads external data (from files or systems) into Adaptive Planning.',
    topic: 'Adaptive Data',
    tool: 'workday_adaptive'
  },

  // ==========================================
  // INTERMEDIATE (14 questions)
  // ==========================================
  {
    id: 'wda-i-1',
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
    explanation: 'Versioning creates multiple iterations of budgets/forecasts for scenario comparison.',
    topic: 'Adaptive Versions',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-i-2',
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
    explanation: 'Standard accounts are for aggregated data; Modeled accounts enable detailed row-level planning.',
    topic: 'Adaptive Accounts',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-i-3',
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
    explanation: 'Assumptions are user-defined variables like inflation rates that influence calculations.',
    topic: 'Adaptive Modeling',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-i-4',
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
    explanation: 'Adaptive supports collaboration through real-time sharing, workflows, and role-based access.',
    topic: 'Adaptive Collaboration',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-i-5',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is a "Formula" in Adaptive Planning?',
    options: [
      'A scientific formula',
      'A calculation expression that derives account values from other accounts or assumptions',
      'A template',
      'A formatting rule'
    ],
    correctIndex: 1,
    explanation: 'Formulas calculate account values based on other accounts, assumptions, or dimensions.',
    topic: 'Adaptive Formulas',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-i-6',
    category: 'general',
    difficulty: 'intermediate',
    question: 'What is "Attribute" in Adaptive Planning?',
    options: [
      'A character trait',
      'Additional properties attached to dimension values for filtering and reporting',
      'A style setting',
      'A permission type'
    ],
    correctIndex: 1,
    explanation: 'Attributes are properties on dimension values enabling additional filtering and categorization.',
    topic: 'Adaptive Dimensions',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-i-7',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is "Time Offset" in Adaptive formulas?',
    options: [
      'Time zone difference',
      'Referencing values from prior or future periods in calculations',
      'Delay settings',
      'Time adjustment'
    ],
    correctIndex: 1,
    explanation: 'Time Offset references values from different periods (prior month, same month last year).',
    topic: 'Adaptive Formulas',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-i-8',
    category: 'general',
    difficulty: 'intermediate',
    question: 'What is "Security" in Adaptive Planning?',
    options: [
      'Data encryption',
      'Role-based access controlling what users can view, edit, and administrate',
      'Physical security',
      'Network security'
    ],
    correctIndex: 1,
    explanation: 'Security controls user access to data, features, and administrative functions based on roles.',
    topic: 'Adaptive Security',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-i-9',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is "Actuals Loading" in Adaptive Planning?',
    options: [
      'Loading real weights',
      'Importing historical financial data from ERP or GL systems',
      'Loading assumptions',
      'Loading templates'
    ],
    correctIndex: 1,
    explanation: 'Actuals Loading imports historical financial data from source systems for comparison to plans.',
    topic: 'Adaptive Integration',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-i-10',
    category: 'general',
    difficulty: 'intermediate',
    question: 'What is "Workflow" in Adaptive Planning?',
    options: [
      'A flowchart',
      'Process for routing budgets/forecasts through review and approval stages',
      'Task management',
      'Data flow'
    ],
    correctIndex: 1,
    explanation: 'Workflow routes budgets through submission, review, and approval stages.',
    topic: 'Adaptive Workflow',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-i-11',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is "Splashing" in Adaptive Planning?',
    options: [
      'Water effects',
      'Distributing a parent-level value down to child accounts or periods',
      'Data visualization',
      'Error notifications'
    ],
    correctIndex: 1,
    explanation: 'Splashing distributes values entered at aggregate levels down to detail levels.',
    topic: 'Adaptive Data Entry',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-i-12',
    category: 'general',
    difficulty: 'intermediate',
    question: 'What is "Discovery" in Adaptive Planning?',
    options: [
      'Finding data',
      'Self-service analytics tool for ad hoc reporting and visualization',
      'Data exploration',
      'User discovery'
    ],
    correctIndex: 1,
    explanation: 'Discovery is Adaptive\'s self-service analytics tool for ad hoc reporting and data exploration.',
    topic: 'Adaptive Reporting',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-i-13',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is "Linked Account" in Adaptive Planning?',
    options: [
      'A connected bank account',
      'An account that references values from another account or model sheet',
      'A shared account',
      'A synchronized account'
    ],
    correctIndex: 1,
    explanation: 'Linked Accounts reference values from model sheets or other accounts for calculations.',
    topic: 'Adaptive Accounts',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-i-14',
    category: 'general',
    difficulty: 'intermediate',
    question: 'What is "Consolidation" in Adaptive Planning?',
    options: [
      'Combining databases',
      'Aggregating data from lower levels up through the organizational hierarchy',
      'Merging files',
      'Compressing data'
    ],
    correctIndex: 1,
    explanation: 'Consolidation aggregates data from departments up through the organizational hierarchy.',
    topic: 'Adaptive Consolidation',
    tool: 'workday_adaptive'
  },

  // ==========================================
  // ADVANCED (14 questions)
  // ==========================================
  {
    id: 'wda-a-1',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What are "Alternate Hierarchies" in Workday Adaptive Planning?',
    options: [
      'Backup hierarchy configurations',
      'Different rollup structures for the same data without duplication',
      'User-specific views',
      'Historical hierarchy versions'
    ],
    correctIndex: 1,
    explanation: 'Alternate Hierarchies allow data to roll up differently (Functional, Legal) without duplication.',
    topic: 'Adaptive Advanced',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-a-2',
    category: 'general',
    difficulty: 'advanced',
    question: 'How does Workday Adaptive Planning support Integrated Business Planning (IBP)?',
    options: [
      'It only supports financial planning',
      'Unified platform connecting financial, operational, workforce, and sales plans',
      'Through third-party integrations only',
      'IBP is not supported'
    ],
    correctIndex: 1,
    explanation: 'Adaptive provides a unified platform connecting financial, operational, workforce, and sales plans.',
    topic: 'Adaptive IBP',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-a-3',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is driver-based modeling in Workday Adaptive Planning?',
    options: [
      'Planning focused on vehicle fleets',
      'Using operational drivers to calculate financial outcomes',
      'A database driver configuration',
      'Manual data entry process'
    ],
    correctIndex: 1,
    explanation: 'Driver-based modeling links operational assumptions to financial outcomes for flexible forecasting.',
    topic: 'Adaptive Driver Modeling',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-a-4',
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
    explanation: 'Standard Sheets can be deleted without affecting underlying accounts because data is tied to accounts.',
    topic: 'Adaptive Architecture',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-a-5',
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
    explanation: 'OfficeConnect enables dynamic PowerPoint decks that refresh with latest Adaptive data.',
    topic: 'Adaptive Reporting',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-a-6',
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
    explanation: 'Calculated Accounts derive values from formulas referencing other accounts or dimensions.',
    topic: 'Adaptive Calculations',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-a-7',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is "Custom Dimension" in Adaptive Planning?',
    options: [
      'A personalized view',
      'User-defined dimensions beyond standard accounts and levels for additional segmentation',
      'A modified dimension',
      'A filtered dimension'
    ],
    correctIndex: 1,
    explanation: 'Custom Dimensions add user-defined segmentation (Product, Channel, Region) beyond standard structure.',
    topic: 'Adaptive Dimensions',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-a-8',
    category: 'general',
    difficulty: 'advanced',
    question: 'What is "Cross-Level Formula" in Adaptive Planning?',
    options: [
      'A formula across screens',
      'Formulas that reference data from different levels in the organizational hierarchy',
      'A complex calculation',
      'A multi-step formula'
    ],
    correctIndex: 1,
    explanation: 'Cross-Level Formulas reference data across organizational hierarchy levels.',
    topic: 'Adaptive Formulas',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-a-9',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is "Scenario Planning" in Adaptive?',
    options: [
      'Planning scenarios',
      'Creating multiple what-if versions to compare different assumptions and outcomes',
      'Backup planning',
      'Contingency planning'
    ],
    correctIndex: 1,
    explanation: 'Scenario Planning creates multiple versions with different assumptions for comparison.',
    topic: 'Adaptive Scenarios',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-a-10',
    category: 'general',
    difficulty: 'advanced',
    question: 'What is "API Integration" in Adaptive Planning?',
    options: [
      'Application interface',
      'Programmatic access to Adaptive data for custom integrations and automation',
      'User interface',
      'Report interface'
    ],
    correctIndex: 1,
    explanation: 'API Integration enables programmatic access for custom integrations and automation.',
    topic: 'Adaptive Integration',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-a-11',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is "Rolling Forecast" implementation in Adaptive?',
    options: [
      'A forecast that rolls',
      'Continuously extending the forecast horizon, typically 12-18 months forward',
      'A rotating schedule',
      'A moving average'
    ],
    correctIndex: 1,
    explanation: 'Rolling Forecasts continuously extend the planning horizon as periods close.',
    topic: 'Adaptive Forecasting',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-a-12',
    category: 'general',
    difficulty: 'advanced',
    question: 'What is "Data Audit" in Adaptive Planning?',
    options: [
      'Financial audit',
      'Tracking changes to data including who made changes and when',
      'Data quality check',
      'Compliance audit'
    ],
    correctIndex: 1,
    explanation: 'Data Audit tracks all changes to data with user and timestamp for compliance and accountability.',
    topic: 'Adaptive Audit',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-a-13',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is "Currency Conversion" in Adaptive Planning?',
    options: [
      'Money exchange',
      'Translating foreign currency data to reporting currency using defined rates',
      'Currency trading',
      'Rate negotiation'
    ],
    correctIndex: 1,
    explanation: 'Currency Conversion translates foreign amounts to reporting currency using configured exchange rates.',
    topic: 'Adaptive Currency',
    tool: 'workday_adaptive'
  },
  {
    id: 'wda-a-14',
    category: 'general',
    difficulty: 'advanced',
    question: 'What is "Elastic Hypercube Technology" (EHT) in Adaptive?',
    options: [
      'Flexible cubes',
      'Patented technology enabling fast, scalable multi-dimensional calculations',
      'Stretching data',
      'Cube compression'
    ],
    correctIndex: 1,
    explanation: 'EHT is Adaptive\'s patented technology for fast, scalable multi-dimensional analysis.',
    topic: 'Adaptive Technology',
    tool: 'workday_adaptive'
  }
];
