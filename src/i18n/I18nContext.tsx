import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Translations, translations } from './translations';

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>('fr');

  useEffect(() => {
    const saved = localStorage.getItem('aura_lang') as Language | null;
    if (saved && (saved === 'es' || saved === 'en' || saved === 'fr')) {
      setLangState(saved);
    } else {
      // Auto-detect browser language
      const browserLang = navigator.language.slice(0, 2).toLowerCase();
      if (browserLang === 'en') setLangState('en');
      else if (browserLang === 'es') setLangState('es');
      else setLangState('fr');
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('aura_lang', newLang);
    document.documentElement.lang = newLang;
  };

  const value = {
    lang,
    setLang,
    t: translations[lang] || translations.fr,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
