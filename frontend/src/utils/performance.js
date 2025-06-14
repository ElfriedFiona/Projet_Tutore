import { memo, useMemo, useCallback, useState } from 'react';
import React from 'react';

/**
 * Performance utilities for optimizing React components and user experience
 * Used across the ENSPD Library Management System
 */

// Debounce function for search inputs and API calls
export const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// Throttle function for scroll events and rapid user interactions
export const throttle = (func, limit = 100) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Lazy loading utility for images in the book catalog
export const lazyLoadImage = (src, placeholder = '/images/book-placeholder.png') => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => resolve(placeholder);
    img.src = src;
  });
};

// Performance monitoring wrapper for development
export const measurePerformance = (name, fn) => {
  return async (...args) => {
    if (process.env.NODE_ENV === 'development') {
      const start = performance.now();
      const result = await fn(...args);
      const end = performance.now();
      console.log(`⚡ ${name} took ${(end - start).toFixed(2)}ms`);
      return result;
    }
    return fn(...args);
  };
};

// Memory usage checker for development debugging
export const checkMemoryUsage = () => {
  if (process.env.NODE_ENV === 'development' && performance.memory) {
    const { usedJSHeapSize, totalJSHeapSize, jsHeapSizeLimit } = performance.memory;
    console.log('🧠 Memory Usage:', {
      used: `${Math.round(usedJSHeapSize / 1048576)} MB`,
      total: `${Math.round(totalJSHeapSize / 1048576)} MB`,
      limit: `${Math.round(jsHeapSizeLimit / 1048576)} MB`,
      usage: `${Math.round((usedJSHeapSize / jsHeapSizeLimit) * 100)}%`
    });
  }
};

// Intersection Observer for lazy loading components
export const createIntersectionObserver = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };
  
  if (!window.IntersectionObserver) {
    // Fallback for older browsers
    return {
      observe: () => {},
      unobserve: () => {},
      disconnect: () => {}
    };
  }
  
  return new IntersectionObserver(callback, defaultOptions);
};

// Virtual scrolling helper for large book lists
export const calculateVisibleItems = (containerHeight, itemHeight, scrollTop, buffer = 3) => {
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
  const visibleCount = Math.ceil(containerHeight / itemHeight) + buffer * 2;
  
  return {
    startIndex,
    endIndex: startIndex + visibleCount,
    visibleCount
  };
};

// Cache utility for API responses
export class SimpleCache {
  constructor(maxSize = 50, ttl = 5 * 60 * 1000) { // 5 minutes default TTL
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttl = ttl;
  }

  set(key, value) {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }

  clear() {
    this.cache.clear();
  }
}

// Book search optimization
export const optimizeBookSearch = (searchTerm, books) => {
  if (!searchTerm || searchTerm.length < 2) return books;
  
  const term = searchTerm.toLowerCase();
  return books.filter(book => 
    book.title?.toLowerCase().includes(term) ||
    book.author?.toLowerCase().includes(term) ||
    book.isbn?.includes(term) ||
    book.category?.toLowerCase().includes(term)
  );
};

// Batch processing for large operations
export const batchProcess = async (items, processor, batchSize = 10) => {
  const results = [];
  
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(item => processor(item))
    );
    results.push(...batchResults);
    
    // Small delay to prevent blocking the main thread
    if (i + batchSize < items.length) {
      await new Promise(resolve => setTimeout(resolve, 10));
    }
  }
  
  return results;
};

// Request deduplication for API calls
export class RequestDeduplicator {
  constructor() {
    this.pendingRequests = new Map();
  }

  async request(key, requestFn) {
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key);
    }

    const promise = requestFn().finally(() => {
      this.pendingRequests.delete(key);
    });

    this.pendingRequests.set(key, promise);
    return promise;
  }
}

// Performance monitoring for components
export const withPerformanceMonitoring = (componentName) => {
  return (WrappedComponent) => {
    return function PerformanceMonitoredComponent(props) {
      if (process.env.NODE_ENV === 'development') {
        const renderStart = performance.now();
        
        React.useEffect(() => {
          const renderEnd = performance.now();
          console.log(`🎯 ${componentName} render time: ${(renderEnd - renderStart).toFixed(2)}ms`);
        });
      }
      
      return React.createElement(WrappedComponent, props);
    };
  };
};

