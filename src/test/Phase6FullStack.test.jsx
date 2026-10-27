import { describe, it, expect, beforeEach } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ProgressProvider, useProgress } from '../context/ProgressContext';
import { COURSES } from '../data/courses';
import { LESSONS } from '../data/lessons';
import { projects } from '../data/projects';
import { PROJECT_SCAFFOLDING } from '../data/projectScaffolding';
import { INTERVIEW_QUESTIONS } from '../data/interviewQuestions';
import { CHECKLIST_CATEGORIES } from '../pages/ProductionChecklist';
import ProductionChecklist from '../pages/ProductionChecklist';
import InterviewPrep from '../pages/InterviewPrep';
import PortfolioBuilder from '../pages/PortfolioBuilder';
import ProjectDetail from '../pages/ProjectDetail';

describe('Phase 6: Full-Stack Curriculum & Course Depth Validation', () => {
  it('registers Course 13 through Course 17 as available courses in courses.js', () => {
    const c13 = COURSES.find(c => c.id === 'course-13');
    const c14 = COURSES.find(c => c.id === 'course-14');
    const c15 = COURSES.find(c => c.id === 'course-15');
    const c16 = COURSES.find(c => c.id === 'course-16');
    const c17 = COURSES.find(c => c.id === 'course-17');

    expect(c13).toBeDefined();
    expect(c13.status).toBe('available');
    expect(c13.lessons.length).toBe(4);

    expect(c14).toBeDefined();
    expect(c14.status).toBe('available');
    expect(c14.lessons.length).toBe(4);

    expect(c15).toBeDefined();
    expect(c15.status).toBe('available');
    expect(c15.lessons.length).toBe(4);

    expect(c16).toBeDefined();
    expect(c16.status).toBe('available');
    expect(c16.lessons.length).toBe(4);

    expect(c17).toBeDefined();
    expect(c17.status).toBe('available');
  });

  it('verifies Course 13 (Testing & QA) lessons meet the 4x depth standard', () => {
    const requiredLessons = [
      'testing-fundamentals-and-vitest',
      'component-and-rtl-testing',
      'api-and-integration-testing',
      'e2e-testing-and-test-strategy'
    ];

    requiredLessons.forEach(slug => {
      const lesson = LESSONS[slug];
      expect(lesson, `Lesson ${slug} should exist in LESSONS`).toBeDefined();
      expect(lesson.title).toBeTruthy();
      expect(lesson.objectives.length).toBeGreaterThanOrEqual(4);
      expect(lesson.sections.length).toBeGreaterThanOrEqual(3);
      expect(lesson.quiz.length).toBeGreaterThanOrEqual(2);
      expect(lesson.commonMistakes.length).toBeGreaterThanOrEqual(2);
      expect(lesson.keyTakeaways.length).toBeGreaterThanOrEqual(3);
    });
  });

  it('verifies Course 14 (Debugging) lessons meet the 4x depth standard', () => {
    const requiredLessons = [
      'frontend-and-devtools-debugging',
      'javascript-runtime-and-logic-debugging',
      'backend-and-database-debugging',
      'fullstack-distributed-tracing'
    ];

    requiredLessons.forEach(slug => {
      const lesson = LESSONS[slug];
      expect(lesson, `Lesson ${slug} should exist in LESSONS`).toBeDefined();
      expect(lesson.sections.length).toBeGreaterThanOrEqual(3);
      expect(lesson.codeExample).toBeTruthy();
    });
  });

  it('verifies Course 15 (Deployment & DevOps) and Course 16 (Career) lessons', () => {
    const depLessons = [
      'development-vs-production-and-builds',
      'environment-secrets-and-cloud-config',
      'hosting-static-apis-and-databases',
      'production-monitoring-and-reliability'
    ];
    depLessons.forEach(slug => {
      expect(LESSONS[slug]).toBeDefined();
    });

    const careerLessons = [
      'portfolio-strategy-and-documentation',
      'explaining-technical-decisions',
      'fullstack-technical-interview-mastery',
      'system-design-thinking-fundamentals'
    ];
    careerLessons.forEach(slug => {
      expect(LESSONS[slug]).toBeDefined();
    });
  });
});

