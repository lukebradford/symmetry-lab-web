(() => {
  const btn = document.querySelector('[data-formkit-toggle]');
  if (!btn) return;
  const formUid = btn.getAttribute('data-formkit-toggle');

  let loading = false;
  btn.addEventListener('click', (event) => {
    if (loading) return;             // subsequent clicks: Kit's handler takes over
    loading = true;
    event.preventDefault();          // suppress navigation to the hosted form
    const s = document.createElement('script');
    s.async = true;
    s.setAttribute('data-uid', formUid);
    s.src = `https://symmetry-lab.kit.com/${formUid}/index.js`;
    document.body.appendChild(s);
  });
})();
