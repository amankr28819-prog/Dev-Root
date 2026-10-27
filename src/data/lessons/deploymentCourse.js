/**
 * Dev-root Course 15: Production Deployment, Cloud & DevOps
 * Deep Learning Curriculum (Phase 6 4x Content-Depth Standard)
 * Dev vs Production Environments, Vite Build Bundling, Secrets Management,
 * Cloud Hosting Architectures (Vercel, Render, MongoDB Atlas), DNS/HTTPS, and Production Reliability.
 */

export const DEPLOYMENT_LESSONS = {
  'development-vs-production-and-builds': {
    id: 'lesson-15-1',
    slug: 'development-vs-production-and-builds',
    courseId: 'course-15',
    courseSlug: 'production-deployment-and-devops',
    courseTitle: 'Course 15: Production Deployment, Cloud & DevOps',
    title: 'Development vs Production & The Modern Build Pipeline',
    category: 'DevOps',
    estimatedTime: '45 min read & practice',
    objectives: [
      'Compare Development environments (hot reload, source maps, unminified code) with Production environments (minification, tree-shaking, caching).',
      'Understand how the Vite/Rollup build pipeline transforms JSX, TypeScript, and modern CSS into static assets.',
      'Deconstruct content hashing in filenames (e.g. index-C299_quw.js) for immutable cache busting.',
      'Configure Single Page Application (SPA) rewrite rules (_redirects, nginx.conf) to prevent 404s on page reloads.',
      'Analyze bundle sizes using visualizer plugins and implement dynamic import() code-splitting.',
      'Audit build output artifacts: dist directory, HTML entrypoints, CSS bundles, and asset folders.'
    ],
    sections: [
      {
        heading: 'Development vs. Production: Two Different Worlds',
        content: `Running an application locally via \`npm run dev\` is fundamentally different from serving it to real users on the public internet:

\`\`\`
  DEVELOPMENT ENVIRONMENT (npm run dev):
  * Optimized for Developer Velocity: Instant Hot Module Replacement (HMR).
  * Unminified Code: Easy to read and inspect.
  * Full Source Maps: Preserves original line numbers and comments.
  * In-Memory Serving: Vite serves raw ESM modules on demand without bundling.
  * Heavy Memory & CPU Footprint: Not designed for concurrent web traffic.

  PRODUCTION ENVIRONMENT (npm run build + static web server):
  * Optimized for End-User Performance: Minified JavaScript and CSS.
  * Tree-Shaking: Dead, unused library code is permanently stripped out.
  * Asset Optimization: SVGs, images, and fonts are compressed.
  * Content Hashed Filenames: Enables aggressive browser HTTP caching (Cache-Control: max-age=31536000, immutable).
  * Security Hardened: Debugger statements, development banners, and test IDs removed.
\`\`\``
      },
      {
        heading: 'The Vite Build Process: What Happens During "npm run build"',
        content: `When you trigger \`npm run build\`, Vite invokes **Rollup** and **esbuild** to execute a multi-stage transformation:

\`\`\`
   src/ (Raw JSX, ES Modules, CSS)
               │
               ▼
   [1. Parsing & Dependency Graph]
   Traces import statements from index.html -> main.jsx -> App.jsx -> Components.
               │
               ▼
   [2. Tree-Shaking & Dead-Code Elimination]
   If you import { useState } from 'react', unused exports in other packages are dropped.
               │
               ▼
   [3. Minification (esbuild)]
   Renames variables (longVariableName -> a), strips whitespace, comments, and console logs.
               │
               ▼
   [4. Content Hashing & Chunk Splitting]
   Generates dist/assets/index-[hash].js and vendor-[hash].js.
               │
               ▼
   dist/ (Static Production Artifacts)
   ├── index.html                (Single-page HTML shell)
   └── assets/
       ├── index-BN14qMg4.js     (Compiled & minified application bundle)
       └── index-C299_quw.css    (Concatenated & purged styles)
\`\`\`

### Why Content Hashing Matters:
If your output file was named \`bundle.js\`, browsers would cache it for months. When you deploy a bugfix, returning users would still execute the old, broken \`bundle.js\` from their browser cache!
With content hashing (\`index-BN14qMg4.js\`), changing a single line of code produces a completely different cryptographic hash. When users load \`index.html\`, the browser sees a new filename and downloads the fresh code immediately.`
      },
      {
        heading: 'The SPA Routing 404 Problem & The Rewrite Rule Solution',
        content: `The most common production bug encountered by beginners deploying React apps on static hosting (Netlify, Vercel, S3, Nginx) is the **SPA 404 Error**:

\`\`\`
  Scenario:
  1. User visits https://my-app.com/                --> Works! (Loads index.html)
  2. User clicks a link to /projects/todo-app       --> Works! (React Router changes URL in browser memory)
  3. User presses Browser Refresh (F5) at /projects/todo-app:
     ---> BROWSER SENDS REQUEST TO HOSTING SERVER: "GET /projects/todo-app"
     ---> HOSTING SERVER LOOKS ON DISK FOR A FILE NAMED "dist/projects/todo-app/index.html"
     ---> FILE DOES NOT EXIST ON DISK!
     ---> SERVER RETURNS: "404 NOT FOUND"!
\`\`\`

### The Solution: The Single-Page Application (SPA) Rewrite Rule
You must configure the web server so that **all requests for non-file routes are internally redirected to \`/index.html\`**:

* **For Netlify:** Create a file named \`public/_redirects\`:
  \`\`\`
  /*    /index.html   200
  \`\`\`
* **For Vercel:** Create a \`vercel.json\` configuration:
  \`\`\`json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  \`\`\`
* **For Nginx:**
  \`\`\`nginx
  location / {
    try_files $uri $uri/ /index.html;
  }
  \`\`\``
      }
    ],
    crpIndiaConnection: 'In CRP India, Vite compiles the citizen frontend into immutable hashed assets deployed to a content delivery network (CDN), with SPA fallback rules guaranteeing that direct links to grievance ticket URLs like /grievances/CRP-1082 load correctly on page refresh.',
    codeExample: `// vite.config.js with bundle visualization and chunk splitting
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false, // Omit source maps in production to reduce bundle size & protect source
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split large dependencies into separate cacheable vendor chunks
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-icons': ['lucide-react']
        }
      }
    }
  }
});`,
    commonMistakes: [
      {
        mistake: 'Deploying the raw repository with node_modules instead of running npm run build and deploying the dist/ directory.',
        fix: 'Static hosts only need the built dist/ folder. Never upload node_modules to production.'
      },
      {
        mistake: 'Navigating to a client-side route on production and receiving a 404 Not Found error.',
        fix: 'Add an SPA rewrite rule (_redirects for Netlify, vercel.json for Vercel, or try_files in Nginx) directing all routes to /index.html.'
      },
      {
        mistake: 'Leaving development console logs and debugging statements in production builds.',
        fix: 'Configure your build tool to drop console logs or use production logging guards (if (process.env.NODE_ENV !== "production")).'
      }
    ],
    exercise: {
      instruction: 'Write a vercel.json configuration file that sets up SPA rewrites to /index.html and configures caching headers for assets in the /assets/ directory.',
      prompt: 'Write a vercel.json configuration file that sets up SPA rewrites to /index.html and configures caching headers for assets in the /assets/ directory.',
      starterCode: `// Write vercel.json object:`,
      solution: `{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}`,
      solutionCode: `{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}`,
      hint: 'Include a rewrites array mapping "/(.*)" to "/index.html" and a headers array setting max-age=31536000 for "/assets/(.*)".'
    },
    quiz: [
      {
        question: 'Why do production build filenames include cryptographic hashes like index-BN14qMg4.js?',
        options: [
          'To prevent hackers from reading the file contents.',
          'To enable aggressive long-term browser caching while guaranteeing that code changes invalidate the cache immediately.',
          'Because JavaScript requires hashed names to execute.',
          'To make filenames shorter.'
        ],
        correctIndex: 1,
        answer: 1,
        explanation: 'Content hashes change whenever code is modified. This lets browsers cache assets for years, downloading a new file only when a deploy produces a new hash.'
      },
      {
        question: 'What happens if you do not configure an SPA rewrite rule on a static hosting provider?',
        options: [
          'The application fails to compile.',
          'Direct visits or page reloads on deep URLs (like /courses/html) result in an HTTP 404 Not Found error.',
          'The database refuses connections.',
          'React stops working on mobile devices.'
        ],
        correctIndex: 1,
        answer: 1,
        explanation: 'Without rewrite rules, the static server looks for a physical directory and index.html file corresponding to that URL path on disk, which does not exist in a single-page app.'
      }
    ],
    takeaways: [
      'Development is optimized for developer speed and debugging; production is optimized for performance, security, and caching.',
      'Vite and Rollup perform tree-shaking, minification, and code-splitting during npm run build.',
      'Content hashing in asset filenames solves the browser cache invalidation problem.',
      'Always configure SPA rewrite rules (_redirects or vercel.json) to prevent 404 errors on page refreshes.'
    ],
    keyTakeaways: [
      'Development is optimized for developer speed and debugging; production is optimized for performance, security, and caching.',
      'Vite and Rollup perform tree-shaking, minification, and code-splitting during npm run build.',
      'Content hashing in asset filenames solves the browser cache invalidation problem.',
      'Always configure SPA rewrite rules (_redirects or vercel.json) to prevent 404 errors on page refreshes.'
    ]
  },

  'environment-secrets-and-cloud-config': {
    id: 'lesson-15-2',
    slug: 'environment-secrets-and-cloud-config',
    courseId: 'course-15',
    courseSlug: 'production-deployment-and-devops',
    courseTitle: 'Course 15: Production Deployment, Cloud & DevOps',
    title: 'Environment Secrets, Configuration & Avoiding Leaks',
    category: 'DevOps',
    estimatedTime: '45 min read & practice',
    objectives: [
      'Distinguish public configuration (VITE_API_URL) from secret configuration (JWT_SECRET, MONGO_URI, STRIPE_SECRET_KEY).',
      'Understand how Vite inlines VITE_ environment variables into public client JavaScript bundles.',
      'Protect secrets using .env.example templates and strict .gitignore policies.',
      'Configure cloud environment variables on hosting platforms (Render, Vercel, Railway, Fly.io).',
      'Scan Git repositories for leaked secrets using git-secrets and automated CI pre-commit hooks.',
      'Handle secret rotation procedures when an API key or database password is compromised.'
    ],
    sections: [
      {
        heading: 'The Cardinal Rule: Frontend Bundles Have No Secrets',
        content: `The most catastrophic security misconception in web development is believing that environment variables prefixed with \`VITE_\` or stored in a frontend \`.env\` file are "secret".

\`\`\`
  THE TRUTH ABOUT CLIENT-SIDE ENVIRONMENT VARIABLES:
  * Any variable prefixed with VITE_ (e.g. VITE_API_KEY) is compiled directly
    into the plaintext JavaScript bundle downloaded by the user's browser.
  * Anyone in the world can open DevTools -> Sources -> search for the key
    and read it in 3 seconds!

  FRONTEND SAFE VARIABLES (Public Only):
  ✓ VITE_API_BASE_URL=https://api.crpindia.gov.in
  ✓ VITE_ANALYTICS_ID=UA-102948-1
  ✓ VITE_STRIPE_PUBLISHABLE_KEY=pk_live_51...

  BACKEND ONLY SECRETS (NEVER put in frontend!):
  ✗ MONGO_URI=mongodb+srv://admin:MyPass123@cluster...
  ✗ JWT_SECRET=super_secret_encryption_key_99
  ✗ STRIPE_SECRET_KEY=sk_live_51...
  ✗ AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCY...
\`\`\``
      },
      {
        heading: 'The .env Workflow: .gitignore vs .env.example',
        content: `To manage environment configurations cleanly without leaking credentials to GitHub:

1. **\` .gitignore\` (Mandatory):**
   Add all \`.env\` files to your \`.gitignore\` immediately upon project initialization:
   \`\`\`
   .env
   .env.local
   .env.*.local
   \`\`\`

2. **\` .env.example\` (Committed to Git):**
   Commit a template showing all required variable keys with **dummy placeholder values** so other developers and CI/CD pipelines know what variables to configure:
   \`\`\`
   # .env.example
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/crp_database
   JWT_SECRET=your_jwt_secret_key_here_minimum_32_chars
   JWT_EXPIRES_IN=7d
   ALLOWED_ORIGINS=http://localhost:5173
   \`\`\`

3. **Cloud Environment Variable Ingestion:**
   In production (Render, Vercel, AWS), do not upload \`.env\` files. Instead, type the keys and secret values into the host's secure **Environment Settings dashboard** or encrypt them via a secrets manager (HashiCorp Vault, AWS Secrets Manager).`
      },
      {
        heading: 'What to Do If You Accidentally Commit a Secret',
        content: `If you accidentally commit a database password, AWS key, or JWT secret to GitHub:

\`\`\`
  DO NOT JUST DELETE THE FILE IN A NEW COMMIT!
  Git is a permanent cryptographic log. The secret remains visible
  in your commit history forever to automated scraping bots that
  monitor GitHub commits 24/7!
\`\`\`

### Emergency Remediation Steps:
1. **Rotate the Secret Immediately:** Change the database password, revoke the AWS key, or generate a new JWT secret on the service provider dashboard. Assume the leaked key is already compromised.
2. **Purge Git History:** Use \`git filter-repo\` or the BFG Repo-Cleaner to permanently scrub the string from all historic Git trees.
3. **Audit Audit Logs:** Check your cloud provider access logs to verify that the compromised credential was not used to spin up unauthorized cryptomining instances or exfiltrate customer databases.`
      }
    ],
    crpIndiaConnection: 'In CRP India, municipal database credentials, SMS gateway tokens, and JWT cryptographic salts are injected into backend microservices via encrypted environment variables, ensuring zero plain credentials exist in Git repositories.',
    codeExample: `// Validating environment variables on backend server startup
import dotenv from 'dotenv';
dotenv.config();

const requiredEnvVars = ['PORT', 'MONGO_URI', 'JWT_SECRET'];

export function validateEnvironment() {
  const missing = requiredEnvVars.filter(key => !process.env[key]);
  if (missing.length > 0) {
    console.error('FATAL ERROR: Missing required environment variables:', missing);
    process.exit(1); // Halt server startup immediately!
  }
}

// Call at the very top of server.js:
validateEnvironment();`,
    commonMistakes: [
      {
        mistake: 'Putting backend database passwords inside a React component or frontend .env file.',
        fix: 'Never place database connection strings on the client. The frontend should only communicate with backend REST APIs via HTTP.'
      },
      {
        mistake: 'Forgetting to add .env to .gitignore before the first git commit.',
        fix: 'Initialize .gitignore with .env before staging any files.'
      },
      {
        mistake: 'Hardcoding localhost:5000 in frontend fetch URLs.',
        fix: 'Use import.meta.env.VITE_API_URL so the frontend automatically points to localhost during development and your cloud API domain in production.'
      }
    ],
    exercise: {
      instruction: 'Write a helper function getApiBaseUrl() for a Vite React application that returns import.meta.env.VITE_API_URL if configured, or falls back to "http://localhost:5000" in development.',
      prompt: 'Write a helper function getApiBaseUrl() for a Vite React application that returns import.meta.env.VITE_API_URL if configured, or falls back to "http://localhost:5000" in development.',
      starterCode: `export function getApiBaseUrl() {
  // Read import.meta.env.VITE_API_URL or fallback
}`,
      solution: `export function getApiBaseUrl() {
  return import.meta.env.VITE_API_URL || 'http://localhost:5000';
}`,
      solutionCode: `export function getApiBaseUrl() {
  return import.meta.env.VITE_API_URL || 'http://localhost:5000';
}`,
      hint: 'In Vite, client-side environment variables are accessed via import.meta.env.'
    },
    quiz: [
      {
        question: 'Can you safely store your Stripe Secret Key (sk_live_...) inside a React frontend application by setting VITE_STRIPE_SECRET_KEY in your .env file?',
        options: [
          'Yes, because Vite encrypts all variables during build.',
          'No! All VITE_ environment variables are bundled in plaintext in the downloadable client JavaScript, exposing your secret key to anyone inspecting the page.',
          'Yes, as long as you use HTTPS.',
          'Yes, if you put it in .gitignore.'
        ],
        correctIndex: 1,
        answer: 1,
        explanation: 'Client-side bundles are completely public. Any variable accessed in frontend code can be inspected by users via DevTools.'
      },
      {
        question: 'If you accidentally push a commit containing an API secret to a public GitHub repository, what is your first immediate action?',
        options: [
          'Delete the file in a new commit.',
          'Revoke and rotate the secret immediately on the service provider dashboard.',
          'Turn off your computer.',
          'Rename the repository.'
        ],
        correctIndex: 1,
        answer: 1,
        explanation: 'Automated bots scan GitHub public feeds within seconds. Rotating the secret invalidates the compromised credential immediately.'
      }
    ],
    takeaways: [
      'Frontend code is public; never put private keys, database connection strings, or backend secrets in client bundles.',
      'Always add .env to .gitignore and provide an illustrative .env.example with dummy values.',
      'Configure production secrets in your cloud provider environment dashboard.',
      'Validate required environment variables at server startup and exit immediately if any are missing.'
    ],
    keyTakeaways: [
      'Frontend code is public; never put private keys, database connection strings, or backend secrets in client bundles.',
      'Always add .env to .gitignore and provide an illustrative .env.example with dummy values.',
      'Configure production secrets in your cloud provider environment dashboard.',
      'Validate required environment variables at server startup and exit immediately if any are missing.'
    ]
  },

  'hosting-static-apis-and-databases': {
    id: 'lesson-15-3',
    slug: 'hosting-static-apis-and-databases',
    courseId: 'course-15',
    courseSlug: 'production-deployment-and-devops',
    courseTitle: 'Course 15: Production Deployment, Cloud & DevOps',
    title: 'Hosting Architectures: Static Frontends, APIs & Cloud Databases',
    category: 'DevOps',
    estimatedTime: '45 min read & practice',
    objectives: [
      'Architect full-stack web hosting: decoupling static frontend assets from dynamic backend APIs.',
      'Deploy static Single Page Applications to modern global CDNs (Vercel, Netlify, Cloudflare Pages).',
      'Deploy Node.js/Express backend APIs to cloud application platforms (Render, Railway, Fly.io, or VPS).',
      'Provision and secure managed cloud databases with MongoDB Atlas (IP whitelisting, database users).',
      'Configure production Cross-Origin Resource Sharing (CORS) between frontend domains and API domains.',
      'Understand Domain Name Systems (DNS): A records, CNAME records, and automated SSL/TLS (HTTPS) certificates.'
    ],
    sections: [
      {
        heading: 'Modern Full-Stack Hosting Architecture: Decoupled Services',
        content: `In the early era of web development, a single monolithic server hosted the HTML templates, the business logic, and the database on one physical machine. Modern full-stack architecture **decouples** these concerns across specialized cloud infrastructure:

\`\`\`
   ┌────────────────────────────────────────────────────────────────┐
   │ 1. STATIC FRONTEND (Vercel / Netlify / Cloudflare Pages)       │
   │    - Hosts compiled HTML, CSS, JS, and image assets.           │
   │    - Distributed across 300+ Edge CDN locations worldwide.     │
   │    - Domain: https://crpindia.gov.in                           │
   └────────────────────────────────┬───────────────────────────────┘
                                    │ (HTTPS REST API Requests with JWT)
                                    ▼
   ┌────────────────────────────────────────────────────────────────┐
   │ 2. BACKEND API (Render / Railway / Fly.io / AWS ECS)           │
   │    - Runs Node.js / Express process continuously.              │
   │    - Enforces business logic, authentication, input validation.│
   │    - Domain: https://api.crpindia.gov.in                       │
   └────────────────────────────────┬───────────────────────────────┘
                                    │ (Encrypted Database Wire Protocol)
                                    ▼
   ┌────────────────────────────────────────────────────────────────┐
   │ 3. MANAGED DATABASE (MongoDB Atlas / Supabase / AWS RDS)       │
   │    - Automated backups, replication sets, high availability.   │
   │    - Firewalled to accept connections only from API server IP. │
   └────────────────────────────────────────────────────────────────┘
\`\`\``
      },
      {
        heading: 'Securing MongoDB Atlas for Production',
        content: `When deploying MongoDB Atlas for production:

1. **Database Users:** Create a dedicated application user with the principle of least privilege (e.g. readWrite permissions on only \`crp_production\` database). Never use the administrative account!
2. **Network Access (IP Whitelist):**
   * During local development: whitelist your personal IP address.
   * In cloud production: if your backend has a static IP address, whitelist only that IP. On serverless platforms with dynamic IPs (like Render or Vercel), use MongoDB Atlas VPC peering or allow \`0.0.0.0/0\` with strong, randomly generated 32-character passwords.
3. **Connection String Hygiene:** Use the standard \`mongodb+srv://\` URI format:
   \`\`\`
   MONGO_URI=mongodb+srv://crp_app_user:SecureRandomPassword99@cluster0.abcde.mongodb.net/crp_prod?retryWrites=true&w=majority
   \`\`\``
      },
      {
        heading: 'DNS and HTTPS: Connecting Custom Domains',
        content: `When connecting a custom domain (e.g. \`mywebsite.com\`) to your deployed application:

* **A Record (Address Record):** Points a naked root domain (\`mywebsite.com\`) directly to an IPv4 address of your hosting server.
* **CNAME Record (Canonical Name):** Points a subdomain (\`www.mywebsite.com\` or \`api.mywebsite.com\`) to another hostname (e.g. \`cname.vercel-dns.com\` or \`crp-api.onrender.com\`).
* **SSL / TLS Certificates:** Modern cloud hosts automatically provision free SSL certificates via Let's Encrypt, encrypting all traffic over **HTTPS** (port 443) and securing citizen passwords and auth tokens in transit against Man-In-The-Middle (MITM) snooping.`
      }
    ],
    crpIndiaConnection: 'In CRP India, the React frontend is served via global edge caching on Vercel, the Express backend runs containerized on Render, and civic complaint documents are stored in an encrypted MongoDB Atlas multi-region cluster.',
    codeExample: `// Production CORS configuration permitting only verified custom frontend domains
import express from 'express';
import cors from 'cors';

const app = express();

const whitelist = [
  'https://crpindia.gov.in',
  'https://www.crpindia.gov.in',
  ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:5173'] : [])
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by Production CORS Policy'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}));`,
    commonMistakes: [
      {
        mistake: 'Setting Access-Control-Allow-Origin: * alongside credentials: true.',
        fix: 'Browsers reject wildcard (*) origins when credentials (cookies or authorization headers) are transmitted. You must specify exact whitelisted origin URLs.'
      },
      {
        mistake: 'Leaving the free-tier backend to sleep on Render/Glitch and wondering why the first request takes 60 seconds.',
        fix: 'Free-tier host instances sleep after inactivity. Understand "cold starts" or upgrade to a basic persistent instance for production apps.'
      },
      {
        mistake: 'Exposing MongoDB default port 27017 directly to the public internet without authentication.',
        fix: 'Always use authenticated cloud clusters like MongoDB Atlas with strong passwords and IP access restrictions.'
      }
    ],
    exercise: {
      instruction: 'Write an Express health check endpoint GET /health that verifies the server is running and checks if mongoose.connection.readyState is 1 (connected). Return 200 if connected or 503 if database is disconnected.',
      prompt: 'Write an Express health check endpoint GET /health that verifies the server is running and checks if mongoose.connection.readyState is 1 (connected). Return 200 if connected or 503 if database is disconnected.',
      starterCode: `import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.get('/health', (req, res) => {
  // Check mongoose.connection.readyState
  // 1 = connected
  // Return 200 or 503
});`,
      solution: `app.get('/health', (req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;

  if (isDbConnected) {
    return res.status(200).json({
      status: 'UP',
      database: 'connected',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
  }

  return res.status(503).json({
    status: 'DEGRADED',
    database: 'disconnected',
    error: 'Database connection is not ready'
  });
});`,
      solutionCode: `app.get('/health', (req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;

  if (isDbConnected) {
    return res.status(200).json({
      status: 'UP',
      database: 'connected',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
  }

  return res.status(503).json({
    status: 'DEGRADED',
    database: 'disconnected',
    error: 'Database connection is not ready'
  });
});`,
      hint: 'Inspect mongoose.connection.readyState. 1 means connected, 0 disconnected, 2 connecting.'
    },
    quiz: [
      {
        question: 'What is a primary advantage of hosting your frontend on an Edge CDN (like Vercel/Netlify) and your backend on an application platform (like Render)?',
        options: [
          'It is illegal to host frontend and backend together.',
          'Static assets are served with ultra-low latency from servers geographically close to users worldwide, while backend compute and database logic scale independently.',
          'Edge CDNs don’t support HTML.',
          'It eliminates the need for passwords.'
        ],
        correctIndex: 1,
        answer: 1,
        explanation: 'CDNs cache and deliver static JS/CSS/HTML bundles near the user instantaneously, while dynamic backend compute handles business logic and database writes.'
      },
      {
        question: 'Which DNS record type points a subdomain like "api.mysite.com" to a hosting server hostname like "app.onrender.com"?',
        options: ['A record', 'CNAME record', 'MX record', 'TXT record'],
        correctIndex: 1,
        answer: 1,
        explanation: 'A CNAME (Canonical Name) record aliases one domain name to another domain name, which is standard for cloud platforms.'
      }
    ],
    takeaways: [
      'Decoupled architectures leverage global CDNs for static frontends and managed cloud servers for backend APIs.',
      'Always secure MongoDB Atlas with dedicated application users and strict network access rules.',
      'Configure production CORS with explicit whitelisted domains, avoiding wildcard origins when using credentials.',
      'Implement health check endpoints (/health) so cloud platforms and uptime monitors can verify service status.'
    ],
    keyTakeaways: [
      'Decoupled architectures leverage global CDNs for static frontends and managed cloud servers for backend APIs.',
      'Always secure MongoDB Atlas with dedicated application users and strict network access rules.',
      'Configure production CORS with explicit whitelisted domains, avoiding wildcard origins when using credentials.',
      'Implement health check endpoints (/health) so cloud platforms and uptime monitors can verify service status.'
    ]
  },

  'production-monitoring-and-reliability': {
    id: 'lesson-15-4',
    slug: 'production-monitoring-and-reliability',
    courseId: 'course-15',
    courseSlug: 'production-deployment-and-devops',
    courseTitle: 'Course 15: Production Deployment, Cloud & DevOps',
    title: 'Production Reliability: Monitoring, Logging, Backups & Rollbacks',
    category: 'DevOps',
    estimatedTime: '45 min read & practice',
    objectives: [
      'Understand the principles of Site Reliability Engineering (SRE): availability, error budgets, and MTTR (Mean Time to Resolution).',
      'Set up synthetic health check monitoring (UptimeRobot, BetterStack) to receive instant incident alerts.',
      'Capture client-side runtime errors and unhandled promise rejections using crash reporting tools (Sentry).',
      'Implement structured server logging and centralized log aggregation.',
      'Design reliable database backup and recovery strategies (point-in-time restore).',
      'Execute zero-downtime deployments and safe rollback procedures when defects escape into production.'
    ],
    sections: [
      {
        heading: 'Software in Production: When Code Meets Reality',
        content: `Writing code that runs on your local machine is only half the engineering discipline. Operating software in production means preparing for real-world chaos:
* Database servers occasionally run out of memory or experience network partitions.
* Third-party payment APIs experience 504 gateway timeouts.
* Users upload malformed image files or submit unexpectedly long strings.
* Cloud data centers experience power or connectivity disruptions.

**Site Reliability Engineering (SRE)** focuses on **Resilience**: designing systems that detect failures immediately, degrade gracefully, alert engineers before customers complain, and can be restored in minutes.`
      },
      {
        heading: 'Health Checks and Synthetic Uptime Monitoring',
        content: `Your server should expose a lightweight, unauthenticated \`/health\` or \`/api/v1/health\` endpoint. An external monitoring service (e.g. UptimeRobot, BetterStack, or AWS Route53 Health Checks) pings this endpoint every 60 seconds:

\`\`\`
  [Uptime Monitor Service] ───(HTTP GET every 60s)───> [https://api.crpindia.gov.in/health]
                                                                        │
                                                                        ▼
                                                         ┌──────────────┴──────────────┐
                                                         ▼                             ▼
                                                    200 OK (Healthy)             500 / Timeout (DOWN)
                                                         │                             │
                                                         ▼                             ▼
                                                    Record Uptime %              TRIGGER ALERT!
                                                                                - SMS / PagerDuty
                                                                                - Slack / Discord Webhook
\`\`\`

If three consecutive pings fail, the monitor triggers automated alerts to the engineering on-call rotation so the problem can be mitigated before thousands of users are impacted.`
      },
      {
        heading: 'Safe Rollbacks: When a Deployment Goes Wrong',
        content: `Even with thorough testing, critical bugs occasionally escape into production. In that crisis moment, **do not try to write, review, test, and deploy a hurried "hotfix" commit under panic**:

\`\`\`
  BEST PRACTICE INCIDENT RESPONSE:
  1. ROLL BACK FIRST: Immediately roll back the production release to the
     previously known good deployment artifact (takes 30 seconds on Vercel/Render).
  2. RESTORE SERVICE: The incident is now mitigated; users can use the application again.
  3. INVESTIGATE IN COLD BLOOD: Recreate the issue locally, understand the root cause,
     write regression tests, and deploy a calm, verified fix.
\`\`\`

### Zero-Downtime Deployments:
Platforms like Vercel and Render use **Atomic Deployments**:
* The new version is built and health checks pass on a new internal container *before* production traffic is redirected.
* If the build fails or the health check returns 500, the router never directs traffic to the new container. Existing users experience zero downtime.`
      }
    ],
    crpIndiaConnection: 'In CRP India, automated uptime monitors ping municipal complaint submission endpoints every minute, alerting nodal administrators via SMS if database latency exceeds acceptable SLA thresholds.',
    codeExample: `// Graceful Shutdown Handler for Node.js / Express
import http from 'http';
import app from './app.js';
import mongoose from 'mongoose';

const server = http.createServer(app);

function gracefulShutdown(signal) {
  console.log(\`Received \${signal}. Initiating graceful shutdown...\`);

  // Stop accepting new connections
  server.close(async () => {
    console.log('HTTP server closed.');

    // Close database connection
    try {
      await mongoose.connection.close(false);
      console.log('MongoDB connection closed.');
      process.exit(0);
    } catch (err) {
      console.error('Error closing MongoDB connection:', err);
      process.exit(1);
    }
  });

  // Force close after 10 seconds if hanging
  setTimeout(() => {
    console.error('Forcing shutdown after 10s timeout.');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));`,
    commonMistakes: [
      {
        mistake: 'Deploying a hasty hotfix commit during a live production outage without testing.',
        fix: 'Roll back immediately to the previous working deployment version first; investigate and fix calmly in staging.'
      },
      {
        mistake: 'Relying on user complaints on social media to discover that your website is down.',
        fix: 'Configure free automated uptime monitoring (UptimeRobot, BetterStack) with email or webhook notifications.'
      },
      {
        mistake: 'Terminating Node.js processes abruptly (SIGKILL) during deployment, dropping active user transactions.',
        fix: 'Implement graceful shutdown handlers (SIGTERM) allowing in-flight requests to complete before closing database connections.'
      }
    ],
    exercise: {
      instruction: 'Write an incident response runbook checklist for an engineering team responding to an automated 500 Server Error alert on production.',
      prompt: 'Write an incident response runbook checklist for an engineering team responding to an automated 500 Server Error alert on production.',
      starterCode: `// Write runbook steps:
// 1. Triage & Verify
// 2. Immediate Mitigation
// 3. Root Cause Investigation
// 4. Post-Mortem Documentation`,
      solution: `export const incidentRunbook = [
  '1. TRIAGE: Acknowledge the alert, verify incident scope on health monitor and server logs.',
  '2. MITIGATE: If a new deployment occurred within the last 30 minutes, immediately trigger a one-click ROLLBACK.',
  '3. COMMUNICATE: Update status page or notify stakeholders that the incident is being mitigated.',
  '4. INVESTIGATE: Isolate root cause in staging environment using error logs and stack traces.',
  '5. FIX & VERIFY: Author fix, write automated regression test, execute CI/CD verification.',
  '6. POST-MORTEM: Document incident timeline, root cause analysis (RCA), and preventative action items.'
];`,
      solutionCode: `export const incidentRunbook = [
  '1. TRIAGE: Acknowledge the alert, verify incident scope on health monitor and server logs.',
  '2. MITIGATE: If a new deployment occurred within the last 30 minutes, immediately trigger a one-click ROLLBACK.',
  '3. COMMUNICATE: Update status page or notify stakeholders that the incident is being mitigated.',
  '4. INVESTIGATE: Isolate root cause in staging environment using error logs and stack traces.',
  '5. FIX & VERIFY: Author fix, write automated regression test, execute CI/CD verification.',
  '6. POST-MORTEM: Document incident timeline, root cause analysis (RCA), and preventative action items.'
];`,
      hint: 'Include triage, mitigation via rollback, communication, investigation, fix with regression tests, and post-mortem.'
    },
    quiz: [
      {
        question: 'Why should you immediately roll back to the previous deployment version during a major outage rather than rushing to push a live hotfix?',
        options: [
          'Because Git does not allow hotfixes.',
          'Rolling back restores verified working service in seconds, removing immediate panic and allowing the team to investigate the root cause calmly with proper testing.',
          'Because servers cannot compile code during the daytime.',
          'Because rollbacks delete all code permanently.'
        ],
        correctIndex: 1,
        answer: 1,
        explanation: 'Pushed hotfixes under pressure often introduce secondary bugs. Rolling back restores system stability instantaneously.'
      },
      {
        question: 'What is the purpose of a Graceful Shutdown handler (SIGTERM) in Node.js?',
        options: [
          'To restart the computer.',
          'To stop accepting new incoming requests while allowing in-flight requests to finish processing and cleanly closing database connections before process termination.',
          'To speed up CPU clock speeds.',
          'To delete old log files.'
        ],
        correctIndex: 1,
        answer: 1,
        explanation: 'Graceful shutdown prevents in-progress database writes or user checkout requests from being abruptly severed when containers update.'
      }
    ],
    takeaways: [
      'Site Reliability Engineering prepares systems for unexpected failures through automated detection and resilience.',
      'Configure external synthetic uptime monitors on /health endpoints for immediate alerting.',
      'In a production crisis, roll back first to restore service, then investigate the root cause calmly.',
      'Implement graceful shutdown handlers to allow active transactions to complete cleanly before process exit.'
    ],
    keyTakeaways: [
      'Site Reliability Engineering prepares systems for unexpected failures through automated detection and resilience.',
      'Configure external synthetic uptime monitors on /health endpoints for immediate alerting.',
      'In a production crisis, roll back first to restore service, then investigate the root cause calmly.',
      'Implement graceful shutdown handlers to allow active transactions to complete cleanly before process exit.'
    ]
  }
};
