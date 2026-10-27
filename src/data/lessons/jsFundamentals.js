/**
 * Dev-root Course 5: JavaScript Fundamentals - Deep Learning Curriculum
 * Comprehensive lessons covering variables, types, control flow, functions, and scope.
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
    estimatedTime: '35 min read & practice',
    objectives: [
      'Master modern variable declarations: const vs let, and why var is obsolete.',
      'Understand JavaScript primitive types (string, number, boolean, null, undefined, symbol, bigint) vs reference types (objects, arrays).',
      'Master strict equality (===) vs loose equality (==) and understand type coercion.',
      'Implement branching control flow with if/else if/else and switch statements.',
      'Control repetitive execution using for loops, while loops, and array iteration.'
    ],
    sections: [
      {
        heading: 'Why JavaScript Powers the Web',
        content: `While HTML provides structure and CSS provides presentation, **JavaScript is the programming language that breathes life into the web**. It is the only programming language natively supported by all modern web browsers without plugins.

With modern JavaScript (ES6+), you can:
* Respond to user clicks, typing, and gestures.
* Validate form input before sending data across the network.
* Send asynchronous requests to backend APIs and update the page without refreshing.
* Build complete full-stack web applications using Node.js on the server.`
      },
      {
        heading: 'Variable Declarations: const vs. let vs. var',
        content: `A variable is a named storage container for data in computer memory:

### 1. \`const\` (Constant - Default Choice)
Used for variables whose identifier should not be reassigned:
\`\`\`javascript
const portalName = "CRP India";
const maxRetries = 3;
// portalName = "Other"; // TypeError: Assignment to constant variable!
\`\`\`
*Rule of Thumb:* **Always default to \`const\`**. It prevents accidental reassignment bugs and signals intent to other engineers. Note that properties of a \`const\` object or array can still be mutated (\`const user = {}; user.name = "Anita";\` is completely valid).

### 2. \`let\` (Reassignable Variable)
Used when a variable\'s value will legitimately change over time (such as loop counters or state toggles):
\`\`\`javascript
let activeComplaintsCount = 0;
activeComplaintsCount = activeComplaintsCount + 1; // Valid reassignment
\`\`\`
Both \`const\` and \`let\` are **block-scoped** (trapped within the nearest pair of curly braces \`{}\`) and enter the Temporal Dead Zone if referenced before declaration.

### 3. \`var\` (Legacy - Never Use in Modern Code)
The original 1995 variable declaration. It is function-scoped (not block-scoped), hoists with an initial value of \`undefined\`, and creates silent bugs in loops and conditionals. Avoid in modern code.`
      },
      {
        heading: 'Data Types: Primitives vs. Reference Objects',
        content: `JavaScript values are divided into two fundamental categories:

### Primitive Types (Stored directly by value in memory, immutable):
1. **String:** Text data enclosed in quotes: \`"Citizen"\`, \`'Report'\`, or template literals \`\`Complaint #\${id}\`\`.
2. **Number:** Double-precision 64-bit float handling integers and decimals: \`42\`, \`3.14159\`, \`-10\`.
3. **Boolean:** Logical truth values: \`true\` or \`false\`.
4. **null:** Intentional absence of any object value.
5. **undefined:** Uninitialized variable that has been declared but not assigned a value.
6. **Symbol & BigInt:** Unique identifiers and arbitrary-precision integers.

### Reference Types (Stored by reference in the memory heap):
* **Objects (\`{ key: value }\`):** Collections of named properties.
* **Arrays (\`[1, 2, 3]\`):** Ordered, zero-indexed lists of items.
* **Functions:** Executable blocks of code.`
      },
      {
        heading: 'Strict Equality (===) vs. Loose Equality (==)',
        content: `JavaScript features two equality comparison operators:

* **Loose Equality (\`==\`):** Attempts to perform automatic **type coercion** before comparing. This produces notorious, counter-intuitive bugs:
  \`\`\`javascript
  0 == false;       // true (coerces false to 0!)
  "" == 0;          // true (coerces empty string to 0!)
  null == undefined;// true
  \`\`\`
* **Strict Equality (\`===\`):** Compares **both value and data type** without coercion:
  \`\`\`javascript
  0 === false;        // false (Number vs Boolean)
  "" === 0;           // false (String vs Number)
  "42" === 42;        // false (String vs Number)
  42 === 42;          // true
  \`\`\`

**Golden Rule:** Always use \`===\` (strict equality) and \`!==\` (strict inequality). Never use \`==\` or \`!=\`.`
      },
      {
        heading: 'Control Flow: Conditionals and Loops',
        content: `\`\`\`javascript
// Branching Logic
const priority = "high";

if (priority === "emergency") {
  notifyImmediateSquad();
} else if (priority === "high") {
  assignSupervisingOfficer();
} else {
  queueStandardQueue();
}

// Looping through collections
const departments = ["Sanitation", "Water", "Roads"];

for (let i = 0; i < departments.length; i++) {
  console.log(\`Department #\${i + 1}: \${departments[i]}\`);
}
\`\`\``
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using == instead of ===, resulting in unexpected type coercion bugs.',
        whyItHappens: 'Typing two equals signs feels more natural from algebra.',
        howToFix: 'Always use === for comparisons. It checks both type and value.'
      },
      {
        mistake: 'Using var for variables and experiencing hoisting bugs.',
        whyItHappens: 'Relying on legacy JavaScript tutorials.',
        howToFix: 'Use const by default. Use let only when reassignment is required.'
      },
      {
        mistake: 'Confusing null with undefined.',
        whyItHappens: 'Both represent falsy empty values.',
        howToFix: 'undefined means a variable has not been given a value yet. null means a developer explicitly set it to empty.'
      }
    ],
    guidedExercise: {
      title: 'Implement Grievance Priority Filtering Logic',
      difficulty: 'Beginner',
      instructions: 'Write a JavaScript function that evaluates an array of grievance complaint objects and categorizes them based on their urgency level and resolution status using strict equality.',
      starterCode: `const complaints = [
  { id: 101, dept: "Sanitation", priority: "high", resolved: false },
  { id: 102, dept: "Roads", priority: "low", resolved: true },
  { id: 103, dept: "Water", priority: "emergency", resolved: false }
];

// TODO: Count how many complaints are unresolved emergencies or high priority`,
      tasks: [
        'Iterate through the complaints array using a loop.',
        'Use strict equality (===) to check if resolved is false.',
        'Check if priority is "emergency" or "high".',
        'Increment an unresolvedUrgentCount counter and log the result.'
      ],
      hints: [
        'Use let for the counter so it can be incremented.',
        'Combine logical AND (&&) with logical OR (||): !item.resolved && (item.priority === "emergency" || item.priority === "high").'
      ],
      solution: `const complaints = [
  { id: 101, dept: "Sanitation", priority: "high", resolved: false },
  { id: 102, dept: "Roads", priority: "low", resolved: true },
  { id: 103, dept: "Water", priority: "emergency", resolved: false }
];

let unresolvedUrgentCount = 0;

for (let i = 0; i < complaints.length; i++) {
  const item = complaints[i];
  if (item.resolved === false && (item.priority === "emergency" || item.priority === "high")) {
    unresolvedUrgentCount++;
  }
}

console.log("Unresolved urgent grievances:", unresolvedUrgentCount); // 2`,
      solutionExplanation: 'Using let for the mutable counter and strict equality checks avoids coercion bugs and guarantees accurate computational counting.'
    },
    quiz: [
      {
        question: 'What is the primary difference between "const" and "let" in modern JavaScript?',
        options: [
          'const variables are stored on the server, while let variables are stored in the browser.',
          'const identifiers cannot be reassigned after declaration, whereas let variables can be reassigned.',
          'let can only store numbers, while const can only store strings.',
          'const is obsolete and replaced by var.'
        ],
        correctIndex: 1,
        explanation: 'const creates an immutable binding that prevents variable identifier reassignment. let permits reassignment.'
      },
      {
        question: 'What will the expression "0 === false" evaluate to in JavaScript?',
        options: [
          'true',
          'false',
          'undefined',
          'NaN'
        ],
        correctIndex: 1,
        explanation: 'Strict equality (===) compares both value and type without coercion. 0 is a Number and false is a Boolean, so they are not strictly equal (evaluates to false).'
      },
      {
        question: 'Which of the following values is considered a primitive type in JavaScript?',
        options: [
          'Array',
          'Object',
          'String',
          'Function'
        ],
        correctIndex: 2,
        explanation: 'Strings, numbers, booleans, null, undefined, symbols, and bigints are primitive values in JavaScript. Arrays, objects, and functions are reference types.'
      }
    ],
    takeaways: [
      'Default to const for all variable declarations; use let only when reassignment is needed; avoid var.',
      'Primitives (strings, numbers, booleans, null, undefined) are stored by value; objects and arrays are stored by reference.',
      'Always use strict equality (===) and strict inequality (!==) to avoid hidden type coercion bugs.',
      'Control flow structures (if/else, switch, for loops) dictate conditional logic and repetition.',
      'Understanding data types is essential for debugging API responses and state management.'
    ],
    caseStudyReference: {
      title: 'Grievance Filtering & Conditional Status in CRP India',
      description: 'Observe how CRP India filters complaints by status and urgency in the dashboard using array methods and strict equality comparisons.',
      files: [
        'reference-projects/CRP-India/frontend/src/pages/CitizenDashboard.jsx',
        'reference-projects/CRP-India/backend/src/controllers/grievanceController.js'
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
    estimatedTime: '40 min read & practice',
    objectives: [
      'Understand functions as reusable computational building blocks: parameters, arguments, and return values.',
      'Distinguish function declarations, function expressions, and modern ES6 arrow functions.',
      'Master lexical scope: global scope, function scope, block scope, and the scope chain.',
      'Understand closures and how inner functions retain access to outer variables.',
      'Avoid variable shadowing and understand the Temporal Dead Zone.'
    ],
    sections: [
      {
        heading: 'Functions: The Engines of Reusability',
        content: `A **function** is an isolated block of reusable code designed to perform a specific computational task. Instead of copying and pasting the same 15 lines of grievance validation code across multiple files, you encapsulate that logic inside a single function and invoke it whenever needed.

### Anatomy of a Function:
\`\`\`javascript
// Parameter: the variable placeholder declared in the function definition
function calculateEscalationDeadline(priority, filingDate) {
  if (priority === "emergency") {
    return filingDate + 24 * 60 * 60 * 1000; // 24 hours in ms
  }
  return filingDate + 7 * 24 * 60 * 60 * 1000; // 7 days in ms
}

// Argument: the actual concrete value passed when calling the function
const deadline = calculateEscalationDeadline("emergency", Date.now());
\`\`\`

* **Parameters:** Variables listed in the function definition.
* **Arguments:** The real values passed into the function when invoked.
* **\`return\` statement:** Passes a computed result back to the caller and terminates function execution immediately. If a function does not specify a \`return\` statement, it implicitly returns \`undefined\`.`
      },
      {
        heading: 'Function Syntax: Declarations vs. Arrow Functions',
        content: `Modern JavaScript provides multiple ways to declare functions:

### 1. Function Declaration (Hoisted)
\`\`\`javascript
function formatComplaintId(year, sequence) {
  return \`CRP-\${year}-\${String(sequence).padStart(5, '0')}\`;
}
\`\`\`
*Characteristics:* Can be called *before* its line of declaration in the code because declarations are hoisted to the top of their scope by the JavaScript engine.

### 2. Arrow Functions (ES6+ Standard)
\`\`\`javascript
const formatComplaintId = (year, sequence) => {
  return \`CRP-\${year}-\${String(sequence).padStart(5, '0')}\`;
};

// Concise syntax with implicit return (when body is a single expression):
const double = (n) => n * 2;
\`\`\`
*Characteristics:* Concise syntax, does not bind its own \`this\` keyword (inherits \`this\` lexically from enclosing scope), ideal for array callbacks (\`.map(item => item.id)\`).`
      },
      {
        heading: 'Lexical Scope & The Scope Chain',
        content: `**Scope** dictates where variables are accessible in your code. JavaScript uses **Lexical Scoping**: variable accessibility is determined by where variables are physically written in the source code:

1. **Global Scope:** Variables declared outside any function or block are accessible everywhere. Use sparingly to avoid polluting the global namespace.
2. **Function Scope:** Variables declared with \`var\`, \`let\`, or \`const\` inside a function are accessible only within that function.
3. **Block Scope (\`let\` and \`const\`):** Variables declared inside a block (\`if\`, \`for\`, \`while\`) bounded by curly braces \`{}\` exist only within that block.

\`\`\`javascript
const globalPortal = "CRP India"; // Global scope

function processGrievance() {
  const officer = "Vikram"; // Function scope

  if (true) {
    const trackingCode = "CRP-99"; // Block scope
    console.log(trackingCode); // Accessible
    console.log(officer);      // Accessible (looks up scope chain)
  }

  // console.log(trackingCode); // ReferenceError: trackingCode is not defined!
}
\`\`\`

### The Scope Chain:
When JavaScript resolves a variable, it searches the immediate local scope first. If not found, it steps up to the parent scope, continuing outward until it reaches the Global scope. If still not found, it throws a \`ReferenceError\`.`
      },
      {
        heading: 'Closures: Retaining Outer Variables',
        content: `A **closure** is a function that remembers and retains access to its lexical scope even when the function is executed outside that lexical scope.

\`\`\`javascript
function createGrievanceCounter(department) {
  let count = 0; // Private variable trapped inside closure

  return function() {
    count++;
    return \`\${department} complaint #\${count}\`;
  };
}

const sanitationCounter = createGrievanceCounter("Sanitation");
console.log(sanitationCounter()); // "Sanitation complaint #1"
console.log(sanitationCounter()); // "Sanitation complaint #2"
\`\`\`
Closures enable data privacy and state encapsulation, and form the foundational basis for React Hooks like \`useState\`.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Forgetting the return statement in a function and getting undefined.',
        whyItHappens: 'Assuming the last calculated expression in a function body is returned automatically.',
        howToFix: 'In multi-line functions, explicitly write return myResult; otherwise the function returns undefined.'
      },
      {
        mistake: 'Variable shadowing: declaring a parameter or variable with the same name as an outer variable.',
        whyItHappens: 'Reusing common names like id or data without realizing it hides the outer variable.',
        howToFix: 'Use specific, descriptive variable names (e.g. complaintId, userId) to avoid accidental shadowing.'
      },
      {
        mistake: 'Trying to access block-scoped variables outside their { } curly braces.',
        whyItHappens: 'Assuming let and const behave like legacy var.',
        howToFix: 'Declare variables in the outer scope if you need to read their values after a loop or if-statement finishes.'
      }
    ],
    guidedExercise: {
      title: 'Build a Pure Status Formatting Helper Function',
      difficulty: 'Beginner',
      instructions: 'Write a reusable helper function formatGrievanceStatus that accepts a status string and an optional isUrgent boolean flag, returning an accessible badge label string.',
      starterCode: `// TODO: Define formatGrievanceStatus(status, isUrgent = false)
// If isUrgent is true and status === 'pending', return 'URGENT: Pending Action'
// Otherwise return capitalized status string like 'Status: Resolved'`,
      tasks: [
        'Define formatGrievanceStatus using ES6 arrow function syntax.',
        'Provide a default parameter for isUrgent (defaulting to false).',
        'Handle the urgent pending condition with a clear return string.',
        'Return formatted strings and test with multiple arguments.'
      ],
      hints: [
        'Default parameters are written in the signature: (status, isUrgent = false).',
        'Use template literals for easy formatting: `Status: ${status}`.'
      ],
      solution: `const formatGrievanceStatus = (status, isUrgent = false) => {
  if (!status) {
    return "Status: Unknown";
  }

  if (isUrgent && status.toLowerCase() === "pending") {
    return "URGENT: Action Required";
  }

  const formatted = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  return \`Status: \${formatted}\`;
};

console.log(formatGrievanceStatus("pending", true));  // "URGENT: Action Required"
console.log(formatGrievanceStatus("resolved"));        // "Status: Resolved"
console.log(formatGrievanceStatus("IN_PROGRESS"));     // "Status: In_progress"`,
      solutionExplanation: 'This function encapsulates status formatting logic cleanly, uses default parameters for flexibility, and guarantees predictable return values without modifying external state.'
    },
    quiz: [
      {
        question: 'What is the default return value of a JavaScript function that does not include an explicit "return" statement?',
        options: [
          '0',
          'null',
          'undefined',
          'false'
        ],
        correctIndex: 2,
        explanation: 'Any JavaScript function that completes execution without reaching an explicit return statement automatically evaluates to undefined.'
      },
      {
        question: 'What is a "closure" in JavaScript?',
        options: [
          'A method for shutting down a web browser window.',
          'A function that retains access to its lexical parent scope even when executed outside that scope.',
          'A syntax error caused by missing curly braces.',
          'An encrypted network connection.'
        ],
        correctIndex: 1,
        explanation: 'A closure is the combination of a function and the lexical environment within which that function was declared, enabling persistent private state.'
      },
      {
        question: 'What happens if you attempt to access a block-scoped variable (declared with "let" inside an "if" block) outside of that block?',
        options: [
          'It returns null.',
          'JavaScript throws a ReferenceError.',
          'It automatically converts to a global variable.',
          'It prints [Object object].'
        ],
        correctIndex: 1,
        explanation: 'let and const variables are strictly block-scoped and cease to exist outside their enclosing curly braces; accessing them outside throws a ReferenceError.'
      }
    ],
    takeaways: [
      'Functions encapsulate reusable logic with parameters, arguments, and return values.',
      'Prefer modern ES6 arrow functions for concise syntax and lexical this binding.',
      'Lexical scope searches from the local block outward through the scope chain to global scope.',
      'Closures allow functions to retain private state from their enclosing scope.',
      'Avoid variable shadowing by using clear, distinct variable identifiers.'
    ],
    caseStudyReference: {
      title: 'Controller Middleware Functions in CRP India',
      description: 'Study how controller functions in CRP India receive req, res, and next parameters, handle asynchronous database queries, and return JSON responses.',
      files: [
        'reference-projects/CRP-India/backend/src/controllers/grievanceController.js',
        'reference-projects/CRP-India/backend/src/middleware/authMiddleware.js'
      ]
    }
  }
};
