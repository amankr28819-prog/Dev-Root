import { describe, it, expect } from 'vitest';
import { challenges } from '../data/challenges';
import { projects } from '../data/projects';
import { assessments } from '../data/assessments';
import { validateChallenge, validateProject, validateAssessment } from '../utils/contentValidator';
import { evaluateChallenge } from '../utils/challengeEvaluator';

describe('Phase 5: Coding Challenges System', () => {
  it('loads challenges covering HTML, CSS, JavaScript, and React', () => {
    expect(challenges.length).toBeGreaterThanOrEqual(8);
    const categories = new Set(challenges.map((c) => c.category));
    expect(categories.has('html')).toBe(true);
    expect(categories.has('css')).toBe(true);
    expect(categories.has('javascript')).toBe(true);
    expect(categories.has('react')).toBe(true);
  });

  it('every challenge passes validation with solution and test criteria', () => {
    challenges.forEach((challenge) => {
      const result = validateChallenge(challenge);
      expect(result.valid, `Challenge ${challenge.id} failed validation: ${result.issues.join(', ')}`).toBe(true);
      expect(challenge.hints.length).toBeGreaterThanOrEqual(2);
      expect(challenge.solutionExplanation.length).toBeGreaterThanOrEqual(30);
    });
  });

  it('challenge solutions pass their own automated test criteria', () => {
    for (const challenge of challenges) {
      const outcome = evaluateChallenge(challenge, challenge.solution);
      expect(
        outcome.passed,
        `Challenge ${challenge.id} solution failed test: ${outcome.errors?.join(', ')}`
      ).toBe(true);
    }
  });

  it('challenge starter code properly fails the test criteria with diagnostic error message', () => {
    for (const challenge of challenges) {
      const outcome = evaluateChallenge(challenge, challenge.starterCode);
      expect(
        outcome.passed,
        `Challenge ${challenge.id} starter code should not pass initially`
      ).toBe(false);
      expect(outcome.errors.length).toBeGreaterThan(0);
    }
  });
});

describe('Phase 5: 10-Tier Project Curriculum', () => {
  it('defines exactly 10 progressive project tiers matching Part 8', () => {
    expect(projects.length).toBe(10);
    const tiers = projects.map((p) => p.tier);
    expect(tiers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('every project passes structural validation', () => {
    projects.forEach((project) => {
      const result = validateProject(project);
      expect(result.valid, `Project ${project.id} failed validation: ${result.issues.join(', ')}`).toBe(true);
      expect(project.learningObjectives.length).toBeGreaterThanOrEqual(3);
      expect(project.features.length).toBeGreaterThanOrEqual(4);
      expect(project.testingInstructions.length).toBeGreaterThanOrEqual(3);
      expect(project.commonMistakes.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('tier 10 represents the CRP India Full-Stack Capstone', () => {
    const capstone = projects.find((p) => p.tier === 10);
    expect(capstone).toBeDefined();
    expect(capstone.slug).toBe('full-stack-application');
    expect(capstone.title).toContain('CRP India');
  });
});

describe('Phase 5: Course & Module Assessments', () => {
  it('defines comprehensive course-level assessments', () => {
    expect(assessments.length).toBeGreaterThanOrEqual(5);
  });

  it('every assessment passes validation with rich question metadata', () => {
    assessments.forEach((assessment) => {
      const result = validateAssessment(assessment);
      expect(result.valid, `Assessment ${assessment.id} failed validation: ${result.issues.join(', ')}`).toBe(true);
      expect(assessment.passingScorePercent).toBeGreaterThanOrEqual(70);

      // Check questions
      assessment.questions.forEach((q) => {
        expect(['multiple-choice', 'multiple-select', 'true-false', 'output-prediction', 'code-reading']).toContain(q.type);
        expect(q.explanation.length).toBeGreaterThan(15);
      });
    });
  });
});
