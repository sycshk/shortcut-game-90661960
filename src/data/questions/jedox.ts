import { QuizQuestion } from '../consolidationQuiz';

// Jedox Questions - 42 total (14 beginner, 14 intermediate, 14 advanced)
export const JEDOX_QUESTIONS: QuizQuestion[] = [
  // ==========================================
  // BEGINNER (14 questions)
  // ==========================================
  {
    id: 'jedox-b-1',
    category: 'general',
    difficulty: 'beginner',
    question: 'What technology powers Jedox\'s multi-dimensional database?',
    options: [
      'Oracle Database',
      'PALO in-memory OLAP technology',
      'SQL Server',
      'MongoDB'
    ],
    correctIndex: 1,
    explanation: 'Jedox uses PALO, an in-memory, cell-oriented OLAP database that enables real-time data processing.',
    topic: 'Jedox Technology',
    tool: 'jedox'
  },
  {
    id: 'jedox-b-2',
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
    explanation: 'Jedox Integrator is the built-in ETL tool for connecting to data sources and loading data into PALO cubes.',
    topic: 'Jedox Integration',
    tool: 'jedox'
  },
  {
    id: 'jedox-b-3',
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
    explanation: 'Jedox Web provides a browser-based spreadsheet interface for data entry and analysis.',
    topic: 'Jedox Interface',
    tool: 'jedox'
  },
  {
    id: 'jedox-b-4',
    category: 'general',
    difficulty: 'beginner',
    question: 'What is "Jedox Spreadsheet Add-in" (formerly Excel Plus)?',
    options: [
      'A calculator add-in',
      'Excel integration enabling direct connection to Jedox databases',
      'A charting tool',
      'Spell checker'
    ],
    correctIndex: 1,
    explanation: 'The Jedox Spreadsheet Add-in connects Excel directly to PALO databases for real-time data entry.',
    topic: 'Jedox Excel',
    tool: 'jedox'
  },
  {
    id: 'jedox-b-5',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What makes Jedox unique in its approach to budgeting?',
    options: [
      'It only works with SAP',
      'Its "Excel-Plus" approach allowing Excel as a front-end while data is stored centrally',
      'It requires specialized programming skills',
      'It only supports annual budgets'
    ],
    correctIndex: 1,
    explanation: 'Jedox uses an "Excel-Plus" approach where users work in familiar Excel while data is stored centrally.',
    topic: 'Jedox Planning',
    tool: 'jedox'
  },
  {
    id: 'jedox-b-6',
    category: 'general',
    difficulty: 'beginner',
    question: 'What is a "Cube" in Jedox?',
    options: [
      'A 3D shape',
      'A multidimensional data storage structure',
      'A report template',
      'A user interface element'
    ],
    correctIndex: 1,
    explanation: 'A Cube in Jedox is a multidimensional data structure where values are stored at dimension intersections.',
    topic: 'Jedox Concepts',
    tool: 'jedox'
  },
  {
    id: 'jedox-b-7',
    category: 'general',
    difficulty: 'beginner',
    question: 'What is a "Dimension" in Jedox?',
    options: [
      'Size measurement',
      'A category for organizing data (like Time, Account, Product)',
      'Screen resolution',
      'Database size'
    ],
    correctIndex: 1,
    explanation: 'Dimensions are categories that organize data, such as Time, Account, Product, or Region.',
    topic: 'Jedox Concepts',
    tool: 'jedox'
  },
  {
    id: 'jedox-b-8',
    category: 'general',
    difficulty: 'beginner',
    question: 'What is an "Element" in Jedox?',
    options: [
      'A chemical substance',
      'A member of a dimension (like "January" in Time dimension)',
      'A report component',
      'A user role'
    ],
    correctIndex: 1,
    explanation: 'Elements are the individual members within a dimension, like specific months, products, or accounts.',
    topic: 'Jedox Concepts',
    tool: 'jedox'
  },
  {
    id: 'jedox-b-9',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is "Write-back" capability in Jedox?',
    options: [
      'Reversing transactions',
      'Users can directly enter data into OLAP cubes from Excel or web',
      'Data backup process',
      'Undo functionality'
    ],
    correctIndex: 1,
    explanation: 'Write-back allows users to input data directly into PALO cubes through Excel or web interfaces.',
    topic: 'Jedox Planning',
    tool: 'jedox'
  },
  {
    id: 'jedox-b-10',
    category: 'general',
    difficulty: 'beginner',
    question: 'What is Jedox Cloud?',
    options: [
      'Weather forecasting',
      'Cloud-hosted version of Jedox platform',
      'File storage service',
      'Email hosting'
    ],
    correctIndex: 1,
    explanation: 'Jedox Cloud is the hosted SaaS version of the Jedox platform managed in the cloud.',
    topic: 'Jedox Deployment',
    tool: 'jedox'
  },
  {
    id: 'jedox-b-11',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What type of analysis can Jedox perform?',
    options: [
      'Only financial analysis',
      'OLAP analysis including slice, dice, drill-down, and pivot',
      'Only text analysis',
      'Only image analysis'
    ],
    correctIndex: 1,
    explanation: 'Jedox supports full OLAP analysis capabilities including slicing, dicing, drilling, and pivoting data.',
    topic: 'Jedox Analysis',
    tool: 'jedox'
  },
  {
    id: 'jedox-b-12',
    category: 'general',
    difficulty: 'beginner',
    question: 'What is "In-Memory" technology in Jedox?',
    options: [
      'Memorization techniques',
      'Data is stored in RAM for fast access and calculations',
      'Memory optimization',
      'Data compression'
    ],
    correctIndex: 1,
    explanation: 'In-memory technology stores data in RAM, enabling extremely fast calculations and real-time analysis.',
    topic: 'Jedox Technology',
    tool: 'jedox'
  },
  {
    id: 'jedox-b-13',
    category: 'budget',
    difficulty: 'beginner',
    question: 'What is a "Report" in Jedox Web?',
    options: [
      'A document file',
      'A spreadsheet-based view that displays and allows interaction with cube data',
      'A news article',
      'An error log'
    ],
    correctIndex: 1,
    explanation: 'Reports in Jedox Web are interactive spreadsheet views connected to cube data for analysis and entry.',
    topic: 'Jedox Reporting',
    tool: 'jedox'
  },
  {
    id: 'jedox-b-14',
    category: 'general',
    difficulty: 'beginner',
    question: 'What is "Consolidation" in Jedox?',
    options: [
      'Combining databases',
      'Aggregating element values up the hierarchy',
      'Merging companies',
      'Data compression'
    ],
    correctIndex: 1,
    explanation: 'Consolidation aggregates values from child elements up to parent elements in the hierarchy.',
    topic: 'Jedox Consolidation',
    tool: 'jedox'
  },

  // ==========================================
  // INTERMEDIATE (14 questions)
  // ==========================================
  {
    id: 'jedox-i-1',
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
    explanation: 'Subsets are dynamic views of dimension members filtered by attributes, data conditions, or hierarchy.',
    topic: 'Jedox Subsets',
    tool: 'jedox'
  },
  {
    id: 'jedox-i-2',
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
    explanation: 'PALO Rules are server-side formulas that calculate cell values on-the-fly for allocations and consolidation.',
    topic: 'Jedox Rules',
    tool: 'jedox'
  },
  {
    id: 'jedox-i-3',
    category: 'consolidation',
    difficulty: 'intermediate',
    question: 'In Jedox\'s Financial Consolidation Model, which standards are supported?',
    options: [
      'Only US GAAP',
      'IFRS, US GAAP, and local GAAPs',
      'Only IFRS',
      'Tax accounting standards only'
    ],
    correctIndex: 1,
    explanation: 'Jedox supports multiple accounting standards including IFRS, US GAAP, and various local GAAPs.',
    topic: 'Jedox Consolidation',
    tool: 'jedox'
  },
  {
    id: 'jedox-i-4',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is Jedox Integrator used for?',
    options: [
      'User interface design',
      'ETL processes to extract data from ERPs like SAP, Oracle, and NetSuite',
      'Creating financial reports',
      'Managing user permissions'
    ],
    correctIndex: 1,
    explanation: 'Jedox Integrator is a powerful ETL tool for extracting data from various sources and loading into cubes.',
    topic: 'Jedox ETL',
    tool: 'jedox'
  },
  {
    id: 'jedox-i-5',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is a "Consolidation Element" in Jedox?',
    options: [
      'A single data point',
      'A parent element that aggregates child element values',
      'A company entity',
      'A reporting period'
    ],
    correctIndex: 1,
    explanation: 'Consolidation elements (C-elements) aggregate values from their child elements in the hierarchy.',
    topic: 'Jedox Hierarchy',
    tool: 'jedox'
  },
  {
    id: 'jedox-i-6',
    category: 'general',
    difficulty: 'intermediate',
    question: 'What is "PALO.DATAC" function in Jedox Excel Add-in?',
    options: [
      'Data comparison',
      'Retrieves a single cell value from a cube while specifying dimension elements',
      'Data compression',
      'Data copy'
    ],
    correctIndex: 1,
    explanation: 'PALO.DATAC retrieves a specific cell value from a cube based on the specified dimension members.',
    topic: 'Jedox Functions',
    tool: 'jedox'
  },
  {
    id: 'jedox-i-7',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is "Splashing" in Jedox?',
    options: [
      'Visual effects',
      'Distributing a value entered at a consolidated level down to base elements',
      'Data visualization',
      'Error notifications'
    ],
    correctIndex: 1,
    explanation: 'Splashing distributes a value entered at a parent level proportionally to child elements.',
    topic: 'Jedox Planning',
    tool: 'jedox'
  },
  {
    id: 'jedox-i-8',
    category: 'general',
    difficulty: 'intermediate',
    question: 'What is an "Attribute" in Jedox?',
    options: [
      'A user property',
      'Additional properties assigned to dimension elements for filtering and reporting',
      'A security setting',
      'A calculation type'
    ],
    correctIndex: 1,
    explanation: 'Attributes are properties assigned to elements (like Region for Products) for classification and filtering.',
    topic: 'Jedox Attributes',
    tool: 'jedox'
  },
  {
    id: 'jedox-i-9',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is "Cell Level Security" in Jedox?',
    options: [
      'Protecting cells from editing',
      'Controlling read/write access to specific cube cell intersections',
      'Encrypting cell data',
      'Cell formatting protection'
    ],
    correctIndex: 1,
    explanation: 'Cell Level Security controls which users can read or write to specific cell intersections.',
    topic: 'Jedox Security',
    tool: 'jedox'
  },
  {
    id: 'jedox-i-10',
    category: 'general',
    difficulty: 'intermediate',
    question: 'What is "Dimension Server" in Jedox?',
    options: [
      'A separate server for dimensions',
      'Component managing dimension metadata and hierarchies',
      'A DNS server',
      'A display server'
    ],
    correctIndex: 1,
    explanation: 'The Dimension Server manages dimension structures, elements, and hierarchies within PALO.',
    topic: 'Jedox Architecture',
    tool: 'jedox'
  },
  {
    id: 'jedox-i-11',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is a "Dynarange" in Jedox reporting?',
    options: [
      'A dynamic range that automatically expands based on dimension elements',
      'A range of dates',
      'A price range',
      'A data range limit'
    ],
    correctIndex: 0,
    explanation: 'Dynaranges automatically expand reports to include all elements from a dimension or subset.',
    topic: 'Jedox Reporting',
    tool: 'jedox'
  },
  {
    id: 'jedox-i-12',
    category: 'general',
    difficulty: 'intermediate',
    question: 'What is "Rights Management" in Jedox?',
    options: [
      'Legal rights documentation',
      'System for controlling user access to databases, cubes, dimensions, and elements',
      'Copyright management',
      'Licensing system'
    ],
    correctIndex: 1,
    explanation: 'Rights Management controls user permissions at database, cube, dimension, and element levels.',
    topic: 'Jedox Security',
    tool: 'jedox'
  },
  {
    id: 'jedox-i-13',
    category: 'budget',
    difficulty: 'intermediate',
    question: 'What is "Enterprise Mode" in Jedox?',
    options: [
      'Large company discount',
      'Deployment option with centralized administration and multiple OLAP servers',
      'Enterprise software package',
      'Business class support'
    ],
    correctIndex: 1,
    explanation: 'Enterprise Mode enables centralized administration across multiple OLAP servers and users.',
    topic: 'Jedox Deployment',
    tool: 'jedox'
  },
  {
    id: 'jedox-i-14',
    category: 'general',
    difficulty: 'intermediate',
    question: 'What is a "Worksheet" in Jedox Web?',
    options: [
      'A homework assignment',
      'A container holding multiple report elements and charts',
      'A user profile',
      'A system log'
    ],
    correctIndex: 1,
    explanation: 'Worksheets contain report elements, charts, and forms to create interactive planning interfaces.',
    topic: 'Jedox Interface',
    tool: 'jedox'
  },

  // ==========================================
  // ADVANCED (14 questions)
  // ==========================================
  {
    id: 'jedox-a-1',
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
    explanation: 'Jedox\'s Digital Business Twin creates a dynamic replica of operations for real-time scenario modeling.',
    topic: 'Jedox Modeling',
    tool: 'jedox'
  },
  {
    id: 'jedox-a-2',
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
    explanation: 'Supervision Server provides high availability through active-passive clustering with automatic failover.',
    topic: 'Jedox HA',
    tool: 'jedox'
  },
  {
    id: 'jedox-a-3',
    category: 'consolidation',
    difficulty: 'advanced',
    question: 'What is the purpose of "GPU acceleration" in Jedox?',
    options: [
      'Gaming support',
      'Accelerating complex calculations using graphics processing units',
      'Video rendering',
      'Display graphics'
    ],
    correctIndex: 1,
    explanation: 'Jedox supports GPU acceleration for complex aggregations, significantly improving performance.',
    topic: 'Jedox Performance',
    tool: 'jedox'
  },
  {
    id: 'jedox-a-4',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is "Modelling" in Jedox Report Designer?',
    options: [
      '3D modeling',
      'Creating dynamic report templates with placeholders that adapt to dimension changes',
      'Data modeling',
      'Financial forecasting'
    ],
    correctIndex: 1,
    explanation: 'Report Modelling creates dynamic templates where dimensions serve as placeholders, automatically adapting.',
    topic: 'Jedox Reporting',
    tool: 'jedox'
  },
  {
    id: 'jedox-a-5',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is "MarkerRules" syntax in Jedox PALO Rules?',
    options: [
      'Highlighting rules',
      'Markers indicating which cells should be calculated by the rule',
      'Bookmarking rules',
      'Validation markers'
    ],
    correctIndex: 1,
    explanation: 'MarkerRules define which cell intersections trigger the rule calculation, optimizing performance.',
    topic: 'Jedox Rules',
    tool: 'jedox'
  },
  {
    id: 'jedox-a-6',
    category: 'general',
    difficulty: 'advanced',
    question: 'What is "SVS" (Splash Value System) in Jedox?',
    options: [
      'Value stream mapping',
      'Advanced splashing algorithms for data distribution including allocation bases',
      'Security value settings',
      'System version settings'
    ],
    correctIndex: 1,
    explanation: 'SVS provides advanced splashing algorithms for distributing values based on various allocation methods.',
    topic: 'Jedox Planning',
    tool: 'jedox'
  },
  {
    id: 'jedox-a-7',
    category: 'consolidation',
    difficulty: 'advanced',
    question: 'What is "Currency Conversion" cube architecture in Jedox?',
    options: [
      'A single cube solution',
      'Separate cubes for local currency, exchange rates, and reporting currency',
      'Automatic currency detection',
      'Real-time forex integration'
    ],
    correctIndex: 1,
    explanation: 'Best practice uses separate cubes for local amounts, exchange rates, and converted reporting currency amounts.',
    topic: 'Jedox Currency',
    tool: 'jedox'
  },
  {
    id: 'jedox-a-8',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is "Groovy" used for in Jedox Integrator?',
    options: [
      'Music playback',
      'Scripting complex ETL transformations and business logic',
      'User interface design',
      'Database administration'
    ],
    correctIndex: 1,
    explanation: 'Groovy scripting enables complex data transformations and business logic in Jedox Integrator.',
    topic: 'Jedox ETL',
    tool: 'jedox'
  },
  {
    id: 'jedox-a-9',
    category: 'general',
    difficulty: 'advanced',
    question: 'What is "Audit Logging" in Jedox?',
    options: [
      'Financial audit reports',
      'Tracking all data changes including who, when, and what values were modified',
      'Login tracking only',
      'Error logging'
    ],
    correctIndex: 1,
    explanation: 'Audit Logging tracks all data changes with user, timestamp, and before/after values for compliance.',
    topic: 'Jedox Audit',
    tool: 'jedox'
  },
  {
    id: 'jedox-a-10',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is "Global Rules" vs "Cube Rules" in Jedox?',
    options: [
      'Same thing',
      'Global Rules apply across cubes; Cube Rules are specific to one cube',
      'Global is faster',
      'Cube Rules are deprecated'
    ],
    correctIndex: 1,
    explanation: 'Global Rules can reference multiple cubes; Cube Rules apply only within a single cube context.',
    topic: 'Jedox Rules',
    tool: 'jedox'
  },
  {
    id: 'jedox-a-11',
    category: 'general',
    difficulty: 'advanced',
    question: 'What is "PALO.SETDATA" function complexity?',
    options: [
      'Simple data setting',
      'Write data to cube with options for splash, add, and lock control',
      'Set configuration',
      'Data validation'
    ],
    correctIndex: 1,
    explanation: 'PALO.SETDATA writes data with control over splashing behavior, add vs. replace, and cell locking.',
    topic: 'Jedox Functions',
    tool: 'jedox'
  },
  {
    id: 'jedox-a-12',
    category: 'consolidation',
    difficulty: 'advanced',
    question: 'What is "Intercompany Elimination" approach in Jedox Financial Consolidation?',
    options: [
      'Manual journal entries',
      'Rules-based automation that matches and eliminates IC transactions',
      'External software',
      'Spreadsheet-based'
    ],
    correctIndex: 1,
    explanation: 'Jedox uses rules-based elimination that automatically matches and eliminates intercompany transactions.',
    topic: 'Jedox Consolidation',
    tool: 'jedox'
  },
  {
    id: 'jedox-a-13',
    category: 'budget',
    difficulty: 'advanced',
    question: 'What is "Optimizer" in Jedox cube management?',
    options: [
      'Performance tuning tool',
      'Background process that reorganizes cube data for optimal storage and retrieval',
      'Query optimizer',
      'Cost optimizer'
    ],
    correctIndex: 1,
    explanation: 'The Optimizer reorganizes cube storage periodically for optimal performance and reduced memory usage.',
    topic: 'Jedox Performance',
    tool: 'jedox'
  },
  {
    id: 'jedox-a-14',
    category: 'general',
    difficulty: 'advanced',
    question: 'What is "REST API" in Jedox used for?',
    options: [
      'Taking breaks',
      'Programmatic access to Jedox data and metadata for integrations',
      'Reset functionality',
      'Report styling'
    ],
    correctIndex: 1,
    explanation: 'The REST API enables external applications to interact with Jedox data, dimensions, and metadata programmatically.',
    topic: 'Jedox Integration',
    tool: 'jedox'
  }
];
