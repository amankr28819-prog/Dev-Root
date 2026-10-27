/**
 * Dev-root Course 3: HTML from Zero - Deep Learning Curriculum (Phase 4 4x Depth Standard)
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
    estimatedTime: '45 min read & practice',
    interactivePlayground: 'html',
    playgroundTitle: 'HTML Boilerplate & Element Sandbox',
    playgroundCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>First Web Document</title>
  <style>
    body { font-family: system-ui, sans-serif; padding: 1.5rem; line-height: 1.6; color: #1e293b; background: #f8fafc; }
    .tag-badge { background: #e0e7ff; color: #3730a3; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.85rem; font-weight: bold; font-family: monospace; }
    .card { border: 1px solid #cbd5e1; border-radius: 8px; padding: 1rem; margin-top: 1rem; background: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
    button { background: #2563eb; color: #fff; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; font-weight: 600; }
    button:hover { background: #1d4ed8; }
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
      'Trace the browser parsing pipeline from raw bytes to tokens, nodes, and the live Document Object Model (DOM) tree.',
      'Inspect living HTML trees using browser Developer Tools and diagnose common nesting mistakes.'
    ],
    sections: [
      {
        heading: 'What is HTML and What Problem Does It Solve?',
        content: `HyperText Markup Language (HTML) is the foundational structural language of the World Wide Web. Every website you visit—from a personal developer blog to massive software systems like GitHub or the CRP India municipal grievance platform—relies on HTML to provide structure, hierarchy, and meaning to raw information.

### The Three Web Pillars: Separation of Concerns
To understand HTML, consider how modern web technologies divide responsibilities:
1. **HTML (Structure & Semantics):** Defines *what* the content is (a top-level heading, a paragraph, an article, a navigation landmark, an input field, a data table).
2. **CSS (Presentation & Visual Design):** Defines *how* that content looks (color palettes, typography scales, spacing, multi-column flexbox or grid layouts, transitions).
3. **JavaScript (Behavior & Interactivity):** Defines *how* the document behaves (responding to user clicks, fetching asynchronous network data, validating form constraints before submission).

\`\`\`
+-----------------------------------------------------------+
|                      THE WEB BROWSER                      |
+-----------------------------------------------------------+
| 1. HTML: Raw Semantic Content ("This is a Primary Header") |
| 2. CSS:  Visual Presentation  ("Make it Navy Blue, 32px") |
| 3. JS:   Interactive Behavior ("When clicked, show alert") |
+-----------------------------------------------------------+
\`\`\`

Without HTML, a web browser would receive only a chaotic stream of unformatted plain text. The browser would have no way to determine whether a line of text is a critical legal disclaimer, a navigation link to another page, or an action button. HTML converts unformatted character streams into a structured hierarchy of nodes that browsers can render, search engines can index, and assistive technologies (like screen readers for visually impaired users) can read aloud.`
      },
      {
        heading: 'Anatomy of an HTML Element: Tags, Content, and Attributes',
        content: `In web development discussions, developers frequently use the words "tag" and "element" interchangeably. However, their precise technical definitions are distinct:

\`\`\`
       Opening Tag                  Content                Closing Tag
     +--------------+   +-------------------------------+   +-----------+
     | <p class="lead"> |   Civic complaints are audited.   |   |   </p>    |
     +--------------+   +-------------------------------+   +-----------+
     |<- Element Name ->|                                   |<- Slash ->|
           |
      Attribute
\`\`\`

1. **Opening Tag (\`<p>\`):** Marks the starting boundary of an element. It consists of the element name enclosed in angle brackets (\`<\` and \`>\`).
2. **Content:** The text, inline formatting, or nested child elements positioned between the opening and closing tags.
3. **Closing Tag (\`</p>\`):** Marks the termination of the element. It identical to the opening tag except that it begins with a forward slash (\`/\`) immediately after the opening angle bracket.
4. **HTML Element:** The complete unit: opening tag, content, and closing tag combined.

### Attributes: Metadata and Configuration
Opening tags may include **attributes**, which are key-value pairs that configure the element's behavior, identify it for CSS and JavaScript, or provide assistive metadata. Attributes follow the syntax \`name="value"\`:

\`\`\`html
<!-- Element with id, class, and custom data attributes -->
<p id="complaint-status" class="badge badge-pending" data-priority="high">
  Complaint status: Pending Verification
</p>
\`\`\`

* **\`id="complaint-status"\`:** A globally unique identifier within the HTML document. No two elements in a valid document should share the same \`id\`.
* **\`class="badge badge-pending"\`:** A space-separated list of classification names used by CSS stylesheets and JavaScript selectors. Multiple elements across the page can share the same classes.
* **\`data-priority="high"\`:** Custom data attributes (prefixed with \`data-\`) used to attach private application data to an element without affecting its visual rendering.`
      },
      {
        heading: 'Container Elements vs. Void (Self-Closing) Elements',
        content: `HTML elements fall into two primary structural categories:

### 1. Container Elements (Pair Tags)
Container elements hold text content or other nested child elements. They **must always** have both an opening tag and an explicit closing tag. Omitting the closing tag causes the browser parser to assume subsequent elements are children, breaking the document layout.

\`\`\`html
<h1>Municipal Service Grievance Registry</h1>
<div>
  <p>Please review your ticket details below.</p>
</div>
\`\`\`

### 2. Void Elements (Self-Closing Elements)
Void elements cannot contain any child nodes or text content. Because they have no content, **they must never have a closing tag**. In HTML5, writing a closing tag for a void element is an error.

The most common void elements in modern web development include:
* \`<img>\`: Embeds an external graphic file via the \`src\` attribute.
* \`<input>\`: Renders a user input field (text box, radio button, checkbox).
* \`<meta>\`: Provides document metadata in the \`<head>\`.
* \`<link>\`: Connects external resources like stylesheets.
* \`<br>\`: Produces a line break inside a paragraph.
* \`<hr>\`: Represents a thematic break or horizontal division between paragraphs.

\`\`\`html
<!-- CORRECT HTML5 Void Elements -->
<img src="/assets/logo.png" alt="CRP India Official Emblem">
<input type="text" name="citizenName" placeholder="Enter full name">
<hr>

<!-- INCORRECT - Never use closing tags for void elements! -->
<img src="/logo.png" alt="Logo"></img> <!-- SYNTAX ERROR -->
<input type="text"></input>           <!-- SYNTAX ERROR -->
\`\`\`

*Note on XHTML Slash Syntax (\`<img />\`):* In older XHTML standards, void elements required a trailing slash (\`<img src="..." />\`). In modern HTML5, the trailing slash is optional and ignored by the browser parser. Standard HTML5 practice prefers the cleaner syntax without the slash (\`<img src="...">\`).`
      },
      {
        heading: 'The Standard HTML5 Boilerplate: Step-by-Step Walkthrough',
        content: `Every production web page begins with a standardized document template known as the **HTML5 boilerplate**. Below is the exact, standards-compliant baseline:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Official grievance redressal portal for municipal public works.">
  <title>CRP India — Citizen Redressal Portal</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Welcome to the Citizen Portal</h1>
  <p>Track public works complaints in your municipality.</p>
  <script src="app.js" defer></script>
</body>
</html>
\`\`\`

### Line-by-Line Technical Walkthrough:
* **\`<!DOCTYPE html>\` (Line 1):** The Document Type Declaration. It informs the browser's rendering engine to parse the file using modern HTML5 standards mode. If you omit this line, browsers enter **Quirks Mode**, an emulation mode designed for backward compatibility with 1990s Netscape Navigator that renders layouts inconsistently.
* **\`<html lang="en">\` (Line 2):** The root container element that encloses all other HTML nodes. The \`lang="en"\` attribute specifies that the document's primary human language is English. Screen readers rely on this attribute to select the correct pronunciation synthesizer, and search engines use it for geographic indexing.
* **\`<head>\` (Line 3):** The container for document metadata, character definitions, titles, stylesheets, and font links. Content inside \`<head>\` is **not rendered directly on the web page canvas**.
* **\`<meta charset="UTF-8">\` (Line 4):** Specifies the character encoding. UTF-8 is the universal standard that supports virtually every alphabet, symbol, and emoji across world languages without character corruption.
* **\`<meta name="viewport" content="width=device-width, initial-scale=1.0">\` (Line 5):** The viewport meta tag. Essential for mobile-first responsive web design. Without this tag, mobile smartphones assume the page was built exclusively for a 980-pixel wide desktop monitor and zoom out, making text unreadably microscopic.
* **\`<title>\` (Line 7):** Sets the text displayed on the browser tab, in browser bookmarks, and in search engine search result snippets.
* **\`<body>\` (Line 10):** The visible canvas container. Everything the user sees, clicks, or interacts with (headings, text, cards, buttons, images) must reside inside \`<body>\`.
* **\`<script src="app.js" defer>\` (Line 13):** Loads external JavaScript. The \`defer\` attribute tells the browser to download the script in parallel while continuing to parse the HTML, executing the script only after the HTML document tree is completely parsed.`
      },
      {
        heading: 'How the Browser Parses HTML: Bytes to DOM Tree',
        content: `When a web browser downloads an HTML file over the network, it executes a rigorous four-stage parsing pipeline to transform raw text into interactive pixels:

\`\`\`
  [Raw Network Bytes]  (e.g., 3C 68 74 6D 6C 3E ...)
          |
          v
  [1. Character Decoding] (UTF-8 converts bytes into characters: "<html...")
          |
          v
  [2. Tokenization] (Parser breaks text into start tags, end tags, attributes)
          |
          v
  [3. Tree Construction] (Parser builds parent-child relationships)
          |
          v
  [4. Document Object Model (DOM)] (Living in-memory JavaScript tree)
\`\`\`

### The Parsing Stages:
1. **Conversion:** The browser reads raw binary bytes from disk or the network socket and translates them into individual characters based on the specified encoding (\`UTF-8\`).
2. **Tokenization:** The tokenizer converts the character stream into discrete tokens: \`StartTag: html\`, \`StartTag: head\`, \`StartTag: title\`, \`Character: First Web Document\`, \`EndTag: title\`, \`EndTag: head\`.
3. **Node Creation:** As tokens are emitted, they are converted into Node objects containing their respective attributes and properties.
4. **DOM Tree Construction:** Because HTML tags define parent-child relationships through nesting, these nodes are assembled into a hierarchical tree data structure called the **Document Object Model (DOM)**.

Whenever you write JavaScript that queries \`document.querySelector('h1')\`, you are interacting with this living, in-memory DOM tree that the browser constructed from your HTML.`
      },
      {
        heading: 'Common Beginner Mistakes and Debugging Playbook',
        content: `### 1. Inverted or Overlapping Tag Nesting
HTML tags must close in the reverse order of how they were opened (Last In, First Out). Overlapping tags creates invalid DOM structures:

\`\`\`html
<!-- INCORRECT: Overlapping tags -->
<p>This is <strong>important text.</p></strong>

<!-- CORRECT: Properly nested inside-out -->
<p>This is <strong>important text.</strong></p>
\`\`\`

### 2. Duplicate ID Attributes
An \`id\` attribute must be unique across the entire document. Reusing the same ID breaks CSS targeting and causes \`document.getElementById()\` in JavaScript to return only the first matching element:

\`\`\`html
<!-- INCORRECT: Duplicate IDs -->
<button id="submit-btn">Save Draft</button>
<button id="submit-btn">Publish Ticket</button>

<!-- CORRECT: Unique IDs or shared classes -->
<button id="save-draft-btn" class="btn">Save Draft</button>
<button id="publish-ticket-btn" class="btn">Publish Ticket</button>
\`\`\`

### 3. Missing DOCTYPE Declaration
Omitting \`<!DOCTYPE html>\` forces the browser into Quirks Mode, leading to erratic CSS box model rendering and broken layouts across different browsers.

### Debugging in Browser Developer Tools:
To inspect living HTML on any website:
1. Right-click any element on the page and select **Inspect** (or press \`F12\` / \`Ctrl+Shift+I\` on Windows, \`Cmd+Option+I\` on macOS).
2. The **Elements** panel displays the live reconstructed DOM tree.
3. If the browser had to auto-correct broken HTML (such as an unclosed tag), you will see where the browser parser rearranged your nodes.`
      }
    ],
    exercise: {
      instruction: 'Construct a complete, valid HTML5 document for a citizen service dashboard. Include <!DOCTYPE html>, correct <head> metadata (UTF-8, viewport, title), an <h1> header, a descriptive <p>, and an action <button>.',
      starterCode: `<!-- Write your HTML5 document below -->\n`,
      hints: [
        'Start with <!DOCTYPE html> on the first line.',
        'Wrap the entire document inside <html lang="en">.',
        'Inside <head>, add <meta charset="UTF-8">, the viewport meta tag, and a <title> tag.',
        'Inside <body>, add an <h1> heading, a <p> paragraph, and a <button> element.'
      ],
      tasks: [
        'Include standard <!DOCTYPE html> declaration',
        'Add <html lang="en"> root container',
        'Include <meta charset="UTF-8"> and viewport meta tag',
        'Provide a descriptive <title> tag in <head>',
        'Add <h1> heading and <button> element in <body>'
      ],
      solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Citizen Redressal Dashboard</title>
</head>
<body>
  <h1>Municipal Grievance Tracker</h1>
  <p>Submit and track civic infrastructure complaints in real time.</p>
  <button type="button">Register New Ticket</button>
</body>
</html>`,
      solutionExplanation: 'This solution complies with all modern W3C HTML5 standards. It defines standards mode via <!DOCTYPE html>, specifies English language synthesis with lang="en", guarantees universal character encoding via UTF-8, ensures mobile responsiveness with the viewport tag, and provides semantic structure inside the visible body.'
    },
    quiz: [
      {
        question: 'What happens if a web developer omits the <!DOCTYPE html> declaration from an HTML document?',
        options: [
          'The browser throws a fatal network error and refuses to display the page.',
          'The browser enters Quirks Mode, emulating 1990s rendering engines and causing unpredictable CSS layout bugs.',
          'The HTML file is automatically converted into plain Markdown format.',
          'JavaScript execution is permanently disabled for that origin.'
        ],
        correctIndex: 1,
        explanation: '<!DOCTYPE html> instructs the browser engine to use full standards mode. Without it, modern browsers fall back to Quirks Mode to maintain backward compatibility with legacy 1990s web pages, which breaks standard box-sizing and layout calculations.'
      },
      {
        question: 'Which of the following elements is a void (self-closing) element that must never have a closing tag in HTML5?',
        options: [
          '<div>',
          '<p>',
          '<meta>',
          '<span>'
        ],
        correctIndex: 2,
        explanation: '<meta> is a void element because it cannot contain text content or child elements. In modern HTML5, writing </meta> is a syntax error.'
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
    estimatedTime: '45 min read & practice',
    interactivePlayground: 'html',
    playgroundTitle: 'Semantic Landmarks Playground',
    playgroundCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Semantic Page Architecture</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; padding: 1.5rem; color: #334155; background: #f1f5f9; }
    header, nav, main, article, aside, footer { border: 2px dashed #94a3b8; padding: 1rem; margin: 0.75rem 0; border-radius: 8px; }
    header { background: #eff6ff; border-color: #3b82f6; }
    nav { background: #f0fdf4; border-color: #22c55e; }
    main { background: #ffffff; border-color: #64748b; }
    article { background: #fefce8; border-color: #eab308; }
    aside { background: #fdf2f8; border-color: #ec4899; }
    footer { background: #f8fafc; border-color: #475569; }
    .landmark-label { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: #475569; letter-spacing: 0.05em; }
    nav a { margin-right: 1rem; color: #166534; font-weight: 600; text-decoration: none; }
  </style>
</head>
<body>
  <header>
    <span class="landmark-label">&lt;header&gt;</span>
    <h1>Municipal Redressal Dashboard</h1>
    <nav>
      <span class="landmark-label">&lt;nav&gt;</span><br>
      <a href="#overview">Overview</a>
      <a href="#tickets">Recent Tickets</a>
      <a href="#helpline">Emergency Contacts</a>
    </nav>
  </header>
  <main>
    <span class="landmark-label">&lt;main&gt;</span>
    <h2>Active Infrastructure Complaints</h2>
    <article id="tickets">
      <span class="landmark-label">&lt;article&gt;</span>
      <h3>Ticket #4092: Pothole Repair on MG Road</h3>
      <p>Reported by citizen on Oct 24, 2026. Department: Public Works.</p>
    </article>
  </main>
  <aside>
    <span class="landmark-label">&lt;aside&gt;</span>
    <h3>Nodal Officer Notice</h3>
    <p>Monsoon grievance teams are on standby 24/7 across Ward 4.</p>
  </aside>
  <footer id="helpline">
    <span class="landmark-label">&lt;footer&gt;</span>
    <p>&copy; 2026 Municipal Corporation. Emergency Helpline: 1800-419-0000.</p>
  </footer>
</body>
</html>`,
    objectives: [
      'Distinguish semantic HTML elements from un-semantic generic containers (<div> and <span>).',
      'Architect a standards-compliant web page layout using semantic landmarks (<header>, <nav>, <main>, <article>, <section>, <aside>, <footer>).',
      'Establish a mathematically rigorous heading hierarchy (<h1> through <h6>) without skipping levels.',
      'Explain how assistive screen readers navigate web pages using landmark regions.',
      'Understand the semantic difference between <strong> (importance) vs <b> (stylistic bold) and <em> (emphasis) vs <i> (stylistic italic).'
    ],
    sections: [
      {
        heading: 'The Power of Semantics: Why Meaning Matters',
        content: `In computer science and linguistics, **semantics** refers to the study of meaning. In HTML, **semantic elements** clearly describe their meaning to both the browser and the developer.

Consider these two approaches to building a website header:

\`\`\`html
<!-- NON-SEMANTIC (DIV SOUP): Has no machine-readable meaning -->
<div class="top-bar">
  <div class="site-title">CRP India Portal</div>
  <div class="links">
    <div class="link-item">Home</div>
    <div class="link-item">Track Complaint</div>
  </div>
</div>

<!-- SEMANTIC HTML5: Crystal-clear machine-readable meaning -->
<header>
  <h1>CRP India Portal</h1>
  <nav aria-label="Main Navigation">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/track">Track Complaint</a></li>
    </ul>
  </nav>
</header>
\`\`\`

Both snippets can be styled with CSS to look identical on screen. However, the non-semantic version is an accessibility disaster. A blind user relying on a screen reader cannot tell where navigation links are located, search engine crawlers cannot distinguish the main title from side content, and keyboard-only users cannot quickly jump between landmark regions.`
      },
      {
        heading: 'The Core HTML5 Semantic Landmarks',
        content: `Modern HTML5 provides dedicated landmark elements that establish the macro-architecture of a page:

\`\`\`
+-------------------------------------------------------------+
|                          <header>                           |
|  +-------------------------------------------------------+  |
|  |                        <nav>                          |  |
|  +-------------------------------------------------------+  |
+-------------------------------------------------------------+
|                                                             |
|                           <main>                            |
|  +-------------------------------------+  +---------------+ |
|  |              <section>              |  |    <aside>    | |
|  |  +-------------------------------+  |  |               | |
|  |  |           <article>           |  |  |  Related Info | |
|  |  +-------------------------------+  |  |  or Sidebar   | |
|  |  |           <article>           |  |  |               | |
|  |  +-------------------------------+  |  |               | |
|  +-------------------------------------+  +---------------+ |
+-------------------------------------------------------------+
|                          <footer>                           |
+-------------------------------------------------------------+
\`\`\`

1. **\`<header>\`:** Represents introductory content, branding, primary site logo, and search forms. Can be used for the entire page or within individual \`<article>\` components.
2. **\`<nav>\`:** Represents a major navigation section containing links to other pages or sections within the current document.
3. **\`<main>\`:** Encloses the central, dominant content unique to this document. There **must only be one visible \`<main>\` element per page**. It must not contain content repeated across pages (like global headers or footers).
4. **\`<article>\`:** A self-contained, independent composition that could theoretically be syndicated, distributed, or republished on another website (e.g., a blog post, news story, or single grievance ticket card).
5. **\`<section>\`:** A standalone thematic grouping of content, typically introduced by an explicit heading (\`<h2>\` to \`<h6>\`).
6. **\`<aside>\`:** Content tangentially related to the content around it, often rendered as sidebars, callout boxes, or supplementary statistics.
7. **\`<footer>\`:** Represents the footer of the nearest landmark or document, typically containing author credits, copyright notices, terms of service links, and helpline numbers.`
      },
      {
        heading: 'Rigorous Heading Hierarchy: <h1> Through <h6>',
        content: `Search engines and screen readers rely on HTML headings to generate an outline table of contents for the document. Headings range from \`<h1>\` (highest importance) down to \`<h6>\` (lowest importance).

### Rules for Professional Heading Architecture:
1. **Exactly One \`<h1>\` Per Page:** The \`<h1>\` represents the overarching subject of the entire document. Multiple \`<h1>\` tags confuse screen reader outlines and dilute SEO keyword weight.
2. **Never Skip Levels:** Always descend one level at a time (\`<h1>\` -> \`<h2>\` -> \`<h3>\`). Never jump from an \`<h2>\` directly to an \`<h4>\` simply because you want smaller visual font sizing! Sizing is the responsibility of CSS, not heading tags.
3. **Never Use Headings for Visual Styling:** If you want a sentence to look bold and prominent, style it with CSS rather than wrapping it in an \`<h3>\`.

\`\`\`html
<!-- CORRECT HIERARCHICAL OUTLINE -->
<h1>Municipal Citizen Redressal Portal</h1>
  <h2>Wards and Jurisdictions</h2>
    <h3>Ward 14: Central District</h3>
      <h4>Public Works Division</h4>
      <h4>Sanitation Division</h4>
    <h3>Ward 15: East Corridor</h3>
  <h2>Submit a New Grievance</h2>
\`\`\``
      },
      {
        heading: 'Semantic Inline Elements: Meaning vs. Visual Styling',
        content: `HTML distinguishes elements that communicate semantic importance from elements that exist purely for typographical styling:

| Semantic Element | Pure Styling Element | Technical Distinction |
| :--- | :--- | :--- |
| \`<strong>\` | \`<b>\` | \`<strong>\` conveys high importance or urgency (screen readers alter vocal tone). \`<b>\` applies bold weight purely for visual draw without altering importance. |
| \`<em>\` | \`<i>\` | \`<em>\` indicates stress emphasis that changes the grammatical meaning of the sentence. \`<i>\` represents alternate voice, technical terms, or idiomatic phrases without stress. |
| \`<blockquote>\` | N/A | Represents an extended quotation from an external source, often paired with a \`<cite>\` attribute. |
| \`<code>\` | N/A | Denotes inline computer code, variable names, or terminal commands. |
| \`<abbr title="...">\` | N/A | Expands an acronym or abbreviation for accessibility (e.g., \`<abbr title="Cascading Style Sheets">CSS</abbr>\`). |

\`\`\`html
<!-- Meaningful Example: Urgent Safety Warning -->
<p>
  <strong>WARNING:</strong> Live electrical wires reported fallen near Ward 3.
  Please avoid the intersection until <em>Public Works</em> engineers arrive.
</p>
\`\`\``
      },
      {
        heading: 'Common Semantic Mistakes and How to Debug Them',
        content: `### 1. "Div Soup"
Wrapping every component in nested \`<div>\` containers without semantic landmarks.
* **Fix:** Audit your page: replace wrapper \`<div>\` elements with \`<header>\`, \`<nav>\`, \`<main>\`, \`<article>\`, \`<section>\`, and \`<footer>\`.

### 2. Button vs Link Misuse
Using an \`<a>\` tag with no \`href\` for an action, or using a \`<button>\` to navigate to a new URL:
* **The Golden Rule:**
  * If it **navigates** the user to a different URL or page section: use an **\`<a>\`** anchor element.
  * If it **triggers an action** without changing URL (submitting a form, opening a modal, toggling dark mode): use a **\`<button>\`** element.

\`\`\`html
<!-- INCORRECT: Inaccessible link acting as a button -->
<a href="#" onclick="openModal()">Open Ticket Details</a>

<!-- CORRECT: Native keyboard-accessible button -->
<button type="button" onclick="openModal()">Open Ticket Details</button>
\`\`\``
      }
    ],
    exercise: {
      instruction: 'Build a fully semantic departmental announcement page. Include a <header> with an <h1> and <nav>, a <main> region containing at least one <article> with an <h2>, an <aside> for quick contacts, and a <footer>.',
      starterCode: `<!-- Write your semantic HTML layout below -->\n`,
      hints: [
        'Use <header> at the top with an <h1> and a <nav> containing navigation links.',
        'Wrap the primary content inside a <main> element.',
        'Use an <article> inside <main> to present the departmental announcement.',
        'Add an <aside> for supplemental emergency contact information.',
        'End the document with a <footer> containing copyright and helpline text.'
      ],
      tasks: [
        'Use <header> landmark with single <h1> and <nav>',
        'Wrap core announcement inside <main> and <article>',
        'Include an <aside> for secondary contact information',
        'Provide a <footer> with copyright and contact info'
      ],
      solution: `<header>
  <h1>Public Works Department</h1>
  <nav aria-label="Portal Navigation">
    <ul>
      <li><a href="#notices">Public Notices</a></li>
      <li><a href="#submit">File Report</a></li>
      <li><a href="#contact">Emergency Contacts</a></li>
    </ul>
  </nav>
</header>
<main>
  <article id="notices">
    <h2>Road Resurfacing Schedule for Ward 12</h2>
    <p>Scheduled maintenance begins Monday, Nov 3. Heavy vehicles will be rerouted.</p>
    <p>Please contact nodal supervisors for residential parking passes.</p>
  </article>
</main>
<aside id="contact">
  <h3>Ward 12 Control Room</h3>
  <p>Control Room Telephone: 011-2345-6789</p>
</aside>
<footer>
  <p>&copy; 2026 Municipal Public Works. All rights reserved.</p>
</footer>`,
      solutionExplanation: 'This structure provides complete semantic clarity. Assistive screen readers immediately recognize the navigation landmark, understand where the primary article begins, and allow users to skip directly to the main content.'
    },
    quiz: [
      {
        question: 'Which element should be used to enclose the central, unique content of a web page that does not repeat across pages?',
        options: [
          '<section>',
          '<main>',
          '<article>',
          '<div>'
        ],
        correctIndex: 1,
        explanation: 'The <main> element represents the dominant content unique to the document. A valid document must only have one visible <main> element.'
      },
      {
        question: 'Why should a developer never jump from an <h2> heading directly to an <h4> heading?',
        options: [
          'The browser engine will halt parsing and display an HTTP 500 error.',
          'It breaks the logical document outline used by screen readers and search engines to understand content hierarchy.',
          'Headings smaller than <h3> require a commercial license.',
          'CSS stylesheets cannot apply styles to out-of-order headings.'
        ],
        correctIndex: 1,
        explanation: 'Headings establish the structural outline of the document. Skipping heading levels breaks navigation for screen reader users who jump between heading levels to browse content.'
      }
    ],
    takeaways: [
      'Semantic HTML elements convey structural meaning to browsers, search engines, and assistive screen readers.',
      'Always use a single <h1> per page and maintain an unbroken heading hierarchy (h1 -> h2 -> h3).',
      'Use <main> for unique page content, <article> for self-contained units, <section> for thematic groupings, and <aside> for supplemental content.',
      'Use <a> for navigation and <button> for actions; never use empty <div onclick> or <a href="#"> for buttons.'
    ],
    caseStudyReference: {
      title: 'Semantic Layout Architecture in CRP India',
      description: 'Explore how the CRP India application structures citizen dashboards into header, sidebar navigation, main content tables, and footer landmarks.',
      files: [
        'reference-projects/CRP-India/frontend/src/App.jsx',
        'reference-projects/CRP-India/frontend/src/pages/Dashboard.jsx'
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
    estimatedTime: '45 min read & practice',
    interactivePlayground: 'html',
    playgroundTitle: 'Media & Data Table Sandbox',
    playgroundCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Tables and Media</title>
  <style>
    body { font-family: system-ui, sans-serif; padding: 1.5rem; line-height: 1.5; color: #1e293b; background: #f8fafc; }
    table { width: 100%; border-collapse: collapse; margin-top: 1rem; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-radius: 6px; overflow: hidden; }
    th, td { padding: 0.75rem 1rem; text-align: left; border-bottom: 1px solid #e2e8f0; }
    th { background: #f1f5f9; font-weight: 700; color: #475569; }
    caption { caption-side: top; text-align: left; font-weight: bold; margin-bottom: 0.5rem; color: #0f172a; font-size: 1.1rem; }
    .badge { display: inline-block; padding: 0.25rem 0.5rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; background: #e0f2fe; color: #0369a1; }
  </style>
</head>
<body>
  <h2>Departmental Infrastructure Registry</h2>
  <table>
    <caption>Recent Departmental Complaints (2026)</caption>
    <thead>
      <tr>
        <th scope="col">Case ID</th>
        <th scope="col">Department</th>
        <th scope="col">Location</th>
        <th scope="col">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>CRP-2026-00412</td>
        <td>Public Works</td>
        <td>MG Road, Ward 4</td>
        <td><span class="badge">In Progress</span></td>
      </tr>
      <tr>
        <td>CRP-2026-00413</td>
        <td>Sanitation</td>
        <td>Sector 7 Market</td>
        <td><span class="badge" style="background:#dcfce7;color:#15803d;">Resolved</span></td>
      </tr>
    </tbody>
  </table>
</body>
</html>`,
    objectives: [
      'Master the anchor tag (<a>), href syntax, absolute vs relative URLs, and fragment identifiers (#section).',
      'Understand security and accessibility implications of opening links in new tabs (target="_blank" and rel="noopener noreferrer").',
      'Embed images with <img>, write accurate, descriptive alt text, and use <figure> with <figcaption>.',
      'Prevent Cumulative Layout Shift (CLS) by declaring explicit width and height dimensions on images.',
      'Understand modern media embedding with <audio> and <video>, controls, multiple sources, and captions.',
      'Construct accessible data tables with <table>, <caption>, <thead>, <tbody>, <tfoot>, and proper scope attributes.'
    ],
    sections: [
      {
        heading: 'Hyperlinks: Connecting the Web with the <a> Element',
        content: `Hyperlinks are what connect isolated documents into the World Wide Web. The anchor element (\`<a>\`) creates hyperlinks to other web pages, files, email addresses, telephone numbers, or locations within the current document.

### URL Path Types:
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
   <!-- Path relative to parent folder -->
   <a href="../contact.html">Contact Us</a>
   \`\`\`
3. **Fragment Identifiers (In-Page Jump Links):** Link directly to an element with a matching \`id\` attribute:
   \`\`\`html
   <a href="#emergency-section">Jump to Emergency Contacts</a>
   <!-- ... Later in document ... -->
   <section id="emergency-section">
     <h2>Emergency Contacts</h2>
   </section>
   \`\`\`
4. **Special Protocols (Email & Telephone):**
   \`\`\`html
   <a href="mailto:grievance@municipality.gov.in">Email Nodal Office</a>
   <a href="tel:+9118004190000">Call Toll-Free Helpline</a>
   \`\`\`

### Security Rule: Opening Links in New Tabs (\`target="_blank"\`)
When opening external links in a new browser tab with \`target="_blank"\`, you **must** include \`rel="noopener noreferrer"\`:
\`\`\`html
<a href="https://external-resource.gov.in" target="_blank" rel="noopener noreferrer">
  Official Gazetted Notification (opens in new tab)
</a>
\`\`\`
* **Why this is critical:** Without \`noopener\`, the newly opened page gains access to the originating window's \`window.opener\` JavaScript object, allowing malicious external sites to silently redirect your page to a phishing clone (the *Tabnabbing* vulnerability).`
      },
      {
        heading: 'Images and Visual Media: <img>, <figure>, and Performance',
        content: `Images enrich user experience, but improper implementation damages website accessibility and performance.

### The <img> Anatomy:
\`\`\`html
<img src="/images/ward-repair.jpg" 
     alt="Public Works crew resurfacing asphalt on 5th Cross Road" 
     width="800" 
     height="450" 
     loading="lazy">
\`\`\`

1. **\`src\` (Source):** The path to the graphic file.
2. **\`alt\` (Alternative Text):** A concise, descriptive textual alternative for screen readers and search engines, displayed if the image fails to load.
   * *The Empty Alt Rule:* Decorative graphics (like subtle background divider waves) should use an explicit empty alt attribute (\`alt=""\`) so screen readers skip them instead of reading out the file name.
3. **Explicit \`width\` and \`height\`:** Always declare native pixel dimensions on images! This reserves the aspect ratio layout box before the graphic downloads, eliminating **Cumulative Layout Shift (CLS)**, a major Core Web Vital penalty where text jumps as images load.
4. **\`loading="lazy"\`:** Instructs the browser to defer downloading images until the user scrolls near them, saving mobile data.

### The <figure> and <figcaption> Elements
For images that include a visible caption or diagram attribution, use the semantic \`<figure>\` element:
\`\`\`html
<figure>
  <img src="/charts/complaints-by-ward.png" 
       alt="Bar chart showing Ward 4 received 312 complaints and Ward 7 received 189" 
       width="640" 
       height="360">
  <figcaption>Figure 1.1: Municipal Grievance Distribution by Ward (Q3 2026).</figcaption>
</figure>
\`\`\``
      },
      {
        heading: 'Modern Video and Audio Media',
        content: `HTML5 introduced native media players without requiring third-party plugins:

\`\`\`html
<!-- Native Video Player with Fallback Formats -->
<video controls width="720" poster="/images/video-thumbnail.jpg">
  <source src="/videos/briefing.webm" type="video/webm">
  <source src="/videos/briefing.mp4" type="video/mp4">
  <track kind="captions" src="/captions/en.vtt" srclang="en" label="English" default>
  <p>Your browser does not support HTML5 video. <a href="/videos/briefing.mp4">Download video</a>.</p>
</video>
\`\`\`
* **\`controls\`:** Displays native browser play, pause, volume, and fullscreen toggles.
* **\`poster\`:** An image displayed while the video downloads or until the user clicks play.
* **\`<track>\`:** Provides WebVTT timed subtitles, captions, or descriptions for deaf and hard-of-hearing users.`
      },
      {
        heading: 'Accessible Data Tables: <table>, <caption>, <thead>, and Scope',
        content: `Data tables must be reserved for **tabular data** (information organized into rows and columns of relationships). **Never use tables for page layouts!**

### Complete Anatomy of an Accessible Table:
\`\`\`html
<table>
  <caption>Quarterly Civic Works Budget Allocation (2026)</caption>
  <thead>
    <tr>
      <th scope="col">Department</th>
      <th scope="col">Sanctioned Budget</th>
      <th scope="col">Spent to Date</th>
      <th scope="col">Completion Rate</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Water Works</th>
      <td>Rs. 4.2 Cr</td>
      <td>Rs. 3.1 Cr</td>
      <td>73.8%</td>
    </tr>
    <tr>
      <th scope="row">Road Resurfacing</th>
      <td>Rs. 8.5 Cr</td>
      <td>Rs. 6.9 Cr</td>
      <td>81.2%</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Total</th>
      <td>Rs. 12.7 Cr</td>
      <td>Rs. 10.0 Cr</td>
      <td>78.7%</td>
    </tr>
  </tfoot>
</table>
\`\`\`

### Key Table Accessibility Attributes:
* **\`<caption>\`:** Must be the first child inside \`<table>\`. It provides an audible and visible title explaining what the table contains.
* **\`<thead>\`, \`<tbody>\`, \`<tfoot>\`:** Partition table rows into logical header, body, and summary footer segments.
* **\`<th>\` vs \`<td>\`:** Use \`<th>\` for header cells and \`<td>\` for data cells.
* **\`scope="col"\` and \`scope="row"\`:** Crucial for screen reader navigation. When a visually impaired user tabs into a data cell, the screen reader reads aloud the associated column and row headers automatically.`
      }
    ],
    exercise: {
      instruction: 'Create an accessible data table listing three municipal services, their nodal officers, emergency phone numbers, and operational status. Include a <caption>, <thead> with scope="col", and <tbody> with scope="row".',
      starterCode: `<!-- Write your accessible table below -->\n`,
      hints: [
        'Open with <table> and add a descriptive <caption> first.',
        'Use <thead> with <tr> and <th scope="col"> for each column title.',
        'Inside <tbody>, use <tr> elements where the first cell is <th scope="row"> followed by <td> cells.'
      ],
      tasks: [
        'Include a descriptive <caption> element',
        'Structure table using <thead>, <tbody> segments',
        'Add scope="col" on column headers',
        'Add scope="row" on row headers'
      ],
      solution: `<table>
  <caption>Municipal Helpline Services Directory</caption>
  <thead>
    <tr>
      <th scope="col">Service Name</th>
      <th scope="col">Nodal Officer</th>
      <th scope="col">Helpline</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Water Leakage Emergency</th>
      <td>Er. R. Sharma</td>
      <td>1800-419-0101</td>
      <td>Active 24/7</td>
    </tr>
    <tr>
      <th scope="row">Streetlight Repair</th>
      <td>Smt. P. Verma</td>
      <td>1800-419-0102</td>
      <td>Mon-Sat 8AM-8PM</td>
    </tr>
  </tbody>
</table>`,
      solutionExplanation: 'This table adheres to WCAG accessibility criteria. The caption clearly announces table contents, <thead> structures the column headers with scope="col", and each row begins with a row header using scope="row".'
    },
    quiz: [
      {
        question: 'Why is rel="noopener noreferrer" required when using target="_blank" on external hyperlinks?',
        options: [
          'It instructs the browser to open the external page inside a separate operating system process.',
          'It prevents the target page from accessing the originating window via window.opener, mitigating reverse tabnabbing security attacks.',
          'It hides the user IP address from the destination server.',
          'It accelerates page load time by compressing external CSS.'
        ],
        correctIndex: 1,
        explanation: 'Without rel="noopener", the newly opened page can manipulate the original window via window.opener.location, potentially redirecting the user to a malicious phishing site.'
      },
      {
        question: 'What is the purpose of the scope="col" attribute on a <th> element in a data table?',
        options: [
          'It sets the column width in pixels.',
          'It informs screen readers that the header cell applies to all data cells in the column below it.',
          'It applies alternating zebra background colors to the column.',
          'It allows users to sort the column alphabetically.'
        ],
        correctIndex: 1,
        explanation: 'scope="col" explicitly connects the header cell to its respective column, allowing screen readers to announce the column name as users navigate between data cells.'
      }
    ],
    takeaways: [
      'Use <a> with href for all navigation; always attach rel="noopener noreferrer" when using target="_blank".',
      'Provide accurate alt text on images; decorative images should use an explicit empty alt="".',
      'Declare explicit width and height dimensions on images to prevent Cumulative Layout Shift (CLS).',
      'Never use tables for page layout; reserve <table> strictly for tabular data with <caption>, <thead>, <tbody>, and scope attributes.'
    ],
    caseStudyReference: {
      title: 'Data Tables and Document Attachment Links in CRP India',
      description: 'Review the complaints table component in CRP India that displays ticket IDs, categories, dates, and evidence download links.',
      files: [
        'reference-projects/CRP-India/frontend/src/components/GrievanceList.jsx',
        'reference-projects/CRP-India/frontend/src/pages/CitizenReports.jsx'
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
    playgroundTitle: 'Interactive Form & Validation Sandbox',
    playgroundCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Grievance Registration Form</title>
  <style>
    body { font-family: system-ui, sans-serif; padding: 1.5rem; background: #f8fafc; color: #1e293b; }
    form { max-width: 500px; background: #fff; padding: 1.5rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .form-group { margin-bottom: 1.25rem; }
    label { display: block; font-weight: 600; margin-bottom: 0.35rem; font-size: 0.9rem; }
    input[type="text"], input[type="email"], select, textarea {
      width: 100%; padding: 0.6rem; border: 1px solid #cbd5e1; border-radius: 6px; box-sizing: border-box; font-family: inherit;
    }
    input:focus, select:focus, textarea:focus { outline: 2px solid #2563eb; border-color: #2563eb; }
    button[type="submit"] { background: #2563eb; color: #fff; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; font-weight: 600; cursor: pointer; width: 100%; }
    button[type="submit"]:hover { background: #1d4ed8; }
    .help-text { font-size: 0.8rem; color: #64748b; margin-top: 0.25rem; }
  </style>
</head>
<body>
  <h2>Lodge Civic Complaint</h2>
  <form action="/api/grievance" method="POST" onsubmit="event.preventDefault(); alert('Form submitted successfully!');">
    <div class="form-group">
      <label for="citizenName">Full Name *</label>
      <input type="text" id="citizenName" name="citizenName" required minlength="3" placeholder="e.g. Ramesh Kumar">
    </div>
    <div class="form-group">
      <label for="department">Target Department *</label>
      <select id="department" name="department" required>
        <option value="">-- Choose Department --</option>
        <option value="public-works">Public Works (Roads & Bridges)</option>
        <option value="sanitation">Sanitation & Waste</option>
        <option value="water">Water Supply & Drainage</option>
      </select>
    </div>
    <div class="form-group">
      <label for="description">Complaint Details *</label>
      <textarea id="description" name="description" rows="4" required minlength="20" placeholder="Describe the location and issue in detail..."></textarea>
      <div class="help-text">Minimum 20 characters required.</div>
    </div>
    <button type="submit">Submit Complaint</button>
  </form>
</body>
</html>`,
    objectives: [
      'Understand the client-server form submission lifecycle (HTTP GET vs POST, action, method, and encoding types).',
      'Enforce strict accessibility by connecting every input control to a dedicated <label> using the for and id attributes.',
      'Select appropriate specialized input types (email, tel, number, date, password, checkbox, radio).',
      'Implement native HTML5 client-side constraint validation (required, minlength, maxlength, min, max, pattern).',
      'Group related form controls semantically using <fieldset> and <legend> elements.'
    ],
    sections: [
      {
        heading: 'How Web Forms Work: The Client-to-Server Data Journey',
        content: `Forms are the primary mechanism through which users transmit data from their web browser to a backend server. Whether logging into an account, purchasing an item, or lodging a public infrastructure complaint in CRP India, forms structure user input into standardized key-value pairs.

### The <form> Element Attributes:
1. **\`action\`:** The destination URL on the backend server where the form data will be sent upon submission (e.g., \`action="/api/grievances"\`).
2. **\`method\`:** The HTTP protocol method used to send the payload:
   * **\`GET\`:** Appends form inputs as a query string in the browser's URL bar (\`/search?query=pothole&ward=4\`). Used exclusively for safe, idempotent read-only queries (like search filters). **Never use GET for passwords, payments, or state mutations!**
   * **\`POST\`:** Transmits form inputs inside the HTTP request body. Used for creating or modifying data (user registration, ticket creation, password changes).
3. **\`enctype\`:** The MIME encoding format:
   * \`application/x-www-form-urlencoded\` (default): Form keys and values are URL-encoded.
   * \`multipart/form-data\`: Mandatory whenever the form contains file uploads (\`<input type="file">\`).`
      },
      {
        heading: 'The Non-Negotiable Accessibility Rule: <label> and <input>',
        content: `Every interactive input control in a web application **must** have an associated label. A placeholder is **never** a replacement for a label!

### Explicit Label Association via \`for\` and \`id\`:
\`\`\`html
<!-- CORRECT: Explicit connection using for and id -->
<label for="user-email">Registered Email Address</label>
<input type="email" id="user-email" name="userEmail" required>
\`\`\`

### Why This is Mandatory:
1. **Screen Readers:** When a blind user tabs into the input field, the screen reader announces: *"Registered Email Address, edit text, required"*. Without the label, it announces only: *"Edit text, blank"*, leaving the user with no idea what information is requested.
2. **Expanded Click Targets:** Clicking or tapping the text inside \`<label>\` automatically places focus inside the connected input box. This drastically improves usability for mobile phone users with smaller touchscreens.`
      },
      {
        heading: 'The Modern HTML5 Input Type Spectrum',
        content: `Using the correct \`type\` attribute on \`<input>\` triggers customized mobile software keyboards, automatic browser formatting, and native input constraints:

| Input Type | Mobile Keyboard Behavior | Native Built-in Validation |
| :--- | :--- | :--- |
| \`type="text"\` | Standard alphabetical keyboard | General plain text |
| \`type="email"\` | Displays \`@\` and \`.com\` keys | Validates valid email address format |
| \`type="tel"\` | Displays 0–9 telephone dialpad | Optimizes phone entry (use with \`pattern\`) |
| \`type="number"\` | Displays numeric keypad with decimal | Restricts input to numbers (supports \`min\`, \`max\`, \`step\`) |
| \`type="password"\` | Masks entered characters with dots | Secure credential entry |
| \`type="date"\` | Opens native date picker modal | Validates date formatting |
| \`type="checkbox"\` | Checkbox toggle | Binary or multi-select options |
| \`type="radio"\` | Circular radio button | Single selection from a grouped set |

### Radio Buttons: Grouping by Shared \`name\`
To ensure only one option can be selected from a set of radio buttons, all buttons in the group **must share the exact same \`name\` attribute**:
\`\`\`html
<fieldset>
  <legend>Select Grievance Urgency Level</legend>
  <input type="radio" id="urgency-low" name="urgency" value="low" checked>
  <label for="urgency-low">Low (Standard SLA)</label>

  <input type="radio" id="urgency-urgent" name="urgency" value="urgent">
  <label for="urgency-urgent">Urgent (Safety Hazard)</label>
</fieldset>
\`\`\`
* **\`<fieldset>\` and \`<legend>\`:** Semantically groups related inputs. The \`<legend>\` acts as the overarching question announced by screen readers for every radio option.`
      },
      {
        heading: 'Native Client-Side Constraint Validation',
        content: `HTML5 provides powerful, declarative validation attributes that prevent invalid form submission before any JavaScript executes:

* **\`required\`:** Prevents submission if the field is empty.
* **\`minlength\` and \`maxlength\`:** Enforces string character length constraints.
* **\`min\`, \`max\`, and \`step\`:** Enforces numeric or date boundaries.
* **\`pattern\`:** Enforces a Regular Expression (RegEx) matching rule.

\`\`\`html
<!-- Indian Aadhaar / Nodal Officer ID Validation Example -->
<label for="officer-id">Nodal Officer Code (Format: NOD-1234)</label>
<input type="text" 
       id="officer-id" 
       name="officerId" 
       required 
       pattern="^NOD-[0-9]{4}$" 
       title="Officer Code must start with 'NOD-' followed by 4 digits">
\`\`\`

### Golden Rule of Web Security:
**Client-side HTML validation is a user experience convenience, NOT a security measure.** Anyone can bypass browser HTML validation using curl, Postman, or by disabling JavaScript in Developer Tools. **All input constraints must be rigorously re-validated on the backend server!**`
      }
    ],
    exercise: {
      instruction: 'Create an accessible civic ticket submission form containing: citizen email (type="email", required), category select dropdown, urgency radio group wrapped in a <fieldset> with <legend>, and a submit button.',
      starterCode: `<!-- Write your accessible form below -->\n`,
      hints: [
        'Wrap the inputs in a <form action="/submit" method="POST">.',
        'Use <label for="..."> connected to every input by id.',
        'Group the radio buttons inside a <fieldset> with a <legend>.',
        'Add a <button type="submit"> at the bottom.'
      ],
      tasks: [
        'Form has action and POST method',
        'Email input uses type="email" with associated <label>',
        'Category dropdown has at least two options',
        'Radio buttons grouped inside <fieldset> with <legend>',
        'Includes explicit <button type="submit">'
      ],
      solution: `<form action="/api/v1/tickets" method="POST">
  <div>
    <label for="citizen-email">Citizen Email Address *</label>
    <input type="email" id="citizen-email" name="citizenEmail" required>
  </div>
  <div>
    <label for="ticket-category">Category *</label>
    <select id="ticket-category" name="category" required>
      <option value="">-- Select Category --</option>
      <option value="roads">Road Maintenance</option>
      <option value="water">Water Drainage</option>
    </select>
  </div>
  <fieldset>
    <legend>Priority Level *</legend>
    <input type="radio" id="priority-normal" name="priority" value="normal" checked>
    <label for="priority-normal">Normal</label>
    <input type="radio" id="priority-urgent" name="priority" value="urgent">
    <label for="priority-urgent">Urgent</label>
  </fieldset>
  <button type="submit">Submit Ticket</button>
</form>`,
      solutionExplanation: 'This form satisfies all modern accessibility and validation standards. Every input has an explicitly mapped label via the for/id pair, radio buttons share a common name attribute inside a fieldset/legend structure, and native required constraints enforce completeness.'
    },
    quiz: [
      {
        question: 'What is the security hazard of using method="GET" when submitting a user login form with a password?',
        options: [
          'The browser automatically encrypts the password with an unreadable key.',
          'The password is appended directly into the URL query string, exposing it in browser history, server access logs, and HTTP Referer headers.',
          'GET requests can only transmit 10 characters maximum.',
          'GET requests automatically disable HTTPS transport encryption.'
        ],
        correctIndex: 1,
        explanation: 'GET requests encode form data in the URL query parameters. Passwords sent via GET are stored in plaintext across browser history, proxy caches, and web server logs.'
      },
      {
        question: 'Why should a developer never rely solely on a placeholder attribute instead of a <label> element?',
        options: [
          'Placeholders vanish as soon as the user begins typing, leaving no permanent context, and are ignored or announced inconsistently by screen readers.',
          'Browsers reject HTML forms that include placeholder attributes.',
          'Placeholders increase the size of the JavaScript bundle.',
          'Placeholders cannot be styled with CSS.'
        ],
        correctIndex: 0,
        explanation: 'Placeholders disappear upon user input, harming cognitive accessibility and short-term recall. Furthermore, screen readers do not treat placeholders as reliable accessible names.'
      }
    ],
    takeaways: [
      'Every interactive input must have a dedicated <label> mapped via for and id.',
      'Always use method="POST" for sensitive data, mutations, or credential transmissions.',
      'Group related inputs (such as radio buttons or checkboxes) semantically with <fieldset> and <legend>.',
      'Leverage native HTML5 input types (email, tel, number) for mobile-optimized keyboards and constraint validation.',
      'Remember that client-side validation is a UX feature; always validate all inputs securely on the server.'
    ],
    caseStudyReference: {
      title: 'Grievance Submission Form in CRP India',
      description: 'Inspect the React form implementation in CRP India that collects citizen name, ward dropdown selection, complaint description, and multipart evidence upload.',
      files: [
        'reference-projects/CRP-India/frontend/src/pages/LodgeComplaint.jsx',
        'reference-projects/CRP-India/backend/controllers/complaintController.js'
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
    playgroundTitle: 'Accessible Civic Portal Capstone',
    playgroundCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Accessible Citizen Portal</title>
  <style>
    body { font-family: system-ui, sans-serif; padding: 1.5rem; line-height: 1.6; color: #1e293b; background: #f8fafc; }
    .skip-link { position: absolute; top: -40px; left: 0; background: #000; color: #fff; padding: 8px; z-index: 100; text-decoration: none; font-weight: bold; }
    .skip-link:focus { top: 0; }
    header, main, footer { max-width: 700px; margin: 0 auto; background: #fff; padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; border: 1px solid #e2e8f0; }
    button:focus-visible, a:focus-visible { outline: 3px solid #2563eb; outline-offset: 2px; }
    .status-badge { display: inline-block; padding: 0.25rem 0.5rem; border-radius: 4px; font-weight: bold; font-size: 0.8rem; }
    .status-active { background: #dcfce7; color: #166534; }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <header>
    <h1>Municipal Civic Services</h1>
    <nav aria-label="Portal Navigation">
      <a href="#report" style="margin-right: 1rem;">File Complaint</a>
      <a href="#status">Check Status</a>
    </nav>
  </header>
  <main id="main-content">
    <h2>Public Works Operational Status</h2>
    <p>All 14 municipal road repair squads are deployed today. <span class="status-badge status-active">Active</span></p>
    <section id="report" style="margin-top: 1.5rem;">
      <h3>Quick Action</h3>
      <button type="button" onclick="alert('Navigating to submission...')">Submit Live Grievance</button>
    </section>
  </main>
  <footer>
    <p>&copy; 2026 Municipal Public Administration. WCAG 2.1 AA Compliant.</p>
  </footer>
</body>
</html>`,
    objectives: [
      'Understand the four core WCAG principles (POUR: Perceivable, Operable, Understandable, Robust).',
      'Explain how the browser converts the DOM tree into an Accessibility Tree for screen readers.',
      'Implement keyboard navigation best practices, focus indicators, and skip-to-content links.',
      'Understand the First Rule of ARIA and know when native HTML elements make ARIA unnecessary.',
      'Execute a full accessibility audit using browser DevTools Lighthouse and Accessibility inspectors.'
    ],
    sections: [
      {
        heading: 'The Social and Legal Imperative of Web Accessibility (a11y)',
        content: `**Web accessibility** (abbreviated **a11y**, representing the letter 'a' followed by 11 letters and 'y') is the practice of building websites that can be navigated, understood, and used by everyone, including people with visual, auditory, motor, or cognitive disabilities.

In modern engineering, accessibility is not an optional "nice-to-have" feature; it is a fundamental engineering requirement and a legal mandate across government platforms like the CRP India municipal portal.

### The WCAG 2.1 POUR Principles:
1. **Perceivable:** Information and user interface components must be presentable to users in ways they can perceive (e.g., text alternatives for images, captions for video, high color contrast).
2. **Operable:** User interface components and navigation must be operable via diverse input devices (e.g., full keyboard navigability without requiring a mouse, clear focus indicators, skip-to-content links).
3. **Understandable:** Information and the operation of the user interface must be understandable (e.g., clear language declarations, predictable page behaviors, helpful form error messages).
4. **Robust:** Content must be robust enough that it can be interpreted reliably by a wide variety of user agents, including assistive technologies (e.g., valid HTML syntax, appropriate semantic markup).`
      },
      {
        heading: 'How Screen Readers See the Web: The Accessibility Tree',
        content: `Just as the browser builds a Document Object Model (DOM) to render visual pixels, it simultaneously constructs an parallel in-memory tree called the **Accessibility Tree**.

\`\`\`
   [HTML Document]
          |
          v
   [DOM Tree] ---------------> [Accessibility Tree]
          |                           |
          v                           v
   [Visual Pixels on Screen]    [Screen Reader Audio Output]
\`\`\`

The Accessibility Tree strips out visual styling and exposes four key properties for every element:
1. **Role:** What the element is (e.g., \`button\`, \`link\`, \`heading\`, \`checkbox\`, \`banner\`).
2. **Name:** What the element is called (its accessible text label, e.g., *"Register Ticket"*).
3. **Value:** The current state or data (e.g., \`checked=true\`, \`value="MG Road"\`).
4. **Description:** Additional supplementary context (provided via \`aria-describedby\`).

When you use semantic HTML like \`<button>Submit</button>\`, the browser automatically assigns the correct role (\`button\`), accessible name (\`Submit\`), and keyboard enter/spacebar click handlers. If you instead write \`<div class="btn">Submit</div>\`, the accessibility tree sees only a generic container with zero role and zero keyboard support!`
      },
      {
        heading: 'Keyboard Navigation, Focus Indicators, and Skip Links',
        content: `Many users with motor disabilities or visual impairments navigate web applications exclusively using the keyboard (\`Tab\` to move forward, \`Shift+Tab\` to move backward, \`Enter\` or \`Space\` to activate).

### 1. The Skip-to-Content Link
Websites with large headers and navigation bars force keyboard users to press \`Tab\` dozens of times just to reach the main article. A **Skip Link** is an accessible hidden link placed as the very first element inside \`<body>\`:
\`\`\`html
<a href="#main-content" class="skip-link">Skip to main content</a>
<!-- ... Navigation with 30 links ... -->
<main id="main-content">
  <!-- Focus jumps here immediately -->
</main>
\`\`\`

### 2. Never Suppress the Focus Outline!
A disastrous mistake made by beginner developers is removing the focus outline with CSS:
\`\`\`css
/* CATASTROPHIC ACCESSIBILITY BUG - NEVER DO THIS! */
*:focus {
  outline: none;
}

