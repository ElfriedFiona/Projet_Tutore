import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, Lock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

import { useAuth } from '../../context/AppContext';
import Loading from '../../components/common/Loading';
import ErrorAlert from '../../components/common/ErrorAlert';
import FormInput from '../../components/common/FormInput';
import PasswordInput from '../../components/common/PasswordInput';
import BackButton from '../../components/common/BackButton';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [localError, setLocalError] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const { resetPassword, loading, error: authError } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    // Redirect if no token provided
    if (!token) {
      navigate('/forgot-password');
    }
  }, [token, navigate]);

  const validateForm = () => {
    const errors = {};
    
    if (!formData.password) {
      errors.password = 'Mot de passe requis';
    } else if (formData.password.length < 6) {
      errors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Confirmez votre mot de passe';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Les mots de passe ne correspondent pas';
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
    
    // Clear error when user types
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
        await resetPassword(token, formData.password);
        setResetSuccess(true);
      } catch (err) {
        console.error('Reset password error:', err);
        setLocalError(`Erreur lors de la réinitialisation: ${err.message || 'Veuillez réessayer.'}`);
      }
    }
  };

  if (resetSuccess) {    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-surface-background to-primary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '2s'}}></div>
        </div>        <div className="relative max-w-md w-full">
          <div className="bg-surface-card/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-surface-border/20 animate-bounce-in">
            {/* Success Icon */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl mb-4 animate-pulse-shadow">                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>              <h2 className="text-3xl font-bold text-text-primary animate-text-focus-in">
                Mot de passe réinitialisé !
              </h2>
              <p className="mt-4 text-text-secondary leading-relaxed">
                Votre mot de passe a été mis à jour avec succès.
              </p>
              <p className="mt-2 text-sm text-text-tertiary">
                Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
              </p>
            </div>

            {/* Action */}            <Link 
              to="/login"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-semibold rounded-2xl text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:scale-[1.02] hover:shadow-xl hover:shadow-green-500/25 active:scale-[0.98] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" />
              </svg>
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-surface-background to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '2s'}}></div>
      </div>      <div className="relative max-w-md w-full">
        <div className="bg-surface-card/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-surface-border/20 animate-bounce-in">
          {/* Back Button */}
          <div className="mb-6">
            <BackButton to="/login" />
          </div>
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl mb-4 animate-pulse-shadow">              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2a2 2 0 00-2 2m2-2V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2M7 7a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V7z" />
              </svg>
            </div>            <h2 className="text-3xl font-bold text-text-primary animate-text-focus-in">
              Nouveau mot de passe
            </h2>
            <p className="mt-2 text-text-secondary">
              Choisissez un mot de passe sécurisé pour votre compte
            </p>
          </div>

          {/* Error Alert */}
          {(authError || localError) && (
            <div className="mb-6">
              <ErrorAlert message={authError || localError} onClose={() => setLocalError('')} />
            </div>
          )}          {/* Password strength indicator */}
          {formData.password && (
            <div className="mb-6 p-4 bg-gradient-to-r from-surface-background to-surface-background-alt rounded-2xl border border-surface-border">
              <p className="text-sm font-medium text-text-secondary mb-2">Force du mot de passe :</p>              <div className="space-y-1">
                <div className={`flex items-center text-xs ${formData.password.length >= 6 ? 'text-green-600' : 'text-text-disabled'}`}>
                  <svg className={`w-3 h-3 mr-2 ${formData.password.length >= 6 ? 'text-green-500' : 'text-text-disabled'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Au moins 6 caractères
                </div>                <div className={`flex items-center text-xs ${/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-text-disabled'}`}>
                  <svg className={`w-3 h-3 mr-2 ${/[A-Z]/.test(formData.password) ? 'text-green-500' : 'text-text-disabled'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Une lettre majuscule
                </div>                <div className={`flex items-center text-xs ${/[0-9]/.test(formData.password) ? 'text-green-600' : 'text-text-disabled'}`}>
                  <svg className={`w-3 h-3 mr-2 ${/[0-9]/.test(formData.password) ? 'text-green-500' : 'text-text-disabled'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Un chiffre
                </div>
              </div>
            </div>
          )}

          {/* Form */}          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <PasswordInput
                id="password"
                name="password"
                label="Nouveau mot de passe"
                value={formData.password}
                onChange={handleChange}
                error={formErrors.password}
                placeholder="••••••••"
                required
                className="transition-all duration-300 focus:scale-[1.02]"
              />
              
              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                label="Confirmer le mot de passe"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={formErrors.confirmPassword}
                placeholder="••••••••"
                required
                className="transition-all duration-300 focus:scale-[1.02]"
              />
            </div>            <button
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
                  <span className="ml-2">Mise à jour...</span>
                </>
              ) : (
                <>
                  <span>Mettre à jour le mot de passe</span>
                  <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Footer */}          <div className="mt-8 text-center">            <Link 
              to="/login" 
              className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200 hover:underline"
            >
              Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;