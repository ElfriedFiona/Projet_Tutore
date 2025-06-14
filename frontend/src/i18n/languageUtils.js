import { useContext } from 'react';
import LanguageContext from '../context/LanguageContext';
import { LANGUAGES, translations } from './languages';

// Custom hook for using language
export const useLanguage = () => useContext(LanguageContext);

// Helper function to get translation
export const getTranslation = (language, key) => {
  return translations[language]?.[key] || key;
};
