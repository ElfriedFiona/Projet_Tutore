import { useState } from 'react';

const BookSearch = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [advancedSearch, setAdvancedSearch] = useState(false);  const [filters, setFilters] = useState({
    category: '',
    author: '',
    year: ''
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare search params
    const searchParams = {
      query: searchQuery,
      ...filters
    };
    
    // Call the onSearch callback with the search params
    if (onSearch) {
      onSearch(searchParams);
    }
  };
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };
  
  const toggleAdvancedSearch = () => {
    setAdvancedSearch(!advancedSearch);
  };
    const handleReset = () => {
    setSearchQuery('');
    setFilters({
      category: '',
      author: '',
      year: ''
    });
    
    if (onSearch) {
      onSearch({ query: '' });
    }
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un livre par titre, auteur, ISBN..."
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <svg 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                width="20" 
                height="20" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Rechercher
          </button>
          
          <button
            type="button"
            onClick={toggleAdvancedSearch}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            {advancedSearch ? 'Masquer les filtres' : 'Filtres avancés'}
          </button>
        </div>
        
        {advancedSearch && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="category">
                Catégorie
              </label>
              <select
                id="category"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Toutes les catégories</option>
                <option value="Littérature">Littérature</option>
                <option value="Informatique">Informatique</option>
                <option value="Sciences">Sciences</option>
                <option value="Histoire">Histoire</option>
                <option value="Économie">Économie</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="author">
                Auteur
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={filters.author}
                onChange={handleFilterChange}
                placeholder="Nom de l'auteur"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="year">
                Année de publication
              </label>
              <input
                type="text"
                id="year"
                name="year"
                value={filters.year}
                onChange={handleFilterChange}
                placeholder="Ex: 2022"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />            </div>
          </div>
        )}
        
        {advancedSearch && (
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="text-blue-600 hover:text-blue-800 mr-4"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default BookSearch;
