'use client';

import { useRef, useState } from 'react';
import { useI18n } from '@/lib/i18n-context';

export default function Contact() {
  const { t } = useI18n();
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      formRef.current?.reset();
    }, 3000);
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info" data-reveal>
            <span className="section-tag">{t('contact.tag')}</span>
            <h2 dangerouslySetInnerHTML={{ __html: t('contact.title') }} />
            <p>{t('contact.desc')}</p>
            <div className="contact-details">
              <a href="mailto:hello@datachok.io">hello@datachok.io</a>
            </div>
          </div>
          <form className="contact-form" data-reveal ref={formRef} onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" id="name" name="name" placeholder=" " required />
              <label htmlFor="name">{t('contact.form.name')}</label>
            </div>
            <div className="form-group">
              <input type="email" id="email" name="email" placeholder=" " required />
              <label htmlFor="email">{t('contact.form.email')}</label>
            </div>
            <div className="form-group">
              <select id="service" name="service" required defaultValue="">
                <option value="" disabled>{t('contact.form.select')}</option>
                <option value="architecture">Data Architecture</option>
                <option value="pipelines">Pipeline Engineering</option>
                <option value="ai-agents">AI Agents &amp; MCP</option>
                <option value="cloud">Cloud &amp; Infrastructure</option>
                <option value="governance">Data Governance</option>
                <option value="analytics">Analytics &amp; BI</option>
                <option value="strategy">Data Strategy</option>
                <option value="other">{t('contact.form.other')}</option>
              </select>
            </div>
            <div className="form-group">
              <textarea id="message" name="message" rows={4} placeholder=" " required />
              <label htmlFor="message">{t('contact.form.message')}</label>
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-full"
              style={sent ? { background: 'var(--leaf-deep)' } : undefined}
            >
              {sent ? t('contact.form.sent') : t('contact.form.submit')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
