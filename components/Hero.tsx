'use client';

import { useI18n } from '@/lib/i18n-context';

export default function Hero() {
  const { t } = useI18n();
  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <div className="hero-overline">
          <span className="overline-line" />
          <span className="overline-text">{t('hero.overline')}</span>
          <span className="overline-line" />
        </div>
        <h1 dangerouslySetInnerHTML={{ __html: t('hero.title') }} />
        <p className="hero-sub">{t('hero.sub')}</p>
        <div className="hero-actions">
          <a href="#services" className="btn btn-primary">{t('hero.cta1')}</a>
          <a href="#contact" className="btn btn-ghost">{t('hero.cta2')}</a>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="scroll-line" />
      </div>
    </section>
  );
}
