import React, { createContext, useContext, useReducer, useCallback, useMemo, useEffect } from 'react';
import api from '../services/apiService';

// Constants
const CONFIG = {
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
  },
  NOTIFICATIONS: {
    TOAST_DURATION: 5000,
  },
};

const ERROR_MESSAGES = {
  GENERIC: 'Une erreur est survenue. Veuillez réessayer.',
  AUTH_FAILED: 'Échec de l\'authentification',
  NETWORK_ERROR: 'Erreur de connexion réseau',
};

const SUCCESS_MESSAGES = {
  LOGIN: 'Connexion réussie',
  LOGOUT: 'Déconnexion réussie',
  SAVE: 'Données sauvegardées avec succès',
};

/**
 * État initial de l'application
 */
const initialState = {
  // État utilisateur
  user: null,
  isAuthenticated: false,
  permissions: [],
  
  // État UI
  loading: {
    auth: false,
    catalog: false,
    global: false,
  },
  
  // État des erreurs
  errors: {
    auth: null,
    catalog: null,
    global: null,
  },
  
  // État des notifications
  notifications: [],
    // État de l'application
  theme: 'light',
  sidebarCollapsed: false,
  
  // Cache des données
  cachedData: {
    books: null,
    categories: null,
    userStats: null,
  },
  
  // Préférences utilisateur
  preferences: {
    itemsPerPage: CONFIG.PAGINATION.DEFAULT_PAGE_SIZE,
    defaultView: 'grid',
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
  },
};

/**
 * Types d'actions pour le reducer
 */
const ACTION_TYPES = {
  // Actions d'authentification
  AUTH_REQUEST: 'AUTH_REQUEST',
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_FAILURE: 'AUTH_FAILURE',
  AUTH_LOGOUT: 'AUTH_LOGOUT',
  
  // Actions de données
  DATA_REQUEST: 'DATA_REQUEST',
  DATA_SUCCESS: 'DATA_SUCCESS',
  DATA_FAILURE: 'DATA_FAILURE',
  
  // Actions UI
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
    // Actions de préférences
  SET_THEME: 'SET_THEME',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  UPDATE_PREFERENCES: 'UPDATE_PREFERENCES',
  
  // Actions de cache
  SET_CACHED_DATA: 'SET_CACHED_DATA',
  CLEAR_CACHE: 'CLEAR_CACHE',
};

/**
 * Reducer principal de l'application
 */
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.AUTH_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, auth: true },
        errors: { ...state.errors, auth: null },
      };

    case ACTION_TYPES.AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        permissions: action.payload.permissions || [],
        loading: { ...state.loading, auth: false },
        errors: { ...state.errors, auth: null },
      };

    case ACTION_TYPES.AUTH_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        permissions: [],
        loading: { ...state.loading, auth: false },
        errors: { ...state.errors, auth: action.payload },
      };

    case ACTION_TYPES.AUTH_LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        permissions: [],
        cachedData: initialState.cachedData,
      };

    case ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        loading: { ...state.loading, [action.payload.key]: action.payload.value },
      };

    case ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        errors: { ...state.errors, [action.payload.key]: action.payload.error },
      };

    case ACTION_TYPES.CLEAR_ERROR:
      return {
        ...state,
        errors: { ...state.errors, [action.payload]: null },
      };

    case ACTION_TYPES.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };

    case ACTION_TYPES.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload),
      };    case ACTION_TYPES.SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };

    case ACTION_TYPES.TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarCollapsed: !state.sidebarCollapsed,
      };

    case ACTION_TYPES.UPDATE_PREFERENCES:
      return {
        ...state,
        preferences: { ...state.preferences, ...action.payload },
      };

    case ACTION_TYPES.SET_CACHED_DATA:
      return {
        ...state,
        cachedData: { ...state.cachedData, [action.payload.key]: action.payload.data },
      };

    case ACTION_TYPES.CLEAR_CACHE:
      return {
        ...state,
        cachedData: initialState.cachedData,
      };

    default:
      return state;
  }
};

