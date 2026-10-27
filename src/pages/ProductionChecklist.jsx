import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { ShieldCheck, CheckCircle2, AlertTriangle, Download, RefreshCw, Sparkles, ExternalLink } from 'lucide-react';

export const CHECKLIST_CATEGORIES = [
  {
    id: 'functionality',
    title: '1. Core Functionality & Workflows',
    description: 'Ensure primary user journeys, forms, and data persistence behave as expected.',
    items: [
      { id: 'func_1', label: 'Primary user flows (sign up, login, core CRUD transactions, logout) work end-to-end without crashing.' },
      { id: 'func_2', label: 'Forms validate all user inputs on both client and server; invalid submissions display clear error messages.' },
      { id: 'func_3', label: 'Empty states are displayed with helpful instructions when lists or query results contain zero items.' },
      { id: 'func_4', label: 'Loading states (skeletons or spinners) display during asynchronous operations; buttons disable during dispatch.' },
      { id: 'func_5', label: 'Data persists accurately across page refreshes (localStorage/IndexedDB or remote database).' },
      { id: 'func_6', label: 'Application handles network disconnections and server errors gracefully without unhandled exceptions.' }
    ]
  },
  {
    id: 'accessibility',
    title: '2. Accessibility (WCAG 2.1 Level AA)',
    description: 'Guarantee that all users, including keyboard-only and assistive technology users, can navigate the application.',
    items: [
      { id: 'a11y_1', label: 'Semantic HTML5 landmark tags (<header>, <nav>, <main>, <section>, <footer>) are used appropriately.' },
      { id: 'a11y_2', label: 'Every interactive element can be reached and activated using only the keyboard (Tab, Enter, Space).' },
      { id: 'a11y_3', label: 'All interactive elements display visible, high-contrast :focus-visible indicators when navigating via keyboard.' },
      { id: 'a11y_4', label: 'All form inputs have associated, visible <label> elements (or aria-labelledby where appropriate).' },
      { id: 'a11y_5', label: 'Text color contrast ratio exceeds 4.5:1 for body copy and 3:1 for large headings against background colors.' },
      { id: 'a11y_6', label: 'All <img> tags have meaningful alt attributes (or alt="" for decorative images).' },
      { id: 'a11y_7', label: 'CSS animations respect prefers-reduced-motion media queries for users with vestibular disorders.' }
    ]
  },
  {
    id: 'security',
    title: '3. Security (OWASP Top 10 Guidelines)',
    description: 'Protect user credentials, isolate secrets, and enforce server-side authorization boundaries.',
    items: [
      { id: 'sec_1', label: 'Zero secrets (JWT_SECRET, MONGO_URI, private API keys) are exposed in frontend client bundles.' },
      { id: 'sec_2', label: '.env files are strictly added to .gitignore; an .env.example template is provided with dummy values.' },
      { id: 'sec_3', label: 'User passwords are encrypted with bcrypt (minimum 10 salt rounds) before database persistence.' },
      { id: 'sec_4', label: 'Backend REST API routes enforce server-side authentication and role-based permissions (never rely on UI hides).' },
      { id: 'sec_5', label: 'All incoming requests are sanitized to prevent Cross-Site Scripting (XSS) and NoSQL injection attacks.' },
      { id: 'sec_6', label: 'Production server errors return sanitized messages; internal stack traces are hidden from public responses.' },
      { id: 'sec_7', label: 'File upload endpoints validate MIME types, enforce strict size limits, and store files outside public root.' }
    ]
  },
  {
    id: 'reliability',
    title: '4. Reliability, Error Handling & Logging',
    description: 'Ensure systems detect failures, log diagnostic evidence, and degrade gracefully under stress.',
    items: [
      { id: 'rel_1', label: 'Centralized global error-handling middleware is configured on the backend to catch unhandled rejections.' },
      { id: 'rel_2', label: 'Structured server logging records HTTP status codes, request methods, and unique correlation IDs.' },
      { id: 'rel_3', label: 'Database connection reconnection and timeout handlers prevent hanging server processes.' },
      { id: 'rel_4', label: 'Automated test suite (unit tests, integration tests) passes cleanly before deployment.' },
      { id: 'rel_5', label: 'Database backup and recovery procedures (point-in-time restore or scheduled dumps) are established.' }
    ]
  },
  {
    id: 'performance',
    title: '5. Performance & Core Web Vitals',
    description: 'Optimize load times, minimize render blocking, and guarantee responsiveness across all devices.',
    items: [
      { id: 'perf_1', label: 'Frontend bundles are minified and tree-shaken with dead code eliminated (npm run build).' },
      { id: 'perf_2', label: 'Heavy images and SVG icons are compressed, properly sized, and lazily loaded (loading="lazy").' },
      { id: 'perf_3', label: 'Largest Contentful Paint (LCP) renders under 2.5 seconds on simulated mobile 4G connections.' },
      { id: 'perf_4', label: 'Cumulative Layout Shift (CLS) is under 0.1; width/height attributes are specified on images/media.' },
      { id: 'perf_5', label: 'Layout is fully responsive and tested across mobile (375px), tablet (768px), and desktop (1280px).' }
    ]
  },
  {
    id: 'deployment',
    title: '6. Production Deployment & DevOps',
    description: 'Validate production build artifacts, HTTPS, CORS, and post-deployment monitoring.',
    items: [
      { id: 'dep_1', label: 'Production builds execute with zero compilation warnings or type errors.' },
      { id: 'dep_2', label: 'Single Page Application (SPA) rewrite rules (_redirects or vercel.json) prevent 404s on page reloads.' },
      { id: 'dep_3', label: 'HTTPS (SSL/TLS) is active and enforced on all production domains and API endpoints.' },
      { id: 'dep_4', label: 'Cross-Origin Resource Sharing (CORS) is restricted to verified production frontend domains.' },
      { id: 'dep_5', label: 'A lightweight health check endpoint (/health) is exposed and monitored by an external synthetic ping service.' },
      { id: 'dep_6', label: 'A verified rollback procedure is prepared so the team can revert to a known good release in under 60 seconds.' }
    ]
  }
];

