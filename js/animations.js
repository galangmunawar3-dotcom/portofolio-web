document.addEventListener('DOMContentLoaded', () => {
  // Observe when sections are loaded, then apply animations
  const sectionObserver = new MutationObserver(() => {
    initAnimations();
  });
  sectionObserver.observe(document.body, { childList: true, subtree: true });

  // Also run after a delay for dynamically loaded content
  setTimeout(initAnimations, 500);
});

function initAnimations() {
  const els = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .stagger-children');

  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  els.forEach(el => observer.observe(el));
}

// Animate skill bars when skills section is visible
document.addEventListener('DOMContentLoaded', () => {
  const skillObserver = new MutationObserver(() => {
    initSkillBars();
  });
  skillObserver.observe(document.body, { childList: true, subtree: true });

  setTimeout(initSkillBars, 600);
});

function initSkillBars() {
  const bars = document.querySelectorAll('.skill-progress');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.dataset.width + '%';
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(bar => observer.observe(bar));
}
