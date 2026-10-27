import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import LessonView from './pages/LessonView';
import CaseStudy from './pages/CaseStudy';
import Challenges from './pages/Challenges';
import ChallengeDetail from './pages/ChallengeDetail';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Assessments from './pages/Assessments';
import AssessmentDetail from './pages/AssessmentDetail';
import Revision from './pages/Revision';
import NotFound from './pages/NotFound';

// Restores window scroll to top whenever navigation route changes
function ScrollRestoration() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollRestoration />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:slug" element={<CourseDetail />} />
          <Route path="lessons/:slug" element={<LessonView />} />
          <Route path="challenges" element={<Challenges />} />
          <Route path="challenges/:slug" element={<ChallengeDetail />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          <Route path="assessments" element={<Assessments />} />
          <Route path="assessments/:slug" element={<AssessmentDetail />} />
          <Route path="revision" element={<Revision />} />
          <Route path="case-studies/crp-india" element={<CaseStudy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
