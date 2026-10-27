# DEV-ROOT — Phase 5: 10-Tier Project-Based Learning Path

## 1. Overview
Part 8 of Phase 5 mandates a structured, 10-tier project curriculum that transitions learners from basic layout construction to full-stack software engineering. Each project corresponds directly to skills taught in preceding curriculum modules.

---

## 2. The 10 Project Tiers

### Tier 1: Personal Profile & Portfolio Page
- **Slug:** `personal-profile-page`
- **Skills:** Semantic HTML5, CSS Box Model, Web Typography, Media Elements.
- **Milestones:** HTML Document Skeleton → Design System & Tokens → Skills Badges & Accessible Navigation.

### Tier 2: Responsive Product Landing Page
- **Slug:** `responsive-website`
- **Skills:** CSS Flexbox, CSS Grid, Mobile-First Media Queries, Responsive Navigation.
- **Milestones:** Mobile-First Sticky Header → Dynamic CSS Grid Layout → 3-Tier Responsive Pricing Table.

### Tier 3: Interactive Web Calculator
- **Slug:** `interactive-calculator`
- **Skills:** DOM Manipulation, State Machine, Event Delegation, Decimal Floating Point Precision, Keyboard Events.
- **Milestones:** State Engine Architecture → Keypad Delegation → Keyboard Bindings & Error Boundaries.

### Tier 4: Task Manager with Local Storage
- **Slug:** `todo-application`
- **Skills:** Array Transforms (`map`, `filter`), JSON Serialization, LocalStorage Persistence, XSS Defense.
- **Milestones:** State Modeling & Storage Engine → Task CRUD & XSS Sanitization → Status Filter Tabs & Counts.

### Tier 5: API-Based Weather & Civic Data Dashboard
- **Slug:** `api-based-application`
- **Skills:** Asynchronous JavaScript, Fetch API, async/await, Loading Skeletons, Error Interception, Debouncing.
- **Milestones:** Asynchronous Fetch Client → State Views (Loading/Error/Data) → Input Debouncing Utility.

### Tier 6: React Interactive Redressal Portal
- **Slug:** `react-application`
- **Skills:** Vite + React, Component Composition, Hooks (`useState`, `useEffect`, `useMemo`), Controlled Forms.
- **Milestones:** Component Hierarchy & Props Contract → Controlled Modal & Validation → Derived Metrics & Filter State.

### Tier 7: Node.js & Express RESTful API
- **Slug:** `backend-rest-api`
- **Skills:** Node.js Runtime, Express Routing, REST Architecture, Middleware Design, HTTP Status Codes.
- **Milestones:** Express Router Setup → Payload Validation Middleware → Centralized 4-Argument Error Handler.

### Tier 8: Database-Connected Grievance Service
- **Slug:** `database-connected-application`
- **Skills:** Relational Database Design, Schema Migrations, SQL/Prisma ORM, Indexing, ACID Transactions.
- **Milestones:** Relational Models & Migrations → CRUD Repository Layer → Aggregations & Transactions.

### Tier 9: Production Authentication & Authorization
- **Slug:** `authentication-based-application`
- **Skills:** Cryptographic Salted Hashing (`bcrypt`), JWT Tokens, HttpOnly Cookies, RBAC Middleware.
- **Milestones:** Salted Hashing & Registration → Login & JWT HttpOnly Cookie Issuance → RBAC Authorization Middleware.

### Tier 10: CRP India Full-Stack Municipal Redressal Capstone
- **Slug:** `full-stack-application`
- **Skills:** Full-Stack Monorepo Architecture, Automated SLA Escalation Cron Jobs, Supertest Integration Tests, Docker Orchestration.
- **Milestones:** Full-Stack Monorepo Setup → Automated SLA Escalation Cron Worker → E2E Testing & Security Hardening.

---

## 3. Pedagogical Architecture of Project Detail Pages
Every project page (`ProjectDetail.jsx`) includes:
1. **Interactive Milestone Checklist:** Persistent checkboxes synced to localStorage.
2. **Progressive Hints:** Hidden by default; learners click to reveal actionable advice without spoiling the full solution.
3. **Reference Solution Walkthroughs:** Full copyable code checkpoints with explanations.
4. **Starter Files:** Pre-configured starter templates ready to copy into local IDEs.
5. **Acceptance Testing Criteria:** Concrete manual and automated verification instructions.
6. **Common Mistakes & Pitfalls:** Highlights frequent rookie traps.
7. **Extension Challenges:** Optional advanced features for ambitious learners.
