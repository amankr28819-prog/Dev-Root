# Dev-root Phase 3 — Interactive Laboratories, Animations & 3D Experience

## 1. Interactive Educational Experience

Phase 3 introduces real-time in-browser experimentation so learners test concepts directly inside lessons rather than merely reading passive text.

---

## 2. Interactive Components

### 2.1 `HtmlPlayground.jsx` (Interactive HTML Sandbox)
* **Purpose:** Allows learners to edit raw HTML code and view the live rendered output in an isolated, sandboxed preview.
* **Security Architecture:**
  * Uses an `<iframe>` configured with `sandbox="allow-scripts"` to strictly isolate user-authored HTML/JS from the parent application\'s memory, cookies, and `localStorage`.
  * Renders markup via `srcdoc` dynamically as the user types.
* **Features:**
  * Syntax-colored code editor.
  * Reset button to restore starter boilerplate.
  * Copy to Clipboard button.
  * Live status indicator ("Ready", "Synced").

### 2.2 `CssPlayground.jsx` (Interactive Box Model & Layout Laboratory)
* **Purpose:** Enables visual experimentation with CSS box model and flexbox properties.
* **Features:**
  * Live sliders for `padding` (0–60px), `margin` (0–60px), `border-width` (0–12px), and `border-radius` (0–32px).
  * Toggle buttons for `box-sizing` (`border-box` vs `content-box`), demonstrating how `content-box` expands total element width.
  * Flexbox alignment controls (`justify-content`, `align-items`, `gap`).
  * Live CSS generator reflecting all slider values in real-time with one-click copy.

### 2.3 `BoxModel3D.jsx` (CSS 3D Perspective Box Model Demonstrator)
* **Purpose:** Visualizes the concentric layers of the CSS Box Model in 3D perspective space.
* **Technical Implementation:**
  * Uses pure, hardware-accelerated CSS 3D transforms (`perspective: 1200px`, `transform-style: preserve-3d`, `translateZ`, `rotateX`, `rotateY`).
  * Zero heavy external 3D libraries (Three.js, WebGL) ensuring instant load times and zero bundle bloat.
  * Interactive sliders for 3D horizontal tilt (Y-axis) and vertical tilt (X-axis).
  * **Exploded 3D View Toggle:** Separates the 4 layers in Z-depth space:
    * Margin (Z: +80px, Orange overlay)
    * Border (Z: +40px, Amber boundary)
    * Padding (Z: 0px, Emerald clearance)
    * Content Area (Z: -40px, Cyan target)
  * Hover layer highlights and dimensional callouts.

### 2.4 `Hero3D.jsx` (Interactive 3D Web Development Stack)
* **Purpose:** Distinctive hero section visual element representing the tripartite web stack (HTML, CSS, JavaScript).
* **Features:**
  * Mouse parallax tracking: tilting smoothly as the user hovers across the model.
  * Interactive toggle buttons to isolate HTML, CSS, or JS layers.
  * Exploded 3D view button.
  * Fully accessible with semantic labels and automatic fallback for reduced motion.

### 2.5 `Roadmap3D.jsx` (3D Interactive Learning Roadmap)
* **Purpose:** Replaces static progress lists with a 3D isometric perspective roadmap.
* **Features:**
  * Connects live to `useProgress()` to reflect real completion states.
  * Shows course stages: Web Fundamentals, HTML, CSS, JavaScript, React, Backend, Databases, Deployment.
  * Completed stages display green checkmarks and progress badges.
  * Clickable cards navigate directly to the relevant course.

### 2.6 `Exercise.jsx` (Multi-Tier Progressive Hints & Checklist)
* **Purpose:** Replaces all-or-nothing exercise solutions with guided hints.
* **Features:**
  * Multi-tier progressive hints revealed step-by-step:
    * Hint 1: Concept Direction
    * Hint 2: Implementation Clue
    * Hint 3: Code Structure Guidance
  * Interactive task checkboxes allowing learners to tick off requirements as they complete them.
  * Reference solution code block with detailed architectural explanations.
  * "Mark as Solved" button saving state to `localStorage`.

---

## 3. Motion System & Accessibility (`prefers-reduced-motion`)

Dev-root follows strict guidelines for respectful, performant animation:
* **GPU Acceleration:** Only `transform` and `opacity` are animated, avoiding browser reflow and layout lag.
* **Reduced Motion:** Every 3D component and animation respects `@media (prefers-reduced-motion: reduce)`, instantly disabling 3D rotations, transitions, and parallax for users with vestibular sensitivities.
