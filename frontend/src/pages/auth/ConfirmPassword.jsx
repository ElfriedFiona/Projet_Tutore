import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, Lock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import BackButton from '../../components/common/BackButton';
import PasswordInput from '../../components/common/PasswordInput';

export default function ConfirmPassword() {  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  // Vérification de la présence du token au chargement
  useEffect(() => {
    if (!token) {
      navigate('/forgot-password', { 
        state: { 
          error: 'Lien de réinitialisation invalide ou expiré.' 
        }
      });
    }
  }, [token, navigate]);

  // Validation en temps réel du mot de passe
  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar
    };
  };

  const passwordValidation = validatePassword(formData.password);

  // Gestion des changements de saisie
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Effacer les erreurs lors de la saisie
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (!passwordValidation.isValid) {
      newErrors.password = 'Le mot de passe ne respecte pas les critères de sécurité';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'La confirmation du mot de passe est requise';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulation d'appel API
      const response = await fetch('/api/auth/confirm-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password: formData.password
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/login', {
            state: {
              success: 'Mot de passe réinitialisé avec succès ! Vous pouvez maintenant vous connecter.'
            }
          });
        }, 2000);
      } else {
        const errorData = await response.json();
        setErrors({ 
          submit: errorData.message || 'Une erreur est survenue lors de la réinitialisation.' 
        });
      }
    } catch (error) {
        console.error('Password reset error:', error);
        setErrors({ 
          submit: `Erreur de connexion: ${error.message || 'Veuillez réessayer.'}` 
        });
    } finally {
      setIsLoading(false);
    }
  };
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-surface-background to-secondary-50 flex items-center justify-center p-4">
        <div className="bg-surface-card rounded-2xl shadow-xl p-8 w-full max-w-md text-center animate-bounce-in">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Succès !
          </h2>
          <p className="text-text-secondary mb-4">
            Votre mot de passe a été réinitialisé avec succès.
          </p>
          <p className="text-sm text-text-tertiary">
            Redirection vers la page de connexion...
          </p>
        </div>
      </div>
    );
  }
  return (    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-surface-background to-secondary-50 flex items-center justify-center p-4">
      <div className="bg-surface-card rounded-2xl shadow-xl p-8 w-full max-w-md animate-bounce-in">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton to="/login" />
        </div>
        
        {/* En-tête */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-shadow">
            <Lock className="h-8 w-8 text-primary-600" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2 animate-text-focus-in">
            Nouveau mot de passe
          </h1>
          <p className="text-text-secondary">
            Choisissez un mot de passe sécurisé pour votre compte
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">          {/* Nouveau mot de passe */}
          <div>
            <PasswordInput
              id="password"
              name="password"
              label="Nouveau mot de passe"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              placeholder="Votre nouveau mot de passe"
              required
              className="transition-all duration-300 focus:scale-[1.02]"
            />
          </div>{/* Critères de sécurité */}
          {formData.password && (
            <div className="bg-surface-background-alt rounded-xl p-4">
              <h4 className="text-sm font-medium text-text-secondary mb-3 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Critères de sécurité
              </h4>
              <div className="space-y-2 text-xs">
                {[
                  { key: 'minLength', text: 'Au moins 8 caractères' },
                  { key: 'hasUpperCase', text: 'Une lettre majuscule (A-Z)' },
                  { key: 'hasLowerCase', text: 'Une lettre minuscule (a-z)' },
                  { key: 'hasNumbers', text: 'Un chiffre (0-9)' },
                  { key: 'hasSpecialChar', text: 'Un caractère spécial (!@#$...)' }
                ].map((criterion) => (
                  <div 
                    key={criterion.key}                    className={`flex items-center ${
                      passwordValidation[criterion.key] ? 'text-green-600' : 'text-text-tertiary'
                    }`}
                  >
                    {passwordValidation[criterion.key] ? (
                      <CheckCircle className="h-3 w-3 mr-2" />
                    ) : (
                      <div className="h-3 w-3 border rounded-full mr-2" />
                    )}
                    {criterion.text}
                  </div>
                ))}
              </div>
            </div>
          )}          {/* Confirmation du mot de passe */}
          <div>
            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              label="Confirmer le mot de passe"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={errors.confirmPassword}
              placeholder="Confirmez votre mot de passe"
              required
              className="transition-all duration-300 focus:scale-[1.02]"
            />
            {formData.confirmPassword && formData.password === formData.confirmPassword && (
              <p className="mt-2 text-sm text-green-600 flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                Les mots de passe correspondent
              </p>
            )}
          </div>          {/* Erreur de soumission */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-sm text-red-700 flex items-center">
                <XCircle className="h-4 w-4 mr-2" />
                {errors.submit}
              </p>
            </div>
          )}

          {/* Bouton de soumission */}
          <button
            type="submit"
            disabled={isLoading || !passwordValidation.isValid}
            className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 disabled:from-neutral-400 disabled:to-neutral-500 text-neutral-900 font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Réinitialisation...
              </>
            ) : (
              <>
                <Lock className="h-5 w-5 mr-2" />
                Confirmer le nouveau mot de passe
              </>
            )}
          </button>
        </form>        {/* Note de sécurité */}        <div className="mt-6 bg-primary-50 rounded-xl p-4">
          <p className="text-xs text-primary-700 text-center">
            <strong>Note de sécurité :</strong> Choisissez un mot de passe unique que vous n'utilisez nulle part ailleurs.
          </p>
        </div>
      </div>
    </div>
  );
}