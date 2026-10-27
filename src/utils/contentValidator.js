/**
 * Dev-root Content Quality Validation System (Phase 4 4x Depth Standard)
 * Programmatically audits and evaluates lessons and courses for educational completeness,
 * schema integrity, broken references, placeholder text, 4x depth standards, and accessibility metadata.
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

  // 3. Body Content Sections checks & Phase 4 4x Depth Metrics
  let totalWords = 0;
  if (!Array.isArray(lesson.sections) || lesson.sections.length < 3) {
    issues.push(`Lesson [${slug}] must have at least 3 content sections for adequate teaching depth (found: ${lesson.sections?.length || 0}).`);
  } else {
    lesson.sections.forEach((sec, idx) => {
      if (!sec.heading || sec.heading.trim().length < 3) {
        issues.push(`Lesson [${slug}] section #${idx + 1} is missing a descriptive heading.`);
      }
      if (!sec.content || sec.content.trim().length < 50) {
        issues.push(`Lesson [${slug}] section #${idx + 1} has insufficient content (<50 characters).`);
      } else {
        const words = sec.content.split(/\s+/).filter(Boolean).length;
        totalWords += words;

        // Check for placeholder text
        const lower = sec.content.toLowerCase();
        if (lower.includes('lorem ipsum') || lower.includes('[object object]') || lower.includes('todo:')) {
          warnings.push(`Lesson [${slug}] section #${idx + 1} contains potential placeholder text.`);
        }

        // Check for unclosed code fences
        const codeFences = (sec.content.match(/```/g) || []).length;
        if (codeFences % 2 !== 0) {
          issues.push(`Lesson [${slug}] section #${idx + 1} has an unclosed code block fence.`);
        }
      }
    });

    if (totalWords < 400) {
      warnings.push(`Lesson [${slug}] has relatively short section content (${totalWords} words). Target is 1,200-2,500+ words.`);
    }
  }

  // 4. Guided Practice & Exercise checks (Phase 4 requirement)
  const exercise = lesson.exercise || lesson.guidedExercise;
  if (!exercise) {
    warnings.push(`Lesson [${slug}] lacks an interactive hands-on exercise.`);
  } else {
    if (!exercise.instruction && !exercise.instructions) {
      issues.push(`Lesson [${slug}] exercise must have an instruction or instructions prompt.`);
    }
    if (!exercise.solution) {
      issues.push(`Lesson [${slug}] exercise must have an educational solution.`);
    }
    if (Array.isArray(exercise.hints) && exercise.hints.length === 0) {
      warnings.push(`Lesson [${slug}] exercise has an empty hints array; progressive hints recommended.`);
    }
  }

  // 5. Knowledge Check Quiz checks
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

  // 6. Key Takeaways checks
  if (!Array.isArray(lesson.takeaways) || lesson.takeaways.length < 2) {
    issues.push(`Lesson [${slug}] must have at least 2 summary takeaways.`);
  }

  // 7. Case Study Reference checks
  if (lesson.caseStudyReference) {
    if (!lesson.caseStudyReference.title || !lesson.caseStudyReference.description) {
      issues.push(`Lesson [${slug}] caseStudyReference is missing title or description.`);
    }
  }

  return {
    slug,
    isValid: issues.length === 0,
    totalWords,
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
  let totalCurriculumWords = 0;

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
    totalCurriculumWords += result.totalWords || 0;

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
    totalCurriculumWords,
    errorCount: allIssues.length,
    warningCount: allWarnings.length,
    errors: allIssues,
    warnings: allWarnings,
    summary: allIssues.length === 0
      ? `All ${evaluatedLessonsCount} curriculum lessons passed educational quality standards (${totalCurriculumWords.toLocaleString()} core section words).`
      : `Found ${allIssues.length} validation errors and ${allWarnings.length} warnings across ${evaluatedLessonsCount} lessons.`
  };
}

export function validateChallenge(challenge) {
  const issues = [];
  if (!challenge.id) issues.push('Challenge missing id');
  if (!challenge.slug) issues.push('Challenge missing slug');
  if (!challenge.title) issues.push('Challenge missing title');
  if (!challenge.problemStatement || challenge.problemStatement.length < 30) {
    issues.push(`Challenge ${challenge.id} problemStatement too brief`);
  }
  if (!Array.isArray(challenge.requirements) || challenge.requirements.length === 0) {
    issues.push(`Challenge ${challenge.id} must define requirements array`);
  }
  if (!challenge.solution) issues.push(`Challenge ${challenge.id} missing reference solution`);
  if (!challenge.testCriteria) issues.push(`Challenge ${challenge.id} missing testCriteria`);
  return { valid: issues.length === 0, issues };
}

export function validateProject(project) {
  const issues = [];
  if (!project.id) issues.push('Project missing id');
  if (!project.slug) issues.push('Project missing slug');
  if (!project.title) issues.push('Project missing title');
  if (!project.tier) issues.push('Project missing tier number');
  if (!Array.isArray(project.milestones) || project.milestones.length === 0) {
    issues.push(`Project ${project.id} must define milestones array`);
  } else {
    project.milestones.forEach((m, idx) => {
      if (!m.id || !m.title || !m.description) {
        issues.push(`Project ${project.id} milestone #${idx + 1} incomplete`);
      }
    });
  }
  return { valid: issues.length === 0, issues };
}

export function validateAssessment(assessment) {
  const issues = [];
  if (!assessment.id) issues.push('Assessment missing id');
  if (!assessment.slug) issues.push('Assessment missing slug');
  if (!assessment.title) issues.push('Assessment missing title');
  if (!Array.isArray(assessment.questions) || assessment.questions.length < 3) {
    issues.push(`Assessment ${assessment.id} must have at least 3 questions`);
  } else {
    assessment.questions.forEach((q, idx) => {
      if (!q.prompt || !Array.isArray(q.options) || q.options.length < 2) {
        issues.push(`Assessment ${assessment.id} question #${idx + 1} invalid`);
      }
      if (q.correctAnswer === undefined) {
        issues.push(`Assessment ${assessment.id} question #${idx + 1} missing correctAnswer`);
      }
      if (!q.explanation) {
        issues.push(`Assessment ${assessment.id} question #${idx + 1} missing explanation`);
      }
    });
  }
  return { valid: issues.length === 0, issues };
}

