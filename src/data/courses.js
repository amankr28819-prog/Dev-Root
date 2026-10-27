/**
 * Dev-root Course Catalogue Data Definition
 * Contains the comprehensive curriculum paths (Courses 1 to 17 + Case Studies),
 * progressing from absolute beginner foundations to full-stack production architecture.
 */

export const COURSES = [
  {
    id: 'course-1',
    slug: 'web-internet-fundamentals',
    title: 'Course 1: Understanding the Web',
    category: 'Fundamentals',
    level: 'Beginner',
    duration: '4 Lessons • 2 Hours',
    description: 'Start here with zero prior technical knowledge. Learn what the internet is, how clients and servers talk, DNS lookups, HTTP requests and responses, and how browsers draw web pages.',
    status: 'available',
    objectives: [
      'Understand the difference between the Internet and the World Wide Web.',
      'Trace the end-to-end journey of typing a URL into a browser to seeing pixels on screen.',
      'Distinguish client-side responsibilities (browser) from server-side responsibilities.',
      'Master HTTP methods, status codes, request headers, and JSON payloads.'
    ],
    prerequisites: 'None. Assumes absolute zero prior technical or programming knowledge.',
    lessons: [
      { id: 'lesson-1-1', slug: 'how-websites-work', title: 'How Websites Work: Clients, Servers & The Web', duration: '20 min', status: 'available' },
      { id: 'lesson-1-2', slug: 'frontend-vs-backend', title: 'Frontend vs. Backend: Runtimes & Trust Boundaries', duration: '25 min', status: 'available' },
      { id: 'lesson-1-3', slug: 'what-happens-when-you-open-a-website', title: 'What Happens When You Open a Website?', duration: '30 min', status: 'available' },
      { id: 'lesson-1-4', slug: 'http-requests-and-responses', title: 'HTTP Methods, Status Codes & JSON Payloads', duration: '25 min', status: 'available' }
    ]
  },
  {
    id: 'course-2',
    slug: 'developer-setup-and-tools',
    title: 'Course 2: Developer Setup & Essential Tools',
    category: 'Tooling',
    level: 'Beginner',
    duration: '2 Lessons • 1.5 Hours',
    description: 'Learn how software engineers prepare their computer: directories, file extensions, the command line terminal, code editors, and browser DevTools.',
    status: 'available',
    objectives: [
      'Master file paths, project folder structures, and common web file extensions.',
      'Navigate directories and execute fundamental commands using the terminal.',
      'Use VS Code efficiently and inspect live DOM/network traffic in browser Developer Tools.',
      'Understand how to identify, isolate, and debug common beginner syntax errors.'
    ],
    prerequisites: 'Course 1: Understanding the Web',
    lessons: [
      { id: 'lesson-2-1', slug: 'terminal-and-file-fundamentals', title: 'Files, Folders & The Developer Terminal', duration: '25 min', status: 'available' },
      { id: 'lesson-2-2', slug: 'code-editors-and-devtools', title: 'Code Editors & Browser Developer Tools', duration: '30 min', status: 'available' }
    ]
  },
  {
    id: 'course-3',
    slug: 'html-foundations',
    title: 'Course 3: HTML from Zero',
    category: 'Frontend',
    level: 'Beginner',
    duration: '5 Lessons • 4 Hours',
    description: 'Learn HTML as the structural skeleton of the web: tags, elements, void elements, document hierarchy, head metadata, semantic landmarks, media, data tables, accessible forms, inputs, and validation.',
    status: 'available',
    objectives: [
      'Understand HTML syntax: opening/closing tags, attributes, void elements, and nesting rules.',
      'Construct valid HTML5 documents with semantic landmarks (<header>, <nav>, <main>, <article>, <section>, <footer>).',
      'Embed accessible media, structured data tables, and navigation links correctly.',
      'Build production-grade accessible forms with associated labels, validation constraints, and user input types.',
      'Understand how the Accessibility Tree and screen readers interpret native semantic HTML.'
    ],
    prerequisites: 'Course 2: Developer Setup & Essential Tools',
    lessons: [
      { id: 'lesson-3-1', slug: 'html-foundations-and-syntax', title: 'HTML Syntax, Tags, Elements & Document Structure', duration: '35 min', status: 'available' },
      { id: 'lesson-3-2', slug: 'html-document-structure-and-semantics', title: 'Document Hierarchy & Modern Semantic Landmarks', duration: '40 min', status: 'available' },
      { id: 'lesson-3-3', slug: 'html-links-media-and-tables', title: 'Links, Responsive Media & Data Tables', duration: '35 min', status: 'available' },
      { id: 'lesson-3-4', slug: 'html-forms-and-accessible-inputs', title: 'Accessible Web Forms, Inputs & Client Validation', duration: '45 min', status: 'available' },
      { id: 'lesson-3-5', slug: 'html-accessibility-and-projects', title: 'Web Accessibility (a11y), Screen Readers & Capstone Project', duration: '45 min', status: 'available' }
    ]
  },
  {
    id: 'course-4',
    slug: 'css-responsive-design',
    title: 'Course 4: CSS from Zero',
    category: 'Frontend',
    level: 'Beginner',
    duration: '5 Lessons • 4.5 Hours',
    description: 'Style web pages systematically: the CSS Box Model, specificity, selectors, cascade, modern units, fluid layouts with Flexbox and Grid, CSS variables, transitions, and mobile-first responsive design.',
    status: 'available',
    objectives: [
      'Master CSS selectors, inheritance, specificity calculations, and cascade resolution rules.',
      'Understand the CSS Box Model in depth (content, padding, border, margin, and box-sizing: border-box).',
      'Build responsive layouts using modern 1D Flexbox alignment and 2D auto-fit CSS Grid.',
      'Implement mobile-first responsive media queries, fluid typography, and design tokens with CSS custom properties.',
      'Craft smooth, performant transitions, 2D/3D transforms, and keyframe animations.'
    ],
    prerequisites: 'Course 3: HTML from Zero',
    lessons: [
      { id: 'lesson-4-1', slug: 'css-fundamentals-and-syntax', title: 'CSS Syntax, Selectors, Specificity & The Cascade', duration: '35 min', status: 'available' },
      { id: 'lesson-4-2', slug: 'css-colors-units-and-typography', title: 'Colors, Modern Units, Web Typography & Visual Styling', duration: '40 min', status: 'available' },
      { id: 'lesson-4-3', slug: 'css-box-model-and-selectors', title: 'The CSS Box Model, Normal Flow & Positioning', duration: '45 min', status: 'available' },
      { id: 'lesson-4-4', slug: 'css-flexbox-and-grid', title: '1D Layouts with Flexbox & 2D Layouts with CSS Grid', duration: '45 min', status: 'available' },
      { id: 'lesson-4-5', slug: 'css-responsive-and-animations', title: 'Mobile-First Responsive Design, Transforms & Keyframe Animations', duration: '45 min', status: 'available' }
    ]
  },
  {
    id: 'course-5',
    slug: 'javascript-fundamentals',
    title: 'Course 5: JavaScript Fundamentals',
    category: 'Programming',
    level: 'Beginner',
    duration: '2 Lessons • 2.5 Hours',
    description: 'Learn computational thinking and core programming constructs: variables, data types, conditional branching, loops, functions, arguments, return values, and scope.',
    status: 'available',
    objectives: [
      'Write clean JavaScript using let and const, primitive data types, and logical operators.',
      'Declare and invoke functions with parameters, default arguments, and return values.',
      'Understand variable scope (global, function, block) and avoid variable shadowing bugs.'
    ],
    prerequisites: 'Course 4: CSS from Zero',
    lessons: [
      { id: 'lesson-5-1', slug: 'javascript-variables-types-and-logic', title: 'Variables, Data Types & Control Flow', duration: '35 min', status: 'available' },
      { id: 'lesson-5-2', slug: 'javascript-functions-and-scope', title: 'Functions, Parameters, Return Values & Scope', duration: '40 min', status: 'available' }
    ]
  },
  {
    id: 'course-6',
    slug: 'browser-and-dom',
    title: 'Course 6: The Browser and the DOM',
    category: 'Frontend',
    level: 'Beginner',
    duration: '1 Lesson • 40 Minutes',
    description: 'Transform static web pages into interactive applications: Document Object Model (DOM) traversal, element creation, event listeners, and form submission.',
    status: 'available',
    objectives: [
      'Understand how HTML is parsed into the live in-memory Document Object Model (DOM).',
      'Select elements with querySelector and update text, attributes, and CSS class lists dynamically.',
      'Listen for user actions using addEventListener and handle event objects without page reloads.'
    ],
    prerequisites: 'Course 5: JavaScript Fundamentals',
    lessons: [
      { id: 'lesson-6-1', slug: 'dom-manipulation-and-events', title: 'Selecting Elements, Modifying Content & Events', duration: '40 min', status: 'available' }
    ]
  },
  {
    id: 'course-7',
    slug: 'modern-javascript',
    title: 'Course 7: Modern JavaScript',
    category: 'Programming',
    level: 'Intermediate',
    duration: '2 Lessons • 2 Hours',
    description: 'Advance to modern ES6+ capabilities: arrow functions, array iteration methods (.map, .filter, .reduce), Promises, async/await, Fetch API, and the Event Loop.',
    status: 'available',
    objectives: [
      'Manipulate complex datasets declaratively with higher-order array methods.',
      'Master asynchronous flow control with Promises, async/await, and try/catch.',
      'Understand the JavaScript single-threaded concurrency model and the Event Loop.'
    ],
    prerequisites: 'Course 6: The Browser and the DOM',
    lessons: [
      { id: 'lesson-7-1', slug: 'es6-syntax-and-array-methods', title: 'ES6+ Syntax, Destructuring & Array Methods', duration: '45 min', status: 'available' },
      { id: 'lesson-7-2', slug: 'promises-and-async-await', title: 'Promises, Async/Await & The Event Loop', duration: '45 min', status: 'available' }
    ]
  },
  {
    id: 'course-8',
    slug: 'git-and-github',
    title: 'Course 8: Git, GitHub, and Collaboration',
    category: 'Tooling',
    level: 'Beginner',
    duration: '1 Lesson • 35 Minutes',
    description: 'Track changes like a professional software engineer: working directory vs staging area, atomic commits, branches, GitHub remotes, and merge conflicts.',
    status: 'available',
    objectives: [
      'Understand the three Git trees: working directory, staging area, and repository history.',
      'Initialize repositories, stage modifications, and craft descriptive atomic commit messages.',
      'Connect local repositories to remote GitHub hosts and push updates safely.'
    ],
    prerequisites: 'Course 2: Developer Setup & Essential Tools',
    lessons: [
      { id: 'lesson-8-1', slug: 'git-fundamentals-and-commits', title: 'Git Mental Model, Repositories & Commits', duration: '35 min', status: 'available' }
    ]
  },
  {
    id: 'course-9',
    slug: 'react-foundations',
    title: 'Course 9: React from Zero',
    category: 'Frontend',
    level: 'Intermediate',
    duration: '2 Lessons • 2 Hours',
    description: 'Build modern Single Page Applications using React: Declarative UI, JSX, component composition, props, state with useState, and side effects with useEffect.',
    status: 'available',
    objectives: [
      'Understand declarative UI rendering and how React synchronizes the Virtual DOM.',
      'Manage local component state with useState and lift state up across parent-child trees.',
      'Execute network requests safely inside useEffect and manage loading and error banners.'
    ],
    prerequisites: 'Course 7: Modern JavaScript',
    lessons: [
      { id: 'lesson-9-1', slug: 'react-components-and-jsx', title: 'Components, JSX & Props Data Flow', duration: '45 min', status: 'available' },
      { id: 'lesson-9-2', slug: 'react-state-and-lifecycle', title: 'State Management with useState & useEffect', duration: '45 min', status: 'available' }
    ]
  },
  {
    id: 'course-10',
    slug: 'nodejs-and-express',
    title: 'Course 10: Backend Development with Node.js',
    category: 'Backend',
    level: 'Intermediate',
    duration: '2 Lessons • 2 Hours',
    description: 'Move to server-side engineering: Node.js runtime, package.json dependencies, Express servers, routing, middleware chains, status codes, and CORS.',
    status: 'available',
    objectives: [
      'Understand JavaScript outside the browser and asynchronous I/O in Node.js.',
      'Construct Express web servers with structured route handlers and controllers.',
      'Build modular middleware pipelines for logging, request parsing, and error interception.'
    ],
    prerequisites: 'Course 7: Modern JavaScript & Course 1: Understanding the Web',
    lessons: [
      { id: 'lesson-10-1', slug: 'nodejs-runtime-and-modules', title: 'The Node.js Runtime & NPM Ecosystem', duration: '45 min', status: 'available' },
      { id: 'lesson-10-2', slug: 'express-servers-and-middleware', title: 'Express Routing & Middleware Architecture', duration: '45 min', status: 'available' }
    ]
  },
  {
    id: 'course-11',
    slug: 'mongodb-and-mongoose',
    title: 'Course 11: Databases and MongoDB',
    category: 'Database',
    level: 'Intermediate',
    duration: '2 Lessons • 2 Hours',
    description: 'Store and query persistent data: relational SQL vs document NoSQL databases, MongoDB collections, Mongoose schemas, CRUD operations, and indexes.',
    status: 'available',
    objectives: [
      'Compare relational table schemas with flexible document collections.',
      'Define strongly-typed schemas, default values, and validators using Mongoose.',
      'Execute CRUD queries (create, read, update, delete) and protect database credentials.'
    ],
    prerequisites: 'Course 10: Backend Development with Node.js',
    lessons: [
      { id: 'lesson-11-1', slug: 'database-concepts-and-mongodb', title: 'Database Foundations & MongoDB Collections', duration: '45 min', status: 'available' },
      { id: 'lesson-11-2', slug: 'mongoose-schemas-and-crud', title: 'Mongoose Schemas, Validation & CRUD Queries', duration: '45 min', status: 'available' }
    ]
  },
  {
    id: 'course-12',
    slug: 'authentication-and-web-security',
    title: 'Course 12: Authentication and Authorization',
    category: 'Security',
    level: 'Advanced',
    duration: '2 Lessons • 2 Hours',
    description: 'Master application security: user registration, bcrypt password hashing, stateless JWT tokens, protected routes, and Role-Based Access Control (RBAC).',
    status: 'available',
    objectives: [
      'Distinguish authentication (who you are) from authorization (what you can do).',
      'Hash passwords with bcrypt before persistence and verify them during login.',
      'Sign and verify JSON Web Tokens (JWT) and enforce server-side role authorization.'
    ],
    prerequisites: 'Course 10: Backend Development & Course 11: Databases',
    lessons: [
      { id: 'lesson-12-1', slug: 'authentication-concepts-and-jwt', title: 'Authentication Foundations, Password Hashing & Stateless JWTs', duration: '45 min', status: 'available' },
      { id: 'lesson-12-2', slug: 'authorization-and-web-security', title: 'Role-Based Access Control, Protected Routes & Web Security', duration: '45 min', status: 'available' }
    ]
  },
  {
    id: 'course-13',
    slug: 'full-stack-testing-and-qa',
    title: 'Course 13: Full-Stack Testing & Quality Assurance',
    category: 'Quality',
    level: 'Advanced',
    duration: '4 Lessons • 3 Hours',
    description: 'Master automated software verification: Vitest unit testing, React Testing Library component testing, Supertest API testing, and Playwright end-to-end user journeys.',
    status: 'available',
    objectives: [
      'Write deterministic unit tests using the AAA pattern and Vitest assertions.',
      'Test React components through user-centric queries and simulated events with React Testing Library.',
      'Execute integration tests on Express REST endpoints and Mongoose models using Supertest.',
      'Build resilient End-to-End browser test automation suites using Microsoft Playwright.'
    ],
    prerequisites: 'Course 9: React from Zero & Course 10: Backend Development with Node.js',
    lessons: [
      { id: 'lesson-13-1', slug: 'testing-fundamentals-and-vitest', title: 'Testing Foundations, Assertions & Unit Testing with Vitest', duration: '45 min', status: 'available' },
      { id: 'lesson-13-2', slug: 'component-and-rtl-testing', title: 'React Component Testing with React Testing Library', duration: '45 min', status: 'available' },
      { id: 'lesson-13-3', slug: 'api-and-integration-testing', title: 'Backend API & Integration Testing with Supertest', duration: '45 min', status: 'available' },
      { id: 'lesson-13-4', slug: 'e2e-testing-and-test-strategy', title: 'End-to-End Testing with Playwright & Testing Strategy', duration: '45 min', status: 'available' }
    ]
  },
  {
    id: 'course-14',
    slug: 'professional-debugging-and-troubleshooting',
    title: 'Course 14: Professional Debugging & Troubleshooting',
    category: 'Debugging',
    level: 'Advanced',
    duration: '4 Lessons • 3 Hours',
    description: 'Diagnose and fix real-world software defects like a senior engineer: browser DevTools, runtime stack traces, breakpoints, server logs, database failures, and distributed tracing.',
    status: 'available',
    objectives: [
      'Deconstruct the Chrome and Firefox DevTools: Elements, Computed Styles, Console, and Network panels.',
      'Master conditional breakpoints, step-through debugging, and asynchronous race condition detection.',
      'Diagnose Express middleware hanging bugs, double headers, and MongoDB connection timeouts.',
      'Trace failures across the entire distributed full-stack lifecycle: UI to Database.'
    ],
    prerequisites: 'Course 9: React from Zero & Course 11: Databases and MongoDB',
    lessons: [
      { id: 'lesson-14-1', slug: 'frontend-and-devtools-debugging', title: 'Frontend Browser DevTools: DOM, Styles, Network & Console', duration: '45 min', status: 'available' },
      { id: 'lesson-14-2', slug: 'javascript-runtime-and-logic-debugging', title: 'JavaScript Runtime, Logic Errors & DevTools Breakpoints', duration: '45 min', status: 'available' },
      { id: 'lesson-14-3', slug: 'backend-and-database-debugging', title: 'Backend Diagnostics: Server Logs, Express Routes & Database Errors', duration: '45 min', status: 'available' },
      { id: 'lesson-14-4', slug: 'fullstack-distributed-tracing', title: 'Full-Stack Distributed Tracing: Browser to Database', duration: '45 min', status: 'available' }
    ]
  },
  {
    id: 'course-15',
    slug: 'production-deployment-and-devops',
    title: 'Course 15: Production Deployment, Cloud & DevOps',
    category: 'DevOps',
    level: 'Advanced',
    duration: '4 Lessons • 3 Hours',
    description: 'Ship and operate applications in production: Vite build pipelines, content hashing, environment secrets hygiene, static CDNs, cloud API hosting, DNS, HTTPS, and SRE reliability.',
    status: 'available',
    objectives: [
      'Deconstruct the Vite/Rollup production build pipeline: minification, tree-shaking, and SPA rewrites.',
      'Protect application secrets, configure cloud environment variables, and prevent credential leaks.',
      'Deploy decoupled full-stack systems: static frontends on Vercel, APIs on Render, and MongoDB Atlas.',
      'Implement health check monitors, automated alerting, graceful shutdown, and instant rollbacks.'
    ],
    prerequisites: 'Course 12: Authentication and Authorization & Course 13: Full-Stack Testing',
    lessons: [
      { id: 'lesson-15-1', slug: 'development-vs-production-and-builds', title: 'Development vs Production & The Modern Build Pipeline', duration: '45 min', status: 'available' },
      { id: 'lesson-15-2', slug: 'environment-secrets-and-cloud-config', title: 'Environment Secrets, Configuration & Avoiding Leaks', duration: '45 min', status: 'available' },
      { id: 'lesson-15-3', slug: 'hosting-static-apis-and-databases', title: 'Hosting Architectures: Static Frontends, APIs & Cloud Databases', duration: '45 min', status: 'available' },
      { id: 'lesson-15-4', slug: 'production-monitoring-and-reliability', title: 'Production Reliability: Monitoring, Logging, Backups & Rollbacks', duration: '45 min', status: 'available' }
    ]
  },
  {
    id: 'course-16',
    slug: 'career-readiness-and-interview-mastery',
    title: 'Course 16: Career Readiness & Technical Interview Mastery',
    category: 'Career',
    level: 'Comprehensive',
    duration: '4 Lessons • 3 Hours',
    description: 'Bridge the gap from code to career: building high-impact portfolio projects, writing production-grade READMEs, mastering full-stack technical interviews, and system design thinking.',
    status: 'available',
    objectives: [
      'Architect a recruiter-ready portfolio centered around 2 to 3 deep full-stack applications.',
      'Author comprehensive GitHub READMEs with architecture diagrams, setup guides, and trade-off matrices.',
      'Master high-frequency full-stack interview questions: Event Loop, closures, Virtual DOM, and indexing.',
      'Apply system design fundamentals: horizontal scaling, stateless servers, caching, and background job queues.'
    ],
    prerequisites: 'All core courses (Courses 1 through 15)',
    lessons: [
      { id: 'lesson-16-1', slug: 'portfolio-strategy-and-documentation', title: 'High-Impact Portfolios & Professional Documentation', duration: '45 min', status: 'available' },
      { id: 'lesson-16-2', slug: 'explaining-technical-decisions', title: 'Articulating Technical Decisions & Engineering Communication', duration: '45 min', status: 'available' },
      { id: 'lesson-16-3', slug: 'fullstack-technical-interview-mastery', title: 'Full-Stack Technical Interview Mastery: Core Concepts', duration: '45 min', status: 'available' },
      { id: 'lesson-16-4', slug: 'system-design-thinking-fundamentals', title: 'System Design Thinking for Junior & Mid Full-Stack Engineers', duration: '45 min', status: 'available' }
    ]
  },
  {
    id: 'course-17',
    slug: 'full-stack-projects',
    title: 'Course 17: Full-Stack Real-World Projects & Capstones',
    category: 'Full-Stack',
    level: 'Advanced',
    duration: '10 Projects • 15 Hours',
    description: 'Build 10 graduated real-world capstone projects: from accessible personal profile pages and interactive DOM apps to database-connected REST services and full-stack municipal redressal systems.',
    status: 'available',
    objectives: [
      'Build 10 complete applications with progressive complexity from HTML to full-stack.',
      'Follow professional project structures, documentation standards, and git hygiene.',
      'Deliver working production-ready applications with test coverage, testing checklists, and deployed links.'
    ],
    prerequisites: 'All prior courses (Courses 1 through 16)',
    lessons: [
      { id: 'lesson-17-1', slug: 'capstone-projects-overview', title: 'The 10 Capstone Projects Blueprint & Specifications', duration: '45 min', status: 'available' }
    ]
  },
  {
    id: 'course-18',
    slug: 'crp-india-case-studies',
    title: 'Course 18: CRP India Real-World Case Studies',
    category: 'Case Studies',
    level: 'Comprehensive',
    duration: '8 Case Studies • 6 Hours',
    description: 'Deconstruct the complete CRP India civic reporting platform: study real-world code for multi-role auth, GPS tracking, dual file uploads, and MongoDB aggregation.',
    status: 'available',
    objectives: [
      'Analyze how a full-stack civic platform operates in production.',
      'Inspect actual Mongoose schemas for status timelines and atomic sequence generators.',
      'Examine custom Multer streaming to Cloudinary and local disk fallbacks.',
      'Explore executive municipal analytics and departmental scoping.'
    ],
    prerequisites: 'Course 1: Understanding the Web (Accessible now as an architectural reference)',
    lessons: [
      { id: 'case-study-overview', slug: 'crp-india-architecture-deep-dive', title: 'CRP India Architecture Deep Dive', duration: '35 min', status: 'available' }
    ]
  }
];

export const CATEGORIES = [
  'All',
  'Fundamentals',
  'Frontend',
  'Backend',
  'Database',
  'Security',
  'Tooling',
  'Quality',
  'DevOps',
  'Full-Stack',
  'Case Studies'
];

export const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Comprehensive'];
