/**
 * Dev-root Course 6: The Browser and the DOM - Deep Learning Curriculum
 * Comprehensive lessons covering DOM selection, manipulation, events, and forms.
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
    estimatedTime: '40 min read & practice',
    objectives: [
      'Understand how browsers parse HTML text into the live in-memory Document Object Model (DOM).',
      'Select elements accurately using document.querySelector and document.querySelectorAll.',
      'Modify element text, HTML content, attributes, and CSS class lists safely.',
      'Handle user actions using addEventListener, event bubbling, and event.preventDefault().',
      'Understand why modern frameworks like React build upon these underlying DOM fundamentals.'
    ],
    sections: [
      {
        heading: 'What is the Document Object Model (DOM)?',
        content: `When a browser receives an HTML document, it does not interact with the raw string of HTML text. Instead, its rendering engine parses the tags into an object-oriented, hierarchical tree structure called the **Document Object Model (DOM)**.

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
\`\`\``
      },
      {
        heading: 'Modifying Content, Attributes, and CSS Classes',
        content: `Once an element is selected, you can manipulate it in memory:

### 1. Updating Text: \`textContent\` vs. \`innerHTML\`
* **\`element.textContent\` (Recommended):** Sets or reads the raw plaintext inside an element. It strips all tags and automatically escapes special characters. **Always use \`textContent\` when rendering untrusted user input to prevent Cross-Site Scripting (XSS) vulnerabilities!**
* **\`element.innerHTML\`:** Parses the string as HTML tags. Dangerous if used with un-sanitized user input.

### 2. Managing CSS Classes via \`classList\`
Never modify the \`class\` attribute as a raw string (\`element.className = ...\`). Use the dedicated **\`classList\` API**:
\`\`\`javascript
const badge = document.querySelector('.badge');
badge.classList.add('badge-resolved');     // Adds class
badge.classList.remove('badge-pending');    // Removes class
badge.classList.toggle('highlighted');      // Adds if missing, removes if present
badge.classList.contains('badge-resolved'); // Returns boolean true/false
\`\`\`

### 3. Modifying Attributes
\`\`\`javascript
const link = document.querySelector('a.report-link');
link.setAttribute('href', '/reports/2026/04');
link.setAttribute('aria-expanded', 'true');
\`\`\``
      },
      {
        heading: 'Handling Events & event.preventDefault()',
        content: `Web applications feel interactive because they listen and react to user events:

\`\`\`javascript
const form = document.querySelector('#grievance-form');

form.addEventListener('submit', (event) => {
  // CRITICAL: Prevent the browser from refreshing the whole page!
  event.preventDefault();

  const titleInput = document.querySelector('#complaint-title');
  const titleValue = titleInput.value.trim();

  if (titleValue === '') {
    alert('Please enter a complaint title.');
    return;
  }

  console.log('Submitting grievance asynchronously:', titleValue);
});
\`\`\`

### Event Bubbling & Delegation:
When an event occurs on a deeply nested element (like a button inside a card inside a list), the event doesn\'t just trigger on the button. It **bubbles up** through every ancestor element in the tree:
\`Button -> Card -> Section -> Main -> Body -> Document\`

With **Event Delegation**, instead of attaching 50 separate event listeners to 50 individual cards, you attach a single listener to the parent container (\`#complaint-list\`) and inspect \`event.target\` to see which specific child was clicked. This dramatically saves browser memory.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using element.innerHTML with user-supplied text, creating Cross-Site Scripting (XSS) security flaws.',
        whyItHappens: 'innerHTML seems convenient for inserting text and markup.',
        howToFix: 'Use element.textContent for raw text. It automatically sanitizes HTML entities and prevents malicious script execution.'
      },
      {
        mistake: 'Forgetting event.preventDefault() on form submit listeners.',
        whyItHappens: 'Wondering why the page refreshes and state disappears immediately upon clicking submit.',
        howToFix: 'Standard HTML forms submit via page reload. Always call event.preventDefault() when handling submissions via JavaScript.'
      },
      {
        mistake: 'Attaching duplicate event listeners inside repeated loops without cleanup.',
        whyItHappens: 'Registering addEventListener inside functions that get called repeatedly.',
        howToFix: 'Attach event listeners once during initialization, or use event delegation on the parent container.'
      }
    ],
    guidedExercise: {
      title: 'Build an Interactive Dynamic Grievance Counter & Filter',
      difficulty: 'Intermediate',
      instructions: 'Write JavaScript that selects a list of complaint items, filters items dynamically when a button is clicked, and updates an interactive counter on screen using textContent and classList.',
      starterCode: `// HTML STRUCTURE:
// <span id="counter">0</span> complaints visible
// <button id="filter-btn">Show Urgent Only</button>
// <ul id="list">
//   <li class="item" data-urgent="true">Open Manhole</li>
//   <li class="item" data-urgent="false">Streetlight Flickering</li>
// </ul>

// TODO: Write event listener on #filter-btn to hide non-urgent items`,
      tasks: [
        'Select the filter button and list items using querySelector and querySelectorAll.',
        'Add a click event listener to the button.',
        'Toggle a hidden CSS class on items where data-urgent is not "true".',
        'Update the #counter textContent to show the count of currently visible complaints.'
      ],
      hints: [
        'Read dataset attributes using element.dataset.urgent.',
        'Use item.classList.toggle("hidden") to hide or show items.',
        'Count visible items by filtering items without the "hidden" class.'
      ],
      solution: `const filterBtn = document.querySelector('#filter-btn');
const counter = document.querySelector('#counter');
const items = document.querySelectorAll('.item');

filterBtn.addEventListener('click', () => {
  let visibleCount = 0;

  items.forEach(item => {
    const isUrgent = item.dataset.urgent === 'true';
    if (!isUrgent) {
      item.classList.toggle('hidden');
    }

    if (!item.classList.contains('hidden')) {
      visibleCount++;
    }
  });

  counter.textContent = String(visibleCount);
});`,
      solutionExplanation: 'This script demonstrates modern DOM manipulation: selecting nodes with querySelector, handling user clicks with addEventListener, toggling CSS classes via classList, and safely updating output with textContent.'
    },
    quiz: [
      {
        question: 'Why should developers use "element.textContent" instead of "element.innerHTML" when rendering user-submitted text?',
        options: [
          'textContent runs 10x slower but is easier to read.',
          'textContent prevents Cross-Site Scripting (XSS) attacks by treating all input as literal plaintext rather than executable HTML markup.',
          'innerHTML is only supported on mobile devices.',
          'textContent automatically translates text to English.'
        ],
        correctIndex: 1,
        explanation: 'Setting user input via innerHTML allows malicious users to inject <script> or <img onerror="..."> payloads (XSS). textContent renders characters literally, neutralizing injection attacks.'
      },
      {
        question: 'What is the purpose of calling "event.preventDefault()" inside a form submit event listener?',
        options: [
          'It clears all user passwords from memory.',
          'It stops the browser from executing its default action (reloading the entire page or navigating away), allowing JavaScript to handle the submission asynchronously.',
          'It forces the browser to shut down.',
          'It checks the user\'s internet speed.'
        ],
        correctIndex: 1,
        explanation: 'Default browser behavior on form submission is to make a full synchronous HTTP request and reload the page. Calling event.preventDefault() halts this, enabling smooth Single-Page Application (SPA) interactions.'
      },
      {
        question: 'What does "Event Bubbling" mean in the browser DOM?',
        options: [
          'Water bubble animations rendered on canvas.',
          'When an event fires on an element, it subsequently propagates upward through its parent elements all the way to the root document node.',
          'Memory leaks that grow over time.',
          'Events being delayed by network lag.'
        ],
        correctIndex: 1,
        explanation: 'Event bubbling describes how DOM events travel up the ancestor hierarchy, triggering listener callbacks on parent nodes unless event.stopPropagation() is called.'
      }
    ],
    takeaways: [
      'The DOM is the browser\'s in-memory, object-oriented representation of the HTML document.',
      'Use querySelector and querySelectorAll with CSS selector syntax for flexible, modern element selection.',
      'Use textContent for safe plaintext rendering; use classList for clean CSS class management.',
      'Use addEventListener to listen for user interactions, and event.preventDefault() to handle forms without full page reloads.',
      'Event bubbling enables event delegation, reducing memory usage by managing events on parent containers.'
    ],
    caseStudyReference: {
      title: 'DOM Event Handlers & State Updates in CRP India',
      description: 'Observe how form submission events in the grievance portal prevent default page reloads and submit data asynchronously using React event synthetic wrappers.',
      files: [
        'reference-projects/CRP-India/frontend/src/pages/SubmitGrievance.jsx',
        'reference-projects/CRP-India/frontend/src/components/GrievanceCard.jsx'
      ]
    }
  }
};
