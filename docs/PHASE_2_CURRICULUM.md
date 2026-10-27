# Dev-root — Phase 2 Curriculum Architecture

## Complete Curriculum Structure (Courses 1 through 17 + Case Studies)

The Dev-root curriculum is organized into a progressive sequence starting from absolute zero (no programming or web knowledge assumed) and advancing to production full-stack engineering.

---

### Course Progression Overview

```
Course 1: Understanding the Web
      ↓
Course 2: Developer Setup & Essential Tools
      ↓
Course 3: HTML from Zero
      ↓
Course 4: CSS from Zero
      ↓
Course 5: JavaScript Fundamentals
      ↓
Course 6: The Browser and the DOM
      ↓
Course 7: Modern JavaScript  [Roadmap]
      ↓
Course 8: Git, GitHub, and Collaboration
      ↓
Course 9: React from Zero  [Roadmap]
      ↓
Course 10: Backend Development with Node.js  [Roadmap]
      ↓
Course 11: Databases and MongoDB  [Roadmap]
      ↓
Course 12: Authentication and Authorization  [Roadmap]
      ↓
Course 13: Full-Stack Integration  [Roadmap]
      ↓
Course 14: File Uploads, External APIs & Advanced Features  [Roadmap]
      ↓
Course 15: Testing, Security & Code Quality  [Roadmap]
      ↓
Course 16: Deployment and Production  [Roadmap]
      ↓
Course 17: Full-Stack Projects & Professional Practice  [Roadmap]
      ↓
Course 18: CRP India Real-World Case Studies [Available Reference]
```

---

## Detailed Course Syllabus & Phase Status

### Course 1: Understanding the Web (Available)
*Prerequisite: None (Absolute Zero)*
- **Lesson 1.1**: *How Websites Work: Clients, Servers & The Web* (`how-websites-work`) — **Available**
  - Dialogue between client (browser) and server (cloud host).
  - The 3 pillars: HTML structure, CSS presentation, JavaScript interactivity.
  - Static files vs dynamic Single Page Applications (SPAs).
  - Real-world case study: client-server directory decoupling in CRP India.
- **Lesson 1.2**: *Frontend vs. Backend: Runtimes & Trust Boundaries* (`frontend-vs-backend`) — **Available**
  - Runtime environments: browser sandbox vs server Node.js.
  - Security principle: never trust the client.
  - API communication bridge and standardized JSON envelopes.
- **Lesson 1.3**: *What Happens When You Open a Website?* (`what-happens-when-you-open-a-website`) — **Available**
  - URL parsing (protocol, domain, port).
  - DNS resolution hierarchy (browser, OS, resolver).
  - TCP 3-way handshake and TLS cryptographic negotiation.
  - Critical Rendering Path: DOM + CSSOM → Render Tree → Layout → Paint → Composite.
- **Lesson 1.4**: *HTTP Methods, Status Codes & JSON Payloads* (`http-requests-and-responses`) — **Available**
  - HTTP verbs: GET, POST, PUT, PATCH, DELETE.
  - Status code families: 2xx (Success), 3xx (Redirect), 4xx (Client Error), 5xx (Server Error).
  - JSON formatting rules and serialization with `JSON.stringify` / `JSON.parse`.

### Course 2: Developer Setup & Essential Tools (Available)
*Prerequisite: Course 1*
- **Lesson 2.1**: *Files, Folders & The Developer Terminal* (`terminal-and-file-fundamentals`) — **Available**
  - Hierarchical directories, absolute vs relative paths (`./`, `../`).
  - Essential terminal commands: `pwd`, `ls` / `dir`, `cd`, `mkdir`.
  - File extension conventions.
- **Lesson 2.2**: *Code Editors & Browser Developer Tools* (`code-editors-and-devtools`) — **Available**
  - Plain text code editors (VS Code) vs word processors.
  - Chrome/Firefox DevTools: Elements panel, Console panel, Network panel.
  - Reading stack traces, syntax errors, and debugging systematically.

