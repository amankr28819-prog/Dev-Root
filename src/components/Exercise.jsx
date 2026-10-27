import React, { useState } from 'react';
import { Terminal, Lightbulb, ChevronDown, ChevronUp, CheckCircle2, Circle, Eye, EyeOff, CheckSquare, Square } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import CodeBlock from './CodeBlock';

export default function Exercise({
  id,
  title = 'Interactive Practice Exercise',
  instructions = '',
  tasks = [],
  starterCode = null,
  language = 'javascript',
  hints = [],
  solution = null,
  solutionExplanation = null
}) {
  const { isExerciseComplete, toggleExerciseComplete } = useProgress();
  const [revealedHints, setRevealedHints] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [checkedTasks, setCheckedTasks] = useState({});

  const completed = isExerciseComplete ? isExerciseComplete(id) : false;

  const toggleTask = (idx) => {
    setCheckedTasks((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleRevealNextHint = () => {
    if (revealedHints < hints.length) {
      setRevealedHints(revealedHints + 1);
    } else {
      setRevealedHints(0);
    }
  };

  const hintLevels = [
    'Level 1 (Concept Direction)',
    'Level 2 (Implementation Clue)',
    'Level 3 (Code Structure Guidance)',
    'Level 4 (Detailed Pointer)'
  ];

  return (
    <section
      className="card exercise-card"
      style={{
        marginTop: '2.5rem',
        marginBottom: '2.5rem',
        borderLeft: '4px solid var(--color-brand-primary)',
        background: 'linear-gradient(180deg, var(--color-bg-card) 0%, var(--color-bg-subtle) 100%)'
      }}
    >
      {/* Exercise Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div
            style={{
              padding: '0.4rem',
              backgroundColor: 'var(--color-brand-subtle)',
              color: 'var(--color-brand-text)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Terminal size={20} aria-hidden="true" />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-brand-text)', letterSpacing: '0.05em' }}>
              Hands-On Practice
            </span>
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{title}</h3>
          </div>
        </div>

        {/* Completion Checkbox */}
        <button
          type="button"
          onClick={() => toggleExerciseComplete && toggleExerciseComplete(id)}
          className={`btn btn-sm ${completed ? 'btn-primary' : 'btn-secondary'}`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          aria-pressed={completed}
        >
          {completed ? (
            <>
              <CheckCircle2 size={16} aria-hidden="true" />
              <span>Exercise Solved!</span>
            </>
          ) : (
            <>
              <Circle size={16} aria-hidden="true" />
              <span>Mark as Solved</span>
            </>
          )}
        </button>
      </div>

      {/* Instructions */}
      {instructions && (
        <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
          {instructions}
        </p>
      )}

      {/* Interactive Tasks Checklist */}
      {tasks && tasks.length > 0 && (
        <div style={{ marginBottom: '1.25rem' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '0.6rem', color: 'var(--color-text-primary)' }}>
            Exercise Requirements (Click to check off as you work):
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.925rem', color: 'var(--color-text-secondary)' }}>
            {tasks.map((task, idx) => {
              const isChecked = !!checkedTasks[idx];
              return (
                <li
                  key={idx}
                  onClick={() => toggleTask(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.6rem',
                    cursor: 'pointer',
                    userSelect: 'none',
                    lineHeight: 1.5,
                    textDecoration: isChecked ? 'line-through' : 'none',
                    opacity: isChecked ? 0.7 : 1
                  }}
                >
                  <span style={{ color: isChecked ? 'var(--color-brand-primary)' : 'var(--color-text-muted)', marginTop: '2px', flexShrink: 0 }}>
                    {isChecked ? <CheckSquare size={16} /> : <Square size={16} />}
                  </span>
                  <span>{task}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Starter Code */}
      {starterCode && (
        <div style={{ marginBottom: '1.25rem' }}>
          <CodeBlock code={starterCode} language={language} filename="Starter Code (Copy into your editor)" />
        </div>
      )}

      {/* Progressive Multi-Tier Hints */}
      {hints && hints.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleRevealNextHint}
              className="btn btn-ghost btn-sm"
              style={{
                padding: '0.4rem 0.75rem',
                color: 'var(--color-warning-text)',
                backgroundColor: 'var(--color-warning-bg)',
                border: '1px solid var(--color-warning-border)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
              aria-expanded={revealedHints > 0}
            >
              <Lightbulb size={16} aria-hidden="true" />
              <span>
                {revealedHints === 0
                  ? `Need a Hint? (${hints.length} progressive levels)`
                  : revealedHints < hints.length
                  ? `Reveal Next Hint (${revealedHints + 1} of ${hints.length})`
                  : 'Hide All Hints'}
              </span>
            </button>

            {revealedHints > 0 && revealedHints < hints.length && (
              <button
                type="button"
                onClick={() => setRevealedHints(0)}
                className="btn btn-ghost btn-sm"
                style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}
              >
                Hide Hints
              </button>
            )}
          </div>

          {/* Progressive Hint Drawers */}
          {revealedHints > 0 && (
            <div
              style={{
                marginTop: '0.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem'
              }}
            >
              {hints.slice(0, revealedHints).map((hint, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '0.85rem 1.15rem',
                    backgroundColor: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-warning-border)',
                    borderLeft: '4px solid var(--color-warning)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.6rem',
                    fontSize: '0.9rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.5,
                    animation: 'fadeIn 0.25s ease'
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 700, color: 'var(--color-warning-text)', display: 'block', marginBottom: '0.15rem' }}>
                      {hintLevels[idx] || `Hint ${idx + 1}`}:
                    </span>
                    <span>{hint}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Collapsible Reference Solution */}
      {solution && (
        <div style={{ marginTop: '1.25rem' }}>
          <button
            type="button"
            onClick={() => setShowSolution(!showSolution)}
            className="btn btn-ghost btn-sm"
            style={{
              padding: '0.4rem 0.75rem',
              color: 'var(--color-text-muted)',
              border: '1px solid var(--color-border)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
            aria-expanded={showSolution}
          >
            {showSolution ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
            <span>{showSolution ? 'Hide Solution' : 'Reveal Reference Solution'}</span>
          </button>

          {showSolution && (
            <div
              style={{
                marginTop: '0.75rem',
                padding: '1.25rem',
                backgroundColor: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                animation: 'fadeIn 0.25s ease'
              }}
            >
              <h5 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: 'var(--color-brand-primary)' }}>
                Reference Solution & Architecture Walkthrough:
              </h5>
              {(solution.explanation || solutionExplanation) && (
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                  {solution.explanation || solutionExplanation}
                </p>
              )}
              {(solution.code || typeof solution === 'string') && (
                <CodeBlock
                  code={typeof solution === 'string' ? solution : solution.code}
                  language={language}
                  filename="Reference Solution Code"
                />
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
