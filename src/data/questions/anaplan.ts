import { QuizQuestion } from '../consolidationQuiz';

// Anaplan Questions - 42 total (14 beginner, 14 intermediate, 14 advanced)
export const ANAPLAN_QUESTIONS: QuizQuestion[] = [
  // ==========================================
  // BEGINNER (14 questions)
  // ==========================================
  {
    id: 'ana-b-1',
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
    explanation: 'Anaplan uses its proprietary Hyperblock engine, which performs incremental calculations updating only affected cells.',
    topic: 'Anaplan Architecture',
    tool: 'anaplan'
  },
  {
    id: 'ana-b-2',
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
    explanation: 'Workspaces are the tenant storage areas, while Models contain the actual business logic and data.',
    topic: 'Anaplan Structure',
    tool: 'anaplan'
  },
  {
    id: 'ana-b-3',
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
    explanation: 'Modules are the primary calculation engine where data is stored against dimensions.',
    topic: 'Anaplan Modules',
    tool: 'anaplan'
  },
  {
    id: 'ana-b-4',
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
    explanation: 'Line Items are the variables or calculations within a module, such as Revenue or Quantity.',
    topic: 'Anaplan Line Items',
    tool: 'anaplan'
  },
  {
    id: 'ana-b-5',
    category: 'general',
    difficulty: 'beginner',
    question: 'What is a "List" in Anaplan?',
    options: [
      'A to-do list',
      'A dimension containing members (like Products, Regions, or Employees)',
      'A report',
      'A dashboard'
    ],
    correctIndex: 1,
    explanation: 'Lists are dimensions in Anaplan containing members like Products, Regions, or Employees.',
    topic: 'Anaplan Lists',
    tool: 'anaplan'
  },
  {
    id: 'ana-b-6',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is a "Dashboard" in Anaplan?',
    options: [
      'Car dashboard',
      'An interactive page combining grids, charts, and buttons for end-user interaction',
      'A settings page',
      'A report page'
    ],
    correctIndex: 1,
    explanation: 'Dashboards are interactive pages combining grids, charts, and buttons for end-user interaction.',
    topic: 'Anaplan UX',
    tool: 'anaplan'
  },
  {
    id: 'ana-b-7',
    category: 'general',
    difficulty: 'beginner',
    question: 'What is "NUX" in Anaplan?',
    options: [
      'A code name',
      'New User Experience - the modern dashboard/app interface',
      'A calculation function',
      'A data format'
    ],
    correctIndex: 1,
    explanation: 'NUX (New User Experience) is Anaplan\'s modern, app-like interface for end users.',
    topic: 'Anaplan UX',
    tool: 'anaplan'
  },
  {
    id: 'ana-b-8',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is "Import" in Anaplan?',
    options: [
      'Buying from abroad',
      'Loading data into Anaplan from external sources or other modules',
      'A function name',
      'A module type'
    ],
    correctIndex: 1,
    explanation: 'Import loads data into Anaplan from files, data sources, or other modules.',
    topic: 'Anaplan Data',
    tool: 'anaplan'
  },
  {
    id: 'ana-b-9',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is "Export" in Anaplan?',
    options: [
      'Selling abroad',
      'Extracting data from Anaplan to files or external systems',
      'A dashboard type',
      'A calculation method'
    ],
    correctIndex: 1,
    explanation: 'Export extracts data from Anaplan to files or external systems for reporting or integration.',
    topic: 'Anaplan Data',
    tool: 'anaplan'
  },
  {
    id: 'ana-b-10',
    category: 'general',
    difficulty: 'beginner',
    question: 'What is an "Action" in Anaplan?',
    options: [
      'A movie',
      'An executable task like import, export, or process that can be triggered by users',
      'A function',
      'A calculation'
    ],
    correctIndex: 1,
    explanation: 'Actions are executable tasks (imports, exports, processes) that can be triggered manually or automatically.',
    topic: 'Anaplan Actions',
    tool: 'anaplan'
  },
  {
    id: 'ana-b-11',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is the "Time" dimension in Anaplan?',
    options: [
      'Clock time',
      'A special dimension representing periods (days, weeks, months, years)',
      'Duration',
      'Timestamp'
    ],
    correctIndex: 1,
    explanation: 'Time is a special dimension in Anaplan representing planning periods like months, quarters, and years.',
    topic: 'Anaplan Time',
    tool: 'anaplan'
  },
  {
    id: 'ana-b-12',
    category: 'general',
    difficulty: 'beginner',
    question: 'What is "Versions" dimension in Anaplan?',
    options: [
      'Software versions',
      'Different scenarios like Actual, Budget, Forecast for comparison',
      'Data versions',
      'Model versions'
    ],
    correctIndex: 1,
    explanation: 'Versions represent different scenarios (Actual, Budget, Forecast) for comparison and analysis.',
    topic: 'Anaplan Versions',
    tool: 'anaplan'
  },
  {
    id: 'ana-b-13',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is a "Grid" in Anaplan?',
    options: [
      'An electrical grid',
      'A spreadsheet-like view of module data on a dashboard',
      'A chart type',
      'A layout template'
    ],
    correctIndex: 1,
    explanation: 'Grids display module data in a spreadsheet-like format on dashboards for viewing and editing.',
    topic: 'Anaplan UX',
    tool: 'anaplan'
  },
  {
    id: 'ana-b-14',
    category: 'general',
    difficulty: 'beginner',
    question: 'What is "Model Building" in Anaplan?',
    options: [
      'Construction',
      'The process of designing modules, lists, and formulas to create a planning application',
      'Creating reports',
      'Data entry'
    ],
    correctIndex: 1,
    explanation: 'Model Building is designing the structure (modules, lists, formulas) of an Anaplan planning application.',
    topic: 'Anaplan Modeling',
    tool: 'anaplan'
  },

  // ==========================================
  // INTERMEDIATE (14 questions)
  // ==========================================
  {
    id: 'ana-i-1',
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
    explanation: 'Hub-and-Spoke uses a central Data Hub as single source of truth, synced to specialized Spoke models.',
    topic: 'Anaplan Architecture',
    tool: 'anaplan'
  },
  {
    id: 'ana-i-2',
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
    explanation: 'DISCO (Data, Input, System, Calculation, Output) is the standard methodology for organizing Anaplan modules.',
    topic: 'Anaplan Best Practices',
    tool: 'anaplan'
  },
  {
    id: 'ana-i-3',
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
    explanation: 'Sparsity refers to empty cells. High sparsity wastes memory and can slow calculations.',
    topic: 'Anaplan Performance',
    tool: 'anaplan'
  },
  {
    id: 'ana-i-4',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is "Progressive Disclosure" in Anaplan UX design?',
    options: [
      'Gradually revealing features to new users',
      'Showing detailed data in separate models while surfacing key metrics in the main app',
      'Releasing features in phases',
      'A security escalation process'
    ],
    correctIndex: 1,
    explanation: 'Progressive Disclosure surfaces key metrics while detailed data remains in separate models.',
    topic: 'Anaplan UX',
    tool: 'anaplan'
  },
  {
    id: 'ana-i-5',
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
    explanation: 'Line Item Subsets for versions avoid sparsity that comes with using the full Versions dimension.',
    topic: 'Anaplan Optimization',
    tool: 'anaplan'
  },
  {
    id: 'ana-i-6',
    category: 'general',
    difficulty: 'intermediate',
    question: 'What is a "Subsidiary View" in Anaplan?',
    options: [
      'A child company view',
      'A filtered view of a list showing only relevant members',
      'A secondary report',
      'A backup view'
    ],
    correctIndex: 1,
    explanation: 'Subsidiary Views filter a list to show only relevant members for specific use cases.',
    topic: 'Anaplan Lists',
    tool: 'anaplan'
  },
  {
    id: 'ana-i-7',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is a "Process" in Anaplan?',
    options: [
      'A business process',
      'A sequence of actions (imports, calculations, exports) executed together',
      'A workflow',
      'A calculation'
    ],
    correctIndex: 1,
    explanation: 'A Process chains multiple actions together to execute in sequence.',
    topic: 'Anaplan Automation',
    tool: 'anaplan'
  },
  {
    id: 'ana-i-8',
    category: 'general',
    difficulty: 'intermediate',
    question: 'What is "Line Item Subset" in Anaplan?',
    options: [
      'A partial line item',
      'A grouping of line items that can be used as a dimension in other modules',
      'A filter',
      'A calculation method'
    ],
    correctIndex: 1,
    explanation: 'Line Item Subsets group line items so they can be referenced as dimensions in other modules.',
    topic: 'Anaplan Modeling',
    tool: 'anaplan'
  },
  {
    id: 'ana-i-9',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is a "Numbered List" in Anaplan?',
    options: [
      'A list with numbers',
      'A list where members are generated dynamically by the system',
      'A sorted list',
      'An indexed list'
    ],
    correctIndex: 1,
    explanation: 'Numbered Lists have system-generated members that can be populated dynamically during runtime.',
    topic: 'Anaplan Lists',
    tool: 'anaplan'
  },
  {
    id: 'ana-i-10',
    category: 'general',
    difficulty: 'intermediate',
    question: 'What is "Apply To" in Anaplan modules?',
    options: [
      'A job application',
      'The dimensions that a module uses to organize its data',
      'A filter setting',
      'An export option'
    ],
    correctIndex: 1,
    explanation: 'Apply To defines which dimensions (lists) are used to dimensionalize a module.',
    topic: 'Anaplan Modules',
    tool: 'anaplan'
  },
  {
    id: 'ana-i-11',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is "Selective Access" in Anaplan?',
    options: [
      'Limited access',
      'Role-based security controlling which list members users can see or edit',
      'Partial data loading',
      'Filtered imports'
    ],
    correctIndex: 1,
    explanation: 'Selective Access provides row-level security controlling access to specific list members.',
    topic: 'Anaplan Security',
    tool: 'anaplan'
  },
  {
    id: 'ana-i-12',
    category: 'general',
    difficulty: 'intermediate',
    question: 'What is "Parent Hierarchy" in Anaplan lists?',
    options: [
      'Organizational hierarchy',
      'Rollup structure where child members aggregate to parent members',
      'Family tree',
      'Management structure'
    ],
    correctIndex: 1,
    explanation: 'Parent Hierarchies define rollup structures where children aggregate to parents.',
    topic: 'Anaplan Lists',
    tool: 'anaplan'
  },
  {
    id: 'ana-i-13',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is "Breakback" in Anaplan?',
    options: [
      'Breaking data',
      'Distributing a parent value change proportionally to child members',
      'Reversing calculations',
      'Data recovery'
    ],
    correctIndex: 1,
    explanation: 'Breakback distributes changes at parent level proportionally down to child members.',
    topic: 'Anaplan Calculations',
    tool: 'anaplan'
  },
  {
    id: 'ana-i-14',
    category: 'general',
    difficulty: 'intermediate',
    question: 'What is "Model Calendar" in Anaplan?',
    options: [
      'A scheduling tool',
      'Configuration defining the Time dimension structure (fiscal year, periods)',
      'An event calendar',
      'A holiday calendar'
    ],
    correctIndex: 1,
    explanation: 'Model Calendar configures the Time dimension including fiscal year start, period types, and granularity.',
    topic: 'Anaplan Time',
    tool: 'anaplan'
  },

  // ==========================================
  // ADVANCED (14 questions)
  // ==========================================
  {
    id: 'ana-a-1',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is "Time Ranges" in Anaplan and why is it used?',
    options: [
      'Date formatting options',
      'Allowing different modules to use different time scales to optimize performance',
      'Time zone configurations',
      'Historical data retention settings'
    ],
    correctIndex: 1,
    explanation: 'Time Ranges allow modules to use different time scales (1-year vs 5-year) without performance penalty.',
    topic: 'Anaplan Time',
    tool: 'anaplan'
  },
  {
    id: 'ana-a-2',
    category: 'general',
    difficulty: 'advanced',
    question: 'What is Dynamic Cell Access (DCA) in Anaplan?',
    options: [
      'Dynamic data loading',
      'Cell-level security allowing Read, Write, or No Access based on Boolean logic',
      'Automatic cell formatting',
      'Cell validation'
    ],
    correctIndex: 1,
    explanation: 'DCA provides cell-level security based on Boolean expressions to control read/write access.',
    topic: 'Anaplan Security',
    tool: 'anaplan'
  },
  {
    id: 'ana-a-3',
    category: 'budget',
    difficulty: 'advanced',
    question: 'How does Anaplan Connect differ from CloudWorks?',
    options: [
      'They are the same product',
      'Connect is for on-premise ETL automation; CloudWorks is for cloud-to-cloud integrations',
      'CloudWorks is older',
      'Connect is cloud-based'
    ],
    correctIndex: 1,
    explanation: 'Connect is on-premise ETL automation; CloudWorks is cloud-native for cloud-to-cloud integrations.',
    topic: 'Anaplan Integration',
    tool: 'anaplan'
  },
  {
    id: 'ana-a-4',
    category: 'general',
    difficulty: 'advanced',
    question: 'What is the primary benefit of using a Data Hub in Anaplan?',
    options: [
      'Faster report generation',
      'Centralizing master data and reducing redundancy across spoke models',
      'Better user interface',
      'Lower licensing costs'
    ],
    correctIndex: 1,
    explanation: 'The Data Hub centralizes master data as a single source of truth, reducing redundancy.',
    topic: 'Anaplan Data Hub',
    tool: 'anaplan'
  },
  {
    id: 'ana-a-5',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is "Model-to-Model" import in Anaplan?',
    options: [
      'Copying models',
      'Transferring data between models in the same or different workspaces',
      'Model comparison',
      'Template creation'
    ],
    correctIndex: 1,
    explanation: 'Model-to-Model imports transfer data between Anaplan models, enabling Hub-and-Spoke architecture.',
    topic: 'Anaplan Integration',
    tool: 'anaplan'
  },
  {
    id: 'ana-a-6',
    category: 'general',
    difficulty: 'advanced',
    question: 'What is "Polaris" in Anaplan?',
    options: [
      'A star',
      'The next-generation calculation engine providing enhanced performance',
      'A planning methodology',
      'A report type'
    ],
    correctIndex: 1,
    explanation: 'Polaris is Anaplan\'s next-generation calculation engine offering enhanced performance and scalability.',
    topic: 'Anaplan Technology',
    tool: 'anaplan'
  },
  {
    id: 'ana-a-7',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is "Formula Scope" in Anaplan?',
    options: [
      'Formula range',
      'Definition of which cells a formula applies to within a line item',
      'Calculation limit',
      'Formula visibility'
    ],
    correctIndex: 1,
    explanation: 'Formula Scope defines which dimension combinations a formula calculates for (All Periods, Not Summary, etc.).',
    topic: 'Anaplan Formulas',
    tool: 'anaplan'
  },
  {
    id: 'ana-a-8',
    category: 'general',
    difficulty: 'advanced',
    question: 'What is "List Property" in Anaplan?',
    options: [
      'List characteristics',
      'Attributes of list members (like Code, Name, or custom properties)',
      'List settings',
      'List permissions'
    ],
    correctIndex: 1,
    explanation: 'List Properties are attributes attached to list members for additional metadata and lookups.',
    topic: 'Anaplan Lists',
    tool: 'anaplan'
  },
  {
    id: 'ana-a-9',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is "Conditional Dimensionality" in Anaplan?',
    options: [
      'Conditional formatting',
      'Line items that use different dimensions based on Boolean conditions',
      'Dynamic lists',
      'Filtered dimensions'
    ],
    correctIndex: 1,
    explanation: 'Conditional Dimensionality allows line items to be dimensionalized differently based on conditions.',
    topic: 'Anaplan Modeling',
    tool: 'anaplan'
  },
  {
    id: 'ana-a-10',
    category: 'general',
    difficulty: 'advanced',
    question: 'What is "UDA" (User-Defined Attribute) equivalent in Anaplan?',
    options: [
      'Custom fields',
      'List Properties or Boolean line items used for filtering and categorization',
      'User settings',
      'Custom dimensions'
    ],
    correctIndex: 1,
    explanation: 'List Properties and Boolean line items serve as categorization tools similar to UDAs in other systems.',
    topic: 'Anaplan Modeling',
    tool: 'anaplan'
  },
  {
    id: 'ana-a-11',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is "Optimize" in Anaplan model management?',
    options: [
      'Performance tuning',
      'System process that compresses and reorganizes model data for efficiency',
      'Formula optimization',
      'List cleanup'
    ],
    correctIndex: 1,
    explanation: 'Optimize compresses and reorganizes model data to improve performance and reduce size.',
    topic: 'Anaplan Administration',
    tool: 'anaplan'
  },
  {
    id: 'ana-a-12',
    category: 'general',
    difficulty: 'advanced',
    question: 'What is "REST API" used for in Anaplan?',
    options: [
      'Taking breaks',
      'Programmatic access to Anaplan for integrations, automation, and custom applications',
      'Report styling',
      'User authentication'
    ],
    correctIndex: 1,
    explanation: 'The REST API enables programmatic interaction with Anaplan for integrations and automation.',
    topic: 'Anaplan Integration',
    tool: 'anaplan'
  },
  {
    id: 'ana-a-13',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is "SUM vs LOOKUP" performance consideration in Anaplan?',
    options: [
      'No difference',
      'SUM aggregates multiple values; LOOKUP retrieves single values - use LOOKUP when possible for performance',
      'LOOKUP is slower',
      'SUM is deprecated'
    ],
    correctIndex: 1,
    explanation: 'LOOKUP retrieves single values more efficiently than SUM when aggregation isn\'t needed.',
    topic: 'Anaplan Performance',
    tool: 'anaplan'
  },
  {
    id: 'ana-a-14',
    category: 'general',
    difficulty: 'advanced',
    question: 'What is "Revision Tag" in Anaplan?',
    options: [
      'Version control',
      'A saved snapshot of model state that can be compared or restored',
      'A release label',
      'An audit tag'
    ],
    correctIndex: 1,
    explanation: 'Revision Tags are saved snapshots of model state for version control, comparison, or rollback.',
    topic: 'Anaplan Administration',
    tool: 'anaplan'
  }
];
