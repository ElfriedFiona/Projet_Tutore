import { createContext, useState, useContext } from 'react';
import api from '../services/apiService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await api.post('/login', {
        email: credentials.email,
        mdp: credentials.password
      });

      const { token, user: userData, message } = response.data;

      // Enregistre le token (ex: localStorage)
      localStorage.setItem('authToken', token);

      // Mets l'utilisateur dans le contexte
      setUser(userData);
      return { success: true, message };
    } catch (err) {
      const msg = err.response?.data?.message || "Erreur lors de la connexion.";
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
  setLoading(true);
  try {
    const basePayload = {
      nom: userData.firstName,
      prenom: userData.lastName,
      email: userData.email,
      telephone: userData.telephone || '0000000000',
      mdp: userData.password,
      mdp_confirmation: userData.passwordConfirm,
      role: userData.userType,
    };

    let specificPayload = {};

    if (userData.userType === 'student') {
      specificPayload = {
        matricule: userData.matricule,
        filiere: userData.filiere,
        niveau: userData.niveau,
        departement: userData.department || 'Non défini',
      };
    } else if (userData.userType === 'teacher') {
      specificPayload = {
        specialite: userData.specialization,
        grade: userData.grade,
        departement: userData.department || 'Informatique',
      };
    } else if (userData.userType === 'librarian') {
      specificPayload = {
        departement: userData.department || 'Bibliothèque',
      };
    } else if (userData.userType === 'administrator') {
      specificPayload = {
        departement: userData.department || 'Administration',
        niveau: userData.niveau || null,
      };
    }

    const response = await api.post('/register', {
      ...basePayload,
      ...specificPayload
    });

    const { message } = response.data;
    return { success: true, message };
  } catch (err) {
    const msg = err.response?.data?.message || "Erreur lors de l'inscription.";
    return { success: false, message: msg };
  } finally {
    setLoading(false);
  }
};


  const logout = async () => {
  try {
    await api.post('/logout');
  } catch (err) {
    console.error("Erreur de déconnexion", err);
  } finally {
    localStorage.removeItem('authToken');
    setUser(null);
  }
};


  const value = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
