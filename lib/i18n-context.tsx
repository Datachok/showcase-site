'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

export type Lang = 'en' | 'fr';

interface I18nContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

interface I18nProviderProps {
  children: ReactNode;
  translations: Record<string, Record<string, string>>;
}

export function I18nProvider({ children, translations }: I18nProviderProps) {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    const stored = localStorage.getItem('datachoke-lang') as Lang | null;
    if (stored === 'en' || stored === 'fr') setLang(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = lang === 'fr'
      ? 'Datachoke Studios — Data Engineering, un Art du Détail'
      : 'Datachoke Studios — Data Engineering, Artfully Crafted';
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang(prev => {
      const next = prev === 'en' ? 'fr' : 'en';
      localStorage.setItem('datachoke-lang', next);
      return next;
    });
  }, []);

  const t = useCallback((key: string) => {
    return translations[lang]?.[key] ?? translations['en']?.[key] ?? key;
  }, [lang, translations]);

  return (
    <I18nContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}
