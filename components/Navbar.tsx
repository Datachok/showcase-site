'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n-context';
import { useTheme } from '@/lib/theme-context';

function FlagFR() {
  return (
    <svg className="flag-icon" viewBox="0 0 60 40" width="28" height="19">
      <rect width="20" height="40" fill="#002395" />
      <rect x="20" width="20" height="40" fill="#FFF" />
      <rect x="40" width="20" height="40" fill="#ED2939" />
    </svg>
  );
}

function FlagGB() {
  return (
    <svg className="flag-icon" viewBox="0 0 60 40" width="28" height="19">
      <rect width="60" height="40" fill="#012169" />
      <path d="M0 0L60 40M60 0L0 40" stroke="#FFF" strokeWidth="6" />
      <path d="M0 0L60 40M60 0L0 40" stroke="#C8102E" strokeWidth="4" />
      <path d="M30 0V40M0 20H60" stroke="#FFF" strokeWidth="10" />
      <path d="M30 0V40M0 20H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

function ThemeToggle({ onClick }: { onClick: () => void }) {
  return (
    <button className="theme-toggle" onClick={onClick} aria-label="Toggle dark mode">
      <div className="toggle-track">
        <div className="toggle-thumb">
          <svg className="toggle-sun" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <circle cx="12" cy="12" r="5" />
            <g stroke="currentColor" strokeWidth="2" fill="none">
              <line x1="12" y1="1" x2="12" y2="4" /><line x1="12" y1="20" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" /><line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="4" y2="12" /><line x1="20" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" /><line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
            </g>
          </svg>
          <svg className="toggle-moon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </div>
        <div className="toggle-stars"><span /><span /><span /></div>
      </div>
    </button>
  );
}

export default function Navbar() {
  const { lang, toggleLang, t } = useI18n();
  const { toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  };

  const handleToggleMenu = () => {
    setMenuOpen(v => {
      document.body.style.overflow = !v ? 'hidden' : '';
      return !v;
    });
  };

  const Flag = lang === 'en' ? FlagFR : FlagGB;

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#" className="logo">
            <Image src="/logo.svg" alt="Datachoke" width={40} height={40} className="logo-icon" priority />
            <span>datachoke<span className="logo-accent">studios</span></span>
          </a>
          <div className="nav-links">
            <a href="#services">{t('nav.services')}</a>
            <a href="#process">{t('nav.process')}</a>
            <a href="#about">{t('nav.about')}</a>
            <a href="#contact" className="nav-cta">{t('nav.cta')}</a>
            <div className="nav-controls">
              <button className="lang-toggle" onClick={toggleLang} aria-label="Switch language">
                <Flag />
              </button>
              <ThemeToggle onClick={toggleTheme} />
            </div>
          </div>
          <div className="nav-controls-mobile">
            <button className="lang-toggle" onClick={toggleLang} aria-label="Switch language">
              <Flag />
            </button>
            <ThemeToggle onClick={toggleTheme} />
            <button className={`nav-toggle${menuOpen ? ' active' : ''}`} onClick={handleToggleMenu} aria-label="Menu">
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>
      <div className={`mobile-menu${menuOpen ? ' active' : ''}`}>
        <a href="#services" onClick={closeMenu}>{t('nav.services')}</a>
        <a href="#process" onClick={closeMenu}>{t('nav.process')}</a>
        <a href="#about" onClick={closeMenu}>{t('nav.about')}</a>
        <a href="#contact" className="nav-cta" onClick={closeMenu}>{t('nav.cta')}</a>
      </div>
    </>
  );
}
