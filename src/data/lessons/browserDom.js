/**
 * Dev-root Course 6: The Browser and the DOM - Deep Learning Curriculum (Phase 4 4x Depth Standard)
 * Comprehensive lessons covering DOM selection, manipulation, event propagation, delegation, and forms.
 */

export const BROWSER_DOM_LESSONS = {
  'dom-manipulation-and-events': {
    id: 'lesson-6-1',
    slug: 'dom-manipulation-and-events',
    courseId: 'course-6',
    courseSlug: 'browser-and-dom',
    courseTitle: 'Course 6: The Browser and the DOM',
    title: 'Selecting Elements, Modifying Content & Events',
    category: 'Frontend',
    estimatedTime: '45 min read & practice',
    objectives: [
      'Understand how browsers parse HTML into the live in-memory Document Object Model (DOM) tree.',
      'Master document.querySelector and querySelectorAll using modern CSS selector syntax.',
      'Differentiate textContent, innerHTML, and understand Cross-Site Scripting (XSS) risks.',
      'Manipulate element styles and classes dynamically using the classList API (add, remove, toggle).',
      'Master event handling with addEventListener, the Event object, and event.preventDefault().',
      'Understand Event Bubbling, Event Capturing, and implement the performant Event Delegation pattern.'
    ],
    sections: [
      {
        heading: 'What is the Document Object Model (DOM)?',
        content: `When a browser receives an HTML document across the network, it does not interact with the raw string of HTML text. Instead, its rendering engine parses the tags into an object-oriented, hierarchical tree structure called the **Document Object Model (DOM)**.

\`\`\`
                          [ document ]
                               |
                            [ <html> ]
                            /        \\
                     [ <head> ]     [ <body> ]
                       /    \\         /      \\
                 [ <title> ] [ <meta> ] [ <h1> ]  [ <p> ]
                     |                     |        |
             "Citizen Portal"        "Welcome"  "Grievance"
\`\`\`

Every HTML tag becomes an **Element Node** in memory, and the text inside becomes a **Text Node**.
The global \`document\` object in JavaScript provides an API (Application Programming Interface) allowing your code to:
* Search for and select elements on the page.
* Change text, attributes, and visual styles dynamically.
* Create new elements and insert or remove them from the page.
* Listen for and respond to user actions like mouse clicks, keyboard presses, and form submissions.`
      },
      {
        heading: 'Selecting Elements: querySelector & querySelectorAll',
        content: `While older JavaScript provided legacy methods like \`document.getElementById\` and \`document.getElementsByClassName\`, modern web development relies almost exclusively on CSS selector-based methods:

### 1. \`document.querySelector(selector)\`
Returns the **first matching element** that matches the specified CSS selector, or \`null\` if no match is found:
\`\`\`javascript
const heading = document.querySelector('h1');
const submitBtn = document.querySelector('#submit-grievance');
const activeCard = document.querySelector('.card.status-active');
\`\`\`

### 2. \`document.querySelectorAll(selector)\`
Returns a **NodeList** (a static array-like collection) of **all matching elements**:
\`\`\`javascript
const allGrievanceCards = document.querySelectorAll('.grievance-card');

// You can iterate over a NodeList directly using forEach:
allGrievanceCards.forEach((card, index) => {
  console.log(\`Card #\${index + 1}\`, card);
});

// Or convert to a standard JavaScript array using Array.from():
const cardArray = Array.from(allGrievanceCards);
\`\`\``
      },
      {
        heading: 'Modifying Content Safely: textContent vs. innerHTML (and XSS Risks)',
        content: `Once an element is selected, you can modify its content:

### 1. \`textContent\` (Safe Plain Text - Preferred):
Reads or sets text as raw characters. HTML tags are treated as literal text, preventing security vulnerabilities:
\`\`\`javascript
const titleEl = document.querySelector('#card-title');
titleEl.textContent = "Ward 12 Road Repair";
\`\`\`

### 2. \`innerHTML\` (HTML Markup Parser - Security Warning!):
Parses the assigned string into live HTML elements:
\`\`\`javascript
titleEl.innerHTML = "Ward 12 <span class='badge'>Urgent</span>";
\`\`\`

### The Critical Security Risk: Cross-Site Scripting (XSS)
Never use \`innerHTML\` to display un-sanitized user-supplied input! If a malicious citizen submits their name as \`<img src="x" onerror="stealSessionCookies()">\`, assigning this string via \`innerHTML\` executes the malicious JavaScript in the victim's browser!
**Rule:** Always use \`textContent\` for text insertion. When creating structured HTML elements dynamically, use \`document.createElement()\`.`
      },
      {
        heading: 'Dynamic Styling with the classList API',
        content: `Directly modifying inline styles via \`element.style.color = "red"\` clutters HTML and introduces high-specificity inline overrides. Instead, define CSS classes in your stylesheet and toggle them using the **\`classList\`** API:

\`\`\`javascript
const card = document.querySelector('.complaint-card');

card.classList.add('is-resolved');       // Adds class
card.classList.remove('is-pending');     // Removes class
card.classList.toggle('highlighted');    // Adds if missing; removes if present
const hasError = card.classList.contains('has-error'); // Returns true or false
\`\`\``
      },
      {
        heading: 'Creating and Appending Elements with DocumentFragment',
        content: `To dynamically add new HTML elements to the page:
\`\`\`javascript
// 1. Create the element
const newCard = document.createElement('div');

// 2. Configure content and classes
newCard.classList.add('card', 'card-fresh');
newCard.textContent = "New Grievance Registered";

// 3. Mount it to the parent container
const container = document.querySelector('#cards-container');
container.appendChild(newCard);
\`\`\`

### Performance Optimization: DocumentFragment
Every time an element is appended to the live DOM, the browser triggers a **Reflow (Layout calculation)** and **Repaint**. If you insert 500 ticket rows in a loop using \`appendChild\`, the browser reflows 500 times, freezing the UI!
Use a **\`DocumentFragment\`** to batch mutations off-screen:
\`\`\`javascript
const fragment = document.createDocumentFragment();

tickets.forEach(ticket => {
  const row = document.createElement('tr');
  row.textContent = ticket.title;
  fragment.appendChild(row); // Appended off-screen! Zero reflow.
});

// Appending the fragment to the DOM triggers exactly ONE single reflow!
document.querySelector('#ticket-table tbody').appendChild(fragment);
\`\`\``
      },
      {
        heading: 'Event Handling, Bubbling, and Event Delegation',
        content: `Events represent user interactions (clicks, keypresses, input changes, form submissions).

### 1. Attaching Event Listeners:
\`\`\`javascript
const submitBtn = document.querySelector('#submit-btn');

submitBtn.addEventListener('click', (event) => {
  console.log('Button clicked!', event);
});
\`\`\`

### 2. Preventing Default Browser Action (\`event.preventDefault()\`):
When a user submits an HTML \`<form>\`, the browser's default behavior is to reload the entire web page. In Single Page Applications (SPAs), we prevent this reload so JavaScript can handle submission via Fetch API:
\`\`\`javascript
const form = document.querySelector('#grievance-form');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // HALT full page reload!
  const formData = new FormData(form);
  // Send asynchronous JSON request to backend...
});
\`\`\`

### 3. Event Bubbling & The Event Delegation Pattern:
When an event occurs on an element (e.g., a button inside a table row), it doesn't stop there. It **bubbles** up the DOM tree from the child element, through parent containers, up to \`<body>\` and \`document\`.

\`\`\`
   [Table Container]   <---- (Event bubbles all the way up!)
          ^
     [Table Row]       <---- (Parent receives click event)
          ^
    [Delete Button]    <---- (Click event originates here)
\`\`\`

Instead of adding 1,000 separate event listeners to 1,000 delete buttons in a table (which consumes massive memory), attach **one single listener to the parent table**:
\`\`\`javascript
const table = document.querySelector('#complaints-table');

table.addEventListener('click', (e) => {
  // Check if the clicked target is a delete button
  if (e.target.matches('.btn-delete')) {
    const ticketId = e.target.dataset.id;
    deleteTicket(ticketId);
  }
});
\`\`\``
      }
    ],
    exercise: {
      instruction: 'Write JavaScript code that intercepts a form submission (#ticket-form), prevents the page reload, extracts the citizen name (#name-input), and appends a new list item (<li>) with class "ticket-item" to #ticket-list.',
      starterCode: `// Write your DOM event logic below
const form = document.querySelector('#ticket-form');
`,
      hints: [
        'Add an event listener for the "submit" event on form.',
        'Call e.preventDefault() inside the callback.',
        'Get the value using document.querySelector("#name-input").value.',
        'Use document.createElement("li"), assign its textContent and classList, and append it to #ticket-list.'
      ],
      tasks: [
        'Listen for submit event on form',
        'Call event.preventDefault()',
        'Extract text value safely',
        'Create <li> element and append to #ticket-list'
      ],
      solution: `const form = document.querySelector('#ticket-form');
const ticketList = document.querySelector('#ticket-list');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nameInput = document.querySelector('#name-input');
  const citizenName = nameInput.value.trim();

  if (citizenName.length === 0) return;

  const listItem = document.createElement('li');
  listItem.classList.add('ticket-item');
  listItem.textContent = citizenName;

  ticketList.appendChild(listItem);
  form.reset();
});`,
      solutionExplanation: 'This demonstrates standard modern DOM event handling: halting the default full-page reload, extracting user input safely without innerHTML XSS vulnerabilities, creating an element node, and appending it to the DOM tree.'
    },
    quiz: [
      {
        question: 'Why should a web developer use "textContent" instead of "innerHTML" when displaying user-entered data on a webpage?',
        options: [
          'textContent renders text in bold by default.',
          'innerHTML parses input as HTML markup, creating severe Cross-Site Scripting (XSS) vulnerabilities if the user enters malicious <script> or event tags.',
          'textContent is only supported on mobile devices.',
          'innerHTML triggers a permanent page reload.'
        ],
        correctIndex: 1,
        explanation: 'innerHTML evaluates raw strings as executable HTML. Inserting untrusted user input with innerHTML opens the door to XSS attacks, whereas textContent safely encodes and treats input as plain text.'
      },
      {
        question: 'What is the primary architectural advantage of the Event Delegation pattern?',
        options: [
          'It automatically animates all button clicks.',
          'It attaches a single event listener to a parent container rather than hundreds of listeners on dynamic child elements, saving memory and handling newly created children automatically.',
          'It prevents forms from submitting data over HTTPS.',
          'It bypasses CSS specificity rules.'
        ],
        correctIndex: 1,
        explanation: 'Event delegation leverages event bubbling to handle events at a common ancestor. This dramatically reduces memory footprint and ensures dynamically added elements are handled without re-attaching listeners.'
      }
    ],
    takeaways: [
      'The browser creates an in-memory DOM tree from HTML that JavaScript inspects and manipulates.',
      'Use querySelector and querySelectorAll with modern CSS selectors.',
      'Always prefer textContent over innerHTML to prevent Cross-Site Scripting (XSS) security vulnerabilities.',
      'Use event.preventDefault() to halt full-page reloads during form submissions.',
      'Leverage Event Delegation on parent containers to handle dynamic elements efficiently.'
    ],
    caseStudyReference: {
      title: 'DOM Event Listeners and Form Interception in CRP India',
      description: 'Review the React synthetic event wrappers and form submit handlers in CRP India that prevent browser reloads and send asynchronous Axios API calls.',
      files: [
        'reference-projects/CRP-India/frontend/src/pages/LodgeComplaint.jsx',
        'reference-projects/CRP-India/frontend/src/components/GrievanceForm.jsx'
      ]
    }
  }
};
