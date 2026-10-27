# Phase 6: Comprehensive Testing Curriculum

## 1. Overview & Pedagogical Approach

Testing is not treated as a trivial configuration tutorial or an afterthought; it is taught as an essential architectural foundation that guarantees software correctness, prevents regressions, and enables fearless refactoring. Course 13 (**Testing & Quality Assurance**) introduces learners to the complete testing pyramid through four hands-on, production-grade lessons.

Learners learn how to choose the right level of testing for each software layer, avoiding the anti-pattern of 100% coverage dogmatism while ensuring all critical user journeys and business logic are covered by resilient automated checks.

---

## 2. Course Structure & Lesson Breakdown

### Lesson 1: Testing Fundamentals & Unit Testing with Vitest (`testing-fundamentals-and-vitest`)
- **Core Topics:**
  - The Software Testing Pyramid: Unit Tests (base, fast, isolated), Integration/Component Tests (middle, boundary verification), and End-to-End Tests (top, complete user journeys).
  - Understanding test assertions: `toBe()`, `toEqual()`, `toBeTruthy()`, `toThrow()`, and `toContain()`.
  - The AAA Pattern: Arrange (setup prerequisites), Act (invoke unit under test), Assert (verify actual output matches expected contract).
  - Isolating boundary conditions and edge cases: Null, undefined, empty strings, boundary integers, and malicious inputs.
  - Test suites and test organization: `describe()`, `it()` / `test()`, `beforeEach()`, `afterEach()`.
  - Mocking fundamentals: Spy functions (`vi.fn()`), module mocking (`vi.mock()`), and time-travel mocking (`vi.useFakeTimers()`).
- **Interactive Exercise:** Authoring a comprehensive unit test suite with Vitest for a municipal utility function `sanitizeWardName()` handling whitespace, capitalization, and injection characters.

### Lesson 2: Component Testing with React Testing Library (`component-and-rtl-testing`)
- **Core Topics:**
  - Guiding Philosophy of React Testing Library: *"The more your tests resemble the way your software is used, the more confidence they can give you."*
  - Avoiding implementation detail tests: Testing user-visible behavior rather than internal component state or private methods.
  - Accessible Query Priority:
    1. Queries accessible to everyone: `getByRole` (buttons, headings, inputs), `getByLabelText` (form controls), `getByPlaceholderText`, `getByText`.
    2. Semantic queries: `getByAltText`, `getByTitle`.
    3. Escape-hatch test IDs: `getByTestId` (used only when no accessible selector exists).
  - Simulating user events: Modern `userEvent.setup()` vs legacy `fireEvent`.
  - Testing asynchronous component states: Spinners, loading skeletons, error banners (`waitFor()`, `findByRole`).
  - Accessibility testing: Verifying ARIA states (`aria-expanded`, `aria-busy`, `role="alert"`).
- **Practical Exercise:** Testing an interactive counter and form submission flow with user click events, state assertion, and asynchronous error boundaries.

### Lesson 3: Backend API & Database Integration Testing (`api-and-integration-testing`)
- **Core Topics:**
  - HTTP Service Integration Testing with Supertest: Dispatching virtual HTTP requests (`GET`, `POST`, `PUT`, `DELETE`) directly into the Express application instance without binding to physical network ports.
  - Verifying HTTP contracts: Status codes (`200 OK`, `201 Created`, `400 Bad Request`, `401 Unauthorized`, `404 Not Found`, `500 Internal Error`), `Content-Type` headers, and JSON response bodies.
  - Testing validation middleware: Sending invalid payloads and asserting structured 400 validation error responses.
  - Database integration patterns: Testing against in-memory MongoDB databases (`mongodb-memory-server`) or test database schemas; ensuring test isolation by clearing collections in `beforeEach()` or `afterEach()`.
  - Testing authentication & authorization: Simulating JWT authorization headers (`Authorization: Bearer <token>`) and verifying protected routes reject unauthorized or role-forbidden requests (`403 Forbidden`).
- **Practical Exercise:** Authoring an integration test for `GET /api/v1/health` and `POST /api/v1/grievances` validating database connectivity and payload validation.

### Lesson 4: End-to-End (E2E) Testing & Test Strategy (`e2e-testing-and-test-strategy`)
- **Core Topics:**
  - End-to-End testing with Playwright: Cross-browser testing (Chromium, Firefox, WebKit), headless execution, and real browser automation.
  - Modeling Complete User Journeys:
    1. User navigates to registration page.
    2. User enters valid citizen credentials.
    3. User submits grievance with photo attachment.
    4. Grievance appears in municipal supervisor queue.
    5. Supervisor updates status to "In Progress".
    6. Citizen verifies status change on live dashboard.
  - Resilient test locators: `page.getByRole()`, `page.getByLabel()`, auto-waiting mechanics, and avoiding brittle CSS selectors.
  - Flakiness prevention: Eliminating arbitrary `sleep()` delays in favor of condition-based waiting (`waitForURL()`, `toBeVisible()`).
  - Formulating a Sustainable Testing Strategy: Cost-benefit analysis of tests; selecting appropriate test ratios; configuring CI/CD test execution pipelines.
- **Capstone Exercise:** Writing a complete Playwright test suite validating homepage navigation, user login, and URL redirection.

---

## 3. Tooling Matrix & Industry Justification

| Layer | Tool Selected | Rationale & Trade-offs |
| :--- | :--- | :--- |
| **Unit Testing** | Vitest | Instant execution via Vite ES modules, native TypeScript support, Jest-compatible API. |
| **Component Testing** | React Testing Library + user-event | Industry-standard user-centric testing; enforces WCAG accessibility best practices. |
| **API Integration** | Supertest | Fast, in-process HTTP execution without network socket overhead; full assertion integration. |
| **E2E Testing** | Playwright | Modern browser engine automation, auto-waiting, parallel test execution, multi-browser support. |
