import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import BackButton from '../../components/common/BackButton';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import ErrorAlert from '../../components/common/ErrorAlert';
import FormInput from '../../components/common/FormInput';
import FormSelect from '../../components/common/FormSelect';
import Loading from '../../components/common/Loading';
import PasswordInput from '../../components/common/PasswordInput';
import { useAuth } from '../../context/AppContext';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
    matricule: '',
    employeeId: '',
    department: '',
    filiere: '',
    niveau: '',
    specialization: '',
    grade: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [localError, setLocalError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const { register, loading, user } = useAuth();
  const navigate = useNavigate();

  // Nettoyer l'erreur locale au montage
  useEffect(() => {
    setLocalError('');
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  const validateForm = (step = null) => {
    const errors = {};
    const stepToValidate = step || currentStep;

    if (stepToValidate >= 1) {
      if (!formData.firstName.trim()) {
        errors.firstName = 'Prénom requis';
      }

      if (!formData.lastName.trim()) {
        errors.lastName = 'Nom requis';
      }

      if (!formData.email.trim()) {
        errors.email = 'Email requis';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
        errors.email = 'Adresse email invalide';
      }

      if (!formData.userType) {
        errors.userType = 'Type d\'utilisateur requis';
      }
    }

    if (stepToValidate >= 2) {
      if (!formData.password) {
        errors.password = 'Mot de passe requis';
      } else if (formData.password.length < 6) {
        errors.password = 'Le mot de passe doit contenir au moins 6 caractères';
      }

      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Confirmez votre mot de passe';
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Les mots de passe ne correspondent pas';
      } if (formData.userType === 'etudiant') {
        if (!formData.matricule.trim()) {
          errors.matricule = 'Matricule d\'étudiant requis';
        }
        if (!formData.filiere.trim()) {
          errors.filiere = 'Filière requise';
        }
        if (!formData.niveau.trim()) {
          errors.niveau = 'Niveau requis';
        }
      } else if (formData.userType === 'enseignant') {
        if (!formData.employeeId.trim()) {
          errors.employeeId = 'Numéro d\'employé requis';
        }
        if (!formData.specialization.trim()) {
          errors.specialization = 'Spécialisation requise';
        }
        if (!formData.grade.trim()) {
          errors.grade = 'Grade requis';
        }
      } else if (formData.userType === 'bibliothecaire') {
        if (!formData.employeeId.trim()) {
          errors.employeeId = 'Numéro d\'employé requis';
        }
      } else if (formData.userType === 'admin') {
        if (!formData.employeeId.trim()) {
          errors.employeeId = 'Numéro d\'employé requis';
        }
      }

      if (!formData.department.trim()) {
        errors.department = 'Département requis';
      }
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

  const handleNext = () => {
    if (validateForm(1)) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLocalError('');

  if (validateForm()) {
    try {
      const { confirmPassword, password, ...otherData } = formData;
      
      const userData = {
        ...otherData,
        mdp: password,
        mdp_confirmation: confirmPassword // Keep this field!
      };

      // Send userData WITH mdp_confirmation - don't remove it!
      await register(userData);

      setTimeout(() => {
        navigate('/login', {
          state: { registered: true },
        });
      }, 500);
    } catch (err) {
      console.error('Registration error:', err);
      setLocalError(err.message || 'Erreur lors de l\'inscription. Veuillez réessayer.');
    }
  }
};

  const departmentOptions = [
    // { value: '', label: 'Choisir un département' },
    { value: 'lettres', label: 'Lettres et Sciences Humaines' },
    { value: 'sciences', label: 'Sciences et Technologies' },
    { value: 'droit', label: 'Droit et Sciences Politiques' },
    { value: 'economie', label: 'Économie et Gestion' },
    { value: 'medecine', label: 'Médecine et Sciences de la Santé' },
    { value: 'informatique', label: 'Informatique et Numérique' }
  ]; const userTypeOptions = [
    // { value: '', label: 'Choisir votre profil' },
    { value: 'etudiant', label: 'Étudiant' },
    { value: 'enseignant', label: 'Enseignant' },
    { value: 'bibliothecaire', label: 'Bibliothécaire' },
    { value: 'admin', label: 'Administrateur' }
  ];

  const gradeOptions = [
    // { value: '', label: 'Choisir un grade' },
    { value: 'professeur', label: 'Professeur' },
    { value: 'maitre_conferences', label: 'Maître de Conférences' },
    { value: 'charge_cours', label: 'Chargé de Cours' },
    { value: 'assistant', label: 'Assistant' },
    { value: 'vacataire', label: 'Vacataire' }
  ];
  return (
    <div className=" bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-2xl w-full">
        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* Back Button */}
        <BackButton className="mb-4" />

        {/* Registration Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-2xl mb-4 animate-pulse-shadow">
              <svg className="w-8 h-8 text-neutral-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>            <h2 className="text-3xl font-bold text-text-primary animate-text-focus-in">
              Créer un compte
            </h2>
            <p className="mt-2 text-text-secondary">
              Rejoignez la communauté ENSPD - Étudiants et Enseignants
            </p>

            {/* Step indicator */}
            <div className="flex items-center justify-center mt-6 space-x-4">
              <div className={`flex items-center ${currentStep >= 1 ? 'text-secondary-600' : 'text-neutral-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${currentStep >= 1 ? 'bg-secondary-500 text-white' : 'bg-neutral-200 text-neutral-500'
                  }`}>
                  1
                </div>
                <span className="ml-2 text-sm font-medium">Informations</span>
              </div>
              <div className={`w-12 h-0.5 transition-colors duration-300 ${currentStep >= 2 ? 'bg-secondary-500' : 'bg-neutral-200'}`}></div>
              <div className={`flex items-center ${currentStep >= 2 ? 'text-secondary-600' : 'text-neutral-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${currentStep >= 2 ? 'bg-secondary-500 text-white' : 'bg-neutral-200 text-neutral-500'
                  }`}>
                  2
                </div>
                <span className="ml-2 text-sm font-medium">Sécurité</span>
              </div>
            </div>
          </div>

          {/* Error Alert */}
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
            {currentStep === 1 && (
              <div className="space-y-4 animate-bounce-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormInput
                    id="firstName"
                    name="firstName"
                    type="text"
                    label="Prénom"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={formErrors.firstName}
                    placeholder="Jean"
                    required
                    className="transition-all duration-300 focus:scale-[1.02]"
                  />

                  <FormInput
                    id="lastName"
                    name="lastName"
                    type="text"
                    label="Nom"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={formErrors.lastName}
                    placeholder="Dupont"
                    required
                    className="transition-all duration-300 focus:scale-[1.02]"
                  />
                </div>
                <FormInput
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={formErrors.email}
                  placeholder="jean.dupont@enspd.edu"
                  required
                  className="transition-all duration-300 focus:scale-[1.02]"
                />

                <FormSelect
                  id="userType"
                  name="userType"
                  label="Type de profil"
                  value={formData.userType}
                  onChange={handleChange}
                  error={formErrors.userType}
                  options={userTypeOptions}
                  required
                  className="transition-all duration-300 focus:scale-[1.02]"
                />

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-semibold rounded-2xl text-neutral-50 bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 hover:scale-[1.02] hover:shadow-xl hover:shadow-secondary-500/25 active:scale-[0.98] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500"
                >
                  <span>Continuer</span>
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4 animate-bounce-in">                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PasswordInput
                  id="password"
                  name="password"
                  label="Mot de passe"
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
              </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {formData.userType === 'etudiant' ? (
                    <FormInput
                      id="matricule"
                      name="matricule"
                      type="text"
                      label="Matricule d'étudiant"
                      value={formData.matricule}
                      onChange={handleChange}
                      error={formErrors.matricule}
                      placeholder="GO123456"
                      required
                      className="transition-all duration-300 focus:scale-[1.02]"
                    />
                  ) : (formData.userType === 'enseignant' || formData.userType === 'bibliothecaire' || formData.userType === 'administrator') ? (
                    <FormInput
                      id="employeeId"
                      name="employeeId"
                      type="text"
                      label={formData.userType === 'enseignant' ? "Numéro d'employé" :
                        formData.userType === 'bibliothecaire' ? "Numéro Bibliothécaire" :
                          "Numéro Administrateur"}
                      value={formData.employeeId}
                      onChange={handleChange}
                      error={formErrors.employeeId}
                      placeholder={formData.userType === 'enseignant' ? "EMP123456" :
                        formData.userType === 'bibliothecaire' ? "LIB123456" :
                          "ADM123456"}
                      required
                      className="transition-all duration-300 focus:scale-[1.02]"
                    />) : null}

                  <FormSelect
                    id="department"
                    name="department"
                    label="Département"
                    value={formData.department}
                    onChange={handleChange}
                    error={formErrors.department}
                    options={departmentOptions}
                    required
                    className="transition-all duration-300 focus:scale-[1.02]"
                  />
                </div>

                {formData.userType === 'etudiant' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput
                      id="filiere"
                      name="filiere"
                      type="text"
                      label="Filière de l'étudiant"
                      value={formData.filiere}
                      onChange={handleChange}
                      error={formErrors.filiere}
                      placeholder="GÉNIE INFORMATIQUE"
                      required
                      className="transition-all duration-300 focus:scale-[1.02]"
                    />

                    <FormInput
                      id="niveau"
                      name="niveau"
                      type="text"
                      label="Niveau scolaire"
                      value={formData.niveau}
                      onChange={handleChange}
                      error={formErrors.niveau}
                      placeholder="1, 2, 3, 4, 5"
                      required
                      className="transition-all duration-300 focus:scale-[1.02]"
                    />
                  </div>
                )}

                {formData.userType === 'enseignant' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput
                      id="specialization"
                      name="specialization"
                      type="text"
                      label="Spécialisation"
                      value={formData.specialization}
                      onChange={handleChange}
                      error={formErrors.specialization}
                      placeholder="Informatique, Mathématiques, etc."
                      required
                      className="transition-all duration-300 focus:scale-[1.02]"
                    />

                    <FormSelect
                      id="grade"
                      name="grade"
                      label="Grade"
                      value={formData.grade}
                      onChange={handleChange}
                      error={formErrors.grade}
                      options={gradeOptions}
                      required
                      className="transition-all duration-300 focus:scale-[1.02]"
                    />
                  </div>
                )}

                <div className="flex space-x-4">                  <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 flex justify-center items-center py-3 px-4 border-2 border-surface-border text-sm font-semibold rounded-2xl text-text-secondary bg-surface-card hover:bg-surface-hover hover:border-surface-border-hover transition-all duration-200"
                >
                  <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                  </svg>
                  Retour
                </button>                  <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 flex justify-center items-center py-3 px-4 border border-transparent text-sm font-semibold rounded-2xl text-neutral-900 transition-all duration-300 ${loading
                    ? 'bg-gradient-to-r from-neutral-400 to-neutral-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 hover:scale-[1.02] hover:shadow-xl hover:shadow-secondary-500/25 active:scale-[0.98]'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500`}
                >
                    {loading ? (
                      <>
                        <Loading size="small" />
                        <span className="ml-2">Création...</span>
                      </>
                    ) : (
                      <>
                        <span>Créer le compte</span>
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Footer */}          <div className="mt-8 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-surface-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-surface-card text-text-secondary">Déjà inscrit?</span>
              </div>
            </div>
            <div className="mt-4">
              <Link
                to="/login" onClick={() => {
                  setLocalError('');
                }}
                className="inline-flex items-center px-6 py-2 border-2 border-secondary-200 text-sm font-medium rounded-xl text-secondary-600 hover:bg-secondary-50 hover:border-secondary-300 transition-all duration-200 hover:scale-105"
              >
                <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;