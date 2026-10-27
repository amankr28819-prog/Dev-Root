import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { useProgress } from '../context/ProgressContext';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { toggleProjectMilestone, isProjectMilestoneComplete, getProjectProgress } = useProgress();
  const [activeTab, setActiveTab] = useState('milestones'); // 'milestones', 'overview', 'architecture', 'starter', 'testing'
  const [revealedHints, setRevealedHints] = useState({});
  const [revealedSolutions, setRevealedSolutions] = useState({});
  const [copiedKey, setCopiedKey] = useState(null);

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Project Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The requested project does not exist or may have been renamed.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-sm"
        >
          ← Back to Projects Catalog
        </Link>
      </div>
    );
  }

  const progress = getProjectProgress(project.id, project.milestones?.length || 0);

  const toggleHint = (mId) => {
    setRevealedHints((prev) => ({ ...prev, [mId]: !prev[mId] }));
  };

  const toggleSolution = (mId) => {
    setRevealedSolutions((prev) => ({ ...prev, [mId]: !prev[mId] }));
  };

  const handleCopy = (code, key) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Find next/prev project
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
        <span>/</span>
        <Link to="/projects" className="hover:text-indigo-600 dark:hover:text-indigo-400">Projects</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-gray-200 font-medium truncate">{project.title}</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50">
              Tier {project.tier}
            </span>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
              project.difficulty === 'Beginner' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
              project.difficulty === 'Basic Application' ? 'bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300' :
              project.difficulty === 'Intermediate' ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
              project.difficulty === 'Advanced' ? 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300' :
              'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
            }`}>
              {project.difficulty}
            </span>
            {progress.percent === 100 && (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 flex items-center gap-1.5">
                ✓ Project Completed
              </span>
            )}
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400">
            Estimated time: <strong className="text-gray-800 dark:text-gray-200">{project.estimatedHours} hours</strong>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          {project.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-base mb-6 leading-relaxed">
          {project.subtitle}
        </p>

        {/* Milestone Progress Bar */}
        <div className="bg-gray-50 dark:bg-gray-900/60 rounded-2xl p-4 border border-gray-100 dark:border-gray-700/60 mb-6">
          <div className="flex justify-between items-center text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
            <span>Milestone Progress: {progress.completed} of {progress.total} Completed</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">{progress.percent}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                progress.percent === 100 ? 'bg-emerald-500' : 'bg-indigo-600'
              }`}
              style={{ width: `${progress.percent}%` }}
            />
          </div>
        </div>

        {/* Skills Chips */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 mr-1">Skills Built:</span>
          {project.skills.map((skill, i) => (
            <span
              key={i}
              className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8 overflow-x-auto scrollbar-none">
        {[
          { id: 'milestones', label: `Step-by-Step Milestones (${project.milestones?.length || 0})` },
          { id: 'overview', label: 'Requirements & Features' },
          { id: 'architecture', label: 'Architecture & Schema' },
          { id: 'starter', label: 'Starter Files & Templates' },
          { id: 'testing', label: 'Testing & Checklist' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
              activeTab === tab.id
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Milestones */}
      {activeTab === 'milestones' && (
        <div className="space-y-6 mb-12">
          <div className="bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/60 rounded-2xl p-5 text-sm text-indigo-900 dark:text-indigo-200 leading-relaxed">
            💡 <strong>How to complete this project:</strong> Work through each milestone in order. Mark milestones complete as you implement and verify them. If you get stuck, expand the <em>Progressive Hint</em> before revealing the <em>Solution Walkthrough</em>.
          </div>

          {project.milestones?.map((milestone, idx) => {
            const isDone = isProjectMilestoneComplete(project.id, milestone.id);
            const hintRevealed = revealedHints[milestone.id];
            const solRevealed = revealedSolutions[milestone.id];

            return (
              <div
                key={milestone.id}
                className={`bg-white dark:bg-gray-800 rounded-2xl border transition-all duration-200 ${
                  isDone
                    ? 'border-emerald-300 dark:border-emerald-800/70 shadow-sm'
                    : 'border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-800'
                } p-6`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleProjectMilestone(project.id, milestone.id)}
                      className={`w-6 h-6 mt-0.5 rounded-lg border flex items-center justify-center transition-all ${
                        isDone
                          ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                          : 'border-gray-300 dark:border-gray-600 hover:border-indigo-500 bg-white dark:bg-gray-700'
                      }`}
                      aria-label="Toggle milestone completion"
                    >
                      {isDone && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    <div>
                      <h3 className={`text-lg font-bold ${isDone ? 'text-emerald-900 dark:text-emerald-200 line-through' : 'text-gray-900 dark:text-white'}`}>
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-gray-400">
                    Step {idx + 1}
                  </span>
                </div>

                {/* Sub-tasks list */}
                {milestone.tasks && milestone.tasks.length > 0 && (
                  <div className="ml-9 my-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-700/50">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                      Specific Tasks:
                    </h4>
                    <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                      {milestone.tasks.map((task, tIdx) => (
                        <li key={tIdx}>{task}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Hint & Solution Toggles */}
                <div className="ml-9 flex flex-wrap gap-3 pt-2">
                  {milestone.hint && (
                    <button
                      onClick={() => toggleHint(milestone.id)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 hover:bg-amber-100 transition-colors"
                    >
                      {hintRevealed ? 'Hide Hint' : '💡 Need a Hint?'}
                    </button>
                  )}

                  {milestone.solutionSnippet && (
                    <button
                      onClick={() => toggleSolution(milestone.id)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 transition-colors"
                    >
                      {solRevealed ? 'Hide Solution Walkthrough' : '🔍 Reveal Reference Walkthrough'}
                    </button>
                  )}
                </div>

                {/* Progressive Hint Drawer */}
                {hintRevealed && milestone.hint && (
                  <div className="ml-9 mt-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-xs sm:text-sm text-amber-900 dark:text-amber-200">
                    <strong>Milestone Hint:</strong> {milestone.hint}
                  </div>
                )}

                {/* Solution Walkthrough Drawer */}
                {solRevealed && milestone.solutionSnippet && (
                  <div className="ml-9 mt-3 p-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-slate-400">Reference Implementation:</span>
                      <button
                        onClick={() => handleCopy(milestone.solutionSnippet, `sol-${milestone.id}`)}
                        className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                      >
                        {copiedKey === `sol-${milestone.id}` ? '✓ Copied' : 'Copy Code'}
                      </button>
                    </div>
                    <pre className="text-xs font-mono overflow-x-auto p-3 rounded-lg bg-slate-950 text-emerald-400">
                      <code>{milestone.solutionSnippet}</code>
                    </pre>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Overview & Requirements */}
      {activeTab === 'overview' && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 mb-12 space-y-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Project Overview</h3>
            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
              {project.overview}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Prerequisites</h3>
            <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 text-sm text-indigo-900 dark:text-indigo-200">
              {project.prerequisites}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Target Features</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.features?.map((feat, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700/50">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Learning Objectives</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300 pl-1">
              {project.learningObjectives?.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Tab 3: Suggested Architecture */}
      {activeTab === 'architecture' && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 mb-12">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Suggested Architecture</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Recommended directory structure and module separation following industry production patterns.
          </p>
          <pre className="p-5 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-sm overflow-x-auto leading-relaxed border border-slate-700">
            <code>{project.suggestedArchitecture.trim()}</code>
          </pre>
        </div>
      )}

      {/* Tab 4: Starter Files */}
      {activeTab === 'starter' && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 mb-12 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Starter Code & Templates</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Copy these starter templates into your local IDE to begin work immediately.
              </p>
            </div>
          </div>

          {project.starterFiles && Object.entries(project.starterFiles).map(([filename, code]) => (
            <div key={filename} className="rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-750 px-4 py-2.5 border-b border-gray-200 dark:border-gray-700">
                <span className="text-xs font-mono font-bold text-gray-700 dark:text-gray-300">{filename}</span>
                <button
                  onClick={() => handleCopy(code, filename)}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  {copiedKey === filename ? '✓ Copied' : 'Copy Template'}
                </button>
              </div>
              <pre className="p-4 bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
                <code>{code}</code>
              </pre>
            </div>
          ))}
        </div>
      )}

      {/* Tab 5: Testing & Acceptance Checklist */}
      {activeTab === 'testing' && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 mb-12 space-y-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Acceptance Testing Criteria</h3>
            <div className="space-y-2">
              {project.testingInstructions?.map((inst, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-700/50 text-sm text-gray-700 dark:text-gray-300">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">🧪</span>
                  <span>{inst}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Common Pitfalls & Mistakes</h3>
            <div className="space-y-2">
              {project.commonMistakes?.map((mistake, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200/50 dark:border-rose-900/40 text-sm text-rose-900 dark:text-rose-200">
                  <span className="text-rose-500 font-bold">⚠️</span>
                  <span>{mistake}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Extension Challenges (Extra Credit)</h3>
            <div className="space-y-2">
              {project.extensionChallenges?.map((ext, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-900/40 text-sm text-amber-900 dark:text-amber-200">
                  <span className="text-amber-500 font-bold">⭐</span>
                  <span>{ext}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
        {prevProject ? (
          <Link
            to={`/projects/${prevProject.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            ← Tier {prevProject.tier}: {prevProject.title}
          </Link>
        ) : <div />}

        <Link
          to="/projects"
          className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          All 10 Projects
        </Link>

        {nextProject && (
          <Link
            to={`/projects/${nextProject.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Tier {nextProject.tier}: {nextProject.title} →
          </Link>
        )}
      </div>
    </div>
  );
}
