/**
 * PROJECTS SEARCH, FILTER & INTERACTIVE DEMO CONTROLLER
 * Handles live search, filter pills, card rendering, and demo modals
 */

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('project-search-input');
  const clearBtn = document.getElementById('project-search-clear');
  const filterPills = document.querySelectorAll('[data-filter-category]');
  const projectsGrid = document.getElementById('projects-grid');
  const emptyState = document.getElementById('projects-empty-state');
  const resultsCounter = document.getElementById('projects-results-counter');
  const modalOverlay = document.getElementById('demo-modal-overlay');
  const modalBody = document.getElementById('demo-modal-body');
  const modalClose = document.getElementById('demo-modal-close');

  let currentCategory = 'all';
  let currentSearchQuery = '';

  // ------------------------------------------------------------------------
  // CARD RENDERING
  // ------------------------------------------------------------------------
  function renderProjects() {
    const query = currentSearchQuery.trim().toLowerCase();
    
    const filtered = window.PORTFOLIO_PROJECTS.filter(project => {
      // Category match
      const matchesCategory = currentCategory === 'all' || 
        (currentCategory === 'python' && project.category === 'python') ||
        (currentCategory === 'ai' && project.category === 'ai') ||
        (currentCategory === 'web' && project.category === 'web');

      // Search match (title, shortDesc, fullDesc, tags)
      const tagsMatch = project.tags.some(tag => tag.toLowerCase().includes(query));
      const titleMatch = project.title.toLowerCase().includes(query);
      const descMatch = project.shortDesc.toLowerCase().includes(query) || project.fullDesc.toLowerCase().includes(query);
      const matchesSearch = !query || titleMatch || descMatch || tagsMatch;

      return matchesCategory && matchesSearch;
    });

    // Update counter
    if (resultsCounter) {
      resultsCounter.textContent = `Showing ${filtered.length} of ${window.PORTFOLIO_PROJECTS.length} projects`;
    }

    // Toggle Empty State
    if (filtered.length === 0) {
      projectsGrid.innerHTML = '';
      emptyState.style.display = 'flex';
      return;
    }

    emptyState.style.display = 'none';

    // Render cards HTML
    projectsGrid.innerHTML = filtered.map(p => `
      <article class="project-card glass-panel" data-id="${p.id}">
        <div class="project-card-banner">
          <img src="${p.image}" alt="${p.imageAlt}" class="project-card-img" loading="lazy" width="400" height="240" />
        </div>
        <div class="project-card-content">
          <ul class="project-tags-list" aria-label="Project technologies">
            ${p.tags.map(t => `<li class="tag-badge">${t}</li>`).join('')}
          </ul>
          <h3 class="project-card-title">${p.title}</h3>
          <p class="project-card-desc">${p.shortDesc}</p>
          <div class="project-card-actions">
            <a href="${p.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" aria-label="View ${p.title} on GitHub">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.52 1.03 1.52 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.1.39-1.99 1.03-2.7-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.7.11 2.5.32 1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.71 1.03 1.6 1.03 2.7 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86v2.76c0 .26.18.58.69.48A10 10 0 0 0 12 2z" />
              </svg>
              View Repository
            </a>
            <button type="button" class="btn btn-primary btn-sm" data-demo-btn="${p.demoAction}" data-project-id="${p.id}" aria-label="${p.demoLabel} for ${p.title}">
              <span>✨</span> ${p.demoLabel}
            </button>
          </div>
        </div>
      </article>
    `).join('');

    // Attach listeners to interactive demo buttons
    const demoBtns = projectsGrid.querySelectorAll('[data-demo-btn]');
    demoBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-demo-btn');
        const projId = btn.getAttribute('data-project-id');
        openDemoModal(action, projId);
      });
    });
  }

  // ------------------------------------------------------------------------
  // SEARCH & FILTER LISTENERS
  // ------------------------------------------------------------------------
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value;
      if (clearBtn) {
        clearBtn.classList.toggle('visible', currentSearchQuery.length > 0);
      }
      renderProjects();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      currentSearchQuery = '';
      clearBtn.classList.remove('visible');
      searchInput.focus();
      renderProjects();
    });
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.getAttribute('data-filter-category');
      renderProjects();
    });
  });

  // ------------------------------------------------------------------------
  // MODAL CONTROLS & DEMOS
  // ------------------------------------------------------------------------
  function openDemoModal(action, projId) {
    const project = window.PORTFOLIO_PROJECTS.find(p => p.id === projId);
    if (!project || !modalOverlay || !modalBody) return;

    let modalHTML = '';

    switch (action) {
      case 'view-python-demo':
        modalHTML = getPythonDemoHTML(project);
        break;
      case 'view-refactor-diff':
        modalHTML = getRefactorDiffHTML(project);
        break;
      case 'view-debug-walkthrough':
        modalHTML = getDebugWalkthroughHTML(project);
        break;
      case 'play-quiz-demo':
        modalHTML = getQuizRunnerHTML(project);
        break;
      case 'open-reading-app':
        modalHTML = getReadingListHTML(project);
        break;
      default:
        modalHTML = `<h3>${project.title}</h3><p>${project.fullDesc}</p>`;
    }

    modalBody.innerHTML = modalHTML;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Post-render attachments for interactive modals
    if (action === 'view-python-demo') initPythonDemoInteractivity();
    if (action === 'play-quiz-demo') initQuizInteractivity();
    if (action === 'open-reading-app') initReadingListInteractivity();
  }

  function closeDemoModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeDemoModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeDemoModal();
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeDemoModal();
      }
    });
  }

  // ------------------------------------------------------------------------
  // DEMO 1: PYTHON ALGORITHMS RUNNER
  // ------------------------------------------------------------------------
  function getPythonDemoHTML(p) {
    return `
      <div class="demo-modal-header">
        <span class="badge" style="background:var(--accent-subtle); color:var(--accent-primary); padding:4px 10px; border-radius:99px; font-weight:700;">LIVE CODE DEMO</span>
        <h3 style="margin-top:8px;">${p.title}</h3>
        <p style="color:var(--text-secondary); font-size:0.95rem;">Test the core algorithmic implementations right in your browser:</p>
      </div>

      <div style="background:var(--bg-card-subtle); padding:16px; border-radius:12px; margin-bottom:16px; border:1px solid var(--border-color);">
        <label style="font-weight:700; font-size:0.875rem; display:block; margin-bottom:6px;">1. Factorial Calculator (n!)</label>
        <div style="display:flex; gap:8px;">
          <input type="number" id="py-factorial-input" value="5" min="0" max="20" style="padding:8px 12px; border-radius:8px; border:1px solid var(--border-color); width:100px; background:var(--bg-primary); color:var(--text-primary);" />
          <button type="button" id="py-factorial-btn" class="btn btn-secondary btn-sm">Compute Factorial</button>
        </div>
        <div id="py-factorial-output" style="margin-top:8px; font-family:var(--font-mono); font-size:0.85rem; color:var(--accent-primary); font-weight:600;">Result: 5! = 120</div>
      </div>

      <div style="background:var(--bg-card-subtle); padding:16px; border-radius:12px; margin-bottom:16px; border:1px solid var(--border-color);">
        <label style="font-weight:700; font-size:0.875rem; display:block; margin-bottom:6px;">2. Fibonacci Series Generator (Memoized)</label>
        <div style="display:flex; gap:8px;">
          <input type="number" id="py-fibo-input" value="8" min="1" max="25" style="padding:8px 12px; border-radius:8px; border:1px solid var(--border-color); width:100px; background:var(--bg-primary); color:var(--text-primary);" />
          <button type="button" id="py-fibo-btn" class="btn btn-secondary btn-sm">Generate Series</button>
        </div>
        <div id="py-fibo-output" style="margin-top:8px; font-family:var(--font-mono); font-size:0.85rem; color:var(--accent-primary); font-weight:600;">Series: 0, 1, 1, 2, 3, 5, 8, 13</div>
      </div>

      <div style="background:var(--bg-card-subtle); padding:16px; border-radius:12px; border:1px solid var(--border-color);">
        <label style="font-weight:700; font-size:0.875rem; display:block; margin-bottom:6px;">3. Structure to Dictionary Parser</label>
        <div style="font-family:var(--font-mono); font-size:0.82rem; background:var(--bg-primary); padding:10px; border-radius:6px; border:1px solid var(--border-color); color:var(--text-primary);">
          [("student", "Divyanshi"), ("univ", "JECRC"), ("status", "Enrolled")]
          <br/><strong style="color:var(--accent-primary);">→ Parsed Dict:</strong> {"student": "Divyanshi", "univ": "JECRC", "status": "Enrolled"}
        </div>
      </div>
    `;
  }

  function initPythonDemoInteractivity() {
    const factBtn = document.getElementById('py-factorial-btn');
    const factInput = document.getElementById('py-factorial-input');
    const factOut = document.getElementById('py-factorial-output');

    if (factBtn && factInput && factOut) {
      factBtn.addEventListener('click', () => {
        const n = parseInt(factInput.value, 10);
        if (isNaN(n) || n < 0 || n > 25) {
          factOut.textContent = "Please enter an integer between 0 and 25.";
          return;
        }
        let res = 1n;
        for (let i = 2n; i <= BigInt(n); i++) res *= i;
        factOut.textContent = `Result: ${n}! = ${res.toString()}`;
      });
    }

    const fiboBtn = document.getElementById('py-fibo-btn');
    const fiboInput = document.getElementById('py-fibo-input');
    const fiboOut = document.getElementById('py-fibo-output');

    if (fiboBtn && fiboInput && fiboOut) {
      fiboBtn.addEventListener('click', () => {
        const n = parseInt(fiboInput.value, 10);
        if (isNaN(n) || n < 1 || n > 30) {
          fiboOut.textContent = "Please enter an integer between 1 and 30.";
          return;
        }
        const series = [0, 1];
        while (series.length < n) {
          series.push(series[series.length - 1] + series[series.length - 2]);
        }
        fiboOut.textContent = `Series: ${series.slice(0, n).join(', ')}`;
      });
    }
  }

  // ------------------------------------------------------------------------
  // DEMO 2: REFACTOR BEFORE & AFTER DIFF
  // ------------------------------------------------------------------------
  function getRefactorDiffHTML(p) {
    return `
      <div>
        <span class="badge" style="background:var(--accent-subtle); color:var(--accent-primary); padding:4px 10px; border-radius:99px; font-weight:700;">AI REFACTORING COMPARISON</span>
        <h3 style="margin-top:8px;">${p.title}</h3>
        <p style="color:var(--text-secondary); font-size:0.95rem;">
          Demonstration of code cleanliness: Transforming unstructured legacy logic into modular, type-safe PEP 8 functions.
        </p>

        <div style="margin-top:16px;">
          <h4 style="color:#B24C53; font-size:0.9rem; font-family:var(--font-sans); margin-bottom:4px;">❌ BEFORE: Unstructured Monolithic Code</h4>
          <pre class="code-diff-wrapper">
<span class="diff-del"># Global scope, unhandled exceptions, magic constants</span>
<span class="diff-del">d = [10, 20, 30, 40]</span>
<span class="diff-del">t = 0</span>
<span class="diff-del">for x in d:</span>
<span class="diff-del">    t = t + x</span>
<span class="diff-del">avg = t / 4   # Crashes if empty! Magic number 4</span>
<span class="diff-del">print("Average is: " + str(avg))</span>
          </pre>

          <h4 style="color:#2E7D52; font-size:0.9rem; font-family:var(--font-sans); margin-bottom:4px; margin-top:16px;">✓ AFTER: AI-Refactored Modular Implementation</h4>
          <pre class="code-diff-wrapper">
<span class="diff-add">from typing import Sequence, Optional</span>

<span class="diff-add">def calculate_average(numbers: Sequence[float]) -> Optional[float]:</span>
<span class="diff-add">    """Calculate arithmetic mean with boundary validation."""</span>
<span class="diff-add">    if not numbers:</span>
<span class="diff-add">        return None</span>
<span class="diff-add">    return sum(numbers) / len(numbers)</span>

<span class="diff-add">if __name__ == "__main__":</span>
<span class="diff-add">    dataset = [10.0, 20.0, 30.0, 40.0]</span>
<span class="diff-add">    result = calculate_average(dataset)</span>
<span class="diff-add">    print(f"Average: {result:.2f}")</span>
          </pre>
        </div>
      </div>
    `;
  }

  // ------------------------------------------------------------------------
  // DEMO 3: CURSOR AI BUG FIXING WALKTHROUGH
  // ------------------------------------------------------------------------
  function getDebugWalkthroughHTML(p) {
    return `
      <div>
        <span class="badge" style="background:var(--accent-subtle); color:var(--accent-primary); padding:4px 10px; border-radius:99px; font-weight:700;">CURSOR AI DEBUGGING</span>
        <h3 style="margin-top:8px;">${p.title}</h3>
        <p style="color:var(--text-secondary); font-size:0.95rem;">
          How Cursor AI identified an edge-case boundary bug and generated an immediate patch:
        </p>

        <div style="background:var(--bg-card-subtle); padding:16px; border-radius:12px; margin:16px 0; border:1px solid var(--border-color);">
          <strong style="color:#B24C53;">The Bug Identified:</strong>
          <p style="font-size:0.875rem; margin-top:4px;">
            A list access helper used <code>while i &lt;= len(items)</code>, triggering an <code>IndexError: list index out of range</code> on the final iteration, and crashed on empty arrays.
          </p>
        </div>

        <pre class="code-diff-wrapper">
<span class="diff-del"># Buggy code:</span>
<span class="diff-del">def find_element(items, target):</span>
<span class="diff-del">    i = 0</span>
<span class="diff-del">    while i &lt;= len(items):       # Off-by-one bug here!</span>
<span class="diff-del">        if items[i] == target:</span>
<span class="diff-del">            return i</span>
<span class="diff-del">        i += 1</span>

<span class="diff-add"># Cursor AI Recommended Fix:</span>
<span class="diff-add">def find_element(items: list, target) -> int:</span>
<span class="diff-add">    """Return index of target or -1 if not found, safe against bounds."""</span>
<span class="diff-add">    for idx, item in enumerate(items):</span>
<span class="diff-add">        if item == target:</span>
<span class="diff-add">            return idx</span>
<span class="diff-add">    return -1</span>
        </pre>
      </div>
    `;
  }

  // ------------------------------------------------------------------------
  // DEMO 4: INTERACTIVE QUIZ RUNNER (Lecture 10)
  // ------------------------------------------------------------------------
  const quizQuestions = [
    {
      q: "What does “CPU” stand for?",
      options: ["Central Process Utility", "Central Processing Unit", "Core Power Unit", "Central Program Utility"],
      correct: 1
    },
    {
      q: "What does “HTTP” stand for?",
      options: ["Hyper Text Transfer Protocol", "High Traffic Terminal Protocol", "Hyper Tool Transmission Process", "Home Text Terminal Path"],
      correct: 0
    },
    {
      q: "Which programming language is primarily used for interactive web behavior?",
      options: ["C++", "Fortran", "JavaScript", "Assembly"],
      correct: 2
    },
    {
      q: "What is the full form of “AI”?",
      options: ["Automated Internet", "Artificial Intelligence", "Advanced Integration", "App Interface"],
      correct: 1
    },
    {
      q: "Who is known as the father of modern computing?",
      options: ["Alan Turing", "Charles Babbage", "Ada Lovelace", "John von Neumann"],
      correct: 0
    }
  ];

  let currentQuizIdx = 0;
  let quizScore = 0;

  function getQuizRunnerHTML(p) {
    currentQuizIdx = 0;
    quizScore = 0;
    return `
      <div class="quiz-runner-container">
        <span class="badge" style="background:var(--accent-subtle); color:var(--accent-primary); padding:4px 10px; border-radius:99px; font-weight:700;">LECTURE 10 PRACTICAL</span>
        <h3 style="margin-top:8px;">${p.title}</h3>
        <p style="color:var(--text-secondary); font-size:0.95rem;">Test your knowledge in this playable demo from Lecture 10:</p>

        <div class="quiz-progression-bar" style="margin-top:12px;">
          <div id="quiz-progress-fill" class="quiz-progression-fill" style="width: 20%;"></div>
        </div>

        <div id="quiz-question-box"></div>
      </div>
    `;
  }

  function renderCurrentQuizQuestion() {
    const box = document.getElementById('quiz-question-box');
    const fill = document.getElementById('quiz-progress-fill');
    if (!box) return;

    if (currentQuizIdx >= quizQuestions.length) {
      // Finished state
      if (fill) fill.style.width = '100%';
      box.innerHTML = `
        <div style="text-align:center; padding:24px 0;">
          <div style="font-size:2.5rem; margin-bottom:8px;">☀️ 🏆</div>
          <h4>Quiz Completed!</h4>
          <p style="font-size:1.1rem; color:var(--accent-primary); font-weight:700; margin:8px 0;">You scored ${quizScore} out of ${quizQuestions.length}!</p>
          <p style="color:var(--text-secondary); font-size:0.95rem;">Great job reviewing the fundamental tech concepts from Lecture 10.</p>
          <button type="button" id="quiz-restart-btn" class="btn btn-primary btn-sm" style="margin-top:12px;">Play Again</button>
        </div>
      `;
      const restart = document.getElementById('quiz-restart-btn');
      if (restart) {
        restart.addEventListener('click', () => {
          currentQuizIdx = 0;
          quizScore = 0;
          renderCurrentQuizQuestion();
        });
      }
      return;
    }

    const cur = quizQuestions[currentQuizIdx];
    if (fill) fill.style.width = `${((currentQuizIdx + 1) / quizQuestions.length) * 100}%`;

    box.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span style="font-size:0.8125rem; font-weight:700; color:var(--text-muted);">QUESTION ${currentQuizIdx + 1} OF ${quizQuestions.length}</span>
        <span style="font-size:0.8125rem; font-weight:600; color:var(--accent-primary);">Score: ${quizScore}</span>
      </div>
      <div class="quiz-question-text">${cur.q}</div>
      <div class="quiz-options-group">
        ${cur.options.map((opt, i) => `
          <button type="button" class="quiz-option-btn" data-option-idx="${i}">
            <span>${opt}</span>
            <span class="quiz-mark"></span>
          </button>
        `).join('')}
      </div>
      <div id="quiz-feedback" style="font-size:0.9rem; font-weight:600; min-height:24px;"></div>
    `;

    const optionBtns = box.querySelectorAll('.quiz-option-btn');
    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const selected = parseInt(btn.getAttribute('data-option-idx'), 10);
        optionBtns.forEach(b => b.disabled = true);
        const feedback = document.getElementById('quiz-feedback');

        if (selected === cur.correct) {
          quizScore++;
          btn.classList.add('correct');
          if (feedback) feedback.innerHTML = `<span style="color:#2E7D52;">✓ Correct! Well done.</span>`;
        } else {
          btn.classList.add('incorrect');
          optionBtns[cur.correct].classList.add('correct');
          if (feedback) feedback.innerHTML = `<span style="color:#B24C53;">✗ Incorrect. The correct answer was: ${cur.options[cur.correct]}</span>`;
        }

        setTimeout(() => {
          currentQuizIdx++;
          renderCurrentQuizQuestion();
        }, 1200);
      });
    });
  }

  function initQuizInteractivity() {
    renderCurrentQuizQuestion();
  }

  // ------------------------------------------------------------------------
  // DEMO 5: BOOK READING LIST MANAGER (Lecture 11)
  // ------------------------------------------------------------------------
  const DEFAULT_BOOKS = [
    { title: "Clean Code", author: "Robert C. Martin", status: "Finished", rating: "★★★★★" },
    { title: "Grokking Algorithms", author: "Aditya Bhargava", status: "Reading", rating: "★★★★☆" },
    { title: "Python Crash Course", author: "Eric Matthes", status: "Finished", rating: "★★★★★" },
    { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", status: "To Read", rating: "—" }
  ];

  function getReadingListHTML(p) {
    return `
      <div class="reading-list-app">
        <span class="badge" style="background:var(--accent-subtle); color:var(--accent-primary); padding:4px 10px; border-radius:99px; font-weight:700;">LECTURE 11 PRACTICAL</span>
        <h3 style="margin-top:8px;">${p.title}</h3>
        <p style="color:var(--text-secondary); font-size:0.95rem;">Interactive reading list manager with status filters and localStorage persistence:</p>

        <form id="reading-add-form" style="display:flex; gap:8px; margin:14px 0;">
          <input type="text" id="new-book-title" placeholder="Book Title..." required style="flex-grow:1; padding:8px 12px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-primary); color:var(--text-primary);" />
          <input type="text" id="new-book-author" placeholder="Author..." required style="width:140px; padding:8px 12px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-primary); color:var(--text-primary);" />
          <button type="submit" class="btn btn-primary btn-sm">+ Add</button>
        </form>

        <div style="display:flex; gap:6px; margin-bottom:12px;">
          <button type="button" class="reading-filter-pill active" data-status="All" style="padding:4px 12px; border-radius:99px; font-size:0.8rem; font-weight:600; border:1px solid var(--border-color); background:var(--accent-primary); color:var(--text-on-accent); cursor:pointer;">All</button>
          <button type="button" class="reading-filter-pill" data-status="Reading" style="padding:4px 12px; border-radius:99px; font-size:0.8rem; font-weight:600; border:1px solid var(--border-color); background:var(--bg-card); color:var(--text-secondary); cursor:pointer;">Reading</button>
          <button type="button" class="reading-filter-pill" data-status="Finished" style="padding:4px 12px; border-radius:99px; font-size:0.8rem; font-weight:600; border:1px solid var(--border-color); background:var(--bg-card); color:var(--text-secondary); cursor:pointer;">Finished</button>
          <button type="button" class="reading-filter-pill" data-status="To Read" style="padding:4px 12px; border-radius:99px; font-size:0.8rem; font-weight:600; border:1px solid var(--border-color); background:var(--bg-card); color:var(--text-secondary); cursor:pointer;">To Read</button>
        </div>

        <div id="reading-books-list" class="reading-books-container"></div>
      </div>
    `;
  }

  function initReadingListInteractivity() {
    const STORAGE_KEY = 'divyanshi_reading_list';
    let books = [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      books = stored ? JSON.parse(stored) : DEFAULT_BOOKS;
    } catch (e) {
      books = DEFAULT_BOOKS;
    }

    let currentStatusFilter = 'All';

    function saveAndRender() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
      } catch (e) {}

      const list = document.getElementById('reading-books-list');
      if (!list) return;

      const filtered = books.filter(b => currentStatusFilter === 'All' || b.status === currentStatusFilter);

      if (filtered.length === 0) {
        list.innerHTML = `<div style="text-align:center; padding:20px; color:var(--text-muted); font-size:0.9rem;">No books found in this status category.</div>`;
        return;
      }

      list.innerHTML = filtered.map((b, idx) => `
        <div class="book-item-card">
          <div>
            <div style="font-weight:700; font-size:0.95rem; color:var(--text-primary);">${b.title}</div>
            <div style="font-size:0.8125rem; color:var(--text-muted);">by ${b.author} · ${b.rating}</div>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <select class="book-status-select" data-book-idx="${idx}" style="padding:4px 8px; border-radius:6px; font-size:0.8rem; border:1px solid var(--border-color); background:var(--bg-primary); color:var(--text-primary);">
              <option value="To Read" ${b.status === 'To Read' ? 'selected' : ''}>To Read</option>
              <option value="Reading" ${b.status === 'Reading' ? 'selected' : ''}>Reading</option>
              <option value="Finished" ${b.status === 'Finished' ? 'selected' : ''}>Finished</option>
            </select>
            <button type="button" class="book-del-btn" data-book-idx="${idx}" style="color:#B24C53; background:none; font-size:1rem; cursor:pointer;" title="Delete book">×</button>
          </div>
        </div>
      `).join('');

      list.querySelectorAll('.book-status-select').forEach(sel => {
        sel.addEventListener('change', (e) => {
          const idx = parseInt(sel.getAttribute('data-book-idx'), 10);
          books[idx].status = e.target.value;
          saveAndRender();
        });
      });

      list.querySelectorAll('.book-del-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-book-idx'), 10);
          books.splice(idx, 1);
          saveAndRender();
        });
      });
    }

    const addForm = document.getElementById('reading-add-form');
    if (addForm) {
      addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const titleInput = document.getElementById('new-book-title');
        const authorInput = document.getElementById('new-book-author');
        if (!titleInput.value.trim()) return;

        books.unshift({
          title: titleInput.value.trim(),
          author: authorInput.value.trim() || 'Unknown',
          status: 'Reading',
          rating: '★★★★☆'
        });

        titleInput.value = '';
        authorInput.value = '';
        saveAndRender();
      });
    }

    const pills = document.querySelectorAll('.reading-filter-pill');
    pills.forEach(p => {
      p.addEventListener('click', () => {
        pills.forEach(item => {
          item.style.background = 'var(--bg-card)';
          item.style.color = 'var(--text-secondary)';
        });
        p.style.background = 'var(--accent-primary)';
        p.style.color = 'var(--text-on-accent)';
        currentStatusFilter = p.getAttribute('data-status');
        saveAndRender();
      });
    });

    saveAndRender();
  }

  // Initial load
  renderProjects();
});
