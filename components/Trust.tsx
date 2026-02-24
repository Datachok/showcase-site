'use client';

import Image from 'next/image';
import { useI18n } from '@/lib/i18n-context';

const clients = [
  { name: 'INA', href: 'https://www.ina.fr', descKey: 'trust.ina', logo: '/logos/ina.png' },
  { name: 'beta.gouv', href: 'https://beta.gouv.fr', descKey: 'trust.beta', logo: '/logos/betagouv.jpeg' },
  { name: 'Be Sport', href: 'https://www.besport.com', descKey: 'trust.besport', logo: '/logos/besport.svg' },
  { name: 'Airship', href: 'https://www.airship.com', descKey: 'trust.airship', logo: '/logos/airship.jpeg' },
  { name: 'Opéra de Paris', href: 'https://www.operadeparis.fr', descKey: 'trust.opera', logo: '/logos/opera.jpeg' },
];

export default function Trust() {
  const { t } = useI18n();
  return (
    <section className="trust-section">
      <div className="container">
        <p className="trust-label">{t('trust.label')}</p>
        <div className="trust-logos">
          {clients.map(c => (
            <a key={c.name} href={c.href} target="_blank" rel="noopener noreferrer" className="trust-logo" data-reveal>
              <Image src={c.logo} alt={c.name} width={64} height={64} className="trust-logo-img" />
              <span className="trust-name">{c.name}</span>
              <span className="trust-desc">{t(c.descKey)}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
