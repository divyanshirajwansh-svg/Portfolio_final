/**
 * PROJECTS DATA - DIVYANSHI RAJWANSH PORTFOLIO
 * Five Mandatory Coursework & Practical Projects with Personal Story Notes
 */

window.PORTFOLIO_PROJECTS = [
  {
    id: "python-collection",
    title: "Python Programs Collection",
    category: "python",
    image: "images/project-python.svg",
    imageAlt: "Python algorithms illustration with Fibonacci spiral and code editor",
    tags: ["Python", "Algorithms", "Data Structures", "Git"],
    shortDesc: "Core algorithmic collection implementing recursive & iterative factorials, dynamic Fibonacci generation with memoization, and structure-to-dictionary transformations.",
    personalNote: "Factorials and Fibonacci are rite-of-passage algorithms, but figuring out memoization felt like discovering a quiet superpower.",
    fullDesc: "This repository consolidates fundamental Python algorithms and data structure manipulation exercises. It features boundary-checked factorial computation (comparing iteration vs recursion), an optimized Fibonacci series generator with memoization to avoid redundant computations, and a tuple/nested-record parser converting raw data structures into clean JSON-serializable dictionaries.",
    repoUrl: "https://github.com/divyanshirajwansh-svg/Python-programs-collection-",
    demoAction: "view-python-demo",
    demoLabel: "Live Algorithm Demo"
  },
  {
    id: "python-refactor",
    title: "Messy Python Code Improvement",
    category: "python",
    image: "images/project-refactor.svg",
    imageAlt: "Before and after comparison of messy tangled code refactored into modular functions",
    tags: ["Python", "AI Refactoring", "PEP 8", "Clean Code"],
    shortDesc: "AI-assisted restructuring of a monolithic legacy Python script into modular, PEP 8-compliant functions with explicit type hinting and exception safeguards.",
    personalNote: "There's something deeply satisfying about taking tangled, chaotic code and making it read like clean poetry.",
    fullDesc: "Demonstrates practical AI-assisted code refinement. An unformatted, monolithic script with global state and magic constants was re-architected into modular, single-responsibility functions. The resulting implementation includes Python typing hints, docstrings, standardized snake_case identifiers, and defensive error handling.",
    repoUrl: "https://github.com/divyanshirajwansh-svg/Messy-code-python",
    demoAction: "view-refactor-diff",
    demoLabel: "View Before / After Diff"
  },
  {
    id: "cursor-debugging",
    title: "Bug Fixing Using Cursor AI",
    category: "ai",
    image: "images/project-cursor.svg",
    imageAlt: "Cursor AI code editor highlighting index boundary exception and suggesting fix",
    tags: ["Cursor AI", "Debugging", "Prompt Engineering", "Python"],
    shortDesc: "Diagnosis and remediation of subtle off-by-one errors and zero-length input edge cases using Cursor AI's context-aware codebase analysis.",
    personalNote: "Teaching an AI the exact boundary failure by crafting precise prompts taught me more about edge cases than reading any textbook.",
    fullDesc: "Explores the developer ergonomics of Cursor AI for debugging. By supplying runtime trace logs and targeted test assertions to Cursor's AI inspector, an off-by-one boundary failure in a list partitioning algorithm was isolated. The fix was applied cleanly, accompanied by comprehensive boundary condition tests.",
    repoUrl: "https://github.com/divyanshirajwansh-svg/Buggy-Code-",
    demoAction: "view-debug-walkthrough",
    demoLabel: "Inspect Bug & Fix"
  },
  {
    id: "interactive-quiz",
    title: "Interactive Quiz Application",
    category: "web",
    image: "images/project-quiz.svg",
    imageAlt: "Interactive quiz card with question, options, progress counter and score display",
    tags: ["JavaScript", "HTML5", "CSS3", "Lecture 10"],
    shortDesc: "Dynamic web quiz application engineered in Lecture 10, featuring Tech & GK question banks, real-time feedback, and accessible keyboard navigation.",
    personalNote: "Built during Lecture 10 — I wanted it to feel snappy, cheerful, and encouraging rather than an intimidating classroom test.",
    fullDesc: "Created during Lecture 10 practical sessions, this application delivers a fun, interactive test of knowledge. Features include question pools covering Computer Science essentials (CPU, HTTP, OS, AI) and General Knowledge, immediate visual feedback upon option selection, and an end-of-quiz score summary with encouragement.",
    repoUrl: "https://github.com/divyanshirajwansh-svg/Interactive-Quiz-",
    demoAction: "play-quiz-demo",
    demoLabel: "Play Interactive Quiz"
  },
  {
    id: "reading-list",
    title: "Book Reading List Application",
    category: "web",
    image: "images/project-reading.svg",
    imageAlt: "Book reading list tracker UI showing reading statuses and filtered tabs",
    tags: ["JavaScript", "LocalStorage", "Lecture 11", "Web App"],
    shortDesc: "Personal reading list manager developed in Lecture 11 with status filtering ('To Read', 'Reading', 'Finished') and persistent browser storage.",
    personalNote: "As someone who hoards book recommendations and Pinterest quotes like physical treasures, building this was 100% personal.",
    fullDesc: "A complete client-side productivity tool built for Lecture 11. It lets readers track books, update reading progress across three distinct lifecycle stages, attach custom notes or ratings, and automatically synchronize changes to browser localStorage so data survives page reloads.",
    repoUrl: "https://github.com/divyanshirajwansh-svg/reading-list-app",
    demoAction: "open-reading-app",
    demoLabel: "Open Reading Tracker"
  }
];
