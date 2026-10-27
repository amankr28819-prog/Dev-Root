/**
 * Dev-root Course 8: Git, GitHub, and Collaboration - Deep Learning Curriculum
 * Comprehensive lessons covering version control, commits, branches, remotes, and merges.
 */

export const GIT_COLLABORATION_LESSONS = {
  'git-fundamentals-and-commits': {
    id: 'lesson-8-1',
    slug: 'git-fundamentals-and-commits',
    courseId: 'course-8',
    courseSlug: 'git-and-github',
    courseTitle: 'Course 8: Git, GitHub, and Collaboration',
    title: 'Version Control, The Three Trees & Atomic Commits',
    category: 'Tooling',
    estimatedTime: '35 min read & practice',
    objectives: [
      'Understand how distributed version control tracks chronological changes without overwriting work.',
      'Master the Three Trees of Git: Working Directory, Staging Area (Index), and Git Repository (.git).',
      'Craft meaningful, atomic commits with descriptive commit messages following Conventional Commits.',
      'Inspect repository status, history logs, and file differences using git status, git log, and git diff.',
      'Explain how remote repositories (GitHub) synchronize with local repositories via fetch, pull, and push.'
    ],
    sections: [
      {
        heading: 'Why Version Control is Essential for Software Engineering',
        content: `Before Version Control Systems (VCS) like Git existed, software developers tracked changes by copying folders with names like \`project-final\`, \`project-final-v2\`, and \`project-final-actual-final\`. This approach caused catastrophic data loss, made collaboration impossible, and provided zero audit trails of who made what change and why.

### What Git Provides:
1. **Time Travel:** A complete, cryptographic, chronological ledger of every single modification made to the codebase since day one. You can inspect or restore any historical snapshot in seconds.
2. **Branching & Isolation:** Developers can work on experimental features or bug fixes in parallel on isolated branches without destabilizing the production \`main\` codebase.
3. **Collaboration:** Multiple software engineers across the globe can modify the same files simultaneously and merge their changes safely.`
      },
      {
        heading: 'The Three Trees Architecture: Working Directory, Index & Repo',
        content: `To understand Git, you must understand how files transition between its three internal areas:

\`\`\`
  +-------------------------------------------------------------------------+
  | 1. WORKING DIRECTORY                                                    |
  |    - The actual physical files on your hard drive you edit in VS Code   |
  |    - Files can be: Untracked, Modified, or Unmodified                   |
  +-------------------------------------------------------------------------+
                                    |
                            [ git add <file> ]
                                    v
  +-------------------------------------------------------------------------+
  | 2. STAGING AREA (The Index)                                             |
  |    - The preparation room for your next snapshot                        |
  |    - Allows bundling only related changes into an atomic commit         |
  +-------------------------------------------------------------------------+
                                    |
                       [ git commit -m "message" ]
                                    v
  +-------------------------------------------------------------------------+
  | 3. LOCAL REPOSITORY (.git directory)                                    |
  |    - The permanent database of committed snapshots (commit objects)     |
  |    - Each commit has a unique SHA-1/SHA-256 cryptographic hash          |
  +-------------------------------------------------------------------------+
\`\`\`

* **Working Directory:** The local folder on your computer where you write code.
* **Staging Area:** A staging buffer where you curate changes before committing. This allows you to edit 5 files, but stage and commit only 2 files that belong together.
* **Repository (.git):** The permanent database storing commit snapshots, author metadata, and branch pointers.`
      },
      {
        heading: 'Atomic Commits and Conventional Commit Messages',
        content: `A **commit** in Git is an immutable snapshot of your entire project at a specific point in time, paired with an author, timestamp, parent pointer, and descriptive message.

### What is an "Atomic Commit"?
An atomic commit is a self-contained unit of work that does **one logical thing**.
* **BAD:** Editing CSS styles, fixing an authentication bug, and refactoring a database model all combined in a single commit with message: \`"updates"\`. If the authentication fix breaks, you cannot roll it back without accidentally destroying your CSS and database work too!
* **GOOD:** Three separate, atomic commits:
  1. \`fix(auth): prevent token expiration crash on citizen login\`
  2. \`style(cards): adjust grievance priority badge padding\`
  3. \`refactor(db): add index on complaintId field\`

### The Conventional Commits Specification:
Adopted widely across industry open-source projects:
* \`feat: ...\`: A new user-facing feature.
* \`fix: ...\`: A bug fix.
* \`docs: ...\`: Documentation changes only.
* \`refactor: ...\`: Code change that neither fixes a bug nor adds a feature.
* \`test: ...\`: Adding or correcting unit tests.`
      },
      {
        heading: 'Core Git Workflow Commands',
        content: `\`\`\`bash
# 1. Check current repository status (shows untracked and modified files)
git status

# 2. Stage specific modified files for the next commit
git add src/components/GrievanceCard.jsx

# 3. Create an atomic commit with descriptive message
git commit -m "feat(cards): display grievance priority badge"

# 4. View concise commit history log
git log --oneline -n 5

# 5. Push local commits to remote GitHub repository
git push origin main
\`\`\``
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using git add . blindly without reviewing git status first.',
        whyItHappens: 'Typing git add . is fast and easy.',
        howToFix: 'Running git add . indiscriminately often commits local secrets (.env), temp files, or node_modules! Always check git status first and maintain a .gitignore file.'
      },
      {
        mistake: 'Writing meaningless commit messages like "fix", "changes", or "wip".',
        whyItHappens: 'Rushing to push code without documenting intent.',
        howToFix: 'Write commit messages explaining WHAT changed and WHY. Treat your future self and teammates with professional respect.'
      },
      {
        mistake: 'Committing node_modules or secret credentials into Git.',
        whyItHappens: 'Forgetting to create a .gitignore file before the first commit.',
        howToFix: 'Always include node_modules/ and .env in your .gitignore file.'
      }
    ],
    guidedExercise: {
      title: 'Practice Staging and Committing an Atomic Change',
      difficulty: 'Beginner',
      instructions: 'Review the simulated repository state below. Write the exact Git commands required to stage only the bug fix file, commit it with a Conventional Commit message, and inspect the log.',
      starterCode: `# MODIFIED FILES IN WORKING DIRECTORY:
# 1. src/auth/login.js   (Contains critical login null-pointer bug fix)
# 2. src/styles/theme.css (Unfinished experimental color changes)
# 3. .env                (Local secret keys - DO NOT COMMIT!)

# TODO: Write commands to commit only the login fix safely`,
      tasks: [
        'Check repository status to view all modified and untracked files.',
        'Stage only src/auth/login.js, leaving unfinished files unstaged.',
        'Commit the staged fix with a Conventional Commit message.',
        'Verify the commit appears in git log.'
      ],
      hints: [
        'Use git status first to verify changes.',
        'Do NOT use git add . because it would stage the unfinished CSS and private .env!',
        'Stage specifically: git add src/auth/login.js.'
      ],
      solution: `# 1. Review status
git status

# 2. Stage ONLY the specific file containing the bug fix
git add src/auth/login.js

# 3. Commit with descriptive Conventional Commit message
git commit -m "fix(auth): resolve null pointer exception when citizen email is undefined"

# 4. Verify commit log
git log -n 1 --oneline`,
      solutionExplanation: 'By staging only the intended file, the developer creates an atomic commit that can be safely reviewed, cherry-picked, or rolled back without polluting history with unfinished CSS experiments.'
    },
    quiz: [
      {
        question: 'What is the role of the "Staging Area" (Index) in Git?',
        options: [
          'It is where deleted files are stored before emptying the trash.',
          'It acts as an intermediate curation buffer where developers select and group specific changes before permanently committing them.',
          'It is the remote GitHub website server.',
          'It compiles TypeScript files into JavaScript.'
        ],
        correctIndex: 1,
        explanation: 'The Staging Area lets you selectively choose which modifications to include in your next snapshot, enabling clean, atomic commits.'
      },
      {
        question: 'What is an "atomic commit" in software engineering?',
        options: [
          'A commit that contains every file modified over an entire month.',
          'A single, self-contained commit that addresses one specific logical change, feature, or bug fix.',
          'A commit that deletes the entire repository.',
          'A commit encrypted with a nuclear quantum algorithm.'
        ],
        correctIndex: 1,
        explanation: 'An atomic commit encapsulates a single logical unit of work. If it causes an issue, it can be reverted cleanly without affecting unrelated code.'
      },
      {
        question: 'Which file should be placed in the project root to prevent Git from tracking dependencies and private environment secrets?',
        options: [
          'package.json',
          'README.md',
          '.gitignore',
          'index.html'
        ],
        correctIndex: 2,
        explanation: 'The .gitignore file lists patterns for files and directories (like node_modules/ and .env) that Git should permanently ignore and never commit.'
      }
    ],
    takeaways: [
      'Git tracks chronological project history across three trees: Working Directory, Staging Area, and Repository.',
      'Always review git status before staging files to avoid committing accidental secrets or unfinished changes.',
      'Make atomic commits: one logical task per commit with a descriptive Conventional Commit message.',
      'Maintain a .gitignore file to prevent large dependency directories (node_modules) and secrets (.env) from entering version control.',
      'Synchronize between local and remote repositories using git fetch, git pull, and git push.'
    ],
    caseStudyReference: {
      title: 'Git Version History and Gitignore in CRP India',
      description: 'Inspect the root .gitignore and atomic commit history of the CRP India reference repository to study professional branch and commit hygiene.',
      files: [
        'reference-projects/CRP-India/.gitignore',
        'reference-projects/CRP-India/package.json'
      ]
    }
  }
};
