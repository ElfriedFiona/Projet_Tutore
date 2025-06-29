import { useState, useEffect } from 'react';
import { useLibrary } from '../context/LibraryContext';

// Custom hook for fetching and managing books
const useBooks = (initialQuery = '') => {
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    category: '',
    availability: 'all'
  });
  
  const { searchBooks, books, isLoading, error } = useLibrary();
  
  useEffect(() => {
    if (query) {
      // Reset to page 1 when query changes
      setPage(1);
      searchBooks(query);
    }
  }, [query, searchBooks]);
  
  // Function to load more books (pagination)
  const loadMore = async () => {
    if (!query || isLoading) return;
    
    const newPage = page + 1;
    const startIndex = (newPage - 1) * 10;
    await searchBooks(query, startIndex);
    setPage(newPage);
  };
  
  // Apply filters to the books
  const filteredBooks = books.filter(book => {
    // Apply category filter
    if (filters.category && book.category !== filters.category) {
      return false;
    }
    
    // Apply availability filter
    if (filters.availability === 'available' && !book.available) {
      return false;
    } else if (filters.availability === 'unavailable' && book.available) {
      return false;
    }
    
    return true;
  });
  
  return {
    books: filteredBooks,
    isLoading,
    error,
    query,
    setQuery,
    page,
    loadMore,
    filters,
    setFilters
  };
};

export default useBooks;
