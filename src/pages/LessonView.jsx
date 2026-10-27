import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, Circle, ArrowLeft, ArrowRight, Clock, BookOpen, ExternalLink, Lightbulb, Code2 } from 'lucide-react';
import { LESSONS } from '../data/lessons';
import { useProgress } from '../context/ProgressContext';
import Breadcrumbs from '../components/Breadcrumbs';
import Badge from '../components/Badge';
import CodeBlock from '../components/CodeBlock';

export default function LessonView() {
  const { slug } = useParams();
  const { isLessonComplete, toggleLessonComplete, setLastOpenedLesson } = useProgress();

  const lesson = LESSONS[slug];

  useEffect(() => {
    if (slug && LESSONS[slug]) {
      setLastOpenedLesson(slug);
    }
  }, [slug, setLastOpenedLesson]);

  if (!lesson) {
    return (
      <div className="container" style={{ paddingTop: '3rem', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '1rem' }}>Lesson Not Found</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
          The requested lesson does not exist or has not been authored yet.
        </p>
        <Link to="/courses" className="btn btn-primary">
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Back to Courses</span>
        </Link>
      </div>
    );
  }

  const isCompleted = isLessonComplete(lesson.id);

  return (
    <div className="lesson-view-page" style={{ paddingTop: '1.5rem' }}>
      <div className="container-narrow">
        {/* Navigation Breadcrumb */}
        <Breadcrumbs
          items={[
            { label: 'Courses', href: '/courses' },
            { label: lesson.courseTitle, href: `/courses/${lesson.courseSlug}` },
            { label: lesson.title }
          ]}
        />

        {/* Lesson Header */}
        <div style={{ marginBottom: '2.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
            <Link to={`/courses/${lesson.courseSlug}`}>
              <Badge variant="cyan">{lesson.courseTitle}</Badge>
            </Link>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
              <Clock size={14} aria-hidden="true" />
              <span>{lesson.estimatedMinutes} min read</span>
            </span>
          </div>

          <h1 style={{ fontSize: '2.25rem', marginBottom: '1rem', lineHeight: 1.2 }}>
            {lesson.title}
          </h1>

          <p style={{ fontSize: '1.15rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            {lesson.summary}
          </p>

          {/* Completion Toggle Button */}
          <div style={{ marginTop: '1.5rem' }}>
            <button
              type="button"
              onClick={() => toggleLessonComplete(lesson.id)}
              className={`btn ${isCompleted ? 'btn-primary' : 'btn-secondary'}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              aria-pressed={isCompleted}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 size={18} aria-hidden="true" />
                  <span>Completed (Click to Reopen)</span>
                </>
              ) : (
                <>
                  <Circle size={18} aria-hidden="true" />
                  <span>Mark as Complete</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Learning Objectives Box */}
        <div
          className="card"
          style={{
            marginBottom: '2.5rem',
            backgroundColor: 'var(--color-bg-subtle)',
            borderLeft: '4px solid var(--color-brand-primary)'
          }}
        >
          <h3 style={{ fontSize: '1.05rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Lightbulb size={18} style={{ color: 'var(--color-brand-primary)' }} aria-hidden="true" />
            <span>Learning Objectives</span>
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>
            {lesson.objectives.map((obj, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <span style={{ color: 'var(--color-brand-primary)', fontWeight: 700 }}>✓</span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Lesson Body Content Sections */}
        <article className="lesson-content" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {lesson.sections.map((section, idx) => (
            <section key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--color-text-primary)' }}>
                {section.heading}
              </h2>

              <div
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.8,
                  color: 'var(--color-text-secondary)',
                  whiteSpace: 'pre-line'
                }}
              >
                {section.content}
              </div>

              {/* ASCII Diagram if present */}
              {section.diagram && (
                <div style={{ margin: '1rem 0' }}>
                  <CodeBlock code={section.diagram} language="diagram" filename="Architecture Flow" />
                </div>
              )}

              {/* Code Snippet if present */}
              {section.codeSnippet && (
                <div style={{ margin: '1rem 0' }}>
                  <CodeBlock code={section.codeSnippet} language="javascript" filename="Code Example" />
                </div>
              )}
            </section>
          ))}
        </article>

        {/* Case Study Reference Card */}
        {lesson.caseStudyReference && (
          <div
            className="card"
            style={{
              marginTop: '3rem',
              marginBottom: '2.5rem',
              borderLeft: '4px solid var(--color-accent-purple)',
              background: 'linear-gradient(135deg, var(--color-bg-card) 0%, var(--color-bg-subtle) 100%)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Badge variant="cyan">Real-World Case Study</Badge>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>CRP India Reference</span>
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
              {lesson.caseStudyReference.title}
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
              {lesson.caseStudyReference.description}
            </p>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Relevant Reference Codebase Files:
              </span>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {lesson.caseStudyReference.files.map((file, i) => (
                  <li key={i}>
                    <code style={{ fontSize: '0.85rem', color: 'var(--color-brand-primary)', backgroundColor: 'var(--color-bg-surface)', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                      {file}
                    </code>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ marginTop: '1.25rem' }}>
              <Link to="/case-studies/crp-india" style={{ fontSize: '0.85rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                <span>Read Full CRP India Architecture Breakdown</span>
                <ExternalLink size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        )}

        {/* Key Takeaways */}
        <div
          className="card"
          style={{
            marginBottom: '3rem',
            backgroundColor: 'var(--color-bg-surface)',
            border: '1px solid var(--color-brand-border)'
          }}
        >
          <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem', color: 'var(--color-brand-primary)' }}>
            Key Takeaways
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.95rem', color: 'var(--color-text-primary)' }}>
            {lesson.takeaways.map((takeaway, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <span style={{ color: 'var(--color-brand-primary)', fontWeight: 700 }}>•</span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Interactive Practice Sandbox Placeholder (Phase 2 Roadmap item) */}
        <div
          className="card"
          style={{
            marginBottom: '3rem',
            padding: '1.5rem',
            backgroundColor: 'var(--color-bg-subtle)',
            border: '1px dashed var(--color-border-subtle)',
            textAlign: 'center'
          }}
        >
          <Code2 size={28} style={{ color: 'var(--color-text-muted)', margin: '0 auto 0.5rem' }} aria-hidden="true" />
          <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Interactive Exercise Sandbox</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', maxWidth: '480px', margin: '0 auto' }}>
            In-browser code execution and automated unit test verifiers for this lesson will activate in <strong>Phase 2</strong>.
          </p>
        </div>

        {/* Previous / Next Lesson Footer Navigation */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--color-border)'
          }}
        >
          {lesson.prevLessonSlug ? (
            <Link to={`/lessons/${lesson.prevLessonSlug}`} className="btn btn-secondary">
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Previous Lesson</span>
            </Link>
          ) : (
            <Link to={`/courses/${lesson.courseSlug}`} className="btn btn-secondary">
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Course Syllabus</span>
            </Link>
          )}

          <button
            type="button"
            onClick={() => toggleLessonComplete(lesson.id)}
            className={`btn ${isCompleted ? 'btn-ghost' : 'btn-primary'}`}
          >
            {isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
          </button>

          {lesson.nextLessonSlug ? (
            <Link to={`/lessons/${lesson.nextLessonSlug}`} className="btn btn-primary">
              <span>Next Lesson</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          ) : (
            <Link to="/courses" className="btn btn-secondary">
              <span>Explore More Courses</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
