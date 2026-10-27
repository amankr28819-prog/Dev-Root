# DEV-ROOT — Phase 4 Curriculum Master Specification

**Specification Version:** 4.0.0  
**Effective Standard:** Permanent 4x Teaching Depth  
**Target Audience:** Absolute Beginner (Zero Knowledge) to Production Full-Stack Engineer

---

## 1. Curriculum Overview

Phase 4 establishes an expanded, modularized curriculum spanning **31 published, high-depth lessons** across **12 active core courses** and real-world case studies based on CRP India.

Every course is architected with strict prerequisite chains, first-principles explanations, interactive playgrounds, multi-tier progressive exercises, automated validation tests, and WCAG accessibility standards.

---

## 2. Active Course Catalog & Modular Progression

```
+-----------------------------------------------------------------------------------+
|                        DEV-ROOT FULL-STACK LEARNING PATHWAY                       |
+-----------------------------------------------------------------------------------+
|  Course 1: Understanding the Web       ---> Course 2: Developer Setup & Tools     |
|         |                                      |                                  |
|         v                                      v                                  |
|  Course 3: HTML from Zero              ---> Course 4: CSS from Zero               |
|         |                                      |                                  |
|         v                                      v                                  |
|  Course 5: JavaScript Fundamentals     ---> Course 6: Browser & The DOM           |
|         |                                      |                                  |
|         v                                      v                                  |
|  Course 7: Modern JavaScript (ES6+)    ---> Course 8: Git & GitHub Collaboration  |
|         |                                      |                                  |
|         v                                      v                                  |
|  Course 9: React from Zero             ---> Course 10: Backend with Node/Express  |
|         |                                      |                                  |
|         v                                      v                                  |
|  Course 11: Databases & MongoDB        ---> Course 12: Authentication & Security  |
|         |                                                                         |
|         v                                                                         |
|  Course 18: CRP India Municipal Redressal Case Study (End-to-End Deep Dive)       |
+-----------------------------------------------------------------------------------+
```

---

## 3. Course-by-Course Module Breakdown

### Course 1: Understanding the Web (`course-1`, 4 Lessons)
*Prerequisite: None (Zero Technical Knowledge)*
* `lesson-1-1`: **How Websites Work: Clients, Servers & The Web**
  * Concepts: Internet vs World Wide Web, client-server model, IP addresses, DNS lookups, TCP/IP packets.
* `lesson-1-2`: **Frontend vs. Backend: Runtimes & Trust Boundaries**
  * Concepts: Browser client environment, server execution runtimes, database persistence, security trust boundaries.
* `lesson-1-3`: **What Happens When You Open a Website?**
  * Concepts: Browser address bar URL resolution, DNS roundtrips, TLS handshake, critical rendering path (DOM -> CSSOM -> Layout -> Paint).
* `lesson-1-4`: **HTTP Methods, Status Codes & JSON Payloads**
  * Concepts: HTTP request/response anatomy, headers (Cache-Control, CORS), status codes (2xx, 3xx, 4xx, 5xx), RESTful JSON payloads.

---

### Course 2: Developer Setup & Essential Tools (`course-2`, 2 Lessons)
*Prerequisite: Course 1*
* `lesson-2-1`: **Files, Folders & The Developer Terminal**
  * Concepts: Absolute vs relative file paths, terminal navigation (`cd`, `ls`, `mkdir`, `rm`), standard file extensions, environment variables.
* `lesson-2-2`: **Code Editors & Browser Developer Tools**
  * Concepts: VS Code workspace setup, syntax highlighting, DevTools Elements DOM tree inspection, Console evaluation, Network tab waterfall analysis.

---

### Course 3: HTML from Zero (`course-3`, 5 Lessons)
*Prerequisite: Course 2*
* `lesson-3-1`: **HTML Syntax, Tags, Elements & Document Structure**
  * Concepts: Tags vs elements vs attributes, void elements, `<!DOCTYPE html>`, UTF-8 character encoding, viewport meta tag, DOM parsing pipeline.
