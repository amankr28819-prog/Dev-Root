import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import CodeBlock from './CodeBlock';

export default function Quiz({ lessonId, questions = [] }) {
  const { recordQuizScore, getQuizScore } = useProgress();
  const existingScore = getQuizScore ? getQuizScore(lessonId) : null;

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!questions || questions.length === 0) return null;

  const handleSelect = (qIdx, optIdx) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [qIdx]: optIdx
    }));
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const isComplete = answeredCount === questions.length;

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isComplete) return;

    const score = calculateScore();
    setSubmitted(true);
    if (recordQuizScore) {
      recordQuizScore(lessonId, score, questions.length);
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const score = submitted ? calculateScore() : 0;
  const percentage = submitted ? Math.round((score / questions.length) * 100) : 0;

  return (
    <section className="card quiz-card" style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <HelpCircle size={22} style={{ color: 'var(--color-brand-primary)' }} aria-hidden="true" />
          <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Knowledge Check Quiz</h3>
        </div>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
          {questions.length} Question{questions.length > 1 ? 's' : ''}
        </span>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {questions.map((q, qIdx) => {
          const userChoice = selectedAnswers[qIdx];
          const isCorrect = submitted && userChoice === q.correctIndex;
          const isIncorrect = submitted && userChoice !== undefined && userChoice !== q.correctIndex;

          return (
            <div
              key={q.id || qIdx}
              className="quiz-question-box"
              style={{
                padding: '1.25rem',
                backgroundColor: 'var(--color-bg-subtle)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '0.85rem' }}>
                <span
                  style={{
                    backgroundColor: 'var(--color-brand-subtle)',
                    color: 'var(--color-brand-text)',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    padding: '0.2rem 0.55rem',
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  Q{qIdx + 1}
                </span>
                <p style={{ fontWeight: 600, color: 'var(--color-text-primary)', margin: 0, fontSize: '1.05rem', lineHeight: 1.45 }}>
                  {q.question}
                </p>
              </div>

              {q.codeSnippet && (
                <div style={{ margin: '0.75rem 0' }}>
                  <CodeBlock code={q.codeSnippet} language="javascript" filename="Code snippet to inspect" />
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.75rem' }}>
                {q.options.map((option, optIdx) => {
                  const isSelected = userChoice === optIdx;
                  let optionStyle = {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg-card)',
                    color: 'var(--color-text-primary)',
                    cursor: submitted ? 'default' : 'pointer',
                    transition: 'all var(--transition-fast)',
                    textAlign: 'left',
                    fontSize: '0.95rem'
                  };

                  if (isSelected && !submitted) {
                    optionStyle.borderColor = 'var(--color-brand-primary)';
                    optionStyle.backgroundColor = 'var(--color-brand-subtle)';
                  }

                  if (submitted) {
                    if (optIdx === q.correctIndex) {
                      optionStyle.borderColor = 'var(--color-brand-primary)';
                      optionStyle.backgroundColor = 'rgba(16, 185, 129, 0.15)';
                      optionStyle.color = 'var(--color-text-primary)';
                    } else if (isSelected && optIdx !== q.correctIndex) {
                      optionStyle.borderColor = 'var(--color-error)';
                      optionStyle.backgroundColor = 'rgba(239, 68, 68, 0.12)';
                    } else {
                      optionStyle.opacity = 0.6;
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelect(qIdx, optIdx)}
                      style={optionStyle}
                      disabled={submitted}
                      className={!submitted ? 'quiz-option-hover' : ''}
                      aria-pressed={isSelected}
                    >
                      <span
                        style={{
                          width: '1.4rem',
                          height: '1.4rem',
                          borderRadius: '50%',
                          border: isSelected ? '2px solid var(--color-brand-primary)' : '1px solid var(--color-border)',
                          backgroundColor: isSelected ? 'var(--color-brand-primary)' : 'transparent',
                          color: '#ffffff',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          flexShrink: 0
                        }}
                      >
                        {submitted && optIdx === q.correctIndex ? '✓' : String.fromCharCode(65 + optIdx)}
                      </span>
                      <span style={{ flex: 1 }}>{option}</span>
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div
                  style={{
                    marginTop: '1rem',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: isCorrect ? 'var(--color-brand-subtle)' : 'rgba(239, 68, 68, 0.1)',
                    borderLeft: `4px solid ${isCorrect ? 'var(--color-brand-primary)' : 'var(--color-error)'}`,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.6rem'
                  }}
                >
                  {isCorrect ? (
                    <CheckCircle2 size={18} style={{ color: 'var(--color-brand-primary)', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                  ) : (
                    <XCircle size={18} style={{ color: 'var(--color-error)', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                  )}
                  <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                    <strong style={{ color: isCorrect ? 'var(--color-brand-text)' : 'var(--color-error)', display: 'block', marginBottom: '0.2rem' }}>
                      {isCorrect ? 'Correct!' : 'Not quite right.'}
                    </strong>
                    {q.explanation}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Submit or Score Footer */}
        {!submitted ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Answered {answeredCount} of {questions.length} question{questions.length > 1 ? 's' : ''}
            </span>
            <button
              type="submit"
              disabled={!isComplete}
              className="btn btn-primary"
              style={{ opacity: isComplete ? 1 : 0.6, cursor: isComplete ? 'pointer' : 'not-allowed' }}
            >
              <span>Submit Answers</span>
            </button>
          </div>
        ) : (
          <div
            style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: percentage >= 70 ? 'var(--color-brand-subtle)' : 'var(--color-bg-subtle)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Award size={28} style={{ color: percentage >= 70 ? 'var(--color-brand-primary)' : 'var(--color-text-muted)' }} aria-hidden="true" />
              <div>
                <h4 style={{ margin: 0, fontSize: '1.1rem' }}>
                  Score: {score} / {questions.length} ({percentage}%)
                </h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  {percentage === 100
                    ? 'Perfect understanding! You have mastered these concepts.'
                    : percentage >= 70
                    ? 'Good job! Review the explanations above to solidify any tricky points.'
                    : 'Good attempt. Review the lesson sections and try again to improve your score.'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRetry}
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <RotateCcw size={14} aria-hidden="true" />
              <span>Try Again</span>
            </button>
          </div>
        )}
      </form>
    </section>
  );
}
