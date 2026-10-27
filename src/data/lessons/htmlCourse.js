/**
 * Dev-root Course 3: HTML from Zero - Deep Learning Curriculum
 * Comprehensive, modular lessons covering HTML syntax, document structure,
 * modern semantic landmarks, links, media, tables, accessible forms, and a11y.
 */

export const HTML_LESSONS = {
  'html-foundations-and-syntax': {
    id: 'lesson-3-1',
    slug: 'html-foundations-and-syntax',
    courseId: 'course-3',
    courseSlug: 'html-foundations',
    courseTitle: 'Course 3: HTML from Zero',
    title: 'HTML Syntax, Tags, Elements & Document Structure',
    category: 'Frontend',
    estimatedTime: '35 min read & practice',
    interactivePlayground: 'html',
    playgroundTitle: 'HTML Boilerplate & Element Sandbox',
    playgroundCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>First Web Document</title>
  <style>
    body { font-family: system-ui, sans-serif; padding: 1.5rem; line-height: 1.6; color: #1e293b; }
    .tag-badge { background: #e0e7ff; color: #3730a3; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.85rem; font-weight: bold; }
    .card { border: 1px solid #cbd5e1; border-radius: 8px; padding: 1rem; margin-top: 1rem; }
  </style>
</head>
<body>
  <h1>Hello from HTML5!</h1>
  <p>This is a live rendered HTML document running inside an isolated sandbox.</p>
  <div class="card">
    <p>Try modifying this text or adding a new element like <span class="tag-badge">&lt;button&gt;</span> below!</p>
    <button onclick="alert('HTML interaction works!')">Click Me</button>
  </div>
</body>
</html>`,
    objectives: [
      'Understand the precise distinction between HTML tags, elements, and attributes.',
      'Construct a valid, standards-compliant HTML5 boilerplate document from memory.',
      'Understand the critical purpose of character encoding (UTF-8) and the viewport meta tag.',
      'Differentiate container elements from self-closing void elements (<br>, <img>, <meta>, <input>).',
      'Inspect living HTML trees using browser Developer Tools and understand DOM parsing.'
    ],
    sections: [
      {
        heading: 'What is HTML and What Problem Does It Solve?',
        content: `HyperText Markup Language (HTML) is the universal structural language of the World Wide Web. Every website you visit—from a simple blog post to complex applications like GitHub or the CRP India grievance portal—relies on HTML to provide structure, hierarchy, and meaning to raw content.

To understand HTML, consider the three core layers of modern web development:
1. **HTML (Structure & Semantics):** Defines *what* the content is (a heading, a paragraph, a navigation bar, a data table, an input field).
2. **CSS (Presentation & Visual Styling):** Defines *how* that content looks (colors, typography, spacing, flexbox alignment, animations).
3. **JavaScript (Behavior & Interactivity):** Defines *how* the document behaves (handling user clicks, sending asynchronous network requests, validating inputs dynamically).

Without HTML, a web browser would have no way to distinguish a crucial warning banner from a regular sentence, or a clickable button from a plain piece of text. HTML turns raw strings into a structured tree of nodes that the browser can parse, render, and expose to assistive technologies like screen readers.`
      },
      {
        heading: 'Anatomy of an HTML Element: Tags, Content, and Attributes',
        content: `In web development, the terms **tag** and **element** are often used interchangeably in casual conversation, but they have distinct technical definitions:

1. **Opening Tag (\`<p>\`):** Marks the start of an element. It consists of the element name enclosed in angle brackets.
2. **Content:** The text or child elements nested between the opening and closing tags.
3. **Closing Tag (\`</p>\`):** Marks the termination of an element. It includes a forward slash (\`/\`) before the tag name.
4. **HTML Element:** The complete package: the opening tag, the content inside it, and the closing tag combined.

\`\`\`html
<!-- An HTML element composed of opening tag, text content, and closing tag -->
<p>Civic complaints must be verified by an assigned nodal officer.</p>
\`\`\`

### Attributes: Providing Metadata and Configuration
Tags can contain **attributes**, which are key-value pairs written inside the opening tag that configure the element's behavior or provide metadata. Attributes follow the syntax \`name="value"\`:

\`\`\`html
<!-- Element with class, id, and data attributes -->
<p id="complaint-status" class="badge badge-pending" data-status="pending">
  Complaint status: Pending Verification
</p>
\`\`\`

* **Core Global Attributes:**
  * \`id\`: A unique identifier across the entire HTML document. Never duplicate an \`id\` on the same page.
  * \`class\`: A space-separated list of classification names, primarily used for CSS styling and DOM selection.
  * \`lang\`: Specifies the natural human language of the element's content (e.g., \`lang="en"\`, \`lang="hi"\`).
  * \`title\`: Advisory information usually displayed as a browser tooltip on hover.

### Void (Self-Closing) Elements
Most HTML elements wrap content and require both opening and closing tags. However, **void elements** cannot have child content or closing tags. Common void elements include:
* \`<img>\`: Embeds an external graphic.
* \`<input>\`: Renders a data entry field.
* \`<br>\`: Inserts a forced line break.
* \`<hr>\`: Represents a thematic paragraph-level break (horizontal rule).
* \`<meta>\`: Contains document-level metadata in the \`<head>\`.
* \`<link>\`: Connects external stylesheets or favicon icons.

In modern HTML5, writing void elements as \`<img>\` or \`<img />\` are both parsed identically by the browser. Closing void tags with \`</img>\` is a syntax error.`
      },
      {
        heading: 'The Standard HTML5 Boilerplate Walkthrough',
        content: `Every production web page begins with a standardized skeleton known as the HTML5 boilerplate. Let us inspect each line and understand its exact technical purpose:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CRP India — Citizen Redressal Portal</title>
  <link rel="stylesheet" href="/src/index.css">
</head>
<body>
  <header>
    <h1>Citizen Grievance Submission</h1>
  </header>
  <main>
    <p>Welcome to the verified citizen redressal system.</p>
  </main>
  <script src="/src/main.js" defer></script>
</body>
</html>
\`\`\`

### Line-by-Line Breakdown:
1. \`<!DOCTYPE html>\`: This is **not** an HTML tag; it is a document type declaration. It instructs the browser rendering engine to use modern standard standards mode rather than "quirks mode" (an emulation mode created for 1990s legacy browsers that miscalculates CSS box dimensions).
2. \`<html lang="en">\`: The root element enclosing all document content. The \`lang\` attribute informs screen readers and search engines of the page's primary language, ensuring proper speech synthesis pronunciation.
3. \`<head>\`: Contains non-visible document metadata, encoding specifications, viewport configurations, SEO directives, and links to external resources.
4. \`<meta charset="UTF-8">\`: Specifies character encoding. UTF-8 covers virtually every character, symbol, accent, and emoji across all modern human languages. Without this tag, accented characters or non-Latin scripts may appear as corrupted symbols (Mojibake).
5. \`<meta name="viewport" content="width=device-width, initial-scale=1.0">\`: **Mandatory for responsive design**. It tells mobile browsers to match the virtual viewport width to the device's physical screen width at a 1:1 scale (100%), preventing mobile browsers from shrinking desktop pages down to unreadable miniature viewports.
6. \`<title>\`: Sets the title shown on browser tabs, bookmarks, and search engine result pages.
7. \`<body>\`: Contains all human-visible content rendered in the browser window.`
      },
      {
        heading: 'Document Trees and Developer Tools Inspection',
        content: `When a web browser reads an HTML document over HTTP, it does not display the text string directly. Instead, the HTML parser parses the tags into an in-memory hierarchical tree called the **Document Object Model (DOM)**.

\`\`\`
          Document
             |
           <html>
          /      \\
      <head>     <body>
       /  \\       /   \\
    <meta> <title> <header> <main>
                     |       |
                    <h1>    <p>
\`\`\`

Every tag becomes an Element Node, and text inside becomes a Text Node.
* **Parent:** An element that directly encloses another (e.g., \`<body>\` is the parent of \`<header>\`).
* **Child:** An element enclosed within another (e.g., \`<h1>\` is a child of \`<header>\`).
* **Siblings:** Elements sharing the same parent (e.g., \`<header>\` and \`<main>\` are siblings under \`<body>\`).

To inspect this live tree in any browser:
1. Right-click on any element on the page and select **Inspect** (or press \`F12\` / \`Ctrl + Shift + I\`).
2. The **Elements** (or **Inspector**) tab displays the live DOM tree.
3. Hovering over nodes in DevTools highlights the element's physical box model on screen.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Omitting the <!DOCTYPE html> declaration.',
        whyItHappens: 'Beginners assume <html> is sufficient to start an HTML file.',
        howToFix: 'Always start line 1 with <!DOCTYPE html>. Without it, browsers fall back into "quirks mode", causing erratic CSS layout rendering and broken box-sizing.'
      },
      {
        mistake: 'Placing visible content tags like <h1> or <p> inside the <head>.',
        whyItHappens: 'Misunderstanding the boundary between metadata (<head>) and visual content (<body>).',
        howToFix: 'Only metadata (<meta>, <link>, <title>, <style>, <script>) belongs in <head>. All visible elements must reside exclusively inside <body>.'
      },
      {
        mistake: 'Writing closing tags for void elements like </input> or </img>.',
        whyItHappens: 'Assuming every single opening tag requires an explicit closing counterpart.',
        howToFix: 'Void elements cannot have children or closing tags. Write <input type="text"> or <img src="..." alt="..."> without a separate closing tag.'
      }
    ],
    guidedExercise: {
      title: 'Build a Standards-Compliant HTML5 Document from Scratch',
      difficulty: 'Beginner',
      instructions: 'Write a complete, valid HTML5 document that includes proper doctype, head metadata, responsive viewport, page title, and structured body content.',
      starterCode: `<!-- TODO: Add <!DOCTYPE html> -->
<!-- TODO: Open <html lang="en"> -->
  <!-- TODO: Add <head> containing charset, viewport meta, and title -->
  <!-- TODO: Add <body> with a main heading <h1> and a paragraph <p> -->
`,
      tasks: [
        'Include the <!DOCTYPE html> declaration on the first line.',
        'Create the root <html lang="en"> element with proper language code.',
        'Add a <head> section with <meta charset="UTF-8"> and the responsive viewport meta tag.',
        'Set a descriptive document <title>.',
        'Add a <body> containing at least one <h1> heading and one explanatory paragraph <p>.'
      ],
      hints: [
        'Start with <!DOCTYPE html> in uppercase or lowercase—HTML is case-insensitive, but uppercase is conventional.',
        'The responsive viewport meta tag requires name="viewport" and content="width=device-width, initial-scale=1.0".',
        'Ensure all opening tags that are not void elements have matching closing tags (e.g., </head>, </body>, </html>).'
      ],
      solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Civic Portal — Verification</title>
</head>
<body>
  <header>
    <h1>Welcome to Citizen Redressal</h1>
  </header>
  <main>
    <p>Submit and track civic grievances with transparent departmental accountability.</p>
  </main>
</body>
</html>`,
      solutionExplanation: 'This solution complies with modern W3C standards: the doctype forces standard mode, UTF-8 handles international characters, viewport prevents mobile scale bugs, and header/main provide accessible document hierarchy.'
    },
    quiz: [
      {
        question: 'What happens if a developer omits the <!DOCTYPE html> declaration from a modern web page?',
        options: [
          'The browser throws a fatal network error and displays a 404 page.',
          'The browser defaults to Quirks Mode, triggering legacy 1990s layout bugs and erratic CSS sizing.',
          'The browser converts all HTML into raw plaintext.',
          'JavaScript execution is permanently disabled.'
        ],
        correctIndex: 1,
        explanation: 'Without <!DOCTYPE html>, browsers activate Quirks Mode to maintain compatibility with 1990s web pages, altering the standard CSS box model and element layout calculations.'
      },
      {
        question: 'Which of the following elements is a void element that must NOT have a closing tag or child content?',
        options: [
          '<p>',
          '<section>',
          '<input>',
          '<header>'
        ],
        correctIndex: 2,
        explanation: '<input> is a void element in HTML. It cannot contain text nodes or child tags, so it never has a closing </input> tag.'
      },
      {
        question: 'Why is the <meta name="viewport" content="width=device-width, initial-scale=1.0"> tag required in modern web development?',
        options: [
          'It tells the browser how many CPU cores to allocate for rendering.',
          'It connects the web page to external satellite GPS coordinates.',
          'It configures mobile browsers to render the document at the physical screen width rather than zooming out a 980px desktop view.',
          'It compresses images on the fly to save cellular bandwidth.'
        ],
        correctIndex: 2,
        explanation: 'Without the viewport meta tag, mobile browsers assume the page is designed for desktop monitors, rendering it across a virtual 980px canvas and shrinking the entire page until text is unreadably tiny.'
      }
    ],
    takeaways: [
      'HTML provides the foundational structure and semantics for the web, separate from presentation (CSS) and behavior (JavaScript).',
      'An element consists of an opening tag, content, and closing tag; attributes provide configuration inside the opening tag.',
      'Void elements like <input>, <img>, and <meta> do not accept children and must never have closing tags.',
      'Always include <!DOCTYPE html>, <meta charset="UTF-8">, and the viewport meta tag to guarantee standard rendering and mobile responsiveness.',
      'Browsers parse HTML into a live hierarchical Document Object Model (DOM) tree inspectable via Developer Tools.'
    ],
    caseStudyReference: {
      title: 'HTML Entrypoint & Viewport Configuration in CRP India',
      description: 'Examine how the single-page application entrypoint initializes HTML5 doctype, viewport metadata, and root mounting nodes.',
      files: [
        'reference-projects/CRP-India/frontend/index.html',
        'reference-projects/CRP-India/frontend/src/main.jsx'
      ]
    }
  },

  'html-document-structure-and-semantics': {
    id: 'lesson-3-2',
    slug: 'html-document-structure-and-semantics',
    courseId: 'course-3',
    courseSlug: 'html-foundations',
    courseTitle: 'Course 3: HTML from Zero',
    title: 'Document Hierarchy & Modern Semantic Landmarks',
    category: 'Frontend',
    estimatedTime: '40 min read & practice',
    interactivePlayground: 'html',
    playgroundTitle: 'Semantic Landmarks Playground',
    playgroundCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Semantic Page Architecture</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; padding: 1rem; color: #334155; }
    header, nav, main, article, aside, footer { border: 2px dashed #94a3b8; padding: 0.75rem; margin: 0.5rem 0; border-radius: 6px; }
    header { background: #eff6ff; border-color: #3b82f6; }
    nav { background: #f0fdf4; border-color: #22c55e; }
    main { background: #f8fafc; border-color: #64748b; }
    article { background: #fefce8; border-color: #eab308; }
    footer { background: #f1f5f9; border-color: #475569; }
    .landmark-label { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: #475569; }
  </style>
</head>
<body>
  <header>
    <span class="landmark-label">&lt;header&gt;</span>
    <h1>Municipal Redressal Dashboard</h1>
    <nav>
      <span class="landmark-label">&lt;nav&gt;</span>
      <a href="#active">Active Grievances</a> | <a href="#resolved">Resolved Cases</a>
    </nav>
  </header>

  <main>
    <span class="landmark-label">&lt;main&gt;</span>
    <h2>Primary Grievance Feed</h2>
    <article>
      <span class="landmark-label">&lt;article&gt;</span>
      <h3>Water Pipeline Leakage at Sector 4</h3>
      <p>Reported 2 hours ago. Priority status: <strong>High</strong>.</p>
    </article>
  </main>

  <footer>
    <span class="landmark-label">&lt;footer&gt;</span>
    <p>&copy; 2026 Citizen Redressal Portal. All rights reserved.</p>
  </footer>
</body>
</html>`,
    objectives: [
      'Understand the critical difference between semantic HTML elements and generic containers (<div>, <span>).',
      'Master the landmark elements: <header>, <nav>, <main>, <article>, <section>, <aside>, and <footer>.',
      'Maintain an unbroken, accessible heading hierarchy (h1 through h6) across complex interfaces.',
      'Distinguish visual styling elements (<b>, <i>) from semantic text modifiers (<strong>, <em>).',
      'Understand how screen reader users utilize landmarks to jump directly to specific content regions.'
    ],
    sections: [
      {
        heading: 'Why Semantics Matter: Beyond Visual Appearance',
        content: `In the early days of web design, developers constructed entire layouts using non-semantic containers—chiefly \`<div>\` (block-level divider) and \`<span>\` (inline container), styled with CSS classes like \`<div class="header">\` or \`<div class="nav">\`.

While a visual user looking at a screen might not see a difference, this practice created massive usability barriers:
1. **Screen Readers and Assistive Technology:** Blind and visually impaired users navigating with software such as NVDA or VoiceOver rely on **landmarks**. A user can press a shortcut key (like \`D\` in NVDA) to jump straight to the \`<main>\` landmark, skipping past repeated navigation headers. A page made entirely of generic \`<div>\`s provides zero landmarks, forcing the user to listen to the entire navigation menu on every single page load.
2. **Search Engine Optimization (SEO):** Search engine web crawlers (like Googlebot) use semantic markup to understand the relative importance of content. An \`<h1>\` inside an \`<article>\` receives substantially more topical weight than a random bold paragraph.
3. **Code Maintainability:** Semantic code is self-documenting. An engineer reading \`<nav>\` immediately understands its architectural intent without having to inspect associated CSS classes.`
      },
      {
        heading: 'The Core Semantic Landmark Elements',
        content: `Modern HTML5 specifies landmark elements that define the major regions of a document:

### 1. \`<header>\`
Represents introductory content or navigational aids. Typically contains the site logo, search bar, and primary heading. A page can contain multiple \`<header>\` elements—for example, a global site header at the top of \`<body>\`, and an individual article header inside an \`<article>\`.

### 2. \`<nav>\`
Reserved specifically for major navigation links. Do not wrap every collection of links in a \`<nav>\`—use it for primary navigation menus, breadcrumb trails, pagination bars, or in-page tables of contents.

### 3. \`<main>\`
Encapsulates the dominant, central content unique to this specific document. **A document must have only one visible \`<main>\` element**. Content repeated across multiple pages—such as global navigation menus, copyright footers, and site-wide search bars—must reside outside \`<main>\`.

### 4. \`<article>\`
Represents a self-contained composition that could theoretically be distributed, syndicated, or reused independently (e.g., in an RSS feed). Examples include a blog post, a forum message, a user comment, or a specific grievance report card in the CRP India dashboard.

### 5. \`<section>\`
Represents a generic standalone thematic grouping of content, typically accompanied by its own heading. Use \`<section>\` to group related content inside an article or page when no more specific semantic element applies.

### 6. \`<aside>\`
Represents content tangentially related to the content around it, often presented as a sidebar, pull quote, callout box, or related links container.

### 7. \`<footer>\`
Represents the closing footer for its nearest sectioning parent or the entire document. Typically contains copyright notices, legal links, author contact info, and related links.`
      },
      {
        heading: 'Heading Hierarchy: Rules for <h1> Through <h6>',
        content: `HTML provides six levels of section headings: \`<h1>\` (highest importance) down to \`<h6>\` (lowest importance). Headings create the document's outline.

### Vital Rules for Headings:
* **One \`<h1>\` per Page:** As a modern web accessibility best practice, each page should contain exactly one \`<h1>\` that clearly communicates the primary subject of that specific page.
* **Never Skip Heading Levels:** Never jump from \`<h2>\` directly to \`<h4>\` simply because you desire smaller visual font size. Heading levels indicate structural hierarchy, not visual styling. Font size must always be controlled via CSS (\`font-size\`), never by choosing the wrong semantic tag.
* **Screen Reader Heading Navigation:** Screen reader users frequently navigate pages by pressing \`H\` to cycle through all headings or \`2\` to cycle through major \`<h2>\` sections. A broken heading outline disorients the user.`
      },
      {
        heading: 'Text Level Semantics: Meaning vs. Visual Appearance',
        content: `A common beginner mistake is using presentation tags instead of semantic text tags:

| Element | Visual Appearance | Semantic Meaning | Correct Use Case |
| :--- | :--- | :--- | :--- |
| \`<strong>\` | Bold | Serious importance, urgency, or warning | Emphasizing a deadline or critical security alert |
| \`<b>\` | Bold | Stylistic offset without semantic importance | Keywords in a summary, product names in a review |
| \`<em>\` | Italic | Stressed verbal emphasis that changes meaning | "I *really* meant what I said" |
| \`<i>\` | Italic | Alternate voice, tone, technical term, or foreign phrase | Scientific species names, book titles, thoughts |
| \`<blockquote>\` | Indented block | Extended quotation from an external source | Long quotations with optional \`<cite>\` attribute |
| \`<q>\` | Quotation marks | Inline short quotation | Brief quotes within a running paragraph |
| \`<code>\` | Monospace | Computer code, variable names, or filenames | Highlighting \`npm run build\` or variable names |
| \`<pre>\` | Monospace & preserves whitespace | Preformatted text block where spacing matters | Multi-line code listings and ASCII diagrams |

\`\`\`html
<!-- Semantic text example -->
<p>
  <strong>Warning:</strong> Deleting a municipal complaint is irreversible.
  Inspect the <code>complaintId</code> parameter carefully before confirming.
</p>
\`\`\``
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using generic <div> elements for everything ("div soup").',
        whyItHappens: 'It is easy to wrap every element in <div> without thinking about semantic structure.',
        howToFix: 'Replace container <div>s with appropriate landmark tags: <header>, <nav>, <main>, <article>, <section>, <aside>, and <footer>.'
      },
      {
        mistake: 'Skipping heading levels (e.g. going from <h1> directly to <h3>).',
        whyItHappens: 'Choosing heading tags based on default browser font size rather than structural hierarchy.',
        howToFix: 'Always maintain sequential heading order (h1 -> h2 -> h3). Use CSS font-size to adjust visual sizing.'
      },
      {
        mistake: 'Including multiple <main> elements on a single page.',
        whyItHappens: 'Treating <main> as a generic container for each section.',
        howToFix: 'A document must contain only one visible <main> element representing the primary subject of that document.'
      }
    ],
    guidedExercise: {
      title: 'Restructure a "Div Soup" Page into Clean Semantic HTML',
      difficulty: 'Beginner',
      instructions: 'Refactor the unsemantic HTML markup below by replacing generic <div> containers with proper semantic landmark elements and establishing an accessible heading hierarchy.',
      starterCode: `<!-- REFACTOR THIS UNSEMANTIC CODE: -->
<div class="site-header">
  <div class="logo">City Council Portal</div>
  <div class="nav-links">
    <a href="/home">Home</a>
    <a href="/reports">Reports</a>
  </div>
</div>
<div class="primary-content">
  <h4>Public Grievances</h4>
  <div class="grievance-card">
    <div class="title">Road Pothole at MG Road</div>
    <div class="desc">Reported by citizen. Urgent repair requested.</div>
  </div>
</div>
<div class="site-footer">
  <div>&copy; 2026 City Council</div>
</div>`,
      tasks: [
        'Replace the site-header <div> with a semantic <header> element.',
        'Wrap the navigation links in a semantic <nav> element.',
        'Replace the primary-content <div> with a single <main> landmark.',
        'Change the heading hierarchy so the page has a single <h1> and section <h2>.',
        'Wrap the individual grievance card in an <article> element.',
        'Replace the site-footer <div> with a semantic <footer> landmark.'
      ],
      hints: [
        'The outer site-header should be <header>, and its child links should be wrapped in <nav>.',
        'The primary content of the page belongs inside <main>.',
        'A single independent grievance entry should be encapsulated inside an <article> tag with an <h3> heading.'
      ],
      solution: `<header>
  <h1>City Council Portal</h1>
  <nav aria-label="Main Navigation">
    <a href="/home">Home</a>
    <a href="/reports">Reports</a>
  </nav>
</header>
<main>
  <h2>Public Grievances</h2>
  <article class="grievance-card">
    <h3>Road Pothole at MG Road</h3>
    <p>Reported by citizen. <strong>Urgent repair requested.</strong></p>
  </article>
</main>
<footer>
  <p>&copy; 2026 City Council. All rights reserved.</p>
</footer>`,
      solutionExplanation: 'This refactored markup provides clear landmarks (<header>, <nav>, <main>, <footer>), defines an unbroken heading hierarchy (h1 -> h2 -> h3), and gives screen readers clear navigational boundaries.'
    },
    quiz: [
      {
        question: 'Which element should be used to wrap the primary, unique content of a web page?',
        options: [
          '<section id="main">',
          '<main>',
          '<article role="content">',
          '<div class="main-body">'
        ],
        correctIndex: 1,
        explanation: '<main> is the official HTML5 landmark reserved exclusively for the dominant, unique content of the document. There should only be one visible <main> per page.'
      },
      {
        question: 'What is the primary accessibility benefit of using <nav> instead of <div class="menu">?',
        options: [
          'It makes links download twice as fast over WiFi.',
          'Screen readers identify it as a navigational landmark, allowing users to jump directly to or skip past it.',
          'It automatically adds animated dropdown menus without JavaScript.',
          'It automatically checks for broken 404 links.'
        ],
        correctIndex: 1,
        explanation: 'Screen readers expose <nav> as an interactive landmark, enabling keyboard and voice navigation users to quickly jump between primary navigation and main content.'
      },
      {
        question: 'Why should a developer use <strong> rather than <b> when highlighting an urgent security alert?',
        options: [
          '<b> is deprecated and will not render in modern web browsers.',
          '<strong> communicates serious importance and urgency to screen readers and search engines, while <b> only changes font weight visually.',
          '<strong> forces the browser to use bold red text.',
          '<b> requires an external JavaScript library to function.'
        ],
        correctIndex: 1,
        explanation: '<strong> conveys semantic importance and urgency that screen readers emphasize through speech synthesis inflection, whereas <b> only provides visual bolding without semantic weight.'
      }
    ],
    takeaways: [
      'Semantic HTML describes meaning and structure, improving accessibility for screen readers and ranking in search engines.',
      'Key landmark elements include <header>, <nav>, <main>, <article>, <section>, <aside>, and <footer>.',
      'Every web page should have a single <h1> heading followed by an unbroken, logical heading hierarchy (h2, h3).',
      'Use <strong> and <em> for semantic importance and stress emphasis; reserve <b> and <i> for purely visual or stylistic offsets.',
      'Avoid "div soup" by choosing the most specific semantic HTML tag for every piece of content.'
    ],
    caseStudyReference: {
      title: 'Semantic Layout Landmarks in CRP India',
      description: 'Study how the citizen and admin dashboards in CRP India partition views into semantic headers, sidebars, main content areas, and status cards.',
      files: [
        'reference-projects/CRP-India/frontend/src/App.jsx',
        'reference-projects/CRP-India/frontend/src/pages/CitizenDashboard.jsx'
      ]
    }
  },

  'html-links-media-and-tables': {
    id: 'lesson-3-3',
    slug: 'html-links-media-and-tables',
    courseId: 'course-3',
    courseSlug: 'html-foundations',
    courseTitle: 'Course 3: HTML from Zero',
    title: 'Links, Responsive Media & Data Tables',
    category: 'Frontend',
    estimatedTime: '35 min read & practice',
    interactivePlayground: 'html',
    playgroundTitle: 'Links, Media & Data Tables Sandbox',
    playgroundCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Media and Tables Example</title>
  <style>
    body { font-family: system-ui, sans-serif; padding: 1.5rem; line-height: 1.6; color: #1e293b; }
    table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    th, td { border: 1px solid #cbd5e1; padding: 0.6rem; text-align: left; }
    th { background: #f1f5f9; font-weight: 600; }
    caption { text-align: left; font-weight: bold; margin-bottom: 0.5rem; }
    .badge { padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.8rem; font-weight: bold; background: #fef08a; color: #854d0e; }
  </style>
</head>
<body>
  <h2>Citizen Grievance Registry</h2>
  <p>Learn more about <a href="#faq">submission guidelines</a> below.</p>

  <table>
    <caption>Recent Departmental Complaints (2026)</caption>
    <thead>
      <tr>
        <th scope="col">Case ID</th>
        <th scope="col">Department</th>
        <th scope="col">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>CRP-2026-00412</td>
        <td>Public Works</td>
        <td><span class="badge">In Progress</span></td>
      </tr>
      <tr>
        <td>CRP-2026-00413</td>
        <td>Sanitation</td>
        <td><span class="badge">Resolved</span></td>
      </tr>
    </tbody>
  </table>

  <h3 id="faq" style="margin-top: 2rem;">Submission Guidelines</h3>
  <p>Citizens can upload photographic proof (<a href="https://example.com" target="_blank" rel="noopener noreferrer">external guide (opens in new tab)</a>).</p>
</body>
</html>`,
    objectives: [
      'Master the anchor tag (<a>), href syntax, absolute vs relative URLs, and fragment identifiers (#section).',
      'Understand security and accessibility implications of opening links in new tabs (target="_blank" and rel="noopener noreferrer").',
      'Embed images with <img>, write accurate, descriptive alt text, and use <figure> with <figcaption>.',
      'Understand modern media embedding with <audio> and <video>, controls, and fallback sources.',
      'Construct accessible data tables with <table>, <caption>, <thead>, <tbody>, and proper scope attributes.'
    ],
    sections: [
      {
        heading: 'Hyperlinks: Connecting the Web with the <a> Element',
        content: `Hyperlinks are what make the World Wide Web a web. The anchor element (\`<a>\`) creates hyperlinks to other web pages, files, email addresses, telephone numbers, or locations within the current document.

### URL Types:
1. **Absolute URLs:** Point to an exact external address on the web, including protocol and domain name:
   \`\`\`html
   <a href="https://www.w3.org/WAI/fundamentals/accessibility-intro/">W3C Accessibility Intro</a>
   \`\`\`
2. **Relative URLs:** Point to a file or path relative to the current document or site root:
   \`\`\`html
   <!-- Path relative to root of website -->
   <a href="/dashboard/reports">View Grievance Reports</a>
   <!-- Path relative to current folder -->
   <a href="./faq.html">Read FAQ</a>
   \`\`\`
3. **Fragment Identifiers (In-Page Jump Links):** Link directly to an element with a matching \`id\` attribute:
   \`\`\`html
   <!-- Clicking this link scrolls the viewport directly to <section id="contact-info"> -->
   <a href="#contact-info">Jump to Contact Information</a>
   \`\`\`
4. **Action Protocols (\`mailto:\` and \`tel:\`):**
   \`\`\`html
   <a href="mailto:support@crpindia.gov.in">Email Grievance Cell</a>
   <a href="tel:+911800112233">Call Helpline: 1800-11-2233</a>
   \`\`\`

### Security & Accessibility for \`target="_blank"\`
When opening external links in a new browser tab with \`target="_blank"\`, you must follow two mandatory practices:
1. **Security (\`rel="noopener noreferrer"\`):** Without \`noopener\`, the newly opened page gains access to the originating page's \`window.opener\` object, creating a security vulnerability where malicious sites can redirect your application (reverse tabnabbing). Modern browsers default to \`rel="noopener"\`, but writing it explicitly is best practice.
2. **Accessibility Notice:** A user who cannot see the screen may be confused when their browser suddenly switches tabs. Always inform the user in the link text or via an accessible label:
   \`\`\`html
   <a href="https://w3.org" target="_blank" rel="noopener noreferrer">
     W3C Guidelines (opens in a new tab)
   </a>
   \`\`\``
      },
      {
        heading: 'Images and Media: <img>, <figure>, <audio>, and <video>',
        content: `Images and multimedia enrich web documents, but require careful authoring for performance and accessibility:

### The \`<img>\` Element and Meaningful Alternative Text (\`alt\`)
The \`<img>\` element is a void tag requiring two essential attributes: \`src\` (source path) and \`alt\` (alternative text):

\`\`\`html
<img src="/assets/images/crp-architecture.png" 
     alt="Diagram showing React frontend communicating via REST API to Express backend and MongoDB." 
     width="800" 
     height="450" 
     loading="lazy">
\`\`\`

* **The \`alt\` Attribute is Mandatory:** Screen readers speak the \`alt\` text aloud to visually impaired users. If an image fails to load (due to slow network or broken URL), the browser displays the \`alt\` text in place of the image.
* **Writing High-Quality \`alt\` Text:** Describe the content and function of the image, not the fact that it is an image. Never write \`alt="Image of diagram"\` or \`alt="photo"\`. Instead, describe *what the image conveys*. If an image is purely decorative, set \`alt=""\` (empty string) so screen readers ignore it entirely.
* **Dimensions (\`width\` and \`height\`):** Specifying width and height attributes reserves layout space before the image downloads, preventing **Cumulative Layout Shift (CLS)**, a major Core Web Vital performance metric.
* **\`loading="lazy"\`:** Instructs the browser to defer downloading images until the user scrolls near them, dramatically accelerating initial page loads.

### \`<figure>\` and \`<figcaption>\`
When an image, code snippet, or chart has an accompanying caption or editorial reference, wrap them together:
\`\`\`html
<figure>
  <img src="/images/pothole-proof.jpg" alt="Deep road depression measuring approximately 40 centimeters on Sector 4 main avenue." width="600" height="400">
  <figcaption>Figure 1: Citizen photo evidence submitted with Grievance CRP-2026-0081.</figcaption>
</figure>
\`\`\`

### Audio and Video Elements
\`\`\`html
<video controls width="640" height="360" poster="/images/video-thumb.jpg">
  <source src="/media/portal-tutorial.mp4" type="video/mp4">
  <source src="/media/portal-tutorial.webm" type="video/webm">
  <p>Your browser does not support HTML5 video. <a href="/media/portal-tutorial.mp4">Download the video directly</a>.</p>
</video>
\`\`\``
      },
      {
        heading: 'Data Tables: Structured Information vs Page Layouts',
        content: `HTML tables exist for one purpose only: **displaying tabular, two-dimensional data** (rows and columns of related data points, such as financial records, citizen grievance logs, or timetable schedules).

**Never use \`<table>\` for page layouts.** In the 1990s before CSS flexbox and grid, developers nested tables to position sidebars and headers. This destroys responsive layout adaptability, slows browser rendering, and produces an incomprehensible experience for screen reader users.

### The Anatomy of an Accessible Data Table:
\`\`\`html
<table>
  <!-- Caption acts as the accessible heading for the entire table -->
  <caption>Public Grievance Escalation Timeline</caption>
  
  <!-- Table Header: Column titles -->
  <thead>
    <tr>
      <th scope="col">Escalation Level</th>
      <th scope="col">Designated Authority</th>
      <th scope="col">Resolution Deadline</th>
    </tr>
  </thead>

  <!-- Table Body: Data rows -->
  <tbody>
    <tr>
      <th scope="row">Level 1</th>
      <td>Junior Sub-Divisional Officer</td>
      <td>48 Hours</td>
    </tr>
    <tr>
      <th scope="row">Level 2</th>
      <td>Executive Engineer</td>
      <td>7 Days</td>
    </tr>
    <tr>
      <th scope="row">Level 3</th>
      <td>District Commissioner</td>
      <td>14 Days</td>
    </tr>
  </tbody>

  <!-- Table Footer: Aggregates or notes -->
  <tfoot>
    <tr>
      <td colspan="3">Complaints unresolved after 14 days trigger automatic ombudsman review.</td>
    </tr>
  </tfoot>
</table>
\`\`\`

### Critical Accessibility Attributes:
* \`<caption>\`: Provides an accessible summary title for the table, placed immediately after the opening \`<table>\` tag.
* \`<th>\`: Identifies a header cell (rendered bold and centered by default).
* \`scope="col"\`: Informs screen readers that this header applies to all cells in that vertical column.
* \`scope="row"\`: Informs screen readers that this header applies to all cells in that horizontal row.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using generic link text like "click here" or "read more".',
        whyItHappens: 'Writing in a casual conversational manner without realizing how screen readers present links.',
        howToFix: 'Screen reader users can browse a list of links out of context. Always make link text descriptive on its own, such as "Download Grievance Filing Guidelines" instead of "click here".'
      },
      {
        mistake: 'Omitting alt text from <img> or writing alt="image".',
        whyItHappens: 'Viewing alt as optional or merely satisfying a validator.',
        howToFix: 'Write descriptive alt text explaining the content and purpose of the image. For purely decorative icons, use alt="" with aria-hidden="true".'
      },
      {
        mistake: 'Using <table> to structure general page layouts instead of CSS.',
        whyItHappens: 'Relying on outdated tutorials or legacy codebases.',
        howToFix: 'Use CSS Flexbox and Grid for page layout. Reserve <table> strictly for tabular datasets.'
      }
    ],
    guidedExercise: {
      title: 'Construct an Accessible Data Table with Links and Media',
      difficulty: 'Beginner',
      instructions: 'Create an accessible HTML table that displays a department staff directory. Include a table caption, column headers with scope attributes, row headers with scope attributes, email links, and an image with valid alt text.',
      starterCode: `<!-- TODO: Create a table displaying 2 department officers -->
<!-- Include caption, thead, tbody, th with scope="col", and th with scope="row" -->
`,
      tasks: [
        'Open a <table> element and provide a descriptive <caption>.',
        'Create a <thead> row with 3 column headers (<th scope="col">): Officer Name, Department, and Contact.',
        'Populate <tbody> with at least 2 rows of real data.',
        'Use <th scope="row"> for the first cell in each data row (the officer name).',
        'Add a working mailto: link in the Contact column.'
      ],
      hints: [
        'The <caption> tag must be the very first child element directly inside <table>.',
        'Use scope="col" on <th> tags in <thead>, and scope="row" on <th> tags in <tbody>.',
        'An email link uses the syntax <a href="mailto:name@example.com">Email Name</a>.'
      ],
      solution: `<table>
  <caption>Municipal Redressal Nodal Officers</caption>
  <thead>
    <tr>
      <th scope="col">Officer Name</th>
      <th scope="col">Department</th>
      <th scope="col">Contact</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Rajesh Sharma</th>
      <td>Public Works Department</td>
      <td><a href="mailto:r.sharma@pwd.gov.in">r.sharma@pwd.gov.in</a></td>
    </tr>
    <tr>
      <th scope="row">Anita Deshmukh</th>
      <td>Urban Sanitation</td>
      <td><a href="mailto:a.deshmukh@sanitation.gov.in">a.deshmukh@sanitation.gov.in</a></td>
    </tr>
  </tbody>
</table>`,
      solutionExplanation: 'This table satisfies all WCAG table requirements: the caption provides context, scope="col" maps column headers, scope="row" maps row headers for screen readers, and mailto links enable direct communication.'
    },
    quiz: [
      {
        question: 'When creating an external link with target="_blank", why should you include rel="noopener noreferrer"?',
        options: [
          'To prevent the new page from accessing window.opener and protect against reverse tabnabbing security attacks.',
          'To force the link to open in fullscreen video mode.',
          'To make the link load faster via server-side caching.',
          'To encrypt the URL parameter in transit.'
        ],
        correctIndex: 0,
        explanation: 'target="_blank" without noopener gives the target page potential access to the parent page via window.opener, allowing a compromised external site to navigate the original tab to a phishing clone.'
      },
      {
        question: 'What is the purpose of the scope="col" attribute on a <th> element in a data table?',
        options: [
          'It changes the text color of the column using inline CSS.',
          'It instructs screen readers that this header applies to all cells in that vertical column.',
          'It limits the column width to a maximum of 100 pixels.',
          'It merges two adjacent columns into a single cell.'
        ],
        correctIndex: 1,
        explanation: 'scope="col" explicitly connects the header to all data cells below it in that column, enabling screen readers to announce the column name when a user traverses row cells.'
      },
      {
        question: 'What is the correct way to mark up an image that is purely decorative and conveys no educational content?',
        options: [
          'Omit the alt attribute entirely.',
          'Set alt="" (an empty string).',
          'Set alt="decorative graphic".',
          'Use <img decoration="true">.'
        ],
        correctIndex: 1,
        explanation: 'Setting alt="" explicitly marks the image as decorative, instructing screen readers to skip over it silently rather than reading out the raw image file name.'
      }
    ],
    takeaways: [
      'Use <a> with href for navigation; use absolute URLs for external sites and relative URLs for internal documents.',
      'Always add rel="noopener noreferrer" and clear accessible labels to links opening with target="_blank".',
      'The alt attribute on <img> is mandatory for accessibility; describe the visual content or leave alt="" for decorative images.',
      'Reserve <table> strictly for tabular data; never use tables for general page layout.',
      'Always include <caption>, <thead>, <tbody>, and scope="col" / scope="row" attributes on data tables for screen reader navigation.'
    ],
    caseStudyReference: {
      title: 'Data Tables and Document Attachments in CRP India',
      description: 'Review the administrative complaints table in CRP India, observing how columns, priority indicators, and photo evidence attachments are displayed.',
      files: [
        'reference-projects/CRP-India/frontend/src/pages/AdminDashboard.jsx',
        'reference-projects/CRP-India/frontend/src/components/GrievanceCard.jsx'
      ]
    }
  },

  'html-forms-and-accessible-inputs': {
    id: 'lesson-3-4',
    slug: 'html-forms-and-accessible-inputs',
    courseId: 'course-3',
    courseSlug: 'html-foundations',
    courseTitle: 'Course 3: HTML from Zero',
    title: 'Accessible Web Forms, Inputs & Client Validation',
    category: 'Frontend',
    estimatedTime: '45 min read & practice',
    interactivePlayground: 'html',
    playgroundTitle: 'Interactive Web Form Sandbox',
    playgroundCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Citizen Grievance Submission Form</title>
  <style>
    body { font-family: system-ui, sans-serif; padding: 1.5rem; color: #1e293b; background: #f8fafc; }
    form { max-width: 480px; background: white; padding: 1.5rem; border-radius: 8px; border: 1px solid #cbd5e1; }
    .form-group { margin-bottom: 1.25rem; display: flex; flex-direction: column; gap: 0.4rem; }
    label { font-size: 0.9rem; font-weight: 600; color: #334155; }
    input, select, textarea { padding: 0.6rem; border: 1px solid #94a3b8; border-radius: 6px; font-size: 0.95rem; }
    input:focus, select:focus, textarea:focus { outline: 2px solid #2563eb; border-color: transparent; }
    .btn-submit { background: #2563eb; color: white; border: none; padding: 0.75rem; border-radius: 6px; font-weight: 600; cursor: pointer; }
    .btn-submit:hover { background: #1d4ed8; }
  </style>
</head>
<body>
  <h2>File a Public Grievance</h2>
  <form onsubmit="event.preventDefault(); alert('Form submitted successfully!');">
    <div class="form-group">
      <label for="citizen-name">Full Name <span style="color: red;">*</span></label>
      <input type="text" id="citizen-name" name="fullName" required placeholder="e.g. Priya Sharma">
    </div>

    <div class="form-group">
      <label for="citizen-email">Email Address <span style="color: red;">*</span></label>
      <input type="email" id="citizen-email" name="email" required placeholder="priya@example.com">
    </div>

    <div class="form-group">
      <label for="dept-select">Department <span style="color: red;">*</span></label>
      <select id="dept-select" name="department" required>
        <option value="">-- Select Concerned Department --</option>
        <option value="pwd">Public Works Department</option>
        <option value="sanitation">Sanitation & Waste</option>
        <option value="electricity">Electricity Board</option>
      </select>
    </div>

    <div class="form-group">
      <label for="complaint-details">Grievance Description</label>
      <textarea id="complaint-details" name="description" rows="4" placeholder="Detail the location and nature of the issue..."></textarea>
    </div>

    <button type="submit" class="btn-submit">Submit Grievance</button>
  </form>
</body>
</html>`,
    objectives: [
      'Understand how the <form> element packages user input via action, method, and encoding.',
      'Correctly bind every form control to a <label> using the for and id association.',
      'Master essential input types: text, email, password, number, checkbox, radio, date, and file.',
      'Implement native HTML5 client validation using required, pattern, min, max, and minlength.',
      'Group related controls accessibly using <fieldset> and <legend>.',
      'Understand why client-side validation is a UX convenience and must always be paired with backend validation.'
    ],
    sections: [
      {
        heading: 'The Role of Forms in Web Applications',
        content: `Forms are the primary interactive bridge between users and web applications. Whether logging into an account, submitting a civic grievance in CRP India, purchasing an item, or searching a database, forms collect and serialize structured user input for transmission across the network.

### The \`<form>\` Container and Its Attributes:
* **\`action\`:** The server endpoint URL where submitted form data will be processed (e.g., \`action="/api/grievances"\`). In single-page React applications, form submission is typically intercepted with JavaScript \`onSubmit\` handlers, but understanding standard HTML form transmission is critical.
* **\`method\`:** The HTTP transmission verb:
  * \`method="GET"\`: Appends form data into the URL query string (\`/search?query=pothole\`). Ideal for idempotent queries that can be bookmarked and cached. **Never use GET for passwords, sensitive data, or database modifications**.
  * \`method="POST"\`: Transmits form data inside the HTTP request body. Mandatory for submitting sensitive data (passwords, tokens) and state-mutating actions (creating records, updating profiles).
* **\`enctype\`:** Dictates how form payload bytes are encoded:
  * \`application/x-www-form-urlencoded\` (default): URL-encoded key-value pairs.
  * \`multipart/form-data\`: Mandatory whenever uploading binary files (\`<input type="file">\`).`
      },
      {
        heading: 'Accessible Labels: The for/id Contract',
        content: `The single most prevalent accessibility failure on the modern web is the **unlabeled form control**. A text box or dropdown menu with no associated \`<label>\` leaves a blind user with no idea what information is requested.

### The Explicit Association Pattern (Industry Standard):
To bind a label to an input element, match the \`<label>\`'s **\`for\`** attribute with the \`<input>\`'s **\`id\`** attribute:

\`\`\`html
<!-- CORRECT: Explicit association -->
<label for="user-password">Account Password</label>
<input type="password" id="user-password" name="password" required>
\`\`\`

### Dual Benefits of Explicit Association:
1. **Screen Reader Announcement:** When the input gains focus, the screen reader announces: *"Account Password, edit text, required"*. Without this link, it simply announces: *"edit text"*.
2. **Hit Target Expansion:** Clicking or tapping anywhere on the text of the label automatically focuses the input or toggles the checkbox/radio button. This dramatically improves usability for mobile phone users and people with motor impairments.`
      },
      {
        heading: 'Input Controls and Field Grouping',
        content: `HTML provides tailored controls for distinct data formats:

\`\`\`html
<!-- Text inputs -->
<input type="text" name="username" autocomplete="username">
<input type="email" name="email" autocomplete="email">
<input type="password" name="password">
<input type="number" name="age" min="18" max="120" step="1">

<!-- Multi-line text area -->
<textarea name="feedback" rows="5" cols="40"></textarea>

<!-- Dropdown selection -->
<select name="state" id="state-select">
  <option value="">Select State</option>
  <option value="MH">Maharashtra</option>
  <option value="DL">Delhi</option>
</select>

<!-- Checkboxes (independent options) -->
<input type="checkbox" id="terms" name="agreeTerms" value="yes">
<label for="terms">I accept the terms of service</label>

<!-- Radio buttons (mutually exclusive group sharing the same name) -->
<fieldset>
  <legend>Choose Grievance Priority Level</legend>
  <input type="radio" id="priority-low" name="priority" value="low" checked>
  <label for="priority-low">Normal</label>

  <input type="radio" id="priority-high" name="priority" value="high">
  <label for="priority-high">Urgent Emergency</label>
</fieldset>
\`\`\`

### Grouping with \`<fieldset>\` and \`<legend>\`:
When radio buttons or related checkboxes represent choices belonging to a single question, wrap them in a \`<fieldset>\` accompanied by a \`<legend>\`. When a user tabs into any radio button in the group, screen readers announce both the legend question and the specific radio option.`
      },
      {
        heading: 'HTML5 Client Validation vs Backend Security',
        content: `Modern HTML provides built-in client validation attributes that prevent invalid submissions before sending data:
* **\`required\`:** Prevents submission if the field is empty.
* **\`type="email"\` / \`type="url"\`:** Validates basic syntactical email/URL structure.
* **\`minlength\` and \`maxlength\`:** Restricts character count.
* **\`pattern="[A-Z0-9]{10}"\`:** Uses regular expressions for strict validation.

### CRITICAL SECURITY PRINCIPLE:
> **Client-side validation is a user experience enhancement, NEVER a security boundary.**

Anyone can disable client-side HTML validation in two seconds using browser DevTools or by sending raw HTTP POST requests via tools like cURL or Postman directly to your server. 

In production systems like CRP India, every input constraint verified in HTML must be rigorously re-validated on the Node.js backend using libraries like express-validator or Mongoose schema validations before touching a database.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using placeholder text instead of an explicit <label>.',
        whyItHappens: 'Placeholders look clean visually and save vertical screen space.',
        howToFix: 'Placeholders vanish as soon as the user starts typing, causing users to lose track of what the field asked for, and placeholders have poor contrast. Always provide an explicit <label for="inputId">.'
      },
      {
        mistake: 'Failing to give radio buttons in the same group the same name attribute.',
        whyItHappens: 'Assuming id or fieldset groups them automatically.',
        howToFix: 'Radio buttons must share the exact same name attribute (e.g. name="priority") to be mutually exclusive.'
      },
      {
        mistake: 'Relying exclusively on HTML validation for security.',
        whyItHappens: 'Believing the browser blocks malicious inputs before reaching the server.',
        howToFix: 'Always validate and sanitize all inputs on the server side using backend validation middleware.'
      }
    ],
    guidedExercise: {
      title: 'Build a Fully Accessible Civic Feedback Form',
      difficulty: 'Intermediate',
      instructions: 'Construct a complete citizen grievance filing form. Include text inputs, email inputs with required validation, an accessible radio button group for priority wrapped in <fieldset>, and an explicit submit button.',
      starterCode: `<!-- TODO: Build a <form action="/api/grievances" method="POST"> -->
<!-- Include citizen name, email, department dropdown, and priority radio group -->
`,
      tasks: [
        'Create a <form> with action and method="POST" attributes.',
        'Add a full name text input with an explicitly associated <label for="...">.',
        'Add an email input with required and email validation.',
        'Create a <select> dropdown with at least 3 departments.',
        'Wrap an emergency priority radio button group in a <fieldset> with a <legend>.',
        'Add an explicit <button type="submit">.'
      ],
      hints: [
        'Remember the label association: <label for="email-field"> matched with <input id="email-field">.',
        'All radio buttons in the priority group must share the same name attribute, such as name="priority".',
        'The submit button must have type="submit".'
      ],
      solution: `<form action="/api/grievances" method="POST">
  <div>
    <label for="citizen-name">Full Name <span aria-hidden="true">*</span></label>
    <input type="text" id="citizen-name" name="fullName" required minlength="3">
  </div>

  <div>
    <label for="citizen-email">Email Address <span aria-hidden="true">*</span></label>
    <input type="email" id="citizen-email" name="email" required autocomplete="email">
  </div>

  <div>
    <label for="dept-select">Department <span aria-hidden="true">*</span></label>
    <select id="dept-select" name="department" required>
      <option value="">-- Select Department --</option>
      <option value="roads">Roads & Transport</option>
      <option value="water">Water Supply</option>
      <option value="sanitation">Sanitation</option>
    </select>
  </div>

  <fieldset>
    <legend>Grievance Urgency</legend>
    <div>
      <input type="radio" id="prio-normal" name="urgency" value="normal" checked>
      <label for="prio-normal">Normal</label>
    </div>
    <div>
      <input type="radio" id="prio-urgent" name="urgency" value="urgent">
      <label for="prio-urgent">Emergency / Dangerous Hazard</label>
    </div>
  </fieldset>

  <button type="submit">Submit Grievance</button>
</form>`,
      solutionExplanation: 'This solution adheres to strict web accessibility and security practices: all controls have explicit label associations, fields are grouped with fieldset/legend, inputs specify autocomplete, and required attributes prevent accidental empty submissions.'
    },
    quiz: [
      {
        question: 'How do you explicitly link a <label> to an <input> element in HTML?',
        options: [
          'By placing both elements inside the same <div>.',
          'By matching the label\'s "for" attribute to the input\'s "id" attribute.',
          'By setting the label\'s "name" attribute equal to the input\'s "class" attribute.',
          'By adding the "label-for" attribute to the form container.'
        ],
        correctIndex: 1,
        explanation: 'The standard W3C contract binds a label to an input control when the label\'s "for" attribute matches the unique "id" of that input control.'
      },
      {
        question: 'Why should a developer never rely on HTML form validation (e.g. required, pattern) as the sole security barrier?',
        options: [
          'Because HTML validation only works on Chrome and Safari.',
          'Because any user can easily bypass client HTML validation using browser DevTools or sending direct HTTP requests.',
          'Because HTML validation slows down network ping times.',
          'Because HTML validation expires after 24 hours.'
        ],
        correctIndex: 1,
        explanation: 'Client-side HTML validation runs entirely within the user\'s local browser. Anyone can alter the DOM or bypass the browser entirely using curl, Postman, or custom scripts. Server-side validation is always mandatory.'
      },
      {
        question: 'Which elements should be used to group related radio buttons under an overarching question or prompt?',
        options: [
          '<section> and <header>',
          '<fieldset> and <legend>',
          '<group> and <title>',
          '<details> and <summary>'
        ],
        correctIndex: 1,
        explanation: '<fieldset> groups related interactive controls, and <legend> provides the accessible caption read aloud by screen readers when navigating the group.'
      }
    ],
    takeaways: [
      'Forms collect user input and transmit it via HTTP GET (query parameters) or POST (request payload).',
      'Always associate every input with a <label> by matching the label\'s for attribute to the input\'s id.',
      'Radio buttons in the same question must share the exact same name attribute to ensure mutual exclusivity.',
      'Use <fieldset> and <legend> to group related inputs like radio button sets or address blocks.',
      'Client-side HTML5 validation is essential for good user experience, but all inputs must be re-validated on the server.'
    ],
    caseStudyReference: {
      title: 'Citizen Complaint Submission Form in CRP India',
      description: 'Review the multi-step grievance submission form in CRP India, observing controlled inputs, file upload handling, and schema validation.',
      files: [
        'reference-projects/CRP-India/frontend/src/pages/SubmitGrievance.jsx',
        'reference-projects/CRP-India/backend/src/routes/grievanceRoutes.js'
      ]
    }
  },

  'html-accessibility-and-projects': {
    id: 'lesson-3-5',
    slug: 'html-accessibility-and-projects',
    courseId: 'course-3',
    courseSlug: 'html-foundations',
    courseTitle: 'Course 3: HTML from Zero',
    title: 'Web Accessibility (a11y), Screen Readers & Capstone Project',
    category: 'Frontend',
    estimatedTime: '45 min read & practice',
    interactivePlayground: 'html',
    playgroundTitle: 'Accessible Civic Profile Project Sandbox',
    playgroundCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Citizen Redressal Profile &amp; Portal</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; padding: 1.5rem; background: #f8fafc; color: #1e293b; line-height: 1.6; }
    .container { max-width: 650px; margin: 0 auto; background: white; padding: 2rem; border-radius: 8px; border: 1px solid #cbd5e1; }
    .skip-link { position: absolute; top: -40px; left: 0; background: #2563eb; color: white; padding: 8px; z-index: 100; }
    .skip-link:focus { top: 0; }
    nav ul { display: flex; gap: 1rem; list-style: none; padding: 0; }
    nav a { color: #2563eb; text-decoration: none; font-weight: 500; }
    nav a:hover, nav a:focus { text-decoration: underline; }
    .badge-status { background: #dcfce7; color: #166534; padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: bold; font-size: 0.85rem; }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <div class="container">
    <header>
      <h1>Citizen Grievance Profile</h1>
      <nav aria-label="Portal Navigation">
        <ul>
          <li><a href="#profile">Profile</a></li>
          <li><a href="#records">History</a></li>
          <li><a href="#help">Helpdesk</a></li>
        </ul>
      </nav>
    </header>

    <main id="main-content">
      <section id="profile">
        <h2>Officer Account Details</h2>
        <p>Assigned Department: <strong>Public Health &amp; Sanitation</strong></p>
        <p>Active Status: <span class="badge-status">Verified Officer</span></p>
      </section>

      <section id="records" style="margin-top: 1.5rem;">
        <h2>Recent Action Log</h2>
        <ul>
          <li>Resolved water supply blockage at Sector 9 on March 24.</li>
          <li>Inspected municipal drain cleaning report on March 22.</li>
        </ul>
      </section>
    </main>

    <footer style="margin-top: 2rem; border-top: 1px solid #e2e8f0; padding-top: 1rem; font-size: 0.85rem; color: #64748b;">
      <p>&copy; 2026 Citizen Redressal Portal. Committed to universal access.</p>
    </footer>
  </div>
</body>
</html>`,
    objectives: [
      'Understand the four core principles of web accessibility (POUR: Perceivable, Operable, Understandable, Robust).',
      'Understand the Accessibility Tree and how assistive technologies interact with native HTML.',
      'Implement keyboard navigation support, tab index control, and skip links.',
      'Understand the First Rule of ARIA: prefer semantic native HTML over custom ARIA overrides.',
      'Build a complete, semantic, accessible multi-section civic portal profile page from scratch.'
    ],
    sections: [
      {
        heading: 'Web Accessibility (a11y) and the POUR Principles',
        content: `Web accessibility (often abbreviated as **a11y**, representing the 11 letters between 'a' and 'y') means ensuring that websites are usable by everyone, including people with auditory, cognitive, neurological, physical, speech, and visual disabilities.

The internationally recognized standard for web accessibility is the **Web Content Accessibility Guidelines (WCAG)**, organized around four fundamental principles known as **POUR**:

1. **Perceivable:** Information and user interface components must be presentable to users in ways they can perceive. Content cannot be invisible to all of a user's senses (e.g., providing text alternatives for images, captions for video, and adequate color contrast).
2. **Operable:** User interface components and navigation must be operable. The interface cannot require an interaction that a user cannot perform (e.g., all functionality must be accessible via keyboard alone without requiring a mouse).
3. **Understandable:** Information and the operation of the user interface must be understandable. Content must be readable, predictable, and provide clear error messages.
4. **Robust:** Content must be robust enough that it can be interpreted reliably by a wide variety of user agents, including assistive technologies like screen readers.`
      },
      {
        heading: 'The Accessibility Tree & Native HTML vs. ARIA',
        content: `When a browser parses an HTML document, it creates two interconnected trees:
1. **The DOM Tree:** Used by JavaScript and CSS to render visual elements on screen.
2. **The Accessibility Tree:** A specialized subset derived from the DOM that exposes roles, states, names, and values directly to platform accessibility APIs (used by screen readers like NVDA, JAWS, and Apple VoiceOver).

\`\`\`
       HTML Markup: <button>Submit Complaint</button>
                           |
                      DOM Tree
                           |
                 Accessibility Tree
               Role: "button"
               Name: "Submit Complaint"
               Focusable: true
\`\`\`

### The First Rule of ARIA:
**Accessible Rich Internet Applications (ARIA)** is a W3C specification that allows developers to add semantic attributes (\`role\`, \`aria-label\`, \`aria-expanded\`) to HTML.

However, the official W3C First Rule of ARIA states:
> **"If you can use a native HTML element or attribute with the semantics and behavior you require already built-in, then do so. Do not re-create native semantics with ARIA."**

\`\`\`html
<!-- BAD: Re-inventing a button with div, fake role, and broken keyboard support -->
<div class="custom-btn" role="button" onclick="submitForm()">Submit</div>

<!-- GOOD: Native HTML element with built-in keyboard focus, Space/Enter activation, and role -->
<button type="button" onclick="submitForm()">Submit</button>
\`\`\`

Native elements (\`<button>\`, \`<a>\`, \`<input>\`, \`<select>\`) provide keyboard accessibility, focus management, and accessibility tree roles automatically without writing a single line of custom code.`
      },
      {
        heading: 'Keyboard Navigation & Skip Links',
        content: `Many users cannot operate a mouse due to motor impairments, repetitive strain injuries, or visual disabilities. These users rely entirely on the keyboard, using:
* **\`Tab\`:** Moves focus forward to the next interactive element (links, buttons, form inputs).
* **\`Shift + Tab\`:** Moves focus backward to the preceding interactive element.
* **\`Enter\` / \`Space\`:** Activates links and buttons; toggles checkboxes.
* **Arrow Keys:** Navigates between radio buttons and select dropdown items.

### The Skip Link Pattern:
A user navigating via keyboard should not have to press \`Tab\` twenty times through a massive global header and navigation menu just to reach the first article on every single page. A **skip link** provides an instant bypass:

\`\`\`html
<!-- First child inside <body> -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Styled via CSS to stay off-screen until focused by keyboard: -->
<style>
.skip-link {
  position: absolute;
  top: -100px;
  left: 0;
  background: #2563eb;
  color: white;
  padding: 8px 16px;
  z-index: 9999;
}
.skip-link:focus {
  top: 0;
}
</style>

<!-- Main content landmark with matching id -->
<main id="main-content">
  <!-- Primary page content begins here -->
</main>
\`\`\``
      },
      {
        heading: 'Capstone Project: Complete Semantic Civic Portal Page',
        content: `To synthesize everything learned across Course 3, let us analyze a complete production-grade, accessible page structure modeled after the CRP India citizen redressal interface:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Officer Dashboard — Civic Redressal Portal</title>
  <link rel="stylesheet" href="/styles/portal.css">
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <header>
    <h1>Citizen Redressal Authority</h1>
    <nav aria-label="Primary Navigation">
      <ul>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/grievances">Grievances</a></li>
        <li><a href="/officers">Nodal Officers</a></li>
      </ul>
    </nav>
  </header>

  <main id="main-content">
    <section aria-labelledby="status-overview-heading">
      <h2 id="status-overview-heading">Quarterly Performance Overview</h2>
      <p>Departmental metrics for the municipal sanitation and public works divisions.</p>
    </section>

    <section aria-labelledby="table-heading">
      <h2 id="table-heading">Active Escalations</h2>
      <table>
        <caption>Municipal Grievances Requiring Urgent Intervention</caption>
        <thead>
          <tr>
            <th scope="col">Case ID</th>
            <th scope="col">Department</th>
            <th scope="col">Severity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">CRP-2026-0091</th>
            <td>Water Works</td>
            <td>High Priority</td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 Citizen Redressal Portal. All rights reserved.</p>
  </footer>
</body>
</html>
\`\`\``
      }
    ],
    commonMistakes: [
      {
        mistake: 'Removing CSS focus outlines with outline: none without providing an alternative focus style.',
        whyItHappens: 'Designers sometimes dislike the default browser focus ring on buttons and links.',
        howToFix: 'Never remove outlines without a visible high-contrast replacement. Keyboard users rely on focus indicators to know where they are on the page.'
      },
      {
        mistake: 'Using <div onclick="..."> instead of a native <button>.',
        whyItHappens: 'Assuming styling a div is easier than styling a default button.',
        howToFix: 'Always use <button type="button">. Native buttons support keyboard focus and Enter/Spacebar activation for free.'
      },
      {
        mistake: 'Writing redundant ARIA when native HTML suffices (e.g. <header role="banner">).',
        whyItHappens: 'Over-applying ARIA tutorials without realizing modern HTML5 elements already convey those roles.',
        howToFix: 'Follow the first rule of ARIA: use native semantic HTML elements (<header>, <nav>, <main>) whenever possible.'
      }
    ],
    guidedExercise: {
      title: 'Build a Fully Accessible Personal Profile Card with Skip Link',
      difficulty: 'Intermediate',
      instructions: 'Construct a semantic, accessible profile page containing a skip link, proper landmark structure (<header>, <nav>, <main>, <section>, <footer>), descriptive alternative text, and accessible keyboard focus navigation.',
      starterCode: `<!-- TODO: Create an accessible profile document -->
<!-- Include a skip link, header with nav, main with 2 sections, and footer -->
`,
      tasks: [
        'Add a skip link at the top of the body pointing to #main-content.',
        'Use <header> and <nav aria-label="..."> with an unordered list of links.',
        'Wrap the main profile and skills sections in <main id="main-content">.',
        'Provide an image with descriptive alternative text.',
        'Add a semantic <footer> with copyright information.'
      ],
      hints: [
        'The skip link anchor must have href="#main-content" matching the id on <main>.',
        'Add aria-label="Main Navigation" to <nav> so screen readers describe the landmark clearly.',
        'Ensure the image uses alt="Descriptive text" rather than an empty or generic alt attribute.'
      ],
      solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Officer Profile — Citizen Redressal</title>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <header>
    <h1>Officer Verification Profile</h1>
    <nav aria-label="Profile navigation">
      <ul>
        <li><a href="#about">About</a></li>
        <li><a href="#cases">Assigned Cases</a></li>
      </ul>
    </nav>
  </header>

  <main id="main-content">
    <section id="about">
      <h2>Officer Details</h2>
      <img src="/officer-avatar.jpg" alt="Official identification photo of Nodal Officer Vikram Patil in municipal uniform." width="150" height="150">
      <p>Vikram Patil is the chief zonal engineer overseeing sanitation infrastructure.</p>
    </section>

    <section id="cases">
      <h2>Recent Cases</h2>
      <p>Currently supervising 12 verified municipal maintenance projects.</p>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 Municipal Administration. All rights reserved.</p>
  </footer>
</body>
</html>`,
      solutionExplanation: 'This project implements a complete accessible document: skip navigation allows keyboard users to bypass links, landmarks establish clear regions, the image has rich alternative text, and heading hierarchy is clean and logical.'
    },
    quiz: [
      {
        question: 'What is the "First Rule of ARIA"?',
        options: [
          'Always add role attributes to every HTML tag on the page.',
          'If you can use a native HTML element with the required semantics and behavior built-in, use it instead of ARIA.',
          'Never use HTML without an external ARIA polyfill.',
          'ARIA should only be used on mobile devices.'
        ],
        correctIndex: 1,
        explanation: 'The official W3C first rule of ARIA instructs developers to always prefer native semantic HTML elements (<button>, <nav>, <main>) before resorting to custom ARIA attributes.'
      },
      {
        question: 'What is the primary function of a "skip link" on an accessible web page?',
        options: [
          'It skips advertisement banners automatically.',
          'It allows keyboard and screen reader users to jump directly to the primary content without tabbing through repetitive navigation links.',
          'It skips image downloads on slow cellular connections.',
          'It speeds up page loading by skipping JavaScript compilation.'
        ],
        correctIndex: 1,
        explanation: 'A skip link (<a href="#main-content">Skip to main content</a>) provides a direct shortcut for keyboard users to bypass long, repetitive header menus and immediately access the main content.'
      },
      {
        question: 'What are the four principles of accessibility defined by the WCAG POUR framework?',
        options: [
          'Precision, Organization, Usability, Reliability',
          'Perceivable, Operable, Understandable, Robust',
          'Parsing, Output, Uniformity, Rendering',
          'Performance, Optimization, Universal, Responsive'
        ],
        correctIndex: 1,
        explanation: 'POUR stands for Perceivable (users can perceive content), Operable (users can operate UI controls), Understandable (content and navigation are clear), and Robust (accessible across assistive technologies).'
      }
    ],
    takeaways: [
      'Web accessibility (a11y) is a foundational engineering discipline built on the POUR principles (Perceivable, Operable, Understandable, Robust).',
      'The Accessibility Tree translates semantic HTML into accessibility roles, states, and names consumed by screen readers.',
      'Always prefer native semantic HTML (<button>, <select>) over custom ARIA divs with JavaScript handlers.',
      'Keyboard accessibility is essential: test that all interactive elements are focusable and operable via Tab, Enter, and Spacebar.',
      'Provide skip links and high-contrast focus indicators to give keyboard navigators a smooth experience.'
    ],
    caseStudyReference: {
      title: 'Accessibility Audits & Semantic Elements in CRP India',
      description: 'Observe how the CRP India civic grievance portal structures high-contrast cards, semantic buttons, keyboard-navigable forms, and screen reader announcements.',
      files: [
        'reference-projects/CRP-India/frontend/src/pages/CitizenDashboard.jsx',
        'reference-projects/CRP-India/frontend/src/components/GrievanceCard.jsx'
      ]
    }
  }
};
