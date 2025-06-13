/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Garder error en interne, ne pas l'exposer
  const [error, setError] = useState('');

  const login = async (credentials) => {
    setLoading(true);
    try {
      // In a real app, this would make an API call to authenticate the user
      // For now, we'll just simulate a successful login with mock data
      await new Promise((resolve) => {
        setTimeout(() => {
          // Mock successful login
          if (credentials.email === 'admin@example.com' && credentials.password === 'password123') {
            setUser({
              id: 1,
              firstName: 'Admin',
              lastName: 'User',
              email: 'admin@example.com',
              role: 'admin'
            });
          } else if (credentials.email === 'administrator@enspd.cm' && credentials.password === 'admin123') {
            setUser({
              id: 2,
              firstName: 'Jean',
              lastName: 'Administrateur',
              email: 'administrator@enspd.cm',
              role: 'administrator',
              userType: 'administrator',
              department: 'Administration'
            });          } else if (credentials.email === 'librarian@enspd.cm' && credentials.password === 'lib123') {
            setUser({
              id: 3,
              firstName: 'Marie',
              lastName: 'Bibliothécaire',
              email: 'librarian@enspd.cm',
              role: 'librarian',
              userType: 'librarian',
              department: 'Bibliothèque'
            });
          } else if (credentials.email === 'admin2@enspd.cm' && credentials.password === 'admin2024') {
            setUser({
              id: 7,
              firstName: 'Sophie',
              lastName: 'Administratrice',
              email: 'admin2@enspd.cm',
              role: 'administrator',
              userType: 'administrator',
              department: 'Direction Générale'
            });
          } else if (credentials.email === 'librarian2@enspd.cm' && credentials.password === 'biblio2024') {
            setUser({
              id: 8,
              firstName: 'Paul',
              lastName: 'Bibliothécaire',
              email: 'librarian2@enspd.cm',
              role: 'librarian',
              userType: 'librarian',
              department: 'Bibliothèque Numérique'
            });
          } else if (credentials.email === 'teacher@enspd.cm' && credentials.password === 'teach123') {
            setUser({
              id: 4,
              firstName: 'Paul',
              lastName: 'Enseignant',
              email: 'teacher@enspd.cm',
              role: 'teacher',
              userType: 'teacher',
              department: 'Informatique',
              specialization: 'Développement Web',
              grade: 'Professeur Assistant'
            });
          } else if (credentials.email === 'student@enspd.cm' && credentials.password === 'stud123') {
            setUser({
              id: 5,
              firstName: 'Sophie',
              lastName: 'Étudiante',
              email: 'student@enspd.cm',
              role: 'student',
              userType: 'student',
              department: 'Informatique',
              matricule: 'INF2025001',
              filiere: 'Génie Logiciel',
              niveau: 'L3'
            });
          } else if (credentials.email === 'user@example.com' && credentials.password === 'password123') {
            setUser({
              id: 6,
              firstName: 'Regular',
              lastName: 'User',
              email: 'user@example.com',
              role: 'user'
            });
          } else {
            setError('Identifiants incorrects');
          }
          setLoading(false);
          resolve();
        }, 1000);
      });
    } catch (err) {
      console.error('Login error:', err);
      // Lancer l'erreur pour que la page la capture
      throw new Error(err.response?.data?.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // In a real app, this might make an API call to invalidate the session
    setUser(null);
  }; const register = async (userData) => {
    setLoading(true);
    try {
      // In a real app, this would make an API call to register the user
      await new Promise((resolve) => {
        setTimeout(() => {
          // Mock successful registration
          let role = 'user'; // Par défaut          // Assigner le rôle basé sur le type d'utilisateur
          if (userData.userType === 'teacher') {
            role = 'teacher';
          } else if (userData.userType === 'student') {
            role = 'student';
          } else if (userData.userType === 'librarian') {
            role = 'librarian';
          } else if (userData.userType === 'administrator') {
            role = 'administrator';
          }

          setUser({
            id: Date.now(), // Générer un ID unique temporaire
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            userType: userData.userType,
            role: role,
            department: userData.department,
            // Champs spécifiques aux étudiants
            ...(userData.userType === 'student' && {
              matricule: userData.matricule,
              filiere: userData.filiere,
              niveau: userData.niveau
            }),
            // Champs spécifiques aux enseignants
            ...(userData.userType === 'teacher' && {
              employeeId: userData.employeeId,
              specialization: userData.specialization,
              grade: userData.grade
            })
          });
          setLoading(false);
          resolve();
        }, 1000);
      });
    } catch (err) {
      console.error('Registration error:', err);
      // Lancer l'erreur pour que la page la capture
      throw new Error(err.response?.data?.message || 'Erreur d\'inscription');
    } finally {
      setLoading(false);
    }
  };

  // NE PAS exposer error dans la valeur
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

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
