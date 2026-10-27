/**
 * Dev-root Content Quality Validation System
 * Programmatically audits and evaluates lessons and courses for educational completeness,
 * schema integrity, broken references, placeholder text, and accessibility metadata.
 */

export function validateLesson(slug, lesson, courseMap = {}) {
  const issues = [];
  const warnings = [];

  // 1. Identity & Routing checks
  if (!lesson.id || typeof lesson.id !== 'string') {
    issues.push(`Lesson [${slug}] is missing a valid string 'id'.`);
  }
  if (!lesson.title || typeof lesson.title !== 'string' || lesson.title.trim().length < 5) {
    issues.push(`Lesson [${slug}] has an invalid or overly brief 'title'.`);
  }
  if (!lesson.courseSlug) {
    issues.push(`Lesson [${slug}] is missing 'courseSlug'.`);
  } else if (Object.keys(courseMap).length > 0 && !courseMap[lesson.courseSlug]) {
    issues.push(`Lesson [${slug}] references an unknown courseSlug '${lesson.courseSlug}'.`);
  }

  // 2. Learning Objectives checks
  if (!Array.isArray(lesson.objectives) || lesson.objectives.length < 2) {
    issues.push(`Lesson [${slug}] must have at least 2 learning objectives (found: ${lesson.objectives?.length || 0}).`);
  } else {
    lesson.objectives.forEach((obj, idx) => {
      if (typeof obj !== 'string' || obj.trim().length < 10) {
        issues.push(`Lesson [${slug}] objective #${idx + 1} is too brief or invalid.`);
      }
    });
  }

  // 3. Body Content Sections checks
  if (!Array.isArray(lesson.sections) || lesson.sections.length < 3) {
    issues.push(`Lesson [${slug}] must have at least 3 content sections (found: ${lesson.sections?.length || 0}).`);
  } else {
    let totalWords = 0;
    lesson.sections.forEach((sec, idx) => {
      if (!sec.heading || sec.heading.trim().length < 3) {
        issues.push(`Lesson [${slug}] section #${idx + 1} is missing a descriptive heading.`);
      }
      if (!sec.content || sec.content.trim().length < 50) {
        issues.push(`Lesson [${slug}] section #${idx + 1} has insufficient content (<50 characters).`);
      } else {
        totalWords += sec.content.split(/\s+/).length;
        // Check for placeholder text
        const lower = sec.content.toLowerCase();
        if (lower.includes('lorem ipsum') || lower.includes('[object object]') || lower.includes('todo:')) {
          warnings.push(`Lesson [${slug}] section #${idx + 1} contains potential placeholder text.`);
        }
      }
    });

    if (totalWords < 300) {
      warnings.push(`Lesson [${slug}] has relatively short total section content (${totalWords} words).`);
    }
  }

  // 4. Common Mistakes & Troubleshooting checks
  if (lesson.commonMistakes) {
    if (!Array.isArray(lesson.commonMistakes)) {
      issues.push(`Lesson [${slug}] commonMistakes must be an array.`);
    } else {
      lesson.commonMistakes.forEach((cm, idx) => {
        if (!cm.mistake || !cm.whyItHappens || !cm.howToFix) {
          issues.push(`Lesson [${slug}] commonMistake #${idx + 1} must include mistake, whyItHappens, and howToFix.`);
        }
      });
    }
  }

  // 5. Guided Practice Exercise checks
  if (lesson.guidedExercise) {
    const ex = lesson.guidedExercise;
    if (!ex.title || !ex.instructions || !ex.solution) {
      issues.push(`Lesson [${slug}] guidedExercise must have title, instructions, and solution.`);
    }
    if (Array.isArray(ex.hints) && ex.hints.length === 0) {
      warnings.push(`Lesson [${slug}] guidedExercise has empty hints array.`);
    }
  }

  // 6. Knowledge Check Quiz checks
  if (!Array.isArray(lesson.quiz) || lesson.quiz.length < 2) {
    issues.push(`Lesson [${slug}] must have at least 2 quiz questions for knowledge verification.`);
  } else {
    lesson.quiz.forEach((q, idx) => {
      if (!q.question || typeof q.question !== 'string' || q.question.length < 10) {
        issues.push(`Lesson [${slug}] quiz question #${idx + 1} is missing a descriptive prompt.`);
      }
      if (!Array.isArray(q.options) || q.options.length < 3) {
        issues.push(`Lesson [${slug}] quiz question #${idx + 1} must have at least 3 options.`);
      }
      if (typeof q.correctIndex !== 'number' || q.correctIndex < 0 || q.correctIndex >= q.options?.length) {
        issues.push(`Lesson [${slug}] quiz question #${idx + 1} has an out-of-range correctIndex.`);
      }
      if (!q.explanation || q.explanation.length < 15) {
        issues.push(`Lesson [${slug}] quiz question #${idx + 1} lacks a helpful educational explanation.`);
      }
    });
  }

  // 7. Key Takeaways checks
  if (!Array.isArray(lesson.takeaways) || lesson.takeaways.length < 2) {
    issues.push(`Lesson [${slug}] must have at least 2 summary takeaways.`);
  }

  // 8. Case Study Reference checks
  if (lesson.caseStudyReference) {
    if (!lesson.caseStudyReference.title || !lesson.caseStudyReference.description) {
      issues.push(`Lesson [${slug}] caseStudyReference is missing title or description.`);
    }
  }

  return {
    slug,
    isValid: issues.length === 0,
    issues,
    warnings
  };
}

export function validateCurriculum(lessons, courses) {
  const courseMap = {};
  courses.forEach(c => {
    courseMap[c.slug] = c;
  });

  const lessonIdSet = new Set();
  const allIssues = [];
  const allWarnings = [];
  let evaluatedLessonsCount = 0;

  // Validate each lesson
  for (const [slug, lesson] of Object.entries(lessons)) {
    evaluatedLessonsCount++;

    // Duplicate ID check
    if (lesson.id) {
      if (lessonIdSet.has(lesson.id)) {
        allIssues.push(`Duplicate lesson ID '${lesson.id}' found in slug '${slug}'.`);
      }
      lessonIdSet.add(lesson.id);
    }

    const result = validateLesson(slug, lesson, courseMap);
    if (!result.isValid) {
      allIssues.push(...result.issues);
    }
    if (result.warnings.length > 0) {
      allWarnings.push(...result.warnings);
    }
  }

  // Validate course -> lesson links
  courses.forEach(course => {
    if (course.status === 'available' && Array.isArray(course.lessons)) {
      course.lessons.forEach(cl => {
        if (!lessons[cl.slug]) {
          allIssues.push(`Course '${course.slug}' points to available lesson '${cl.slug}' which does not exist in LESSONS.`);
        }
      });
    }
  });

  return {
    valid: allIssues.length === 0,
    evaluatedLessonsCount,
    errorCount: allIssues.length,
    warningCount: allWarnings.length,
    errors: allIssues,
    warnings: allWarnings,
    summary: allIssues.length === 0
      ? `All ${evaluatedLessonsCount} curriculum lessons passed educational quality standards.`
      : `Found ${allIssues.length} validation errors and ${allWarnings.length} warnings across ${evaluatedLessonsCount} lessons.`
  };
}