export default function ProductionChecklist() {
  const { toggleProductionChecklistItem, isProductionChecklistItemComplete, getProductionChecklistProgress } = useProgress();
  const [copiedReport, setCopiedReport] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');

  const totalItemCount = CHECKLIST_CATEGORIES.reduce((acc, cat) => acc + cat.items.length, 0);
  const overall = getProductionChecklistProgress(totalItemCount);

  const handleCopyMarkdownReport = () => {
    let md = `# Production-Readiness Audit Report\n\n`;
    md += `**Overall Verified Progress:** ${overall.completed} / ${overall.total} (${overall.percent}%)\n`;
    md += `*Note: This is a self-reported engineering audit conducted via Dev-root.*\n\n`;

    CHECKLIST_CATEGORIES.forEach((cat) => {
      md += `## ${cat.title}\n\n`;
      cat.items.forEach((item) => {
        const isDone = isProductionChecklistItemComplete(item.id);
        md += `- [${isDone ? 'x' : ' '}] ${item.label}\n`;
      });
      md += `\n`;
    });

    navigator.clipboard.writeText(md);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  const filteredCategories = filterCategory === 'all'
    ? CHECKLIST_CATEGORIES
    : CHECKLIST_CATEGORIES.filter(c => c.id === filterCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-gray-200 font-medium">Production-Readiness Checklist</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck size={16} />
            Quality Assurance Standard
          </div>
          <button
            onClick={handleCopyMarkdownReport}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <Download size={14} />
            {copiedReport ? '✓ Copied Markdown Report' : 'Export Audit Report'}
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          Production-Readiness Checklist
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-base mb-6 leading-relaxed">
          Verify your full-stack applications against industry standards before publishing to production. Evaluates functionality, accessibility, security, reliability, performance, and cloud deployment.
        </p>

        {/* Audit Progress Bar */}
        <div className="bg-gray-50 dark:bg-gray-900/60 rounded-2xl p-5 border border-gray-100 dark:border-gray-700/60">
          <div className="flex justify-between items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            <span>Overall Verification Score: {overall.completed} of {overall.total} Verified</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-bold text-base">{overall.percent}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden mb-3">
            <div
              className={`h-full transition-all duration-300 ${
                overall.percent === 100 ? 'bg-emerald-500' : overall.percent >= 75 ? 'bg-indigo-600' : 'bg-amber-500'
              }`}
              style={{ width: `${overall.percent}%` }}
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span>
              ℹ️ <strong>Self-Reported Quality Audit:</strong> This tool reflects candidate self-verification. It is distinct from automated test suite verification.
            </span>
            <span className="font-semibold text-gray-600 dark:text-gray-400">
              {totalItemCount - overall.completed} items pending
            </span>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8 overflow-x-auto scrollbar-none gap-2 pb-2">
        <button
          onClick={() => setFilterCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            filterCategory === 'all'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
          }`}
        >
          All Categories ({totalItemCount})
        </button>
        {CHECKLIST_CATEGORIES.map((cat) => {
          const catDone = cat.items.filter(i => isProductionChecklistItemComplete(i.id)).length;
          return (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                filterCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
              }`}
            >
              <span>{cat.title.split('.')[1] || cat.title}</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-black/10 dark:bg-white/10 font-mono">
                {catDone}/{cat.items.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Checklist Sections */}
      <div className="space-y-8 mb-12">
        {filteredCategories.map((category) => {
          const completedCount = category.items.filter(i => isProductionChecklistItemComplete(i.id)).length;
          const isCategoryComplete = completedCount === category.items.length;

          return (
            <div
              key={category.id}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {category.title}
                </h2>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  isCategoryComplete
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                    : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
                }`}>
                  {completedCount} / {category.items.length} Verified
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                {category.description}
              </p>

              <div className="space-y-3">
                {category.items.map((item) => {
                  const verified = isProductionChecklistItemComplete(item.id);
                  return (
                    <label
                      key={item.id}
                      className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                        verified
                          ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/80 shadow-xs'
                          : 'bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={verified}
                        onChange={() => toggleProductionChecklistItem(item.id)}
                        className="mt-1 w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer"
                      />
                      <span className={`text-sm leading-relaxed ${
                        verified
                          ? 'text-emerald-950 dark:text-emerald-200 font-medium'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        {item.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Helpful Curriculum Connections Footer */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-3xl p-6 sm:p-8 border border-indigo-100 dark:border-indigo-900/50">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <Sparkles className="text-indigo-600 dark:text-indigo-400" size={20} />
          Need Help Resolving Unchecked Items?
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Every requirement in this checklist is directly taught across Dev-root’s deep curriculum courses:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <Link
            to="/courses/full-stack-testing-and-qa"
            className="p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-800 dark:text-gray-200 hover:text-indigo-600 block transition-colors"
          >
            🧪 Course 13: Full-Stack Testing & QA →
          </Link>
          <Link
            to="/courses/professional-debugging-and-troubleshooting"
            className="p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-800 dark:text-gray-200 hover:text-indigo-600 block transition-colors"
          >
            🔍 Course 14: Professional Debugging →
          </Link>
          <Link
            to="/courses/production-deployment-and-devops"
            className="p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-800 dark:text-gray-200 hover:text-indigo-600 block transition-colors"
          >
            🚀 Course 15: Production Deployment →
          </Link>
        </div>
      </div>
    </div>
  );
}
