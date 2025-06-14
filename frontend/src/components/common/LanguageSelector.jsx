import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../i18n/languageUtils';
import { LANGUAGES } from '../../i18n/languages';
import { Globe } from 'lucide-react';

const LanguageSelector = ({ className = '' }) => {
  const { language, setLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle clicks outside of dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 hover:bg-primary-100 text-primary-700"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Sélectionner la langue"
      >
        <Globe size={18} />
        <span className="font-medium">{languages[language]?.name || 'Langue'}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 py-2 bg-neutral-900 rounded-lg shadow-xl z-20 border border-primary-100">
          {Object.keys(languages).map((langCode) => (
            <button
              key={langCode}              className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-200 
                ${language === langCode ? 'bg-primary-50 text-primary-700 font-medium' : 'hover:bg-gray-100'}
                text-gray-200`}
              onClick={() => handleLanguageChange(langCode)}
              aria-current={language === langCode ? 'true' : 'false'}
            >
              {languages[langCode].name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