### Course 3: HTML from Zero (Available)
*Prerequisite: Course 2*
- **Lesson 3.1**: *Semantic HTML & Document Hierarchy* (`html-document-structure-and-semantics`) — **Available**
  - Tags, elements, attributes, and void/self-closing elements.
  - The HTML5 boilerplate (`<!DOCTYPE html>`, `<head>`, `<body>`).
  - Semantic landmark elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`).
- **Lesson 3.2**: *Accessible Forms, Inputs & Data Entry* (`html-forms-and-accessible-inputs`) — **Available**
  - Creating forms with `<form>`, `<input>`, `<select>`, `<textarea>`, `<button>`.
  - Associating inputs with `<label for="">` for accessibility and touch ergonomics.
  - Input types (`email`, `number`, `password`) and native HTML5 validation attributes (`required`, `minlength`).

### Course 4: CSS from Zero (Available)
*Prerequisite: Course 3*
- **Lesson 4.1**: *The CSS Box Model, Selectors & Cascade* (`css-box-model-and-selectors`) — **Available**
  - The 4 concentric box layers: content, padding, border, margin.
  - The global reset: `box-sizing: border-box`.
  - Selectors (element, class, ID) and specificity rules.
  - CSS custom properties (`--variables`) on `:root` for dark and light theming.
- **Lesson 4.2**: *Responsive Layouts with Flexbox & CSS Grid* (`css-flexbox-and-grid`) — **Available**
  - 1D layout engine (Flexbox): `display: flex`, `justify-content`, `align-items`, `gap`.
  - 2D layout powerhouse (CSS Grid): `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`.
  - Mobile-first responsive design using `min-width` media queries.

### Course 5: JavaScript Fundamentals (Available)
*Prerequisite: Course 4*
- **Lesson 5.1**: *Variables, Data Types & Control Flow* (`javascript-variables-types-and-logic`) — **Available**
  - What programming is: deterministic instruction execution.
  - Variable declaration: `const` by default, `let` for mutation, never `var`.
  - Primitive data types: string, number, boolean, null, undefined.
  - Strict equality (`===`) vs loose equality (`==`), conditional branching (`if`/`else`).
- **Lesson 5.2**: *Functions, Parameters, Return Values & Scope* (`javascript-functions-and-scope`) — **Available**
  - Function declaration, invocation, parameters vs arguments.
  - Returning values to callers vs `console.log`.
  - Arrow function syntax.
  - Block scope vs function scope vs global scope.

### Course 6: The Browser and the DOM (Available)
*Prerequisite: Course 5*
- **Lesson 6.1**: *Selecting Elements, Modifying Content & Events* (`dom-manipulation-and-events`) — **Available**
  - The Document Object Model (DOM) as an in-memory object tree.
  - Element selection: `document.querySelector` and `querySelectorAll`.
  - Updating content safely with `textContent` (avoiding XSS).
  - Toggling classes with `classList.toggle` and handling user events via `addEventListener`.

### Course 8: Git, GitHub, and Collaboration (Available)
*Prerequisite: Course 2*
- **Lesson 8.1**: *Git Mental Model, Repositories & Commits* (`git-fundamentals-and-commits`) — **Available**
  - Why version control matters: time travel, branches, collaboration.
  - The three trees of Git: Working Directory, Staging Area (index), Repository.
  - The core cycle: `git status`, `git add`, `git commit -m`, `git push`.
  - Ignoring artifacts with `.gitignore`.

### Course 18: CRP India Real-World Case Studies (Available Reference)
*Prerequisite: Course 1*
- **Case Study Overview**: *CRP India Architecture Deep Dive* (`crp-india-architecture-deep-dive`) — **Available**
  - Decoupled client-server architecture: React 19 + Vite frontend and Node.js + Express backend.
  - Dual-portal authentication and Role-Based Access Control (RBAC).
  - Mongoose document schemas, status timelines, and sequence generators.
  - Multer file upload pipelines with Cloudinary streaming and local disk fallbacks.

---

## Roadmap Courses for Subsequent Releases
The following courses are defined with clear prerequisites and learning objectives in `src/data/courses.js`, scheduled for deep authored lessons in Phase 3+:
- **Course 7**: Modern JavaScript (ES6+, Promises, Async/Await, Fetch API)
- **Course 9**: React from Zero (Components, JSX, Props, State, Hooks, Context)
- **Course 10**: Backend Development with Node.js & Express
- **Course 11**: Databases and MongoDB (NoSQL Schemas, Mongoose, Queries)
- **Course 12**: Authentication and Web Security (JWT, bcrypt, RBAC)
- **Course 13**: Full-Stack Integration (React frontend + Express API)
- **Course 14**: File Uploads, External APIs & Advanced Features
- **Course 15**: Testing, Security & Code Quality (Vitest, Testing Library, XSS defense)
- **Course 16**: Deployment and Production (Vite builds, SPA rewrites, Cloud hosting)
- **Course 17**: Full-Stack Projects & Professional Practice (10 Capstone Projects)
