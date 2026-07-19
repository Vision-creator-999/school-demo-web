import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const toggleLanguage = () => {
    const nextLang = currentLang === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1 px-2 py-1.5 rounded border border-primary/20 text-primary hover:bg-primary hover:text-white transition-all duration-300 font-bold text-xs cursor-pointer shadow-2xs bg-white/50"
      aria-label="Toggle Language"
    >
      <Globe size={13} className="text-primary animate-pulse" />
      <span className={currentLang === 'en' ? 'font-devanagari text-[12px]' : 'font-sans uppercase text-[10px] tracking-wider'}>
        {currentLang === 'en' ? 'हिन्दी' : 'English'}
      </span>
    </button>
  );
};