/* CORRECT: Provide a prominent, beautiful focus indicator */
button:focus-visible, a:focus-visible {
  outline: 3px solid #2563eb;
  outline-offset: 2px;
}
\`\`\``
      },
      {
        heading: 'The First Rule of ARIA: Do Not Use ARIA If Native HTML Exists',
        content: `Accessible Rich Internet Applications (**ARIA**) is a W3C specification that provides attributes (like \`role="dialog"\`, \`aria-expanded="false"\`) to enhance accessibility in custom widgets.

However, the **First Rule of ARIA** explicitly states:
> *"If you can use a native HTML element or attribute with the semantics and behavior you require already built in, then do so instead of re-purposing an element and adding an ARIA role, state, or property to make it accessible."*

\`\`\`html
<!-- BAD: 3 lines of complex ARIA trying to reinvent a button -->
<div role="button" tabindex="0" onclick="save()" onkeydown="handleKey(event)">
  Save Record
</div>

<!-- GOOD: Native, clean, fully accessible HTML5 button -->
<button type="button" onclick="save()">Save Record</button>
\`\`\`

Native HTML elements have built-in keyboard accessibility, focus management, and screen reader roles that work consistently across all operating systems without writing custom JavaScript.`
      }
    ],
    exercise: {
      instruction: 'Build an accessible municipal alert banner containing a skip-link, a <header> with an accessible nav, a <main> landmark, and an accessible callout button with visible focus styles.',
      starterCode: `<!-- Write your accessible layout below -->\n`,
      hints: [
        'Place <a href="#main" class="skip-link">Skip to main content</a> as the first child of <body>.',
        'Use <header> with an <h1> and <nav aria-label="Quick Links">.',
        'Add <main id="main"> containing an emergency announcement.',
        'Use native <button> instead of a <div> for actions.'
      ],
      tasks: [
        'Include skip-to-content anchor link',
        'Use <nav aria-label="..."> with navigation links',
        'Ensure <main id="main"> target matches the skip-link',
        'Use semantic <button> with accessible text'
      ],
      solution: `<a href="#main-content" class="skip-link">Skip to main content</a>
<header>
  <h1>Municipal Flood Watch & Redressal</h1>
  <nav aria-label="Primary Services">
    <ul>
      <li><a href="#shelters">Emergency Shelters</a></li>
      <li><a href="#helplines">Helplines</a></li>
    </ul>
  </nav>
</header>
<main id="main-content">
  <section id="shelters">
    <h2>Active Evacuation Shelters</h2>
    <p>Community Centers in Ward 2 and Ward 6 are equipped with drinking water and medical supplies.</p>
    <button type="button">Request Transport Assistance</button>
  </section>
</main>`,
      solutionExplanation: 'This markup fulfills all WCAG Level AA criteria. The skip link allows immediate bypass of navigation blocks, landmarks allow screen readers to jump directly to sections, and native buttons provide full keyboard focus and activation.'
    },
    quiz: [
      {
        question: 'What is the "First Rule of ARIA"?',
        options: [
          'Every <div> element on a web page must have an explicit role attribute.',
          'Never use ARIA if a native HTML element with the required semantics and behavior already exists.',
          'ARIA attributes should only be written in uppercase characters.',
          'ARIA is only required for websites hosted in the European Union.'
        ],
        correctIndex: 1,
        explanation: 'Native HTML elements have built-in accessibility, keyboard event handling, and focus management that are far more robust and standardized than custom ARIA retrofits.'
      },
      {
        question: 'Why is removing the CSS focus outline using "outline: none" a severe accessibility violation?',
        options: [
          'It increases the download size of the CSS bundle.',
          'It prevents keyboard-only users from seeing which interactive link, input, or button currently has focus.',
          'It causes text inside the element to become transparent.',
          'Browsers will refuse to execute JavaScript click listeners on elements without an outline.'
        ],
        correctIndex: 1,
        explanation: 'Keyboard users rely entirely on the visual focus ring to know where they are on the page. Removing outline: none renders the website unusable for keyboard navigation.'
      }
    ],
    takeaways: [
      'Accessibility (a11y) is a foundational engineering discipline built on the WCAG POUR principles.',
      'The browser creates an Accessibility Tree from the DOM that exposes roles, names, and states to screen readers.',
      'Always provide skip-to-content links and never suppress the keyboard focus ring.',
      'Follow the First Rule of ARIA: always choose native HTML elements (<button>, <nav>, <dialog>) over custom ARIA divs.'
    ],
    caseStudyReference: {
      title: 'Accessibility & Keyboard Navigation in CRP India',
      description: 'Analyze how the CRP India citizen dashboard enforces WCAG 2.1 AA standards, keyboard tab navigation, and aria-live announcements for dynamic ticket updates.',
      files: [
        'reference-projects/CRP-India/frontend/src/components/Navbar.jsx',
        'reference-projects/CRP-India/frontend/src/components/GrievanceForm.jsx'
      ]
    }
  }
};
