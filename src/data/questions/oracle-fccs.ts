import { QuizQuestion } from '../consolidationQuiz';

// Oracle FCCS Questions - 42 total (14 beginner, 14 intermediate, 14 advanced)
export const ORACLE_FCCS_QUESTIONS: QuizQuestion[] = [
  // ==========================================
  // BEGINNER (14 questions)
  // ==========================================
  {
    id: 'fccs-b-1',
    category: 'consolidation',
    difficulty: 'beginner',
    question: 'What does FCCS stand for?',
    options: [
      'Financial Consolidation and Close Service',
      'Fast Cloud Consolidation System',
      'Financial Cloud Computing Suite',
      'Federal Compliance Control System'
    ],
    correctIndex: 0,
    explanation: 'FCCS stands for Financial Consolidation and Close Service, Oracle\'s cloud-based consolidation solution.',
    topic: 'FCCS Basics',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-b-2',
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
    topic: 'FCCS Dimensions',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-b-3',
    category: 'consolidation',
    difficulty: 'beginner',
    question: 'What is the purpose of the "View" dimension in FCCS?',
    options: [
      'To control user interface themes',
      'To distinguish between Periodic and Year-to-Date (YTD) data perspectives',
      'To filter report layouts',
      'To manage dashboard views'
    ],
    correctIndex: 1,
    explanation: 'The View dimension in FCCS allows you to see data in Periodic (single period) or YTD (cumulative) perspectives.',
    topic: 'FCCS Dimensions',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-b-4',
    category: 'consolidation',
    difficulty: 'beginner',
    question: 'What is the primary purpose of Oracle FCCS?',
    options: [
      'Payroll processing',
      'Financial consolidation and close management',
      'Customer relationship management',
      'Supply chain optimization'
    ],
    correctIndex: 1,
    explanation: 'Oracle FCCS is designed for financial consolidation, close management, and regulatory reporting.',
    topic: 'FCCS Basics',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-b-5',
    category: 'consolidation',
    difficulty: 'beginner',
    question: 'Which dimension in FCCS represents organizational units like companies and business units?',
    options: [
      'Account',
      'Entity',
      'Scenario',
      'Period'
    ],
    correctIndex: 1,
    explanation: 'The Entity dimension represents the organizational structure including companies, business units, and legal entities.',
    topic: 'FCCS Dimensions',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-b-6',
    category: 'consolidation',
    difficulty: 'beginner',
    question: 'What is a "Scenario" in FCCS?',
    options: [
      'A test environment',
      'A set of data representing different versions like Actual, Budget, or Forecast',
      'A user role',
      'A report template'
    ],
    correctIndex: 1,
    explanation: 'Scenarios represent different data versions such as Actual, Budget, Forecast, or What-if scenarios for analysis.',
    topic: 'FCCS Dimensions',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-b-7',
    category: 'consolidation',
    difficulty: 'beginner',
    question: 'What is the Movement dimension used for in FCCS?',
    options: [
      'Tracking physical asset movements',
      'Tracking changes in account balances over time (opening, changes, closing)',
      'Recording employee transfers',
      'Managing inventory movements'
    ],
    correctIndex: 1,
    explanation: 'The Movement dimension tracks how balance sheet values change: opening balance, changes during period, and closing balance.',
    topic: 'FCCS Dimensions',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-b-8',
    category: 'consolidation',
    difficulty: 'beginner',
    question: 'What tool do users typically use to enter data into FCCS from Excel?',
    options: [
      'Power BI',
      'Smart View',
      'Tableau',
      'Power Query'
    ],
    correctIndex: 1,
    explanation: 'Smart View is Oracle\'s Excel add-in for data entry, analysis, and reporting in FCCS and other EPM applications.',
    topic: 'FCCS Tools',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-b-9',
    category: 'consolidation',
    difficulty: 'beginner',
    question: 'What is the Currency dimension in FCCS used for?',
    options: [
      'Managing cryptocurrency',
      'Storing data in multiple currencies and the reporting currency',
      'Currency exchange trading',
      'Payment processing'
    ],
    correctIndex: 1,
    explanation: 'The Currency dimension stores entity currencies and enables translation to reporting/group currency.',
    topic: 'FCCS Dimensions',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-b-10',
    category: 'consolidation',
    difficulty: 'beginner',
    question: 'What happens when you run "Consolidation" in FCCS?',
    options: [
      'Data is deleted',
      'Financial data is aggregated, translated, and elimination entries are calculated',
      'Reports are generated',
      'Users are notified'
    ],
    correctIndex: 1,
    explanation: 'Consolidation aggregates entity data, performs currency translation, calculates ownership proportions, and creates elimination entries.',
    topic: 'FCCS Process',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-b-11',
    category: 'consolidation',
    difficulty: 'beginner',
    question: 'What is a "Journal" in FCCS?',
    options: [
      'A diary for notes',
      'A manual adjustment entry to correct or adjust consolidated data',
      'A report type',
      'A user audit log'
    ],
    correctIndex: 1,
    explanation: 'Journals are manual adjustment entries used to correct, reclassify, or adjust data in FCCS.',
    topic: 'FCCS Journals',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-b-12',
    category: 'consolidation',
    difficulty: 'beginner',
    question: 'What does the Account dimension store in FCCS?',
    options: [
      'User login accounts',
      'Chart of accounts (assets, liabilities, equity, revenue, expenses)',
      'Bank account numbers',
      'Email accounts'
    ],
    correctIndex: 1,
    explanation: 'The Account dimension contains the chart of accounts including assets, liabilities, equity, revenue, and expense accounts.',
    topic: 'FCCS Dimensions',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-b-13',
    category: 'consolidation',
    difficulty: 'beginner',
    question: 'What is the Close Manager in FCCS used for?',
    options: [
      'Shutting down servers',
      'Managing and tracking the financial close process with tasks and deadlines',
      'Closing user accounts',
      'Ending fiscal years'
    ],
    correctIndex: 1,
    explanation: 'Close Manager provides workflow and task management for the financial close process, tracking status and deadlines.',
    topic: 'FCCS Close',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-b-14',
    category: 'consolidation',
    difficulty: 'beginner',
    question: 'What is the Year dimension in FCCS?',
    options: [
      'The year the application was created',
      'The fiscal or calendar years containing financial data',
      'User birth years',
      'License expiry years'
    ],
    correctIndex: 1,
    explanation: 'The Year dimension represents fiscal or calendar years, enabling multi-year planning and historical analysis.',
    topic: 'FCCS Dimensions',
    tool: 'oracle_fccs'
  },

  // ==========================================
  // INTERMEDIATE (14 questions)
  // ==========================================
  {
    id: 'fccs-i-1',
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
    topic: 'FCCS Eliminations',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-i-2',
    category: 'consolidation',
    difficulty: 'intermediate',
    question: 'What is the "Consol Dim" (Consolidation dimension) used for in FCCS?',
    options: [
      'To consolidate databases',
      'To control how data flows during consolidation (Proportion, Elimination, Contribution)',
      'To manage console access',
      'To configure dimension security'
    ],
    correctIndex: 1,
    explanation: 'The Consolidation dimension controls data flow: Entity Input, Proportion, Elimination, Contribution, and Parent Adjustment.',
    topic: 'FCCS Consolidation',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-i-3',
    category: 'consolidation',
    difficulty: 'intermediate',
    question: 'What happens during the "Proportion" step of FCCS consolidation?',
    options: [
      'Data is loaded proportionally across periods',
      'Ownership percentages are applied to calculate parent\'s share of subsidiary values',
      'Accounts are divided into proportional segments',
      'Currency rates are proportioned across entities'
    ],
    correctIndex: 1,
    explanation: 'The Proportion step applies ownership percentages to calculate the parent company\'s share of each subsidiary\'s values.',
    topic: 'FCCS Process',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-i-4',
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
    explanation: 'FCCS_No Intercompany is used when data is not an intercompany transaction and does not require partner matching.',
    topic: 'FCCS ICP',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-i-5',
    category: 'consolidation',
    difficulty: 'intermediate',
    question: 'What is CTA (Cumulative Translation Adjustment) in FCCS?',
    options: [
      'A tax calculation adjustment',
      'An account that captures FX gains/losses from translating foreign subsidiaries',
      'A cost tracking account',
      'A consolidation timing adjustment'
    ],
    correctIndex: 1,
    explanation: 'CTA captures cumulative gains/losses from translating foreign subsidiary financials into the reporting currency.',
    topic: 'FCCS Currency',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-i-6',
    category: 'consolidation',
    difficulty: 'intermediate',
    question: 'What rate types are commonly used for currency translation in FCCS?',
    options: [
      'Prime rate and LIBOR',
      'Average, Ending (Closing), and Historical rates',
      'Fixed and floating rates',
      'Spot and forward rates only'
    ],
    correctIndex: 1,
    explanation: 'FCCS uses Average rate for P&L, Ending rate for balance sheet, and Historical rate for equity items.',
    topic: 'FCCS Currency',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-i-7',
    category: 'consolidation',
    difficulty: 'intermediate',
    question: 'What is the Ownership Management feature in FCCS?',
    options: [
      'Managing software licenses',
      'Defining and managing ownership relationships between entities for consolidation',
      'Tracking asset ownership',
      'User access management'
    ],
    correctIndex: 1,
    explanation: 'Ownership Management defines parent-subsidiary relationships and ownership percentages used in consolidation calculations.',
    topic: 'FCCS Ownership',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-i-8',
    category: 'consolidation',
    difficulty: 'intermediate',
    question: 'What is the purpose of Data Forms in FCCS?',
    options: [
      'PDF generation',
      'Web-based grids for data entry and viewing multidimensional data',
      'Database schema design',
      'Form letter generation'
    ],
    correctIndex: 1,
    explanation: 'Data Forms provide structured web interfaces for users to enter and review financial data.',
    topic: 'FCCS Interface',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-i-9',
    category: 'consolidation',
    difficulty: 'intermediate',
    question: 'What is "Equity Pickup" in FCCS?',
    options: [
      'Collecting equity investments',
      'Recording parent\'s share of associate/JV earnings under equity method',
      'Picking up shares from the market',
      'Employee stock option exercise'
    ],
    correctIndex: 1,
    explanation: 'Equity Pickup records the parent\'s proportional share of profits/losses from equity-method investments (associates, JVs).',
    topic: 'FCCS Investments',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-i-10',
    category: 'consolidation',
    difficulty: 'intermediate',
    question: 'What is the Intercompany Partner (ICP) dimension in FCCS?',
    options: [
      'A partner company database',
      'Dimension to tag transactions with the intercompany trading partner entity',
      'External vendor tracking',
      'Partnership agreements storage'
    ],
    correctIndex: 1,
    explanation: 'The ICP dimension identifies the trading partner for intercompany transactions, enabling matching and elimination.',
    topic: 'FCCS ICP',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-i-11',
    category: 'consolidation',
    difficulty: 'intermediate',
    question: 'What is the difference between Auto and Manual journals in FCCS?',
    options: [
      'Auto journals are faster',
      'Auto journals are system-generated (IC eliminations); Manual are user-created adjustments',
      'Manual journals have more columns',
      'Auto journals require approval'
    ],
    correctIndex: 1,
    explanation: 'Auto journals are generated by the system during consolidation; Manual journals are user-created adjustments.',
    topic: 'FCCS Journals',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-i-12',
    category: 'consolidation',
    difficulty: 'intermediate',
    question: 'What is Financial Reporting (FR) in the context of FCCS?',
    options: [
      'A financial news service',
      'Web-based reporting tool for creating formatted financial statements and reports',
      'A regulatory filing system',
      'An accounting standard'
    ],
    correctIndex: 1,
    explanation: 'Financial Reporting is Oracle\'s web-based tool for creating formatted reports, statements, and books from FCCS data.',
    topic: 'FCCS Reporting',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-i-13',
    category: 'consolidation',
    difficulty: 'intermediate',
    question: 'What is the purpose of Supplemental Data in FCCS?',
    options: [
      'Storing backup data',
      'Collecting supporting detail and footnote information for financial statements',
      'Additional user information',
      'Supplementary software licenses'
    ],
    correctIndex: 1,
    explanation: 'Supplemental Data collects supporting documentation and detail for footnotes, schedules, and disclosures.',
    topic: 'FCCS Supplemental',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-i-14',
    category: 'consolidation',
    difficulty: 'intermediate',
    question: 'What does "Force Consolidation" do in FCCS?',
    options: [
      'Overwrites all existing data',
      'Runs consolidation ignoring entity status (impacted or not)',
      'Forces users to complete consolidation',
      'Locks the database'
    ],
    correctIndex: 1,
    explanation: 'Force Consolidation runs the consolidation process for all entities regardless of their impacted status.',
    topic: 'FCCS Process',
    tool: 'oracle_fccs'
  },

  // ==========================================
  // ADVANCED (14 questions)
  // ==========================================
  {
    id: 'fccs-a-1',
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
    explanation: 'FCCS_Rate Override allows a custom exchange rate, while FCCS_Amount Override specifies an exact translated amount.',
    topic: 'FCCS Currency',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-a-2',
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
    explanation: 'FCCS consolidation flows: Entity Input → Translated Currency → Proportion → Elimination.',
    topic: 'FCCS Process',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-a-3',
    category: 'consolidation',
    difficulty: 'advanced',
    question: 'What happens when you enable a Multi-GAAP application in FCCS?',
    options: [
      'Two custom dimensions become available',
      'The Multi-GAAP dimension is created with FCCS_IFRS member auto-generated',
      'All entities must use IFRS',
      'Currency translation is disabled'
    ],
    correctIndex: 1,
    explanation: 'Enabling Multi-GAAP creates the Multi-GAAP dimension and automatically generates FCCS_IFRS member.',
    topic: 'FCCS Multi-GAAP',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-a-4',
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
    explanation: 'When no intercompany options are enabled during FCCS application creation, the ICP dimension is completely omitted.',
    topic: 'FCCS Configuration',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-a-5',
    category: 'consolidation',
    difficulty: 'advanced',
    question: 'What is the purpose of Configurable Consolidation Rules in FCCS?',
    options: [
      'To define user access rules',
      'To create custom Groovy-based consolidation logic beyond standard processing',
      'To configure report formatting',
      'To set up data validation rules'
    ],
    correctIndex: 1,
    explanation: 'Configurable Consolidation Rules allow custom Groovy-based logic for complex consolidation requirements.',
    topic: 'FCCS Rules',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-a-6',
    category: 'consolidation',
    difficulty: 'advanced',
    question: 'In FCCS Ownership Management, what happens when you run "Calculate Ownership"?',
    options: [
      'It calculates dividends',
      'It computes effective ownership percentages based on direct/indirect holdings',
      'It transfers ownership to new entities',
      'It validates ownership documents'
    ],
    correctIndex: 1,
    explanation: 'Calculate Ownership computes effective ownership considering direct and indirect holdings for the Proportion step.',
    topic: 'FCCS Ownership',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-a-7',
    category: 'consolidation',
    difficulty: 'advanced',
    question: 'What is the Supplemental Data Manager in Oracle FCCS?',
    options: [
      'A backup system',
      'A tool for collecting supporting documentation for financial statements and footnotes',
      'A secondary database',
      'A data validation tool'
    ],
    correctIndex: 1,
    explanation: 'Supplemental Data Manager collects supporting documentation to build comprehensive statement balances and footnotes.',
    topic: 'FCCS Supplemental',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-a-8',
    category: 'consolidation',
    difficulty: 'advanced',
    question: 'By default, security access is set to "None" for which three dimensions in Oracle FCCS?',
    options: [
      'Year, Period, and Scenario',
      'Entity, Account, and Data Source',
      'Currency, Movement, and View',
      'Consolidation, ICP, and Multi-GAAP'
    ],
    correctIndex: 1,
    explanation: 'Entity, Account, and Data Source dimensions have security set to "None" by default, requiring explicit grants.',
    topic: 'FCCS Security',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-a-9',
    category: 'consolidation',
    difficulty: 'advanced',
    question: 'What is the difference between FCCS_Managed Data and FCCS_Data Input in the Data Source dimension?',
    options: [
      'No difference',
      'Managed Data is from Data Management; Data Input is from forms/Smart View',
      'Managed Data is read-only',
      'Data Input is for journals only'
    ],
    correctIndex: 1,
    explanation: 'FCCS_Managed Data comes from Data Management loads; FCCS_Data Input comes from forms and Smart View entry.',
    topic: 'FCCS Data Source',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-a-10',
    category: 'consolidation',
    difficulty: 'advanced',
    question: 'What is "Joint Venture" consolidation method in FCCS?',
    options: [
      'Full consolidation',
      'Proportionate consolidation based on ownership stake',
      'No consolidation',
      'Equity method only'
    ],
    correctIndex: 1,
    explanation: 'Joint Venture consolidation uses proportionate consolidation, including only the parent\'s share of each line item.',
    topic: 'FCCS Methods',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-a-11',
    category: 'consolidation',
    difficulty: 'advanced',
    question: 'What is the purpose of the FCCS_Contribution member in the Consolidation dimension?',
    options: [
      'Charitable contributions tracking',
      'The entity\'s proportioned data contributed up to the parent',
      'Employee contribution plans',
      'Capital contributions'
    ],
    correctIndex: 1,
    explanation: 'FCCS_Contribution represents the entity\'s data after proportion calculations, ready to be aggregated to parent.',
    topic: 'FCCS Consolidation',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-a-12',
    category: 'consolidation',
    difficulty: 'advanced',
    question: 'How does FCCS handle minority interest (NCI) calculations?',
    options: [
      'Manual calculation only',
      'Automatically calculates NCI as (100% - Ownership%) of subsidiary values',
      'Uses external software',
      'NCI is not supported'
    ],
    correctIndex: 1,
    explanation: 'FCCS automatically calculates Non-Controlling Interest as the portion not owned by the parent during Proportion.',
    topic: 'FCCS NCI',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-a-13',
    category: 'consolidation',
    difficulty: 'advanced',
    question: 'What is the "Validation" account type used for in FCCS?',
    options: [
      'Validating user inputs',
      'Storing validation rules that check data integrity (e.g., A=L+E)',
      'Password validation',
      'Form validation'
    ],
    correctIndex: 1,
    explanation: 'Validation accounts store rules that check data integrity, such as verifying Assets = Liabilities + Equity.',
    topic: 'FCCS Validation',
    tool: 'oracle_fccs'
  },
  {
    id: 'fccs-a-14',
    category: 'consolidation',
    difficulty: 'advanced',
    question: 'What is "Matching Report" in FCCS Intercompany processing?',
    options: [
      'A report showing matching transactions',
      'A report comparing IC balances between partners to identify mismatches',
      'A pattern matching analysis',
      'A report matching actuals to budget'
    ],
    correctIndex: 1,
    explanation: 'Matching Reports compare intercompany balances between trading partners to identify and resolve discrepancies.',
    topic: 'FCCS ICP',
    tool: 'oracle_fccs'
  }
];
