/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react';

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loans, setLoans] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Function to fetch books from Google Books API
  const searchBooks = async (query, startIndex = 0, maxResults = 10) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=${maxResults}`
      );
      
      if (!response.ok) {
        throw new Error('Erreur lors de la recherche de livres');
      }
        const data = await response.json();
      
      // Check if items exist in the response
      if (!data.items || data.items.length === 0) {
        setBooks([]);
        setIsLoading(false);
        return [];
      }
      
      // Transform Google Books API response into our book format
      const formattedBooks = data.items.map(item => ({
        id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Auteur inconnu',
        coverImage: item.volumeInfo.imageLinks?.thumbnail || 'https://placehold.co/400/orange/white?font=roboto',
        description: item.volumeInfo.description || 'Pas de description disponible',
        category: item.volumeInfo.categories ? item.volumeInfo.categories[0] : 'Non catégorisé',
        isbn: item.volumeInfo.industryIdentifiers
          ? item.volumeInfo.industryIdentifiers[0].identifier
          : 'ISBN inconnu',
        publisher: item.volumeInfo.publisher || 'Éditeur inconnu',
        publishDate: item.volumeInfo.publishedDate || 'Date inconnue',
        pages: item.volumeInfo.pageCount || 0,
        language: item.volumeInfo.language || 'N/A',
        available: Math.random() > 0.3 // Randomly set availability for demo
      }));
      
      setBooks(formattedBooks);
      setIsLoading(false);
      return formattedBooks;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return [];
    }
  };
  
  // Function to borrow a book
  const borrowBook = async (bookId, userId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would make an API call to borrow a book
      // For now, we'll simulate a successful borrow with mock data
      setTimeout(() => {
        const book = books.find(b => b.id === bookId);
        if (!book) {
          setError('Livre non trouvé');
          setIsLoading(false);
          return null;
        }
        
        if (!book.available) {
          setError('Ce livre n\'est pas disponible');
          setIsLoading(false);
          return null;
        }
        
        // Create a new loan
        const now = new Date();
        const dueDate = new Date();
        dueDate.setDate(now.getDate() + 30); // 30 days loan period
        
        const newLoan = {
          id: Date.now(), // Generate a unique ID
          bookId,
          bookTitle: book.title,
          bookAuthor: book.author,
          coverImage: book.coverImage,
          userId,
          borrowDate: now.toISOString().split('T')[0],
          dueDate: dueDate.toISOString().split('T')[0],
          returnDate: null,
          status: 'active',
          fineAmount: 0
        };
        
        // Update the book's availability
        setBooks(prevBooks => 
          prevBooks.map(b => 
            b.id === bookId ? { ...b, available: false } : b
          )
        );
        
        // Add the loan to the loans array
        setLoans(prevLoans => [...prevLoans, newLoan]);
        
        setIsLoading(false);
        return newLoan;
      }, 1000);
    } catch (err) {
      setError('Erreur lors de l\'emprunt du livre' + err.message);
      // Reset loading state
      setIsLoading(false);
      return null;
    }
  };
  
  // Function to return a book
  const returnBook = async (loanId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would make an API call to return a book
      // For now, we'll simulate a successful return with mock data
      setTimeout(() => {
        const loan = loans.find(l => l.id === loanId);
        if (!loan) {
          setError('Emprunt non trouvé');
          setIsLoading(false);
          return false;
        }
        
        if (loan.status !== 'active') {
          setError('Cet emprunt n\'est pas actif');
          setIsLoading(false);
          return false;
        }
        
        // Update the loan status
        setLoans(prevLoans => 
          prevLoans.map(l => 
            l.id === loanId 
              ? { 
                  ...l, 
                  returnDate: new Date().toISOString().split('T')[0], 
                  status: 'returned' 
                } 
              : l
          )
        );
        
        // Update the book's availability
        setBooks(prevBooks => 
          prevBooks.map(b => 
            b.id === loan.bookId ? { ...b, available: true } : b
          )
        );
        
        setIsLoading(false);
        return true;
      }, 1000);
    } catch (err) {
      setError(`Erreur lors du retour du livre: ${err.message}`);
      setIsLoading(false);
      return false;
    }
  };
  
  // Function to reserve a book
  const reserveBook = async (bookId, userId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would make an API call to reserve a book
      // For now, we'll simulate a successful reservation with mock data
      setTimeout(() => {
        const book = books.find(b => b.id === bookId);
        if (!book) {
          setError('Livre non trouvé');
          setIsLoading(false);
          return null;
        }
        
        // Create a new reservation
        const now = new Date();
        const expirationDate = new Date();
        expirationDate.setDate(now.getDate() + 10); // 10 days reservation period
        
        // Calculate position in waiting list
        const existingReservations = reservations.filter(r => r.bookId === bookId && r.status === 'waiting');
        const position = existingReservations.length + 1;
        
        const newReservation = {
          id: Date.now(), // Generate a unique ID
          bookId,
          bookTitle: book.title,
          bookAuthor: book.author,
          coverImage: book.coverImage,
          userId,
          reservationDate: now.toISOString().split('T')[0],
          expirationDate: expirationDate.toISOString().split('T')[0],
          status: book.available ? 'ready' : 'waiting',
          position: book.available ? 0 : position
        };
        
        // If the book is available, mark it as unavailable
        if (book.available) {
          setBooks(prevBooks => 
            prevBooks.map(b => 
              b.id === bookId ? { ...b, available: false } : b
            )
          );
        }
        
        // Add the reservation to the reservations array
        setReservations(prevReservations => [...prevReservations, newReservation]);
        
        setIsLoading(false);
        return newReservation;
      }, 1000);
    } catch (err) {
      setError('Erreur lors de la réservation du livre: ' + err.message);
      setIsLoading(false);
      return null;
    }
  };
  
  // Function to cancel a reservation
  const cancelReservation = async (reservationId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would make an API call to cancel a reservation
      // For now, we'll simulate a successful cancellation with mock data
      setTimeout(() => {
        const reservation = reservations.find(r => r.id === reservationId);
        if (!reservation) {
          setError('Réservation non trouvée');
          setIsLoading(false);
          return false;
        }
        
        // Remove the reservation from the reservations array
        setReservations(prevReservations => 
          prevReservations.filter(r => r.id !== reservationId)
        );
        
        // If the reservation was in "ready" status, make the book available again
        if (reservation.status === 'ready') {
          setBooks(prevBooks => 
            prevBooks.map(b => 
              b.id === reservation.bookId ? { ...b, available: true } : b
            )
          );
        }
        
        // Update positions for other reservations of the same book
        if (reservation.status === 'waiting') {
          setReservations(prevReservations => 
            prevReservations.map(r => 
              r.bookId === reservation.bookId && r.status === 'waiting' && r.position > reservation.position 
                ? { ...r, position: r.position - 1 } 
                : r
            )
          );
        }
        
        setIsLoading(false);
        return true;
      }, 1000);
    } catch (err) {
      setError('Erreur lors de l\'annulation de la réservation' + err.message);
      // Reset loading state
      setIsLoading(false);
      return false;
    }
  };
  
  return (
    <LibraryContext.Provider value={{ 
      books,
      loans,
      reservations,
      isLoading,
      error,
      searchBooks,
      borrowBook,
      returnBook,
      reserveBook,
      cancelReservation
    }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};

export default LibraryContext;
