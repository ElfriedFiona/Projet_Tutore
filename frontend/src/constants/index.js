// File to store various constants used throughout the application

// API endpoints
export const API_BASE_URL = 'https://api.example.com'; // Replace with actual API URL in production

// Google Books API
export const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';

// Book categories
export const BOOK_CATEGORIES = [
  'Littérature',
  'Informatique',
  'Histoire',
  'Économie',
  'Sciences',
  'Philosophie',
  'Art',
  'Langues',
  'Droit',
  'Médecine'
];

// Loan periods (in days)
export const DEFAULT_LOAN_PERIOD = 30;
export const EXTENDED_LOAN_PERIOD = 60;
export const MAX_RENEWALS = 2;

// Reservation periods (in days)
export const RESERVATION_HOLD_PERIOD = 7;

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  LIBRARIAN: 'librarian',
  USER: 'user'
};

// Book statuses
export const BOOK_STATUS = {
  AVAILABLE: 'available',
  BORROWED: 'borrowed',
  RESERVED: 'reserved',
  PROCESSING: 'processing',
  LOST: 'lost',
  DAMAGED: 'damaged'
};

// Loan statuses
export const LOAN_STATUS = {
  ACTIVE: 'active',
  RETURNED: 'returned',
  OVERDUE: 'overdue',
  LOST: 'lost'
};

// Reservation statuses
export const RESERVATION_STATUS = {
  WAITING: 'waiting',
  READY: 'ready',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
  FULFILLED: 'fulfilled'
};

// Pagination
export const ITEMS_PER_PAGE = 10;

// Fine rates (in FCFA per day)
export const OVERDUE_FINE_RATE = 500;
