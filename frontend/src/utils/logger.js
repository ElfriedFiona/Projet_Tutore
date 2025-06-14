import process from 'process';/////
/**
 * Utilitaire de logging pour remplacer les console.log, console.error, etc.
 * Permet de désactiver facilement les logs en production
 * et d'éviter la multiplication des messages dans la console
 */

// Configuration globale du logger
const config = {
  // Désactiver tous les logs en production
  enabled: (typeof window !== 'undefined' && window.location && window.location.hostname === 'localhost') || 
           (typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production') || 
           true, // Default to enabled if environment detection fails
  
  // Compteur pour éviter les logs dupliqués
  counters: new Map(),
  
  // Limite de répétition d'un même message (0 = pas de limite)
  repeatLimit: 3,
  
  // Horodatage des messages
  timestamp: true
};

/**
 * Génère un identifiant unique pour un message de log
 * @param {string} message - Message de log
 * @param {string} type - Type de log (log, warn, error, etc.)
 * @returns {string} Identifiant unique
 */
const generateId = (message, type) => `${type}:${message}`;

/**
 * Formate un message de log avec horodatage si configuré
 * @param {string} message - Message à formater
 * @returns {string} Message formaté
 */
const formatMessage = (message) => {
  if (!config.timestamp) return message;
  
  const now = new Date();
  const timestamp = `[${now.toLocaleTimeString()}]`;
  return `${timestamp} ${message}`;
};

/**
 * Vérifie si un message peut être affiché selon la limite de répétition
 * @param {string} id - Identifiant du message
 * @returns {boolean} True si le message peut être affiché
 */
const canLog = (id) => {
  if (!config.enabled) return false;
  if (config.repeatLimit === 0) return true;
  
  const count = config.counters.get(id) || 0;
  if (count < config.repeatLimit) {
    config.counters.set(id, count + 1);
    return true;
  }
  
  if (count === config.repeatLimit) {
    config.counters.set(id, count + 1);
    return true;
  }
  
  return false;
};

/**
 * Wrapper pour console.log
 * @param {string} message - Message à afficher
 * @param {...any} args - Arguments supplémentaires
 */
export const log = (message, ...args) => {
  const id = generateId(message, 'log');
  if (!canLog(id)) return;
  
  if (config.counters.get(id) > config.repeatLimit) {
    return;
  }
  
  console.log(formatMessage(message), ...args);
};

/**
 * Wrapper pour console.warn
 * @param {string} message - Message à afficher
 * @param {...any} args - Arguments supplémentaires
 */
export const warn = (message, ...args) => {
  const id = generateId(message, 'warn');
  if (!canLog(id)) return;
  
  if (config.counters.get(id) > config.repeatLimit) {
    return;
  }
  
  console.warn(formatMessage(message), ...args);
};

/**
 * Wrapper pour console.error
 * @param {string} message - Message à afficher
 * @param {...any} args - Arguments supplémentaires
 */
export const error = (message, ...args) => {
  const id = generateId(message, 'error');
  if (!canLog(id)) return;
  
  if (config.counters.get(id) > config.repeatLimit) {
    return;
  }
  
  console.error(formatMessage(message), ...args);
};

/**
 * Wrapper pour console.info
 * @param {string} message - Message à afficher
 * @param {...any} args - Arguments supplémentaires
 */
export const info = (message, ...args) => {
  const id = generateId(message, 'info');
  if (!canLog(id)) return;
  
  if (config.counters.get(id) > config.repeatLimit) {
    return;
  }
  
  console.info(formatMessage(message), ...args);
};

/**
 * Réinitialise les compteurs pour un nouveau rendu
 */
export const resetCounters = () => {
  config.counters.clear();
};

/**
 * Configure le logger
 * @param {Object} options - Options de configuration
 * @param {boolean} options.enabled - Activer/désactiver tous les logs
 * @param {number} options.repeatLimit - Limite de répétition des messages
 * @param {boolean} options.timestamp - Ajouter un horodatage aux messages
 */
export const configure = (options) => {
  Object.assign(config, options);
};

// Exporter un objet par défaut pour faciliter l'importation
export default {
  log,
  warn,
  error,
  info,
  resetCounters,
  configure
};
