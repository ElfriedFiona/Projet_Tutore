import { useState, useEffect } from 'react';

// Hook personnalisé pour gérer les breakpoints Tailwind
export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState('lg');
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setWindowSize({ width, height });

      // Breakpoints Tailwind CSS
      if (width < 640) {
        setBreakpoint('xs');
      } else if (width < 768) {
        setBreakpoint('sm');
      } else if (width < 1024) {
        setBreakpoint('md');
      } else if (width < 1280) {
        setBreakpoint('lg');
      } else if (width < 1536) {
        setBreakpoint('xl');
      } else {
        setBreakpoint('2xl');
      }
    };

    // Initialisation
    updateBreakpoint();

    // Event listener pour le redimensionnement
    window.addEventListener('resize', updateBreakpoint);

    // Cleanup
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return {
    breakpoint,
    windowSize,
    // Helpers pour les breakpoints
    isXs: breakpoint === 'xs',
    isSm: breakpoint === 'sm', 
    isMd: breakpoint === 'md',
    isLg: breakpoint === 'lg',
    isXl: breakpoint === 'xl',
    is2Xl: breakpoint === '2xl',
    // Helpers pour les tailles d'écran
    isMobile: windowSize.width < 768,
    isTablet: windowSize.width >= 768 && windowSize.width < 1024,
    isDesktop: windowSize.width >= 1024,
    // Largeur et hauteur
    width: windowSize.width,
    height: windowSize.height,
  };
};

export default useBreakpoint;
