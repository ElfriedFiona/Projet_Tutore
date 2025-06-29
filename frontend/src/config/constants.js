/**
 * Configuration centralisée de l'application
 */

// Environnement et configuration API
export const CONFIG = {
  // URLs d'API
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  API_TIMEOUT: 30000, // 30 secondes
  
  // Configuration du cache
  CACHE: {
    DEFAULT_TTL: 5 * 60 * 1000, // 5 minutes
    MAX_SIZE: 200,
    STORAGE_PREFIX: 'library_app_',
  },
  
  // Configuration de pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 12,
    MAX_PAGE_SIZE: 100,
    SEARCH_DEBOUNCE: 300,
  },
  
  // Limites d'upload
  UPLOAD: {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
    ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword'],
  },
  
  // Configuration des notifications
  NOTIFICATIONS: {
    TOAST_DURATION: 5000,
    MAX_TOASTS: 5,
  },
  
  // Configuration responsive
  BREAKPOINTS: {
    xs: 480,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
  
  // Performance
  PERFORMANCE: {
    VIRTUAL_LIST_ITEM_HEIGHT: 60,
    LAZY_LOAD_THRESHOLD: 100,
    DEBOUNCE_DELAY: 300,
  },
  
  // Fonctionnalités
  FEATURES: {
    ENABLE_PWA: true,
    ENABLE_OFFLINE_MODE: true,
    ENABLE_DARK_MODE: true,
    ENABLE_ANALYTICS: import.meta.env.PROD,
  }
};

// Messages d'erreur standardisés
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erreur de connexion réseau. Vérifiez votre connexion internet.',
  SERVER_ERROR: 'Erreur serveur. Veuillez réessayer plus tard.',
  VALIDATION_ERROR: 'Données invalides. Vérifiez les champs du formulaire.',
  UNAUTHORIZED: 'Accès non autorisé. Veuillez vous connecter.',
  FORBIDDEN: 'Vous n\'avez pas les permissions nécessaires.',
  NOT_FOUND: 'Ressource non trouvée.',
  TIMEOUT: 'La requête a pris trop de temps. Veuillez réessayer.',
  GENERIC: 'Une erreur inattendue s\'est produite.',
};

// Messages de succès
export const SUCCESS_MESSAGES = {
  LOGIN: 'Connexion réussie !',
  LOGOUT: 'Déconnexion réussie.',
  REGISTRATION: 'Inscription réussie ! Vérifiez votre email.',
  PROFILE_UPDATE: 'Profil mis à jour avec succès.',
  PASSWORD_CHANGE: 'Mot de passe modifié avec succès.',
  BOOK_BORROWED: 'Livre emprunté avec succès.',
  BOOK_RETURNED: 'Livre retourné avec succès.',
  RESERVATION_CREATED: 'Réservation créée avec succès.',
  FAVORITE_ADDED: 'Ajouté aux favoris.',
  FAVORITE_REMOVED: 'Retiré des favoris.',
};

// Routes de l'application
export const ROUTES = {
  HOME: '/',
  CATALOG: '/catalog',
  CONTACT: '/contact',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  
  // Dashboard
  DASHBOARD: '/dashboard',
  DASHBOARD_LOANS: '/dashboard/loans',
  DASHBOARD_RESERVATIONS: '/dashboard/reservations',
  DASHBOARD_PROFILE: '/dashboard/profile',
  DASHBOARD_FAVORITES: '/dashboard/favorites',
  DASHBOARD_RECOMMENDATIONS: '/dashboard/recommendations',
  DASHBOARD_ACQUISITIONS: '/dashboard/acquisitions',
  DASHBOARD_LIBRARIAN: '/dashboard/librarian',
  DASHBOARD_ADMINISTRATOR: '/dashboard/administrator',
  
  // Admin
  ADMIN: '/admin',
  
  // Autres
  BOOK_DETAIL: '/book/:id',
  TEST_ACCOUNTS: '/test-accounts',
};

// Rôles et permissions
export const ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  LIBRARIAN: 'librarian',
  ADMIN: 'admin',
  ADMINISTRATOR: 'administrator',
};

export const PERMISSIONS = {
  // Permissions de base
  READ_CATALOG: 'read:catalog',
  BORROW_BOOKS: 'borrow:books',
  MAKE_RESERVATIONS: 'make:reservations',
  
  // Permissions enseignant
  RECOMMEND_BOOKS: 'recommend:books',
  REQUEST_ACQUISITIONS: 'request:acquisitions',
  
  // Permissions bibliothécaire
  MANAGE_CATALOG: 'manage:catalog',
  MANAGE_LOANS: 'manage:loans',
  MANAGE_RESERVATIONS: 'manage:reservations',
  GENERATE_REPORTS: 'generate:reports',
  
  // Permissions admin
  MANAGE_USERS: 'manage:users',
  MANAGE_SYSTEM: 'manage:system',
  ACCESS_ANALYTICS: 'access:analytics',
};

