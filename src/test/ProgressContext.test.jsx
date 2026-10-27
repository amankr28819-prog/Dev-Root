import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { ProgressProvider, useProgress } from '../context/ProgressContext';

describe('ProgressContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with default empty completedLessons', () => {
    const { result } = renderHook(() => useProgress(), {
      wrapper: ProgressProvider
    });

    expect(result.current.completedLessons).toEqual([]);
    expect(result.current.getOverallProgress().completed).toBe(0);
    expect(result.current.getOverallProgress().percent).toBe(0);
  });

  it('toggles a lesson as complete and updates progress statistics', () => {
    const { result } = renderHook(() => useProgress(), {
      wrapper: ProgressProvider
    });

    act(() => {
      result.current.toggleLessonComplete('lesson-1-1');
    });

    expect(result.current.isLessonComplete('lesson-1-1')).toBe(true);
    expect(result.current.completedLessons).toContain('lesson-1-1');
    expect(result.current.getOverallProgress().completed).toBe(1);
  });

  it('reverses completion when toggleLessonComplete is called again', () => {
    const { result } = renderHook(() => useProgress(), {
      wrapper: ProgressProvider
    });

    act(() => {
      result.current.toggleLessonComplete('lesson-1-1');
    });
    expect(result.current.isLessonComplete('lesson-1-1')).toBe(true);

    act(() => {
      result.current.toggleLessonComplete('lesson-1-1');
    });
    expect(result.current.isLessonComplete('lesson-1-1')).toBe(false);
    expect(result.current.getOverallProgress().completed).toBe(0);
  });

  it('persists and calculates course-level progress accurately', () => {
    const { result } = renderHook(() => useProgress(), {
      wrapper: ProgressProvider
    });

    act(() => {
      result.current.toggleLessonComplete('lesson-1-1');
      result.current.toggleLessonComplete('lesson-1-2');
    });

    const courseProg = result.current.getCourseProgress('web-internet-fundamentals');
    expect(courseProg.completed).toBe(2);
    expect(courseProg.total).toBe(3); // 3 available lessons in course 1
    expect(courseProg.percent).toBe(67);
  });

  it('updates and persists lastOpenedLesson', () => {
    const { result } = renderHook(() => useProgress(), {
      wrapper: ProgressProvider
    });

    act(() => {
      result.current.setLastOpenedLesson('how-websites-work');
    });

    expect(result.current.lastOpenedLesson).toBe('how-websites-work');
  });
});
