# Phase 6: Project-Based Learning & Workspace System

## 1. Executive Summary

Phase 6 elevates Dev-root from a lesson-focused platform to a complete, full-stack academy by providing a structured project-based learning pathway. Learners synthesize conceptual knowledge into production-ready software by building 10 progressive, milestone-driven applications ranging from semantic personal sites to end-to-end full-stack municipal management portals.

The Project Workspace (`src/pages/ProjectDetail.jsx`) has been overhauled into an active development workbench featuring persistent notes, interactive acceptance testing checklists, milestone status management, and direct integration with relevant lessons and coding challenges.

---

## 2. Curriculum Progression & Prerequisite Structure

Projects strictly respect prerequisite boundaries. Learners are never asked to manipulate React state before mastering JavaScript events and objects, nor are they asked to build Node.js microservices before understanding asynchronous JavaScript and the HTTP protocol.

| Project ID | Title | Difficulty | Core Topics & Competencies | Prerequisite Concepts |
| :--- | :--- | :--- | :--- | :--- |
| `proj-01-profile-page` | **Personal Developer Portfolio** | Beginner | Semantic HTML5, CSS Flexbox/Grid, Responsive Typography, WCAG 2.1 AA Contrast, GitHub Pages Deployment | Course 01 (Web Fundamentals), Course 02 (HTML5), Course 03 (CSS3) |
| `proj-02-interactive-quiz` | **Interactive JavaScript Application** | Beginner | DOM Manipulation, Event Listeners, State Mutation, LocalStorage Persistence, Form Validation | Course 04 (Modern JavaScript), Course 05 (DOM & Browser APIs) |
| `proj-03-api-dashboard` | **Live API Data Dashboard** | Intermediate | Fetch API, Async/Await, Promise Chaining, Skeleton Loaders, Error State Boundaries, Rate Limiting Handling | Course 04, Course 05, Course 09 (APIs & HTTP) |
| `proj-04-kanban-board` | **React State & Component Board** | Intermediate | Component Architecture, Props & State, Custom Hooks, Immutability, Drag & Drop Logic, Accessible Modals | Course 06 (React Fundamentals), Course 07 (Advanced React) |
| `proj-05-rest-api` | **Backend Express REST Service** | Intermediate | Node.js Runtime, Express Routing, RESTful Verbs, Middleware Pipelines, Joi/Zod Validation, Winston Logging | Course 08 (Node.js & Express), Course 09 (APIs & HTTP) |
| `proj-06-db-crud` | **Database-Connected Application** | Intermediate | MongoDB / PostgreSQL, Mongoose Schema Modeling, CRUD Operations, Indexing, Data Normalization, Soft Deletion | Course 08, Course 10 (Databases & SQL/NoSQL) |
| `proj-07-auth-workflow` | **Secure Authentication System** | Advanced | JWT Tokens, HttpOnly Secure Cookies, bcrypt Password Hashing, RBAC (Role-Based Access Control), Refresh Rotation | Course 08, Course 10, Course 11 (Auth & Security) |
| `proj-08-fullstack-app` | **End-to-End Full-Stack Platform** | Advanced | React SPA + Express API + Database + Authentication + Docker + Deployment Pipelines | Courses 01–11, Course 12 (Git & CI/CD) |
| `proj-09-capstone-prep` | **Full-Stack Application Architecture** | Advanced | Distributed Tracing, Component Testing with RTL, Supertest Integration, Cloud Config & HTTPS | Course 13 (Testing), Course 14 (Debugging), Course 15 (Deployment) |
| `proj-10-capstone` | **Production Citizen Grievance Portal** | Advanced Capstone | Complete Municipal Operations System, Multi-Role Dashboards, Analytics, Health Monitoring, Production Hardening | Full Dev-root Academy Curriculum (Courses 01–17) |

---

## 3. Project Workspace Architecture (`ProjectDetail.jsx`)

The Project Workspace serves as the learner's interactive software specification and development console:

### 3.1 Status & Lifecycle Management
Learners can explicitly manage their project status with persistent tracking:
- `not_started`: Project not yet initiated.
- `in_progress`: Active development underway.
- `completed`: All acceptance criteria and milestones verified.
- `needs_revision`: Code review or test failure requires refactoring.

Status changes are persisted immediately to `localStorage` under `devroot_progress_v1.projectStatusOverride`.

### 3.2 Workspace Navigation Tabs
1. **Milestones & Architecture:** Breaks the application down into 4–5 sequential development milestones with functional requirements, architecture diagrams, and milestone completion toggles.
2. **Helpful Lessons & Practice:** Direct, one-click links to the exact prerequisite lessons and interactive coding challenges needed to complete the current milestone.
3. **Interactive Testing Checklist:** A dedicated Quality Assurance checklist mirroring real software acceptance criteria. Checking items persists state under `projectTestingChecklist` in `localStorage`.
4. **Project Notes & Engineering Journal:** A full markdown-compatible text editor where learners record architecture decisions, schema designs, bug logs, and API endpoint contracts. Saves automatically to `projectNotes`.

---

## 4. State Persistence & Migration Integrity

Project learning progress is stored non-destructively in `localStorage` alongside existing course records:

```json
{
  "projectMilestones": {
    "proj-01-profile-page": [0, 1, 2]
  },
  "projectStatusOverride": {
    "proj-01-profile-page": "in_progress"
  },
  "projectTestingChecklist": {
    "proj-01-profile-page-0": true,
    "proj-01-profile-page-1": true
  },
  "projectNotes": {
    "proj-01-profile-page": "Implemented responsive CSS Grid for project cards. Verified mobile viewport at 375px."
  }
}
```

The system ensures that visiting a project page never artificially marks milestones or tasks as complete. Every milestone, checklist item, and status transition requires intentional learner action.
