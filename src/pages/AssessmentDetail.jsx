import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { assessments } from '../data/assessments';
import { useProgress } from '../context/ProgressContext';

export default function AssessmentDetail() {
  const { slug } = useParams();
  const { recordAssessmentScore, getAssessmentScore } = useProgress();

  const assessment = assessments.find((a) => a.slug === slug);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [qId]: number | number[] }
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);

  if (!assessment) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Assessment Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The requested assessment does not exist or may have been renamed.
        </p>
        <Link
          to="/assessments"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 text-white font-medium hover:bg-teal-700 transition-colors shadow-sm"
        >
          ← Back to Assessments Catalog
        </Link>
      </div>
    );
  }

  const questions = assessment.questions;
  const currentQuestion = questions[currentIndex];
  const previousRecord = getAssessmentScore(assessment.id);

  const handleSelectOption = (qId, optionIdx, isMulti) => {
    if (isSubmitted) return;

    if (isMulti) {
      const currentSelected = Array.isArray(userAnswers[qId]) ? [...userAnswers[qId]] : [];
      if (currentSelected.includes(optionIdx)) {
        setUserAnswers({
          ...userAnswers,
          [qId]: currentSelected.filter((i) => i !== optionIdx)
        });
      } else {
        setUserAnswers({
          ...userAnswers,
          [qId]: [...currentSelected, optionIdx].sort((a, b) => a - b)
        });
      }
    } else {
      setUserAnswers({
        ...userAnswers,
        [qId]: optionIdx
      });
    }
  };

  const calculateResults = () => {
    let correctCount = 0;
    const strongTopics = new Set();
    const weakTopics = new Set();
    const recommendedLessons = new Set();

    questions.forEach((q) => {
      const userAns = userAnswers[q.id];
      let isCorrect = false;

      if (q.type === 'multiple-select') {
        const expected = Array.isArray(q.correctAnswer) ? [...q.correctAnswer].sort() : [];
        const actual = Array.isArray(userAns) ? [...userAns].sort() : [];
        isCorrect = expected.length === actual.length && expected.every((val, idx) => val === actual[idx]);
      } else {
        isCorrect = userAns === q.correctAnswer;
      }

      if (isCorrect) {
        correctCount += 1;
        if (q.topic) strongTopics.add(q.topic);
      } else {
        if (q.topic) weakTopics.add(q.topic);
        if (q.lessonSlug) recommendedLessons.add(q.lessonSlug);
      }
    });

    const percent = Math.round((correctCount / questions.length) * 100);
    const passed = percent >= assessment.passingScorePercent;

    const result = {
      scorePercent: percent,
      correctCount,
      totalQuestions: questions.length,
      passed,
      strongTopics: Array.from(strongTopics),
      weakTopics: Array.from(weakTopics),
      recommendedLessons: Array.from(recommendedLessons)
    };

    setScoreResult(result);
    setIsSubmitted(true);
    recordAssessmentScore(assessment.id, result);
  };

  const handleRetake = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setScoreResult(null);
    setCurrentIndex(0);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link to="/" className="hover:text-teal-600 dark:hover:text-teal-400">Home</Link>
        <span>/</span>
        <Link to="/assessments" className="hover:text-teal-600 dark:hover:text-teal-400">Assessments</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-gray-200 font-medium truncate">{assessment.title}</span>
      </nav>

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200/50 dark:border-teal-800/50">
            Course Assessment
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Passing Threshold: <strong>{assessment.passingScorePercent}%</strong>
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          {assessment.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {assessment.description}
        </p>
      </div>

      {/* Results View */}
      {isSubmitted && scoreResult ? (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 shadow-sm mb-12 space-y-8">
          {/* Banner */}
          <div className={`p-6 rounded-2xl text-center ${
            scoreResult.passed
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200'
              : 'bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200'
          }`}>
            <span className="text-4xl block mb-2">{scoreResult.passed ? '🎉' : '📖'}</span>
            <h2 className="text-2xl font-black mb-1">
              {scoreResult.passed ? 'Assessment Passed!' : 'Review Recommended'}
            </h2>
            <p className="text-base font-semibold">
              You scored {scoreResult.correctCount} out of {scoreResult.totalQuestions} ({scoreResult.scorePercent}%)
            </p>
            <p className="text-xs mt-2 opacity-90">
              {scoreResult.passed
                ? 'Great job! You have demonstrated strong competency in this subject matter.'
                : 'You scored below the passing threshold. Review the weak areas identified below and retake the assessment.'}
            </p>
          </div>

          {/* Diagnostic Topics Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-800/30">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-2 flex items-center gap-1.5">
                <span>✓</span> Strong Areas ({scoreResult.strongTopics.length})
              </h4>
              {scoreResult.strongTopics.length > 0 ? (
                <ul className="list-disc list-inside text-xs text-gray-700 dark:text-gray-300 space-y-1">
                  {scoreResult.strongTopics.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-gray-500">No strong areas identified yet.</p>
              )}
            </div>

            <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-2 flex items-center gap-1.5">
                <span>⚠️</span> Topics To Review ({scoreResult.weakTopics.length})
              </h4>
              {scoreResult.weakTopics.length > 0 ? (
                <ul className="list-disc list-inside text-xs text-gray-700 dark:text-gray-300 space-y-1">
                  {scoreResult.weakTopics.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-gray-500">Perfect score! No topics require review.</p>
              )}
            </div>
          </div>

          {/* Recommended Lessons */}
          {scoreResult.recommendedLessons.length > 0 && (
            <div className="p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/50">
              <h4 className="text-sm font-bold text-indigo-900 dark:text-indigo-200 mb-2">
                Recommended Lessons to Revisit:
              </h4>
              <div className="flex flex-wrap gap-2">
                {scoreResult.recommendedLessons.map((lSlug) => (
                  <Link
                    key={lSlug}
                    to={`/lessons/${lSlug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-700 hover:shadow-sm"
                  >
                    📖 {lSlug.replace(/-/g, ' ')} →
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Question Review */}
          <div className="space-y-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Detailed Question Breakdown</h3>

            {questions.map((q, qIdx) => {
              const userAns = userAnswers[q.id];
              let isCorrect = false;

              if (q.type === 'multiple-select') {
                const expected = Array.isArray(q.correctAnswer) ? [...q.correctAnswer].sort() : [];
                const actual = Array.isArray(userAns) ? [...userAns].sort() : [];
                isCorrect = expected.length === actual.length && expected.every((val, idx) => val === actual[idx]);
              } else {
                isCorrect = userAns === q.correctAnswer;
              }

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border ${
                    isCorrect
                      ? 'border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/20'
                      : 'border-rose-200 dark:border-rose-800/50 bg-rose-50/20'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-gray-500">Question {qIdx + 1} of {questions.length}</span>
                    <span className={`font-bold px-2 py-0.5 rounded ${
                      isCorrect ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    }`}>
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>

                  <p className="text-sm font-bold text-gray-900 dark:text-white mb-2">{q.prompt}</p>

                  {q.code && (
                    <pre className="p-3 rounded-lg bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto mb-3">
                      <code>{q.code}</code>
                    </pre>
                  )}

                  <div className="space-y-1.5 text-xs mb-3">
                    {q.options.map((opt, optIdx) => {
                      const isOptionCorrect = q.type === 'multiple-select'
                        ? Array.isArray(q.correctAnswer) && q.correctAnswer.includes(optIdx)
                        : q.correctAnswer === optIdx;

                      const isSelected = q.type === 'multiple-select'
                        ? Array.isArray(userAns) && userAns.includes(optIdx)
                        : userAns === optIdx;

                      return (
                        <div
                          key={optIdx}
                          className={`p-2.5 rounded-lg flex items-center justify-between ${
                            isOptionCorrect
                              ? 'bg-emerald-100/70 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-200 font-medium'
                              : isSelected
                              ? 'bg-rose-100/70 dark:bg-rose-900/40 text-rose-900 dark:text-rose-200'
                              : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          <span>{opt}</span>
                          <span className="text-xs font-semibold">
                            {isOptionCorrect && '✓ Correct'}
                            {!isOptionCorrect && isSelected && '✗ Your choice'}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-750 text-xs text-gray-700 dark:text-gray-300">
                    <strong>Explanation:</strong> {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-4">
            <Link
              to="/assessments"
              className="text-sm font-semibold text-teal-600 dark:text-teal-400 hover:underline"
            >
              ← All Assessments
            </Link>
            <button
              onClick={handleRetake}
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold shadow-sm"
            >
              Retake Assessment 🔄
            </button>
          </div>
        </div>
      ) : (
        /* Active Assessment Runner */
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 shadow-sm mb-12">
          {/* Question Index Pills */}
          <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
            {questions.map((q, idx) => {
              const isAnswered = userAnswers[q.id] !== undefined && (
                Array.isArray(userAnswers[q.id]) ? userAnswers[q.id].length > 0 : true
              );
              const isCurrent = currentIndex === idx;

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-teal-600 text-white ring-2 ring-teal-500 ring-offset-2 dark:ring-offset-gray-800'
                      : isAnswered
                      ? 'bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-200 border border-teal-300 dark:border-teal-700'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Current Question */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-2">
              <span>Question {currentIndex + 1} of {questions.length}</span>
              <span>{currentQuestion.type.replace('-', ' ').toUpperCase()}</span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">
              {currentQuestion.prompt}
            </h3>

            {currentQuestion.code && (
              <pre className="p-4 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto mb-6 border border-slate-700">
                <code>{currentQuestion.code}</code>
              </pre>
            )}

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, optIdx) => {
                const isMulti = currentQuestion.type === 'multiple-select';
                const selected = isMulti
                  ? Array.isArray(userAnswers[currentQuestion.id]) && userAnswers[currentQuestion.id].includes(optIdx)
                  : userAnswers[currentQuestion.id] === optIdx;

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(currentQuestion.id, optIdx, isMulti)}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3 ${
                      selected
                        ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-500 text-teal-950 dark:text-teal-100 font-medium shadow-sm'
                        : 'bg-gray-50/50 dark:bg-gray-900/40 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-teal-300'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center border text-xs font-bold ${
                      isMulti ? 'rounded-md' : 'rounded-full'
                    } ${
                      selected
                        ? 'bg-teal-600 border-teal-600 text-white'
                        : 'border-gray-400 dark:border-gray-500'
                    }`}>
                      {selected ? '✓' : ''}
                    </div>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 disabled:opacity-40"
            >
              ← Previous Question
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-sm"
              >
                Next Question →
              </button>
            ) : (
              <button
                onClick={calculateResults}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20"
              >
                Submit Assessment ✓
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
