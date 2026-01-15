import { QuizQuestion } from '../consolidationQuiz';

// CCH Tagetik Questions - 42 total (14 beginner, 14 intermediate, 14 advanced)
export const TAGETIK_QUESTIONS: QuizQuestion[] = [
  // ==========================================
  // BEGINNER (14 questions)
  // ==========================================
  {
    id: 'tag-b-1',
    category: 'general',
    difficulty: 'beginner',
    question: 'What is CCH Tagetik (now Wolters Kluwer)?',
    options: [
      'A tax preparation software',
      'A unified CPM platform for financial close, consolidation, planning, and reporting',
      'A payroll system',
      'An ERP system'
    ],
    correctIndex: 1,
    explanation: 'CCH Tagetik is a unified Corporate Performance Management platform from Wolters Kluwer.',
    topic: 'Tagetik Basics',
    tool: 'tagetik'
  },
  {
    id: 'tag-b-2',
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
    explanation: 'Tagetik\'s standard system dimensions include Period, Scenario, Currency, Entity, Account, and Category.',
    topic: 'Tagetik Dimensions',
    tool: 'tagetik'
  },
  {
    id: 'tag-b-3',
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
    explanation: 'The Matrix Designer is Tagetik\'s Excel-based tool for creating dynamic and reusable reports.',
    topic: 'Tagetik Reporting',
    tool: 'tagetik'
  },
  {
    id: 'tag-b-4',
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
    explanation: 'Tagetik provides a unified platform covering the entire Office of Finance needs.',
    topic: 'Tagetik Platform',
    tool: 'tagetik'
  },
  {
    id: 'tag-b-5',
    category: 'general',
    difficulty: 'beginner',
    question: 'What is the "Entity" dimension in Tagetik?',
    options: [
      'A database entity',
      'The organizational structure representing companies, business units, and cost centers',
      'A user type',
      'A report type'
    ],
    correctIndex: 1,
    explanation: 'The Entity dimension represents the organizational hierarchy including companies and business units.',
    topic: 'Tagetik Dimensions',
    tool: 'tagetik'
  },
  {
    id: 'tag-b-6',
    category: 'consolidation',
    difficulty: 'beginner',
    question: 'What is the "Scenario" dimension used for in Tagetik?',
    options: [
      'Test scenarios',
      'Different data versions like Actual, Budget, Forecast, and What-if',
      'User scenarios',
      'Report layouts'
    ],
    correctIndex: 1,
    explanation: 'Scenarios store different data versions for comparison and analysis.',
    topic: 'Tagetik Dimensions',
    tool: 'tagetik'
  },
  {
    id: 'tag-b-7',
    category: 'general',
    difficulty: 'beginner',
    question: 'What is "Category" dimension in Tagetik?',
    options: [
      'Product categories',
      'Data classification like Opening, Flow, Adjustment, and Closing',
      'User categories',
      'Report categories'
    ],
    correctIndex: 1,
    explanation: 'Category typically classifies data types such as Opening Balance, Movements, Adjustments, and Closing.',
    topic: 'Tagetik Dimensions',
    tool: 'tagetik'
  },
  {
    id: 'tag-b-8',
    category: 'consolidation',
    difficulty: 'beginner',
    question: 'What is the purpose of "Data Entry" forms in Tagetik?',
    options: [
      'Creating databases',
      'Web-based interfaces for users to input financial and operational data',
      'Entry level positions',
      'System configuration'
    ],
    correctIndex: 1,
    explanation: 'Data Entry forms provide structured interfaces for users to input data into the Tagetik system.',
    topic: 'Tagetik Interface',
    tool: 'tagetik'
  },
  {
    id: 'tag-b-9',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is the "Period" dimension in Tagetik?',
    options: [
      'Historical periods only',
      'Time periods (months, quarters, years) for organizing financial data',
      'Grace periods',
      'Trial periods'
    ],
    correctIndex: 1,
    explanation: 'The Period dimension organizes data by time: months, quarters, half-years, and years.',
    topic: 'Tagetik Dimensions',
    tool: 'tagetik'
  },
  {
    id: 'tag-b-10',
    category: 'general',
    difficulty: 'beginner',
    question: 'What is "Workflow" in Tagetik?',
    options: [
      'Employee schedule',
      'Automated process routing for data collection, validation, and approval',
      'Network flow',
      'Data flow'
    ],
    correctIndex: 1,
    explanation: 'Workflow automates business processes including data collection, validation, review, and approval.',
    topic: 'Tagetik Workflow',
    tool: 'tagetik'
  },
  {
    id: 'tag-b-11',
    category: 'consolidation',
    difficulty: 'beginner',
    question: 'What is "Intercompany" in Tagetik?',
    options: [
      'Company comparison',
      'Transactions between entities that need to be tracked and eliminated in consolidation',
      'International company',
      'Internet company'
    ],
    correctIndex: 1,
    explanation: 'Intercompany refers to transactions between group entities requiring elimination during consolidation.',
    topic: 'Tagetik IC',
    tool: 'tagetik'
  },
  {
    id: 'tag-b-12',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is a "Report" in Tagetik?',
    options: [
      'A news report',
      'A formatted output displaying financial and operational data',
      'A progress report',
      'A bug report'
    ],
    correctIndex: 1,
    explanation: 'Reports are formatted views of data for analysis, presentation, and regulatory filing.',
    topic: 'Tagetik Reporting',
    tool: 'tagetik'
  },
  {
    id: 'tag-b-13',
    category: 'general',
    difficulty: 'beginner',
    question: 'What is "Dashboard" in Tagetik?',
    options: [
      'Car dashboard',
      'Visual display of KPIs, charts, and key metrics for quick insights',
      'Control panel',
      'Settings page'
    ],
    correctIndex: 1,
    explanation: 'Dashboards provide visual displays of key performance indicators and metrics for decision-making.',
    topic: 'Tagetik Interface',
    tool: 'tagetik'
  },
  {
    id: 'tag-b-14',
    category: 'consolidation',
    difficulty: 'beginner',
    question: 'What is "Currency Translation" in Tagetik?',
    options: [
      'Language translation',
      'Converting foreign subsidiary financials to the group reporting currency',
      'Currency exchange',
      'Money transfer'
    ],
    correctIndex: 1,
    explanation: 'Currency Translation converts foreign entity data to the parent\'s reporting currency for consolidation.',
    topic: 'Tagetik Currency',
    tool: 'tagetik'
  },

  // ==========================================
  // INTERMEDIATE (14 questions)
  // ==========================================
  {
    id: 'tag-i-1',
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
    explanation: 'The Movement dimension tracks how balance sheet values change over time.',
    topic: 'Tagetik Movement',
    tool: 'tagetik'
  },
  {
    id: 'tag-i-2',
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
    explanation: 'The Analytical Workspace allows unlimited custom dimensions for detailed operational planning.',
    topic: 'Tagetik Architecture',
    tool: 'tagetik'
  },
  {
    id: 'tag-i-3',
    category: 'general',
    difficulty: 'intermediate',
    question: 'What is "Intelligent Disclosure" in CCH Tagetik?',
    options: [
      'AI-powered data validation',
      'Integration linking consolidated data directly to Microsoft Word and PowerPoint',
      'Automatic audit trail generation',
      'Smart data masking'
    ],
    correctIndex: 1,
    explanation: 'Intelligent Disclosure integrates financial data directly with Word and PowerPoint for board reporting.',
    topic: 'Tagetik Disclosure',
    tool: 'tagetik'
  },
  {
    id: 'tag-i-4',
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
    explanation: 'IC Matching automatically reconciles intercompany balances and manages resolution workflows.',
    topic: 'Tagetik IC',
    tool: 'tagetik'
  },
  {
    id: 'tag-i-5',
    category: 'general',
    difficulty: 'intermediate',
    question: 'What is "Validation Rules" in Tagetik?',
    options: [
      'Password validation',
      'Rules that check data integrity, completeness, and accuracy before consolidation',
      'User validation',
      'Form validation'
    ],
    correctIndex: 1,
    explanation: 'Validation Rules ensure data quality by checking integrity, completeness, and accuracy.',
    topic: 'Tagetik Validation',
    tool: 'tagetik'
  },
  {
    id: 'tag-i-6',
    category: 'consolidation',
    difficulty: 'intermediate',
    question: 'What is "Ownership Management" in Tagetik?',
    options: [
      'Asset ownership tracking',
      'Defining and managing ownership percentages and consolidation methods for entities',
      'User ownership',
      'Data ownership'
    ],
    correctIndex: 1,
    explanation: 'Ownership Management defines entity relationships and percentages for consolidation calculations.',
    topic: 'Tagetik Consolidation',
    tool: 'tagetik'
  },
  {
    id: 'tag-i-7',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is "Allocation" in Tagetik?',
    options: [
      'Resource allocation',
      'Distributing costs or revenues across entities, products, or dimensions based on drivers',
      'Memory allocation',
      'Budget allocation'
    ],
    correctIndex: 1,
    explanation: 'Allocation distributes values across dimensions based on drivers like revenue or headcount.',
    topic: 'Tagetik Allocations',
    tool: 'tagetik'
  },
  {
    id: 'tag-i-8',
    category: 'general',
    difficulty: 'intermediate',
    question: 'What is "Audit Trail" in Tagetik?',
    options: [
      'A hiking trail',
      'Complete tracking of all data changes including who, when, and what was modified',
      'Audit reports',
      'A review process'
    ],
    correctIndex: 1,
    explanation: 'Audit Trail tracks all data modifications with user, timestamp, and before/after values.',
    topic: 'Tagetik Audit',
    tool: 'tagetik'
  },
  {
    id: 'tag-i-9',
    category: 'consolidation',
    difficulty: 'intermediate',
    question: 'What is "Journal Entry" in Tagetik consolidation?',
    options: [
      'A diary entry',
      'Manual adjustments to financial data for corrections, reclassifications, or eliminations',
      'A blog post',
      'A log entry'
    ],
    correctIndex: 1,
    explanation: 'Journal Entries are manual adjustments for corrections, reclassifications, or manual eliminations.',
    topic: 'Tagetik Journals',
    tool: 'tagetik'
  },
  {
    id: 'tag-i-10',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is "Driver-Based Planning" in Tagetik?',
    options: [
      'Planning for drivers',
      'Using operational drivers (volume, rate, headcount) to calculate financial outcomes',
      'Vehicle planning',
      'Software drivers'
    ],
    correctIndex: 1,
    explanation: 'Driver-based planning links operational metrics to financial outcomes for flexible forecasting.',
    topic: 'Tagetik Planning',
    tool: 'tagetik'
  },
  {
    id: 'tag-i-11',
    category: 'general',
    difficulty: 'intermediate',
    question: 'What is "Process Monitor" in Tagetik?',
    options: [
      'CPU monitor',
      'Dashboard showing status of financial close tasks, deadlines, and bottlenecks',
      'Process documentation',
      'Manufacturing monitor'
    ],
    correctIndex: 1,
    explanation: 'Process Monitor provides visibility into financial close status, task completion, and bottlenecks.',
    topic: 'Tagetik Close',
    tool: 'tagetik'
  },
  {
    id: 'tag-i-12',
    category: 'consolidation',
    difficulty: 'intermediate',
    question: 'What is "Minority Interest" calculation in Tagetik?',
    options: [
      'Small investor tracking',
      'Automatic calculation of non-controlling interest based on ownership percentages',
      'Minority shareholder reports',
      'Small balance tracking'
    ],
    correctIndex: 1,
    explanation: 'Tagetik automatically calculates NCI based on ownership for partially-owned subsidiaries.',
    topic: 'Tagetik NCI',
    tool: 'tagetik'
  },
  {
    id: 'tag-i-13',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is "Rolling Forecast" in Tagetik?',
    options: [
      'A forecast that rolls',
      'Continuously extending the forecast horizon as each period closes',
      'A rotating schedule',
      'A moving average'
    ],
    correctIndex: 1,
    explanation: 'Rolling Forecast extends the planning horizon continuously, always looking forward a set number of periods.',
    topic: 'Tagetik Forecasting',
    tool: 'tagetik'
  },
  {
    id: 'tag-i-14',
    category: 'general',
    difficulty: 'intermediate',
    question: 'What is "Data Connector" in Tagetik?',
    options: [
      'A cable',
      'Pre-built integrations for loading data from ERPs, databases, and other sources',
      'A network connector',
      'A data cable'
    ],
    correctIndex: 1,
    explanation: 'Data Connectors provide pre-built integrations with ERPs, databases, and other data sources.',
    topic: 'Tagetik Integration',
    tool: 'tagetik'
  },

  // ==========================================
  // ADVANCED (14 questions)
  // ==========================================
  {
    id: 'tag-a-1',
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
    explanation: 'The AIH handles granular operational data and supports Data Transformation Packages for analytical allocations.',
    topic: 'Tagetik AIH',
    tool: 'tagetik'
  },
  {
    id: 'tag-a-2',
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
    explanation: 'Tagetik provides pre-packaged Starter Kits for complex regulatory requirements.',
    topic: 'Tagetik Compliance',
    tool: 'tagetik'
  },
  {
    id: 'tag-a-3',
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
    explanation: 'DTPs perform operations like analytical allocations on granular data in the AIH.',
    topic: 'Tagetik DTP',
    tool: 'tagetik'
  },
  {
    id: 'tag-a-4',
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
    explanation: 'CCH Tagetik has a native SAP S/4HANA connector, plus RESTful/OData APIs for other systems.',
    topic: 'Tagetik Integration',
    tool: 'tagetik'
  },
  {
    id: 'tag-a-5',
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
    explanation: 'Tagetik recommends OAuth 2.0 with access tokens for secure external REST connections.',
    topic: 'Tagetik Security',
    tool: 'tagetik'
  },
  {
    id: 'tag-a-6',
    category: 'general',
    difficulty: 'advanced',
    question: 'What is CCH Tagetik\'s key differentiator compared to Oracle FCCS?',
    options: [
      'Lower cost',
      'Stronger focus on specialized regulatory Starter Kits and native SAP integration',
      'Better Excel support',
      'More users supported'
    ],
    correctIndex: 1,
    explanation: 'Tagetik differentiates with pre-built regulatory Starter Kits and native SAP S/4HANA integration.',
    topic: 'Tagetik Comparison',
    tool: 'tagetik'
  },
  {
    id: 'tag-a-7',
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
    explanation: 'Datasets are defined data collections within the Analytical Workspace, organized by dimensions.',
    topic: 'Tagetik Dataset',
    tool: 'tagetik'
  },
  {
    id: 'tag-a-8',
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
    explanation: 'iXBRL tagging enables automated preparation of machine-readable financial reports for regulators.',
    topic: 'Tagetik XBRL',
    tool: 'tagetik'
  },
  {
    id: 'tag-a-9',
    category: 'consolidation',
    difficulty: 'advanced',
    question: 'What is "Equity Pickup" method in Tagetik consolidation?',
    options: [
      'Collecting equity',
      'Recording parent\'s share of associate profits under equity method accounting',
      'Equity fundraising',
      'Stock purchase'
    ],
    correctIndex: 1,
    explanation: 'Equity Pickup records the parent\'s proportional share of associate/JV earnings.',
    topic: 'Tagetik Methods',
    tool: 'tagetik'
  },
  {
    id: 'tag-a-10',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is "What-If Analysis" capability in Tagetik?',
    options: [
      'Hypothetical questions',
      'Scenario modeling to test different assumptions and see financial impact',
      'Historical analysis',
      'Trend analysis'
    ],
    correctIndex: 1,
    explanation: 'What-If Analysis enables scenario modeling to test different assumptions and their financial impact.',
    topic: 'Tagetik Analysis',
    tool: 'tagetik'
  },
  {
    id: 'tag-a-11',
    category: 'consolidation',
    difficulty: 'advanced',
    question: 'What is "Goodwill Impairment" testing in Tagetik?',
    options: [
      'Testing goodwill',
      'Automated calculations comparing carrying value to recoverable amount for impairment',
      'Good testing practices',
      'Employee morale testing'
    ],
    correctIndex: 1,
    explanation: 'Tagetik supports goodwill impairment testing by comparing carrying values to recoverable amounts.',
    topic: 'Tagetik Impairment',
    tool: 'tagetik'
  },
  {
    id: 'tag-a-12',
    category: 'general',
    difficulty: 'advanced',
    question: 'What is "Business Intelligence" integration in Tagetik?',
    options: [
      'Company intelligence',
      'Native connections to BI tools like Power BI and Tableau for enhanced visualization',
      'Competitive intelligence',
      'AI integration'
    ],
    correctIndex: 1,
    explanation: 'Tagetik integrates with BI tools for enhanced visualization and self-service analytics.',
    topic: 'Tagetik BI',
    tool: 'tagetik'
  },
  {
    id: 'tag-a-13',
    category: 'consolidation',
    difficulty: 'advanced',
    question: 'What is "Parallel GAAP" in Tagetik?',
    options: [
      'Side-by-side GAAPs',
      'Maintaining multiple sets of books for different accounting standards simultaneously',
      'GAAP comparison',
      'GAAP versions'
    ],
    correctIndex: 1,
    explanation: 'Parallel GAAP maintains multiple books (Local GAAP, IFRS, US GAAP) for the same transactions.',
    topic: 'Tagetik Multi-GAAP',
    tool: 'tagetik'
  },
  {
    id: 'tag-a-14',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is "Predictive Analytics" in Tagetik?',
    options: [
      'Fortune telling',
      'AI/ML algorithms analyzing historical data to forecast trends and identify patterns',
      'Statistical reports',
      'Trend lines'
    ],
    correctIndex: 1,
    explanation: 'Predictive Analytics uses AI/ML to analyze historical patterns and generate intelligent forecasts.',
    topic: 'Tagetik AI',
    tool: 'tagetik'
  }
];
