import { useState } from 'react';
import { useToast } from '../../context/ToastContext';

const UserProfile = () => {
  const { showToast } = useToast();
  
  // Mock user data
  const [user, setUser] = useState({
    id: 1,
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@exemple.fr',
    studentId: 'STU2025001',
    department: 'Informatique',
    phoneNumber: '06 12 34 56 78',
    address: '123 Rue de l\'Université, 75005 Paris',
    registrationDate: '2024-09-01',
    accountStatus: 'active'
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({...user});
  const [errors, setErrors] = useState({});
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;
    
    if (!formData.firstName.trim()) {
      formErrors.firstName = 'Le prénom est requis';
      isValid = false;
    }
    
    if (!formData.lastName.trim()) {
      formErrors.lastName = 'Le nom est requis';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      formErrors.email = 'L\'email est requis';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'L\'email est invalide';
      isValid = false;
    }
    
    if (!formData.phoneNumber.trim()) {
      formErrors.phoneNumber = 'Le numéro de téléphone est requis';
      isValid = false;
    }
    
    if (!formData.address.trim()) {
      formErrors.address = 'L\'adresse est requise';
      isValid = false;
    }
    
    setErrors(formErrors);
    return isValid;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, this would make an API call to update the user's info
      setUser(formData);
      setIsEditing(false);
      showToast('Profil mis à jour avec succès', 'success');
      console.log('Profil mis à jour:', formData);
    } else {
      showToast('Veuillez corriger les erreurs dans le formulaire', 'error');
    }
  };
  
  const handleCancel = () => {
    setFormData({...user});
    setErrors({});
    setIsEditing(false);
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-text-primary flex items-center">
        <span className="text-primary-500 mr-2">Mon</span> Profil
        <div className="ml-3 h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
      </h1>
        <div className="bg-surface-card rounded-lg shadow-xl overflow-hidden border border-surface-border">
        <div className="md:flex">
          <div className="md:w-1/3 bg-primary-100 p-8 text-center">
            <div className="mx-auto h-32 w-32 rounded-full bg-primary-200 flex items-center justify-center mb-4 border-4 border-primary-500 shadow-lg shadow-primary-500/20">
              <span className="text-5xl font-bold text-text-primary">
                {user.firstName[0]}{user.lastName[0]}
              </span>
            </div>
            
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-primary-600 mb-6 font-mono">{user.studentId}</p>
              <div className="bg-surface-card rounded-lg p-5 text-left border border-surface-border">              <h3 className="text-text-primary font-semibold mb-2 flex items-center">
                <span className="inline-block mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                  </svg>
                </span>
                Statut du compte
              </h3>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-green-600">Actif</span>
              </div>                <h3 className="text-text-primary font-semibold mt-4 mb-2 flex items-center">
                <span className="inline-block mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </span>
                Département
              </h3>
              <p className="text-primary-600 bg-primary-100/50 px-3 py-1 rounded border border-primary-200">{user.department}</p>
              
              <h3 className="text-text-primary font-semibold mt-4 mb-2 flex items-center">
                <span className="inline-block mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </span>
                Date d'inscription
              </h3>
              <p className="text-primary-600 font-mono">{new Date(user.registrationDate).toLocaleDateString('fr-FR')}</p>            </div>
          </div>
          
          <div className="md:w-2/3 p-6 bg-surface-card">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="bg-surface-card/80 rounded-lg p-6 border border-surface-border">
                <h2 className="text-2xl font-bold mb-6 text-text-primary flex items-center">
                  <span className="inline-block mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </span>                  Modifier mon profil
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-text-secondary font-medium mb-2" htmlFor="firstName">
                      Prénom
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 bg-surface-card text-text-primary border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500/50 ${
                        errors.firstName ? 'border-red-500' : 'border-surface-border'
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>
                    <div>
                    <label className="block text-text-secondary font-medium mb-2" htmlFor="lastName">
                      Nom
                    </label>                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 bg-surface-card text-text-primary border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500/50 ${
                        errors.lastName ? 'border-red-500' : 'border-surface-border'
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
                    )}                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-text-secondary font-medium mb-2" htmlFor="email">
                    Email
                  </label>                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 bg-surface-card text-text-primary border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500/50 ${
                      errors.email ? 'border-red-500' : 'border-surface-border'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                  <div className="mb-6">
                  <label className="block text-text-secondary font-medium mb-2" htmlFor="phoneNumber">
                    Numéro de téléphone
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 bg-surface-card text-text-primary border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500/50 ${
                      errors.phoneNumber ? 'border-red-500' : 'border-surface-border'
                    }`}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-600 text-sm mt-1">{errors.phoneNumber}</p>
                  )}
                </div>
                  <div className="mb-6">
                  <label className="block text-text-secondary font-medium mb-2" htmlFor="address">
                    Adresse
                  </label>
                  <textarea                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className={`w-full px-4 py-2 bg-surface-card text-text-primary border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500/50 ${
                      errors.address ? 'border-red-500' : 'border-surface-border'
                    }`}
                  ></textarea>
                  {errors.address && (
                    <p className="text-red-600 text-sm mt-1">{errors.address}</p>
                  )}
                </div>
                  <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-2 border border-surface-border rounded-md text-text-secondary hover:bg-surface-hover transition-colors duration-200"
                  >
                    Annuler
                  </button>                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md transition-colors duration-200 shadow-md hover:shadow-primary-500/30"
                  >
                    Enregistrer
                  </button>
                </div>
              </form>
            ) : (              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-text-primary">Informations personnelles</h2>                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md transition-colors duration-200 flex items-center shadow-sm hover:shadow-md hover:shadow-primary-500/20"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Modifier
                  </button>
                </div>
                  <div className="space-y-6">                  <div className="bg-surface-card/80 p-5 rounded-lg border border-surface-border hover:border-primary-300 transition-colors duration-300">
                    <h3 className="text-text-secondary font-medium mb-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      Coordonnées
                    </h3>
                    <div className="bg-surface-background/60 p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>                          <p className="text-text-tertiary">Email:</p>
                          <p className="font-medium text-primary-600">{user.email}</p>
                        </div>
                        <div>
                          <p className="text-text-tertiary">Téléphone:</p>
                          <p className="font-medium text-text-primary">{user.phoneNumber}</p>
                        </div>
                      </div>
                    </div>                  </div>
                    <div className="bg-surface-card/80 p-5 rounded-lg border border-surface-border hover:border-primary-300 transition-colors duration-300">
                    <h3 className="text-text-secondary font-medium mb-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      Adresse
                    </h3>
                    <div className="bg-surface-background/60 p-4 rounded-lg">
                      <p className="font-medium text-text-primary">{user.address}</p>
                    </div>
                  </div>
                    <div className="bg-surface-card/80 p-5 rounded-lg border border-surface-border hover:border-primary-300 transition-colors duration-300">                    <h3 className="text-text-secondary font-medium mb-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Sécurité
                    </h3>
                    <div className="bg-surface-background/60 p-4 rounded-lg">
                      <button className="text-primary-600 hover:text-primary-700 flex items-center group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 group-hover:animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v-1l1-1 1-1-1-1H6v-1h1l2-2H7v-1h2l1.748-1.748A6 6 0 1118 8zm-7-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
                        </svg>
                        Changer le mot de passe
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
