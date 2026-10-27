import React from 'react';
import { Link } from 'react-router-dom';
import { assessments } from '../data/assessments';
import { useProgress } from '../context/ProgressContext';

export default function Assessments() {
  const { getAssessmentScore } = useProgress();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white mb-10 shadow-xl border border-teal-500/20">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-4">
            🎓 Formal Knowledge Assessments
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Test Your Comprehensive Understanding
          </h1>
          <p className="text-lg text-emerald-100/90 leading-relaxed">
            Validate your mastery with comprehensive course-level assessments. Answer multi-select, code-reading, and output-prediction questions designed to diagnose knowledge gaps before building complex applications.
          </p>
        </div>
      </div>

      {/* Assessments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {assessments.map((assessment) => {
          const scoreRecord = getAssessmentScore(assessment.id);
          const hasAttempted = scoreRecord !== null;
          const isPassed = hasAttempted && scoreRecord.passed;

          return (
            <div
              key={assessment.id}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700/80 p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200/50 dark:border-teal-800/50">
                    Course Assessment
                  </span>
                  {hasAttempted && (
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      isPassed
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {isPassed ? `Passed (${scoreRecord.scorePercent}%)` : `Retake Recommended (${scoreRecord.scorePercent}%)`}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {assessment.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                  {assessment.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-6 py-3 border-y border-gray-100 dark:border-gray-700/60">
                  <div>
                    Questions: <strong className="text-gray-800 dark:text-gray-200">{assessment.questions.length}</strong>
                  </div>
                  <div>
                    Passing Threshold: <strong className="text-gray-800 dark:text-gray-200">{assessment.passingScorePercent}%</strong>
                  </div>
                  <div>
                    Est. Time: <strong className="text-gray-800 dark:text-gray-200">{assessment.estimatedMinutes} mins</strong>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-gray-400">
                  {hasAttempted ? `Last attempt: ${new Date(scoreRecord.date).toLocaleDateString()}` : 'Not attempted yet'}
                </span>
                <Link
                  to={`/assessments/${assessment.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold transition-colors shadow-sm"
                >
                  {hasAttempted ? 'Retake Assessment' : 'Start Assessment'} →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
