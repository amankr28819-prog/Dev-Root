import React, { useState } from 'react';
import { Terminal, Lightbulb, ChevronDown, ChevronUp, CheckCircle2, Circle, Eye, EyeOff } from 'lucide-react';
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
  solution = null
}) {
  const { isExerciseComplete, toggleExerciseComplete } = useProgress();
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const completed = isExerciseComplete ? isExerciseComplete(id) : false;

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
              Hands-On Exercise
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

      {/* Tasks List */}
      {tasks && tasks.length > 0 && (
        <div style={{ marginBottom: '1.25rem' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
            Exercise Requirements:
          </h4>
          <ol style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>
            {tasks.map((task, idx) => (
              <li key={idx} style={{ lineHeight: 1.5 }}>
                {task}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Starter Code */}
      {starterCode && (
        <div style={{ marginBottom: '1.25rem' }}>
          <CodeBlock code={starterCode} language={language} filename="Starter Code (Copy into your editor)" />
        </div>
      )}

      {/* Collapsible Hints */}
      {hints && hints.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <button
            type="button"
            onClick={() => setShowHints(!showHints)}
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
            aria-expanded={showHints}
          >
            <Lightbulb size={16} aria-hidden="true" />
            <span>{showHints ? 'Hide Hints' : `Need a Hint? (${hints.length} available)`}</span>
            {showHints ? <ChevronUp size={16} aria-hidden="true" /> : <ChevronDown size={16} aria-hidden="true" />}
          </button>

          {showHints && (
            <div
              style={{
                marginTop: '0.75rem',
                padding: '1rem 1.25rem',
                backgroundColor: 'var(--color-bg-surface)',
                border: '1px solid var(--color-warning-border)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem'
              }}
            >
              {hints.map((hint, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  <span style={{ fontWeight: 700, color: 'var(--color-warning-text)' }}>Hint {idx + 1}:</span>
                  <span>{hint}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Collapsible Solution */}
      {solution && (
        <div style={{ marginTop: '1rem' }}>
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
                borderRadius: 'var(--radius-md)'
              }}
            >
              <h5 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: 'var(--color-brand-primary)' }}>
                Reference Solution:
              </h5>
              {solution.explanation && (
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                  {solution.explanation}
                </p>
              )}
              {solution.code && (
                <CodeBlock code={solution.code} language={language} filename="Reference Solution Code" />
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
