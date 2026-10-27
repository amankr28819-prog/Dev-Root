/**
 * Dev-Root Phase 6: Project Scaffolding Data
 * Links each project to specific Dev-root lessons, practice coding challenges,
 * and comprehensive interactive testing verification checklists.
 */

export const PROJECT_SCAFFOLDING = {
  'proj-01-profile-page': {
    helpfulLessons: [
      { slug: 'html-document-structure-and-semantics', title: 'HTML5 Semantic Elements & Document Structure', courseTitle: 'HTML5 Foundations' },
      { slug: 'css-box-model-and-spacing', title: 'The CSS Box Model, Spacing & Sizing', courseTitle: 'CSS Foundations' },
      { slug: 'responsive-layouts-media-queries-and-fluid-design', title: 'Responsive Design & Media Queries', courseTitle: 'CSS Foundations' }
    ],
    relatedChallenges: [
      { slug: 'semantic-card', title: 'Semantic Profile Card' },
      { slug: 'flexbox-navbar', title: 'Responsive Flexbox Header' }
    ],
    testingChecklist: [
      { id: 't1', label: 'HTML5 validates with zero syntax errors on W3C Markup Validator.' },
      { id: 't2', label: 'Semantic landmarks (<header>, <main>, <section>, <footer>) are properly nested.' },
      { id: 't3', label: 'Exactly one <h1> element exists as the document top-level title.' },
      { id: 't4', label: 'All images have descriptive alt text attributes for screen readers.' },
      { id: 't5', label: 'All interactive links have visible, high-contrast :focus-visible outlines when tabbed.' },
      { id: 't6', label: 'Page is completely responsive from 320px up to 1440px with zero horizontal scrollbars.' }
    ]
  },
  'proj-02-responsive-website': {
    helpfulLessons: [
      { slug: 'flexbox-deep-dive-flex-containers-and-items', title: 'Flexbox Deep Dive & Responsive Alignment', courseTitle: 'CSS Foundations' },
      { slug: 'css-grid-mastery-two-dimensional-layouts', title: 'CSS Grid Mastery & 2D Layouts', courseTitle: 'CSS Foundations' },
      { slug: 'css-custom-properties-and-design-tokens', title: 'CSS Custom Properties & Design Tokens', courseTitle: 'Modern CSS' }
    ],
    relatedChallenges: [
      { slug: 'grid-dashboard', title: 'CSS Grid Dashboard Layout' },
      { slug: 'flexbox-navbar', title: 'Responsive Flexbox Header' }
    ],
    testingChecklist: [
      { id: 't1', label: 'Multi-column grid stacks seamlessly into a single column on mobile screens (< 768px).' },
      { id: 't2', label: 'Navigation menu toggles cleanly on mobile touch and keyboard Enter/Space keys.' },
      { id: 't3', label: 'Color contrast ratio exceeds WCAG AA 4.5:1 for all text against backgrounds.' },
      { id: 't4', label: 'CSS uses relative units (rem, em, %) and fluid clamp() for typography.' },
      { id: 't5', label: 'Touch targets for buttons and links are at least 44px by 44px on mobile devices.' }
    ]
  },
  'proj-03-calculator': {
    helpfulLessons: [
      { slug: 'javascript-syntax-variables-and-data-types', title: 'JavaScript Syntax, Variables & Primitives', courseTitle: 'JavaScript Fundamentals' },
      { slug: 'control-flow-conditionals-and-loops', title: 'Control Flow, Conditionals & Loops', courseTitle: 'JavaScript Fundamentals' },
      { slug: 'javascript-runtime-and-logic-debugging', title: 'JavaScript Runtime, Logic Errors & Breakpoints', courseTitle: 'Professional Debugging' }
    ],
    relatedChallenges: [
      { slug: 'array-filtering', title: 'Array Data Transformation' },
      { slug: 'dom-event-counter', title: 'Interactive Counter with State' }
    ],
    testingChecklist: [
      { id: 't1', label: 'Performs basic addition, subtraction, multiplication, and division accurately.' },
      { id: 't2', label: 'Handles decimal operations correctly without duplicate decimal points (e.g. 3.1.4).' },
      { id: 't3', label: 'Gracefully handles division by zero by displaying "Cannot divide by 0" rather than crashing.' },
      { id: 't4', label: 'Supports keyboard input (numbers, operators, Enter for equals, Escape for clear).' },
      { id: 't5', label: 'Maintains calculation history display with clear button.' }
    ]
  },
  'proj-04-todo-app': {
    helpfulLessons: [
      { slug: 'dom-selection-and-manipulation', title: 'DOM Selection & Dynamic Element Manipulation', courseTitle: 'The DOM & Browser APIs' },
      { slug: 'dom-event-handling-and-delegation', title: 'DOM Event Handling, Delegation & Form Events', courseTitle: 'The DOM & Browser APIs' },
      { slug: 'frontend-and-devtools-debugging', title: 'Frontend Browser DevTools: DOM, Styles & Console', courseTitle: 'Professional Debugging' }
    ],
    relatedChallenges: [
      { slug: 'dom-todo-list', title: 'DOM Dynamic List Manipulation' },
      { slug: 'local-storage-sync', title: 'LocalStorage Persistence Engine' }
    ],
    testingChecklist: [
      { id: 't1', label: 'New task input rejects empty or whitespace-only strings with a visible error message.' },
      { id: 't2', label: 'Tasks can be checked as completed with strikethrough visual feedback.' },
      { id: 't3', label: 'All tasks, statuses, and IDs persist in localStorage and reload accurately after F5.' },
      { id: 't4', label: 'Filters (All, Active, Completed) accurately partition task lists without mutation bugs.' },
      { id: 't5', label: 'Event delegation is used on parent <ul> rather than attaching listeners to each <li>.' }
    ]
  },
  'proj-05-api-dashboard': {
    helpfulLessons: [
      { slug: 'asynchronous-javascript-promises-and-async-await', title: 'Asynchronous JavaScript: Promises & Async/Await', courseTitle: 'Modern JavaScript' },
      { slug: 'frontend-and-devtools-debugging', title: 'Browser DevTools: Network Tab & API Diagnostics', courseTitle: 'Professional Debugging' },
      { slug: 'safe-fetch-json', title: 'Handling HTTP Status Codes & Network Errors', courseTitle: 'Understanding the Web' }
    ],
    relatedChallenges: [
      { slug: 'async-api-fetch', title: 'Async Fetch with Loading & Error Handling' },
      { slug: 'array-filtering', title: 'Array Data Transformation' }
    ],
    testingChecklist: [
      { id: 't1', label: 'Displays an animated skeleton or spinner loading state while fetch is in-flight.' },
      { id: 't2', label: 'Displays a friendly, recoverable error banner when API returns 404, 500, or network fails.' },
      { id: 't3', label: 'Provides a "Retry Request" button that re-executes fetch on failure.' },
      { id: 't4', label: 'Displays a descriptive empty state when search returns zero matching results.' },
      { id: 't5', label: 'Encodes search parameters with encodeURIComponent() to prevent URL injection.' }
    ]
  },
  'proj-06-react-app': {
    helpfulLessons: [
      { slug: 'react-components-and-jsx', title: 'Components, JSX & Props Data Flow', courseTitle: 'React from Zero' },
      { slug: 'react-state-and-lifecycle', title: 'State Management with useState & useEffect', courseTitle: 'React from Zero' },
      { slug: 'component-and-rtl-testing', title: 'React Component Testing with React Testing Library', courseTitle: 'Full-Stack Testing & QA' }
    ],
    relatedChallenges: [
      { slug: 'react-form-state', title: 'Controlled React Form with State Validation' },
      { slug: 'async-api-fetch', title: 'Async Fetch with Loading & Error Handling' }
    ],
    testingChecklist: [
      { id: 't1', label: 'All form inputs are controlled components driven by React state.' },
      { id: 't2', label: 'State is lifted cleanly to shared parent or managed via clean context.' },
      { id: 't3', label: 'Network requests inside useEffect include cleanup/AbortController to prevent race conditions.' },
      { id: 't4', label: 'Lists render with unique, stable keys (not array indices) to preserve component identity.' },
      { id: 't5', label: 'Component tests written with React Testing Library pass with 80%+ code coverage.' }
    ]
  },
  'proj-07-backend-api': {
    helpfulLessons: [
      { slug: 'nodejs-runtime-and-modules', title: 'The Node.js Runtime & NPM Ecosystem', courseTitle: 'Backend with Node.js' },
      { slug: 'express-servers-and-middleware', title: 'Express Routing & Middleware Architecture', courseTitle: 'Backend with Node.js' },
      { slug: 'api-and-integration-testing', title: 'Backend API & Integration Testing with Supertest', courseTitle: 'Full-Stack Testing & QA' },
      { slug: 'backend-and-database-debugging', title: 'Backend Diagnostics: Server Logs & Route Errors', courseTitle: 'Professional Debugging' }
    ],
    relatedChallenges: [
      { slug: 'async-api-fetch', title: 'Async API Fetch' }
    ],
    testingChecklist: [
      { id: 't1', label: 'Implements full RESTful semantics: GET, POST, PUT, PATCH, DELETE.' },
      { id: 't2', label: 'Validates incoming request body fields; returns 400 Bad Request with error details.' },
      { id: 't3', label: 'Returns 404 Not Found for non-existent resource IDs and invalid endpoints.' },
      { id: 't4', label: 'Centralized global error-handling middleware catches all uncaught exceptions.' },
      { id: 't5', label: 'Supertest integration tests verify all endpoints return expected status codes and JSON.' }
    ]
  },
  'proj-08-database-app': {
    helpfulLessons: [
      { slug: 'database-concepts-and-mongodb', title: 'Database Foundations & MongoDB Collections', courseTitle: 'Databases & MongoDB' },
      { slug: 'mongoose-schemas-and-crud', title: 'Mongoose Schemas, Validation & CRUD Queries', courseTitle: 'Databases & MongoDB' },
      { slug: 'backend-and-database-debugging', title: 'Backend Diagnostics: Database Connection & CastErrors', courseTitle: 'Professional Debugging' }
    ],
    relatedChallenges: [
      { slug: 'array-filtering', title: 'Array Data Transformation' }
    ],
    testingChecklist: [
      { id: 't1', label: 'Mongoose schema enforces required fields, string enums, and timestamps (createdAt, updatedAt).' },
      { id: 't2', label: 'Validates 24-character hexadecimal ObjectIDs before query execution to avoid CastErrors.' },
      { id: 't3', label: 'Database connection string is read from process.env.MONGO_URI (never hard-coded).' },
      { id: 't4', label: 'Handles duplicate key errors (E11000) by returning clean 409 Conflict status.' },
      { id: 't5', label: 'Creates compound indexes on frequently queried fields to ensure O(log N) lookup speeds.' }
    ]
  },
  'proj-09-auth-system': {
    helpfulLessons: [
      { slug: 'authentication-concepts-and-jwt', title: 'Authentication Foundations, bcrypt & Stateless JWTs', courseTitle: 'Authentication & Security' },
      { slug: 'authorization-and-web-security', title: 'Role-Based Access Control, Protected Routes & Web Security', courseTitle: 'Authentication & Security' },
      { slug: 'environment-secrets-and-cloud-config', title: 'Environment Secrets, Configuration & Avoiding Leaks', courseTitle: 'Production Deployment' }
    ],
    relatedChallenges: [
      { slug: 'react-form-state', title: 'Controlled Form State' }
    ],
    testingChecklist: [
      { id: 't1', label: 'User passwords hashed using bcrypt with at least 10 salt rounds before storage.' },
      { id: 't2', label: 'Login endpoint compares entered password with hash using bcrypt.compare().' },
      { id: 't3', label: 'Signs stateless JWT tokens with expiration (e.g. 7d) using secure process.env.JWT_SECRET.' },
      { id: 't4', label: 'Auth middleware verifies Bearer token and attaches decoded user to req.user.' },
      { id: 't5', label: 'Role-Based Access Control (RBAC) middleware rejects unauthorized roles with 403 Forbidden.' },
      { id: 't6', label: 'Supertest suite verifies that protected routes reject missing or expired tokens with 401.' }
    ]
  },
  'proj-10-fullstack-capstone': {
    helpfulLessons: [
      { slug: 'crp-india-architecture-deep-dive', title: 'CRP India Architecture Deep Dive', courseTitle: 'CRP India Case Studies' },
      { slug: 'fullstack-distributed-tracing', title: 'Full-Stack Distributed Tracing: Browser to Database', courseTitle: 'Professional Debugging' },
      { slug: 'e2e-testing-and-test-strategy', title: 'End-to-End Testing with Playwright', courseTitle: 'Full-Stack Testing & QA' },
      { slug: 'hosting-static-apis-and-databases', title: 'Hosting Architectures: Vercel, Render & Atlas', courseTitle: 'Production Deployment' },
      { slug: 'portfolio-strategy-and-documentation', title: 'High-Impact Portfolios & Professional READMEs', courseTitle: 'Career Readiness' }
    ],
    relatedChallenges: [
      { slug: 'react-form-state', title: 'Controlled React Form with State Validation' },
      { slug: 'local-storage-sync', title: 'LocalStorage Persistence Engine' }
    ],
    testingChecklist: [
      { id: 't1', label: 'Complete decoupled full-stack architecture: React frontend, Express API, MongoDB database.' },
      { id: 't2', label: 'Multi-role authentication: Citizens can submit grievances; Nodal Admins can assign and resolve.' },
      { id: 't3', label: 'Status transitions follow state machine rules (Submitted -> Assigned -> In Progress -> Resolved).' },
      { id: 't4', label: 'Audit history: Grievance timeline records each status change, officer ID, timestamp, and comments.' },
      { id: 't5', label: 'Automated test suite contains Vitest unit tests, RTL component tests, and Supertest API tests.' },
      { id: 't6', label: 'Production deployed with live public URL, responsive mobile layout, and zero console errors.' },
      { id: 't7', label: 'Professional GitHub README includes problem statement, architecture diagrams, and setup guide.' }
    ]
  }
};
