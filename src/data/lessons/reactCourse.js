/**
 * Dev-root Course 9: React from Zero - Deep Learning Curriculum (Phase 4 4x Depth Standard)
 * Comprehensive lessons covering Declarative UI, JSX syntax, Props data flow,
 * useState state management, and useEffect lifecycle side-effects.
 */

export const REACT_LESSONS = {
  'react-components-and-jsx': {
    id: 'lesson-9-1',
    slug: 'react-components-and-jsx',
    courseId: 'course-9',
    courseSlug: 'react-foundations',
    courseTitle: 'Course 9: React from Zero',
    title: 'Components, JSX & Props Data Flow',
    category: 'Frontend',
    estimatedTime: '45 min read & practice',
    objectives: [
      'Understand Declarative UI vs Imperative DOM manipulation and why React was invented.',
      'Explain the Virtual DOM, Reconciliation, and React 18 Fibers.',
      'Master JavaScript XML (JSX) syntax, interpolation with curly braces, and className rules.',
      'Construct pure Functional Components and pass immutable read-only Props.',
      'Utilize the special props.children property for flexible layout composition.'
    ],
    sections: [
      {
        heading: 'The Declarative Paradigm: Why React Dominates Frontend Development',
        content: `Before component-driven libraries like React, developers built user interfaces **imperatively** using vanilla DOM manipulation (\`document.createElement\`, \`appendChild\`, \`classList.add\`).

### The Imperative Nightmare:
In an imperative application with 5 filters, a search box, and pagination, every user action requires dozens of manual DOM mutations. If a user deletes a ticket, code must manually find the table row, decrement the counter badge, update pagination numbers, and re-calculate the total cost. State easily becomes desynchronized from the visual UI, leading to "ghost" bugs.

### The React Declarative Solution:
In React, you do **not** touch the live DOM manually. Instead, you declare:
> *"Given this data state \`S\`, this is what the UI should look like."*

When state updates, React automatically recalculates what changed and surgically patches the minimum necessary pixels on screen.

\`\`\`
   State (Data)  =================>  React Component  =================>  Rendered UI
   { status: "Pending" }             <ComplaintCard />                    [ Orange Badge ]
\`\`\``
      },
      {
        heading: 'How React Works: The Virtual DOM and Reconciliation',
        content: `Directly manipulating the real browser DOM is computationally expensive because every insertion triggers layout reflows and style recalculations.

React introduces an in-memory abstraction called the **Virtual DOM (VDOM)**:
1. **Render:** When a component's state changes, React executes the component function and produces a new Virtual DOM tree (a lightweight JavaScript object tree).
2. **Diffing (Reconciliation):** React compares the new Virtual DOM tree against the previous Virtual DOM snapshot using a fast, heuristic algorithm.
3. **Commit:** React computes the exact, minimal set of mutations and applies them to the real browser DOM in a single batched operation.

\`\`\`
  [New State Triggered]
          |
          v
  [New Virtual DOM Tree] <--- (Diffing Comparison) ---> [Old Virtual DOM Snapshot]
          |
          v
  [Surgical Mutation Batch]  (Only updates the changed <span>, leaves rest of page alone!)
          |
          v
  [Real Browser DOM Updated]
\`\`\``
      },
      {
        heading: 'JSX Demystified: JavaScript XML',
        content: `**JSX** is a syntax extension for JavaScript that looks visually identical to HTML, but possesses the full power of JavaScript.

Browsers cannot execute JSX directly. During the build process (via Vite or Babel), JSX tags are compiled into standard JavaScript function calls:

\`\`\`jsx
// What you write (JSX):
const element = <h1 className="title">Grievance Portal</h1>;

// What the build compiler produces (Pure JavaScript):
const element = React.createElement('h1', { className: 'title' }, 'Grievance Portal');
\`\`\`

### JSX Syntax Rules You Must Know:
1. **Must Return a Single Root Element:** Multiple sibling elements must be wrapped in a parent tag or a **React Fragment** (\`<> ... </>\`).
2. **\`className\` instead of \`class\`:** Because \`class\` is a reserved keyword in JavaScript, HTML classes in JSX are written as \`className\`.
3. **Self-Closing Tags:** All elements without children (including \`<img>\`, \`<input>\`, \`<br>\`) **must be explicitly closed** with a slash (\`<input type="text" />\`).
4. **JavaScript Interpolation with Curly Braces (\`{}\`):** Any valid JavaScript expression (variables, function calls, ternary operators, array maps) can be embedded inside JSX using curly braces:

\`\`\`jsx
function WelcomeBanner({ username, unreadCount }) {
  return (
    <div className="banner">
      <h2>Namaste, {username.toUpperCase()}!</h2>
      <p>You have {unreadCount > 0 ? unreadCount : "no"} pending tickets.</p>
    </div>
  );
}
\`\`\``
      },
      {
        heading: 'Component Composition and Props: Unidirectional Data Flow',
        content: `React applications are constructed like Lego bricks. Big interfaces are decomposed into small, focused, reusable functions called **Components**:

### The Golden Rule of Props:
**Props (short for Properties) are strictly Read-Only (Immutable).** A child component must never modify the props it receives from a parent! Data in React flows strictly downwards (**Unidirectional Data Flow**).

\`\`\`jsx
// Reusable Child Component
function GrievanceBadge({ status }) {
  const isResolved = status === "Resolved";
  return (
    <span className={isResolved ? "badge badge-success" : "badge badge-warning"}>
      {status}
    </span>
  );
}

// Parent Component passing props
function Dashboard() {
  return (
    <section>
      <h3>Ticket #402</h3>
      <GrievanceBadge status="In Progress" />
      <GrievanceBadge status="Resolved" />
    </section>
  );
}
\`\`\`

### The \`children\` Prop for Layout Composition:
React passes any elements nested between a component's opening and closing tags via the special \`children\` prop:
\`\`\`jsx
function CardContainer({ title, children }) {
  return (
    <div className="card-box">
      <h4 className="card-header">{title}</h4>
      <div className="card-body">
        {children} {/* Renders whatever was passed inside! */}
      </div>
    </div>
  );
}
\`\`\``
      }
    ],
    exercise: {
      instruction: 'Create a reusable React component called ComplaintCard that receives props: { id, title, department, status, priority }. Render an article with a header containing the title and an urgent badge if priority === "urgent".',
      starterCode: `// Write your ComplaintCard component below
function ComplaintCard(props) {
  // Destructure props and return JSX
}
`,
      hints: [
        'Destructure { id, title, department, status, priority } from props.',
        'Use <article className="complaint-card"> as root.',
        'Conditionally render <span className="badge-urgent">Urgent</span> using {priority === "urgent" && ...}.',
        'Display id, department, and status inside semantic elements.'
      ],
      tasks: [
        'Destructure props cleanly',
        'Return single root element',
        'Conditionally render priority tag',
        'Use className instead of class'
      ],
      solution: `function ComplaintCard({ id, title, department, status, priority }) {
  return (
    <article className="complaint-card">
      <header className="complaint-header">
        <span className="complaint-id">#{id}</span>
        <h3>{title}</h3>
        {priority === 'urgent' && (
          <span className="badge-urgent">Urgent</span>
        )}
      </header>
      <div className="complaint-details">
        <p><strong>Department:</strong> {department}</p>
        <p><strong>Status:</strong> {status}</p>
      </div>
    </article>
  );
}`,
      solutionExplanation: 'This component exemplifies React best practices: clean prop destructuring in the parameter signature, conditional rendering with the logical && operator, semantic HTML structure, and standard JSX className attributes.'
    },
    quiz: [
      {
        question: 'What is the primary role of the Virtual DOM in React applications?',
        options: [
          'To store backend database records in browser local storage.',
          'To maintain an in-memory representation of the UI and calculate the minimal diff needed before updating the real browser DOM.',
          'To replace CSS stylesheets with JavaScript objects.',
          'To compile TypeScript directly into C++.'
        ],
        correctIndex: 1,
        explanation: 'The Virtual DOM acts as a lightweight blueprint. When state updates, React diffs the new Virtual DOM against the previous one and batches minimal, surgical updates to the real browser DOM.'
      },
      {
        question: 'Can a React child component directly mutate the props it receives from its parent?',
        options: [
          'Yes, by assigning new values directly to props.propertyName.',
          'No. In React, props are strictly read-only and immutable to guarantee predictable unidirectional data flow.',
          'Only if the component is an arrow function.',
          'Only if the prop is a string.'
        ],
        correctIndex: 1,
        explanation: 'Props are strictly immutable. A component must never modify its own props. If data needs to change over time, it must be managed as State.'
      }
    ],
    takeaways: [
      'React uses a declarative paradigm: you describe the target UI based on state; React updates the DOM.',
      'JSX combines HTML-like markup with the full expressive power of JavaScript expressions.',
      'Props are read-only inputs passed downwards from parents to children in a unidirectional flow.',
      'Use the children prop to build flexible container and modal layout components.'
    ],
    caseStudyReference: {
      title: 'Component Modularization in CRP India',
      description: 'Inspect how the CRP India frontend is broken into small, modular React components like Navbar, Sidebar, StatsCard, and GrievanceTable.',
      files: [
        'reference-projects/CRP-India/frontend/src/components/Navbar.jsx',
        'reference-projects/CRP-India/frontend/src/components/Sidebar.jsx'
      ]
    }
  },

  'react-state-and-lifecycle': {
    id: 'lesson-9-2',
    slug: 'react-state-and-lifecycle',
    courseId: 'course-9',
    courseSlug: 'react-foundations',
    courseTitle: 'Course 9: React from Zero',
    title: 'State Management with useState & Side Effects with useEffect',
    category: 'Frontend',
    estimatedTime: '45 min read & practice',
    objectives: [
      'Understand Component State and how it differs from immutable Props.',
      'Master the useState hook, state setter functions, and functional updater syntax.',
      'Manage complex object and array state immutably using the spread operator (...).',
      'Understand the React component lifecycle and execute side effects with useEffect.',
      'Master the useEffect dependency array to prevent infinite re-render loops and resource leaks.'
    ],
    sections: [
      {
        heading: 'What is State and Why Do We Need Hooks?',
        content: `While **Props** are external parameters passed into a component by its parent, **State** is a component's private, internal memory.

Whenever a user types into an input, toggles a theme switch, or clicks to open a modal, the component's state changes. **When state changes in React, the component automatically re-renders**, evaluating the JSX and updating the screen to reflect the new data.

Before React 16.8, state required verbose ES6 classes. Modern React uses **Hooks**—functions that let functional components hook into state and lifecycle features.`
      },
      {
        heading: 'The useState Hook: Declaring and Updating Local State',
        content: `To declare state in a functional component, import and call \`useState\`:

\`\`\`jsx
import React, { useState } from 'react';

function TicketCounter() {
  // Array destructuring: [currentValue, setterFunction]
  const [ticketCount, setTicketCount] = useState(0);

  function handleIncrement() {
    setTicketCount(ticketCount + 1);
  }

  return (
    <div>
      <p>Total Complaints Logged: {ticketCount}</p>
      <button onClick={handleIncrement}>Register Another</button>
    </div>
  );
}
\`\`\`

### The Functional Updater Syntax (Avoiding Stale State Bugs):
State updates in React are batched and scheduled asynchronously. If you need to update state based on its previous value, **always pass a callback function** to the setter:

\`\`\`jsx
// DANGEROUS: May read stale state during rapid clicks or batching
// setCount(count + 1);

// SAFE PRODUCTION PATTERN: Always receives the guaranteed latest state snapshot
setCount(prevCount => prevCount + 1);
\`\`\``
      },
      {
        heading: 'Immutable Updates on Complex State (Objects & Arrays)',
        content: `In React, **you must never mutate state directly**:

\`\`\`jsx
// CATASTROPHIC BUG: Directly mutating state!
// React checks for reference equality. If the object pointer is unchanged,
// React assumes nothing changed and REFUSES TO RE-RENDER!
// userProfile.ward = 14; // BROKEN!

// CORRECT: Create a new object copy using spread (...)
setUserProfile(prevProfile => ({
  ...prevProfile,
  ward: 14
}));
\`\`\`

### Immutable Array Operations:
* **Adding an item:** Use spread (\`[...prevItems, newItem]\`) instead of \`.push()\`.
* **Removing an item:** Use \`.filter()\` instead of \`.splice()\`.
* **Modifying an item:** Use \`.map()\` to return a new object for the target item:

\`\`\`jsx
// Resolving a ticket immutably inside an array:
setTickets(prevTickets => 
  prevTickets.map(ticket => 
    ticket.id === targetId ? { ...ticket, status: "Resolved" } : ticket
  )
);
\`\`\``
      },
      {
        heading: 'Side Effects and the useEffect Hook',
        content: `A **Side Effect** is any operation that reaches outside the React rendering process to affect the outside world:
* Fetching data from a backend REST API.
* Subscribing to WebSockets or push notifications.
* Manually changing document title or setting timers (\`setInterval\`).

The **\`useEffect\`** hook tells React to run your effect code *after* the component has rendered on screen.

\`\`\`jsx
import React, { useState, useEffect } from 'react';

function GrievanceTracker({ wardId }) {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);

    async function fetchData() {
      try {
        const res = await fetch(\`/api/v1/wards/\${wardId}/complaints\`);
        const data = await res.json();
        if (!isCancelled) {
          setComplaints(data);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Fetch failed", err);
      }
    }

    fetchData();

    // Cleanup function: runs before re-running or when component unmounts
    return () => {
      isCancelled = true;
    };
  }, [wardId]); // Dependency Array: re-run ONLY when wardId changes!

  if (isLoading) return <p>Loading complaints...</p>;

  return (
    <ul>
      {complaints.map(c => <li key={c.id}>{c.title}</li>)}
    </ul>
  );
}
\`\`\`

### The Dependency Array Cheat Sheet:
1. **\`useEffect(fn)\` (No Array):** Runs after **every single render**. (Rarely desirable; causes performance degradation).
2. **\`useEffect(fn, [])\` (Empty Array):** Runs **only once** when the component first mounts to the screen. Perfect for initial data fetching.
3. **\`useEffect(fn, [wardId, status])\` (With Dependencies):** Runs on initial mount, and then re-runs **only if \`wardId\` or \`status\` value changes** between renders.`
      }
    ],
    exercise: {
      instruction: 'Create a ToggleComplaintStatus component with a boolean state isResolved initialized to false. Render a button that flips the boolean on click, and updates document.title to "Status: Resolved" or "Status: Open" inside a useEffect.',
      starterCode: `import React, { useState, useEffect } from 'react';

function ToggleComplaintStatus() {
  // Implement state and effect
}
`,
      hints: [
        'const [isResolved, setIsResolved] = useState(false);',
        'In useEffect(() => { document.title = `Status: ${isResolved ? "Resolved" : "Open"}`; }, [isResolved]);',
        'Return a button with onClick={() => setIsResolved(prev => !prev)}.'
      ],
      tasks: [
        'Initialize boolean state with useState',
        'Toggle state using functional updater syntax',
        'Update document.title inside useEffect',
        'Declare [isResolved] in dependency array'
      ],
      solution: `import React, { useState, useEffect } from 'react';

function ToggleComplaintStatus() {
  const [isResolved, setIsResolved] = useState(false);

  useEffect(() => {
    document.title = \`Status: \${isResolved ? "Resolved" : "Open"}\`;
  }, [isResolved]);

  return (
    <div className="status-toggle-box">
      <p>Current Status: <strong>{isResolved ? "Resolved" : "Open"}</strong></p>
      <button 
        type="button" 
        onClick={() => setIsResolved(prev => !prev)}
      >
        Mark as {isResolved ? "Open" : "Resolved"}
      </button>
    </div>
  );
}`,
      solutionExplanation: 'This demonstrates pure state and effect coordination: useState encapsulates component memory, the functional updater prevents concurrency bugs, and useEffect synchronizes an external side effect (browser tab title) only when the relevant state value changes.'
    },
    quiz: [
      {
        question: 'Why should you always update React state immutably rather than modifying an object property directly (e.g., user.name = "John")?',
        options: [
          'JavaScript throws a syntax error when mutating objects.',
          'React relies on shallow reference equality comparison. Mutating the object keeps the same memory address, so React believes nothing changed and skips re-rendering the UI.',
          'Direct mutation causes memory leaks in the browser.',
          'React state can only store numbers.'
        ],
        correctIndex: 1,
        explanation: 'React checks if prevObject !== newObject. Mutating in-place preserves the same memory reference pointer, preventing React from detecting the change and leaving the screen out-of-sync.'
      },
      {
        question: 'What happens if you omit the dependency array completely from a useEffect hook (e.g., useEffect(() => { ... }))?',
        options: [
          'The effect will never run.',
          'The effect will execute after every single render of the component, which can trigger infinite loops if the effect updates state.',
          'The effect runs only when the user refreshes the browser.',
          'React compiles the effect into a Web Worker.'
        ],
        correctIndex: 1,
        explanation: 'Without a dependency array, useEffect executes on initial mount and after every subsequent re-render. If that effect modifies state, it triggers another render, causing an infinite loop.'
      }
    ],
    takeaways: [
      'State is internal component memory; when state changes, React re-renders the component.',
      'Always update state immutably using the spread operator (...) or functional array methods (.map, .filter).',
      'Use functional state updaters (prev => prev + 1) to avoid race conditions and stale state.',
      'Control side-effects with useEffect and specify exact dependencies to avoid infinite re-render loops.'
    ],
    caseStudyReference: {
      title: 'State & Effect Architecture in CRP India',
      description: 'Review how the Dashboard in CRP India uses useState to track active department filters and useEffect to fetch live complaints on filter changes.',
      files: [
        'reference-projects/CRP-India/frontend/src/pages/Dashboard.jsx',
        'reference-projects/CRP-India/frontend/src/context/AuthContext.jsx'
      ]
    }
  }
};
