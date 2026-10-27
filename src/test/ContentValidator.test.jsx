import { describe, it, expect } from 'vitest';
import { validateLesson, validateCurriculum } from '../utils/contentValidator';
import { LESSONS } from '../data/lessons';
import { COURSES } from '../data/courses';

describe('Content Quality Validator System - Phase 4 4x Depth Standard', () => {
  it('validates a complete, high-quality lesson successfully', () => {
    const lesson = LESSONS['html-foundations-and-syntax'];
    expect(lesson).toBeDefined();

    const result = validateLesson('html-foundations-and-syntax', lesson);
    expect(result.isValid).toBe(true);
    expect(result.issues).toHaveLength(0);
    expect(result.totalWords).toBeGreaterThanOrEqual(500);
  });

  it('detects incomplete or malformed lesson metadata', () => {
    const invalidLesson = {
      id: 'test-broken',
      title: 'Hi', // too short
      courseSlug: 'fake-course',
      objectives: ['Only one objective'], // needs at least 2
      sections: [{ heading: 'H1', content: 'Short' }], // needs at least 3
      quiz: [] // needs at least 2 questions
    };

    const result = validateLesson('test-broken', invalidLesson);
    expect(result.isValid).toBe(false);
    expect(result.issues.length).toBeGreaterThan(0);
  });

  it('audits the entire active production curriculum with 0 fatal errors across 30+ lessons', () => {
    const audit = validateCurriculum(LESSONS, COURSES);
    if (!audit.valid) {
      console.error('Curriculum validation errors:', audit.errors);
    }
    expect(audit.valid).toBe(true);
    expect(audit.errorCount).toBe(0);
    expect(audit.evaluatedLessonsCount).toBeGreaterThanOrEqual(30);
    expect(audit.totalCurriculumWords).toBeGreaterThanOrEqual(15000);
  });

  it('verifies HTML, CSS, JavaScript, React, Backend, Database, and Auth courses are present and available', () => {
    const availableSlugs = COURSES.filter(c => c.status === 'available').map(c => c.slug);
    
    expect(availableSlugs).toContain('html-foundations');
    expect(availableSlugs).toContain('css-responsive-design');
    expect(availableSlugs).toContain('javascript-fundamentals');
    expect(availableSlugs).toContain('browser-and-dom');
    expect(availableSlugs).toContain('modern-javascript');
    expect(availableSlugs).toContain('react-foundations');
    expect(availableSlugs).toContain('nodejs-and-express');
    expect(availableSlugs).toContain('mongodb-and-mongoose');
    expect(availableSlugs).toContain('authentication-and-web-security');
  });

  it('verifies all lessons have interactive exercises and solutions', () => {
    for (const [slug, lesson] of Object.entries(LESSONS)) {
      const exercise = lesson.exercise || lesson.guidedExercise;
      expect(exercise, `Lesson [${slug}] must have an exercise`).toBeDefined();
      expect(exercise.instruction || exercise.instructions).toBeDefined();
      expect(exercise.solution).toBeDefined();
    }
  });
});
