import React from 'react';

/**
 * Composant de conteneur responsive qui adapte sa largeur et ses marges selon la taille d'écran
 * @param {Object} props - Propriétés du composant
 * @param {string} [props.variant='standard'] - Variante du conteneur ('standard', 'narrow', 'wide', 'fluid')
 * @param {React.ReactNode} props.children - Contenu enfant
 * @param {string} [props.className=''] - Classes CSS supplémentaires
 */
export const ResponsiveContainer = ({ 
  variant = 'standard',
  children,
  className = '',
  ...props 
}) => {
  // Définition des classes selon la variante
  const variantClasses = {
    standard: 'w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl',
    narrow: 'w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl',
    wide: 'w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl',
    fluid: 'w-full px-4 sm:px-6 lg:px-8',
  };

  return (
    <div 
      className={`${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Composant de grille responsive qui adapte le nombre de colonnes selon la taille d'écran
 * @param {Object} props - Propriétés du composant
 * @param {string} [props.variant='standard'] - Variante de la grille ('standard', 'tight', 'wide')
 * @param {React.ReactNode} props.children - Contenu enfant
 * @param {string} [props.className=''] - Classes CSS supplémentaires
 */
export const ResponsiveGrid = ({ 
  variant = 'standard',
  children,
  className = '',
  ...props 
}) => {
  // Définition des classes selon la variante
  const variantClasses = {
    standard: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6',
    tight: 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4',
    wide: 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8',
  };

  return (
    <div 
      className={`${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Composant de section responsive avec padding adaptatif
 * @param {Object} props - Propriétés du composant
 * @param {string} [props.size='standard'] - Taille de la section ('standard', 'small', 'large')
 * @param {React.ReactNode} props.children - Contenu enfant
 * @param {string} [props.className=''] - Classes CSS supplémentaires
 */
export const ResponsiveSection = React.forwardRef(({ 
  size = 'standard',
  children, 
  className = '',
  ...props 
}, ref) => {
  // Définition des classes selon la taille
  const sizeClasses = {
    standard: 'py-8 sm:py-12 lg:py-16',
    small: 'py-6 sm:py-8 lg:py-12',
    large: 'py-12 sm:py-16 lg:py-24',
  };

  return (
    <section 
      ref={ref}
      className={`${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
});

ResponsiveSection.displayName = 'ResponsiveSection';

/**
 * Composant de mise en page à deux colonnes responsive
 * @param {Object} props - Propriétés du composant
 * @param {React.ReactNode} props.left - Contenu de la colonne gauche
 * @param {React.ReactNode} props.right - Contenu de la colonne droite
 * @param {string} [props.breakpoint='md'] - Breakpoint pour passer en mode colonnes ('sm', 'md', 'lg')
 * @param {string} [props.leftWidth='1/2'] - Largeur relative de la colonne gauche (ex: '1/3', '2/3')
 * @param {string} [props.gap='6'] - Espacement entre les colonnes
 * @param {string} [props.className=''] - Classes CSS supplémentaires
 */
export const ResponsiveTwoColumns = ({ 
  left, 
  right, 
  breakpoint = 'md', 
  leftWidth = '1/2',
  gap = '6',
  className = '',
  ...props
}) => {
  return (
    <div 
      className={`flex flex-col ${breakpoint}:flex-row ${breakpoint}:gap-${gap} ${className}`}
      {...props}
    >
      <div className={`w-full ${breakpoint}:w-${leftWidth} mb-6 ${breakpoint}:mb-0`}>
        {left}
      </div>
      <div className={`w-full ${breakpoint}:w-${leftWidth === '1/2' ? '1/2' : leftWidth === '1/3' ? '2/3' : leftWidth === '2/3' ? '1/3' : leftWidth === '1/4' ? '3/4' : leftWidth === '3/4' ? '1/4' : '1/2'}`}>
        {right}
      </div>
    </div>
  );
};

/**
 * Wrapper d'image responsive avec gestion des ratios et chargement lazy
 * @param {Object} props - Propriétés du composant
 * @param {string} props.src - URL de l'image
 * @param {string} props.alt - Texte alternatif
 * @param {string} [props.aspectRatio='auto'] - Ratio d'aspect ('square', '16/9', '4/3', 'auto')
 * @param {boolean} [props.rounded=false] - Si true, ajout de coins arrondis
 * @param {string} [props.className=''] - Classes CSS supplémentaires
 */
export const ResponsiveImage = ({
  src,
  alt,
  aspectRatio = 'auto',
  rounded = false,
  className = '',
  ...props
}) => {
  // Définition des classes selon le ratio
  const ratioClasses = {
    'square': 'aspect-square',
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    'auto': 'aspect-auto',
  };
  
  return (
    <div className={`
      ${ratioClasses[aspectRatio]}
      ${rounded ? 'rounded-lg overflow-hidden' : ''}
      ${className}
    `}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
        {...props}
      />
    </div>
  );
};

/**
 * Titre responsive qui adapte sa taille selon l'écran
 * @param {Object} props - Propriétés du composant
 * @param {string} [props.variant='h1'] - Variante du titre ('h1', 'h2', 'h3', 'h4')
 * @param {React.ReactNode} props.children - Contenu enfant
 * @param {string} [props.className=''] - Classes CSS supplémentaires
 */
export const ResponsiveHeading = ({
  variant = 'h1',
  children,
  className = '',
  ...props
}) => {
  // Définition des classes selon la variante
  const variantClasses = {
    h1: 'text-3xl sm:text-4xl md:text-5xl font-bold',
    h2: 'text-2xl sm:text-3xl md:text-4xl font-bold',
    h3: 'text-xl sm:text-2xl font-semibold',
    h4: 'text-lg sm:text-xl font-semibold',
  };
  
  const Component = variant;
  
  return (
    <Component 
      className={`${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
