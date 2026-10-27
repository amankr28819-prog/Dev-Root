import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, CheckCircle2, Circle, ArrowRight, Lock, Sparkles } from 'lucide-react';
import { COURSES } from '../data/courses';
import { useProgress } from '../context/ProgressContext';
import Badge from './Badge';

export default function Roadmap3D() {
  const { getCourseProgress } = useProgress();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="card roadmap-3d-card" style={{ padding: '2rem 1.5rem', margin: '2.5rem 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <Compass size={22} style={{ color: 'var(--color-brand-primary)' }} aria-hidden="true" />
            <h3 style={{ fontSize: '1.4rem', margin: 0 }}>Interactive 3D Curriculum Roadmap</h3>
          </div>
          <p style={{ fontSize: '0.925rem', color: 'var(--color-text-secondary)', margin: 0 }}>
            Visual zero-to-full-stack progression. Each stage reflects your real-time learning progress.
          </p>
        </div>

        <span className="badge badge-cyan" style={{ fontSize: '0.75rem' }}>
          Real-time Progress Grounded
        </span>
      </div>

      {/* 3D Perspective Ribbon Container */}
      <div
        style={{
          perspective: '1200px',
          padding: '1.5rem 0.5rem'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '1.25rem',
            transformStyle: 'preserve-3d'
          }}
        >
          {COURSES.map((course, idx) => {
            const progress = getCourseProgress(course.slug);
            const isCompleted = progress.percent === 100 && progress.total > 0;
            const isInProgress = progress.completed > 0 && progress.percent < 100;
            const isAvailable = course.status === 'available';
            const isHovered = hoveredIndex === idx;

            return (
              <Link
                key={course.id}
                to={`/courses/${course.slug}`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: isCompleted
                    ? 'rgba(16, 185, 129, 0.12)'
                    : isAvailable
                    ? 'var(--color-bg-card)'
                    : 'var(--color-bg-subtle)',
                  border: isCompleted
                    ? '2px solid var(--color-brand-primary)'
                    : isAvailable
                    ? '1px solid var(--color-border)'
                    : '1px dashed var(--color-border)',
                  transform: isHovered
                    ? 'translateY(-6px) translateZ(24px) scale(1.02)'
                    : 'translateY(0) translateZ(0) scale(1)',
                  boxShadow: isHovered
                    ? '0 16px 32px -8px rgba(0, 0, 0, 0.3), var(--shadow-glow)'
                    : isAvailable
                    ? 'var(--shadow-sm)'
                    : 'none',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Node Top Header */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                    <span
                      style={{
                        width: '1.75rem',
                        height: '1.75rem',
                        borderRadius: '50%',
                        backgroundColor: isCompleted
                          ? 'var(--color-brand-primary)'
                          : isAvailable
                          ? 'var(--color-brand-subtle)'
                          : 'var(--color-bg-surface)',
                        color: isCompleted ? '#ffffff' : 'var(--color-brand-text)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 700
                      }}
                    >
                      {isCompleted ? <CheckCircle2 size={14} /> : idx + 1}
                    </span>

                    <Badge
                      variant={isCompleted ? 'emerald' : isAvailable ? 'cyan' : 'muted'}
                      style={{ fontSize: '0.65rem' }}
                    >
                      {isCompleted ? 'Completed' : isAvailable ? 'Available' : 'Roadmap'}
                    </Badge>
                  </div>

                  <h4 style={{ fontSize: '0.95rem', marginBottom: '0.4rem', color: 'var(--color-text-primary)', lineHeight: 1.35 }}>
                    {course.title.replace(/^Course \d+:\s*/, '')}
                  </h4>
                  <p style={{ fontSize: '0.775rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.4 }}>
                    {course.category} • {course.level}
                  </p>
                </div>

                {/* Node Bottom Progress */}
                <div style={{ marginTop: '1rem', paddingTop: '0.6rem', borderTop: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.75rem', color: isAvailable ? 'var(--color-text-secondary)' : 'var(--color-text-muted)', fontWeight: 500 }}>
                    {isCompleted
                      ? '100% Mastered'
                      : isInProgress
                      ? `${progress.completed}/${progress.total} Lessons`
                      : isAvailable
                      ? `${course.lessons.length} Lessons`
                      : 'Planned'}
                  </span>

                  <span style={{ fontSize: '0.75rem', color: 'var(--color-brand-primary)', display: 'inline-flex', alignItems: 'center', gap: '0.2rem', fontWeight: 600 }}>
                    <span>Explore</span>
                    <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
