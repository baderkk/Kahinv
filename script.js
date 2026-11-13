(() => {
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  document.getElementById('year').textContent = new Date().getFullYear();

  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in'));
    return;
  }

  // Stagger siblings that enter together (pillars, ledger rows).
  document.querySelectorAll('.pillars, .ledger').forEach((group) => {
    [...group.children].forEach((el, i) => el.style.setProperty('--d', `${i * 0.12}s`));
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });

  items.forEach((el) => io.observe(el));
})();
