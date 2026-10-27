import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code, CheckCircle2, Circle, Clock, ArrowRight, Filter, Award, Sparkles } from 'lucide-react';
import { CHALLENGES } from '../data/challenges';
import { useProgress } from '../context/ProgressContext';
import Badge from '../components/Badge';

export default function Challenges() {
  const { isChallengeComplete, completedChallenges = [] } = useProgress();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'html', label: 'HTML' },
    { id: 'css', label: 'CSS' },
    { id: 'javascript', label: 'JavaScript' }
  ];

  const difficulties = [
    { id: 'all', label: 'All Difficulties' },
    { id: 'Beginner', label: 'Beginner' },
    { id: 'Basic', label: 'Basic' },
    { id: 'Intermediate', label: 'Intermediate' },
    { id: 'Advanced', label: 'Advanced' }
  ];

  const filteredChallenges = CHALLENGES.filter((ch) => {
    const categoryMatch = selectedCategory === 'all' || ch.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || ch.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const completedCount = CHALLENGES.filter(ch => isChallengeComplete(ch.id)).length;
  const percentComplete = Math.round((completedCount / (CHALLENGES.length || 1)) * 100);

  return (
    <div className="challenges-page" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div className="container">
        {/* Header */}
        <header style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.8rem', backgroundColor: 'var(--color-brand-subtle)', borderRadius: '9999px', color: 'var(--color-brand-primary)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem' }}>
            <Sparkles size={16} />
            <span>Phase 5 Interactive Challenges</span>
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.75rem', fontWeight: 800 }}>
            Interactive Coding Challenges
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-text-secondary)', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6 }}>
            Master real-world frontend and backend engineering through hands-on practice. Write code, pass automated tests, and receive instant diagnostic feedback.
          </p>

          {/* Progress summary banner */}
          <div style={{ maxWidth: '500px', margin: '1.5rem auto 0', padding: '1rem', backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              <span style={{ fontWeight: 600 }}>Challenges Solved</span>
              <span style={{ color: 'var(--color-brand-primary)', fontWeight: 700 }}>{completedCount} / {CHALLENGES.length} ({percentComplete}%)</span>
            </div>
            <div style={{ height: '8px', backgroundColor: 'var(--color-bg-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${percentComplete}%`, height: '100%', backgroundColor: 'var(--color-brand-primary)', transition: 'width 0.3s ease' }} />
            </div>
          </div>
        </header>

        {/* Filter Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', padding: '1rem', backgroundColor: 'var(--color-bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`btn btn-sm ${selectedCategory === cat.id ? 'btn-primary' : 'btn-secondary'}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Difficulty Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={16} style={{ color: 'var(--color-text-muted)' }} />
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg-subtle)',
                color: 'var(--color-text-primary)',
                fontFamily: 'inherit',
                fontSize: '0.9rem'
              }}
              aria-label="Filter by difficulty"
            >
              {difficulties.map((diff) => (
                <option key={diff.id} value={diff.id}>
                  {diff.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Challenges Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {filteredChallenges.map((challenge) => {
            const completed = isChallengeComplete(challenge.id);
            return (
              <article
                key={challenge.id}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.5rem',
                  borderTop: completed ? '4px solid var(--color-accent-green)' : '4px solid var(--color-brand-primary)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <Badge variant={challenge.category === 'html' ? 'blue' : challenge.category === 'css' ? 'purple' : 'cyan'}>
                        {challenge.category.toUpperCase()}
                      </Badge>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                        {challenge.difficulty}
                      </span>
                    </div>

                    {completed ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-accent-green)', fontSize: '0.85rem', fontWeight: 600 }}>
                        <CheckCircle2 size={16} />
                        <span>Solved</span>
                      </span>
                    ) : (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                        <Circle size={16} />
                        <span>Unsolved</span>
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                    {challenge.title}
                  </h3>

                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                    {challenge.summary}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Clock size={14} />
                    <span>~{challenge.estimatedMinutes} mins</span>
                  </span>

                  <Link
                    to={`/challenges/${challenge.slug}`}
                    className="btn btn-secondary btn-sm"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <span>{completed ? 'Review Code' : 'Start Challenge'}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
