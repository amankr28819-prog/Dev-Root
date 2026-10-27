import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { LESSONS } from '../data/lessons';
import { challenges } from '../data/challenges';
import { projects } from '../data/projects';
import { assessments } from '../data/assessments';
import { Search, Bookmark, HelpCircle, BookOpen, Sparkles, ExternalLink, RefreshCw } from 'lucide-react';

const QUICK_REVISION_CARDS = [
  {
    id: 'rev-01',
    category: 'HTML',
    title: 'The Semantic HTML Law',
    summary: 'Never use a <div> when a semantic landmark exists. <header>, <nav>, <main>, <section>, <article>, and <footer> give blind users navigation landmarks and search engines structural indexability.',
    lessonSlug: 'html-semantic-elements',
    codeSnippet: `<header><nav>...</nav></header>\n<main><article>...</article></main>\n<footer>...</footer>`
  },
  {
    id: 'rev-02',
    category: 'CSS',
    title: 'Box-Sizing: border-box Rule',
    summary: 'Always set * { box-sizing: border-box; }. Under border-box, padding and border are included INSIDE the specified width, preventing unexpected layout wrapping and horizontal scrollbars.',
    lessonSlug: 'css-box-model',
    codeSnippet: `* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}`
  },
  {
    id: 'rev-03',
    category: 'CSS',
    title: 'Flexbox vs CSS Grid Hierarchy',
    summary: 'Use Flexbox for 1-dimensional layouts (navbars, card internal rows, button clusters). Use CSS Grid for 2-dimensional matrix layouts (galleries, multi-column dashboard views).',
    lessonSlug: 'css-grid',
    codeSnippet: `.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1.5rem;\n}`
  },
  {
    id: 'rev-04',
    category: 'JavaScript',
    title: 'Strict Equality & Falsy Trap',
    summary: 'Always use === over ==. JavaScript loose equality performs unpredictable type coercion. Remember the 8 falsy values: false, 0, -0, 0n, "", null, undefined, and NaN.',
    lessonSlug: 'js-variables-datatypes',
    codeSnippet: `0 == false;  // true (type coerced!)\n0 === false; // false (strict type checked)`
  },
  {
    id: 'rev-05',
    category: 'JavaScript',
    title: 'Pure Array Transforms',
    summary: 'Use map(), filter(), and slice() which return new arrays without mutating the source. Avoid mutating state directly with push() or splice() when building reactive user interfaces.',
    lessonSlug: 'js-arrays',
    codeSnippet: `// Pure addition\nconst updated = [...prevList, newItem];\n// Pure deletion\nconst remaining = list.filter(item => item.id !== removeId);`
  },
  {
    id: 'rev-06',
    category: 'React',
    title: 'State Immutability & Re-render Trigger',
    summary: 'React uses Object.is reference checks to determine if state changed. Mutating an array or object in place retains the same memory address, causing React to skip re-rendering entirely.',
    lessonSlug: 'react-state-management',
    codeSnippet: `// WRONG: state.push(x); setState(state);\n// CORRECT:\nsetState(prev => [...prev, x]);`
  },
  {
    id: 'rev-07',
    category: 'Backend',
    title: 'Express Centralized Error Handling',
    summary: 'Express recognizes error middleware specifically by four arguments: (err, req, res, next). Never leak raw database stack traces to the public client in production.',
    lessonSlug: 'backend-express-apis',
    codeSnippet: `app.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(err.status || 500).json({ success: false, error: err.message });\n});`
  },
  {
    id: 'rev-08',
    category: 'Security',
    title: 'JWT Storage: HttpOnly Cookies over LocalStorage',
    summary: 'Never store authentication tokens in window.localStorage because any injected XSS script can read them. Store tokens in HttpOnly, SameSite=Strict, Secure cookies instead.',
    lessonSlug: 'authentication-jwt-sessions',
    codeSnippet: `res.cookie('token', token, {\n  httpOnly: true,\n  secure: process.env.NODE_ENV === 'production',\n  sameSite: 'strict'\n});`
  }
];

