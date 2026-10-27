/**
 * Dev-root Case Study Metadata: CRP India
 * Grounded in verified code and documentation from reference-projects/CRP-India/
 */

export const CRP_INDIA_CASE_STUDY = {
  id: 'crp-india',
  title: 'CRP India — Civic Reporting Platform',
  subtitle: 'An Enterprise-Grade, Full-Stack Grievance & Municipal Resolution Case Study',
  status: 'Audited & Verified Reference',
  location: 'reference-projects/CRP-India/',
  summary: 'A complete, real-world civic reporting platform built with Node.js, Express, MongoDB, Mongoose, React, and Vite. Designed to bridge the gap between Indian city residents and municipal engineering departments with GPS-tagged reports, status timelines, role separation, and verified photo proof.',
  stats: {
    totalFiles: 160,
    architecture: 'Decoupled Client-Server (SPA + REST API)',
    frontendStack: 'React 19 + Vite 8 + React Router DOM v7',
    backendStack: 'Node.js + Express 4.21 + Mongoose 8.9',
    database: 'MongoDB (with MongoMemoryServer dev fallback)',
    authModel: 'Dual-Portal JWT + bcrypt + Google OAuth 2.0'
  },
  verifiedFeatures: [
    {
      title: 'Decoupled Client-Server Architecture',
      description: 'The React frontend and Express backend are cleanly separated into frontend/ and backend/ directories. Communication happens exclusively over authenticated REST API calls.',
      evidencePath: 'backend/src/server.js',
      learningModule: 'Web & Internet Fundamentals'
    },
    {
      title: 'Dual-Role Authentication & Access Control',
      description: 'Supports citizens and municipal authority accounts with bcrypt password hashing (10 salt rounds), signed JWT tokens (7-day validity), and role guard middleware (authorize).',
      evidencePath: 'backend/src/middleware/auth.js',
      learningModule: 'Authentication & Web Security'
    },
    {
      title: 'Atomic Sequence Complaint Referencing',
      description: 'Generates collision-free reference codes (CRP-2026-XXXXX) using MongoDB atomic findOneAndUpdate sequence counters rather than unformatted auto-increment integers.',
      evidencePath: 'backend/src/models/Counter.js',
      learningModule: 'MongoDB & Mongoose'
    },
    {
      title: 'Chronological Audit Trail Timelines',
      description: 'Each grievance records an embedded status history array documenting who modified the status, the department responsible, timestamps, and official remarks.',
      evidencePath: 'backend/src/models/Complaint.js',
      learningModule: 'REST API Development'
    },
    {
      title: 'Cloudinary CDN & Local Storage Fallback',
      description: 'A custom Multer storage engine streams complaint photos to Cloudinary CDN in production, but automatically falls back to local uploads/ disk storage in development.',
      evidencePath: 'backend/src/middleware/upload.js',
      learningModule: 'APIs & Asynchronous Communication'
    },
    {
      title: 'Executive Municipal KPI Aggregations',
      description: 'Computes department resolution rates, pending backlogs, and SLA turnaround times using MongoDB multi-stage aggregation pipelines ($match, $group, $facet).',
      evidencePath: 'backend/src/controllers/authorityController.js',
      learningModule: 'Node.js & Express Backend Development'
    },
    {
      title: 'Gemini Generative AI Civic Assistant',
      description: 'Provides a citizen help assistant using @google/genai SDK with conversation turn sanitization and Server-Sent Events (SSE) streaming.',
      evidencePath: 'backend/src/controllers/aiController.js',
      learningModule: 'Advanced Full-Stack Engineering'
    }
  ],
  documentationFiles: [
    { name: 'PROJECT_OVERVIEW.md', path: 'reference-projects/CRP-India/PROJECT_OVERVIEW.md', desc: 'Architecture, stack, and complete API directory' },
    { name: 'CODEBASE_MAP.md', path: 'reference-projects/CRP-India/CODEBASE_MAP.md', desc: 'File-by-file directory map and learning linkages' },
    { name: 'LEARNING_CASE_STUDIES.md', path: 'reference-projects/CRP-India/LEARNING_CASE_STUDIES.md', desc: '21 web development concepts mapped to exact code sections' },
    { name: 'CRP_INDIA_WEB_DEVELOPMENT_LEARNING_GUIDE.md', path: 'reference-projects/CRP-India/CRP_INDIA_WEB_DEVELOPMENT_LEARNING_GUIDE.md', desc: 'Comprehensive 3,169-line learning guide' }
  ]
};
