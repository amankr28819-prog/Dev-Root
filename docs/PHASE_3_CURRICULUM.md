# Dev-root Phase 3 — Curriculum Architecture & Depth Specification

## 1. Executive Curriculum Overview

Phase 3 established a new content-depth standard across Dev-root, moving away from high-level ~250–350 word summaries and into comprehensive, deep, and pedagogically sound technical instruction (~1,200–2,500+ words per focused lesson when combining conceptual sections, code walk-throughs, debugging guides, guided exercises, multi-tier hints, and quizzes).

Large subjects previously compressed into 1–2 pages have been restructured into modular, multi-lesson pathways.

---

## 2. Rebuilt HTML from Zero Curriculum (Course 3)

Course 3 now features 5 dedicated, in-depth technical lessons covering the complete W3C HTML5 specification from zero prior knowledge through advanced web accessibility and production capstones:

| Lesson Identifier | Lesson Title | Key Concepts & Modules Covered | Interactive Element |
| :--- | :--- | :--- | :--- |
| `html-foundations-and-syntax` | HTML Syntax, Tags, Elements & Document Structure | Module 1 & 2: HTML vs CSS vs JS, Opening/closing tags, Void elements, Nesting hierarchy, `<!DOCTYPE html>`, `<head>` metadata, UTF-8, Viewport meta tag, Developer Tools DOM tree inspection. | `HtmlPlayground` |
| `html-document-structure-and-semantics` | Document Hierarchy & Modern Semantic Landmarks | Module 3 & 8: Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`), Unbroken heading hierarchy (`<h1>`-`<h6>`), `<strong>` vs `<b>`, `<em>` vs `<i>`, eliminating "div soup". | `HtmlPlayground` |
| `html-links-media-and-tables` | Links, Responsive Media & Data Tables | Module 4, 5 & 6: Absolute vs relative URLs, `target="_blank"` with `rel="noopener noreferrer"`, `<img>` alt text guidelines, `<figure>`/`<figcaption>`, Accessible tables with `<caption>`, `<thead>`, `<tbody>`, `scope="col"`, and `scope="row"`. | `HtmlPlayground` |
| `html-forms-and-accessible-inputs` | Accessible Web Forms, Inputs & Client Validation | Module 7: The `<form>` container, `GET` vs `POST`, Explicit `<label for="...">` contract, Inputs (`text`, `email`, `password`, `number`, `radio`, `checkbox`), `<fieldset>` and `<legend>`, and why client validation is UX, not security. | `HtmlPlayground` |
| `html-accessibility-and-projects` | Web Accessibility (a11y), Screen Readers & Capstone Project | Module 9 & 10: WCAG POUR principles, Accessibility Tree, First Rule of ARIA, Keyboard navigation, Skip links, and a complete Semantic Civic Portal Capstone Project. | `HtmlPlayground` |

---

## 3. Rebuilt CSS from Zero Curriculum (Course 4)

Course 4 now features 5 comprehensive lessons advancing from selector specificity to modern 3D perspective and mobile-first responsive architecture:

| Lesson Identifier | Lesson Title | Key Concepts & Modules Covered | Interactive Element |
| :--- | :--- | :--- | :--- |
| `css-fundamentals-and-syntax` | CSS Syntax, Selectors, Specificity & The Cascade | Module 1 & 2: External stylesheets vs inline, Selector hierarchy, Combinators, Specificity calculations `(Inline, ID, Class, Element)`, The Cascade, and avoiding `!important`. | `CssPlayground` |
| `css-colors-units-and-typography` | Colors, Modern Units, Web Typography & Visual Styling | Module 3 & 9: Hex, RGB, HSL color models, Absolute `px` vs Relative `rem`/`em`/`vh`/`vw`, Fluid typography with `clamp()`, WCAG 4.5:1 contrast ratios, layered shadows, and borders. | `CssPlayground` |
| `css-box-model-and-selectors` | The CSS Box Model, Normal Flow & Positioning | Module 4 & 5: Content, Padding, Border, Margin, `box-sizing: border-box` universal reset, Margin collapsing, Normal document flow, Positioning (`static`, `relative`, `absolute`, `fixed`, `sticky`, `z-index`). | `BoxModel3D` |
| `css-flexbox-and-grid` | 1D Layouts with Flexbox & 2D Layouts with CSS Grid | Module 6 & 7: 1D Flexbox (Main vs Cross axis, `justify-content`, `align-items`, `gap`, `flex`), 2D CSS Grid (`grid-template-columns`, `repeat(auto-fit, minmax(280px, 1fr))`, `fr` units), Macro Grid + Micro Flexbox. | `CssPlayground` |
| `css-responsive-and-animations` | Mobile-First Responsive Design, Transforms & Keyframe Animations | Module 8, 10, 11 & 12: Mobile-first with `@media (min-width: ...)`, Standard breakpoints, GPU-accelerated `transform` and `opacity`, CSS 3D perspective, `@keyframes`, and `@media (prefers-reduced-motion: reduce)`. | `CssPlayground` |

---

## 4. Upgraded Foundation & Advanced Courses

In addition to HTML and CSS, all existing foundational and programming courses were expanded to match the new depth standard:
* **Course 1: Understanding the Web:**
  * `how-websites-work`: Global Internet infrastructure vs HTTP Web service, Client-Server model, static vs dynamic applications.
  * `frontend-vs-backend`: Runtimes (Browser vs Node.js), The Trust Boundary, REST API communication over JSON.
  * `what-happens-when-you-open-a-website`: URL parsing, DNS recursive resolution, TCP 3-way handshake (SYN, SYN-ACK, ACK), TLS cryptographic negotiation, Critical Rendering Path (DOM, CSSOM, Layout, Paint).
  * `http-requests-and-responses`: HTTP methods (GET, POST, PUT, PATCH, DELETE), Idempotence, Status codes (2xx, 3xx, 4xx, 5xx), JSON formatting rules.
* **Course 2: Developer Setup & Essential Tools:**
  * `terminal-and-file-fundamentals`: CLI vs GUI, Absolute vs relative paths, Shell commands, System PATH variable.
  * `code-editors-and-devtools`: VS Code extensions, Elements panel DOM/Box model inspection, Console REPL, Network tab waterfall analysis.
* **Course 5: JavaScript Fundamentals:**
  * `javascript-variables-types-and-logic`: `const` vs `let` vs `var`, Primitives vs Reference objects, Strict equality (`===`), Control flow.
  * `javascript-functions-and-scope`: Parameters vs arguments, Arrow functions, Lexical scoping, Closures, Temporal Dead Zone.
* **Course 6: The Browser and the DOM:**
  * `dom-manipulation-and-events`: DOM tree parsing, `querySelector`/`querySelectorAll`, Safe `textContent` vs XSS in `innerHTML`, `classList`, `addEventListener`, `event.preventDefault()`, and event bubbling.
* **Course 8: Git, GitHub, and Collaboration:**
  * `git-fundamentals-and-commits`: Distributed VCS, The Three Trees (Working Directory, Staging Area, Repository), Atomic commits, Conventional Commits specification.
* **Course 18: CRP India Real-World Case Studies:**
  * `crp-india-architecture-deep-dive`: Monorepo structure, MERN architecture, Mongoose status timeline audit trails, bcrypt password hashing, and JWT role-based access control.

---

## 5. Course Identification & Slug Stability

To protect user progress stored in `localStorage` under `devroot_progress_v1`, existing lesson slugs were retained as permanent anchors:
* `how-websites-work` (Course 1, Lesson 1)
* `frontend-vs-backend` (Course 1, Lesson 2)
* `what-happens-when-you-open-a-website` (Course 1, Lesson 3)
* `http-requests-and-responses` (Course 1, Lesson 4)
* `terminal-and-file-fundamentals` (Course 2, Lesson 1)
* `code-editors-and-devtools` (Course 2, Lesson 2)
* `html-document-structure-and-semantics` (Course 3, Lesson 2 - stable slug)
* `html-forms-and-accessible-inputs` (Course 3, Lesson 4 - stable slug)
* `css-box-model-and-selectors` (Course 4, Lesson 3 - stable slug)
* `css-flexbox-and-grid` (Course 4, Lesson 4 - stable slug)
* `javascript-variables-types-and-logic` (Course 5, Lesson 1)
* `javascript-functions-and-scope` (Course 5, Lesson 2)
* `dom-manipulation-and-events` (Course 6, Lesson 1)
* `git-fundamentals-and-commits` (Course 8, Lesson 1)
* `crp-india-architecture-deep-dive` (Course 18, Lesson 1)

Newly added lessons use clean, predictable, semantic slugs:
* `html-foundations-and-syntax`
* `html-links-media-and-tables`
* `html-accessibility-and-projects`
* `css-fundamentals-and-syntax`
* `css-colors-units-and-typography`
* `css-responsive-and-animations`