/**
 * Context de l'application
 */
const AppContext = createContext();

/**
 * Hook pour utiliser le context de l'application
 */
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

/**
 * Provider de l'application avec état optimisé
 */
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Actions memoized
  const actions = useMemo(() => ({
    // Actions d'authentification
    loginRequest: () => 
      dispatch({ type: ACTION_TYPES.AUTH_REQUEST }),
    
    loginSuccess: (user, permissions) => 
      dispatch({ 
        type: ACTION_TYPES.AUTH_SUCCESS, 
        payload: { user, permissions } 
      }),
    
    loginFailure: (error) => 
      dispatch({ 
        type: ACTION_TYPES.AUTH_FAILURE, 
        payload: error 
      }),
      logout: () => {
      // Clear localStorage during logout
      localStorage.removeItem('auth_token');
      dispatch({ type: ACTION_TYPES.AUTH_LOGOUT });
    },

    // Actions UI
    setLoading: (key, value) => 
      dispatch({ 
        type: ACTION_TYPES.SET_LOADING, 
        payload: { key, value } 
      }),
    
    setError: (key, error) => 
      dispatch({ 
        type: ACTION_TYPES.SET_ERROR, 
        payload: { key, error } 
      }),
    
    clearError: (key) => 
      dispatch({ 
        type: ACTION_TYPES.CLEAR_ERROR, 
        payload: key 
      }),

    // Actions de notifications
    addNotification: (notification) => {
      const id = Date.now().toString();
      const notificationWithId = { ...notification, id };
      
      dispatch({ 
        type: ACTION_TYPES.ADD_NOTIFICATION, 
        payload: notificationWithId 
      });

      // Auto-remove après délai
      if (notification.autoRemove !== false) {
        setTimeout(() => {
          dispatch({ 
            type: ACTION_TYPES.REMOVE_NOTIFICATION, 
            payload: id 
          });
        }, notification.duration || CONFIG.NOTIFICATIONS.TOAST_DURATION);
      }

      return id;
    },
    
    removeNotification: (id) => 
      dispatch({ 
        type: ACTION_TYPES.REMOVE_NOTIFICATION, 
        payload: id 
      }),

    // Actions de préférences
    setTheme: (theme) => {
      localStorage.setItem('theme', theme);
      dispatch({ type: ACTION_TYPES.SET_THEME, payload: theme });
    },
    
    setLanguage: (language) => {
      localStorage.setItem('language', language);
      dispatch({ type: ACTION_TYPES.SET_LANGUAGE, payload: language });
    },
    
    toggleSidebar: () => 
      dispatch({ type: ACTION_TYPES.TOGGLE_SIDEBAR }),
    
    updatePreferences: (preferences) => {
      localStorage.setItem('preferences', JSON.stringify(preferences));
      dispatch({ 
        type: ACTION_TYPES.UPDATE_PREFERENCES, 
        payload: preferences 
      });
    },

    // Actions de cache
    setCachedData: (key, data) => 
      dispatch({ 
        type: ACTION_TYPES.SET_CACHED_DATA, 
        payload: { key, data } 
      }),
      clearCache: () => {
      dispatch({ type: ACTION_TYPES.CLEAR_CACHE });
    },
  }), []);

  // Méthodes utilitaires memoized
  const utils = useMemo(() => ({
    // Vérification des permissions
    hasPermission: (permission) => {
      return state.permissions.includes(permission);
    },
    
    hasAnyPermission: (permissions) => {
      return permissions.some(p => state.permissions.includes(p));
    },
    
    hasAllPermissions: (permissions) => {
      return permissions.every(p => state.permissions.includes(p));
    },
    
    // Gestion des erreurs
    handleError: (error, key = 'global') => {
      const errorMessage = error?.message || ERROR_MESSAGES.GENERIC;
      actions.setError(key, errorMessage);
      actions.addNotification({
        type: 'error',
        title: 'Erreur',
        message: errorMessage,
      });
    },
    
    // Gestion des succès
    handleSuccess: (message, title = 'Succès') => {
      actions.addNotification({
        type: 'success',
        title,
        message,
      });
    },
    
    // Gestion du loading
    withLoading: async (key, asyncFn) => {
      actions.setLoading(key, true);
      try {
        const result = await asyncFn();
        actions.clearError(key);
        return result;
      } catch (error) {
        utils.handleError(error, key);
        throw error;
      } finally {
        actions.setLoading(key, false);
      }
    },
  }), [state.permissions, actions]);

  // Valeur du context memoized
  const contextValue = useMemo(() => ({
    state,
    actions,
    utils,
    // Raccourcis pour un accès facile
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    errors: state.errors,
    notifications: state.notifications,
    theme: state.theme,
    language: state.language,
    preferences: state.preferences,
  }), [state, actions, utils]);

   // 👇 Appelé une seule fois après le chargement de l'app
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        const permissions = generatePermissions(user.role);
        actions.loginSuccess(user, permissions);
      } catch (error) {
        console.error("Erreur parsing user:", error);
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
      }
    }
  }, []);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

