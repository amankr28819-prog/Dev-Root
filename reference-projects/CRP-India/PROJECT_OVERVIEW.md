# CRP India — Comprehensive Project Overview & Architecture Reference

> **Reference Project**: `reference-projects/CRP-India/`  
> **Source Platform**: Citizen Redressal Platform (CRP India)  
> **Type**: Enterprise-grade Full-Stack Civic Grievance & Municipal Management System  
> **Verification Status**: Fully verified against actual source code files in this repository.

---

## 1. What CRP India Does

**CRP India (Civic Reporting Platform)** is an enterprise-grade full-stack civic grievance reporting and municipal resolution web application tailored for Indian urban local bodies (ULBs), municipal corporations, and public engineering departments. 

The application establishes a transparent, accountable, closed-loop grievance pipeline between city residents and civic authorities:
1. **Citizens** lodge geo-tagged grievances accompanied by photographic evidence across 7 civic domains (potholes, overflowed trash, broken streetlights, contaminated water, blocked drains, damaged parks, and general municipal issues). Citizens track resolution status through a unique 14-character reference ID (`CRP-YYYY-XXXXX`), upvote community complaints to signal neighborhood urgency, earn citizen karma points, and view municipal activity timelines.
2. **Municipal Authorities & Engineers** log into a role-scoped administrative portal where they monitor incoming grievances by department, assign field officers, adjust triage priorities, update chronological status milestones, communicate with inter-departmental officers, and close issues by uploading mandatory verified **Photo Proof of Resolution**.

---

## 2. Major Features Verified in Source Code

| Feature | Primary Implementation Files | Description |
| :--- | :--- | :--- |
| **Grievance Lodging & Geolocation** | `frontend/src/pages/ComplaintForm.jsx`<br>`backend/src/controllers/complaintController.js` | Multi-field form with GPS location auto-detection via HTML5 Geolocation API, reverse geocoding, file attachment, and atomic reference ID assignment. |
| **Audit Trail & Reference Tracking** | `frontend/src/pages/TrackComplaint.jsx`<br>`frontend/src/components/Timeline.jsx`<br>`backend/src/models/Complaint.js` | Zero-fake-data tracker requiring exact `CRP-YYYY-XXXXX` format. Displays a chronological status timeline, officer notes, and before/after resolution pictures. |
| **Citizen & Authority Authentication** | `frontend/src/context/AuthContext.jsx`<br>`backend/src/controllers/authController.js`<br>`backend/src/middleware/auth.js` | Dual-portal JWT authentication with bcrypt password hashing (10 salt rounds), voter ID registration, and Google OAuth 2.0 integration via `google-auth-library`. |
| **Authority Management Dashboard** | `frontend/src/pages/authority/AuthorityDashboard.jsx`<br>`frontend/src/pages/authority/AuthorityComplaints.jsx`<br>`backend/src/controllers/authorityController.js` | Executive KPI cards (total complaints, resolution rate, average turnaround time, SLA breaches), department breakdown charts, and filtering by ward, priority, and status. |
| **Dual Image Upload Pipeline** | `backend/src/middleware/upload.js`<br>`backend/src/config/cloudinary.js` | Custom Multer streaming engine for Cloudinary CDN with automatic fallback to local disk storage (`uploads/`), strict MIME validation (`.jpg`, `.jpeg`, `.png`, `.webp`), and 5MB size caps. |
| **Gemini AI Civic Assistant** | `frontend/src/components/AIAssistant.jsx`<br>`backend/src/controllers/aiController.js`<br>`backend/src/routes/aiRoutes.js` | Real-time AI chat powered by `@google/genai` (Gemini 3.6 Flash) with Server-Sent Events (SSE) streaming, conversation history sanitation, and civic context enforcement. |
| **Community Upvoting & Karma System** | `frontend/src/components/VotingButtons.jsx`<br>`backend/src/models/Vote.js`<br>`backend/src/models/User.js` | Prevents duplicate vote fraud using compound database indexes (`complaintId` + `userId`), recalculating civic karma points on user profiles. |
| **Dual Theme System & Accessibility** | `frontend/src/context/ThemeContext.jsx`<br>`frontend/src/index.css`<br>`frontend/src/App.jsx` | Dynamic Light (`#F4F8FC` mild blue) and Dark themes via CSS custom properties, persistent user contrast modes, and reduced motion toggles (`data-theme`, `data-reduced-motion`). |

