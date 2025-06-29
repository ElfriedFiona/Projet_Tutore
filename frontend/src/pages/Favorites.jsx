import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, BookOpen } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import BookCard from '../components/books/BookCard';
import {
  ResponsiveContainer,
  ResponsiveGrid,
  ResponsiveSection,
  ResponsiveHeading
} from '../components/common/ResponsiveComponents';

const Favorites = () => {
  const { favorites, clearFavorites, favoritesCount } = useFavorites();

  const handleClearAll = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer tous vos favoris ?')) {
      clearFavorites();
    }
  };

  if (favoritesCount === 0) {
    return (
      <ResponsiveContainer>
        <ResponsiveSection size="small">
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-red-400" />
              </div>
              <ResponsiveHeading variant="h2" className="text-2xl font-bold text-neutral-800 mb-4">
                Aucun favori pour le moment
              </ResponsiveHeading>
              <p className="text-neutral-600 mb-8">
                Découvrez notre catalogue et ajoutez vos livres préférés à votre liste de favoris.
              </p>
              <Link 
                to="/catalog"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Parcourir le catalogue
              </Link>
            </div>
          </div>
        </ResponsiveSection>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer>
      <ResponsiveSection size="small">
        {/* En-tête */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <ResponsiveHeading variant="h1" className="text-3xl font-bold text-neutral-800 mb-2">
              Mes Favoris
            </ResponsiveHeading>
            <p className="text-neutral-600">
              {favoritesCount} livre{favoritesCount > 1 ? 's' : ''} dans vos favoris
            </p>
          </div>
          
          {favoritesCount > 0 && (
            <button
              onClick={handleClearAll}
              className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Tout supprimer
            </button>
          )}
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-neutral-500">Total favoris</p>
                <p className="text-2xl font-bold text-neutral-800">{favoritesCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-neutral-500">Disponibles</p>
                <p className="text-2xl font-bold text-neutral-800">
                  {favorites.filter(book => book.available).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-neutral-500">Catégories</p>
                <p className="text-2xl font-bold text-neutral-800">
                  {[...new Set(favorites.map(book => book.category))].length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtres rapides */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium">
            Tous
          </button>
          <button className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors">
            Disponibles
          </button>
          <button className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors">
            Indisponibles
          </button>
          {[...new Set(favorites.map(book => book.category))].map(category => (
            <button 
              key={category}
              className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Liste des favoris */}
        <ResponsiveGrid variant="standard">
          {favorites.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </ResponsiveGrid>
      </ResponsiveSection>
    </ResponsiveContainer>
  );
};

export default Favorites;
