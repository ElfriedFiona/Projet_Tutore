import { useState, useCallback, useMemo, useRef, useEffect } from 'react';

/**
 * Hook optimisé pour la gestion d'état avec memoization automatique
 * @param {*} initialState - État initial
 * @param {Object} options - Options de configuration
 * @returns {Array} [state, setState, memoizedState]
 */
export const useOptimizedState = (initialState, options = {}) => {
  const { 
    enableMemo = true, 
    deepEqual = false,
    debounceDelay = 0 
  } = options;
  
  const [state, setState] = useState(initialState);
  const debounceTimer = useRef(null);
  const previousState = useRef(initialState);
  
  // État memoized pour éviter les re-renders inutiles
  const memoizedState = useMemo(() => {
    if (!enableMemo) return state;
    
    if (deepEqual) {
      return JSON.stringify(state) === JSON.stringify(previousState.current) 
        ? previousState.current 
        : state;
    }
    
    return state === previousState.current ? previousState.current : state;
  }, [state, enableMemo, deepEqual]);
  
  // SetState optimisé avec debounce optionnel
  const optimizedSetState = useCallback((newState) => {
    if (debounceDelay > 0) {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        setState(newState);
        previousState.current = newState;
      }, debounceDelay);
    } else {
      setState(newState);
      previousState.current = newState;
    }
  }, [debounceDelay]);
  
  // Cleanup du timer
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);
  
  return [memoizedState, optimizedSetState, state];
};

/**
 * Hook pour la gestion optimisée des formulaires
 * @param {Object} initialValues - Valeurs initiales du formulaire
 * @param {Object} validationRules - Règles de validation
 * @returns {Object} Objet avec les valeurs, erreurs et fonctions de gestion
 */
export const useOptimizedForm = (initialValues, validationRules = {}) => {
  const [values, setValues] = useOptimizedState(initialValues, { enableMemo: true });
  const [errors, setErrors] = useOptimizedState({}, { enableMemo: true });
  const [touched, setTouched] = useOptimizedState({}, { enableMemo: true });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Validation memoized
  const validate = useCallback((fieldName, value) => {
    const rules = validationRules[fieldName];
    if (!rules) return null;
    
    for (const rule of rules) {
      const error = rule(value, values);
      if (error) return error;
    }
    return null;
  }, [validationRules, values]);
  
  // Gestionnaire de changement optimisé
  const handleChange = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Validation en temps réel
    const error = validate(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [setValues, setErrors, validate]);
  
  // Gestionnaire de blur
  const handleBlur = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  }, [setTouched]);
  
  // Reset du formulaire
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues, setValues, setErrors, setTouched]);
  
  // Validation complète du formulaire
  const validateAll = useCallback(() => {
    const newErrors = {};
    let hasErrors = false;
    
    Object.keys(values).forEach(key => {
      const error = validate(key, values[key]);
      if (error) {
        newErrors[key] = error;
        hasErrors = true;
      }
    });
    
    setErrors(newErrors);
    return !hasErrors;
  }, [values, validate, setErrors]);
  
  return {
    values,
    errors,
    touched,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    handleBlur,
    reset,
    validateAll,
    isValid: Object.keys(errors).length === 0
  };
};

/**
 * Hook pour la gestion optimisée des listes avec pagination et filtrage
 * @param {Array} data - Données à gérer
 * @param {Object} options - Options de configuration
 * @returns {Object} Objet avec les données paginées et fonctions de gestion
 */
export const useOptimizedList = (data = [], options = {}) => {
  const {
    itemsPerPage = 10,
    searchFields = [],
    sortField = null,
    sortDirection = 'asc'
  } = options;
  
  const [searchQuery, setSearchQuery] = useOptimizedState('', { debounceDelay: 300 });
  const [currentPage, setCurrentPage] = useOptimizedState(1);
  const [sort, setSort] = useOptimizedState({ 
    field: sortField, 
    direction: sortDirection 
  });
  
  // Données filtrées et triées
  const processedData = useMemo(() => {
    let filtered = data;
    
    // Filtrage par recherche
    if (searchQuery && searchFields.length > 0) {
      filtered = data.filter(item =>
        searchFields.some(field =>
          item[field]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    
    // Tri
    if (sort.field) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[sort.field];
        const bVal = b[sort.field];
        
        if (aVal < bVal) return sort.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sort.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    return filtered;
  }, [data, searchQuery, searchFields, sort]);
  
  // Pagination
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedData.slice(startIndex, startIndex + itemsPerPage);
  }, [processedData, currentPage, itemsPerPage]);
  
  const totalPages = Math.ceil(processedData.length / itemsPerPage);
  
  // Fonctions de navigation
  const goToPage = useCallback((page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }, [setCurrentPage, totalPages]);
  
  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages, setCurrentPage]);
  
  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage, setCurrentPage]);
  
  return {
    data: paginatedData,
    totalItems: processedData.length,
    currentPage,
    totalPages,
    searchQuery,
    sort,
    setSearchQuery,
    setSort,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1
  };
};
