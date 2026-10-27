# Dev-root — Strategic Product Roadmap

> **Platform Positioning**: Start at the roots. Build to the full stack.  
> **Evolutionary Strategy**: Incremental, test-driven phases advancing from fundamental mental models to complete full-stack mastery.

---

## Phase Overview

```
[ Phase 1: Foundation & Architecture ] ===> COMPLETED
  - Standalone React 19 + Vite app
  - Core design system & light/dark theme
  - Local persistent progress tracking
  - Architectural foundation and routing
                |
                v
[ Phase 2: Beginner Curriculum & Content Quality Overhaul ] ===> COMPLETED
  - Complete elimination of raw markdown artifacts
  - MarkdownRenderer with responsive tables and callouts
  - 17-Course complete beginner-to-full-stack curriculum structure
  - 14 verified lessons authored starting from absolute zero
  - Interactive Knowledge Check Quizzes with explanations & retry
  - Hands-on Guided Practice Exercises with hints and solutions
  - Table of Contents navigation for lessons
  - 18 passing tests with 100% success rate
                |
                v
[ Phase 3: Advanced Frontend & Full-Stack Deepening ] ===> NEXT
  - Deep lessons for Course 7 (Modern JS, Promises, Fetch)
  - Deep lessons for Course 9 (React Components, State, Hooks)
  - Deep lessons for Course 10 (Node.js & Express APIs)
  - Deep lessons for Course 11 (MongoDB & Mongoose Modeling)
  - Deep lessons for Course 12 (Authentication & Security)
                |
                v
[ Phase 4: Full-Stack Integration & Capstones ]
  - Complete authoring for Courses 13 to 17
  - 10 graduated Capstone Projects
  - Interactive CRP India source explorer
  - Offline export and progress certificate generation
```

---

## Detailed Phase Breakdown

### Phase 1: Application Foundation & Core UI *(Completed)*
- [x] Repository audit and clean separation from reference project
- [x] React 19 + Vite + React Router DOM v7 application scaffolding
- [x] Custom CSS design system with light/dark theme tokens
- [x] Local learning progress persistence via `localStorage`
- [x] Dedicated CRP India architectural case study page
- [x] Automated unit and integration test suite
- [x] Clean production build and live development server (`http://localhost:5173`)

### Phase 2: Beginner Curriculum & Content Quality Overhaul *(Completed)*
- [x] Complete text audit: eliminated raw markdown artifacts (`**bold**`, unparsed tables, raw pipes)
- [x] `MarkdownRenderer` component with responsive `.table-container` wrappers
- [x] Interactive `Quiz.jsx` component with instant feedback, explanations, and retry
- [x] Interactive `Exercise.jsx` component with tasks, collapsible hints, and solutions
- [x] Enhanced `ProgressContext` tracking `completedLessons`, `quizScores`, and `completedExercises`
- [x] 17-Course progressive curriculum architecture defined in `src/data/courses.js`
- [x] Authored deep beginner lessons starting from absolute zero across foundational courses
- [x] Lesson Table of Contents navigation and Common Mistakes troubleshooting sections
- [x] Expanded test suite: 18 passing tests in Vitest

### Phase 3: Advanced Frontend & Backend Modules *(Next Up)*
- [ ] Deep lessons for Modern JavaScript (ES6+, Promises, Async/Await, Event Loop)
- [ ] Deep lessons for React from Zero (JSX, State, Effects, Context, Custom Hooks)
- [ ] Deep lessons for Node.js & Express (Servers, Routing, Middleware chains)
- [ ] Deep lessons for Databases & MongoDB (Collections, Mongoose Schemas, CRUD)
- [ ] Deep lessons for Authentication & Security (JWT, bcrypt, RBAC, input sanitization)

### Phase 4: Full-Stack Integration & Capstones
- [ ] Full-Stack Integration lessons (Connecting React UI to Express REST API)
- [ ] Multipart file uploads, Cloudinary streaming, and pagination
- [ ] 10 graduated Capstone Projects from HTML/CSS to deployed full-stack apps
- [ ] In-browser isolated coding sandbox for live HTML/CSS/JS preview
- [ ] Offline export and progress certificate generation
