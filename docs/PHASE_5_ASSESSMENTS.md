# DEV-ROOT — Phase 5: Knowledge Assessment System

## 1. System Philosophy
Phase 5 introduces a multi-tier knowledge assessment framework designed to test genuine problem-solving, code interpretation, and debugging ability rather than simple rote memorization.

Assessments operate at two levels:
1. **Lesson-Level Knowledge Checks (`Quiz.jsx`):** 2–5 focused questions at the end of every published lesson.
2. **Course-Level Comprehensive Assessments (`assessments.js`, `Assessments.jsx`, `AssessmentDetail.jsx`):** Formal evaluations testing synthesis across entire courses.

---

## 2. Multi-Type Question Formats
Dev-root assessments support 5 distinct pedagogical question types:
1. **Multiple-Choice Questions:** Standard single-select questions testing core conceptual principles and terminology.
2. **Multiple-Select Questions:** Checkbox questions ("Select all that apply") requiring learners to identify all correct rules (e.g. WCAG form constraints, pure array methods, security attributes). Partial selections are scored strictly.
3. **True / False Questions:** Direct verification of web development mental models and common myths (e.g. whether semantic elements carry default visual styling, whether JWT payloads are encrypted).
4. **Output Prediction Questions:** Realistic code snippets where learners predict the exact runtime output or layout dimension (e.g. type coercion `[] == false`, CSS `box-sizing: border-box` calculations, React state batching).
5. **Code-Reading & Debugging Questions:** Real-world scenarios where learners identify flaws, security vulnerabilities (SQL injection, XSS token exposure), or accessibility errors.

---

## 3. Educational Quality & Diagnostic Feedback
Every question in the assessment system includes:
- **`topic`:** A localized sub-topic label used for diagnostic performance aggregation.
- **`lessonSlug`:** A direct mapping to the specific Dev-Root lesson covering the concept.
- **`explanation`:** A thorough explanation of why the correct option is right AND why common incorrect alternatives fail.
- **Diagnostic Results Report:**
  - Aggregates user performance into **Strong Areas** and **Topics To Review**.
  - Recommends direct lesson review links for every missed topic.
  - Compares the score against the course's `passingScorePercent` (70–75%).
  - Retake capability allowing learners to clear previous answers and re-test their understanding.

---

## 4. Current Course Assessments
- **Course 1:** HTML5 & Web Architecture (`html5-web-architecture`)
- **Course 3:** Modern CSS & Responsive Layouts (`css-mastery-and-layouts`)
- **Course 4:** JavaScript Core & Problem Solving (`javascript-foundations-and-logic`)
- **Course 7:** React Architecture & Hooks (`react-architecture-and-hooks`)
- **Course 11:** Authentication, Authorization & Security (`authentication-and-web-security`)

---

## 5. Technical Implementation
- Pure client-side execution; zero external AI API dependencies.
- Answer keys and explanations are stored deterministically in `src/data/assessments.js`.
- Results persist to browser `localStorage` via `ProgressContext.recordAssessmentScore()` and feed into the Revision Hub and Home Dashboard metrics.
