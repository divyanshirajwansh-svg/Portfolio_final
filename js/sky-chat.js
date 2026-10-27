/**
 * SKY AI PORTFOLIO CHATBOT CONTROLLER
 * A warm, positive, intelligent companion grounded in verified portfolio data
 */

document.addEventListener('DOMContentLoaded', () => {
  const launcher = document.getElementById('sky-chat-launcher');
  const chatWindow = document.getElementById('sky-chat-window');
  const closeBtn = document.getElementById('sky-chat-close');
  const messagesBox = document.getElementById('sky-chat-messages');
  const suggestionsBox = document.getElementById('sky-chat-suggestions');
  const chatForm = document.getElementById('sky-chat-form');
  const chatInput = document.getElementById('sky-chat-input');
  const sendBtn = document.getElementById('sky-chat-send');

  let portfolioContext = null;
  let chatHistory = [];
  let isThinking = false;

  const SUGGESTED_QUESTIONS = [
    "Who is Divyanshi?",
    "What are her technical skills?",
    "What projects has she built?",
    "Explain the Python Programs Collection",
    "What was improved in the messy Python code?",
    "What bug was fixed using Cursor AI?",
    "How does the quiz application work?",
    "What does the reading list application do?",
    "Where can I find her GitHub?"
  ];

  // ------------------------------------------------------------------------
  // LOAD CONTEXT DATA
  // ------------------------------------------------------------------------
  fetch('data/portfolio-context.json')
    .then(r => r.json())
    .then(data => {
      portfolioContext = data;
    })
    .catch(err => {
      console.warn("Local portfolio context load error; using embedded knowledge base.", err);
    });

  // ------------------------------------------------------------------------
  // WINDOW TOGGLE
  // ------------------------------------------------------------------------
  function openChat() {
    chatWindow.classList.add('open');
    chatWindow.setAttribute('aria-hidden', 'false');
    if (chatHistory.length === 0) {
      displayGreeting();
    }
    setTimeout(() => chatInput.focus(), 250);
  }

  function closeChat() {
    chatWindow.classList.remove('open');
    chatWindow.setAttribute('aria-hidden', 'true');
    if (launcher) launcher.focus();
  }

  if (launcher) {
    launcher.addEventListener('click', openChat);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeChat);
  }

  // ------------------------------------------------------------------------
  // GREETING & SUGGESTIONS
  // ------------------------------------------------------------------------
  function displayGreeting() {
    appendBotMessage(
      "Hi, I’m Sky! ☀️ I’m here to help you explore Divyanshi’s work, discover her projects, and find a little sunshine along the way. What would you like to know?"
    );
    renderSuggestionChips();
  }

  function renderSuggestionChips() {
    if (!suggestionsBox) return;
    suggestionsBox.innerHTML = SUGGESTED_QUESTIONS.map(q => `
      <button type="button" class="chat-chip" data-question="${q}">${q}</button>
    `).join('');

    suggestionsBox.querySelectorAll('.chat-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const q = btn.getAttribute('data-question');
        chatInput.value = q;
        submitUserMessage();
      });
    });
  }

  // ------------------------------------------------------------------------
  // MESSAGE APPENDING
  // ------------------------------------------------------------------------
  function appendUserMessage(text) {
    chatHistory.push({ role: 'user', content: text });
    const div = document.createElement('div');
    div.className = 'chat-msg user';
    div.innerHTML = `<div class="msg-bubble">${escapeHTML(text)}</div>`;
    messagesBox.appendChild(div);
    scrollToBottom();
  }

  function appendBotMessage(text) {
    chatHistory.push({ role: 'assistant', content: text });
    const div = document.createElement('div');
    div.className = 'chat-msg bot';
    div.innerHTML = `
      <div class="chat-bot-avatar" style="width:28px; height:28px; font-size:0.9rem; flex-shrink:0;">☀️</div>
      <div class="msg-bubble">${formatBotResponse(text)}</div>
    `;
    messagesBox.appendChild(div);
    scrollToBottom();
  }

  function showTypingIndicator() {
    const div = document.createElement('div');
    div.id = 'sky-typing-indicator';
    div.className = 'chat-msg bot';
    div.innerHTML = `
      <div class="chat-bot-avatar" style="width:28px; height:28px; font-size:0.9rem; flex-shrink:0;">☀️</div>
      <div class="msg-bubble typing-bubble">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    `;
    messagesBox.appendChild(div);
    scrollToBottom();
  }

  function removeTypingIndicator() {
    const el = document.getElementById('sky-typing-indicator');
    if (el) el.remove();
  }

  function scrollToBottom() {
    if (messagesBox) {
      messagesBox.scrollTop = messagesBox.scrollHeight;
    }
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  function formatBotResponse(text) {
    // Convert links to clickable anchors
    let formatted = escapeHTML(text);
    formatted = formatted.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
    );
    // Convert newlines
    formatted = formatted.replace(/\n/g, '<br>');
    return formatted;
  }

  // ------------------------------------------------------------------------
  // MESSAGE PROCESSING & GROUNDED KNOWLEDGE ENGINE
  // ------------------------------------------------------------------------
  async function submitUserMessage() {
    const text = chatInput.value.trim();
    if (!text || isThinking) return;

    chatInput.value = '';
    isThinking = true;
    if (sendBtn) sendBtn.disabled = true;

    appendUserMessage(text);
    showTypingIndicator();

    try {
      // 1. Try sending to the server-side Vercel endpoint /api/chat
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: chatHistory.slice(-6)
        })
      });

      if (response.ok) {
        const data = await response.json();
        removeTypingIndicator();
        if (data && data.reply) {
          appendBotMessage(data.reply);
          isThinking = false;
          if (sendBtn) sendBtn.disabled = false;
          return;
        }
      }
    } catch (e) {
      // Fall through to client grounded engine
    }

    // 2. Client-side grounded knowledge engine fallback
    // Guarantees reliable, accurate answers locally and when serverless key is omitted
    setTimeout(() => {
      removeTypingIndicator();
      const reply = generateGroundedAnswer(text);
      appendBotMessage(reply);
      isThinking = false;
      if (sendBtn) sendBtn.disabled = false;
    }, 450);
  }

  function generateGroundedAnswer(query) {
    const q = query.toLowerCase();

    // Check direct FAQ triggers first
    if (portfolioContext && portfolioContext.faq) {
      for (const item of portfolioContext.faq) {
        if (item.triggers.some(t => q.includes(t))) {
          return item.answer;
        }
      }
    }

    // Who is Divyanshi
    if (q.includes('who') || q.includes('divyanshi') || q.includes('about') || q.includes('introduce')) {
      return "Divyanshi Rajwansh is an undergraduate B.Tech Computer Science and Engineering student at JECRC University, Jaipur. She is an aspiring software engineer and content creator who loves combining algorithmic logic with creative storytelling, and actively contributes to the university's official social media team! ☀️";
    }

    // Skills
    if (q.includes('skill') || q.includes('tech stack') || q.includes('programming') || q.includes('languages') || q.includes('tool')) {
      return "Divyanshi's verified skill toolkit includes:\n• Programming: Python, C Language, Data Structures & Algorithms (C & C++)\n• Web: HTML5, CSS3, JavaScript, Responsive Design\n• AI-Assisted: Cursor AI, Prompt Engineering, ChatGPT, Copilot\n• Creative & Tools: Scriptwriting, Video Editing, Canva, DaVinci Resolve, Notion ✨";
    }

    // Projects list
    if (q.includes('project') || q.includes('portfolio') || q.includes('work') || q.includes('built')) {
      return "Divyanshi has five featured coursework and practical projects:\n1. Python Programs Collection (Factorials, Fibonacci, structure parsing)\n2. Messy Python Code Improvement (AI-assisted refactoring)\n3. Bug Fixing Using Cursor AI (Targeted patching of edge-case bugs)\n4. Interactive Quiz Application (Lecture 10 practical)\n5. Book Reading List Application (Lecture 11 practical)\n\nYou can search and try interactive demos for all five in the Projects section! 💻";
    }

    // Factorial or Fibonacci / Python collection
    if (q.includes('python program') || q.includes('factorial') || q.includes('fibonacci') || q.includes('collection')) {
      return "The Python Programs Collection repository consolidates fundamental algorithmic problems: recursive and iterative factorial computation with boundary checks, Fibonacci sequence generation with memoization, and nested structure-to-dictionary conversion. Check it out on her GitHub: https://github.com/divyanshirajwansh-svg/Python-programs-collection- 🐍";
    }

    // Messy code improvement
    if (q.includes('messy') || q.includes('refactor') || q.includes('improvement') || q.includes('clean code')) {
      return "In the Messy Python Code Improvement project, Divyanshi applied AI-assisted prompt engineering to restructure monolithic legacy code into modular, PEP 8-compliant functions with explicit type hints, docstrings, and robust exception handling! Check it out on her GitHub: https://github.com/divyanshirajwansh-svg/Messy-code-python 🌿";
    }

    // Cursor AI bug fixing
    if (q.includes('cursor') || q.includes('bug') || q.includes('fix') || q.includes('debugging')) {
      return "Using Cursor AI, Divyanshi identified and fixed subtle off-by-one errors and zero-length input boundary crashes in list partitioning logic. By feeding execution traces into Cursor AI, she generated precision patches with root-cause analysis! Check it out on her GitHub: https://github.com/divyanshirajwansh-svg/Buggy-Code- 🔍";
    }

    // Quiz application
    if (q.includes('quiz') || q.includes('lecture 10') || q.includes('test')) {
      return "The Interactive Quiz Application is a dynamic web app built for Lecture 10. It features Tech and General Knowledge questions, instant answer validation, real-time score calculation, and keyboard accessibility. You can play a live demo in the Projects section above, or view the code on her GitHub: https://github.com/divyanshirajwansh-svg/Interactive-Quiz- 🎯";
    }

    // Reading list
    if (q.includes('reading') || q.includes('book') || q.includes('lecture 11')) {
      return "Developed in Lecture 11, the Book Reading List Application allows users to organize their book backlog across 'Want to Read', 'Reading', and 'Finished' states, assign ratings, and persist reading lists in browser localStorage! Check it out on her GitHub: https://github.com/divyanshirajwansh-svg/reading-list-app 📚";
    }

    // GitHub
    if (q.includes('github') || q.includes('repo') || q.includes('code')) {
      return "You can view Divyanshi's code repositories on her official GitHub: https://github.com/divyanshirajwansh-svg 🚀";
    }

    // Contact
    if (q.includes('contact') || q.includes('email') || q.includes('connect') || q.includes('linkedin')) {
      return "You can reach Divyanshi via email at divyanshirajwansh@gmail.com, connect on LinkedIn at https://www.linkedin.com/in/divyanshi-rajwansh-4464b9283, or use the Contact form at the bottom of the page! 💌";
    }

    // Sunshine / greeting
    if (q.includes('hi') || q.includes('hello') || q.includes('sunshine') || q.includes('hey')) {
      return "Hello! ☀️ Wishing you a wonderful day! I'm here to help you learn all about Divyanshi's academic projects, programming skills, and creative work. Feel free to tap one of the suggested questions below!";
    }

    // Graceful uninvented fallback (Requirement: "If the answer is not available, Sky should acknowledge that instead of guessing.")
    return "I don't have verified details about that in Divyanshi's portfolio yet! As her portfolio companion, I only share facts confirmed from her coursework and projects. You can ask me about her technical skills, her 5 featured projects, or reach out to Divyanshi directly via email at divyanshirajwansh@gmail.com! ☀️";
  }

  // ------------------------------------------------------------------------
  // FORM & KEYBOARD EVENTS
  // ------------------------------------------------------------------------
  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      submitUserMessage();
    });
  }

  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        submitUserMessage();
      }
    });
  }
});