---

## 3. Technology Stack Breakdown

### Frontend Client (`frontend/`)
- **Core Library**: React 19 (`^19.2.8`)
- **Build Tool & Dev Server**: Vite 8 (`^8.2.2`) with `@vitejs/plugin-react` (`^6.1.0`)
- **Client-Side Routing**: React Router DOM v7 (`^7.18.3`) with nested routing, protected route guards, and scroll restoration
- **Icons**: Lucide React (`^1.40.0`)
- **Styling Architecture**: Vanilla CSS using CSS Variables (Design Tokens) defined in `index.css` (no Tailwind dependencies)
- **Linter**: Oxlint (`^1.79.0`) for high-performance JavaScript/JSX validation
- **State Management**: React Context API (`AuthContext`, `ThemeContext`, `ToastContext`) with `localStorage` persistence

### Backend Server (`backend/`)
- **Runtime**: Node.js (v18+ native ES modules & CommonJS support, native `--watch` dev runner)
- **Web Framework**: Express.js (`^4.21.2`)
- **Database ODM**: Mongoose (`^8.9.5`) over MongoDB
- **Embedded Dev Database**: `mongodb-memory-server` (`^10.1.3`) for zero-configuration local development fallback
- **Security & Hardening**:
  - `helmet` (`^8.3.0`): HTTP security headers and cross-origin resource policy
  - `cors` (`^2.8.5`): Whitelist-based origin reflection
  - `express-rate-limit` (`^8.7.0`): Global API and strict auth endpoint rate limiting
  - Custom NoSQL injection sanitizer (`sanitize.js`) striping `$` and `.` operators
- **File Processing**: `multer` (`^1.4.5-lts.1`) + `cloudinary` (`^2.11.0`)
- **Authentication**: `jsonwebtoken` (`^9.0.2`), `bcryptjs` (`^2.4.3`), `google-auth-library` (`^11.0.2`)
- **AI Integration**: `@google/genai` (`^2.22.0`)
- **HTTP Logging**: `morgan` (`^1.10.0`)

---

## 4. Frontend & Backend Architecture

```
[ Browser / Client: React 19 + Vite ]
         |
         | HTTP / HTTPS Requests (JSON & multipart/form-data)
         | Authorization: Bearer <JWT>
         v
[ Reverse Proxy / Express Gateway (server.js : 5000) ]
         |-- Helmet Security Headers & CORS Policy Check
         |-- Body Parser (50kb limit)
         |-- NoSQL Injection Sanitizer (sanitize.js)
         |-- Rate Limiting (apiLimiter)
         |
         +--> /api/auth ---------> authController.js -------> User.js
         +--> /api/complaints ---> complaintController.js --> Complaint.js, Vote.js, Counter.js
         +--> /api/authority ----> authorityController.js --> Aggregations on Complaint/User
         +--> /api/ai -----------> aiController.js ---------> Google Gemini API (@google/genai)
         +--> /api/notifications-> notificationController.js> Notification.js
         +--> /uploads ----------> Static Files (Local Disk fallback)
         |
         v
[ MongoDB Database / MongoMemoryServer ] <======> [ Cloudinary Image Storage ]
```

### Communication Flow
- **Client to Server**: Managed entirely by `frontend/src/services/api.js`. The module wraps browser `window.fetch`, injects the `Authorization: Bearer <token>` header from `localStorage.getItem('crp_token')`, parses JSON payloads, handles multipart file uploads without manually setting `Content-Type`, and standardizes error responses.
- **Server to Client**: Express controllers format every response as a standard JSON envelope:
  ```json
  {
    "success": true,
    "data": { ... },
    "message": "Optional status message"
  }
  ```
- **Real-Time Streaming**: For the Gemini AI assistant (`/api/ai/chat`), the backend establishes Server-Sent Events (`text/event-stream`), flushing chunks to the client as they arrive from Google Gemini.

---

## 5. Database Schema & Data Models

All models reside in `backend/src/models/`:

