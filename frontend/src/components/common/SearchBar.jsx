import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ placeholder = "Rechercher des livres, auteurs...", className = "" }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Optimized search handler with useCallback
  const handleSearch = useCallback((e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchTerm)}`);
    }
  }, [navigate, searchTerm]);

  // Optimized handler for input changes
  const handleInputChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <div className="flex items-center border-2 border-primary-400 bg-primary-700 rounded-md overflow-hidden shadow-md focus-within:ring-2 outline-secondary-500 transition-all duration-300 focus:outline-none focus:ring-secondary-400 hover:shadow-lg">
        <div className="pl-4 pr-2 text-secondary-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full py-3 px-2 outline-none text-neutral-50 bg-transparent placeholder-primary-200 text-sm"
        />
        <button
          type="submit"
          className="bg-secondary-500 hover:bg-secondary-600 text-neutral-900 py-3 px-5 flex items-center justify-center transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg transform hover:translate-y-[-1px]"
        >
          Rechercher
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
