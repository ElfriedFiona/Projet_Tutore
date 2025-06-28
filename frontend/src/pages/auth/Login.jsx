import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BackButton from '../../components/common/BackButton';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import ErrorAlert from '../../components/common/ErrorAlert';
import FormInput from '../../components/common/FormInput';
import Loading from '../../components/common/Loading';
import PasswordInput from '../../components/common/PasswordInput';
import { useAuth } from '../../context/AppContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({});
  const [localError, setLocalError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const { login, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Nous n'aurons plus besoin de 'from' ici car la redirection sera basée sur le rôle après la connexion.
  // const from = location.state?.from?.pathname || '/dashboard'; // Supprimé

  // --- NOUVEAU useEffect pour gérer la redirection APRÈS connexion et récupération du rôle ---
  useEffect(() => {
    if (user) {
      // User est connecté, nous pouvons maintenant le rediriger en fonction de son rôle
      console.log('User connected, role:', user.role); // Pour le débogage

      switch (user.role) {
        case 'student':
        case 'etudiant':
        case 'teacher':
        case 'enseignant':
          // Rediriger les étudiants et enseignants vers le tableau de bord par défaut
          navigate('/dashboard', { replace: true });
          break;
        case 'librarian':
        case 'bibliothecaire':
          // Rediriger les bibliothécaires vers leur propre tableau de bord
          navigate('/dashboard/librarian', { replace: true });
          break;
        case 'admin':
          // Rediriger les administrateurs vers leur tableau de bord
          navigate('/dashboard/administrator', { replace: true });
          break;
        default:
          // Gérer les rôles inconnus ou non spécifiés
          console.warn('Rôle utilisateur inconnu ou non géré:', user.role);
          navigate('/access-denied', { replace: true }); // Ou une page d'accueil générique
          break;
      }
    }
  }, [user, navigate]); // Dépend de `user` pour se déclencher quand l'état de connexion change

  // Garder ce useEffect pour l'affichage du message "Compte créé avec succès"
  useEffect(() => {
    if (location.state?.registered) {
      const timer = setTimeout(() => {
        // Clear the state by navigating to the same path without state
        navigate(location.pathname, { replace: true, state: {} });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  // Nettoyer l'erreur locale au montage
  useEffect(() => {
    setLocalError('');
  }, []);

  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = 'Email requis';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = 'Adresse email invalide';
    }

    if (!formData.password) {
      errors.password = 'Mot de passe requis';
    } else if (formData.password.length < 6) {
      errors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (validateForm()) {
      try {
        // L'appel à `login(formData)` met à jour l'état `user` dans `AppContext`.
        // C'est cette mise à jour qui déclenchera le `useEffect` ci-dessus pour la redirection.
        await login(formData);
        // Pas besoin de redirection ici, le `useEffect` s'en chargera
      } catch (err) {
        console.error('Login error:', err);
        setLocalError(err.message || 'Erreur de connexion. Veuillez réessayer.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Breadcrumbs />
        <BackButton className="mb-4" />

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl mb-4 animate-pulse-shadow">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-neutral-800 animate-text-focus-in">
              Connexion
            </h2>
            <p className="mt-2 text-neutral-600">
              Accédez à votre espace
            </p> {/* J'ai simplifié le texte ici pour être plus générique */}
          </div>

          {(localError) && (
            <div className="mb-6">
              <ErrorAlert
                message={localError}
                onClose={() => setLocalError('')}
              />
            </div>
          )}

          {location.state?.registered && (
            <div className="mb-6">
              <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-xl text-sm shadow-sm animate-fade-in">
                ✅ Compte créé avec succès. Veuillez vous connecter.
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <FormInput
                id="email"
                name="email"
                type="email"
                label="Email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                error={formErrors.email}
                placeholder="votre.email@enspd.edu"
                required
                className="transition-all duration-300 focus:scale-[1.02]"
              />

              <PasswordInput
                id="password"
                name="password"
                label="Mot de passe"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                error={formErrors.password}
                placeholder="••••••••"
                required
                className="transition-all duration-300 focus:scale-[1.02]"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center group cursor-pointer">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-primary-600 bg-white border-2 border-neutral-300 rounded focus:ring-primary-500 focus:ring-2 transition-all duration-200"
                />
                <span className="ml-3 text-sm text-neutral-700 group-hover:text-primary-600 transition-colors">
                  Se souvenir de moi
                </span>
              </label>
              <Link
                to="/forgot-password"
                onClick={() => {
                  setLocalError('');
                }}
                className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200 hover:underline"
              >
                Mot de passe oublié?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-semibold rounded-2xl text-white transition-all duration-300 transform ${loading
                ? 'bg-gradient-to-r from-neutral-400 to-neutral-500 cursor-not-allowed' : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary-500/25 active:scale-[0.98]'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
            >
              {loading ? (
                <>
                  <Loading size="small" />
                  <span className="ml-2">Connexion en cours...</span>
                </>
              ) : (
                <>
                  <span>Se connecter</span>
                  <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-neutral-500">Nouveau sur ENSPD?</span>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              <Link
                to="/register"
                onClick={() => {
                  setLocalError('');
                }}
                className="inline-flex items-center px-6 py-2 border-2 border-primary-200 text-sm font-medium rounded-xl text-primary-600 bg-white hover:bg-primary-50 hover:border-primary-300 transition-all duration-200 hover:scale-105"
              >
                Créer un compte
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;