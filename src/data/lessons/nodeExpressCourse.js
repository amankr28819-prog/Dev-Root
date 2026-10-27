/**
 * Dev-root Course 10: Backend Development with Node.js - Deep Learning Curriculum (Phase 4 4x Depth Standard)
 * Comprehensive lessons covering Node.js architecture, non-blocking I/O, NPM,
 * Express server construction, RESTful routing, and the middleware pipeline.
 */

export const NODE_EXPRESS_LESSONS = {
  'nodejs-runtime-and-modules': {
    id: 'lesson-10-1',
    slug: 'nodejs-runtime-and-modules',
    courseId: 'course-10',
    courseSlug: 'nodejs-and-express',
    courseTitle: 'Course 10: Backend Development with Node.js',
    title: 'The Node.js Runtime & NPM Ecosystem',
    category: 'Backend',
    estimatedTime: '45 min read & practice',
    objectives: [
      'Understand the Node.js architecture: Google V8 Engine, libuv, and the asynchronous event-driven loop.',
      'Differentiate the Node.js server environment from the Browser environment.',
      'Master the NPM package ecosystem, package.json dependencies, and semantic versioning.',
      'Compare CommonJS (require/module.exports) with modern ES Modules (import/export).',
      'Read and write files asynchronously using the native fs/promises and path modules.'
    ],
    sections: [
      {
        heading: 'What is Node.js and Why Was It Created?',
        content: `Before 2009, JavaScript was confined entirely to web browsers. Backend server programming required languages like Java, PHP, Python, or Ruby.

In 2009, Ryan Dahl created **Node.js** by taking Google Chrome's high-performance **V8 JavaScript Engine** and embedding it inside a C++ wrapper with a low-level asynchronous I/O library called **libuv**.

Node.js is **not a programming language or framework**; it is an **open-source, cross-platform JavaScript runtime environment** that allows developers to execute JavaScript on servers, personal computers, and cloud infrastructure.

\`\`\`
+-----------------------------------------------------------+
|                     YOUR JAVASCRIPT CODE                  |
+-----------------------------------------------------------+
|          Node.js Standard Library (fs, http, path)        |
+-----------------------------------------------------------+
|    Google V8 Engine (C++)     |     libuv Event Loop (C)  |
|  (Compiles JS to Machine Code)| (Asynchronous File & Net) |
+-------------------------------+---------------------------+
|                   OPERATING SYSTEM KERNEL                 |
+-----------------------------------------------------------+
\`\`\``
      },
      {
        heading: 'Node.js vs. The Browser: What Exists and What Does Not',
        content: `Because Node.js executes directly on the server operating system rather than inside a browser sandbox, the global environment differs fundamentally:

| Feature / Global Object | Web Browser | Node.js Server |
| :--- | :---: | :---: |
| **\`window\` & \`document\`** | YES (The DOM) | **NO (Throws ReferenceError)** |
| **Direct File System Access (\`fs\`)** | NO (Sandboxed security) | **YES (Can read/write files on disk)** |
| **Operating System Info (\`process\`)** | NO | **YES (\`process.env\`, \`process.exit\`)** |
| **Database Network Sockets** | NO (Cannot open TCP) | **YES (Connects to MongoDB, PostgreSQL)** |
| **\`console.log\` & Timers** | YES | YES (\`setTimeout\`, \`setInterval\`) |
| **\`fetch\` API** | YES | YES (Native since Node v18+) |`
      },
      {
        heading: 'The NPM Ecosystem, package.json, and Semantic Versioning',
        content: `**NPM (Node Package Manager)** is the world's largest software registry, hosting millions of open-source packages (such as Express, Mongoose, and bcrypt).

### The Manifest: \`package.json\`
The \`package.json\` file defines project metadata, npm scripts, and dependencies:

\`\`\`json
{
  "name": "crp-india-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.19.2",
    "mongoose": "^8.3.0",
    "dotenv": "^16.4.5"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}
\`\`\`

### Semantic Versioning (\`MAJOR.MINOR.PATCH\`):
In \`^4.19.2\`:
* **MAJOR (4):** Breaking, incompatible API changes.
* **MINOR (19):** Backward-compatible new features.
* **PATCH (2):** Backward-compatible bug fixes.
* **Caret (\`^\`):** Automatically installs minor and patch updates (\`^4.19.2\` allows updates up to \`< 5.0.0\`).`
      },
      {
        heading: 'Module Systems: CommonJS vs. ES Modules',
        content: `Node.js historically used **CommonJS** (\`require\`), but modern Node.js fully supports standard **ES Modules** (\`import\` / \`export\`):

\`\`\`javascript
// 1. CommonJS (Legacy standard)
// const express = require('express');
// module.exports = { calculateSLA };

// 2. ES Modules (Modern Standard - Enabled via "type": "module" in package.json)
import express from 'express';
import path from 'path';

export const calculateSLA = (priority) => priority === "urgent" ? 24 : 72;
\`\`\``
      },
      {
        heading: 'Asynchronous File System Operations with fs/promises',
        content: `Never use synchronous file system methods (like \`fs.readFileSync\`) in a web server! Synchronous methods block the entire Node.js event loop, preventing all other incoming requests from being handled until the disk read finishes.

Always use the promise-based **\`fs/promises\`** module:
\`\`\`javascript
import fs from 'fs/promises';
import path from 'path';

async function logIncident(incidentData) {
  try {
    const filePath = path.resolve('logs', 'audit.log');
    const entry = \`[\${new Date().toISOString()}] \${JSON.stringify(incidentData)}\\n\`;
    await fs.appendFile(filePath, entry, 'utf-8');
    console.log("Audit entry persisted to disk.");
  } catch (err) {
    console.error("File write failure:", err);
  }
}
\`\`\``
      }
    ],
    exercise: {
      instruction: 'Write a Node.js utility function readServerConfig(configPath) using fs/promises. Read the JSON file, parse it into an object, and return it. If the file is missing, return a fallback object { port: 5000, env: "development" } without crashing.',
      starterCode: `import fs from 'fs/promises';

async function readServerConfig(configPath) {
  // Read and parse JSON safely
}
`,
      hints: [
        'Wrap operations in a try/catch block.',
        'Use const data = await fs.readFile(configPath, "utf-8"); inside try.',
        'Return JSON.parse(data);',
        'In catch(err), return { port: 5000, env: "development" }.'
      ],
      tasks: [
        'Use fs/promises asynchronous API',
        'Parse JSON string into JavaScript object',
        'Handle missing file errors gracefully',
        'Return fallback default configuration'
      ],
      solution: `import fs from 'fs/promises';

async function readServerConfig(configPath) {
  try {
    const rawData = await fs.readFile(configPath, 'utf-8');
    const config = JSON.parse(rawData);
    return config;
  } catch (err) {
    console.warn(\`Config file not found or invalid at \${configPath}, falling back to defaults.\`);
    return {
      port: 5000,
      env: 'development'
    };
  }
}`,
      solutionExplanation: 'This demonstrates resilient Node.js file system programming. By using fs/promises inside an async function, the event loop remains completely unblocked while reading disk data, and the try/catch guarantees the server will not crash if the configuration file is absent.'
    },
    quiz: [
      {
        question: 'Why is using synchronous file operations like "fs.readFileSync()" considered an anti-pattern in Node.js web servers?',
        options: [
          'Synchronous file methods are deprecated and deleted in modern Node.js.',
          'Synchronous operations block the single-threaded Node.js event loop, freezing all concurrent incoming web requests until the disk read finishes.',
          'Synchronous methods cannot read JSON files.',
          'Synchronous methods consume double the CPU power.'
        ],
        correctIndex: 1,
        explanation: 'Because Node.js is single-threaded, any synchronous blocking call stops the entire thread. If a file takes 100ms to read from disk, zero other users can receive HTTP responses during that window.'
      },
      {
        question: 'Which underlying C library provides Node.js with its non-blocking asynchronous I/O and thread pool capabilities?',
        options: [
          'React',
          'libuv',
          'WebKit',
          'Babel'
        ],
        correctIndex: 1,
        explanation: 'libuv is the multi-platform C support library written for Node.js that manages the event loop, thread pool, network sockets, and asynchronous file operations.'
      }
    ],
    takeaways: [
      'Node.js is an asynchronous, event-driven JavaScript runtime built on Chrome V8 and libuv.',
      'Node.js has full operating system access (files, network, processes) but lacks the browser DOM.',
      'Always use asynchronous methods (fs/promises) to keep the single-threaded event loop unblocked.',
      'package.json tracks dependencies with semantic versioning (MAJOR.MINOR.PATCH).'
    ],
    caseStudyReference: {
      title: 'Backend Architecture & Scripts in CRP India',
      description: 'Explore the root package.json and server entrypoint in CRP India that orchestrates Node.js runtime configurations and scripts.',
      files: [
        'reference-projects/CRP-India/backend/package.json',
        'reference-projects/CRP-India/backend/server.js'
      ]
    }
  },

  'express-servers-and-middleware': {
    id: 'lesson-10-2',
    slug: 'express-servers-and-middleware',
    courseId: 'course-10',
    courseSlug: 'nodejs-and-express',
    courseTitle: 'Course 10: Backend Development with Node.js',
    title: 'Express Routing & Middleware Architecture',
    category: 'Backend',
    estimatedTime: '45 min read & practice',
    objectives: [
      'Construct a production-grade web server using the Express.js framework.',
      'Implement RESTful HTTP routing: GET, POST, PUT/PATCH, and DELETE.',
      'Extract data from route parameters (req.params), query strings (req.query), and JSON bodies (req.body).',
      'Master the Express Middleware pipeline and explain the role of the next() function.',
      'Implement centralized error-handling middleware to catch uncaught exceptions and return standardized JSON.'
    ],
    sections: [
      {
        heading: 'Why Express.js is the De Facto Web Framework for Node.js',
        content: `While Node.js provides a native low-level \`http\` module, building a production REST API with it requires hundreds of lines of boilerplate code to parse URLs, decode JSON request bodies, and handle CORS headers manually.

**Express.js** is a minimal, unopinionated, fast web framework for Node.js that provides:
* Clean, declarative routing for all HTTP methods (\`GET\`, \`POST\`, \`PUT\`, \`DELETE\`).
* A composable **Middleware Pipeline** for authentication, logging, and input validation.
* Standardized helpers for sending JSON responses and HTTP status codes (\`res.status(200).json(...)\`).`
      },
      {
        heading: 'The Express Server Anatomy: A Minimal Working API',
        content: `Here is a complete, production-ready Express web server:

\`\`\`javascript
import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Built-in Middleware: Parses incoming application/json request bodies
app.use(express.json());

// 2. Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

// 3. Start listening on network port
app.listen(PORT, () => {
  console.log(\`CRP India Server listening on http://localhost:\${PORT}\`);
});
\`\`\``
      },
      {
        heading: 'RESTful Routing: Extracting Parameters, Queries, and Payloads',
        content: `REST (Representational State Transfer) maps standard HTTP methods to CRUD operations:

\`\`\`
  HTTP Method    CRUD Action    Route Example             Description
  -----------    -----------    -----------------------   ------------------------------
  GET            Read           /api/v1/complaints        List all complaints
  GET            Read           /api/v1/complaints/:id    Fetch single complaint details
  POST           Create         /api/v1/complaints        Register a new complaint
  PATCH / PUT    Update         /api/v1/complaints/:id    Update ticket status or notes
  DELETE         Delete         /api/v1/complaints/:id    Remove or archive complaint
\`\`\`

### Extracting Incoming Request Data:
\`\`\`javascript
// 1. Route Parameters (req.params) - Variables defined in URL path (:id)
app.get('/api/v1/complaints/:id', (req, res) => {
  const ticketId = req.params.id; // e.g., "CRP-4092"
  res.json({ id: ticketId, status: "Investigating" });
});

// 2. Query Parameters (req.query) - Key-value pairs after '?' (/complaints?ward=4&status=open)
app.get('/api/v1/complaints', (req, res) => {
  const { ward, status } = req.query;
  res.json({ filterWard: ward, filterStatus: status });
});

// 3. JSON Request Body (req.body) - Sent via POST/PUT payloads
app.post('/api/v1/complaints', (req, res) => {
  const { title, department, citizenName } = req.body;
  if (!title || !department) {
    return res.status(400).json({ error: "Title and Department are required fields." });
  }
  res.status(201).json({ message: "Complaint logged successfully", ticketId: 1042 });
});
\`\`\``
      },
      {
        heading: 'The Middleware Pipeline: The Core of Express Architecture',
        content: `**Middleware functions** are functions that have access to the Request object (\`req\`), the Response object (\`res\`), and the **\`next\`** function in the application’s request-response cycle.

\`\`\`
  [Client HTTP Request]
           |
           v
  +-------------------------------------------------------------+
  |                   EXPRESS MIDDLEWARE PIPELINE               |
  |                                                             |
  |  1. Logger Middleware       (Logs "GET /api/tickets")       |
  |         | next()                                            |
  |  2. Auth Verification       (Validates JWT token)           |
  |         | next()                                            |
  |  3. Route Controller        (Fetches tickets from MongoDB)  |
  +-------------------------------------------------------------+
           |
           v res.status(200).json(...)
  [Client Receives JSON]
\`\`\`

### Creating Custom Middleware:
\`\`\`javascript
// Custom Request Logging Middleware
const requestLogger = (req, res, next) => {
  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.originalUrl}\`);
  next(); // Pass control to the next middleware in the chain!
};

// Mount globally
app.use(requestLogger);
\`\`\`
*Critical Rule:* If a middleware does not terminate the request (by sending a response like \`res.json()\`), it **must call \`next()\`**! Otherwise, the request hangs forever and the client eventually times out.`
      },
      {
        heading: 'Centralized Error-Handling Middleware',
        content: `Instead of duplicating try/catch response blocks in every controller, Express provides dedicated **Error-Handling Middleware** identified by **four arguments: \`(err, req, res, next)\`**:

\`\`\`javascript
// Centralized Error Handler (Must be registered as the VERY LAST app.use())
app.use((err, req, res, next) => {
  console.error("UNCAUGHT EXCEPTION:", err.stack);
  
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
});
\`\`\``
      }
    ],
    exercise: {
      instruction: 'Create an Express route POST /api/v1/tickets that validates that req.body contains both title and department. If either is missing, return HTTP 400 with { error: "Missing required fields" }. If valid, return HTTP 201 with { success: true, id: 999 }.',
      starterCode: `import express from 'express';
const router = express.Router();

router.post('/api/v1/tickets', (req, res) => {
  // Validate req.body and respond with appropriate HTTP status code
});
`,
      hints: [
        'Destructure const { title, department } = req.body;',
        'Check if (!title || !department) return res.status(400).json({ error: "Missing required fields" });',
        'Otherwise, return res.status(201).json({ success: true, id: 999 });'
      ],
      tasks: [
        'Destructure title and department from req.body',
        'Return 400 Bad Request on missing fields',
        'Return 201 Created on valid submission',
        'Send structured JSON payloads'
      ],
      solution: `import express from 'express';
const router = express.Router();

router.post('/api/v1/tickets', (req, res) => {
  const { title, department } = req.body;

  if (!title || !department) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: title and department are mandatory.'
    });
  }

  // Simulate creation
  return res.status(201).json({
    success: true,
    message: 'Ticket created successfully',
    id: 999
  });
});`,
      solutionExplanation: 'This demonstrates idiomatic REST API design in Express: inspecting request body fields, returning proper HTTP status codes (400 for client validation failures, 201 for successful resource creation), and returning uniform JSON envelopes.'
    },
    quiz: [
      {
        question: 'What happens if a custom Express middleware function neither sends an HTTP response (res.json) nor calls the next() function?',
        options: [
          'Express automatically skips to the next route.',
          'The client HTTP request hangs indefinitely until the browser or proxy triggers a gateway timeout error.',
          'The Node.js operating system process crashes immediately.',
          'The request is converted into a WebSocket connection.'
        ],
        correctIndex: 1,
        explanation: 'In Express, the pipeline is sequential. If a middleware does not call next() or send a response, execution freezes, leaving the client waiting until network timeout.'
      },
      {
        question: 'How does Express differentiate a standard middleware function from an Error-Handling middleware function?',
        options: [
          'By checking if the function name starts with "error".',
          'By inspecting the function arity (number of declared arguments): Error-handling middleware accepts exactly four arguments: (err, req, res, next).',
          'Error middleware must be written in TypeScript.',
          'Error middleware can only be registered on port 80.'
        ],
        correctIndex: 1,
        explanation: 'Express checks function.length. When a middleware declares 4 parameters (err, req, res, next), Express treats it as an error interceptor and routes errors directly to it.'
      }
    ],
    takeaways: [
      'Express provides declarative routing and a composable middleware architecture.',
      'Always use express.json() to parse incoming JSON request payloads.',
      'REST APIs communicate using standard HTTP status codes (200 OK, 201 Created, 400 Bad Request, 500 Error).',
      'Always call next() in custom middleware unless you are terminating the request with a response.'
    ],
    caseStudyReference: {
      title: 'Server Configuration & Route Controllers in CRP India',
      description: 'Analyze how CRP India configures its Express server, mounts complaintRoutes, and defines middleware for CORS and JWT validation.',
      files: [
        'reference-projects/CRP-India/backend/server.js',
        'reference-projects/CRP-India/backend/routes/complaintRoutes.js'
      ]
    }
  }
};
