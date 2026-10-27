/**
 * Dev-root Course 16: Career Readiness, Portfolio & Technical Interview Mastery
 * Deep Learning Curriculum (Phase 6 4x Content-Depth Standard)
 * High-Impact Developer Portfolios, Professional Documentation & READMEs,
 * Articulating Technical Decisions, Full-Stack Technical Interview Preparation, and System Design Thinking.
 */

export const CAREER_READINESS_LESSONS = {
  'portfolio-strategy-and-documentation': {
    id: 'lesson-16-1',
    slug: 'portfolio-strategy-and-documentation',
    courseId: 'course-16',
    courseSlug: 'career-readiness-and-interview-mastery',
    courseTitle: 'Course 16: Career Readiness & Technical Interview Mastery',
    title: 'High-Impact Portfolios & Professional Documentation',
    category: 'Career',
    estimatedTime: '45 min read & practice',
    objectives: [
      'Understand what engineering hiring managers look for in a junior-to-mid full-stack portfolio.',
      'Select 2 to 3 deep, production-grade applications over 20 shallow tutorial clones.',
      'Master the anatomy of a professional GitHub README: problem statement, architecture diagrams, setup, API specs, and trade-offs.',
      'Document architectural decisions, engineering limitations, and future roadmap items with honesty and precision.',
      'Publish clean, open-source repositories with clean Git commit history and zero exposed secrets.',
      'Deploy live, working demonstrations with sample login credentials for instant recruiter evaluation.'
    ],
    sections: [
      {
        heading: 'What Engineering Hiring Managers Actually Look For',
        content: `A common mistake among self-taught developers is building dozens of generic tutorial projects: a basic counter, a standard calculator, a copy-paste weather app, and an identical Todo list. 

Hiring managers review hundreds of portfolios each week. A portfolio with 15 copy-pasted tutorial apps signals that the candidate can follow instructions, but cannot design solutions independently.

\`\`\`
   TUTORIAL PORTFOLIO (Weak):
   * 15 simple projects copied from YouTube videos.
   * Readme says: "This is a React app created with create-react-app."
   * No backend, no persistent data, no authentication.
   * No live deployed link (or broken 404 links).
   * Commit history: "update", "fix bug", "test".

   ENGINEER PORTFOLIO (High Impact):
   * 2 to 3 deep, complete, full-stack applications solving real problems.
   * Exemplary CRP India case study: real civic problem, role-based auth,
     database modeling, validation, automated tests, and live demo.
   * Comprehensive README with system diagrams and setup instructions.
   * Honest discussion of architectural trade-offs and lessons learned.
   * Clean Git commit history showing iterative, logical development.
\`\`\``
      },
      {
        heading: 'The Anatomy of a Professional GitHub README',
        content: `Your project README is the front door of your software. A recruiter or lead engineer will spend 60 seconds reviewing your README before deciding whether to inspect the code or book an interview.

A production-grade README contains eight essential sections:
1. **Header & Badges:** Project name, clear one-sentence value proposition, live demo link, and status badges (Build passing, Test coverage 85%, License MIT).
2. **The Problem Statement:** What real-world user or organizational problem does this application solve?
3. **Key Features & User Personas:** Distinct capabilities broken down by user role (Citizen vs Nodal Administrator).
4. **Architecture & Tech Stack:** Diagram showing data flow between Frontend (React/Vite), Backend (Node/Express), Database (MongoDB Atlas), and Authentication (JWT/bcrypt).
5. **Local Installation & Setup Guide:** Clear, step-by-step instructions that work on any machine:
   * Prerequisites (Node.js v20+, MongoDB).
   * Clone repository and install dependencies.
   * Environment variable template (\`.env.example\`).
   * Start commands (\`npm run dev\`).
6. **API Specification / Routes Table:** Table of endpoints, HTTP methods, authorization requirements, and sample payloads.
7. **Automated Testing Instructions:** How to execute unit, component, integration, and E2E tests (\`npm test\`).
8. **Architectural Trade-offs & Future Improvements:** What compromises were made? (e.g. "Used polling instead of WebSockets in v1 to reduce server infrastructure complexity; WebSockets planned for v2").`
      },
      {
        heading: 'Live Demos: Remove All Friction for Evaluators',
        content: `Recruiters and hiring managers will **not** create a fake email, register an account, and verify an email just to see your dashboard!

**Golden Rules for Live Demos:**
* Provide a **One-Click Demo Login** or clearly display test credentials on the login screen:
  \`\`\`
  Demo Credentials:
  - Citizen: citizen@example.com / Password123!
  - Administrator: admin@example.com / AdminSecure99!
  \`\`\`
* Pre-populate the demo database with **realistic sample data**: 15 well-formatted grievance tickets, realistic dates, photographs, and resolution comments—not "asdfasdf" or "test 123".
* Ensure the live demo is responsive on mobile screens, as many recruiters first tap links on their smartphones.`
      }
    ],
    crpIndiaConnection: 'In Dev-root, the CRP India full-stack project serves as the ideal portfolio centerpiece: demonstrating real municipal domain complexity, multi-role security, relational database design, and end-to-end testing.',
    codeExample: `<!-- Sample Professional README Header Snippet -->
# CRP India — Citizen Redressal & Municipal Grievance Portal

[![CI Test Suite](https://github.com/developer/crp-india/actions/workflows/ci.yml/badge.svg)](https://github.com/developer/crp-india)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> A full-stack, role-based municipal complaint management platform enabling citizens to lodge geo-tagged infrastructure grievances and empowering city nodal officers to prioritize, assign, and track resolutions.

[🚀 Explore Live Demo](https://crp-india-demo.vercel.app) • [📖 API Documentation](docs/API.md) • [🏗️ Architecture Specs](docs/ARCHITECTURE.md)

### 🔑 Demo Credentials
| Role | Email | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Citizen** | \`citizen@crpdemo.in\` | \`CitizenDemo!123\` | Lodge grievances, track status, add comments |
| **Nodal Admin** | \`admin@crpdemo.in\` | \`AdminSecure!999\` | Assign officers, update resolution, export reports |`,
    commonMistakes: [
      {
        mistake: 'Leaving default boilerplate text: "This project was bootstrapped with Create React App."',
        fix: 'Replace default READMEs completely with custom problem statements, architecture diagrams, and setup instructions.'
      },
      {
        mistake: 'Deploying an empty database where the dashboard displays blank tables.',
        fix: 'Include a seed script (npm run seed) that populates realistic sample data so the app looks alive on first visit.'
      },
      {
        mistake: 'Claiming skills on your portfolio that you cannot explain in an interview.',
        fix: 'Only list technologies you have built with and can discuss deeply. Quality and depth always triumph over long buzzword lists.'
      }
    ],
    exercise: {
      instruction: 'Write a concise, professional Trade-offs and Lessons Learned section for a project that chose MongoDB over PostgreSQL.',
      prompt: 'Write a concise, professional Trade-offs and Lessons Learned section for a project that chose MongoDB over PostgreSQL.',
      starterCode: `// Write markdown trade-offs section:`,
      solution: `### ⚖️ Architectural Trade-offs: MongoDB vs. PostgreSQL

- **Why MongoDB was chosen:** Flexible document schemas allowed rapid iteration on grievance complaint payloads, accommodating varying municipal department metadata (e.g. sanitation vs electrical) without complex multi-table joins.
- **Trade-off & Mitigation:** MongoDB lacks multi-document ACID transactions by default in standalone configurations. To guarantee referential integrity between citizen accounts and complaint records, strict Mongoose schema validation and application-level transaction sessions were implemented.
- **Future Evolution:** For high-volume financial transactions or municipal billing modules, migrating to PostgreSQL with Prisma ORM would provide stronger relational guarantees.`,
      solutionCode: `### ⚖️ Architectural Trade-offs: MongoDB vs. PostgreSQL

- **Why MongoDB was chosen:** Flexible document schemas allowed rapid iteration on grievance complaint payloads, accommodating varying municipal department metadata (e.g. sanitation vs electrical) without complex multi-table joins.
- **Trade-off & Mitigation:** MongoDB lacks multi-document ACID transactions by default in standalone configurations. To guarantee referential integrity between citizen accounts and complaint records, strict Mongoose schema validation and application-level transaction sessions were implemented.
- **Future Evolution:** For high-volume financial transactions or municipal billing modules, migrating to PostgreSQL with Prisma ORM would provide stronger relational guarantees.`,
      hint: 'Explain why the choice was made, the trade-off introduced, and how it was mitigated.'
    },
    quiz: [
      {
        question: 'Why is having 2 to 3 deep, well-documented full-stack projects vastly superior to 15 simple tutorial apps on a developer portfolio?',
        options: [
          'Because GitHub limits accounts to 3 repositories.',
          'Because engineering managers evaluate independent architectural thinking, problem-solving, testing, and system design, which simple tutorial apps do not demonstrate.',
          'Because tutorial apps cannot be deployed to the cloud.',
          'Because recruiters only read 2 lines of code.'
        ],
        correctIndex: 1,
        answer: 1,
        explanation: 'Deep projects demonstrate that you can navigate authentication, database modeling, state synchronization, edge cases, and testing independently.'
      },
      {
        question: 'Why should you provide pre-filled demo login buttons or credentials on your deployed application?',
        options: [
          'To bypass database security.',
          'Because recruiters and hiring managers have very limited time and will rarely complete a multi-step registration flow just to view your application.',
          'Because browsers do not support typing in production.',
          'To disable HTTPS.'
        ],
        correctIndex: 1,
        answer: 1,
        explanation: 'Removing friction allows hiring managers to immediately experience the core features of your application in seconds.'
      }
    ],
    takeaways: [
      'Focus on 2 to 3 deep, authentic projects that solve real problems rather than dozens of clone tutorials.',
      'A professional README features problem statements, architecture diagrams, setup guides, and honest trade-offs.',
      'Always provide one-click demo credentials and seed realistic sample data on live deployed demonstrations.',
      'Honesty regarding project limitations and future improvements signals engineering maturity.'
    ],
    keyTakeaways: [
      'Focus on 2 to 3 deep, authentic projects that solve real problems rather than dozens of clone tutorials.',
      'A professional README features problem statements, architecture diagrams, setup guides, and honest trade-offs.',
      'Always provide one-click demo credentials and seed realistic sample data on live deployed demonstrations.',
      'Honesty regarding project limitations and future improvements signals engineering maturity.'
    ]
  },

  'explaining-technical-decisions': {
    id: 'lesson-16-2',
    slug: 'explaining-technical-decisions',
    courseId: 'course-16',
    courseSlug: 'career-readiness-and-interview-mastery',
    courseTitle: 'Course 16: Career Readiness & Technical Interview Mastery',
    title: 'Articulating Technical Decisions & Engineering Communication',
    category: 'Career',
    estimatedTime: '45 min read & practice',
    objectives: [
      'Master the STAR (Situation, Task, Action, Result) framework for behavioral and technical interviews.',
      'Articulate technical architectural decisions: why you picked specific libraries, data models, or hosting providers.',
      'Explain difficult bugs and debugging journeys clearly without placing blame.',
      'Discuss software trade-offs: performance vs maintainability, relational vs document databases, client vs server rendering.',
      'Explain complex technical concepts to non-technical stakeholders in plain English.',
      'Demonstrate engineering humility, curiosity, and collaboration.'
    ],
    sections: [
      {
        heading: 'Communication is the Defining Full-Stack Superpower',
        content: `Junior developers often believe that technical interviews are solely tests of algorithmic memorization. In reality, senior engineering leaders are answering a critical question:
*"Would I trust this person to collaborate with our team, understand business requirements, make thoughtful technical decisions, and communicate clearly when things break?"*

If you write flawless code but cannot explain **why** you chose a specific approach, or if you become defensive when your architecture is questioned, interviewers will hesitate to hire you.

\`\`\`
   POOR COMMUNICATION:
   "I used Redux because everyone says you should use Redux."
   "The backend broke because MongoDB is bad."
   "I just copy-pasted this code from Stack Overflow."

   STRONG ENGINEERING COMMUNICATION:
   "I evaluated whether to use Context API versus Redux. Since our state
   was localized to user authentication and notification toasts, Context API
   provided the necessary capabilities without adding 50kB of library boilerplate.
   If we expanded into complex caching across 20 distinct data models, I would
   re-evaluate Zustand or Redux Toolkit."
\`\`\``
      },
      {
        heading: 'The STAR Framework for Technical Storytelling',
        content: `When asked questions like *"Tell me about a challenging bug you solved"* or *"Describe an architecture decision you made"*, use the structured **STAR Framework**:

\`\`\`
  [S] SITUATION: Set the context and business environment.
      "While building the citizen complaint submission feature in CRP India..."

  [T] TASK: Define the specific engineering challenge or objective.
      "We needed citizens to upload high-resolution photos of infrastructure damage,
      but mobile uploads were frequently timing out on slow 3G cellular connections."

  [A] ACTION: Explain the technical steps you took.
      "I investigated our network waterfall and observed that mobile devices were
      uploading uncompressed 12MB raw photos directly to the server. I implemented
      client-side canvas image compression to resize photos to a maximum 1600px width
      at 80% JPEG quality before dispatching, reducing average payload size from
      12MB to 350kB. I also added upload progress indicators and retry logic."

  [R] RESULT: Quantify the outcome and impact.
      "Upload failure rates dropped from 28% to under 1.5%, mobile battery drain
      decreased significantly, and server cloud storage costs were reduced by 85%."
\`\`\``
      },
      {
        heading: 'How to Handle Questions You Do Not Know',
        content: `In every rigorous technical interview, you will eventually encounter a question you do not know. 

**What NOT to do:**
* Never guess blindly or pretend you know something you don't. Senior engineers see through bluffs instantly.

**The Professional Response:**
1. **Acknowledge honestly:** *"I haven't used that specific tool in production yet..."*
2. **Connect to foundational principles:** *"...however, based on how similar tools like Redis operate, I imagine it handles in-memory key-value caching using an event-driven loop."*
3. **Reason aloud:** Walk the interviewer through your thought process: *"If I were designing this, I would consider X and Y..."*
4. **Demonstrate curiosity:** *"How does your team utilize that in your current architecture?"*`
      }
    ],
    crpIndiaConnection: 'When explaining the CRP India case study in an interview, candidates can articulate why role-based middleware was chosen, how municipal SLA timers are calculated, and how database indexes were applied to speed up ward queries.',
    codeExample: `// The "Trade-off Matrix" template for articulating decisions in interviews:
/*
When explaining any technical choice (e.g. JWT vs Sessions):
1. Option A (JWT):
   - Pro: Stateless, horizontally scalable across microservices, no DB lookup per request.
   - Con: Cannot be easily revoked before expiration without a token blacklist.
2. Option B (Server Sessions):
   - Pro: Instant revocation, smaller payload over wire.
   - Con: Requires central session store (Redis) creating a stateful bottleneck.
3. Decision:
   - "We chose short-lived JWTs (15 min) paired with HTTP-only refresh tokens,
      giving us stateless scaling while limiting the vulnerability window."
*/`,
    commonMistakes: [
      {
        mistake: 'Speaking in vague generalities ("We made it faster and better").',
        fix: 'Use specific engineering metrics and mechanisms ("We added a compound index on { ward: 1, status: 1 }, reducing query time from 420ms to 8ms").'
      },
      {
        mistake: 'Blaming libraries, tools, or teammates for bugs.',
        fix: 'Take ownership, explain the technical root cause objectively, and focus on what you learned and how you prevented recurrence.'
      },
      {
        mistake: 'Talking for 10 minutes without pausing for dialogue.',
        fix: 'Give a concise 2-minute overview using STAR, then pause and ask: "Would you like me to dive deeper into the database schema or the frontend state management?"'
      }
    ],
    exercise: {
      instruction: 'Draft a 150-word STAR response explaining how you solved a challenging bug involving CORS or authentication.',
      prompt: 'Draft a 150-word STAR response explaining how you solved a challenging bug involving CORS or authentication.',
      starterCode: `// Situation:
// Task:
// Action:
// Result:`,
      solution: `export const starBugResponse = {
  situation: 'During the staging deployment of our citizen grievance portal, frontend requests from Vercel to our Render API failed with CORS errors on authenticated routes.',
  task: 'I needed to resolve the cross-origin communication failure securely without exposing our API to arbitrary origins.',
  action: 'I inspected browser network preflights and found that our Express CORS middleware was configured with a wildcard (*) which browsers reject when credentials: true is set. I updated the backend to validate incoming origins against an explicit whitelist array and configured allowedHeaders for Authorization.',
  result: 'Authenticated requests succeeded immediately, secure cookie credentials were transmitted properly, and our staging test suite passed 100% of integration checks.'
};`,
      solutionCode: `export const starBugResponse = {
  situation: 'During the staging deployment of our citizen grievance portal, frontend requests from Vercel to our Render API failed with CORS errors on authenticated routes.',
  task: 'I needed to resolve the cross-origin communication failure securely without exposing our API to arbitrary origins.',
  action: 'I inspected browser network preflights and found that our Express CORS middleware was configured with a wildcard (*) which browsers reject when credentials: true is set. I updated the backend to validate incoming origins against an explicit whitelist array and configured allowedHeaders for Authorization.',
  result: 'Authenticated requests succeeded immediately, secure cookie credentials were transmitted properly, and our staging test suite passed 100% of integration checks.'
};`,
      hint: 'Structure your answer with Situation, Task, Action, and Result.'
    },
    quiz: [
      {
        question: 'What does the "A" in the STAR interview technique stand for?',
        options: ['Argument', 'Action', 'Algorithm', 'Audience'],
        correctIndex: 1,
        answer: 1,
        explanation: 'Action: Explaining the specific technical steps and decisions you took to resolve the problem.'
      },
      {
        question: 'What is the best way to respond in an interview when asked about a technology you have never used?',
        options: [
          'Pretend you have used it for 5 years.',
          'State that the technology is obsolete and refuse to discuss it.',
          'Honestly state that you have not used it in production, relate it to underlying computer science or architectural principles you do know, and reason through how you would learn and apply it.',
          'Immediately end the interview.'
        ],
        correctIndex: 2,
        answer: 2,
        explanation: 'Honesty paired with foundational technical reasoning and curiosity demonstrates engineering maturity and coachability.'
      }
    ],
    takeaways: [
      'Engineering communication and the ability to explain decisions are as critical as writing syntax.',
      'Use the STAR framework (Situation, Task, Action, Result) to structure technical interview answers.',
      'Frame decisions around trade-offs: every architectural choice has advantages and compromises.',
      'When you don’t know an answer, be honest, connect to foundational principles, and reason aloud.'
    ],
    keyTakeaways: [
      'Engineering communication and the ability to explain decisions are as critical as writing syntax.',
      'Use the STAR framework (Situation, Task, Action, Result) to structure technical interview answers.',
      'Frame decisions around trade-offs: every architectural choice has advantages and compromises.',
      'When you don’t know an answer, be honest, connect to foundational principles, and reason aloud.'
    ]
  },

  'fullstack-technical-interview-mastery': {
    id: 'lesson-16-3',
    slug: 'fullstack-technical-interview-mastery',
    courseId: 'course-16',
    courseSlug: 'career-readiness-and-interview-mastery',
    courseTitle: 'Course 16: Career Readiness & Technical Interview Mastery',
    title: 'Full-Stack Technical Interview Mastery: Core Concepts',
    category: 'Career',
    estimatedTime: '45 min read & practice',
    objectives: [
      'Master high-frequency full-stack interview questions across HTML, CSS, JavaScript, React, Node, and Databases.',
      'Deconstruct the JavaScript Event Loop, Call Stack, Microtask Queue (Promises), and Macrotask Queue (setTimeout).',
      'Explain closures, lexical scoping, prototypal inheritance, and the "this" keyword with crystal clarity.',
      'Deep dive into React internals: Virtual DOM, reconciliation diffing algorithm, Fiber architecture, and Hook rules.',
      'Explain Node.js event-driven architecture, non-blocking asynchronous I/O, streams, and cluster workers.',
      'Compare SQL vs NoSQL, indexes (B-trees), normalization, ACID transactions, and optimistic concurrency.'
    ],
    sections: [
      {
        heading: 'The JavaScript Event Loop & Concurrency Model',
        content: `A core question in almost every full-stack technical interview is: *"Explain how JavaScript handles asynchronous operations despite being single-threaded."*

\`\`\`
   ┌─────────────────────────────────────────────────────────────┐
   │ 1. CALL STACK: Executes synchronous code one frame at a time│
   │    (e.g. console.log, mathematical operations, function calls)
   └──────────────────────────────┬──────────────────────────────┘
                                  │ (Async Web API call: fetch, setTimeout)
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │ 2. WEB APIS / NODE C++ WORKERS: Run in background threads   │
   │    (Handles timer countdowns, OS network I/O, file reading) │
   └──────────────────────────────┬──────────────────────────────┘
                                  │ (Task completes, callback enqueued)
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │ 3. MICROTASK QUEUE (Higher Priority!):                      │
   │    Promises (.then, .catch), queueMicrotask, async/await    │
   ├─────────────────────────────────────────────────────────────┤
   │ 4. MACROTASK QUEUE (Lower Priority):                        │
   │    setTimeout, setInterval, setImmediate, I/O events        │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │ 5. THE EVENT LOOP:                                          │
   │    Continuously checks: Is the Call Stack completely EMPTY? │
   │    - YES: Drain ALL Microtasks first!                       │
   │    - Then take ONE Macrotask from the queue and push to stack
   └─────────────────────────────────────────────────────────────┘
\`\`\`

### Classic Output Prediction Interview Question:
\`\`\`javascript
console.log('1'); // Synchronous -> Call stack immediately prints '1'

setTimeout(() => {
  console.log('2'); // Macrotask Queue
}, 0);

Promise.resolve().then(() => {
  console.log('3'); // Microtask Queue
});

console.log('4'); // Synchronous -> Call stack immediately prints '4'

// Output Order: 1, 4, 3, 2
// Explanation: 1 and 4 execute synchronously. Then call stack empties.
// Event loop checks Microtask queue: executes Promise callback (3).
// Finally, Event loop checks Macrotask queue: executes setTimeout callback (2).
\`\`\``
      },
      {
        heading: 'React Internals: Virtual DOM and Reconciliation',
        content: `Interviewers frequently ask: *"How does React know what to re-render, and why is the Virtual DOM fast?"*

1. **The Problem with Direct DOM Manipulation:** Direct browser DOM operations are computationally expensive because mutating layout triggers style recalculations, reflows, and repainting across the document.
2. **The Virtual DOM (VDOM):** An in-memory JavaScript representation of the UI tree. When state changes in a component:
   * React creates a new lightweight Virtual DOM snapshot of the component tree.
   * **Reconciliation (Diffing Algorithm):** React compares the new VDOM tree with the previous VDOM tree using heuristic rules:
     * Two elements of different types produce different trees (replaces node).
     * Keys allow React to match child elements across renders in lists without re-creating all DOM nodes from scratch.
   * **Commit Phase:** React batches the calculated differences and applies the minimal necessary DOM mutations in a single batch.`
      },
      {
        heading: 'Database Deep Dive: Indexes and Query Performance',
        content: `Interviewers often ask: *"Our query searching for citizen tickets by ward is taking 3 seconds. How do you diagnose and fix it?"*

\`\`\`
  WITHOUT INDEX (Collection Scan - Collscan):
  * MongoDB reads every single document from disk (1,000,000 documents!).
  * High CPU, high disk I/O, 3,000ms latency.

  WITH COMPOUND INDEX ({ ward: 1, status: 1 } - B-Tree):
  * MongoDB traverses a sorted B-Tree index in memory.
  * Finds the exact memory pointers in O(log N) operations.
  * Reads only the 5 matching documents: 4ms latency!
\`\`\`

### How to Answer:
1. Explain how to run \`.explain("executionStats")\` on the query.
2. Check \`totalDocsExamined\` vs \`nReturned\`. If \`totalDocsExamined\` is 1,000,000 and \`nReturned\` is 5, you have a missing index.
3. Add a targeted compound index: \`schema.index({ ward: 1, status: 1 });\`.
4. Mention the trade-off: Indexes speed up \`find\` queries but slightly slow down \`insert\` and \`update\` writes because the B-tree must be updated on every write.`
      }
    ],
    crpIndiaConnection: 'In CRP India, compound database indexes on ward and status enable municipal dashboard charts to aggregate thousands of active tickets across districts in under 15 milliseconds.',
    codeExample: `// Classic JavaScript Closure Interview Example
function createGrievanceTracker(initialCount = 0) {
  let count = initialCount; // Encapsulated private variable

  return {
    increment: () => ++count,
    getCount: () => count
  };
}

const tracker = createGrievanceTracker(10);
console.log(tracker.getCount()); // 10
tracker.increment();
console.log(tracker.getCount()); // 11
// count variable is inaccessible from outside scope, demonstrating true encapsulation via closures!`,
    commonMistakes: [
      {
        mistake: 'Saying "JavaScript is multi-threaded because of Promises."',
        fix: 'JavaScript code execution is single-threaded; asynchronous operations are managed by browser Web APIs or Node C++ libuv worker pools that feed callbacks into the event loop.'
      },
      {
        mistake: 'Confusing null (intentional absence of value) with undefined (variable declared but unassigned).',
        fix: 'Be precise: undefined is the default JavaScript runtime value for unassigned variables; null is an intentional assignment representing "no value".'
      },
      {
        mistake: 'Thinking that indexing every column in a database is good practice.',
        fix: 'Indexes consume RAM and disk space and slow down writes; only index fields frequently used in WHERE, SORT, and JOIN clauses.'
      }
    ],
    exercise: {
      instruction: 'Predict the console output of this code snippet and explain why: console.log(typeof NaN); console.log(NaN === NaN);',
      prompt: 'Predict the console output of this code snippet and explain why: console.log(typeof NaN); console.log(NaN === NaN);',
      starterCode: `// Predict outputs:
// console.log(typeof NaN);
// console.log(NaN === NaN);`,
      solution: `// 1. typeof NaN === 'number'
// Explanation: In the IEEE 754 floating-point standard, NaN ("Not-a-Number") is a special numerical value representing undefined or unrepresentable mathematical results.

// 2. NaN === NaN === false
// Explanation: IEEE 754 specifies that NaN is not equal to any value, including itself. To check if a value is NaN, use Number.isNaN(val).`,
      solutionCode: `// 1. typeof NaN === 'number'
// Explanation: In the IEEE 754 floating-point standard, NaN ("Not-a-Number") is a special numerical value representing undefined or unrepresentable mathematical results.

// 2. NaN === NaN === false
// Explanation: IEEE 754 specifies that NaN is not equal to any value, including itself. To check if a value is NaN, use Number.isNaN(val).`,
      hint: 'Remember the IEEE 754 floating point standard and how JavaScript classifies numerical types.'
    },
    quiz: [
      {
        question: 'Which queue in the JavaScript Event Loop has higher execution priority?',
        options: [
          'The Macrotask Queue (setTimeout, setInterval).',
          'The Microtask Queue (Promises, queueMicrotask).',
          'Both have equal priority and run randomly.',
          'The DOM rendering queue.'
        ],
        correctIndex: 1,
        answer: 1,
        explanation: 'The event loop completely empties all pending microtasks before selecting the next macrotask from the queue.'
      },
      {
        question: 'What is a closure in JavaScript?',
        options: [
          'A method to close browser tabs.',
          'The combination of a function bundled together with references to its surrounding lexical environment (variable scope), allowing it to access outer variables even after the outer function has closed.',
          'An error that terminates a loop.',
          'A CSS property to hide modal dialogs.'
        ],
        correctIndex: 1,
        answer: 1,
        explanation: 'A closure gives an inner function access to an outer function’s scope even after the outer function has finished executing.'
      }
    ],
    takeaways: [
      'Master the JavaScript Event Loop: Call Stack -> Microtasks (Promises) -> Macrotasks (Timers).',
      'Explain React reconciliation: Virtual DOM diffing minimizes expensive browser reflows and repaints.',
      'Database indexes (B-trees) transform linear O(N) table scans into logarithmic O(log N) lookups.',
      'Understand closures as functions retaining access to their lexical scope.'
    ],
    keyTakeaways: [
      'Master the JavaScript Event Loop: Call Stack -> Microtasks (Promises) -> Macrotasks (Timers).',
      'Explain React reconciliation: Virtual DOM diffing minimizes expensive browser reflows and repaints.',
      'Database indexes (B-trees) transform linear O(N) table scans into logarithmic O(log N) lookups.',
      'Understand closures as functions retaining access to their lexical scope.'
    ]
  },

  'system-design-thinking-fundamentals': {
    id: 'lesson-16-4',
    slug: 'system-design-thinking-fundamentals',
    courseId: 'course-16',
    courseSlug: 'career-readiness-and-interview-mastery',
    courseTitle: 'Course 16: Career Readiness & Technical Interview Mastery',
    title: 'System Design Thinking for Junior & Mid Full-Stack Engineers',
    category: 'Career',
    estimatedTime: '45 min read & practice',
    objectives: [
      'Understand system design principles: client-server boundaries, horizontal vs vertical scaling, and the CAP theorem.',
      'Design RESTful and event-driven data architectures that handle traffic growth gracefully.',
      'Implement multi-tier caching strategies: Browser cache, CDN edge cache, and in-memory Redis caching.',
      'Evaluate database architecture: SQL (ACID, normalized relations) vs NoSQL (horizontal scaling, flexible schemas).',
      'Protect applications against overload: rate limiting, request throttling, and background job queues (BullMQ).',
      'Walk through a realistic full-stack system design interview: Designing a City-Wide Grievance Redressal System.'
    ],
    sections: [
      {
        heading: 'What is System Design at the Junior / Mid Level?',
        content: `Junior developers often fear system design interviews, believing they are expected to design distributed multi-region architectures for Netflix or Google from memory.

In reality, interviewers want to see **structured engineering reasoning**:
* Can you define clear boundaries between frontend, backend, and data storage?
* Can you recognize performance bottlenecks before they crash a server?
* Do you know when to process tasks synchronously (immediately) versus asynchronously (in the background)?
* Can you justify your technology choices based on specific constraints?`
      },
      {
        heading: 'Horizontal vs. Vertical Scaling & Stateless Architecture',
        content: `When web traffic increases from 100 users to 100,000 users, applications scale in two ways:

\`\`\`
   VERTICAL SCALING ("Scale Up"):
   * Buy a larger server with 64 CPUs and 256GB RAM.
   * Simple: no architectural changes required.
   * Limits: Expensive, hard hardware ceiling, single point of failure.

   HORIZONTAL SCALING ("Scale Out" - The Cloud Standard):
   * Add 5 identical lightweight Node.js server instances behind a Load Balancer.
   * Traffic distributed evenly (Round-Robin or Least Connections).
   * Fault Tolerant: If Server 3 crashes, Traffic routes to Servers 1, 2, 4, and 5.
   * REQUIREMENT: Servers must be STATELESS!
     - No saving session variables in local server RAM memory!
     - Store state in shared databases (MongoDB) or shared caches (Redis).
\`\`\``
      },
      {
        heading: 'System Design Walkthrough: City Grievance Redressal Portal',
        content: `### Prompt: "Design the backend architecture for CRP India to handle 10,000 complaints per hour during monsoon season."

\`\`\`
   [10,000 Citizens on Mobile & Web]
                 │
                 ▼ (HTTPS / DNS / Cloudflare CDN)
   [Edge Caching & DDoS Protection]
                 │
                 ▼
   [Cloud Load Balancer (Nginx / AWS ALB)]
                 │
                 ├───> [API Instance 1]
                 ├───> [API Instance 2] ───> [Shared Redis Cache] (Hot stats & rate limiting)
                 └───> [API Instance 3]
                             │
                             ├────(Write)────> [MongoDB Atlas Primary Node]
                             │                       │ (Replication)
                             │                       ▼
                             │                 [MongoDB Read Replicas]
                             │
                             ▼ (Enqueues heavy tasks: photo resizing, SMS notifications)
   [Background Job Queue (BullMQ / Redis)]
                 │
                 ▼
   [Worker Processes] ───> [AWS S3 / Cloudinary] (Compressed photo storage)
                      ───> [Twilio / Gov SMS Gateway]
\`\`\`

### Key Architectural Decisions Explained:
1. **Asynchronous Background Processing:** Citizens should not wait 5 seconds while the server compresses photos and sends SMS messages. The API saves the record, enqueues a background job in Redis, and returns \`201 Created\` to the citizen in 80ms!
2. **Read/Write Splitting:** 90% of traffic is citizens checking status. Route read queries to read-replicas, reserving the primary database node for complaint writes.
3. **Rate Limiting:** Protect APIs against spam and denial-of-service by limiting each citizen IP to 10 complaint submissions per hour.`
      }
    ],
    crpIndiaConnection: 'In CRP India, asynchronous background job queues decouple image processing and automated nodal SMS dispatches from the core Express API, maintaining sub-100ms response times during civic traffic spikes.',
    codeExample: `// Express rate limiting middleware example
import rateLimit from 'express-rate-limit';

// Limit each IP to 5 grievance submissions per 15-minute window:
export const grievanceSubmissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  standardHeaders: true, // Return rate limit info in RateLimit-* headers
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many complaints lodged from this IP address. Please wait 15 minutes before submitting again.'
  }
});`,
    commonMistakes: [
      {
        mistake: 'Storing user sessions or uploaded files in local server memory or local disk in horizontally scaled systems.',
        fix: 'Keep backend servers stateless: store files in object storage (S3/Cloudinary) and sessions/cache in distributed stores (Redis/MongoDB).'
      },
      {
        mistake: 'Processing long-running operations (like sending thousands of emails or transcoding videos) synchronously in the main HTTP request loop.',
        fix: 'Use asynchronous background job queues (BullMQ, Celery, SQS) and return an immediate 202 Accepted status code to the client.'
      },
      {
        mistake: 'Over-engineering a tiny prototype with 10 microservices, Kubernetes, and Kafka.',
        fix: 'Start with a clean, modular monolith. Break into microservices only when independent team velocity or scaling bottlenecks demand it.'
      }
    ],
    exercise: {
      instruction: 'List 3 strategies to reduce load on a database serving a viral news application experiencing 100x traffic.',
      prompt: 'List 3 strategies to reduce load on a database serving a viral news application experiencing 100x traffic.',
      starterCode: `// 1. Caching strategy:
// 2. Read replication strategy:
// 3. Asset offloading strategy:`,
      solution: `export const scalingStrategies = [
  '1. In-Memory Caching (Redis/Memcached): Cache top articles with a 5-minute TTL, intercepting 95% of reads before hitting the database.',
  '2. Database Read Replicas: Separate write traffic to the primary database while distributing read queries across multiple read replicas.',
  '3. CDN Edge Caching (Cloudflare/Fastly): Cache full public HTML/JSON responses at edge servers worldwide, offloading server compute entirely.'
];`,
      solutionCode: `export const scalingStrategies = [
  '1. In-Memory Caching (Redis/Memcached): Cache top articles with a 5-minute TTL, intercepting 95% of reads before hitting the database.',
  '2. Database Read Replicas: Separate write traffic to the primary database while distributing read queries across multiple read replicas.',
  '3. CDN Edge Caching (Cloudflare/Fastly): Cache full public HTML/JSON responses at edge servers worldwide, offloading server compute entirely.'
];`,
      hint: 'Consider in-memory caching with Redis, database read replicas, and CDN edge caching.'
    },
    quiz: [
      {
        question: 'Why must application servers be stateless to achieve horizontal scaling?',
        options: [
          'Because stateless servers use less electricity.',
          'Because any incoming request can be routed to any server instance without losing user session data or transaction context.',
          'Because stateful servers cannot run JavaScript.',
          'Because stateless servers do not require database connections.'
        ],
        correctIndex: 1,
        answer: 1,
        explanation: 'Stateless servers allow load balancers to route requests to any healthy instance seamlessly, since state is stored in shared databases or caches.'
      },
      {
        question: 'Why should image compression and SMS notifications be handled by background worker queues rather than in the primary HTTP request thread?',
        options: [
          'Because Node.js cannot send SMS messages.',
          'To keep HTTP response times fast and prevent long-running external API calls from blocking server compute or causing client gateway timeouts.',
          'Because background queues are free.',
          'Because browsers reject compressed images.'
        ],
        correctIndex: 1,
        answer: 1,
        explanation: 'Offloading slow I/O tasks to background workers allows the HTTP server to respond immediately, improving user experience and server throughput.'
      }
    ],
    takeaways: [
      'System design balances user requirements, scalability, reliability, and architectural trade-offs.',
      'Horizontal scaling requires stateless application servers with state stored in shared databases or caches.',
      'Offload long-running tasks (photo compression, notifications) to background job queues like BullMQ.',
      'Use multi-layer caching (CDN, Redis, Browser) to reduce database bottlenecks during traffic surges.'
    ],
    keyTakeaways: [
      'System design balances user requirements, scalability, reliability, and architectural trade-offs.',
      'Horizontal scaling requires stateless application servers with state stored in shared databases or caches.',
      'Offload long-running tasks (photo compression, notifications) to background job queues like BullMQ.',
      'Use multi-layer caching (CDN, Redis, Browser) to reduce database bottlenecks during traffic surges.'
    ]
  }
};
