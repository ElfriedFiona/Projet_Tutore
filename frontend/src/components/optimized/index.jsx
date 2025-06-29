import React, { memo, lazy, Suspense, useMemo, useCallback, useState } from 'react';
import { debounce, throttle, withMemoization } from '../../utils/performance';

/**
 * Composant Card optimisé avec memoization
 */
const OptimizedCard = memo(({ children, className = '', onClick, ...props }) => {
  const cardClasses = useMemo(() => {
    const baseClasses = 'bg-surface-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300';
    return className ? `${baseClasses} ${className}` : baseClasses;
  }, [className]);

  const handleClick = useCallback((e) => {
    if (onClick) {
      onClick(e);
    }
  }, [onClick]);

  return (
    <div 
      className={cardClasses}
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  );
});

OptimizedCard.displayName = 'OptimizedCard';

/**
 * Header de carte optimisé
 */
const OptimizedCardHeader = memo(({ children, className = '' }) => {
  const headerClasses = useMemo(() => 
    `px-6 py-4 bg-surface-background border-b border-surface-border ${className}`,
    [className]
  );

  return (
    <div className={headerClasses}>
      {children}
    </div>
  );
});

OptimizedCardHeader.displayName = 'OptimizedCardHeader';

/**
 * Titre de carte optimisé
 */
const OptimizedCardTitle = memo(({ children, className = '', level = 3 }) => {
  const titleClasses = useMemo(() => 
    `text-lg font-semibold text-text-primary ${className}`,
    [className]
  );

  const TitleComponent = useMemo(() => {
    const Tag = `h${level}`;
    return ({ children, className }) => (
      <Tag className={className}>{children}</Tag>
    );
  }, [level]);

  return <TitleComponent className={titleClasses}>{children}</TitleComponent>;
});

OptimizedCardTitle.displayName = 'OptimizedCardTitle';

/**
 * Contenu de carte optimisé
 */
const OptimizedCardContent = memo(({ children, className = '' }) => {
  const contentClasses = useMemo(() => `p-6 ${className}`, [className]);

  return (
    <div className={contentClasses}>
      {children}
    </div>
  );
});

OptimizedCardContent.displayName = 'OptimizedCardContent';

/**
 * Footer de carte optimisé
 */
const OptimizedCardFooter = memo(({ children, className = '' }) => {
  const footerClasses = useMemo(() => 
    `px-6 py-4 bg-surface-background border-t border-surface-border flex justify-end space-x-2 ${className}`,
    [className]
  );

  return (
    <div className={footerClasses}>
      {children}
    </div>
  );
});

OptimizedCardFooter.displayName = 'OptimizedCardFooter';

/**
 * Bouton optimisé avec variants
 */
const OptimizedButton = memo(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false,
  disabled = false,
  onClick,
  className = '',
  ...props 
}) => {
  const buttonClasses = useMemo(() => {
    const variants = {
      primary: 'bg-primary-600 hover:bg-primary-700 text-white',
      secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white',
      outline: 'border border-primary-600 text-primary-600 hover:bg-primary-50',
      ghost: 'text-primary-600 hover:bg-primary-50',
      danger: 'bg-red-600 hover:bg-red-700 text-white'
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    };

    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500';
    const variantClasses = variants[variant] || variants.primary;
    const sizeClasses = sizes[size] || sizes.md;
    const disabledClasses = disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

    return `${baseClasses} ${variantClasses} ${sizeClasses} ${disabledClasses} ${className}`.trim();
  }, [variant, size, disabled, loading, className]);

  const handleClick = useCallback((e) => {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  }, [disabled, loading, onClick]);

  return (
    <button 
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
});

OptimizedButton.displayName = 'OptimizedButton';

/**
 * Input optimisé avec validation
 */
