/**
 * Dev-root Course 7: Modern JavaScript - Deep Learning Curriculum (Phase 4 4x Depth Standard)
 * Comprehensive lessons covering ES6+ syntax, destructuring, higher-order array methods,
 * Promises, async/await, and the JavaScript Event Loop.
 */

export const MODERN_JS_LESSONS = {
  'es6-syntax-and-array-methods': {
    id: 'lesson-7-1',
    slug: 'es6-syntax-and-array-methods',
    courseId: 'course-7',
    courseSlug: 'modern-javascript',
    courseTitle: 'Course 7: Modern JavaScript',
    title: 'ES6+ Syntax, Destructuring & Array Methods',
    category: 'Programming',
    estimatedTime: '45 min read & practice',
    objectives: [
      'Master Object and Array destructuring syntax with default values and renaming.',
      'Utilize the Spread (...) operator for immutable array and object cloning and merging.',
      'Manipulate complex datasets declaratively using higher-order array methods (.map, .filter, .reduce, .find, .some, .every).',
      'Understand pure functional transformations vs mutating operations (.push, .splice).',
      'Implement Optional Chaining (?.) and Nullish Coalescing (??) for resilient data access.'
    ],
    sections: [
      {
        heading: 'The Modern JavaScript Renaissance (ES6 and Beyond)',
        content: `In 2015, ECMAScript 6 (ES6 / ECMAScript 2015) introduced the most substantial upgrade in JavaScript's history. It transformed JavaScript from a quirky scripting language for simple browser animations into a robust, expressive language capable of powering massive enterprise web applications.

Modern JavaScript emphasizes **declarative programming**, **immutability**, and **concise syntax**. Instead of writing verbose loops with manual index counters and temporary state variables, modern developers use expressive primitives that convey clear architectural intent.`
      },
      {
        heading: 'Object and Array Destructuring: Extracting Data Cleanly',
        content: `Destructuring provides an ergonomic syntax to unpack values from arrays or properties from objects into distinct variables in a single statement.

### 1. Object Destructuring:
\`\`\`javascript
const complaint = {
  id: "CRP-4092",
  department: "Public Works",
  ward: 14,
  assignedOfficer: {
    name: "Er. Ramesh Verma",
    phone: "98765-43210"
  }
};

// Extracting properties directly
const { id, department, priority = "Normal" } = complaint;
console.log(id);         // "CRP-4092"
console.log(priority);   // "Normal" (fallback default value used)

// Renaming during destructuring
const { department: deptName } = complaint;
console.log(deptName);   // "Public Works"

// Nested destructuring
const { assignedOfficer: { name: officerName } } = complaint;
console.log(officerName); // "Er. Ramesh Verma"
\`\`\`

### 2. Array Destructuring:
Array destructuring unpacks elements in sequential order:
\`\`\`javascript
const coordinates = [28.6139, 77.2090]; // [Latitude, Longitude]
const [lat, lng] = coordinates;
console.log(lat); // 28.6139

// Skipping elements
const rgb = [255, 128, 0];
const [red, , blue] = rgb; // Skips green
console.log(blue); // 0
\`\`\`
*React Connection:* Array destructuring is the exact mechanism that powers React state hooks: \`const [count, setCount] = useState(0);\`.`
      },
      {
        heading: 'The Spread Operator (...): Immutable State Management',
        content: `The spread operator expands an iterable (like an array or object) into its individual elements. In modern web development (especially React and Redux), **state must never be mutated directly**. The spread operator enables clean, shallow immutable cloning:

### 1. Spreading Objects (Cloning and Updating):
\`\`\`javascript
const originalTicket = { id: 101, status: "Open", priority: "Low" };

// Create a new object with updated status without mutating originalTicket!
const updatedTicket = {
  ...originalTicket,
  status: "In Progress",
  updatedAt: new Date()
};

console.log(originalTicket.status); // Still "Open"!
console.log(updatedTicket.status);  // "In Progress"!
\`\`\`

### 2. Spreading Arrays (Appending and Merging):
\`\`\`javascript
const initialWards = ["Ward 1", "Ward 2"];
const newWards = ["Ward 3", "Ward 4"];

// Merge arrays immutably
const allWards = [...initialWards, ...newWards, "Ward 5"];
console.log(allWards); // ["Ward 1", "Ward 2", "Ward 3", "Ward 4", "Ward 5"]
\`\`\``
      },
      {
        heading: 'Higher-Order Array Methods: .map(), .filter(), and .reduce()',
        content: `Higher-order array methods accept callback functions to transform and inspect datasets declaratively without writing manual \`for\` loops.

### 1. \`.map(callback)\`: Transform Every Element
Creates a new array with the results of calling the function on every item:
\`\`\`javascript
const ticketIds = [101, 102, 103];
const formattedCodes = ticketIds.map(id => \`CRP-\${id}\`);
console.log(formattedCodes); // ["CRP-101", "CRP-102", "CRP-103"]
\`\`\`

### 2. \`.filter(callback)\`: Select Matching Elements
Creates a new array containing only elements that return \`true\` from the test function:
\`\`\`javascript
const complaints = [
  { id: 1, resolved: true, ward: 4 },
  { id: 2, resolved: false, ward: 7 },
  { id: 3, resolved: false, ward: 4 }
];

const pendingWard4Complaints = complaints.filter(c => !c.resolved && c.ward === 4);
console.log(pendingWard4Complaints.length); // 1
\`\`\`

### 3. \`.reduce(callback, initialValue)\`: Aggregate into a Single Value
Reduces an array down to a single total, object dictionary, or grouped collection:
\`\`\`javascript
const departmentalBudgets = [
  { dept: "Roads", cost: 450000 },
  { dept: "Water", cost: 320000 },
  { dept: "Sanitation", cost: 180000 }
];

const totalMunicipalCost = departmentalBudgets.reduce((accumulator, item) => {
  return accumulator + item.cost;
}, 0); // 0 is initialValue

console.log(totalMunicipalCost); // 950000
\`\`\``
      },
      {
        heading: 'Modern Resilient Operators: Optional Chaining and Nullish Coalescing',
        content: `Working with remote API payloads often leads to runtime crashes when properties are missing: \`TypeError: Cannot read properties of undefined\`.

### 1. Optional Chaining (\`?.\`):
Short-circuits and returns \`undefined\` instead of throwing a fatal error if the reference is nullish (\`null\` or \`undefined\`):
\`\`\`javascript
const user = { name: "Sunita" };

// Old dangerous code: throws Uncaught TypeError: Cannot read property 'mobile' of undefined
// const phone = user.contact.phone;

// Safe modern code:
const phone = user?.contact?.phone;
console.log(phone); // undefined (No crash!)
\`\`\`

### 2. Nullish Coalescing (\`??\`):
Provides a fallback value **only** when the left-hand side is strictly \`null\` or \`undefined\`:
\`\`\`javascript
const zeroTicketsCount = 0;

// OR (||) treats 0 as falsy (BAD for numeric metrics):
const countA = zeroTicketsCount || 10;
console.log(countA); // 10 (BUG! Overwrote legitimate 0)

// Nullish Coalescing (??) preserves 0 and empty strings "":
const countB = zeroTicketsCount ?? 10;
console.log(countB); // 0 (CORRECT!)
\`\`\``
      }
    ],
    exercise: {
      instruction: 'Write a function formatGrievanceSummary(complaints) that filters for unresolved complaints, transforms them into an array of strings formatted as "[Ward {ward}] {title}", and calculates the count of high-priority tickets.',
      starterCode: `// Write your data transformation function below
function formatGrievanceSummary(complaints) {
  // complaints: [{ id: 1, title: 'Leak', ward: 4, resolved: false, priority: 'high' }]
}
`,
      hints: [
        'Use .filter() to select complaints where c.resolved === false.',
        'Use .map() on the filtered list to return `[Ward ${c.ward}] ${c.title}`.',
        'Use .filter() or .reduce() to count items where c.priority === "high".',
        'Return an object containing { activeSummaries, highPriorityCount }.'
      ],
      tasks: [
        'Filter for unresolved complaints',
        'Transform into formatted strings using .map()',
        'Count high-priority tickets',
        'Return structured result object'
      ],
      solution: `function formatGrievanceSummary(complaints) {
  const unresolved = complaints.filter(c => !c.resolved);

  const activeSummaries = unresolved.map(c => \`[Ward \${c.ward}] \${c.title}\`);

  const highPriorityCount = unresolved.filter(c => c.priority === 'high').length;

  return {
    activeSummaries,
    highPriorityCount
  };
}`,
      solutionExplanation: 'This demonstrates pure declarative data processing using higher-order functions. It avoids loop counters and mutable array pushes, producing clean, predictable code that transforms data immutably.'
    },
    quiz: [
      {
        question: 'What is the key difference between the logical OR operator (||) and the Nullish Coalescing operator (??)?',
        options: [
          'Nullish Coalescing only works in TypeScript.',
          '|| treats all 8 falsy values (including 0, false, and "") as triggers for the fallback, while ?? only triggers when the value is strictly null or undefined.',
          '?? is executed synchronously while || is asynchronous.',
          'There is no difference; they are aliases.'
        ],
        correctIndex: 1,
        explanation: '?? specifically targets null and undefined. If a variable holds 0 or "", ?? respects it as a valid value, whereas || mistakenly treats 0 as falsy and replaces it with the default.'
      },
      {
        question: 'Which higher-order array method should you use when you want to convert an array of numbers into a single summed total?',
        options: [
          '.map()',
          '.filter()',
          '.reduce()',
          '.forEach()'
        ],
        correctIndex: 2,
        explanation: '.reduce() iterates over an array while maintaining an accumulator, reducing the elements down into a single cumulative output value.'
      }
    ],
    takeaways: [
      'Destructuring unpacks object properties and array items into clean, dedicated variables.',
      'Use the spread operator (...) to clone and update objects and arrays immutably.',
      'Use .map() for transformations, .filter() for selection, and .reduce() for aggregation.',
      'Use optional chaining (?.) and nullish coalescing (??) to prevent undefined property crashes.'
    ],
    caseStudyReference: {
      title: 'Data Pipelines and Array Transformations in CRP India',
      description: 'Review how grievance cards and analytics summaries in CRP India use .map, .filter, and destructuring across frontend dashboard components.',
      files: [
        'reference-projects/CRP-India/frontend/src/components/GrievanceList.jsx',
        'reference-projects/CRP-India/frontend/src/pages/Dashboard.jsx'
      ]
    }
  },

  'promises-and-async-await': {
    id: 'lesson-7-2',
    slug: 'promises-and-async-await',
    courseId: 'course-7',
    courseSlug: 'modern-javascript',
    courseTitle: 'Course 7: Modern JavaScript',
    title: 'Promises, Async/Await & The Event Loop',
    category: 'Programming',
    estimatedTime: '45 min read & practice',
    objectives: [
      'Understand synchronous vs. asynchronous execution in a single-threaded runtime.',
      'Explain the JavaScript Event Loop, Call Stack, Web APIs, Task Queue, and Microtask Queue.',
      'Master the three states of a Promise (Pending, Fulfilled, Rejected).',
      'Author clean asynchronous code using async/await and robust try/catch/finally blocks.',
      'Execute concurrent network requests in parallel using Promise.all() and Promise.allSettled().'
    ],
    sections: [
      {
        heading: 'The Concurrency Problem: Single-Threaded Non-Blocking I/O',
        content: `JavaScript is a **single-threaded** programming language. This means it has exactly **one Call Stack** and can execute only one operation at any single instant in time.

If JavaScript executed network requests synchronously, a 2-second API call to fetch citizen complaints would freeze the entire browser tab: buttons wouldn't click, animations would freeze, and users couldn't type!

To prevent freezing, JavaScript relies on an **asynchronous, non-blocking I/O event-driven model** orchestrated by the **Event Loop**.`
      },
      {
        heading: 'How JavaScript Actually Runs: The Event Loop Demystified',
        content: `The browser runtime consists of five interconnected subsystems:

\`\`\`
  +-----------------------+              +-----------------------+
  |      CALL STACK       |              |       WEB APIs        |
  | (Executes JS code)    |              | (Timer, Fetch, DOM)   |
  | [ main() ]            |              | [ setTimeout timer ]  |
  +-----------------------+              +-----------------------+
              |                                      |
              v                                      v
  +--------------------------------------------------------------+
  |                          EVENT LOOP                          |
  +--------------------------------------------------------------+
              ^                                      ^
              |                                      |
  +-----------------------+              +-----------------------+
  |    MICROTASK QUEUE    |              |     MACROTASK QUEUE   |
  | (Promises, async/await)              | (setTimeout, click)   |
  +-----------------------+              +-----------------------+
\`\`\`

### The Execution Lifecycle:
1. **Call Stack:** Synchronous statements execute immediately on the stack.
2. **Web APIs:** When an asynchronous operation is initiated (\`fetch('/api')\` or \`setTimeout\`), the browser's C++ runtime handles the timer or network socket in the background. The JavaScript call stack continues executing subsequent lines without pausing!
3. **Microtask Queue (High Priority):** When a Promise resolves, its \`.then()\` or \`await\` resumption callback is pushed to the Microtask Queue.
4. **Task (Macrotask) Queue:** Callbacks from \`setTimeout\` and DOM events wait here.
5. **The Event Loop:** Continuously checks if the Call Stack is empty. As soon as the stack clears, it flushes all Microtasks first, then processes the next Macrotask.`
      },
      {
        heading: 'The Evolution: Callbacks -> Promises -> async/await',
        content: `### 1. Callback Hell (Legacy Nightmare):
Early asynchronous JavaScript used nested callbacks, creating unreadable, unmaintainable "Pyramids of Doom":
\`\`\`javascript
getUser(userId, (user) => {
  getTickets(user.id, (tickets) => {
    getComments(tickets[0].id, (comments) => {
      // Incomprehensible error handling and nesting...
    });
  });
});
\`\`\`

### 2. Promises (ES6 Standard):
A **Promise** is an object representing the eventual completion (or failure) of an asynchronous operation:
* **Pending:** Initial state; operation in progress.
* **Fulfilled:** Operation succeeded (\`resolve(data)\`).
* **Rejected:** Operation failed (\`reject(error)\`).

\`\`\`javascript
fetch('/api/tickets')
  .then(response => {
    if (!response.ok) throw new Error("HTTP error " + response.status);
    return response.json();
  })
  .then(tickets => console.log(tickets))
  .catch(err => console.error("Network failed:", err));
\`\`\`

### 3. \`async\` / \`await\` (Modern Standard):
Syntactic sugar built on top of Promises that allows you to write asynchronous code that reads like clear, synchronous top-to-bottom logic:

\`\`\`javascript
async function loadDepartmentTickets(wardId) {
  try {
    const response = await fetch(\`/api/v1/wards/\${wardId}/tickets\`);
    if (!response.ok) {
      throw new Error(\`Failed to fetch tickets: HTTP \${response.status}\`);
    }
    const tickets = await response.json();
    return tickets;
  } catch (error) {
    console.error("Grievance fetch failure:", error.message);
    throw error; // Re-throw or handle gracefully
  } finally {
    console.log("Network operation concluded.");
  }
}
\`\`\``
      },
      {
        heading: 'Concurrent Parallel Execution: Promise.all() vs. Sequential Await',
        content: `A frequent performance blunder made by intermediate developers is awaiting unrelated network requests sequentially:

\`\`\`javascript
// SLOW ANTI-PATTERN (Sequential Waterfall - 4 Seconds Total)
const officers = await fetchOfficers(); // Takes 2 seconds
const tickets  = await fetchTickets();  // Takes 2 seconds (waits for officers to finish!)
\`\`\`

If the two requests do not depend on each other, trigger them concurrently in parallel using **\`Promise.all()\`**:

\`\`\`javascript
// FAST PRODUCTION PATTERN (Parallel Concurrency - 2 Seconds Total)
const [officers, tickets] = await Promise.all([
  fetchOfficers(),
  fetchTickets()
]);
\`\`\`
* **\`Promise.all([p1, p2])\`:** Runs all promises simultaneously. If **any single promise rejects**, the entire \`Promise.all\` rejects immediately ("fail-fast").
* **\`Promise.allSettled([p1, p2])\`:** Runs all promises and waits for all of them to conclude, returning an array of results indicating whether each individual promise fulfilled or rejected.`
      }
    ],
    exercise: {
      instruction: 'Write an async function fetchDashboardData(apiEndpoint) that fetches JSON data, checks response.ok, catches network errors with a fallback object { error: true, message: error.message }, and always logs "Fetch concluded" in a finally block.',
      starterCode: `// Write your async fetch function below
async function fetchDashboardData(apiEndpoint) {
  // Use try/catch/finally with fetch()
}
`,
      hints: [
        'Declare async function fetchDashboardData(apiEndpoint).',
        'Inside try, const response = await fetch(apiEndpoint).',
        'Check if (!response.ok) throw new Error(`HTTP error ${response.status}`).',
        'Return await response.json().',
        'In catch(err), return { error: true, message: err.message } and use finally for logging.'
      ],
      tasks: [
        'Use async/await syntax',
        'Inspect response.ok status',
        'Catch errors and return structured fallback',
        'Include finally block for cleanup'
      ],
      solution: `async function fetchDashboardData(apiEndpoint) {
  try {
    const response = await fetch(apiEndpoint);
    if (!response.ok) {
      throw new Error(\`Network response was not ok: HTTP \${response.status}\`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      error: true,
      message: err.message
    };
  } finally {
    console.log("Fetch concluded");
  }
}`,
      solutionExplanation: 'This demonstrates enterprise-grade error handling. It validates the HTTP status code (since fetch does not reject on 404 or 500 errors), catches low-level socket failures, returns a safe structured fallback, and guarantees execution of cleanup routines.'
    },
    quiz: [
      {
        question: 'Does the browser Fetch API reject its Promise when a server responds with an HTTP 404 (Not Found) or 500 (Internal Server Error) status?',
        options: [
          'Yes, any non-200 code automatically rejects the Promise.',
          'No. fetch() only rejects when a network connection failure or DNS resolution error occurs. HTTP 404 and 500 resolve normally with response.ok set to false.',
          'fetch() will automatically retry 3 times before rejecting.',
          'fetch() freezes execution until the server restarts.'
        ],
        correctIndex: 1,
        explanation: 'A critical fetch trap: the Promise returned by fetch() only rejects on network failures (e.g., loss of internet). An HTTP 404 or 500 is considered a successful HTTP transaction; you must manually check response.ok.'
      },
      {
        question: 'What is the primary execution order rule between the Call Stack, Microtask Queue (Promises), and Macrotask Queue (setTimeout)?',
        options: [
          'Macrotasks always execute before Microtasks.',
          'Synchronous code on the Call Stack runs first, then the Event Loop empties the entire Microtask Queue, and only then executes the next Macrotask.',
          'All tasks run simultaneously on multiple operating system threads.',
          'Promises wait until the page is closed.'
        ],
        correctIndex: 1,
        explanation: 'Microtasks (Promises, process.nextTick, queueMicrotask) have strict priority over the Macrotask queue. The Event Loop flushes all microtasks before picking up the next timer or DOM event callback.'
      }
    ],
    takeaways: [
      'JavaScript is single-threaded; non-blocking I/O is managed by the browser Event Loop.',
      'Use async/await with try/catch/finally for clear, readable asynchronous flow control.',
      'Remember that fetch() does not reject on HTTP 404 or 500; always inspect response.ok.',
      'Execute independent asynchronous operations concurrently with Promise.all() to prevent slow waterfalls.'
    ],
    caseStudyReference: {
      title: 'Async API Client & Axios Interceptors in CRP India',
      description: 'Analyze how the frontend of CRP India manages asynchronous JWT token injection, API calls, and error handling in Axios service wrappers.',
      files: [
        'reference-projects/CRP-India/frontend/src/services/api.js',
        'reference-projects/CRP-India/frontend/src/context/AuthContext.jsx'
      ]
    }
  }
};
