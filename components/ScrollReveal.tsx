'use client';

import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    const revealEls = document.querySelectorAll('[data-reveal]');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const parent = entry.target.parentElement;
          const siblings = parent ? Array.from(parent.querySelectorAll('[data-reveal]')) : [];
          const siblingIndex = siblings.indexOf(entry.target as Element);
          const delay = siblingIndex >= 0 ? siblingIndex * 100 : 0;
          setTimeout(() => entry.target.classList.add('revealed'), delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

    revealEls.forEach(el => observer.observe(el));

    // Fallback for already-visible elements
    const timeout = setTimeout(() => {
      revealEls.forEach(el => {
        if (!el.classList.contains('revealed')) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight + 50) {
            el.classList.add('revealed');
          }
        }
      });
    }, 1500);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  return null;
}
