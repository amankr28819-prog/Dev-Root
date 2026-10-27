import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { INTERVIEW_QUESTIONS } from '../data/interviewQuestions';
import { useProgress } from '../context/ProgressContext';
import { Award, BookOpen, CheckCircle2, ChevronRight, HelpCircle, Sparkles, Filter, Code2 } from 'lucide-react';

export default function InterviewPrep() {
  const { recordInterviewAttempt, getInterviewAttempt } = useProgress();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeQuestionId, setActiveQuestionId] = useState(INTERVIEW_QUESTIONS[0].id);
  const [revealedHints, setRevealedHints] = useState({});
  const [revealedAnswers, setRevealedAnswers] = useState({});
  const [scratchpads, setScratchpads] = useState({});

  const categories = ['all', 'JavaScript', 'React', 'Backend', 'Databases', 'Security', 'System Design'];

  const filteredQuestions = selectedCategory === 'all'
    ? INTERVIEW_QUESTIONS
    : INTERVIEW_QUESTIONS.filter(q => q.category === selectedCategory);

  const activeQuestion = INTERVIEW_QUESTIONS.find(q => q.id === activeQuestionId) || filteredQuestions[0];

  const handleToggleHint = (id) => {
    setRevealedHints(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleToggleAnswer = (id) => {
    setRevealedAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSetConfidence = (id, confidence) => {
    recordInterviewAttempt(id, confidence);
  };

  // Calculate metrics
  const attemptedCount = INTERVIEW_QUESTIONS.filter(q => Boolean(getInterviewAttempt(q.id))).length;
  const highConfidenceCount = INTERVIEW_QUESTIONS.filter(q => getInterviewAttempt(q.id)?.confidence === 'high').length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-gray-200 font-medium">Technical Interview Prep</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider">
            <Award size={16} />
            Full-Stack Interview Preparation
          </div>
          <div className="text-xs font-medium text-gray-500">
            {attemptedCount} of {INTERVIEW_QUESTIONS.length} Questions Practiced ({highConfidenceCount} Confident)
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          Technical Interview Preparation Center
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-base mb-6 leading-relaxed">
          Master real-world full-stack interview questions: conceptual reasoning, code output prediction, live debugging, and system design thinking. Formulate your answer first, then evaluate against model solutions.
        </p>

        {/* Progress Tracker */}
        <div className="bg-gray-50 dark:bg-gray-900/60 rounded-2xl p-4 border border-gray-100 dark:border-gray-700/60 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-xs">
            <div>
              <span className="text-gray-500 block">Total Questions</span>
              <strong className="text-sm font-bold text-gray-800 dark:text-gray-200">{INTERVIEW_QUESTIONS.length}</strong>
            </div>
            <div>
              <span className="text-gray-500 block">Practiced</span>
              <strong className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{attemptedCount}</strong>
            </div>
            <div>
              <span className="text-gray-500 block">High Confidence</span>
              <strong className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{highConfidenceCount}</strong>
            </div>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 italic">
            Focus on understanding core mechanics rather than memorization.
          </span>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8 overflow-x-auto scrollbar-none gap-2 pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              const firstInCat = cat === 'all' ? INTERVIEW_QUESTIONS[0] : INTERVIEW_QUESTIONS.find(q => q.category === cat);
              if (firstInCat) setActiveQuestionId(firstInCat.id);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
            }`}
          >
            {cat === 'all' ? 'All Subjects' : cat}
          </button>
        ))}
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Left Column: Questions List (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            Questions ({filteredQuestions.length})
          </h3>
          <div className="space-y-2 max-h-[650px] overflow-y-auto pr-1">
            {filteredQuestions.map((q) => {
              const attempt = getInterviewAttempt(q.id);
              const isActive = q.id === activeQuestion.id;

              return (
                <button
                  key={q.id}
                  onClick={() => setActiveQuestionId(q.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all block ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 dark:border-indigo-500 shadow-sm'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                      {q.category}
                    </span>
                    {attempt && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        attempt.confidence === 'high' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                        attempt.confidence === 'medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                        'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      }`}>
                        {attempt.confidence}
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2">
                    {q.title}
                  </h4>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Question Workspace (8 Cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 shadow-sm space-y-6">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-xs font-mono font-bold uppercase px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50">
                {activeQuestion.category} • {activeQuestion.type.replace('_', ' ')}
              </span>
              <span className="text-xs text-gray-400 font-mono">
                ID: {activeQuestion.id}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {activeQuestion.title}
            </h2>

            {/* Question Markdown Box */}
            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700/60 text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-sans whitespace-pre-wrap">
              {activeQuestion.question}
            </div>
          </div>

          {/* Hint Drawer */}
          <div className="space-y-2">
            <button
              onClick={() => handleToggleHint(activeQuestion.id)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 hover:bg-amber-100 transition-colors"
            >
              {revealedHints[activeQuestion.id] ? 'Hide Hint' : '💡 Need a Hint?'}
            </button>
            {revealedHints[activeQuestion.id] && (
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200">
                <strong>Guiding Hint:</strong> {activeQuestion.hint}
              </div>
            )}
          </div>

          {/* Practice Scratchpad */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
              Your Attempt / Notes (Type your explanation or predicted output):
            </label>
            <textarea
              value={scratchpads[activeQuestion.id] || ''}
              onChange={(e) => setScratchpads({ ...scratchpads, [activeQuestion.id]: e.target.value })}
              placeholder="Formulate your technical answer here before revealing the model solution..."
              rows={5}
              className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Model Answer Drawer */}
          <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
            <button
              onClick={() => handleToggleAnswer(activeQuestion.id)}
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Sparkles size={16} />
              {revealedAnswers[activeQuestion.id] ? 'Hide Model Solution' : 'Reveal Model Answer & Engineering Explanation'}
            </button>

            {revealedAnswers[activeQuestion.id] && (
              <div className="mt-4 p-5 rounded-2xl bg-slate-900 border border-slate-700 text-slate-100 text-xs sm:text-sm font-sans leading-relaxed whitespace-pre-wrap">
                {activeQuestion.modelAnswer}
              </div>
            )}
          </div>

          {/* Confidence Self-Rating */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
              Rate Your Answer Confidence:
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleSetConfidence(activeQuestion.id, 'review')}
                className="px-3 py-1.5 rounded-lg border border-rose-300 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs font-semibold hover:bg-rose-100"
              >
                Needs Review
              </button>
              <button
                onClick={() => handleSetConfidence(activeQuestion.id, 'medium')}
                className="px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-xs font-semibold hover:bg-amber-100"
              >
                Moderate
              </button>
              <button
                onClick={() => handleSetConfidence(activeQuestion.id, 'high')}
                className="px-3 py-1.5 rounded-lg border border-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-100"
              >
                High Confidence ✓
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
