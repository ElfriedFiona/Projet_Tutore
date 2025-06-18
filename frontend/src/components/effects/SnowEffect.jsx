import React, { useEffect } from 'react';
import { startSnowEffect, stopSnowEffect } from '../utils/snow';

/**
 * Composant qui ajoute un effet de neige à l'application
 * Ce composant peut être utilisé dans les périodes festives ou pour des événements spéciaux
 */
const SnowEffect = ({ active = true }) => {
  useEffect(() => {
    // Démarrer l'effet de neige quand le composant est monté
    if (active) {
      startSnowEffect();
    }

    // Nettoyer l'effet quand le composant est démonté
    return () => {
      stopSnowEffect();
    };
  }, [active]); // Re-exécuter si la prop active change

  // Ce composant ne rend rien visuellement, il gère juste l'effet
  return null;
};

export default SnowEffect;
