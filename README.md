# Divyanshi Rajwansh — Personal Portfolio Website

A personal portfolio website for **Divyanshi Rajwansh**, B.Tech student in Computer Science and Engineering at JECRC University, Jaipur, aspiring software engineer, and digital content creator.

Designed with an editorial, coastal-inspired Pinterest aesthetic (periwinkle blue `#B9C8F0`, soft sea-glass `#D8EDF0`, warm sand beige `#E8DCC8`, soft ivory `#FFFDF7`, and deep blue-grey text `#30394B`), this portfolio unites technical coursework, algorithmic problem-solving, and creative campus storytelling.

---

## ✨ Features

1. **Editorial Coastal Brand Identity & Hero**
   - Elegant typography pairing Playfair Display editorial serif with clean Plus Jakarta Sans.
   - Main Tagline: *“Where technology meets creativity, and every idea holds a little sunshine.”*
   - Supporting Line: *“Learning to build with code, creating with purpose, and finding a little magic in the process.”*
   - Straightforward portrait replacement via `images/profile-placeholder.jpg` with a warm halo effect.

2. **Five Mandatory Project Entries with Real-time Search & Filter**
   - **Project 1: Python Programs Collection** (Factorial recursion/iteration, memoized Fibonacci, structure-to-dictionary conversion).
   - **Project 2: Messy Python Code Improvement** (AI-assisted refactoring, PEP 8 compliance, explicit type hinting).
   - **Project 3: Bug Fixing Using Cursor AI** (Off-by-one boundary bug diagnosis and surgical patch verification).
   - **Project 4: Interactive Quiz Application** (Lecture 10 practical with playable Tech & GK questions).
   - **Project 5: Book Reading List Application** (Lecture 11 practical with status tabs and persistent localStorage).
   - Real-time search by title, description, or tag (e.g. typing `"Python"`, `"Quiz"`, or `"Book"` updates the grid instantly).
   - Category filtering pills (`All`, `Python Algorithms`, `AI & Debugging`, `Web & Practicals`) working in conjunction with live search.
   - Built-in interactive modal demonstrations (live algorithm calculator, code diff viewer, playable quiz runner, and reading tracker).

3. **Full Light & Dark Mode System**
   - Seamless toggle between soft ivory/beige (light) and deep blue-grey (dark).
   - Persists user selection in `localStorage`.
   - Automatically detects and respects the OS `prefers-color-scheme` on first visit.
   - Accessible button states with `aria-pressed` and `aria-label`.

4. **Sky: Positive AI Portfolio Chatbot**
   - Name: **Sky** ☀️.
   - Warm, encouraging, kind, and optimistic companion grounded in verified portfolio data (`data/portfolio-context.json`).
   - Welcoming greeting and 9 instant question chips.
   - Never invents facts, awards, or false experience; acknowledges gracefully when an answer is not in the verified data.
   - Clean security architecture: client calls server-side endpoint `/api/chat` with zero client-side secret keys.
   - Built-in grounded fallback engine ensures Sky answers questions accurately even when testing offline or without an active API key.

5. **Creator Assets Showcase (`assets.html`)**
   - Dedicated showcase of design boards, reel concepts, script drafts, and creative software stack (DaVinci Resolve / Premiere, Canva, Figma, Notion).

6. **Validated Contact Section**
   - Client-side validation for name, email format, and message length.
   - Honest feedback mechanism with a direct `mailto:` action pre-populating recipient `divyanshirajwansh@gmail.com`.

---

## 🧰 Technologies Used

- **Markup & Structure:** Semantic HTML5 (`<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`)
- **Styling:** Vanilla CSS3 with CSS Custom Properties (Design Tokens), Flexbox, CSS Grid, Glassmorphism, and `@media (prefers-reduced-motion)`
- **Logic & Interactions:** Modern JavaScript (ES6+), DOM APIs, `localStorage`, `IntersectionObserver`
- **Typography:** Google Fonts (*Playfair Display*, *Plus Jakarta Sans*, *JetBrains Mono*)
- **Deployment & Serverless:** Vercel Static Hosting & Node.js Serverless Functions (`api/chat.js`)

---

## 📁 Project Structure

```text
c:\Portfolio\
├── index.html                  # Main editorial portfolio page
├── assets.html                 # Creator assets & video/design showcase
├── vercel.json                 # Vercel deployment & serverless routing config
├── .env.example                # Safe environment variable placeholders
├── .gitignore                  # Git exclusions for secrets & temp files
├── README.md                   # Complete documentation & run guide
├── css/
│   ├── design-tokens.css       # Palette variables, radii, shadows, fonts
│   ├── base.css                # Reset, base typography, accessibility utils
│   ├── components.css          # Cards, buttons, search toolbar, modal overlays
│   ├── chat.css                # Sky AI chatbot floating widget & messages
│   └── responsive.css          # Mobile drawer & breakpoint optimizations
├── js/
│   ├── theme.js                # Theme switcher with localStorage & OS sync
│   ├── projects-data.js        # Data schema for 5 coursework projects
│   ├── projects.js             # Live search, category filtering & modal runners
│   ├── contact.js              # Form validation & honest mailto generator
│   ├── sky-chat.js             # Sky AI chatbot client & grounded fallback engine
│   └── main.js                 # Mobile menu toggle & scroll observers
├── api/
│   └── chat.js                 # Vercel serverless function for AI chatbot
├── data/
│   └── portfolio-context.json  # Grounded knowledge base for Sky AI
└── images/
    ├── profile-placeholder.jpg # Editorial photograph placeholder
    ├── sunshine.svg            # Radiant coastal sun motif
    ├── sparkle.svg             # 4-point editorial sparkle motif
    ├── project-python.svg      # Python collection preview
    ├── project-refactor.svg    # Refactored code comparison preview
    ├── project-cursor.svg      # Cursor AI debugging session preview
    ├── project-quiz.svg        # Interactive quiz card preview
    └── project-reading.svg     # Book reading tracker preview
```

