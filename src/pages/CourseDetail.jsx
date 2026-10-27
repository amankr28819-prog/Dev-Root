import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { BookOpen, CheckCircle2, Clock, ArrowRight, ShieldCheck, Award, ArrowLeft } from 'lucide-react';
import { COURSES } from '../data/courses';
import { useProgress } from '../context/ProgressContext';
import Breadcrumbs from '../components/Breadcrumbs';
import Badge from '../components/Badge';
import ProgressBar from '../components/ProgressBar';

export default function CourseDetail() {
  const { slug } = useParams();
  const { isLessonComplete, getCourseProgress } = useProgress();

  const course = COURSES.find((c) => c.slug === slug);

  if (!course) {
    return (
      <div className="container" style={{ paddingTop: '3rem', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '1rem' }}>Course Not Found</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
          The requested course pathway does not exist.
        </p>
        <Link to="/courses" className="btn btn-primary">
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Back to Course Catalogue</span>
        </Link>
      </div>
    );
  }

  const isAvailable = course.status === 'available';
  const progress = getCourseProgress(course.slug);

  return (
    <div className="course-detail-page" style={{ paddingTop: '1.5rem' }}>
      <div className="container">
        {/* Breadcrumb Hierarchy */}
        <Breadcrumbs
          items={[
            { label: 'Courses', href: '/courses' },
            { label: course.title }
          ]}
        />

        {/* Course Header Banner */}
        <div
          className="card"
          style={{
            padding: '2.5rem',
            marginBottom: '2.5rem',
            borderLeft: isAvailable ? '4px solid var(--color-brand-primary)' : '4px solid var(--color-border)',
            background: isAvailable
              ? 'linear-gradient(135deg, var(--color-brand-subtle) 0%, var(--color-bg-card) 50%)'
              : 'var(--color-bg-card)'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
            <Badge variant={isAvailable ? 'emerald' : 'muted'}>
              {isAvailable ? 'Available Now' : 'Planned Path'}
            </Badge>
            <Badge variant="cyan">{course.category}</Badge>
            <Badge variant="muted">{course.level}</Badge>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{course.duration}</span>
          </div>

          <h1 style={{ marginBottom: '1rem', fontSize: '2.2rem' }}>{course.title}</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, maxWidth: '820px', marginBottom: '1.5rem' }}>
            {course.description}
          </p>

          {/* Progress Bar for available course */}
          {isAvailable && (
            <div style={{ maxWidth: '420px', marginBottom: '1.5rem' }}>
              <ProgressBar
                percent={progress.percent}
                height="10px"
                showLabel
                labelText={`Course Completion (${progress.completed}/${progress.total} Lessons)`}
              />
            </div>
          )}

          {isAvailable && course.lessons.length > 0 && (
            <div>
              <Link to={`/lessons/${course.lessons[0].slug}`} className="btn btn-primary btn-lg">
                <span>Start First Lesson</span>
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>

        {/* Content Layout: 2 Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
            gap: '2rem'
          }}
          className="course-content-grid"
        >
          {/* Main Column: Syllabus / Lessons */}
          <div>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '1.25rem' }}>Course Syllabus</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {course.lessons.map((lesson, idx) => {
                const completed = isLessonComplete(lesson.id);
                const lessonAvailable = lesson.status === 'available';

                return (
                  <div
                    key={lesson.id}
                    className="card"
                    style={{
                      padding: '1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      borderColor: completed ? 'var(--color-brand-border)' : 'var(--color-border)',
                      backgroundColor: completed ? 'var(--color-brand-subtle)' : 'var(--color-bg-card)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div
                        style={{
                          width: '2.25rem',
                          height: '2.25rem',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: completed
                            ? 'var(--color-brand-primary)'
                            : 'var(--color-bg-subtle)',
                          color: completed ? '#ffffff' : 'var(--color-text-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.85rem'
                        }}
                      >
                        {completed ? <CheckCircle2 size={16} aria-hidden="true" /> : idx + 1}
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                          <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
                            {lesson.title}
                          </span>
                          {!lessonAvailable && (
                            <Badge variant="muted" style={{ fontSize: '0.7rem' }}>
                              Planned
                            </Badge>
                          )}
                        </div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                          Estimated reading time: {lesson.duration}
                        </span>
                      </div>
                    </div>

                    <div>
                      {lessonAvailable ? (
                        <Link
                          to={`/lessons/${lesson.slug}`}
                          className={`btn btn-sm ${completed ? 'btn-secondary' : 'btn-primary'}`}
                        >
                          <span>{completed ? 'Review' : 'Start'}</span>
                          <ArrowRight size={14} aria-hidden="true" />
                        </Link>
                      ) : (
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                          Roadmap: Scheduled
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar Column: Objectives & Prerequisites */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="card">
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Award size={18} style={{ color: 'var(--color-brand-primary)' }} aria-hidden="true" />
                <span>Learning Objectives</span>
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                {course.objectives.map((obj, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--color-brand-primary)', fontWeight: 700 }}>✓</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={18} style={{ color: 'var(--color-accent-cyan)' }} aria-hidden="true" />
                <span>Prerequisites</span>
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                {course.prerequisites}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .course-content-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
