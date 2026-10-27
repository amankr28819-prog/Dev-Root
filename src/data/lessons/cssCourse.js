/**
 * Dev-root Course 4: CSS from Zero - Deep Learning Curriculum (Phase 4 4x Depth Standard)
 * Comprehensive, modular lessons covering CSS syntax, selectors, cascade,
 * box model, positioning, Flexbox, Grid, responsive design, variables, and animations.
 */

export const CSS_LESSONS = {
  'css-fundamentals-and-syntax': {
    id: 'lesson-4-1',
    slug: 'css-fundamentals-and-syntax',
    courseId: 'course-4',
    courseSlug: 'css-responsive-design',
    courseTitle: 'Course 4: CSS from Zero',
    title: 'CSS Syntax, Selectors, Specificity & The Cascade',
    category: 'Frontend',
    estimatedTime: '45 min read & practice',
    interactivePlayground: 'css',
    objectives: [
      'Understand the architecture of CSS: selectors, property-value declarations, and declaration blocks.',
      'Differentiate inline, internal, and external stylesheets and explain why external CSS is standard.',
      'Master the full selector spectrum: element, class, ID, attribute, descendant, child, and pseudo-classes.',
      'Calculate CSS specificity weights mathematically (Inline, ID, Class, Element) to resolve conflicting styles.',
      'Understand how inheritance and source order govern the Cascade without resorting to !important.',
      'Debug style collisions and inheritance overrides using browser DevTools Computed panel.'
    ],
    sections: [
      {
        heading: 'What is CSS and How Does It Connect to HTML?',
        content: `Cascading Style Sheets (CSS) is the declarative language used to describe the visual presentation and layout of an HTML document. While HTML defines the semantic skeleton (headings, paragraphs, buttons, forms), CSS dictates typography scales, color harmonies, spatial padding, grid arrangements, and animations.

### The Three Ways to Apply CSS:
1. **Inline Styles:** Written directly on individual elements using the \`style\` attribute:
   \`\`\`html
   <p style="color: #dc2626; font-size: 1.1rem; font-weight: bold;">Safety Warning</p>
   \`\`\`
   *Disadvantage:* Breaks separation of concerns, impossible to reuse across pages, bloats HTML file size, and carries excessive specificity weight. **Avoid inline styles in production markup**.
2. **Internal (Embedded) Styles:** Placed inside a \`<style>\` block within the HTML \`<head>\`:
   \`\`\`html
   <head>
     <style>
       body { font-family: system-ui, sans-serif; color: #1e293b; }
     </style>
   </head>
   \`\`\`
   *Use case:* Appropriate for single-file prototypes, email newsletters, or critical above-the-fold inline rendering.
3. **External Stylesheets (Industry Standard):** Written in dedicated \`.css\` files linked via the \`<link>\` element:
   \`\`\`html
   <link rel="stylesheet" href="/src/index.css">
   \`\`\`
   *Advantages:* Enables a single stylesheet to format thousands of pages across a domain, maximizes browser HTTP caching, keeps HTML files clean, and enables modular design token systems.`
      },
      {
        heading: 'Anatomy of a CSS Rule and the Selector Spectrum',
        content: `A CSS ruleset consists of a **selector** followed by a **declaration block** enclosed in curly braces:

\`\`\`
                 Declaration Block
             +-----------------------+
   Selector  |  Property     Value   |
   +-------+ |  +------+   +-------+ |
   | .card | {  background: #ffffff; |
   +-------+    padding:    1.5rem;  |
             }  +-------------------+
\`\`\`

### Selector Types and Syntax:
1. **Element Selector:** Targets all HTML elements of a specific type (e.g., \`p\`, \`h1\`, \`table\`). Low specificity.
   \`\`\`css
   p { line-height: 1.6; color: #334155; }
   \`\`\`
2. **Class Selector (\`.\`):** Targets any element with a matching class name. Can be reused across multiple elements.
   \`\`\`css
   .badge-resolved { background: #dcfce7; color: #15803d; }
   \`\`\`
3. **ID Selector (\`#\`):** Targets a single element with a matching unique \`id\` attribute. High specificity.
   \`\`\`css
   #main-header { box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
   \`\`\`
4. **Attribute Selector (\`[attr="value"]\`):** Targets elements based on attribute presence or value:
   \`\`\`css
   input[type="email"] { border-color: #3b82f6; }
   a[href^="https://"] { font-weight: 600; } /* Starts with https */
   \`\`\`
5. **Combinator Selectors:**
   * **Descendant (\`A B\`):** Targets B nested at any depth inside A (\`.card p\`).
   * **Direct Child (\`A > B\`):** Targets B only if it is an immediate child of A (\`.navbar > li\`).
   * **Adjacent Sibling (\`A + B\`):** Targets B immediately following A at the same tree level.
6. **Pseudo-Classes (\`:\`):** Targets elements in specific dynamic interaction states:
   \`\`\`css
   button:hover { background: #1d4ed8; }
   input:focus-visible { outline: 3px solid #2563eb; }
   tr:nth-child(even) { background: #f8fafc; } /* Zebra striping */
   \`\`\``
      },
      {
        heading: 'The Mathematics of CSS Specificity: Resolving Style Conflicts',
        content: `When two or more conflicting CSS rules target the same HTML element, the browser uses **Specificity** to determine which rule wins. Specificity is calculated as a 4-part numeric tuple:

\`\`\`
  ( Inline Styles , ID Selectors , Classes/Attributes/Pseudo-classes , Element Selectors )
         (A)             (B)                         (C)                         (D)
\`\`\`

### The Specificity Weight Table:
| Selector Example | Inline (A) | ID (B) | Class/Attr (C) | Element (D) | Total Specificity Score |
| :--- | :---: | :---: | :---: | :---: | :---: |
| \`p\` | 0 | 0 | 0 | 1 | (0, 0, 0, 1) |
| \`.btn\` | 0 | 0 | 1 | 0 | (0, 0, 1, 0) |
| \`.card .btn\` | 0 | 0 | 2 | 0 | (0, 0, 2, 0) |
| \`#ticket-402\` | 0 | 1 | 0 | 0 | (0, 1, 0, 0) |
| \`#ticket-402 .status\` | 0 | 1 | 1 | 0 | (0, 1, 1, 0) |
| \`<p style="color:red">\` | 1 | 0 | 0 | 0 | (1, 0, 0, 0) |

### Specificity Comparison Rule:
Compare tuples from left to right. **Higher columns always beat lower columns, regardless of how many lower-column selectors are chained!**
* A single ID selector \`(0, 1, 0, 0)\` will **always** defeat a selector with 100 classes chained together \`(0, 0, 100, 0)\`!
* An inline style \`(1, 0, 0, 0)\` defeats any stylesheet selector.

### Why You Should Avoid \`!important\`:
Adding \`!important\` to a declaration bypasses normal specificity, creating an unmaintainable specificity war where developers are forced to use increasingly convoluted selectors or more \`!important\` statements to override styles. Use low-specificity classes (\`.btn\`, \`.card\`) instead!`
      },
      {
        heading: 'How the Cascade Works: The Resolution Algorithm',
        content: `The "Cascade" in CSS is the formal algorithm browsers use to resolve conflicting properties. It evaluates competing rules in strict order:

1. **Origin and Importance:**
   * User Agent Styles (browser defaults like 16px body, bold headings).
   * User Styles (browser accessibility overrides).
   * Author Styles (the CSS written by the web developer).
   * Author \`!important\` declarations.
2. **Specificity:** The rule with the higher specificity tuple wins.
3. **Source Order:** If two rules share the exact same origin, importance, and specificity score, **the rule declared latest in the stylesheet wins**:

\`\`\`css
/* Both selectors have specificity (0, 0, 1, 0) */
.badge { background-color: #3b82f6; } /* Declared first */
.badge { background-color: #10b981; } /* Declared second -> WINS! */
\`\`\`

### Property Inheritance:
Certain CSS properties (such as \`color\`, \`font-family\`, \`font-size\`, \`line-height\`) automatically **inherit** from parent elements down to children. Other properties (such as \`border\`, \`margin\`, \`padding\`, \`background\`) **do not inherit**. You can force inheritance using the keyword \`inherit\`:

\`\`\`css
button {
  font-family: inherit; /* Inherits the clean system font set on <body> */
}
\`\`\``
      }
    ],
    exercise: {
      instruction: 'Create a stylesheet for a civic alert banner. Style the container with a class, apply a specific high-priority override using an ID, and create an accessible hover state for a nested button.',
      starterCode: `/* Write your CSS rules below */\n`,
      hints: [
        'Define a base class .alert-banner with background #fef3c7 and padding 1rem.',
        'Create an override rule #critical-alert with background #fee2e2 and border-color #ef4444.',
        'Style the nested button using .alert-banner button:hover with background #1e293b.'
      ],
      tasks: [
        'Define .alert-banner class rule',
        'Define #critical-alert ID override rule',
        'Add hover pseudo-class on button',
        'Do not use !important'
      ],
      solution: `.alert-banner {
  background-color: #fef3c7;
  color: #92400e;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  border: 1px solid #fde68a;
}

#critical-alert {
  background-color: #fee2e2;
  color: #991b1b;
  border-color: #f87171;
}

.alert-banner button {
  background-color: #2563eb;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.alert-banner button:hover {
  background-color: #1d4ed8;
}`,
      solutionExplanation: 'This demonstrates clean specificity architecture. The base class provides reusable layout parameters, while the specific ID selector cleanly overrides the color scheme for critical incidents without needing !important.'
    },
    quiz: [
      {
        question: 'Which of the following selectors has the highest specificity score and will override the others?',
        options: [
          'div.card p.text',
          '#sidebar .profile',
          'body div.container header nav a',
          '.sidebar .profile.active'
        ],
        correctIndex: 1,
        explanation: '#sidebar .profile has one ID and one class (0, 1, 1, 0). Because it contains an ID selector, it outranks all other options that rely only on classes and elements.'
      },
      {
        question: 'What happens when two identical CSS rules targeting the same class have the exact same specificity?',
        options: [
          'The browser cancels both rules and uses the default user-agent style.',
          'The rule declared latest in the stylesheet or loaded last takes precedence (Source Order).',
          'The rule with the shortest property name takes precedence.',
          'The browser randomly selects one at runtime.'
        ],
        correctIndex: 1,
        explanation: 'In the Cascade algorithm, when origin, importance, and specificity are tied, Source Order acts as the tie-breaker: the rule declared later in the CSS wins.'
      }
    ],
    takeaways: [
      'CSS rules consist of selectors and declaration blocks; external stylesheets are the professional standard.',
      'Specificity is calculated as (Inline, ID, Class, Element); higher columns always beat lower ones.',
      'Avoid using !important; structure your CSS using clean, low-specificity classes.',
      'Typography and colors inherit from parents, whereas box model properties (margin, padding) do not.'
    ],
    caseStudyReference: {
      title: 'Design Tokens & Class Hierarchy in CRP India',
      description: 'Review the Tailwind utility and custom CSS architecture in CRP India, observing how components use consistent class hierarchies rather than IDs.',
      files: [
        'reference-projects/CRP-India/frontend/src/index.css',
        'reference-projects/CRP-India/frontend/tailwind.config.js'
      ]
    }
  },

  'css-colors-units-and-typography': {
    id: 'lesson-4-2',
    slug: 'css-colors-units-and-typography',
    courseId: 'course-4',
    courseSlug: 'css-responsive-design',
    courseTitle: 'Course 4: CSS from Zero',
    title: 'Colors, Modern Units, Web Typography & Visual Styling',
    category: 'Frontend',
    estimatedTime: '45 min read & practice',
    interactivePlayground: 'css',
    objectives: [
      'Master modern CSS color spaces: Hexadecimal, RGB, HSL, and alpha transparency.',
      'Differentiate absolute units (px) from responsive relative units (rem, em, %, vh, vw, dvh).',
      'Explain why rem is the gold standard for accessible typography scales and spacing systems.',
      'Construct fluid typography and dynamic spacing using the clamp() math function.',
      'Enforce WCAG 2.1 AA color contrast standards (4.5:1 for normal text, 3:1 for large text).'
    ],
    sections: [
      {
        heading: 'The Modern CSS Color Formats: HEX, RGB, and HSL',
        content: `CSS offers multiple color models for expressing colors on screen:

### 1. Hexadecimal (HEX):
Hexadecimal notation uses a base-16 numbering system (\`0-9\` and \`A-F\`) to specify Red, Green, and Blue light intensities:
\`\`\`css
.primary { color: #2563eb; } /* #RRGGBB */
.translucent { color: #2563eb80; } /* #RRGGBBAA (50% alpha transparency) */
\`\`\`

### 2. RGB and RGBA:
Directly specifies Red, Green, and Blue photon intensities from 0 to 255:
\`\`\`css
.surface { background-color: rgb(37, 99, 235); }
.overlay { background-color: rgba(15, 23, 42, 0.75); /* 75% opacity */ }
\`\`\`

### 3. HSL (Hue, Saturation, Lightness): The Designer's Model
HSL is intuitive for human designers because it separates chromatic tint from vibrancy and brightness:
* **Hue (0–360°):** The angle on the color wheel (\`0°\` = Red, \`120°\` = Green, \`240°\` = Blue).
* **Saturation (0–100%):** \`0%\` is complete gray; \`100%\` is full, vivid color.
* **Lightness (0–100%):** \`0%\` is pitch black; \`50%\` is normal color; \`100%\` is pure white.

\`\`\`css
/* Generating consistent color palettes with HSL */
:root {
  --primary-base: hsl(220, 90%, 56%);
  --primary-hover: hsl(220, 90%, 46%); /* 10% darker on hover */
  --primary-light: hsl(220, 90%, 95%); /* Subtle background tint */
}
\`\`\``
      },
      {
        heading: 'Units in CSS: Absolute vs. Relative Units',
        content: `Choosing the correct CSS unit is critical for creating responsive, accessible user interfaces.

\`\`\`
   Absolute Units (Fixed)           Relative Units (Adaptive)
   +--------------------+           +---------------------------------+
   | px  (Pixels)       |           | rem  (Relative to Root <html>)  |
   | pt  (Points)       |           | em   (Relative to Parent font)  |
   | in  (Inches)       |           | %    (Relative to Parent width) |
   |                    |           | vh/vw (Viewport Height/Width)   |
   +--------------------+           +---------------------------------+
\`\`\`

### Why \`rem\` is the Gold Standard for Accessibility:
* **\`px\` (Pixels):** Absolute physical screen pixels. If a visually impaired user increases their operating system or browser default font size from 16px to 24px, text hardcoded in \`px\` will **refuse to scale**, breaking readability.
* **\`rem\` (Root EM):** Scaled relative to the root \`<html>\` element's font size. By default, 1rem = 16px.
  * \`1rem = 16px\`
  * \`1.5rem = 24px\`
  * \`2rem = 32px\`
When users adjust their browser base font setting, all dimensions defined in \`rem\` scale proportionately across the entire application!`
      },
      {
        heading: 'Viewport Units and the Mobile \`dvh\` Fix',
        content: `* **\`vw\` (Viewport Width):** 1vw equals 1% of the browser window's width.
* **\`vh\` (Viewport Height):** 1vh equals 1% of the browser window's height.

### The Mobile Viewport Bug and Dynamic Viewport (\`dvh\`):
On mobile devices (iOS Safari and Android Chrome), the browser's address bar expands and collapses as the user scrolls. Standard \`100vh\` does not account for this dynamic address bar, causing full-screen modals to get clipped underneath the URL bar.

Modern CSS provides **Dynamic Viewport Units**:
\`\`\`css
/* Safe, modern full-screen modal height */
.fullscreen-dialog {
  min-height: 100vh;  /* Fallback for older browsers */
  min-height: 100dvh; /* Dynamic: recalculates as address bar moves */
}
\`\`\``
      },
      {
        heading: 'Fluid Typography with the \`clamp()\` Function',
        content: `Traditionally, developers used multiple complex media queries to adjust font sizes across phone, tablet, and desktop viewports. Modern CSS eliminates this with the mathematical \`clamp()\` function:

\`\`\`css
/* clamp(MINIMUM, PREFERRED_FLUID_SCALING, MAXIMUM) */
h1 {
  font-size: clamp(1.75rem, 1rem + 3vw, 3rem);
}
\`\`\`
* On a mobile phone (360px wide), the font will never shrink below **1.75rem (28px)**.
* On a laptop (1440px wide), the fluid calculation expands smoothly.
* On a huge 4K monitor, the font will never grow larger than **3rem (48px)**.`
      }
    ],
    exercise: {
      instruction: 'Design a responsive typography scale and surface card using rem units, an HSL color theme, and clamp() fluid font sizing on the primary heading.',
      starterCode: `/* Write your responsive typography and colors below */\n`,
      hints: [
        'Set the root or body font-family to system-ui, sans-serif.',
        'Use font-size: clamp(1.5rem, 1rem + 2.5vw, 2.75rem) on h1.',
        'Style .card with padding: 1.5rem and background-color: hsl(220, 14%, 96%).'
      ],
      tasks: [
        'Use rem units for margins and paddings',
        'Use clamp() for fluid h1 font-size',
        'Use HSL notation for surface colors',
        'Ensure text contrast complies with accessibility'
      ],
      solution: `body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: hsl(222, 47%, 11%);
  background-color: hsl(210, 40%, 98%);
  line-height: 1.6;
}

h1 {
  font-size: clamp(1.5rem, 1rem + 2.5vw, 2.75rem);
  color: hsl(222, 47%, 15%);
  margin-bottom: 1rem;
}

.metric-card {
  background-color: hsl(0, 0%, 100%);
  border: 1px solid hsl(214, 32%, 91%);
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}`,
      solutionExplanation: 'This solution uses relative rem units that adapt to user accessibility preferences. The clamp function smoothly scales the heading across all screen sizes without needing media queries, and HSL values create a clean, consistent color palette.'
    },
    quiz: [
      {
        question: 'Why should font sizes on modern websites be specified in rem units rather than px?',
        options: [
          'rem units automatically enable spell-checking in text inputs.',
          'rem units respect user browser accessibility preferences, scaling proportionally when users increase their base text size.',
          'rem units are required by CSS Grid layouts.',
          'px units are deprecated in the CSS3 standard.'
        ],
        correctIndex: 1,
        explanation: 'px is an absolute unit that overrides user browser zoom and font-size accessibility settings. rem is relative to the root font-size, preserving accessibility.'
      },
      {
        question: 'In the expression "font-size: clamp(1.25rem, 1rem + 2vw, 2.5rem);", what does 2.5rem represent?',
        options: [
          'The default starting font size.',
          'The minimum allowable font size.',
          'The maximum allowable font size, ensuring the heading does not grow too large on desktop monitors.',
          'The line-height multiplier.'
        ],
        correctIndex: 2,
        explanation: 'clamp(MIN, PREFERRED, MAX) takes three parameters. 2.5rem is the upper bound (MAX) beyond which the text will not grow, regardless of how wide the viewport becomes.'
      }
    ],
    takeaways: [
      'HSL is the most practical color format for generating cohesive, harmonic UI themes.',
      'Use rem for typography and spatial scales to respect user accessibility preferences.',
      'Use dvh instead of vh for full-screen mobile layouts to prevent address bar clipping.',
      'Use clamp() for smooth fluid typography that scales across devices without brittle media query breakpoints.'
    ],
    caseStudyReference: {
      title: 'Design System & Typography Tokens in CRP India',
      description: 'Explore the typography scales and color palette defined in the CRP India Tailwind configuration and index.css.',
      files: [
        'reference-projects/CRP-India/frontend/tailwind.config.js',
        'reference-projects/CRP-India/frontend/src/index.css'
      ]
    }
  },

  'css-box-model-and-selectors': {
    id: 'lesson-4-3',
    slug: 'css-box-model-and-selectors',
    courseId: 'course-4',
    courseSlug: 'css-responsive-design',
    courseTitle: 'Course 4: CSS from Zero',
    title: 'The CSS Box Model, Normal Flow & Positioning',
    category: 'Frontend',
    estimatedTime: '45 min read & practice',
    interactivePlayground: 'box-model',
    objectives: [
      'Master the four concentric layers of the CSS Box Model (Content, Padding, Border, Margin).',
      'Understand the critical difference between box-sizing: content-box and box-sizing: border-box.',
      'Explain the mechanics of vertical margin collapsing and how to prevent it.',
      'Differentiate CSS display modes (block, inline, inline-block, none).',
      'Master document positioning modes: static, relative, absolute, fixed, and sticky.',
      'Understand stacking contexts, containing blocks, and z-index ordering.'
    ],
    sections: [
      {
        heading: 'The Foundation of All Web Layouts: The CSS Box Model',
        content: `In the browser's rendering engine, **every single element on an HTML page is a rectangular box**. Even circular user avatars or rounded buttons are calculated as rectangles with clipped borders.

\`\`\`
  +-------------------------------------------------------+
  |  MARGIN  (Transparent outer space between elements)   |
  |  +-------------------------------------------------+  |
  |  |  BORDER  (Visible stroke around the padding)    |  |
  |  |  +-------------------------------------------+  |  |
  |  |  |  PADDING  (Inner breathing room)          |  |  |
  |  |  |  +-------------------------------------+  |  |  |
  |  |  |  |  CONTENT (Text, image, or children) |  |  |  |
  |  |  |  +-------------------------------------+  |  |  |
  |  |  +-------------------------------------------+  |  |
  |  +-------------------------------------------------+  |
  +-------------------------------------------------------+
\`\`\`

### The Four Concentric Layers:
1. **Content Box:** The innermost area where text, images, or child elements appear. Dimensions controlled by \`width\` and \`height\`.
2. **Padding Box:** The clear space immediately surrounding the content, inside the border. Inherits the element's background color.
3. **Border Box:** The perimeter boundary surrounding the padding. Controlled by \`border-width\`, \`border-style\`, and \`border-color\`.
4. **Margin Box:** The transparent buffer space outside the border that pushes adjacent neighboring elements away.`
      },
      {
        heading: 'The Box-Sizing Revolution: content-box vs. border-box',
        content: `The default calculation method inherited from early web standards is \`box-sizing: content-box\`. In this legacy mode:
\`\`\`
Actual Rendered Width = width + padding-left + padding-right + border-left + border-right
\`\`\`
If you set \`width: 300px\`, \`padding: 20px\`, and \`border: 2px solid #000\`, the box physically renders at **344px wide**! This unintuitive calculation frequently breaks multi-column layouts, pushing sidebars below the main content.

### The Universal Border-Box Reset (Industry Standard):
\`box-sizing: border-box\` alters the calculation so that declared \`width\` and \`height\` encompass the content, padding, and border combined:

\`\`\`css
/* Apply universally across all elements and pseudo-elements */
*, *::before, *::after {
  box-sizing: border-box;
}
\`\`\`
With \`border-box\`, setting \`width: 300px\` guarantees the element will render at **exactly 300px wide**, absorbing padding and borders inwards.`
      },
      {
        heading: 'Margin Collapsing: Why 20px + 20px Equals 20px',
        content: `In normal document flow, vertical margins between adjacent sibling block elements **collapse** into a single margin:

\`\`\`css
.card-one { margin-bottom: 30px; }
.card-two { margin-top: 20px; }
\`\`\`
You might expect the physical gap between these two cards to be \`30px + 20px = 50px\`. Instead, the browser collapses them: the smaller margin is absorbed inside the larger one, resulting in a gap of **exactly 30px**.

### Rules of Margin Collapsing:
1. Occurs **only between vertical margins** (top and bottom) of block elements. Horizontal margins never collapse!
2. Does **not** occur between Flexbox or CSS Grid items.
3. Can be prevented by adding a border, padding, or setting \`display: flow-root\` on the parent container.`
      },
      {
        heading: 'Display Types: Block, Inline, and Inline-Block',
        content: `The \`display\` property dictates how an element behaves in the normal flow of the page:

| Display Value | Width Behavior | Line Break Behavior | Allows Width & Height? |
| :--- | :--- | :--- | :---: |
| \`display: block\` | Expands to 100% of parent width | Always starts on a new line | YES |
| \`display: inline\` | Shrinks to fit content width | Sits inline with text | NO (ignored) |
| \`display: inline-block\`| Shrinks to fit content width | Sits inline next to siblings | YES |
| \`display: none\` | Removed completely from layout | Takes up zero screen space | N/A |`
      },
      {
        heading: 'CSS Positioning Modes and Stacking Contexts',
        content: `The \`position\` property removes or offsets an element relative to normal document flow:

1. **\`position: static\` (Default):** Normal document flow. \`top\`, \`right\`, \`bottom\`, \`left\`, and \`z-index\` have zero effect.
2. **\`position: relative\`:** Remains in normal flow, but allows offsets relative to its own default position without affecting surrounding elements. Crucially acts as the **containing anchor block** for absolute children!
3. **\`position: absolute\`:** Pulled completely out of normal document flow (surrounding elements collapse into its space). Positioned relative to the **nearest ancestor that has a position other than static**.
4. **\`position: fixed\`:** Pulled out of normal flow and anchored relative to the **browser viewport**. Remains pinned in place even as the user scrolls.
5. **\`position: sticky\`:** Hybrid mode. Behaves as \`relative\` until the user scrolls past a specified threshold, at which point it "sticks" like \`fixed\` within its parent container.`
      }
    ],
    exercise: {
      instruction: 'Create a notification badge anchored to the top-right corner of an action button using relative and absolute positioning, with border-box sizing.',
      starterCode: `/* Write your positioned button and badge styles below */\n`,
      hints: [
        'Set position: relative on .btn-container.',
        'Set position: absolute on .notification-badge.',
        'Use top: -8px and right: -8px on the badge.',
        'Add border-radius: 9999px to make the badge pill-shaped.'
      ],
      tasks: [
        'Apply box-sizing: border-box',
        'Use position: relative on the container',
        'Use position: absolute on the badge',
        'Offset badge to top-right corner'
      ],
      solution: `*, *::before, *::after {
  box-sizing: border-box;
}

.btn-container {
  position: relative;
  display: inline-block;
}

.btn-primary {
  background-color: #2563eb;
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.notification-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: #ef4444;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 9999px;
  border: 2px solid #ffffff;
}`,
      solutionExplanation: 'The button container establishes a positioned containing block via position: relative. The absolute notification badge calculates its top and right offsets relative to this container rather than the viewport.'
    },
    quiz: [
      {
        question: 'What is the primary benefit of setting "box-sizing: border-box" across all elements in CSS?',
        options: [
          'It automatically animates all CSS property transitions.',
          'It ensures declared width and height values include padding and borders, preventing accidental layout overflow.',
          'It forces all inline elements to behave like block elements.',
          'It disables browser margin collapsing permanently.'
        ],
        correctIndex: 1,
        explanation: 'Under border-box, padding and borders are absorbed inside the declared width, eliminating the need to subtract padding manually to avoid breaking layouts.'
      },
      {
        question: 'An element with "position: absolute" is positioned relative to which ancestor in the DOM tree?',
        options: [
          'Always relative to the root <html> document.',
          'Relative to the nearest parent element that has a position property other than static (e.g., relative, absolute, fixed).',
          'Always relative to the nearest <div> tag.',
          'Relative to the previous sibling element.'
        ],
        correctIndex: 1,
        explanation: 'Absolute elements look up the DOM tree until they find an ancestor with position: relative, absolute, or fixed. If none exists, they position relative to the initial containing block.'
      }
    ],
    takeaways: [
      'The CSS Box Model consists of Content, Padding, Border, and Margin.',
      'Always apply the universal box-sizing: border-box reset to avoid layout sizing headaches.',
      'Vertical margins between block elements collapse; horizontal margins do not.',
      'Use position: relative on parent containers to serve as the reference frame for position: absolute children.'
    ],
    caseStudyReference: {
      title: 'Modal Overlay & Badge Positioning in CRP India',
      description: 'Observe how floating notification badges and modal dialogue overlays in CRP India use relative containers and absolute or fixed positioning.',
      files: [
        'reference-projects/CRP-India/frontend/src/components/Modal.jsx',
        'reference-projects/CRP-India/frontend/src/components/Navbar.jsx'
      ]
    }
  },

  'css-flexbox-and-grid': {
    id: 'lesson-4-4',
    slug: 'css-flexbox-and-grid',
    courseId: 'course-4',
    courseSlug: 'css-responsive-design',
    courseTitle: 'Course 4: CSS from Zero',
    title: '1D Layouts with Flexbox & 2D Layouts with CSS Grid',
    category: 'Frontend',
    estimatedTime: '45 min read & practice',
    interactivePlayground: 'css',
    objectives: [
      'Understand the conceptual difference between 1-dimensional (Flexbox) and 2-dimensional (CSS Grid) layout models.',
      'Master Flexbox axes: Main Axis vs. Cross Axis, and how flex-direction alters alignment properties.',
      'Distribute space with justify-content, align-items, flex-wrap, and the gap property.',
      'Calculate flex item growth and shrinkage mathematically with flex-grow, flex-shrink, and flex-basis.',
      'Construct auto-responsive, media-query-free card layouts using CSS Grid repeat(auto-fit, minmax(280px, 1fr)).',
      'Combine CSS Grid and Flexbox together in production web application dashboards.'
    ],
    sections: [
      {
        heading: 'The Paradigm Shift: Why Flexbox and Grid Were Created',
        content: `Before Flexbox and CSS Grid, developers were forced to build web layouts using float hacks (\`float: left\`), table layouts, and negative margin clearfixes. These approaches were brittle, failed on varying screen sizes, and made vertical centering nearly impossible.

Modern CSS provides two complementary, purpose-built layout engines:
1. **Flexbox (Flexible Box Layout):** A **1-dimensional** layout model designed for distributing space and aligning items along a *single axis* (either a row or a column). Perfect for navigation bars, button groups, and component-level layouts.
2. **CSS Grid:** A **2-dimensional** layout model designed for orchestrating rows *and* columns simultaneously. Perfect for overall page scaffolding, complex dashboards, and responsive photo galleries.`
      },
      {
        heading: 'Flexbox Architecture: Axes, Containers, and Items',
        content: `When you apply \`display: flex\` to a parent element, it becomes a **Flex Container**, and all its immediate children become **Flex Items**.

\`\`\`
                     MAIN AXIS (Default: Left to Right)
    ------------------------------------------------------------->
    +-----------------------------------------------------------+
  C | +---------------+   +---------------+   +---------------+ |
  R | |  Flex Item 1  |   |  Flex Item 2  |   |  Flex Item 3  | |
  O | +---------------+   +---------------+   +---------------+ |
  S |                                                           |
  S |                                                           |
  | +-----------------------------------------------------------+
  v CROSS AXIS (Top to Bottom)
\`\`\`

### The Two Axes:
1. **Main Axis:** The primary flow direction, determined by \`flex-direction\`:
   * \`row\` (default): Left to right (in LTR languages).
   * \`column\`: Top to bottom.
2. **Cross Axis:** The axis perpendicular to the main axis.

### Container Alignment Properties:
* **\`justify-content\`:** Aligns items along the **Main Axis** (\`flex-start\`, \`center\`, \`flex-end\`, \`space-between\`, \`space-around\`, \`space-evenly\`).
* **\`align-items\`:** Aligns items along the **Cross Axis** (\`stretch\`, \`center\`, \`flex-start\`, \`flex-end\`, \`baseline\`).
* **\`gap\`:** Specifies the exact spacing between flex items without needing margin hacks!`
      },
      {
        heading: 'The Flex Item Trio: flex-grow, flex-shrink, and flex-basis',
        content: `Individual flex items control how they expand or contract to fill container space via the shorthand \`flex: <grow> <shrink> <basis>\`:

\`\`\`css
.sidebar {
  flex: 0 0 260px; /* Do not grow, do not shrink, stay exactly 260px */
}

.main-content {
  flex: 1 1 auto;  /* Grow to fill remaining space, shrink if squeezed */
}
\`\`\`

1. **\`flex-grow\`:** Proportion of available free space the item should absorb (e.g., \`flex-grow: 1\`).
2. **\`flex-shrink\`:** Ability of an item to contract when container space is insufficient (e.g., \`flex-shrink: 1\`).
3. **\`flex-basis\`:** The initial default size of the item along the main axis before free space is distributed.`
      },
      {
        heading: 'CSS Grid: 2D Mastery with Fractional Units (fr) and auto-fit',
        content: `CSS Grid allows you to author complete two-dimensional layouts by defining rows and columns simultaneously.

### The Holy Grail Auto-Responsive Grid Formula:
You can build a fully responsive card grid that automatically wraps without writing a single media query:

\`\`\`css
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
\`\`\`

### How This Formula Works:
* **\`repeat(auto-fit, ...)\`:** Tells the browser to create as many columns as will fit across the current screen width.
* **\`minmax(280px, 1fr)\`:** Sets the column constraint. A column will never shrink narrower than **280px**. Once all cards reach 280px and there is no room for another column, the items expand equally using the fractional unit (**\`1fr\`**) to fill 100% of the remaining horizontal space!`
      }
    ],
    exercise: {
      instruction: 'Create a responsive dashboard layout: a header with space-between navigation using Flexbox, and a body grid with auto-fit cards using CSS Grid.',
      starterCode: `/* Write your Flexbox and Grid styles below */\n`,
      hints: [
        'Set display: flex and justify-content: space-between on .navbar.',
        'Use display: grid and grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) on .card-grid.',
        'Apply gap: 1.5rem on both containers.'
      ],
      tasks: [
        'Use display: flex with justify-content on navbar',
        'Use display: grid with auto-fit on card container',
        'Apply modern gap spacing property',
        'Ensure cards wrap responsively'
      ],
      solution: `.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #1e293b;
  color: #ffffff;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
}

.card {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}`,
      solutionExplanation: 'This demonstrates the ideal synergy between layout models. Flexbox handles 1D navigation alignment with space-between, while CSS Grid manages the 2D multi-column responsive dashboard cards.'
    },
    quiz: [
      {
        question: 'When should a web developer choose Flexbox over CSS Grid?',
        options: [
          'Flexbox is older and should never be used in modern websites.',
          'When aligning elements along a single direction (1D row or column), such as navigation items or button groups.',
          'When designing complex 2-dimensional layouts with precise rows and columns.',
          'Only when targeting Internet Explorer 11.'
        ],
        correctIndex: 1,
        explanation: 'Flexbox is designed for 1-dimensional content distribution along a single axis, whereas CSS Grid is designed for 2-dimensional coordinate systems.'
      },
      {
        question: 'What does "grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));" achieve?',
        options: [
          'It locks the grid into exactly 4 columns on all devices.',
          'It automatically fits as many 250px-minimum columns as the viewport allows, expanding remaining space with 1fr without requiring media queries.',
          'It hides any cards that exceed 250px in height.',
          'It forces columns to convert into an accordion menu.'
        ],
        correctIndex: 1,
        explanation: 'repeat(auto-fit, minmax(250px, 1fr)) is the standard responsive grid formula that automatically calculates column counts based on available screen width.'
      }
    ],
    takeaways: [
      'Use Flexbox for 1D component layouts (navigation bars, input groups, vertical centering).',
      'Use CSS Grid for 2D page scaffolding and responsive card systems.',
      'justify-content aligns along the main axis; align-items aligns along the cross axis.',
      'Use repeat(auto-fit, minmax(250px, 1fr)) for responsive card grids without media queries.'
    ],
    caseStudyReference: {
      title: 'Dashboard Grid and Navbar Flexbox in CRP India',
      description: 'Review how the CRP India overview screen uses CSS Grid for metric cards and Flexbox for filter bars and top-level navigation.',
      files: [
        'reference-projects/CRP-India/frontend/src/pages/Dashboard.jsx',
        'reference-projects/CRP-India/frontend/src/components/StatsGrid.jsx'
      ]
    }
  },

  'css-responsive-and-animations': {
    id: 'lesson-4-5',
    slug: 'css-responsive-and-animations',
    courseId: 'course-4',
    courseSlug: 'css-responsive-design',
    courseTitle: 'Course 4: CSS from Zero',
    title: 'Mobile-First Responsive Design, Transforms & Keyframe Animations',
    category: 'Frontend',
    estimatedTime: '45 min read & practice',
    interactivePlayground: 'css',
    objectives: [
      'Understand the Mobile-First philosophy and implement standard min-width media queries.',
      'Declare and consume reusable CSS Custom Properties (Variables) with scoping and fallbacks.',
      'Implement performant 2D and 3D transforms (translate, rotate, scale, skew).',
      'Build smooth, multi-step CSS animations using @keyframes and animation properties.',
      'Respect user accessibility preferences with the prefers-reduced-motion media query.'
    ],
    sections: [
      {
        heading: 'Mobile-First Responsive Design: The Industry Methodology',
        content: `Over 60% of global web traffic originates on mobile smartphones. In modern web engineering, **Mobile-First** is the gold standard design philosophy:
1. Write baseline CSS for small mobile screens first, with zero media queries.
2. Use **\`min-width\`** media queries to progressively enhance the layout as viewport width increases for tablets and desktop monitors.

\`\`\`css
/* 1. Mobile Default (Zero Media Queries) */
.content-grid {
  display: grid;
  grid-template-columns: 1fr; /* Single column on phones */
  gap: 1rem;
}

/* 2. Tablet Enhancement (min-width: 768px) */
@media (min-width: 768px) {
  .content-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 columns */
    gap: 1.5rem;
  }
}

/* 3. Desktop Enhancement (min-width: 1024px) */
@media (min-width: 1024px) {
  .content-grid {
    grid-template-columns: repeat(3, 1fr); /* 3 columns */
    gap: 2rem;
  }
}
\`\`\`

### Common Breakpoints:
* **\`640px\`:** Mobile landscape / large phones.
* **\`768px\`:** Tablets (iPads, portrait tablets).
* **\`1024px\`:** Small laptops and landscape tablets.
* **\`1280px\`:** High-resolution desktop monitors.`
      },
      {
        heading: 'CSS Custom Properties (Variables): Building Design Token Systems',
        content: `CSS Variables allow you to store values and reuse them throughout stylesheets, enabling clean design systems and effortless dark mode theming:

\`\`\`css
/* Define design tokens on the :root pseudo-class */
:root {
  --color-primary: #2563eb;
  --color-surface: #ffffff;
  --color-text: #1e293b;
  --radius-md: 8px;
  --transition-fast: 0.2s ease;
}

/* Dark theme overrides */
[data-theme="dark"] {
  --color-surface: #0f172a;
  --color-text: #f8fafc;
}

/* Consuming tokens with fallback support */
.card {
  background-color: var(--color-surface, #ffffff);
  color: var(--color-text, #1e293b);
  border-radius: var(--radius-md);
  transition: transform var(--transition-fast);
}
\`\`\``
      },
      {
        heading: 'Performant Transforms: 2D and 3D Visual Manipulation',
        content: `Traditional CSS positioning properties (like animating \`top\`, \`left\`, or \`margin\`) force the browser to trigger expensive **Layout (Reflow)** calculations on every frame, causing stutter and battery drain.

The **\`transform\`** property operates directly on the GPU compositor thread without triggering layout recalculations:

* **\`translate(X, Y)\`:** Shifts the element along coordinate planes.
* **\`scale(N)\`:** Enlarges or shrinks the element.
* **\`rotate(deg)\`:** Rotates the element around a transform origin.

\`\`\`css
.interactive-card {
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
}

.interactive-card:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}
\`\`\``
      },
      {
        heading: 'CSS Animations with @keyframes and Reduced Motion',
        content: `While \`transition\` animates a property between two states (e.g., normal to hover), **\`@keyframes\`** allows you to author complex, multi-stage looping animations:

\`\`\`css
@keyframes pulseGlow {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
}

.alert-active {
  animation: pulseGlow 2s infinite ease-in-out;
}
\`\`\`

### Accessibility Mandate: \`prefers-reduced-motion\`
Users suffering from vestibular disorders or motion sickness can configure their operating systems to minimize animation. Websites **must** respect this preference:

\`\`\`css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
\`\`\``
      }
    ],
    exercise: {
      instruction: 'Create an interactive button with a subtle hover transform, a keyframe loading spinner animation, and a prefers-reduced-motion fallback.',
      starterCode: `/* Write your responsive styles and animations below */\n`,
      hints: [
        'Define @keyframes spin { to { transform: rotate(360deg); } }',
        'Add a hover state with transform: translateY(-2px).',
        'Add an @media (prefers-reduced-motion: reduce) block disabling animations.'
      ],
      tasks: [
        'Define keyframe animation for spinner',
        'Apply transform on button hover',
        'Implement prefers-reduced-motion query'
      ],
      solution: `:root {
  --btn-bg: #2563eb;
  --btn-hover: #1d4ed8;
}

.btn-action {
  background-color: var(--btn-bg);
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.btn-action:hover {
  background-color: var(--btn-hover);
  transform: translateY(-2px);
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .btn-action, .spinner {
    transition: none !important;
    animation: none !important;
  }
}`,
      solutionExplanation: 'This solution uses GPU-accelerated transforms for smooth 60fps hover micro-interactions, authors a performant rotating spinner keyframe animation, and fulfills WCAG accessibility criteria via prefers-reduced-motion.'
    },
    quiz: [
      {
        question: 'Why does mobile-first responsive design use min-width media queries rather than max-width?',
        options: [
          'min-width queries load faster across 5G networks.',
          'It establishes mobile devices as the baseline default, progressively layering layout enhancements as screen real estate expands.',
          'max-width queries are not supported in Safari.',
          'min-width is required by CSS Grid.'
        ],
        correctIndex: 1,
        explanation: 'Mobile-first means writing default styles for small screens without media queries, then using min-width to add complexity as the screen gets wider.'
      },
      {
        question: 'Why should developers animate "transform" instead of "top" or "margin" for hover effects?',
        options: [
          'Transforms can be parsed by screen readers.',
          'Transforms run directly on the GPU compositor thread without triggering expensive browser Layout (Reflow) recalculations.',
          'Transforms work on inline elements without display changes.',
          'margin animations require JavaScript.'
        ],
        correctIndex: 1,
        explanation: 'Animating top or margin forces the browser to recalculate the layout geometry of the entire page on every single frame. Transforms are handled entirely on the GPU compositor, yielding silky 60fps animations.'
      }
    ],
    takeaways: [
      'Adopt a mobile-first philosophy: base styles for phones, min-width queries for tablets and desktops.',
      'Use CSS variables (--token) for consistent color palettes, spacing, and easy dark theme support.',
      'Animate transform and opacity on the GPU compositor to avoid costly layout reflows.',
      'Always respect user accessibility preferences with the prefers-reduced-motion media query.'
    ],
    caseStudyReference: {
      title: 'Responsive Breakpoints and Dark Theme in CRP India',
      description: 'Analyze the mobile drawer navigation, responsive tables, and dark mode theme switching in CRP India.',
      files: [
        'reference-projects/CRP-India/frontend/src/components/ThemeToggle.jsx',
        'reference-projects/CRP-India/frontend/src/components/Sidebar.jsx'
      ]
    }
  }
};
