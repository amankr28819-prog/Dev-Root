/**
 * Dev-root Course 18: CRP India Case Studies - Deep Learning Curriculum
 * Architecture deep dive lesson analyzing the production civic redressal application.
 */

export const CRP_CASE_STUDY_LESSONS = {
  'crp-india-architecture-deep-dive': {
    id: 'case-study-overview',
    slug: 'crp-india-architecture-deep-dive',
    courseId: 'course-18',
    courseSlug: 'crp-india-case-studies',
    courseTitle: 'Course 18: CRP India Real-World Case Studies',
    title: 'CRP India Architecture Deep Dive: Full-Stack Case Study',
    category: 'Case Studies',
    estimatedTime: '45 min read & practice',
    objectives: [
      'Deconstruct the complete system architecture of CRP India (Citizen Redressal Portal).',
      'Understand decoupled MERN stack architecture (React 19 + Node.js Express + MongoDB).',
      'Examine the multi-role authentication model (Citizens, Nodal Officers, System Admins).',
      'Study Mongoose schema design: nested subdocuments, status history audit trails, and atomic counters.',
      'Analyze file upload pipelines: streaming via Multer with Cloudinary and local disk fallbacks.'
    ],
    sections: [
      {
        heading: 'System Overview: The Mission of CRP India',
        content: `CRP India (Citizen Redressal Portal) is an end-to-end municipal grievance management platform designed to provide transparent, accountable, and tamper-resistant tracking of civic complaints across urban departments (Sanitation, Public Works, Water Supply, Electricity).

### The Real-World Engineering Challenge:
A municipal government cannot simply record complaints in a static spreadsheet. A civic system must handle:
* High-volume concurrent citizen submissions with photographic evidence.
* Strict role-based access control (Citizens submit; Nodal Officers investigate and resolve; Admins oversee departments).
* Complete audit trails: every status transition (Pending -> In Progress -> Resolved) must record timestamp, officer ID, and notes.
* Mobile-responsive interface for citizens on slow cellular networks alongside desktop executive dashboards.`
      },
      {
        heading: 'Decoupled Monorepo Architecture',
        content: `The repository is organized as a decoupled monorepo:

\`\`\`
reference-projects/CRP-India/
├── frontend/                     # React 19 Client SPA
│   ├── src/
│   │   ├── pages/               # CitizenDashboard, AdminDashboard, SubmitGrievance
│   │   ├── components/          # GrievanceCard, Navbar, StatusBadge
│   │   ├── context/             # AuthContext, ThemeContext
│   │   └── api/                 # Axios HTTP client configuration
│   └── vite.config.js           # Fast HMR build pipeline
│
└── backend/                      # Node.js Express REST API
    ├── src/
    │   ├── models/              # Mongoose Schemas (User, Grievance, Department)
    │   ├── routes/              # Express Router definitions
    │   ├── controllers/         # Request handlers and business logic
    │   ├── middleware/          # JWT auth guards and Multer upload handlers
    │   └── server.js            # Express application bootstrap
\`\`\`

### Architectural Separation:
* **Frontend:** Built with React 19 and Vite. Communicates with the backend exclusively via asynchronous HTTP requests sending and receiving JSON.
* **Backend:** Built with Node.js and Express. Exposes REST endpoints under \`/api/v1/\`, connects to MongoDB using Mongoose, and signs JSON Web Tokens for authentication.`
      },
      {
        heading: 'Data Modeling: Mongoose Schemas and Audit Trails',
        content: `The core database model in CRP India is the **Grievance** schema:

\`\`\`javascript
// Simplified Mongoose Grievance Schema:
const GrievanceSchema = new mongoose.Schema({
  trackingId: {
    type: String,
    unique: true,
    required: true,
    index: true // Fast lookup for public tracking searches
  },
  citizen: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  department: {
    type: String,
    enum: ['Sanitation', 'Roads', 'Water', 'Electricity'],
    required: true
  },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  evidenceUrls: [{ type: String }],
  status: {
    type: String,
    enum: ['pending', 'assigned', 'in_progress', 'resolved', 'rejected'],
    default: 'pending'
  },
  // Immutable chronological audit trail
  timeline: [{
    action: { type: String, required: true },
    performedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now },
    notes: String
  }]
}, { timestamps: true });
\`\`\`

### Key Architectural Patterns:
1. **Human-Readable Atomic Tracking Codes:** Instead of exposing opaque MongoDB ObjectIds (\`6605b7c...\`), CRP India generates codes like \`CRP-2026-00412\` using atomic counters.
2. **Timeline Subdocuments:** Status updates do not simply overwrite an existing string; they push a new event into the \`timeline\` array. This prevents corrupt officers from silently closing complaints without a verifiable audit record.`
      },
      {
        heading: 'Security & Authentication: JWT and Role Guards',
        content: `CRP India implements dual-portal authentication:

1. **Password Security:** Citizen and Officer passwords are never stored in plaintext. They are salted and cryptographically hashed using **bcrypt** (\`10\` salt rounds) before database persistence.
2. **JSON Web Tokens (JWT):** Upon successful login, the server signs a cryptographically verifiable JWT containing \`userId\` and \`role\`.
3. **Role Guards (RBAC):** Express middleware intercepts protected routes:
   \`\`\`javascript
   // Route protected for administrative personnel only:
   router.patch(
     '/grievances/:id/assign',
     verifyToken,
     requireRole(['admin', 'nodal_officer']),
     assignGrievanceController
   );
   \`\`\``
      }
    ],
    commonMistakes: [
      {
        mistake: 'Overwriting complaint status without recording an audit log.',
        whyItHappens: 'Setting grievance.status = "resolved" is simpler than managing an array.',
        howToFix: 'Push every status change into a timeline subdocument array with timestamp and officer ID for accountability.'
      },
      {
        mistake: 'Storing unhashed passwords in MongoDB.',
        whyItHappens: 'Testing in local development without realizing the security risks.',
        howToFix: 'Always hash passwords with bcrypt in a Mongoose pre("save") hook.'
      },
      {
        mistake: 'Allowing citizens to edit grievance details after an officer has begun investigation.',
        whyItHappens: 'Forgetting state transition guards in the backend controller.',
        howToFix: 'Enforce state machine rules: once status moves past "pending", restrict modifications.'
      }
    ],
    guidedExercise: {
      title: 'Analyze the CRP India Status Transition State Machine',
      difficulty: 'Intermediate',
      instructions: 'Review the grievance status lifecycle below. Construct the state transition logic to verify whether a requested status change is legally permitted.',
      starterCode: `// PERMITTED STATE TRANSITIONS:
// 'pending' -> 'assigned' OR 'rejected'
// 'assigned' -> 'in_progress'
// 'in_progress' -> 'resolved' OR 'escalated'
// 'resolved' -> (Terminal state, no further transitions)

function isTransitionPermitted(currentStatus, requestedStatus) {
  // TODO: Implement state transition validation
}`,
      tasks: [
        'Define a transition lookup table mapping current states to allowed next states.',
        'Validate whether currentStatus allows requestedStatus.',
        'Prevent transitions out of resolved terminal state.',
        'Return a boolean true/false and explanatory reason.'
      ],
      hints: [
        'Use an object mapping: const ALLOWED = { pending: ["assigned", "rejected"], ... }.',
        'Check if ALLOWED[currentStatus]?.includes(requestedStatus).'
      ],
      solution: `const ALLOWED_TRANSITIONS = {
  pending: ['assigned', 'rejected'],
  assigned: ['in_progress', 'rejected'],
  in_progress: ['resolved', 'escalated'],
  escalated: ['in_progress', 'resolved'],
  resolved: [], // Terminal
  rejected: []  // Terminal
};

function isTransitionPermitted(currentStatus, requestedStatus) {
  const allowed = ALLOWED_TRANSITIONS[currentStatus];
  if (!allowed || allowed.length === 0) {
    return { permitted: false, reason: \`Cannot transition from terminal state '\${currentStatus}'.\` };
  }

  if (allowed.includes(requestedStatus)) {
    return { permitted: true, reason: 'Valid state transition.' };
  }

  return { 
    permitted: false, 
    reason: \`Illegal transition from '\${currentStatus}' to '\${requestedStatus}'.\` 
  };
}

console.log(isTransitionPermitted('pending', 'in_progress')); // False (must be assigned first)
console.log(isTransitionPermitted('pending', 'assigned'));    // True`,
      solutionExplanation: 'Enforcing state machines in backend controllers guarantees that civic complaints follow strict procedural protocols and prevents skipping required investigation stages.'
    },
    quiz: [
      {
        question: 'What is the purpose of storing status transitions in a "timeline" array inside the Grievance Mongoose schema?',
        options: [
          'To make the database file size larger.',
          'To create an immutable, chronological audit trail recording who changed what status and when.',
          'To automatically tweet updates on Twitter.',
          'To calculate tax deductions.'
        ],
        correctIndex: 1,
        explanation: 'The timeline array provides an auditable history of every action taken on a grievance, ensuring accountability for municipal officers.'
      },
      {
        question: 'Why does CRP India hash passwords using bcrypt rather than storing plain strings?',
        options: [
          'Because plain strings take up too much memory in MongoDB.',
          'To protect user credentials: if the database is ever compromised, attackers cannot read passwords because bcrypt hashes cannot be reversed.',
          'bcrypt automatically sends SMS notifications to users.',
          'MongoDB refuses to save plaintext strings.'
        ],
        correctIndex: 1,
        explanation: 'bcrypt is a one-way cryptographic hashing algorithm with salting. Even if an attacker gains database access, passwords cannot be reversed.'
      },
      {
        question: 'In the CRP India decoupled architecture, how does the React frontend communicate with the Node.js Express backend?',
        options: [
          'Directly importing backend JavaScript files.',
          'Via asynchronous HTTP network requests exchanging structured JSON over REST API endpoints.',
          'Through Bluetooth connections.',
          'Via shared USB drives.'
        ],
        correctIndex: 1,
        explanation: 'The frontend and backend run as separate processes and communicate exclusively over HTTP/HTTPS by sending and receiving JSON payloads.'
      }
    ],
    takeaways: [
      'CRP India demonstrates full-stack architecture: React 19 frontend, Node.js Express API, MongoDB database.',
      'Decoupled architectures communicate exclusively over HTTP REST APIs exchanging JSON.',
      'Protect user security using bcrypt password hashing and cryptographic JWT authentication.',
      'Implement immutable timeline arrays in database schemas to maintain full audit logs.',
      'Enforce state machines on the backend to validate procedural workflows.'
    ],
    caseStudyReference: {
      title: 'Full Repository Architecture in CRP India',
      description: 'Explore the complete source code of the CRP India reference repository located under reference-projects/CRP-India/.',
      files: [
        'reference-projects/CRP-India/frontend/src/App.jsx',
        'reference-projects/CRP-India/backend/src/server.js',
        'reference-projects/CRP-India/backend/src/models/Grievance.js'
      ]
    }
  }
};
