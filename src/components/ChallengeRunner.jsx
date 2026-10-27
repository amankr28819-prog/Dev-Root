import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Copy, Check, Lightbulb, CheckCircle2, XCircle, Eye, EyeOff, Award, AlertTriangle, Code2 } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import CodeBlock from './CodeBlock';

export default function ChallengeRunner({ challenge }) {
  const { isChallengeComplete, recordChallengeAttempt } = useProgress();
  const [code, setCode] = useState(challenge.starterCode || '');
  const [revealedHints, setRevealedHints] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const isCompleted = isChallengeComplete(challenge.id);

  // Sync starter code when challenge changes
  useEffect(() => {
    setCode(challenge.starterCode || '');
    setRevealedHints(0);
    setShowSolution(false);
    setTestResult(null);
  }, [challenge.id, challenge.starterCode]);

  const handleReset = () => {
    setCode(challenge.starterCode || '');
    setTestResult(null);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn('Copy failed', e);
    }
  };

  const handleRevealNextHint = () => {
    if (revealedHints < (challenge.hints?.length || 0)) {
      setRevealedHints(revealedHints + 1);
    } else {
      setRevealedHints(0);
    }
  };

  // Evaluate the code against testCriteria
  const handleRunTests = () => {
    const { testCriteria } = challenge;
    let passed = true;
    const errors = [];
    const feedback = [];

    if (!testCriteria) {
      // Basic fallback evaluation
      if (code.trim().length > 20) {
        passed = true;
        feedback.push('Code submitted successfully! Compare with the reference solution to review best practices.');
      } else {
        passed = false;
        errors.push('Your code is too brief. Implement the requested requirements.');
      }
    } else if (testCriteria.type === 'html') {
      // HTML Evaluation using DOMParser
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(code, 'text/html');

        if (testCriteria.requiredTags) {
          testCriteria.requiredTags.forEach(tag => {
            const found = doc.querySelector(tag);
            if (!found) {
              passed = false;
              errors.push(`Missing required HTML element: <${tag}>.`);
            } else {
              feedback.push(`Found required element: <${tag}>.`);
            }
          });
        }

        if (testCriteria.attributes) {
          Object.entries(testCriteria.attributes).forEach(([tag, attrs]) => {
            const el = doc.querySelector(tag);
            if (el) {
              attrs.forEach(attr => {
                if (!el.hasAttribute(attr)) {
                  passed = false;
                  errors.push(`The <${tag}> element is missing the required attribute: '${attr}'.`);
                } else {
                  feedback.push(`Attribute '${attr}' correctly present on <${tag}>.`);
                }
              });
            }
          });
        }

        if (testCriteria.minParagraphs) {
          const pCount = doc.querySelectorAll('p').length;
          if (pCount < testCriteria.minParagraphs) {
            passed = false;
            errors.push(`Expected at least ${testCriteria.minParagraphs} paragraphs (<p>), but found ${pCount}.`);
          }
        }
      } catch (err) {
        passed = false;
        errors.push(`HTML Parser Error: ${err.message}`);
      }
    } else if (testCriteria.type === 'css') {
      // CSS Evaluation
      if (testCriteria.requiredProperties) {
        Object.entries(testCriteria.requiredProperties).forEach(([selector, props]) => {
          // Check if selector exists in code
          if (!code.includes(selector)) {
            passed = false;
            errors.push(`Missing CSS rule for selector '${selector}'.`);
          } else {
            props.forEach(prop => {
              if (!code.includes(prop)) {
                passed = false;
                errors.push(`Rule '${selector}' appears to be missing property '${prop}'.`);
              } else {
                feedback.push(`Found property '${prop}' in '${selector}'.`);
              }
            });
          }
        });
      }
    } else if (testCriteria.type === 'javascript') {
      // Safe JavaScript Function evaluation
      try {
        const funcName = testCriteria.functionName;
        // Construct sandbox scope
        const factory = new Function(`
          ${code};
          return typeof ${funcName} !== 'undefined' ? ${funcName} : null;
        `);
        const userFn = factory();

        if (typeof userFn !== 'function') {
          passed = false;
          errors.push(`Function '${funcName}' is not defined or is not a function.`);
        } else if (testCriteria.testCases && testCriteria.testCases.length > 0) {
          testCriteria.testCases.forEach((tc, idx) => {
            const result = userFn(...tc.input);
            const resultStr = JSON.stringify(result);
            const expectedStr = JSON.stringify(tc.expected);

            if (resultStr !== expectedStr) {
              passed = false;
              errors.push(`Test Case #${idx + 1} Failed: Expected ${expectedStr}, but got ${resultStr}.`);
            } else {
              feedback.push(`Test Case #${idx + 1} Passed!`);
            }
          });
        } else {
          feedback.push(`Function '${funcName}' compiled and exported successfully.`);
        }
      } catch (err) {
        passed = false;
        errors.push(`JavaScript Runtime Exception: ${err.message}`);
      }
    }

    setTestResult({
      passed,
      errors,
      feedback,
      timestamp: Date.now()
    });

    if (recordChallengeAttempt) {
      recordChallengeAttempt(challenge.id, passed, revealedHints);
    }
  };

  return (
    <div className="card challenge-runner" style={{ marginTop: '1.5rem', padding: '1.5rem' }}>
      {/* Editor Header Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Code2 size={20} style={{ color: 'var(--color-brand-primary)' }} aria-hidden="true" />
          <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Interactive Code Editor</h4>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={handleCopy}
            className="btn btn-secondary btn-sm"
            title="Copy code to clipboard"
          >
            {copied ? <Check size={14} style={{ color: 'var(--color-accent-green)' }} /> : <Copy size={14} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-secondary btn-sm"
            title="Reset code to starter template"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Code Textarea Editor */}
      <div style={{ position: 'relative', marginBottom: '1rem' }}>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={12}
          spellCheck={false}
          style={{
            width: '100%',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: '0.925rem',
            lineHeight: 1.5,
            padding: '1rem',
            backgroundColor: 'var(--color-bg-subtle)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            boxSizing: 'border-box',
            resize: 'vertical'
          }}
          aria-label="Challenge code input"
        />
      </div>

      {/* Action Buttons Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <button
          type="button"
          onClick={handleRunTests}
          className="btn btn-primary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}
        >
          <Play size={16} aria-hidden="true" fill="currentColor" />
          <span>Run Tests & Check Code</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {challenge.hints && challenge.hints.length > 0 && (
            <button
              type="button"
              onClick={handleRevealNextHint}
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <Lightbulb size={14} style={{ color: '#eab308' }} aria-hidden="true" />
              <span>
                {revealedHints === 0
                  ? 'Get Hint'
                  : revealedHints < challenge.hints.length
                  ? `Next Hint (${revealedHints}/${challenge.hints.length})`
                  : 'Hide Hints'}
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowSolution(!showSolution)}
            className="btn btn-secondary btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
          >
            {showSolution ? <EyeOff size={14} /> : <Eye size={14} />}
            <span>{showSolution ? 'Hide Solution' : 'Reveal Solution'}</span>
          </button>
        </div>
      </div>

      {/* Test Results Output Banner */}
      {testResult && (
        <div
          role="region"
          aria-live="polite"
          style={{
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
            backgroundColor: testResult.passed ? 'rgba(34, 197, 94, 0.08)' : 'rgba(239, 68, 68, 0.08)',
            border: `1px solid ${testResult.passed ? 'var(--color-accent-green)' : 'var(--color-accent-red)'}`
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            {testResult.passed ? (
              <>
                <CheckCircle2 size={20} style={{ color: 'var(--color-accent-green)' }} />
                <strong style={{ color: 'var(--color-accent-green)', fontSize: '1.05rem' }}>All Tests Passed! Challenge Completed.</strong>
              </>
            ) : (
              <>
                <XCircle size={20} style={{ color: 'var(--color-accent-red)' }} />
                <strong style={{ color: 'var(--color-accent-red)', fontSize: '1.05rem' }}>Tests Failed. Review the feedback below:</strong>
              </>
            )}
          </div>

          {testResult.errors.length > 0 && (
            <ul style={{ margin: '0.5rem 0', paddingLeft: '1.25rem', color: 'var(--color-accent-red)', fontSize: '0.9rem' }}>
              {testResult.errors.map((err, i) => (
                <li key={i} style={{ marginBottom: '0.35rem' }}>{err}</li>
              ))}
            </ul>
          )}

          {testResult.feedback.length > 0 && (
            <ul style={{ margin: '0.5rem 0', paddingLeft: '1.25rem', color: 'var(--color-accent-green)', fontSize: '0.9rem' }}>
              {testResult.feedback.map((msg, i) => (
                <li key={i} style={{ marginBottom: '0.35rem' }}>{msg}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Progressive Hints Drawer */}
      {revealedHints > 0 && challenge.hints && (
        <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'rgba(234, 179, 8, 0.08)', border: '1px solid #eab308', borderRadius: 'var(--radius-md)' }}>
          <h5 style={{ margin: '0 0 0.5rem 0', color: '#a16207', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Lightbulb size={16} />
            <span>Progressive Hints Revealed ({revealedHints}/{challenge.hints.length})</span>
          </h5>
          <ol style={{ margin: 0, paddingLeft: '1.25rem' }}>
            {challenge.hints.slice(0, revealedHints).map((hint, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-primary)' }}>
                {hint}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Reference Solution Drawer */}
      {showSolution && challenge.solution && (
        <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem' }}>
          <h5 style={{ margin: '0 0 0.75rem 0', color: 'var(--color-brand-primary)' }}>Official Reference Solution</h5>
          <CodeBlock code={challenge.solution} language={challenge.category === 'html' ? 'html' : challenge.category === 'css' ? 'css' : 'javascript'} />
          {challenge.solutionExplanation && (
            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              <strong>Why This Solution Works:</strong>
              <p style={{ margin: '0.35rem 0 0 0' }}>{challenge.solutionExplanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
