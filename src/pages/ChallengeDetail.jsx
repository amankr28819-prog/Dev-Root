import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { challenges } from '../data/challenges';
import ChallengeRunner from '../components/ChallengeRunner';
import { useProgress } from '../context/ProgressContext';

export default function ChallengeDetail() {
  const { slug } = useParams();
  const { isChallengeComplete } = useProgress();
  const challenge = challenges.find((c) => c.slug === slug);

  if (!challenge) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Challenge Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The requested coding challenge does not exist or may have been renamed.
        </p>
        <Link
          to="/challenges"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-sm"
        >
          ← Back to Challenge Catalog
        </Link>
      </div>
    );
  }

  const isCompleted = isChallengeComplete(challenge.id);

  // Find next challenge in catalog
  const currentIndex = challenges.findIndex((c) => c.id === challenge.id);
  const nextChallenge = currentIndex >= 0 && currentIndex < challenges.length - 1 ? challenges[currentIndex + 1] : null;
  const prevChallenge = currentIndex > 0 ? challenges[currentIndex - 1] : null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
        <span>/</span>
        <Link to="/challenges" className="hover:text-indigo-600 dark:hover:text-indigo-400">Coding Challenges</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-gray-200 font-medium truncate">{challenge.title}</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50">
              {challenge.category.toUpperCase()}
            </span>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
              challenge.difficulty === 'Beginner' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' :
              challenge.difficulty === 'Intermediate' ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' :
              'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300'
            }`}>
              {challenge.difficulty}
            </span>
            {isCompleted && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                Solved
              </span>
            )}
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400">
            Estimated time: <span className="font-semibold text-gray-700 dark:text-gray-300">{challenge.estimatedMinutes || 15} mins</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
          {challenge.title}
        </h1>

        <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-6">
          {challenge.problemStatement}
        </p>

        {/* Learning Objectives & Prerequisites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-gray-700/60 text-sm">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-1.5 mb-2">
              <span className="text-indigo-600 dark:text-indigo-400">🎯</span> Learning Objectives:
            </h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400 pl-1">
              {challenge.learningObjectives?.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-1.5 mb-2">
              <span className="text-indigo-600 dark:text-indigo-400">📚</span> Prerequisites:
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              {challenge.prerequisites || 'Familiarity with foundational web concepts.'}
            </p>
            {challenge.relatedLessonSlug && (
              <Link
                to={`/lessons/${challenge.relatedLessonSlug}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Review Related Lesson →
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Interactive Challenge Runner */}
      <div className="mb-12">
        <ChallengeRunner challenge={challenge} />
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
        {prevChallenge ? (
          <Link
            to={`/challenges/${prevChallenge.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            ← {prevChallenge.title}
          </Link>
        ) : <div />}

        <Link
          to="/challenges"
          className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          All Challenges Catalog
        </Link>

        {nextChallenge && (
          <Link
            to={`/challenges/${nextChallenge.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm"
          >
            {nextChallenge.title} →
          </Link>
        )}
      </div>
    </div>
  );
}
