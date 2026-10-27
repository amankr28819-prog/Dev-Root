import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { Sparkles, Download, Copy, BookOpen, Layers, CheckCircle2, ChevronRight, ChevronLeft, ShieldCheck } from 'lucide-react';

const INITIAL_PROJECT_STATE = {
  name: '',
  problem: '',
  audience: '',
  features: '',
  frontendTech: 'React + Vite',
  backendTech: 'Node.js + Express',
  databaseTech: 'MongoDB Atlas',
  authTech: 'JWT + bcrypt',
  hostingFrontend: 'Vercel / Netlify',
  hostingBackend: 'Render / Railway',
  dataModelNotes: '',
  apiEndpoints: '',
  testingPlan: 'Vitest (Unit) + React Testing Library (Components) + Supertest (API)',
  deploymentPlan: '',
  milestones: ''
};

export default function PortfolioBuilder() {
  const { getPortfolioProject, updatePortfolioProject } = useProgress();
  const [formData, setFormData] = useState(INITIAL_PROJECT_STATE);
  const [activeStep, setActiveStep] = useState(1);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState(false);

  // Load from context on mount
  useEffect(() => {
    const saved = getPortfolioProject();
    if (saved) {
      setFormData(prev => ({ ...prev, ...saved }));
    }
  }, [getPortfolioProject]);

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    updatePortfolioProject(updated);
  };

  const handleManualSave = () => {
    updatePortfolioProject(formData);
    setSaveFeedback(true);
    setTimeout(() => setSaveFeedback(false), 2000);
  };

  // Generate production-grade README Markdown
  const generateMarkdownReadme = () => {
    return `# ${formData.name || 'Untitled Portfolio Project'}

> ${formData.problem ? formData.problem.split('\n')[0] : 'A full-stack web application designed and architected with modern web technologies.'}

[🚀 Explore Live Demo](#) • [📖 Documentation](#) • [🏗️ Architecture Specs](#)

---

## 🎯 The Problem & Intended Users
${formData.problem || 'Describe the core user problem and market pain point solved by this application.'}

**Target Audience:** ${formData.audience || 'Target user personas and beneficiaries.'}

---

## ✨ Key Features
${formData.features ? formData.features.split('\n').filter(Boolean).map(f => `- ${f}`).join('\n') : '- Feature 1\n- Feature 2\n- Feature 3'}

---

## 🛠️ Architecture & Tech Stack

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Frontend** | ${formData.frontendTech} | Component modularity, reactive state, fast build times |
| **Backend** | ${formData.backendTech} | Non-blocking asynchronous I/O, RESTful routing, middleware chains |
| **Database** | ${formData.databaseTech} | Scalable schema modeling, indexing, managed cloud persistence |
| **Authentication** | ${formData.authTech} | Stateless token-based security, bcrypt password hashing |
| **Static Hosting** | ${formData.hostingFrontend} | Edge CDN distribution, instant cache invalidation |
| **API Hosting** | ${formData.hostingBackend} | Continuous deployment, automated container restarts |

---

## 🗄️ Data Model
\`\`\`
${formData.dataModelNotes || '// Define primary entity models and relationship fields'}
\`\`\`

---

## 🔌 API Endpoints
${formData.apiEndpoints ? formData.apiEndpoints.split('\n').filter(Boolean).map(e => `- \`${e}\``).join('\n') : '- `POST /api/v1/auth/register` - User registration\n- `POST /api/v1/auth/login` - User login\n- `GET /api/v1/resources` - Fetch records'}

---

## 🧪 Testing Strategy
${formData.testingPlan}

---

## 🚀 Deployment Plan
${formData.deploymentPlan || 'Frontend deployed to Edge CDN; API deployed as a containerized web service with HTTPS and managed database.'}

---

## 📅 Milestones & Timeline
${formData.milestones ? formData.milestones.split('\n').filter(Boolean).map(m => `- [ ] ${m}`).join('\n') : '- [ ] Milestone 1: Initial Architecture & Wireframes\n- [ ] Milestone 2: Backend REST API & Database Models\n- [ ] Milestone 3: React Frontend & State Management\n- [ ] Milestone 4: Authentication & Testing\n- [ ] Milestone 5: Production Deployment'}

