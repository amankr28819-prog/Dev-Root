# DEV-ROOT — Phase 5: Interactive Learning & Playground System

## 1. Overview & Pedagogical Purpose
Dev-root Phase 5 elevates the platform from presenting static curriculum text to an active interactive learning environment. Learners reinforce concepts through:
- In-situ interactive code sandboxes (`HtmlPlayground`, `CssPlayground`).
- Progressive coding challenges with automated unit test verification (`ChallengeRunner`).
- Interactive lessons with quick tables of contents, progressive hints, and bookmarked revision flags.
- Real-time diagnostic error feedback rather than vague "Incorrect" notices.

---

## 2. In-Lesson Interactive Experience (`LessonView.jsx`)
In Dev-Root Phase 5, `LessonView.jsx` provides:
1. **Interactive Table of Contents (TOC):** A dedicated navigational scanning bar allowing rapid jumping between Objectives, Conceptual Sections, Interactive Laboratories, Guided Exercises, Knowledge Check Quizzes, Key Takeaways, and Real-World Case Studies.
2. **One-Click Bookmark for Revision:** Learners can toggle `Bookmark for Revision` at the top of any lesson, seamlessly persisting the lesson into their personalized Revision Hub.
3. **Structured Completion Model:** Clear visual distinction between reading a lesson and demonstrating comprehension via quizzes and challenges.
4. **Previous / Next Navigation:** Dynamic previous and next lesson links respecting the formal course sequence and curriculum prerequisites.

---

## 3. Enhanced HTML & CSS Playgrounds (`HtmlPlayground.jsx` & `CssPlayground.jsx`)
The playground system was overhauled to support dual-mode editing and real-world UI reproduction:
1. **Combined HTML + CSS Editing:**
   - Learners toggle seamlessly between HTML markup and CSS rules via intuitive editor tabs.
   - Live sandboxed rendering into an isolated `iframe` with `sandbox="allow-scripts"` to prevent parent-window DOM tampering.
2. **Prebuilt Component Templates:**
   - **Blank / Starter:** Minimal starting skeleton for experimentation.
   - **Component: Profile Card:** Flexbox card layout with avatar, typography scales, badge pill, and action button.
   - **Component: Responsive Navbar:** Flexbox layout demonstrating brand title, desktop navigation links, and call-to-action button.
   - **Component: Accessible Form:** Fully styled grievance submission form with semantic labels, required select dropdown, textarea, and submit button.
3. **Safety & Sandboxing:**
   - Code runs entirely client-side inside the learner's browser.
   - Parent state and credentials remain strictly inaccessible from inside the iframe context.

---

## 4. Coding Challenge Engine (`src/components/ChallengeRunner.jsx` & `src/utils/challengeEvaluator.js`)
The coding challenge runner allows learners to practice writing code with immediate, actionable feedback:
1. **Safe Client-Side Evaluation Engine:**
   - **HTML Challenges:** Parsed with native browser `DOMParser()`. Verifies semantic element presence, required attributes (e.g. `datetime` on `<time>`, `for`/`id` parity on form labels), and heading nesting.
   - **CSS Challenges:** Verifies selector rules, custom property declarations (`--token`), and layout declarations.
   - **JavaScript Challenges:** Evaluated inside an isolated `new Function()` sandbox. Runs automated test cases against learner functions and returns detailed assertions (e.g. `Test Case #1 Failed: Expected [Ward 4] Roads (#101), but got undefined`).
   - **React Challenges:** Verifies component declaration, hook usage (`useState`), and JSX return structure without requiring external runtime dependencies.
2. **Multi-Tier Progressive Hints:**
   - Challenges do not reveal answers immediately.
   - Learners unlock Level 1 (conceptual nudges), Level 2 (architectural guidance), and Level 3 (syntax clues) sequentially.
3. **Reference Solution Walkthrough:**
   - Fully documented reference code with line-by-line explanation of why the approach is optimal and common anti-patterns to avoid.
