/**
 * Dev-root Course 13: Full-Stack Testing & Quality Assurance
 * Deep Learning Curriculum (Phase 6 4x Content-Depth Standard)
 * Unit Testing with Vitest, React Component Testing with React Testing Library,
 * Backend API Testing with Supertest, and End-to-End User Journey Verification with Playwright.
 */

export const TESTING_LESSONS = {
  'testing-fundamentals-and-vitest': {
    id: 'lesson-13-1',
    slug: 'testing-fundamentals-and-vitest',
    courseId: 'course-13',
    courseSlug: 'full-stack-testing-and-qa',
    courseTitle: 'Course 13: Full-Stack Testing & Quality Assurance',
    title: 'Testing Foundations, Assertions & Unit Testing with Vitest',
    category: 'Testing',
    estimatedTime: '45 min read & practice',
    objectives: [
      'Understand the cost of software defects and why automated regression testing is an engineering requirement.',
      'Deconstruct the Testing Pyramid: Unit, Integration, and End-to-End (E2E) testing layers.',
      'Master the AAA (Arrange-Act-Assert) pattern for clean, reproducible unit tests.',
      'Write robust Vitest unit tests using describe, it/test, expect, and modern matchers.',
      'Identify boundary conditions, null/undefined edge cases, and state isolation pitfalls.',
      'Use test doubles: mocks, stubs, and spies (vi.fn, vi.spyOn) to isolate business logic.'
    ],
    sections: [
      {
        heading: 'Why Automated Testing Matters: Expected vs. Actual Behavior',
        content: `In early software development, testing often consists of manually refreshing a browser window, typing sample inputs into a form, clicking a submit button, and inspecting the network tab. While manual verification is natural during initial prototyping, it suffers from fatal flaws as applications scale:

\`\`\`
  Manual Verification Flaws:
  1. High Human Cost     --> Retesting 50 user flows manually takes hours before every deployment.
  2. Inconsistent Paths  --> Testers forget rare edge cases (e.g. empty strings, leap years, unicode names).
  3. Regression Blindness --> Fixing a bug in Module A silently breaks Module C without notification.
  4. Deployment Fear     --> Teams delay releases because nobody is confident the app works end-to-end.
\`\`\`

**Automated Testing** replaces guesswork with automated code execution:
A test runner executes your production functions with deterministic inputs, compares the **actual return value** against the **expected output**, and halts the continuous integration (CI) pipeline if an assertion fails.

\`\`\`
   [Test Input] ────────> [Function Under Test] ────────> [Actual Output]
                                                                  │
                                                                  ▼
   [Expected Output] ──────────────────────────────────> [Assertion: expect(actual).toBe(expected)]
                                                                  │
                                                        ┌─────────┴─────────┐
                                                        ▼                   ▼
                                                  ✓ PASS              ✗ FAIL (Halts CI)
\`\`\``
      },
      {
        heading: 'The Testing Pyramid: Balancing Speed, Cost, and Confidence',
        content: `A balanced automated testing strategy follows the **Testing Pyramid**:

\`\`\`
                   /\\
                  /  \\         End-to-End (E2E) Tests
                 /    \\        - Real browser (Playwright)
                / E2E  \\       - High confidence, slow execution (~seconds/minutes)
               /────────\\
              /          \\     Integration Tests
             /Integration \\    - Multi-component / API + DB (Supertest, RTL)
            /──────────────\\   - Moderate speed, medium cost
           /                \\
          /   Unit Tests     \\ Unit Tests
         /                    \\- Pure functions & isolated methods (Vitest)
        /──────────────────────\\- Sub-millisecond execution, lowest cost
\`\`\`

1. **Unit Tests (Base):** Test individual pure functions, data formatters, calculation engines, and validation helpers in isolation. Fast, reliable, and cheap to run thousands of times per commit.
2. **Integration Tests (Middle):** Verify that multiple units work harmoniously together (e.g. a React component rendering with user events, or an Express route controller communicating with a database model).
3. **End-to-End Tests (Apex):** Launch real headless browser instances to simulate human journeys (e.g. registration -> login -> filing a grievance -> viewing confirmation). Highest fidelity, but slowest and most susceptible to network flakiness.`
      },
      {
        heading: 'The Anatomy of a Vitest Test: The AAA (Arrange-Act-Assert) Pattern',
        content: `**Vitest** is a next-generation test runner native to Vite. It shares Vite's configuration, transforms TypeScript and JSX instantaneously, provides out-of-the-box ESM support, and features a Jest-compatible API.

Every high-quality unit test adheres to the **AAA Pattern**:
* **Arrange:** Set up all test fixtures, input parameters, and mocked dependencies.
* **Act:** Execute the specific function or method under test.
* **Assert:** Verify that the output, return value, or side effect matches the expected condition.

\`\`\`javascript
import { describe, it, expect } from 'vitest';

// Function under test: Calculates SLA priority for civic redressal
export function calculateSlaHours(category, isEmergency = false) {
  if (!category || typeof category !== 'string') {
    throw new TypeError('Valid grievance category is required');
  }
  if (isEmergency) return 12; // Emergency SLA: 12 hours
  switch (category.toLowerCase()) {
    case 'sanitation': return 48;
    case 'roads': return 72;
    case 'electricity': return 24;
    default: return 96;
  }
}

describe('calculateSlaHours()', () => {
  it('returns standard 48 hours for sanitation complaints', () => {
    // 1. Arrange
    const category = 'sanitation';
    const emergency = false;

    // 2. Act
    const result = calculateSlaHours(category, emergency);

    // 3. Assert
    expect(result).toBe(48);
  });

  it('overrides category duration with 12 hours when marked as emergency', () => {
    const result = calculateSlaHours('roads', true);
    expect(result).toBe(12);
  });

  it('throws a TypeError when category is missing or empty', () => {
    expect(() => calculateSlaHours('')).toThrow(TypeError);
    expect(() => calculateSlaHours(null)).toThrow('Valid grievance category is required');
  });
});
\`\`\``
      },
      {
        heading: 'Test Doubles: Mocks, Spies, and Stubs with vi.fn()',
        content: `When unit testing business logic, your functions often rely on external dependencies—such as sending SMS notifications, logging to external cloud providers, or querying remote payment gateways. If your unit tests make real network requests:
1. Tests fail when the network is offline.
2. External rate limits get consumed.
3. Tests slow down dramatically.

**Test Doubles** allow you to simulate external dependencies:
* **\`vi.fn()\`:** Creates a mock function that tracks when it was called, with what arguments, and what it returned.
* **\`vi.spyOn(object, 'method')\`:** Observes an existing object's method while optionally mocking its implementation.

\`\`\`javascript
import { describe, it, expect, vi } from 'vitest';

// Function that dispatches citizen notifications
export async function notifyCitizenGrievanceAssigned(grievance, notificationService) {
  const message = \`Complaint #\${grievance.id} has been assigned to nodal officer \${grievance.nodalOfficer}.\`;
  const success = await notificationService.sendSms(grievance.citizenPhone, message);
  return { delivered: success, timestamp: Date.now() };
}

describe('notifyCitizenGrievanceAssigned', () => {
  it('invokes sendSms with formatted message and phone number', async () => {
    // 1. Arrange: Create a mock notification service
    const mockSendSms = vi.fn().mockResolvedValue(true);
    const mockService = { sendSms: mockSendSms };

    const sampleGrievance = {
      id: 'CRP-1082',
      citizenPhone: '+919876543210',
      nodalOfficer: 'Ramesh Sharma'
    };

    // 2. Act
    const result = await notifyCitizenGrievanceAssigned(sampleGrievance, mockService);

    // 3. Assert
    expect(mockSendSms).toHaveBeenCalledTimes(1);
    expect(mockSendSms).toHaveBeenCalledWith(
      '+919876543210',
      'Complaint #CRP-1082 has been assigned to nodal officer Ramesh Sharma.'
    );
    expect(result.delivered).toBe(true);
  });
});
\`\`\``
      }
    ],
    crpIndiaConnection: 'In CRP India, unit tests in Vitest verify civic priority calculations, ward code formatting, phone number regex validation, and status transition state machines before any code enters the production Git branch.',
    codeExample: `// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80
      }
    }
  }
});`,
    commonMistakes: [
      {
        mistake: 'Writing assertions that test implementation details instead of public behavior (e.g. testing internal variable names).',
        fix: 'Test inputs and observable outputs/side-effects. When refactoring internal code, tests should continue passing as long as behavior is unchanged.'
      },
      {
        mistake: 'Leaving shared state between tests, causing test order dependence.',
        fix: 'Always use beforeEach() or reset state before each test so tests can run in any random order or in parallel.'
      },
      {
        mistake: 'Testing only the happy path and ignoring boundary values (empty arrays, zero, negative numbers, null values).',
        fix: 'Design tests around boundary conditions: min allowed, max allowed, off-by-one, null, and unexpected type inputs.'
      }
    ],
    exercise: {
      instruction: 'Write a unit test function for a sanitizeWardName(name) function that trims whitespace, converts to title case, and throws an error if the name contains special characters.',
      prompt: 'Write a unit test function for a sanitizeWardName(name) function that trims whitespace, converts to title case, and throws an error if the name contains special characters.',
      starterCode: `import { describe, it, expect } from 'vitest';

export function sanitizeWardName(name) {
  if (!name || typeof name !== 'string') throw new Error('Ward name required');
  const trimmed = name.trim();
  if (/[^a-zA-Z0-9\\s]/.test(trimmed)) throw new Error('Invalid characters');
  return trimmed.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

describe('sanitizeWardName', () => {
  // Write tests for:
  // 1. Trimming and title casing valid input
  // 2. Rejecting special characters
  // 3. Rejecting null/empty string
});`,
      solution: `import { describe, it, expect } from 'vitest';

describe('sanitizeWardName', () => {
  it('correctly trims and converts ward names to title case', () => {
    expect(sanitizeWardName('  north sector  ')).toBe('North Sector');
    expect(sanitizeWardName('CENTRAL WARD')).toBe('Central Ward');
  });

  it('throws an error when special characters are detected', () => {
    expect(() => sanitizeWardName('Ward #42')).toThrow('Invalid characters');
    expect(() => sanitizeWardName('Sector<script>')).toThrow('Invalid characters');
  });

  it('throws an error for null, undefined, or empty strings', () => {
    expect(() => sanitizeWardName('')).toThrow('Ward name required');
    expect(() => sanitizeWardName(null)).toThrow('Ward name required');
  });
});`,
      solutionCode: `import { describe, it, expect } from 'vitest';

describe('sanitizeWardName', () => {
  it('correctly trims and converts ward names to title case', () => {
    expect(sanitizeWardName('  north sector  ')).toBe('North Sector');
    expect(sanitizeWardName('CENTRAL WARD')).toBe('Central Ward');
  });

  it('throws an error when special characters are detected', () => {
    expect(() => sanitizeWardName('Ward #42')).toThrow('Invalid characters');
    expect(() => sanitizeWardName('Sector<script>')).toThrow('Invalid characters');
  });

  it('throws an error for null, undefined, or empty strings', () => {
    expect(() => sanitizeWardName('')).toThrow('Ward name required');
    expect(() => sanitizeWardName(null)).toThrow('Ward name required');
  });
});`,
      hint: 'Use expect(() => sanitizeWardName(invalidInput)).toThrow() to assert that exceptions are raised correctly.'
    },
    quiz: [
      {
        question: 'What does the Arrange step in the AAA pattern involve?',
        options: [
          'Executing the function under test and capturing its return value.',
          'Setting up all test parameters, input fixtures, and mocked dependencies.',
          'Asserting that the result matches the expected value.',
          'Cleaning up database connections after all tests finish.'
        ],
        correctIndex: 1,
        answer: 1,
        explanation: 'Arrange sets up all prerequisites, test inputs, and mocked dependencies before the function under test is invoked in the Act step.'
      },
      {
        question: 'Why are unit tests located at the base of the testing pyramid?',
        options: [
          'Because they are the hardest to write and require the most tools.',
          'Because they execute in a real browser with real databases.',
          'Because they are fast, isolated, low cost, and provide instantaneous feedback during coding.',
          'Because they only test visual CSS styling.'
        ],
        correctIndex: 2,
        answer: 2,
        explanation: 'Unit tests run in sub-milliseconds without network or database dependencies, allowing thousands of tests to run locally on every file save.'
      }
    ],
    takeaways: [
      'Automated testing guarantees that existing functionality continues to work as new features are added.',
      'The AAA (Arrange-Act-Assert) pattern structures tests for readability, maintainability, and clean isolation.',
      'Vitest provides native Vite integration, blazingly fast execution, and a standard Jest-compatible assertion API.',
      'Always test boundary conditions, empty values, and failure paths, not just the happy path.'
    ],
    keyTakeaways: [
      'Automated testing guarantees that existing functionality continues to work as new features are added.',
      'The AAA (Arrange-Act-Assert) pattern structures tests for readability, maintainability, and clean isolation.',
      'Vitest provides native Vite integration, blazingly fast execution, and a standard Jest-compatible assertion API.',
      'Always test boundary conditions, empty values, and failure paths, not just the happy path.'
    ]
  },

  'component-and-rtl-testing': {
    id: 'lesson-13-2',
    slug: 'component-and-rtl-testing',
    courseId: 'course-13',
    courseSlug: 'full-stack-testing-and-qa',
    courseTitle: 'Course 13: Full-Stack Testing & Quality Assurance',
    title: 'React Component Testing with React Testing Library',
    category: 'Testing',
    estimatedTime: '45 min read & practice',
    objectives: [
      'Understand the guiding philosophy of React Testing Library: "The more your tests resemble the way your software is used, the more confidence they can give you."',
      'Query the DOM using accessible roles (getByRole, findByRole) rather than brittle CSS selectors.',
      'Simulate authentic human user interactions with @testing-library/user-event.',
      'Test asynchronous UI states: loading skeletons, success confirmations, and error banners.',
      'Test controlled form inputs, validation triggers, and submission events.',
      'Verify accessible attributes: ARIA labels, focus states, and screen reader announcements.'
    ],
    sections: [
      {
        heading: 'The Philosophy of React Testing Library (RTL)',
        content: `In the early days of React testing, libraries like Enzyme encouraged developers to test **internal component mechanics**:
* Inspecting \`component.state('count')\`
* Checking \`component.props().onSubmit\`
* Simulating shallow rendering without child elements

This created **brittle tests**: when a developer refactored a component from class state to \`useState\` or lifted state into a custom hook, all tests broke even though the user interface looked and behaved identically to end users!

**React Testing Library (RTL)** enforces a user-centric testing philosophy:
* RTL renders components into a virtual DOM (JSDOM).
* Tests interact with the rendered HTML output exactly as a human or screen reader would: finding buttons by their text label, typing into inputs with accessible names, and waiting for text to appear on the screen.
* Refactoring internal implementation details will **never** break an RTL test as long as the user experience remains identical.`
      },
      {
        heading: 'Priority Order for DOM Queries: Accessible Roles First',
        content: `RTL provides multiple query methods. Always prioritize accessible queries that promote Web Content Accessibility Guidelines (WCAG):

\`\`\`
  1. QUERIES ACCESSIBLE TO EVERYONE (Top Priority):
     - getByRole('button', { name: /submit complaint/i })   <-- Best! Reflects accessibility tree
     - getByLabelText(/citizen phone number/i)             <-- Best for form fields
     - getByPlaceholderText(/enter ward number/i)          <-- Fallback for inputs
     - getByText(/grievance successfully submitted/i)      <-- Good for paragraphs/headings

  2. SEMANTIC HTML QUERIES:
     - getByAltText(/official seal/i)                      <-- For images
     - getByTitle(/help tooltip/i)                         <-- For title attributes

  3. TEST IDS (Last Resort Only):
     - getByTestId('grievance-row-102')                    <-- Use only when no accessible role exists
\`\`\`

### Difference between \`getBy\`, \`queryBy\`, and \`findBy\`:
* **\`getBy...\`:** Synchronously returns matching element. **Throws an error immediately** if no match or multiple matches are found. (Use for asserting elements exist).
* **\`queryBy...\`:** Synchronously returns matching element or \`null\`. Does not throw. (Use for asserting elements **do NOT** exist: \`expect(queryByText('Error')).toBeNull()\`).
* **\`findBy...\`:** Returns a Promise that resolves when the element appears in the DOM within a default 1000ms timeout. (Use for elements rendered after **asynchronous API calls**).`
      },
      {
        heading: 'Simulating User Events: userEvent vs fireEvent',
        content: `Always use \`@testing-library/user-event\` instead of \`fireEvent\`.
While \`fireEvent\` dispatches a single raw DOM event, \`userEvent\` simulates all the realistic events a browser fires during genuine user interaction:
* Clicking an input with \`userEvent.click()\` focuses the element, fires hover, mouse-down, mouse-up, and click.
* Typing with \`userEvent.type()\` fires keydown, keypress, input, change, and keyup for every individual character, verifying input masking and validation accurately.

\`\`\`jsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GrievanceForm from '../components/GrievanceForm';

describe('GrievanceForm Component', () => {
  it('submits form with valid citizen input and triggers onSubmit callback', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    // 1. Render component into JSDOM
    render(<GrievanceForm onSubmit={handleSubmit} />);

    // 2. Query accessible form controls
    const titleInput = screen.getByRole('textbox', { name: /complaint title/i });
    const categorySelect = screen.getByRole('combobox', { name: /category/i });
    const submitBtn = screen.getByRole('button', { name: /lodge grievance/i });

    // 3. User types and selects options
    await user.type(titleInput, 'Broken street light on 5th cross');
    await user.selectOptions(categorySelect, 'electricity');

    // 4. User submits the form
    await user.click(submitBtn);

    // 5. Assertions
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      title: 'Broken street light on 5th cross',
      category: 'electricity'
    });
  });

  it('displays validation error banner when title is left empty', async () => {
    const user = userEvent.setup();
    render(<GrievanceForm onSubmit={vi.fn()} />);

    const submitBtn = screen.getByRole('button', { name: /lodge grievance/i });
    await user.click(submitBtn);

    // Verify error banner appears in DOM
    const errorMsg = await screen.findByRole('alert');
    expect(errorMsg).toHaveTextContent(/title must be at least 10 characters/i);
  });
});
\`\`\``
      }
    ],
    crpIndiaConnection: 'In CRP India, RTL verifies that grievance status filters, citizen OTP inputs, and nodal officer assignment dropdowns work correctly across all keyboard interactions and screen reader announcements.',
    codeExample: `// Example test verifying async data fetching in a React component
import { render, screen } from '@testing-library/react';
import GrievanceList from './GrievanceList';
import { vi } from 'vitest';

// Mock fetch globally
global.fetch = vi.fn();

test('displays loading spinner, then renders list of grievances', async () => {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [
      { id: '101', title: 'Water leakage in Ward 4', status: 'Pending' }
    ]
  });

  render(<GrievanceList />);

  // Assert loading indicator is visible initially
  expect(screen.getByText(/loading complaints/i)).toBeInTheDocument();

  // Wait for async item to appear
  const item = await screen.findByText('Water leakage in Ward 4');
  expect(item).toBeInTheDocument();
  expect(screen.queryByText(/loading complaints/i)).not.toBeInTheDocument();
});`,
    commonMistakes: [
      {
        mistake: 'Using querySelector(".btn-submit") or testing by CSS class name.',
        fix: 'Use screen.getByRole("button", { name: /submit/i }). This ensures your buttons are semantically accessible and immune to CSS class renaming.'
      },
      {
        mistake: 'Using waitFor() with empty expectations or arbitrary setTimeout delays.',
        fix: 'Use findByRole/findByText directly, which have built-in retry and waiting mechanisms.'
      },
      {
        mistake: 'Forgetting to await userEvent actions (e.g. user.click()), causing race conditions.',
        fix: 'All userEvent v14+ methods return Promises and must be awaited.'
      }
    ],
    exercise: {
      instruction: 'Write an RTL test for a Counter component that verifies clicking an "Increment" button increases the count from 0 to 1.',
      prompt: 'Write an RTL test for a Counter component that verifies clicking an "Increment" button increases the count from 0 to 1.',
      starterCode: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

test('increments counter on click', async () => {
  // 1. Setup user event
  // 2. Render Counter
  // 3. Find button and click
  // 4. Assert count text is 1
});`,
      solution: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

test('increments counter on click', async () => {
  const user = userEvent.setup();
  render(<Counter />);

  const button = screen.getByRole('button', { name: /increment/i });
  expect(screen.getByText(/count: 0/i)).toBeInTheDocument();

  await user.click(button);
  expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
});`,
      solutionCode: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

test('increments counter on click', async () => {
  const user = userEvent.setup();
  render(<Counter />);

  const button = screen.getByRole('button', { name: /increment/i });
  expect(screen.getByText(/count: 0/i)).toBeInTheDocument();

  await user.click(button);
  expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
});`,
      hint: 'Setup userEvent with userEvent.setup(), render the component, and use screen.getByRole("button") to interact.'
    },
    quiz: [
      {
        question: 'Which RTL query should you use to assert that an element is NOT present in the document?',
        options: [
          'screen.getByText()',
          'screen.findByText()',
          'screen.queryByText()',
          'screen.getAllByText()'
        ],
        correctIndex: 2,
        answer: 2,
        explanation: 'queryByText returns null when an element is not found, allowing you to assert expect(screen.queryByText("error")).toBeNull(). getByText throws an immediate exception.'
      },
      {
        question: 'Why does RTL discourage selecting elements by CSS class names or DOM hierarchies?',
        options: [
          'Because JSDOM does not support CSS selectors.',
          'Because testing implementation details makes tests fragile to CSS refactoring and ignores accessibility.',
          'Because CSS selectors are too slow to run in Node.js.',
          'Because React removes all classes during compilation.'
        ],
        correctIndex: 1,
        answer: 1,
        explanation: 'Testing via accessible roles mimics actual user behavior and ensures your application works for screen readers and assistive devices.'
      }
    ],
    takeaways: [
      'React Testing Library tests components from the user perspective rather than internal state.',
      'Prioritize accessible queries: getByRole and getByLabelText before falling back to test IDs.',
      'Always use @testing-library/user-event to simulate realistic browser interaction chains.',
      'Use findBy... queries to cleanly await asynchronous state updates and API responses.'
    ],
    keyTakeaways: [
      'React Testing Library tests components from the user perspective rather than internal state.',
      'Prioritize accessible queries: getByRole and getByLabelText before falling back to test IDs.',
      'Always use @testing-library/user-event to simulate realistic browser interaction chains.',
      'Use findBy... queries to cleanly await asynchronous state updates and API responses.'
    ]
  },

  'api-and-integration-testing': {
    id: 'lesson-13-3',
    slug: 'api-and-integration-testing',
    courseId: 'course-13',
    courseSlug: 'full-stack-testing-and-qa',
    courseTitle: 'Course 13: Full-Stack Testing & Quality Assurance',
    title: 'Backend API & Integration Testing with Supertest',
    category: 'Testing',
    estimatedTime: '45 min read & practice',
    objectives: [
      'Understand API integration testing: testing Express routes, middleware, validation, and database operations.',
      'Use Supertest to send HTTP requests to Express applications without binding to live network ports.',
      'Verify HTTP status codes, response headers, JSON schemas, and error structures.',
      'Test authenticated routes by injecting JWT Bearer tokens.',
      'Test edge cases: missing fields, malformed JSON, invalid IDs, and unauthorized access.',
      'Manage database state between test runs using test database fixtures and cleanup hooks.'
    ],
    sections: [
      {
        heading: 'What is API Integration Testing?',
        content: `While unit testing tests an isolated controller function with mocked \`req\` and \`res\` objects, **API Integration Testing** executes the entire HTTP pipeline:

\`\`\`
  [Supertest HTTP Request]
             │
             ▼
  [Express Middleware Chain]
  ├── express.json()             (Parse JSON body)
  ├── helmet()                   (Security headers)
  ├── authMiddleware             (JWT token verification)
  └── validationMiddleware       (Input schema enforcement)
             │
             ▼
  [Route Controller]
             │
             ▼
  [Database ORM / Mongoose]      (Real or In-Memory MongoDB)
             │
             ▼
  [HTTP Response: Status, Headers, Body] ────> [Supertest Assertions]
\`\`\`

Testing this entire chain verifies that your middlewares do not crash, request bodies are properly parsed, database queries succeed, and status codes (200, 201, 400, 401, 403, 404, 500) are returned correctly.`
      },
      {
        heading: 'Testing Express Routes with Supertest',
        content: `**Supertest** wraps the Node.js HTTP server interface, allowing you to pass an Express \`app\` instance directly without calling \`app.listen(5000)\`:

\`\`\`javascript
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../src/app'; // Your Express app
import Grievance from '../src/models/Grievance';
import mongoose from 'mongoose';

describe('POST /api/v1/grievances', () => {
  beforeEach(async () => {
    // Clear test collection before every test
    await Grievance.deleteMany({});
  });

  it('creates a new grievance and returns 201 Created with JSON payload', async () => {
    const newGrievance = {
      title: 'Pothole on Main Market Road',
      description: 'Severe depth causing traffic hazard for two wheelers',
      category: 'roads',
      ward: 12
    };

    const response = await request(app)
      .post('/api/v1/grievances')
      .send(newGrievance)
      .expect('Content-Type', /json/)
      .expect(201);

    // Verify response body
    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe(newGrievance.title);
    expect(response.body.data.status).toBe('Submitted');
    expect(response.body.data).toHaveProperty('_id');

    // Verify data was persisted in database
    const inDb = await Grievance.findById(response.body.data._id);
    expect(inDb).not.toBeNull();
    expect(inDb.category).toBe('roads');
  });

  it('returns 400 Bad Request when required title field is omitted', async () => {
    const invalidPayload = { category: 'sanitation', ward: 5 };

    const response = await request(app)
      .post('/api/v1/grievances')
      .send(invalidPayload)
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.error).toMatch(/title is required/i);
  });
});
\`\`\``
      },
      {
        heading: 'Testing Authentication and Role-Based Authorization',
        content: `Protected endpoints must be verified with both valid tokens, expired tokens, missing tokens, and unauthorized roles:

\`\`\`javascript
describe('DELETE /api/v1/grievances/:id (Nodal Officer Only)', () => {
  it('returns 401 Unauthorized if no Bearer token is provided', async () => {
    await request(app)
      .delete('/api/v1/grievances/6530a1b2c3d4e5f6a7b8c9d0')
      .expect(401);
  });

  it('returns 403 Forbidden if citizen tries to perform administrative deletion', async () => {
    const citizenToken = generateTestJwt({ id: 'citizen_1', role: 'citizen' });

    await request(app)
      .delete('/api/v1/grievances/6530a1b2c3d4e5f6a7b8c9d0')
      .set('Authorization', \`Bearer \${citizenToken}\`)
      .expect(403);
  });

  it('allows nodal_admin to delete grievance and returns 200 OK', async () => {
    const adminToken = generateTestJwt({ id: 'admin_1', role: 'nodal_admin' });
    const grievance = await Grievance.create({ title: 'Spam test', category: 'roads' });

    await request(app)
      .delete(\`/api/v1/grievances/\${grievance._id}\`)
      .set('Authorization', \`Bearer \${adminToken}\`)
      .expect(200);

    const check = await Grievance.findById(grievance._id);
    expect(check).toBeNull();
  });
});
\`\`\``
      }
    ],
    crpIndiaConnection: 'In CRP India, Supertest integration suites verify that citizen grievances cannot be closed without resolution comments, that citizen tokens cannot modify administrative assignment tables, and that file upload endpoints reject non-image MIME types.',
    codeExample: `// Test database teardown and setup hook example
import mongoose from 'mongoose';
import { beforeAll, afterAll } from 'vitest';

beforeAll(async () => {
  const testDbUri = process.env.MONGO_TEST_URI || 'mongodb://127.0.0.1:27017/crp_test_db';
  await mongoose.connect(testDbUri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});`,
    commonMistakes: [
      {
        mistake: 'Running integration tests against a shared development or production database, corrupting real data.',
        fix: 'Always connect to an isolated test database (e.g. crp_test_db or in-memory mongodb-memory-server) specified by process.env.MONGO_TEST_URI.'
      },
      {
        mistake: 'Forgetting to await request(app).post() calls, causing silent test passes without assertions executing.',
        fix: 'Always use async/await with Supertest calls.'
      },
      {
        mistake: 'Leaving database records uncleared between test runs, causing unique key collisions (e.g. duplicate email errors).',
        fix: 'Use beforeEach() to wipe test collections before each test case runs.'
      }
    ],
    exercise: {
      instruction: 'Write an integration test for GET /api/v1/health that verifies the endpoint returns status 200, Content-Type application/json, and { status: "UP", uptime: expect.any(Number) }.',
      prompt: 'Write an integration test for GET /api/v1/health that verifies the endpoint returns status 200, Content-Type application/json, and { status: "UP", uptime: expect.any(Number) }.',
      starterCode: `import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app';

describe('GET /api/v1/health', () => {
  it('returns healthy status with system uptime', async () => {
    // Write supertest request and assertions
  });
});`,
      solution: `import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app';

describe('GET /api/v1/health', () => {
  it('returns healthy status with system uptime', async () => {
    const res = await request(app)
      .get('/api/v1/health')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body.status).toBe('UP');
    expect(res.body.uptime).toEqual(expect.any(Number));
  });
});`,
      solutionCode: `import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app';

describe('GET /api/v1/health', () => {
  it('returns healthy status with system uptime', async () => {
    const res = await request(app)
      .get('/api/v1/health')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body.status).toBe('UP');
    expect(res.body.uptime).toEqual(expect.any(Number));
  });
});`,
      hint: 'Use request(app).get("/api/v1/health").expect(200) and inspect res.body.'
    },
    quiz: [
      {
        question: 'Why does Supertest not require calling app.listen(port)?',
        options: [
          'Because it mocks the entire operating system network stack.',
          'Because it uses Node.js internal HTTP request dispatching directly on the server instance without binding to an external TCP port.',
          'Because Supertest only tests frontend code.',
          'Because Express automatically listens on port 80 during testing.'
        ],
        correctIndex: 1,
        answer: 1,
        explanation: 'Supertest passes the Express request listener directly to Node.js http.createServer(), avoiding port collisions during parallel test runs.'
      },
      {
        question: 'What HTTP status code should your API return when a valid citizen tries to access an admin-only endpoint?',
        options: ['400 Bad Request', '401 Unauthorized', '403 Forbidden', '404 Not Found'],
        correctIndex: 2,
        answer: 2,
        explanation: '401 means unauthenticated (identity unknown), whereas 403 Forbidden means authenticated but lacking necessary authorization permissions.'
      }
    ],
    takeaways: [
      'API integration testing verifies the full server pipeline: routing, parsing, validation, auth, and database persistence.',
      'Supertest enables high-speed HTTP testing without port collisions or live network binding.',
      'Always test authorization boundaries: verify that non-admin users cannot access administrative endpoints.',
      'Always isolate test databases and reset test collections between test runs to guarantee deterministic tests.'
    ],
    keyTakeaways: [
      'API integration testing verifies the full server pipeline: routing, parsing, validation, auth, and database persistence.',
      'Supertest enables high-speed HTTP testing without port collisions or live network binding.',
      'Always test authorization boundaries: verify that non-admin users cannot access administrative endpoints.',
      'Always isolate test databases and reset test collections between test runs to guarantee deterministic tests.'
    ]
  },

  'e2e-testing-and-test-strategy': {
    id: 'lesson-13-4',
    slug: 'e2e-testing-and-test-strategy',
    courseId: 'course-13',
    courseSlug: 'full-stack-testing-and-qa',
    courseTitle: 'Course 13: Full-Stack Testing & Quality Assurance',
    title: 'End-to-End Testing with Playwright & Testing Strategy',
    category: 'Testing',
    estimatedTime: '45 min read & practice',
    objectives: [
      'Understand End-to-End (E2E) testing: controlling headless Chromium, Firefox, and WebKit browsers.',
      'Write Playwright test scripts simulating complete user journeys: register, login, file grievance, verify output.',
      'Use Playwright auto-waiting, web-first assertions, and locators.',
      'Evaluate testing trade-offs: cost, speed, maintenance overhead, and flakiness prevention.',
      'Integrate automated testing into GitHub Actions Continuous Integration (CI) pipelines.',
      'Formulate an effective testing strategy for full-stack web applications.'
    ],
    sections: [
      {
        heading: 'What is End-to-End (E2E) Testing?',
        content: `Unit tests test functions. Integration tests test modules. But **End-to-End (E2E) Testing** is the only test level that verifies the entire system as a cohesive machine:

\`\`\`
  [Real Browser (Playwright / Chromium)]
                 │  (HTTP / WebSocket)
                 ▼
  [Vite React Frontend Bundle]
                 │  (REST API calls)
                 ▼
  [Node.js / Express Server]
                 │  (Database Connection)
                 ▼
  [MongoDB Database Engine]
\`\`\`

If your frontend compiles cleanly, your unit tests pass, and your database schema is correct, an application can still fail if an environment variable is misconfigured or a build script omitted an icon asset. E2E tests launch a real browser, load the built HTML/JS, click real DOM nodes, and verify complete user journeys.`
      },
      {
        heading: 'Modern E2E Testing with Playwright',
        content: `**Playwright** (developed by Microsoft) has become the gold standard for E2E testing due to:
1. **Auto-Waiting:** Playwright automatically waits for elements to be actionable (visible, stable, enabled) before clicking or typing, virtually eliminating flaky test timing errors.
2. **Multi-Browser:** Executes identically across Chromium (Chrome/Edge), Firefox, and WebKit (Safari).
3. **Network Interception:** Can monitor, mock, or assert real HTTP network requests.
4. **Trace Viewer & Video:** Captures DOM snapshots, console logs, and action videos on test failure.

\`\`\`javascript
// e2e/citizen-journey.spec.js
import { test, expect } from '@playwright/test';

test.describe('Citizen Grievance Redressal Flow', () => {
  test('citizen logs in, files a road hazard complaint, and sees confirmation', async ({ page }) => {
    // 1. Navigate to application
    await page.goto('http://localhost:5173/login');

    // 2. Fill login form using accessible locators
    await page.getByLabel('Citizen Email or Mobile').fill('citizen.test@example.com');
    await page.getByLabel('Password').fill('SecurePassword!123');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // 3. Verify successful redirection to citizen dashboard
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.getByRole('heading', { name: 'Citizen Redressal Dashboard' })).toBeVisible();

    // 4. Navigate to File Grievance page
    await page.getByRole('link', { name: 'File New Complaint' }).click();

    // 5. Fill out grievance form
    await page.getByLabel('Complaint Title').fill('Unrepaired pothole causing water stagnation');
    await page.getByLabel('Ward Selection').selectOption('Ward 7 - Civil Lines');
    await page.getByLabel('Category').selectOption('roads');
    await page.getByLabel('Detailed Description').fill('Water accumulates after rain, creating severe mosquito hazard.');

    // 6. Submit
    await page.getByRole('button', { name: 'Submit Grievance' }).click();

    // 7. Verify modal confirmation with tracking ID
    const confirmationModal = page.getByRole('dialog');
    await expect(confirmationModal).toBeVisible();
    await expect(confirmationModal).toContainText('Complaint Registered Successfully');
    await expect(confirmationModal.getByText(/CRP-[0-9]{4}/)).toBeVisible();
  });
});
\`\`\``
      },
      {
        heading: 'How to Choose Your Testing Strategy: Avoiding Test Fatigue',
        content: `A common engineering blunder is believing that "more tests always equal better quality." Writing E2E tests for every single button or color variation leads to:
* 45-minute CI build queues.
* Flaky test runs that block deployments.
* Developers ignoring failing tests ("Oh, that test always fails, just click rerun").

### Recommended Full-Stack Testing Distribution:
* **70% Unit Tests:** Business logic, date calculations, validation algorithms, utility functions, custom state reducers. Fast, zero flakiness.
* **20% Component & API Integration Tests:** React form interactions, Express route handlers, database CRUD operations, auth token injection.
* **10% E2E Tests:** Critical business journeys only (Sign up -> Login -> Core transaction -> Checkout/Submit -> Logout).`
      }
    ],
    crpIndiaConnection: 'In CRP India, Playwright E2E suites run in GitHub Actions on every pull request to verify that citizens can lodge complaints and municipal officers can update ticket resolution statuses before merging to main.',
    codeExample: `// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile', use: { ...devices['Pixel 5'] } }
  ]
});`,
    commonMistakes: [
      {
        mistake: 'Using page.waitForTimeout(5000) (hard-coded sleep).',
        fix: 'Use Playwright built-in auto-waiting or expect(locator).toBeVisible(). Hardcoded sleeps make tests artificially slow and still fail when servers run under load.'
      },
      {
        mistake: 'Writing E2E tests that depend on specific pre-existing database records.',
        fix: 'Use API test helpers or database seed scripts to create fresh user accounts and test data for each E2E test run.'
      },
      {
        mistake: 'Testing third-party services (like Google Maps or real SMS gateways) in live E2E runs.',
        fix: 'Intercept external third-party network requests using page.route() to return predictable mock responses.'
      }
    ],
    exercise: {
      instruction: 'Write a Playwright test snippet that visits "http://localhost:5173", asserts the page title contains "Dev-root", and clicks the "Get Started" link.',
      prompt: 'Write a Playwright test snippet that visits "http://localhost:5173", asserts the page title contains "Dev-root", and clicks the "Get Started" link.',
      starterCode: `import { test, expect } from '@playwright/test';

test('homepage has correct title and navigation link', async ({ page }) => {
  // 1. Visit homepage
  // 2. Assert title
  // 3. Click Get Started
  // 4. Assert URL changes
});`,
      solution: `import { test, expect } from '@playwright/test';

test('homepage has correct title and navigation link', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page).toHaveTitle(/Dev-root/i);

  const getStartedBtn = page.getByRole('link', { name: /get started/i });
  await getStartedBtn.click();

  await expect(page).toHaveURL(/.*courses/);
});`,
      solutionCode: `import { test, expect } from '@playwright/test';

test('homepage has correct title and navigation link', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page).toHaveTitle(/Dev-root/i);

  const getStartedBtn = page.getByRole('link', { name: /get started/i });
  await getStartedBtn.click();

  await expect(page).toHaveURL(/.*courses/);
});`,
      hint: 'Use page.goto(), expect(page).toHaveTitle(), and page.getByRole("link") with click().'
    },
    quiz: [
      {
        question: 'What is a major advantage of Playwright over older E2E tools like Selenium?',
        options: [
          'Playwright does not require a browser to run.',
          'Playwright features built-in auto-waiting for actionability, eliminating artificial sleeps and flaky timing errors.',
          'Playwright only works with Python.',
          'Playwright can only test static HTML files.'
        ],
        correctIndex: 1,
        answer: 1,
        explanation: 'Playwright automatically checks whether elements are visible, attached to the DOM, non-moving, and enabled before clicking, drastically reducing test flakiness.'
      },
      {
        question: 'Why should E2E tests comprise approximately 10% rather than 90% of your total test suite?',
        options: [
          'Because browsers are too expensive to install.',
          'Because E2E tests are slower, require running infrastructure, and have higher maintenance costs than unit tests.',
          'Because E2E tests cannot verify user authentication.',
          'Because E2E tests do not run on Linux servers.'
        ],
        correctIndex: 1,
        answer: 1,
        explanation: 'E2E tests take seconds each and require spinning up databases and servers; reserving them for core user flows keeps test feedback fast.'
      }
    ],
    takeaways: [
      'E2E tests verify the complete integrated stack: browser rendering, network APIs, servers, and databases.',
      'Playwright provides modern web-first assertions, auto-waiting, and cross-browser execution across Chromium, Firefox, and WebKit.',
      'Avoid hardcoded sleeps; let Playwright auto-wait for DOM conditions.',
      'Distribute tests according to the Testing Pyramid: 70% Unit, 20% Integration, 10% E2E.'
    ],
    keyTakeaways: [
      'E2E tests verify the complete integrated stack: browser rendering, network APIs, servers, and databases.',
      'Playwright provides modern web-first assertions, auto-waiting, and cross-browser execution across Chromium, Firefox, and WebKit.',
      'Avoid hardcoded sleeps; let Playwright auto-wait for DOM conditions.',
      'Distribute tests according to the Testing Pyramid: 70% Unit, 20% Integration, 10% E2E.'
    ]
  }
};
