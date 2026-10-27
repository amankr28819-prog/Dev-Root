/**
 * Dev-root Lessons Data Definition
 * Aggregates all modular, deeply comprehensive lesson modules across the curriculum.
 * Each module contains first-principles explanations, interactive playgrounds,
 * multi-tier progressive hint exercises, knowledge check quizzes, and real-world CRP India case studies.
 */

import { WEB_FUNDAMENTALS_LESSONS } from './lessons/webFundamentals.js';
import { DEV_SETUP_LESSONS } from './lessons/devSetup.js';
import { HTML_LESSONS } from './lessons/htmlCourse.js';
import { CSS_LESSONS } from './lessons/cssCourse.js';
import { JS_FUNDAMENTALS_LESSONS } from './lessons/jsFundamentals.js';
import { BROWSER_DOM_LESSONS } from './lessons/browserDom.js';
import { GIT_COLLABORATION_LESSONS } from './lessons/gitCollaboration.js';
import { CRP_CASE_STUDY_LESSONS } from './lessons/crpCaseStudyLesson.js';

export const LESSONS = {
  ...WEB_FUNDAMENTALS_LESSONS,
  ...DEV_SETUP_LESSONS,
  ...HTML_LESSONS,
  ...CSS_LESSONS,
  ...JS_FUNDAMENTALS_LESSONS,
  ...BROWSER_DOM_LESSONS,
  ...GIT_COLLABORATION_LESSONS,
  ...CRP_CASE_STUDY_LESSONS
};