* `lesson-3-2`: **Document Hierarchy & Modern Semantic Landmarks**
  * Concepts: Semantic elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`), heading hierarchy (`<h1>`-`<h6>`), `<strong>`/`<em>` vs visual styling.
* `lesson-3-3`: **Links, Responsive Media & Data Tables**
  * Concepts: Anchor tags (`<a>`), `rel="noopener noreferrer"`, `<img>` alt text & CLS prevention dimensions, `<figure>`/`<figcaption>`, accessible data tables (`<caption>`, `<thead>`, `scope`).
* `lesson-3-4`: **Accessible Web Forms, Inputs & Client Validation**
  * Concepts: `<form>` action & GET vs POST, mandatory `<label for="id">`, HTML5 input types (`email`, `tel`, `radio`), `<fieldset>`/`<legend>`, constraint validation.
* `lesson-3-5`: **Web Accessibility (a11y), Screen Readers & Capstone Project**
  * Concepts: WCAG 2.1 POUR principles, Accessibility Tree, skip-links, focus outlines, First Rule of ARIA, full accessible capstone layout.

---

### Course 4: CSS from Zero (`course-4`, 5 Lessons)
*Prerequisite: Course 3*
* `lesson-4-1`: **CSS Syntax, Selectors, Specificity & The Cascade**
  * Concepts: Declarations & blocks, selector spectrum (element, class, ID, attribute, pseudo), specificity calculation math `(A, B, C, D)`, Cascade algorithm, source order.
* `lesson-4-2`: **Colors, Modern Units, Web Typography & Visual Styling**
  * Concepts: HEX, RGB, HSL color models, absolute (`px`) vs relative units (`rem`, `em`, `%`, `vh`, `vw`, `dvh`), fluid typography with `clamp()`, WCAG AA contrast.
* `lesson-4-3`: **The CSS Box Model, Normal Flow & Positioning**
  * Concepts: Concentric layers (content, padding, border, margin), universal `box-sizing: border-box`, vertical margin collapsing, display types, positioning (`static`, `relative`, `absolute`, `fixed`, `sticky`), stacking contexts.
* `lesson-4-4`: **1D Layouts with Flexbox & 2D Layouts with CSS Grid**
  * Concepts: Flexbox main/cross axes, alignment (`justify-content`, `align-items`, `gap`), flex math (`grow`, `shrink`, `basis`), 2D CSS Grid `repeat(auto-fit, minmax(280px, 1fr))`.
* `lesson-4-5`: **Mobile-First Responsive Design, Transforms & Keyframe Animations**
  * Concepts: Mobile-first philosophy with `min-width` media queries, CSS variables (`:root`), GPU compositor transforms (`translate`, `scale`, `rotate`), `@keyframes`, `prefers-reduced-motion`.

---

### Course 5: JavaScript Fundamentals (`course-5`, 2 Lessons)
*Prerequisite: Course 4*
* `lesson-5-1`: **Variables, Data Types & Control Flow**
  * Concepts: `const` vs `let` vs `var`, Stack (primitives) vs Heap (reference objects), strict equality (`===`) vs loose coercion (`==`), truthy/falsy tables, conditionals, for/while loops.
* `lesson-5-2`: **Functions, Parameters, Return Values & Scope**
  * Concepts: Function declarations, expressions, arrow functions, parameter defaults, rest parameters (`...args`), Scope hierarchy (global, function, block), lexical closures and data encapsulation.

---

### Course 6: The Browser and the DOM (`course-6`, 1 Lesson)
*Prerequisite: Course 5*
* `lesson-6-1`: **Selecting Elements, Modifying Content & Events**
  * Concepts: DOM tree parsing, `querySelector`/`querySelectorAll`, safe `textContent` vs `innerHTML` (XSS prevention), `classList` API, `DocumentFragment` batching, event listeners, bubbling, event delegation.

---

### Course 7: Modern JavaScript (`course-7`, 2 Lessons)
*Prerequisite: Course 6*
* `lesson-7-1`: **ES6+ Syntax, Destructuring & Array Methods**
  * Concepts: Object & array destructuring with defaults, spread operator (`...`) for immutable updates, higher-order array methods (`.map`, `.filter`, `.reduce`), optional chaining (`?.`), nullish coalescing (`??`).
* `lesson-7-2`: **Promises, Async/Await & The Event Loop**
  * Concepts: JavaScript single-threaded concurrency, Call Stack, Web APIs, Microtask vs Macrotask queue, Event Loop mechanics, Promises, `async`/`await`, `try/catch/finally`, `Promise.all()` concurrency.

---

### Course 8: Git, GitHub, and Collaboration (`course-8`, 1 Lesson)
*Prerequisite: Course 2*
* `lesson-8-1`: **Git Mental Model, Repositories & Commits**
  * Concepts: Three Git trees (working directory, staging area, repository history), atomic commits, branch creation, GitHub remote synchronization, resolving merge conflicts.

---

### Course 9: React from Zero (`course-9`, 2 Lessons)
*Prerequisite: Course 7*
* `lesson-9-1`: **Components, JSX & Props Data Flow**
  * Concepts: Declarative UI paradigm, Virtual DOM diffing & reconciliation, JSX compilation rules, functional components, immutable read-only props, unidirectional data flow, `children` prop.
* `lesson-9-2`: **State Management with useState & Side Effects with useEffect**
  * Concepts: Component internal state, `useState`, functional updaters (`prev => prev + 1`), immutable array/object updates, `useEffect` side effects, dependency array rules, cleanup routines.

---

### Course 10: Backend Development with Node.js (`course-10`, 2 Lessons)
*Prerequisite: Course 7 & Course 1*
* `lesson-10-1`: **The Node.js Runtime & NPM Ecosystem**
  * Concepts: Chrome V8 Engine, libuv asynchronous I/O, server environment vs browser differences, `package.json` semver (`MAJOR.MINOR.PATCH`), CommonJS vs ES Modules, non-blocking `fs/promises`.
* `lesson-10-2`: **Express Routing & Middleware Architecture**
  * Concepts: Express application, RESTful routing (GET, POST, PUT, DELETE), extracting `req.params`, `req.query`, `req.body`, middleware pipeline & `next()`, centralized error handling `(err, req, res, next)`.

---

### Course 11: Databases and MongoDB (`course-11`, 2 Lessons)
*Prerequisite: Course 10*
* `lesson-11-1`: **Database Foundations & MongoDB Collections**
  * Concepts: Disk persistence vs RAM, Relational SQL vs Document NoSQL, MongoDB database/collection/document hierarchy, BSON ObjectIds, schema design: embedding vs referencing.
* `lesson-11-2`: **Mongoose Schemas, Validation & CRUD Queries**
  * Concepts: Mongoose ODM, strongly-typed schemas, enum validation, timestamps, CRUD query execution (`create`, `find`, `findByIdAndUpdate` with `new: true`, `delete`), pre-save hashing hooks.

---

### Course 12: Authentication and Authorization (`course-12`, 2 Lessons)
*Prerequisite: Course 10 & Course 11*
* `lesson-12-1`: **Authentication Foundations, Password Hashing & Stateless JWTs**
  * Concepts: AuthN vs AuthZ, password security risks, `bcrypt` salts and work factors, JSON Web Token anatomy (Header, Payload, Signature), stateless API verification, secure storage.
* `lesson-12-2`: **Role-Based Access Control, Protected Routes & Web Security**
  * Concepts: RBAC middleware, departmental access control, OWASP Top 10 (Injection, XSS, CSRF), HTTP security headers with Helmet, API rate limiting with express-rate-limit.

---

### Course 18: CRP India Municipal Case Study (`course-18`, 1 Lesson)
*Prerequisite: Courses 1 to 12*
* `case-study-overview`: **CRP India Full-Stack Architecture Deep Dive**
  * Concepts: End-to-end trace of a real civic grievance portal: React frontend components, Axios interceptors, Express route controllers, Mongoose schemas, JWT RBAC security, file attachments, and production deployment.

---

*Curriculum specification complete. All 31 lessons published, verified, and accessible.*
