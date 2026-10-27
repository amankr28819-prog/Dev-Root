/**
 * Dev-root Lessons Data Definition (Phase 4 4x Teaching Depth Architecture)
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
import { MODERN_JS_LESSONS } from './lessons/modernJsCourse.js';
import { GIT_COLLABORATION_LESSONS } from './lessons/gitCollaboration.js';
import { REACT_LESSONS } from './lessons/reactCourse.js';
import { NODE_EXPRESS_LESSONS } from './lessons/nodeExpressCourse.js';
import { DATABASES_LESSONS } from './lessons/databasesCourse.js';
import { AUTH_SECURITY_LESSONS } from './lessons/authSecurityCourse.js';
import { TESTING_LESSONS } from './lessons/testingCourse.js';
import { DEBUGGING_LESSONS } from './lessons/debuggingCourse.js';
import { DEPLOYMENT_LESSONS } from './lessons/deploymentCourse.js';
import { CAREER_READINESS_LESSONS } from './lessons/careerReadinessCourse.js';
import { CRP_CASE_STUDY_LESSONS } from './lessons/crpCaseStudyLesson.js';

export const LESSONS = {
  ...WEB_FUNDAMENTALS_LESSONS,
  ...DEV_SETUP_LESSONS,
  ...HTML_LESSONS,
  ...CSS_LESSONS,
  ...JS_FUNDAMENTALS_LESSONS,
  ...BROWSER_DOM_LESSONS,
  ...MODERN_JS_LESSONS,
  ...GIT_COLLABORATION_LESSONS,
  ...REACT_LESSONS,
  ...NODE_EXPRESS_LESSONS,
  ...DATABASES_LESSONS,
  ...AUTH_SECURITY_LESSONS,
  ...TESTING_LESSONS,
  ...DEBUGGING_LESSONS,
  ...DEPLOYMENT_LESSONS,
  ...CAREER_READINESS_LESSONS,
  ...CRP_CASE_STUDY_LESSONS
};

