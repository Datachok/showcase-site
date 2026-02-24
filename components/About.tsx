'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useI18n } from '@/lib/i18n-context';

const peelDirections = [
  { rotate: -35, tx: -120, ty: -60 },
  { rotate: 30, tx: 100, ty: -80 },
  { rotate: -25, tx: -90, ty: 50 },
  { rotate: 40, tx: 110, ty: 40 },
  { rotate: -20, tx: -70, ty: -90 },
  { rotate: 35, tx: 80, ty: 70 },
  { rotate: -30, tx: -100, ty: -40 },
];

export default function About() {
  const { t } = useI18n();
  const artichokeRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<'idle' | 'peeling' | 'reveal' | 'returning'>('idle');
  const timersRef = useRef<number[]>([]);

  const setIdleState = useCallback(() => {
    const el = artichokeRef.current;
    if (!el) return;
    const layers = el.querySelectorAll<HTMLDivElement>('.art-layer');
    const core = el.querySelector<HTMLDivElement>('.art-core');
    layers.forEach(l => {
      l.classList.remove('peeling', 'peeled', 'returning');
      l.classList.add('idle');
      l.style.transform = '';
      l.style.opacity = '';
    });
    core?.classList.remove('visible');
    stateRef.current = 'idle';
  }, []);

  const startReturning = useCallback(() => {
    const el = artichokeRef.current;
    if (!el) return;
    stateRef.current = 'returning';
    const layers = el.querySelectorAll<HTMLDivElement>('.art-layer');
    const core = el.querySelector<HTMLDivElement>('.art-core');
    core?.classList.remove('visible');
    const count = layers.length;

    for (let i = count - 1; i >= 0; i--) {
      const reverseIdx = count - 1 - i;
      const timer = window.setTimeout(() => {
        layers[i].classList.remove('peeling', 'peeled');
        layers[i].classList.add('returning');
        layers[i].style.transform = '';
        layers[i].style.opacity = '';
        if (i === 0) {
          window.setTimeout(() => {
            setIdleState();
            window.setTimeout(() => startPeeling(), 3000);
          }, 800);
        }
      }, reverseIdx * 400);
      timersRef.current.push(timer);
    }
  }, [setIdleState]);

  const startPeeling = useCallback(() => {
    if (stateRef.current !== 'idle') return;
    stateRef.current = 'peeling';
    const el = artichokeRef.current;
    if (!el) return;
    const layers = el.querySelectorAll<HTMLDivElement>('.art-layer');
    const core = el.querySelector<HTMLDivElement>('.art-core');
    const count = layers.length;

    layers.forEach(l => l.classList.remove('idle'));

    for (let i = 0; i < count; i++) {
      const timer = window.setTimeout(() => {
        const dir = peelDirections[i % peelDirections.length];
        layers[i].classList.add('peeling');
        layers[i].style.transform = `rotate(${dir.rotate}deg) translate(${dir.tx}px, ${dir.ty}px) scale(0.3)`;
        layers[i].style.opacity = '0';
        window.setTimeout(() => layers[i].classList.add('peeled'), 1200);
        if (i === count - 1) {
          window.setTimeout(() => {
            stateRef.current = 'reveal';
            core?.classList.add('visible');
            window.setTimeout(() => startReturning(), 2000);
          }, 1000);
        }
      }, i * 600);
      timersRef.current.push(timer);
    }
  }, [startReturning]);

  useEffect(() => {
    const el = artichokeRef.current;
    if (!el) return;
    setIdleState();

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && stateRef.current === 'idle') {
          window.setTimeout(() => startPeeling(), 1200);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(el);
    return () => {
      observer.disconnect();
      timersRef.current.forEach(clearTimeout);
    };
  }, [setIdleState, startPeeling]);

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-content" data-reveal>
            <span className="section-tag">{t('about.tag')}</span>
            <h2 dangerouslySetInnerHTML={{ __html: t('about.title') }} />
            <p className="about-lead">{t('about.lead')}</p>
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
            <div className="about-stats">
              <div className="stat"><span className="stat-num">50+</span><span className="stat-label">{t('about.stat1')}</span></div>
              <div className="stat"><span className="stat-num">3PB</span><span className="stat-label">{t('about.stat2')}</span></div>
              <div className="stat"><span className="stat-num">99.9%</span><span className="stat-label">{t('about.stat3')}</span></div>
            </div>
          </div>
          <div className="about-visual" data-reveal>
            <div className="artichoke-art" ref={artichokeRef}>
              {[1, 2, 3, 4, 5, 6, 7].map(i => (
                <div key={i} className={`art-layer art-layer-${i}`} />
              ))}
              <div className="art-core"><span className="core-symbol">&#10084;</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
