(() => {
  const btn = document.querySelector('[data-formkit-toggle]');
  if (!btn) return;
  const formUid = btn.getAttribute('data-formkit-toggle');

  let requested = false;
  let ready = false;

  function loadKit() {
    if (requested) return;
    requested = true;
    const s = document.createElement('script');
    s.async = true;
    s.setAttribute('data-uid', formUid);
    s.src = `https://symmetry-lab.kit.com/${formUid}/index.js`;
    s.addEventListener('load', () => { ready = true; btn.classList.remove('is-loading'); });
    s.addEventListener('error', () => { btn.classList.remove('is-loading'); requested = false; });
    document.body.appendChild(s);
  }

  // Start the download the moment the user signals intent so the script is
  // already in-flight (or done) by the time they click.
  btn.addEventListener('pointerenter', loadKit, { once: true });
  btn.addEventListener('focus',        loadKit, { once: true });
  btn.addEventListener('touchstart',   loadKit, { once: true, passive: true });

  btn.addEventListener('click', (event) => {
    // Always suppress navigation — we don't want the href fallback to fire
    // while we're trying to open the modal in-page.
    event.preventDefault();
    loadKit();
    if (!ready) btn.classList.add('is-loading');
    // Once the script has loaded, Kit's own click handler on
    // [data-formkit-toggle] opens the modal on this and subsequent clicks.
  });
})();
