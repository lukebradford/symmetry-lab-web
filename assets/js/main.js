(() => {
  const form = document.querySelector('[data-signup-form]');
  if (!form) return;

  const successTemplate = form.dataset.successMessage ||
    "Thanks — you'll hear from me when the next update ships.";

  form.addEventListener('submit', async (event) => {
    const button = form.querySelector('button[type="submit"]');
    const input = form.querySelector('input[type="email"]');
    if (!input || !input.value.trim()) return;

    event.preventDefault();
    if (button) { button.disabled = true; button.textContent = 'Sending…'; }

    try {
      const body = new FormData(form);
      const res = await fetch(form.action, {
        method: 'POST',
        body,
        mode: 'no-cors',
      });
      showSuccess();
    } catch (err) {
      form.submit();
    }
  });

  function showSuccess() {
    const wrap = form.closest('[data-signup]') || form.parentElement;
    const div = document.createElement('div');
    div.className = 'signup__success';
    div.setAttribute('role', 'status');
    div.textContent = successTemplate;
    form.replaceWith(div);
    div.focus?.();
  }
})();