### 1. `Complaint.js`
The central entity of the platform.
- **Key Fields**:
  - `referenceId`: String, unique index, format `CRP-YYYY-XXXXX`.
  - `citizen`: Embedded document containing `name`, `phone`, `email`, and `userId` reference to `User`.
  - `category`: Enum representing 7 civic categories: `Roads & Potholes`, `Garbage & Sanitation`, `Streetlights`, `Water Supply`, `Drainage`, `Public Spaces`, `Other Issues`.
  - `location`: Structured object with `address`, `ward`, `city`, `pincode`, and `coordinates` (`lat`, `lng`).
  - `status`: Enum (`Submitted`, `Under Review`, `Assigned`, `In Progress`, `Resolved`, `Rejected`, `Duplicate`, `Misinformation`).
  - `priority`: Enum (`Low`, `Medium`, `High`, `Critical`).
  - `assignedTo`: Field officer and department details.
  - `images`: Array of complaint proof URLs.
  - `resolutionPhoto`: Verified closure image uploaded by municipal authority.
  - `timeline`: Embedded array of `statusHistorySchema` objects recording status transitions, timestamps, officer names, and remarks.
  - `authorityMessages`: Embedded array of internal municipal notes between officers.
  - `upvotesCount`: Counter incremented/decremented transactionally when citizens vote.

### 2. `User.js`
Manages citizen and authority identities.
- **Roles**: `citizen`, `authority`, `authority_admin`, `authority_category`.
- **Authentication**: `email`, `password` (hashed with bcrypt, selected `false` by default), `googleId`, `authProvider` (`local` vs `google`).
- **Civic Attributes**: `voterId` (for verified civic profiles), `constituency`, `karma` points, `warningCount`, and `warnings` array for disciplinary actions against abusive submissions.
- **Authority Scope**: `department`, `designation`, `assignedCategory`.

### 3. `Counter.js`
Atomic sequence generator ensuring that concurrent complaint submissions never produce conflicting reference IDs. Operates via MongoDB's atomic `findOneAndUpdate` with `$inc`.

### 4. `Vote.js`
Enforces fair voting with a compound unique index:
```javascript
voteSchema.index({ complaint: 1, user: 1 }, { unique: true });
```
Prevents ballot stuffing while storing whether the citizen upvoted or removed their vote.

### 5. `Notification.js`
Stores system alerts for citizens (e.g., status changes on tracked complaints, milestone achievements) and authorities (new grievance lodged in assigned ward).

---

## 6. Authentication & Authorization Flow

### Citizen Authentication Flow
1. **Registration**: Citizen submits name, email, password, and optional voter ID at `/register`. Passwords are validated for length (min 8 characters) and hashed via `bcrypt.hash(password, 10)`.
2. **Login**: Citizen authenticates at `/login` via email/password or Google One Tap / OAuth popup.
3. **Token Issuance**: Backend generates a signed JWT payload containing `{ id: user._id, role: user.role }` with 7-day expiration (`JWT_EXPIRES_IN=7d`).
4. **Client Storage**: `AuthContext.jsx` saves the token in `localStorage.setItem('crp_token', token)` and hydrates user state.
5. **Route Guards**: `CitizenProtectedRoute.jsx` intercepts unauthorized visitors attempting to access `/dashboard` or `/account` and redirects them to `/login`.

### Municipal Authority Authorization Flow
1. **Separated Gateway**: Municipal officers sign in via a dedicated portal (`/authority/login`).
2. **Authority Token Verification**: `backend/src/middleware/auth.js` exports `protect` and `authorize`:
   ```javascript
   exports.authorize = (...roles) => {
     return (req, res, next) => {
       if (!roles.includes(req.user.role)) {
         return res.status(403).json({ success: false, message: 'Access denied: Unauthorized role.' });
       }
       next();
     };
   };
   ```
3. **Category & Department Scoping**: Authorities assigned to a specific category (e.g. `Roads & Potholes`) are scoped via `backend/src/utils/authorityScope.js` to prevent unauthorized cross-department status updates.

---

## 7. REST API Structure

The backend mounts 6 dedicated route modules under `/api`:

