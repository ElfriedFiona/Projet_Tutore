import React from 'react';
import useResponsiveDashboard from '../../hooks/useResponsiveDashboard';

/**
 * Wrapper HOC pour rendre n'importe quelle page dashboard responsive
 * Utilisation : withResponsiveDashboard(YourDashboardComponent)
 */
export const withResponsiveDashboard = (WrappedComponent) => {
  return function ResponsiveDashboardWrapper(props) {
    const responsiveProps = useResponsiveDashboard();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <div className={responsiveProps.containerClasses}>
          <div className={responsiveProps.getMaxWidth('full')} mx-auto>
            <WrappedComponent {...props} responsive={responsiveProps} />
          </div>
        </div>
      </div>
    );
  };
};

/**
 * Composant wrapper simple pour ajouter le responsive à une page existante
 */
export const ResponsiveWrapper = ({ children, maxWidth = 'full', spacing = 'standard' }) => {
  const { getResponsiveClasses, getMaxWidth, getSpacing } = useResponsiveDashboard();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className={`${getResponsiveClasses('container')} ${getSpacing(spacing)}`}>
        <div className={`${getMaxWidth(maxWidth)} mx-auto`}>
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * Composant pour rendre les grilles existantes responsives
 */
export const ResponsiveGridWrapper = ({ children, type = 'cards', className = '' }) => {
  const { getGridConfig } = useResponsiveDashboard();
  const gridClasses = getGridConfig(type);
  
  return (
    <div className={`grid ${gridClasses} ${className}`}>
      {children}
    </div>
  );
};

/**
 * Composant pour rendre les cartes existantes responsives
 */
export const ResponsiveCardWrapper = ({ children, hover = true, className = '' }) => {
  const { getResponsiveClasses } = useResponsiveDashboard();
  const cardClasses = getResponsiveClasses('card');
  
  const baseClasses = 'bg-white shadow-sm border border-gray-200 transition-all duration-300';
  const hoverClasses = hover ? 'hover:shadow-md hover:scale-[1.02]' : '';
  
  return (
    <div className={`${baseClasses} ${cardClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};

/**
 * Composant pour rendre les en-têtes existants responsives
 */
export const ResponsiveHeaderWrapper = ({ title, subtitle, actions, className = '' }) => {
  const { getResponsiveClasses, isMobile } = useResponsiveDashboard();
  const headingClasses = getResponsiveClasses('heading');
  const textClasses = getResponsiveClasses('text');
  
  return (
    <div className={`mb-6 sm:mb-8 ${className}`}>
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
        <div className={`${isMobile ? 'space-y-4' : 'flex items-center justify-between'}`}>
          <div>
            <h1 className={`${headingClasses} font-bold text-gray-800 mb-2`}>
              {title}
            </h1>
            {subtitle && (
              <p className={`${textClasses} text-gray-600`}>
                {subtitle}
              </p>
            )}
          </div>
          {actions && (
            <div className={`${isMobile ? 'flex flex-wrap gap-2' : 'flex items-center space-x-3'}`}>
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Composant pour rendre les onglets existants responsives
 */
export const ResponsiveTabsWrapper = ({ tabs, activeTab, onTabChange, className = '' }) => {
  const { isMobile, getResponsiveClasses } = useResponsiveDashboard();
  const textClasses = getResponsiveClasses('text');
  
  return (
    <div className={`mb-6 ${className}`}>
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-1">
        <div className={`${isMobile ? 'flex flex-col space-y-1' : 'flex space-x-1'}`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`${isMobile ? 'w-full' : 'flex-1'} py-3 px-6 rounded-xl ${textClasses} font-medium transition-all duration-300 relative overflow-hidden ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-primary-500 to-primary-700 text-white shadow-lg transform'
                  : 'text-gray-600 hover:text-neutral-700 hover:bg-primary-50'
              }`}
            >
              {activeTab === tab.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-primary-600/20 animate-pulse"></div>
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Composant pour rendre les actions existantes responsives
 */
export const ResponsiveActionsWrapper = ({ children, className = '' }) => {
  const { isMobile } = useResponsiveDashboard();
  
  return (
    <div className={`${isMobile ? 'flex flex-col space-y-2' : 'flex items-center space-x-3'} ${className}`}>
      {children}
    </div>
  );
};

/**
 * Hook pour faciliter la migration progressive
 */
export const useResponsiveMigration = () => {
  const responsive = useResponsiveDashboard();
  
  return {
    ...responsive,
    // Classes prêtes à l'emploi pour migration rapide
    containerClasses: 'p-4 sm:p-6 lg:p-8',
    headerClasses: 'text-2xl sm:text-3xl lg:text-4xl',
    cardClasses: 'p-4 sm:p-6 lg:p-8 rounded-lg sm:rounded-xl lg:rounded-2xl',
    gridClasses: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6',
    
    // Utilitaires pour conversion rapide
    wrapGrid: (type = 'cards') => `grid ${responsive.getGridConfig(type)}`,
    wrapCard: 'bg-white shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md',
    wrapActions: responsive.isMobile ? 'flex flex-col space-y-2' : 'flex items-center space-x-3',
    
    // Classes conditionnelles pour breakpoints
    onlyMobile: responsive.isMobile ? 'block' : 'hidden',
    onlyTablet: responsive.isTablet ? 'block' : 'hidden', 
    onlyDesktop: responsive.isDesktop ? 'block' : 'hidden',
    notMobile: !responsive.isMobile ? 'block' : 'hidden'
  };
};

export default {
  withResponsiveDashboard,
  ResponsiveWrapper,
  ResponsiveGridWrapper,
  ResponsiveCardWrapper,
  ResponsiveHeaderWrapper,
  ResponsiveTabsWrapper,
  ResponsiveActionsWrapper,
  useResponsiveMigration
};
