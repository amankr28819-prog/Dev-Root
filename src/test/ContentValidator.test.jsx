import { describe, it, expect } from 'vitest';
import { validateLesson, validateCurriculum } from '../utils/contentValidator';
import { LESSONS } from '../data/lessons';
import { COURSES } from '../data/courses';

describe('Content Quality Validator System', () => {
  it('validates a complete, high-quality lesson successfully', () => {
    const lesson = LESSONS['html-foundations-and-syntax'];
    expect(lesson).toBeDefined();

    const result = validateLesson('html-foundations-and-syntax', lesson);
    expect(result.isValid).toBe(true);
    expect(result.issues).toHaveLength(0);
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

  it('audits the entire active production curriculum with 0 fatal errors', () => {
    const audit = validateCurriculum(LESSONS, COURSES);
    if (!audit.valid) {
      console.error('Curriculum validation errors:', audit.errors);
    }
    expect(audit.valid).toBe(true);
    expect(audit.errorCount).toBe(0);
    expect(audit.evaluatedLessonsCount).toBeGreaterThanOrEqual(14);
  });
});
