import { useState, useEffect, useMemo } from 'react';
import useBreakpoint from './useBreakpoint';

/**
 * Hook personnalisé pour gérer les aspects responsifs spécifiques au dashboard
 * Optimise les marges, espacements et grilles selon les breakpoints
 */
const useResponsiveDashboard = () => {
  const { isMobile, isTablet, isDesktop, breakpoint, width } = useBreakpoint();
  const [sidebarMargin, setSidebarMargin] = useState('0');
  const [contentPadding, setContentPadding] = useState('1rem');
  const [gridColumns, setGridColumns] = useState(1);

  // Calcul des valeurs selon la taille d'écran
  useEffect(() => {
    if (isDesktop) {
      setSidebarMargin('16rem'); // w-64
      setContentPadding('2rem');
      setGridColumns(3);
    } else if (isTablet) {
      setSidebarMargin('4rem'); // w-16
      setContentPadding('1.5rem');
      setGridColumns(2);
    } else {
      setSidebarMargin('0');
      setContentPadding('1rem');
      setGridColumns(1);
    }
  }, [isMobile, isTablet, isDesktop]);
  // Configuration des grilles responsive selon le type
  const getGridConfig = useMemo(() => (type = 'standard') => {
    const configs = {
      standard: {
        mobile: 'grid-cols-1',
        tablet: 'grid-cols-2',
        desktop: 'grid-cols-3'
      },
      cards: {
        mobile: 'grid-cols-1 gap-4',
        tablet: 'grid-cols-2 gap-6',
        desktop: 'grid-cols-3 gap-6'
      },
      stats: {
        mobile: 'grid-cols-2 gap-3',
        tablet: 'grid-cols-4 gap-4',
        desktop: 'grid-cols-4 gap-6'
      },
      wide: {
        mobile: 'grid-cols-1 gap-4',
        tablet: 'grid-cols-2 gap-6',
        desktop: 'grid-cols-4 gap-6'
      },
      compact: {
        mobile: 'grid-cols-2 gap-2',
        tablet: 'grid-cols-3 gap-3',
        desktop: 'grid-cols-4 gap-4'
      }
    };

    const config = configs[type] || configs.standard;
    
    if (isMobile) return config.mobile;
    if (isTablet) return config.tablet;
    return config.desktop;
  }, [isMobile, isTablet]);
  // Classes CSS responsive pour différents éléments
  const getResponsiveClasses = useMemo(() => (element = 'container') => {
    const classes = {
      container: {
        mobile: 'p-4',
        tablet: 'p-6',
        desktop: 'p-8'
      },
      heading: {
        mobile: 'text-xl sm:text-2xl',
        tablet: 'text-2xl md:text-3xl',
        desktop: 'text-3xl lg:text-4xl'
      },
      subheading: {
        mobile: 'text-lg',
        tablet: 'text-xl',
        desktop: 'text-2xl'
      },
      text: {
        mobile: 'text-sm',
        tablet: 'text-base',
        desktop: 'text-lg'
      },
      button: {
        mobile: 'px-3 py-1.5 text-sm',
        tablet: 'px-4 py-2 text-base',
        desktop: 'px-6 py-3 text-lg'
      },
      card: {
        mobile: 'p-4 rounded-lg',
        tablet: 'p-6 rounded-xl',
        desktop: 'p-8 rounded-2xl'
      },
      modal: {
        mobile: 'mx-4 p-4',
        tablet: 'mx-8 p-6',
        desktop: 'mx-auto p-8'
      }
    };

    const elementClasses = classes[element] || classes.container;
    
    if (isMobile) return elementClasses.mobile;
    if (isTablet) return elementClasses.tablet;
    return elementClasses.desktop;
  }, [isMobile, isTablet]);
  // Calcul des tailles d'espacement
  const getSpacing = useMemo(() => (size = 'standard') => {
    const spacings = {
      small: {
        mobile: 'gap-2 p-2',
        tablet: 'gap-3 p-3',
        desktop: 'gap-4 p-4'
      },
      standard: {
        mobile: 'gap-4 p-4',
        tablet: 'gap-6 p-6',
        desktop: 'gap-8 p-8'
      },
      large: {
        mobile: 'gap-6 p-6',
        tablet: 'gap-8 p-8',
        desktop: 'gap-10 p-10'
      }
    };

    const spacing = spacings[size] || spacings.standard;
    
    if (isMobile) return spacing.mobile;
    if (isTablet) return spacing.tablet;
    return spacing.desktop;
  }, [isMobile, isTablet]);

  // Calcul des largeurs max selon le contexte
  const getMaxWidth = useMemo(() => (context = 'standard') => {
    const maxWidths = {
      narrow: 'max-w-2xl',
      standard: 'max-w-4xl',
      wide: 'max-w-6xl',
      full: 'max-w-7xl'
    };

    // Sur mobile, toujours utiliser toute la largeur
    if (isMobile) return 'max-w-full';
    
    return maxWidths[context] || maxWidths.standard;
  }, [isMobile]);

  // Configuration des tables responsive
  const getTableConfig = useMemo(() => () => {
    return {
      showColumns: {
        mobile: ['name', 'status'],
        tablet: ['name', 'date', 'status'],
        desktop: ['name', 'date', 'category', 'status', 'actions']
      },
      fontSize: getResponsiveClasses('text'),
      cellPadding: {
        mobile: 'px-2 py-3',
        tablet: 'px-4 py-3',
        desktop: 'px-6 py-4'
      }[isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop']
    };
  }, [isMobile, isTablet, getResponsiveClasses]);

  return {
    // États de breakpoint
    isMobile,
    isTablet,
    isDesktop,
    breakpoint,
    width,
    
    // Valeurs calculées
    sidebarMargin,
    contentPadding,
    gridColumns,
    
    // Fonctions utilitaires
    getGridConfig,
    getResponsiveClasses,
    getSpacing,
    getMaxWidth,
    getTableConfig,
    
    // Classes CSS prêtes à l'emploi
    containerClasses: getResponsiveClasses('container'),
    headingClasses: getResponsiveClasses('heading'),
    cardClasses: getResponsiveClasses('card'),
    textClasses: getResponsiveClasses('text')
  };
};

export default useResponsiveDashboard;
