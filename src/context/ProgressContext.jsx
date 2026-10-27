import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { COURSES } from '../data/courses';
import { LESSONS } from '../data/lessons';

const ProgressContext = createContext();

const STORAGE_KEY = 'devroot_progress_v1';

// Calculate today's date in YYYY-MM-DD format for streak tracking
const getTodayDateString = () => new Date().toISOString().split('T')[0];

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    const today = getTodayDateString();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
          lastOpenedLesson: typeof parsed.lastOpenedLesson === 'string' ? parsed.lastOpenedLesson : null,
          quizScores: parsed.quizScores && typeof parsed.quizScores === 'object' ? parsed.quizScores : {},
          completedExercises: parsed.completedExercises && typeof parsed.completedExercises === 'object' ? parsed.completedExercises : {},
          completedChallenges: Array.isArray(parsed.completedChallenges) ? parsed.completedChallenges : [],
          challengeAttempts: parsed.challengeAttempts && typeof parsed.challengeAttempts === 'object' ? parsed.challengeAttempts : {},
          projectMilestones: parsed.projectMilestones && typeof parsed.projectMilestones === 'object' ? parsed.projectMilestones : {},
          projectNotes: parsed.projectNotes && typeof parsed.projectNotes === 'object' ? parsed.projectNotes : {},
          projectStatusOverride: parsed.projectStatusOverride && typeof parsed.projectStatusOverride === 'object' ? parsed.projectStatusOverride : {},
          projectTestingChecklist: parsed.projectTestingChecklist && typeof parsed.projectTestingChecklist === 'object' ? parsed.projectTestingChecklist : {},
          productionChecklist: parsed.productionChecklist && typeof parsed.productionChecklist === 'object' ? parsed.productionChecklist : {},
          interviewAttempts: parsed.interviewAttempts && typeof parsed.interviewAttempts === 'object' ? parsed.interviewAttempts : {},
          portfolioProject: parsed.portfolioProject && typeof parsed.portfolioProject === 'object' ? parsed.portfolioProject : null,
          bookmarkedLessons: Array.isArray(parsed.bookmarkedLessons) ? parsed.bookmarkedLessons : [],
          flaggedQuestions: Array.isArray(parsed.flaggedQuestions) ? parsed.flaggedQuestions : [],
          assessmentScores: parsed.assessmentScores && typeof parsed.assessmentScores === 'object' ? parsed.assessmentScores : {},
          streakData: parsed.streakData && typeof parsed.streakData === 'object' ? parsed.streakData : { currentStreak: 1, lastActiveDate: today },
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
      completedChallenges: [],
      challengeAttempts: {},
      projectMilestones: {},
      projectNotes: {},
      projectStatusOverride: {},
      projectTestingChecklist: {},
      productionChecklist: {},
      interviewAttempts: {},
      portfolioProject: null,
      bookmarkedLessons: [],
      flaggedQuestions: [],
      assessmentScores: {},
      streakData: { currentStreak: 1, lastActiveDate: today },
      lastUpdated: Date.now()
    };
  });

  // Automatically update daily streak
  useEffect(() => {
    const today = getTodayDateString();
    setProgress((prev) => {
      const { streakData } = prev;
      if (!streakData || !streakData.lastActiveDate) {
        return { ...prev, streakData: { currentStreak: 1, lastActiveDate: today } };
      }

      if (streakData.lastActiveDate === today) {
        return prev; // Already recorded activity today
      }

      const lastDate = new Date(streakData.lastActiveDate);
      const currDate = new Date(today);
      const diffDays = Math.round((currDate - lastDate) / (1000 * 60 * 60 * 24));

      let newStreak = streakData.currentStreak || 1;
      if (diffDays === 1) {
        newStreak += 1; // Consecutive active day
      } else if (diffDays > 1) {
        newStreak = 1; // Streak broken
      }

      return {
        ...prev,
        streakData: { currentStreak: newStreak, lastActiveDate: today },
        lastUpdated: Date.now()
      };
    });
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('[ProgressContext] Failed to persist progress to localStorage.', e);
    }
  }, [progress]);

  // Lesson Completion
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

  // Quiz Scoring
  const recordQuizScore = useCallback((lessonId, score, total, detailedAnswers = null) => {
    setProgress((prev) => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [lessonId]: { score, total, updatedAt: Date.now(), detailedAnswers }
      },
      lastUpdated: Date.now()
    }));
  }, []);

  const getQuizScore = useCallback((lessonId) => {
    return progress.quizScores ? progress.quizScores[lessonId] || null : null;
  }, [progress.quizScores]);

  // Exercise Checkboxes
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

  // Coding Challenges
  const recordChallengeAttempt = useCallback((challengeId, isSuccess, hintsUsed = 0) => {
    setProgress((prev) => {
      const prevAttempt = prev.challengeAttempts[challengeId] || { attempts: 0, hintsUsed: 0 };
      const nextAttempts = prevAttempt.attempts + 1;
      const nextHints = Math.max(prevAttempt.hintsUsed, hintsUsed);

      const alreadyCompleted = prev.completedChallenges.includes(challengeId);
      const nextCompleted = (isSuccess && !alreadyCompleted)
        ? [...prev.completedChallenges, challengeId]
        : prev.completedChallenges;

      return {
        ...prev,
        completedChallenges: nextCompleted,
        challengeAttempts: {
          ...prev.challengeAttempts,
          [challengeId]: {
            attempts: nextAttempts,
            hintsUsed: nextHints,
            completedAt: isSuccess ? Date.now() : prevAttempt.completedAt || null
          }
        },
        lastUpdated: Date.now()
      };
    });
  }, []);

  const isChallengeComplete = useCallback((challengeId) => {
    return progress.completedChallenges.includes(challengeId);
  }, [progress.completedChallenges]);

  // Project Milestones
  const toggleProjectMilestone = useCallback((projectId, milestoneId) => {
    setProgress((prev) => {
      const currentMilestones = prev.projectMilestones[projectId] || [];
      const exists = currentMilestones.includes(milestoneId);
      const updated = exists
        ? currentMilestones.filter((m) => m !== milestoneId)
        : [...currentMilestones, milestoneId];

      return {
        ...prev,
        projectMilestones: {
          ...prev.projectMilestones,
          [projectId]: updated
        },
        lastUpdated: Date.now()
      };
    });
  }, []);

  const isProjectMilestoneComplete = useCallback((projectId, milestoneId) => {
    const list = progress.projectMilestones[projectId] || [];
    return list.includes(milestoneId);
  }, [progress.projectMilestones]);

  const getProjectProgress = useCallback((projectId, totalMilestonesCount) => {
    const list = progress.projectMilestones[projectId] || [];
    if (!totalMilestonesCount || totalMilestonesCount === 0) return { completed: list.length, total: 0, percent: 0 };
    return {
      completed: list.length,
      total: totalMilestonesCount,
      percent: Math.min(100, Math.round((list.length / totalMilestonesCount) * 100))
    };
  }, [progress.projectMilestones]);

  // Project Notes (Phase 6)
  const setProjectNote = useCallback((projectId, text) => {
    setProgress((prev) => ({
      ...prev,
      projectNotes: {
        ...prev.projectNotes,
        [projectId]: text
      },
      lastUpdated: Date.now()
    }));
  }, []);

  const getProjectNote = useCallback((projectId) => {
    return progress.projectNotes[projectId] || '';
  }, [progress.projectNotes]);

  // Project Status Override (Phase 6: 'not_started' | 'in_progress' | 'completed' | 'needs_revision')
  const setProjectStatus = useCallback((projectId, status) => {
    setProgress((prev) => ({
      ...prev,
      projectStatusOverride: {
        ...prev.projectStatusOverride,
        [projectId]: status
      },
      lastUpdated: Date.now()
    }));
  }, []);

  const getProjectStatus = useCallback((projectId, totalMilestonesCount) => {
    if (progress.projectStatusOverride[projectId]) {
      return progress.projectStatusOverride[projectId];
    }
    const completedCount = (progress.projectMilestones[projectId] || []).length;
    if (completedCount === 0) return 'not_started';
    if (totalMilestonesCount && completedCount >= totalMilestonesCount) return 'completed';
    return 'in_progress';
  }, [progress.projectStatusOverride, progress.projectMilestones]);

  // Project Testing Checklist (Phase 6)
  const toggleProjectTestItem = useCallback((projectId, itemKey) => {
    setProgress((prev) => {
      const current = prev.projectTestingChecklist[projectId] || {};
      const updated = { ...current, [itemKey]: !current[itemKey] };
      return {
        ...prev,
        projectTestingChecklist: {
          ...prev.projectTestingChecklist,
          [projectId]: updated
        },
        lastUpdated: Date.now()
      };
    });
  }, []);

  const isProjectTestItemVerified = useCallback((projectId, itemKey) => {
    const list = progress.projectTestingChecklist[projectId] || {};
    return Boolean(list[itemKey]);
  }, [progress.projectTestingChecklist]);

  // Production-Readiness Checklist Tool (Phase 6)
  const toggleProductionChecklistItem = useCallback((itemId) => {
    setProgress((prev) => ({
      ...prev,
      productionChecklist: {
        ...prev.productionChecklist,
        [itemId]: !prev.productionChecklist[itemId]
      },
      lastUpdated: Date.now()
    }));
  }, []);

  const isProductionChecklistItemComplete = useCallback((itemId) => {
    return Boolean(progress.productionChecklist[itemId]);
  }, [progress.productionChecklist]);

  const getProductionChecklistProgress = useCallback((totalCount = 30) => {
    const completed = Object.values(progress.productionChecklist).filter(Boolean).length;
    return {
      completed,
      total: totalCount,
      percent: Math.min(100, Math.round((completed / totalCount) * 100))
    };
  }, [progress.productionChecklist]);

  // Technical Interview Prep Attempts (Phase 6)
  const recordInterviewAttempt = useCallback((questionId, confidence = 'medium') => {
    setProgress((prev) => ({
      ...prev,
      interviewAttempts: {
        ...prev.interviewAttempts,
        [questionId]: {
          answered: true,
          confidence,
          lastAttempt: Date.now()
        }
      },
      lastUpdated: Date.now()
    }));
  }, []);

  const getInterviewAttempt = useCallback((questionId) => {
    return progress.interviewAttempts[questionId] || null;
  }, [progress.interviewAttempts]);

  // Portfolio Project Builder (Phase 6)
  const updatePortfolioProject = useCallback((fields) => {
    setProgress((prev) => ({
      ...prev,
      portfolioProject: {
        ...(prev.portfolioProject || {}),
        ...fields,
        updatedAt: Date.now()
      },
      lastUpdated: Date.now()
    }));
  }, []);

  const getPortfolioProject = useCallback(() => {
    return progress.portfolioProject;
  }, [progress.portfolioProject]);


  // Bookmarks (Revision)
  const toggleBookmark = useCallback((lessonSlug) => {
    setProgress((prev) => {
      const exists = prev.bookmarkedLessons.includes(lessonSlug);
      const nextBookmarks = exists
        ? prev.bookmarkedLessons.filter((s) => s !== lessonSlug)
        : [...prev.bookmarkedLessons, lessonSlug];

      return {
        ...prev,
        bookmarkedLessons: nextBookmarks,
        lastUpdated: Date.now()
      };
    });
  }, []);

  const isBookmarked = useCallback((lessonSlug) => {
    return progress.bookmarkedLessons.includes(lessonSlug);
  }, [progress.bookmarkedLessons]);

  // Course Assessment Scoring
  const recordAssessmentScore = useCallback((assessmentSlug, score, total, breakdown = {}) => {
    setProgress((prev) => ({
      ...prev,
      assessmentScores: {
        ...prev.assessmentScores,
        [assessmentSlug]: { score, total, breakdown, date: Date.now() }
      },
      lastUpdated: Date.now()
    }));
  }, []);

  const getAssessmentScore = useCallback((assessmentSlug) => {
    return progress.assessmentScores ? progress.assessmentScores[assessmentSlug] || null : null;
  }, [progress.assessmentScores]);

  // Reset Progress
  const resetProgress = useCallback(() => {
    const today = getTodayDateString();
    setProgress({
      completedLessons: [],
      lastOpenedLesson: null,
      quizScores: {},
      completedExercises: {},
      completedChallenges: [],
      challengeAttempts: {},
      projectMilestones: {},
      bookmarkedLessons: [],
      flaggedQuestions: [],
      assessmentScores: {},
      streakData: { currentStreak: 1, lastActiveDate: today },
      lastUpdated: Date.now()
    });
  }, []);

  // Course Progress Calculator
  const getCourseProgress = useCallback((courseSlug) => {
    const course = COURSES.find((c) => c.slug === courseSlug);
    if (!course || !course.lessons) return { completed: 0, total: 0, percent: 0 };

    const availableLessons = course.lessons.filter((l) => l.status === 'available');
    if (availableLessons.length === 0) return { completed: 0, total: 0, percent: 0 };

    const completed = availableLessons.filter((l) => progress.completedLessons.includes(l.id)).length;
    const percent = Math.round((completed / availableLessons.length) * 100);

    return { completed, total: availableLessons.length, percent };
  }, [progress.completedLessons]);

  // Overall Platform Progress Calculator
  const getOverallProgress = useCallback(() => {
    const totalAvailable = Object.keys(LESSONS).length;
    if (totalAvailable === 0) return { completed: 0, total: 0, percent: 0 };

    const completed = progress.completedLessons.filter((id) =>
      Object.values(LESSONS).some((lesson) => lesson.id === id)
    ).length;

    const percent = Math.round((completed / totalAvailable) * 100);
    return { completed, total: totalAvailable, percent };
  }, [progress.completedLessons]);

  // Prerequisite-Aware Next Step Recommender
  const getRecommendedNextStep = useCallback(() => {
    for (const course of COURSES) {
      if (course.status !== 'available' || !course.lessons) continue;

      for (const lessonSummary of course.lessons) {
        if (!progress.completedLessons.includes(lessonSummary.id)) {
          const lesson = LESSONS[lessonSummary.slug];
          return {
            courseTitle: course.title,
            courseSlug: course.slug,
            lessonId: lessonSummary.id,
            lessonSlug: lessonSummary.slug,
            lessonTitle: lessonSummary.title,
            duration: lessonSummary.duration,
            reason: `Next incomplete lesson in ${course.title}`
          };
        }
      }
    }

    // All available lessons completed! Recommend a project or challenge
    return {
      courseTitle: 'Full-Stack Mastery',
      courseSlug: 'projects',
      lessonId: 'capstone',
      lessonSlug: 'projects/full-stack-municipal-portal',
      lessonTitle: 'Capstone Project: Full-Stack Municipal Redressal',
      duration: '4-6 hours',
      reason: 'All foundation courses complete! Ready for capstone project implementation.'
    };
  }, [progress.completedLessons]);

  const value = useMemo(() => ({
    completedLessons: progress.completedLessons,
    lastOpenedLesson: progress.lastOpenedLesson,
    quizScores: progress.quizScores,
    completedExercises: progress.completedExercises,
    completedChallenges: progress.completedChallenges,
    challengeAttempts: progress.challengeAttempts,
    projectMilestones: progress.projectMilestones,
    projectNotes: progress.projectNotes,
    projectStatusOverride: progress.projectStatusOverride,
    projectTestingChecklist: progress.projectTestingChecklist,
    productionChecklist: progress.productionChecklist,
    interviewAttempts: progress.interviewAttempts,
    portfolioProject: progress.portfolioProject,
    bookmarkedLessons: progress.bookmarkedLessons,
    flaggedQuestions: progress.flaggedQuestions,
    assessmentScores: progress.assessmentScores,
    streakData: progress.streakData,
    toggleLessonComplete,
    isLessonComplete,
    setLastOpenedLesson,
    recordQuizScore,
    getQuizScore,
    toggleExerciseComplete,
    isExerciseComplete,
    recordChallengeAttempt,
    isChallengeComplete,
    toggleProjectMilestone,
    isProjectMilestoneComplete,
    getProjectProgress,
    setProjectNote,
    getProjectNote,
    setProjectStatus,
    getProjectStatus,
    toggleProjectTestItem,
    isProjectTestItemVerified,
    toggleProductionChecklistItem,
    isProductionChecklistItemComplete,
    getProductionChecklistProgress,
    recordInterviewAttempt,
    getInterviewAttempt,
    updatePortfolioProject,
    getPortfolioProject,
    toggleBookmark,
    isBookmarked,
    recordAssessmentScore,
    getAssessmentScore,
    getCourseProgress,
    getOverallProgress,
    getRecommendedNextStep,
    resetProgress
  }), [
    progress,
    toggleLessonComplete,
    isLessonComplete,
    setLastOpenedLesson,
    recordQuizScore,
    getQuizScore,
    toggleExerciseComplete,
    isExerciseComplete,
    recordChallengeAttempt,
    isChallengeComplete,
    toggleProjectMilestone,
    isProjectMilestoneComplete,
    getProjectProgress,
    setProjectNote,
    getProjectNote,
    setProjectStatus,
    getProjectStatus,
    toggleProjectTestItem,
    isProjectTestItemVerified,
    toggleProductionChecklistItem,
    isProductionChecklistItemComplete,
    getProductionChecklistProgress,
    recordInterviewAttempt,
    getInterviewAttempt,
    updatePortfolioProject,
    getPortfolioProject,
    toggleBookmark,
    isBookmarked,
    recordAssessmentScore,
    getAssessmentScore,
    getCourseProgress,
    getOverallProgress,
    getRecommendedNextStep,
    resetProgress
  ]);

  return (
    <ProgressContext.Provider value={value}>
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
