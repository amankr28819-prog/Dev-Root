/**
 * Dev-Root Phase 6: Technical Interview Preparation Questions
 * Curated full-stack technical interview questions across conceptual reasoning,
 * code output prediction, real-world debugging, and system design prompts.
 */

export const INTERVIEW_QUESTIONS = [
  {
    id: 'iq-01-event-loop',
    category: 'JavaScript',
    type: 'output_prediction',
    title: 'Event Loop & Task Priority Execution Order',
    question: `What is the exact console output of the following code snippet? Explain the sequence in terms of the Call Stack, Microtask Queue, and Macrotask Queue.

\`\`\`javascript
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
}).then(() => {
  console.log('4');
});

console.log('5');
\`\`\``,
    hint: 'Remember that microtasks (Promises) are drained completely before the event loop picks the next macrotask (setTimeout).',
    modelAnswer: `### Expected Output:
\`\`\`
1
5
3
4
2
\`\`\`

### Step-by-Step Execution Breakdown:
1. **Synchronous Execution:**
   - \`console.log('1')\` executes immediately on the Call Stack. -> Prints **1**.
   - \`setTimeout(..., 0)\` registers a macrotask in the browser/Node timer system.
   - \`Promise.resolve().then(...)\` enqueues the first \`.then\` callback into the **Microtask Queue**.
   - \`console.log('5')\` executes synchronously on the Call Stack. -> Prints **5**.
2. **Draining the Microtask Queue:**
   - The Call Stack is now empty.
   - The Event Loop checks the **Microtask Queue** first (higher priority than macrotasks).
   - Executes \`console.log('3')\` -> Prints **3**, and enqueues the chained \`.then\` callback.
   - Executes the second \`.then\` callback: \`console.log('4')\` -> Prints **4**.
3. **Processing the Macrotask Queue:**
   - The Microtask Queue is now empty.
   - The Event Loop dequeues the first task from the **Macrotask Queue**: the \`setTimeout\` callback.
   - Executes \`console.log('2')\` -> Prints **2**.`
  },
  {
    id: 'iq-02-closures',
    category: 'JavaScript',
    type: 'conceptual',
    title: 'Explain Closures, Memory Leaks, and Practical Use Cases',
    question: `What is a closure in JavaScript? How does the JavaScript engine retain outer variable references after an outer function has returned? Mention one practical design pattern that uses closures and one scenario where closures can cause unintended memory leaks.`,
    hint: 'Think about lexical scoping, function factories, private variables, and forgotten event listeners.',
    modelAnswer: `### What is a Closure?
A **closure** is the combination of a function bundled together with references to its surrounding **lexical environment** (its outer scope). In JavaScript, every inner function has access to the variables of its enclosing outer function, even after the outer function has completed execution and returned.

### How the Engine Retains Outer Scope:
When an outer function executes, the JavaScript engine allocates an **Environment Record** on the heap. If an inner function retains a reference to any variable in that environment, the garbage collector preserves the Environment Record in memory rather than reclaiming it.

### Practical Use Case: Data Encapsulation (Module Pattern):
\`\`\`javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private variable!

  return {
    deposit: (amount) => { balance += amount; return balance; },
    getBalance: () => balance
  };
}
const account = createBankAccount(1000);
account.deposit(500); // 1500
console.log(account.balance); // undefined! Cannot be tampered with directly.
\`\`\`

### Memory Leak Risk:
If a closure retains references to large objects (like heavy DOM nodes or large arrays) inside long-lived event listeners or intervals without being cleaned up:
\`\`\`javascript
// Uncleaned event listener traps 'largeDataset' in memory forever:
function attachHandler() {
  const largeDataset = new Array(1000000).fill('data');
  window.addEventListener('resize', () => {
    console.log(largeDataset.length);
  });
}
\`\`\``
  },
  {
    id: 'iq-03-react-vdom',
    category: 'React',
    type: 'conceptual',
    title: 'Virtual DOM, Reconciliation, and Key Prop Mechanics',
    question: `Explain how the React Virtual DOM works. What is the Reconciliation diffing algorithm? Why is using array index as a 'key' prop considered an anti-pattern when rendering dynamic lists?`,
    hint: 'Consider what happens to DOM nodes when list items are deleted or prepended.',
    modelAnswer: `### The Virtual DOM (VDOM):
The Virtual DOM is an in-memory lightweight JavaScript object tree mirroring the actual browser DOM. When state changes in a component:
1. React generates a new Virtual DOM snapshot.
2. React runs the **Reconciliation (Diffing)** algorithm comparing the new VDOM with the previous VDOM.
3. React batches the calculated minimal differences and updates the real browser DOM in a single pass, avoiding expensive layout reflows.

### Why Array Index as Key is Dangerous:
\`keys\` provide a stable identity for React to match elements across renders.
If you use array index (\`key={index}\`) on a list where items can be **reordered, prepended, or deleted**:
\`\`\`
  Original List:       [A (key:0), B (key:1), C (key:2)]
  Delete Item A:       [B (key:0), C (key:1)]
\`\`\`
React sees that \`key: 0\` still exists (now holding B's data). It incorrectly assumes Item A was merely updated rather than deleted, causing input focus bugs, uncontrolled form state leakage, and animation glitches.

**Best Practice:** Always use stable, unique IDs (e.g. \`item.id\` or MongoDB \`_id\`).`
  },
  {
    id: 'iq-04-react-useeffect',
    category: 'React',
    type: 'debugging',
    title: 'Debugging Infinite Loop in useEffect',
    question: `A developer reports that their React component is causing the browser tab to freeze with 100% CPU utilization. Identify the bug in the code below and explain how to fix it:

\`\`\`jsx
function CitizenGrievances() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({ category: 'roads' });

  useEffect(() => {
    fetch(\`/api/v1/grievances?category=\${filter.category}\`)
      .then(res => res.json())
      .then(json => setData(json));
  }, [filter]); // Dependency array

  return <div>{data.length} complaints</div>;
}
\`\`\``,
    hint: 'Look closely at object identity in JavaScript and how React compares dependencies in useEffect.',
    modelAnswer: `### Root Cause:
In JavaScript, objects are compared by **reference (memory address)**, not by value:
\`\`\`javascript
{ category: 'roads' } !== { category: 'roads' } // true! Different references
\`\`\`
If any parent re-render or state update recreates the \`filter\` object, React sees a new memory reference in \`[filter]\`, re-executes \`useEffect\`, calls \`setData(json)\`, which triggers another re-render, creating an **infinite execution loop**!

### Fix 1: Depend on Primitive Properties:
\`\`\`jsx
useEffect(() => {
  fetch(\`/api/v1/grievances?category=\${filter.category}\`)
    .then(res => res.json())
    .then(json => setData(json));
}, [filter.category]); // Strings are compared by VALUE, not reference!
\`\`\`

### Fix 2: Memoize with useMemo:
\`\`\`jsx
const filter = useMemo(() => ({ category: selectedCategory }), [selectedCategory]);
\`\`\``
  },
  {
    id: 'iq-05-node-event-loop',
    category: 'Backend',
    type: 'conceptual',
    title: 'Node.js Non-Blocking I/O vs CPU-Bound Tasks',
    question: `Node.js is single-threaded. How does it handle thousands of concurrent database and file operations without freezing? What happens if you run a heavy CPU-bound task (e.g. image processing or massive Fibonacci calculation) in the main thread? How should CPU-bound tasks be architected?`,
    hint: 'Think about libuv, C++ thread pools, and Worker Threads.',
    modelAnswer: `### How Node.js Handles Concurrent I/O:
Node.js runs single-threaded JavaScript, but delegates asynchronous I/O operations (network sockets, database queries, filesystem reads) to **libuv** and the underlying operating system kernel (epoll on Linux, kqueue on macOS, IOCP on Windows). 
While waiting for a database to return data, Node.js continues processing other incoming HTTP requests. When the data arrives, libuv pushes the callback to the event loop.

### What Happens During CPU-Bound Tasks?
If you execute a heavy CPU calculation (e.g. PBKDF2 cryptography or image resizing) in the main thread:
- The single JavaScript execution thread is blocked.
- The Event Loop cannot process any incoming HTTP requests or callbacks.
- All other concurrent users experience server timeouts (gateway 504s).

### Architectural Solutions for CPU-Bound Work:
1. **Worker Threads (\`node:worker_threads\`):** Spin up parallel OS threads to run intensive JavaScript computations in the background.
2. **Background Job Queues (BullMQ / Redis):** Offload long-running tasks to independent worker services outside the API process.
3. **C++ Native Addons:** Use compiled C/C++ libraries running in separate thread pools.`
  },
  {
    id: 'iq-06-sql-vs-nosql',
    category: 'Databases',
    type: 'conceptual',
    title: 'Relational (PostgreSQL) vs Document (MongoDB) Architecture',
    question: `When designing the database for an enterprise grievance management system, how do you decide between a Relational SQL database (like PostgreSQL) and a NoSQL Document database (like MongoDB)? Compare them in terms of schema flexibility, relational integrity, ACID transactions, and horizontal scaling.`,
    hint: 'Discuss structured tables vs JSON documents, foreign key constraints, and scaling strategies.',
    modelAnswer: `### Comparison Matrix:

| Dimension | PostgreSQL (Relational SQL) | MongoDB (NoSQL Document) |
| :--- | :--- | :--- |
| **Data Model** | Rigid table schemas with rows, columns, and foreign keys. | Flexible BSON/JSON documents nested in collections. |
| **Relational Joins** | Native, highly optimized SQL JOINs across normalized tables. | Aggregation pipelines (\`$lookup\`); prefers denormalized embedding. |
| **ACID Guarantees** | Strong ACID transactions across multiple tables by default. | Single-document ACID; multi-document transactions supported in replica sets. |
| **Scaling Strategy** | Typically scaled vertically (larger CPU/RAM) or read replicas. | Native horizontal sharding across distributed clusters. |

### How to Answer in an Interview:
- **Choose PostgreSQL when:** Data is highly structured, financial transactions require strict ACID guarantees, and complex multi-table relationships (users, departments, budgets, audits) require rigid foreign-key referential integrity.
- **Choose MongoDB when:** Payloads vary significantly across categories (e.g. sanitation complaints have different metadata from building code violations), rapid schema evolution is needed during MVP stages, and documents are naturally read and written as self-contained units.`
  },
  {
    id: 'iq-07-security-cors',
    category: 'Security',
    type: 'debugging',
    title: 'Diagnosing Preflight CORS Errors on Authenticated Endpoints',
    question: `A frontend developer configured a fetch request with \`headers: { 'Authorization': 'Bearer ' + token }\`. The request fails in Chrome with a red CORS error, but succeeds in Postman. Inspect the Express code below, explain why the browser fails, and provide the fix:

\`\`\`javascript
const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  next();
});
\`\`\``,
    hint: 'Look at the preflight OPTIONS request and the missing Access-Control-Allow-Headers.',
    modelAnswer: `### Root Cause:
1. **Preflight OPTIONS Request:** Whenever a request includes custom headers like \`Authorization\` or methods other than simple GET/POST, browsers dispatch an automatic HTTP \`OPTIONS\` preflight request before the actual request.
2. **Missing Allowed Headers:** The Express middleware failed to specify \`Access-Control-Allow-Headers: Authorization, Content-Type\`. The browser rejects the preflight because \`Authorization\` was not explicitly whitelisted!
3. **Handling OPTIONS:** The code does not send an immediate \`200/204\` response for the \`OPTIONS\` request.

### The Fix:
\`\`\`javascript
import cors from 'cors';

app.use(cors({
  origin: 'https://crpindia.gov.in', // Specify exact origin when using credentials
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
\`\`\``
  },
  {
    id: 'iq-08-system-design-rate-limiting',
    category: 'System Design',
    type: 'conceptual',
    title: 'Designing an API Rate Limiter to Prevent Denial of Service',
    question: `How would you design a distributed rate limiter for a public civic grievance API to prevent abuse (e.g. limiting each citizen IP to 10 submissions per 15 minutes)? Compare an in-memory solution against a distributed Redis solution in a horizontally scaled multi-server deployment.`,
    hint: 'Think about what happens when requests hit different server instances behind a load balancer.',
    modelAnswer: `### Why In-Memory Rate Limiting Fails in Production:
In a horizontally scaled system with 3 API instances behind a load balancer:
\`\`\`
   Instance 1 (RAM memory store): 4 requests recorded
   Instance 2 (RAM memory store): 4 requests recorded
   Instance 3 (RAM memory store): 4 requests recorded
\`\`\`
An attacker can submit **12 requests** (exceeding the 10 limit) because each server instance maintains an isolated local memory store unaware of the other instances!

### The Production Solution: Shared Redis Sliding Window Counter:
1. **Centralized In-Memory Store:** All server instances communicate with a shared Redis cluster.
2. **Algorithm (Sliding Window Log or Token Bucket):**
   - Key: \`rate_limit:grievance_submit:<client_ip>\`
   - Store timestamps of requests in a Redis Sorted Set (\`ZSET\`).
   - Remove timestamps older than \`now - 15 minutes\` using \`ZREMRANGEBYSCORE\`.
   - Count remaining elements with \`ZCARD\`.
   - If count < 10, add current timestamp with \`ZADD\`, set key expiration (15m), and allow request.
   - If count >= 10, return **HTTP 429 Too Many Requests** with header \`Retry-After: 900\`.`
  }
];
