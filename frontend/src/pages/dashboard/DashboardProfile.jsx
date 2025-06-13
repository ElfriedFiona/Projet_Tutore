import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AppContext';

const DashboardProfile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('info');
  const [isEditing, setIsEditing] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || 'Jean',
    lastName: user?.lastName || 'Dupont',
    email: user?.email || 'jean.dupont@student.edu',
    department: user?.department || 'Informatique',
    filiere: user?.filiere || 'Génie Logiciel',
    niveau: user?.niveau || 'Master 1',
    specialization: user?.specialization || 'Intelligence Artificielle',
    grade: user?.grade || 'Étudiant',
    phone: user?.phone || '+33 6 12 34 56 78',
    address: user?.address || '123 Avenue des Étudiants, 75000 Paris',
    bio: user?.bio || 'Passionné par l\'informatique et l\'intelligence artificielle, je recherche constamment de nouvelles connaissances pour enrichir mon parcours académique.',
    birthDate: user?.birthDate || '1995-03-15',
    studentId: user?.studentId || 'STU2024001',
    enrollmentDate: user?.enrollmentDate || '2023-09-01'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Enhanced user statistics
  const userStats = {
    totalBooksRead: 47,
    currentLoans: 3,
    totalReservations: 12,
    favoriteBooks: 23,
    accountAge: '1 an',
    averageRating: 4.2,
    lastActivity: '2024-11-25',
    membershipLevel: 'Gold'
  };

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    console.log('Sauvegarder le profil:', formData);
    setIsEditing(false);
    // Add animation feedback
    const button = document.querySelector('[data-save-profile]');
    if (button) {
      button.classList.add('animate-pulse');
      setTimeout(() => button.classList.remove('animate-pulse'), 1000);
    }
  };

  const handleChangePassword = () => {
    console.log('Changer le mot de passe');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    // Add animation feedback
    const form = document.querySelector('[data-password-form]');
    if (form) {
      form.classList.add('animate-bounce');
      setTimeout(() => form.classList.remove('animate-bounce'), 500);
    }
  };
  const getMembershipColor = (level) => {
    const colors = {
      'Bronze': 'bg-secondary-100 text-secondary-800 border-secondary-200',
      'Silver': 'bg-neutral-100 text-neutral-800 border-neutral-200',
      'Gold': 'bg-secondary-200 text-secondary-800 border-secondary-300',
      'Platinum': 'bg-primary-100 text-primary-800 border-primary-200'
    };
    return colors[level] || 'bg-primary-100 text-primary-800 border-primary-200';
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-4 sm:p-6">
      {/* Enhanced Header */}
      <div className={`mb-8 transition-all duration-700 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 sm:p-8 border border-white/50 relative overflow-hidden">          {/* Decoration background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-secondary-500/5 to-primary-500/5"></div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary-400/10 to-secondary-400/10 rounded-full -translate-y-20 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-secondary-400/10 to-primary-400/10 rounded-full translate-y-16 -translate-x-16"></div>

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Profile header info */}
              <div className="flex items-start space-x-6">
                {/* Enhanced avatar */}
                <div className="relative group">                  <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-105 transition-all duration-300">
                  <span className="text-3xl font-bold text-white">
                    {formData.firstName?.[0]}{formData.lastName?.[0]}
                  </span>
                </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>

                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                    {formData.firstName} {formData.lastName}
                  </h1>
                  <p className="text-gray-600 text-lg mb-2">{formData.email}</p>
                  <div className="flex flex-wrap items-center gap-2">                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                    📚 {formData.department}
                  </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary-100 text-secondary-800">
                      🎓 {formData.niveau}
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getMembershipColor(userStats.membershipLevel)}`}>
                      👑 {userStats.membershipLevel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">                <div className="text-center group">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300 mb-2">
                  <span className="text-xl font-bold">{userStats.totalBooksRead}</span>
                </div>
                <div className="text-sm font-medium text-gray-700">Livres lus</div>
              </div>

                <div className="text-center group">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300 mb-2">
                    <span className="text-xl font-bold">{userStats.currentLoans}</span>
                  </div>
                  <div className="text-sm font-medium text-gray-700">Emprunts actifs</div>
                </div>

                <div className="text-center group">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 text-white rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300 mb-2">
                    <span className="text-xl font-bold">{userStats.totalReservations}</span>
                  </div>
                  <div className="text-sm font-medium text-gray-700">Réservations</div>
                </div>

                <div className="text-center group">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-secondary-600 to-secondary-700 text-white rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300 mb-2">
                    <span className="text-xl font-bold">{userStats.favoriteBooks}</span>
                  </div>
                  <div className="text-sm font-medium text-gray-700">Favoris</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Tabs */}
      <div className="mb-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-1">
          <div className="flex space-x-1 gap-4">
            <button
              onClick={() => setActiveTab('info')}
              className={`flex-1 py-3 px-6 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden ${activeTab === 'info'
                  ? 'bg-gradient-to-r from-primary-500 to-primary-700 text-white shadow-lg transform scale-105'
                  : 'text-neutral-600 hover:text-neutral-800 hover:bg-primary-50'
                }`}
            >
              {activeTab === 'info' && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-primary-600/20 animate-pulse"></div>
              )}
              <span className="relative z-10">👤 Informations personnelles</span>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`flex-1 py-3 px-6 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden ${activeTab === 'security'
                  ? 'bg-gradient-to-r from-primary-500 to-primary-700 text-white shadow-lg transform scale-105'
                  : 'text-neutral-600 hover:text-neutral-800 hover:bg-primary-50'
                }`}
            >
              {activeTab === 'security' && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-primary-600/20 animate-pulse"></div>
              )}
              <span className="relative z-10">🔒 Sécurité</span>
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex-1 py-3 px-6 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden ${activeTab === 'stats'
                  ? 'bg-gradient-to-r from-primary-500 to-primary-700 text-white shadow-lg transform scale-105'
                  : 'text-neutral-600 hover:text-neutral-800 hover:bg-primary-50'
                }`}
            >
              {activeTab === 'stats' && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-primary-600/20 animate-pulse"></div>
              )}
              <span className="relative z-10">📊 Statistiques</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'info' && (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 sm:p-8 border border-white/50">
          <div className="flex justify-between items-center mb-6">            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-800 to-primary-600 bg-clip-text text-transparent">
            Informations personnelles
          </h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-700 text-white font-medium rounded-xl hover:from-primary-600 hover:to-primary-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span className="mr-2">{isEditing ? '❌' : '✏️'}</span>
              {isEditing ? 'Annuler' : 'Modifier'}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Informations de base</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>                  {isEditing ? (
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{formData.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>                  {isEditing ? (
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{formData.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email" value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{formData.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                {isEditing ? (<input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{formData.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date de naissance</label>
                {isEditing ? (<input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">
                    {new Date(formData.birthDate).toLocaleDateString('fr-FR')}
                  </p>
                )}
              </div>
            </div>

            {/* Academic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Informations académiques</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ID Étudiant</label>
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{formData.studentId}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Département</label>
                {isEditing ? (
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  >
                    <option value="Informatique">Informatique</option>
                    <option value="Mathématiques">Mathématiques</option>
                    <option value="Physique">Physique</option>
                    <option value="Chimie">Chimie</option>
                    <option value="Biologie">Biologie</option>
                  </select>
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{formData.department}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filière</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="filiere"
                    value={formData.filiere}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{formData.filiere}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Niveau</label>
                {isEditing ? (
                  <select
                    name="niveau"
                    value={formData.niveau}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  >
                    <option value="Licence 1">Licence 1</option>
                    <option value="Licence 2">Licence 2</option>
                    <option value="Licence 3">Licence 3</option>
                    <option value="Master 1">Master 1</option>
                    <option value="Master 2">Master 2</option>
                    <option value="Doctorat">Doctorat</option>
                  </select>
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{formData.niveau}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Spécialisation</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{formData.specialization}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date d'inscription</label>
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">
                  {new Date(formData.enrollmentDate).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
          </div>

          {/* Address and Bio */}
          <div className="mt-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
              {isEditing ? (
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{formData.address}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Biographie</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  placeholder="Parlez-nous de vous, vos intérêts académiques..."
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{formData.bio}</p>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 bg-gray-500 text-white font-medium rounded-xl hover:bg-gray-600 transition-all duration-300"
              >
                Annuler
              </button>              <button
                onClick={handleSaveProfile}
                data-save-profile
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-700 text-white font-medium rounded-xl hover:from-primary-600 hover:to-primary-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                💾 Sauvegarder
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'security' && (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 sm:p-8 border border-white/50">          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-800 to-primary-600 bg-clip-text text-transparent mb-6">
          Sécurité du compte
        </h2>

          <div className="space-y-8">
            {/* Password change form */}
            <div data-password-form className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 border border-red-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Changer le mot de passe</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe actuel</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nouveau mot de passe</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirmer le nouveau mot de passe</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  />
                </div>

                <button
                  onClick={handleChangePassword}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium rounded-xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  🔐 Changer le mot de passe
                </button>
              </div>
            </div>

            {/* Security settings */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Paramètres de sécurité</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-800">Authentification à deux facteurs</h4>
                    <p className="text-sm text-gray-600">Renforcez la sécurité de votre compte</p>
                  </div>
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                    Activer
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-800">Notifications de connexion</h4>
                    <p className="text-sm text-gray-600">Recevez un email lors de chaque connexion</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-800">Sessions actives</h4>
                    <p className="text-sm text-gray-600">Gérez vos connexions actives</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Voir les sessions
                  </button>
                </div>
              </div>
            </div>

            {/* Account actions */}
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Actions du compte</h3>

              <div className="space-y-4">
                <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  🗑️ Supprimer le compte
                </button>
                <p className="text-sm text-gray-600">
                  Cette action est irréversible. Toutes vos données seront définitivement supprimées.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="space-y-6">
          {/* Activity overview */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 sm:p-8 border border-white/50">            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-800 to-primary-600 bg-clip-text text-transparent mb-6">
            Statistiques d'activité
          </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">              <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">{userStats.totalBooksRead}</div>
              <div className="text-sm font-medium text-primary-800">Livres lus</div>
              <div className="text-xs text-primary-600 mt-1">+5 ce mois</div>
            </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{userStats.currentLoans}</div>
                <div className="text-sm font-medium text-green-800">Emprunts actifs</div>
                <div className="text-xs text-green-600 mt-1">Maximum: 5</div>
              </div>

              <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-secondary-600 mb-2">{userStats.totalReservations}</div>
                <div className="text-sm font-medium text-secondary-800">Réservations</div>
                <div className="text-xs text-secondary-600 mt-1">En cours: 2</div>
              </div>

              <div className="bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-secondary-700 mb-2">{userStats.favoriteBooks}</div>
                <div className="text-sm font-medium text-secondary-800">Favoris</div>
                <div className="text-xs text-secondary-700 mt-1">+3 récemment</div>
              </div>
            </div>

            {/* Reading habits */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Informations du compte</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Membre depuis</span>
                  <span className="font-medium text-gray-800">{userStats.accountAge}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Dernière activité</span>
                  <span className="font-medium text-gray-800">{new Date(userStats.lastActivity).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Niveau de membre</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMembershipColor(userStats.membershipLevel)}`}>
                    {userStats.membershipLevel}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Évaluation moyenne</span>
                  <div className="flex items-center space-x-1">
                    {renderStars(userStats.averageRating)}
                    <span className="ml-1 text-gray-600">({userStats.averageRating}/5)</span>
                  </div>
                </div>
              </div>
            </div>

              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Badges et réalisations</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-xl p-3 text-center border border-orange-200">
                    <div className="text-2xl mb-1">📚</div>
                    <div className="text-xs font-medium text-gray-700">Lecteur assidu</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 text-center border border-yellow-200">
                    <div className="text-2xl mb-1">⭐</div>
                    <div className="text-xs font-medium text-gray-700">Critique expert</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 text-center border border-green-200">
                    <div className="text-2xl mb-1">🎯</div>
                    <div className="text-xs font-medium text-gray-700">Objectif mensuel</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 text-center border border-blue-200">
                    <div className="text-2xl mb-1">🏆</div>
                    <div className="text-xs font-medium text-gray-700">Top lecteur</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}      {/* Enhanced Tips Section */}
      <div className="mt-8 bg-gradient-to-r from-primary-50 via-secondary-50 to-primary-50 rounded-3xl p-6 sm:p-8 border border-primary-200 shadow-lg">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
            <span className="text-2xl">💡</span>
          </div>
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary-800 to-primary-600 bg-clip-text text-transparent mb-4">
              Conseils pour votre profil
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="text-primary-600 mt-1 flex-shrink-0">📝</span>
                  <span className="text-primary-800 text-sm">Gardez vos informations à jour pour une meilleure expérience</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-primary-600 mt-1 flex-shrink-0">🔒</span>
                  <span className="text-primary-800 text-sm">Activez l'authentification à deux facteurs pour plus de sécurité</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="text-primary-600 mt-1 flex-shrink-0">📊</span>
                  <span className="text-primary-800 text-sm">Consultez vos statistiques pour suivre vos habitudes de lecture</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-primary-600 mt-1 flex-shrink-0">🏆</span>
                  <span className="text-primary-800 text-sm">Complétez votre profil pour débloquer des badges</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
