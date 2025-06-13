import { API_BASE_URL, GOOGLE_BOOKS_API_URL } from '../constants';
import { handleApiError } from '../utils/errorHandling';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    // Check if unauthorized
    if (response.status === 401) {
      // Try token refresh
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        // No refresh token, logout user
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
        throw new Error('Session expirée, veuillez vous reconnecter');
      }
      
      try {
        const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            refreshToken
          })
        });
        
        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          localStorage.setItem('auth_token', data.token);
          
          // Retry original request with new token
          const retryResponse = await fetch(response.url, {
            method: response.method || 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${data.token}`
            },
            body: response.body
          });
          
          return handleResponse(retryResponse);
        } else {
          // Refresh token failed, logout user
          localStorage.removeItem('auth_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
          throw new Error('Session expirée, veuillez vous reconnecter');
        }
      } catch (error) {
        // Network or other error during refresh
        console.error('Token refresh error:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        throw new Error('Problème de connexion, veuillez vous reconnecter');
      }
    }
    
    // Use our error handling utility
    const errorMessage = await handleApiError(response);
    throw new Error(errorMessage);
  }
  
  return response.json();
};

// Function to create request with auth token
const createRequest = (endpoint, options = {}) => {
  const token = localStorage.getItem('auth_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  }).then(handleResponse);
};

// Google Books API service
export const googleBooksApi = {
  search: async (query, startIndex = 0, maxResults = 10) => {
    try {
      const response = await fetch(
        `${GOOGLE_BOOKS_API_URL}?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=${maxResults}`
      );
      
      if (!response.ok) {
        await handleApiError(response);
        throw new Error(`Erreur lors de la recherche de livres (${response.status})`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Error fetching books from Google Books API:', error);
      throw error;
    }
  },
  
  getBookDetails: async (bookId) => {
    try {
      const response = await fetch(`${GOOGLE_BOOKS_API_URL}/${bookId}`);
      
      if (!response.ok) {
        await handleApiError(response);
        throw new Error(`Erreur lors de la récupération des détails du livre (${response.status})`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Error fetching book details from Google Books API:', error);
      throw error;
    }
  }
};

// Auth service
export const authService = {
  login: async (email, password) => {
    try {
      const response = await createRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('refresh_token', response.refreshToken);
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  register: async (userData) => {
    try {
      const response = await createRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
      });
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('refresh_token', response.refreshToken);
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
  },
  
  getCurrentUser: async () => {
    try {
      return await createRequest('/auth/me');
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  }
};

// Library service
export const libraryService = {
  // Books related endpoints
  getBooks: async (params) => {
    try {
      // Convert params to query string
      const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
      return await createRequest(`/books${queryString}`);
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  },
  
  getBookById: async (bookId) => {
    try {
      return await createRequest(`/books/${bookId}`);
    } catch (error) {
      console.error(`Error fetching book with id ${bookId}:`, error);
      throw error;
    }
  },
  
  // Loans related endpoints
  getLoans: async (userId) => {
    try {
      const queryString = userId ? `?userId=${userId}` : '';
      return await createRequest(`/loans${queryString}`);
    } catch (error) {
      console.error('Error fetching loans:', error);
      throw error;
    }
  },
  
  createLoan: async (loanData) => {
    try {
      return await createRequest('/loans', {
        method: 'POST',
        body: JSON.stringify(loanData)
      });
    } catch (error) {
      console.error('Error creating loan:', error);
      throw error;
    }
  },
  
  returnBook: async (loanId) => {
    try {
      return await createRequest(`/loans/${loanId}/return`, {
        method: 'PUT'
      });
    } catch (error) {
      console.error(`Error returning book for loan ${loanId}:`, error);
      throw error;
    }
  },
  
  // Reservations related endpoints
  getReservations: async (userId) => {
    try {
      const queryString = userId ? `?userId=${userId}` : '';
      return await createRequest(`/reservations${queryString}`);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      throw error;
    }
  },
  
  createReservation: async (reservationData) => {
    try {
      return await createRequest('/reservations', {
        method: 'POST',
        body: JSON.stringify(reservationData)
      });
    } catch (error) {
      console.error('Error creating reservation:', error);
      throw error;
    }
  },
  
  cancelReservation: async (reservationId) => {
    try {
      return await createRequest(`/reservations/${reservationId}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error(`Error canceling reservation ${reservationId}:`, error);
      throw error;
    }
  }
};

// Export the createRequest function to be used directly if needed
export default { createRequest };
