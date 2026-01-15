import { QuizQuestion } from '../consolidationQuiz';

// Oracle PBCS Questions - 42 total (14 beginner, 14 intermediate, 14 advanced)
export const ORACLE_PBCS_QUESTIONS: QuizQuestion[] = [
  // ==========================================
  // BEGINNER (14 questions)
  // ==========================================
  {
    id: 'pbcs-b-1',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What does PBCS stand for?',
    options: [
      'Planning and Budgeting Cloud Service',
      'Performance Based Cost System',
      'Project Budget Control Service',
      'Planning Business Cloud Suite'
    ],
    correctIndex: 0,
    explanation: 'PBCS stands for Planning and Budgeting Cloud Service, Oracle\'s cloud-based planning solution.',
    topic: 'PBCS Basics',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-b-2',
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
    explanation: 'Smart View is the primary Excel interface for PBCS, enabling ad hoc analysis, data submission, and business rule execution.',
    topic: 'PBCS Tools',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-b-3',
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
    topic: 'PBCS Interface',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-b-4',
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
    explanation: 'Sandboxing provides private workspaces where planners can model what-if scenarios without affecting the main plan.',
    topic: 'PBCS Features',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-b-5',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is a "Dimension" in PBCS?',
    options: [
      'The size of reports',
      'A category for organizing data (like Account, Entity, Period)',
      'Screen resolution settings',
      'Database table columns'
    ],
    correctIndex: 1,
    explanation: 'Dimensions are data categories like Account, Entity, Period, Scenario that define how data is organized and analyzed.',
    topic: 'PBCS Concepts',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-b-6',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is a "Cube" in PBCS?',
    options: [
      'A 3D visualization',
      'A multidimensional database storing data at dimension intersections',
      'A report format',
      'A security role'
    ],
    correctIndex: 1,
    explanation: 'A cube is the multidimensional database where PBCS stores data at the intersection of dimensions.',
    topic: 'PBCS Concepts',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-b-7',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is the Entity dimension used for in PBCS?',
    options: [
      'Legal entity names',
      'Organizational structure (departments, cost centers, business units)',
      'Account types',
      'Time periods'
    ],
    correctIndex: 1,
    explanation: 'The Entity dimension represents organizational units like departments, cost centers, and business units.',
    topic: 'PBCS Dimensions',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-b-8',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is the Scenario dimension typically used for?',
    options: [
      'Test scenarios',
      'Different versions of data (Actual, Budget, Forecast, What-if)',
      'User scenarios',
      'Report layouts'
    ],
    correctIndex: 1,
    explanation: 'Scenario dimension stores different data versions like Actual, Budget, Forecast for comparison and analysis.',
    topic: 'PBCS Dimensions',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-b-9',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is the Version dimension used for?',
    options: [
      'Software versions',
      'Working copies, first submits, and final versions of the same scenario',
      'Database versions',
      'Report versions'
    ],
    correctIndex: 1,
    explanation: 'Version dimension allows multiple iterations (Working, Submitted, Final) within the same scenario.',
    topic: 'PBCS Dimensions',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-b-10',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is "Ad Hoc" analysis in PBCS Smart View?',
    options: [
      'Advertising analysis',
      'Free-form analysis where users can pivot and drill into data dynamically',
      'Predetermined reports',
      'Automated analysis'
    ],
    correctIndex: 1,
    explanation: 'Ad Hoc analysis allows users to freely explore data by pivoting dimensions and drilling into details.',
    topic: 'PBCS Analysis',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-b-11',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is the Period dimension in PBCS?',
    options: [
      'Historical periods only',
      'Time periods (months, quarters, years) for planning data',
      'Grace periods',
      'Approval periods'
    ],
    correctIndex: 1,
    explanation: 'The Period dimension contains time periods (months, quarters, years) across which planning data is stored.',
    topic: 'PBCS Dimensions',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-b-12',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What happens when you "Refresh" data in Smart View?',
    options: [
      'Data is deleted',
      'Latest data from PBCS server is retrieved and displayed',
      'The file is saved',
      'Formulas are recalculated locally'
    ],
    correctIndex: 1,
    explanation: 'Refresh retrieves the latest data from the PBCS server and updates the spreadsheet display.',
    topic: 'PBCS Smart View',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-b-13',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What does "Submit" do in PBCS?',
    options: [
      'Prints the report',
      'Saves data entered in forms or Smart View to the PBCS database',
      'Submits a ticket',
      'Exports to Excel'
    ],
    correctIndex: 1,
    explanation: 'Submit saves the data you\'ve entered in forms or Smart View to the PBCS database.',
    topic: 'PBCS Data Entry',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-b-14',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is EPBCS?',
    options: [
      'Emergency PBCS',
      'Enterprise PBCS with additional planning modules (Workforce, Capital, Projects)',
      'External PBCS',
      'Encrypted PBCS'
    ],
    correctIndex: 1,
    explanation: 'EPBCS (Enterprise PBCS) includes pre-built planning modules for Workforce, Capital Assets, and Projects.',
    topic: 'PBCS Products',
    tool: 'oracle_pbcs'
  },

  // ==========================================
  // INTERMEDIATE (14 questions)
  // ==========================================
  {
    id: 'pbcs-i-1',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'In Oracle PBCS, what is a "Planning Unit"?',
    options: [
      'A currency type',
      'The basic unit of a budget representing a specific dimension intersection for approval workflow',
      'A measurement unit for data',
      'A report template'
    ],
    correctIndex: 1,
    explanation: 'A Planning Unit represents a slice of the budget that goes through the approval workflow.',
    topic: 'PBCS Workflow',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-i-2',
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
    explanation: 'Business Rules are explicit calculations; Member Formulas calculate dynamically within the Essbase outline.',
    topic: 'PBCS Calculations',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-i-3',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What does "Substitution Variable" allow you to do in PBCS?',
    options: [
      'Replace user names',
      'Create dynamic references to frequently changing values like current month or year',
      'Substitute currency values',
      'Replace dimension members'
    ],
    correctIndex: 1,
    explanation: 'Substitution Variables are global placeholders for values that change regularly, like &CurMonth.',
    topic: 'PBCS Variables',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-i-4',
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
    explanation: 'Spread Patterns distribute annual targets across months using patterns like even spread or seasonal.',
    topic: 'PBCS Planning',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-i-5',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is a "Task List" in PBCS?',
    options: [
      'A to-do application',
      'Guided workflow presenting users with ordered tasks for budget process',
      'Project management tool',
      'Report generation queue'
    ],
    correctIndex: 1,
    explanation: 'Task Lists guide users through the planning process with ordered tasks, instructions, and links.',
    topic: 'PBCS Workflow',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-i-6',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is "Data Maps" in PBCS used for?',
    options: [
      'Geographic visualization',
      'Copying data between cubes while transforming dimensions',
      'Network mapping',
      'User location tracking'
    ],
    correctIndex: 1,
    explanation: 'Data Maps copy and transform data between different cubes, mapping source to target dimensions.',
    topic: 'PBCS Data',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-i-7',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is a "Composite Form" in PBCS?',
    options: [
      'A complex formula',
      'A form combining multiple simple forms on one page',
      'A merged database',
      'A compressed file format'
    ],
    correctIndex: 1,
    explanation: 'Composite Forms combine multiple simple forms into a single interface for related data entry.',
    topic: 'PBCS Forms',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-i-8',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is "Groovy" used for in PBCS?',
    options: [
      'Music playback',
      'Scripting complex business logic in calculation rules',
      'User interface design',
      'Database administration'
    ],
    correctIndex: 1,
    explanation: 'Groovy is a scripting language used in Calculation Manager for complex business logic.',
    topic: 'PBCS Scripting',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-i-9',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is the "Approvals" workflow in PBCS used for?',
    options: [
      'Document approval',
      'Managing the promotion, rejection, and sign-off of Planning Units',
      'User access approval',
      'Report distribution approval'
    ],
    correctIndex: 1,
    explanation: 'The Approvals process manages Planning Unit lifecycle: submission, review, approval, and sign-off.',
    topic: 'PBCS Workflow',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-i-10',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is "Drill Through" in PBCS?',
    options: [
      'Physical drilling operations',
      'Navigation from summary data to underlying source data details',
      'Data deletion',
      'Report formatting'
    ],
    correctIndex: 1,
    explanation: 'Drill Through allows users to navigate from summarized data to the underlying source transaction details.',
    topic: 'PBCS Analysis',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-i-11',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is the function of "Supporting Detail" in PBCS?',
    options: [
      'Technical documentation',
      'Line-item detail behind a cell value that aggregates to the parent',
      'Help desk support',
      'Audit logs'
    ],
    correctIndex: 1,
    explanation: 'Supporting Detail allows users to add line-item breakdowns that roll up to the cell value.',
    topic: 'PBCS Data Entry',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-i-12',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is the "Calculation Manager" in PBCS?',
    options: [
      'A calculator application',
      'Tool for creating, managing, and deploying business rules and formulas',
      'Cost estimation tool',
      'Performance calculator'
    ],
    correctIndex: 1,
    explanation: 'Calculation Manager is the interface for creating and managing business rules and calculations.',
    topic: 'PBCS Calculations',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-i-13',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is a "Smart List" in PBCS?',
    options: [
      'An intelligent AI list',
      'A dropdown list of predefined values for data entry',
      'A mailing list',
      'A shopping list'
    ],
    correctIndex: 1,
    explanation: 'Smart Lists are dropdown menus of predefined values users can select during data entry.',
    topic: 'PBCS Data Entry',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-i-14',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is "Copy Version" used for in PBCS?',
    options: [
      'Copying software versions',
      'Copying data from one version to another (e.g., Working to Final)',
      'Version control',
      'Backup creation'
    ],
    correctIndex: 1,
    explanation: 'Copy Version copies data from one version to another within the same scenario.',
    topic: 'PBCS Versions',
    tool: 'oracle_pbcs'
  },

  // ==========================================
  // ADVANCED (14 questions)
  // ==========================================
  {
    id: 'pbcs-a-1',
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
    explanation: 'Smart Push enables real-time data synchronization between Block Storage (BSO) and Aggregate Storage (ASO) cubes.',
    topic: 'PBCS Architecture',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-a-2',
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
    explanation: 'Substitution Variables make rules and reports dynamic by automatically adapting to current period or year.',
    topic: 'PBCS Variables',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-a-3',
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
    explanation: 'EPBCS adds out-of-the-box frameworks for Workforce, Capital Assets, and Projects.',
    topic: 'PBCS Products',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-a-4',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What are "Flex Forms" in Oracle PBCS?',
    options: [
      'Forms that automatically resize',
      'Smart View forms allowing users to add/reorder rows while maintaining integrity',
      'Flexible currency conversion forms',
      'Forms for flexible budgeting only'
    ],
    correctIndex: 1,
    explanation: 'Flex Forms in Smart View allow users to modify form structure while maintaining data integrity.',
    topic: 'PBCS Forms',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-a-5',
    category: 'budget',
    difficulty: 'advanced',
    question: 'In PBCS, what distinguishes a "Dense" dimension from a "Sparse" dimension?',
    options: [
      'Dense dimensions have more members',
      'Dense dimensions have most intersections populated; Sparse have few',
      'Dense is for financial data; Sparse is for operational',
      'There is no difference'
    ],
    correctIndex: 1,
    explanation: 'Dense dimensions (Account, Period) have most cells populated; Sparse (Entity, Product) have few. This affects performance.',
    topic: 'PBCS Architecture',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-a-6',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is the difference between BSO and ASO in Oracle Essbase?',
    options: [
      'BSO is for budgets, ASO is for actuals',
      'BSO (Block Storage) supports write-back; ASO (Aggregate Storage) is optimized for large-scale reporting',
      'ASO is newer and replaces BSO',
      'They are different compression formats'
    ],
    correctIndex: 1,
    explanation: 'BSO supports data input and calculations; ASO handles large sparse datasets for reporting.',
    topic: 'PBCS Architecture',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-a-7',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is Data Management (FDMEE) in Oracle EPM?',
    options: [
      'Database backup utility',
      'A data loading tool using Import, Validate, Export, and Check workflow',
      'User management console',
      'Report distribution system'
    ],
    correctIndex: 1,
    explanation: 'Data Management handles data loading from various sources using Import, Validate, Export, Check workflow.',
    topic: 'PBCS Integration',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-a-8',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is "Predictive Planning" in Oracle EPBCS?',
    options: [
      'Manual forecasting',
      'AI/ML-powered forecasting that analyzes historical data for predictions',
      'Static planning templates',
      'User prediction games'
    ],
    correctIndex: 1,
    explanation: 'Predictive Planning uses machine learning to analyze historical data and generate intelligent forecasts.',
    topic: 'PBCS AI',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-a-9',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is "Attribute Dimension" in PBCS?',
    options: [
      'A dimension with properties',
      'A dimension used to classify and report on base dimension members by characteristics',
      'A dimension for user attributes',
      'A dimension for colors'
    ],
    correctIndex: 1,
    explanation: 'Attribute dimensions classify base dimension members for alternative reporting (e.g., Products by Category).',
    topic: 'PBCS Dimensions',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-a-10',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is "Dynamic Time Series" (DTS) in PBCS?',
    options: [
      'Animated charts',
      'Automatic period-to-date calculations (YTD, QTD, MTD) without storing additional data',
      'Real-time data streaming',
      'Time zone conversions'
    ],
    correctIndex: 1,
    explanation: 'Dynamic Time Series enables period-to-date calculations on-the-fly without storing redundant data.',
    topic: 'PBCS Time',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-a-11',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is "Cascading" in PBCS report books?',
    options: [
      'Waterfall charts',
      'Generating multiple report variations based on dimension members',
      'Linked reports',
      'Report templates'
    ],
    correctIndex: 1,
    explanation: 'Cascading generates multiple report variations, one for each member of a selected dimension.',
    topic: 'PBCS Reporting',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-a-12',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is the purpose of "Allocation" rules in PBCS?',
    options: [
      'Memory allocation',
      'Distributing values from one intersection to multiple target intersections',
      'User access allocation',
      'Storage allocation'
    ],
    correctIndex: 1,
    explanation: 'Allocation rules distribute source values to multiple target intersections based on drivers or weights.',
    topic: 'PBCS Calculations',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-a-13',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is "Runtime Prompt" in PBCS Business Rules?',
    options: [
      'Error messages',
      'User input variables requested when a rule is executed',
      'System prompts',
      'Login prompts'
    ],
    correctIndex: 1,
    explanation: 'Runtime Prompts collect user input (like scenario or period selection) when executing a business rule.',
    topic: 'PBCS Rules',
    tool: 'oracle_pbcs'
  },
  {
    id: 'pbcs-a-14',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is "IPM Insights" (previously Strategic Modeling) used for?',
    options: [
      'Sales modeling',
      'Long-range financial modeling, M&A analysis, and strategic scenarios',
      'Inventory modeling',
      'HR modeling'
    ],
    correctIndex: 1,
    explanation: 'IPM Insights enables long-range strategic planning, M&A analysis, and complex financial modeling.',
    topic: 'PBCS Strategic',
    tool: 'oracle_pbcs'
  }
];