---
*Architected and planned using the Dev-root Portfolio Project Builder.*
`;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdownReadme());
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2000);
  };

  // Connected lesson recommendations based on tech stack choices
  const getRelevantLessons = () => {
    const list = [];
    if (formData.frontendTech.includes('React')) {
      list.push({ title: 'Course 9: React Components & Hooks', link: '/courses/react-from-zero' });
      list.push({ title: 'Course 13: React Component Testing (RTL)', link: '/courses/full-stack-testing-and-qa' });
    }
    if (formData.backendTech.includes('Node') || formData.backendTech.includes('Express')) {
      list.push({ title: 'Course 10: Express Routing & Middleware', link: '/courses/nodejs-and-express' });
      list.push({ title: 'Course 14: Server Logging & Debugging', link: '/courses/professional-debugging-and-troubleshooting' });
    }
    if (formData.databaseTech.includes('MongoDB')) {
      list.push({ title: 'Course 11: Databases & Mongoose Schemas', link: '/courses/mongodb-and-mongoose' });
    }
    if (formData.authTech.includes('JWT') || formData.authTech.includes('bcrypt')) {
      list.push({ title: 'Course 12: Password Hashing & JWT Security', link: '/courses/authentication-and-web-security' });
    }
    list.push({ title: 'Course 15: Production Builds & Secrets Hygiene', link: '/courses/production-deployment-and-devops' });
    list.push({ title: 'Course 16: Portfolio Strategy & README Docs', link: '/courses/career-readiness-and-interview-mastery' });
    return list;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-gray-200 font-medium">Portfolio Project Builder</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles size={16} />
            Capstone Architecture Planner
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleManualSave}
              className="px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 text-xs font-semibold text-gray-800 dark:text-gray-200 transition-colors"
            >
              {saveFeedback ? '✓ Saved' : 'Save Plan'}
            </button>
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <Copy size={14} />
              {copiedMarkdown ? '✓ Copied README.md' : 'Export README.md'}
            </button>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          Portfolio Project Builder
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
          Plan, architect, and document your custom full-stack capstone project. Connects your selected technology stack to relevant Dev-root courses, generates production-grade README specifications, and structures step-by-step milestones.
        </p>
      </div>

      {/* Stepper Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
        {[
          { step: 1, title: '1. Vision & Problem' },
          { step: 2, title: '2. Stack & Architecture' },
          { step: 3, title: '3. Data & APIs' },
          { step: 4, title: '4. Testing & README' }
        ].map((s) => (
          <button
            key={s.step}
            onClick={() => setActiveStep(s.step)}
            className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all ${
              activeStep === s.step
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-indigo-400'
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Main Step Form Area (2 Cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 shadow-sm space-y-6">
          {activeStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-3">
                Step 1: Project Identity & Problem Statement
              </h2>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                  Project Title / Working Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="e.g. EcoRoute - Municipal Waste Route Optimization"
                  className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                  What Real-World Problem Does This Project Solve?
                </label>
                <textarea
                  value={formData.problem}
                  onChange={(e) => handleChange('problem', e.target.value)}
                  placeholder="Describe the specific user pain point, municipal inefficiency, or commercial need. Explain why a software solution is valuable."
                  rows={4}
                  className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                  Target Audience & Intended Users
                </label>
                <input
                  type="text"
                  value={formData.audience}
                  onChange={(e) => handleChange('audience', e.target.value)}
                  placeholder="e.g. City sanitation drivers, municipal supervisors, and urban residents"
                  className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                  Core Features (One per line)
                </label>
                <textarea
                  value={formData.features}
                  onChange={(e) => handleChange('features', e.target.value)}
                  placeholder="Real-time GPS route tracking&#10;Role-based driver dispatch dashboard&#10;Offline grievance reporting with photo uploads&#10;Monthly municipal metrics aggregation"
                  rows={4}
                  className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-3">
                Step 2: Technical Stack & Hosting Architecture
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                    Frontend Framework
                  </label>
                  <select
                    value={formData.frontendTech}
                    onChange={(e) => handleChange('frontendTech', e.target.value)}
                    className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="React + Vite">React 19 + Vite (Recommended)</option>
                    <option value="Next.js App Router">Next.js App Router (Full-Stack)</option>
                    <option value="Vanilla JS + HTML5">Vanilla JavaScript + Semantic HTML5</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                    Backend Runtime & Framework
                  </label>
                  <select
                    value={formData.backendTech}
                    onChange={(e) => handleChange('backendTech', e.target.value)}
                    className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Node.js + Express">Node.js + Express REST API</option>
                    <option value="Next.js API Routes">Next.js Serverless Route Handlers</option>
                    <option value="FastAPI (Python)">FastAPI (Python Service)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                    Database Engine
                  </label>
                  <select
                    value={formData.databaseTech}
                    onChange={(e) => handleChange('databaseTech', e.target.value)}
                    className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="MongoDB Atlas (Mongoose)">MongoDB Atlas (NoSQL + Mongoose)</option>
                    <option value="PostgreSQL (Prisma)">PostgreSQL (Relational + Prisma ORM)</option>
                    <option value="SQLite">SQLite (Embedded / Prototype)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                    Authentication & Security
                  </label>
                  <select
                    value={formData.authTech}
                    onChange={(e) => handleChange('authTech', e.target.value)}
                    className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="JWT + bcrypt (Stateless)">Stateless JWT + bcrypt password hashing</option>
                    <option value="Session Cookies + Redis">HttpOnly Session Cookies + Redis</option>
                    <option value="Supabase Auth / Firebase">Managed Auth (Supabase / Firebase)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                    Static Frontend Hosting
                  </label>
                  <input
                    type="text"
                    value={formData.hostingFrontend}
                    onChange={(e) => handleChange('hostingFrontend', e.target.value)}
                    placeholder="e.g. Vercel / Netlify / Cloudflare Pages"
                    className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                    Backend Cloud Hosting
                  </label>
                  <input
                    type="text"
                    value={formData.hostingBackend}
                    onChange={(e) => handleChange('hostingBackend', e.target.value)}
                    placeholder="e.g. Render / Railway / Fly.io / AWS ECS"
                    className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-3">
                Step 3: Data Models & REST Endpoints
              </h2>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                  Data Models & Schema Notes
                </label>
                <textarea
                  value={formData.dataModelNotes}
                  onChange={(e) => handleChange('dataModelNotes', e.target.value)}
                  placeholder="User: { name, email, passwordHash, role: ['citizen', 'admin'] }&#10;Grievance: { title, description, category, ward, status, photoUrls, timeline: [{ status, updatedBy, timestamp }] }"
                  rows={5}
                  className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                  Key API Endpoints (One per line)
                </label>
                <textarea
                  value={formData.apiEndpoints}
                  onChange={(e) => handleChange('apiEndpoints', e.target.value)}
                  placeholder="POST /api/v1/auth/register&#10;POST /api/v1/auth/login&#10;GET /api/v1/grievances (Authenticated, paginated)&#10;POST /api/v1/grievances (Citizen only)&#10;PATCH /api/v1/grievances/:id/status (Nodal Admin only)"
                  rows={5}
                  className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {activeStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-3">
                Step 4: Quality Assurance & Milestones
              </h2>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                  Testing & Quality Plan
                </label>
                <input
                  type="text"
                  value={formData.testingPlan}
                  onChange={(e) => handleChange('testingPlan', e.target.value)}
                  className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                  Step-by-Step Implementation Milestones
                </label>
                <textarea
                  value={formData.milestones}
                  onChange={(e) => handleChange('milestones', e.target.value)}
                  placeholder="Milestone 1: Project setup, database connection, and health endpoint&#10;Milestone 2: User registration, bcrypt hashing, and JWT login&#10;Milestone 3: Core CRUD endpoints and Supertest integration tests&#10;Milestone 4: React frontend forms, state, and API integration&#10;Milestone 5: Production deployment to Vercel and Render with live URL"
                  rows={5}
                  className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
            <button
              onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
              disabled={activeStep === 1}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
            >
              <ChevronLeft size={16} />
              Previous Step
            </button>
            <span className="text-xs font-semibold text-gray-500">Step {activeStep} of 4</span>
            <button
              onClick={() => setActiveStep(prev => Math.min(4, prev + 1))}
              disabled={activeStep === 4}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              Next Step
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Sidebar: Recommended Courses & Live Spec (1 Col) */}
        <div className="space-y-6">
          {/* Connected Lessons Card */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <BookOpen size={18} className="text-indigo-600 dark:text-indigo-400" />
              Tailored Dev-root Lessons
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              Courses matched to your chosen stack ({formData.frontendTech.split(' ')[0]}, {formData.backendTech.split(' ')[0]}, {formData.databaseTech.split(' ')[0]}):
            </p>
            <div className="space-y-2">
              {getRelevantLessons().map((item, idx) => (
                <Link
                  key={idx}
                  to={item.link}
                  className="block p-2.5 rounded-xl bg-gray-50 dark:bg-gray-900/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-xs font-medium text-gray-800 dark:text-gray-200 hover:text-indigo-600 transition-colors border border-gray-100 dark:border-gray-800"
                >
                  {item.title} →
                </Link>
              ))}
            </div>
          </div>

          {/* Production Checklist Link */}
          <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-3xl p-6 border border-emerald-200 dark:border-emerald-800/60 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm mb-1">
              <ShieldCheck size={18} />
              Production Readiness
            </div>
            <p className="text-xs text-emerald-700 dark:text-emerald-400 mb-3 leading-relaxed">
              Before publishing your custom capstone project, verify it against Dev-root’s 32-point quality assurance checklist.
            </p>
            <Link
              to="/production-checklist"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:underline"
            >
              Open Production Checklist →
            </Link>
          </div>
        </div>
      </div>

      {/* Generated README Live Preview */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-lg text-slate-100 mb-12">
        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500" />
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono font-bold text-slate-400 ml-2">Generated README.md Preview</span>
          </div>
          <button
            onClick={handleCopyMarkdown}
            className="text-xs font-bold px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors flex items-center gap-1.5"
          >
            <Copy size={13} />
            {copiedMarkdown ? '✓ Copied' : 'Copy README'}
          </button>
        </div>
        <pre className="text-xs font-mono text-emerald-400 overflow-x-auto p-4 rounded-2xl bg-slate-950 max-h-96 leading-relaxed">
          <code>{generateMarkdownReadme()}</code>
        </pre>
      </div>
    </div>
  );
}
