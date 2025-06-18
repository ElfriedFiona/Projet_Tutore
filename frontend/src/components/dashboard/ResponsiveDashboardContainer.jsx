import React from 'react';
import useResponsiveDashboard from '../../hooks/useResponsiveDashboard';

/**
 * Container responsive pour les pages du dashboard
 * Gère automatiquement les espacements, marges et classes selon la taille d'écran
 */
const ResponsiveDashboardContainer = ({ 
  children, 
  className = '', 
  maxWidth = 'full',
  spacing = 'standard',
  showBackground = true,
  noPadding = false
}) => {
  const { 
    getResponsiveClasses, 
    getSpacing, 
    getMaxWidth
  } = useResponsiveDashboard();

  const baseClasses = showBackground 
    ? 'min-h-screen bg-gradient-to-br from-gray-50 to-blue-50'
    : 'min-h-screen';

  const containerClasses = noPadding 
    ? '' 
    : getResponsiveClasses('container');
    
  const spacingClasses = getSpacing(spacing);
  const maxWidthClass = getMaxWidth(maxWidth);

  return (
    <div className={`${baseClasses} ${className}`}>
      <div className={`${containerClasses} ${spacingClasses}`}>
        <div className={`${maxWidthClass} mx-auto`}>
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * Container de grille responsive pour cartes dashboard
 */
export const ResponsiveDashboardGrid = ({ 
  children, 
  type = 'cards',
  className = '' 
}) => {
  const { getGridConfig } = useResponsiveDashboard();
  const gridClasses = getGridConfig(type);

  return (
    <div className={`grid ${gridClasses} ${className}`}>
      {children}
    </div>
  );
};

/**
 * Carte dashboard responsive
 */
export const ResponsiveDashboardCard = ({ 
  children, 
  className = '',
  variant = 'standard',
  hover = true 
}) => {
  const { getResponsiveClasses } = useResponsiveDashboard();
  const cardClasses = getResponsiveClasses('card');
  
  const baseClasses = 'bg-white shadow-sm border border-gray-200 transition-all duration-300';
  const hoverClasses = hover ? 'hover:shadow-md hover:scale-105' : '';
  const variantClasses = variant === 'gradient' 
    ? 'bg-gradient-to-br from-white to-gray-50' 
    : '';

  return (
    <div className={`${baseClasses} ${cardClasses} ${hoverClasses} ${variantClasses} ${className}`}>
      {children}
    </div>
  );
};

/**
 * En-tête de page dashboard responsive
 */
export const ResponsiveDashboardHeader = ({ 
  title, 
  subtitle, 
  actions,
  className = '' 
}) => {
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
 * Onglets dashboard responsive
 */
export const ResponsiveDashboardTabs = ({ 
  tabs, 
  activeTab, 
  onTabChange,
  className = '' 
}) => {
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
 * Tableau responsive pour dashboard
 */
export const ResponsiveDashboardTable = ({ 
  headers, 
  children,
  className = '' 
}) => {
  const { isMobile, getTableConfig } = useResponsiveDashboard();
  const tableConfig = getTableConfig();

  if (isMobile) {
    // Mode mobile : affichage en cartes
    return (
      <div className={`space-y-4 ${className}`}>
        {children}
      </div>
    );
  }

  // Mode desktop/tablet : tableau classique
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header, index) => (
                <th 
                  key={index}
                  className={`${tableConfig.cellPadding} text-left ${tableConfig.fontSize} font-medium text-gray-500 uppercase tracking-wider`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/**
 * Boutons d'action dashboard responsive
 */
export const ResponsiveDashboardActions = ({ 
  children,
  className = '' 
}) => {
  const { isMobile } = useResponsiveDashboard();

  return (
    <div className={`${isMobile ? 'flex flex-col space-y-2' : 'flex items-center space-x-3'} ${className}`}>
      {children}
    </div>
  );
};

export default ResponsiveDashboardContainer;
