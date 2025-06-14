import { createContext, useState, useEffect } from 'react';
import { LANGUAGES, translations } from '../i18n/languages';

// Create LanguageContext
const LanguageContext = createContext();

// Language provider component
export const LanguageProvider = ({ children }) => {
  // Get initial language from localStorage or browser default or fallback to 'fr'
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && LANGUAGES[savedLanguage]) {
      return savedLanguage;
    }
    
    // Try to get from browser
    const browserLang = navigator.language.split('-')[0];
    return LANGUAGES[browserLang] ? browserLang : 'fr';
  });

  // Update language in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('language', language);
    // You could also update the document lang attribute
    document.documentElement.lang = language;
  }, [language]);

  // Translate function
  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  // Context value
  const value = {
    language,
    setLanguage,
    t,
    languages: LANGUAGES
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;