/**
 * Dev-root Course 12: Authentication and Authorization - Deep Learning Curriculum (Phase 4 4x Depth Standard)
 * Comprehensive lessons covering Password Hashing with bcrypt, Stateless JWT Tokens,
 * Role-Based Access Control (RBAC), protected Express routes, and OWASP Web Security.
 */

export const AUTH_SECURITY_LESSONS = {
  'authentication-concepts-and-jwt': {
    id: 'lesson-12-1',
    slug: 'authentication-concepts-and-jwt',
    courseId: 'course-12',
    courseSlug: 'authentication-and-web-security',
    courseTitle: 'Course 12: Authentication and Authorization',
    title: 'Authentication Foundations, Password Hashing & Stateless JWTs',
    category: 'Security',
    estimatedTime: '45 min read & practice',
    objectives: [
      'Distinguish Authentication (identity verification) from Authorization (permission verification).',
      'Understand why passwords must never be stored in plaintext and how bcrypt hashing with salts works.',
      'Explain the anatomy of a JSON Web Token (JWT): Header, Payload, and Signature.',
      'Understand how stateless JWT verification eliminates session database lookups on every API request.',
      'Compare secure token storage mechanisms: HttpOnly Secure Cookies vs LocalStorage and evaluate XSS risks.'
    ],
    sections: [
      {
        heading: 'Authentication vs. Authorization: The Critical Distinction',
        content: `In web security and identity architecture, **Authentication** and **Authorization** represent two distinct security checkpoints:

\`\`\`
  [Citizen Approaching System]
               |
               v
  1. AUTHENTICATION (Who are you?)
     "I am Ramesh Kumar, here is my email and password / OTP."
     ---> Server verifies identity. User is authenticated.
               |
               v
  2. AUTHORIZATION (What are you allowed to do?)
     "Can Ramesh Kumar delete a municipal complaint filed by another citizen?"
     ---> Server checks user role (Citizen vs Nodal Admin). Action denied!
\`\`\`

* **Authentication (AuthN):** The process of verifying that an entity is who they claim to be (e.g., verifying an email/password combination, biometric scan, or cryptographic signature).
* **Authorization (AuthZ):** The process of determining whether an authenticated entity possesses the permissions to access a specific resource or perform an action (e.g., viewing confidential reports, assigning repair teams).`
      },
      {
        heading: 'Password Storage Security: Why Hashing and Salts are Mandatory',
        content: `The most catastrophic security mistake in web development is storing user passwords in plaintext or using reversible two-way encryption. If your database is compromised via a SQL injection or leaked backup, all user credentials are leaked across the dark web.

### Cryptographic Hashing: One-Way Mathematical Functions
A cryptographic hash is a one-way function: given a password \`P\`, computing \`hash(P)\` is instantaneous, but calculating \`P\` from \`hash(P)\` is mathematically impossible.

### Why Fast Hashes (MD5, SHA-256) Fail:
Algorithms like MD5 or SHA-256 were designed for fast data integrity checks. Modern GPUs can calculate **billions of SHA-256 hashes per second**, enabling attackers to crack passwords instantly using pre-computed lookups (**Rainbow Tables**).

### The Solution: \`bcrypt\` (Slow Adaptive Hashing with Salts)
\`bcrypt\` is an adaptive password-hashing function specifically engineered to be computationally expensive:
1. **Salt:** A cryptographically random string generated and prepended to the password *before* hashing. This guarantees that two users with the exact same password ("password123") have completely different hash strings in the database, defeating Rainbow Tables.
2. **Work Factor (Cost / Rounds):** Controls how many iterations the algorithm performs (e.g., 10 or 12 rounds). As hardware gets faster, developers can increase the work factor without altering code.

\`\`\`javascript
import bcrypt from 'bcryptjs';

// 1. When citizen registers:
const salt = await bcrypt.genSalt(10); // Generates 10-round cryptographic salt
const hashedPassword = await bcrypt.hash(plainPassword, salt);
// Save hashedPassword to MongoDB: "$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lR5.eN8q..."

// 2. When citizen logs in:
const isMatch = await bcrypt.compare(enteredPassword, storedHashedPassword);
if (!isMatch) {
  return res.status(401).json({ error: "Invalid credentials" });
}
\`\`\``
      },
      {
        heading: 'Stateless Authentication with JSON Web Tokens (JWT)',
        content: `In traditional **Stateful Session Authentication**, the server generates a random session ID, saves it in a server database or Redis cache, and sets a cookie on the client. On every single API request, the server must query the database to verify the session. In high-traffic microservices, this creates a major database bottleneck.

**JSON Web Tokens (JWT)** enable **Stateless Authentication**: the server generates a cryptographically signed token containing the user's identity and permissions, which the client sends in the HTTP \`Authorization\` header.

\`\`\`
   JWT = [Header (Base64)] . [Payload (Base64)] . [Cryptographic Signature]
\`\`\`

### The Three Components of a JWT:
1. **Header (Algorithm & Token Type):**
   \`\`\`json
   { "alg": "HS256", "typ": "JWT" }
   \`\`\`
2. **Payload (Claims & Identity Data):**
   \`\`\`json
   {
     "sub": "user_id_1042",
     "name": "Anita Roy",
     "role": "nodal_officer",
     "department": "Public Works",
     "iat": 1729980000,
     "exp": 1729983600
   }
   \`\`\`
   *Crucial Security Warning:* The payload is only Base64-encoded, **NOT encrypted!** Anyone can decode and read its contents. **Never store passwords, credit card numbers, or secret keys inside a JWT payload!**
3. **Cryptographic Signature:**
   \`\`\`
   Signature = HMACSHA256(
     base64UrlEncode(header) + "." + base64UrlEncode(payload),
     JWT_SECRET_KEY
   )
   \`\`\`
   The signature proves that the payload has not been tampered with. If an attacker modifies \`"role": "citizen"\` to \`"role": "admin"\`, the signature calculation no longer matches, and the server rejects the token immediately!`
      },
      {
        heading: 'Issuing and Verifying JWTs with jsonwebtoken in Node.js',
        content: `\`\`\`javascript
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

// 1. Issue Token upon successful login:
function generateToken(user) {
  return jwt.sign(
    { 
      id: user._id, 
      role: user.role, 
      department: user.department 
    },
    JWT_SECRET,
    { expiresIn: '2h' } // Token automatically expires in 2 hours
  );
}

// 2. Verify Token in Express:
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { valid: true, user: decoded };
  } catch (err) {
    return { valid: false, error: err.message };
  }
}
\`\`\``
      }
    ],
    exercise: {
      instruction: 'Create an Express authentication middleware verifyAuth(req, res, next) that checks for the Authorization header formatted as "Bearer <token>", verifies it using jwt.verify and process.env.JWT_SECRET, and attaches the decoded payload to req.user. If missing or invalid, return HTTP 401 Unauthorized.',
      starterCode: `import jwt from 'jsonwebtoken';

function verifyAuth(req, res, next) {
  // Extract Bearer token, verify, and call next()
}
`,
      hints: [
        'Check const authHeader = req.headers.authorization;',
        'If (!authHeader || !authHeader.startsWith("Bearer ")) return res.status(401).json({ error: "Access denied. No token provided." });',
        'Extract const token = authHeader.split(" ")[1];',
        'Inside try, const decoded = jwt.verify(token, process.env.JWT_SECRET); req.user = decoded; next();',
        'In catch(err), return res.status(401).json({ error: "Invalid or expired token." });'
      ],
      tasks: [
        'Inspect Authorization header',
        'Extract Bearer token substring',
        'Verify token with jwt.verify',
        'Attach decoded user to req.user'
      ],
      solution: `import jwt from 'jsonwebtoken';

function verifyAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Authentication failed: Missing or malformed Bearer token.'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user identity to request object
    next();             // Hand off to the next middleware/controller
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: 'Authentication failed: Token is invalid or expired.'
    });
  }
}`,
      solutionExplanation: 'This is the standard industry pattern for stateless JWT verification in Express. It enforces the standard Bearer scheme, isolates signature verification inside a try/catch block, injects identity into req.user, and halts unauthorized requests before controllers execute.'
    },
    quiz: [
      {
        question: 'Why is it safe for a backend server to accept an incoming JWT without querying its database on every request?',
        options: [
          'Because all JWTs are verified by Google servers.',
          'Because the server verifies the cryptographic signature generated with its private secret key; if any claim was altered, the signature verification fails automatically.',
          'Because JWTs are encrypted with military-grade keys.',
          'Because JWTs can only be sent from trusted IP addresses.'
        ],
        correctIndex: 1,
        explanation: 'The cryptographic signature is created using the secret key held only by the server. If an attacker tampers with the payload, the computed signature will not match, proving the token is counterfeit.'
      },
      {
        question: 'Why should sensitive data like passwords or social security numbers NEVER be stored in a JWT payload?',
        options: [
          'It slows down the network.',
          'The JWT payload is only Base64-URL encoded, not encrypted. Anyone who intercepts or reads the token can trivially decode and read the plain text payload.',
          'MongoDB rejects JWTs containing strings.',
          'JWT payloads can only contain numbers.'
        ],
        correctIndex: 1,
        explanation: 'Base64 is an encoding format, NOT encryption. Anyone with access to the token string can decode the payload on websites like jwt.io and read every property stored inside.'
      }
    ],
    takeaways: [
      'Authentication verifies identity; Authorization determines permissions.',
      'Always hash passwords with bcrypt using cryptographic salts; never store plaintext passwords.',
      'JWTs provide stateless authentication via three segments: Header, Payload, and Signature.',
      'Never store sensitive credentials inside a JWT payload because it is only Base64 encoded.'
    ],
    caseStudyReference: {
      title: 'Auth Controller & JWT Generation in CRP India',
      description: 'Review the authentication controller and JWT signing routines implemented in the CRP India backend.',
      files: [
        'reference-projects/CRP-India/backend/controllers/authController.js',
        'reference-projects/CRP-India/backend/middleware/auth.js'
      ]
    }
  },

  'authorization-and-web-security': {
    id: 'lesson-12-2',
    slug: 'authorization-and-web-security',
    courseId: 'course-12',
    courseSlug: 'authentication-and-web-security',
    courseTitle: 'Course 12: Authentication and Authorization',
    title: 'Role-Based Access Control, Protected Routes & Web Security',
    category: 'Security',
    estimatedTime: '45 min read & practice',
    objectives: [
      'Implement Role-Based Access Control (RBAC) middleware in Express.',
      'Protect administrative and departmental API routes against privilege escalation.',
      'Understand the OWASP Top 10 Web Application Security Risks.',
      'Mitigate Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF).',
      'Harden Express servers with security headers (Helmet) and Rate Limiting.'
    ],
    sections: [
      {
        heading: 'Role-Based Access Control (RBAC) in Enterprise Architecture',
        content: `Once a user is authenticated, the system must enforce **Authorization**. In municipal systems like CRP India, different user classes have distinct privileges:

* **Citizen:** Can create grievances, view their own tickets, and post comments.
* **Nodal Officer:** Can view all grievances assigned to their department (e.g., Public Works), update ticket statuses, and upload inspection photos.
* **Super Administrator:** Can assign officers, reconfigure ward boundaries, and delete tickets.

\`\`\`
                          [ Incoming HTTP Request ]
                                     |
                                     v
                        [ verifyAuth Middleware ]
                        (Is user authenticated?)
                                     | Yes
                                     v
                        [ requireRole("admin") ]
                        (Does req.user.role === "admin"?)
                                /          \\
                         Yes   /            \\  No
                              v              v
                     [ Route Controller ]  [ HTTP 403 Forbidden ]
\`\`\``
      },
      {
        heading: 'Building Composable RBAC Middleware in Express',
        content: `We can create higher-order middleware factory functions that accept permitted roles:

\`\`\`javascript
// Higher-order middleware factory
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // req.user was previously attached by verifyAuth middleware
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: \`Access denied. Role '\${req.user?.role || "anonymous"}' is not authorized to access this resource.\`
      });
    }
    next(); // Permitted! Proceed to controller.
  };
};

// Usage on protected administrative routes:
// router.delete('/api/v1/complaints/:id', verifyAuth, authorizeRoles('admin'), deleteComplaint);
\`\`\``
      },
      {
        heading: 'The OWASP Top 10: Essential Web Security Vulnerabilities',
        content: `The **Open Web Application Security Project (OWASP)** tracks the most critical web application vulnerabilities:

### 1. Injection Attacks (SQL & NoSQL Injection):
Occurs when untrusted user input is concatenated directly into database queries.
* *Example (NoSQL Injection in MongoDB):* If login queries use \`User.findOne({ email: req.body.email, password: req.body.password })\`, an attacker passing \`{ "password": { "$ne": null } }\` bypasses password verification!
* *Mitigation:* Always validate input types with Mongoose schemas and sanitize payloads.

### 2. Cross-Site Scripting (XSS):
Occurs when an application includes untrusted data in a web page without proper escaping, allowing attackers to execute arbitrary JavaScript in victim browsers.
* *Mitigation:* Never use \`innerHTML\` with user data; use \`textContent\`; set a strict **Content Security Policy (CSP)**.

### 3. Cross-Site Request Forgery (CSRF):
Occurs when a malicious website tricks a victim's authenticated browser into executing unwanted actions on another trusted web application.
* *Mitigation:* Store authentication tokens in \`SameSite=Strict\` cookies or custom headers (\`Authorization: Bearer\`).`
      },
      {
        heading: 'Hardening Production Express Servers: Helmet and Rate Limiting',
        content: `Before deploying an Express backend to the public internet, apply essential security hardening layers:

\`\`\`javascript
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

const app = express();

// 1. Helmet: Sets 14 secure HTTP headers (HSTS, CSP, X-Frame-Options against clickjacking)
app.use(helmet());

// 2. CORS: Restrict access only to your authorized frontend domain
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// 3. Rate Limiter: Mitigate Denial-of-Service (DoS) and Brute-Force Password Attacks
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,                   // Maximum 5 failed attempts per IP
  message: { error: "Too many login attempts from this IP. Please try again after 15 minutes." }
});

app.use('/api/v1/auth/login', authLimiter);
\`\`\``
      }
    ],
    exercise: {
      instruction: 'Write an Express middleware requireDepartment(allowedDept) that checks if the authenticated user (req.user) belongs to the required department or has the "superadmin" role. If unauthorized, respond with HTTP 403 Forbidden.',
      starterCode: `function requireDepartment(allowedDept) {
  return (req, res, next) => {
    // Check req.user.department and role
  };
}
`,
      hints: [
        'Inspect req.user. If (!req.user) return res.status(401).json({ error: "Unauthenticated" });',
        'Check if (req.user.role === "superadmin" || req.user.department === allowedDept) { return next(); }',
        'Otherwise, return res.status(403).json({ error: "Access denied. Restricted to " + allowedDept });'
      ],
      tasks: [
        'Check for presence of req.user',
        'Allow superadmin override',
        'Verify matching department',
        'Return 403 Forbidden on mismatch'
      ],
      solution: `function requireDepartment(allowedDept) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: "Authentication required."
      });
    }

    if (req.user.role === 'superadmin' || req.user.department === allowedDept) {
      return next();
    }

    return res.status(403).json({
      success: false,
      error: \`Forbidden: Access restricted to members of \${allowedDept}.\`
    });
  };
}`,
      solutionExplanation: 'This demonstrates clean departmental authorization. It verifies authentication, respects superadmin privilege overrides, and terminates unauthorized requests with HTTP 403 Forbidden.'
    },
    quiz: [
      {
        question: 'What is the precise HTTP status code standard for an Authenticated user who lacks permission to access an administrative endpoint?',
        options: [
          'HTTP 401 Unauthorized',
          'HTTP 403 Forbidden',
          'HTTP 404 Not Found',
          'HTTP 500 Internal Error'
        ],
        correctIndex: 1,
        explanation: 'HTTP 401 Unauthorized means "I do not know who you are (unauthenticated)". HTTP 403 Forbidden means "I know who you are, but you do not possess permission for this action (unauthorized)".'
      },
      {
        question: 'What is the primary function of the "helmet" middleware package in an Express application?',
        options: [
          'It compiles JavaScript into WebAssembly.',
          'It automatically configures secure HTTP response headers (such as Content-Security-Policy and X-Frame-Options) to shield against common web vulnerabilities.',
          'It encrypts the MongoDB database.',
          'It generates HTTPS SSL certificates.'
        ],
        correctIndex: 1,
        explanation: 'Helmet sets security-related HTTP headers like X-DNS-Prefetch-Control, X-Frame-Options (clickjacking), Strict-Transport-Security (HSTS), and Content-Security-Policy.'
      }
    ],
    takeaways: [
      'Role-Based Access Control (RBAC) verifies user roles before granting access to protected endpoints.',
      'Use HTTP 401 for missing/invalid authentication, and HTTP 403 Forbidden for insufficient permissions.',
      'Defend against OWASP vulnerabilities: sanitize inputs, prevent XSS, and avoid raw string SQL/NoSQL queries.',
      'Always install helmet, configure CORS, and apply express-rate-limit in production Express apps.'
    ],
    caseStudyReference: {
      title: 'Role-Based Middleware & Security in CRP India',
      description: 'Examine the auth and admin middleware in CRP India that restricts nodal management routes to authenticated officers and administrators.',
      files: [
        'reference-projects/CRP-India/backend/middleware/auth.js',
        'reference-projects/CRP-India/backend/routes/complaintRoutes.js'
      ]
    }
  }
};
