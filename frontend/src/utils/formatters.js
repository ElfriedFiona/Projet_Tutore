/**
 * Formate une date en chaîne de caractères selon le format français
 * @param {string|Date} dateString - La date à formater (string ISO ou objet Date)
 * @param {object} options - Options de formatage supplémentaires pour toLocaleDateString
 * @returns {string} Date formatée
 */
export const formatDate = (dateString, options = {}) => {
  if (!dateString) return '-';
  
  try {
    const date = dateString instanceof Date ? dateString : new Date(dateString);
    return date.toLocaleDateString('fr-FR', options);
  } catch (error) {
    console.error('Erreur lors du formatage de la date:', error);
    return dateString.toString();
  }
};

/**
 * Tronque une chaîne de caractères si elle dépasse une certaine longueur
 * @param {string} text - Le texte à tronquer
 * @param {number} maxLength - Longueur maximale avant troncature
 * @param {string} suffix - Suffixe à ajouter après la troncature (par défaut "...")
 * @returns {string} Texte tronqué
 */
export const truncateText = (text, maxLength = 100, suffix = '...') => {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength).trim()}${suffix}`;
};

/**
 * Formate un nombre en chaîne de caractères avec les séparateurs de milliers
 * @param {number} number - Le nombre à formater
 * @param {number} decimals - Nombre de décimales à conserver
 * @returns {string} Nombre formaté
 */
export const formatNumber = (number, decimals = 0) => {
  if (number == null) return '-';
  
  try {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(number);
  } catch (error) {
    console.error('Erreur lors du formatage du nombre:', error);
    return number.toString();
  }
};

/**
 * Formate un prix avec le symbole de la devise
 * @param {number} price - Le prix à formater
 * @param {string} currency - Code de la devise (par défaut "XAF" pour Franc CFA)
 * @returns {string} Prix formaté
 */
export const formatPrice = (price, currency = 'XAF') => {
  if (price == null) return '-';
  
  try {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency 
    }).format(price);
  } catch (error) {
    console.error('Erreur lors du formatage du prix:', error);
    return `${price} FCFA`;
  }
};
