import React, { useState, useEffect } from 'react';
import { Heart, Search, Filter, Grid, List, BookOpen, Calendar, User, Star, Bookmark, Clock, TrendingUp } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';

const DashboardFavorites = () => {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('dateAdded'); // 'dateAdded', 'title', 'author'
  const [filterBy, setFilterBy] = useState('all'); // 'all', 'available', 'unavailable'
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Enhanced mock data for better visual presentation
  const enhancedFavorites = React.useMemo(() => {
    return favorites.map(book => ({
      ...book,
      category: book.category || ['Fiction', 'Mystère', 'Romance', 'Sci-Fi', 'Histoire'][Math.floor(Math.random() * 5)],
      rating: book.rating || (Math.random() * 2 + 3).toFixed(1),
      pages: book.pages || Math.floor(Math.random() * 400 + 200),
      isbn: book.isbn || `978-${Math.random().toString().slice(2, 12)}`,
      publisher: book.publisher || ['Gallimard', 'Flammarion', 'Seuil', 'Albin Michel', 'Grasset'][Math.floor(Math.random() * 5)],
      publicationYear: book.publicationYear || Math.floor(Math.random() * 30 + 1994),
      language: book.language || 'Français',
      addedDaysAgo: Math.floor((new Date() - new Date(book.dateAdded)) / (1000 * 60 * 60 * 24))
    }));
  }, [favorites]);
  // Helper functions
  const getCategoryColor = (category) => {
    const colors = {
      'Fiction': 'bg-primary-100 text-primary-800 border-primary-200',
      'Mystère': 'bg-neutral-100 text-neutral-800 border-neutral-200',
      'Romance': 'bg-secondary-100 text-secondary-800 border-secondary-200',
      'Sci-Fi': 'bg-primary-200 text-primary-800 border-primary-300',
      'Histoire': 'bg-secondary-200 text-secondary-800 border-secondary-300',
      'Biographie': 'bg-green-100 text-green-800 border-green-200',
      'Fantaisie': 'bg-primary-100 text-primary-800 border-primary-200'
    };
    return colors[category] || 'bg-neutral-100 text-neutral-800 border-neutral-200';
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-3 h-3 fill-yellow-400/50 text-yellow-400" />);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<Star key={i} className="w-3 h-3 text-gray-300" />);
    }
    return stars;
  };

  const getBookIcon = (category) => {
    const icons = {
      'Fiction': '📚',
      'Mystère': '🔍',
      'Romance': '💕',
      'Sci-Fi': '🚀',
      'Histoire': '📜',
      'Biographie': '👤',
      'Fantaisie': '🐉'
    };
    return icons[category] || '📖';
  };

  const filteredAndSortedFavorites = React.useMemo(() => {
    let filtered = enhancedFavorites.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filtrer par disponibilité
    if (filterBy !== 'all') {
      filtered = filtered.filter(book => 
        filterBy === 'available' ? book.isAvailable : !book.isAvailable
      );
    }

    // Trier
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        case 'dateAdded':
        default:
          return new Date(b.dateAdded) - new Date(a.dateAdded);
      }
    });

    return filtered;
  }, [enhancedFavorites, searchTerm, sortBy, filterBy]);

  const handleRemoveFavorite = (bookId) => {
    if (window.confirm('Êtes-vous sûr de vouloir retirer ce livre de vos favoris ?')) {
      removeFavorite(bookId);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vider votre liste de favoris ?')) {
      clearFavorites();
    }
  };

  const BookCard = ({ book }) => (
    <div className={`group bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
      <div className="relative">
        <div className="aspect-w-3 aspect-h-4 bg-gradient-to-br from-primary-100 to-secondary-100">
          <img
            src={book.coverImage || '/images/book-placeholder.jpg'}
            alt={book.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2">
            <span className="text-2xl">{getBookIcon(book.category)}</span>
          </div>
          <div className="absolute top-2 right-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              book.isAvailable 
                ? 'bg-green-500/90 text-white backdrop-blur-sm' 
                : 'bg-red-500/90 text-white backdrop-blur-sm'
            }`}>
              {book.isAvailable ? '✓ Disponible' : '✗ Indisponible'}
            </span>
          </div>
        </div>
        <div className="absolute bottom-2 left-2 right-2">
          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(book.category)}`}>
            {book.category}
          </div>
        </div>
      </div>
      <div className="p-4">        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2 flex items-center">
          <User className="w-4 h-4 mr-1 text-primary-500" />
          {book.author}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            {renderStars(book.rating)}
            <span className="text-xs text-gray-500 ml-1">({book.rating})</span>
          </div>
          <span className="text-xs text-gray-500 flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {book.addedDaysAgo === 0 ? "Aujourd'hui" : `${book.addedDaysAgo}j`}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span>{book.pages} pages</span>
          <span>{book.publicationYear}</span>
        </div>
          <div className="flex gap-2">
          <button
            onClick={() => window.location.href = `/book/${book.id}`}
            className="flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:from-primary-700 hover:to-secondary-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <BookOpen className="w-4 h-4 inline mr-1" />
            Détails
          </button>
          <button
            onClick={() => handleRemoveFavorite(book.id)}
            className="p-2 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200 group"
            title="Retirer des favoris"
          >
            <Heart className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );

  const BookListItem = ({ book }) => (
    <div className={`group bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={book.coverImage || '/images/book-placeholder.jpg'}
            alt={book.title}
            className="w-16 h-20 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute -top-1 -right-1">
            <span className="text-lg">{getBookIcon(book.category)}</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">            <h3 className="font-bold text-gray-900 truncate group-hover:text-primary-600 transition-colors pr-2">
              {book.title}
            </h3>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              book.isAvailable 
                ? 'bg-green-500/20 text-green-700 border border-green-200' 
                : 'bg-red-500/20 text-red-700 border border-red-200'
            }`}>
              {book.isAvailable ? '✓ Disponible' : '✗ Indisponible'}
            </span>
          </div>
            <p className="text-sm text-gray-600 flex items-center mb-2">
            <User className="w-4 h-4 mr-1 text-primary-500" />
            {book.author}
          </p>
          
          <div className="flex items-center gap-4 mb-2">
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(book.category)}`}>
              {book.category}
            </div>
            <div className="flex items-center space-x-1">
              {renderStars(book.rating)}
              <span className="text-xs text-gray-500 ml-1">({book.rating})</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center">
              <BookOpen className="w-3 h-3 mr-1" />
              {book.pages} pages
            </span>
            <span className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {book.publicationYear}
            </span>
            <span className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              Ajouté {book.addedDaysAgo === 0 ? "aujourd'hui" : `il y a ${book.addedDaysAgo}j`}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">          <button
            onClick={() => window.location.href = `/book/${book.id}`}
            className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-primary-700 hover:to-secondary-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <BookOpen className="w-4 h-4 inline mr-1" />
            Voir détails
          </button>
          <button
            onClick={() => handleRemoveFavorite(book.id)}
            className="p-2 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200 group"
            title="Retirer des favoris"
          >
            <Heart className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="p-6">
        {/* En-tête */}
        <div className={`mb-8 transition-all duration-500 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="flex items-center justify-between">
            <div>              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent flex items-center">
                <Heart className="w-10 h-10 mr-3 text-red-500 fill-current animate-pulse" />
                Mes Favoris
              </h1>
              <p className="text-gray-600 mt-2 flex items-center">
                <Bookmark className="w-4 h-4 mr-2 text-primary-500" />
                Gérez votre collection de livres favoris ({favorites.length} livre{favorites.length !== 1 ? 's' : ''})
              </p>
            </div>
            {favorites.length > 0 && (
              <button
                onClick={handleClearAll}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Heart className="w-4 h-4 inline mr-2" />
                Vider la liste
              </button>
            )}
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-12">              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-xl border border-white/20 max-w-md mx-auto">
              <Heart className="w-20 h-20 text-primary-300 mx-auto mb-6 animate-pulse" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Aucun favori pour le moment</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Parcourez le catalogue et ajoutez des livres à vos favoris pour les retrouver facilement ici.
              </p>
              <a
                href="/catalog"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Parcourir le catalogue
              </a>
            </div>
          </div>
        ) : (
          <>
            {/* Barre de recherche et filtres */}
            <div className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 mb-6 transition-all duration-300 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="flex flex-col lg:flex-row gap-4">                {/* Recherche */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Rechercher dans vos favoris..."
                    className="w-full pl-10 pr-4 py-3 border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Filtres */}
                <div className="flex gap-4">                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white/70 backdrop-blur-sm transition-all duration-200"
                  >
                    <option value="dateAdded">Trier par date d'ajout</option>
                    <option value="title">Trier par titre</option>
                    <option value="author">Trier par auteur</option>
                  </select>

                  <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                    className="px-4 py-3 border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white/70 backdrop-blur-sm transition-all duration-200"
                  >
                    <option value="all">Tous les livres</option>
                    <option value="available">Disponibles uniquement</option>
                    <option value="unavailable">Indisponibles uniquement</option>
                  </select>

                  {/* Mode d'affichage */}
                  <div className="flex border-2 border-primary-200 rounded-xl overflow-hidden bg-white/70 backdrop-blur-sm">                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-3 transition-all duration-200 ${viewMode === 'grid' ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white' : 'text-primary-600 hover:bg-primary-50'}`}
                      title="Vue grille"
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-3 transition-all duration-200 ${viewMode === 'list' ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white' : 'text-primary-600 hover:bg-primary-50'}`}
                      title="Vue liste"
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Résultats */}
            {filteredAndSortedFavorites.length === 0 ? (              <div className="text-center py-12">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-xl border border-white/20 max-w-md mx-auto">
                  <Filter className="w-16 h-16 text-primary-300 mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Aucun résultat trouvé</h3>
                  <p className="text-gray-600">
                    Essayez de modifier vos critères de recherche ou de filtrage.
                  </p>
                </div>
              </div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-4'
              }>
                {filteredAndSortedFavorites.map((book, index) => 
                  viewMode === 'grid' ? (
                    <div key={book.id} style={{ animationDelay: `${index * 100}ms` }}>
                      <BookCard book={book} />
                    </div>
                  ) : (
                    <div key={book.id} style={{ animationDelay: `${index * 50}ms` }}>
                      <BookListItem book={book} />
                    </div>
                  )
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardFavorites;
