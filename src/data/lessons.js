/**
 * Dev-root Lessons Data Definition
 * Contains verified, deep conceptual lessons for Phase 1.
 */

export const LESSONS = {
  'how-websites-work': {
    id: 'lesson-1-1',
    slug: 'how-websites-work',
    courseSlug: 'web-internet-fundamentals',
    courseTitle: 'Web & Internet Fundamentals',
    title: 'How Websites Work',
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
        content: `At its essence, the internet is not a mysterious cloud; it is a global network of connected computers communicating using agreed-upon rules (protocols).

When you use the web, two distinct computers participate in an ongoing conversation:

1. **The Client**: The computer or mobile device running a web browser (such as Google Chrome, Firefox, or Safari). The client is responsible for presenting information to human eyes, capturing user clicks, keystrokes, and touch events.
2. **The Server**: A computer permanently connected to the network that stores files, application code, and databases. The server listens 24/7 for requests arriving from clients, processes those requests, and returns responses.`,
        diagram: `+-----------------------+                    +------------------------+
|        CLIENT         |   HTTP Request     |         SERVER         |
|  (User's Web Browser) | -----------------> |  (Node.js / Cloud Host)|
|                       |                    |                        |
|  Displays HTML/CSS    |   HTTP Response    |  Executes Logic        |
|  Executes Client JS   | <----------------- |  Queries Database      |
+-----------------------+  (HTML, CSS, JSON) +------------------------+`
      },
      {
        heading: '2. The Three Core Pillars of the Web',
        content: `Every web page you view is assembled from three foundational building blocks that run inside the client browser:

- **HTML (HyperText Markup Language)**: The skeleton. HTML defines the semantic structure of the content: headings, paragraphs, lists, links, forms, and image placements.
- **CSS (Cascading Style Sheets)**: The presentation. CSS controls colors, fonts, spacing, responsive grid layouts, animations, and dark mode themes.
- **JavaScript (JS)**: The brain and nervous system. JavaScript makes pages interactive: validating form inputs before submission, toggling theme modes, updating data without reloading the browser, and communicating with servers in the background.`,
        codeSnippet: `<!-- A simple example of the 3 pillars in harmony -->
<!-- 1. HTML Structure -->
<button id="theme-btn" class="toggle-btn">Switch Theme</button>

/* 2. CSS Styling */
.toggle-btn {
  background-color: var(--color-brand-primary);
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 6px;
}

// 3. JavaScript Interactivity
const button = document.getElementById('theme-btn');
button.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});`
      },
      {
        heading: '3. Static Websites vs. Dynamic Web Applications',
        content: `Early websites were primarily **static**: HTML files stored on a server that looked identical for every visitor.

Modern websites like **Dev-root** and **CRP India** are **dynamic Single Page Applications (SPAs)**:
- The initial bundle loads lightweight HTML, CSS, and JavaScript.
- As the user interacts with the interface (such as filtering courses or tracking a complaint), client-side JavaScript sends background network requests (using the Fetch API).
- The server responds with raw data (usually in **JSON** format).
- The browser dynamically updates the screen without reloading the entire page.`
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
    courseTitle: 'Web & Internet Fundamentals',
    title: 'Frontend vs. Backend',
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
        content: `In full-stack web development, your code runs in two radically different environments:

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

The backend acts as an authoritative, secure gatekeeper. The frontend asks: *"Please file this complaint for citizen X"*. The backend verifies who the citizen is, sanitizes the inputs, ensures required fields exist, checks rate limits, and only then writes to the database.`,
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
        heading: '3. How They Communicate: APIs as the Bridge',
        content: `Because frontend and backend run on different machines, they communicate through **Application Programming Interfaces (APIs)**.

In web development, the most common standard is a **RESTful JSON API**:
1. The frontend initiates a request: \`POST /api/complaints\` with a JSON payload containing the category, location, and description.
2. The backend server authenticates the request, processes the data, and stores it in the database.
3. The server replies with an HTTP status code (\`201 Created\`) and a standardized response envelope:
\`\`\`json
{
  "success": true,
  "data": {
    "referenceId": "CRP-2026-00104",
    "status": "Submitted"
  }
}
\`\`\`
The frontend receives this response and renders a success banner or updates the complaint timeline.`
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
    courseTitle: 'Web & Internet Fundamentals',
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
2. **DNS Lookup (Domain Name System)**: Computers communicate over IP addresses (e.g., \`172.67.142.11\`), not words. The browser checks:
   - Browser DNS cache
   - Operating system DNS cache (hosts file)
   - Router DNS cache
   - Internet Service Provider (ISP) Recursive DNS Resolver
   Once found, the IP address of the target server is returned.`
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
        content: `Now the browser sends an HTTP request:
\`\`\`http
GET / HTTP/1.1
Host: devroot.dev
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Accept: text/html,application/xhtml+xml
\`\`\`

The server receives the request, routes it through reverse proxies and middleware, locates the resource, and responds:
\`\`\`http
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Content-Length: 1420

<!DOCTYPE html>
<html>
  <head>...
\`\`\``
      },
      {
        heading: 'Step 4: Browser Rendering Pipeline (Critical Rendering Path)',
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
    nextLessonSlug: null
  }
};
