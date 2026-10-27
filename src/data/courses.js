/**
 * Dev-root Course Catalogue Data Definition
 * Contains the 16 full-stack curriculum paths, structured by level and category.
 */

export const COURSES = [
  {
    id: 'course-1',
    slug: 'web-internet-fundamentals',
    title: 'Web & Internet Fundamentals',
    category: 'Fundamentals',
    level: 'Beginner',
    duration: '4 Lessons • 2 Hours',
    description: 'Learn the foundational machinery of the internet: client-server architecture, DNS resolution, HTTP/HTTPS protocols, and the mechanics of web browsers.',
    status: 'available', // Lessons ready in Phase 1
    objectives: [
      'Understand client-server architecture and how browsers communicate with remote servers.',
      'Trace what happens under the hood when a URL is entered into a browser.',
      'Distinguish frontend client responsibilities from backend server operations.',
      'Learn HTTP methods, request headers, status codes, and JSON payload serialization.'
    ],
    prerequisites: 'None. Suitable for absolute beginners starting their coding journey.',
    lessons: [
      { id: 'lesson-1-1', slug: 'how-websites-work', title: 'How Websites Work', duration: '20 min', status: 'available' },
      { id: 'lesson-1-2', slug: 'frontend-vs-backend', title: 'Frontend vs. Backend', duration: '25 min', status: 'available' },
      { id: 'lesson-1-3', slug: 'what-happens-when-you-open-a-website', title: 'What Happens When You Open a Website?', duration: '30 min', status: 'available' },
      { id: 'lesson-1-4', slug: 'http-and-json-foundations', title: 'HTTP, Status Codes & JSON Payloads', duration: '25 min', status: 'planned' }
    ]
  },
  {
    id: 'course-2',
    slug: 'html-foundations',
    title: 'Semantic HTML & Document Structure',
    category: 'Frontend',
    level: 'Beginner',
    duration: '6 Lessons • 3 Hours',
    description: 'Master semantic markup, forms, accessibility standards (ARIA), head metadata, and document hierarchies that modern search engines and screen readers rely on.',
    status: 'planned',
    objectives: [
      'Structure documents with semantic HTML5 elements (<main>, <nav>, <article>, <section>).',
      'Build accessible web forms with associated labels, fieldsets, and validation attributes.',
      'Implement proper viewport and accessibility tags for responsive displays.'
    ],
    prerequisites: 'Web & Internet Fundamentals',
    lessons: [
      { id: 'lesson-2-1', slug: 'semantic-html-hierarchy', title: 'Semantic Tags & Document Trees', duration: '25 min', status: 'planned' },
      { id: 'lesson-2-2', slug: 'accessible-forms-and-inputs', title: 'Accessible Web Forms & Input Types', duration: '30 min', status: 'planned' }
    ]
  },
  {
    id: 'course-3',
    slug: 'css-responsive-design',
    title: 'CSS & Responsive Design',
    category: 'Frontend',
    level: 'Beginner',
    duration: '8 Lessons • 4 Hours',
    description: 'Design responsive, accessible layouts using modern CSS: Flexbox, CSS Grid, custom properties (CSS variables), light/dark theming, and fluid typography.',
    status: 'planned',
    objectives: [
      'Master the CSS Box Model, specificity, and cascading mechanics.',
      'Build responsive layouts using modern Flexbox and auto-fit CSS Grid.',
      'Implement light and dark mode design systems with CSS custom properties.'
    ],
    prerequisites: 'HTML Foundations',
    lessons: [
      { id: 'lesson-3-1', slug: 'css-box-model-and-tokens', title: 'Box Model & CSS Variables', duration: '30 min', status: 'planned' },
      { id: 'lesson-3-2', slug: 'flexbox-and-grid-layouts', title: 'Modern Grid & Flexbox Systems', duration: '35 min', status: 'planned' }
    ]
  },
  {
    id: 'course-4',
    slug: 'javascript-fundamentals',
    title: 'JavaScript Fundamentals',
    category: 'Programming',
    level: 'Beginner',
    duration: '10 Lessons • 6 Hours',
    description: 'Learn core programming constructs: variables, data types, functions, control flow, loops, arrays, objects, and foundational problem solving.',
    status: 'planned',
    objectives: [
      'Write clean, modular JavaScript using let/const, arrow functions, and destructuring.',
      'Manipulate complex arrays and objects with modern methods (.map, .filter, .reduce).',
      'Understand lexical scope, closures, and the call stack.'
    ],
    prerequisites: 'Web & Internet Fundamentals',
    lessons: [
      { id: 'lesson-4-1', slug: 'variables-types-operators', title: 'Variables, Data Types & Operators', duration: '25 min', status: 'planned' },
      { id: 'lesson-4-2', slug: 'functions-and-scope', title: 'Functions, Scope & Execution Context', duration: '35 min', status: 'planned' }
    ]
  },
  {
    id: 'course-5',
    slug: 'advanced-javascript',
    title: 'Advanced JavaScript & Async Programming',
    category: 'Programming',
    level: 'Intermediate',
    duration: '8 Lessons • 5 Hours',
    description: 'Deep dive into asynchronous JavaScript, Promises, async/await, event loops, closures, prototypes, and ES module architecture.',
    status: 'planned',
    objectives: [
      'Demystify the JavaScript Event Loop, microtasks, and macrotasks.',
      'Master asynchronous code orchestration with Promises and async/await.',
      'Handle errors defensively with try/catch and custom Error classes.'
    ],
    prerequisites: 'JavaScript Fundamentals',
    lessons: [
      { id: 'lesson-5-1', slug: 'event-loop-and-promises', title: 'The Event Loop & Promises', duration: '40 min', status: 'planned' }
    ]
  },
  {
    id: 'course-6',
    slug: 'git-and-github',
    title: 'Git Version Control & GitHub',
    category: 'Tooling',
    level: 'Beginner',
    duration: '5 Lessons • 3 Hours',
    description: 'Track changes like a professional software engineer: commits, branching strategies, merge conflicts, pull requests, and collaborative repository workflows.',
    status: 'planned',
    objectives: [
      'Understand the 3 trees of Git: working directory, staging index, and repository.',
      'Create clean, descriptive atomic commits adhering to conventional standards.',
      'Resolve merge conflicts calmly and inspect history with git log.'
    ],
    prerequisites: 'None',
    lessons: [
      { id: 'lesson-6-1', slug: 'git-mental-model', title: 'The Git Mental Model', duration: '30 min', status: 'planned' }
    ]
  },
  {
    id: 'course-7',
    slug: 'react-foundations',
    title: 'React Components, State & Hooks',
    category: 'Frontend',
    level: 'Intermediate',
    duration: '10 Lessons • 7 Hours',
    description: 'Build dynamic Single Page Applications (SPAs) using React 19: components, unidirectional data flow (props), state management, hooks, and context.',
    status: 'planned',
    objectives: [
      'Understand JSX compilation, the Virtual DOM, and component reconciliation.',
      'Manage component state with useState and handle side effects with useEffect.',
      'Architect global application state using the React Context API.'
    ],
    prerequisites: 'JavaScript Fundamentals & CSS',
    lessons: [
      { id: 'lesson-7-1', slug: 'jsx-and-components', title: 'JSX & Component Composition', duration: '35 min', status: 'planned' }
    ]
  },
  {
    id: 'course-8',
    slug: 'apis-and-async-communication',
    title: 'APIs & Asynchronous Communication',
    category: 'Full-Stack',
    level: 'Intermediate',
    duration: '6 Lessons • 4 Hours',
    description: 'Connect frontend interfaces to backend servers: the Fetch API, HTTP headers, Bearer tokens, multipart uploads, and error interceptors.',
    status: 'planned',
    objectives: [
      'Write modular HTTP client services handling all CRUD operations.',
      'Manage loading, success, and error states gracefully in UI components.',
      'Transmit multipart file uploads with FormData.'
    ],
    prerequisites: 'React Foundations & Advanced JavaScript',
    lessons: [
      { id: 'lesson-8-1', slug: 'fetch-api-and-interceptors', title: 'Building a Production Fetch Client', duration: '35 min', status: 'planned' }
    ]
  },
  {
    id: 'course-9',
    slug: 'nodejs-and-express',
    title: 'Node.js & Express Backend Development',
    category: 'Backend',
    level: 'Intermediate',
    duration: '8 Lessons • 5 Hours',
    description: 'Build scalable backend services using Node.js and Express: routing, request-response pipelines, custom middleware, and server security.',
    status: 'planned',
    objectives: [
      'Understand the Node.js runtime environment, event-driven I/O, and modules.',
      'Construct modular Express applications with routes, controllers, and services.',
      'Build custom middleware for logging, rate limiting, and input sanitization.'
    ],
    prerequisites: 'JavaScript Fundamentals & Git',
    lessons: [
      { id: 'lesson-9-1', slug: 'express-server-and-middleware', title: 'Express Anatomy & Middleware Chains', duration: '40 min', status: 'planned' }
    ]
  },
  {
    id: 'course-10',
    slug: 'rest-api-development',
    title: 'RESTful API Architecture & Design',
    category: 'Backend',
    level: 'Intermediate',
    duration: '7 Lessons • 4 Hours',
    description: 'Design production-grade REST APIs: resource modeling, status codes, query filtering, pagination, search, and centralized error handling.',
    status: 'planned',
    objectives: [
      'Design clean, intuitive URL schemas adhering to RESTful standards.',
      'Implement defensive input validation and consistent JSON response envelopes.',
      'Build search, sorting, and pagination into database-backed endpoints.'
    ],
    prerequisites: 'Node.js & Express Backend Development',
    lessons: [
      { id: 'lesson-10-1', slug: 'rest-principles-and-status-codes', title: 'REST Resource Modeling & Status Codes', duration: '35 min', status: 'planned' }
    ]
  },
  {
    id: 'course-11',
    slug: 'mongodb-and-mongoose',
    title: 'MongoDB & Mongoose Data Modeling',
    category: 'Database',
    level: 'Intermediate',
    duration: '8 Lessons • 5 Hours',
    description: 'Model application data with MongoDB and Mongoose: document schemas, validation, embedded subdocuments, indexes, references, and aggregation pipelines.',
    status: 'planned',
    objectives: [
      'Design flexible NoSQL schemas with embedded subdocuments and references.',
      'Implement Mongoose pre-save middleware for automated operations.',
      'Write analytical queries using the MongoDB Aggregation Framework.'
    ],
    prerequisites: 'Node.js & Express Backend Development',
    lessons: [
      { id: 'lesson-11-1', slug: 'mongoose-schemas-and-validation', title: 'Mongoose Schemas & Schema Validation', duration: '35 min', status: 'planned' }
    ]
  },
  {
    id: 'course-12',
    slug: 'authentication-and-web-security',
    title: 'Authentication & Web Security',
    category: 'Security',
    level: 'Advanced',
    duration: '8 Lessons • 6 Hours',
    description: 'Secure full-stack applications: JWT token lifecycles, bcrypt password hashing, Role-Based Access Control (RBAC), OAuth 2.0, CORS, Helmet, and rate limiting.',
    status: 'planned',
    objectives: [
      'Implement stateless authentication using signed JSON Web Tokens (JWT).',
      'Enforce Role-Based Access Control (RBAC) across protected routes.',
      'Harden Express APIs against NoSQL injection, XSS, and volumetric attacks.'
    ],
    prerequisites: 'REST API Development & MongoDB',
    lessons: [
      { id: 'lesson-12-1', slug: 'jwt-and-bcrypt-architecture', title: 'JWT Lifecycles & Cryptographic Hashing', duration: '40 min', status: 'planned' }
    ]
  },
  {
    id: 'course-13',
    slug: 'testing-and-debugging',
    title: 'Testing & Debugging Full-Stack Apps',
    category: 'Quality',
    level: 'Advanced',
    duration: '6 Lessons • 4 Hours',
    description: 'Write automated unit and integration tests with Vitest and Testing Library. Debug client and server applications using browser DevTools and Node inspectors.',
    status: 'planned',
    objectives: [
      'Write comprehensive unit tests for UI components and utility functions.',
      'Simulate user interactions and test asynchronous state changes.',
      'Debug runtime errors and network requests systematically.'
    ],
    prerequisites: 'React Foundations & Node.js',
    lessons: [
      { id: 'lesson-13-1', slug: 'vitest-and-component-testing', title: 'Vitest & React Component Testing', duration: '35 min', status: 'planned' }
    ]
  },
  {
    id: 'course-14',
    slug: 'deployment-and-production',
    title: 'Deployment & Production Operations',
    category: 'DevOps',
    level: 'Advanced',
    duration: '6 Lessons • 4 Hours',
    description: 'Deploy web apps to production: static hosting (Render/Vercel), environment variable management, build optimizations, and zero-downtime releases.',
    status: 'planned',
    objectives: [
      'Configure Single Page Application (SPA) rewrite rules for cloud hosting.',
      'Secure environment variables across local, staging, and production environments.',
      'Monitor application health and implement graceful process teardowns.'
    ],
    prerequisites: 'Full-Stack Foundations',
    lessons: [
      { id: 'lesson-14-1', slug: 'spa-hosting-and-render-config', title: 'SPA Routing Rewrites & Cloud Deployment', duration: '35 min', status: 'planned' }
    ]
  },
  {
    id: 'course-15',
    slug: 'full-stack-projects',
    title: 'Full-Stack Capstone Projects',
    category: 'Full-Stack',
    level: 'Advanced',
    duration: '4 Projects • 12 Hours',
    description: 'Combine frontend, backend, database, authentication, and deployment into complete real-world web applications built from scratch.',
    status: 'planned',
    objectives: [
      'Architect a full-stack project from initial database schema to deployed URL.',
      'Connect a React frontend to an authenticated Express REST API.',
      'Deliver production-ready user experiences with proper validation and feedback.'
    ],
    prerequisites: 'All prior core modules',
    lessons: [
      { id: 'lesson-15-1', slug: 'project-architecture-scaffolding', title: 'Full-Stack Scaffolding & Specifications', duration: '45 min', status: 'planned' }
    ]
  },
  {
    id: 'course-16',
    slug: 'crp-india-case-studies',
    title: 'CRP India Real-World Case Studies',
    category: 'Case Studies',
    level: 'Comprehensive',
    duration: '8 Case Studies • 6 Hours',
    description: 'Deconstruct the complete CRP India civic reporting platform: study real-world code for multi-role auth, GPS tracking, dual file uploads, and MongoDB aggregation.',
    status: 'available', // Dedicated overview available in Phase 1
    objectives: [
      'Analyze how a full-stack civic platform operates in production.',
      'Inspect actual Mongoose schemas for status timelines and atomic sequence generators.',
      'Examine custom Multer streaming to Cloudinary and local disk fallbacks.',
      'Explore executive municipal analytics and departmental scoping.'
    ],
    prerequisites: 'Web & Internet Fundamentals (Accessible now as an architectural reference)',
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
  'Full-Stack',
  'Case Studies'
];

export const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Comprehensive'];
