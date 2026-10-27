import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';
import { COURSES, CATEGORIES, LEVELS } from '../data/courses';
import { useProgress } from '../context/ProgressContext';
import Badge from '../components/Badge';
import ProgressBar from '../components/ProgressBar';

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const { getCourseProgress } = useProgress();

  const filteredCourses = COURSES.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="courses-page" style={{ paddingTop: '2rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '780px', marginBottom: '2.5rem' }}>
          <h1 style={{ marginBottom: '0.5rem' }}>Course Catalogue</h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            Browse all {COURSES.length} structured curriculum courses. Each path builds directly upon preceding concepts,
            progressing from fundamental mental models to advanced production architecture.
          </p>
        </div>

        {/* Filters & Search Toolbar */}
        <div
          className="card"
          style={{
            padding: '1.25rem',
            marginBottom: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          {/* Search Box */}
          <div style={{ position: 'relative' }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '0.85rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-text-muted)'
              }}
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Search courses by topic, technology, or title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-text"
              style={{ width: '100%', paddingLeft: '2.4rem' }}
              aria-label="Search courses"
            />
          </div>

          {/* Category Chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', marginRight: '0.25rem' }}>
              Category:
            </span>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`btn btn-sm ${selectedCategory === category ? 'btn-primary' : 'btn-secondary'}`}
                style={{ borderRadius: 'var(--radius-full)', fontSize: '0.8rem' }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Level Filter */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', marginRight: '0.25rem' }}>
              Level:
            </span>
            {LEVELS.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setSelectedLevel(level)}
                className={`btn btn-sm ${selectedLevel === level ? 'btn-primary' : 'btn-ghost'}`}
                style={{ borderRadius: 'var(--radius-full)', fontSize: '0.8rem' }}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        {filteredCourses.length === 0 ? (
          <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
            <BookOpen size={40} style={{ color: 'var(--color-text-muted)', margin: '0 auto 1rem' }} aria-hidden="true" />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No matching courses found</h3>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
              Try adjusting your search query or filters to discover courses.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedLevel('All');
              }}
              className="btn btn-secondary btn-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid-cols-3">
            {filteredCourses.map((course) => {
              const courseProgress = getCourseProgress(course.slug);
              const isAvailable = course.status === 'available';

              return (
                <div
                  key={course.id}
                  className="card card-interactive"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderColor: isAvailable ? 'var(--color-brand-border)' : 'var(--color-border)',
                    boxShadow: isAvailable ? 'var(--shadow-glow)' : 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <Badge variant={isAvailable ? 'emerald' : 'muted'}>
                      {isAvailable ? 'Available Now' : 'Planned'}
                    </Badge>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{course.level}</span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{course.title}</h3>

                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, flex: 1, marginBottom: '1.25rem' }}>
                    {course.description}
                  </p>

                  {/* Course Progress if Available */}
                  {isAvailable && courseProgress.total > 0 && (
                    <div style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                      <ProgressBar
                        percent={courseProgress.percent}
                        height="6px"
                        showLabel
                        labelText={`${courseProgress.completed}/${courseProgress.total} Lessons`}
                      />
                    </div>
                  )}

                  <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{course.duration}</span>
                    <Link
                      to={`/courses/${course.slug}`}
                      className={`btn btn-sm ${isAvailable ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ fontSize: '0.85rem' }}
                    >
                      <span>{isAvailable ? 'View Lessons' : 'View Syllabus'}</span>
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
