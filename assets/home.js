/* Shared homepage/contact behaviour. No tracking or framework dependency. */
(() => {
  'use strict';
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('siteNav');
  const mobile = window.matchMedia('(max-width: 940px)');
  const setMenu = open => {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    if (open) nav.querySelector('a').focus();
  };
  if (toggle && nav) {
    toggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); toggle.focus(); }
    });
    document.addEventListener('click', e => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) setMenu(false);
    });
    document.addEventListener('focusin', e => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) setMenu(false);
    });
    mobile.addEventListener('change', () => setMenu(false));
  }
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const form = document.getElementById('enquiryForm');
  if (!form) return;
  const status = form.querySelector('.ef-status');
  const button = form.querySelector('.ef-submit');
  let sending = false;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (sending || form.elements.botcheck.checked || !form.reportValidity()) return;
    sending = true;
    button.disabled = true;
    form.setAttribute('aria-busy', 'true');
    status.className = 'ef-status sending';
    status.textContent = 'Sending your enquiry…';
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
        signal: controller.signal
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error('Submission not accepted');
      form.reset();
      status.className = 'ef-status ok';
      status.textContent = 'Thank you — your enquiry has been sent. We will be in touch.';
    } catch (error) {
      status.className = 'ef-status err';
      status.textContent = error.name === 'AbortError'
        ? 'We could not confirm delivery in time. Your details are still here. Please email sales@axisengineering.co.uk or try again.'
        : 'Your enquiry could not be sent. Your details are still here. Please try again or email sales@axisengineering.co.uk.';
    } finally {
      window.clearTimeout(timeout);
      sending = false;
      button.disabled = false;
      form.removeAttribute('aria-busy');
    }
  });
})();
