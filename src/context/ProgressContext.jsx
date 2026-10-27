import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { COURSES } from '../data/courses';
import { LESSONS } from '../data/lessons';

const ProgressContext = createContext();

const STORAGE_KEY = 'devroot_progress_v1';

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
          lastOpenedLesson: typeof parsed.lastOpenedLesson === 'string' ? parsed.lastOpenedLesson : null,
          quizScores: parsed.quizScores && typeof parsed.quizScores === 'object' ? parsed.quizScores : {},
          completedExercises: parsed.completedExercises && typeof parsed.completedExercises === 'object' ? parsed.completedExercises : {},
          lastUpdated: parsed.lastUpdated || Date.now()
        };
      }
    } catch (e) {
      console.warn('[ProgressContext] Failed to read from localStorage. Initializing default state.', e);
    }
    return {
      completedLessons: [],
      lastOpenedLesson: null,
      quizScores: {},
      completedExercises: {},
      lastUpdated: Date.now()
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('[ProgressContext] Failed to persist progress to localStorage.', e);
    }
  }, [progress]);

  const toggleLessonComplete = useCallback((lessonId) => {
    setProgress((prev) => {
      const exists = prev.completedLessons.includes(lessonId);
      const nextCompleted = exists
        ? prev.completedLessons.filter((id) => id !== lessonId)
        : [...prev.completedLessons, lessonId];

      return {
        ...prev,
        completedLessons: nextCompleted,
        lastUpdated: Date.now()
      };
    });
  }, []);

  const isLessonComplete = useCallback((lessonId) => {
    return progress.completedLessons.includes(lessonId);
  }, [progress.completedLessons]);

  const setLastOpenedLesson = useCallback((slug) => {
    setProgress((prev) => {
      if (prev.lastOpenedLesson === slug) return prev;
      return {
        ...prev,
        lastOpenedLesson: slug,
        lastUpdated: Date.now()
      };
    });
  }, []);

  const recordQuizScore = useCallback((lessonId, score, total) => {
    setProgress((prev) => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [lessonId]: { score, total, updatedAt: Date.now() }
      },
      lastUpdated: Date.now()
    }));
  }, []);

  const getQuizScore = useCallback((lessonId) => {
    return progress.quizScores ? progress.quizScores[lessonId] || null : null;
  }, [progress.quizScores]);

  const toggleExerciseComplete = useCallback((exerciseId) => {
    setProgress((prev) => {
      const current = !!prev.completedExercises[exerciseId];
      return {
        ...prev,
        completedExercises: {
          ...prev.completedExercises,
          [exerciseId]: !current
        },
        lastUpdated: Date.now()
      };
    });
  }, []);

  const isExerciseComplete = useCallback((exerciseId) => {
    return progress.completedExercises ? !!progress.completedExercises[exerciseId] : false;
  }, [progress.completedExercises]);

  const resetProgress = useCallback(() => {
    setProgress({
      completedLessons: [],
      lastOpenedLesson: null,
      quizScores: {},
      completedExercises: {},
      lastUpdated: Date.now()
    });
  }, []);

  // Calculates completion percentage for a course based on its AVAILABLE lessons
  const getCourseProgress = useCallback((courseSlug) => {
    const course = COURSES.find((c) => c.slug === courseSlug);
    if (!course || !course.lessons) return { completed: 0, total: 0, percent: 0 };

    const availableLessons = course.lessons.filter((l) => l.status === 'available');
    if (availableLessons.length === 0) return { completed: 0, total: 0, percent: 0 };

    const completed = availableLessons.filter((l) => progress.completedLessons.includes(l.id)).length;
    const percent = Math.round((completed / availableLessons.length) * 100);

    return { completed, total: availableLessons.length, percent };
  }, [progress.completedLessons]);

  // Calculates overall completion percentage across all available lessons in the platform
  const getOverallProgress = useCallback(() => {
    const totalAvailable = Object.keys(LESSONS).length;
    if (totalAvailable === 0) return { completed: 0, total: 0, percent: 0 };

    const completed = progress.completedLessons.filter((id) =>
      Object.values(LESSONS).some((lesson) => lesson.id === id)
    ).length;

    const percent = Math.round((completed / totalAvailable) * 100);
    return { completed, total: totalAvailable, percent };
  }, [progress.completedLessons]);

  return (
    <ProgressContext.Provider
      value={{
        completedLessons: progress.completedLessons,
        lastOpenedLesson: progress.lastOpenedLesson,
        quizScores: progress.quizScores,
        completedExercises: progress.completedExercises,
        toggleLessonComplete,
        isLessonComplete,
        setLastOpenedLesson,
        recordQuizScore,
        getQuizScore,
        toggleExerciseComplete,
        isExerciseComplete,
        getCourseProgress,
        getOverallProgress,
        resetProgress
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
