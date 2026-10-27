// Dev-Root Phase 5: 10-Tier Project-Based Learning Path
// Grounded in real-world application building and CRP India case study

export const projects = [
  {
    id: 'proj-01-profile-page',
    slug: 'personal-profile-page',
    tier: 1,
    title: 'Project 1: Personal Profile & Portfolio Page',
    subtitle: 'Semantic HTML5 structure, typography, styling, responsive card layout, and accessible links',
    difficulty: 'Beginner',
    estimatedHours: 4,
    skills: ['HTML5 Document Structure', 'Semantic Elements', 'Accessible Media', 'CSS Box Model', 'Typography'],
    prerequisites: 'Completion of HTML Fundamentals and CSS Foundations lessons.',
    overview: `Build an accessible, beautifully styled personal profile and developer bio page from scratch. This project solidifies your understanding of semantic HTML5 tags (header, main, section, footer), the CSS box model, web typography, and responsive media handling without relying on frameworks.`,
    learningObjectives: [
      'Structure a complete HTML document with valid head metadata, viewport tags, and character encoding.',
      'Apply semantic markup (main, section, article, nav, footer) with correct heading hierarchy (h1 through h3).',
      'Integrate responsive images with descriptive alt text for screen readers.',
      'Style the page using CSS custom properties (variables), rem units, and clean typography scales.',
      'Organize personal skill badges, project links, and contact channels using accessible anchor tags.'
    ],
    features: [
      'Hero bio section with developer portrait, headline, tagline, and call-to-action buttons.',
      'About Me section detailing background, education, and career aspirations.',
      'Skills grid showcasing frontend competencies with custom-styled tags/badges.',
      'Featured Links / Portfolio showcase linking out to live projects and GitHub repositories.',
      'Accessible Contact Footer with email mailto links, social links, and copyright statement.'
    ],
    suggestedArchitecture: `
portfolio/
├── index.html        # Main HTML5 document structure
├── styles.css        # CSS design system (tokens, reset, layout, components)
└── assets/
    └── avatar.svg    # Developer profile illustration or avatar
    `,
    starterFiles: {
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Developer Profile</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Build your semantic header, main, and footer sections here -->
  <header class="profile-header">
    <h1>Your Name Here</h1>
    <p class="tagline">Aspiring Full-Stack Software Engineer</p>
  </header>

  <main class="container">
    <!-- About Section -->
    <section id="about">
      <h2>About Me</h2>
      <p>Write a brief summary of your journey and tech interests.</p>
    </section>

    <!-- Skills Section -->
    <section id="skills">
      <h2>Skills & Technologies</h2>
      <!-- Use an unordered list for semantic skills -->
      <ul class="skills-list">
        <li>HTML5</li>
        <li>CSS3</li>
        <li>JavaScript</li>
      </ul>
    </section>
  </main>

  <footer>
    <p>&copy; 2026. All rights reserved.</p>
  </footer>
</body>
</html>`,
      'styles.css': `:root {
  --primary: #4f46e5;
  --text-main: #1f2937;
  --bg-main: #f9fafb;
  --card-bg: #ffffff;
  --border: #e5e7eb;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: var(--text-main);
  background-color: var(--bg-main);
  line-height: 1.6;
}

.container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}`
    },
    milestones: [
      {
        id: 'm1',
        title: 'Milestone 1: Semantic HTML Markup & Head Metadata',
        description: 'Set up the HTML5 document skeleton with viewport meta, language attribute, title, and semantic landmark elements (<header>, <main>, <section>, <footer>).',
        tasks: [
          'Add <!DOCTYPE html>, <html lang="en">, and <meta name="viewport" content="width=device-width, initial-scale=1.0">.',
          'Define exactly one <h1> element on the page in the header.',
          'Create three distinct <section> elements inside <main>, each identified with a descriptive id and an <h2> heading.',
          'Add an image element with a meaningful alt attribute.'
        ],
        hint: 'Never leave alt="" empty on a profile portrait unless it is purely decorative. Use alt="Photo of [Your Name]" so assistive technologies can describe it.',
        solutionSnippet: `<header class="hero">
  <img src="assets/avatar.svg" alt="Portrait of Alex Sharma" class="avatar" width="120" height="120">
  <div class="hero-text">
    <h1>Alex Sharma</h1>
    <p class="tagline">Junior Full-Stack Web Developer & Open Source Contributor</p>
  </div>
</header>`
      },
      {
        id: 'm2',
        title: 'Milestone 2: Design System & Typography in CSS',
        description: 'Define CSS variables for your color palette and typography scales, then apply a modern card aesthetic with padding, rounded corners, and subtle box shadows.',
        tasks: [
          'Declare --primary, --text-color, --bg-color, and --card-bg in :root.',
          'Style headings with appropriate line-height and font-weight.',
          'Create a card layout class with background, border, border-radius, and box-shadow.',
          'Add smooth transition effects on interactive links.'
        ],
        hint: 'Use rem units for margins, paddings, and font sizes instead of fixed pixels so user browser zoom preferences are respected.',
        solutionSnippet: `.card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}`
      },
      {
        id: 'm3',
        title: 'Milestone 3: Skills Badges & Accessible Navigation',
        description: 'Implement a flexbox grid of skill chips and a responsive social link bar with clear focus rings for keyboard navigators.',
        tasks: [
          'Wrap skills in an unordered list (<ul class="skills-chips">) with flexbox wrapping.',
          'Style skill items with subtle background pills and hover states.',
          'Ensure all anchor links have visible :focus-visible outlines with high contrast.',
          'Verify that color contrast meets WCAG AA (minimum 4.5:1 for body text).'
        ],
        hint: 'Use a:focus-visible { outline: 2px solid var(--primary); outline-offset: 3px; } to make navigation accessible for tab key users.',
        solutionSnippet: `.skills-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
}

.skills-chips li {
  background: #eef2ff;
  color: #4338ca;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
}`
      }
    ],
    testingInstructions: [
      'Validate HTML using validator.w3.org to ensure zero syntax or nesting errors.',
      'Press the Tab key repeatedly to ensure all interactive links receive visible focus indicators in logical order.',
      'Resize the browser window from 320px width up to 1440px to ensure no horizontal scrollbars occur.',
      'Check text readability in Chrome DevTools using Lighthouse Accessibility audit (aim for 100/100 score).'
    ],
    commonMistakes: [
      'Using multiple <h1> headings on a single document instead of a single top-level title.',
      'Using <div> tags everywhere instead of semantic <header>, <main>, <section>, and <footer> tags.',
      'Omitting the viewport meta tag, causing mobile devices to render the page zoomed out as a desktop layout.',
      'Using fixed widths in pixels (e.g. width: 800px) that cause overflow on smartphones.'
    ],
    extensionChallenges: [
      'Add a dark mode theme toggle using CSS data-theme attributes and CSS custom variables.',
      'Add a downloadable resume button linking to a PDF with the download attribute.',
      'Include a timeline view for education and work experience using pseudo-elements (::before / ::after).'
    ]
  },
  {
    id: 'proj-02-responsive-website',
    slug: 'responsive-website',
    tier: 2,
    title: 'Project 2: Responsive Product Landing Page',
    subtitle: 'CSS Flexbox, CSS Grid, mobile-first media queries, responsive navbar, and pricing cards',
    difficulty: 'Basic Application',
    estimatedHours: 6,
    skills: ['CSS Flexbox', 'CSS Grid', 'Mobile-First Design', 'Media Queries', 'Responsive Navigation'],
    prerequisites: 'Completion of CSS Layout, Flexbox, and CSS Grid lessons.',
    overview: `Construct a multi-section responsive landing page for a modern SaaS product or civic platform. You will implement a sticky mobile-first navigation bar, a two-column hero with fluid typography, a CSS Grid feature showcase, and a 3-tier comparative pricing table that seamlessly adapts across mobile, tablet, and desktop viewports.`,
    learningObjectives: [
      'Structure a multi-section landing page using modern BEM or utility CSS conventions.',
      'Master CSS Grid auto-fit and minmax() for automatic card column reflow.',
      'Build a responsive header with a hamburger toggle pattern using accessible semantics.',
      'Employ mobile-first media queries (@media (min-width: ...)) for predictable breakpoint scaling.',
      'Design accessible interactive hover and active states with CSS transitions.'
    ],
    features: [
      'Responsive sticky header with brand logo, nav links, and CTA button.',
      'Hero banner with headline, supporting copy, dual CTA buttons, and responsive graphic.',
      'Key Features grid that transitions from 1 column on mobile to 2 on tablet and 3 on desktop.',
      'Pricing Comparison table featuring a highlighted "Most Popular" card with badge.',
      'Newsletter signup section with inline input and submit button.',
      'Multi-column site footer with legal links, social links, and copyright.'
    ],
    suggestedArchitecture: `
