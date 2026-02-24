'use client';

import { useI18n } from '@/lib/i18n-context';

const serviceIcons = [
  // 01 - Data Architecture
  <svg key="s1" viewBox="0 0 48 48" width="48" height="48"><path d="M8 36V20L24 8L40 20V36" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M16 36V24H32V36" stroke="currentColor" strokeWidth="2" fill="none"/><line x1="24" y1="24" x2="24" y2="36" stroke="currentColor" strokeWidth="2"/></svg>,
  // 02 - Pipeline Engineering
  <svg key="s2" viewBox="0 0 48 48" width="48" height="48"><circle cx="12" cy="24" r="4" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="36" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="36" cy="36" r="4" stroke="currentColor" strokeWidth="2" fill="none"/><line x1="16" y1="22" x2="32" y2="14" stroke="currentColor" strokeWidth="2"/><line x1="16" y1="26" x2="32" y2="34" stroke="currentColor" strokeWidth="2"/></svg>,
  // 03 - AI Agents & MCP
  <svg key="s3" viewBox="0 0 48 48" width="48" height="48"><circle cx="24" cy="20" r="8" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M14 38C14 32 18 28 24 28C30 28 34 32 34 38" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M32 16L38 10M38 10L42 14M38 10L36 6" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="24" cy="20" r="2" fill="currentColor"/></svg>,
  // 04 - Cloud & Infrastructure
  <svg key="s4" viewBox="0 0 48 48" width="48" height="48"><rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/><line x1="8" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="2"/><line x1="20" y1="20" x2="20" y2="40" stroke="currentColor" strokeWidth="2"/></svg>,
  // 05 - Data Governance
  <svg key="s5" viewBox="0 0 48 48" width="48" height="48"><path d="M10 12H38M10 12V38L24 44L38 38V12" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M18 22L24 28L34 18" stroke="currentColor" strokeWidth="2" fill="none"/><line x1="14" y1="8" x2="14" y2="14" stroke="currentColor" strokeWidth="2"/><line x1="34" y1="8" x2="34" y2="14" stroke="currentColor" strokeWidth="2"/></svg>,
  // 06 - Analytics & BI
  <svg key="s6" viewBox="0 0 48 48" width="48" height="48"><path d="M24 8L8 18V34L24 40L40 34V18L24 8Z" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M24 8V24L40 18" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M24 24L8 18" stroke="currentColor" strokeWidth="2" fill="none"/><line x1="24" y1="24" x2="24" y2="40" stroke="currentColor" strokeWidth="2"/></svg>,
  // 07 - Data Strategy
  <svg key="s7" viewBox="0 0 48 48" width="48" height="48"><path d="M12 36C12 36 12 24 24 24C36 24 36 12 36 12" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="12" cy="36" r="4" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="36" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none"/></svg>,
];

export default function Services() {
  const { t } = useI18n();

  return (
    <section className="services" id="services">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t('services.tag')}</span>
          <h2 dangerouslySetInnerHTML={{ __html: t('services.title') }} />
        </div>
        <div className="services-grid">
          {[1, 2, 3, 4, 5, 6, 7].map(i => (
            <div className="service-card" data-reveal key={i}>
              <div className="service-number">{String(i).padStart(2, '0')}</div>
              <div className="service-icon">{serviceIcons[i - 1]}</div>
              <h3>{t(`services.s${i}.title`)}</h3>
              <p>{t(`services.s${i}.desc`)}</p>
            </div>
          ))}
          <div className="service-card service-card-cta" data-reveal>
            <div className="service-cta-inner">
              <h3>{t('services.cta.title')}</h3>
              <p>{t('services.cta.desc')}</p>
              <a href="#contact" className="btn btn-primary">{t('services.cta.btn')}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