const OptimizedInput = memo(({ 
  id,
  name,
  type = 'text',
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = false,
  disabled = false,
  className = '',
  ...props 
}) => {
  const inputClasses = useMemo(() => {
    const baseClasses = 'mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200';
    const errorClasses = error ? 'border-red-300 text-red-900 placeholder-red-300' : 'border-gray-300';
    const disabledClasses = disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white';
    
    return `${baseClasses} ${errorClasses} ${disabledClasses} ${className}`.trim();
  }, [error, disabled, className]);

  const handleChange = useCallback((e) => {
    if (onChange) {
      onChange(e);
    }
  }, [onChange]);

  const handleBlur = useCallback((e) => {
    if (onBlur) {
      onBlur(e);
    }
  }, [onBlur]);

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClasses}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

OptimizedInput.displayName = 'OptimizedInput';

/**
 * Composant de liste virtualisée pour les grandes listes
 */
const VirtualizedList = memo(({ 
  items = [], 
  renderItem, 
  itemHeight = 60,
  containerHeight = 400,
  className = '' 
}) => {
  const [scrollTop, setScrollTop] = React.useState(0);

  const visibleRange = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight);
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const end = Math.min(start + visibleCount + 2, items.length); // +2 pour l'overscan

    return { start: Math.max(0, start - 1), end };
  }, [scrollTop, itemHeight, containerHeight, items.length]);

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.start, visibleRange.end);
  }, [items, visibleRange]);

  const totalHeight = items.length * itemHeight;
  const offsetY = visibleRange.start * itemHeight;

  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);

  return (
    <div
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) => (
            <div key={visibleRange.start + index} style={{ height: itemHeight }}>
              {renderItem(item, visibleRange.start + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

VirtualizedList.displayName = 'VirtualizedList';

/**
 * Composant Modal optimisé
 */
const OptimizedModal = memo(({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  className = '' 
}) => {
  const modalClasses = useMemo(() => {
    const sizes = {
      sm: 'max-w-md',
      md: 'max-w-lg',
      lg: 'max-w-2xl',
      xl: 'max-w-4xl'
    };

    const sizeClass = sizes[size] || sizes.md;
    return `bg-white rounded-lg shadow-xl ${sizeClass} w-full mx-4 ${className}`.trim();
  }, [size, className]);

  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className={modalClasses}>
        {title && (
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          </div>
        )}
        <div className="px-6 py-4">
          {children}
        </div>
      </div>
    </div>
  );
});

OptimizedModal.displayName = 'OptimizedModal';

/**
 * Composant de recherche optimisé avec debounce
 */
const OptimizedSearch = memo(({ 
  onSearch, 
  placeholder = "Rechercher des livres...", 
  delay = 300,
  className = "" 
}) => {
  const debouncedSearch = debounce(onSearch, delay);
  
  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={(e) => debouncedSearch(e.target.value)}
      className={`w-full px-4 py-2 border border-surface-border rounded-lg 
                 focus:ring-2 focus:ring-primary-500 focus:border-transparent
                 bg-surface-background text-text-primary ${className}`}
    />
  );
});

OptimizedSearch.displayName = 'OptimizedSearch';

/**
 * Composant de chargement
 */
const LoadingSpinner = ({ size = 'medium', message = 'Chargement...' }) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  return (
    <div className="flex flex-col justify-center items-center py-8">
      <div className={`animate-spin rounded-full border-b-2 border-primary-500 ${sizeClasses[size]}`}></div>
      {message && (
        <p className="mt-2 text-sm text-text-secondary">{message}</p>
      )}
    </div>
  );
};

/**
 * Wrapper pour les composants lazy avec gestion des erreurs
 */
const LazyWrapper = ({ children, fallback, errorMessage = "Erreur de chargement" }) => (
  <Suspense fallback={fallback || <LoadingSpinner />}>
    <ErrorBoundary fallback={<div className="text-red-500 p-4">{errorMessage}</div>}>
      {children}
    </ErrorBoundary>
  </Suspense>
);

/**
 * Composant de liste optimisé avec défilement virtuel
 */
const OptimizedList = memo(({ 
  items, 
  renderItem, 
  itemHeight = 60,
  containerHeight = 400,
  className = ""
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  
  const visibleItems = useMemo(() => {
    return calculateVisibleItems(containerHeight, itemHeight, scrollTop);
  }, [containerHeight, itemHeight, scrollTop]);
  
  const handleScroll = throttle((e) => {
    setScrollTop(e.target.scrollTop);
  }, 16); // 60fps
  
  return (
    <div 
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        {items.slice(visibleItems.startIndex, visibleItems.endIndex).map((item, index) => (
          <div
            key={item.id || visibleItems.startIndex + index}
            style={{
              position: 'absolute',
              top: (visibleItems.startIndex + index) * itemHeight,
              height: itemHeight,
              width: '100%'
            }}
          >
            {renderItem(item, visibleItems.startIndex + index)}
          </div>
        ))}
      </div>
    </div>
  );
});

OptimizedList.displayName = 'OptimizedList';

// Export des composants optimisés
export {
  OptimizedCard as Card,
  OptimizedCardHeader as CardHeader,
  OptimizedCardTitle as CardTitle,
  OptimizedCardContent as CardContent,
  OptimizedCardFooter as CardFooter,
  OptimizedButton as Button,
  OptimizedInput as Input,
  VirtualizedList,
  OptimizedModal as Modal,
  OptimizedSearch,
  LoadingSpinner,
  LazyWrapper,
  OptimizedList,
};

// Export avec HOC de memoization
export const MemoizedCard = withMemoization(OptimizedCard);
export const MemoizedButton = withMemoization(OptimizedButton);
export const MemoizedInput = withMemoization(OptimizedInput);
export const MemoizedModal = withMemoization(OptimizedModal);
