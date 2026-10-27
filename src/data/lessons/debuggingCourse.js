/**
 * Dev-root Course 14: Professional Debugging & Troubleshooting
 * Deep Learning Curriculum (Phase 6 4x Content-Depth Standard)
 * Frontend Browser DevTools, JavaScript Runtime & Logic Debugging,
 * Backend Server & Database Diagnostics, and Full-Stack Distributed Tracing.
 */

export const DEBUGGING_LESSONS = {
  'frontend-and-devtools-debugging': {
    id: 'lesson-14-1',
    slug: 'frontend-and-devtools-debugging',
    courseId: 'course-14',
    courseSlug: 'professional-debugging-and-troubleshooting',
    courseTitle: 'Course 14: Professional Debugging & Troubleshooting',
    title: 'Frontend Browser DevTools: DOM, Styles, Network & Console',
    category: 'Debugging',
    estimatedTime: '45 min read & practice',
    objectives: [
      'Deconstruct the Chrome and Firefox Developer Tools suites like a senior software engineer.',
      'Interpret browser console warnings, errors, and unhandled promise rejections accurately.',
      'Inspect the live DOM tree, manipulate node states (:hover, :focus), and evaluate computed CSS.',
      'Diagnose broken layouts: box model margins, flexbox overflows, and z-index stacking context traps.',
      'Inspect network request waterfalls: status codes, request/response headers, and payload inspection.',
      'Audit browser storage engines: LocalStorage, SessionStorage, Cookies, and IndexedDB.'
    ],
    sections: [
      {
        heading: 'The Engineering Mindset: Debugging is Scientific Investigation',
        content: `Junior developers often debug by **random mutation**: changing a line of code, reloading the page, seeing if the bug vanished, and repeating this cycle until exhausted. This approach is slow, frustrates developers, and frequently introduces subtle secondary bugs.

Professional debugging follows the **Scientific Method**:
1. **Observe the Symptom:** Exactly what failed? What did you expect to happen versus what actually happened?
2. **Form a Hypothesis:** Based on the observed symptom and error stack, what is the most probable root cause?
3. **Gather Evidence:** Use DevTools (Console, Elements, Network tab) to inspect the actual state.
4. **Isolate the Cause:** Test your hypothesis with a targeted check or breakpoint.
5. **Apply the Minimal Fix:** Change only the code responsible for the failure.
6. **Verify and Prevent:** Verify that the issue is resolved and write an automated regression test so it never happens again.`
      },
      {
        heading: 'The Console Panel: Reading Errors and Stack Traces',
        content: `When a JavaScript error occurs in the browser, the console produces a **Stack Trace**. The stack trace tells you:
1. **Error Name:** The category of error (\`TypeError\`, \`ReferenceError\`, \`SyntaxError\`).
2. **Error Message:** The specific failure description.
3. **Call Stack:** The sequence of functions that executed right before the failure, including filename, line number, and column.

\`\`\`
  Uncaught TypeError: Cannot read properties of undefined (reading 'map')
      at GrievanceList (GrievanceList.jsx:24:28)
      at renderWithHooks (react-dom.development.js:15463:18)
      at mountIndeterminateComponent (react-dom.development.js:20074:13)
\`\`\`

### How to read this trace:
* **Line 1:** The code attempted to call \`.map()\` on a variable that evaluated to \`undefined\`.
* **Line 2:** The failure occurred in \`GrievanceList.jsx\` at line 24, column 28.
* **Root Cause:** A state variable (e.g. \`grievances\`) was initialized as \`undefined\` instead of an empty array \`[]\`, or an API fetch returned an error object \`{ error: "Server error" }\` instead of an array.

\`\`\`javascript
// BROKEN:
const [grievances, setGrievances] = useState(); // undefined initially!
return grievances.map(g => <div>{g.title}</div>); // CRASH on first render!

// FIXED (Defensive Initial State):
const [grievances, setGrievances] = useState([]); // always array
return (
  <div>
    {grievances.length === 0 ? <p>No grievances found.</p> : grievances.map(g => ...)}
  </div>
);
\`\`\``
      },
      {
        heading: 'The Elements & Computed Styles Panel: Diagnosing Broken Layouts',
        content: `When a web page renders with overflowing text, misaligned columns, or invisible elements, the **Elements Panel** is your primary inspection tool:

\`\`\`
   ┌────────────────────────────────────────────────────────┐
   │ Elements Tab Layout Diagnostic Workflow:              │
   │                                                        │
   │ 1. Inspect Element (Ctrl+Shift+C / Cmd+Shift+C)       │
   │    Hover over the offending element to see its box     │
   │    model: Content (blue), Padding (green),             │
   │    Border (yellow), Margin (orange).                   │
   │                                                        │
   │ 2. Check Computed Tab:                                 │
   │    Filter for 'display', 'width', 'flex-shrink',       │
   │    'overflow', or 'z-index'. Shows the FINAL value     │
   │    applied by the browser after all CSS cascade rules! │
   │                                                        │
   │ 3. Toggle Element State (:hov):                        │
   │    Force :hover, :focus, or :active states to inspect  │
   │    interactive button styles without holding mouse down│
   └────────────────────────────────────────────────────────┘
\`\`\`

### Common Layout Traps:
* **Horizontal Scrollbar Bugs:** An element has \`width: 100vw\` or an unconstrained child. In DevTools console, run:
  \`\`\`javascript
  // Highlights elements overflowing the viewport:
  document.querySelectorAll('*').forEach(el => {
    if (el.offsetWidth > document.documentElement.offsetWidth) console.log(el);
  });
  \`\`\`
* **Z-Index Stacking Context Traps:** Setting \`z-index: 999999\` does nothing if the element has \`position: static\` or is trapped inside a parent element with \`overflow: hidden\` or \`opacity < 1\`.`
      },
      {
        heading: 'The Network Panel: Diagnosing Failed API Requests',
        content: `Every time your frontend communicates with a backend, the **Network Panel** records the complete HTTP transaction:

\`\`\`
  Name             Status   Type   Initiator         Size    Time
  ─────────────────────────────────────────────────────────────────
  grievances       200      fetch  GrievanceList.js  1.2 kB  45ms
  upload-photo     413      fetch  GrievanceForm.js  15 kB   120ms
  admin-reports    403      fetch  AdminNav.js       340 B   18ms
  nodal-status     CORS Err fetch  Dashboard.js      0 B     12ms
\`\`\`

### Reading Network Failures:
1. **Status 413 (Payload Too Large):** Citizen uploaded an uncompressed 15MB photo. Backend Express body parser or Nginx reverse proxy rejected the body size ceiling.
2. **Status 403 (Forbidden):** Token valid, but citizen lacks nodal administrative rights.
3. **CORS Error (Red row with 0 bytes):** The browser blocked the request before your JavaScript could read it because the backend server omitted \`Access-Control-Allow-Origin\` headers.`
      }
    ],
    crpIndiaConnection: 'In CRP India, the Network tab is used during ward assignment testing to verify that JWT Bearer tokens are properly attached in the Authorization header and that photo attachments adhere to multipart/form-data specifications.',
    codeExample: `// Console logging best practices for structured debugging
const grievance = { id: 'CRP-101', title: 'Road hazard', ward: 14, priority: 'HIGH' };

// 1. Grouped logging
console.group('Grievance Submission Debug');
console.log('Payload:', grievance);
console.time('API Dispatch Time');
// fetch operation...
console.timeEnd('API Dispatch Time');
console.groupEnd();

// 2. Table logging for arrays of objects
console.table([
  { ward: 1, officer: 'A. Roy', activeTickets: 14 },
  { ward: 2, officer: 'K. Patel', activeTickets: 8 }
]);`,
    commonMistakes: [
      {
        mistake: 'Leaving console.log("here 1"), console.log("here 2") scattered in production code.',
        fix: 'Use browser breakpoints or conditional console logs that are removed or stripped during production Vite builds.'
      },
      {
        mistake: 'Assuming a network request succeeded because the fetch() Promise resolved.',
        fix: 'Remember that fetch() only rejects on network disconnection, NOT on HTTP 404 or 500! Always check if (!response.ok) throw new Error(response.statusText).'
      },
      {
        mistake: 'Clearing the console automatically on page reloads, losing the error message of a crashing form.',
        fix: 'In DevTools Console settings, check "Preserve log" to retain error logs across page navigations.'
      }
    ],
    exercise: {
      instruction: 'Write a helper function safeFetchJson(url) that wraps fetch, inspects response.ok, logs helpful diagnostic messages if status is not 2xx, and returns parsed JSON.',
      prompt: 'Write a helper function safeFetchJson(url) that wraps fetch, inspects response.ok, logs helpful diagnostic messages if status is not 2xx, and returns parsed JSON.',
      starterCode: `export async function safeFetchJson(url, options = {}) {
  // 1. Dispatch fetch
  // 2. Inspect res.ok
  // 3. If !res.ok, extract error text and throw Error with status code
  // 4. Return parsed JSON
}`,
      solution: `export async function safeFetchJson(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorBody = await response.text();
    console.error(\`[safeFetchJson] HTTP \${response.status} \${response.statusText} at \${url}:\`, errorBody);
    throw new Error(\`Request failed with status \${response.status}: \${errorBody || response.statusText}\`);
  }
  return response.json();
}`,
      solutionCode: `export async function safeFetchJson(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorBody = await response.text();
    console.error(\`[safeFetchJson] HTTP \${response.status} \${response.statusText} at \${url}:\`, errorBody);
    throw new Error(\`Request failed with status \${response.status}: \${errorBody || response.statusText}\`);
  }
  return response.json();
}`,
      hint: 'Remember that fetch() resolves even on HTTP 404 or 500; you must check response.ok manually.'
    },
    quiz: [
      {
        question: 'What does "Preserve log" in the DevTools Console settings do?',
        options: [
          'Saves console logs to a text file on your desktop.',
          'Prevents the console from clearing its history when navigating between pages or reloading.',
          'Encrypts console output for security.',
          'Hides all warning messages from third-party libraries.'
        ],
        correctIndex: 1,
        answer: 1,
        explanation: 'Preserve log retains all network and console records across full page reloads, which is essential for debugging forms that trigger unexpected full page refreshes.'
      },
      {
        question: 'Why does z-index fail to bring an element above its sibling even when set to 9999?',
        options: [
          'Because z-index requires JavaScript to activate.',
          'Because z-index is only evaluated within its local stacking context, often established by a parent with transform, opacity, or position.',
          'Because the maximum allowable z-index in browsers is 100.',
          'Because z-index only works on <table> elements.'
        ],
        correctIndex: 1,
        answer: 1,
        explanation: 'An element cannot escape the stacking context of its parent; if the parent has a lower z-index in the root context, increasing the child z-index has no effect.'
      }
    ],
    takeaways: [
      'Debugging is a scientific discipline: observe symptoms, form hypotheses, inspect state, and test minimal fixes.',
      'Always read the full error stack trace to locate the exact filename, line, and column of runtime failures.',
      'Use the Elements and Computed panels to inspect true cascaded styles and diagnose layout box overflows.',
      'The Network tab reveals real status codes, request payloads, response bodies, and CORS headers.'
    ],
    keyTakeaways: [
      'Debugging is a scientific discipline: observe symptoms, form hypotheses, inspect state, and test minimal fixes.',
      'Always read the full error stack trace to locate the exact filename, line, and column of runtime failures.',
      'Use the Elements and Computed panels to inspect true cascaded styles and diagnose layout box overflows.',
      'The Network tab reveals real status codes, request payloads, response bodies, and CORS headers.'
    ]
  },

  'javascript-runtime-and-logic-debugging': {
    id: 'lesson-14-2',
    slug: 'javascript-runtime-and-logic-debugging',
    courseId: 'course-14',
    courseSlug: 'professional-debugging-and-troubleshooting',
    courseTitle: 'Course 14: Professional Debugging & Troubleshooting',
    title: 'JavaScript Runtime, Logic Errors & DevTools Breakpoints',
    category: 'Debugging',
    estimatedTime: '45 min read & practice',
    objectives: [
      'Differentiate Syntax Errors, Runtime Exceptions, and Silent Logic Flaws.',
      'Use DevTools Sources tab to pause execution, inspect variable scopes, and view call stacks.',
      'Master breakpoint types: Line-of-code, Conditional, DOM modification, and XHR/Fetch breakpoints.',
      'Step through code using Step Over (F10), Step Into (F11), and Step Out (Shift+F11).',
      'Debug tricky asynchronous race conditions and closure scope traps.',
      'Create Minimal Reproducible Examples (MRE) to isolate edge cases quickly.'
    ],
    sections: [
      {
        heading: 'The Three Categories of Software Bugs',
        content: `When code fails to behave as intended, it falls into one of three distinct categories:

\`\`\`
  1. SYNTAX ERRORS (Caught at Compile / Parse Time):
     - Unclosed brackets, missing commas, invalid keywords.
     - Caught immediately by ESLint, Vite, or the browser parser.
     - Easiest to fix: execution never even begins.

  2. RUNTIME EXCEPTIONS (Caught at Execution Time):
     - Attempting to access properties of null/undefined.
     - Calling a non-function as a function (x is not a function).
     - Network disconnections or JSON parsing malformed data.
     - Throws an Error object and halts the current execution thread.

  3. LOGIC ERRORS (The Most Dangerous: No Error Thrown!):
     - The program runs completely smoothly with zero console warnings.
     - But the output is wrong! (e.g. calculating tax as price * 0.18 + price when price is a string "100" -> "1000.18").
     - Can only be diagnosed by inspecting variable state during runtime.
\`\`\``
      },
      {
        heading: 'Mastering DevTools Breakpoints: Beyond console.log()',
        content: `While \`console.log()\` is common, pausing execution with **DevTools Breakpoints** gives you superpowers:

\`\`\`
   ┌─────────────────────────────────────────────────────────────┐
   │ Breakpoint Controls (Sources Panel):                        │
   │                                                             │
   │ [ >| ] Resume Execution (F8)                                │
   │        Continues running code until the next breakpoint.    │
   │                                                             │
   │ [ |> ] Step Over (F10)                                      │
   │        Executes the current line and pauses on the next line│
   │        without entering into internal function details.     │
   │                                                             │
   │ [ v  ] Step Into (F11)                                      │
   │        Enters inside the function called on the current line│
   │        so you can inspect its line-by-line execution.       │
   │                                                             │
   │ [ ^  ] Step Out (Shift+F11)                                 │
   │        Finishes executing the current function and pauses   │
   │        immediately back in the calling function.            │
   └─────────────────────────────────────────────────────────────┘
\`\`\`

### Specialized Breakpoint Types:
* **Conditional Breakpoints:** Only pause execution when a specific condition is met (e.g. \`grievance.id === 'CRP-999'\` or \`index > 50\`). Invaluable for debugging loops with thousands of iterations.
* **XHR / Fetch Breakpoints:** Pauses execution whenever an HTTP request URL contains a substring (e.g. \`/api/v1/auth\`). Allows you to see exactly which function initiated a network call.
* **DOM Modification Breakpoints:** Pauses execution when JavaScript appends, deletes, or modifies attributes on a specific DOM element.`
      },
      {
        heading: 'Debugging Asynchronous Race Conditions and Closures',
        content: `In modern React and JavaScript apps, bugs often occur because asynchronous operations resolve out of order (**Race Conditions**):

\`\`\`
  Scenario: Citizen searches ward directory:
  1. Citizen types "Central"      ---> Dispatches Fetch A (Takes 300ms)
  2. Citizen types "Central Park" ---> Dispatches Fetch B (Takes 100ms)
  3. Fetch B resolves FIRST       ---> UI displays "Central Park" (Correct)
  4. Fetch A resolves LATER       ---> UI OVERWRITES with "Central" (BUG!)
\`\`\`

### How to Fix with AbortController or Cleanup:
\`\`\`javascript
useEffect(() => {
  const controller = new AbortController();

  async function searchWard() {
    try {
      const res = await fetch(\`/api/v1/wards?q=\${encodeURIComponent(query)}\`, {
        signal: controller.signal
      });
      const data = await res.json();
      setResults(data);
    } catch (err) {
      if (err.name !== 'AbortError') console.error('Fetch error:', err);
    }
  }

  if (query.trim()) searchWard();

  // Cleanup aborts previous in-flight request when user types again!
  return () => controller.abort();
}, [query]);
\`\`\``
      }
    ],
    crpIndiaConnection: 'In CRP India, conditional breakpoints are used when debugging civic ticket batch imports to pause only when a ticket payload lacks mandatory ward identifiers or contains invalid GPS coordinates.',
    codeExample: `// Using the debugger statement directly in source code:
function processGrievanceBatch(tickets) {
  return tickets.map((ticket, index) => {
    // If ticket is missing a category, trigger native browser debugger!
    if (!ticket.category) {
      debugger; // Browser DevTools will automatically pause right here!
    }
    return { ...ticket, processedAt: Date.now() };
  });
}`,
    commonMistakes: [
      {
        mistake: 'Leaving a "debugger;" statement inside production source code.',
        fix: 'Configure build tooling (esbuild or Terser in Vite) with drop_debugger: true to automatically strip all debugger statements during production builds.'
      },
      {
        mistake: 'Confusing string concatenation with numerical addition ("10" + 5 = "105").',
        fix: 'Always explicitly parse inputs from form fields using Number(input) or parseInt(input, 10).'
      },
      {
        mistake: 'Trying to debug complex issues in an 8,000-line codebase without isolating the issue.',
        fix: 'Create a Minimal Reproducible Example (MRE) in a 20-line test file or CodeSandbox to isolate the exact failing mechanism.'
      }
    ],
    exercise: {
      instruction: 'Identify and fix the closure bug in this loop where all setTimeout callbacks print the final index rather than their own index.',
      prompt: 'Identify and fix the closure bug in this loop where all setTimeout callbacks print the final index rather than their own index.',
      starterCode: `// Broken code:
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log('Index:', i);
  }, 100);
}
// Outputs: Index: 3, Index: 3, Index: 3`,
      solution: `// Fixed code using block-scoped let:
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log('Index:', i);
  }, 100);
}
// Outputs: Index: 0, Index: 1, Index: 2`,
      solutionCode: `// Fixed code using block-scoped let:
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log('Index:', i);
  }, 100);
}
// Outputs: Index: 0, Index: 1, Index: 2`,
      hint: 'var is function-scoped, meaning all callbacks share the same variable reference after the loop finishes. Use let, which creates a new binding for each loop iteration.'
    },
    quiz: [
      {
        question: 'When should you use a Conditional Breakpoint instead of a regular breakpoint?',
        options: [
          'When you only want to pause execution on Internet Explorer.',
          'When you are inspecting code inside a high-iteration loop and only care about specific problematic values.',
          'When debugging CSS transitions.',
          'When you want to stop code execution permanently.'
        ],
        correctIndex: 1,
        answer: 1,
        explanation: 'Conditional breakpoints evaluate an expression (e.g. index === 450 or user.role === "admin") and only pause when that condition evaluates to true.'
      },
      {
        question: 'What is the purpose of Step Over (F10) in the debugger?',
        options: [
          'It deletes the current line of code.',
          'It executes the current line and pauses on the next line without diving into the details of any function called on that line.',
          'It resumes normal execution and closes DevTools.',
          'It steps backward in time.'
        ],
        correctIndex: 1,
        answer: 1,
        explanation: 'Step Over runs the current line and pauses immediately at the next sequential line in the current function scope.'
      }
    ],
    takeaways: [
      'Understand the difference between compile-time syntax errors, execution-time runtime errors, and silent logic flaws.',
      'DevTools Sources breakpoints let you inspect live variable scopes, call stacks, and closures.',
      'Use Step Over (F10) for linear inspection and Step Into (F11) to inspect internal function logic.',
      'Prevent asynchronous race conditions in React using AbortController cleanup in useEffect hooks.'
    ],
    keyTakeaways: [
      'Understand the difference between compile-time syntax errors, execution-time runtime errors, and silent logic flaws.',
      'DevTools Sources breakpoints let you inspect live variable scopes, call stacks, and closures.',
      'Use Step Over (F10) for linear inspection and Step Into (F11) to inspect internal function logic.',
      'Prevent asynchronous race conditions in React using AbortController cleanup in useEffect hooks.'
    ]
  },

  'backend-and-database-debugging': {
    id: 'lesson-14-3',
    slug: 'backend-and-database-debugging',
    courseId: 'course-14',
    courseSlug: 'professional-debugging-and-troubleshooting',
    courseTitle: 'Course 14: Professional Debugging & Troubleshooting',
    title: 'Backend Diagnostics: Server Logs, Express Routes & Database Errors',
    category: 'Debugging',
    estimatedTime: '45 min read & practice',
    objectives: [
      'Read and interpret structured server logs (Morgan, Winston, Pino) and Node.js process error streams.',
      'Diagnose common Express middleware pitfalls: hanging requests (missing next()), double responses, and unhandled promise rejections.',
      'Troubleshoot database connectivity: MongoDB ECONNREFUSED, authentication failures, and connection pool timeouts.',
      'Debug Mongoose schema validation failures, CastErrors (malformed ObjectIDs), and duplicate key index violations (E11000).',
      'Audit HTTP status code accuracy: returning appropriate 4xx client errors versus 5xx server errors.',
      'Isolate environment configuration bugs: missing .env keys, string vs boolean parsing, and port conflicts.'
    ],
    sections: [
      {
        heading: 'Server Logs: The Black Box Flight Recorder',
        content: `Unlike client-side code where you have interactive DevTools, backend servers run headless on cloud servers. Your only window into what happened during an outage is your **Server Logs**:

\`\`\`
  [Citizen POST /api/v1/grievances]
                 │
                 ▼
  [Structured Log Stream (stdout)]
  {"level":"info","time":"2026-10-28T03:00:12Z","reqId":"a1b2c3","method":"POST","url":"/api/v1/grievances","ip":"203.0.113.19"}
  {"level":"error","time":"2026-10-28T03:00:13Z","reqId":"a1b2c3","err":"MongoServerError: E11000 duplicate key error collection: crp.citizens index: email_1"}
\`\`\`

### Key Logging Rules:
1. **Never Log Sensitive Credentials:** Never log plain passwords, credit card numbers, JWT tokens, or encryption secrets in log files.
2. **Include Request IDs (Correlation IDs):** Attach a unique UUID to every incoming request and forward it into all database and service logs so you can trace a single citizen action across thousands of concurrent operations.
3. **Log at Appropriate Levels:** \`error\` (system failure requiring developer action), \`warn\` (degraded state or invalid input), \`info\` (business events), \`debug\` (fine-grained technical detail).`
      },
      {
        heading: 'Top Express Runtime Bugs & How to Fix Them',
        content: `### 1. The Hanging Request (Missing \`next()\` or \`res.send()\`)
If a client initiates a request and the browser spinner spins forever until a 60-second gateway timeout, a middleware forgot to call \`next()\` or send a response:
\`\`\`javascript
// BROKEN:
app.use((req, res, next) => {
  if (req.headers['x-api-key']) {
    // Forgot to call next() or res.status().json()!
    // The request hangs in limbo forever!
  }
});

// FIXED:
app.use((req, res, next) => {
  if (req.headers['x-api-key']) {
    return next(); // Pass control to next handler
  }
  res.status(401).json({ error: 'Missing API key' });
});
\`\`\`

### 2. Error: Cannot set headers after they are sent to the client
This occurs when your route handler attempts to send two HTTP responses for a single incoming request:
\`\`\`javascript
// BROKEN:
app.post('/api/grievances', (req, res) => {
  if (!req.body.title) {
    res.status(400).json({ error: 'Title required' }); // Sent response
  }
  // Missing return! Execution CONTINUES down here:
  res.status(201).json({ success: true }); // CRASH: Cannot set headers after sent!
});

// FIXED:
app.post('/api/grievances', (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ error: 'Title required' }); // Immediate return!
  }
  return res.status(201).json({ success: true });
});
\`\`\``
      },
      {
        heading: 'Diagnosing MongoDB and Mongoose Failures',
        content: `### Common Mongoose Errors:
1. **\`MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017\`:**
   * **Cause:** The MongoDB service is stopped, the connection string host is wrong, or the cloud firewall (MongoDB Atlas IP Access List) has not whitelisted your IP address.
2. **\`CastError: Cast to ObjectId failed for value "123" at path "_id"\`:**
   * **Cause:** A route like \`/api/grievances/:id\` received a malformed ID string instead of a valid 24-character hexadecimal MongoDB ObjectId.
   * **Fix:** Validate with \`mongoose.Types.ObjectId.isValid(id)\` before querying!
3. **\`MongoServerError: E11000 duplicate key error index: email_1\`:**
   * **Cause:** Attempted to insert a document with an email that already exists in a collection with a unique index. Return \`409 Conflict\`.`
      }
    ],
    crpIndiaConnection: 'In CRP India, global error middleware catches MongoDB CastErrors and duplicate phone registration conflicts, formatting them into human-readable JSON responses with clear remediation advice for citizens.',
    codeExample: `// Centralized Express Global Error Handler
export function errorHandler(err, req, res, next) {
  console.error('[Unhandled Error]', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    url: req.originalUrl,
    method: req.method
  });

  // Handle Mongoose CastError (Invalid ID)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: \`Invalid resource identifier: \${err.value}\`
    });
  }

  // Handle Mongoose Duplicate Key (E11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      success: false,
      error: \`A record with that \${field} already exists.\`
    });
  }

  // Fallback 500 Internal Server Error
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error occurred.'
  });
}`,
    commonMistakes: [
      {
        mistake: 'Returning HTTP 200 OK with a body containing { error: "Database down" }.',
        fix: 'Always use proper HTTP status codes (400 for client validation, 401 for unauthenticated, 403 for unauthorized, 404 for missing resources, 500 for server exceptions).'
      },
      {
        mistake: 'Committing real database credentials in database connection strings (e.g. mongodb+srv://admin:pass123@cluster...).',
        fix: 'Always read database connection strings from process.env.MONGO_URI and add .env to your .gitignore file.'
      },
      {
        mistake: 'Not handling unhandled promise rejections in async route handlers.',
        fix: 'Use express-async-errors or wrap async controller functions with a try/catch block passing errors to next(err).'
      }
    ],
    exercise: {
      instruction: 'Write an Express middleware validateObjectId(paramName) that checks if req.params[paramName] is a valid MongoDB ObjectId. If valid, call next(); if invalid, return 400 Bad Request with an error JSON.',
      prompt: 'Write an Express middleware validateObjectId(paramName) that checks if req.params[paramName] is a valid MongoDB ObjectId. If valid, call next(); if invalid, return 400 Bad Request with an error JSON.',
      starterCode: `import mongoose from 'mongoose';

export function validateObjectId(paramName) {
  return (req, res, next) => {
    // Check if req.params[paramName] is valid ObjectId
    // Call next() or return 400
  };
}`,
      solution: `import mongoose from 'mongoose';

export function validateObjectId(paramName) {
  return (req, res, next) => {
    const id = req.params[paramName];
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: \`Invalid \${paramName} format. Must be a 24-character hexadecimal ObjectId.\`
      });
    }
    next();
  };
}`,
      solutionCode: `import mongoose from 'mongoose';

export function validateObjectId(paramName) {
  return (req, res, next) => {
    const id = req.params[paramName];
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: \`Invalid \${paramName} format. Must be a 24-character hexadecimal ObjectId.\`
      });
    }
    next();
  };
}`,
      hint: 'Use mongoose.Types.ObjectId.isValid(id) to verify format before passing to next().'
    },
    quiz: [
      {
        question: 'What causes the Node.js error "Cannot set headers after they are sent to the client"?',
        options: [
          'The client closed the browser tab before the server started.',
          'Your route handler attempted to send multiple HTTP responses (e.g. calling res.json() twice) for a single request.',
          'The server ran out of memory.',
          'The database rejected a query.'
        ],
        correctIndex: 1,
        answer: 1,
        explanation: 'HTTP is a single request-response protocol; once headers and body are dispatched, attempting to write headers again triggers this runtime exception.'
      },
      {
        question: 'What does a MongoDB E11000 error represent?',
        options: [
          'A database connection timeout.',
          'A duplicate key violation on a collection with a unique index (e.g. duplicate email).',
          'A corrupted database table.',
          'An invalid password hash.'
        ],
        correctIndex: 1,
        answer: 1,
        explanation: 'E11000 indicates an attempt to insert or update a document with a field value that already exists in a unique index.'
      }
    ],
    takeaways: [
      'Structured server logs with correlation IDs are essential for diagnosing production issues.',
      'Always use "return res.status().json()" to prevent executing code after a response is sent.',
      'Validate MongoDB ObjectIDs before querying to prevent CastErrors.',
      'Use centralized error-handling middleware to map database exceptions to clean HTTP 4xx/5xx responses.'
    ],
    keyTakeaways: [
      'Structured server logs with correlation IDs are essential for diagnosing production issues.',
      'Always use "return res.status().json()" to prevent executing code after a response is sent.',
      'Validate MongoDB ObjectIDs before querying to prevent CastErrors.',
      'Use centralized error-handling middleware to map database exceptions to clean HTTP 4xx/5xx responses.'
    ]
  },

  'fullstack-distributed-tracing': {
    id: 'lesson-14-4',
    slug: 'fullstack-distributed-tracing',
    courseId: 'course-14',
    courseSlug: 'professional-debugging-and-troubleshooting',
    courseTitle: 'Course 14: Professional Debugging & Troubleshooting',
    title: 'Full-Stack Distributed Tracing: Browser to Database',
    category: 'Debugging',
    estimatedTime: '45 min read & practice',
    objectives: [
      'Trace failures across the entire full-stack lifecycle: UI -> State -> Network -> Route -> Middleware -> Database -> Response -> Re-render.',
      'Investigate realistic full-stack incident scenarios with root cause analysis (RCA).',
      'Diagnose CORS issues: preflight OPTIONS requests, allowed headers, and origin verification.',
      'Troubleshoot authentication token expiration cascades and refresh token workflows.',
      'Debug data serialization discrepancies between MongoDB models and React components.',
      'Establish incident post-mortems and preventative regression tests.'
    ],
    sections: [
      {
        heading: 'The Full-Stack Request-to-Render Lifecycle',
        content: `When a citizen clicks "Submit Grievance" on CRP India, the action travels across seven distinct architecture boundaries:

\`\`\`
  1. BROWSER UI: Citizen clicks Submit. Event listener fires.
         │
         ▼
  2. REACT STATE: Form values collected, client-side validation executes.
         │
         ▼
  3. NETWORK: fetch() constructs HTTP POST, injects JWT, sends over TCP/TLS.
         │
         ▼
  4. EXPRESS PIPELINE: CORS check -> JSON body parser -> Auth middleware -> Route controller.
         │
         ▼
  5. DATABASE: Mongoose schema validation -> MongoDB query engine executes write.
         │
         ▼
  6. HTTP RESPONSE: JSON payload with 201 status code serialized and transmitted back.
         │
         ▼
  7. CLIENT RE-RENDER: React state updates, loading spinner hides, success toast appears.
\`\`\`

A breakdown at **any single link** in this chain causes the entire feature to fail. Full-stack engineering requires knowing how to trace the transaction through each boundary step-by-step.`
      },
      {
        heading: 'Realistic Scenario 1: The Invisible CORS Failure',
        content: `### Symptom:
A developer starts the React app on \`http://localhost:5173\` and the Express API on \`http://localhost:5000\`. Clicking "Load Grievances" does nothing. The browser console shows:
\`Access to fetch at 'http://localhost:5000/api/v1/grievances' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.\`

### Investigation:
1. Is the backend server running? Yes, Postman requests to \`http://localhost:5000\` return 200 OK.
2. Why did Postman work but the browser fail?
   * Postman is a developer tool, not a browser. It does not enforce browser security sandboxing.
   * The browser enforces the **Same-Origin Policy**: origins with different ports (5173 vs 5000) cannot read response data unless the server explicitly permits it.
3. Check preflight: For requests with custom headers like \`Authorization: Bearer <token>\`, the browser dispatches an automatic \`OPTIONS\` preflight request before the \`GET\` request.

### The Fix:
\`\`\`javascript
// In Express server (server.js):
import cors from 'cors';

const allowedOrigins = [
  'http://localhost:5173',
  'https://crpindia.gov.in'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl) or in whitelist
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
\`\`\``
      },
      {
        heading: 'Realistic Scenario 2: The Expired JWT Token Cascade',
        content: `### Symptom:
A citizen logged into the portal yesterday. Today, they fill out a 15-field detailed grievance report, attach photos, and click submit. The form resets, but no ticket is created. The citizen is angry because their typed report was lost.

### Investigation:
1. Check Network Tab: \`POST /api/v1/grievances\` returned \`401 Unauthorized\`.
2. Inspect Response Body: \`{ error: "jwt expired", expiredAt: "2026-10-27T18:00:00Z" }\`.
3. Client Code Inspection: The frontend saw the 401 error, wiped localStorage, and forced a window redirect to \`/login\` without preserving the draft form state!

### The Multi-Layer Professional Fix:
1. **Frontend Draft Preservation:** Save form state to \`sessionStorage\` so if authentication expires, the citizen's typed inputs are not erased.
2. **Automated Refresh Token Interceptor:** Intercept 401 responses using Axios or a fetch wrapper, dispatch a silent refresh request to \`/api/v1/auth/refresh\`, obtain a fresh access token, and automatically replay the original grievance submission seamlessly without user disruption.`
      }
    ],
    crpIndiaConnection: 'In CRP India, distributed tracing with unique X-Request-ID headers allows civil engineers and administrators to track a citizen grievance submission from the mobile app interface through municipal microservices down to database storage.',
    codeExample: `// Full-Stack Fetch Wrapper with Automatic Correlation ID & Error Tracing
export async function tracedFetch(endpoint, options = {}) {
  const correlationId = 'req-' + Math.random().toString(36).substring(2, 9);
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    'X-Correlation-ID': correlationId,
    ...(token ? { 'Authorization': \`Bearer \${token}\` } : {}),
    ...options.headers
  };

  console.log(\`[\${correlationId}] Dispatching \${options.method || 'GET'} to \${endpoint}\`);

  try {
    const response = await fetch(endpoint, { ...options, headers });
    if (!response.ok) {
      const errText = await response.text();
      console.error(\`[\${correlationId}] Server returned HTTP \${response.status}:\`, errText);
      throw new Error(\`Request failed (\${response.status}): \${errText}\`);
    }
    const data = await response.json();
    console.log(\`[\${correlationId}] Request succeeded:\`, data);
    return data;
  } catch (error) {
    console.error(\`[\${correlationId}] Network or processing exception:\`, error);
    throw error;
  }
}`,
    commonMistakes: [
      {
        mistake: 'Testing backend APIs only in Postman and assuming CORS is working.',
        fix: 'Always test API calls from the actual browser frontend; Postman ignores CORS policies completely.'
      },
      {
        mistake: 'Silently discarding citizen form input when a network error occurs.',
        fix: 'Never clear form state on error; display a persistent error banner and allow the user to retry.'
      },
      {
        mistake: 'Failing to log correlation IDs across microservices or frontend-backend boundaries.',
        fix: 'Generate a request ID at the frontend or API gateway and forward it in headers across all downstream logs.'
      }
    ],
    exercise: {
      instruction: 'Write an incident Root Cause Analysis (RCA) summary for an issue where citizen grievance photos failed to display in production because the backend saved local file paths ("C:\\uploads\\img.jpg") instead of public web URLs ("/uploads/img.jpg").',
      prompt: 'Write an incident Root Cause Analysis (RCA) summary for an issue where citizen grievance photos failed to display in production because the backend saved local file paths ("C:\\uploads\\img.jpg") instead of public web URLs ("/uploads/img.jpg").',
      starterCode: `// Write an RCA object with:
// 1. observedProblem
// 2. rootCause
// 3. immediateFix
// 4. preventionStrategy`,
      solution: `export const photoDisplayRca = {
  observedProblem: 'Grievance photos displayed as broken image icons on production portal.',
  rootCause: 'The photo upload controller saved absolute local filesystem paths (C:\\\\uploads\\\\img.png) into MongoDB rather than relative public web URIs (/uploads/img.png).',
  immediateFix: 'Updated database records with a migration script converting absolute paths to web URLs, and configured Express express.static() middleware.',
  preventionStrategy: 'Added unit tests verifying that upload controller outputs web-accessible URLs and added an E2E test verifying image tag src attributes in the browser.'
};`,
      solutionCode: `export const photoDisplayRca = {
  observedProblem: 'Grievance photos displayed as broken image icons on production portal.',
  rootCause: 'The photo upload controller saved absolute local filesystem paths (C:\\\\uploads\\\\img.png) into MongoDB rather than relative public web URIs (/uploads/img.png).',
  immediateFix: 'Updated database records with a migration script converting absolute paths to web URLs, and configured Express express.static() middleware.',
  preventionStrategy: 'Added unit tests verifying that upload controller outputs web-accessible URLs and added an E2E test verifying image tag src attributes in the browser.'
};`,
      hint: 'Include observed problem, root cause, immediate fix, and prevention strategy.'
    },
    quiz: [
      {
        question: 'Why does an API call succeed in Postman or cURL but fail with a CORS error in the browser?',
        options: [
          'Because Postman runs on Linux and browsers run on Windows.',
          'Because CORS is a security mechanism enforced strictly by web browsers, not by standalone HTTP clients like Postman or cURL.',
          'Because Postman automatically adds database credentials.',
          'Because browsers do not support JSON.'
        ],
        correctIndex: 1,
        answer: 1,
        explanation: 'The Same-Origin Policy and CORS restrictions are browser-enforced security boundaries designed to protect users from malicious scripts on third-party websites.'
      },
      {
        question: 'What is a Correlation ID (Request ID) used for in full-stack debugging?',
        options: [
          'To encrypt user passwords.',
          'To trace a single user operation across frontend, API gateway, backend services, and database logs.',
          'To speed up CSS animations.',
          'To compress image files.'
        ],
        correctIndex: 1,
        answer: 1,
        explanation: 'A Correlation ID links all log lines generated by a single user request across multiple distributed servers and services.'
      }
    ],
    takeaways: [
      'Full-stack debugging requires tracing an action across UI, state, network, routing, database, and response.',
      'CORS is enforced exclusively by browsers; always configure Access-Control-Allow-Origin on backend servers.',
      'Preserve user form drafts during token expiration to prevent data loss.',
      'Always document incidents with Root Cause Analyses (RCA) and add automated regression tests.'
    ],
    keyTakeaways: [
      'Full-stack debugging requires tracing an action across UI, state, network, routing, database, and response.',
      'CORS is enforced exclusively by browsers; always configure Access-Control-Allow-Origin on backend servers.',
      'Preserve user form drafts during token expiration to prevent data loss.',
      'Always document incidents with Root Cause Analyses (RCA) and add automated regression tests.'
    ]
  }
};
