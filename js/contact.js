/**
 * CONTACT FORM VALIDATION & HONEST FEEDBACK CONTROLLER
 * Validates inputs and generates a direct mailto action without false delivery claims
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');
  const feedbackBox = document.getElementById('contact-feedback');

  if (!form) return;

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function setFieldError(fieldId, errorMsg) {
    const fieldWrap = document.getElementById(fieldId)?.closest('.form-field');
    const errorEl = document.getElementById(`${fieldId}-error`);
    if (fieldWrap && errorEl) {
      if (errorMsg) {
        fieldWrap.classList.add('has-error');
        errorEl.textContent = errorMsg;
      } else {
        fieldWrap.classList.remove('has-error');
        errorEl.textContent = '';
      }
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const messageVal = messageInput.value.trim();

    let hasErrors = false;

    // Validate Name
    if (!nameVal) {
      setFieldError('contact-name', 'Please enter your name.');
      hasErrors = true;
    } else {
      setFieldError('contact-name', '');
    }

    // Validate Email
    if (!emailVal) {
      setFieldError('contact-email', 'Please enter your email address.');
      hasErrors = true;
    } else if (!validateEmail(emailVal)) {
      setFieldError('contact-email', 'Please provide a valid email format (e.g., user@example.com).');
      hasErrors = true;
    } else {
      setFieldError('contact-email', '');
    }

    // Validate Message
    if (!messageVal) {
      setFieldError('contact-message', 'Please type a short message.');
      hasErrors = true;
    } else if (messageVal.length < 5) {
      setFieldError('contact-message', 'Message must be at least 5 characters long.');
      hasErrors = true;
    } else {
      setFieldError('contact-message', '');
    }

    if (hasErrors) {
      if (feedbackBox) feedbackBox.style.display = 'none';
      return;
    }

    // Honest feedback & mailto delivery
    const recipient = 'divyanshirajwansh@gmail.com';
    const subject = encodeURIComponent(`Portfolio Inquiry from ${nameVal}`);
    const body = encodeURIComponent(`Name: ${nameVal}\nEmail: ${emailVal}\n\nMessage:\n${messageVal}`);
    const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

    if (feedbackBox) {
      feedbackBox.className = 'form-feedback-box success';
      feedbackBox.innerHTML = `
        <div style="font-weight:700; margin-bottom:6px;">✓ Message validated successfully!</div>
        <p style="font-size:0.875rem; margin-bottom:12px; color:inherit;">
          To ensure reliable delivery without relying on an unverified third-party form backend, tap the button below to send your note directly to <strong>${recipient}</strong>:
        </p>
        <a href="${mailtoUrl}" class="btn btn-primary btn-sm" style="display:inline-flex;">
          Send via Email Client (mailto:) ✉️
        </a>
      `;
      feedbackBox.style.display = 'block';
      feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });

  // Clear errors on input
  [nameInput, emailInput, messageInput].forEach(inp => {
    if (inp) {
      inp.addEventListener('input', () => {
        setFieldError(inp.id, '');
      });
    }
  });
});
