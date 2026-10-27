/**
 * WELCOME SCREEN CONTROLLER - HANDWRITTEN AFFIRMATION EXPERIENCE
 * Displays a randomized compassionate affirmation on fresh load,
 * provides "Another little reminder" cycling with smooth fade,
 * and smoothly reveals the portfolio upon clicking "Enter my little world".
 */

(function () {
  const AFFIRMATIONS = [
    "You are capable of creating things that bring light and joy to others.",
    "Take a deep breath; you are growing in ways you cannot yet see.",
    "Every small line of code and every gentle thought matters.",
    "There is magic in taking things one quiet step at a time.",
    "Your curiosity is a quiet superpower—trust where it leads you.",
    "You do not have to have everything figured out to move gracefully forward.",
    "May today bring you unexpected sunshine and creative flow.",
    "Trust the timing of your learning and the beauty of your journey.",
    "You bring something uniquely tender, bright, and thoughtful to this world.",
    "It is always okay to pause, rest, and let your ideas gently simmer.",
    "Your creativity and intelligence exist in harmonious balance.",
    "Small, consistent efforts create quiet, lasting transformations.",
    "Be proud of how far you’ve come, and gentle with where you are.",
    "There is abundant space for your ideas, your dreams, and your art.",
    "True intelligence is not just knowledge; it is kindness, wonder, and heart.",
    "Let yourself be a beginner; that is where all beautiful discoveries start.",
    "You are allowed to take up space and share your authentic voice.",
    "Every challenge you face is quietly shaping your resilience and grace.",
    "Breathe easy—good things are quietly unfolding for you today.",
    "A little bit of internet, a little bit of intelligence, and a whole lot of heart.",
    "Your path is not a race; walk it with joy, curiosity, and gentle pride.",
    "Celebrate the quiet victories and tiny breakthroughs that only you see."
  ];

  let currentIdx = -1;

  function getRandomIndex(excludeIdx) {
    let newIdx;
    do {
      newIdx = Math.floor(Math.random() * AFFIRMATIONS.length);
    } while (newIdx === excludeIdx && AFFIRMATIONS.length > 1);
    return newIdx;
  }

  function setAffirmation(text, animate) {
    const textEl = document.getElementById('affirmation-text');
    if (!textEl) return;

    if (animate) {
      textEl.classList.add('fading');
      setTimeout(() => {
        textEl.textContent = text;
        textEl.classList.remove('fading');
      }, 240);
    } else {
      textEl.textContent = text;
    }
  }

  function initWelcome() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const refreshBtn = document.getElementById('welcome-refresh-btn');
    const entryLink = document.getElementById('welcome-entry-link');
    const mainContent = document.getElementById('main-content');

    if (!welcomeScreen) return;

    // Pick random affirmation, avoiding immediate predecessor across session if possible
    const lastStored = sessionStorage.getItem('divyanshi_last_affirmation');
    const exclude = lastStored !== null ? parseInt(lastStored, 10) : -1;
    currentIdx = getRandomIndex(exclude);
    sessionStorage.setItem('divyanshi_last_affirmation', currentIdx.toString());

    setAffirmation(AFFIRMATIONS[currentIdx], false);

    // "Another little reminder" button
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        currentIdx = getRandomIndex(currentIdx);
        sessionStorage.setItem('divyanshi_last_affirmation', currentIdx.toString());
        setAffirmation(AFFIRMATIONS[currentIdx], true);
      });
    }

    // "Enter my little world" link
    function enterPortfolio(e) {
      if (e) e.preventDefault();
      welcomeScreen.classList.add('welcome-screen--hidden');
      document.body.classList.remove('welcome-locked');

      // Smooth focus transfer to main headline for accessibility
      setTimeout(() => {
        const headline = document.querySelector('.hero-signature-headline') || mainContent;
        if (headline) {
          headline.setAttribute('tabindex', '-1');
          headline.focus();
        }
      }, 600);
    }

    if (entryLink) {
      entryLink.addEventListener('click', enterPortfolio);
      entryLink.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          enterPortfolio(e);
        }
      });
    }

    // Prevent body scroll behind welcome screen until entered
    document.body.classList.add('welcome-locked');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWelcome);
  } else {
    initWelcome();
  }
})();
