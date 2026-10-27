# CRP India — Codebase Map & Directory Guide

> **Reference Root**: `reference-projects/CRP-India/`  
> **Purpose**: A structured index mapping real production files to fundamental and intermediate web development learning modules.

---

## 1. High-Level Folder Structure

```
reference-projects/CRP-India/
├── backend/                  # Node.js + Express + Mongoose REST API server
│   ├── src/
│   │   ├── config/           # Database and Cloudinary integration configurations
│   │   ├── controllers/      # Request handlers and business logic
│   │   ├── middleware/       # Auth, error handling, rate limiting, sanitization, uploads
│   │   ├── models/           # Mongoose schemas and data models
│   │   ├── routes/           # Express router declarations
│   │   ├── tests/            # Test and validation scripts
│   │   ├── utils/            # Seeder, sequence generator, migration helpers
│   │   └── server.js         # Backend application entry point
│   ├── uploads/              # Local storage for complaint and resolution evidence photos
│   ├── .env.example          # Environment variable template
│   └── package.json          # Backend dependencies and scripts
│
├── frontend/                 # React 19 + Vite client application
│   ├── public/               # Static assets, branding, and icons
│   ├── src/
│   │   ├── assets/           # UI graphics, logos, and illustration backgrounds
│   │   ├── components/       # Reusable UI widgets and navigation layouts
│   │   ├── context/          # React Context providers (Auth, Theme, Toast)
│   │   ├── pages/            # Page-level route views (Citizen & Authority portals)
│   │   │   ├── account/      # Citizen profile, settings, and password views
│   │   │   └── authority/    # Municipal administrative dashboard and review pages
│   │   ├── services/         # Unified Fetch API client and token injector
│   │   ├── utils/            # Date and number formatting helpers
│   │   ├── App.jsx           # Root route definitions and layout coordinator
│   │   ├── App.css           # Component-specific styles
│   │   ├── index.css         # Global design system tokens and utilities
│   │   └── main.jsx          # React DOM mounting entry point
│   ├── index.html            # Single Page Application HTML root
│   ├── vite.config.js        # Vite configuration and plugins
│   ├── vercel.json           # Vercel SPA routing rewrite rules
│   └── package.json          # Frontend dependencies and build scripts
│
├── scratch/                  # Verification and automated database test scripts
├── render.yaml               # Infrastructure-as-code for static web deployment
└── README.md                 # Original project overview and specifications
```

---

## 2. Backend Files Detailed Map

### Entry Point & Configurations

#### `backend/src/server.js`
- **What it does**: Initializes the Express app, mounts global middleware (Helmet, CORS, rate limiting, sanitization, JSON body parser), mounts API routers, connects to MongoDB, serves static uploads, and manages graceful process shutdown.
- **Concepts Demonstrated**: Express server creation, middleware pipeline execution order, environment configuration, error-handling middleware binding, and security header hardening.
- **Connects To**: `backend/src/config/db.js`, all files in `backend/src/routes/`, `backend/src/middleware/errorHandler.js`, `backend/src/middleware/sanitize.js`.
- **Target Lesson**: *Backend Fundamentals — Creating an Express Server, Understanding Middleware Chains, and Environment Setup*.

#### `backend/src/config/db.js`
- **What it does**: Connects Mongoose to the MongoDB cluster specified by `MONGO_URI`. If the connection times out or fails during development, it automatically boots an embedded in-memory MongoDB instance (`MongoMemoryServer`).
- **Concepts Demonstrated**: Asynchronous database connection, try/catch error resilience, environment branching (`process.env.NODE_ENV`), and automated development fallbacks.
- **Connects To**: `backend/src/server.js`, MongoDB instance.
- **Target Lesson**: *Databases — Connecting Node.js to MongoDB with Mongoose and Building In-Memory Fallbacks*.

