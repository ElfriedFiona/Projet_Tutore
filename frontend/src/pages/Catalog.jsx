import { useState, useEffect } from 'react';
import BookCard from '../components/books/BookCard';
import { useToast } from '../context/ToastContext';
import {
  ResponsiveContainer,
  ResponsiveGrid,
  ResponsiveSection,
  ResponsiveTwoColumns,
  ResponsiveHeading
} from '../components/common/ResponsiveComponents';

const Catalog = () => {
  const { showToast } = useToast();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    searchQuery: '',
    availability: 'all'
  });

  useEffect(() => {
    // Simulate API call to get books
    const fetchBooks = async () => {
      try {
        // In a real app, this would be an actual API call with filters
        // For now, we'll use mock data
        setTimeout(() => {
          setBooks([
            {
              id: 1,
              title: 'Les Misérables',
              author: 'Victor Hugo',
              coverImage: 'https://placehold.co/400/orange/white?font=roboto',
              description: 'Un chef-d\'œuvre de la littérature française',
              category: 'Littérature',
              available: true
            },
            {
              id: 2,
              title: 'Introduction à l\'algorithmique',
              author: 'Thomas H. Cormen',
              coverImage: 'https://placehold.co/400/orange/white?font=roboto',
              description: 'Un manuel essentiel pour les étudiants en informatique',
              category: 'Informatique',
              available: true
            },
            {
              id: 3,
              title: 'Histoire de France',
              author: 'Jacques Bainville',
              coverImage: 'https://placehold.co/400/orange/white?font=roboto',
              description: 'Une perspective complète de l\'histoire française',
              category: 'Histoire',
              available: false
            },
            {
              id: 4,
              title: 'Principes d\'économie',
              author: 'Gregory Mankiw',
              coverImage: 'https://placehold.co/400/orange/white?font=roboto',
              description: 'Un manuel d\'introduction à l\'économie',
              category: 'Économie',
              available: true
            },
            {
              id: 5,
              title: 'Le Rouge et le Noir',
              author: 'Stendhal',
              coverImage: 'https://placehold.co/400/orange/white?font=roboto',
              description: 'Un roman classique français',
              category: 'Littérature',
              available: true
            },
            {
              id: 6,
              title: 'Apprendre Python',
              author: 'Mark Lutz',
              coverImage: 'https://placehold.co/400/orange/white?font=roboto',
              description: 'Le guide complet pour débutants',
              category: 'Informatique',
              available: false
            },
            {
              id: 7,
              title: 'La Seconde Guerre mondiale',
              author: 'Winston Churchill',
              coverImage: 'https://placehold.co/400/orange/white?font=roboto',
              description: 'Histoire et mémoires de guerre',
              category: 'Histoire',
              available: true
            },
            {
              id: 8,
              title: 'Marketing Management',
              author: 'Philip Kotler',
              coverImage: 'https://placehold.co/400/orange/white?font=roboto',
              description: 'Principes fondamentaux du marketing moderne',
              category: 'Économie',
              available: true
            }
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        setError('Erreur lors du chargement des livres');
        setLoading(false);
        showToast('Erreur lors du chargement des livres', 'error');
        console.error("Erreur:", error);
      }
    };

    fetchBooks();
  }, [showToast]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredBooks = books.filter(book => {
    // Apply category filter
    if (filters.category && book.category !== filters.category) {
      return false;
    }

    // Apply search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      if (!book.title.toLowerCase().includes(query) &&
        !book.author.toLowerCase().includes(query) &&
        !book.description.toLowerCase().includes(query)) {
        return false;
      }
    }

    // Apply availability filter
    if (filters.availability === 'available' && !book.available) {
      return false;
    } else if (filters.availability === 'unavailable' && book.available) {
      return false;
    }

    return true;
  });
  return (
    <ResponsiveContainer variant="standard">
      <ResponsiveSection size="small">
        <div className="text-center mb-12 animate-text-focus-in">
          <ResponsiveHeading variant="h1" className="mb-4 tracking-tight text-primary-500 animate-float">
            Catalogue <span className="text-secondary-500 bg-gradient-to-r from-secondary-400 to-secondary-600 bg-clip-text">de Livres</span>
          </ResponsiveHeading>          <p className="text-neutral-600 text-lg mb-6 max-w-2xl mx-auto">
            Découvrez notre collection de livres académiques et littéraires
          </p>
          <div className="flex justify-center items-center space-x-2 mb-4">
            <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-pulse-shadow"></div>
            <div className="w-2 h-2 bg-secondary-500 rounded-full animate-ping-slow"></div>
            <div className="w-16 h-1 bg-gradient-to-l from-primary-500 to-secondary-500 rounded-full animate-pulse-shadow"></div>
          </div>
        </div>

        <div className="backdrop-blur-sm bg-white p-6 sm:p-8 rounded-2xl shadow-2xl mb-12 border border-white/80 hover:border-secondary-400/50 transition-all duration-500 animate-bounce-in">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg mr-3 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-neutral-800">Filtres de recherche</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">            <div className="group">
              <label className="block text-sm font-medium text-neutral-700 mb-2 group-hover:text-primary-600 transition-colors">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Rechercher
                </span>
              </label>
              <input
                type="text"
                name="searchQuery"
                value={filters.searchQuery}
                onChange={handleFilterChange}
                placeholder="Titre, auteur, description..."
                className="w-full px-4 py-3 bg-white/80 border border-neutral-300 text-neutral-900 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-neutral-500 transition-all duration-300 hover:border-secondary-400 hover:shadow-lg backdrop-blur-sm"
              />
            </div>            <div className="group">
              <label className="block text-sm font-medium text-neutral-700 mb-2 group-hover:text-primary-600 transition-colors">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Catégorie
                </span>
              </label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 bg-white/80 border border-neutral-300 text-neutral-900 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 hover:border-secondary-400 hover:shadow-lg backdrop-blur-sm"
              >
                <option value="">Toutes les catégories</option>
                <option value="Littérature">📚 Littérature</option>
                <option value="Informatique">💻 Informatique</option>
                <option value="Histoire">🏛️ Histoire</option>
                <option value="Économie">📈 Économie</option>
                <option value="Sciences">🔬 Sciences</option>
              </select>
            </div>            <div className="group">
              <label className="block text-sm font-medium text-neutral-700 mb-2 group-hover:text-primary-600 transition-colors">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Disponibilité
                </span>
              </label>
              <select
                name="availability"
                value={filters.availability}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 bg-white/80 border border-neutral-300 text-neutral-900 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 hover:border-secondary-400 hover:shadow-lg backdrop-blur-sm"
              >
                <option value="all">📋 Tous les livres</option>
                <option value="available">✅ Disponibles</option>
                <option value="unavailable">❌ Non disponibles</option>
              </select>
            </div>
          </div>

          {/* Indicateurs de filtres actifs */}
          {(filters.searchQuery || filters.category || filters.availability !== 'all') && (            <div className="mt-6 pt-6 border-t border-neutral-300">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm font-medium text-neutral-600 mr-2">Filtres actifs:</span>                {filters.searchQuery && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    🔍 "{filters.searchQuery}"
                  </span>
                )}
                {filters.category && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">
                    📂 {filters.category}
                  </span>
                )}
                {filters.availability !== 'all' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                    {filters.availability === 'available' ? '✅ Disponibles' : '❌ Non disponibles'}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {loading && (          <div className="flex flex-col items-center justify-center py-24 animate-bounce-in">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-neutral-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-500 border-t-transparent absolute top-0 left-0"></div>
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-lg font-medium text-neutral-800 mb-2">Chargement du catalogue</h3>
              <p className="text-neutral-600">Veuillez patienter...</p>
            </div>
          </div>
        )}        {error && (
          <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 p-6 rounded-r-xl shadow-lg animate-bounce-in">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-red-800">Erreur de chargement</h3>
                <p className="mt-1 text-red-700">{error}</p>
                <button className="mt-3 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200">
                  Réessayer
                </button>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && filteredBooks.length === 0 && (          <div className="text-center py-16 animate-bounce-in">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
                <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-neutral-800 mb-3">Aucun livre trouvé</h3>
              <p className="text-neutral-600 mb-6">
                Aucun livre ne correspond à vos critères de recherche. Essayez de modifier vos filtres.
              </p>
              <button
                onClick={() => setFilters({
                  category: '',
                  searchQuery: '',
                  availability: 'all'
                })}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 animate-pulse-shadow"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Réinitialiser les filtres
              </button>
            </div>
          </div>
        )}

        {!loading && !error && filteredBooks.length > 0 && (          <div className="mb-8 animate-bounce-in">
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-bold text-primary-600">
                    {filteredBooks.length}
                  </div>
                  <div className="text-sm text-neutral-600">
                    {filteredBooks.length === 1 ? 'Livre trouvé' : 'Livres trouvés'}
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-bold text-green-600">
                    {filteredBooks.filter(book => book.available).length}
                  </div>
                  <div className="text-sm text-neutral-600">
                    Disponibles
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-bold text-secondary-600">
                    {[...new Set(filteredBooks.map(book => book.category))].length}
                  </div>
                  <div className="text-sm text-neutral-600">
                    {[...new Set(filteredBooks.map(book => book.category))].length === 1 ? 'Catégorie' : 'Catégories'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            <p className="mt-4 text-primary-600">Chargement des livres...</p>
          </div>
        ) : error ? (
          <div className="bg-red-900/20 border border-red-800 text-red-100 p-4 rounded-md text-center my-8">
            <p className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </p>
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="bg-gray-800 border border-gray-700 p-8 rounded-lg text-center my-6">
            <p className="text-gray-300 text-lg">Aucun livre ne correspond à vos critères de recherche.</p>
            <button
              onClick={() => setFilters({
                category: '',
                searchQuery: '',
                availability: 'all'
              })}
              className="mt-4 px-5 py-2 bg-secondary-600 hover:bg-secondary-700 rounded-md text-white text-sm transition"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <ResponsiveGrid variant="standard">
            {filteredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </ResponsiveGrid>
        )}
      </ResponsiveSection>
    </ResponsiveContainer>
  );
};

export default Catalog;
