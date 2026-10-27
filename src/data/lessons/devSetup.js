/**
 * Dev-root Course 2: Developer Setup & Essential Tools - Deep Learning Curriculum
 * Comprehensive lessons covering terminal, file systems, code editors, and DevTools.
 */

export const DEV_SETUP_LESSONS = {
  'terminal-and-file-fundamentals': {
    id: 'lesson-2-1',
    slug: 'terminal-and-file-fundamentals',
    courseId: 'course-2',
    courseSlug: 'developer-setup-and-tools',
    courseTitle: 'Course 2: Developer Setup & Essential Tools',
    title: 'Files, Folders & The Developer Terminal',
    category: 'Tooling',
    estimatedTime: '30 min read & practice',
    objectives: [
      'Master file system structures: root directory, absolute paths, relative paths, and hidden dotfiles.',
      'Understand how the command-line interface (CLI) interacts with the operating system kernel.',
      'Navigate directories and manipulate files using cross-platform terminal commands (pwd, cd, ls/dir, mkdir, rm/del).',
      'Explain how PATH environment variables enable executing commands globally.'
    ],
    sections: [
      {
        heading: 'Why Developers Use the Command Line Terminal',
        content: `While casual computer users interact with their machines using Graphical User Interfaces (GUIs)—clicking icons and dragging folders in File Explorer or Finder—professional software engineers spend a substantial portion of their working day in the **Command Line Interface (CLI)** or **Terminal**.

### The Advantages of the CLI:
1. **Automation and Scripting:** You can write a single command to batch resize 500 images, initialize a multi-tier project, or run tests across thousands of files in seconds.
2. **Remote Server Administration:** Production cloud servers (such as AWS EC2 or DigitalOcean droplets running the CRP India backend) do not run desktop graphical environments to save RAM and CPU. You must administer them over SSH through the command line.
3. **Build Tooling Ecosystem:** Modern web development workflows (npm, git, vite, docker) are built natively as command-line programs.`
      },
      {
        heading: 'File System Anatomy: Absolute vs. Relative Paths',
        content: `Your computer organizes storage as a hierarchical tree of folders (directories) and files:

\`\`\`
Windows: C:\\Users\\Developer\\Projects\\crp-india\\frontend\\src\\App.jsx
macOS/Linux: /home/developer/projects/crp-india/frontend/src/App.jsx
\`\`\`

### Absolute Paths:
An absolute path specifies the complete location of a file starting from the very root of the file system.
* On Windows: Begins with a drive letter, such as \`C:\\\` or \`Z:\\\`.
* On macOS/Linux: Begins with a forward slash \`/\`.
* *Characteristic:* Points to the exact same file regardless of what directory your terminal is currently in.

### Relative Paths:
A relative path specifies a location starting from your **Current Working Directory (CWD)**:
* **\`.\` (Single dot):** Represents the *current* directory.
* **\`..\` (Double dot):** Represents the *parent* directory (one level up).
* *Example:* If your terminal is located at \`crp-india/frontend\`:
  * \`./src/App.jsx\` accesses \`App.jsx\` inside \`src\`.
  * \`../backend/server.js\` moves up to \`crp-india\`, then down into \`backend/server.js\`.`
      },
      {
        heading: 'Essential Terminal Commands Quick Reference',
        content: `Every developer must memorize standard cross-platform commands:

| Command (macOS/Linux) | Command (PowerShell) | Description | Example |
| :--- | :--- | :--- | :--- |
| \`pwd\` | \`pwd\` or \`Get-Location\` | Print working directory | \`pwd\` |
| \`ls -la\` | \`ls\` or \`dir\` | List all files including hidden dotfiles | \`ls\` |
| \`cd <dir>\` | \`cd <dir>\` | Change directory | \`cd src/components\` |
| \`cd ..\` | \`cd ..\` | Move up to parent directory | \`cd ..\` |
| \`mkdir <name>\` | \`mkdir <name>\` | Make new directory | \`mkdir assets\` |
| \`touch <file>\` | \`New-Item <file>\` | Create new empty file | \`touch index.html\` |
| \`rm -rf <dir>\` | \`Remove-Item -Recurse\` | Delete directory and contents | \`rm -rf temp\` |
| \`clear\` | \`clear\` or \`cls\` | Clear terminal display screen | \`clear\` |`
      },
      {
        heading: 'Environment Variables & The System PATH',
        content: `When you type \`node -v\` or \`git status\` in your terminal, how does the operating system know where the \`node\` or \`git\` executable binary is stored on your hard drive?

It checks the **PATH environment variable**. The PATH is an operating-system-level list of directory paths. When you type any command:
1. The shell checks if the command is a built-in shell function.
2. If not, it searches each folder listed in the PATH sequentially until it finds an executable file matching that name.
3. If no folder in PATH contains that executable, the terminal displays the famous error:
   \`'command' is not recognized as an internal or external command\`.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using spaces in file or folder names (e.g., "my project folder").',
        whyItHappens: 'Casual operating system habit.',
        howToFix: 'The command line treats spaces as argument separators! A command like cd my project folder tries to run cd my. Always use hyphens or underscores: my-project-folder.'
      },
      {
        mistake: 'Accidentally running destructive delete commands like rm -rf without checking current directory.',
        whyItHappens: 'Not running pwd first to confirm location.',
        howToFix: 'Always verify your current working directory before running file deletion commands.'
      },
      {
        mistake: 'Confusing single dot (.) with double dot (..).',
        whyItHappens: 'Syntax similarity.',
        howToFix: 'Remember: one dot (.) is right here. Two dots (..) is one step up.'
      }
    ],
    guidedExercise: {
      title: 'Navigate Directories and Construct Relative Paths',
      difficulty: 'Beginner',
      instructions: 'Given the project directory tree below, write the exact relative path required to import a database configuration file from a frontend component.',
      starterCode: `// PROJECT DIRECTORY TREE:
// /project-root
//   ├── frontend/
//   │     └── src/
//   │           └── components/
//   │                 └── GrievanceCard.jsx  <-- YOU ARE HERE
//   └── backend/
//         └── config/
//               └── db.js                    <-- TARGET FILE`,
      tasks: [
        'Determine how many levels up you must travel from GrievanceCard.jsx to reach project-root.',
        'Construct the relative path string step by step using .. and /.',
        'Identify why direct imports between frontend and backend are architectural anti-patterns.',
        'Explain how frontend should access database data instead (via HTTP API).'
      ],
      hints: [
        'From components/, one .. reaches src/. A second .. reaches frontend/. A third .. reaches project-root.',
        'From project-root, enter backend/config/db.js.',
        'Relative path: ../../../backend/config/db.js.'
      ],
      solution: `// RELATIVE PATH:
// ../../../backend/config/db.js

// ARCHITECTURAL NOTE:
// While the relative file path is syntactically correct, in a real web application,
// frontend React code must NEVER directly import backend database files!
// The frontend runs in the browser, while db.js requires a Node.js runtime and database credentials.
// The frontend communicates with the backend exclusively over HTTP REST APIs!`,
      solutionExplanation: 'Understanding relative file navigation is essential for importing local modules. However, maintaining the separation between client and server runtimes is equally vital.'
    },
    quiz: [
      {
        question: 'What does the relative path symbol ".." represent in a command line terminal?',
        options: [
          'The root directory of the hard drive.',
          'The current working directory.',
          'The parent directory one level above the current working directory.',
          'The user\'s desktop folder.'
        ],
        correctIndex: 2,
        explanation: 'In file system path notation, ".." moves one directory level up into the parent folder.'
      },
      {
        question: 'Why should software developers avoid spaces in folder and project names (e.g. using "my-project" instead of "my project")?',
        options: [
          'Spaces cause hard drives to run hotter.',
          'Command-line shells treat spaces as argument delimiters, breaking scripts and requiring annoying quote escapes.',
          'Git refuses to track files with spaces.',
          'Node.js cannot compile spaces.'
        ],
        correctIndex: 1,
        explanation: 'Command line shells interpret whitespace as the boundary between separate command arguments, which causes commands to fail or target the wrong directory unless quotes are explicitly used.'
      },
      {
        question: 'What is the purpose of the PATH environment variable in an operating system?',
        options: [
          'It stores user website bookmarks.',
          'It contains a list of directory paths where the operating system searches for executable command binaries.',
          'It controls computer screen brightness.',
          'It measures network download speeds.'
        ],
        correctIndex: 1,
        explanation: 'When a command is executed in the terminal, the OS searches every directory listed in the PATH variable to find the matching executable binary file.'
      }
    ],
    takeaways: [
      'The CLI is an essential professional tool for automation, build tooling, and cloud server administration.',
      'Absolute paths anchor to the file system root; relative paths calculate from the current working directory.',
      "'.' represents the current directory; '..' represents the parent directory one level up.",
      'Avoid spaces in file and folder names; use kebab-case (my-project) or snake_case (my_project).',
      'The PATH environment variable tells your shell where to find executable programs like node, git, and npm.'
    ],
    caseStudyReference: {
      title: 'Monorepo Project Structure in CRP India',
      description: 'Observe how CRP India arranges frontend and backend directories side-by-side with independent package.json manifests and build scripts.',
      files: [
        'reference-projects/CRP-India/package.json',
        'reference-projects/CRP-India/frontend/package.json',
        'reference-projects/CRP-India/backend/package.json'
      ]
    }
  },

  'code-editors-and-devtools': {
    id: 'lesson-2-2',
    slug: 'code-editors-and-devtools',
    courseId: 'course-2',
    courseSlug: 'developer-setup-and-tools',
    courseTitle: 'Course 2: Developer Setup & Essential Tools',
    title: 'Code Editors & Browser Developer Tools',
    category: 'Tooling',
    estimatedTime: '30 min read & practice',
    objectives: [
      'Configure modern code editors (VS Code) with essential extensions, linting, and formatting.',
      'Inspect living DOM elements, CSS styles, and box model metrics in the Elements tab.',
      'Execute JavaScript and debug runtime exceptions in the Browser Console.',
      'Monitor HTTP network requests, payloads, status codes, and timing in the Network tab.'
    ],
    sections: [
      {
        heading: 'The Modern Code Editor: Visual Studio Code',
        content: `A code editor is a developer\'s primary creative canvas. While word processors (like Microsoft Word) insert invisible rich text formatting codes that destroy programming files, code editors work with pure, unformatted plaintext.

### Essential VS Code Capabilities:
1. **Syntax Highlighting:** Color-codes keywords, variables, strings, and tags, making code readable and typos obvious.
2. **IntelliSense & Autocomplete:** Suggests method names, properties, and variable completions based on TypeScript and language definitions.
3. **Integrated Terminal:** Press \`Ctrl + \`\` (backtick) to open a terminal directly inside your workspace without switching windows.
4. **Git Source Control Integration:** Highlights modified lines in color in the gutter (green for additions, blue for edits).`
      },
      {
        heading: 'Browser Developer Tools: The Inspector & Elements Panel',
        content: `Web browsers include a built-in suite of engineering tools called **Developer Tools (DevTools)**. Press \`F12\` or right-click any element and select **Inspect**.

### The Elements Panel:
* Displays the live, computed in-memory **Document Object Model (DOM)**.
* **Editing on the Fly:** You can double-click any HTML tag, attribute, or text string to modify it live on screen.
* **The Styles Sub-Panel:** Shows every CSS rule applying to the selected element, with strikethroughs showing rules overridden by higher specificity.
* **The Interactive Box Model Widget:** Scroll to the bottom of the Styles panel to see the exact pixel measurements of the selected element\'s Content, Padding, Border, and Margin.`
      },
      {
        heading: 'The Console Panel: Execution and Debugging',
        content: `The **Console tab** provides a Read-Eval-Print Loop (REPL) directly inside the live browser runtime:
* **Logging:** JavaScript statements like \`console.log("Status:", response.status)\` output here.
* **Error Inspection:** Red error messages provide the exact file name and line number where an unhandled exception occurred. Clicking the file link opens the code directly in the Sources panel!
* **Live Experimentation:** You can test expressions or inspect variables in real time (e.g., typing \`document.title\` or evaluating mathematical calculations).`
      },
      {
        heading: 'The Network Panel: Diagnosing API Requests',
        content: `The **Network tab** records every single HTTP transaction between the browser and remote servers:
* **Filter by Type:** Filter by Fetch/XHR (API calls), JS, CSS, Img, or Doc.
* **Inspect Payloads:** Click any API request to inspect the Headers, the JSON request payload sent to the server, and the JSON response returned by the backend.
* **Waterfall Timings:** Identify slow API endpoints and database bottlenecks.`
      }
    ],
    commonMistakes: [
      {
        mistake: 'Editing HTML/CSS in DevTools and expecting changes to save permanently to disk.',
        whyItHappens: 'DevTools edits modify only the browser\'s temporary in-memory DOM.',
        howToFix: 'Use DevTools for rapid prototyping, then copy your verified changes back to your source code files in VS Code.'
      },
      {
        mistake: 'Ignoring red Console errors during development.',
        whyItHappens: 'Assuming warnings don\'t matter if parts of the page still render.',
        howToFix: 'Always investigate console errors immediately. A failed API call or undefined variable in one component can crash adjacent components.'
      },
      {
        mistake: 'Leaving "Disable cache" unchecked in Network DevTools during active frontend development.',
        whyItHappens: 'Browser caches old JavaScript bundles, making recent code edits seem not to work.',
        howToFix: 'Keep the Network tab open with "Disable cache" checked to guarantee you are always testing the freshest code.'
      }
    ],
    guidedExercise: {
      title: 'Debug a Broken Button and Inspect Network Payloads',
      difficulty: 'Beginner',
      instructions: 'Open your browser DevTools Console and Network tab. Follow the steps below to identify a simulated runtime error and inspect an outgoing HTTP request.',
      starterCode: `// SIMULATED DEBUGGING WORKFLOW:
// 1. Open Console tab (F12)
// 2. Type: console.log("Current document title:", document.title);
// 3. Type: document.querySelector('h1').style.color = 'blue';
// 4. Observe the DOM change live in the window!`,
      tasks: [
        'Open the browser Developer Tools using F12 or right-click -> Inspect.',
        'Locate the <h1> element in the Elements tab and inspect its computed box model.',
        'In the Console tab, inspect document.location.href.',
        'Identify where to view outgoing REST API JSON payloads in the Network tab.'
      ],
      hints: [
        'The Elements tab highlights selected elements on the live screen with colored overlays.',
        'In the Network tab, clicking a row opens tabs: Headers, Preview, Response, and Timing.'
      ],
      solution: `// VERIFIED DEVTOOLS WORKFLOW:
// 1. Elements tab allows real-time inspection of live DOM nodes and computed styles.
// 2. Console tab executes JavaScript in the current page context and reports errors.
// 3. Network tab displays HTTP status codes (200, 404, 500) and API JSON payloads.`,
      solutionExplanation: 'Mastery of browser DevTools allows frontend engineers to diagnose layout glitches, inspect API communications, and debug runtime exceptions in seconds.'
    },
    quiz: [
      {
        question: 'What happens when you edit an HTML tag directly inside the browser DevTools Elements panel?',
        options: [
          'It permanently updates the original source code file on your hard drive.',
          'It updates only the temporary in-memory DOM in the browser window; changes revert upon reloading the page.',
          'It emails the website administrator.',
          'It causes an immediate browser crash.'
        ],
        correctIndex: 1,
        explanation: 'DevTools operates strictly on the live in-memory DOM tree of the current browser session. Reloading the page fetches a fresh copy of the source code.'
      },
      {
        question: 'Which browser DevTools tab should you inspect if a button click fails to load data from the backend API?',
        options: [
          'Memory tab',
          'Network tab and Console tab',
          'Security tab',
          'Lighthouse tab'
        ],
        correctIndex: 1,
        explanation: 'The Network tab shows the outgoing HTTP request and server status code, while the Console tab displays any JavaScript runtime exceptions or fetch errors.'
      },
      {
        question: 'In the DevTools Styles panel, what does a strikethrough line across a CSS property mean?',
        options: [
          'The property has been deprecated by the W3C.',
          'The property is currently being overridden by another rule with higher specificity or later source order.',
          'The property is causing a memory leak.',
          'The property is encrypted.'
        ],
        correctIndex: 1,
        explanation: 'Strikethrough styling indicates that the rule was successfully parsed, but has been overridden by a conflicting rule according to the Cascade algorithm.'
      }
    ],
    takeaways: [
      'VS Code provides syntax highlighting, IntelliSense, integrated terminals, and Git tracking.',
      'DevTools Elements tab lets you inspect and manipulate live DOM nodes and the CSS Box Model.',
      'The Console tab evaluates JavaScript live, logs diagnostics, and pinpoints runtime exceptions.',
      'The Network tab records HTTP requests, response headers, status codes, and JSON payloads.',
      'Always test with "Disable cache" enabled in DevTools to ensure you test fresh code.'
    ],
    caseStudyReference: {
      title: 'Frontend Debugging Configurations in CRP India',
      description: 'Review the ESLint, Prettier, and Vite configuration files in CRP India that enforce code quality and hot module replacement.',
      files: [
        'reference-projects/CRP-India/frontend/vite.config.js',
        'reference-projects/CRP-India/frontend/package.json'
      ]
    }
  }
};
