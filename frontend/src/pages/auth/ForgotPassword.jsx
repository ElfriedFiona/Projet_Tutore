import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AppContext';
import Loading from '../../components/common/Loading';
import ErrorAlert from '../../components/common/ErrorAlert';
import FormInput from '../../components/common/FormInput';
import BackButton from '../../components/common/BackButton';
import Breadcrumbs from '../../components/common/Breadcrumbs';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [localError, setLocalError] = useState(''); // État local uniquement
  
  const { forgotPassword, loading } = useAuth(); // Pas d'error: authError

  // Nettoyer l'erreur locale au montage
  useEffect(() => {
    setLocalError('');
  }, []);

  const validateForm = () => {
    const errors = {};
    
    if (!email.trim()) {
      errors.email = 'Email requis';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = 'Adresse email invalide';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    
    // Clear error when user types
    if (formErrors.email) {
      setFormErrors({});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(''); // Clear local error

    if (validateForm()) {
      try {
        await forgotPassword(email);
        setEmailSent(true);
      } catch (err) {
        console.error('Forgot password error:', err);
        // Capturer l'erreur localement
        setLocalError(err.message || 'Erreur lors de l\'envoi. Veuillez réessayer.');
      }
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-surface-background to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative max-w-md w-full">
          <div className="bg-surface-card/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-surface-border/20 animate-bounce-in">
            {/* Success Icon */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl mb-4 animate-pulse-shadow">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-text-primary animate-text-focus-in">
                Email envoyé !
              </h2>
              <p className="mt-4 text-text-secondary leading-relaxed">
                Un lien de réinitialisation a été envoyé à <strong className="text-primary-600">{email}</strong>
              </p>
              <p className="mt-2 text-sm text-text-tertiary">
                Vérifiez votre boîte de réception et suivez les instructions.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <Link 
                to="/login"
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-semibold rounded-2xl text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary-500/25 active:scale-[0.98] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" />
                </svg>
                Retour à la connexion
              </Link>
              <button
                onClick={() => setEmailSent(false)}
                className="w-full flex justify-center items-center py-2 px-4 text-sm font-medium text-text-secondary hover:text-primary-600 transition-colors duration-200"
              >
                Essayer une autre adresse email
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Breadcrumbs */}
        <Breadcrumbs />
        
        {/* Back Button */}
        <BackButton className="mb-4" />

        {/* Reset Password Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl mb-4 animate-pulse-shadow">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2a2 2 0 00-2 2m2-2V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2M7 7a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-text-primary animate-text-focus-in">
              Mot de passe oublié ?
            </h2>
            <p className="mt-2 text-text-secondary">
              Saisissez votre email pour recevoir un lien de réinitialisation
            </p>
          </div>

          {/* Error Alert - UTILISER SEULEMENT localError */}
          {localError && (
            <div className="mb-6">
              <ErrorAlert
                message={localError}
                onClose={() => setLocalError('')}
              />
            </div>
          )}

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <FormInput
              id="email"
              name="email"
              type="email"
              label="Email"
              autoComplete="email"
              value={email}
              onChange={handleChange}
              error={formErrors.email}
              placeholder="votre.email@enspd.edu"
              required
              className="transition-all duration-300 focus:scale-[1.02]"
            />

            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-semibold rounded-2xl text-white transition-all duration-300 transform ${
                loading
                  ? 'bg-gradient-to-r from-neutral-400 to-neutral-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary-500/25 active:scale-[0.98]'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
            >
              {loading ? (
                <>
                  <Loading size="small" />
                  <span className="ml-2">Envoi en cours...</span>
                </>
              ) : (
                <>
                  <span>Envoyer le lien</span>
                  <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-surface-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-surface-card text-text-tertiary">Vous vous souvenez ?</span>
              </div>
            </div>
            <div className="mt-4">
              <Link 
                to="/login" 
                className="inline-flex items-center px-6 py-2 border-2 border-primary-200 text-sm font-medium rounded-xl text-primary-600 hover:bg-primary-50 hover:border-primary-300 transition-all duration-200 hover:scale-105"
              >
                <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" />
                </svg>
                Retour à la connexion
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;