describe('Phase 6: Project Workspace & Scaffolding Data', () => {
  it('provides complete scaffolding (lessons, challenges, checklist) for all 10 projects', () => {
    projects.forEach(p => {
      const scaffold = PROJECT_SCAFFOLDING[p.id];
      expect(scaffold, `Project ${p.id} must have scaffolding`).toBeDefined();
      expect(scaffold.helpfulLessons.length).toBeGreaterThanOrEqual(2);
      expect(scaffold.relatedChallenges.length).toBeGreaterThanOrEqual(1);
      expect(scaffold.testingChecklist.length).toBeGreaterThanOrEqual(4);
    });
  });

  it('renders ProjectDetail with workspace tabs, status selector, and notes editor', () => {
    const proj = projects[0]; // proj-01-profile-page
    render(
      <ProgressProvider>
        <MemoryRouter initialEntries={[`/projects/${proj.slug}`]}>
          <Routes>
            <Route path="/projects/:slug" element={<ProjectDetail />} />
          </Routes>
        </MemoryRouter>
      </ProgressProvider>
    );

    // Verify Title and Tabs
    expect(screen.getByRole('heading', { level: 1, name: proj.title })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Milestones/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Helpful Lessons & Practice/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Testing Checklist/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Project Notes/ })).toBeInTheDocument();

    // Switch to Project Notes Tab
    fireEvent.click(screen.getByRole('button', { name: /Project Notes/ }));
    expect(screen.getByText(/Personal Project Notes/)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();

    // Switch to Testing Checklist Tab
    fireEvent.click(screen.getByRole('button', { name: /Testing Checklist/ }));
    expect(screen.getByText(/Interactive Acceptance Testing Checklist/)).toBeInTheDocument();
  });
});

describe('Phase 6: Production-Readiness Checklist Tool', () => {
  it('renders all 6 quality categories with interactive checklist items', () => {
    render(
      <ProgressProvider>
        <MemoryRouter>
          <ProductionChecklist />
        </MemoryRouter>
      </ProgressProvider>
    );

    expect(screen.getByRole('heading', { level: 1, name: /Production-Readiness Checklist/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Core Functionality & Workflows/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Accessibility \(WCAG 2.1 Level AA\)/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Security \(OWASP Top 10 Guidelines\)/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('button', { name: /Export Audit Report/i })).toBeInTheDocument();

    // Verify checkboxes can be toggled
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(20);

    const firstCheckbox = checkboxes[0];
    expect(firstCheckbox.checked).toBe(false);
    fireEvent.click(firstCheckbox);
    expect(firstCheckbox.checked).toBe(true);
  });
});

describe('Phase 6: Technical Interview Preparation Center', () => {
  it('renders interview questions, hints, and model answer revelation', () => {
    render(
      <ProgressProvider>
        <MemoryRouter>
          <InterviewPrep />
        </MemoryRouter>
      </ProgressProvider>
    );

    expect(screen.getByRole('heading', { level: 1, name: /Technical Interview Preparation Center/i })).toBeInTheDocument();
    expect(screen.getAllByText(INTERVIEW_QUESTIONS[0].title).length).toBeGreaterThanOrEqual(1);

    // Toggle Hint
    const hintBtn = screen.getByRole('button', { name: /Need a Hint\?/i });
    fireEvent.click(hintBtn);
    expect(screen.getByText(/Guiding Hint:/i)).toBeInTheDocument();

    // Toggle Model Answer
    const answerBtn = screen.getByRole('button', { name: /Reveal Model Answer/i });
    fireEvent.click(answerBtn);
    expect(screen.getByRole('button', { name: /Hide Model Solution/i })).toBeInTheDocument();

    // Rate Confidence
    const confidentBtn = screen.getByRole('button', { name: /High Confidence/i });
    fireEvent.click(confidentBtn);
  });
});

describe('Phase 6: Portfolio Project Builder', () => {
  it('allows multi-step project planning and generates README preview', () => {
    render(
      <ProgressProvider>
        <MemoryRouter>
          <PortfolioBuilder />
        </MemoryRouter>
      </ProgressProvider>
    );

    expect(screen.getByRole('heading', { level: 1, name: /Portfolio Project Builder/i })).toBeInTheDocument();
    expect(screen.getByText(/Step 1: Project Identity & Problem Statement/i)).toBeInTheDocument();

    // Type in project name
    const nameInput = screen.getByPlaceholderText(/e.g. EcoRoute/i);
    fireEvent.change(nameInput, { target: { value: 'CleanCity Portal' } });

    // Verify generated README includes project name
    expect(screen.getByText(/CleanCity Portal/i)).toBeInTheDocument();

    // Advance to Step 2
    fireEvent.click(screen.getByRole('button', { name: /Next Step/i }));
    expect(screen.getByText(/Step 2: Technical Stack & Hosting Architecture/i)).toBeInTheDocument();
  });
});