// Mappage rôle -> permissions
export const ROLE_PERMISSIONS = {
  [ROLES.STUDENT]: [
    PERMISSIONS.READ_CATALOG,
    PERMISSIONS.BORROW_BOOKS,
    PERMISSIONS.MAKE_RESERVATIONS,
  ],
  [ROLES.TEACHER]: [
    PERMISSIONS.READ_CATALOG,
    PERMISSIONS.BORROW_BOOKS,
    PERMISSIONS.MAKE_RESERVATIONS,
    PERMISSIONS.RECOMMEND_BOOKS,
    PERMISSIONS.REQUEST_ACQUISITIONS,
  ],
  [ROLES.LIBRARIAN]: [
    PERMISSIONS.READ_CATALOG,
    PERMISSIONS.MANAGE_CATALOG,
    PERMISSIONS.MANAGE_LOANS,
    PERMISSIONS.MANAGE_RESERVATIONS,
    PERMISSIONS.GENERATE_REPORTS,
  ],
  [ROLES.ADMIN]: Object.values(PERMISSIONS),
  [ROLES.ADMINISTRATOR]: Object.values(PERMISSIONS),
};

// États des livres et emprunts
export const BOOK_STATUS = {
  AVAILABLE: 'available',
  BORROWED: 'borrowed',
  RESERVED: 'reserved',
  PROCESSING: 'processing',
  LOST: 'lost',
  DAMAGED: 'damaged',
  MAINTENANCE: 'maintenance',
};

export const LOAN_STATUS = {
  ACTIVE: 'active',
  RETURNED: 'returned',
  OVERDUE: 'overdue',
  LOST: 'lost',
  RENEWED: 'renewed',
};

export const RESERVATION_STATUS = {
  WAITING: 'waiting',
  READY: 'ready',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
  FULFILLED: 'fulfilled',
};

// Paramètres de l'interface
export const UI_CONSTANTS = {
  // Animations
  ANIMATION_DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
  },
  
  // Z-index layers
  Z_INDEX: {
    DROPDOWN: 1000,
    MODAL: 1040,
    TOOLTIP: 1050,
    TOAST: 1060,
    LOADING: 1070,
  },
  
  // Couleurs sémantiques
  COLORS: {
    SUCCESS: '#10B981',
    WARNING: '#F59E0B',
    ERROR: '#EF4444',
    INFO: '#3B82F6',
  },
  
  // Tailles d'avatar
  AVATAR_SIZES: {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
  },
};

// Constantes de validation
export const VALIDATION = {
  PASSWORD: {
    MIN_LENGTH: 8,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBER: true,
    REQUIRE_SPECIAL: true,
  },
  
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  
  PHONE: {
    PATTERN: /^(\+\d{1,3}\s?)?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,9}$/,
  },
  
  MATRICULE: {
    PATTERN: /^[A-Z]{2}\d{6}$/,
    EXAMPLE: 'GO123456',
  },
  
  EMPLOYEE_ID: {
    PATTERN: /^EMP\d{6}$/,
    EXAMPLE: 'EMP123456',
  },
};

// Configuration des métadonnées
export const META = {
  APP_NAME: 'Bibliothèque Universitaire ENSPD',
  APP_DESCRIPTION: 'Système de gestion de bibliothèque universitaire moderne et responsive',
  KEYWORDS: 'bibliothèque, université, livres, emprunts, réservations, ENSPD',
  AUTHOR: 'ENSPD Development Team',
  VERSION: '1.0.0',
};

// Configuration PWA
export const PWA_CONFIG = {
  THEME_COLOR: '#1E40AF',
  BACKGROUND_COLOR: '#FFFFFF',
  DISPLAY: 'standalone',
  ORIENTATION: 'portrait-primary',
  ICONS: [
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
  ],
};

// Exports par défaut pour faciliter l'utilisation
export default {
  CONFIG,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  ROUTES,
  ROLES,
  PERMISSIONS,
  ROLE_PERMISSIONS,
  BOOK_STATUS,
  LOAN_STATUS,
  RESERVATION_STATUS,
  UI_CONSTANTS,
  VALIDATION,
  META,
  PWA_CONFIG,
};
