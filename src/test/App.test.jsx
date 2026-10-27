import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeContext';
import { ProgressProvider } from '../context/ProgressContext';
import AppLayout from '../layouts/AppLayout';
import Home from '../pages/Home';
import Courses from '../pages/Courses';
import CourseDetail from '../pages/CourseDetail';
import LessonView from '../pages/LessonView';
import CaseStudy from '../pages/CaseStudy';
import NotFound from '../pages/NotFound';

function renderWithProviders(initialEntries = ['/']) {
  return render(
    <ThemeProvider>
      <ProgressProvider>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="courses" element={<Courses />} />
              <Route path="courses/:slug" element={<CourseDetail />} />
              <Route path="lessons/:slug" element={<LessonView />} />
              <Route path="case-studies/crp-india" element={<CaseStudy />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </ProgressProvider>
    </ThemeProvider>
  );
}

describe('Dev-root Application Routing & Pages', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the Home dashboard with branding and CTA', () => {
    renderWithProviders(['/']);
    expect(screen.getByRole('heading', { name: /Start at the roots/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Start with Lesson 1/i })).toBeInTheDocument();
    expect(screen.getByText(/Dev-root Learning Platform/i)).toBeInTheDocument();
  });

  it('renders the Courses catalogue with courses and filter chips', () => {
    renderWithProviders(['/courses']);
    expect(screen.getByRole('heading', { name: /Course Catalogue/i })).toBeInTheDocument();
    expect(screen.getByText(/Course 1: Understanding the Web/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search courses/i)).toBeInTheDocument();
  });

  it('renders CourseDetail page for a valid course slug', () => {
    renderWithProviders(['/courses/web-internet-fundamentals']);
    expect(screen.getByRole('heading', { name: /Course 1: Understanding the Web/i })).toBeInTheDocument();
    expect(screen.getByText(/Course Syllabus/i)).toBeInTheDocument();
    expect(screen.getByText(/How Websites Work: Clients, Servers & The Web/i)).toBeInTheDocument();
  });

  it('renders LessonView for a beginner lesson with objectives, quiz, and exercise', () => {
    renderWithProviders(['/lessons/how-websites-work']);
    expect(screen.getByRole('heading', { name: /How Websites Work: Clients, Servers & The Web/i })).toBeInTheDocument();
    expect(screen.getByText(/What You Will Learn/i)).toBeInTheDocument();
    expect(screen.getAllByText(/1. The Client-Server Dialogue/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Knowledge Check Quiz/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Inspecting the Client-Server Dialogue/i).length).toBeGreaterThan(0);
    const markButtons = screen.getAllByRole('button', { name: /Mark.*Complete/i });
    expect(markButtons.length).toBeGreaterThan(0);
  });

  it('renders CaseStudy page with CRP India architecture details', () => {
    renderWithProviders(['/case-studies/crp-india']);
    expect(screen.getByRole('heading', { name: /CRP India — Civic Reporting Platform/i })).toBeInTheDocument();
    expect(screen.getByText(/Verified Architectural Implementations/i)).toBeInTheDocument();
    expect(screen.getByText(/Decoupled Client-Server Architecture/i)).toBeInTheDocument();
  });

  it('renders NotFound page for unknown route', () => {
    renderWithProviders(['/unknown-route']);
    expect(screen.getByRole('heading', { name: /Page Not Found/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to Dashboard/i })).toBeInTheDocument();
  });
});
