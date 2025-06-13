/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useToast } from './ToastContext';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { success, error } = useToast();

  // Charger les favoris depuis le localStorage au démarrage
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('library-favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (err) {
      console.error('Erreur lors du chargement des favoris:', err);
    }
  }, []);

  // Sauvegarder les favoris dans le localStorage à chaque changement
  useEffect(() => {
    try {
      localStorage.setItem('library-favorites', JSON.stringify(favorites));
    } catch (err) {
      console.error('Erreur lors de la sauvegarde des favoris:', err);
    }
  }, [favorites]);
  // Ajouter un livre aux favoris - optimisé avec useCallback
  const addToFavorites = useCallback((book) => {
    const isAlreadyFavorite = favorites.some(fav => fav.id === book.id);
    
    if (isAlreadyFavorite) {
      error('Ce livre est déjà dans vos favoris');
      return false;
    }

    const favoriteBook = {
      id: book.id,
      title: book.title,
      author: book.author,
      coverImage: book.coverImage,
      category: book.category,
      available: book.available,
      addedAt: new Date().toISOString()
    };

    setFavorites(prev => [...prev, favoriteBook]);
    success(`"${book.title}" ajouté aux favoris`);
    return true;
  }, [favorites, error, success]);

  // Retirer un livre des favoris - optimisé avec useCallback
  const removeFromFavorites = useCallback((bookId) => {
    const bookToRemove = favorites.find(fav => fav.id === bookId);
    
    if (!bookToRemove) {
      error('Ce livre n\'est pas dans vos favoris');
      return false;
    }

    setFavorites(prev => prev.filter(fav => fav.id !== bookId));
    success(`"${bookToRemove.title}" retiré des favoris`);
    return true;
  }, [favorites, error, success]);

  // Basculer le statut favori d'un livre - optimisé avec useCallback
  const toggleFavorite = useCallback((book) => {
    const isFavorite = favorites.some(fav => fav.id === book.id);
    
    if (isFavorite) {
      return removeFromFavorites(book.id);
    } else {
      return addToFavorites(book);
    }
  }, [favorites, addToFavorites, removeFromFavorites]);

  // Vérifier si un livre est dans les favoris - optimisé avec useCallback
  const isFavorite = useCallback((bookId) => {
    return favorites.some(fav => fav.id === bookId);
  }, [favorites]);

  // Effacer tous les favoris - optimisé avec useCallback
  const clearFavorites = useCallback(() => {
    setFavorites([]);
    success('Tous les favoris ont été supprimés');
  }, [success]);
  // Memoize context value pour éviter les re-renders inutiles
  const value = useMemo(() => ({
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    favoritesCount: favorites.length
  }), [favorites, addToFavorites, removeFromFavorites, toggleFavorite, isFavorite, clearFavorites]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