/**
 * Hook spécialisé pour l'authentification
 */
const generatePermissions = (role) => {
  switch (role) {
    case 'admin':
      return ['admin', 'read', 'write', 'manage_users'];
    case 'bibliothecaire':
      return ['librarian', 'read', 'write', 'manage_books'];
    case 'enseignant':
      return ['teacher', 'read', 'recommend'];
    case 'etudiant':
    default:
      return ['student', 'read'];
  }
};

export const useAuth = () => {
  const { state, actions, utils } = useApp();
  
  return useMemo(() => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    permissions: state.permissions,
    loading: state.loading.auth,    error: state.errors.auth,
    
    login: async (credentials) => {
  return utils.withLoading('auth', async () => {
    actions.loginRequest();

    try {
      const response = await api.post('/login', {
        email: credentials.email,
        mdp: credentials.password,
      });

      const { token, user } = response.data;

            // 🔥 Ajout logique du type utilisateur
      if (user?.etudiant) {
        user.userType = 'etudiant';
      } else if (user?.enseignant) {
        user.userType = 'enseignant';
      } else if (user?.bibliothecaire) {
        user.userType = 'bibliothecaire';
      } else if (user?.role === 'admin') {
        user.userType = 'admin';
      }

      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));

      const permissions = generatePermissions(user.role);
      actions.loginSuccess(user, permissions);
      utils.handleSuccess('Connexion réussie !');
    } catch (error) {
      const msg = error.response?.data?.message || 'Erreur lors de la connexion';
      actions.loginFailure(msg);
      throw new Error(msg);
    }
  });
},

    
   // In AppContext.jsx
