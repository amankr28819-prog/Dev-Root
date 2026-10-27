/**
 * Dev-root Lessons Data Definition
 * Contains verified, deep, conceptual lessons starting from absolute zero
 * with interactive quizzes, guided exercises, code examples, and CRP India references.
 */

export const LESSONS = {
  // =========================================================================
  // COURSE 1: UNDERSTANDING THE WEB
  // =========================================================================
  'how-websites-work': {
    id: 'lesson-1-1',
    slug: 'how-websites-work',
    courseSlug: 'web-internet-fundamentals',
    courseTitle: 'Course 1: Understanding the Web',
    title: 'How Websites Work: Clients, Servers & The Web',
    estimatedMinutes: 20,
    summary: 'An accessible, architectural introduction to the dialogue between clients and servers that powers the modern web.',
    objectives: [
      'Understand the fundamental dialogue between the web client (browser) and the web server.',
      'Learn the roles of HTML, CSS, and JavaScript in constructing web pages.',
      'Understand how static assets (images, documents) are served over HTTP.',
      'Identify how real-world applications like CRP India structure client and server code.'
    ],
    sections: [
      {
        heading: '1. The Client-Server Dialogue',
        content: `At its essence, the internet is not a mysterious cloud. It is a global network of physically connected computers communicating using agreed-upon rules called protocols.

When you use the web, two distinct computers participate in an ongoing conversation:

1. **The Client**: The computer, tablet, or smartphone running a web browser (such as Google Chrome, Firefox, or Safari). The client displays information to human eyes and captures user interactions such as clicks, typing, and swipes.
2. **The Server**: A specialized computer connected to the network 24/7 that stores files, application code, and databases. The server waits for incoming requests from clients, processes those requests according to defined rules, and sends back responses.

Think of it like a restaurant:
- You (the client) sit at a table and review the menu.
- You place an order with the kitchen (the server).
- The kitchen prepares your meal and sends it back to your table.
- You do not walk into the kitchen and touch the ingredients yourself.`
      },
      {
        heading: '2. The Client-Server Communication Flow',
        content: `Here is how the client and server exchange data during a typical web request:`,
        diagram: `+-----------------------+                    +------------------------+
|        CLIENT         |   HTTP Request     |         SERVER         |
|  (User's Web Browser) | -----------------> |  (Node.js / Cloud Host)|
|                       |                    |                        |
|  Displays HTML/CSS    |   HTTP Response    |  Executes Logic        |
|  Executes Client JS   | <----------------- |  Queries Database      |
+-----------------------+  (HTML, CSS, JSON) +------------------------+`
      },
      {
        heading: '3. The Three Core Pillars of the Web',
        content: `Every web page you view is assembled from three foundational building blocks that run inside the client browser:

- **HTML (HyperText Markup Language)**: The skeleton. HTML defines the semantic structure of the content: headings, paragraphs, lists, links, forms, and image placements.
- **CSS (Cascading Style Sheets)**: The presentation. CSS controls colors, fonts, spacing, responsive grid layouts, animations, and dark mode themes.
- **JavaScript (JS)**: The brain and nervous system. JavaScript makes pages interactive: validating form inputs before submission, toggling theme modes, updating data without reloading the browser, and communicating with servers in the background.`,
        codeSnippet: `<!-- A simple example of the 3 pillars in harmony -->
<!-- 1. HTML Structure -->
<button id="theme-btn" class="toggle-btn">Switch Theme</button>

/* 2. CSS Styling */
.toggle-btn {
  background-color: #10b981;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

// 3. JavaScript Interactivity
const button = document.getElementById('theme-btn');
button.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});`
      },
      {
        heading: '4. Static Websites vs. Dynamic Web Applications',
        content: `Early websites were primarily **static**: HTML files stored on a server that looked identical for every visitor.

Modern websites like **Dev-root** and **CRP India** are **dynamic Single Page Applications (SPAs)**:
- The initial bundle loads lightweight HTML, CSS, and JavaScript.
- As the user interacts with the interface (such as filtering courses or tracking a complaint), client-side JavaScript sends background network requests using the Fetch API.
- The server responds with raw data, usually in **JSON** format.
- The browser dynamically updates the screen without reloading the entire page.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Assuming the client and server are the same machine.',
        whyItHappens: 'During local development, both client and server run on your laptop via localhost.',
        howToFix: 'Remember that in production, the client runs on millions of separate user devices, while the server runs in a secure cloud datacenter.'
      },
      {
        mistake: 'Thinking HTML can perform arithmetic or communicate with a database.',
        whyItHappens: 'Beginners often look at interactive pages and assume HTML is doing all the work.',
        howToFix: 'HTML is strictly a markup language for structure. Logic, calculation, and networking require JavaScript.'
      }
    ],
    guidedExercise: {
      id: 'ex-1-1',
      title: 'Exercise: Inspecting the Client-Server Dialogue',
      instructions: 'Open your browser Developer Tools to observe the client-server dialogue in action on any website.',
      tasks: [
        'Open any webpage (or this Dev-root page) in Google Chrome or Firefox.',
        'Right-click anywhere on the page and select "Inspect", or press F12 on Windows / Command+Option+I on macOS.',
        'Click on the "Network" tab at the top of Developer Tools.',
        'Reload the webpage (Ctrl+R or F5) and observe the list of files requested by the client from the server.'
      ],
      starterCode: `// Open the Developer Tools Console tab and type:
console.log("Hello from the Client Browser! My browser is:", navigator.userAgent);`,
      language: 'javascript',
      hints: [
        'If the Network tab is empty, refresh the page while the DevTools window remains open.',
        'Notice how the first request is typically for the document (HTML), followed by CSS files, JavaScript bundles, and images.'
      ],
      solution: {
        explanation: 'The Network tab displays every individual HTTP request initiated by your browser client to the server, showing the HTTP status code (such as 200 OK), the file type, and the transfer size.',
        code: `// You should see requests with:
// Status: 200 OK
// Type: document, stylesheet, script, or fetch
// Initiator: browser parser or fetch script`
      }
    },
    quiz: [
      {
        id: 'q-1-1-1',
        question: 'Which of the following best describes the role of the client in web architecture?',
        options: [
          'A computer that permanently stores the central database and credentials.',
          'The device running a web browser that renders HTML/CSS and captures user inputs.',
          'A background process that compiles server-side code into machine binary.',
          'A physical fiber-optic cable connecting two continents.'
        ],
        correctIndex: 1,
        explanation: 'The client is the user device (laptop, phone) running a web browser. It is responsible for rendering the interface and capturing user interactions.'
      },
      {
        id: 'q-1-1-2',
        question: 'Which web technology is responsible for making a webpage interactive and handling button clicks?',
        options: [
          'HTML (HyperText Markup Language)',
          'CSS (Cascading Style Sheets)',
          'JavaScript (JS)',
          'SQL (Structured Query Language)'
        ],
        correctIndex: 2,
        explanation: 'JavaScript provides the logic, interactivity, and event handling on a webpage. HTML provides structure, and CSS provides visual presentation.'
      },
      {
        id: 'q-1-1-3',
        question: 'Why does a modern Single Page Application (SPA) fetch raw JSON data instead of full HTML pages on every click?',
        options: [
          'Because browsers can no longer render HTML.',
          'To update only the necessary parts of the screen quickly without a jarring full-page refresh.',
          'Because JSON automatically encrypts user passwords.',
          'To prevent the server from using any memory.'
        ],
        correctIndex: 1,
        explanation: 'Fetching JSON allows client-side JavaScript to seamlessly update specific sections of the UI, giving a fast, app-like user experience without reloading the entire page.'
      }
    ],
    takeaways: [
      'The web relies on a client-server architecture: clients request resources, and servers respond with them.',
      'HTML provides structure, CSS provides styling, and JavaScript provides dynamic interactivity.',
      'Modern web apps load a single application bundle and fetch data asynchronously in JSON format.',
      'Separating client and server responsibilities ensures security, scalability, and modular maintenance.'
    ],
    caseStudyReference: {
      title: 'How CRP India Applies This Concept',
      description: 'In the CRP India project, the client-server separation is strictly isolated into two root directories: frontend/ (the React + Vite client application) and backend/ (the Node.js + Express server).',
      files: ['reference-projects/CRP-India/frontend/src/main.jsx', 'reference-projects/CRP-India/backend/src/server.js']
    },
    prevLessonSlug: null,
    nextLessonSlug: 'frontend-vs-backend'
  },

  'frontend-vs-backend': {
    id: 'lesson-1-2',
    slug: 'frontend-vs-backend',
    courseSlug: 'web-internet-fundamentals',
    courseTitle: 'Course 1: Understanding the Web',
    title: 'Frontend vs. Backend: Runtimes & Trust Boundaries',
    estimatedMinutes: 25,
    summary: 'Understand the distinct engineering environments, trust boundaries, and technical stacks of frontend and backend development.',
    objectives: [
      'Differentiate between client-side (frontend) and server-side (backend) execution environments.',
      'Understand why client-side code is inherently untrusted and how security boundaries operate.',
      'Learn what technologies power modern frontend and backend development.',
      'Inspect how CRP India establishes a secure boundary between citizen UI and municipal databases.'
    ],
    sections: [
      {
        heading: '1. Two Distinct Runtime Environments',
        content: `In full-stack web development, your code runs in two radically different environments. Understanding their differences is essential before writing a single line of backend code:

| Feature | Frontend (Client) | Backend (Server) |
| :--- | :--- | :--- |
| **Execution Environment** | User's Web Browser (Chrome, Safari, Edge) | Server Operating System (Node.js runtime on Linux/Cloud) |
| **Primary Languages** | HTML, CSS, JavaScript (React, Vue, Svelte) | JavaScript (Node.js), Python, Go, Java, C# |
| **Primary Focus** | User experience, accessibility, layout, interactivity | Business rules, authentication, database storage, APIs |
| **Data Persistence** | Ephemeral or local storage (localStorage, cookies) | Permanent (PostgreSQL, MongoDB, Redis, Object Stores) |
| **Security Trust Level** | **Untrusted** (anyone can inspect or modify it) | **Trusted** (secure private server environment) |`
      },
      {
        heading: '2. The Fundamental Rule of Web Security: Never Trust the Client',
        content: `Why can't we simply connect our React frontend directly to a MongoDB database?

Because the browser is an **open, untrusted environment**. Anyone can press \`F12\` to open Chrome DevTools, view every line of JavaScript, inspect network headers, and even rewrite variables in real-time.

If database credentials, secret API keys, or municipal approval rules lived in the client, malicious actors could bypass validation, delete records, or grant themselves administrative privileges.

The backend acts as an authoritative, secure gatekeeper. The frontend asks: *"Please file this complaint for citizen X"*. The backend verifies who the citizen is, sanitizes the inputs, ensures required fields exist, checks rate limits, and only then writes to the database.`
      },
      {
        heading: '3. Security Trust Boundary Architecture',
        content: `Here is how the trust boundary isolates the secure server from the untrusted browser environment:`,
        diagram: `+-------------------------------------------------------------------------+
| UNTRUSTED ENVIRONMENT (Browser / Frontend)                              |
| User can edit code, inspect variables, alter HTTP headers in DevTools  |
+-------------------------------------------------------------------------+
                                    |
                                    | Network Boundary (HTTP / HTTPS)
                                    v
+-------------------------------------------------------------------------+
| TRUSTED ENVIRONMENT (Server / Backend)                                  |
| Database passwords, private keys, authorization logic stay hidden       |
+-------------------------------------------------------------------------+`
      },
      {
        heading: '4. How They Communicate: APIs as the Bridge',
        content: `Because frontend and backend run on different machines, they communicate through **Application Programming Interfaces (APIs)**.

In web development, the most common standard is a **RESTful JSON API**:
1. The frontend initiates a request: \`POST /api/complaints\` with a JSON payload containing the category, location, and description.
2. The backend server authenticates the request, processes the data, and stores it in the database.
3. The server replies with an HTTP status code (\`201 Created\`) and a standardized response envelope.`,
        codeSnippet: `// Example of a standardized JSON response envelope from the backend:
{
  "success": true,
  "data": {
    "referenceId": "CRP-2026-00104",
    "status": "Submitted",
    "createdAt": "2026-10-28T01:30:00.000Z"
  }
}`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Putting database passwords or private API keys inside frontend JavaScript.',
        whyItHappens: 'Beginners do not realize that everything sent to the browser can be viewed in DevTools.',
        howToFix: 'Keep all secrets and credentials in backend environment variables (.env files) on the server.'
      },
      {
        mistake: 'Relying only on frontend HTML validation (such as required or minlength) for security.',
        whyItHappens: 'It looks secure because the browser stops the user from clicking Submit when a field is empty.',
        howToFix: 'An attacker can bypass the browser completely and send raw HTTP requests with Postman or curl. Always validate inputs on the backend.'
      }
    ],
    guidedExercise: {
      id: 'ex-1-2',
      title: 'Exercise: Inspecting Client-Side Visibility',
      instructions: 'Verify firsthand why frontend code is untrusted by inspecting variables and sources in the browser.',
      tasks: [
        'Open Chrome DevTools on any website (F12).',
        'Click the "Sources" tab to see all JavaScript and CSS files loaded by your browser.',
        'Click the "Application" tab and inspect "Local Storage" and "Cookies".',
        'Notice that any user can read or delete these values at any time.'
      ],
      starterCode: `// Type this in your DevTools Console:
localStorage.setItem("test_key", "Frontend data is visible to the user!");
console.log("Stored value:", localStorage.getItem("test_key"));`,
      language: 'javascript',
      hints: [
        'Check the Storage section under the Application tab in DevTools to see the test_key appear.',
        'This proves why database credentials or admin passwords must never be saved in localStorage.'
      ],
      solution: {
        explanation: 'Because localStorage and client JavaScript are entirely accessible to the user, sensitive operations (like validating an admin password or deducting money from an account) must always be executed on the backend.',
        code: `// Cleanup test item
localStorage.removeItem("test_key");`
      }
    },
    quiz: [
      {
        id: 'q-1-2-1',
        question: 'Why is client-side code considered inherently untrusted in web development?',
        options: [
          'Because web browsers crash frequently.',
          'Because any user can inspect, modify, and tamper with client-side JavaScript using DevTools.',
          'Because JavaScript cannot communicate with servers.',
          'Because HTML is an obsolete technology.'
        ],
        correctIndex: 1,
        explanation: 'The browser runs on the user device. Anyone can open DevTools, inspect the source code, alter variables, and spoof network requests.'
      },
      {
        id: 'q-1-2-2',
        question: 'Where should database connection strings and secret API keys always be stored?',
        options: [
          'In client-side React components.',
          'In public GitHub repository README files.',
          'On the backend server in secure environment variables.',
          'In browser localStorage.'
        ],
        correctIndex: 2,
        explanation: 'Database credentials must live exclusively on the secure backend server in private environment variables so they are never exposed to browser clients.'
      },
      {
        id: 'q-1-2-3',
        question: 'If you have client-side form validation (e.g. required attributes), do you still need backend validation?',
        options: [
          'No, because the browser prevents invalid forms from submitting.',
          'Yes, because anyone can send raw HTTP requests directly to your backend, bypassing the browser entirely.',
          'No, because HTML validation guarantees data integrity in MongoDB.',
          'Only if the website is hosted on Windows.'
        ],
        correctIndex: 1,
        explanation: 'Client-side validation improves user experience with instant feedback, but backend validation is mandatory for security because attackers can bypass the browser using tools like curl or Postman.'
      }
    ],
    takeaways: [
      'Frontend runs in the browser and handles user interaction, layouts, and accessibility.',
      'Backend runs on a secure server and handles databases, authentication, and core business rules.',
      'Client-side code is always untrusted; critical validation and access control must execute on the backend.',
      'Frontend and backend communicate asynchronously using structured HTTP/REST APIs and JSON.'
    ],
    caseStudyReference: {
      title: 'How CRP India Applies This Concept',
      description: 'CRP India isolates its client and server. The React frontend in frontend/src/services/api.js calls endpoints on the Express backend in backend/src/server.js, ensuring database credentials and Gemini API keys never leak into the browser.',
      files: ['reference-projects/CRP-India/frontend/src/services/api.js', 'reference-projects/CRP-India/backend/src/server.js', 'reference-projects/CRP-India/backend/src/middleware/auth.js']
    },
    prevLessonSlug: 'how-websites-work',
    nextLessonSlug: 'what-happens-when-you-open-a-website'
  },

  'what-happens-when-you-open-a-website': {
    id: 'lesson-1-3',
    slug: 'what-happens-when-you-open-a-website',
    courseSlug: 'web-internet-fundamentals',
    courseTitle: 'Course 1: Understanding the Web',
    title: 'What Happens When You Open a Website?',
    estimatedMinutes: 30,
    summary: 'A step-by-step technical journey tracing what happens under the hood when a user types a URL into their browser.',
    objectives: [
      'Trace the end-to-end lifecycle of a web request from URL keystroke to pixels on screen.',
      'Understand how Domain Name System (DNS) maps human names to machine IP addresses.',
      'Learn about TCP handshakes, TLS/SSL encryption, and HTTP request routing.',
      'Understand how browsers parse HTML into the DOM, CSS into CSSOM, and execute JavaScript.'
    ],
    sections: [
      {
        heading: 'Step 1: URL Parsing and DNS Resolution',
        content: `When you type \`https://devroot.dev\` or \`http://localhost:5173\` and press Enter:

1. **URL Breakdown**: The browser parses the string into:
   - **Scheme / Protocol**: \`https://\` (Hypertext Transfer Protocol Secure)
   - **Host / Domain**: \`devroot.dev\`
   - **Port**: Implicit \`443\` for HTTPS, or explicit like \`:5173\` for development servers.
2. **DNS Lookup (Domain Name System)**: Computers communicate over IP addresses (such as \`172.67.142.11\`), not words. The browser checks:
   - Browser DNS cache
   - Operating system DNS cache (hosts file)
   - Router DNS cache
   - Internet Service Provider (ISP) Recursive DNS Resolver

Once found, the IP address of the target server is returned to the browser.`
      },
      {
        heading: 'Step 2: TCP Connection & TLS Handshake',
        content: `Once the browser has the IP address:

1. **TCP 3-Way Handshake**: The browser and server establish a reliable transmission channel:
   - **SYN**: Client asks: *"Can we open a connection?"*
   - **SYN-ACK**: Server responds: *"Yes, I am ready."*
   - **ACK**: Client acknowledges: *"Connection established."*
2. **TLS / SSL Handshake**: If the connection is secure (\`https://\`), the client and server negotiate cryptographic ciphers, verify the server's SSL certificate, and generate symmetric session keys to encrypt all subsequent communication against eavesdropping.`
      },
      {
        heading: 'Step 3: The HTTP Request and Server Response',
        content: `Now the browser sends an HTTP request:`,
        codeSnippet: `GET / HTTP/1.1
Host: devroot.dev
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Accept: text/html,application/xhtml+xml`
      },
      {
        heading: 'Step 4: Server Processing & Response',
        content: `The server receives the request, routes it through reverse proxies and middleware, locates the resource, and responds with status \`200 OK\` and HTML bytes:`,
        codeSnippet: `HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Content-Length: 1420

<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Dev-root</title>
  </head>
  <body>...</body>
</html>`
      },
      {
        heading: 'Step 5: Browser Rendering Pipeline (Critical Rendering Path)',
        content: `As bytes arrive, the browser executes the **Critical Rendering Path**:

1. **DOM Construction**: The HTML parser translates raw characters into tokens, nodes, and builds the **Document Object Model (DOM)** tree.
2. **CSSOM Construction**: CSS rules are parsed into the **CSS Object Model (CSSOM)** tree.
3. **Render Tree**: The DOM and CSSOM are merged into a Render Tree containing only visible elements.
4. **Layout (Reflow)**: The browser calculates exact geometry, coordinates, and dimensions for every element on the viewport.
5. **Paint**: Pixels are drawn to layers on the screen (colors, borders, shadows, text).
6. **Compositing**: Layers are combined by the GPU and displayed to the user.`,
        diagram: `HTML Bytes  --->  Tokens  --->  Nodes  --->  DOM Tree   -----+
                                                               |
                                                               +--->  Render Tree  --->  Layout  --->  Paint  ---> Display
                                                               |
CSS Bytes   --->  Tokens  --->  Nodes  --->  CSSOM Tree -+`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Assuming DNS stores website files.',
        whyItHappens: 'People know DNS is used to open websites, so they confuse it with web hosting.',
        howToFix: 'DNS is strictly an address book (like Contacts on your phone). It only maps a domain name to an IP address. The actual files live on the web server.'
      },
      {
        mistake: 'Thinking the browser waits for all files before showing anything.',
        whyItHappens: 'People think a page loads all at once.',
        howToFix: 'Browsers parse and render HTML incrementally as data packets stream in over the network.'
      }
    ],
    guidedExercise: {
      id: 'ex-1-3',
      title: 'Exercise: Tracing DNS and Network Timing',
      instructions: 'Use your browser DevTools to inspect DNS lookup, TCP handshake, and download times for any web request.',
      tasks: [
        'Open DevTools (F12) and go to the "Network" tab.',
        'Reload the page and click on the very first document request (the root HTML file).',
        'Click on the "Timing" sub-tab on the right side panel.',
        'Observe the breakdown: DNS Lookup, Initial Connection (TCP), SSL (TLS handshake), Waiting for server response (TTFB), and Content Download.'
      ],
      starterCode: `// Note the phases displayed in DevTools Timing:
// 1. DNS Lookup
// 2. Initial connection (TCP)
// 3. SSL (TLS)
// 4. Waiting for server response (TTFB - Time to First Byte)
// 5. Content Download`,
      language: 'text',
      hints: [
        'Hover over the waterfall bar in the Network tab to view a quick tooltip summary of the timings.',
        'TTFB measures how long the server took to process the request and begin sending data back.'
      ],
      solution: {
        explanation: 'The Timing breakdown illustrates the exact physical steps covered in this lesson: establishing DNS, opening TCP/TLS sockets, waiting for the server, and downloading bytes.',
        code: `// Ideal web performance targets:
// DNS Lookup: < 20ms (cached)
// TCP + TLS: < 100ms
// TTFB: < 200ms
// Total Download: < 500ms`
      }
    },
    quiz: [
      {
        id: 'q-1-3-1',
        question: 'What is the primary responsibility of the Domain Name System (DNS)?',
        options: [
          'To compress HTML files before sending them over the internet.',
          'To map human-readable domain names (e.g., devroot.dev) to machine-readable IP addresses.',
          'To encrypt passwords stored in databases.',
          'To format CSS rules into dark mode styles.'
        ],
        correctIndex: 1,
        explanation: 'DNS functions like the internet address book, translating domain names humans can remember into numeric IP addresses that routers and computers use to route packets.'
      },
      {
        id: 'q-1-3-2',
        question: 'In what sequence does the browser execute the Critical Rendering Path?',
        options: [
          'Paint -> Layout -> DOM -> CSSOM',
          'DOM + CSSOM Construction -> Render Tree -> Layout -> Paint -> Composite',
          'Database Query -> JSON Parse -> DNS Lookup -> Screen Display',
          'CSSOM -> Paint -> DOM -> Layout'
        ],
        correctIndex: 1,
        explanation: 'The browser builds the DOM from HTML and CSSOM from CSS, combines them into a Render Tree, computes Layout coordinates, paints pixel layers, and composites them to the screen.'
      },
      {
        id: 'q-1-3-3',
        question: 'What is Time to First Byte (TTFB)?',
        options: [
          'The time it takes to type a URL on your keyboard.',
          'The time elapsed from the client sending the request until the first byte of response data arrives from the server.',
          'The time it takes to install Node.js.',
          'The time it takes to shut down a computer.'
        ],
        correctIndex: 1,
        explanation: 'TTFB measures network latency and server processing time: how quickly the server begins responding after the request is transmitted.'
      }
    ],
    takeaways: [
      'Entering a URL triggers DNS resolution to find the server IP address.',
      'A TCP 3-way handshake and TLS cryptographic negotiation establish a secure communication channel.',
      'The server returns HTML, which the browser parses incrementally to build the DOM.',
      'The browser constructs the Render Tree, computes Layout coordinates, and Paints pixels to the display.'
    ],
    caseStudyReference: {
      title: 'How CRP India Applies This Concept',
      description: 'When a citizen navigates to CRP India, the browser loads index.html, fetches the bundled React application, and immediately makes an HTTP request to /api/auth/me to verify if a valid session exists in localStorage.',
      files: ['reference-projects/CRP-India/frontend/index.html', 'reference-projects/CRP-India/frontend/src/context/AuthContext.jsx']
    },
    prevLessonSlug: 'frontend-vs-backend',
    nextLessonSlug: 'http-requests-and-responses'
  },

  'http-requests-and-responses': {
    id: 'lesson-1-4',
    slug: 'http-requests-and-responses',
    courseSlug: 'web-internet-fundamentals',
    courseTitle: 'Course 1: Understanding the Web',
    title: 'HTTP Methods, Status Codes & JSON Payloads',
    estimatedMinutes: 25,
    summary: 'Master the universal language of web APIs: HTTP verbs, request headers, status code classes, and structured JSON payloads.',
    objectives: [
      'Understand the role of HTTP as a stateless, request-response communication protocol.',
      'Learn the standard HTTP methods: GET, POST, PUT, PATCH, and DELETE.',
      'Master the 5 HTTP status code families (2xx, 3xx, 4xx, 5xx) and common codes.',
      'Construct and parse valid JSON request and response payloads.'
    ],
    sections: [
      {
        heading: '1. What is HTTP?',
        content: `**HTTP (HyperText Transfer Protocol)** is the universal language of the World Wide Web. It defines the exact format for messages exchanged between clients and servers.

HTTP is **stateless**: every single request from a client is treated as an independent transaction. The server does not automatically remember previous requests unless you explicitly include an identifying credential (like an HTTP Cookie or a JWT Bearer Token).`
      },
      {
        heading: '2. The Core HTTP Methods (Verbs)',
        content: `When a client communicates with a server, it specifies the **action** it wants to perform using an HTTP Method:

| Method | Purpose | Typical Use Case |
| :--- | :--- | :--- |
| **GET** | Retrieve data from the server | Fetching a list of courses, loading an article |
| **POST** | Submit new data to be created | Registering a user, submitting a grievance |
| **PUT** | Replace an existing record completely | Overwriting an entire profile record |
| **PATCH** | Partially update an existing record | Changing only an email address or status field |
| **DELETE** | Remove a record from the database | Deleting an outdated draft |`
      },
      {
        heading: '3. HTTP Status Codes: The Server\'s Response Language',
        content: `Every HTTP response begins with a 3-digit status code that informs the client whether the operation succeeded or failed:

- **2xx Success**: The request was received, understood, and processed successfully.
  - \`200 OK\`: Standard success for GET or general requests.
  - \`201 Created\`: The server successfully created a new resource (common after POST).
  - \`204 No Content\`: Success, but the server returned no response body (common after DELETE).
- **3xx Redirection**: Further action needed to complete the request (e.g. \`301 Moved Permanently\`).
- **4xx Client Error**: The client made an invalid request.
  - \`400 Bad Request\`: Malformed syntax or missing required fields.
  - \`401 Unauthorized\`: Authentication is required (user is not logged in).
  - \`403 Forbidden\`: Authenticated, but lacking permission (e.g., a citizen trying to access municipal admin tools).
  - \`404 Not Found\`: The requested resource or URL does not exist.
- **5xx Server Error**: The server encountered an unexpected condition.
  - \`500 Internal Server Error\`: Unhandled exception or server crash.
  - \`502 Bad Gateway\` / \`503 Service Unavailable\`: Server is overloaded or down for maintenance.`
      },
      {
        heading: '4. JSON: The Data Format of Modern Web APIs',
        content: `**JSON (JavaScript Object Notation)** is the standard data interchange format for modern APIs. It is lightweight, text-based, and universally supported across JavaScript, Python, Go, and every major language.

Rules for valid JSON:
1. Keys must always be enclosed in double quotes: \`"title"\`. Single quotes are invalid.
2. Values can be strings, numbers, booleans (\`true\` / \`false\`), \`null\`, arrays (\`[]\`), or nested objects (\`{}\`).
3. No trailing commas are allowed after the final item in a list or object.`,
        codeSnippet: `// Example of a valid JSON request payload:
{
  "department": "Sanitation",
  "priority": "High",
  "location": {
    "latitude": 28.6139,
    "longitude": 77.2090,
    "address": "Connaught Place, New Delhi"
  },
  "isAnonymous": false,
  "attachments": ["photo-1.jpg", "photo-2.jpg"]
}`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using GET requests to delete or modify data.',
        whyItHappens: 'Browsers trigger GET requests when you click ordinary links, so lazy developers sometimes link to /delete-user?id=5.',
        howToFix: 'GET requests should be idempotent and safe (read-only). Always use DELETE or POST with proper authentication for destructive actions.'
      },
      {
        mistake: 'Putting single quotes or trailing commas in JSON.',
        whyItHappens: 'JavaScript objects permit single quotes and trailing commas, but strict JSON does not.',
        howToFix: 'Always use double quotes for keys and values, and ensure no comma follows the final item.'
      }
    ],
    guidedExercise: {
      id: 'ex-1-4',
      title: 'Exercise: Parsing and Serializing JSON in JavaScript',
      instructions: 'Practice converting between JavaScript objects and JSON strings using JSON.stringify and JSON.parse.',
      tasks: [
        'Open your browser DevTools Console (F12).',
        'Convert a JavaScript object into a JSON string using JSON.stringify.',
        'Convert the JSON string back into a JavaScript object using JSON.parse.',
        'Verify that invalid JSON (single quotes) throws a SyntaxError.'
      ],
      starterCode: `const grievance = {
  id: "CRP-101",
  title: "Broken street light",
  resolved: false
};

// 1. Serialize to JSON string (ready to send over HTTP)
const jsonPayload = JSON.stringify(grievance);
console.log("JSON String:", jsonPayload);

// 2. Parse back to JavaScript object
const parsedObject = JSON.parse(jsonPayload);
console.log("Parsed Object Title:", parsedObject.title);`,
      language: 'javascript',
      hints: [
        'JSON.stringify converts live objects to strings for network transmission.',
        'JSON.parse converts received network strings back into workable JavaScript objects.'
      ],
      solution: {
        explanation: 'When your frontend sends data to a backend API with fetch, it stringifies the data. When the backend sends JSON back, fetch parses it back into an object.',
        code: `// Valid JSON output:
// '{"id":"CRP-101","title":"Broken street light","resolved":false}'`
      }
    },
    quiz: [
      {
        id: 'q-1-4-1',
        question: 'Which HTTP method should be used when submitting a form to create a new user account in a database?',
        options: ['GET', 'POST', 'DELETE', 'OPTIONS'],
        correctIndex: 1,
        explanation: 'POST is the standard HTTP method used to send data to the server to create a new resource.'
      },
      {
        id: 'q-1-4-2',
        question: 'What does a 401 Unauthorized status code indicate?',
        options: [
          'The server crashed due to an out-of-memory error.',
          'The requested page was moved permanently to a new URL.',
          'The client is not authenticated (user is not logged in or token is missing).',
          'The operation succeeded with no content returned.'
        ],
        correctIndex: 2,
        explanation: '401 Unauthorized indicates that the request lacks valid authentication credentials. In contrast, 403 Forbidden means the user is logged in but lacks required permission.'
      },
      {
        id: 'q-1-4-3',
        question: 'Which of the following is a syntax rule required by valid JSON?',
        options: [
          'Keys must be wrapped in double quotes (e.g. "name": "value").',
          'Keys can be wrapped in single quotes.',
          'A trailing comma must be placed after the last property.',
          'Functions can be included as JSON values.'
        ],
        correctIndex: 0,
        explanation: 'JSON strictly requires double quotes for all object keys and string values. Single quotes and trailing commas cause JSON parsing errors.'
      }
    ],
    takeaways: [
      'HTTP is a stateless protocol operating on a request-response cycle.',
      'HTTP verbs (GET, POST, PUT, PATCH, DELETE) communicate the intended action.',
      'Status codes communicate the outcome: 2xx success, 4xx client errors, 5xx server errors.',
      'JSON is the universal data format for modern web APIs; keys and strings must use double quotes.'
    ],
    caseStudyReference: {
      title: 'How CRP India Applies This Concept',
      description: 'The CRP India Express backend routes in backend/src/routes/ define explicit endpoints matching HTTP verbs: GET /api/complaints, POST /api/complaints, and PATCH /api/complaints/:id/status, returning standardized 200, 201, 400, and 500 status envelopes.',
      files: ['reference-projects/CRP-India/backend/src/routes/complaintRoutes.js', 'reference-projects/CRP-India/backend/src/controllers/complaintController.js']
    },
    prevLessonSlug: 'what-happens-when-you-open-a-website',
    nextLessonSlug: 'terminal-and-file-fundamentals'
  },

  // =========================================================================
  // COURSE 2: DEVELOPER SETUP & ESSENTIAL TOOLS
  // =========================================================================
  'terminal-and-file-fundamentals': {
    id: 'lesson-2-1',
    slug: 'terminal-and-file-fundamentals',
    courseSlug: 'developer-setup-and-tools',
    courseTitle: 'Course 2: Developer Setup & Essential Tools',
    title: 'Files, Folders & The Developer Terminal',
    estimatedMinutes: 25,
    summary: 'Master directory structures, file paths, file extensions, and the foundational command line terminal commands every developer relies on.',
    objectives: [
      'Understand hierarchical file trees, directories, and file extensions.',
      'Differentiate between absolute and relative file paths.',
      'Learn essential terminal navigation commands: pwd, cd, ls / dir, mkdir.',
      'Inspect project folder conventions used in professional repositories.'
    ],
    sections: [
      {
        heading: '1. The Terminal: Direct Communication with Your OS',
        content: `Before graphical user interfaces (mice, windows, icons) existed, programmers interacted with computers entirely through text. That text interface is called the **terminal**, **command line**, or **shell** (PowerShell on Windows, Bash or Zsh on macOS/Linux).

As a web developer, you will use the terminal every day to:
- Navigate project folders.
- Install packages and dependencies (such as React or Express).
- Run local development servers (like \`npm run dev\`).
- Run automated test suites (like \`npm test\`).
- Manage version control with Git.`
      },
      {
        heading: '2. Understanding Paths: Absolute vs. Relative',
        content: `Your computer organizes files into a tree of folders (directories).

- **Absolute Path**: The full, unambiguous address from the root of the file system:
  - Windows: \`C:\\Users\\amank\\Projects\\Dev-root\`
  - macOS/Linux: \`/home/amank/projects/dev-root\`
- **Relative Path**: The address relative to your **current working directory**:
  - \`./index.html\` (the file named index.html in the current folder)
  - \`../src/main.jsx\` (go up one parent folder, then into the src folder)
  - \`../../\` (go up two parent folders)`
      },
      {
        heading: '3. Essential Terminal Commands',
        content: `Here are the core commands you need to memorize. They work identically in modern PowerShell, macOS, and Linux:

| Command | Meaning | Purpose |
| :--- | :--- | :--- |
| \`pwd\` | Print Working Directory | Shows the full path of the folder you are currently inside |
| \`ls\` (or \`dir\`) | List files | Displays all files and subdirectories in the current folder |
| \`cd folder-name\` | Change Directory | Enters the specified subfolder |
| \`cd ..\` | Change Directory Up | Moves up to the parent directory |
| \`mkdir my-project\` | Make Directory | Creates a new folder with the given name |
| \`clear\` (or \`cls\`) | Clear screen | Clears terminal text output |`
      },
      {
        heading: '4. File Extensions Matter',
        content: `Computers use file extensions (the text after the final dot) to know how to interpret a file:

- \`.html\`: HyperText Markup Language (webpage skeleton)
- \`.css\`: Cascading Style Sheets (styling and themes)
- \`.js\` / \`.jsx\`: JavaScript / React JSX component
- \`.json\`: JavaScript Object Notation (data records)
- \`.md\`: Markdown (human-readable documentation)

In programming, filenames should avoid spaces and special characters. Use kebab-case (\`my-cool-project\`) or snake_case (\`my_cool_project\`).`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Putting spaces in folder or file names (e.g., "my project files").',
        whyItHappens: 'Windows and macOS allow spaces in GUI folder names.',
        howToFix: 'In the terminal, spaces separate command arguments. A command like "cd my project" will fail looking for a folder named "my". Always use dashes or underscores (my-project).'
      },
      {
        mistake: 'Running commands in the wrong directory.',
        whyItHappens: 'Beginners forget which folder the terminal is currently inside.',
        howToFix: 'Run "pwd" whenever in doubt to verify your current location before executing commands.'
      }
    ],
    guidedExercise: {
      id: 'ex-2-1',
      title: 'Exercise: Navigating Directories via Terminal',
      instructions: 'Open your terminal and practice basic directory navigation.',
      tasks: [
        'Open your terminal window (PowerShell, Terminal, or VS Code integrated terminal).',
        'Type "pwd" and press Enter to see where you are.',
        'Type "ls" (or "dir") to inspect the files in your current folder.',
        'Create a temporary folder: "mkdir learning-sandbox"',
        'Navigate into it: "cd learning-sandbox"',
        'Verify your new location with "pwd", then return to the parent directory: "cd .."'
      ],
      starterCode: `# Commands to run in sequence:
pwd
ls
mkdir learning-sandbox
cd learning-sandbox
pwd
cd ..`,
      language: 'text',
      hints: [
        'Remember that ".." always refers to the folder above your current location.',
        'You can press the Tab key to autocomplete folder names!'
      ],
      solution: {
        explanation: 'Navigating directories is the foundation of running development servers, creating files, and managing projects with Git.',
        code: `# Expected output:
# mkdir creates the folder
# cd changes directory
# pwd confirms the updated path`
      }
    },
    quiz: [
      {
        id: 'q-2-1-1',
        question: 'What does the "cd .." command do in the terminal?',
        options: [
          'Deletes the current directory.',
          'Navigates up one level into the parent directory.',
          'Opens the browser developer tools.',
          'Lists all hidden files.'
        ],
        correctIndex: 1,
        explanation: '".." represents the parent directory. Running "cd .." moves your terminal up one level in the folder hierarchy.'
      },
      {
        id: 'q-2-1-2',
        question: 'Why should software developers avoid spaces in project and file names?',
        options: [
          'Because computers cannot store spaces.',
          'Because terminal commands use spaces to separate arguments, which breaks commands unless escaped.',
          'Because Git refuses to track any file containing a space.',
          'Because spaces make files 100 times larger.'
        ],
        correctIndex: 1,
        explanation: 'Command line shells parse spaces as separators between commands and arguments. Using kebab-case (e.g. project-root) prevents syntax bugs.'
      },
      {
        id: 'q-2-1-3',
        question: 'What is the difference between an absolute path and a relative path?',
        options: [
          'Absolute paths only work on Windows; relative paths only work on Mac.',
          'An absolute path starts from the system root drive; a relative path starts from the current working directory.',
          'Absolute paths can only link to HTML files.',
          'Relative paths require an internet connection.'
        ],
        correctIndex: 1,
        explanation: 'An absolute path specifies the complete location from the root (e.g. C:\\Dev\\Project), whereas a relative path specifies the location relative to where you currently are (e.g. ./src/app.js).'
      }
    ],
    takeaways: [
      'The terminal is the developer control room for running servers, installing tools, and managing files.',
      'Relative paths resolve from your current directory; absolute paths resolve from the root drive.',
      'Avoid spaces in file names; use kebab-case or snake_case.',
      'Key navigation commands: pwd (where am I?), ls (what is here?), cd (go there), cd .. (go back up).'
    ],
    caseStudyReference: {
      title: 'How CRP India Applies This Concept',
      description: 'The CRP India project uses a clean multi-package folder structure: a root package.json orchestrating separate frontend/ and backend/ directories, each with dedicated dependencies and startup scripts.',
      files: ['reference-projects/CRP-India/package.json', 'reference-projects/CRP-India/frontend/package.json', 'reference-projects/CRP-India/backend/package.json']
    },
    prevLessonSlug: 'http-requests-and-responses',
    nextLessonSlug: 'code-editors-and-devtools'
  },

  'code-editors-and-devtools': {
    id: 'lesson-2-2',
    slug: 'code-editors-and-devtools',
    courseSlug: 'developer-setup-and-tools',
    courseTitle: 'Course 2: Developer Setup & Essential Tools',
    title: 'Code Editors & Browser Developer Tools',
    estimatedMinutes: 30,
    summary: 'Configure VS Code, master code editor navigation, and learn how to use Chrome/Firefox DevTools to debug live applications and errors.',
    objectives: [
      'Understand the role of code editors (VS Code) vs word processors.',
      'Learn how to inspect elements, edit live styles, and view the console in DevTools.',
      'Identify and read JavaScript error messages and stack traces.',
      'Understand how to recover from syntax errors systematically.'
    ],
    sections: [
      {
        heading: '1. Why Developers Use Dedicated Code Editors',
        content: `You cannot write code in Microsoft Word or Google Docs. Word processors insert invisible formatting characters, smart quotation marks (\`“\`), and metadata that corrupt code files.

Programmers write code in **plain text code editors**. The industry standard today is **Visual Studio Code (VS Code)**.

VS Code provides:
- **Syntax Highlighting**: Colors keywords, strings, and functions so syntax errors stand out immediately.
- **IntelliSense**: Autocompletes variable names and function signatures.
- **Integrated Terminal**: Run commands directly beneath your code without switching windows.
- **Git Integration**: Review diffs and stage commits visually.`
      },
      {
        heading: '2. The Browser Developer Tools Suite',
        content: `Every modern browser includes a built-in suite of debugging tools called **Developer Tools (DevTools)**. Press \`F12\` or right-click any element and select **Inspect**.

The three essential panels you will use daily:

1. **Elements Panel**:
   - Displays the live Document Object Model (DOM) tree.
   - Lets you click any element to see its exact CSS styles, margins, padding, and box model.
   - Lets you live-edit text or CSS to test visual changes without modifying your source files.
2. **Console Panel**:
   - The interactive JavaScript playground and error logger.
   - Logs messages output via \`console.log()\`.
   - Displays JavaScript runtime errors in red with line numbers.
3. **Network Panel**:
   - Shows every HTTP request sent to or received from the server.
   - Shows HTTP status codes, headers, and JSON responses.`
      },
      {
        heading: '3. Reading and Debugging Error Messages',
        content: `Errors are not a sign of failure. Professional developers encounter dozens of errors every day. Debugging is simply the process of investigating what the computer did not understand.

When an error appears in the Console, read it carefully:
1. **The Error Type**: (e.g. \`SyntaxError\`, \`ReferenceError\`, \`TypeError\`).
2. **The Description**: (e.g. \`x is not defined\`, \`Cannot read properties of null\`).
3. **The Stack Trace**: The file name and line number where the problem occurred (e.g. \`app.js:42\`). Click the link to jump directly to the offending line.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Panicking when seeing a red error message in the console.',
        whyItHappens: 'Beginners think errors mean the entire project is broken.',
        howToFix: 'Read the error line by line. The message usually tells you exactly what failed and gives you the exact file and line number.'
      },
      {
        mistake: 'Editing code in DevTools Elements panel and wondering why changes disappear on page reload.',
        whyItHappens: 'DevTools edits modify the in-memory DOM in your browser, not the files saved on your hard drive.',
        howToFix: 'Use DevTools to test ideas quickly, then copy your changes into your code editor to persist them.'
      }
    ],
    guidedExercise: {
      id: 'ex-2-2',
      title: 'Exercise: Triggering and Reading a Console Error',
      instructions: 'Intentionally trigger an error in the browser Console to practice reading stack traces.',
      tasks: [
        'Open DevTools (F12) and switch to the "Console" tab.',
        'Type an intentionally undefined variable call: "mySecretVariable + 10" and press Enter.',
        'Observe the red ReferenceError: "mySecretVariable is not defined".',
        'Declare the variable: "const mySecretVariable = 5;"',
        'Re-run the addition: "mySecretVariable + 10" and observe the successful output (15).'
      ],
      starterCode: `// In the DevTools Console:
nonExistentFunction(); // Notice the ReferenceError!`,
      language: 'javascript',
      hints: [
        'ReferenceError means JavaScript looked for a variable or function name that does not exist in scope.',
        'TypeError means you tried to perform an operation on a value that does not support it (like calling a number as a function).'
      ],
      solution: {
        explanation: 'Understanding common error types allows you to diagnose and fix bugs systematically rather than guessing randomly.',
        code: `// Fixed:
function nonExistentFunction() {
  console.log("Function now exists!");
}
nonExistentFunction();`
      }
    },
    quiz: [
      {
        id: 'q-2-2-1',
        question: 'Why can developers not write HTML or JavaScript in Microsoft Word?',
        options: [
          'Because Microsoft Word requires a paid subscription.',
          'Because word processors embed hidden formatting and stylized quotes that break code parsing.',
          'Because Microsoft Word only runs on Windows.',
          'Because code files can only be saved on USB drives.'
        ],
        correctIndex: 1,
        explanation: 'Word processors format rich text with hidden metadata and smart quotes (“ ”), which cause syntax errors in programming compilers and interpreters.'
      },
      {
        id: 'q-2-2-2',
        question: 'If you change a CSS color inside the DevTools Elements panel, what happens when you refresh the browser?',
        options: [
          'The change is saved permanently to your project files on disk.',
          'The change is discarded and the page reloads the original files from the server.',
          'The browser crashes.',
          'The change is automatically pushed to GitHub.'
        ],
        correctIndex: 1,
        explanation: 'DevTools modifies only the in-memory DOM representation in the browser. Refreshing fetches fresh files from disk or server, discarding temporary DevTools tweaks.'
      },
      {
        id: 'q-2-2-3',
        question: 'What information does a stack trace provide when an error occurs?',
        options: [
          'Your computer CPU temperature.',
          'The error name, message description, and exact file and line number where the issue occurred.',
          'The list of all passwords saved on your computer.',
          'The total number of visitors on the website.'
        ],
        correctIndex: 1,
        explanation: 'A stack trace provides the error type, diagnostic message, and exact chain of function calls leading to the specific file and line number of the failure.'
      }
    ],
    takeaways: [
      'Write code in dedicated text editors like VS Code with syntax highlighting and integrated terminals.',
      'Use browser DevTools (Elements, Console, Network) to inspect DOM state, test styles, and monitor network requests.',
      'Errors are normal and informative: read the message, check the line number, and debug systematically.'
    ],
    caseStudyReference: {
      title: 'How CRP India Applies This Concept',
      description: 'The CRP India codebase uses ESLint configuration files (.eslintrc) and Vite build tooling to catch syntax errors, missing variables, and prop-type mismatches automatically before code is committed.',
      files: ['reference-projects/CRP-India/frontend/vite.config.js', 'reference-projects/CRP-India/backend/src/server.js']
    },
    prevLessonSlug: 'terminal-and-file-fundamentals',
    nextLessonSlug: 'html-document-structure-and-semantics'
  },

  // =========================================================================
  // COURSE 3: HTML FROM ZERO
  // =========================================================================
  'html-document-structure-and-semantics': {
    id: 'lesson-3-1',
    slug: 'html-document-structure-and-semantics',
    courseSlug: 'html-foundations',
    courseTitle: 'Course 3: HTML from Zero',
    title: 'Semantic HTML & Document Hierarchy',
    estimatedMinutes: 30,
    summary: 'Build the foundational skeleton of webpages: opening/closing tags, elements, attributes, document structure, and accessible semantic landmarks.',
    objectives: [
      'Understand the anatomy of HTML tags, elements, and attributes.',
      'Construct a complete, valid HTML5 document structure with head and body.',
      'Use semantic elements (<header>, <nav>, <main>, <article>, <section>, <footer>).',
      'Explain why semantic HTML improves accessibility (screen readers) and SEO.'
    ],
    sections: [
      {
        heading: '1. What is HTML?',
        content: `**HTML (HyperText Markup Language)** is the universal language used to structure documents for the World Wide Web.

HTML is not a programming language; it has no variables, functions, or loops. Instead, it is a **markup language**: it annotates ("marks up") raw text so the browser knows what is a headline, what is a paragraph, what is an image, and what is an interactive button.`
      },
      {
        heading: '2. Anatomy of an HTML Element',
        content: `Most HTML elements consist of three parts:
1. **Opening Tag**: \`<p>\` (tells the browser: a paragraph begins here).
2. **Content**: The text or nested elements inside.
3. **Closing Tag**: \`</p>\` (tells the browser: the paragraph ends here).

Elements can also contain **attributes** in the opening tag to provide extra configuration:
\`\`\`html
<a href="https://devroot.dev" target="_blank" rel="noopener">Visit Dev-root</a>
\`\`\`
- \`href\` is an attribute name; \`"https://devroot.dev"\` is its attribute value.
- Self-closing / void elements (like \`<img>\` or \`<input>\`) do not have closing tags because they cannot contain text content.`
      },
      {
        heading: '3. The Standard HTML5 Boilerplate Skeleton',
        content: `Every web page begins with this foundational boilerplate:`,
        codeSnippet: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
  </head>
  <body>
    <h1>Welcome to Web Development</h1>
    <p>This is where visible page content lives.</p>
  </body>
</html>`
      },
      {
        heading: '4. Why Semantic HTML Matters',
        content: `Before HTML5, developers wrapped everything in generic \`<div>\` (division) containers: \`<div class="header">\`, \`<div class="nav">\`, \`<div class="footer">\`.

A generic \`<div>\` has **no semantic meaning**. A blind user using a screen reader cannot tell where navigation ends and main content begins.

**Semantic HTML** uses elements that describe their meaning to both developer and browser:
- \`<header>\`: Introductory content or navigational branding.
- \`<nav>\`: Navigation links.
- \`<main>\`: The unique primary content of the page (only one per document).
- \`<article>\`: Self-contained independent content (like a blog post or course card).
- \`<section>\`: A thematic grouping of content with a heading.
- \`<footer>\`: Authorship, copyright, and footer links.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using multiple <h1> tags on a single page.',
        whyItHappens: 'Beginners use <h1> whenever they want large text.',
        howToFix: 'A document should have exactly one <h1> representing the primary page title. Use CSS to style text size, and use <h2> through <h6> for subheadings in proper hierarchical order.'
      },
      {
        mistake: 'Leaving the alt attribute empty on images.',
        whyItHappens: 'Developers forget that screen readers and visually impaired users rely on alt text.',
        howToFix: 'Always include descriptive alt text: <img src="logo.png" alt="Dev-root Logo">.'
      }
    ],
    guidedExercise: {
      id: 'ex-3-1',
      title: 'Exercise: Building a Semantic Page Skeleton',
      instructions: 'Write a semantic HTML document structure representing a personal developer portfolio.',
      tasks: [
        'Include the <!DOCTYPE html> declaration and <html lang="en"> root.',
        'Add a <head> with proper meta charset, meta viewport, and title.',
        'Inside <body>, create a <header> with your name as an <h1>.',
        'Add a <main> section containing an <article> describing your learning goals in a <p>.',
        'Add a <footer> with a copyright notice.'
      ],
      starterCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Portfolio</title>
  </head>
  <body>
    <!-- Add header, main, and footer here -->
  </body>
</html>`,
      language: 'html',
      hints: [
        'Ensure the <main> element is inside <body> and wraps your primary content.',
        'Use semantic tags rather than generic <div> containers.'
      ],
      solution: {
        explanation: 'Semantic elements provide landmark navigation for screen readers and improve search engine indexability.',
        code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Developer Portfolio</title>
  </head>
  <body>
    <header>
      <h1>Alex Rivera</h1>
      <nav>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
      </nav>
    </header>
    <main>
      <article id="about">
        <h2>About Me</h2>
        <p>I am learning full-stack web development on Dev-root!</p>
      </article>
    </main>
    <footer>
      <p>&copy; 2026 Alex Rivera. Built with Semantic HTML.</p>
    </footer>
  </body>
</html>`
      }
    },
    quiz: [
      {
        id: 'q-3-1-1',
        question: 'What is the purpose of the <!DOCTYPE html> declaration at the very top of an HTML file?',
        options: [
          'It connects the HTML file to a remote database.',
          'It instructs the browser to render the page in standard HTML5 mode.',
          'It encrypts the page with SSL.',
          'It sets the font size to 16px.'
        ],
        correctIndex: 1,
        explanation: '<!DOCTYPE html> tells the browser that the document is written in modern HTML5, preventing the browser from falling into legacy quirks mode.'
      },
      {
        id: 'q-3-1-2',
        question: 'Which of the following is a semantic HTML element?',
        options: ['<div>', '<span>', '<article>', '<b>'],
        correctIndex: 2,
        explanation: '<article> is a semantic element indicating self-contained, independent content. In contrast, <div> and <span> are non-semantic generic containers.'
      },
      {
        id: 'q-3-1-3',
        question: 'How many <main> elements should appear on a single HTML webpage?',
        options: [
          'As many as you want.',
          'Exactly one, representing the central content of that specific document.',
          'Zero, because <main> is obsolete.',
          'One inside every <div>.'
        ],
        correctIndex: 1,
        explanation: 'According to accessibility and HTML5 standards, a document must have only one <main> element to represent its unique primary content.'
      }
    ],
    takeaways: [
      'HTML provides semantic document structure, not visual styling or computation.',
      'Elements consist of opening tags, attributes, content, and closing tags.',
      'Always include <!DOCTYPE html>, meta charset, and meta viewport.',
      'Use semantic landmarks (<header>, <nav>, <main>, <article>, <footer>) for accessibility.'
    ],
    caseStudyReference: {
      title: 'How CRP India Applies This Concept',
      description: 'Inspect the root HTML template in CRP India: index.html defines proper UTF-8 charset, viewport scaling for mobile devices, and mounts the React application into a dedicated root element.',
      files: ['reference-projects/CRP-India/frontend/index.html']
    },
    prevLessonSlug: 'code-editors-and-devtools',
    nextLessonSlug: 'html-forms-and-accessible-inputs'
  },

  'html-forms-and-accessible-inputs': {
    id: 'lesson-3-2',
    slug: 'html-forms-and-accessible-inputs',
    courseSlug: 'html-foundations',
    courseTitle: 'Course 3: HTML from Zero',
    title: 'Accessible Forms, Inputs & Data Entry',
    estimatedMinutes: 35,
    summary: 'Collect user data properly: forms, labels, input types, textareas, submit buttons, and built-in HTML5 validation attributes.',
    objectives: [
      'Build forms using <form>, <input>, <select>, <textarea>, and <button>.',
      'Associate inputs with <label for=""> for screen readers and click target ergonomics.',
      'Use proper input types: text, email, password, number, tel, date.',
      'Implement native HTML5 validation attributes (required, minlength, pattern).'
    ],
    sections: [
      {
        heading: '1. Why Forms Are the Heart of Web Applications',
        content: `Almost every meaningful action on the web happens through a form: logging in, searching for courses, posting a comment, or filing a civic grievance.

A web form collects user input and packages it into an HTTP request sent to a server.`
      },
      {
        heading: '2. The Critical Rule: Always Pair Inputs with Labels',
        content: `Never place an \`<input>\` on a page without an associated \`<label>\`.

\`\`\`html
<!-- CORRECT: Accessible input-label pair -->
<label for="user-email">Email Address</label>
<input type="email" id="user-email" name="email" required>
\`\`\`

Why the \`for\` and \`id\` match matters:
1. **Accessibility**: When a visually impaired user tabs to the input, their screen reader announces: *"Email Address, edit text"*. Without a label, it says: *"Unlabeled edit text"*.
2. **Ergonomics**: Clicking on the label text automatically focuses the input field, which drastically improves usability on mobile devices.`
      },
      {
        heading: '3. Input Types & Built-in Validation',
        content: `HTML5 provides specialized input types that automatically optimize keyboard layouts on mobile devices and provide built-in validation:

- \`type="text"\`: Standard single-line text.
- \`type="email"\`: Validates presence of \`@\` and domain; displays \`@\` key on mobile keyboard.
- \`type="password"\`: Masks entered characters for security.
- \`type="number"\`: Restricts input to numbers; supports \`min\` and \`max\`.
- \`type="date"\`: Displays a native browser date picker.
- \`required\`: Prevents form submission if empty.
- \`minlength="8"\`: Requires at least 8 characters.`
      },
      {
        heading: '4. Buttons: type="submit" vs type="button"',
        content: `Inside a \`<form>\`:
- \`<button type="submit">\`: Submits the form data. This is the default if no type is specified.
- \`<button type="button">\`: Performs a JavaScript action (like toggling an eye icon to show/hide a password) without submitting the form.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using placeholder text instead of a real <label>.',
        whyItHappens: 'Placeholders look clean and take up less visual space.',
        howToFix: 'Placeholders disappear as soon as the user starts typing, leaving them with no memory of what the field was for. Always use a visible <label>.'
      },
      {
        mistake: 'Forgetting name attributes on input elements.',
        whyItHappens: 'Developers provide id for CSS/JS and omit name.',
        howToFix: 'When a form submits naturally or via FormData, the name attribute becomes the key in the payload. Without a name attribute, the input value is omitted.'
      }
    ],
    guidedExercise: {
      id: 'ex-3-2',
      title: 'Exercise: Building an Accessible Grievance Submission Form',
      instructions: 'Construct an accessible complaint form with proper labels, input types, and required validations.',
      tasks: [
        'Create a <form> element.',
        'Add a label and input for "Full Name" (type="text", required).',
        'Add a label and input for "Citizen Email" (type="email", required).',
        'Add a label and <select> dropdown for "Department" with at least two options.',
        'Add a <textarea> for "Description" with required and minlength="20".',
        'Add a <button type="submit">Submit Complaint</button>.'
      ],
      starterCode: `<form>
  <!-- Construct your accessible inputs here -->
</form>`,
      language: 'html',
      hints: [
        'Ensure every <label for="xyz"> matches the exact id="xyz" of the corresponding input.',
        'Use <textarea> instead of <input> for multiline descriptions.'
      ],
      solution: {
        explanation: 'This structure provides complete screen reader compatibility, native mobile keyboard ergonomics, and validation guards.',
        code: `<form action="/api/complaints" method="POST">
  <div>
    <label for="citizen-name">Full Name</label>
    <input type="text" id="citizen-name" name="fullName" required>
  </div>
  <div>
    <label for="citizen-email">Citizen Email</label>
    <input type="email" id="citizen-email" name="email" required>
  </div>
  <div>
    <label for="dept-select">Department</label>
    <select id="dept-select" name="department" required>
      <option value="">Select a department...</option>
      <option value="Sanitation">Sanitation</option>
      <option value="Roads">Roads & Infrastructure</option>
    </select>
  </div>
  <div>
    <label for="complaint-desc">Description</label>
    <textarea id="complaint-desc" name="description" rows="4" minlength="20" required></textarea>
  </div>
  <button type="submit">Submit Complaint</button>
</form>`
      }
    },
    quiz: [
      {
        id: 'q-3-2-1',
        question: 'Why should every input element be linked to a <label for="..."> tag?',
        options: [
          'It increases the download speed of the webpage.',
          'It allows screen readers to announce the field name and enables clicking the label to focus the input.',
          'It is required by the JavaScript compiler to run.',
          'It automatically encrypts the input in database storage.'
        ],
        correctIndex: 1,
        explanation: 'Matching label for with input id provides screen reader accessibility and makes the label text clickable, expanding the touch target.'
      },
      {
        id: 'q-3-2-2',
        question: 'What happens when a user clicks a <button type="button"> inside a form?',
        options: [
          'The form is immediately submitted to the server.',
          'The form inputs are cleared.',
          'Nothing happens unless JavaScript event listeners are attached to it.',
          'The browser reloads the entire website.'
        ],
        correctIndex: 2,
        explanation: 'type="button" prevents the default form submission behavior, making it safe for custom JavaScript interactions (like opening modals or toggling password visibility).'
      },
      {
        id: 'q-3-2-3',
        question: 'Which HTML5 input type automatically restricts characters and displays a numeric keypad on mobile devices?',
        options: ['type="text"', 'type="number"', 'type="search"', 'type="hidden"'],
        correctIndex: 1,
        explanation: 'type="number" informs mobile browsers to display a numeric keypad and restricts input to valid numerical values.'
      }
    ],
    takeaways: [
      'Forms collect user data and package it into HTTP request payloads.',
      'Always connect <label for="id"> with <input id="id"> for accessibility and touch ergonomics.',
      'Use semantic input types (email, number, date) for native validation and mobile keyboard optimization.',
      'Differentiate between type="submit" (submits form) and type="button" (custom JS action).'
    ],
    caseStudyReference: {
      title: 'How CRP India Applies This Concept',
      description: 'The citizen complaint submission form in CRP India features strict input-label pairings, category selects, character counters on textareas, and mobile camera file inputs.',
      files: ['reference-projects/CRP-India/frontend/src/pages/ComplaintForm.jsx']
    },
    prevLessonSlug: 'html-document-structure-and-semantics',
    nextLessonSlug: 'css-box-model-and-selectors'
  },

  // =========================================================================
  // COURSE 4: CSS FROM ZERO
  // =========================================================================
  'css-box-model-and-selectors': {
    id: 'lesson-4-1',
    slug: 'css-box-model-and-selectors',
    courseSlug: 'css-responsive-design',
    courseTitle: 'Course 4: CSS from Zero',
    title: 'The CSS Box Model, Selectors & Cascade',
    estimatedMinutes: 30,
    summary: 'Understand the physical geometry of web layouts: margins, borders, padding, content, box-sizing: border-box, and CSS custom properties.',
    objectives: [
      'Understand how the browser calculates element dimensions via the CSS Box Model.',
      'Master the critical rule: box-sizing: border-box.',
      'Learn selector types (element, class, ID) and specificity rules.',
      'Use CSS custom properties (variables) for consistent color themes.'
    ],
    sections: [
      {
        heading: '1. What is CSS?',
        content: `**CSS (Cascading Style Sheets)** controls how HTML elements are presented visually on screens, tablets, and print.

While HTML defines *what* content is, CSS defines *how* that content looks: typography, colors, borders, spacing, and layout positions.`
      },
      {
        heading: '2. The CSS Box Model: Everything is a Box',
        content: `In CSS, the browser treats every single HTML element as a rectangular box. That box consists of four concentric layers from inside out:

1. **Content**: The actual text, image, or video inside the element.
2. **Padding**: Transparent space *inside* the element, surrounding the content.
3. **Border**: The visible stroke line wrapping around the padding and content.
4. **Margin**: Transparent space *outside* the element, pushing away adjacent elements.`
      },
      {
        heading: '3. The box-sizing: border-box Rule',
        content: `By default in legacy CSS (\`box-sizing: content-box\`), if you set \`width: 200px\` and add \`padding: 20px\` and \`border: 2px\`, the actual rendered width becomes \`244px\` (200 + 20 + 20 + 2 + 2). This calculation caused countless layout bugs.

Modern web development uses this universal reset in \`tokens.css\` / \`main.css\`:
\`\`\`css
*, *::before, *::after {
  box-sizing: border-box;
}
\`\`\`
With **border-box**, setting \`width: 200px\` guarantees the box will never exceed 200px. Any padding and borders are absorbed *inside* the declared width!`
      },
      {
        heading: '4. CSS Selectors and Specificity',
        content: `CSS targets elements using rules called selectors:
- **Element Selector**: \`p { color: #333; }\` (targets all paragraphs).
- **Class Selector**: \`.btn-primary { background: #10b981; }\` (reusable across multiple elements).
- **ID Selector**: \`#submit-btn { ... }\` (unique to a single element; avoid for general styling).

**Specificity** determines which rule wins when multiple rules target the same element:
\`Inline styles > ID (#id) > Class (.class) > Element (tag)\`.`
      },
      {
        heading: '5. CSS Variables (Custom Properties) for Theming',
        content: `Instead of hardcoding hex colors across hundreds of CSS lines, define reusable variables on \`:root\`:`,
        codeSnippet: `:root {
  --color-brand: #10b981;
  --color-bg: #ffffff;
  --color-text: #0f172a;
}

[data-theme="dark"] {
  --color-bg: #0f172a;
  --color-text: #f8fafc;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
}`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Forgetting box-sizing: border-box on your CSS reset.',
        whyItHappens: 'Beginners set width: 50% on two columns, add padding, and wonder why the second column drops to the next line.',
        howToFix: 'Apply box-sizing: border-box globally to all elements.'
      },
      {
        mistake: 'Using !important to solve specificity conflicts.',
        whyItHappens: 'A style does not apply because of a more specific selector, so the developer forces it with !important.',
        howToFix: 'Avoid !important. Keep specificity low and predictable by styling with single class names.'
      }
    ],
    guidedExercise: {
      id: 'ex-4-1',
      title: 'Exercise: Creating a Card with the CSS Box Model',
      instructions: 'Write CSS rules for a reusable card component utilizing content, padding, border, and margin.',
      tasks: [
        'Apply box-sizing: border-box.',
        'Give .card a max-width of 360px and a background color.',
        'Add 1.5rem of internal padding so content does not touch the borders.',
        'Add a subtle 1px solid border and 8px border-radius.',
        'Add 1rem of bottom margin to separate stacked cards.'
      ],
      starterCode: `.card {
  /* Add your box model properties here */
}`,
      language: 'css',
      hints: [
        'Padding creates breathing room inside the border.',
        'Margin creates breathing room outside the border.'
      ],
      solution: {
        explanation: 'Using border-box guarantees the card will never exceed 360px regardless of the padding or border width.',
        code: `.card {
  box-sizing: border-box;
  max-width: 360px;
  padding: 1.5rem;
  background-color: var(--color-bg-card, #ffffff);
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: 8px;
  margin-bottom: 1rem;
}`
      }
    },
    quiz: [
      {
        id: 'q-4-1-1',
        question: 'Which layer of the CSS Box Model represents the space between the content and the border?',
        options: ['Margin', 'Padding', 'Outline', 'Viewport'],
        correctIndex: 1,
        explanation: 'Padding is the interior breathing room between the element content and its surrounding border.'
      },
      {
        id: 'q-4-1-2',
        question: 'What is the primary benefit of setting box-sizing: border-box globally?',
        options: [
          'It forces all text to uppercase.',
          'Declared width and height include padding and borders, preventing layout overflow bugs.',
          'It makes images load twice as fast.',
          'It disables all margins.'
        ],
        correctIndex: 1,
        explanation: 'With border-box, padding and border widths are included inside the specified width, making responsive layout calculations straightforward.'
      },
      {
        id: 'q-4-1-3',
        question: 'How do you reference a CSS custom property (variable) named --brand-color in a rule?',
        options: [
          'color: $brand-color;',
          'color: var(--brand-color);',
          'color: #--brand-color;',
          'color: const(--brand-color);'
        ],
        correctIndex: 1,
        explanation: 'CSS variables are referenced using the native var(--variable-name) function syntax.'
      }
    ],
    takeaways: [
      'Every HTML element is rendered as a box: content, padding, border, margin.',
      'Always use box-sizing: border-box to keep width calculations predictable.',
      'Prefer class selectors (.card) over IDs (#card) or !important.',
      'Use CSS variables on :root to power scalable design systems and dark mode.'
    ],
    caseStudyReference: {
      title: 'How Dev-root and CRP India Apply This Concept',
      description: 'Dev-root defines all theme tokens in src/styles/tokens.css, mapping colors, borders, and spacing to CSS variables that switch seamlessly between dark and light modes.',
      files: ['src/styles/tokens.css', 'src/styles/main.css']
    },
    prevLessonSlug: 'html-forms-and-accessible-inputs',
    nextLessonSlug: 'css-flexbox-and-grid'
  },

  'css-flexbox-and-grid': {
    id: 'lesson-4-2',
    slug: 'css-flexbox-and-grid',
    courseSlug: 'css-responsive-design',
    courseTitle: 'Course 4: CSS from Zero',
    title: 'Responsive Layouts with Flexbox & CSS Grid',
    estimatedMinutes: 35,
    summary: 'Build modern responsive layouts: Flexbox for one-dimensional alignment, CSS Grid for two-dimensional page structures, and media queries.',
    objectives: [
      'Master Flexbox container properties: display: flex, justify-content, align-items, flex-direction.',
      'Master CSS Grid: grid-template-columns, gap, and repeat(auto-fit, minmax()).',
      'Understand when to choose Flexbox vs CSS Grid.',
      'Write mobile-first media queries that adapt cleanly to all screen sizes.'
    ],
    sections: [
      {
        heading: '1. Why Old Layout Hacks (Floats and Tables) are Obsolete',
        content: `In the early days of web design, aligning items side by side required messy hacks like \`float: left\` and \`clear: both\`, or rigid HTML tables.

Modern CSS provides two powerful, native layout engines:
1. **Flexbox**: Designed for **one-dimensional** layouts (a row OR a column).
2. **CSS Grid**: Designed for **two-dimensional** layouts (rows AND columns simultaneously).`
      },
      {
        heading: '2. Flexbox Fundamentals',
        content: `To activate Flexbox, apply \`display: flex\` to a parent container. All immediate children become **flex items**.

Key container properties:
- \`justify-content\`: Aligns items along the **main axis** (horizontal by default):
  - \`flex-start\`, \`center\`, \`flex-end\`, \`space-between\`.
- \`align-items\`: Aligns items along the **cross axis** (vertical by default):
  - \`stretch\`, \`center\`, \`flex-start\`, \`flex-end\`.
- \`gap: 1rem\`: Adds clean spacing between items without needing margin hacks!
- \`flex-wrap: wrap\`: Allows items to wrap onto the next line on narrow screens.`,
        codeSnippet: `/* Perfect vertical & horizontal centering with Flexbox */
.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}`
      },
      {
        heading: '3. CSS Grid: Two-Dimensional Powerhouse',
        content: `CSS Grid allows you to define rows and columns with mathematical precision.

The single most useful CSS Grid snippet in web development is the **responsive auto-fit grid**:
\`\`\`css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
\`\`\`
How it works:
- \`repeat(auto-fit, ...)\`: Automatically computes how many columns fit on screen.
- \`minmax(280px, 1fr)\`: Each column will be at least \`280px\` wide, but expands to fill available space (\`1fr\` = 1 fraction) if space permits.
- **Zero media queries required!** On a mobile phone, it wraps into 1 column. On a tablet, 2 columns. On a desktop, 3 or 4 columns.`
      },
      {
        heading: '4. Mobile-First Media Queries',
        content: `Always write your base CSS for mobile screens first, then use \`min-width\` media queries to layer on desktop layouts:
\`\`\`css
/* Base styles (Mobile) */
.sidebar-layout {
  display: flex;
  flex-direction: column;
}

/* Tablet & Desktop: apply when screen >= 768px */
@media (min-width: 768px) {
  .sidebar-layout {
    flex-direction: row;
  }
}
\`\`\``
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using CSS Grid when a simple Flexbox row is all that is needed.',
        whyItHappens: 'Developers learn Grid and try to use it for single-line navigation bars.',
        howToFix: 'Use Flexbox for single-direction alignment (navbars, button groups). Use Grid for card collections and multi-column layouts.'
      },
      {
        mistake: 'Writing desktop-first media queries with max-width.',
        whyItHappens: 'Developers build on high-resolution monitors first.',
        howToFix: 'Start on mobile screens. Mobile-first styles (min-width) result in significantly cleaner, more maintainable code.'
      }
    ],
    guidedExercise: {
      id: 'ex-4-2',
      title: 'Exercise: Building a Responsive Card Grid',
      instructions: 'Create a responsive grid of feature cards that adapts across mobile and desktop viewports.',
      tasks: [
        'Apply display: grid to .feature-grid.',
        'Use repeat(auto-fit, minmax(260px, 1fr)) to make columns responsive.',
        'Set gap: 1.5rem.',
        'Style the cards inside with padding and subtle borders.'
      ],
      starterCode: `.feature-grid {
  /* Complete the CSS Grid properties */
}`,
      language: 'css',
      hints: [
        'minmax(260px, 1fr) ensures cards do not shrink narrower than 260px.',
        'auto-fit wraps cards automatically onto new rows.'
      ],
      solution: {
        explanation: 'This modern CSS pattern eliminates the need for manual breakpoints for card grids.',
        code: `.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: var(--color-bg-card);
}`
      }
    },
    quiz: [
      {
        id: 'q-4-2-1',
        question: 'Which tool is best suited for aligning items in a single direction (e.g. a navbar with logo on the left and links on the right)?',
        options: ['CSS Table', 'Flexbox', 'Floats', 'CSS Animations'],
        correctIndex: 1,
        explanation: 'Flexbox is specifically designed for 1-dimensional layouts (a single row or column), making it ideal for navigation bars.'
      },
      {
        id: 'q-4-2-2',
        question: 'What does the CSS Grid snippet "repeat(auto-fit, minmax(250px, 1fr))" accomplish?',
        options: [
          'It forces exactly 3 columns regardless of screen size.',
          'It automatically fits as many columns as possible that are at least 250px wide, expanding to fill leftover space.',
          'It hides all images on mobile phones.',
          'It limits the entire grid to 250px total width.'
        ],
        correctIndex: 1,
        explanation: 'auto-fit calculates how many columns of at least 250px can fit in the row, and 1fr expands them evenly across remaining space.'
      },
      {
        id: 'q-4-2-3',
        question: 'What is the philosophy behind mobile-first responsive design?',
        options: [
          'Never allowing desktop computers to view the website.',
          'Writing base styles for small screens first, then using min-width media queries to enhance the layout for wider screens.',
          'Using images that only load on iPhones.',
          'Disabling all CSS animations on laptops.'
        ],
        correctIndex: 1,
        explanation: 'Mobile-first design defines simpler, single-column styles as the baseline, progressively enhancing layout for larger screens using min-width media queries.'
      }
    ],
    takeaways: [
      'Use Flexbox for 1-dimensional alignment (navbars, toolbars, icon text pairs).',
      'Use CSS Grid for 2-dimensional layouts and fluid card collections.',
      'repeat(auto-fit, minmax(min, 1fr)) delivers responsive grids without media queries.',
      'Write mobile-first CSS with min-width media queries.'
    ],
    caseStudyReference: {
      title: 'How Dev-root and CRP India Apply This Concept',
      description: 'Dev-root uses responsive grid helpers in src/styles/main.css (.grid-cols-3, .grid-cols-4) that collapse gracefully on mobile viewports.',
      files: ['src/styles/main.css', 'reference-projects/CRP-India/frontend/src/pages/Home.jsx']
    },
    prevLessonSlug: 'css-box-model-and-selectors',
    nextLessonSlug: 'javascript-variables-types-and-logic'
  },

  // =========================================================================
  // COURSE 5: JAVASCRIPT FUNDAMENTALS
  // =========================================================================
  'javascript-variables-types-and-logic': {
    id: 'lesson-5-1',
    slug: 'javascript-variables-types-and-logic',
    courseSlug: 'javascript-fundamentals',
    courseTitle: 'Course 5: JavaScript Fundamentals',
    title: 'Variables, Data Types & Control Flow',
    estimatedMinutes: 35,
    summary: 'Start programming from zero: what programming is, declaring variables with let/const, primitive data types, operators, and conditional branching.',
    objectives: [
      'Understand what programming is: instructing computers through statements and logic.',
      'Declare variables using let and const, and understand why var is obsolete.',
      'Work with primitive data types: String, Number, Boolean, null, undefined.',
      'Control program flow with if, else if, else, and comparison operators (===).'
    ],
    sections: [
      {
        heading: '1. What is Programming?',
        content: `Programming is the craft of writing step-by-step instructions that a computer can execute deterministically.

Computers are extremely fast, but they have zero intuition. They do exactly what you write. If you miss a semicolon, misspell a variable name, or introduce an impossible condition, the computer will stop and report an error.`
      },
      {
        heading: '2. Storing Data: let vs const',
        content: `A **variable** is a named box in computer memory that holds a value:

- **\`const\` (Constant)**: Use by default for any value that should not be reassigned.
  \`\`\`javascript
  const platformName = "Dev-root";
  platformName = "Other"; // TypeError: Assignment to constant variable!
  \`\`\`
- **\`let\`**: Use when you explicitly expect the value to change over time (like a score or loop counter).
  \`\`\`javascript
  let currentScore = 0;
  currentScore = currentScore + 10; // Allowed!
  \`\`\`
- **\`var\`**: Legacy JavaScript keyword. It suffers from confusing hoisting and function-scoping bugs. Modern professional JavaScript does not use \`var\`.`
      },
      {
        heading: '3. Core Data Types in JavaScript',
        content: `JavaScript values belong to specific data types:

- **String**: Text wrapped in quotes: \`"Hello"\`, \`'World'\`, or template literals \`\` \`Score: \${score}\` \`\`.
- **Number**: Integers or floating-point decimals: \`42\`, \`3.14\`, \`-10\`.
- **Boolean**: Logical truth values: \`true\` or \`false\`.
- **null**: Intentional absence of any value.
- **undefined**: A variable that has been declared but not assigned any value.`
      },
      {
        heading: '4. Comparisons and Conditional Branching (if / else)',
        content: `Computers make decisions based on logical conditions:

Always use **strict equality (\`===\`)** instead of loose equality (\`==\`). Strict equality checks both value AND data type without dangerous type coercion.

\`\`\`javascript
const userRole = "admin";

if (userRole === "admin") {
  console.log("Access granted to municipal dashboard.");
} else if (userRole === "supervisor") {
  console.log("Access granted to department tickets.");
} else {
  console.log("Access restricted: standard citizen view.");
}
\`\`\``
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using loose equality == instead of strict equality ===.',
        whyItHappens: 'Beginners see two equals and think it is sufficient.',
        howToFix: '== converts types unpredictably (for example, "0" == false is true!). Always use === and !==.'
      },
      {
        mistake: 'Confusing single = (assignment) with triple === (comparison).',
        whyItHappens: 'Writing if (role = "admin") by mistake.',
        howToFix: 'Single = assigns a value. Triple === compares two values.'
      }
    ],
    guidedExercise: {
      id: 'ex-5-1',
      title: 'Exercise: Writing a Grievance Priority Evaluator',
      instructions: 'Write a JavaScript conditional script that evaluates priority based on days pending.',
      tasks: [
        'Declare a variable "daysPending" with a number value.',
        'If daysPending is greater than 14, print "CRITICAL: Urgent resolution required".',
        'Else if daysPending is greater than 7, print "WARNING: Approaching SLA breach".',
        'Else, print "NORMAL: Within standard turnaround time".'
      ],
      starterCode: `const daysPending = 10;

// Write your if / else if / else logic here`,
      language: 'javascript',
      hints: [
        'Use the greater-than operator: >',
        'Check conditions in descending order of urgency.'
      ],
      solution: {
        explanation: 'Evaluating conditions sequentially ensures the most urgent tier triggers first.',
        code: `const daysPending = 10;

if (daysPending > 14) {
  console.log("CRITICAL: Urgent resolution required");
} else if (daysPending > 7) {
  console.log("WARNING: Approaching SLA breach");
} else {
  console.log("NORMAL: Within standard turnaround time");
}`
      }
    },
    quiz: [
      {
        id: 'q-5-1-1',
        question: 'When should you declare a variable with "const" versus "let"?',
        options: [
          'Always use let because const is slower.',
          'Use const by default for values that do not change; use let only when reassignment is needed.',
          'Use const for numbers and let for strings.',
          'Never use const in modern JavaScript.'
        ],
        correctIndex: 1,
        explanation: 'Modern JavaScript best practice is to declare everything with const by default. Only switch to let when the variable will be reassigned (like counters).'
      },
      {
        id: 'q-5-1-2',
        question: 'What is the result of the comparison: 5 === "5"?',
        options: ['true', 'false', 'undefined', 'SyntaxError'],
        correctIndex: 1,
        explanation: 'Strict equality (===) compares both value and type. Because 5 is a Number and "5" is a String, 5 === "5" evaluates to false.'
      },
      {
        id: 'q-5-1-3',
        question: 'What happens if you declare "const score = 100;" and then try to run "score = 150;"?',
        options: [
          'The score updates smoothly to 150.',
          'JavaScript throws a TypeError: Assignment to constant variable.',
          'The variable is deleted.',
          'The computer shuts down.'
        ],
        correctIndex: 1,
        explanation: 'Variables declared with const cannot be reassigned; doing so throws a runtime TypeError.'
      }
    ],
    takeaways: [
      'Use const by default; use let only when reassignment is explicitly required.',
      'Never use var in modern code.',
      'Always use strict equality === to avoid dangerous type coercion bugs.',
      'Control flow (if / else if / else) allows programs to branch based on conditions.'
    ],
    caseStudyReference: {
      title: 'How CRP India Applies This Concept',
      description: 'The CRP India status middleware in backend/src/middleware/auth.js inspects req.user.role using strict equality === to verify if a user has municipal privileges before permitting ticket modifications.',
      files: ['reference-projects/CRP-India/backend/src/middleware/auth.js']
    },
    prevLessonSlug: 'css-flexbox-and-grid',
    nextLessonSlug: 'javascript-functions-and-scope'
  },

  'javascript-functions-and-scope': {
    id: 'lesson-5-2',
    slug: 'javascript-functions-and-scope',
    courseSlug: 'javascript-fundamentals',
    courseTitle: 'Course 5: JavaScript Fundamentals',
    title: 'Functions, Parameters, Return Values & Scope',
    estimatedMinutes: 40,
    summary: 'Master reusable logic: declaring functions, parameters vs arguments, return values, arrow functions, and lexical scope.',
    objectives: [
      'Understand why functions exist: reusability, modularity, and abstraction.',
      'Declare and invoke functions with parameters and return values.',
      'Differentiate parameters (placeholders) from arguments (actual values passed).',
      'Understand variable scope (global vs function vs block scope).'
    ],
    sections: [
      {
        heading: '1. What is a Function?',
        content: `A **function** is a reusable block of code designed to perform a specific calculation or action.

Instead of copying and pasting the same 10 lines of code in 5 different places, you write the logic once inside a function and call it whenever needed.`
      },
      {
        heading: '2. Function Anatomy: Parameters and Return Values',
        content: `\`\`\`javascript
// 1. Function Declaration
function calculateTotal(subtotal, taxRate = 0.08) {
  const tax = subtotal * taxRate;
  const total = subtotal + tax;
  return total; // Sends the result back to the caller
}

// 2. Function Invocation (Calling the function)
const finalPrice = calculateTotal(100);
console.log(finalPrice); // 108
\`\`\`

- **Parameters**: \`subtotal\` and \`taxRate\` are variables defined in the function signature (placeholders).
- **Arguments**: \`100\` is the actual concrete value passed during the call.
- **Return Value**: The \`return\` keyword hands the computed value back to whoever called the function and immediately terminates function execution.`
      },
      {
        heading: '3. Arrow Functions (ES6)',
        content: `Modern JavaScript provides a concise syntax called **Arrow Functions**:
\`\`\`javascript
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function equivalent
const add = (a, b) => a + b;
\`\`\`
If the arrow function body is a single expression, the \`return\` keyword and curly braces can be omitted for clean, readable code.`
      },
      {
        heading: '4. Variable Scope: Block vs. Function Scope',
        content: `**Scope** determines where variables are accessible in your code:

- **Block Scope (\`let\` / \`const\`)**: Any variable declared inside curly braces \`{ ... }\` exists ONLY inside those braces.
\`\`\`javascript
if (true) {
  const secretKey = "12345";
}
console.log(secretKey); // ReferenceError: secretKey is not defined!
\`\`\`
Variables declared outside any function or block have **Global Scope** and can be accessed anywhere. Limit global variables to prevent accidental naming collisions.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Forgetting the return keyword in a function.',
        whyItHappens: 'Beginners write a function that calculates a value and assume it automatically exits with the result.',
        howToFix: 'A function without an explicit return statement automatically returns undefined. Always write return myResult;'
      },
      {
        mistake: 'Confusing console.log() with return.',
        whyItHappens: 'console.log prints text to the screen; it does NOT return data back to calling code.',
        howToFix: 'Use return when you need another part of your program to use the calculated value.'
      }
    ],
    guidedExercise: {
      id: 'ex-5-2',
      title: 'Exercise: Writing a SLA Status Helper Function',
      instructions: 'Write a reusable function that calculates whether a complaint is overdue based on creation date.',
      tasks: [
        'Define a function "isComplaintOverdue" taking two parameters: "createdDaysAgo" and "slaThreshold" (default 7).',
        'Return true if createdDaysAgo exceeds slaThreshold, otherwise return false.',
        'Test the function by invoking it with 5 days and 10 days, logging the boolean outputs.'
      ],
      starterCode: `function isComplaintOverdue(createdDaysAgo, slaThreshold = 7) {
  // Return true if overdue, false otherwise
}`,
      language: 'javascript',
      hints: [
        'You can return the comparison expression directly: return createdDaysAgo > slaThreshold;'
      ],
      solution: {
        explanation: 'Writing pure functions with default arguments makes business logic testable and reusable across your application.',
        code: `function isComplaintOverdue(createdDaysAgo, slaThreshold = 7) {
  return createdDaysAgo > slaThreshold;
}

console.log(isComplaintOverdue(5));  // false
console.log(isComplaintOverdue(10)); // true`
      }
    },
    quiz: [
      {
        id: 'q-5-2-1',
        question: 'What does a JavaScript function return if it executes to the end without reaching a "return" statement?',
        options: ['0', 'null', 'undefined', 'false'],
        correctIndex: 2,
        explanation: 'If a function finishes executing without hitting an explicit return statement, it implicitly returns undefined.'
      },
      {
        id: 'q-5-2-2',
        question: 'What is the scope of a variable declared with "const" inside an if-statement block?',
        options: [
          'Global scope: accessible anywhere in the file.',
          'Block scope: accessible only inside the curly braces of that if-statement.',
          'Window scope: stored on the browser window object.',
          'Database scope: saved directly to MongoDB.'
        ],
        correctIndex: 1,
        explanation: 'Variables declared with const or let have block scope, meaning they exist strictly within the enclosing { } curly braces.'
      },
      {
        id: 'q-5-2-3',
        question: 'What is the key difference between console.log() and the return statement?',
        options: [
          'There is no difference.',
          'console.log() prints text to the debugging console; return passes a value back to the caller for use in the program.',
          'return only works in HTML.',
          'console.log() can only print numbers.'
        ],
        correctIndex: 1,
        explanation: 'console.log() is strictly a diagnostic tool to inspect values in DevTools. return actually hands a value back to the code that called the function.'
      }
    ],
    takeaways: [
      'Functions encapsulate reusable logic and compute outputs from input parameters.',
      'Differentiate parameters (definitions) from arguments (values passed).',
      'Always use return to pass results back to the caller.',
      'Variables declared with const and let are block-scoped to their nearest curly braces.'
    ],
    caseStudyReference: {
      title: 'How CRP India Applies This Concept',
      description: 'The CRP India complaint service in backend/src/controllers/complaintController.js organizes operations into clean modular functions (getComplaints, createComplaint, updateStatus) that return JSON response data.',
      files: ['reference-projects/CRP-India/backend/src/controllers/complaintController.js']
    },
    prevLessonSlug: 'javascript-variables-types-and-logic',
    nextLessonSlug: 'dom-manipulation-and-events'
  },

  // =========================================================================
  // COURSE 6: THE BROWSER AND THE DOM
  // =========================================================================
  'dom-manipulation-and-events': {
    id: 'lesson-6-1',
    slug: 'dom-manipulation-and-events',
    courseSlug: 'browser-and-dom',
    courseTitle: 'Course 6: The Browser and the DOM',
    title: 'Selecting Elements, Modifying Content & Events',
    estimatedMinutes: 40,
    summary: 'Make web pages interactive: understand the Document Object Model (DOM), select elements with querySelector, update classes, and handle click and input events.',
    objectives: [
      'Understand what the DOM is and how HTML is parsed into an in-memory object tree.',
      'Select elements using document.querySelector and document.querySelectorAll.',
      'Read and update text, attributes, and class lists dynamically.',
      'Attach event listeners using addEventListener to handle user clicks and input.'
    ],
    sections: [
      {
        heading: '1. What is the DOM (Document Object Model)?',
        content: `When a browser loads an HTML document, it does not just treat it as static text. It translates every HTML tag into a JavaScript object in memory.

This in-memory hierarchy of objects is called the **Document Object Model (DOM)**.

Through the global \`document\` object, JavaScript can:
- Change text and HTML inside any element.
- Add or remove CSS classes to toggle styles and animations.
- Listen for user actions (clicks, keypresses, scrolls, form submissions).
- Create brand new elements and append them to the page.`
      },
      {
        heading: '2. Selecting Elements from the Page',
        content: `Modern JavaScript uses the powerful CSS selector API:

- **\`document.querySelector('.my-class')\`**: Returns the **first** element that matches the CSS selector.
- **\`document.querySelectorAll('.my-class')\`**: Returns a list (NodeList) of **all** matching elements.

\`\`\`javascript
const submitButton = document.querySelector('#submit-btn');
const allCards = document.querySelectorAll('.course-card');
\`\`\``
      },
      {
        heading: '3. Modifying Text, Attributes, and Classes',
        content: `Once you have a reference to an element:

\`\`\`javascript
const title = document.querySelector('h1');

// 1. Update text safely (avoids XSS vulnerabilities)
title.textContent = "Welcome to Dev-root!";

// 2. Toggle CSS classes
title.classList.add('highlighted');
title.classList.remove('dimmed');
title.classList.toggle('dark-mode');

// 3. Update attributes
const link = document.querySelector('a');
link.setAttribute('href', 'https://devroot.dev');
\`\`\``
      },
      {
        heading: '4. Handling Events with addEventListener',
        content: `Web applications feel alive because they react to user actions. You register an **event listener** to specify what code runs when an event occurs:

\`\`\`javascript
const button = document.querySelector('#counter-btn');
const display = document.querySelector('#counter-display');
let count = 0;

button.addEventListener('click', (event) => {
  count += 1;
  display.textContent = \`Count: \${count}\`;
});
\`\`\`
The event object (\`event\`) contains useful metadata: which mouse button was pressed, keyboard keys, and the target element.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using innerHTML with untrusted user input.',
        whyItHappens: 'innerHTML allows inserting HTML strings easily.',
        howToFix: 'If an attacker types <script>alert("hacked")</script> into a comment and you insert it with innerHTML, it executes in the user browser (Cross-Site Scripting or XSS). Always use textContent for user text.'
      },
      {
        mistake: 'Running querySelector before the HTML has finished loading.',
        whyItHappens: 'Putting <script> in the <head> without defer.',
        howToFix: 'If the script runs before the DOM elements exist, querySelector returns null. Put your script at the bottom of <body> or use the defer attribute in <script defer src="app.js">.'
      }
    ],
    guidedExercise: {
      id: 'ex-6-1',
      title: 'Exercise: Building a Dark Mode Toggle',
      instructions: 'Write the JavaScript to toggle a dark-mode class on the <body> whenever a button is clicked.',
      tasks: [
        'Select the button with id="theme-toggle" using document.querySelector.',
        'Attach a "click" event listener using addEventListener.',
        'Inside the callback function, toggle the "dark-theme" class on document.body using classList.toggle.',
        'Update the button textContent to reflect the current mode.'
      ],
      starterCode: `const themeBtn = document.querySelector('#theme-toggle');

// Attach your click event listener here`,
      language: 'javascript',
      hints: [
        'document.body.classList.toggle("dark-theme") returns true if the class was added, false if removed.'
      ],
      solution: {
        explanation: 'classList.toggle simplifies theme switching by handling adding and removing in one clean call.',
        code: `const themeBtn = document.querySelector('#theme-toggle');

themeBtn.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-theme');
  themeBtn.textContent = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
});`
      }
    },
    quiz: [
      {
        id: 'q-6-1-1',
        question: 'Why is element.textContent preferred over element.innerHTML when displaying user input?',
        options: [
          'Because textContent is only available in Chrome.',
          'Because innerHTML can execute malicious scripts submitted by attackers (Cross-Site Scripting / XSS).',
          'Because textContent converts all text to uppercase.',
          'Because innerHTML deletes the element.'
        ],
        correctIndex: 1,
        explanation: 'textContent treats all input strictly as plain text, neutralizing any injected HTML/scripts and preventing XSS attacks.'
      },
      {
        id: 'q-6-1-2',
        question: 'What does document.querySelector(".btn") return if there are 5 elements with class "btn" on the page?',
        options: [
          'All 5 elements in an array.',
          'Only the first matching element found in the document.',
          'null',
          'A SyntaxError.'
        ],
        correctIndex: 1,
        explanation: 'document.querySelector returns the first matching element. To retrieve all 5 elements, you must use document.querySelectorAll.'
      },
      {
        id: 'q-6-1-3',
        question: 'What happens if you run document.querySelector("#my-btn") before the HTML for #my-btn has loaded?',
        options: [
          'It returns null, and subsequent method calls on it will throw a TypeError.',
          'The browser pauses until the button finishes loading.',
          'The button is automatically created.',
          'The page redirects to Google.'
        ],
        correctIndex: 0,
        explanation: 'If the script executes before the DOM parser encounters the element, querySelector returns null. Calling .addEventListener on null throws a TypeError: Cannot read properties of null.'
      }
    ],
    takeaways: [
      'The DOM is the live, in-memory object representation of the HTML document.',
      'Select elements using document.querySelector and document.querySelectorAll.',
      'Use textContent to update text safely without XSS vulnerabilities.',
      'Attach user interactions with element.addEventListener("event", callback).'
    ],
    caseStudyReference: {
      title: 'How Dev-root and CRP India Apply This Concept',
      description: 'Dev-root uses React state and event listeners to toggle themes and track progress. React components under the hood synchronize these changes into the real browser DOM efficiently.',
      files: ['src/context/ThemeContext.jsx', 'reference-projects/CRP-India/frontend/src/context/AuthContext.jsx']
    },
    prevLessonSlug: 'javascript-functions-and-scope',
    nextLessonSlug: 'git-fundamentals-and-commits'
  },

  // =========================================================================
  // COURSE 8: GIT, GITHUB & COLLABORATION
  // =========================================================================
  'git-fundamentals-and-commits': {
    id: 'lesson-8-1',
    slug: 'git-fundamentals-and-commits',
    courseSlug: 'git-and-github',
    courseTitle: 'Course 8: Git, GitHub, and Collaboration',
    title: 'Git Mental Model, Repositories & Commits',
    estimatedMinutes: 35,
    summary: 'Track source code like a professional engineer: repositories, the three trees of Git, crafting atomic commits, and pushing to GitHub.',
    objectives: [
      'Understand why version control is mandatory in professional software engineering.',
      'Master the three trees of Git: Working Directory, Staging Area, and Repository History.',
      'Use foundational Git commands: git init, git status, git add, git commit -m.',
      'Understand how local repositories connect to remote hosts like GitHub.'
    ],
    sections: [
      {
        heading: '1. Why Version Control Matters',
        content: `Before version control, people saved files as \`project_final.zip\`, \`project_final_v2.zip\`, \`project_final_REAL_FINAL.zip\`. If something broke, it was nearly impossible to figure out what changed or revert safely.

**Git** is a distributed version control system created by Linus Torvalds. It tracks the complete history of every change made to a codebase over time.

With Git, you can:
- Travel back in time to any point in the project history.
- Experiment with new features on separate **branches** without risking working code.
- Collaborate with thousands of developers across the world without overwriting each other's work.`
      },
      {
        heading: '2. The Three Trees of Git',
        content: `Understanding Git requires visualizing its three distinct zones:

1. **Working Directory**: The actual files on your hard drive that you are currently editing in VS Code.
2. **Staging Area (Index)**: A preparation area where you select exactly which modified files should be included in the next snapshot.
3. **Repository (.git directory)**: The permanent history of committed snapshots.`,
        diagram: `+--------------------+      git add      +------------------+     git commit    +--------------------+
| WORKING DIRECTORY  | ----------------> |   STAGING AREA   | ----------------> |  GIT REPOSITORY    |
| (Your active files)|                   | (The index)      |                   | (Permanent history)|
+--------------------+                   +------------------+                   +--------------------+`
      },
      {
        heading: '3. The Fundamental Git Workflow',
        content: `The everyday developer loop consists of 4 commands:

1. **\`git status\`**: Check which files have been modified or staged.
2. **\`git add <file>\`**: Move modified files from the working directory into the staging area.
3. **\`git commit -m "Descriptive message"\`**: Seal the staged changes into a permanent snapshot in history.
4. **\`git push origin main\`**: Transmit your local commits to your remote repository on GitHub.`
      },
      {
        heading: '4. Crafting Clean Atomic Commits',
        content: `A good Git commit is **atomic**: it addresses one single logical task (such as adding a navigation bar or fixing a login bug).

Write commit messages in the imperative mood, summarizing what the commit accomplishes:
- Good: \`feat: add responsive navigation bar with dark mode toggle\`
- Good: \`fix: prevent form submission when email is missing\`
- Bad: \`fixed stuff\`
- Bad: \`asdfghjkl\``
      }
    ],
    commonMistakes: [
      {
        mistake: 'Committing node_modules or secret .env files.',
        whyItHappens: 'Running git add . without configuring a .gitignore file.',
        howToFix: 'Always create a .gitignore file listing node_modules/, dist/, and .env. Secrets committed to GitHub can be scanned by bots within seconds.'
      },
      {
        mistake: 'Using git push --force on shared branches.',
        whyItHappens: 'A branch has diverged, so a developer forces their version.',
        howToFix: 'Force push overwrites remote history and can permanently destroy colleagues\' work. Never use force push unless specifically fixing your own private branch.'
      }
    ],
    guidedExercise: {
      id: 'ex-8-1',
      title: 'Exercise: Initializing a Repository and Creating a Commit',
      instructions: 'Practice initializing a Git repository, staging files, and creating an atomic commit.',
      tasks: [
        'Open your terminal in an empty project folder.',
        'Run "git init" to create a new local repository.',
        'Create a README.md file: "echo # My Project > README.md"',
        'Check status: "git status" (notice untracked file).',
        'Stage the file: "git add README.md"',
        'Commit: git commit -m "docs: initialize project with README"',
        'View history: "git log --oneline"'
      ],
      starterCode: `# Sequence of commands:
git init
git status
git add README.md
git commit -m "docs: initialize project with README"
git log --oneline`,
      language: 'text',
      hints: [
        'git status is your best friend in Git. Run it whenever you want to see what is staged or modified.'
      ],
      solution: {
        explanation: 'Following this staging and commit cycle keeps your repository history clean and easy to inspect.',
        code: `# Output shows:
# [main (root-commit) 8f3a1b2] docs: initialize project with README
# 1 file changed, 1 insertion(+)`
      }
    },
    quiz: [
      {
        id: 'q-8-1-1',
        question: 'What is the purpose of the Git Staging Area (index)?',
        options: [
          'It is a backup drive on the cloud.',
          'It allows developers to curate and preview exactly which changes should be packaged into the next commit.',
          'It compresses images automatically.',
          'It deletes unused JavaScript files.'
        ],
        correctIndex: 1,
        explanation: 'The staging area allows you to selectively choose which file modifications belong together in an atomic commit snapshot.'
      },
      {
        id: 'q-8-1-2',
        question: 'Which file tells Git which folders and files (such as node_modules or .env) should never be tracked?',
        options: ['package.json', '.gitignore', 'README.md', 'index.html'],
        correctIndex: 1,
        explanation: 'The .gitignore file specifies pattern rules for files and folders that Git should ignore, preventing huge dependency folders and sensitive secrets from entering history.'
      },
      {
        id: 'q-8-1-3',
        question: 'What does "git log --oneline" display?',
        options: [
          'The first line of code in index.html.',
          'A compact list of historical commits showing their short SHA hash and commit message.',
          'The current download speed of the repository.',
          'A list of all users logged into GitHub.'
        ],
        correctIndex: 1,
        explanation: 'git log --oneline outputs a clean, condensed chronological list of repository commits with their commit hashes and descriptions.'
      }
    ],
    takeaways: [
      'Git tracks repository history across three zones: working directory, staging area, repository.',
      'Always configure a .gitignore file to exclude dependencies and secrets.',
      'Craft descriptive, atomic commits summarizing single tasks.',
      'Never use git push --force on shared branches.'
    ],
    caseStudyReference: {
      title: 'How Dev-root and CRP India Apply This Concept',
      description: 'Dev-root is version-controlled with Git on GitHub. Its .gitignore excludes build output (dist/) and dependencies (node_modules/), ensuring repository hygiene and safe automated deployments.',
      files: ['.gitignore', 'package.json']
    },
    prevLessonSlug: 'dom-manipulation-and-events',
    nextLessonSlug: null
  }
};
