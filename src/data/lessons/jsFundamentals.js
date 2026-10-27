/**
 * Dev-root Course 5: JavaScript Fundamentals - Deep Learning Curriculum (Phase 4 4x Depth Standard)
 * Comprehensive lessons covering variables, types, memory architecture, control flow, functions, and scope.
 */

export const JS_FUNDAMENTALS_LESSONS = {
  'javascript-variables-types-and-logic': {
    id: 'lesson-5-1',
    slug: 'javascript-variables-types-and-logic',
    courseId: 'course-5',
    courseSlug: 'javascript-fundamentals',
    courseTitle: 'Course 5: JavaScript Fundamentals',
    title: 'Variables, Data Types & Control Flow',
    category: 'Programming',
    estimatedTime: '45 min read & practice',
    objectives: [
      'Master modern variable declarations: const vs let, and why var is obsolete.',
      'Understand computer memory allocation: Stack (primitives) vs Heap (reference objects).',
      'Master the 7 JavaScript primitive types and reference types (arrays, objects).',
      'Understand type coercion and why strict equality (===) is mandatory over loose equality (==).',
      'Construct branching logic with if/else, the ternary operator, and switch statements.',
      'Implement deterministic loops (for, while, for...of) and avoid infinite loops.'
    ],
    sections: [
      {
        heading: 'Why JavaScript Powers the Web',
        content: `While HTML provides semantic structure and CSS provides visual presentation, **JavaScript is the Turing-complete programming language that brings web applications to life**. It is the only programming language natively built into and executed by all modern web browsers without requiring external runtimes or plugins.

### What JavaScript Enables:
* **Interactive UIs:** Responding to user clicks, keyboard typing, scroll events, and touch gestures.
* **Client-Side Validation:** Validating form inputs instantly before sending data over the network.
* **Asynchronous Networking:** Fetching live data from backend servers (via the Fetch API or Axios) and updating the DOM without triggering a full page reload.
* **Full-Stack Engineering:** With the advent of Node.js, JavaScript runs on backend servers, communicates with databases like MongoDB, and powers command-line developer tools.`
      },
      {
        heading: 'Variables in Memory: const vs. let vs. var',
        content: `A variable is a named pointer to a location in computer memory where data is stored:

\`\`\`
  Variable Name (Identifier)              Memory Address              Stored Value
  +------------------------+             +--------------+            +------------+
  |       portalName       |  -------->  |  0x7FFE0014  | -------->  | "CRP India"|
  +------------------------+             +--------------+            +------------+
\`\`\`

### 1. \`const\` (Constant - The Professional Default)
Used for identifiers that will not be reassigned:
\`\`\`javascript
const portalName = "CRP India";
const maxRetries = 3;
// portalName = "New Name"; // TypeError: Assignment to constant variable!
\`\`\`
*Golden Rule:* **Always default to \`const\`**. It prevents accidental reassignment bugs and signals immutability to team members. Note: mutating properties inside a \`const\` object or array is valid (\`const user = {}; user.name = "Anita";\`), but reassigning the variable identifier itself is prevented.

### 2. \`let\` (Reassignable Variable)
Used when a variable's value is expected to legitimately change (e.g., loop counters, accumulation totals, active tab indices):
\`\`\`javascript
let activeComplaintsCount = 0;
activeComplaintsCount = activeComplaintsCount + 1; // Valid reassignment
\`\`\`
Both \`const\` and \`let\` are **block-scoped** (trapped within the nearest pair of curly braces \`{}\`) and live in the Temporal Dead Zone (TDZ) if accessed before declaration.

### 3. \`var\` (Legacy 1995 Syntax - Obsolete)
The legacy variable keyword. It is function-scoped (ignores \`if\` and \`for\` blocks), hoists to the top of its scope initialized as \`undefined\`, and creates silent bugs. Modern web standards forbid \`var\`.`
      },
      {
        heading: 'Primitive Types vs. Reference Types: Stack vs. Heap',
        content: `JavaScript divides data into two distinct memory management models:

### 1. Primitive Types (Passed by Value, Stored on the Call Stack)
Primitives are immutable, lightweight values stored directly on the fast execution Stack:
* **\`string\`:** Text sequences enclosed in quotes (\`"CRP India"\`, \`'Admin'\`, or template literals \`\`Hello \${name}\`\`).
* **\`number\`:** 64-bit floating-point numbers (integers and decimals: \`42\`, \`3.14159\`, \`-7\`).
* **\`boolean\`:** Logical truth states (\`true\` or \`false\`).
* **\`null\`:** Intentional, explicit absence of any object value.
* **\`undefined\`:** Variable declared but not yet assigned a value.
* **\`bigint\`:** Arbitrary-precision integers for cryptographic math (\`9007199254740991n\`).
* **\`symbol\`:** Guaranteed unique tokens used as object keys.

\`\`\`javascript
// Primitives are copied by VALUE
let a = 10;
let b = a; // b receives a distinct copy of 10
b = 20;
console.log(a); // Still 10!
\`\`\`

### 2. Reference Types (Passed by Reference, Stored on the Heap)
Objects, arrays, and functions are dynamic, complex structures allocated on the Heap. The variable on the Stack stores only a memory address pointer:

\`\`\`javascript
// Reference types share the same memory pointer
const ticketA = { id: 101, status: "Open" };
const ticketB = ticketA; // ticketB points to the EXACT SAME object on the Heap!

ticketB.status = "Resolved";
console.log(ticketA.status); // "Resolved"! Both variables pointed to the same memory.
\`\`\``
      },
      {
        heading: 'Type Coercion and Strict Equality (===) vs. Loose Equality (==)',
        content: `JavaScript is dynamically and weakly typed. When comparing differing types, the loose equality operator (\`==\`) performs implicit **Type Coercion**, attempting to convert operands to matching types before comparison:

\`\`\`javascript
// DANGEROUS LOOSE EQUALITY (==)
console.log(0 == false);        // true! (coerces false to 0)
console.log("" == 0);           // true! (coerces empty string to 0)
console.log("42" == 42);        // true! (coerces string to number)
console.log(null == undefined); // true!
\`\`\`

### The Non-Negotiable Rule: Always Use Strict Equality (\`===\`)
Strict equality checks both **Value AND Type** without coercion:
\`\`\`javascript
console.log("42" === 42);       // false! (string !== number)
console.log(0 === false);        // false! (number !== boolean)
\`\`\`

### Truthy and Falsy Values:
In JavaScript conditionals, every value evaluates to either \`true\` or \`false\`. There are exactly **8 falsy values**:
1. \`false\`
2. \`0\` and \`-0\`
3. \`0n\` (BigInt zero)
4. \`""\` (empty string)
5. \`null\`
6. \`undefined\`
7. \`NaN\` (Not-a-Number)
8. \`document.all\` (legacy browser quirk)

**Every other value in JavaScript is Truthy**, including empty arrays (\`[]\`) and empty objects (\`{}\`)!`
      },
      {
        heading: 'Control Flow: Conditionals and Loops',
        content: `### 1. Conditionals: if / else if / else
\`\`\`javascript
const complaintPriority = "high";

if (complaintPriority === "critical") {
  dispatchEmergencyTeam();
} else if (complaintPriority === "high") {
  assignNodalSupervisor();
} else {
  queueStandardInspection();
}
\`\`\`

### 2. The Ternary Operator (\`condition ? exprIfTrue : exprIfFalse\`)
Compact syntax for conditional assignment:
\`\`\`javascript
const badgeClass = isResolved ? "badge-success" : "badge-pending";
\`\`\`

### 3. Iteration with Loops:
\`\`\`javascript
// Standard for loop (index-based)
const wards = ["Ward 1", "Ward 2", "Ward 3"];
for (let i = 0; i < wards.length; i++) {
  console.log(\`Auditing \${wards[i]}\`);
}

// Modern for...of loop (clean value iteration)
for (const ward of wards) {
  console.log(\`Auditing \${ward}\`);
}
\`\`\``
      }
    ],
    exercise: {
      instruction: 'Write a JavaScript function that evaluates an array of ticket numbers. Return an object summarizing total tickets, resolved count, and pending count.',
      starterCode: `// Write your audit function below
function auditTickets(tickets) {
  // tickets is an array of objects: [{ id: 1, resolved: true }, ...]
}
`,
      hints: [
        'Initialize let resolvedCount = 0 and let pendingCount = 0.',
        'Use a for...of loop to iterate through each ticket object.',
        'Use strict equality (ticket.resolved === true) to increment counters.',
        'Return an object with total, resolved, and pending properties.'
      ],
      tasks: [
        'Use const or let variables exclusively',
        'Iterate through the array cleanly',
        'Count resolved and pending tickets accurately',
        'Return a structured summary object'
      ],
      solution: `function auditTickets(tickets) {
  let resolvedCount = 0;
  let pendingCount = 0;

  for (const ticket of tickets) {
    if (ticket.resolved === true) {
      resolvedCount++;
    } else {
      pendingCount++;
    }
  }

  return {
    total: tickets.length,
    resolved: resolvedCount,
    pending: pendingCount
  };
}`,
      solutionExplanation: 'This solution uses clean block-scoped variables and for...of iteration. It avoids type coercion bugs by explicitly checking boolean equality and returns a predictable data summary object.'
    },
    quiz: [
      {
        question: 'Why does "console.log(ticketA === ticketB)" return false when ticketA = { id: 1 } and ticketB = { id: 1 }?',
        options: [
          'JavaScript cannot compare objects.',
          'Objects are compared by memory reference (Heap address), not by structural value. Since they are two distinct objects in memory, their addresses differ.',
          'The curly braces cancel each other out.',
          'The strict equality operator only works on numbers.'
        ],
        correctIndex: 1,
        explanation: 'In JavaScript, reference types are compared by their memory pointer address on the Heap. Two distinct object literals occupy different memory locations, so === evaluates to false.'
      },
      {
        question: 'Which of the following values is Truthy in a JavaScript conditional evaluation?',
        options: [
          '"" (empty string)',
          '0',
          '[] (empty array)',
          'null'
        ],
        correctIndex: 2,
        explanation: 'In JavaScript, all objects and arrays (even empty ones like [] and {}) are Truthy. Only the 8 falsy primitives (0, "", null, undefined, NaN, false, -0, 0n) evaluate to false.'
      }
    ],
    takeaways: [
      'Default to const for all variables; use let only when reassignment is mandatory; never use var.',
      'Primitives are stored on the Stack and copied by value; reference types live on the Heap and are passed by reference pointer.',
      'Always use strict equality (===) to prevent unexpected type coercion bugs.',
      'Remember that empty arrays [] and empty objects {} are truthy in JavaScript.'
    ],
    caseStudyReference: {
      title: 'State Variables and Conditionals in CRP India',
      description: 'Observe how the CRP India frontend defines complaint filters, status checks, and data types in React state hooks.',
      files: [
        'reference-projects/CRP-India/frontend/src/pages/Dashboard.jsx',
        'reference-projects/CRP-India/backend/models/Complaint.js'
      ]
    }
  },

  'javascript-functions-and-scope': {
    id: 'lesson-5-2',
    slug: 'javascript-functions-and-scope',
    courseId: 'course-5',
    courseSlug: 'javascript-fundamentals',
    courseTitle: 'Course 5: JavaScript Fundamentals',
    title: 'Functions, Parameters, Return Values & Scope',
    category: 'Programming',
    estimatedTime: '45 min read & practice',
    objectives: [
      'Master function declarations, function expressions, and modern arrow functions.',
      'Implement parameters, default argument values, and rest parameters (...args).',
      'Understand return values and why unreturned functions evaluate to undefined.',
      'Master the JavaScript Scope Chain: Global Scope, Function Scope, and Block Scope.',
      'Understand Lexical Scoping and how Closures preserve access to outer variables.'
    ],
    sections: [
      {
        heading: 'Functions: The Building Blocks of Reusable Logic',
        content: `A function is a reusable subprogram designed to perform a specific task. Functions accept inputs (**parameters**), perform operations, and yield an output (**return value**).

### The Three Ways to Define Functions in JavaScript:

1. **Function Declaration (Hoisted):**
   \`\`\`javascript
   function calculateSLA(priority) {
     return priority === "urgent" ? 24 : 72; // Returns hours
   }
   \`\`\`
   *Feature:* Hoisted to the top of its scope, meaning you can call \`calculateSLA("urgent")\` *before* the line where it is written.

2. **Function Expression (Stored in a Variable):**
   \`\`\`javascript
   const calculateSLA = function(priority) {
     return priority === "urgent" ? 24 : 72;
   };
   \`\`\`
   *Feature:* Not hoisted; cannot be invoked before its declaration line.

3. **Arrow Function (ES6 Standard):**
   \`\`\`javascript
   const calculateSLA = (priority) => {
     return priority === "urgent" ? 24 : 72;
   };

   // Concise one-line implicit return syntax
   const calculateSLAConcise = (priority) => priority === "urgent" ? 24 : 72;
   \`\`\`
   *Feature:* Compact syntax and lexical \`this\` binding (crucial in modern React development).`
      },
      {
        heading: 'Parameters, Default Values, and Rest Parameters',
        content: `### Parameters vs. Arguments:
* **Parameters:** The variable names declared in the function definition signature (\`function logTicket(id, department)\`).
* **Arguments:** The actual values passed into the function when calling it (\`logTicket(4092, "Public Works")\`).

### Default Parameters:
Provide robust fallbacks if an argument is omitted or \`undefined\`:
\`\`\`javascript
function createGrievance(title, department = "General Administration", priority = "medium") {
  return { title, department, priority, createdAt: new Date() };
}

console.log(createGrievance("Pothole on Ring Road"));
// Department defaults to "General Administration", priority to "medium"
\`\`\`

### Rest Parameters (\`...rest\`):
Captures any number of trailing arguments into a standard JavaScript array:
\`\`\`javascript
function calculateAverageResolutionTime(...timesInHours) {
  if (timesInHours.length === 0) return 0;
  const total = timesInHours.reduce((sum, current) => sum + current, 0);
  return total / timesInHours.length;
}

console.log(calculateAverageResolutionTime(12, 24, 48, 16)); // 25
\`\`\``
      },
      {
        heading: 'The Scope Hierarchy: Global, Function, and Block Scope',
        content: `**Scope** determines where variables are accessible and where they are hidden and protected from unauthorized modification.

\`\`\`
  +-------------------------------------------------------------+
  | GLOBAL SCOPE (Accessible everywhere across entire script)    |
  | const appVersion = "2.4.0";                                 |
  |                                                             |
  |  +-------------------------------------------------------+  |
  |  | FUNCTION SCOPE (Inside function body)                 |  |
  |  | function processComplaint() {                         |  |
  |  |   const officerName = "Er. Verma";                    |  |
  |  |                                                       |  |
  |  |   +-------------------------------------------------+ |  |
  |  |   | BLOCK SCOPE (Inside if/for/while {})            | |  |
  |  |   | if (status === "resolved") {                    | |  |
  |  |   |   const completionStamp = "2026-10-28";         | |  |
  |  |   | }                                               | |  |
  |  |   +-------------------------------------------------+ |  |
  |  +-------------------------------------------------------+  |
  +-------------------------------------------------------------+
\`\`\`

### 1. Global Scope:
Variables declared outside any function or block. Visible everywhere. Polluting the global scope causes naming collisions and hard-to-diagnose bugs.

### 2. Function Scope:
Variables declared with \`const\`, \`let\`, or \`var\` inside a function are completely private to that function. Outer code cannot access them.

### 3. Block Scope:
Variables declared with \`const\` and \`let\` inside any pair of curly braces \`{}\` (like an \`if\` condition or \`for\` loop) cannot be accessed outside that block!`
      },
      {
        heading: 'Closures: How Functions Retain Memory',
        content: `A **Closure** is the combination of a function bundled together with references to its surrounding lexical environment. In simple terms: **a closure allows an inner function to remember and access variables from an outer function, even after the outer function has finished executing!**

\`\`\`javascript
function createCounter(initialCount = 0) {
  let count = initialCount; // Encapsulated private variable

  return {
    increment: () => {
      count++;
      return count;
    },
    getCount: () => count
  };
}

const wardCounter = createCounter(100);
console.log(wardCounter.increment()); // 101
console.log(wardCounter.increment()); // 102
console.log(wardCounter.getCount());  // 102
// count is completely private and cannot be tampered with directly!
\`\`\`
Closures power data privacy, factory functions, and React hooks like \`useState\`!`
      }
    ],
    exercise: {
      instruction: 'Create a closure-based ticket ID generator function called createTicketGenerator(prefix). It should return a function that generates auto-incrementing ticket IDs (e.g., "CRP-1", "CRP-2").',
      starterCode: `// Write your closure factory function below
function createTicketGenerator(prefix) {
  // Return an inner function that increments a private counter
}
`,
      hints: [
        'Declare let counter = 0 inside createTicketGenerator.',
        'Return an inner function (or arrow function).',
        'Inside the returned function, increment counter and return `${prefix}-${counter}`.'
      ],
      tasks: [
        'Initialize private counter inside outer function',
        'Return an inner function that accesses prefix and counter',
        'Auto-increment counter on each call',
        'Return formatted string identifier'
      ],
      solution: `function createTicketGenerator(prefix) {
  let counter = 0;

  return function() {
    counter++;
    return \`\${prefix}-\${counter}\`;
  };
}`,
      solutionExplanation: 'This demonstrates a classic JavaScript closure. The inner returned function maintains a permanent reference to the prefix parameter and the private counter variable in its lexical scope, incrementing it with each invocation without polluting the global scope.'
    },
    quiz: [
      {
        question: 'What is a JavaScript Closure?',
        options: [
          'A method used to close the browser window via script.',
          'An inner function that retains access to variables from its outer enclosing lexical scope, even after the outer function has returned.',
          'A syntax error that occurs when a curly brace is missing.',
          'A special CSS selector for closed elements.'
        ],
        correctIndex: 1,
        explanation: 'A closure occurs when an inner function remembers its outer lexical environment, preserving access to private variables across subsequent calls.'
      },
      {
        question: 'What does a JavaScript function return if it executes without reaching an explicit "return" statement?',
        options: [
          'null',
          '0',
          'undefined',
          'false'
        ],
        correctIndex: 2,
        explanation: 'By default, any JavaScript function that terminates without an explicit return statement returns undefined.'
      }
    ],
    takeaways: [
      'Arrow functions provide concise syntax and lexical this binding, making them standard in modern frontends.',
      'Default parameters provide fallback values when arguments are omitted.',
      'const and let are strictly block-scoped, preventing accidental leakage outside curly braces.',
      'Closures allow functions to encapsulate private state and power modern React patterns.'
    ],
    caseStudyReference: {
      title: 'Controller Functions & Middleware Scopes in CRP India',
      description: 'Examine how Express controller functions and custom middleware in CRP India encapsulate request handling and return formatted JSON responses.',
      files: [
        'reference-projects/CRP-India/backend/controllers/complaintController.js',
        'reference-projects/CRP-India/backend/middleware/auth.js'
      ]
    }
  }
};
