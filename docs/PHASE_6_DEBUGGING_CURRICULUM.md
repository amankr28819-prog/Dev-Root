# Phase 6: Professional Debugging Curriculum

## 1. Overview & Philosophy

Debugging is not an auxiliary troubleshooting trick; it is a core discipline of professional software engineering. In Phase 6, Course 14 (**Professional Debugging & Troubleshooting**) introduces a structured curriculum teaching learners how to methodically diagnose, isolate, fix, and prevent bugs across the entire full-stack application lifecycle.

Learners transition away from blind `console.log` guessing toward disciplined investigative methodologies using Chrome DevTools, breakpoint execution stepping, call stack inspection, heap memory profiling, server-side log forensics, database query explain plans, and end-to-end distributed transaction tracing.

---

## 2. Course Structure & Lesson Breakdown

Course 14 is composed of four exhaustive lessons engineered under Dev-root's permanent 4x Content-Depth standard:

### Lesson 1: Modern Frontend & Chrome DevTools Debugging (`frontend-and-devtools-debugging`)
- **Core Topics:**
  - Navigating Chrome DevTools: Elements panel, computed styles, CSS layout debugging (Grid/Flex overlays).
  - DOM breakpoint triggers: Subtree modifications, attribute changes, node removal.
  - Console power tools: `console.table()`, `console.groupCollapsed()`, `console.time()`, and `console.trace()`.
  - Network panel forensics: Inspecting HTTP status codes, request headers, payload payloads, CORS preflight `OPTIONS` handshakes, and Waterfall timing breakdowns (DNS lookup, initial connection, TTFB, content download).
  - Application storage inspection: LocalStorage, SessionStorage, HttpOnly vs non-HttpOnly Cookies, Cache Storage, and IndexedDB.
- **Practical Walkthrough:** Step-by-step resolution of a broken responsive layout and an unhandled 404 API asset request.
- **Interactive Exercise:** Authoring a diagnostic wrapper `safeFetchJson(url, options)` that intercepts failed HTTP responses and surfaces structured diagnostic reports.

### Lesson 2: JavaScript Runtime, Scope & Async Logic Debugging (`javascript-runtime-and-logic-debugging`)
- **Core Topics:**
  - Parsing stack traces: Identifying error types (`TypeError`, `ReferenceError`, `RangeError`, `SyntaxError`), error origins, and call stack unwinding.
  - Browser Sources Panel: Setting line-of-code breakpoints, conditional breakpoints, and logpoints.
  - Execution stepping: Step Over (`F10`), Step Into (`F11`), Step Out (`Shift+F11`), and Resume (`F8`).
  - Scope variable inspection: Local scope, Closure scope, Module scope, and Global scope.
  - Event loop and asynchronous concurrency pitfalls: Unhandled promise rejections, race conditions in state updates, async loop execution orders (`forEach` vs `for...of`), and closure retention in timer callbacks.
- **Realistic Scenario:** Diagnosing why an event listener inside a `for` loop captured the wrong variable value due to `var` hoisting, and migrating it to lexical `let` scoping.

### Lesson 3: Backend Server Logs & Database Diagnostics (`backend-and-database-debugging`)
- **Core Topics:**
  - Node.js & Express server error logging: Standard out (`stdout`) vs Standard error (`stderr`), structured JSON logging with Winston and Morgan.
  - Diagnosing common Node.js runtime crashes: `EADDRINUSE` (port conflicts), `ECONNREFUSED` (downstream service offline), `ETIMEDOUT` (network partitions).
  - Uncaught exceptions and unhandled rejections: `process.on('uncaughtException')` and `process.on('unhandledRejection')` graceful process termination patterns.
  - Express error middleware: Designing 4-parameter error handlers `(err, req, res, next)` that sanitize error outputs for production while preserving stack traces in development.
  - Database diagnostics (MongoDB & PostgreSQL): Connection string validation, connection pool exhaustion, schema casting failures (`CastError: Cast to ObjectId failed`), and missing unique index collisions (`E11000 duplicate key`).
- **Practical Exercise:** Writing an Express parameter validation middleware `validateObjectId(paramName)` to stop malformed hexadecimal IDs before hitting database queries.

### Lesson 4: Full-Stack Distributed Tracing & RCA (`fullstack-distributed-tracing`)
- **Core Topics:**
  - The Full-Stack Request Journey:
    1. Browser user interaction and client state update.
    2. Network request dispatch and serialization.
    3. Reverse proxy / CORS preflight verification.
    4. Backend route handler and authentication middleware.
    5. Database query execution and index lookup.
    6. Response serialization and HTTP status assignment.
    7. Client deserialization, state dispatch, and DOM rendering.
  - Correlating distributed requests: Generating and propagating Correlation IDs (`X-Correlation-ID` / `X-Request-ID`) across frontend fetch calls and backend Winston loggers.
  - Root Cause Analysis (RCA) methodology: The "Five Whys" technique, distinguishing symptoms from causal mechanisms.
  - Professional Incident Post-Mortems: Writing structured post-mortems with Incident Overview, Timeline, Root Cause, Immediate Mitigation, and Preventative Engineering Actions.
- **Capstone Exercise:** Formulating a complete post-mortem for a production outage where grievance photos displayed broken icons due to absolute filesystem paths stored in MongoDB.

---

## 3. Pedagogical Principles Applied

1. **Reproducibility First:** Every debugging lesson emphasizes building a Minimal Reproducible Example (MRE) before writing fixes.
2. **Systematic Elimination:** Teaching learners to form testable hypotheses rather than applying random code edits.
3. **Prevention over Cure:** Every debugging scenario concludes with automated regression tests and defensive programming patterns that prevent bug recurrence.