// Export instances for common use
export const apiCache = new SimpleCache(100, 10 * 60 * 1000); // 10 minutes for API responses
export const requestDeduplicator = new RequestDeduplicator();

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalImages = [
    '/images/logo-enspd.png',
    '/images/book-placeholder.png',
    '/images/user-avatar-default.png'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

/**
 * ErrorBoundary simple pour le HOC
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Erreur de chargement du composant</div>;
    }

    return this.props.children;
  }
}

/**
 * HOC pour memoization avancée des composants
 * @param {React.Component} Component - Composant à optimiser
 * @param {Object} options - Options de memoization
 * @returns {React.Component} Composant memoized
 */
export const withMemoization = (Component, options = {}) => {
  const {
    areEqual = null,
    displayName = Component.displayName || Component.name,
    deepEqual = false
  } = options;
  
  const customAreEqual = areEqual || ((prevProps, nextProps) => {
    if (deepEqual) {
      return JSON.stringify(prevProps) === JSON.stringify(nextProps);
    }
    
    const prevKeys = Object.keys(prevProps);
    const nextKeys = Object.keys(nextProps);
    
    if (prevKeys.length !== nextKeys.length) {
      return false;
    }
    
    return prevKeys.every(key => 
      Object.is(prevProps[key], nextProps[key])
    );
  });
  
  const MemoizedComponent = memo(Component, customAreEqual);
  MemoizedComponent.displayName = `Memoized(${displayName})`;
  
  return MemoizedComponent;
};

/**
 * Hook pour la création de callbacks memoized avec dépendances optimisées
 * @param {Function} callback - Fonction callback
 * @param {Array} deps - Dépendances
 * @param {Object} options - Options d'optimisation
 * @returns {Function} Callback memoized
 */
export const usePerformantCallback = (callback, deps = [], options = {}) => {
  const { enableDeepDeps = false, maxDepsLength = 10 } = options;
  
  // Optimisation des dépendances
  const optimizedDeps = useMemo(() => {
    if (deps.length > maxDepsLength) {
      console.warn(`usePerformantCallback: Trop de dépendances (${deps.length}). Considérez la refactorisation.`);
    }
    
    if (enableDeepDeps) {
      return deps.map(dep => 
        typeof dep === 'object' ? JSON.stringify(dep) : dep
      );
    }
    
    return deps;
  }, [deps, enableDeepDeps, maxDepsLength]);
  
  return useCallback(callback, optimizedDeps);
};

/**
 * Hook pour la memoization avancée avec cache LRU
 * @param {Function} computeFn - Fonction de calcul
 * @param {Array} deps - Dépendances
 * @param {Object} options - Options de cache
 * @returns {*} Résultat memoized
 */
export const useAdvancedMemo = (computeFn, deps = [], options = {}) => {
  const { 
    cacheSize = 10, 
    enablePersistence = false,
    storageKey = null 
  } = options;
  
  // Cache LRU simple
  const cache = useMemo(() => {
    const map = new Map();
    
    return {
      get(key) {
        if (map.has(key)) {
          const value = map.get(key);
          map.delete(key);
          map.set(key, value);
          return value;
        }
        return undefined;
      },
      
      set(key, value) {
        if (map.has(key)) {
          map.delete(key);
        } else if (map.size >= cacheSize) {
          const firstKey = map.keys().next().value;
          map.delete(firstKey);
        }
        map.set(key, value);
      },
      
      clear() {
        map.clear();
      }
    };
  }, [cacheSize]);
  
  const depsKey = useMemo(() => JSON.stringify(deps), [deps]);
  
  return useMemo(() => {
    const cached = cache.get(depsKey);
    
    if (cached !== undefined) {
      return cached;
    }
    
    const result = computeFn();
    cache.set(depsKey, result);
    
    // Persistance optionnelle
    if (enablePersistence && storageKey) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(result));
      } catch (error) {
        console.warn('Erreur de persistance du cache:', error);
      }
    }
    
    return result;
  }, [depsKey, cache, computeFn, enablePersistence, storageKey]);
};

/**
 * HOC pour le lazy loading conditionnel
 * @param {Function} importFn - Fonction d'import dynamique
 * @param {Object} options - Options de lazy loading
 * @returns {React.Component} Composant lazy
 */
export const withConditionalLazy = (importFn, options = {}) => {
  const {
    condition = () => true,
    fallback = null,
    errorBoundary = true
  } = options;
  
  return (props) => {
    const shouldLoad = useMemo(() => condition(props), [props]);
    
    const LazyComponent = useMemo(() => {
      if (!shouldLoad) return () => fallback;
      
      const Component = React.lazy(importFn);
      
      if (errorBoundary) {
        return (componentProps) => (
          <ErrorBoundary fallback={fallback}>
            <React.Suspense fallback={fallback}>
              <Component {...componentProps} />
            </React.Suspense>
          </ErrorBoundary>
        );
      }
      
      return Component;
    }, [shouldLoad]);
    
    return <LazyComponent {...props} />;
  };
};

/**
 * Hook pour l'optimisation des listes avec virtualisation
 * @param {Array} items - Items à afficher
 * @param {Object} options - Options de virtualisation
 * @returns {Object} Données pour la virtualisation
 */
export const useVirtualizedList = (items = [], options = {}) => {
  const {
    itemHeight = 50,
    containerHeight = 300,
    overscan = 3
  } = options;
  
  const [scrollTop, setScrollTop] = useState(0);
  
  const visibleRange = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.min(
      start + Math.ceil(containerHeight / itemHeight) + overscan,
      items.length
    );
    
    return {
      start: Math.max(0, start - overscan),
      end
    };
  }, [scrollTop, itemHeight, containerHeight, overscan, items.length]);
  
  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.start, visibleRange.end).map((item, index) => ({
      ...item,
      index: visibleRange.start + index,
      top: (visibleRange.start + index) * itemHeight
    }));
  }, [items, visibleRange, itemHeight]);
  
  const totalHeight = items.length * itemHeight;
  
  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);
  
  return {
    visibleItems,
    totalHeight,
    handleScroll,
    visibleRange
  };
};
