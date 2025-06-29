// src/components/dev/ResponsiveTester.jsx
import { useState } from 'react';

/**
 * Outil de développement pour tester le design responsif
 * Affiche un widget flottant qui permet de basculer entre différentes tailles d'écran
 * Ne pas utiliser en production - uniquement pour le développement
 */
const ResponsiveTester = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentWidth, setCurrentWidth] = useState(null);

  // Breakpoints de l'application
  const breakpoints = [
    { name: 'xs', width: 480 },
    { name: 'sm', width: 640 },
    { name: 'md', width: 768 },
    { name: 'lg', width: 1024 },
    { name: 'xl', width: 1280 },
    { name: '2xl', width: 1536 },
  ];

  const handleResize = (width) => {
    const viewport = document.querySelector('meta[name=viewport]');
    
    if (width === null) {
      // Réinitialiser à la taille normale
      viewport.setAttribute('content', 'width=device-width, initial-scale=1');
      setCurrentWidth(null);
    } else {
      // Définir la largeur spécifique pour simuler un appareil
      viewport.setAttribute('content', `width=${width}`);
      setCurrentWidth(width);
    }
  };

  const getColorForBreakpoint = (breakpoint) => {
    const colors = {
      xs: 'bg-red-500',
      sm: 'bg-orange-500',
      md: 'bg-yellow-500',
      lg: 'bg-green-500',
      xl: 'bg-blue-500',
      '2xl': 'bg-purple-500'
    };
    
    return colors[breakpoint.name] || 'bg-gray-500';
  };
  // Ne pas rendre en production
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-600 text-neutral-900 shadow-lg hover:bg-primary-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8v8m0-8h8m-8 0L8 4m8 4v8m0-8h8m-8 0l4-4" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="bg-gray-800 rounded-lg shadow-xl mt-2 p-4 text-neutral-900 animate-fade-in">
          <div className="mb-3 flex justify-between items-center">
            <h3 className="text-sm font-medium">Testeur Responsive</h3>
            <span className="text-xs px-2 py-1 bg-gray-700 rounded">
              {currentWidth ? `${currentWidth}px` : 'Taille réelle'}
            </span>
          </div>
          
          <div className="space-y-2">
            <button 
              onClick={() => handleResize(null)} 
              className={`w-full px-3 py-1.5 rounded text-xs font-medium ${currentWidth === null ? 'bg-neutral-900 text-gray-800' : 'bg-gray-700'}`}
            >
              Taille réelle
            </button>
            
            {breakpoints.map((breakpoint) => (
              <button 
                key={breakpoint.name}
                onClick={() => handleResize(breakpoint.width)} 
                className={`w-full px-3 py-1.5 rounded text-xs font-medium flex items-center ${
                  currentWidth === breakpoint.width ? 'bg-neutral-900 text-gray-800' : 'bg-gray-700'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${getColorForBreakpoint(breakpoint)} mr-2`}></span>
                {breakpoint.name} ({breakpoint.width}px)
              </button>
            ))}
          </div>
          
          <div className="mt-4 text-xs text-gray-400">
            Note: Ce widget est destiné uniquement au développement.
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponsiveTester;