register: async (userData) => { // 'userData' here is what you passed as 'finalUserData' from Register.jsx
  return utils.withLoading('auth', async () => {
    actions.loginRequest();

    // Your console.log from the previous step correctly showed:
    // "Data received inside AppContext's register function:", { ..., mdp: "secret123", ... }
    console.log("Data received inside AppContext's register function:", userData); // Use 'userData' directly here

    try {
      const basePayload = {
        nom: userData.firstName,
        prenom: userData.lastName,
        email: userData.email,
        telephone: userData.telephone || '0000000000',
        // --- FIX STARTS HERE ---
        mdp: userData.mdp, // Correctly use userData.mdp
        mdp_confirmation: userData.mdp_confirmation, // Correctly use userData.mdp_confirmation
        // --- FIX ENDS HERE ---
        role: userData.userType,
      };

      let specificPayload = {};

      if (userData.userType === 'etudiant') {
        specificPayload = {
          matricule: userData.matricule,
          filiere: userData.filiere,
          niveau: userData.niveau,
          departement: userData.department || 'Non défini',
        };
      } else if (userData.userType === 'enseignant') {
        specificPayload = {
          specialite: userData.specialization,
          grade: userData.grade,
          departement: userData.department || 'Informatique',
        };
      } else if (userData.userType === 'bibliothecaire') {
        specificPayload = {
          departement: userData.department || 'Bibliothèque',
        };
      } else if (userData.userType === 'admin') {
        specificPayload = {
          departement: userData.department || 'Administration',
          niveau: userData.niveau || null,
        };
      }

      const response = await api.post('/register', {
        ...basePayload,
        ...specificPayload,
      });

      // ... rest of your code
    } catch (error) {
      const msg = error.response?.data?.message || "Erreur lors de l'inscription";
      actions.loginFailure(msg);
      throw new Error(msg);
    }
  });
},


    logout: async () => {
  try {
    await api.post('/logout');
  } catch (e) {
    console.warn('Échec de la déconnexion côté serveur');
  }
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  actions.logout();
  utils.handleSuccess('Déconnexion réussie');
},

  // Méthode pour initialiser l'auth depuis localStorage au démarrage
    initializeAuth: () => {
  const token = localStorage.getItem('authToken');
  const userData = localStorage.getItem('user');
  
  if (token && userData) {
    try {
      const user = JSON.parse(userData);

      // 🔥 Ajouter ici le type d'utilisateur pour que le menu fonctionne
      if (user?.etudiant) {
        user.userType = 'etudiant';
      } else if (user?.enseignant) {
        user.userType = 'enseignant';
      } else if (user?.bibliothecaire) {
        user.userType = 'bibliothecaire';
      } else if (user?.role === 'admin') {
        user.userType = 'admin';
      }

      const permissions = generatePermissions(user.role);
      actions.loginSuccess(user, permissions);
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de l\'auth:', error);
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  }
},
    

    // Email verification methods
    verifyEmail: async (token) => {
      return utils.withLoading('auth', async () => {
        // Mock email verification (replace with real API call)
        await new Promise((resolve) => {
          setTimeout(() => {
            utils.handleSuccess('Email vérifié avec succès !');
            resolve();
          }, 1000);
        });
      });
    },
    
    resendVerification: async (email) => {
      return utils.withLoading('auth', async () => {
        // Mock resend verification (replace with real API call)
        await new Promise((resolve) => {
          setTimeout(() => {
            utils.handleSuccess('Email de vérification renvoyé !');
            resolve();
          }, 1000);
        });
      });
    },
    
    // Password reset methods
    resetPassword: async (token, newPassword) => {
      return utils.withLoading('auth', async () => {
        // Mock password reset (replace with real API call)
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            if (token && newPassword) {
              utils.handleSuccess('Mot de passe réinitialisé avec succès !');
              resolve();
            } else {
              reject(new Error('Token ou mot de passe invalide'));
            }
          }, 1000);
        });
      });
    },
    
    hasPermission: utils.hasPermission,
    hasAnyPermission: utils.hasAnyPermission,
    hasAllPermissions: utils.hasAllPermissions,
  }), [state, actions, utils]);
};

/**
 * Hook spécialisé pour les notifications
 */
export const useNotifications = () => {
  const { state, actions } = useApp();

  
  return useMemo(() => ({
    notifications: state.notifications,
    
    success: (message, title = 'Succès') => 
      actions.addNotification({ type: 'success', title, message }),
    
    error: (message, title = 'Erreur') => 
      actions.addNotification({ type: 'error', title, message }),
    
    warning: (message, title = 'Attention') => 
      actions.addNotification({ type: 'warning', title, message }),
    
    info: (message, title = 'Information') => 
      actions.addNotification({ type: 'info', title, message }),
    
    remove: actions.removeNotification,
  }), [state.notifications, actions]);
};

export default AppContext;