---

## 🚀 Local Installation & Running

The portfolio is built with pure Vanilla web standards and requires zero node module builds to preview locally.

### Option 1: Python HTTP Server (Recommended)
From the project root:
```bash
python -m http.server 8000
```
Open your browser and navigate to:
```text
http://localhost:8000
```

### Option 2: Direct Browser
You can open `index.html` directly in any modern browser.

---

## ⚙️ Environment Variables & Secure Chatbot Setup

### Security Principles
- **No private API keys are ever stored in frontend HTML, CSS, or JavaScript files.**
- Keys are kept server-side inside environment variables and read only by the Vercel serverless function `api/chat.js`.
- `.env` is excluded in `.gitignore` to prevent leaking secrets to GitHub.

### Setup Steps for Vercel
1. Duplicate `.env.example` to create your local `.env` (for local serverless testing):
   ```bash
   cp .env.example .env
   ```
2. Insert your preferred API key into `.env`:
   - `GEMINI_API_KEY`: Google Gemini 1.5 Flash API key (obtain from Google AI Studio).
   - **OR** `OPENAI_API_KEY`: OpenAI API key.
3. When deploying to Vercel, open your project dashboard under **Settings → Environment Variables** and add:
   - Key: `GEMINI_API_KEY` (or `OPENAI_API_KEY`)
   - Value: *(your secret key)*
   - Environments: Production, Preview, Development

> **Note:** If no API key is configured, Sky's intelligent client-side grounded engine takes over automatically, ensuring visitors still receive cheerful, 100% accurate answers based on Divyanshi's verified portfolio context.

---

## 🌐 GitHub & Vercel Deployment Guide

### Publishing to GitHub
1. Initialize Git in the project root:
   ```bash
   git init
   git add .
   git commit -m "feat: complete editorial portfolio with Sky AI and project search"
   ```
2. Link to your GitHub repository:
   ```bash
   git remote add origin https://github.com/divyanshirajwansh-svg/Portfolio.git
   git branch -M main
   git push -u origin main
   ```

### Deploying to Vercel
1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **Add New → Project**.
3. Select your `Portfolio` repository from GitHub.
4. Framework Preset: **Other** (Static HTML).
5. Build Command: Leave blank.
6. Output Directory: `./` (Root directory).
7. Under **Environment Variables**, optionally provide `GEMINI_API_KEY`.
8. Click **Deploy**.

- **GitHub Repository:** [https://github.com/divyanshirajwansh-svg/Portfolio](https://github.com/divyanshirajwansh-svg/Portfolio)
- **Live Vercel URL:** *(Will appear after importing into Vercel)*

---

## 📋 Demonstration Checklist for Assessment

- [x] **Theme Switcher:** Toggles between soft ivory and deep blue-grey; persists after browser refresh.
- [x] **Real-time Project Search:**
  - Type `"Python"` → displays Python Programs Collection and Messy Python Code Improvement.
  - Type `"Quiz"` → displays Interactive Quiz Application.
  - Type `"Book"` → displays Book Reading List Application.
  - Clear button resets search instantly.
- [x] **Interactive Modals:**
  - Click *“Live Algorithm Demo”* on Project 1 to compute factorials and generate Fibonacci series in real-time.
  - Click *“View Before / After Diff”* on Project 2 to see the PEP 8 refactoring breakdown.
  - Click *“Inspect Bug & Fix”* on Project 3 to see the Cursor AI off-by-one boundary resolution.
  - Click *“Play Interactive Quiz”* on Project 4 to take the playable 5-question tech quiz with live scoring.
  - Click *“Open Reading Tracker”* on Project 5 to add books and switch status with localStorage persistence.
- [x] **Sky AI Chatbot:**
  - Tap floating launcher `☀️ Chat with Sky` to open the chat window.
  - Test greetings and suggested question chips.
  - Ask an unavailable question (e.g., *"What is her dog's name?"*) → Sky politely explains that the detail is not in the verified portfolio and does not hallucinate.
- [x] **Contact Validation:** Try submitting invalid fields to see error messages; submit valid input to receive honest validation feedback with pre-filled `mailto:` delivery.
- [x] **Responsive Mobile Layout:** Navigation transforms into accessible hamburger menu and chatbot transforms into bottom sheet on smaller screens.
