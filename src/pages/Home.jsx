import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Sprout,
  Compass,
  Sparkles,
  Code2,
  Rocket,
  Award,
  Flame,
  Bookmark,
  Server
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { COURSES } from '../data/courses';
import { challenges } from '../data/challenges';
import { projects } from '../data/projects';
import { assessments } from '../data/assessments';
import Badge from '../components/Badge';
import ProgressBar from '../components/ProgressBar';
import Hero3D from '../components/Hero3D';
import Roadmap3D from '../components/Roadmap3D';

export default function Home() {
  const {
    completedLessons,
    lastOpenedLesson,
    getOverallProgress,
    completedChallenges,
    projectMilestones,
    assessmentScores,
    bookmarkedLessons,
    streakData,
    getRecommendedNextStep
  } = useProgress();

  const overall = getOverallProgress();
  const nextStep = getRecommendedNextStep();

  // Determine continue target: last opened lesson or first lesson of course 1
  const resumeLessonSlug = lastOpenedLesson || 'how-websites-work';
  const hasStarted = completedLessons.length > 0 || lastOpenedLesson !== null;

  // Calculate challenge completion count
  const solvedChallengesCount = Object.keys(completedChallenges || {}).filter((k) => completedChallenges[k]).length;

  // Calculate project milestones count
  let completedMilestonesCount = 0;
  let totalMilestonesCount = 0;
  projects.forEach((proj) => {
    totalMilestonesCount += proj.milestones?.length || 0;
    const completedForProj = Object.keys(projectMilestones || {}).filter(
      (k) => k.startsWith(`${proj.id}-m`) && projectMilestones[k]
    ).length;
    completedMilestonesCount += completedForProj;
  });

  // Calculate assessments taken count
  const assessmentsAttemptedCount = Object.keys(assessmentScores || {}).length;
  const bookmarkedCount = Object.keys(bookmarkedLessons || {}).filter((k) => bookmarkedLessons[k]).length;

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
              Solve coding challenges, complete real-world projects, test your knowledge, and study with deep explanations.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
              <Link to={`/lessons/${resumeLessonSlug}`} className="btn btn-primary btn-lg">
                <span>{hasStarted ? 'Continue Learning' : 'Start with Lesson 1'}</span>
                <ArrowRight size={18} aria-hidden="true" />
              </Link>

              <Link to="/challenges" className="btn btn-secondary btn-lg">
                <Code2 size={18} aria-hidden="true" />
                <span>Coding Challenges ({challenges.length})</span>
              </Link>

              <Link to="/projects" className="btn btn-secondary btn-lg">
                <Rocket size={18} aria-hidden="true" />
                <span>10-Tier Projects</span>
              </Link>
            </div>

            {/* Interactive 3D Web Stack Hero Element */}
            <Hero3D />

            {/* Recommended Next Step Box */}
            {nextStep && (
              <div
                style={{
                  marginTop: '2rem',
                  padding: '1rem 1.5rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg-card)',
                  border: '1px solid var(--color-brand-border)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  textAlign: 'left',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
                }}
              >
                <div style={{ backgroundColor: 'var(--color-brand-subtle)', padding: '0.5rem', borderRadius: '50%', color: 'var(--color-brand-primary)' }}>
                  <Sparkles size={18} />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-brand-text)', display: 'block' }}>
                    Recommended Next Step
                  </span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {nextStep.title} ({nextStep.courseTitle})
                  </span>
                </div>
                <Link
                  to={`/lessons/${nextStep.slug}`}
                  className="btn btn-primary btn-sm"
                  style={{ marginLeft: '1rem' }}
                >
                  Resume →
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Progress & Live Overview Metrics (Phase 5 Upgraded) */}
      <section style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
        <div className="container">
          <div className="grid-cols-4">
            {/* Completed Lessons Card */}
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

            {/* Coding Challenges Card */}
            <Link to="/challenges" className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Coding Challenges</span>
                <Code2 size={18} style={{ color: 'var(--color-accent-cyan)' }} aria-hidden="true" />
              </div>
              <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                {solvedChallengesCount} <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>/ {challenges.length}</span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-brand-primary)', fontWeight: 600 }}>Solve Challenges →</span>
            </Link>

            {/* 10-Tier Projects Card */}
            <Link to="/projects" className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Project Milestones</span>
                <Rocket size={18} style={{ color: 'var(--color-accent-purple)' }} aria-hidden="true" />
              </div>
              <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                {completedMilestonesCount} <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>/ {totalMilestonesCount}</span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-accent-purple)', fontWeight: 600 }}>10 Progressive Tiers →</span>
            </Link>

            {/* Learning Streak Card */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Learning Streak</span>
                <Flame size={18} style={{ color: '#f59e0b' }} aria-hidden="true" />
              </div>
              <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                {streakData.count || 1} <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Day{streakData.count > 1 ? 's' : ''}</span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Consistent Daily Practice</span>
            </div>
          </div>
        </div>
      </section>

      {/* Phase 5 Interactive Ecosystem Showcase */}
      <section style={{ paddingTop: '1.5rem', paddingBottom: '3.5rem' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Interactive Learning Ecosystem</h2>
              <p style={{ fontSize: '0.95rem' }}>Practical tools, coding labs, assessments, and revision built directly into your browser.</p>
            </div>
          </div>

          <div className="grid-cols-3" style={{ gap: '1.5rem' }}>
            {/* Box 1: Coding Challenges */}
            <div className="card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(79, 70, 229, 0.1)', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <Code2 size={24} />
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Hands-On Coding Challenges</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  Solve structured problem statements in HTML, CSS, JavaScript, and React with automated tests, instant diagnostic feedback, and progressive hints.
                </p>
              </div>
              <Link to="/challenges" className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-start' }}>
                Explore Challenges ({challenges.length}) →
              </Link>
            </div>

            {/* Box 2: Formal Assessments */}
            <div className="card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <Award size={24} />
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Knowledge Assessments</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  Validate your conceptual understanding through course-level evaluations supporting multi-select, code-reading, and diagnostic topic gap identification.
                </p>
              </div>
              <Link to="/assessments" className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-start' }}>
                Take Assessments ({assessments.length}) →
              </Link>
            </div>

            {/* Box 3: Revision Hub */}
            <div className="card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <Sparkles size={24} />
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Revision Hub & Quick Cards</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  Revisit bookmarked lessons ({bookmarkedCount}), review diagnosed weak topics, study high-yield mental model cards, and perform cross-curriculum search.
                </p>
              </div>
              <Link to="/revision" className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-start' }}>
                Open Revision Hub →
              </Link>
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
              Grounded in CRP India Source Code
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              Dev-root is paired with CRP India—a production civic grievance redressal platform with 160 audited source files, 5 database models, 21 REST endpoints, and role-based access control.
            </p>
          </div>

          <div className="card" style={{ padding: '2rem', maxWidth: '840px', margin: '0 auto' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.4rem' }}>
                  Citizen Redressal Platform (CRP India)
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                  Explore how production municipal apps handle ticket SLAs, JWT security cookies, Prisma database migrations, and responsive tables.
                </p>
              </div>
              <Link to="/case-studies/crp-india" className="btn btn-primary">
                <span>Inspect Architecture</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 3D Roadmap Journey */}
      <Roadmap3D />
    </div>
  );
}