#### `backend/src/config/cloudinary.js`
- **What it does**: Validates and configures Cloudinary SDK v2 credentials (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`) and exports an active configuration flag.
- **Concepts Demonstrated**: Third-party SDK initialization, defensive configuration checking, and environment variable isolation.
- **Connects To**: `backend/src/middleware/upload.js`.
- **Target Lesson**: *Cloud Storage — Configuring Cloud Asset CDNs and Third-Party SDKs*.

---

### Mongoose Models (`backend/src/models/`)

#### `backend/src/models/Complaint.js`
- **What it does**: Defines the data structure for citizen grievances, including category enums, status transitions, GPS coordinates, citizen subdocuments, timeline history, internal authority messages, and community upvotes.
- **Concepts Demonstrated**: Mongoose schemas, subdocument arrays (`statusHistorySchema`, `authorityMessageSchema`), string enum validations, default values, and schema indexing.
- **Connects To**: `backend/src/controllers/complaintController.js`, `backend/src/controllers/authorityController.js`.
- **Target Lesson**: *Database Modeling — Designing Scalable Mongoose Schemas and Embedded Subdocuments*.

#### `backend/src/models/User.js`
- **What it does**: Defines citizen and municipal authority accounts, handles password hashing via pre-save hooks, provides instance methods for password comparison, and tracks civic karma and warnings.
- **Concepts Demonstrated**: Mongoose schema pre-save middleware (`bcrypt.hash`), field selection exclusions (`select: false`), custom schema methods (`comparePassword`), and role enumeration.
- **Connects To**: `backend/src/controllers/authController.js`, `backend/src/middleware/auth.js`.
- **Target Lesson**: *Authentication & Security — User Modeling, Password Hashing with Bcrypt, and Mongoose Hooks*.

#### `backend/src/models/Vote.js`
- **What it does**: Records community upvotes on grievances, enforcing a compound unique index on `{ complaint: 1, user: 1 }` to prevent duplicate upvotes.
- **Concepts Demonstrated**: Compound unique indexing, relational referencing (`ref: 'Complaint'`, `ref: 'User'`), and vote anti-fraud logic.
- **Connects To**: `backend/src/controllers/complaintController.js`.
- **Target Lesson**: *Database Optimization — Compound Indexes and Enforcing Data Integrity*.

#### `backend/src/models/Counter.js`
- **What it does**: Maintains an atomic sequence integer for generating formatted reference numbers (`CRP-2026-XXXXX`).
- **Concepts Demonstrated**: Atomic operations, MongoDB `$inc` operator, race condition prevention in ID generation.
- **Connects To**: `backend/src/utils/referenceGenerator.js`.
- **Target Lesson**: *Concurrency & Databases — Atomic Operations and Race Condition Prevention*.

---

### Middleware (`backend/src/middleware/`)

#### `backend/src/middleware/auth.js`
- **What it does**: Extracts the Bearer token from the `Authorization` header, verifies the JWT with `jwt.verify`, retrieves the current user from the database, and enforces role-based access control (`authorize('authority')`).
- **Concepts Demonstrated**: Custom Express middleware, HTTP headers inspection, JWT decoding, authorization error responses (401 vs 403), and attaching state to `req.user`.
- **Connects To**: `backend/src/routes/authRoutes.js`, `backend/src/routes/complaintRoutes.js`, `backend/src/routes/authorityRoutes.js`.
- **Target Lesson**: *API Security — Implementing JWT Authentication and Role-Based Authorization Guards*.

#### `backend/src/middleware/upload.js`
- **What it does**: Custom Multer storage engine streaming files directly to Cloudinary or falling back to local disk storage (`uploads/`). Filters files by MIME type and extension with a 5MB limit.
- **Concepts Demonstrated**: Multipart form handling, Node.js streams (`file.stream.pipe`), MIME validation, defensive fallback logic.
- **Connects To**: `backend/src/config/cloudinary.js`, `backend/src/routes/complaintRoutes.js`.
- **Target Lesson**: *File Handling — Multipart File Uploads with Multer and Cloud Streaming*.

#### `backend/src/middleware/errorHandler.js`
- **What it does**: Intercepts unhandled synchronous and asynchronous Express errors, normalizes Mongoose validation errors, duplicate key violations (code 11000), and JWT errors into consistent JSON responses.
- **Concepts Demonstrated**: Express 4-argument error-handling middleware (`(err, req, res, next)`), error code normalization, and security-minded stack trace suppression in production.
- **Connects To**: `backend/src/server.js`.
- **Target Lesson**: *Error Handling — Centralized Error Middleware and Defensive API Design*.

#### `backend/src/middleware/rateLimiter.js`
- **What it does**: Implements sliding window rate limiting using `express-rate-limit`. Applies standard limits across general `/api` endpoints and strict throttles on authentication routes to mitigate brute-force attempts.
- **Concepts Demonstrated**: DDoS mitigation, brute-force protection, HTTP 429 Too Many Requests status, and client IP extraction behind reverse proxies.
- **Connects To**: `backend/src/server.js`, `backend/src/routes/authRoutes.js`.
- **Target Lesson**: *Production Security — API Rate Limiting and Brute-Force Prevention*.

#### `backend/src/middleware/sanitize.js`
- **What it does**: Deeply traverses request bodies, query parameters, and URL parameters to sanitize prohibited NoSQL query selector keys (such as `$gt`, `$where`, and keys containing dots).
- **Concepts Demonstrated**: NoSQL injection vulnerabilities, recursive object traversal, input data sanitization.
- **Connects To**: `backend/src/server.js`.
- **Target Lesson**: *Web Security — Defending Against NoSQL and Object Injection Attacks*.

---

### Controllers & Routes (`backend/src/controllers/` & `backend/src/routes/`)

#### `backend/src/controllers/authController.js` & `backend/src/routes/authRoutes.js`
- **What they do**: Provide registration, credential-based login, Google OAuth validation, user session retrieval (`/me`), and password updates.
- **Concepts Demonstrated**: Controller-route separation, JSON Web Token issuance, Google ID token verification via `OAuth2Client`, and password reset logic.
- **Connects To**: `backend/src/models/User.js`, `frontend/src/context/AuthContext.jsx`.
- **Target Lesson**: *Authentication — Building a Complete Auth System with Local & OAuth Strategies*.

#### `backend/src/controllers/complaintController.js` & `backend/src/routes/complaintRoutes.js`
- **What they do**: Handle complaint submission, filterable queries (search, category, status, ward), complaint retrieval by reference ID, upvoting, authority notes, and status updates.
- **Concepts Demonstrated**: RESTful CRUD operations, query string filtering, pagination, MongoDB aggregate pipeline calculations, and file attachment persistence.
- **Connects To**: `backend/src/models/Complaint.js`, `backend/src/models/Vote.js`, `backend/src/utils/referenceGenerator.js`.
- **Target Lesson**: *REST APIs — Building Complex Query Filters, Search, and Status Lifecycles*.

#### `backend/src/controllers/authorityController.js` & `backend/src/routes/authorityRoutes.js`
- **What they do**: Aggregate municipal performance metrics (total grievances, pending issues, resolution rates, average turnaround time), and manage departmental complaint assignments.
- **Concepts Demonstrated**: MongoDB aggregation framework (`$match`, `$group`, `$facet`, `$project`), SLA calculations, and administrative data aggregation.
- **Connects To**: `backend/src/models/Complaint.js`, `frontend/src/pages/authority/AuthorityDashboard.jsx`.
- **Target Lesson**: *Backend Data Analysis — MongoDB Aggregation Pipelines and Executive Dashboards*.

#### `backend/src/controllers/aiController.js` & `backend/src/routes/aiRoutes.js`
- **What they do**: Handle citizen questions using Google Gemini API (`@google/genai`). Validates input length, enforces prompt system instructions, sanitizes multi-turn conversation alternation, and streams responses via Server-Sent Events (SSE).
- **Concepts Demonstrated**: Generative AI SDK integration, SSE response streaming (`res.write('data: ...\n\n')`), conversation history sanitization, and fallback error handling.
- **Connects To**: `frontend/src/components/AIAssistant.jsx`.
- **Target Lesson**: *Modern Full-Stack — Integrating Generative AI and Server-Sent Event Streaming*.

---

## 3. Frontend Files Detailed Map

### Application Shell & State (`frontend/src/`)

#### `frontend/src/main.jsx`
- **What it does**: The client entry point that uses `ReactDOM.createRoot` to render `<App />` into the `index.html` root element.
- **Concepts Demonstrated**: React 19 root rendering, StrictMode, single entry file bundling with Vite.
- **Connects To**: `frontend/index.html`, `frontend/src/App.jsx`.
- **Target Lesson**: *React Fundamentals — Mounting React into the DOM and Understanding Vite Entry Points*.

#### `frontend/src/App.jsx`
- **What it does**: Configures the client router (`react-router-dom`), wraps the component tree with context providers (`ThemeProvider`, `AuthProvider`, `ToastProvider`), controls layout rendering (Navbar/Footer), and manages AI assistant visibility rules.
- **Concepts Demonstrated**: React Router v7 (`<Routes>`, `<Route>`), nested route layouts, conditional UI rendering based on current path, and application-level lifecycle hooks.
- **Connects To**: All page components, context providers, and navigation widgets.
- **Target Lesson**: *React Routing — Declarative Client Routing and Application Shell Layouts*.

#### `frontend/src/index.css`
- **What it does**: Comprehensive CSS design system. Declares CSS custom properties (`--bg-primary`, `--text-primary`, `--accent-primary`), utility classes, form controls, responsive grid breakpoints, animations, and dark mode overrides.
- **Concepts Demonstrated**: Modern CSS without utility frameworks, CSS variables (tokens), light/dark theming via `[data-theme='dark']`, responsive media queries, CSS Grid, and Flexbox.
- **Connects To**: All frontend components.
- **Target Lesson**: *CSS & UI Architecture — Building Custom Design Systems with CSS Variables and Dark Mode*.

---

### Context Providers (`frontend/src/context/`)

#### `frontend/src/context/AuthContext.jsx`
- **What it does**: Manages global authentication state (`user`, `token`, `isAuthenticated`, `isAuthority`). Persists tokens to `localStorage`, verifies existing sessions on boot via `api.getMe()`, and exposes `login`, `logout`, and `updateUser` hooks.
- **Concepts Demonstrated**: React Context API (`createContext`, `useContext`), custom hooks (`useAuth`), side-effect session hydration with `useEffect`, and local storage synchronization.
- **Connects To**: `frontend/src/services/api.js`, `frontend/src/components/ProtectedRoute.jsx`, all pages requiring auth.
- **Target Lesson**: *State Management — Global Auth State with React Context and Persistent Storage*.

#### `frontend/src/context/ThemeContext.jsx`
- **What it does**: Manages theme state (`light` vs `dark`), persists user choice in `localStorage`, and updates the root `document.documentElement[data-theme]` attribute.
- **Concepts Demonstrated**: Custom theme hooks (`useTheme`), DOM manipulation via React effects, synchronization with browser color-scheme preferences.
- **Connects To**: `frontend/src/components/ThemeToggle.jsx`, `frontend/src/App.jsx`.
- **Target Lesson**: *User Experience — Implementing Persistent Theme Toggles with React Context*.

#### `frontend/src/context/ToastContext.jsx`
- **What it does**: Exposes an imperative alert system (`showToast('success', 'Complaint logged!')`) and renders toast notification banners at the top of the viewport.
- **Concepts Demonstrated**: Timed alert lifecycle, queue state, UI feedback patterns.
- **Connects To**: Form pages, login views, and action buttons.
- **Target Lesson**: *Component Architecture — Building Global Notification and Toast Systems*.

---

### API Client Service

#### `frontend/src/services/api.js`
- **What it does**: Centralized HTTP client wrapping `fetch`. Auto-injects JWT tokens, manages multipart `FormData` uploads, normalizes backend error responses, and exposes clean asynchronous methods (`api.complaints.create(...)`, `api.auth.login(...)`).
- **Concepts Demonstrated**: The Fetch API, HTTP headers manipulation, token interceptor patterns, asynchronous error propagation, and environment URL selection.
- **Connects To**: Backend REST API endpoints, all React page components.
- **Target Lesson**: *API Integration — Writing a Modular, Production-Grade HTTP Client Service*.

---

### Key Components & Pages

#### `frontend/src/pages/ComplaintForm.jsx`
- **What it does**: Interactive multi-step form for reporting civic issues. Captures category, title, description, address, city, ward, pincode, photo upload, and automatically queries HTML5 Geolocation coordinates (`navigator.geolocation`).
- **Concepts Demonstrated**: Controlled form inputs, file input handling with image previews (`FileReader` / `URL.createObjectURL`), browser Geolocation API, client-side input validation, and multipart form submission.
- **Connects To**: `frontend/src/services/api.js`, `frontend/src/context/ToastContext.jsx`.
- **Target Lesson**: *React Forms — Handling Complex Forms, File Inputs, and Device Geolocation*.

#### `frontend/src/pages/TrackComplaint.jsx` & `frontend/src/components/Timeline.jsx`
- **What they do**: Provide public grievance tracking. Verifies input reference format, queries the API, and renders an audit trail timeline with status pills, officer notes, and photographic evidence.
- **Concepts Demonstrated**: Single-input search forms, regex input formatting, conditional loading/error UI states, and recursive/list timeline rendering.
- **Connects To**: `frontend/src/services/api.js`, `frontend/src/components/StatusBadge.jsx`.
- **Target Lesson**: *Data Fetching — Building Interactive Lookup Interfaces and Audit Trail Timelines*.

#### `frontend/src/pages/authority/AuthorityDashboard.jsx`
- **What it does**: Executive operations control room for municipal engineers. Displays real-time grievance statistics, SLA countdown indicators, category distribution bars, and quick-filter tables.
- **Concepts Demonstrated**: Complex data dashboard layouts, calculating analytics client-side, visual data progress indicators, and handling multiple concurrent API requests with `Promise.all`.
- **Connects To**: `frontend/src/services/api.js`, `frontend/src/pages/authority/AuthorityComplaints.jsx`.
- **Target Lesson**: *Dashboard Engineering — Visualizing Data, Handling Multiple Asynchronous Requests, and Role Protection*.

#### `frontend/src/components/AIAssistant.jsx`
- **What it does**: Floating conversational assistant widget. Communicates with `/api/ai/chat`, reads streamed chunks from a `ReadableStreamDefaultReader`, and updates the chat bubble progressively.
- **Concepts Demonstrated**: Streaming HTTP response parsing in React, automatic message window scrolling, conversation state management, and accessible floating modal design.
- **Connects To**: `backend/src/controllers/aiController.js`.
- **Target Lesson**: *Advanced Frontend — Consuming Streaming APIs and Building Interactive AI Interfaces*.