landing-page/
├── index.html
├── css/
│   ├── reset.css
│   ├── variables.css
│   └── styles.css
└── images/
    └── hero-illustration.svg
    `,
    starterFiles: {
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CloudFlow — Seamless Workflow Automation</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header class="navbar">
    <div class="nav-container">
      <a href="#" class="brand">CloudFlow</a>
      <nav class="nav-links">
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#contact">Contact</a>
      </nav>
      <a href="#pricing" class="btn btn-primary">Get Started</a>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="hero-content">
        <h1>Automate Your Municipal Redressal In Seconds</h1>
        <p>Connect citizens, administrators, and field workers on one unified real-time dashboard.</p>
        <div class="hero-actions">
          <a href="#pricing" class="btn btn-primary">Start Free Trial</a>
          <a href="#features" class="btn btn-secondary">Learn More</a>
        </div>
      </div>
    </section>

    <section id="features" class="features-section">
      <h2>Why Teams Choose CloudFlow</h2>
      <div class="features-grid">
        <div class="feature-card">
          <h3>Real-Time Tracking</h3>
          <p>Instant SMS and email notifications whenever grievance status changes.</p>
        </div>
        <div class="feature-card">
          <h3>Automated SLA Escalation</h3>
          <p>Overdue complaints automatically escalate to district municipal supervisors.</p>
        </div>
        <div class="feature-card">
          <h3>Interactive GIS Map</h3>
          <p>Visualize water, road, and sanitation outages geographically across city zones.</p>
        </div>
      </div>
    </section>
  </main>
</body>
</html>`,
      'css/styles.css': `/* Mobile-first base styles */
:root {
  --primary: #2563eb;
  --primary-dark: #1d4ed8;
  --text: #1e293b;
  --text-muted: #64748b;
  --bg: #ffffff;
  --bg-subtle: #f8fafc;
  --border: #e2e8f0;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; color: var(--text); background: var(--bg); line-height: 1.5; }

.navbar { background: white; border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 50; }
.nav-container { max-width: 1200px; margin: 0 auto; padding: 1rem; display: flex; justify-content: space-between; align-items: center; }
.features-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; padding: 2rem 1rem; max-width: 1200px; margin: 0 auto; }

/* Desktop Media Query */
@media (min-width: 768px) {
  .features-grid { grid-template-columns: repeat(3, 1fr); }
}`
    },
    milestones: [
      {
        id: 'm1',
        title: 'Milestone 1: Mobile-First Header & Navigation',
        description: 'Implement a sticky navigation header that stays pinned to the top on scroll, with a clean flex layout and clear tap targets (minimum 44x44px).',
        tasks: [
          'Set position: sticky and top: 0 with an appropriate z-index on the header.',
          'Use display: flex and justify-content: space-between on .nav-container.',
          'Ensure tap targets on buttons have minimum dimensions of 44px by 44px for touchscreens.'
        ],
        hint: 'Remember that sticky headers need an opaque background color (such as background: #ffffff), otherwise the page content will scroll visibly beneath it.',
        solutionSnippet: `.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
}`
      },
      {
        id: 'm2',
        title: 'Milestone 2: Dynamic CSS Grid Features Layout',
        description: 'Build the feature cards grid using CSS Grid repeat(auto-fit, minmax(280px, 1fr)) so the layout reflows seamlessly from mobile to wide screens without brittle breakpoints.',
        tasks: [
          'Replace rigid media queries with grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)).',
          'Add a subtle 1px border and hover lift animation to each feature card.',
          'Style card headers with clear visual hierarchy.'
        ],
        hint: 'auto-fit expands columns to fill available space, while minmax(280px, 1fr) guarantees cards will never shrink below 280px before wrapping.',
        solutionSnippet: `.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}`
      },
      {
        id: 'm3',
        title: 'Milestone 3: 3-Tier Responsive Pricing Table',
        description: 'Create an engaging pricing tier section featuring Free, Professional, and Enterprise plans with feature checkmarks and a highlighted badge.',
        tasks: [
          'Build 3 pricing cards using flexbox or CSS Grid.',
          'Scale up the "Professional" card slightly (transform: scale(1.05)) on desktop to draw focus.',
          'Add a "Popular" badge at the top of the middle card.'
        ],
        hint: 'Use flex-direction: column on the cards with flex-grow: 1 on the features list so action buttons always align neatly at the bottom regardless of card height.',
        solutionSnippet: `.pricing-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 2rem;
  background: white;
}

.pricing-card.featured {
  border: 2px solid var(--primary);
  box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.15);
}`
      }
    ],
    testingInstructions: [
      'Test across Chrome DevTools device mode presets: iPhone SE (375px), iPad Mini (768px), and Desktop (1280px+).',
      'Verify that horizontal scroll is completely absent across all resolutions.',
      'Check that the navigation bar does not cover section headings when clicking anchor links by adding scroll-margin-top to sections.'
    ],
    commonMistakes: [
      'Writing desktop styles first and using @media (max-width: ...) to patch mobile bugs, resulting in bloated, fragile CSS.',
      'Not adding scroll-margin-top: 5rem on anchor targets, causing sticky headers to obscure section titles.',
      'Hardcoding element heights (e.g. height: 300px) that cause text overflow when font sizes scale.'
    ],
    extensionChallenges: [
      'Add a monthly vs yearly billing toggle switch that animates prices smoothly.',
      'Add an FAQ accordion using the semantic <details> and <summary> HTML elements.'
    ]
  },
  {
    id: 'proj-03-calculator',
    slug: 'interactive-calculator',
    tier: 3,
    title: 'Project 3: Interactive Web Calculator',
    subtitle: 'JavaScript DOM manipulation, state management, event delegation, arithmetic operations, and keyboard accessibility',
    difficulty: 'Basic Application',
    estimatedHours: 6,
    skills: ['JavaScript Variables & Scope', 'Event Delegation', 'DOM Manipulation', 'Floating Point Arithmetic', 'Keyboard Events'],
    prerequisites: 'Completion of JavaScript Fundamentals and DOM Manipulation lessons.',
    overview: `Develop a fully interactive desktop calculator supporting chained arithmetic (+, -, *, /), decimal precision, percentage calculations, sign toggling, and keyboard bindings. This project reinforces event delegation, state transition logic, and clean separation of mathematical computation from visual DOM updates.`,
    learningObjectives: [
      'Manage application state (currentOperand, previousOperand, operation, resetNeeded).',
      'Leverage event delegation on the calculator keypad to handle all button clicks with a single event listener.',
      'Format numerical outputs cleanly, preventing multiple decimal points and handling division by zero safely.',
      'Listen for keydown keyboard events to enable complete numpad and keyboard operation.',
      'Handle floating-point precision issues in JavaScript (e.g., 0.1 + 0.2).'
    ],
    features: [
      'Two-line LCD display: primary display for current number, secondary display for equation history.',
      'Basic arithmetic: addition, subtraction, multiplication, and division.',
      'Clear (AC) and backspace delete (DEL) operations.',
      'Decimal point handling with duplicate decimal prevention.',
      'Division by zero guard displaying "Cannot divide by zero" without crashing.',
      'Full keyboard support for digits 0-9, operators, Enter/Equal, and Escape.'
    ],
    suggestedArchitecture: `
calculator/
├── index.html       # Calculator grid UI and LCD display
├── styles.css       # Neomorphic or flat calculator styling
└── app.js           # Calculator state machine and event handlers
    `,
    starterFiles: {
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JS Calculator</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="calculator">
    <div class="display">
      <div class="previous-operand" id="prevDisplay"></div>
      <div class="current-operand" id="currentDisplay">0</div>
    </div>
    <div class="keypad" id="keypad">
      <button class="btn btn-action" data-action="clear">AC</button>
      <button class="btn btn-action" data-action="delete">DEL</button>
      <button class="btn btn-operator" data-operator="/">÷</button>
      <button class="btn btn-operator" data-operator="*">×</button>

      <button class="btn" data-number="7">7</button>
      <button class="btn" data-number="8">8</button>
      <button class="btn" data-number="9">9</button>
      <button class="btn btn-operator" data-operator="-">−</button>

      <button class="btn" data-number="4">4</button>
      <button class="btn" data-number="5">5</button>
      <button class="btn" data-number="6">6</button>
      <button class="btn btn-operator" data-operator="+">+</button>

      <button class="btn" data-number="1">1</button>
      <button class="btn" data-number="2">2</button>
      <button class="btn" data-number="3">3</button>
      <button class="btn btn-equals" data-action="compute">=</button>

      <button class="btn btn-zero" data-number="0">0</button>
      <button class="btn" data-action="decimal">.</button>
    </div>
  </div>
  <script src="app.js"></script>
</body>
</html>`,
      'app.js': `// Calculator State Machine
class Calculator {
  constructor(prevDisplay, currentDisplay) {
    this.prevDisplay = prevDisplay;
    this.currentDisplay = currentDisplay;
    this.clear();
  }

  clear() {
    this.current = '0';
    this.previous = '';
    this.operation = undefined;
  }

  appendNumber(number) {
    if (number === '.' && this.current.includes('.')) return;
    if (this.current === '0' && number !== '.') {
      this.current = number.toString();
    } else {
      this.current = this.current.toString() + number.toString();
    }
  }

  chooseOperation(operation) {
    if (this.current === '') return;
    if (this.previous !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previous = this.current;
    this.current = '';
  }

  compute() {
    let result;
    const prev = parseFloat(this.previous);
    const curr = parseFloat(this.current);
    if (isNaN(prev) || isNaN(curr)) return;

    switch (this.operation) {
      case '+': result = prev + curr; break;
      case '-': result = prev - curr; break;
      case '*': result = prev * curr; break;
      case '/': 
        if (curr === 0) {
          alert('Cannot divide by zero');
          this.clear();
          return;
        }
        result = prev / curr; 
        break;
      default: return;
    }

    this.current = Math.round(result * 100000000) / 100000000;
    this.operation = undefined;
    this.previous = '';
  }

  updateDisplay() {
    this.currentDisplay.innerText = this.current;
    if (this.operation != null) {
      this.prevDisplay.innerText = \`\${this.previous} \${this.operation}\`;
    } else {
      this.prevDisplay.innerText = '';
    }
  }
}

// Initialise
const prevEl = document.getElementById('prevDisplay');
const currEl = document.getElementById('currentDisplay');
const calc = new Calculator(prevEl, currEl);

document.getElementById('keypad').addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;

  if (btn.dataset.number) {
    calc.appendNumber(btn.dataset.number);
  } else if (btn.dataset.operator) {
    calc.chooseOperation(btn.dataset.operator);
  } else if (btn.dataset.action === 'compute') {
    calc.compute();
  } else if (btn.dataset.action === 'clear') {
    calc.clear();
  } else if (btn.dataset.action === 'decimal') {
    calc.appendNumber('.');
  }
  calc.updateDisplay();
});`
    },
    milestones: [
      {
        id: 'm1',
        title: 'Milestone 1: Calculator State Architecture',
        description: 'Implement the Calculator state object or class with clear(), appendNumber(), chooseOperation(), and compute() methods.',
        tasks: [
          'Initialize current, previous, and operation properties.',
          'Write appendNumber with a check to prevent multiple decimal points (e.g. "3.14.2").',
          'Implement compute() using switch statements for +, -, *, and /.'
        ],
        hint: 'Use parseFloat() to convert string inputs into numbers before arithmetic, and format the result back to string.',
        solutionSnippet: `appendNumber(num) {
  if (num === '.' && this.current.includes('.')) return;
  this.current = this.current === '0' && num !== '.' ? String(num) : this.current + String(num);
}`
      },
      {
        id: 'm2',
        title: 'Milestone 2: Keypad Event Delegation & UI Sync',
        description: 'Attach a single click listener to #keypad using event.target.closest("button") to handle all keypad actions efficiently.',
        tasks: [
          'Add data attributes (data-number, data-operator, data-action) to HTML buttons.',
          'Verify that clicking on the gap between buttons does nothing.',
          'Call updateDisplay() after every valid button press.'
        ],
        hint: 'Event delegation on the parent keypad prevents needing 16 separate event listeners, saving memory and avoiding stale references.',
        solutionSnippet: `keypad.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  // dispatch to calculator methods based on dataset
});`
      },
      {
        id: 'm3',
        title: 'Milestone 3: Keyboard Navigation & Edge Cases',
        description: 'Add a window keydown listener to support typing numbers, operators, Enter (=), and Escape (AC). Handle division by zero gracefully.',
        tasks: [
          'Listen for window.addEventListener("keydown", handler).',
          'Map keys "0"-"9" to appendNumber, "+-*/" to chooseOperation, and "Enter" to compute.',
          'Prevent page scrolling when pressing Space or Enter on focused buttons with e.preventDefault().',
          'Guard against 0 / 0 and n / 0 with an error state.'
        ],
        hint: 'Check if (e.key >= "0" && e.key <= "9") to easily catch number keys without writing 10 different if branches.',
        solutionSnippet: `window.addEventListener('keydown', (e) => {
  if ((e.key >= '0' && e.key <= '9') || e.key === '.') calc.appendNumber(e.key);
  if (['+', '-', '*', '/'].includes(e.key)) calc.chooseOperation(e.key);
  if (e.key === 'Enter' || e.key === '=') { e.preventDefault(); calc.compute(); }
  if (e.key === 'Escape') calc.clear();
  calc.updateDisplay();
});`
      }
    ],
    testingInstructions: [
      'Compute "10 ÷ 2 + 5" in sequence and verify the final result is 10.',
      'Attempt to divide 42 by 0 and verify the calculator does not crash or show NaN/Infinity.',
      'Type "3.14.15" and verify only one decimal point is accepted ("3.1415").',
      'Test numpad keyboard entry with NumLock enabled.'
    ],
    commonMistakes: [
      'Using JavaScript eval(str) to compute math expressions, which is a severe security vulnerability and breaks on operator chains.',
      'Failing to convert string operands into numbers, causing "5" + "5" to yield "55" instead of 10.',
      'Allowing numbers to overflow the display boundary instead of reducing font size or setting overflow: hidden.'
    ],
    extensionChallenges: [
      'Add a scientific mode with square root (√), power (x²), and percentage (%) buttons.',
      'Maintain an execution history tape in localStorage allowing users to review their last 10 calculations.'
    ]
  },
  {
    id: 'proj-04-todo-app',
    slug: 'todo-application',
    tier: 4,
    title: 'Project 4: Task Manager with Local Storage',
    subtitle: 'CRUD state management, array filtering, localStorage persistence, custom data attributes, and form validation',
    difficulty: 'Intermediate',
    estimatedHours: 8,
    skills: ['Array Methods (map, filter, find)', 'JSON Serialization', 'localStorage API', 'DOM Manipulation', 'Form Validation'],
    prerequisites: 'Completion of JavaScript Arrays & Objects, DOM Manipulation, and Events lessons.',
    overview: `Build a production-quality task management web application with complete Create, Read, Update, and Delete (CRUD) capabilities. Users can create tasks with priority tags and due dates, filter by status (All, Active, Completed), search tasks in real time, and persist their state across browser refreshes via localStorage.`,
    learningObjectives: [
      'Model structured application state using an array of task objects ({ id, title, completed, priority, createdAt }).',
      'Persist application state safely to browser localStorage using JSON.stringify and JSON.parse with error handling.',
      'Implement pure functions to add, toggle, edit, and delete tasks without mutating state unpredictably.',
      'Build reactive filter tabs (All, Active, Completed) using Array.prototype.filter().',
      'Sanitize text inputs to prevent XSS (Cross-Site Scripting) vulnerabilities when rendering tasks.'
    ],
    features: [
      'Add new task with validation (disallow empty or whitespace-only submissions).',
      'Toggle task completion status with strike-through styling.',
      'Delete task with confirmation dialog or undo toast.',
      'Filter tasks by All, Active, or Completed status.',
      'Live search filter that highlights matching task titles.',
      'Active task counter and "Clear Completed" batch action button.',
      'Automatic localStorage synchronization on all mutations.'
    ],
    suggestedArchitecture: `
todo-app/
├── index.html
├── styles.css
└── app.js
    `,
    starterFiles: {
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Task Master Pro</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="app-container">
    <header class="app-header">
      <h1>Task Master</h1>
      <p class="subtitle">Stay focused and organized</p>
    </header>

    <form id="taskForm" class="task-form">
      <input type="text" id="taskInput" placeholder="What needs to be accomplished?" autocomplete="off" required>
      <select id="prioritySelect">
        <option value="normal">Normal Priority</option>
        <option value="high">High Priority</option>
      </select>
      <button type="submit" class="btn btn-primary">Add Task</button>
    </form>

    <div class="filter-bar">
      <div class="tabs" id="filterTabs">
        <button class="tab active" data-filter="all">All</button>
        <button class="tab" data-filter="active">Active</button>
        <button class="tab" data-filter="completed">Completed</button>
      </div>
      <span id="activeCount" class="counter">0 tasks remaining</span>
    </div>

    <ul id="taskList" class="task-list"></ul>

    <div class="footer-actions">
      <button id="clearCompletedBtn" class="btn btn-secondary">Clear Completed</button>
    </div>
  </div>
  <script src="app.js"></script>
</body>
</html>`
    },
    milestones: [
      {
        id: 'm1',
        title: 'Milestone 1: State Modeling & LocalStorage Engine',
        description: 'Design the task object schema and create safe storage helper functions (loadTasks() and saveTasks()) wrapped in try/catch blocks.',
        tasks: [
          'Create an in-memory tasks array initialized from localStorage.getItem("devroot_tasks").',
          'Handle JSON parsing exceptions safely with fallback to an empty array.',
          'Define the task schema: { id: Date.now().toString(), text: string, completed: boolean, priority: string }.'
        ],
        hint: 'Always wrap JSON.parse(localStorage.getItem(key)) in a try...catch block to prevent corrupted storage from bricking the entire app.',
        solutionSnippet: `function loadTasks() {
  try {
    const raw = localStorage.getItem('devroot_tasks');
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to load tasks from localStorage:', err);
    return [];
  }
}

function saveTasks(tasks) {
  try {
    localStorage.setItem('devroot_tasks', JSON.stringify(tasks));
  } catch (err) {
    console.error('Failed to save tasks to localStorage:', err);
  }
}`
      },
      {
        id: 'm2',
        title: 'Milestone 2: Task Creation, Toggling, and DOM Rendering',
        description: 'Render tasks dynamically into the DOM using document.createElement or template literals with text escaping to protect against XSS.',
        tasks: [
          'Listen for submit on #taskForm, extract trimmed input value, and reject empty strings.',
          'Push new task to state, call saveTasks(), and re-render.',
          'Render checkbox, title, priority badge, and delete button for each task.',
          'Listen for change events to toggle task.completed.'
        ],
        hint: 'Use textContent instead of innerHTML when setting user-supplied task text to prevent script injection vulnerabilities.',
        solutionSnippet: `function renderTasks(taskList, tasksToRender) {
  taskList.innerHTML = '';
  tasksToRender.forEach(task => {
    const li = document.createElement('li');
    li.className = \`task-item \${task.completed ? 'completed' : ''}\`;
    li.dataset.id = task.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;

    const span = document.createElement('span');
    span.className = 'task-title';
    span.textContent = task.text; // Safe from XSS

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-delete';
    deleteBtn.textContent = '×';

    li.append(checkbox, span, deleteBtn);
    taskList.appendChild(li);
  });
}`
      },
      {
        id: 'm3',
        title: 'Milestone 3: Filtering & Active Count',
        description: 'Implement filter buttons (All, Active, Completed) and update the remaining task count dynamically.',
        tasks: [
          'Filter tasks based on activeFilter === "active" ? !t.completed : ...',
          'Calculate active tasks using tasks.filter(t => !t.completed).length.',
          'Implement "Clear Completed" by filtering out completed tasks and saving state.'
        ],
        hint: 'Keep a single source of truth: `tasks` array. Compute filtered arrays on the fly when rendering instead of maintaining separate lists.',
        solutionSnippet: `function getFilteredTasks(tasks, currentFilter) {
  if (currentFilter === 'active') return tasks.filter(t => !t.completed);
  if (currentFilter === 'completed') return tasks.filter(t => t.completed);
  return tasks;
}`
      }
    ],
    testingInstructions: [
      'Add three tasks, complete one, and refresh the browser to verify state is preserved exactly.',
      'Switch between "All", "Active", and "Completed" tabs and confirm the count updates accurately.',
      'Enter HTML tags like `<script>alert(1)</script>` as a task title to ensure it renders as safe plain text.'
    ],
    commonMistakes: [
      'Injecting unescaped user text with `li.innerHTML = \`<span>\${input.value}</span>\``, creating an XSS vulnerability.',
      'Mutating state directly in filters instead of producing a new array representation.',
      'Forgetting to call `e.preventDefault()` on form submit, causing the page to reload and lose state.'
    ],
    extensionChallenges: [
      'Add drag-and-drop task reordering using the HTML5 Drag and Drop API.',
      'Add due date reminders that highlight overdue tasks in red.'
    ]
  },
  {
    id: 'proj-05-api-dashboard',
    slug: 'api-based-application',
    tier: 5,
    title: 'Project 5: API-Based Weather & Civic Data Dashboard',
    subtitle: 'Fetch API, async/await, RESTful JSON consumption, loading states, error handling, and debounce search',
    difficulty: 'Intermediate',
    estimatedHours: 8,
    skills: ['Asynchronous JavaScript', 'Fetch API', 'Promises & async/await', 'Error Handling (try/catch)', 'Debouncing'],
    prerequisites: 'Completion of Asynchronous JavaScript, Fetch API, and JSON lessons.',
    overview: `Build an asynchronous dashboard application that fetches real-world weather or civic municipal data from a public REST API. You will implement robust network error handling, loading skeleton indicators, user search input debouncing, and defensive JSON response parsing.`,
    learningObjectives: [
      'Execute HTTP GET requests using fetch() with modern async/await syntax.',
      'Handle HTTP error status codes (e.g., 404 Not Found, 429 Rate Limited, 500 Server Error) gracefully.',
      'Render informative visual states: Loading skeletons, Error alerts with retry buttons, and Empty states.',
      'Debounce search keystrokes to minimize redundant API calls and respect rate limits.',
      'Parse deeply nested JSON objects safely with optional chaining (?.) and default fallbacks.'
    ],
    features: [
      'City or district search bar with debounced input (350ms delay).',
      'Current conditions widget showing temperature, humidity, wind speed, and weather icon.',
      '5-day forecast card strip with high/low temperatures.',
      'Loading spinner and skeleton cards while network requests are in flight.',
      'Graceful offline/error banner with a "Retry Request" button.'
    ],
    suggestedArchitecture: `
weather-dashboard/
├── index.html
├── styles.css
└── app.js
    `,
    starterFiles: {
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Civic Weather Dashboard</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="dashboard-container">
    <header class="dashboard-header">
      <h1>Civic Weather & Alert Hub</h1>
      <p>Real-time municipal environmental monitoring</p>
    </header>

    <div class="search-box">
      <input type="text" id="cityInput" placeholder="Enter city name (e.g. New Delhi, Mumbai)..." autocomplete="off">
      <button id="searchBtn" class="btn btn-primary">Search</button>
    </div>

    <div id="statusContainer" class="status-container"></div>
    <div id="weatherDisplay" class="weather-display hidden"></div>
  </div>
  <script src="app.js"></script>
</body>
</html>`
    },
    milestones: [
      {
        id: 'm1',
        title: 'Milestone 1: Robust Asynchronous Fetch Client',
        description: 'Write an async function fetchWeatherData(city) that validates response.ok, catches network failures, and parses JSON safely.',
        tasks: [
          'Verify response.ok; throw a descriptive Error if response.status === 404 ("City not found").',
          'Wrap the request in a try...catch block to catch offline or DNS failures.',
          'Extract temperature, condition text, and humidity into a normalized data object.'
        ],
        hint: 'Remember that `fetch()` only rejects on network failures (like being offline). It does NOT reject on 404 or 500 HTTP statuses—you must check `if (!response.ok)` yourself.',
        solutionSnippet: `async function fetchWeatherData(city) {
  try {
    const url = \`https://api.open-meteo.com/v1/forecast?latitude=28.61&longitude=77.23&current_weather=true\`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(\`Server returned status \${res.status}\`);
    }
    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}`
      },
      {
        id: 'm2',
        title: 'Milestone 2: UI States (Loading, Error, Data)',
        description: 'Implement a state-driven view renderer that toggles between loading spinner, error alert, and weather data cards.',
        tasks: [
          'Show a loading spinner before invoking fetch.',
          'If fetch fails, display a user-friendly error message with a "Try Again" button.',
          'If fetch succeeds, render current weather statistics neatly.'
        ],
        hint: 'Never leave the user looking at a blank screen. Always display an explicit loading state when awaiting a promise.',
        solutionSnippet: `function showLoading() {
  statusContainer.innerHTML = '<div class="spinner"></div><p>Fetching weather data...</p>';
  weatherDisplay.classList.add('hidden');
}

function showError(msg) {
  statusContainer.innerHTML = \`<div class="alert alert-error">
    <p>⚠️ \${msg}</p>
    <button onclick="retryLastSearch()" class="btn btn-sm">Retry</button>
  </div>\`;
  weatherDisplay.classList.add('hidden');
}`
      },
      {
        id: 'm3',
        title: 'Milestone 3: Input Debouncing',
        description: 'Implement a debounce utility function so typing in the search box waits 400ms before sending an API request.',
        tasks: [
          'Write a reusable debounce(fn, delay) higher-order function.',
          'Attach the debounced function to the city input "input" event.',
          'Cancel pending timeouts when new keys are typed.'
        ],
        hint: 'Debouncing uses closure to hold a timerId: clearTimeout(timerId); timerId = setTimeout(...).',
        solutionSnippet: `function debounce(func, delay = 400) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}`
      }
    ],
    testingInstructions: [
      'Enter an invalid city name and confirm an error message appears without unhandled promise rejections in the console.',
      'Open DevTools Network panel, set throttling to "Slow 3G", and verify loading indicators render properly.',
      'Type rapidly in the search input and confirm only a single API request is dispatched after typing stops.'
    ],
    commonMistakes: [
      'Assuming fetch automatically rejects on HTTP 404 or 500 error responses.',
      'Hardcoding API secrets or credentials directly in client-side repositories.',
      'Forgetting to clear previous error messages when initiating a new search.'
    ],
    extensionChallenges: [
      'Use the browser Geolocation API (navigator.geolocation.getCurrentPosition) to load weather automatically for the user’s current coordinates.',
      'Cache recent queries in sessionStorage to eliminate redundant network calls when switching between cities.'
    ]
  },
  {
    id: 'proj-06-react-app',
    slug: 'react-application',
    tier: 6,
    title: 'Project 6: React Interactive Redressal Portal',
    subtitle: 'Vite + React, component composition, hooks (useState, useEffect, useMemo), controlled inputs, and modal dialogs',
    difficulty: 'Intermediate',
    estimatedHours: 10,
    skills: ['React JSX', 'Component Architecture', 'useState & useEffect', 'Controlled Forms', 'Prop Drilling & State Lifting'],
    prerequisites: 'Completion of Modern JavaScript and React Foundations lessons.',
    overview: `Build a modern single-page React application inspired by the CRP India Citizen Redressal Portal. Learners construct reusable component hierarchies (Navbar, ComplaintCard, FilterBar, ModalDialog), manage complex state with hooks, handle controlled forms with client-side validation, and synchronize state with useEffect.`,
    learningObjectives: [
      'Deconstruct complex user interfaces into focused, single-responsibility React components.',
      'Manage component state and state lifting using useState and controlled form patterns.',
      'Perform side effects and data initialization safely using useEffect with dependency arrays.',
      'Implement derived state using useMemo to avoid unnecessary recalculations during filtering.',
      'Pass callbacks and props with clear prop contracts and type considerations.'
    ],
    features: [
      'Citizen complaint feed rendering cards with department badges, status pills, and timestamps.',
      'Interactive department filter (Water, Roads, Sanitation, Electricity) and status tabs.',
      'New Complaint modal dialog with controlled input fields, validation rules, and error messages.',
      'Dynamic status updates: Citizens or admins can advance complaint status (Submitted → In Progress → Resolved).',
      'Statistical overview summary cards calculating total, pending, and resolved counts.'
    ],
    suggestedArchitecture: `
src/
├── components/
│   ├── Navbar.jsx
│   ├── StatsOverview.jsx
│   ├── ComplaintCard.jsx
│   ├── ComplaintFilter.jsx
│   └── NewComplaintModal.jsx
├── data/
│   └── initialComplaints.js
├── App.jsx
└── main.jsx
    `,
    starterFiles: {
      'App.jsx': `import React, { useState } from 'react';
import initialData from './data/initialComplaints';

export default function App() {
  const [complaints, setComplaints] = useState(initialData);
  const [filter, setFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredComplaints = complaints.filter(c => {
    if (filter === 'ALL') return true;
    return c.status === filter;
  });

  const handleAddComplaint = (newComplaint) => {
    setComplaints([newComplaint, ...complaints]);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="max-w-5xl mx-auto mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">CRP India Redressal Portal</h1>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary">
          + File New Complaint
        </button>
      </header>
      {/* Build filter bar and complaint card grid here */}
    </div>
  );
}`
    },
    milestones: [
      {
        id: 'm1',
        title: 'Milestone 1: Component Hierarchy & Props Contract',
        description: 'Break down the application into modular components: StatsOverview, ComplaintFilter, ComplaintCard, and NewComplaintModal.',
        tasks: [
          'Define clear props for ComplaintCard (complaint object, onStatusChange callback).',
          'Create a reusable Badge component for departments and statuses.',
          'Render a mock list of complaints using complaints.map(c => <ComplaintCard key={c.id} ... />).'
        ],
        hint: 'Always provide a stable, unique `key` prop (like `c.id`) when mapping arrays in JSX. Never use the array index as key when items can be added or reordered.',
        solutionSnippet: `export function ComplaintCard({ complaint, onStatusChange }) {
  return (
    <div className="card">
      <div className="card-header">
        <span className="badge">{complaint.department}</span>
        <span className={\`status-pill status-\${complaint.status.toLowerCase()}\`}>
          {complaint.status}
        </span>
      </div>
      <h3>{complaint.title}</h3>
      <p>{complaint.description}</p>
      <div className="card-footer">
        <small>{new Date(complaint.createdAt).toLocaleDateString()}</small>
        <button onClick={() => onStatusChange(complaint.id, 'RESOLVED')}>
          Mark Resolved
        </button>
      </div>
    </div>
  );
}`
      },
      {
        id: 'm2',
        title: 'Milestone 2: Controlled Form Modal & Validation',
        description: 'Build a controlled modal dialog with title, department, priority, and description fields with live validation.',
        tasks: [
          'Maintain form state in a single object `formData` or individual `useState` hooks.',
          'Validate that title is at least 5 characters and description is at least 15 characters.',
          'Disable the submit button while form fields contain validation errors.'
        ],
        hint: 'Use a controlled form where every input specifies `value={formData.title}` and `onChange={handleChange}` to maintain a single source of truth.',
        solutionSnippet: `function handleChange(e) {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
}`
      },
      {
        id: 'm3',
        title: 'Milestone 3: Derived Metrics & Filter State',
        description: 'Compute statistical metrics (total, pending, resolved) using useMemo and filter the complaint list reactively.',
        tasks: [
          'Compute stats with useMemo(() => ({ total: complaints.length, ... }), [complaints]).',
          'Implement filter buttons that update filter state.',
          'Render an empty state message when no complaints match the selected filter.'
        ],
        hint: 'Do not store stats in separate state variables! Compute them as derived values from the `complaints` array to prevent synchronization bugs.',
        solutionSnippet: `const stats = useMemo(() => {
  return {
    total: complaints.length,
    pending: complaints.filter(c => c.status === 'PENDING').length,
    resolved: complaints.filter(c => c.status === 'RESOLVED').length
  };
}, [complaints]);`
      }
    ],
    testingInstructions: [
      'File a new complaint and verify it appears immediately at the top of the feed.',
      'Filter by "RESOLVED" and confirm only resolved complaints are visible.',
      'Check React DevTools component tree to verify props and hooks update without unnecessary re-renders.'
    ],
    commonMistakes: [
      'Directly mutating state with `complaints.push(newComplaint)` instead of `setComplaints([...])`.',
      'Forgetting the dependency array in `useEffect`, causing an infinite re-render loop.',
      'Using the array index as the JSX `key` prop, leading to incorrect state binding when items are filtered.'
    ],
    extensionChallenges: [
      'Add search functionality that filters by keyword in title and description simultaneously.',
      'Implement an upvote counter on community complaints so citizens can endorse existing issues.'
    ]
  },
  {
    id: 'proj-07-backend-api',
    slug: 'backend-rest-api',
    tier: 7,
    title: 'Project 7: Node.js & Express RESTful API',
    subtitle: 'Express server, REST endpoints, JSON body parsing, request validation middleware, and centralized error handling',
    difficulty: 'Advanced',
    estimatedHours: 10,
    skills: ['Node.js Runtime', 'Express.js Framework', 'REST Architecture', 'Middleware Design', 'HTTP Status Codes'],
    prerequisites: 'Completion of Node.js and Express.js backend lessons.',
    overview: `Architect and implement a secure, modular RESTful API service using Node.js and Express. Based on the CRP India Grievance API, you will build endpoints for creating, listing, filtering, and updating citizen complaints, complete with validation middleware, request logging, and structured error responses.`,
    learningObjectives: [
      'Configure an Express application with modular routing (express.Router()).',
      'Implement full CRUD REST endpoints adhering to standard HTTP verbs (GET, POST, PATCH, DELETE).',
      'Create custom Express middleware for request logging and request payload validation.',
      'Return semantic HTTP status codes (200 OK, 201 Created, 400 Bad Request, 404 Not Found, 500 Server Error).',
      'Implement a centralized error-handling middleware that catches synchronous and asynchronous exceptions.'
    ],
    features: [
      'GET /api/v1/complaints: List all complaints with query parameter filtering (department, status, search).',
      'GET /api/v1/complaints/:id: Fetch a single complaint by unique identifier.',
      'POST /api/v1/complaints: Create a new complaint with schema validation middleware.',
      'PATCH /api/v1/complaints/:id/status: Update complaint status with permitted state transitions.',
      'DELETE /api/v1/complaints/:id: Soft-delete or remove a complaint.',
      'Centralized 4-argument error handler (err, req, res, next) returning JSON error payloads.'
    ],
    suggestedArchitecture: `
backend/
├── src/
│   ├── controllers/
│   │   └── complaintController.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── validateRequest.js
│   ├── routes/
│   │   └── complaintRoutes.js
│   ├── data/
│   │   └── mockDb.js
│   └── app.js
├── package.json
└── server.js
    `,
    starterFiles: {
      'server.js': `const express = require('express');
const complaintRoutes = require('./src/routes/complaintRoutes');
const { errorHandler } = require('./src/middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Routes
app.use('/api/v1/complaints', complaintRoutes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(\`CRP Backend API running on port \${PORT}\`);
});`
    },
    milestones: [
      {
        id: 'm1',
        title: 'Milestone 1: Express Server & Modular Router Setup',
        description: 'Initialize the Express application, enable express.json() middleware, and configure express.Router() in a dedicated routes file.',
        tasks: [
          'Create src/routes/complaintRoutes.js using express.Router().',
          'Implement GET /api/v1/complaints returning mock complaint data.',
          'Implement GET /api/v1/complaints/:id returning 404 if the item is not found.'
        ],
        hint: 'Always return `return res.status(404).json(...)` when an item is missing to prevent Node from attempting to send multiple responses.',
        solutionSnippet: `router.get('/:id', (req, res) => {
  const item = complaints.find(c => c.id === req.params.id);
  if (!item) {
    return res.status(404).json({ success: false, error: 'Complaint not found' });
  }
  res.json({ success: true, data: item });
});`
      },
      {
        id: 'm2',
        title: 'Milestone 2: Request Validation Middleware',
        description: 'Build a validation middleware that inspects req.body for required fields (title, department, description) before hitting the controller.',
        tasks: [
          'Create validateComplaintBody middleware.',
          'Verify title exists and is at least 5 characters long.',
          'Verify department is one of ["WATER", "ROADS", "SANITATION", "ELECTRICITY"].',
          'Return 400 Bad Request with an array of specific validation error messages if validation fails.'
        ],
        hint: 'Middleware must call `next()` when validation passes, or return `res.status(400).json(...)` when it fails.',
        solutionSnippet: `function validateComplaint(req, res, next) {
  const { title, department, description } = req.body;
  const errors = [];
  if (!title || title.trim().length < 5) errors.push('Title must be at least 5 characters.');
  if (!department) errors.push('Department is required.');
  if (!description || description.trim().length < 10) errors.push('Description must be at least 10 characters.');

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }
  next();
}`
      },
      {
        id: 'm3',
        title: 'Milestone 3: Centralized Error Handler',
        description: 'Implement Express centralized error handling middleware to catch all unexpected errors and return consistent JSON structures.',
        tasks: [
          'Write a function with signature (err, req, res, next).',
          'Log the error stack in development environment.',
          'Return status code err.statusCode || 500 with a clean JSON payload.'
        ],
        hint: 'Express recognizes error-handling middleware specifically by having exactly four arguments: (err, req, res, next).',
        solutionSnippet: `function errorHandler(err, req, res, next) {
  console.error('Unhandled Server Error:', err.stack);
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
}`
      }
    ],
    testingInstructions: [
      'Use curl, Postman, or Thunder Client to send a GET request to /api/v1/complaints.',
      'Send a POST request with an empty body and verify the server responds with 400 Bad Request and validation details.',
      'Send a GET request to /api/v1/complaints/non-existent-id and verify 404 response.'
    ],
    commonMistakes: [
      'Forgetting `app.use(express.json())`, causing `req.body` to be undefined in POST requests.',
      'Sending a response and then calling `next()`, causing "Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client".',
      'Exposing raw database errors or stack traces to client responses in production.'
    ],
    extensionChallenges: [
      'Add pagination support (e.g. ?page=1&limit=10) and sort parameters (?sortBy=createdAt&order=desc).',
      'Implement rate limiting middleware using in-memory token bucket or express-rate-limit.'
    ]
  },
  {
    id: 'proj-08-database-app',
    slug: 'database-connected-application',
    tier: 8,
    title: 'Project 8: Database-Connected Grievance Service',
    subtitle: 'PostgreSQL / SQLite, Prisma or Mongoose ORM, database schema migrations, relational indexing, and ACID transactions',
    difficulty: 'Advanced',
    estimatedHours: 12,
    skills: ['Relational Database Design', 'Schema Migrations', 'SQL & ORM Querying', 'Data Modeling', 'Database Indexing'],
    prerequisites: 'Completion of Database Fundamentals and Backend REST API lessons.',
    overview: `Connect your Node.js backend to a persistent database (PostgreSQL or SQLite via Prisma ORM). You will model real-world relational entities (Citizens, Complaints, Departments, DepartmentOfficers, AuditLogs), run schema migrations, write complex queries with joins and aggregations, and enforce database-level data integrity constraints.`,
    learningObjectives: [
      'Design normalized relational schemas with primary keys, foreign keys, and unique constraints.',
      'Execute declarative migrations to evolve database tables safely over time.',
      'Implement CRUD operations using an ORM with proper error mapping for unique constraint violations.',
      'Perform relational queries with eager loading and aggregations (GROUP BY department, status).',
      'Optimize database performance using indexes on frequently queried columns (status, citizenId).'
    ],
    features: [
      'Complete relational database model: User, Complaint, Department, Comment, and AuditLog.',
      'Prisma or Sequelize migrations managing table creation and schema changes.',
      'Foreign key constraints enforcing referential integrity (cascade rules).',
      'Analytics query endpoint calculating average resolution time per municipal department.',
      'Transaction-backed complaint assignment: updating officer assignment and creating an audit record atomically.'
    ],
    suggestedArchitecture: `
database-service/
├── prisma/
│   ├── schema.prisma       # Relational models and relations
│   └── migrations/         # Generated SQL migration history
├── src/
│   ├── db/
│   │   └── client.js       # PrismaClient singleton
│   ├── services/
│   │   └── complaintService.js
│   └── controllers/
│       └── complaintController.js
└── package.json
    `,
    starterFiles: {
      'prisma/schema.prisma': `datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

generator client {
  provider = "prisma-client-js"
}

enum ComplaintStatus {
  SUBMITTED
  IN_PROGRESS
  ESCALATED
  RESOLVED
  REJECTED
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}

model User {
  id         String      @id @default(uuid())
  email      String      @unique
  name       String
  role       String      @default("CITIZEN") // CITIZEN, OFFICER, ADMIN
  complaints Complaint[]
  createdAt  DateTime    @default(now())
}

model Complaint {
  id          String          @id @default(uuid())
  title       String
  description String
  department  String
  priority    Priority        @default(MEDIUM)
  status      ComplaintStatus @default(SUBMITTED)
  citizenId   String
  citizen     User            @relation(fields: [citizenId], references: [id])
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt

  @@index([status])
  @@index([citizenId])
  @@index([department])
}`
    },
    milestones: [
      {
        id: 'm1',
        title: 'Milestone 1: Relational Schema Design & Migration',
        description: 'Define relational models for User and Complaint with foreign keys, indexes, and run the initial migration.',
        tasks: [
          'Create schema.prisma with User and Complaint models.',
          'Add an index on [status] and [department] to optimize filtering queries.',
          'Run npx prisma migrate dev --name init to generate SQLite tables.'
        ],
        hint: 'Adding indexes on columns used in WHERE and JOIN clauses speeds up query execution significantly as dataset sizes grow.',
        solutionSnippet: `// Example Prisma query with relational join
const complaintsWithCitizen = await prisma.complaint.findMany({
  where: { status: 'SUBMITTED' },
  include: { citizen: { select: { name: true, email: true } } },
  orderBy: { createdAt: 'desc' }
});`
      },
      {
        id: 'm2',
        title: 'Milestone 2: CRUD Repository Layer with Error Handling',
        description: 'Write a complaintService module encapsulating database operations and translating ORM errors to business exceptions.',
        tasks: [
          'Implement createComplaint(data), findComplaintById(id), and updateStatus(id, newStatus).',
          'Catch PrismaClientKnownRequestError and return appropriate HTTP error codes.',
          'Verify that deleting a user respects referential integrity constraints.'
        ],
        hint: 'Never instantiate multiple PrismaClient() instances across files. Export a single shared instance from a db/client.js module to prevent exhausting database connection pools.',
        solutionSnippet: `// src/db/client.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = prisma;`
      },
      {
        id: 'm3',
        title: 'Milestone 3: Database Aggregations & Transactions',
        description: 'Build an analytics endpoint using database GROUP BY aggregation and an atomic status update transaction.',
        tasks: [
          'Use prisma.complaint.groupBy({ by: ["department"], _count: { id: true } }) to return counts per department.',
          'Use prisma.$transaction to update a complaint status and write to an AuditLog table atomically.',
          'Verify that if the audit log insertion fails, the status update is rolled back.'
        ],
        hint: 'ACID transactions guarantee that either all steps succeed together, or the entire operation is rolled back, preventing orphaned or corrupt state.',
        solutionSnippet: `const [updatedComplaint, auditEntry] = await prisma.$transaction([
  prisma.complaint.update({ where: { id }, data: { status: 'RESOLVED' } }),
  prisma.auditLog.create({ data: { complaintId: id, action: 'STATUS_RESOLVED' } })
]);`
      }
    ],
    testingInstructions: [
      'Execute migration scripts and verify tables and indexes were created using SQLite/Postgres CLI or Prisma Studio.',
      'Insert test records and confirm foreign key constraints reject complaints with invalid citizen IDs.',
      'Benchmark query response times with and without indexes on 10,000 synthetic complaint records.'
    ],
    commonMistakes: [
      'Forgetting to run migrations after modifying schema files, causing runtime schema mismatch errors.',
      'Creating N+1 query performance problems by querying related entities in a loop instead of using `include` / `JOIN`.',
      'Storing date strings as raw strings instead of native DateTime / TIMESTAMP types.'
    ],
    extensionChallenges: [
      'Implement full-text search indexing on complaint title and description fields.',
      'Add soft-delete support using an `isDeleted` boolean and Prisma client query extensions.'
    ]
  },
  {
    id: 'proj-09-auth-system',
    slug: 'authentication-based-application',
    tier: 9,
    title: 'Project 9: Production Authentication & Authorization',
    subtitle: 'bcrypt password hashing, JWT access/refresh tokens, HttpOnly cookies, RBAC authorization, and route protection',
    difficulty: 'Advanced',
    estimatedHours: 12,
    skills: ['Cryptographic Hashing (bcrypt)', 'JSON Web Tokens (JWT)', 'HttpOnly Cookie Security', 'Role-Based Access Control (RBAC)', 'Route Guards'],
    prerequisites: 'Completion of Authentication, Security, and Database lessons.',
    overview: `Implement a production-grade authentication and Role-Based Access Control (RBAC) security system. You will implement user registration with salted bcrypt password hashing, login verification, stateless JWT generation with HttpOnly cookies to prevent XSS token theft, and role authorization middleware distinguishing CITIZEN, OFFICER, and SUPER_ADMIN privileges.`,
    learningObjectives: [
      'Hash and salt user passwords using bcrypt with appropriate work factors (cost factor 10-12).',
      'Sign and verify JSON Web Tokens (JWT) containing cryptographically secure user claims and expiration timestamps.',
      'Store JWTs securely in HttpOnly, SameSite, Secure cookies to defend against Cross-Site Scripting (XSS).',
      'Build authentication middleware (requireAuth) that decodes tokens and attaches the verified user to req.user.',
      'Build authorization middleware (requireRole(["ADMIN", "OFFICER"])) to protect sensitive municipal administrative routes.'
    ],
    features: [
      'POST /api/v1/auth/register: User registration with email uniqueness checks and password strength validation.',
      'POST /api/v1/auth/login: Credential verification, constant-time comparison, and JWT cookie issuance.',
      'POST /api/v1/auth/logout: Clears session cookie and invalidates user session.',
      'GET /api/v1/auth/me: Returns current authenticated user profile.',
      'Role-Based Authorization middleware protecting admin endpoints (e.g., escalating complaints, assigning officers).'
    ],
    suggestedArchitecture: `
auth-service/
├── src/
│   ├── middleware/
│   │   ├── authenticate.js     # JWT token verification
│   │   └── authorize.js        # Role check middleware
│   ├── controllers/
│   │   └── authController.js   # Register, Login, Logout, Me
│   ├── utils/
│   │   ├── password.js         # bcrypt hash & compare helpers
│   │   └── token.js            # jwt.sign & jwt.verify helpers
│   └── routes/
│       └── authRoutes.js
└── package.json
    `,
    starterFiles: {
      'src/utils/password.js': `const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;

async function hashPassword(plainTextPassword) {
  return await bcrypt.hash(plainTextPassword, SALT_ROUNDS);
}

async function verifyPassword(plainTextPassword, hashedPassword) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
}

module.exports = { hashPassword, verifyPassword };`
    },
    milestones: [
      {
        id: 'm1',
        title: 'Milestone 1: Password Hashing & Registration Pipeline',
        description: 'Implement secure registration validating email format, password complexity, checking email availability, and hashing passwords with bcrypt.',
        tasks: [
          'Enforce password requirements: minimum 8 characters, at least one number and one uppercase letter.',
          'Verify user with given email does not already exist.',
          'Hash password with bcrypt.hash(password, 12) before saving to the database.',
          'Never return the password hash in the HTTP response.'
        ],
        hint: 'Never store plain-text passwords in databases or logs. Always use an adaptive salted hashing algorithm like bcrypt.',
        solutionSnippet: `// Registration Controller
const hashedPassword = await hashPassword(password);
const user = await prisma.user.create({
  data: { email, name, passwordHash: hashedPassword, role: 'CITIZEN' },
  select: { id: true, email: true, name: true, role: true, createdAt: true }
});
res.status(201).json({ success: true, data: user });`
      },
      {
        id: 'm2',
        title: 'Milestone 2: Login & Secure JWT Cookie Issuance',
        description: 'Verify login credentials, sign a JWT with user id and role, and send it back in an HttpOnly cookie.',
        tasks: [
          'Find user by email; if missing, return generic "Invalid email or password" to prevent account enumeration.',
          'Compare candidate password using bcrypt.compare().',
          'Sign JWT with payload { id: user.id, role: user.role } and 24h expiration.',
          'Set cookie with options: { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict" }.'
        ],
        hint: 'Storing JWTs in localStorage exposes them to any malicious XSS script. Storing them in HttpOnly cookies prevents JavaScript from reading them.',
        solutionSnippet: `const token = jwt.sign(
  { id: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);

res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 24 * 60 * 60 * 1000
});

res.json({ success: true, message: 'Login successful' });`
      },
      {
        id: 'm3',
        title: 'Milestone 3: Authentication & RBAC Authorization Middleware',
        description: 'Create authenticate middleware to verify incoming cookies and authorizeRoles(["ADMIN"]) to restrict admin actions.',
        tasks: [
          'Read token from req.cookies.token or Authorization: Bearer header.',
          'Verify token with jwt.verify(token, secret); if invalid or expired, return 401 Unauthorized.',
          'Attach decoded payload to req.user.',
          'Write authorizeRoles(...allowedRoles) middleware returning 403 Forbidden if user.role is not permitted.'
        ],
        hint: 'Differentiate between 401 Unauthorized (the client has not provided valid credentials) and 403 Forbidden (the user is authenticated but lacks required permissions).',
        solutionSnippet: `function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ success: false, error: 'Forbidden: Insufficient privileges' });
    }
    next();
  };
}`
      }
    ],
    testingInstructions: [
      'Register a new account and verify password is saved as a bcrypt hash ($2b$12$...) in the database.',
      'Log in with incorrect password and confirm a 401 error is returned with generic message.',
      'Attempt to access an admin-only endpoint using a citizen account token and confirm a 403 Forbidden is returned.'
    ],
    commonMistakes: [
      'Storing tokens in `localStorage`, exposing session credentials to client-side XSS attacks.',
      'Using weak JWT secrets or committing secrets to Git repositories instead of using environment variables.',
      'Returning different error messages for "User not found" vs "Wrong password", which enables account enumeration attacks.'
    ],
    extensionChallenges: [
      'Implement an automated password reset flow using secure one-time cryptographic tokens with 15-minute expiration.',
      'Add multi-factor authentication (MFA) using Time-Based One-Time Passwords (TOTP).'
    ]
  },
  {
    id: 'proj-10-fullstack-capstone',
    slug: 'full-stack-application',
    tier: 10,
    title: 'Project 10: CRP India Full-Stack Municipal Redressal Capstone',
    subtitle: 'End-to-end full stack platform: React frontend, Express API, PostgreSQL database, authentication, SLA escalation, and automated CI/CD',
    difficulty: 'Project-Level',
    estimatedHours: 20,
    skills: ['Full-Stack Architecture', 'End-to-End Testing', 'Security Hardening', 'Database Optimization', 'Production Deployment'],
    prerequisites: 'Completion of all curriculum modules (HTML, CSS, JS, React, Node, SQL, Auth, Testing, Security, Deployment).',
    overview: `The ultimate capstone project brings together every concept learned throughout Dev-Root, mirroring the full production architecture of the CRP India Citizen Redressal Platform. You will deploy a complete full-stack system featuring citizen complaint registration, geo-tagged uploads, automated SLA escalation chron-jobs, municipal department officer dispatch dashboards, district administrative analytics, automated integration test suites, and Dockerized deployment.`,
    learningObjectives: [
      'Architect a production full-stack monorepo or dual-package repository with clean separation of concerns.',
      'Integrate a responsive React frontend with a secure Express backend using authenticated API clients.',
      'Enforce end-to-end data validation across frontend forms, API middleware, and database schema constraints.',
      'Implement automated background jobs for SLA monitoring (escalating unresolved complaints after 48 hours).',
      'Execute integration tests covering the complete citizen-to-officer complaint resolution lifecycle.',
      'Configure production security headers (Helmet, CORS, Rate Limiting) and automated containerized deployment.'
    ],
    features: [
      'Citizen Portal: File complaints with photo attachment, category selection, and GPS coordinate capture.',
      'Real-Time Status Tracking: Citizens track grievance progress with audit timeline and SMS/Email notification hooks.',
      'Officer Dashboard: Field engineers view assigned tasks, update work logs, and submit resolution proofs.',
      'Administrative Analytics: Municipal commissioners inspect district heatmaps, SLA compliance rates, and department throughput.',
      'Automated SLA Escalation Worker: Scheduled cron checks overdue complaints and elevates priority to CRITICAL.',
      'Comprehensive Automated Test Suite: Vitest unit tests, Supertest API tests, and Playwright end-to-end user journeys.'
    ],
    suggestedArchitecture: `
crp-india-capstone/
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── api/            # Authenticated Axios/Fetch client
│   │   ├── components/     # UI components (Dashboard, Forms, Maps)
│   │   ├── context/        # Auth & App state contexts
│   │   └── pages/          # Citizen, Officer, and Admin views
├── server/                 # Express REST API
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── services/
│   │   └── jobs/           # SLA escalation cron worker
│   ├── prisma/             # Database schema and migrations
│   └── tests/              # Supertest integration test suite
├── docker-compose.yml      # Local container orchestration
└── README.md
    `,
    starterFiles: {
      'docker-compose.yml': `version: '3.8'
services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: crp_india
      POSTGRES_USER: devroot
      POSTGRES_PASSWORD: devrootpassword
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  server:
    build: ./server
    ports:
      - "5000:5000"
    environment:
      DATABASE_URL: postgresql://devroot:devrootpassword@db:5432/crp_india
      JWT_SECRET: supersecretproductionkey
    depends_on:
      - db

  client:
    build: ./client
    ports:
      - "3000:80"
    depends_on:
      - server

volumes:
  pgdata:`
    },
    milestones: [
      {
        id: 'm1',
        title: 'Milestone 1: Full-Stack Architecture & Database Integration',
        description: 'Set up monorepo workspaces, establish database connections with PostgreSQL/Prisma, and configure environment variables.',
        tasks: [
          'Initialize client (Vite React) and server (Express) directories.',
          'Define the complete CRP India Prisma database schema with relations for Users, Complaints, Attachments, and DepartmentLogs.',
          'Configure CORS middleware allowing credentials from the client development origin.'
        ],
        hint: 'When configuring CORS for cookie-based authentication, you must specify `credentials: true` on both the Express cors() middleware and client fetch calls.',
        solutionSnippet: `// Server CORS config
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));`
      },
      {
        id: 'm2',
        title: 'Milestone 2: Automated SLA Escalation Cron Job',
        description: 'Write a background worker that scans for complaints in "SUBMITTED" or "IN_PROGRESS" state older than 48 hours and escalates them.',
        tasks: [
          'Create a background worker function using node-cron or setInterval.',
          'Query complaints where status != "RESOLVED" and createdAt <= 48 hours ago and isEscalated == false.',
          'Update status to "ESCALATED", set priority to "CRITICAL", and create an audit log entry in a single transaction.'
        ],
        hint: 'Background workers must handle their own error logging and database connection lifecycles without crashing the main Express HTTP server.',
        solutionSnippet: `async function checkSlaViolations() {
  const threshold = new Date(Date.now() - 48 * 60 * 60 * 1000);
  const overdueComplaints = await prisma.complaint.findMany({
    where: {
      status: { in: ['SUBMITTED', 'IN_PROGRESS'] },
      createdAt: { lte: threshold },
      isEscalated: false
    }
  });

  for (const item of overdueComplaints) {
    await prisma.$transaction([
      prisma.complaint.update({
        where: { id: item.id },
        data: { isEscalated: true, priority: 'CRITICAL' }
      }),
      prisma.auditLog.create({
        data: { complaintId: item.id, action: 'AUTO_SLA_ESCALATED' }
      })
    ]);
  }
}`
      },
      {
        id: 'm3',
        title: 'Milestone 3: End-to-End Integration Testing & Deployment',
        description: 'Implement integration test suites verifying the entire lifecycle from registration to resolution, and prepare containerized production deployment.',
        tasks: [
          'Write integration tests using Supertest verifying: Register citizen → File complaint → Login admin → Assign officer → Resolve complaint.',
          'Configure security middleware: helmet() for HTTP security headers and express-rate-limit to protect against brute-force attacks.',
          'Verify production build (`npm run build`) runs cleanly without TypeScript or linting errors.'
        ],
        hint: 'Test the actual end-to-end flow with real database transactions in test environments, rolling back changes after each test suite finishes.',
        solutionSnippet: `// Supertest lifecycle sample
test('Full grievance lifecycle', async () => {
  const citizen = await request(app).post('/api/auth/register').send(testUser);
  const complaint = await request(app).post('/api/complaints').set('Cookie', citizen.headers['set-cookie']).send(testComplaint);
  expect(complaint.status).toBe(201);
  expect(complaint.body.data.status).toBe('SUBMITTED');
});`
      }
    ],
    testingInstructions: [
      'Run the full automated test suite (`npm test`) across both frontend and backend packages.',
      'Simulate an SLA violation by creating a complaint with an artificial backdated timestamp and verify the cron job escalates it.',
      'Perform a security audit using `npm audit` and check HTTP headers using securityheaders.com.'
    ],
    commonMistakes: [
      'Failing to handle database transaction rollbacks when background jobs fail halfway through batch operations.',
      'Allowing unauthorized users to inspect grievances from other districts or citizens by forgetting ownership checks in controllers.',
      'Not configuring production environment variables (NODE_ENV=production, secure cookies, strong JWT secret).'
    ],
    extensionChallenges: [
      'Integrate Leaflet or Google Maps to render a dynamic cluster map of civic issues across city wards.',
      'Implement real-time WebSocket notifications using Socket.io when an officer updates a complaint on the field.'
    ]
  }
];