```
/api
├── /health              [GET]           - Server heartbeat & uptime status
├── /auth
│   ├── /register        [POST]          - Register citizen account
│   ├── /login           [POST]          - Authenticate citizen or municipal officer
│   ├── /me              [GET]           - Retrieve authenticated user session
│   ├── /google/config   [GET]           - Get Google OAuth Client ID
│   ├── /google          [POST]          - Authenticate via Google ID token
│   └── /change-password [POST]          - Update user credentials
├── /complaints
│   ├── /                [GET, POST]     - List complaints (filtered) / Submit new complaint
│   ├── /:id             [GET]           - Fetch complaint by MongoDB ID
│   ├── /track/:refId    [GET]           - Public track by CRP reference code
│   ├── /:id/vote        [POST]          - Upvote or unvote complaint
│   ├── /:id/status      [PATCH]         - Authority status update + remark + photo
│   ├── /:id/assign      [PATCH]         - Assign officer and department
│   └── /:id/messages    [POST]          - Add internal authority discussion message
├── /authority
│   ├── /dashboard       [GET]           - Executive KPI metrics & department summaries
│   ├── /complaints      [GET]           - Filterable authority complaint registry
│   ├── /reports         [GET]           - Municipal resolution analytical reports
│   └── /profile         [GET, PATCH]    - Authority profile & departmental settings
├── /citizens
│   ├── /search          [GET]           - Public civic directory search
│   ├── /:id/profile     [GET]           - Public citizen profile & karma overview
│   └── /me/complaints   [GET]           - List grievances filed by logged-in citizen
├── /notifications
│   ├── /                [GET]           - List user notifications
│   ├── /:id/read        [PATCH]         - Mark single notification as read
│   └── /read-all        [PATCH]         - Mark all notifications as read
└── /ai
    ├── /chat            [POST]          - Conversational AI with streaming support
    └── /status          [GET]           - Gemini API key health & model info
```

---

## 8. File Upload & Storage Architecture

File uploads are handled in `backend/src/middleware/upload.js`.

1. **Dual Storage Strategy**:
   - **Production Storage (Cloudinary)**: When `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` are provided, uploads stream directly to Cloudinary using a custom Multer engine (`CloudinaryStorage`) utilizing `cloudinary.uploader.upload_stream`.
   - **Local Storage Fallback**: If Cloudinary credentials are absent, Multer falls back to local disk storage (`uploadsDir = path.join(__dirname, '../../uploads')`).
2. **Security & Validation**:
   - Files are restricted to `.jpg`, `.jpeg`, `.png`, and `.webp`.
   - Both MIME type (`file.mimetype`) and file extension are validated.
   - Max file size limit: 5MB (`limits: { fileSize: 5 * 1024 * 1024 }`).
   - Static file route `/uploads` applies security headers: `X-Content-Type-Options: nosniff` and `Content-Security-Policy: default-src 'none'`.

---

## 9. External Services & Integrations

1. **Google Gemini Generative AI**:
   - Integrated via `@google/genai` (SDK v2.x).
   - Configurable model (defaults to `gemini-3.6-flash`).
   - Uses strict system prompt conditioning (`CRP_INDIA_SYSTEM_INSTRUCTION`) to provide accurate municipal assistance without hallucinating civic capabilities.
2. **Cloudinary CDN**:
   - Remote persistent image storage for complaint evidence and resolution verification photos.
   - Applies auto-formatting and auto-quality optimizations (`fetch_format: auto`, `quality: auto`).
3. **Google Identity Services (OAuth 2.0)**:
   - Validates Google ID tokens server-side using `google-auth-library` (`OAuth2Client.verifyIdToken`).

---

## 10. Deployment & Production Configuration

- **Frontend Deployment**:
  - Configured for Render static hosting (`render.yaml`) and Vercel (`frontend/vercel.json`).
  - Production build command: `npm install && npm run build`. Output directory: `dist`.
  - Single Page Application (SPA) routing rewrites all routes (`/*`) to `/index.html`.
- **Backend Deployment**:
  - Deployed on Node.js container environments (e.g. Render Web Service).
  - Production startup: `node src/server.js`.
  - Dynamic port binding via `process.env.PORT || 5000`.
  - Production security validation: In `server.js`, the server halts immediately on boot (`process.exit(1)`) if `JWT_SECRET` is unset, shorter than 32 characters, or contains default sample strings.
