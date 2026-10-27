/**
 * Dev-root Coding Challenge System Data Definition (Phase 5)
 * Structured, progressive coding challenges spanning HTML, CSS, and JavaScript.
 * Levels: Beginner, Basic, Intermediate, Advanced, Project-level.
 * Each challenge includes problem statement, requirements, constraints, multi-tier hints,
 * reference solution, solution walkthrough, and test criteria for automated feedback.
 */

export const CHALLENGES = [
  // ==========================================
  // HTML CHALLENGES
  // ==========================================
  {
    id: 'ch-html-01',
    slug: 'semantic-news-article',
    title: 'Semantic News Article Layout',
    category: 'html',
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    summary: 'Build a well-structured newspaper article using HTML5 semantic landmarks and heading hierarchy.',
    problemStatement: `You are building the public announcements page for a municipal civic portal. Construct an article that includes a <header> with an <h1> heading and publication date using <time>, multiple paragraphs inside an <article>, a <blockquote> with a <cite> attribute for an official mayoral statement, and an <aside> with emergency helpline numbers.`,
    learningObjectives: [
      'Utilize semantic HTML5 landmarks (<article>, <header>, <time>, <blockquote>, <aside>) appropriately.',
      'Maintain an unbroken heading hierarchy with exactly one <h1>.',
      'Provide machine-readable dates using the datetime attribute on <time>.'
    ],
    prerequisites: 'Course 3: HTML from Zero (Document Hierarchy & Modern Semantic Landmarks)',
    starterCode: `<!-- Build your semantic article below -->\n<article>\n  \n</article>`,
    requirements: [
      'Enclose the entire story inside an <article> element',
      'Include a <header> with an <h1> title and a <time datetime="..."> element',
      'Include at least two <p> paragraphs of body text',
      'Include a <blockquote> quoting an official spokesperson with a cite attribute',
      'Include an <aside> containing emergency contact information'
    ],
    constraints: 'Do not use generic <div> elements for semantic sections. Use native HTML5 landmarks.',
    expectedOutput: 'A clean semantic outline with article, header, date, quote, and sidebar landmarks inspectable in the DOM tree.',
    hints: [
      'Level 1: The <time> tag should have a datetime attribute formatted as YYYY-MM-DD (e.g., datetime="2026-10-28").',
      'Level 2: Place the <h1> and <time> together inside the <header> tag at the top of the <article>.',
      'Level 3: Wrap the quote in <blockquote> and place the <aside> either alongside or below the body paragraphs.'
    ],
    commonMistakes: [
      'Using multiple <h1> headings inside a single article.',
      'Omitting the datetime attribute on the <time> tag.',
      'Using <div class="quote"> instead of semantic <blockquote>.'
    ],
    solution: `<article>
  <header>
    <h1>Monsoon Infrastructure Advisory: Ward 14 Drainage Overhaul</h1>
    <p>Published on <time datetime="2026-10-28">October 28, 2026</time> by Municipal Public Works</p>
  </header>

  <p>Municipal engineering squads have completed the installation of high-capacity storm water culverts across Central Avenue. The upgrades are designed to mitigate seasonal waterlogging.</p>

  <blockquote cite="https://municipality.gov.in/speeches/mayor-oct26">
    <p>"Our commitment to rapid flood-relief infrastructure guarantees unhindered transit for all citizens during the upcoming monsoon season."</p>
  </blockquote>

  <p>Residents are advised that secondary asphalt resurfacing will take place during overnight shifts between 11:00 PM and 5:00 AM.</p>

  <aside>
    <h3>Emergency Control Room</h3>
    <p>For urgent waterlogging assistance, call the 24/7 disaster helpline: <strong>1800-419-0100</strong>.</p>
  </aside>
</article>`,
    solutionExplanation: 'This solution uses semantic HTML5 elements that expose clear landmark roles to assistive screen readers. The header provides metadata and publication timestamps, the blockquote cites its official origin, and the aside cleanly separates emergency information from the article narrative.',
    testCriteria: {
      type: 'html',
      requiredTags: ['article', 'header', 'h1', 'time', 'blockquote', 'aside'],
      attributes: {
        time: ['datetime']
      },
      minParagraphs: 2
    }
  },
  {
    id: 'ch-html-02',
    slug: 'accessible-registration-form',
    title: 'Accessible Citizen Grievance Form',
    category: 'html',
    difficulty: 'Basic',
    estimatedMinutes: 20,
    summary: 'Construct an accessible HTML form with explicit label associations, input constraints, and grouped radio controls.',
    problemStatement: `Build an accessible ticket registration form for citizens. It must submit data via POST to "/api/v1/tickets". It must require citizen full name (minlength 3), email address (type="email"), department selection dropdown, an urgency radio group wrapped in a <fieldset> with <legend>, and an explicit submit button.`,
    learningObjectives: [
      'Map every input to an explicit <label> using matching for and id attributes.',
      'Group mutual-exclusion radio buttons using identical name attributes.',
      'Apply native HTML5 constraint validation attributes (required, minlength).'
    ],
    prerequisites: 'Course 3: HTML from Zero (Accessible Web Forms, Inputs & Client Validation)',
    starterCode: `<form action="/api/v1/tickets" method="POST">\n  <!-- Add your accessible form inputs below -->\n\n</form>`,
    requirements: [
      'Form must have action="/api/v1/tickets" and method="POST"',
      'Full Name input with associated <label>, type="text", required, minlength="3"',
      'Email input with associated <label>, type="email", and required',
      'Department <select> dropdown with at least three <option> items',
      '<fieldset> containing a <legend> and at least two radio inputs sharing the same name',
      'An explicit <button type="submit"> element'
    ],
    constraints: 'Every input must have an associated label; placeholders alone are not acceptable.',
    expectedOutput: 'A fully accessible form that validates empty or malformed inputs natively before submission.',
    hints: [
      'Level 1: The label "for" attribute must exactly match the input "id" attribute.',
      'Level 2: All radio buttons in the urgency group must have name="urgency" so only one can be checked at a time.',
      'Level 3: Remember to set type="submit" on the submission button.'
    ],
    commonMistakes: [
      'Using mismatched for and id values on labels and inputs.',
      'Giving different name attributes to radio buttons, causing multiple radios to remain checked.',
      'Omitting the <legend> inside the <fieldset>.'
    ],
    solution: `<form action="/api/v1/tickets" method="POST">
  <div>
    <label for="full-name">Full Name *</label>
    <input type="text" id="full-name" name="fullName" required minlength="3" placeholder="e.g., Sunita Sen">
  </div>

  <div>
    <label for="email-address">Email Address *</label>
    <input type="email" id="email-address" name="email" required placeholder="sunita@example.com">
  </div>

  <div>
    <label for="dept-select">Department *</label>
    <select id="dept-select" name="department" required>
      <option value="">-- Choose Department --</option>
      <option value="roads">Public Works (Roads)</option>
      <option value="water">Water & Sanitation</option>
      <option value="electricity">Street Lighting</option>
    </select>
  </div>

  <fieldset>
    <legend>Ticket Urgency Level *</legend>
    <div>
      <input type="radio" id="urgency-normal" name="urgency" value="normal" checked>
      <label for="urgency-normal">Normal (Standard 72-hour SLA)</label>
    </div>
    <div>
      <input type="radio" id="urgency-high" name="urgency" value="high">
      <label for="urgency-high">Urgent (Safety Hazard - 24-hour SLA)</label>
    </div>
  </fieldset>

  <button type="submit">Submit Grievance Ticket</button>
</form>`,
    solutionExplanation: 'This form satisfies all WCAG Level AA accessibility requirements. Every input has a programmatic label link via for/id, the radio group is announced as a cohesive question via fieldset/legend, and native constraint validation stops invalid submissions without custom JavaScript.',
    testCriteria: {
      type: 'html',
      requiredTags: ['form', 'label', 'input', 'select', 'option', 'fieldset', 'legend', 'button'],
      attributes: {
        form: ['action', 'method'],
        input: ['id', 'name']
      }
    }
  },
  {
    id: 'ch-html-03',
    slug: 'accessible-data-table',
    title: 'Accessible Municipal Budget Data Table',
    category: 'html',
    difficulty: 'Intermediate',
    estimatedMinutes: 20,
    summary: 'Structure complex tabular data with caption, logical headers, and proper scope associations.',
    problemStatement: `Build an accessible data table detailing departmental expenditure. The table must include a <caption>, a <thead> with column headers using scope="col", a <tbody> where each row starts with a row header using scope="row", and a <tfoot> summarizing total expenditure.`,
    learningObjectives: [
      'Differentiate tabular data from visual layout containers.',
      'Provide audible titles for screen readers using <caption>.',
      'Associate data cells with headers using scope="col" and scope="row".'
    ],
    prerequisites: 'Course 3: HTML from Zero (Links, Responsive Media & Data Tables)',
    starterCode: `<table>\n  <!-- Build your accessible table here -->\n\n</table>`,
    requirements: [
      'Must contain a descriptive <caption> element as the first child',
      'Must contain <thead>, <tbody>, and <tfoot> structural sections',
      'All column header cells must use <th scope="col">',
      'Each row in <tbody> must begin with a row header cell using <th scope="row">',
      'Must contain at least two department rows and one summary row'
    ],
    constraints: 'Never use tables for page layout. Maintain clean semantic tabular structure.',
    expectedOutput: 'An accessible data table that screen readers announce row-by-row and column-by-column.',
    hints: [
      'Level 1: The <caption> must be placed immediately after the opening <table> tag.',
      'Level 2: In <tbody>, write <tr><th scope="row">Department</th><td>Cost</td></tr>.',
      'Level 3: In <tfoot>, summarize the totals with <th scope="row">Total</th><td>Total Cost</td>.'
    ],
    commonMistakes: [
      'Omitting <caption> or placing it outside the <table> tag.',
      'Using <td> instead of <th scope="col"> for column titles.',
      'Using tables to position buttons or sidebars.'
    ],
    solution: `<table>
  <caption>Municipal Capital Expenditure Breakdown (Fiscal Year 2026)</caption>
  <thead>
    <tr>
      <th scope="col">Department Name</th>
      <th scope="col">Sanctioned Budget</th>
      <th scope="col">Disbursed Funds</th>
      <th scope="col">Utilization</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Roads & Bridges</th>
      <td>Rs. 14.50 Cr</td>
      <td>Rs. 11.20 Cr</td>
      <td>77.2%</td>
    </tr>
    <tr>
      <th scope="row">Water Supply</th>
      <td>Rs. 9.80 Cr</td>
      <td>Rs. 8.10 Cr</td>
      <td>82.6%</td>
    </tr>
    <tr>
      <th scope="row">Sanitation Services</th>
      <td>Rs. 6.20 Cr</td>
      <td>Rs. 5.90 Cr</td>
      <td>95.1%</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Consolidated Total</th>
      <td>Rs. 30.50 Cr</td>
      <td>Rs. 25.20 Cr</td>
      <td>82.6%</td>
    </tr>
  </tfoot>
</table>`,
    solutionExplanation: 'This data table conforms strictly to W3C accessibility guidelines. Screen reader users can navigate cell-by-cell and hear the corresponding row header and column header announced automatically.',
    testCriteria: {
      type: 'html',
      requiredTags: ['table', 'caption', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td'],
      attributes: {
        th: ['scope']
      }
    }
  },

  // ==========================================
  // CSS CHALLENGES
  // ==========================================
  {
    id: 'ch-css-01',
    slug: 'flexbox-navigation-bar',
    title: 'Responsive Flexbox Navigation Bar',
    category: 'css',
    difficulty: 'Beginner',
    estimatedMinutes: 20,
    summary: 'Build a flexible navigation header with logo aligned left, links aligned right, and modern gap spacing.',
    problemStatement: `Style a website navigation bar using Flexbox. The .navbar container must position the .brand logo on the far left and the .nav-links on the far right using space-between. Vertically center all items, set a subtle bottom border, and style .nav-links as an inline flex container with a 1.5rem gap and no list bullets.`,
    learningObjectives: [
      'Apply display: flex and configure the Main Axis using justify-content: space-between.',
      'Align items along the Cross Axis using align-items: center.',
      'Use the gap property for clean spacing without margin resets.'
    ],
    prerequisites: 'Course 4: CSS from Zero (1D Layouts with Flexbox & 2D Layouts with CSS Grid)',
    starterCode: `/* Style the navbar and nav-links below */\n.navbar {\n  \n}\n\n.nav-links {\n  \n}`,
    requirements: [
      'Set .navbar to display: flex',
      'Distribute items using justify-content: space-between',
      'Center items vertically using align-items: center',
      'Set .nav-links to display: flex with list-style: none and gap: 1.5rem',
      'Ensure padding and border-box sizing are applied'
    ],
    constraints: 'Do not use float: left or inline-block margin hacks.',
    expectedOutput: 'A clean navigation bar with logo on left, navigation links on right, and consistent vertical centering.',
    hints: [
      'Level 1: Apply display: flex to both .navbar and .nav-links.',
      'Level 2: Use justify-content: space-between on .navbar to push the brand and links to opposite ends.',
      'Level 3: Set list-style: none, margin: 0, and padding: 0 on .nav-links.'
    ],
    commonMistakes: [
      'Forgetting list-style: none on the <ul>, leaving bullet points visible.',
      'Using margins on child links instead of the gap property on the parent flex container.',
      'Omitting align-items: center, causing uneven vertical alignment.'
    ],
    solution: `.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  box-sizing: border-box;
}

.brand {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  text-decoration: none;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: #475569;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-links a:hover {
  color: #2563eb;
}`,
    solutionExplanation: 'This showcases modern Flexbox architecture. The outer navbar flexbox aligns the brand and links along the main axis with space-between, while the inner nav-links flexbox organizes the items cleanly with gap: 1.5rem.',
    testCriteria: {
      type: 'css',
      requiredProperties: {
        '.navbar': ['display', 'justify-content', 'align-items'],
        '.nav-links': ['display', 'gap', 'list-style']
      }
    }
  },
  {
    id: 'ch-css-02',
    slug: 'auto-responsive-grid',
    title: 'Auto-Responsive Card Grid (No Media Queries)',
    category: 'css',
    difficulty: 'Basic',
    estimatedMinutes: 20,
    summary: 'Build a multi-column card grid that automatically wraps using repeat(auto-fit, minmax(280px, 1fr)).',
    problemStatement: `Design an auto-responsive card grid for municipal statistics cards. The container .stats-grid must use CSS Grid to automatically create as many columns as will fit across the viewport, with a minimum card width of 280px and expanding equally to fill remaining space. Apply a 1.5rem gap, and style the .card elements with padding, a 1px border, rounded corners, and border-box sizing.`,
    learningObjectives: [
      'Master CSS Grid 2D layout mechanics.',
      'Implement the holy-grail responsive formula: repeat(auto-fit, minmax(min, 1fr)).',
      'Eliminate brittle media query breakpoints for uniform component grids.'
    ],
    prerequisites: 'Course 4: CSS from Zero (1D Layouts with Flexbox & 2D Layouts with CSS Grid)',
    starterCode: `/* Style the auto-responsive grid and cards below */\n.stats-grid {\n  \n}\n\n.card {\n  \n}`,
    requirements: [
      'Set .stats-grid to display: grid',
      'Use grid-template-columns with repeat(auto-fit, minmax(280px, 1fr))',
      'Apply gap: 1.5rem on the grid container',
      'Style .card with background, padding: 1.5rem, border-radius, and border-box'
    ],
    constraints: 'Do not use @media queries to change column counts. Rely strictly on CSS Grid auto-fit.',
    expectedOutput: 'A grid that gracefully shifts from 1 column on phones to 2 on tablets and 4 on widescreen monitors.',
    hints: [
      'Level 1: The key property is grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)).',
      'Level 2: Use auto-fit instead of auto-fill so columns expand to fill the entire container.',
      'Level 3: Make sure .card has box-sizing: border-box so padding does not overflow the grid cell.'
    ],
    commonMistakes: [
      'Using hardcoded pixel column counts (e.g., repeat(3, 1fr)) which overflows on mobile viewports.',
      'Using auto-fill instead of auto-fit, which leaves empty phantom column gaps.',
      'Forgetting gap on the grid container.'
    ],
    solution: `.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem 0;
}

.card {
  box-sizing: border-box;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}`,
    solutionExplanation: 'The repeat(auto-fit, minmax(280px, 1fr)) formula is the most powerful responsive pattern in CSS. It computes the maximum number of columns that can physically fit without dropping below 280px, and expands fractional unit tracks to fill all available space.',
    testCriteria: {
      type: 'css',
      requiredProperties: {
        '.stats-grid': ['display', 'grid-template-columns', 'gap']
      }
    }
  },
  {
    id: 'ch-css-03',
    slug: 'css-variables-dark-theme',
    title: 'CSS Custom Properties & Dark Mode Palette',
    category: 'css',
    difficulty: 'Intermediate',
    estimatedMinutes: 25,
    summary: 'Build a design token architecture with CSS custom properties supporting light and dark themes.',
    problemStatement: `Create a design token architecture using CSS Custom Properties. In :root, define --color-bg, --color-surface, --color-text, and --color-primary. Override these variables inside a [data-theme="dark"] selector to support dark mode. Style a .panel component using only these CSS variables, and add a smooth background-color transition.`,
    learningObjectives: [
      'Declare design tokens on the :root pseudo-class.',
      'Consume variables using the var(--name) function.',
      'Override tokens under a data-attribute selector to enable seamless theme toggling.'
    ],
    prerequisites: 'Course 4: CSS from Zero (Mobile-First Responsive Design, Transforms & Keyframe Animations)',
    starterCode: `/* Define tokens on :root and override in [data-theme="dark"] */\n:root {\n  \n}\n\n[data-theme="dark"] {\n  \n}\n\n.panel {\n  \n}`,
    requirements: [
      'Define at least 4 custom properties on :root (--color-bg, --color-surface, --color-text, --color-primary)',
      'Override all 4 properties under [data-theme="dark"]',
      'Style .panel using var(--color-surface) and var(--color-text)',
      'Include transition: background-color 0.25s ease, color 0.25s ease'
    ],
    constraints: 'Do not use hardcoded hex colors inside .panel declarations; use var(--token) exclusively.',
    expectedOutput: 'A component whose background and text colors invert instantly and smoothly when data-theme changes.',
    hints: [
      'Level 1: Variables start with double dashes (e.g., --color-surface: #ffffff;).',
      'Level 2: In [data-theme="dark"], invert light surfaces to dark (#0f172a) and dark text to light (#f8fafc).',
      'Level 3: In .panel, set background-color: var(--color-surface); and color: var(--color-text);.'
    ],
    commonMistakes: [
      'Declaring custom properties without the mandatory double-dash prefix.',
      'Hardcoding colors inside component rules instead of referencing tokens with var().',
      'Forgetting transition properties for smooth theme switching.'
    ],
    solution: `:root {
  --color-bg: #f8fafc;
  --color-surface: #ffffff;
  --color-text: #1e293b;
  --color-primary: #2563eb;
  --color-border: #e2e8f0;
}

[data-theme="dark"] {
  --color-bg: #090d16;
  --color-surface: #131b2e;
  --color-text: #f1f5f9;
  --color-primary: #3b82f6;
  --color-border: #1e293b;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: system-ui, sans-serif;
  transition: background-color 0.25s ease, color 0.25s ease;
}

.panel {
  background-color: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
}`,
    solutionExplanation: 'By centralizing color values inside CSS variables on :root and overriding them on [data-theme="dark"], components automatically reflect theme switches without duplicating rules.',
    testCriteria: {
      type: 'css',
      requiredProperties: {
        '.panel': ['background-color', 'color', 'transition']
      }
    }
  },

  // ==========================================
  // JAVASCRIPT CHALLENGES
  // ==========================================
  {
    id: 'ch-js-01',
    slug: 'ticket-data-transformer',
    title: 'Civic Grievance Data Transformer',
    category: 'javascript',
    difficulty: 'Basic',
    estimatedMinutes: 20,
    summary: 'Filter, transform, and aggregate an array of citizen tickets using modern higher-order array methods.',
    problemStatement: `You are building an analytics dashboard for municipal supervisors. Write a function processTickets(tickets) that takes an array of ticket objects ({ id, ward, department, resolved, cost }). It must:
1. Filter out all resolved tickets (keep only active, unresolved tickets).
2. Format active tickets into strings: "[Ward {ward}] {department} (#{id})".
3. Calculate the total cost of these unresolved tickets.
Return an object: { activeList: string[], totalPendingCost: number }.`,
    learningObjectives: [
      'Master array filtering with .filter() using boolean conditions.',
      'Transform array structures with .map() and template literals.',
      'Aggregate numeric properties using .reduce() with an initial accumulator value.'
    ],
    prerequisites: 'Course 7: Modern JavaScript (ES6+ Syntax, Destructuring & Array Methods)',
    starterCode: `function processTickets(tickets) {
  // Return { activeList: [...], totalPendingCost: 0 }
}`,
    requirements: [
      'Must use .filter() to select tickets where resolved is false',
      'Must use .map() to return formatted strings "[Ward {ward}] {department} (#{id})"',
      'Must use .reduce() to calculate the sum of ticket costs',
      'Must return an object with keys: activeList and totalPendingCost',
      'Must handle empty input arrays gracefully by returning { activeList: [], totalPendingCost: 0 }'
    ],
    constraints: 'Do not mutate the original tickets array. Use pure functional transformations.',
    expectedOutput: '{ activeList: ["[Ward 4] Roads (#101)"], totalPendingCost: 45000 }',
    hints: [
      'Level 1: Filter with tickets.filter(t => !t.resolved).',
      'Level 2: Map the filtered list with .map(t => `[Ward ${t.ward}] ${t.department} (#${t.id})`).',
      'Level 3: Reduce the filtered list with .reduce((sum, t) => sum + (t.cost || 0), 0).'
    ],
    commonMistakes: [
      'Omitting the initial value 0 in .reduce(), causing unexpected string concatenation.',
      'Using mutable .push() inside a for loop instead of declarative .map().',
      'Filtering for t.resolved === true instead of false.'
    ],
    solution: `function processTickets(tickets) {
  if (!Array.isArray(tickets) || tickets.length === 0) {
    return { activeList: [], totalPendingCost: 0 };
  }

  const unresolved = tickets.filter(t => !t.resolved);

  const activeList = unresolved.map(t => \`[Ward \${t.ward}] \${t.department} (#\${t.id})\`);

  const totalPendingCost = unresolved.reduce((sum, t) => sum + (Number(t.cost) || 0), 0);

  return {
    activeList,
    totalPendingCost
  };
}`,
    solutionExplanation: 'This demonstrates clean declarative JavaScript. Filtering, mapping, and reducing chain seamlessly without mutating state or leaving index counters to introduce off-by-one errors.',
    testCriteria: {
      type: 'javascript',
      functionName: 'processTickets',
      testCases: [
        {
          input: [
            [
              { id: 101, ward: 4, department: 'Roads', resolved: false, cost: 25000 },
              { id: 102, ward: 7, department: 'Water', resolved: true, cost: 10000 },
              { id: 103, ward: 4, department: 'Sanitation', resolved: false, cost: 15000 }
            ]
          ],
          expected: {
            activeList: ['[Ward 4] Roads (#101)', '[Ward 4] Sanitation (#103)'],
            totalPendingCost: 40000
          }
        },
        {
          input: [[]],
          expected: { activeList: [], totalPendingCost: 0 }
        }
      ]
    }
  },
  {
    id: 'ch-js-02',
    slug: 'async-api-client-with-fallback',
    title: 'Resilient Asynchronous API Fetcher',
    category: 'javascript',
    difficulty: 'Intermediate',
    estimatedMinutes: 25,
    summary: 'Build an async/await network client that inspects response.ok, catches socket failures, and returns structured fallbacks.',
    problemStatement: `Write an async function fetchMunicipalNotice(apiUrl) that makes an HTTP GET request using fetch(). It must:
1. Await response and check response.ok. If response.ok is false, throw an Error with message \`HTTP error \${response.status}\`.
2. Parse JSON and return an object: { success: true, data }.
3. If any network or parsing error occurs, catch it and return: { success: false, error: error.message }.`,
    learningObjectives: [
      'Master async/await syntax and Promise resolution flow.',
      'Inspect response.ok to catch 404 and 500 status codes (since fetch does not reject on them).',
      'Implement robust try/catch exception interception.'
    ],
    prerequisites: 'Course 7: Modern JavaScript (Promises, Async/Await & The Event Loop)',
    starterCode: `async function fetchMunicipalNotice(apiUrl) {
  // Use try/catch with fetch() and return structured object
}`,
    requirements: [
      'Must be declared as an async function',
      'Must inspect response.ok and throw if false',
      'Must return { success: true, data } on successful fetch',
      'Must catch errors and return { success: false, error: err.message }'
    ],
    constraints: 'Do not use raw callbacks. Rely on native Promises and async/await.',
    expectedOutput: '{ success: true, data: { title: "Road Closure" } } or { success: false, error: "HTTP error 404" }',
    hints: [
      'Level 1: const response = await fetch(apiUrl);',
      'Level 2: if (!response.ok) throw new Error(`HTTP error ${response.status}`);',
      'Level 3: const data = await response.json(); return { success: true, data };'
    ],
    commonMistakes: [
      'Assuming fetch() automatically rejects on HTTP 404 or 500 errors.',
      'Forgetting to await response.json().',
      'Crashing unhandled instead of returning a structured error fallback.'
    ],
    solution: `async function fetchMunicipalNotice(apiUrl) {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(\`HTTP error \${response.status}\`);
    }

    const data = await response.json();
    return {
      success: true,
      data
    };
  } catch (err) {
    return {
      success: false,
      error: err.message || "Failed to fetch municipal notice"
    };
  }
}`,
    solutionExplanation: 'This pattern protects applications against fatal crashes. Because the Fetch API only rejects on low-level network loss, manually checking response.ok is required to handle 4xx and 5xx errors, returning a clean, predictable envelope object.',
    testCriteria: {
      type: 'javascript',
      functionName: 'fetchMunicipalNotice',
      isAsync: true,
      requiredCodePatterns: ['response.ok', 'try', 'catch']
    }
  },
  {
    id: 'ch-js-03',
    slug: 'dom-event-delegation-table',
    title: 'DOM Event Delegation Ticket Manager',
    category: 'javascript',
    difficulty: 'Intermediate',
    estimatedMinutes: 25,
    summary: 'Implement high-performance event delegation on a table container to handle action clicks on dynamic rows.',
    problemStatement: `Write a function attachTicketTableListener(tableElement, onAction) that attaches exactly ONE click event listener to the parent tableElement. When a user clicks a button with class .btn-resolve, extract the ticket ID from data-ticket-id on the button and invoke onAction('resolve', ticketId). When they click .btn-delete, invoke onAction('delete', ticketId). Clicks anywhere else on the table must be ignored.`,
    learningObjectives: [
      'Leverage Event Bubbling to manage dynamic child nodes with a single parent listener.',
      'Use event.target and element.closest() to identify target action buttons.',
      'Read HTML5 custom data attributes using the dataset API.'
    ],
    prerequisites: 'Course 6: The Browser and the DOM (Selecting Elements, Modifying Content & Events)',
    starterCode: `function attachTicketTableListener(tableElement, onAction) {
  // Attach single event listener to tableElement
}`,
    requirements: [
      'Must attach only one event listener to tableElement',
      'Must detect clicks on elements matching .btn-resolve or nested children',
      'Must detect clicks on elements matching .btn-delete or nested children',
      'Must extract data-ticket-id using e.target.closest(...).dataset.ticketId',
      'Must call onAction(actionType, ticketId)'
    ],
    constraints: 'Do not attach individual event listeners to each row or button.',
    expectedOutput: 'Clicking any dynamic action button invokes onAction with action and ticketId.',
    hints: [
      'Level 1: tableElement.addEventListener("click", (e) => { ... });',
      'Level 2: Use const resolveBtn = e.target.closest(".btn-resolve"); to handle clicks even if the user clicks an icon inside the button.',
      'Level 3: Read the id from btn.dataset.ticketId.'
    ],
    commonMistakes: [
      'Using e.target.classList.contains() which fails if the user clicks a child <span> or icon inside the button.',
      'Attaching separate listeners inside a loop over all buttons.',
      'Forgetting to verify if the button exists before reading dataset.'
    ],
    solution: `function attachTicketTableListener(tableElement, onAction) {
  if (!tableElement || typeof onAction !== 'function') return;

  tableElement.addEventListener('click', (event) => {
    const resolveBtn = event.target.closest('.btn-resolve');
    if (resolveBtn && tableElement.contains(resolveBtn)) {
      const ticketId = resolveBtn.dataset.ticketId;
      onAction('resolve', ticketId);
      return;
    }

    const deleteBtn = event.target.closest('.btn-delete');
    if (deleteBtn && tableElement.contains(deleteBtn)) {
      const ticketId = deleteBtn.dataset.ticketId;
      onAction('delete', ticketId);
      return;
    }
  });
}`,
    solutionExplanation: 'Event delegation takes advantage of event bubbling. By using closest(), clicks on icons or inner text inside the button resolve upward to the button element, extracting dataset attributes cleanly while keeping memory consumption minimal.',
    testCriteria: {
      type: 'javascript',
      functionName: 'attachTicketTableListener',
      requiredCodePatterns: ['addEventListener', 'dataset']
    }
  },
  {
    id: 'ch-js-04',
    slug: 'closure-state-store',
    title: 'Closure-Based Reactive Store',
    category: 'javascript',
    difficulty: 'Advanced',
    estimatedMinutes: 30,
    summary: 'Build an encapsulated state store with subscribers using closures and data privacy.',
    problemStatement: `Build a factory function createStore(initialState) that creates an encapsulated state container. It must return an object with:
1. getState(): Returns a shallow copy of the current state.
2. setState(updater): Updates the state (either by passing an object to merge or a function (prevState) => nextState).
3. subscribe(listener): Registers a callback function that is invoked whenever state updates, returning an unsubscribe() cleanup function.`,
    learningObjectives: [
      'Encapsulate private state using JavaScript closures.',
      'Support functional state updaters and immutable shallow copying.',
      'Implement the Observer design pattern with listener subscriptions and unsubscriptions.'
    ],
    prerequisites: 'Course 5: JavaScript Fundamentals (Functions, Parameters, Return Values & Scope)',
    starterCode: `function createStore(initialState = {}) {\n  // Build store closure\n}`,
    requirements: [
      'State must be completely private and inaccessible directly from outside',
      'getState() must return a copy of state to prevent direct external mutation',
      'setState() must support both direct object merging and updater callbacks',
      'subscribe() must return a cleanup function that removes the listener',
      'All registered listeners must be notified whenever setState() is called'
    ],
    constraints: 'Do not use ES6 classes or this keywords. Rely strictly on functional closures.',
    expectedOutput: 'A Redux-like miniature reactive store with subscription cleanup.',
    hints: [
      'Level 1: Declare let state = { ...initialState }; and const listeners = new Set(); inside the factory.',
      'Level 2: In setState, check if typeof updater === "function" ? updater(state) : { ...state, ...updater }.',
      'Level 3: In subscribe, listeners.add(listener); return () => listeners.delete(listener);.'
    ],
    commonMistakes: [
      'Returning the raw state object directly from getState(), allowing external mutation.',
      'Forgetting to call listeners after updating state.',
      'Failing to support functional updaters in setState.'
    ],
    solution: `function createStore(initialState = {}) {
  let state = { ...initialState };
  const listeners = new Set();

  return {
    getState: () => ({ ...state }),

    setState: (updater) => {
      const nextState = typeof updater === 'function'
        ? updater(state)
        : { ...state, ...updater };

      state = { ...nextState };
      listeners.forEach(listener => {
        try {
          listener(state);
        } catch (e) {
          console.error("Store listener error:", e);
        }
      });
    },

    subscribe: (listener) => {
      if (typeof listener === 'function') {
        listeners.add(listener);
      }
      return () => {
        listeners.delete(listener);
      };
    }
  };
}`,
    solutionExplanation: 'This encapsulates state inside a closure. The state variable and listeners Set exist only in the lexical environment created when createStore was called, guaranteeing data privacy while providing reactive pub/sub notifications.',
    testCriteria: {
      type: 'javascript',
      functionName: 'createStore',
      requiredCodePatterns: ['getState', 'setState', 'subscribe']
    }
  },
  {
    id: 'ch-react-01',
    slug: 'controlled-grievance-form',
    title: 'React Controlled Input Form Component',
    category: 'react',
    difficulty: 'Intermediate',
    estimatedMinutes: 25,
    summary: 'Build a fully controlled React form with live validation and error banner state.',
    problemStatement: `Build a React functional component GrievanceQuickSubmit({ onSubmit }) that manages internal state for title (string) and priority (enum: 'normal' | 'urgent'). Include an input and select dropdown. On submit, validate that title has at least 5 characters. If invalid, display an error message. If valid, call onSubmit({ title, priority }) and reset the form.`,
    learningObjectives: [
      'Implement Controlled Components with value and onChange bindings.',
      'Prevent default form submission behavior with event.preventDefault().',
      'Manage conditional error banners using local component state.'
    ],
    prerequisites: 'Course 9: React from Zero (State Management with useState & Side Effects with useEffect)',
    starterCode: `import React, { useState } from 'react';\n\nfunction GrievanceQuickSubmit({ onSubmit }) {\n  // Implement controlled state and form\n}`,
    requirements: [
      'Bind input value and onChange to state for title',
      'Bind select value and onChange to state for priority (default: "normal")',
      'Validate title length >= 5 on submission',
      'Conditionally render error message if validation fails',
      'Call onSubmit with payload and reset state on valid submission'
    ],
    constraints: 'Do not use uncontrolled refs. Maintain single source of truth in state.',
    expectedOutput: 'A reactive controlled form with real-time state synchronization and accessible validation errors.',
    hints: [
      'Level 1: Use const [title, setTitle] = useState(""); and const [priority, setPriority] = useState("normal");.',
      'Level 2: Use const [error, setError] = useState(null); to display validation warnings.',
      'Level 3: On submit, call e.preventDefault(); if (title.trim().length < 5) return setError("Title too short");.'
    ],
    commonMistakes: [
      'Forgetting e.preventDefault(), causing a full page reload.',
      'Using defaultValue instead of value on inputs.',
      'Not trimming whitespace during length validation.'
    ],
    solution: `import React, { useState } from 'react';

function GrievanceQuickSubmit({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('normal');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim().length < 5) {
      setError('Title must be at least 5 characters long.');
      return;
    }

    setError(null);
    if (typeof onSubmit === 'function') {
      onSubmit({ title: title.trim(), priority });
    }

    setTitle('');
    setPriority('normal');
  };

  return (
    <form onSubmit={handleSubmit} className="quick-submit-form">
      {error && <div className="alert-error" role="alert">{error}</div>}

      <div>
        <label htmlFor="quick-title">Issue Title</label>
        <input
          id="quick-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Brief description of the problem..."
        />
      </div>

      <div>
        <label htmlFor="quick-priority">Priority</label>
        <select
          id="quick-priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="normal">Normal</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>

      <button type="submit">Submit Quick Ticket</button>
    </form>
  );
}`,
    solutionExplanation: 'Controlled components ensure that React state is the single source of truth for all form values. The component validates user input on submit, renders accessible error messages with role="alert", and resets cleanly.',
    testCriteria: {
      type: 'javascript',
      functionName: 'GrievanceQuickSubmit',
      requiredCodePatterns: ['useState', 'onSubmit']
    }
  }
];

export const challenges = CHALLENGES;
export default CHALLENGES;

