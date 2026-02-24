'use client';

import { useI18n } from '@/lib/i18n-context';

const leafConfigs = [
  { outer: 'var(--sage)', inner: 'var(--sage)', d1: 'M40 5 C40 5 15 20 10 50 C5 80 30 95 40 95 C50 95 75 80 70 50 C65 20 40 5 40 5Z', d2: 'M40 15 C40 15 22 27 18 50 C14 73 33 85 40 85 C47 85 66 73 62 50 C58 27 40 15 40 15Z' },
  { outer: 'var(--leaf)', inner: 'var(--leaf)', d1: 'M40 10 C40 10 18 23 14 50 C10 77 32 90 40 90 C48 90 70 77 66 50 C62 23 40 10 40 10Z', d2: 'M40 20 C40 20 25 30 22 50 C19 70 35 80 40 80 C45 80 61 70 58 50 C55 30 40 20 40 20Z' },
  { outer: 'var(--lavender)', inner: 'var(--lavender)', d1: 'M40 12 C40 12 20 25 16 50 C12 75 34 88 40 88 C46 88 68 75 64 50 C60 25 40 12 40 12Z', d2: 'M40 22 C40 22 27 32 24 50 C21 68 36 78 40 78 C44 78 59 68 56 50 C53 32 40 22 40 22Z' },
  { outer: 'var(--peach)', inner: 'var(--peach)', d1: 'M40 15 C40 15 22 27 18 50 C14 73 33 85 40 85 C47 85 66 73 62 50 C58 27 40 15 40 15Z', d2: 'M40 25 C40 25 30 33 28 50 C26 67 37 75 40 75 C43 75 54 67 52 50 C50 33 40 25 40 25Z' },
];

export default function Process() {
  const { t } = useI18n();
  return (
    <section className="process" id="process">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t('process.tag')}</span>
          <h2 dangerouslySetInnerHTML={{ __html: t('process.title') }} />
        </div>
        <div className="process-steps">
          {[1, 2, 3, 4].map(i => {
            const cfg = leafConfigs[i - 1];
            return (
              <div className="process-step" data-reveal key={i}>
                <div className="step-leaf">
                  <svg viewBox="0 0 80 100" width="80" height="100">
                    <path d={cfg.d1} fill={cfg.outer} opacity="0.3" />
                    <path d={cfg.d2} fill={cfg.inner} opacity="0.5" />
                  </svg>
                  <span className="step-num">{String(i).padStart(2, '0')}</span>
                </div>
                <h3>{t(`process.s${i}.title`)}</h3>
                <p>{t(`process.s${i}.desc`)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
