# DEV-ROOT — Phase 5: Progress System, Streak Tracking & Recommendations

## 1. Storage Schema & Non-Destructive Extension
Dev-root progress is managed through `ProgressContext.jsx` and persisted under the stable local key `devroot_progress_v1`.

### Data Schema:
```json
{
  "completedLessons": {
    "how-websites-work": true,
    "html-document-structure": true
  },
  "completedExercises": {
    "how-websites-work-ex1": true
  },
  "quizScores": {
    "how-websites-work": { "score": 3, "total": 3, "date": "2026-10-28T02:00:00.000Z" }
  },
  "completedChallenges": {
    "ch-html-01": true
  },
  "challengeAttempts": {
    "ch-html-01": { "attempts": 2, "lastPassed": true, "hintsUsed": 1, "lastAttempt": 1793150000000 }
  },
  "projectMilestones": {
    "proj-01-profile-page-m1": true,
    "proj-01-profile-page-m2": true
  },
  "bookmarkedLessons": {
    "css-box-model": true
  },
  "flaggedQuestions": {
    "q-c3-1": true
  },
  "assessmentScores": {
    "assess-c1-html": {
      "scorePercent": 80,
      "correctCount": 4,
      "totalQuestions": 5,
      "passed": true,
      "strongTopics": ["Document Structure & Semantics"],
      "weakTopics": ["HTML Tables"],
      "recommendedLessons": ["html-tables-structured-data"],
      "date": "2026-10-28T02:30:00.000Z"
    }
  },
  "streakData": {
    "count": 3,
    "lastActiveDate": "2026-10-28"
  },
  "lastOpenedLesson": "html-document-structure"
}
```

---

## 2. Daily Learning Streak Calculation
- Evaluates `lastActiveDate` on every action.
- If last active date is today, streak is maintained.
- If last active date was yesterday, streak count increments by 1.
- If last active date was more than 1 day ago, streak resets to 1.
- Stored reliably without external network polling.

---

## 3. Prerequisite-Aware Next Step Recommendation Engine
Dev-root avoids arbitrary or random suggestions. The `getRecommendedNextStep()` method calculates recommendations deterministically:
1. Iterates through all courses and lessons in logical curriculum order.
2. Checks whether earlier foundational lessons are completed.
3. If an uncompleted lesson has all prerequisites met, it is recommended as the next milestone.
4. Checks assessment results: if any course assessment identified weak areas, the corresponding recommended review lesson is flagged.
5. Operates purely in-browser without any runtime AI API dependencies.