export default function Revision() {
  const { bookmarkedLessons, flaggedQuestions, assessmentScores, completedLessons } = useProgress();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'bookmarks', 'cards', 'weakAreas', 'search'

  // Retrieve bookmarked lesson objects
  const bookmarkedLessonList = Object.keys(bookmarkedLessons || {})
    .filter((id) => bookmarkedLessons[id])
    .map((id) => {
      // Find lesson by id or slug
      const found = Object.values(LESSONS).find((l) => l.id === id || l.slug === id);
      return found || { id, title: id, slug: id, summary: 'Bookmarked lesson' };
    });

  // Calculate weak areas from assessment results
  const weakTopicsList = [];
  Object.entries(assessmentScores || {}).forEach(([assessId, record]) => {
    if (record.weakTopics && record.weakTopics.length > 0) {
      const assessmentMeta = assessments.find((a) => a.id === assessId);
      record.weakTopics.forEach((topic) => {
        weakTopicsList.push({
          topic,
          assessmentTitle: assessmentMeta ? assessmentMeta.title : assessId,
          date: record.date
        });
      });
    }
  });

  // Search logic across lessons, challenges, and projects
  const searchResults = searchQuery.trim().length > 1 ? {
    lessons: Object.values(LESSONS).filter((l) =>
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.summary.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    challenges: challenges.filter((c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.problemStatement.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    projects: projects.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.overview.toLowerCase().includes(searchQuery.toLowerCase())
    )
  } : null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-orange-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white mb-10 shadow-xl border border-amber-500/20">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-4">
            ⚡ Quick Revision & Spaced Reinforcement
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Revision Hub
          </h1>
          <p className="text-lg text-amber-100/90 leading-relaxed">
            Consolidate your knowledge, review bookmarked topics, inspect challenging quiz questions, and study high-yield technical summary cards.
          </p>
        </div>

        {/* Global Search Bar */}
        <div className="mt-8 max-w-2xl relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search all lessons, coding challenges, and projects..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-800/90 border border-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-inner text-sm"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8 overflow-x-auto scrollbar-none">
        {[
          { id: 'all', label: 'All Revision Material' },
          { id: 'bookmarks', label: `Bookmarked Lessons (${bookmarkedLessonList.length})` },
          { id: 'cards', label: `Quick Revision Cards (${QUICK_REVISION_CARDS.length})` },
          { id: 'weakAreas', label: `Topics to Review (${weakTopicsList.length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
              activeTab === tab.id
                ? 'border-amber-500 text-amber-600 dark:text-amber-400 dark:border-amber-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Results Drawer */}
      {searchResults && (
        <div className="mb-12 bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-amber-300 dark:border-amber-700/60 shadow-md">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Search className="w-5 h-5 text-amber-500" />
            Search Results for "{searchQuery}"
          </h2>

          <div className="space-y-6">
            {searchResults.lessons.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Lessons</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {searchResults.lessons.map((l) => (
                    <Link
                      key={l.id}
                      to={`/lessons/${l.slug}`}
                      className="p-3.5 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-750 hover:border-amber-400 transition-colors"
                    >
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">{l.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-1">{l.summary}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {searchResults.challenges.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Coding Challenges</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {searchResults.challenges.map((c) => (
                    <Link
                      key={c.id}
                      to={`/challenges/${c.slug}`}
                      className="p-3.5 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-750 hover:border-amber-400 transition-colors"
                    >
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">{c.title}</h4>
                      <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{c.category.toUpperCase()} • {c.difficulty}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {searchResults.projects.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Projects</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {searchResults.projects.map((p) => (
                    <Link
                      key={p.id}
                      to={`/projects/${p.slug}`}
                      className="p-3.5 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-750 hover:border-amber-400 transition-colors"
                    >
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">Tier {p.tier}: {p.title}</h4>
                      <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">{p.difficulty}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {searchResults.lessons.length === 0 && searchResults.challenges.length === 0 && searchResults.projects.length === 0 && (
              <p className="text-sm text-gray-500">No matching lessons, challenges, or projects found.</p>
            )}
          </div>
        </div>
      )}

      {/* Bookmarked Lessons Section */}
      {(activeTab === 'all' || activeTab === 'bookmarks') && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-500" />
              Bookmarked Lessons for Revision
            </h2>
            <span className="text-xs font-semibold text-gray-500">
              {bookmarkedLessonList.length} saved
            </span>
          </div>

          {bookmarkedLessonList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookmarkedLessonList.map((lesson) => (
                <div
                  key={lesson.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 flex flex-col justify-between hover:shadow-md transition-all"
                >
                  <div>
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                      {lesson.courseTitle || 'Curriculum Lesson'}
                    </span>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mt-1 mb-2">
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
                      {lesson.summary}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700/60">
                    <span className="text-xs text-gray-400">
                      {completedLessons[lesson.id] ? '✓ Completed' : 'In Progress'}
                    </span>
                    <Link
                      to={`/lessons/${lesson.slug}`}
                      className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                    >
                      Study Lesson →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-dashed border-gray-300 dark:border-gray-700 text-center">
              <Bookmark className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                You haven't bookmarked any lessons yet.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                While reading any lesson, click the "Bookmark for Revision" button in the header to save it here for fast retrieval.
              </p>
            </div>
          )}
        </section>
      )}

      {/* Weak Areas Diagnostics */}
      {(activeTab === 'all' || activeTab === 'weakAreas') && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-amber-500" />
              Diagnosed Weak Areas & Assessment Gaps
            </h2>
          </div>

          {weakTopicsList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {weakTopicsList.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40"
                >
                  <span className="text-xs font-mono text-amber-700 dark:text-amber-400 block mb-1">
                    {item.assessmentTitle}
                  </span>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                    {item.topic}
                  </h4>
                  <span className="text-xs text-gray-500 mt-2 block">
                    Failed on: {new Date(item.date).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/30 text-center">
              <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                🎉 No diagnostic weak areas recorded! Complete course assessments to identify any topics needing review.
              </p>
            </div>
          )}
        </section>
      )}

      {/* Quick Revision Flashcards */}
      {(activeTab === 'all' || activeTab === 'cards') && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              High-Yield Revision Cards
            </h2>
            <span className="text-xs text-gray-500 font-medium">Core Mental Models</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {QUICK_REVISION_CARDS.map((card) => (
              <div
                key={card.id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                      {card.category}
                    </span>
                    <Link
                      to={`/lessons/${card.lessonSlug}`}
                      className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                    >
                      Lesson Deep Dive →
                    </Link>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    {card.summary}
                  </p>

                  {card.codeSnippet && (
                    <pre className="p-3 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto border border-slate-700">
                      <code>{card.codeSnippet}</code>
                    </pre>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
