import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, CheckCircle2, Sprout, Terminal, Database, Shield, Server, Compass, Sparkles } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { COURSES } from '../data/courses';
import { CRP_INDIA_CASE_STUDY } from '../data/caseStudies';
import Badge from '../components/Badge';
import ProgressBar from '../components/ProgressBar';
import Hero3D from '../components/Hero3D';
import Roadmap3D from '../components/Roadmap3D';

export default function Home() {
  const { completedLessons, lastOpenedLesson, getOverallProgress } = useProgress();
  const overall = getOverallProgress();

  // Determine continue target: last opened lesson or first lesson of course 1
  const resumeLessonSlug = lastOpenedLesson || 'how-websites-work';
  const hasStarted = completedLessons.length > 0 || lastOpenedLesson !== null;

  const availableCourses = COURSES.filter((c) => c.status === 'available');
  const plannedCourses = COURSES.filter((c) => c.status === 'planned');

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section
        style={{
          paddingTop: '3.5rem',
          paddingBottom: '4rem',
          borderBottom: '1px solid var(--color-border)',
          background: 'linear-gradient(180deg, var(--color-bg-subtle) 0%, var(--color-bg-canvas) 100%)'
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: 'var(--color-brand-subtle)',
                border: '1px solid var(--color-brand-border)',
                color: 'var(--color-brand-text)',
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: 600,
                marginBottom: '1.25rem'
              }}
            >
              <Sprout size={16} aria-hidden="true" />
              <span>Dev-root Learning Platform</span>
            </div>

            <h1 style={{ marginBottom: '1.25rem', lineHeight: 1.15 }}>
              Start at the roots.{' '}
              <span style={{ color: 'var(--color-brand-primary)' }}>Build to the full stack.</span>
            </h1>

            <p style={{ fontSize: '1.15rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
              Master full-stack web development from absolute fundamentals to production-grade architecture.
              Every concept is taught from first principles and grounded in real-world application code.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
              <Link to={`/lessons/${resumeLessonSlug}`} className="btn btn-primary btn-lg">
                <span>{hasStarted ? 'Continue Learning' : 'Start with Lesson 1'}</span>
                <ArrowRight size={18} aria-hidden="true" />
              </Link>

              <Link to="/courses" className="btn btn-secondary btn-lg">
                <BookOpen size={18} aria-hidden="true" />
                <span>Explore All {COURSES.length} Courses</span>
              </Link>
            </div>

            {/* Interactive 3D Web Stack Hero Element */}
            <Hero3D />

            {lastOpenedLesson && (
              <div style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                <span>Jump back into your last viewed lesson: </span>
                <Link to={`/lessons/${lastOpenedLesson}`} style={{ fontWeight: 600 }}>
                  {lastOpenedLesson.replace(/-/g, ' ')} →
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Progress & Live Overview Metrics */}
      <section style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
        <div className="container">
          <div className="grid-cols-4">
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Completed Lessons</span>
                <CheckCircle2 size={18} style={{ color: 'var(--color-brand-primary)' }} aria-hidden="true" />
              </div>
              <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                {overall.completed} <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>/ {overall.total}</span>
              </div>
              <ProgressBar percent={overall.percent} />
            </div>

            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Curriculum Coverage</span>
                <Compass size={18} style={{ color: 'var(--color-accent-cyan)' }} aria-hidden="true" />
              </div>
              <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                {COURSES.length} <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Courses</span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>From Absolute Zero to Full-Stack</span>
            </div>

            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Real-World Case Study</span>
                <Server size={18} style={{ color: 'var(--color-accent-purple)' }} aria-hidden="true" />
              </div>
              <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                160 <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Files Audited</span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>CRP India Civic Platform</span>
            </div>

            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Learning Model</span>
                <Sparkles size={18} style={{ color: 'var(--color-warning)' }} aria-hidden="true" />
              </div>
              <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                Offline <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>First</span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Zero Cloud Accounts or Paywalls</span>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Beginner Pathway */}
      <section style={{ paddingTop: '1.5rem', paddingBottom: '3.5rem' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Recommended Starting Point</h2>
              <p style={{ fontSize: '0.95rem' }}>Start here if you are new to web development or want to solidify fundamental mental models.</p>
            </div>
            <Link to="/courses" className="btn btn-ghost btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <span>View Catalogue</span>
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div
            className="card"
            style={{
              padding: '2rem',
              borderLeft: '4px solid var(--color-brand-primary)',
              background: 'linear-gradient(to right, var(--color-brand-subtle) 0%, var(--color-bg-card) 40%)'
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1.5rem' }}>
              <div style={{ maxWidth: '640px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                  <Badge variant="emerald">Available Now</Badge>
                  <Badge variant="muted">Beginner Level</Badge>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>4 Lessons • 2 Hours</span>
                </div>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.6rem' }}>Web & Internet Fundamentals</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  Learn how the internet really works: client-server communication, DNS resolution, HTTP request/response lifecycles, and how browsers parse code into pixels on screen.
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <Link to="/lessons/how-websites-work" className="btn btn-primary btn-sm">
                    <span>Lesson 1: How Websites Work</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                  <Link to="/courses/web-internet-fundamentals" className="btn btn-secondary btn-sm">
                    <span>View Syllabus</span>
                  </Link>
                </div>
              </div>

              {/* Progress Summary for Course 1 */}
              <div style={{ minWidth: '220px', padding: '1rem', backgroundColor: 'var(--color-bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
                  Your Course Progress
                </div>
                <ProgressBar percent={overall.percent} height="10px" showLabel labelText="Course Completion" />
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.75rem' }}>
                  {overall.completed === 0
                    ? 'No lessons completed yet. Ready to start Lesson 1?'
                    : `${overall.completed} of ${overall.total} lessons completed.`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Study Spotlight: CRP India */}
      <section
        style={{
          paddingTop: '3rem',
          paddingBottom: '3.5rem',
          backgroundColor: 'var(--color-bg-subtle)',
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)'
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center', marginBottom: '2.5rem' }}>
            <Badge variant="cyan" style={{ marginBottom: '0.75rem' }}>
              Real-World Case Study
            </Badge>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>
              Learn from Production Code: {CRP_INDIA_CASE_STUDY.title}
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              Instead of relying only on toy examples, Dev-root connects theory to a complete, deployed civic grievance management system.
              Study real schemas, routes, middleware, and React state in a production repository.
            </p>
          </div>

          <div className="grid-cols-3">
            <div className="card">
              <div style={{ color: 'var(--color-brand-primary)', marginBottom: '0.75rem' }}>
                <Terminal size={24} aria-hidden="true" />
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Decoupled Architecture</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                Inspect a clean separation between React 19 frontend and Node.js Express backend communicating over REST APIs.
              </p>
            </div>

            <div className="card">
              <div style={{ color: 'var(--color-accent-cyan)', marginBottom: '0.75rem' }}>
                <Shield size={24} aria-hidden="true" />
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Dual-Portal Auth & RBAC</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                Examine cryptographic password hashing with bcrypt, JWT token verification, and role guards protecting administrative portals.
              </p>
            </div>

            <div className="card">
              <div style={{ color: 'var(--color-accent-purple)', marginBottom: '0.75rem' }}>
                <Database size={24} aria-hidden="true" />
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Mongoose Schemas & Audits</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                Study subdocuments, atomic reference counters (CRP-2026-XXXXX), and chronological audit trail timelines.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/case-studies/crp-india" className="btn btn-secondary">
              <span>Read Full Architecture Deep Dive</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive 3D Learning Roadmap */}
      <section style={{ paddingTop: '3.5rem', paddingBottom: '1rem' }}>
        <div className="container">
          <Roadmap3D />
        </div>
      </section>

      {/* Planned Curriculum Path Grid */}
      <section style={{ paddingTop: '2.5rem', paddingBottom: '3.5rem' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>The Complete Curriculum Progression</h2>
              <p style={{ fontSize: '0.95rem' }}>From absolute beginner foundations to deployed full-stack capstone projects.</p>
            </div>
            <Link to="/courses" className="btn btn-primary btn-sm">
              <span>Browse All Paths</span>
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid-cols-3">
            {COURSES.slice(0, 6).map((course) => (
              <div key={course.id} className="card card-interactive" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <Badge variant={course.status === 'available' ? 'emerald' : 'muted'}>
                    {course.status === 'available' ? 'Available' : 'Planned'}
                  </Badge>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{course.level}</span>
                </div>

                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>{course.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, flex: 1, marginBottom: '1.25rem' }}>
                  {course.description}
                </p>

                <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{course.duration}</span>
                  <Link
                    to={`/courses/${course.slug}`}
                    style={{ fontSize: '0.85rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    <span>View Path</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
