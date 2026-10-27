/**
 * Dev-root Course 4: CSS from Zero - Deep Learning Curriculum
 * Comprehensive, modular lessons covering CSS syntax, selectors, cascade,
 * box model, positioning, Flexbox, Grid, responsive design, and animations.
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
    estimatedTime: '35 min read & practice',
    interactivePlayground: 'css',
    objectives: [
      'Understand the architecture of CSS: selectors, property-value declarations, and declaration blocks.',
      'Differentiate inline, internal, and external stylesheets and explain why external CSS is standard.',
      'Master the full selector spectrum: element, class, ID, attribute, descendant, child, and pseudo-classes.',
      'Calculate CSS specificity weights mathematically (inline vs ID vs class vs element) to resolve conflicting styles.',
      'Understand how inheritance and source order govern the Cascade without resorting to !important.'
    ],
    sections: [
      {
        heading: 'What is CSS and How Does It Connect to HTML?',
        content: `Cascading Style Sheets (CSS) is the language used to describe the visual presentation and layout of a document written in HTML. While HTML defines the semantic skeleton (headings, paragraphs, buttons, forms), CSS dictates typography, color harmonies, responsive grids, spatial relationships, and animations.

### The Three Ways to Apply CSS:
1. **Inline CSS:** Applied directly on individual elements using the \`style\` attribute:
   \`\`\`html
   <p style="color: red; font-size: 18px;">Warning</p>
   \`\`\`
   *Disadvantage:* Breaks separation of concerns, impossible to reuse across pages, and overrides external stylesheets due to extreme specificity. **Avoid in production markup**.
2. **Internal (Embedded) CSS:** Written inside a \`<style>\` element inside the document's \`<head>\`:
   \`\`\`html
   <head>
     <style>
       p { color: #1e293b; line-height: 1.6; }
     </style>
   </head>
   \`\`\`
   *Use case:* Useful for single-page isolated prototypes or critical above-the-fold inline CSS.
3. **External CSS (Industry Standard):** Written in standalone \`.css\` files linked via the \`<link>\` tag:
   \`\`\`html
   <link rel="stylesheet" href="/src/index.css">
   \`\`\`
   *Advantages:* Allows a single stylesheet to style hundreds of pages across an entire domain, enables browser HTTP caching, keeps HTML files lightweight, and facilitates clean design token architectures.`
      },
      {
        heading: 'Anatomy of a CSS Rule and Selector Types',
        content: `A CSS ruleset consists of a **selector** followed by a **declaration block** enclosed in curly braces:

\`\`\`css
/* Selector { Property: Value; } */
.grievance-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 1.5rem;
}
\`\`\`

### Comprehensive Selector Hierarchy:
* **Universal Selector (\`*\`):** Matches every element in the DOM tree. Commonly used for global box-sizing resets:
  \`\`\`css
  *, *::before, *::after { box-sizing: border-box; }
  \`\`\`
* **Element (Type) Selector (\`h1\`, \`p\`, \`button\`):** Matches all elements of that specific HTML tag name.
* **Class Selector (\`.badge\`):** Matches elements having a specific class name. Highly reusable across multiple elements.
* **ID Selector (\`#main-nav\`):** Matches the single element with that unique ID.
* **Combinator Selectors:**
  * **Descendant Selector (\`nav a\`):** Matches any \`<a>\` nested anywhere inside a \`<nav>\`, regardless of depth.
  * **Direct Child Selector (\`ul > li\`):** Matches only \`<li>\` elements that are direct immediate children of a \`<ul>\`.
  * **Adjacent Sibling (\`h2 + p\`):** Matches the immediate first \`<p>\` that appears right after an \`<h2>\`.
  * **General Sibling (\`h2 ~ p\`):** Matches all \`<p>\` siblings that appear after an \`<h2>\`.
* **Attribute Selectors:**
  \`\`\`css
  input[type="password"] { border-color: #dc2626; }
  a[target="_blank"] { padding-right: 18px; }
  \`\`\`
* **Pseudo-classes (State-based Selection):**
  * \`:hover\`: When cursor hovers over the element.
  * \`:focus\` and \`:focus-visible\`: When keyboard or user focuses the element.
  * \`:active\`: When element is being actively clicked or pressed.
  * \`:nth-child(even)\`: Matches alternating elements for striped tables or grids.
* **Pseudo-elements (Injecting Virtual Elements):**
  * \`::before\` and \`::after\`: Creates decorative pseudo-elements inside the target without extra HTML tags.`
      },
      {
        heading: 'The Cascade & Specificity Calculations',
        content: `The word **Cascading** in CSS describes the precise algorithm browsers use to resolve conflicting rules targeting the same element. When multiple rules declare different values for the same property, the browser resolves the winner using three factors:
1. **Importance:** Declarations with \`!important\` override normal declarations.
2. **Specificity:** The rule with the highest mathematical specificity weight wins.
3. **Source Order:** If two rules have identical specificity, the one declared **last** in the stylesheet wins.

### Calculating Specificity Mathematically:
Specificity is measured as a 4-part weight: \`(Inline, IDs, Classes/Attributes/Pseudo-classes, Elements)\`:

| Selector Example | Inline | IDs | Classes | Elements | Specificity Score |
| :--- | :---: | :---: | :---: | :---: | :--- |
| \`style="color: red;"\` | 1 | 0 | 0 | 0 | **(1, 0, 0, 0)** |
| \`#citizen-profile\` | 0 | 1 | 0 | 0 | **(0, 1, 0, 0)** |
| \`.card.active:hover\` | 0 | 0 | 3 | 0 | **(0, 0, 3, 0)** |
| \`nav ul li a\` | 0 | 0 | 0 | 4 | **(0, 0, 0, 4)** |
| \`header.main-header h1\` | 0 | 0 | 1 | 2 | **(0, 0, 1, 2)** |

### Resolving Specificity Battles:
A selector with a higher category always beats any number of lower-category selectors:
* A single class selector \`.button\` (0, 0, 1, 0) beats an element selector chain \`html body div main section button\` (0, 0, 0, 6).
* An ID selector \`#submit-btn\` (0, 1, 0, 0) beats 100 stacked class selectors.
* **Why to avoid \`!important\`:** Using \`!important\` breaks the natural cascade and starts an escalating war where developers must write more \`!important\` flags to override previous ones. Instead, structure your CSS with low, uniform specificity (such as single class selectors like BEM methodology: \`.card__title\`).`
      },
      {
        heading: 'Inheritance: Properties that Flow Down',
        content: `In CSS, certain properties applied to a parent element automatically pass down to its children, while others do not:

* **Inherited Properties (Chiefly Typography):**
  * \`color\`, \`font-family\`, \`font-size\`, \`line-height\`, \`text-align\`, \`letter-spacing\`.
  * Setting \`font-family: system-ui, sans-serif\` on \`<body>\` automatically styles all paragraphs, headings, and spans inside without repetitive declarations.
* **Non-Inherited Properties (Chiefly Box Dimensions & Layout):**
  * \`margin\`, \`padding\`, \`border\`, \`width\`, \`height\`, \`background-color\`, \`display\`, \`position\`.
  * If \`<body>\` has \`border: 2px solid black\`, its child paragraphs do not each draw a black border around themselves!

You can explicitly force any property to inherit using the keyword \`inherit\`:
\`\`\`css
/* Force buttons to inherit the parent's font family rather than browser default */
button, input {
  font-family: inherit;
  font-size: inherit;
}
\`\`\``
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using !important to fix styling conflicts.',
        whyItHappens: 'Frustration when a style does not apply due to higher specificity elsewhere.',
        howToFix: 'Inspect the element in DevTools to find the conflicting selector, and adjust specificity or source order naturally.'
      },
      {
        mistake: 'Over-relying on ID selectors for styling (e.g. #header-title).',
        whyItHappens: 'Assuming IDs are better because they are unique.',
        howToFix: 'IDs create high specificity that makes styles impossible to override without more IDs. Use class selectors (.card, .btn) for styling.'
      },
      {
        mistake: 'Deeply nested descendant selectors like div.container main article section p a.',
        whyItHappens: 'Attempting to mirror the full HTML DOM tree in CSS.',
        howToFix: 'Keep selectors flat and decoupled using single classes (.article-link). This improves performance and modularity.'
      }
    ],
    guidedExercise: {
      title: 'Calculate Specificity and Refactor Conflicting CSS',
      difficulty: 'Beginner',
      instructions: 'Review the conflicting CSS rules below. Identify which rule currently wins, calculate its specificity score, and refactor the rules so they use clean, maintainable class-based styling without !important.',
      starterCode: `/* CURRENT PROBLEMATIC STYLES: */
div#portal header.site-header nav ul li a {
  color: #1d4ed8;
  text-decoration: underline;
}

a.nav-link {
  color: #10b981 !important; /* Tried to override with !important */
}`,
      tasks: [
        'Calculate the specificity of the first selector (div#portal header.site-header nav ul li a).',
        'Identify why the developer resorted to !important on .nav-link.',
        'Refactor both rules to use flat class selectors with equal, predictable specificity.',
        'Implement clean :hover and :focus-visible states.'
      ],
      hints: [
        'div#portal has 1 ID, 1 class, and 5 elements: specificity is (0, 1, 1, 5).',
        'a.nav-link has 0 IDs, 1 class, and 1 element: specificity is (0, 0, 1, 1), which is why it lost without !important.',
        'Refactor to simply .nav-link for the base state, and .nav-link:hover for the hover state.'
      ],
      solution: `/* REFACTORED CLEAN CSS: */
.nav-link {
  color: #1d4ed8;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.15s ease-in-out;
}

.nav-link:hover {
  color: #1e40af;
  text-decoration: underline;
}

.nav-link:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
  border-radius: 4px;
}`,
      solutionExplanation: 'By using a flat single class (.nav-link) with a specificity of (0, 0, 1, 0), the styles remain completely predictable and easy to override in modifier classes (.nav-link--active) without any !important hacks.'
    },
    quiz: [
      {
        question: 'What is the specificity weight of the selector: "nav#main-nav .menu-item.active a"?',
        options: [
          '(0, 0, 4, 0)',
          '(0, 1, 2, 2)',
          '(1, 0, 2, 2)',
          '(0, 2, 1, 1)'
        ],
        correctIndex: 1,
        explanation: '1 ID (#main-nav), 2 classes (.menu-item, .active), and 2 element tags (nav, a) = Specificity (0, 1, 2, 2).'
      },
      {
        question: 'If two conflicting CSS rules target the exact same element with the exact same specificity score, how does the browser resolve which rule applies?',
        options: [
          'The rule with the longer file name wins.',
          'The rule declared latest (furthest down) in the stylesheet wins via source order.',
          'The rule declared first wins.',
          'The browser disables both rules.'
        ],
        correctIndex: 1,
        explanation: 'When importance and specificity are tied, the Cascade uses Source Order: the rule declared latest in the stylesheet or loaded last in the DOM takes precedence.'
      },
      {
        question: 'Which of the following CSS properties is inherited by child elements by default?',
        options: [
          'padding',
          'margin',
          'color',
          'border'
        ],
        correctIndex: 2,
        explanation: 'Typography properties like color, font-family, and line-height are inherited by children from parent containers. Box model properties (padding, margin, border) are never inherited by default.'
      }
    ],
    takeaways: [
      'CSS rules consist of selectors and declaration blocks of property-value pairs.',
      'Always prefer external stylesheets (<link rel="stylesheet">) over inline styles.',
      'Specificity is calculated across (Inline, ID, Class, Element) tiers; higher tiers always beat lower ones.',
      'Avoid using !important; fix conflicts by flattening selector specificity and managing stylesheet source order.',
      'Text and font properties inherit from parents by default, while layout and box model properties do not.'
    ],
    caseStudyReference: {
      title: 'Global Design Tokens & CSS Architecture in CRP India',
      description: 'Inspect index.css in CRP India to see how global typography tokens, resets, and flat class hierarchies establish a clean design foundation.',
      files: [
        'reference-projects/CRP-India/frontend/src/index.css',
        'reference-projects/CRP-India/frontend/src/App.jsx'
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
    estimatedTime: '40 min read & practice',
    interactivePlayground: 'css',
    objectives: [
      'Master CSS color models: Hexadecimal, RGB/RGBA, HSL/HSLA, and modern CSS color functions.',
      'Understand absolute units (px) vs relative units (rem, em, %, vh, vw, vmin, vmax).',
      'Explain why rem is the gold standard for accessible responsive typography and spacing.',
      'Implement fluid responsive typography using clamp(), min(), and max().',
      'Create polished visual styles with gradients, borders, shadows, and accessible contrast ratios.'
    ],
    sections: [
      {
        heading: 'CSS Color Formats: Hex, RGB, and HSL',
        content: `Color is one of the most powerful design tools in web development. Modern CSS supports multiple ways to declare colors:

### 1. Hexadecimal Colors (\`#rrggbb\` or \`#rrggbbaa\`)
Hex notation expresses red, green, and blue intensities as two-digit hexadecimal values from \`00\` (0) to \`ff\` (255):
\`\`\`css
.brand-primary { color: #2563eb; } /* Blue */
.brand-primary-alpha { color: #2563eb80; } /* Blue with 50% opacity */
\`\`\`

### 2. RGB & RGBA (\`rgb(red, green, blue, alpha)\`)
Specifies color using decimal numbers between 0 and 255:
\`\`\`css
/* Modern syntax without commas */
.surface-card { background-color: rgb(255 255 255 / 0.85); }
\`\`\`

### 3. HSL & HSLA: The Designer\'s Ideal Model
HSL stands for **Hue** (0–360° on the color wheel), **Saturation** (0% grayscale to 100% full vibrant color), and **Lightness** (0% black to 100% white):
\`\`\`css
/* HSL makes creating harmonious light/dark shades trivial: */
:root {
  --primary-base: hsl(220 85% 55%);  /* Normal blue */
  --primary-hover: hsl(220 85% 45%); /* 10% darker on hover */
  --primary-subtle: hsl(220 85% 95%); /* Very light tint for backgrounds */
}
\`\`\`

### WCAG Color Contrast Requirements:
To ensure content is readable by people with low vision or color blindness, WCAG 2.1 Level AA mandates:
* **Normal text (< 18pt / 24px):** Minimum contrast ratio of **4.5:1** against the background.
* **Large text (>= 18pt / 24px or 14pt bold):** Minimum contrast ratio of **3:1**.
* **UI components & form borders:** Minimum contrast ratio of **3:1** against adjacent background.`
      },
      {
        heading: 'CSS Units: Pixels vs. rem vs. Viewport Units',
        content: `Choosing the right unit is the difference between a brittle, broken website and an accessible, responsive interface:

### 1. Absolute Units: Pixels (\`px\`)
A pixel in CSS is an absolute unit anchored to 1/96th of an inch.
* *When to use:* Thin borders (\`border: 1px solid #ccc\`) or fixed decorative shadows.
* *Why NOT for typography:* If a user with low vision changes their browser's default font size from 16px to 24px, text sized in fixed \`px\` will **refuse to scale**, breaking accessibility.

### 2. The Gold Standard for Typography: Root Element Units (\`rem\`)
\`1rem\` equals the computed \`font-size\` of the root \`<html>\` element (which defaults to \`16px\` in all major browsers):
* \`1rem = 16px\` (at default settings)
* \`0.875rem = 14px\`
* \`1.25rem = 20px\`
* \`1.5rem = 24px\`
* \`2rem = 32px\`

When a user enlarges their browser's default font setting, every \`rem\` value scales proportionally across your entire layout, preserving layout harmony while respecting user preferences.

### 3. Element-Relative Units (\`em\`)
\`1em\` equals the font size of the **immediate parent element** (or the element itself when used on margin/padding).
* *Caveat:* Nested \`em\` font sizes compound exponentially (\`1.2em * 1.2em * 1.2em\`), creating unexpected sizing bugs. Use \`em\` primarily for padding inside buttons so the padding scales if the button font size changes.

### 4. Viewport Units (\`vw\`, \`vh\`, \`vmin\`, \`vmax\`)
Relative to the browser window dimensions:
* \`100vw\` = 100% of the viewport width.
* \`100vh\` = 100% of the viewport height (consider \`100dvh\` on mobile to account for dynamic address bars).`
      },
      {
        heading: 'Fluid Typography with clamp()',
        content: `Instead of writing dozens of rigid \`@media\` query breakpoints to resize headings on phones vs desktop monitors, modern CSS provides **\`clamp()\`**:

\`\`\`css
/* clamp(MINIMUM, IDEAL_SCALING, MAXIMUM) */
h1 {
  font-size: clamp(1.75rem, 4vw + 1rem, 3.5rem);
}
\`\`\`

* On a small mobile phone (360px wide), the computed font size will never drop below \`1.75rem\` (28px).
* On a 4K ultra-wide monitor, the font size will never grow beyond \`3.5rem\` (56px).
* In between, it scales smoothly and continuously with the viewport width (\`4vw + 1rem\`) without sudden jumps!`
      },
      {
        heading: 'Visual Styling: Shadows, Borders, and Gradients',
        content: `Polished modern interfaces rely on subtle, realistic visual tokens rather than harsh outlines:

### Subtle Layered Elevation with \`box-shadow\`:
\`\`\`css
/* Modern layered shadow: ambient glow + sharp edge */
.card-elevated {
  background-color: var(--color-bg-surface);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.05),
    0 8px 24px rgba(0, 0, 0, 0.04);
}
\`\`\`

### Linear and Radial Gradients:
\`\`\`css
.hero-gradient {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
}
\`\`\`

### Clean Borders and \`border-radius\`:
* Consistent border radii (\`4px\`, \`8px\`, \`12px\`, \`9999px\` for pills) unify components.
* Rounded corners must match nested elements: an outer card with \`border-radius: 12px\` with \`8px\` padding should have inner elements with roughly \`border-radius: 4px\` (\`12 - 8 = 4\`) to avoid mismatched corner gaps.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using fixed px for font-size everywhere.',
        whyItHappens: 'Pixels feel intuitive and match graphic design software mockups exactly.',
        howToFix: 'Use rem for font sizes and spacing. 1rem = 16px by default. This allows text to scale for visually impaired users.'
      },
      {
        mistake: 'Failing color contrast on subtle gray text (e.g. #999 on white).',
        whyItHappens: 'Desiring a subtle look without measuring WCAG contrast ratios.',
        howToFix: 'Always test text contrast with browser DevTools to ensure at least a 4.5:1 ratio for regular text.'
      },
      {
        mistake: 'Using 100vh on mobile without accounting for address bar collapse.',
        whyItHappens: 'Mobile Safari/Chrome show and hide the URL bar, causing 100vh to overflow off-screen.',
        howToFix: 'Use min-height: 100dvh (dynamic viewport height) or min-height: 100% on body.'
      }
    ],
    guidedExercise: {
      title: 'Build a Fluid, High-Contrast Typography Card',
      difficulty: 'Beginner',
      instructions: 'Create a reusable card component that uses rem units for accessible typography, clamp() for a fluid responsive title, HSL color tokens for hover effects, and passes WCAG AA 4.5:1 contrast standards.',
      starterCode: `/* TODO: Style .card and .card-title using rem and clamp */
.card {
  /* Add background, padding in rem, border, and layered shadow */
}

.card-title {
  /* Add fluid font size using clamp(1.25rem, 2vw + 1rem, 2rem) */
}

.card-button {
  /* Use HSL colors and rem padding */
}`,
      tasks: [
        'Style .card using rem padding, a subtle border, and a 2-layer box-shadow.',
        'Use clamp() on .card-title so font size scales smoothly between 1.25rem and 2rem.',
        'Set line-height to 1.5 or 1.6 for comfortable paragraph readability.',
        'Style .card-button with HSL colors and a clear :hover state with at least 4.5:1 contrast.'
      ],
      hints: [
        'To get 16px padding in rem, use 1rem. For 24px, use 1.5rem.',
        'clamp() takes 3 arguments: minimum, preferred, and maximum: clamp(1.25rem, 2.5vw, 2rem).',
        'Use an HSL color like hsl(220, 90%, 56%) for a primary blue button.'
      ],
      solution: `.card {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem; /* 12px */
  padding: 1.5rem; /* 24px */
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.05),
    0 10px 15px -3px rgba(0, 0, 0, 0.08);
  max-width: 28rem; /* 448px */
}

.card-title {
  color: #0f172a; /* Deep slate, high contrast */
  font-size: clamp(1.25rem, 2vw + 0.75rem, 2rem);
  font-weight: 700;
  line-height: 1.25;
  margin-top: 0;
  margin-bottom: 0.75rem;
}

.card-body {
  color: #334155; /* Slate 700, 7.8:1 contrast on white */
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.card-button {
  display: inline-block;
  background-color: hsl(220, 85%, 55%);
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.65rem 1.25rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.card-button:hover {
  background-color: hsl(220, 85%, 45%);
}`,
      solutionExplanation: 'This solution uses relative rem units throughout, implements fluid typography via clamp(), achieves high accessibility contrast (>7:1), and uses HSL for clean color transitions.'
    },
    quiz: [
      {
        question: 'Why is "rem" preferred over "px" for declaring font sizes in responsive web design?',
        options: [
          'rem renders 50% faster in web browsers.',
          'rem automatically respects user-configured browser font size settings, ensuring text scales for low-vision accessibility.',
          'rem converts fonts into vector SVG paths.',
          'px is deprecated in modern CSS specifications.'
        ],
        correctIndex: 1,
        explanation: 'rem units are relative to the root font size. When users with visual impairments increase their browser\'s font size preferences, rem units scale automatically, whereas fixed px values stay locked.'
      },
      {
        question: 'What does the CSS function "clamp(1.5rem, 3vw + 1rem, 2.5rem)" do?',
        options: [
          'It clamps the element width between 300px and 600px.',
          'It scales the font size fluidly with viewport width (3vw + 1rem), while guaranteeing it never shrinks below 1.5rem or expands above 2.5rem.',
          'It crops text that overflows its parent container.',
          'It rotates an element by 3 degrees on small screens.'
        ],
        correctIndex: 1,
        explanation: 'clamp(min, preferred, max) enforces lower and upper bounds while letting the value scale smoothly according to the preferred expression in between.'
      },
      {
        question: 'Under WCAG 2.1 Level AA, what is the minimum required contrast ratio for standard-sized body text?',
        options: [
          '2:1',
          '3:1',
          '4.5:1',
          '7:1'
        ],
        correctIndex: 2,
        explanation: 'WCAG Level AA requires at least a 4.5:1 contrast ratio for normal body text under 18pt/24px against its background.'
      }
    ],
    takeaways: [
      'HSL is the most practical color model for design systems, allowing intuitive adjustments to hue, saturation, and lightness.',
      'Always use rem for font-size and major spacing to guarantee user font-scaling accessibility.',
      'Use clamp() for fluid typography that scales smoothly between mobile and desktop screen sizes without media query jumps.',
      'Verify WCAG color contrast ratios: 4.5:1 for body text and 3:1 for large headings and UI controls.',
      'Layer subtle box-shadows and maintain matching border-radius ratios for polished visual hierarchy.'
    ],
    caseStudyReference: {
      title: 'Design System Spacing and Color Tokens in CRP India',
      description: 'Study how CRP India defines CSS custom properties for semantic colors (primary, success, warning, danger) and consistent rem-based spacing tokens.',
      files: [
        'reference-projects/CRP-India/frontend/src/index.css',
        'reference-projects/CRP-India/frontend/src/components/Navbar.jsx'
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
    interactivePlayground: 'box-model-3d',
    objectives: [
      'Understand the four concentric layers of the CSS Box Model: Content, Padding, Border, and Margin.',
      'Master the critical difference between box-sizing: content-box and box-sizing: border-box.',
      'Explain vertical margin collapsing and how to prevent unwanted layout collapses.',
      'Understand normal document flow and the block vs inline vs inline-block display modes.',
      'Master CSS positioning schemes: static, relative, absolute, fixed, sticky, and stacking contexts (z-index).'
    ],
    sections: [
      {
        heading: 'The Four Concentric Layers of the CSS Box Model',
        content: `In CSS, **every single element on a web page is rendered as a rectangular box**, regardless of whether it looks circular or text-only. The CSS Box Model describes the four concentric layers that make up this rectangle:

\`\`\`
+-------------------------------------------------------+
|  MARGIN (Outer transparent space separating boxes)     |
|   +-----------------------------------------------+   |
|   |  BORDER (Visible boundary around padding)     |   |
|   |   +---------------------------------------+   |   |
|   |   |  PADDING (Inner clearance inside)     |   |   |
|   |   |   +-------------------------------+   |   |   |
|   |   |   |  CONTENT (Text, images, etc.) |   |   |   |
|   |   |   +-------------------------------+   |   |   |
|   |   +---------------------------------------+   |   |
|   +-----------------------------------------------+   |
+-------------------------------------------------------+
\`\`\`

1. **Content:** The actual text, image, or child element rendered inside. Sized via \`width\` and \`height\`.
2. **Padding:** The transparent breathing room between the content and the border. Padding inherits the element's background color.
3. **Border:** The decorative or structural line wrapping the padding and content. Controlled via \`border-width\`, \`border-style\`, and \`border-color\`.
4. **Margin:** The transparent buffer space outside the border that pushes adjacent neighboring boxes away. Margins never have background colors.`
      },
      {
        heading: 'The box-sizing Revolution: content-box vs. border-box',
        content: `Understanding \`box-sizing\` is the single most important breakthrough for mastering CSS layouts:

### 1. The Legacy Default: \`content-box\`
By default in CSS, when you write:
\`\`\`css
.box {
  box-sizing: content-box; /* Browser default */
  width: 300px;
  padding: 20px;
  border: 5px solid black;
}
\`\`\`
The browser calculates the **total rendered width on screen** by adding padding and border *on top* of your declared width:
$$\\text{Total Width} = 300\\text{px (content)} + 20\\text{px (left pad)} + 20\\text{px (right pad)} + 5\\text{px (left bdr)} + 5\\text{px (right bdr)} = 350\\text{px}!$$
If you place two 50% width boxes next to each other and add 10px of padding, they add up to over 100% and break onto the next line!

### 2. The Modern Standard: \`border-box\`
\`\`\`css
.box {
  box-sizing: border-box;
  width: 300px;
  padding: 20px;
  border: 5px solid black;
}
\`\`\`
With \`border-box\`, the browser absorbs padding and borders **inside** your declared width:
$$\\text{Total Width on Screen} = 300\\text{px}$$
$$\\text{Remaining Content Area} = 300 - (20 + 20 + 5 + 5) = 250\\text{px}$$

### The Universal Box-Sizing Reset:
Every professional web application (including CRP India and Dev-root) includes this global reset at the top of its stylesheet:
\`\`\`css
*, *::before, *::after {
  box-sizing: border-box;
}
\`\`\``
      },
      {
        heading: 'Margin Collapsing: Why Margins Combine',
        content: `A frequent source of beginner confusion is **margin collapsing**. In normal document flow, vertical margins of adjacent block elements do not add together; they **collapse** into a single margin equal to the largest of the two values:

\`\`\`css
h1 { margin-bottom: 30px; }
p  { margin-top: 20px; }
\`\`\`

You might expect 50px of vertical space between the \`<h1>\` and the \`<p>\`. In reality, the distance is **30px** (the larger of 30px and 20px).

### Rules of Margin Collapsing:
* Only happens between **vertical** margins (top and bottom) on block-level elements.
* Horizontal margins (left and right) **never** collapse.
* Does not occur inside Flexbox or Grid containers.
* Does not occur on elements with \`position: absolute\`, \`position: fixed\`, or \`display: inline-block\`.`
      },
      {
        heading: 'CSS Positioning Schemes & Stacking Contexts',
        content: `The \`position\` property removes elements from the standard top-to-bottom document flow:

1. **\`static\` (Default):** The element lives in normal document flow. \`top\`, \`right\`, \`bottom\`, \`left\`, and \`z-index\` have no effect.
2. **\`relative\`:** The element remains in normal document flow, but can be visually offset relative to where it would normally sit. Crucially, a relatively positioned element acts as the **anchor container** for child elements with \`position: absolute\`.
3. **\`absolute\`:** The element is completely removed from document flow (surrounding elements collapse as if it doesn't exist). It is positioned relative to its nearest ancestor with \`position: relative\` (or the viewport if no ancestor is positioned).
4. **\`fixed\`:** Positioned relative to the physical browser viewport window. Stays glued to the screen when the user scrolls (used for modal dialog overlays and sticky notification banners).
5. **\`sticky\`:** A hybrid of relative and fixed. The element scrolls normally with the document until it reaches a specified offset (e.g. \`top: 0\`), at which point it sticks to the screen until its parent container scrolls out of view (used for table headers and sticky navigation bars).

### The Stacking Context and \`z-index\`:
\`z-index\` controls the vertical 3D depth of overlapping elements along the Z-axis (towards or away from the viewer).
* **Important:** \`z-index\` only works on positioned elements (\`relative\`, \`absolute\`, \`fixed\`, or \`sticky\`) or flex/grid items.
* **Stacking Contexts:** An element with a \`z-index: 9999\` cannot break out above a parent container whose stacking context is trapped under an adjacent sibling with \`z-index: 10\`. Always manage z-index with clean design tokens (\`--z-dropdown: 100\`, \`--z-modal: 1000\`).`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Forgetting box-sizing: border-box, causing layouts to break when padding is added.',
        whyItHappens: 'Browser defaults to content-box, which adds padding to element width.',
        howToFix: 'Add the universal reset: *, *::before, *::after { box-sizing: border-box; } at the top of your global CSS.'
      },
      {
        mistake: 'Using position: absolute without setting position: relative on the parent container.',
        whyItHappens: 'Expecting the element to position relative to its parent <div> automatically.',
        howToFix: 'Add position: relative to the parent card or container so the child anchors to the parent rather than the full viewport.'
      },
      {
        mistake: 'Applying vertical margins to inline elements like <span> or <a> and wondering why spacing does not work.',
        whyItHappens: 'Inline elements do not respect top/bottom margins or height.',
        howToFix: 'Change the display mode to display: inline-block or display: block.'
      }
    ],
    guidedExercise: {
      title: 'Build a Notification Card with a Positioned Badge',
      difficulty: 'Beginner',
      instructions: 'Construct a notification card using the CSS Box Model with border-box sizing, padding, and an absolutely positioned notification count badge pinned to the top-right corner.',
      starterCode: `/* TODO: Style .notification-card and .badge */
.notification-card {
  /* Set width, padding, border-box, and position: relative */
}

.badge {
  /* Set position: absolute, pinned to top: -10px, right: -10px */
}`,
      tasks: [
        'Apply box-sizing: border-box and position: relative to .notification-card.',
        'Add 1.5rem padding and a clean border to the card.',
        'Position .badge with position: absolute pinned to the top-right corner.',
        'Style the badge with a circular shape, red background, and centered white text.'
      ],
      hints: [
        'The card must have position: relative so the badge anchors to it rather than the whole screen.',
        'Pin the badge using top: -0.5rem and right: -0.5rem.',
        'Use border-radius: 9999px or 50% for a circular badge.'
      ],
      solution: `.notification-card {
  box-sizing: border-box;
  position: relative;
  background-color: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 1.5rem;
  max-width: 320px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.badge {
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  background-color: #ef4444; /* Alert red */
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 700;
  min-width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ffffff; /* Contrast ring */
}`,
      solutionExplanation: 'The card serves as the positioned ancestor (position: relative), allowing the badge to be positioned precisely on its top-right border (position: absolute; top: -0.5rem; right: -0.5rem).'
    },
    quiz: [
      {
        question: 'Under "box-sizing: border-box", if an element has width: 200px, padding: 20px, and border: 2px, what is its total rendered width on screen?',
        options: [
          '244px',
          '200px',
          '176px',
          '222px'
        ],
        correctIndex: 1,
        explanation: 'Under border-box, padding and border are absorbed inside the declared width. The total rendered width remains exactly 200px.'
      },
      {
        question: 'What happens to the vertical space between two adjacent block elements with margin-bottom: 40px and margin-top: 25px?',
        options: [
          'The margins add together to create 65px of space.',
          'The margins collapse into a single margin equal to the larger value (40px).',
          'The margins cancel each other out to create 15px of space.',
          'The second element overlaps the first element by 25px.'
        ],
        correctIndex: 1,
        explanation: 'Vertical margins on adjacent block-level elements in normal document flow collapse into a single space equal to the greatest margin value (40px).'
      },
      {
        question: 'In order for a child element with "position: absolute" to position itself relative to its parent container, what property must the parent container have?',
        options: [
          'display: block',
          'overflow: hidden',
          'position: relative (or any position value other than static)',
          'z-index: 1'
        ],
        correctIndex: 2,
        explanation: 'An absolutely positioned element looks up the DOM tree for the nearest ancestor with a position other than static (most commonly position: relative). If none is found, it positions relative to the initial viewport.'
      }
    ],
    takeaways: [
      'The CSS Box Model consists of Content, Padding, Border, and Margin.',
      'Always set box-sizing: border-box globally so padding and border are contained inside declared dimensions.',
      'Vertical margins between adjacent block elements collapse to the largest value; horizontal margins never collapse.',
      'Use position: relative on container cards to establish an anchor for position: absolute children.',
      'Use position: sticky for headers that stick to the viewport during page scrolling.'
    ],
    caseStudyReference: {
      title: 'Modal Overlays & Status Badges in CRP India',
      description: 'Observe how modal dialogs use position: fixed with backdrop overlays, while grievance status chips use border-box padding and relative positioning.',
      files: [
        'reference-projects/CRP-India/frontend/src/components/GrievanceCard.jsx',
        'reference-projects/CRP-India/frontend/src/index.css'
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
      'Master the fundamental distinction between 1-dimensional layouts (Flexbox) and 2-dimensional layouts (CSS Grid).',
      'Understand Flexbox axes: Main Axis vs Cross Axis, and how flex-direction toggles them.',
      'Control item alignment with justify-content, align-items, gap, and flex-wrap.',
      'Master flex-grow, flex-shrink, and flex-basis for proportional item distribution.',
      'Build responsive 2D layouts using CSS Grid: grid-template-columns, repeat(), fr units, minmax(), and auto-fit.'
    ],
    sections: [
      {
        heading: 'Flexbox vs. CSS Grid: Choosing the Right Tool',
        content: `Before Flexbox and Grid, arranging elements side-by-side required fragile hacks like \`float: left\` and \`clear: both\`. Modern CSS provides two complementary, native layout engines:

| Feature | Flexbox (\`display: flex\`) | CSS Grid (\`display: grid\`) |
| :--- | :--- | :--- |
| **Dimensionality** | **1-Dimensional** (Row OR Column at a time) | **2-Dimensional** (Rows AND Columns simultaneously) |
| **Design Approach** | **Content-First:** Items size based on their content, pushing neighbors | **Layout-First:** The container dictates a strict grid structure that items slot into |
| **Best Used For** | Navigation bars, button groups, card headers, aligning icons with text | Full-page layouts, photo galleries, dashboard widget grids, complex data matrices |

A professional frontend architecture does not choose between them; it uses both in harmony: CSS Grid constructs the overall page framework, while Flexbox aligns the contents inside individual cards and navigation headers.`
      },
      {
        heading: 'Flexbox Fundamentals: Axes, Alignment, and Growth',
        content: `Declaring \`display: flex\` turns an element into a **Flex Container** and its immediate children into **Flex Items**.

### 1. The Two Axes:
* **Main Axis:** The primary direction items flow along. By default (\`flex-direction: row\`), it runs horizontally from left to right.
* **Cross Axis:** Runs perpendicular to the Main Axis. For \`row\`, it runs vertically top to bottom.
* *Note:* Setting \`flex-direction: column\` flips the axes: the Main Axis becomes vertical and the Cross Axis becomes horizontal!

### 2. Alignment Properties:
* **\`justify-content\` (Aligns along the Main Axis):**
  * \`flex-start\`: Items group at the start.
  * \`center\`: Items center along the axis.
  * \`space-between\`: First item at start, last item at end, equal spacing between. Perfect for navigation bars!
  * \`space-around\` and \`space-evenly\`: Distributes space evenly around items.
* **\`align-items\` (Aligns along the Cross Axis):**
  * \`stretch\` (Default): Items stretch to fill container height.
  * \`center\`: Perfect vertical centering (no more CSS vertical-align hacks!).
  * \`flex-start\` / \`flex-end\`: Aligns items to the top or bottom edge.
* **\`gap\`:** Sets the gutter spacing between items without messy margin hacks.

### 3. Sizing Flex Items: \`flex: grow shrink basis\`
\`\`\`css
/* Shorthand: flex: <flex-grow> <flex-shrink> <flex-basis>; */
.sidebar { flex: 0 0 250px; } /* Fixed at 250px, will not grow or shrink */
.main-content { flex: 1 1 auto; } /* Takes up all remaining available space */
\`\`\`
* **\`flex-grow\`:** Proportion of available free space this item should claim.
* **\`flex-shrink\`:** Ability to shrink when space is constrained.
* **\`flex-basis\`:** The initial default size before free space is distributed.`
      },
      {
        heading: 'CSS Grid: 2D Layouts, Fractional Units, and auto-fit',
        content: `CSS Grid introduces true two-dimensional layout capability, controlling both columns and rows simultaneously.

### The Fractional Unit (\`fr\`):
The \`fr\` unit represents a fraction of the available free space in the grid container.
\`\`\`css
.dashboard-grid {
  display: grid;
  grid-template-columns: 250px 1fr 2fr;
  gap: 1.5rem;
}
\`\`\`
Here, the first column is locked to 250px, and the remaining space is divided into 3 equal shares: column 2 gets 1 share (1fr), and column 3 gets 2 shares (2fr).

### The Holy Grail of Responsive Grids: \`auto-fit\` and \`minmax()\`
You can create a fully responsive, multi-column card grid that rearranges itself from 4 columns down to 1 column on phones **without writing a single media query**:

\`\`\`css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
\`\`\`

### How It Works:
1. \`minmax(280px, 1fr)\`: Every card must be at least 280px wide, but can stretch up to 1fr.
2. \`repeat(auto-fit, ...)\`: The browser calculates how many 280px columns can fit in the current container width.
   * On a 1200px desktop screen: Fits 4 columns.
   * On a 768px tablet: Automatically reorganizes into 2 columns.
   * On a 360px mobile phone: Drops down to 1 column. Zero media queries required!`
      },
      {
        heading: 'Combining Flexbox and Grid in Real Applications',
        content: `Let us examine how production applications like CRP India combine both layout engines:

\`\`\`css
/* 1. CSS Grid handles the page structure */
.admin-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: 100vh;
}

/* 2. Flexbox handles individual card contents */
.grievance-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.grievance-actions {
  display: flex;
  gap: 0.75rem;
}
\`\`\`

By delegating macro page layout to Grid and micro component alignment to Flexbox, your stylesheets remain maintainable, responsive, and robust.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using Flexbox for a 2D grid and struggling with row-to-row column alignment.',
        whyItHappens: 'Flexbox items on row 2 do not align with items on row 1 because each row is an independent flex container.',
        howToFix: 'Use CSS Grid for 2D tabular layouts where items in row 2 must align vertically with row 1.'
      },
      {
        mistake: 'Using negative margins or float hacks instead of gap.',
        whyItHappens: 'Relying on pre-2020 layout tutorials.',
        howToFix: 'Modern Flexbox and Grid support the gap property directly (e.g. gap: 1rem).'
      },
      {
        mistake: 'Writing duplicate media queries to re-columnize simple card grids.',
        whyItHappens: 'Not knowing the repeat(auto-fit, minmax(...)) pattern.',
        howToFix: 'Use grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) for responsive cards.'
      }
    ],
    guidedExercise: {
      title: 'Build a Responsive Dashboard Grid with Flexbox Cards',
      difficulty: 'Intermediate',
      instructions: 'Create a responsive 2-column dashboard layout using CSS Grid for the macro layout and Flexbox inside each card to align header titles with status badges.',
      starterCode: `/* TODO: Create responsive layout using Grid and Flexbox */
.dashboard {
  /* Use grid with auto-fit */
}

.card-header {
  /* Use flexbox to separate title and status badge */
}`,
      tasks: [
        'Set .dashboard to display: grid with repeat(auto-fit, minmax(300px, 1fr)) and gap: 1.5rem.',
        'Style .card with background, padding, and border-radius.',
        'Set .card-header to display: flex with justify-content: space-between and align-items: center.',
        'Align action buttons at the bottom of the card using display: flex with gap: 0.5rem.'
      ],
      hints: [
        'repeat(auto-fit, minmax(300px, 1fr)) handles the responsive card columns automatically.',
        'justify-content: space-between pushes the heading to the left and the badge to the right.',
        'align-items: center prevents the badge from stretching to match the heading height.'
      ],
      solution: `.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
}

.card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.card-body {
  flex-grow: 1; /* Pushes footer buttons to the bottom of the card */
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}`,
      solutionExplanation: 'The container uses modern CSS Grid auto-fit for responsive wrapping. Inside each card, Flexbox aligns header items and uses flex-grow: 1 on the body to push the action buttons cleanly to the bottom.'
    },
    quiz: [
      {
        question: 'What is the key difference in dimension between Flexbox and CSS Grid?',
        options: [
          'Flexbox handles 3D models, while Grid handles 2D images.',
          'Flexbox is 1-dimensional (arranges items in a row OR column), while Grid is 2-dimensional (controls rows AND columns simultaneously).',
          'Flexbox works only on mobile, while Grid works only on desktop.',
          'Flexbox cannot support gap spacing.'
        ],
        correctIndex: 1,
        explanation: 'Flexbox is a 1-dimensional layout model designed for distributing space along a single axis (row or column). CSS Grid is 2-dimensional, coordinating rows and columns simultaneously.'
      },
      {
        question: 'What does "grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))" achieve?',
        options: [
          'It creates an infinite loop that crashes the browser.',
          'It creates an automatically responsive multi-column layout where columns are at least 250px wide and wrap onto new lines without media queries.',
          'It locks the grid strictly to exactly 2 columns on all devices.',
          'It resizes images to 250px.'
        ],
        correctIndex: 1,
        explanation: 'This modern CSS Grid pattern automatically fits as many 250px+ columns as can fit in the container, wrapping cards naturally as viewport width decreases without requiring media query breakpoints.'
      },
      {
        question: 'Which Flexbox property aligns items along the Cross Axis?',
        options: [
          'justify-content',
          'align-items',
          'flex-direction',
          'flex-grow'
        ],
        correctIndex: 1,
        explanation: 'align-items aligns items along the Cross Axis (perpendicular to the main flow), whereas justify-content aligns items along the Main Axis.'
      }
    ],
    takeaways: [
      'Use Flexbox for 1D component layouts (navbars, toolbars, card headers, button groups).',
      'Use CSS Grid for 2D layouts (page templates, dashboard widgets, responsive photo galleries).',
      'justify-content aligns along the Main Axis; align-items aligns along the Cross Axis.',
      'The repeat(auto-fit, minmax(...)) pattern creates responsive multi-column grids without media queries.',
      'Combine Grid for macro page structures with Flexbox for micro component alignment.'
    ],
    caseStudyReference: {
      title: 'Responsive Grid Dashboard Layout in CRP India',
      description: 'Review the administrative and citizen dashboard views in CRP India, observing how Grid constructs the metrics cards and Flexbox aligns status badges and action buttons.',
      files: [
        'reference-projects/CRP-India/frontend/src/pages/AdminDashboard.jsx',
        'reference-projects/CRP-India/frontend/src/components/GrievanceCard.jsx'
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
      'Master the mobile-first responsive design philosophy using min-width media queries.',
      'Define standard breakpoint tokens (sm, md, lg, xl) and avoid arbitrary device-specific queries.',
      'Craft smooth, performant hover and focus transitions using transition-property and duration.',
      'Master 2D and 3D transforms: translate, rotate, scale, skew, and hardware-accelerated rendering.',
      'Construct keyframe animations with @keyframes, animation-fill-mode, and respect prefers-reduced-motion.'
    ],
    sections: [
      {
        heading: 'Mobile-First Responsive Architecture',
        content: `Over 60% of global web traffic originates from mobile devices. The **mobile-first** approach means writing your baseline CSS for the smallest screen first, and then using **\`@media (min-width: ...)\`** queries to progressively enhance the layout as more screen real estate becomes available.

### Why Mobile-First with \`min-width\` is Superior:
1. **Performance on Mobile:** Mobile devices parse only the lean baseline styles without having to override heavy desktop desktop rules.
2. **Progressive Enhancement:** You build a solid, functional single-column experience first, then layer on multi-column grids and sidebars.

\`\`\`css
/* BASELINE (Mobile: 0px and up) */
.page-container {
  padding: 1rem;
}
.sidebar {
  display: none; /* Collapsed by default on mobile */
}

/* TABLET AND UP (768px and up) */
@media (min-width: 768px) {
  .page-container {
    padding: 2rem;
  }
  .sidebar {
    display: block;
    width: 240px;
  }
}

/* DESKTOP AND UP (1024px and up) */
@media (min-width: 1024px) {
  .page-container {
    max-width: 1200px;
    margin: 0 auto;
  }
}
\`\`\`

### Industry Standard Breakpoints:
* **Small (\`sm\`):** \`640px\` (Large phones in landscape)
* **Medium (\`md\`):** \`768px\` (Tablets)
* **Large (\`lg\`):** \`1024px\` (Laptops and small desktops)
* **Extra Large (\`xl\`):** \`1280px\` (Large desktop displays)`
      },
      {
        heading: 'Smooth Transitions and State Micro-Interactions',
        content: `A website without transitions feels rigid and robotic. The \`transition\` property allows property changes (like hover or focus states) to animate smoothly over time rather than snapping instantaneously:

\`\`\`css
/* transition: <property> <duration> <timing-function> <delay>; */
.interactive-btn {
  background-color: #2563eb;
  color: white;
  transform: translateY(0);
  transition: 
    background-color 0.2s ease,
    transform 0.15s ease-out,
    box-shadow 0.2s ease;
}

.interactive-btn:hover {
  background-color: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.interactive-btn:active {
  transform: translateY(0);
}
\`\`\`

### Performance Rule:
Only animate properties that can be offloaded to the GPU: **\`transform\`** and **\`opacity\`**. 

Animating properties like \`width\`, \`height\`, \`margin\`, or \`top\` triggers **Browser Reflow / Layout**, recalculating the geometry of the entire page on every single animation frame (causing stutter and lag, especially on mobile). \`transform\` and \`opacity\` run on the GPU compositor thread without triggering layout!`
      },
      {
        heading: '2D & 3D Transforms',
        content: `The \`transform\` property modifies the coordinate space of an element without disrupting surrounding elements in normal document flow:

* **\`translate(x, y)\` and \`translateZ(z)\`:** Moves an element horizontally, vertically, or in 3D depth.
* **\`scale(x, y)\`:** Enlarges or shrinks an element smoothly.
* **\`rotate(deg)\` and \`rotateX/Y/Z(deg)\`:** Rotates an element around its transform origin.
* **\`skew(x, y)\`:** Distorts an element along its axes.

### Activating 3D Perspective:
To enable real 3D depth in CSS, define **\`perspective\`** on the parent container and **\`transform-style: preserve-3d\`**:

\`\`\`css
.scene-container {
  perspective: 1000px; /* Distance between viewer eye and 3D plane */
}

.card-3d {
  transform-style: preserve-3d;
  transition: transform 0.4s ease;
}

.card-3d:hover {
  transform: rotateY(15deg) rotateX(10deg) translateZ(20px);
}
\`\`\`
This creates hardware-accelerated 3D parallax effects with zero heavy external 3D libraries!`
      },
      {
        heading: 'Keyframe Animations and prefers-reduced-motion',
        content: `When transitions between two states are not enough, **\`@keyframes\`** enables complex multi-stage animations:

\`\`\`css
/* Define animation stages */
@keyframes pulseGlow {
  0% {
    box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(37, 99, 235, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(37, 99, 235, 0);
  }
}

.urgent-badge {
  animation: pulseGlow 2s infinite ease-in-out;
}
\`\`\`

### CRITICAL ACCESSIBILITY: \`prefers-reduced-motion\`
Vestibular disorders can cause motion sickness, dizziness, and nausea when exposed to excessive animations or parallax scrolling. Operating systems allow users to request reduced motion.

**Always respect the user\'s motion preference:**
\`\`\`css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
\`\`\``
      }
    ],
    commonMistakes: [
      {
        mistake: 'Animating width, height, or top/left instead of transform.',
        whyItHappens: 'It seems straightforward to increase width on hover.',
        howToFix: 'Animating width causes expensive layout reflow on every frame. Use transform: scale() or transform: translateY() for 60fps GPU performance.'
      },
      {
        mistake: 'Using desktop-first max-width queries everywhere, resulting in conflicting overrides on mobile.',
        whyItHappens: 'Developing on a desktop monitor first and patching mobile issues later.',
        howToFix: 'Adopt mobile-first design: write base styles for phones, and enhance with @media (min-width: 768px).'
      },
      {
        mistake: 'Ignoring prefers-reduced-motion.',
        whyItHappens: 'Assuming all users enjoy continuous spinning animations or aggressive parallax.',
        howToFix: 'Include @media (prefers-reduced-motion: reduce) to disable non-essential motion.'
      }
    ],
    guidedExercise: {
      title: 'Build a Mobile-First Card with GPU-Accelerated Micro-Interactions',
      difficulty: 'Intermediate',
      instructions: 'Write a mobile-first responsive card that arranges in a single column on mobile, expands to a 2-column layout on screens >= 768px, includes GPU-accelerated hover transitions, and respects prefers-reduced-motion.',
      starterCode: `/* TODO: Write mobile-first styles with min-width query */
.card-wrapper {
  /* Mobile base: 1 column */
}

@media (min-width: 768px) {
  .card-wrapper {
    /* Tablet/Desktop: 2 columns */
  }
}

/* Add GPU-accelerated hover transition */
.interactive-card {
}

/* Add prefers-reduced-motion guard */`,
      tasks: [
        'Write baseline mobile styles for .card-wrapper (single column).',
        'Use @media (min-width: 768px) to switch .card-wrapper to a 2-column grid.',
        'Add a hover interaction on .interactive-card using transform: translateY(-4px) and box-shadow.',
        'Only animate transform and box-shadow with a 0.2s ease timing.',
        'Add @media (prefers-reduced-motion: reduce) to neutralize the transition.'
      ],
      hints: [
        'Start with display: grid; grid-template-columns: 1fr; on mobile.',
        'Under @media (min-width: 768px), set grid-template-columns: repeat(2, 1fr).',
        'Use transform: translateY(-4px) rather than top: -4px to ensure GPU acceleration.'
      ],
      solution: `.card-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  padding: 1rem;
}

@media (min-width: 768px) {
  .card-wrapper {
    grid-template-columns: repeat(2, 1fr);
    padding: 2rem;
  }
}

.interactive-card {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.5rem;
  transform: translateY(0);
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.interactive-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 20px -5px rgba(0, 0, 0, 0.1);
}

@media (prefers-reduced-motion: reduce) {
  .interactive-card {
    transition: none !important;
    transform: none !important;
  }
}`,
      solutionExplanation: 'This solution adheres to mobile-first architecture (min-width: 768px), animates only GPU-friendly transform and box-shadow properties, and fully respects the user\'s prefers-reduced-motion accessibility preference.'
    },
    quiz: [
      {
        question: 'Which CSS properties can be animated smoothly on the GPU without triggering expensive layout reflows?',
        options: [
          'width and height',
          'transform and opacity',
          'margin-top and padding-left',
          'top and left'
        ],
        correctIndex: 1,
        explanation: 'transform and opacity can be composited directly on the GPU without forcing the browser rendering engine to recalculate page layout geometry (reflow).'
      },
      {
        question: 'What is the main benefit of mobile-first responsive design using min-width media queries?',
        options: [
          'It eliminates the need for HTML doctypes.',
          'Mobile devices load lightweight base styles first, and more complex layouts are layered on progressively as screen width expands.',
          'It forces all images to be black and white.',
          'It blocks search engine spiders from indexing mobile pages.'
        ],
        correctIndex: 1,
        explanation: 'Mobile-first design ensures mobile devices do not waste CPU cycles overriding complex desktop styles, resulting in cleaner code and faster mobile performance.'
      },
      {
        question: 'What is the purpose of the "@media (prefers-reduced-motion: reduce)" media query?',
        options: [
          'It reduces browser memory usage when playing video games.',
          'It detects whether a user has enabled motion reduction in their operating system to prevent motion sickness and vestibular disorders.',
          'It slows down internet connection speeds intentionally.',
          'It disables JavaScript event listeners.'
        ],
        correctIndex: 1,
        explanation: 'prefers-reduced-motion honors accessibility settings requested by users sensitive to motion, allowing developers to disable distracting animations and parallax.'
      }
    ],
    takeaways: [
      'Adopt mobile-first design: write baseline styles for small screens and enhance using min-width media queries.',
      'Use standard breakpoints (640px, 768px, 1024px, 1280px) rather than arbitrary device dimensions.',
      'Animate transform and opacity for smooth 60fps GPU-accelerated micro-interactions.',
      'Leverage CSS 3D transforms (perspective, transform-style: preserve-3d) for lightweight 3D effects.',
      'Always implement @media (prefers-reduced-motion: reduce) to respect user accessibility preferences.'
    ],
    caseStudyReference: {
      title: 'Responsive Navbar and Mobile Drawers in CRP India',
      description: 'Examine how the navigation bar in CRP India toggles between desktop horizontal links and an animated mobile drawer with smooth slide-in transitions.',
      files: [
        'reference-projects/CRP-India/frontend/src/components/Navbar.jsx',
        'reference-projects/CRP-India/frontend/src/index.css'
      ]
    }
  }
};
