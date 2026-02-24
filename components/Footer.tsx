'use client';

import Image from 'next/image';
import { useI18n } from '@/lib/i18n-context';

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#" className="logo">
              <Image src="/logo.svg" alt="Datachoke" width={40} height={40} className="logo-icon" />
              <span>datachoke<span className="logo-accent">studios</span></span>
            </a>
            <p>{t('footer.tagline')}</p>
          </div>
          <div className="footer-links">
            <h4>Studio</h4>
            <a href="#services">{t('nav.services')}</a>
            <a href="#process">{t('nav.process')}</a>
            <a href="#about">{t('nav.about')}</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-links">
            <h4>{t('footer.connect')}</h4>
            <a href="https://www.linkedin.com/company/garnoun" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/linda-benboudiaf" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://medium.com/@lbenboudiaf" target="_blank" rel="noopener noreferrer">Medium</a>
            <a href="https://x.com/datachok" target="_blank" rel="noopener noreferrer">X</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Datachoke Studios. <span>{t('footer.rights')}</span></p>
          <p>{t('footer.love')}</p>
        </div>
      </div>
    </footer>
  );
}
