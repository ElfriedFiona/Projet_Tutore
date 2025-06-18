/**
 * Système de cache avancé pour l'optimisation des données
 */
import { useState, useEffect, useCallback } from 'react';

class CacheManager {
  constructor(options = {}) {
    this.maxSize = options.maxSize || 100;
    this.ttl = options.ttl || 5 * 60 * 1000; // 5 minutes par défaut
    this.storage = new Map();
    this.timestamps = new Map();
    this.hitCount = 0;
    this.missCount = 0;
  }

  /**
   * Génère une clé de cache basée sur les paramètres
   * @param {string} prefix - Préfixe de la clé
   * @param {*} params - Paramètres pour générer la clé
   * @returns {string} Clé de cache
   */
  generateKey(prefix, params) {
    const paramString = typeof params === 'object' 
      ? JSON.stringify(params, Object.keys(params).sort())
      : String(params);
    return `${prefix}:${paramString}`;
  }

  /**
   * Vérifie si une entrée de cache est expirée
   * @param {string} key - Clé de cache
   * @returns {boolean} True si expiré
   */
  isExpired(key) {
    const timestamp = this.timestamps.get(key);
    if (!timestamp) return true;
    return Date.now() - timestamp > this.ttl;
  }

  /**
   * Nettoie les entrées expirées
   */
  cleanup() {
    const now = Date.now();
    for (const [key, timestamp] of this.timestamps.entries()) {
      if (now - timestamp > this.ttl) {
        this.storage.delete(key);
        this.timestamps.delete(key);
      }
    }
  }

  /**
   * Évict les anciennes entrées si le cache est plein
   */
  evictOldest() {
    if (this.storage.size >= this.maxSize) {
      const oldest = Math.min(...this.timestamps.values());
      for (const [key, timestamp] of this.timestamps.entries()) {
        if (timestamp === oldest) {
          this.storage.delete(key);
          this.timestamps.delete(key);
          break;
        }
      }
    }
  }

  /**
   * Récupère une valeur du cache
   * @param {string} key - Clé de cache
   * @returns {*} Valeur du cache ou null
   */
  get(key) {
    if (this.isExpired(key)) {
      this.storage.delete(key);
      this.timestamps.delete(key);
      this.missCount++;
      return null;
    }

    if (this.storage.has(key)) {
      this.hitCount++;
      // Met à jour le timestamp pour LRU
      this.timestamps.set(key, Date.now());
      return this.storage.get(key);
    }

    this.missCount++;
    return null;
  }

  /**
   * Stocke une valeur dans le cache
   * @param {string} key - Clé de cache
   * @param {*} value - Valeur à stocker
   */
  set(key, value) {
    this.evictOldest();
    this.storage.set(key, value);
    this.timestamps.set(key, Date.now());
  }

  /**
   * Supprime une entrée du cache
   * @param {string} key - Clé de cache
   */
  delete(key) {
    this.storage.delete(key);
    this.timestamps.delete(key);
  }

  /**
   * Vide le cache
   */
  clear() {
    this.storage.clear();
    this.timestamps.clear();
    this.hitCount = 0;
    this.missCount = 0;
  }

  /**
   * Retourne les statistiques du cache
   * @returns {Object} Statistiques
   */
  getStats() {
    const total = this.hitCount + this.missCount;
    return {
      hitCount: this.hitCount,
      missCount: this.missCount,
      hitRate: total > 0 ? (this.hitCount / total) * 100 : 0,
      size: this.storage.size,
      maxSize: this.maxSize
    };
  }
}

// Instance globale du cache
export const globalCache = new CacheManager({
  maxSize: 200,
  ttl: 10 * 60 * 1000 // 10 minutes
});

/**
 * Hook pour utiliser le cache avec des requêtes async
 * @param {string} cacheKey - Clé de cache
 * @param {Function} fetchFn - Fonction de récupération des données
 * @param {Object} options - Options
 * @returns {Object} État de la requête cachée
 */
export const useCachedQuery = (cacheKey, fetchFn, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);

  const {
    enabled = true,
    staleTime = 5 * 60 * 1000, // 5 minutes
    refetchOnMount = true,
    refetchOnWindowFocus = false
  } = options;

  const isStale = useCallback(() => {
    if (!lastFetch) return true;
    return Date.now() - lastFetch > staleTime;
  }, [lastFetch, staleTime]);

  const fetchData = useCallback(async (force = false) => {
    if (!enabled) return;

    // Vérifie le cache d'abord
    const cachedData = globalCache.get(cacheKey);
    if (cachedData && !force && !isStale()) {
      setData(cachedData);
      return cachedData;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await fetchFn();
      setData(result);
      setLastFetch(Date.now());
      
      // Met en cache le résultat
      globalCache.set(cacheKey, result);
      
      return result;
    } catch (err) {
      setError(err);
      console.error('Erreur lors de la récupération des données:', err);
    } finally {
      setLoading(false);
    }
  }, [cacheKey, fetchFn, enabled, isStale]);

  // Fetch initial
  useEffect(() => {
    if (enabled && (refetchOnMount || !data)) {
      fetchData();
    }
  }, [enabled, refetchOnMount, data, fetchData]);

  // Refetch sur focus de la fenêtre
  useEffect(() => {
    if (!refetchOnWindowFocus) return;

    const handleFocus = () => {
      if (isStale()) {
        fetchData();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [refetchOnWindowFocus, isStale, fetchData]);

  const refetch = useCallback(() => {
    return fetchData(true);
  }, [fetchData]);

  const invalidate = useCallback(() => {
    globalCache.delete(cacheKey);
    setData(null);
    setLastFetch(null);
  }, [cacheKey]);

  return {
    data,
    loading,
    error,
    refetch,
    invalidate,
    isStale: isStale()
  };
};

/**
 * Hook pour invalider le cache
 * @param {string|Array} keys - Clé(s) à invalider
 * @returns {Function} Fonction d'invalidation
 */
export const useInvalidateCache = (keys) => {
  return useCallback(() => {
    const keyArray = Array.isArray(keys) ? keys : [keys];
    keyArray.forEach(key => {
      globalCache.delete(key);
    });
  }, [keys]);
};

/**
 * Décorateur pour mettre en cache les résultats de fonction
 * @param {Function} fn - Fonction à décorer
 * @param {Object} options - Options de cache
 * @returns {Function} Fonction décorée avec cache
 */
export const withCache = (fn, options = {}) => {
  const { prefix = 'fn', ttl = 5 * 60 * 1000 } = options;
  const cache = new CacheManager({ ttl });

  return async (...args) => {
    const key = cache.generateKey(prefix, args);
    const cached = cache.get(key);

    if (cached !== null) {
      return cached;
    }

    const result = await fn(...args);
    cache.set(key, result);
    return result;
  };
};

/**
 * Utilitaire pour précharger des données en cache
 * @param {Array} queries - Requêtes à précharger
 */
export const preloadCache = async (queries) => {
  const promises = queries.map(async ({ key, fetchFn }) => {
    try {
      const data = await fetchFn();
      globalCache.set(key, data);
      return { key, success: true };
    } catch (error) {
      console.error(`Erreur lors du préchargement de ${key}:`, error);
      return { key, success: false, error };
    }
  });

  return Promise.allSettled(promises);
};

/**
 * Hook pour monitorer les performances du cache
 * @returns {Object} Statistiques du cache
 */
export const useCacheStats = () => {
  const [stats, setStats] = useState(globalCache.getStats());

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(globalCache.getStats());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return stats;
};

export default CacheManager;
