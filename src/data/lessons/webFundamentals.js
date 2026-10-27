/**
 * Dev-root Course 1: Understanding the Web - Deep Learning Curriculum
 * Comprehensive lessons covering Internet vs Web, Clients & Servers,
 * DNS & TCP Handshakes, and HTTP Protocols & JSON Payloads.
 */

export const WEB_FUNDAMENTALS_LESSONS = {
  'how-websites-work': {
    id: 'lesson-1-1',
    slug: 'how-websites-work',
    courseId: 'course-1',
    courseSlug: 'web-internet-fundamentals',
    courseTitle: 'Course 1: Understanding the Web',
    title: 'How Websites Work: Clients, Servers & The Web',
    category: 'Fundamentals',
    estimatedTime: '25 min read & practice',
    objectives: [
      'Distinguish the physical global infrastructure of the Internet from the World Wide Web service.',
      'Understand the roles and architectural relationship of Clients and Servers in web development.',
      'Trace how web assets (HTML, CSS, JavaScript, media) travel across network boundaries.',
      'Understand why static files differ from dynamic database-driven applications like CRP India.'
    ],
    sections: [
      {
        heading: 'The Internet vs. The World Wide Web: The Foundation',
        content: `Before writing code, a software engineer must understand the physical and logical foundation of the network. A common beginner misconception is using the terms "Internet" and "Web" as synonyms. In computer networking, they describe two distinct layers:

1. **The Internet (The Global Infrastructure):** The physical network of billions of interconnected computing devices, fiber-optic underwater cables, satellite relays, cellular towers, and routing hardware spanning the globe. It is the global railway system over which many different services run.
2. **The World Wide Web (The Information Service):** An application-layer service invented by Sir Tim Berners-Lee in 1989 that operates *on top of* the Internet. It is a collection of hyperlinked documents and multimedia resources accessed using the HyperText Transfer Protocol (HTTP).

Just as the global railway system can carry passenger trains, freight trains, and postal trains, the Internet carries many services: email (SMTP/IMAP), file transfers (FTP/SFTP), real-time streaming, and the World Wide Web (HTTP/HTTPS). When you build a web application, you are building for the Web layer.`
      },
      {
        heading: 'The Client-Server Architecture Model',
        content: `Every web interaction is built upon the fundamental **Client-Server Architecture**. This is a distributed computing model that partitions tasks between two distinct parties:

\`\`\`
  +--------------------------------------------------------------+
  |                   THE CLIENT (Your Browser)                  |
  |  - Chrome, Firefox, Safari on Laptop or Mobile Phone         |
  |  - Renders HTML into pixels on screen                        |
  |  - Executes client-side JavaScript                           |
  |  - Collects user clicks, inputs, and form submissions        |
  +--------------------------------------------------------------+
                                 |  ^
                1. HTTP Request  |  |  2. HTTP Response
          "GET /api/grievances"  |  |  (JSON or HTML payload)
                                 v  |
  +--------------------------------------------------------------+
  |                   THE SERVER (Remote Machine)                |
  |  - Powerful computer running Node.js, Python, or Go 24/7     |
  |  - Connected to a permanent, public IP address               |
  |  - Authenticates user credentials securely                   |
  |  - Queries database (MongoDB, PostgreSQL)                    |
  |  - Transmits requested data back to client                   |
  +--------------------------------------------------------------+
\`\`\`

* **The Client:** Any hardware or software that requests services or content. In web development, the client is almost always a web browser running on a user's smartphone, laptop, or tablet.
* **The Server:** A specialized computer or virtual machine configured to run continuously, listen on a specific network port (like 80 for HTTP or 443 for HTTPS), and serve responses whenever clients make requests.

In the CRP India application, the citizen's laptop running React in Chrome is the **Client**, while the remote Node.js Express application running in a cloud data center is the **Server**.`
      },
      {
        heading: 'Static Websites vs. Dynamic Web Applications',
        content: `Understanding how servers generate content distinguishes simple static sites from complex software platforms:

### 1. Static Websites
A static website consists of pre-written, fixed files stored on a web server's hard drive (e.g., \`index.html\`, \`styles.css\`, \`logo.png\`).
* When a user requests \`about.html\`, the server simply reads that exact file from disk and streams its bytes across the network.
* Every single visitor sees the exact same content until a developer manually edits the HTML file.
* Ideal for documentation sites, personal portfolios, and marketing landing pages.

### 2. Dynamic Web Applications
A dynamic web application (like CRP India, GitHub, or YouTube) does not store pre-built HTML files for every possible screen.
* When a citizen logs in to view their complaint history, the server executes backend code that reads the user's session token, queries the database for records belonging to that specific citizen ID, formats the data, and returns it.
* Different users see entirely personalized data on the same URL path.
* Data is stored persistently in databases rather than hardcoded in HTML.`
      },
      {
        heading: 'How Web Assets Assemble in the Browser',
        content: `When a browser receives an HTML document, it begins reading it from top to bottom. As it encounters references to external files, it initiates additional network requests:

1. **HTML (Document Skeleton):** The browser receives raw HTML text and parses it into the Document Object Model (DOM).
2. **CSS (Style Rules):** The browser encounters \`<link rel="stylesheet">\`, requests the CSS file, and builds the CSS Object Model (CSSOM).
3. **Render Tree & Layout:** The browser combines the DOM and CSSOM into a Render Tree, calculates the exact pixel coordinates for every box (Layout), and paints pixels to your display.
4. **JavaScript (Interactivity):** The browser downloads \`<script>\` files and executes the JavaScript code, allowing the page to respond to user interactions dynamically.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Assuming the browser and the web server run in the same place.',
        whyItHappens: 'During local development, both client and server run on localhost (the same machine).',
        howToFix: 'Remember that in production, the client runs on the user\'s device anywhere in the world, while the server runs on remote cloud hardware across public networks.'
      },
      {
        mistake: 'Confusing the Internet with the World Wide Web.',
        whyItHappens: 'Both terms are used interchangeably in colloquial English.',
        howToFix: 'The Internet is the global network hardware; the World Wide Web is the HTTP-based document service running on top of that network.'
      },
      {
        mistake: 'Believing that static websites cannot have any interactivity.',
        whyItHappens: 'Assuming "static" means frozen with no animations or button clicks.',
        howToFix: '"Static" refers to how the server delivers files (fixed files from disk). Static sites can still run complex client-side JavaScript in the browser.'
      }
    ],
    guidedExercise: {
      title: 'Analyze Client and Server Responsibilities',
      difficulty: 'Beginner',
      instructions: 'Review the list of web development tasks below. Categorize each task as either a Client responsibility or a Server responsibility, and explain why.',
      starterCode: `// CATEGORIZE EACH ACTION AS 'CLIENT' OR 'SERVER':
// 1. Rendering an error message in red text on screen
// 2. Checking if a password hash matches the database record
// 3. Listening for a button click event in the browser
// 4. Storing complaint records persistently in MongoDB`,
      tasks: [
        'Identify whether rendering UI pixels is a Client or Server task.',
        'Determine where database queries and password hashing must execute.',
        'Explain why password verification cannot safely happen on the client.',
        'Trace the request-response cycle for a user login submission.'
      ],
      hints: [
        'The client is the browser running on the user\'s computer—it handles display and user events.',
        'The server is the trusted remote environment—it protects sensitive database credentials and records.',
        'Never send secret database passwords or private user hashes to the client browser.'
      ],
      solution: `// VERIFIED ARCHITECTURAL CLASSIFICATION:
// 1. Rendering UI error messages -> CLIENT (Browser paints pixels to the screen)
// 2. Verifying password hashes -> SERVER (Must run in a secure, trusted backend environment)
// 3. Listening for button clicks -> CLIENT (Runs inside the browser JavaScript event loop)
// 4. Storing complaint data in MongoDB -> SERVER (Database connections require private credentials)`,
      solutionExplanation: 'Clients are untrusted environments running on user hardware, responsible for presentation and interaction. Servers are secure environments holding credentials, database logic, and business rules.'
    },
    quiz: [
      {
        question: 'What is the fundamental difference between the Internet and the World Wide Web?',
        options: [
          'The Internet is owned by Google, while the Web is owned by Microsoft.',
          'The Internet is the physical network infrastructure; the World Wide Web is an application-layer service using HTTP on top of the Internet.',
          'The Internet only works in North America; the Web is global.',
          'The Web was invented first in the 1960s, followed by the Internet in the 1990s.'
        ],
        correctIndex: 1,
        explanation: 'The Internet is the underlying global network of cables and routers. The World Wide Web is one specific service (HTTP) running on top of that infrastructure.'
      },
      {
        question: 'In the Client-Server model, which party is responsible for rendering HTML elements into visible pixels on screen?',
        options: [
          'The Server',
          'The Client (Web Browser)',
          'The Internet Service Provider (ISP)',
          'The Database Engine'
        ],
        correctIndex: 1,
        explanation: 'The client browser receives HTML text, parses the DOM tree, calculates layout geometry, and paints pixels onto the user\'s physical display.'
      },
      {
        question: 'Why must sensitive database queries and password verification execute on the Server rather than the Client?',
        options: [
          'Browsers do not have enough RAM to verify passwords.',
          'The client browser is an untrusted environment where any user can inspect code, manipulate variables, and view raw credentials.',
          'Database engines only accept connections from fiber-optic cables.',
          'Passwords can only be hashed on Windows operating systems.'
        ],
        correctIndex: 1,
        explanation: 'The client device is completely under the user\'s control. Code running in the browser can be modified via DevTools. Private database credentials and authorization rules must remain securely isolated on the server.'
      }
    ],
    takeaways: [
      'The Internet is the global network hardware; the World Wide Web is the information service operating on top of it via HTTP.',
      'The Client-Server model separates presentation (browser client) from persistent data and security (backend server).',
      'Static websites deliver identical pre-built files from disk; dynamic applications generate responses on the fly from databases.',
      'Browsers assemble web pages in stages: HTML DOM parsing, CSS CSSOM calculation, render tree layout, and JavaScript execution.',
      'Never trust client-side code with private keys, database connections, or unverified authorization decisions.'
    ],
    caseStudyReference: {
      title: 'Decoupled Client-Server Architecture in CRP India',
      description: 'Observe how CRP India separates the Vite React frontend (Client) from the Node.js Express API (Server) running on distinct ports during development.',
      files: [
        'reference-projects/CRP-India/frontend/src/App.jsx',
        'reference-projects/CRP-India/backend/src/server.js'
      ]
    }
  },

  'frontend-vs-backend': {
    id: 'lesson-1-2',
    slug: 'frontend-vs-backend',
    courseId: 'course-1',
    courseSlug: 'web-internet-fundamentals',
    courseTitle: 'Course 1: Understanding the Web',
    title: 'Frontend vs. Backend: Runtimes & Trust Boundaries',
    category: 'Fundamentals',
    estimatedTime: '25 min read & practice',
    objectives: [
      'Understand the distinct runtimes, responsibilities, and toolsets of frontend and backend development.',
      'Master the concept of the Trust Boundary in web application security.',
      'Trace how data travels across network boundaries via REST APIs and JSON.',
      'Identify the technologies used in full-stack applications like CRP India.'
    ],
    sections: [
      {
        heading: 'Frontend Development: The User-Facing Interface',
        content: `**Frontend development** (often called client-side development) encompasses everything that runs directly inside the user\'s web browser. Its primary mission is creating an intuitive, responsive, accessible, and high-performance user experience.

### The Frontend Triad:
1. **HTML5:** Semantic markup providing structure, accessibility landmarks, and form inputs.
2. **CSS3:** Visual styling, responsive grid layouts, design tokens, and smooth micro-animations.
3. **JavaScript (and frameworks like React):** Managing user state, listening for UI events, updating the DOM dynamically, and communicating asynchronously with backend APIs.

### The Frontend Runtime Environment:
The frontend runtime is the **web browser** (Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge). The browser provides sandboxed execution environments, protecting the user's local operating system from malicious web scripts. It exposes browser APIs like the DOM, LocalStorage, Fetch API, and Geolocation.`
      },
      {
        heading: 'Backend Development: The Business Engine & Data Store',
        content: `**Backend development** (server-side development) encompasses everything that runs on remote web servers, cloud containers, and database systems. The backend handles business logic, data persistence, cryptographic security, and external third-party integrations.

### Core Backend Responsibilities:
1. **API Endpoints:** Exposing structured HTTP routes (e.g. \`POST /api/grievances\`, \`GET /api/users/profile\`).
2. **Authentication & Authorization:** Verifying identity via password hashing (bcrypt), JSON Web Tokens (JWT), and role-based access control (RBAC).
3. **Data Persistence:** Reading and writing records to databases (MongoDB, PostgreSQL, MySQL) with transactional integrity.
4. **Third-Party Services:** Interfacing with payment gateways, email delivery systems, SMS gateways, and cloud storage buckets.

### Common Backend Runtimes:
* **Node.js:** JavaScript running outside the browser via Google's V8 engine.
* **Python:** Popular for web APIs (FastAPI, Django) and machine learning.
* **Go / Java / C#:** High-performance compiled languages for enterprise backends.`
      },
      {
        heading: 'The Trust Boundary: The Cardinal Rule of Web Security',
        content: `The most critical concept in full-stack architecture is the **Trust Boundary**:

\`\`\`
  +-----------------------------------------------------------+
  |              UNTRUSTED ZONE (The Frontend)                |
  |  - User Browser, Mobile Device, Local Storage             |
  |  - ANY user can open DevTools, inspect memory, edit code, |
  |    bypass validation, and fake network requests.          |
  +-----------------------------------------------------------+
                              ||
                      [ TRUST BOUNDARY ]
              (HTTPS Network Connection / REST API)
                              ||
  +-----------------------------------------------------------+
  |               TRUSTED ZONE (The Backend)                  |
  |  - Remote Linux Server, Node.js API, MongoDB Database     |
  |  - Private environment protected by firewall & auth.      |
  |  - Holds database credentials, encryption secrets, keys. |
  +-----------------------------------------------------------+
\`\`\`

### The Rules of the Trust Boundary:
1. **Never trust data arriving from the client:** Every piece of input sent from the frontend (form fields, query parameters, HTTP headers, cookies) must be treated as potentially malicious and validated on the backend.
2. **Never store secrets on the frontend:** Never place database passwords, API master secret keys, or payment private keys in frontend React code. Anything bundled in frontend JavaScript is readable by anyone who opens browser DevTools.`
      },
      {
        heading: 'How Frontend and Backend Communicate via REST APIs',
        content: `In modern full-stack architectures (including CRP India), the frontend and backend are decoupled. They communicate over standard network protocols using **REST APIs** (Representational State Transfer) and exchange lightweight structured data formatted as **JSON** (JavaScript Object Notation):

\`\`\`
1. Citizen fills out complaint form and clicks "Submit".
2. React frontend serializes form values into a JSON string:
   { "department": "Public Works", "description": "Broken streetlight" }
3. Frontend sends an HTTP POST request to "https://api.crpindia.gov.in/grievances".
4. Express backend intercepts the request, verifies the citizen's JWT auth token,
   validates input fields, generates a tracking ID, and saves to MongoDB.
5. Backend responds with HTTP status 201 Created and JSON payload:
   { "success": true, "complaintId": "CRP-2026-00481" }
6. React frontend receives the response and displays a confirmation dialog.
\`\`\``
      }
    ],
    commonMistakes: [
      {
        mistake: 'Storing private API secret keys in frontend environment variables (VITE_...).',
        whyItHappens: 'Assuming frontend environment variables are secret because they are in an .env file.',
        howToFix: 'Vite and React embed environment variables directly into public JavaScript bundles. Only public configuration belongs in the frontend; all private keys must stay on the backend.'
      },
      {
        mistake: 'Assuming that frontend validation prevents invalid database records.',
        whyItHappens: 'Testing only through the official UI and seeing the validation error work.',
        howToFix: 'Attackers don\'t use your UI—they send raw HTTP requests directly to your backend. Always validate every field on the backend.'
      },
      {
        mistake: 'Coupling frontend markup directly to database schemas.',
        whyItHappens: 'Passing raw database objects directly to the browser without transformation.',
        howToFix: 'Use clean API response formatting that exposes only the fields the client needs, stripping internal password hashes or sensitive logs.'
      }
    ],
    guidedExercise: {
      title: 'Identify Trust Boundary Violations in Full-Stack Code',
      difficulty: 'Intermediate',
      instructions: 'Review the two architecture patterns below. Determine which one violates the Trust Boundary security principle and explain why.',
      starterCode: `// SCENARIO A:
// Frontend checks: if (user.role === 'admin') { showDeleteButton(); }
// When clicked, frontend sends: DELETE /api/complaints/123
// Backend receives request and deletes complaint 123 without checking JWT role.

// SCENARIO B:
// Frontend checks: if (user.role === 'admin') { showDeleteButton(); }
// When clicked, frontend sends: DELETE /api/complaints/123 with Bearer JWT token
// Backend verifies JWT token cryptographically, confirms role === 'admin', and then deletes.`,
      tasks: [
        'Analyze Scenario A and identify the critical security vulnerability.',
        'Explain how an attacker could exploit Scenario A without using the UI.',
        'Verify why Scenario B correctly respects the Trust Boundary.',
        'State the cardinal rule regarding client-side vs server-side authorization.'
      ],
      hints: [
        'In Scenario A, what happens if a regular user sends the DELETE request using curl?',
        'Frontend UI checks only hide buttons visually; they do not protect the server endpoint.',
        'Authentication and authorization must always be enforced on the backend.'
      ],
      solution: `// ARCHITECTURAL VULNERABILITY ANALYSIS:
// Scenario A is a CATASTROPHIC SECURITY VIOLATION:
// The backend trusts the client blindly. Any non-admin user can open a terminal and run:
//   curl -X DELETE https://api.example.com/api/complaints/123
// and the backend will delete the record!

// Scenario B is SECURE and respects the Trust Boundary:
// The UI check is merely a visual convenience. The backend independently validates
// the cryptographic JWT signature and enforces role authorization on every single request.`,
      solutionExplanation: 'The frontend UI is an untrusted presentation layer. Visual hiding of buttons does not secure API routes. The backend must independently authenticate and authorize every single request before performing actions.'
    },
    quiz: [
      {
        question: 'What is the "Trust Boundary" in web development?',
        options: [
          'A firewall hardware device sold by Cisco.',
          'The conceptual security boundary dividing the untrusted client-side environment (browser) from the trusted server-side environment (backend).',
          'A legal contract signed between the website owner and the web host.',
          'The maximum number of simultaneous users a website can support.'
        ],
        correctIndex: 1,
        explanation: 'The Trust Boundary separates untrusted client runtimes (where any user can view code and tamper with data) from trusted backend servers (where private keys, databases, and authorization logic reside).'
      },
      {
        question: 'Why is it dangerous to place a private database connection string in a React frontend application?',
        options: [
          'Because React does not support databases.',
          'Because all frontend JavaScript is downloaded and executed directly on the user\'s computer, exposing the credentials to anyone inspecting network traffic or DevTools.',
          'Because databases only connect to Internet Explorer.',
          'Because React automatically encrypts all code with a public key.'
        ],
        correctIndex: 1,
        explanation: 'Frontend JavaScript runs on the user\'s local machine. Any secret or database password embedded in frontend code is completely exposed to anyone who inspects the source code in their browser.'
      },
      {
        question: 'Which of the following technologies represents a server-side backend runtime?',
        options: [
          'HTML5 Canvas',
          'Node.js',
          'CSS Grid',
          'React DOM'
        ],
        correctIndex: 1,
        explanation: 'Node.js is an open-source server-side JavaScript runtime environment that executes code on remote servers outside web browsers.'
      }
    ],
    takeaways: [
      'Frontend development encompasses user interfaces running in the browser (HTML, CSS, React).',
      'Backend development encompasses business logic, authentication, and database persistence (Node.js, Express, MongoDB).',
      'The Trust Boundary separates untrusted client browsers from trusted backend servers.',
      'Never store secrets or private keys in frontend applications; they are completely visible in browser DevTools.',
      'Always enforce input validation and role authorization on the backend, regardless of frontend UI checks.'
    ],
    caseStudyReference: {
      title: 'Full-Stack Decoupled Communication in CRP India',
      description: 'Trace how the citizen dashboard in CRP India fetches grievance metrics from the Node.js backend using Axios and JSON payloads.',
      files: [
        'reference-projects/CRP-India/frontend/src/pages/CitizenDashboard.jsx',
        'reference-projects/CRP-India/backend/src/controllers/grievanceController.js'
      ]
    }
  },

  'what-happens-when-you-open-a-website': {
    id: 'lesson-1-3',
    slug: 'what-happens-when-you-open-a-website',
    courseId: 'course-1',
    courseSlug: 'web-internet-fundamentals',
    courseTitle: 'Course 1: Understanding the Web',
    title: 'What Happens When You Open a Website?',
    category: 'Fundamentals',
    estimatedTime: '30 min read & practice',
    objectives: [
      'Trace the complete journey from typing a URL into the address bar to seeing pixels on screen.',
      'Understand Domain Name System (DNS) resolution: root, TLD, and authoritative nameservers.',
      'Explain the TCP 3-way handshake and the TLS cryptographic handshake.',
      'Understand the browser rendering pipeline: DOM, CSSOM, Render Tree, Layout, and Paint.'
    ],
    sections: [
      {
        heading: 'Step 1: URL Parsing and DNS Resolution',
        content: `When you type \`https://crpindia.gov.in/dashboard\` into your browser\'s address bar and press Enter, a complex sequence of networking and rendering events occurs in milliseconds:

### 1. URL Parsing
The browser parses the string into distinct components:
* **Protocol (\`https://\`):** The communication protocol (HyperText Transfer Protocol Secure).
* **Domain Name / Host (\`crpindia.gov.in\`):** The human-readable name of the server.
* **Path (\`/dashboard\`):** The specific resource requested on the server.

### 2. DNS Resolution: The Phonebook of the Web
Computers on the Internet do not communicate using human-readable names like \`crpindia.gov.in\`; they communicate using numerical **IP addresses** (e.g. \`142.250.190.46\` for IPv4 or \`2404:6800:4009:81b::200e\` for IPv6).

To translate the domain name into an IP address, the browser initiates a **DNS Lookup**:
1. **Browser Cache:** Checks if the domain was recently visited and cached locally.
2. **OS Cache:** Checks the operating system DNS resolver cache.
3. **Router / ISP Recursive Resolver:** Queries the Internet Service Provider\'s recursive DNS server.
4. **Root Nameservers:** Directs the resolver to the **Top-Level Domain (TLD) Nameserver** for \`.gov.in\`.
5. **Authoritative Nameserver:** The authoritative server for \`crpindia.gov.in\` returns the final IP address (\`103.24.18.92\`).`
      },
      {
        heading: 'Step 2: TCP Connection & TLS Cryptographic Handshake',
        content: `Once the browser knows the destination IP address, it must establish a reliable, encrypted communication channel:

### The TCP 3-Way Handshake (Transmission Control Protocol)
TCP guarantees that all packets arrive in order without data loss:
1. **SYN (Synchronize):** Client sends a packet with a random sequence number: *"Can we open a connection?"*
2. **SYN-ACK (Synchronize-Acknowledge):** Server responds: *"Yes, connection acknowledged. Here is my sequence number."*
3. **ACK (Acknowledge):** Client confirms: *"Acknowledged. Connection established."*

\`\`\`
  CLIENT                                          SERVER
    |                                               |
    | ------------ 1. SYN (seq=100) --------------> |
    | <----------- 2. SYN-ACK (ack=101, seq=300) -- |
    | ------------ 3. ACK (ack=301) --------------> |
    |                                               |
    | ====== TCP Connection Established (Port 443)  |
\`\`\`

### The TLS Handshake (Transport Layer Security)
Because the protocol is HTTPS, client and server negotiate encryption keys before sending any data:
1. The server presents its digital SSL/TLS certificate containing its public cryptographic key.
2. The browser validates the certificate against trusted Certificate Authorities (CAs).
3. Client and server compute symmetric session keys. From this point forward, all data traveling across the Internet is completely encrypted against eavesdropping and tampering.`
      },
      {
        heading: 'Step 3: HTTP Request and Server Response',
        content: `With an encrypted connection active, the browser transmits the initial HTTP GET request:

\`\`\`http
GET /dashboard HTTP/1.1
Host: crpindia.gov.in
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/122.0.0.0
Accept: text/html,application/xhtml+xml
Accept-Encoding: gzip, deflate, br
\`\`\`

The remote web server processes the request, loads or generates the HTML document, and returns an HTTP response:

\`\`\`http
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Content-Encoding: gzip
Cache-Control: max-age=3600

<!DOCTYPE html>
<html lang="en">
<head>...
\`\`\``
      },
      {
        heading: 'Step 4: The Critical Rendering Path',
        content: `As bytes stream into the browser network buffer, the rendering engine transforms raw text into a living user interface through the **Critical Rendering Path**:

1. **DOM Construction:** The HTML parser tokens tags (\`<html>\`, \`<body>\`, \`<h1>\`) and builds the Document Object Model tree.
2. **CSSOM Construction:** When encountering stylesheets, the CSS parser computes rules and cascades them into the CSS Object Model tree.
3. **Render Tree:** The browser combines the DOM and CSSOM, ignoring elements hidden with \`display: none\`.
4. **Layout (Reflow):** The browser calculates the exact geometric coordinates and pixel dimensions for every visible box on the screen.
5. **Paint & Compositing:** The browser converts layout boxes into actual screen pixels, rasterizes layers on the GPU, and composites the final frame on your display.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Believing that domain names are IP addresses.',
        whyItHappens: 'Both represent addresses where websites live.',
        howToFix: 'Domain names are human-readable aliases. Computers require DNS resolution to convert domain names into numerical IP addresses.'
      },
      {
        mistake: 'Assuming that the browser downloads all page resources in a single HTTP request.',
        whyItHappens: 'You only type one URL in the address bar.',
        howToFix: 'The initial request only fetches the HTML text. The browser then issues separate, concurrent HTTP requests for every CSS file, JS script, image, and font linked inside the HTML.'
      },
      {
        mistake: 'Confusing Layout (Reflow) with Paint.',
        whyItHappens: 'Both happen automatically when rendering.',
        howToFix: 'Layout calculates geometry (width, height, position). Paint fills in the visual pixels (colors, borders, shadows, text).'
      }
    ],
    guidedExercise: {
      title: 'Trace a Web Request Using Browser Network DevTools',
      difficulty: 'Beginner',
      instructions: 'Open your browser Developer Tools (F12) to the Network tab, reload any web page, and inspect the sequence of requests, DNS resolution timing, and status codes.',
      starterCode: `// DEVTOOLS INSPECTION CHECKLIST:
// 1. Open DevTools (F12 or Ctrl+Shift+I)
// 2. Click the 'Network' tab
// 3. Check 'Disable cache' to simulate a first-time visitor
// 4. Reload the page (Ctrl+R / F5)
// 5. Click the first document request and view 'Timing'`,
      tasks: [
        'Identify the very first HTTP request (the HTML document).',
        'Inspect the Response Headers (Content-Type, Status Code, Cache-Control).',
        'Find the Waterfall Timing view and locate DNS Lookup, Initial Connection (TCP), and SSL/TLS negotiation.',
        'Observe how subsequent CSS and JavaScript files load concurrently.'
      ],
      hints: [
        'The first item in the Network list is almost always of type "document" (the HTML file).',
        'Hovering over the waterfall bar reveals exact milliseconds spent on DNS, TCP, and TLS.',
        'Status 200 OK confirms a successful response.'
      ],
      solution: `// TYPICAL DEVTOOLS NETWORK WATERFALL TIMING BREAKDOWN:
// 1. Queueing & Stalled: Browser prepares connection (1.2 ms)
// 2. DNS Lookup: Translates domain to IP address (18.4 ms)
// 3. Initial Connection: TCP 3-way handshake (24.1 ms)
// 4. SSL / TLS Negotiation: Cryptographic key exchange (32.6 ms)
// 5. Request Sent: HTTP GET bytes transmitted (0.4 ms)
// 6. Waiting for Server Response (TTFB - Time to First Byte): (45.2 ms)
// 7. Content Download: Streaming HTML payload bytes (12.3 ms)`,
      solutionExplanation: 'Understanding this waterfall breakdown is how professional web engineers optimize performance, diagnose slow DNS servers, and reduce initial render delays.'
    },
    quiz: [
      {
        question: 'What is the role of the Domain Name System (DNS)?',
        options: [
          'It compiles JavaScript into machine code.',
          'It acts as the phonebook of the web, translating human-friendly domain names (example.com) into machine-routable IP addresses (93.184.216.34).',
          'It compresses images on web servers.',
          'It monitors user passwords for data breaches.'
        ],
        correctIndex: 1,
        explanation: 'DNS resolves human-readable domain names into numerical IP addresses that networking hardware uses to route data packets across the Internet.'
      },
      {
        question: 'What are the three steps of the TCP 3-way handshake?',
        options: [
          'PING, PONG, ACK',
          'SYN, SYN-ACK, ACK',
          'GET, POST, 200 OK',
          'CONNECT, AUTHENTICATE, READY'
        ],
        correctIndex: 1,
        explanation: 'The TCP handshake establishes a reliable connection using SYN (Synchronize), SYN-ACK (Synchronize-Acknowledge), and ACK (Acknowledge).'
      },
      {
        question: 'In the browser Critical Rendering Path, what occurs during the "Layout" (Reflow) stage?',
        options: [
          'The browser downloads fonts over HTTP.',
          'The browser calculates the exact geometric coordinates and pixel dimensions for every visible element on the page.',
          'The browser parses JavaScript functions.',
          'The browser clears the browser cookie storage.'
        ],
        correctIndex: 1,
        explanation: 'Layout (or reflow) calculates the geometry of the page: how large each element is and where it sits in physical pixels relative to the viewport.'
      }
    ],
    takeaways: [
      'Loading a website involves URL parsing, DNS resolution, TCP handshake, TLS encryption, HTTP transfer, and browser rendering.',
      'DNS translates human-readable domain names into numerical IP addresses via recursive and authoritative nameservers.',
      'TCP guarantees reliable packet delivery via the 3-way handshake (SYN, SYN-ACK, ACK).',
      'TLS encrypts communication between browser and server, protecting credentials against interception.',
      'The browser rendering pipeline turns HTML/CSS into pixels through DOM -> CSSOM -> Render Tree -> Layout -> Paint.'
    ],
    caseStudyReference: {
      title: 'Vite Production Asset Bundling in CRP India',
      description: 'Observe how the Vite build pipeline in CRP India bundles CSS, JavaScript, and assets into minified, hash-versioned files for optimized browser caching.',
      files: [
        'reference-projects/CRP-India/frontend/vite.config.js',
        'reference-projects/CRP-India/frontend/package.json'
      ]
    }
  },

  'http-requests-and-responses': {
    id: 'lesson-1-4',
    slug: 'http-requests-and-responses',
    courseId: 'course-1',
    courseSlug: 'web-internet-fundamentals',
    courseTitle: 'Course 1: Understanding the Web',
    title: 'HTTP Methods, Status Codes & JSON Payloads',
    category: 'Fundamentals',
    estimatedTime: '25 min read & practice',
    objectives: [
      'Master the standard HTTP request methods: GET, POST, PUT, PATCH, and DELETE.',
      'Understand HTTP status code categories (2xx success, 3xx redirects, 4xx client errors, 5xx server errors).',
      'Inspect HTTP request and response headers (Content-Type, Authorization, Cache-Control).',
      'Format and validate JSON payloads exchanged between frontend and backend in REST APIs.'
    ],
    sections: [
      {
        heading: 'The HyperText Transfer Protocol (HTTP)',
        content: `HTTP is the foundational application-layer protocol of the World Wide Web. It is a **stateless, request-response protocol**: the client sends an HTTP request message, the server processes it, and the server returns an HTTP response message. Once the response completes, the transaction is finished.

### Anatomy of an HTTP Request:
An HTTP request consists of three parts:
1. **Request Line:** HTTP Method, Request URI, and HTTP Protocol Version.
2. **Headers:** Key-value metadata describing the client, desired response format, and authentication credentials.
3. **Body (Payload):** Optional data sent to the server (common in POST, PUT, and PATCH requests).

\`\`\`http
POST /api/v1/grievances HTTP/1.1
Host: api.crpindia.gov.in
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
Content-Type: application/json
Accept: application/json

{
  "department": "Public Works",
  "location": "MG Road, Ward 4",
  "description": "Hazardous open manhole near primary school."
}
\`\`\``
      },
      {
        heading: 'Standard HTTP Methods: Expressing Intent',
        content: `HTTP methods (often called HTTP verbs) indicate the desired action to be performed on a resource:

| Method | Intended Semantic Action | Is Idempotent? | Has Request Body? |
| :--- | :--- | :---: | :---: |
| **GET** | Retrieve an existing resource. Must NEVER modify server data. | **Yes** | No |
| **POST** | Create a new resource or trigger a state-mutating operation. | **No** | **Yes** |
| **PUT** | Replace an existing resource entirely with the provided payload. | **Yes** | **Yes** |
| **PATCH** | Partially update specific fields of an existing resource. | **No / Conditional** | **Yes** |
| **DELETE** | Remove a resource permanently or mark it as deleted. | **Yes** | Optional |

### What is Idempotence?
An HTTP method is **idempotent** if making the same request multiple times produces the exact same server state as making it once.
* \`GET /api/users/42\` is idempotent: requesting it 1 time or 100 times does not change the user's data.
* \`DELETE /api/complaints/10\` is idempotent: deleting complaint 10 once removes it; repeating the request leaves it removed.
* \`POST /api/complaints\` is **NOT idempotent**: submitting it 5 times creates 5 separate complaints in the database!`
      },
      {
        heading: 'HTTP Status Codes: The Standard Response Alphabet',
        content: `Every HTTP response begins with a 3-digit status code that informs the client how the request was handled:

### 1. 2xx Success (The action was successfully received and accepted)
* **200 OK:** Standard success response for GET, PUT, or PATCH.
* **201 Created:** The request succeeded and a new resource was created (standard response for POST).
* **204 No Content:** Success, but the server is intentionally returning an empty body (common for DELETE).

### 2. 3xx Redirection (Further action needed to complete request)
* **301 Moved Permanently:** Resource has moved to a new permanent URL.
* **304 Not Modified:** Cached copy in the browser is still fresh; saves downloading data again.

### 3. 4xx Client Error (The problem originated on the client side)
* **400 Bad Request:** Malformed syntax or invalid request payload.
* **401 Unauthorized:** Missing or invalid authentication token (user is not logged in).
* **403 Forbidden:** Authenticated, but lacking permission (e.g. a citizen attempting to access admin routes).
* **404 Not Found:** The requested resource URI does not exist.
* **422 Unprocessable Entity:** Payload syntax is valid JSON, but business validation failed (e.g. password too short).

### 4. 5xx Server Error (The problem originated on the server side)
* **500 Internal Server Error:** Unhandled exception or crash in backend code.
* **502 Bad Gateway:** The reverse proxy (Nginx) received an invalid response from upstream (Node.js crashed).
* **503 Service Unavailable:** Server overloaded or undergoing scheduled maintenance.`
      },
      {
        heading: 'JSON Payloads: The Universal Data Interchange Format',
        content: `JavaScript Object Notation (JSON) is the universal language of REST APIs. It is lightweight, text-based, human-readable, and supported natively across all programming languages.

\`\`\`json
{
  "success": true,
  "statusCode": 201,
  "data": {
    "complaintId": "CRP-2026-0091",
    "status": "pending",
    "priority": "high",
    "citizen": {
      "name": "Rohan Verma",
      "verified": true
    },
    "tags": ["water", "infrastructure", "urgent"]
  }
}
\`\`\`

### Strict JSON Rules:
* Keys must always be enclosed in **double quotes** (\`"key": "value"\`). Single quotes (\`'key'\`) are invalid JSON syntax.
* Supported data types: string, number, boolean (\`true\`/\`false\`), null, array (\`[]\`), and object (\`{}\`).
* Functions, comments, and \`undefined\` are **strictly forbidden** in JSON.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using GET requests to delete or update database records.',
        whyItHappens: 'Creating a quick link like <a href="/delete?id=5"> is easy to write in HTML.',
        howToFix: 'GET requests must be safe and idempotent. Web crawlers (like Googlebot) follow links automatically and would accidentally delete data! Always use POST or DELETE.'
      },
      {
        mistake: 'Returning 200 OK when an operation actually failed.',
        whyItHappens: 'Wrapping everything in a generic try/catch and returning { error: true } with status 200.',
        howToFix: 'Use proper HTTP status codes: return 400 for bad input, 401 for unauthenticated requests, and 500 for server errors.'
      },
      {
        mistake: 'Writing single quotes or trailing commas in JSON payloads.',
        whyItHappens: 'JavaScript allows single quotes and trailing commas in object literals.',
        howToFix: 'JSON syntax is strictly standardized: use double quotes for all keys and strings, and remove trailing commas.'
      }
    ],
    guidedExercise: {
      title: 'Design RESTful API Requests and Responses for a Grievance Portal',
      difficulty: 'Intermediate',
      instructions: 'Construct proper HTTP requests and response structures for filing a new grievance (POST) and retrieving an existing grievance (GET), including headers, status codes, and JSON bodies.',
      starterCode: `// PART 1: Write an HTTP POST request to submit a grievance
// Include method, path, Host header, Content-Type, and valid JSON body.

// PART 2: Write the expected HTTP response
// Include protocol, status code, Content-Type, and confirmation JSON body.`,
      tasks: [
        'Write the HTTP POST request line with /api/grievances.',
        'Include Content-Type: application/json header.',
        'Write a valid JSON payload with citizenName, department, and description.',
        'Formulate the server response with 201 Created and return a generated complaintId.'
      ],
      hints: [
        'POST requests use status 201 Created when a new record is saved.',
        'All keys and string values in JSON must use double quotes.',
        'Header names and values are separated by colons (Content-Type: application/json).'
      ],
      solution: `// REQUEST:
POST /api/grievances HTTP/1.1
Host: api.crpindia.gov.in
Content-Type: application/json
Authorization: Bearer eyJhbGciOi...

{
  "department": "Sanitation",
  "location": "Sector 9 Park",
  "description": "Garbage dump overflow requiring urgent clearance."
}

// RESPONSE:
HTTP/1.1 201 Created
Content-Type: application/json; charset=UTF-8

{
  "success": true,
  "complaintId": "CRP-2026-00412",
  "status": "pending_verification",
  "createdAt": "2026-03-28T10:30:00Z"
}`,
      solutionExplanation: 'The client sends a POST request with JSON headers and payload. The server responds with status 201 Created, confirming persistent database creation and returning the official tracking identifier.'
    },
    quiz: [
      {
        question: 'Which HTTP method should be used when creating a brand new resource in a database via a REST API?',
        options: [
          'GET',
          'POST',
          'FETCH',
          'TRACE'
        ],
        correctIndex: 1,
        explanation: 'POST is the standard HTTP method for creating new resources on a server.'
      },
      {
        question: 'What does an HTTP status code of 401 Unauthorized indicate?',
        options: [
          'The server crashed and restarted.',
          'The request lacked valid authentication credentials (e.g. missing or expired login token).',
          'The requested webpage was deleted 30 days ago.',
          'The user has exceeded their cellular data plan.'
        ],
        correctIndex: 1,
        explanation: '401 Unauthorized indicates that the request has not been applied because it lacks valid authentication credentials for the target resource.'
      },
      {
        question: 'Which of the following is a valid JSON string?',
        options: [
          '{ name: "Anita", age: 28 }',
          "{ 'name': 'Anita', 'age': 28 }",
          '{ "name": "Anita", "age": 28 }',
          '{ "name": "Anita", "age": 28, }'
        ],
        correctIndex: 2,
        explanation: 'Valid JSON requires all property keys to be enclosed in double quotes ("name"), double quotes for strings, and forbids trailing commas.'
      }
    ],
    takeaways: [
      'HTTP is the stateless request-response protocol powering the World Wide Web.',
      'Use standard HTTP methods: GET (retrieve), POST (create), PUT (replace), PATCH (update), DELETE (remove).',
      'Status code ranges indicate outcome: 2xx success, 3xx redirect, 4xx client error, 5xx server error.',
      'JSON is the universal REST API data interchange format; keys and strings must always use double quotes.',
      'GET requests must be safe and idempotent; never use GET for data-mutating actions.'
    ],
    caseStudyReference: {
      title: 'REST API Controller Endpoints in CRP India',
      description: 'Inspect grievanceRoutes.js and grievanceController.js in CRP India to observe production implementations of POST, GET, and PATCH with status codes.',
      files: [
        'reference-projects/CRP-India/backend/src/routes/grievanceRoutes.js',
        'reference-projects/CRP-India/backend/src/controllers/grievanceController.js'
      ]
    }
  }
};
