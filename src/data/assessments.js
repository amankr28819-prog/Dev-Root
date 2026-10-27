// Dev-Root Phase 5: Course-Level & Module-Level Assessments
// Pure client-side validation, multi-type questions, diagnostic feedback and lesson mapping

export const assessments = [
  {
    id: 'assess-c1-html',
    slug: 'html5-web-architecture',
    courseId: 'c1',
    title: 'Course 1 Assessment: HTML5 & Web Architecture',
    description: 'Evaluate your mastery of semantic document structures, accessibility standards, table data, forms, and HTTP request-response flow.',
    passingScorePercent: 75,
    estimatedMinutes: 20,
    questions: [
      {
        id: 'q-c1-1',
        type: 'multiple-choice',
        topic: 'Document Structure & Semantics',
        lessonSlug: 'html-document-structure',
        prompt: 'Which HTML snippet represents the most accessible and semantically correct way to structure a primary site navigation bar?',
        options: [
          '<div class="navbar"><div class="nav-item">Home</div><div class="nav-item">About</div></div>',
          '<nav aria-label="Main Navigation"><ul><li><a href="/">Home</a></li><li><a href="/about">About</a></li></ul></nav>',
          '<section><p><a href="/">Home</a></p><p><a href="/about">About</a></p></section>',
          '<header><button onclick="goHome()">Home</button><button onclick="goAbout()">About</button></header>'
        ],
        correctAnswer: 1,
        explanation: 'Using the semantic <nav> element with an aria-label provides an accessible landmark for screen readers. Placing navigation links in an unordered list (<ul>/<li>) conveys the list structure and count of navigation items to assistive devices.'
      },
      {
        id: 'q-c1-2',
        type: 'multiple-select',
        topic: 'Accessibility & Forms',
        lessonSlug: 'html-forms-input-types',
        prompt: 'Which of the following practices are MANDATORY for creating an accessible HTML form that complies with WCAG AA standards? (Select all that apply)',
        options: [
          'Every user-editable input element must be programmatically paired with a <label> using matching for and id attributes or nesting.',
          'Required form fields must include the required attribute and clear visual indicators.',
          'All form input fields must use placeholder text instead of visible labels to save vertical screen space.',
          'Form submissions must communicate validation errors in text rather than relying on color alone.'
        ],
        correctAnswer: [0, 1, 3],
        explanation: 'Labels associated via for/id are essential for screen readers. Visual indicators alongside the required attribute clarify constraints. Color cannot be the only indicator of an error (WCAG 1.4.1). Placeholders disappear upon user input and have poor contrast, making them an inaccessible replacement for visible labels.'
      },
      {
        id: 'q-c1-3',
        type: 'true-false',
        topic: 'Web Semantics',
        lessonSlug: 'html-semantic-elements',
        prompt: 'True or False: Using semantic elements like <article>, <section>, and <aside> improves SEO and assistive technology navigation without adding any intrinsic visual styling by default in browsers.',
        options: ['True', 'False'],
        correctAnswer: 0,
        explanation: 'True. Semantic elements have display: block in the user-agent stylesheet and look identical to <div> by default, but they convey rich machine-readable meaning to search engines and screen readers.'
      },
      {
        id: 'q-c1-4',
        type: 'output-prediction',
        topic: 'HTML Tables',
        lessonSlug: 'html-tables-structured-data',
        prompt: 'Inspect the following table markup. How many total columns does the first row span across?',
        code: `<table>
  <tr>
    <th colspan="3">Department Performance Metrics</th>
  </tr>
  <tr>
    <td>Water</td>
    <td>Roads</td>
    <td>Sanitation</td>
  </tr>
</table>`,
        options: [
          '1 column',
          '2 columns',
          '3 columns',
          '4 columns'
        ],
        correctAnswer: 2,
        explanation: 'The colspan="3" attribute instructs the browser to expand the <th> cell horizontally across 3 table columns, perfectly spanning the 3 <td> cells in the subsequent row.'
      },
      {
        id: 'q-c1-5',
        type: 'code-reading',
        topic: 'HTML Accessibility',
        lessonSlug: 'html-images-media',
        prompt: 'A web developer writes the following image tag for a hero decorative banner background: `<img src="banner.jpg" alt="A nice hero banner">`. What is the accessibility flaw?',
        options: [
          'The alt text should be much longer and describe every color in the image.',
          'Decorative images should have an empty alt attribute (alt="") so screen readers ignore them rather than announcing redundant fluff.',
          'The <img> tag must be wrapped in a <picture> element to be valid HTML5.',
          'Decorative images require an aria-label="Decorative" attribute.'
        ],
        correctAnswer: 1,
        explanation: 'Purely decorative images that do not convey informational content must use alt="" (or role="presentation"). Providing descriptive alt text for decorative banners clutters screen reader navigation with unhelpful noise.'
      }
    ]
  },
  {
    id: 'assess-c3-css',
    slug: 'css-mastery-and-layouts',
    courseId: 'c3',
    title: 'Course 3 Assessment: Modern CSS & Responsive Layouts',
    description: 'Test your understanding of the CSS Box Model, Flexbox alignment, CSS Grid tracks, stacking contexts, and mobile-first responsive architecture.',
    passingScorePercent: 75,
    estimatedMinutes: 25,
    questions: [
      {
        id: 'q-c3-1',
        type: 'multiple-choice',
        topic: 'CSS Box Model',
        lessonSlug: 'css-box-model',
        prompt: 'An element has: width: 300px; padding: 20px; border: 5px solid black; margin: 15px; box-sizing: border-box;. What is the total rendered visual width of this element on screen (excluding margin)?',
        options: [
          '350px',
          '300px',
          '340px',
          '370px'
        ],
        correctAnswer: 1,
        explanation: 'When box-sizing is set to border-box, the specified width (300px) includes the padding and border. The content box shrinks to 250px so that content (250) + padding (40) + border (10) = exactly 300px.'
      },
      {
        id: 'q-c3-2',
        type: 'multiple-select',
        topic: 'Flexbox Alignment',
        lessonSlug: 'css-flexbox',
        prompt: 'A container has display: flex; flex-direction: column;. Which of the following statements are correct? (Select all that apply)',
        options: [
          'The main axis runs vertically from top to bottom.',
          'The cross axis runs horizontally from left to right.',
          'justify-content aligns items horizontally along the cross axis.',
          'align-items controls alignment across the horizontal axis.'
        ],
        correctAnswer: [0, 1, 3],
        explanation: 'When flex-direction is column, the main axis is vertical (top to bottom). Therefore, justify-content aligns items along the vertical axis, and align-items aligns items along the horizontal cross axis.'
      },
      {
        id: 'q-c3-3',
        type: 'output-prediction',
        topic: 'CSS Grid',
        lessonSlug: 'css-grid',
        prompt: 'Given the rule `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));` on a container that is currently 700px wide (with 20px gap), how many columns will be rendered?',
        options: [
          '1 column',
          '2 columns',
          '3 columns',
          '4 columns'
        ],
        correctAnswer: 2,
        explanation: 'With 700px total width and 20px gap, 3 columns require at least 3 * 200px + 2 * 20px = 640px. Since 640px <= 700px, 3 columns fit comfortably and each expands to fill the remaining 60px.'
      },
      {
        id: 'q-c3-4',
        type: 'true-false',
        topic: 'Stacking Contexts & Z-Index',
        lessonSlug: 'css-positioning',
        prompt: 'True or False: Applying z-index: 9999 to an element with position: static will cause it to render in front of all positioned siblings.',
        options: ['True', 'False'],
        correctAnswer: 1,
        explanation: 'False. The z-index property only applies to positioned elements (relative, absolute, fixed, sticky) or direct children of flex/grid containers. On position: static elements, z-index is ignored by the browser.'
      },
      {
        id: 'q-c3-5',
        type: 'code-reading',
        topic: 'Responsive Breakpoints',
        lessonSlug: 'css-responsive-design',
        prompt: 'In a mobile-first responsive strategy, which media query syntax should be used to apply styling for desktop screens?',
        options: [
          '@media (max-width: 1024px) { ... }',
          '@media (min-width: 1024px) { ... }',
          '@media screen and (orientation: landscape) { ... }',
          '@media only (device-width: 1024px) { ... }'
        ],
        correctAnswer: 1,
        explanation: 'Mobile-first design establishes default styling without media queries for small viewports, then uses @media (min-width: ...) to progressively layer on layouts and enhancements for larger displays.'
      }
    ]
  },
  {
    id: 'assess-c4-js',
    slug: 'javascript-foundations-and-logic',
    courseId: 'c4',
    title: 'Course 4 Assessment: JavaScript Core & Problem Solving',
    description: 'Assess your fluency in JavaScript primitives, truthy/falsy evaluation, scope & closures, array methods, and algorithmic logic.',
    passingScorePercent: 75,
    estimatedMinutes: 25,
    questions: [
      {
        id: 'q-c4-1',
        type: 'output-prediction',
        topic: 'Type Coercion & Equality',
        lessonSlug: 'js-variables-datatypes',
        prompt: 'What will be logged to the console by the following JavaScript code snippet?',
        code: `console.log([] == false);
console.log([] === false);`,
        options: [
          'true then true',
          'true then false',
          'false then false',
          'false then true'
        ],
        correctAnswer: 1,
        explanation: 'Loose equality (==) coerces [] into an empty string "", which is coerced to 0, matching false (coerced to 0), yielding true. Strict equality (===) checks both value and type without coercion: an Object is never equal to a Boolean, yielding false.'
      },
      {
        id: 'q-c4-2',
        type: 'code-reading',
        topic: 'Closures & Scope',
        lessonSlug: 'js-functions-scope',
        prompt: 'What is logged when the following code executes?',
        code: `function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const c1 = createCounter();
const c2 = createCounter();
c1();
c1();
console.log(c1(), c2());`,
        options: [
          '3 1',
          '3 3',
          '2 1',
          'undefined undefined'
        ],
        correctAnswer: 0,
        explanation: 'Each call to createCounter() creates a distinct lexical closure with its own independent `count` variable in memory. Calling c1() three times increments c1\'s count to 3. Calling c2() once increments c2\'s count to 1.'
      },
      {
        id: 'q-c4-3',
        type: 'multiple-select',
        topic: 'Array Methods',
        lessonSlug: 'js-arrays',
        prompt: 'Which of the following JavaScript array methods do NOT mutate the original array and instead return a new array? (Select all that apply)',
        options: [
          'Array.prototype.map()',
          'Array.prototype.filter()',
          'Array.prototype.splice()',
          'Array.prototype.slice()'
        ],
        correctAnswer: [0, 1, 3],
        explanation: 'map(), filter(), and slice() are pure, non-mutating methods that return new arrays. splice() mutates the original array in place by adding or removing elements.'
      },
      {
        id: 'q-c4-4',
        type: 'multiple-choice',
        topic: 'Array Reductions',
        lessonSlug: 'js-arrays',
        prompt: 'Given the array `const nums = [10, 20, 30]`, which expression correctly calculates the sum of all elements?',
        options: [
          'nums.reduce((acc, curr) => acc + curr, 0)',
          'nums.map((acc, curr) => acc + curr)',
          'nums.filter((curr) => curr += 0)',
          'nums.forEach((val) => val + 0)'
        ],
        correctAnswer: 0,
        explanation: 'Array.prototype.reduce() aggregates elements into a single accumulated result. Starting with an initial accumulator of 0, `(acc, curr) => acc + curr` computes 0 + 10 + 20 + 30 = 60.'
      },
      {
        id: 'q-c4-5',
        type: 'true-false',
        topic: 'Reference vs Value',
        lessonSlug: 'js-objects',
        prompt: 'True or False: In JavaScript, objects and arrays are assigned and passed to functions by reference, meaning modifying a property inside a function mutates the original object outside.',
        options: ['True', 'False'],
        correctAnswer: 0,
        explanation: 'True. In JavaScript, primitives (numbers, strings, booleans) are copied by value, whereas objects and arrays are handled by reference pointer. Mutating object properties through a parameter mutates the underlying object in memory.'
      }
    ]
  },
  {
    id: 'assess-c7-react',
    slug: 'react-architecture-and-hooks',
    courseId: 'c7',
    title: 'Course 7 Assessment: React Architecture & Hooks',
    description: 'Verify your proficiency in JSX rules, component lifecycles, useState, useEffect dependencies, custom hooks, and state immutability.',
    passingScorePercent: 75,
    estimatedMinutes: 25,
    questions: [
      {
        id: 'q-c7-1',
        type: 'code-reading',
        topic: 'State Updates & Closures',
        lessonSlug: 'react-components-jsx',
        prompt: 'Consider the following React button click handler. If count is currently 0, what will count be after clicking the button once?',
        code: `const handleClick = () => {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
};`,
        options: [
          '3',
          '1',
          '0',
          'NaN'
        ],
        correctAnswer: 1,
        explanation: 'In a single render cycle, `count` is a constant captured in the closure (0). Each call resolves to setCount(0 + 1). To queue updates based on the previous pending state, use the updater functional form: `setCount(prev => prev + 1)`.'
      },
      {
        id: 'q-c7-2',
        type: 'multiple-choice',
        topic: 'useEffect Lifecycle & Dependencies',
        lessonSlug: 'react-hooks-state-lifecycle',
        prompt: 'What occurs if you omit the dependency array entirely in a useEffect call: `useEffect(() => { ... })`?',
        options: [
          'The effect executes only once when the component mounts.',
          'The effect executes on every single component render and re-render.',
          'The effect never executes.',
          'React throws a compile-time build error.'
        ],
        correctAnswer: 1,
        explanation: 'An effect without a dependency array runs after the initial mount AND after every subsequent update/re-render. Providing an empty array `[]` ensures it only runs on mount, while specifying dependencies runs it when those dependencies change.'
      },
      {
        id: 'q-c7-3',
        type: 'multiple-select',
        topic: 'React Rules of Hooks',
        lessonSlug: 'react-hooks-state-lifecycle',
        prompt: 'Which of the following comply with the official React Rules of Hooks? (Select all that apply)',
        options: [
          'Calling hooks only at the top level of React function components or custom hooks.',
          'Calling hooks inside loops or nested if statements to optimize execution.',
          'Custom hook names must start with the prefix "use" (e.g. useDebounce, useAuth).',
          'Calling hooks inside regular asynchronous utility functions.'
        ],
        correctAnswer: [0, 2],
        explanation: 'Hooks must always be called unconditionally at the top level so React can preserve the call order between renders. Hooks cannot be called inside loops, conditions, or nested functions. Custom hooks must be named starting with "use".'
      },
      {
        id: 'q-c7-4',
        type: 'true-false',
        topic: 'State Immutability',
        lessonSlug: 'react-state-management',
        prompt: 'True or False: To add an item to an array stored in React state, you can write `items.push(newItem); setItems(items);` because calling setItems notifies React of the change.',
        options: ['True', 'False'],
        correctAnswer: 1,
        explanation: 'False! `items.push()` mutates the existing array in memory. When `setItems(items)` is called, React compares the object reference (Object.is) and sees that the reference has not changed, skipping the re-render. Always create a new array: `setItems([...items, newItem])`.'
      },
      {
        id: 'q-c7-5',
        type: 'output-prediction',
        topic: 'JSX Keys',
        lessonSlug: 'react-components-jsx',
        prompt: 'Why does React discourage using the array index as the `key` prop when rendering a dynamic list that can be sorted, filtered, or deleted?',
        options: [
          'Using array indexes causes React to throw a fatal JavaScript syntax error.',
          'Using array indexes causes component state to bind to the wrong items when items are reordered or removed, causing input glitches.',
          'Array indexes exceed the maximum integer size permitted by React Virtual DOM.',
          'Array indexes cannot be converted to strings.'
        ],
        correctAnswer: 1,
        explanation: 'Keys provide identity to React reconciliation. If an item is deleted from the top of a list, the item that shifts into index 0 inherits index 0, causing uncontrolled input states, animations, and focus to attach to the wrong component.'
      }
    ]
  },
  {
    id: 'assess-c11-auth-sec',
    slug: 'authentication-and-web-security',
    courseId: 'c11',
    title: 'Course 11 Assessment: Authentication, Authorization & Security',
    description: 'Demonstrate your knowledge of password hashing, JWT token mechanics, XSS prevention, CSRF defenses, and Role-Based Access Control.',
    passingScorePercent: 75,
    estimatedMinutes: 25,
    questions: [
      {
        id: 'q-c11-1',
        type: 'multiple-choice',
        topic: 'Password Security',
        lessonSlug: 'authentication-jwt-sessions',
        prompt: 'Why must cryptographic hash functions like SHA-256 NOT be used directly for storing user passwords in databases?',
        options: [
          'SHA-256 is reversible and can be decrypted without a key.',
          'SHA-256 is too fast, enabling attackers to compute billions of guesses per second using GPUs during offline dictionary attacks.',
          'SHA-256 produces variable-length outputs that exceed database column limits.',
          'SHA-256 does not support alphanumeric characters.'
        ],
        correctAnswer: 1,
        explanation: 'Cryptographic hashes (MD5, SHA-1, SHA-256) were designed for rapid data integrity checks. Passwords require slow, computationally adaptive key-derivation functions (like bcrypt, Argon2, or PBKDF2) with configurable work factors and salt to thwart hardware brute-force attacks.'
      },
      {
        id: 'q-c11-2',
        type: 'multiple-select',
        topic: 'Token Storage Security',
        lessonSlug: 'authentication-jwt-sessions',
        prompt: 'Which security configurations are recommended when transmitting JWT authentication tokens to web browsers? (Select all that apply)',
        options: [
          'Store tokens in an HttpOnly cookie so client-side JavaScript cannot read or steal them via XSS.',
          'Store tokens in window.localStorage for convenient debugging in DevTools.',
          'Set the Secure cookie attribute so cookies are only transmitted over encrypted HTTPS connections.',
          'Set the SameSite=Strict or SameSite=Lax cookie attribute to defend against Cross-Site Request Forgery (CSRF).'
        ],
        correctAnswer: [0, 2, 3],
        explanation: 'HttpOnly prevents malicious scripts from accessing tokens through XSS vulnerabilities. Secure guarantees encryption in transit. SameSite prevents unauthorized cross-site requests. LocalStorage is fully accessible to any JavaScript running on the page, making it insecure for sensitive session tokens.'
      },
      {
        id: 'q-c11-3',
        type: 'true-false',
        topic: 'JWT Structure & Encryption',
        lessonSlug: 'authentication-jwt-sessions',
        prompt: 'True or False: A standard JSON Web Token (JWT) is encrypted by default, meaning third parties cannot read the claims and payload stored inside.',
        options: ['True', 'False'],
        correctAnswer: 1,
        explanation: 'False! A standard JWT is signed, NOT encrypted. The payload is merely base64url-encoded and can be decoded by anyone with simple string tools. You must never store sensitive data like passwords or credit cards in a JWT payload.'
      },
      {
        id: 'q-c11-4',
        type: 'multiple-choice',
        topic: 'Authorization vs Authentication',
        lessonSlug: 'authorization-rbac-permissions',
        prompt: 'A citizen logs into the CRP India platform and attempts to trigger an endpoint that deletes an entire municipal ward. The server responds with HTTP 403 Forbidden. What does this status code signify?',
        options: [
          'The citizen is not logged in and must supply authentication credentials.',
          'The citizen is authenticated, but their account role lacks permission to perform this specific action.',
          'The requested municipal ward does not exist in the database.',
          'The citizen\'s browser has sent a corrupted network request.'
        ],
        correctAnswer: 1,
        explanation: 'HTTP 401 Unauthorized means authentication is missing or invalid (who are you?). HTTP 403 Forbidden means the identity is known, but that identity is not authorized/permitted to perform the requested operation (you cannot do this).'
      },
      {
        id: 'q-c11-5',
        type: 'code-reading',
        topic: 'SQL Injection Defense',
        lessonSlug: 'web-security-owasp',
        prompt: 'Which backend code snippet safely prevents SQL injection when querying a user by email?',
        options: [
          'db.query(`SELECT * FROM users WHERE email = \'${req.body.email}\'`)',
          'db.query(\'SELECT * FROM users WHERE email = ?\', [req.body.email])',
          'db.query(\'SELECT * FROM users WHERE email = \' + req.body.email)',
          'db.query(`SELECT * FROM users WHERE email = \'${escape(req.body.email)}\'`)'
        ],
        correctAnswer: 1,
        explanation: 'Parameterized queries (prepared statements) separate SQL instructions from user-supplied data at the database protocol level, completely neutralizing SQL injection regardless of malicious characters.'
      }
    ]
  }
];
