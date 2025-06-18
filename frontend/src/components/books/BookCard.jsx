import { Link } from 'react-router-dom';
import React, { useState, useMemo, useCallback } from 'react';
import { Heart, Calendar } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const BookCard = React.memo(({ book }) => {
  const [isReserving, setIsReserving] = useState(false);
  const { success, error } = useToast();  // const handleFavorite = async (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   
  //   try {
  //     const result = toggleFavorite(book);
  //     if (result) {
  //       if (bookIsFavorite) {
  //         success(`"${book.title}" retiré des favoris`);
  //       } else {
  //         success(`"${book.title}" ajouté aux favoris`);
  //       }
  //     }
  //   } catch (favoriteError) {
  //     console.error('Erreur favoris:', favoriteError);
  //     error('Erreur lors de la gestion des favoris');
  //   }
  // };
  
  const handleReserve = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!book.available) {
      error('Ce livre n\'est pas disponible');
      return;
    }

    setIsReserving(true);
    
    try {
      // Simulation de réservation
      await new Promise(resolve => setTimeout(resolve, 1500));
      success(`"${book.title}" réservé avec succès !`);
      // Dans une vraie app, on mettrait à jour l'état du livre
      book.available = false;
    } catch (reserveError) {
      console.error('Erreur réservation:', reserveError);
      error('Erreur lors de la réservation');
    } finally {
      setIsReserving(false);
    }
  };
  return (
    <div className="group relative bg-surface-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-surface-border hover:border-secondary-300 transform hover:scale-105 animate-bounce-in overflow-hidden backdrop-blur-sm">
      {/* Image avec overlay gradient */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <img 
          src={book.coverImage} 
          alt={`Couverture de ${book.title}`} 
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Gradient overlay au hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          {/* Badge de disponibilité flottant */}
        <div className="absolute top-4 right-4 z-10">
          {book.available ? (
            <div className="flex items-center bg-green-500/90 backdrop-blur-sm text-neutral-900 text-xs font-medium px-3 py-1.5 rounded-full shadow-lg animate-pulse-shadow">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Disponible
            </div>
          ) : (
            <div className="flex items-center bg-red-500/90 backdrop-blur-sm text-neutral-900 text-xs font-medium px-3 py-1.5 rounded-full shadow-lg">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Indisponible
            </div>
          )}
        </div>

        {/* Badge catégorie */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-primary-500/90 backdrop-blur-sm text-neutral-900 text-xs font-medium px-3 py-1.5 rounded-full shadow-lg">
            {book.category}
          </span>
        </div>

        {/* Boutons d'action au hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 z-20">
          <div className="flex flex-col gap-3 px-4">
            <Link 
              to={`/book/${book.id}`}
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 animate-float shadow-xl backdrop-blur-sm min-w-[140px]"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Voir détails
            </Link>
              {book.available && (
              <button
                onClick={handleReserve}
                disabled={isReserving}
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 shadow-xl backdrop-blur-sm disabled:opacity-70 disabled:cursor-not-allowed min-w-[140px]"
              >
                {isReserving ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Réservation...
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4 mr-2" />
                    Réserver
                  </>
                )}
              </button>
            )}
            
            {!book.available && (
              <button
                disabled
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-xl font-medium shadow-xl backdrop-blur-sm opacity-70 cursor-not-allowed min-w-[140px]"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Indisponible
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Contenu de la carte */}
      <div className="p-6 relative">
        {/* Accent décoratif */}
        <div className="absolute top-0 left-6 w-12 h-1 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-full transform -translate-y-1"></div>
        
        <div className="space-y-4">
          {/* Titre et auteur */}
          <div>            <h3 className="text-xl font-bold text-text-primary group-hover:text-primary-600 transition-colors duration-300 line-clamp-2 leading-tight">
              {book.title}
            </h3>            <div className="flex items-center mt-2 text-text-secondary">
              <svg className="w-4 h-4 mr-2 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-sm font-medium">{book.author}</span>
            </div>
          </div>
          
          {/* Description */}          <div className="relative">
            <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
              {book.description}
            </p>
          </div>
          
          {/* Footer de la carte */}          <div className="flex items-center justify-between pt-4 border-t border-surface-border">
            <div className="flex items-center space-x-2">
              {/* Indicateur de popularité (exemple) */}
              <div className="flex items-center text-xs text-text-tertiary">
                <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                4.5
              </div>
            </div>
            
            {/* Lien vers les détails (version desktop) */}
            <Link 
              to={`/book/${book.id}`}
              className="hidden group-hover:inline-flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200"
            >
              Lire plus
              <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Effet de lueur au hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/5 to-secondary-500/5 animate-pulse-shadow"></div>
      </div>    </div>
  );
});

export default BookCard;