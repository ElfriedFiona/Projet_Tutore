import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Award, Settings, Shield, Book, Clock, Star, Trophy, Edit2, Save, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ResponsiveDashboardContainer, { 
  ResponsiveDashboardGrid, 
  ResponsiveDashboardHeader,
  ResponsiveDashboardCard,
  ResponsiveDashboardTabs,
  ResponsiveDashboardActions
} from '../../components/dashboard/ResponsiveDashboardContainer';
import useResponsiveDashboard from '../../hooks/useResponsiveDashboard';
import api from '../../services/apiService';

const DashboardProfile = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [isEditing, setIsEditing] = useState(false);
  const [animate, setAnimate] = useState(false);
  
  // Hooks responsifs et auth
  const { isMobile, isTablet, getResponsiveClasses, getGridConfig } = useResponsiveDashboard();
  const { user } = useAuth();
  const [ setUserStats] = useState(null);

useEffect(() => {
  const fetchStats = async () => {
    try {
      const response = await api.get('/profile/statistics');
      setUserStats(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des stats", error);
    } finally {
      setLoadingStats(false);
    }
  };

  fetchStats();
}, []);

    // Fonction pour obtenir les données selon le rôle
  const getUserDataByRole = () => {
    const currentUserRole = user?.role || user?.userType || 'student'; // Priorité aux vraies données
    
    // Utiliser les vraies données de l'utilisateur connecté comme base
    const realUserData = {
      firstName: user?.firstName || 'Prénom',
      lastName: user?.lastName || 'Nom',
      email: user?.email || 'email@example.com',
      department: user?.department || 'Non spécifié',
      role: user?.role || user?.userType || 'student',
      phone: user?.phone || '+33 6 00 00 00 00',
      grade: user?.grade || null,
      specialization: user?.specialization || null
    };

    // Données complémentaires selon le rôle (peuvent être étendues avec de vraies données API)
    const roleSpecificDefaults = {
      student: {
        ...realUserData,
        filiere: 'Génie Logiciel',
        niveau: 'Master 1',
        grade: realUserData.grade || 'Étudiant',
        address: '123 Avenue des Étudiants, 75000 Paris',
        bio: 'Étudiant passionné par l\'informatique et l\'apprentissage continu.',
        birthDate: '1995-03-15',
        studentId: 'STU2024001',
        enrollmentDate: '2023-09-01'
      },      teacher: {
        ...realUserData,
        filiere: null,
        niveau: null,
        specialization: realUserData.specialization || 'Intelligence Artificielle & Machine Learning',
        grade: realUserData.grade || 'Professeur Assistant',
        address: '456 Boulevard des Professeurs, 75007 Paris',
        bio: 'Enseignant-chercheur passionné par la transmission du savoir et la recherche.',
        birthDate: '1985-08-20',
        employeeId: 'PROF2024001',
        hireDate: '2015-09-01',
        researchDomain: 'Machine Learning, Deep Learning, Computer Vision'
      },
      librarian: {
        ...realUserData,
        filiere: null,
        niveau: null,
        specialization: realUserData.specialization || 'Gestion documentaire',
        grade: realUserData.grade || 'Bibliothécaire en chef',
        address: '789 Rue de la Bibliothèque, 75005 Paris',
        bio: 'Responsable de la gestion du catalogue et des services aux usagers.',
        birthDate: '1980-12-15',
        employeeId: 'LIB2024001',
        hireDate: '2010-01-15',
        certifications: ['Diplôme de conservateur', 'Formation en systèmes documentaires']
      },
      admin: {
        ...realUserData,
        filiere: null,
        niveau: null,
        specialization: realUserData.specialization || 'Administration Système & Sécurité',
        grade: realUserData.grade || 'Administrateur Système Senior',
        address: '101 Avenue des Systèmes, 75001 Paris',
        bio: 'Responsable de l\'infrastructure informatique et de la sécurité des systèmes.',
        birthDate: '1975-05-10',
        employeeId: 'ADMIN2024001',
        hireDate: '2008-03-01',
        clearanceLevel: 'Niveau 5 - Accès total'
      },
      administrator: {
        ...realUserData,
        filiere: null,
        niveau: null,
        specialization: realUserData.specialization || 'Administration Système & Sécurité',
        grade: realUserData.grade || 'Administrateur Système Senior',
        address: '101 Avenue des Systèmes, 75001 Paris',
        bio: 'Responsable de l\'infrastructure informatique et de la sécurité des systèmes.',
        birthDate: '1975-05-10',
        employeeId: 'ADMIN2024001',
        hireDate: '2008-03-01',
        clearanceLevel: 'Niveau 5 - Accès total'
      }
    };

    return roleSpecificDefaults[currentUserRole] || roleSpecificDefaults.student;
  };
  // Fonction pour obtenir les statistiques selon le rôle
  const getUserStatsByRole = () => {
    const currentUserRole = user?.role || user?.userType || 'student';
    
    // Statistiques de base communes à tous les rôles
    const baseStats = {
      accountAge: '1 an', // Peut être calculé à partir de user.createdAt
      lastActivity: new Date().toISOString().split('T')[0],
      membershipLevel: 'Gold'
    };
    
    const statsData = {
      student: {
        ...baseStats,
        totalBooksRead: 47,
        currentLoans: 3,
        totalReservations: 12,
        favoriteBooks: 23,
        averageRating: 4.2,
        membershipLevel: 'Gold',
        roleSpecific: {
          coursesEnrolled: 8,
          assignmentsCompleted: 156,
          gpa: 3.8
        }
      },      teacher: {
        ...baseStats,
        totalBooksRead: 234,
        currentLoans: 8,
        totalReservations: 5,
        favoriteBooks: 67,
        averageRating: 4.8,
        membershipLevel: 'Platinum',
        roleSpecific: {
          coursesTeaching: 4,
          studentsSupervised: 23,
          publicationsCount: 18,
          researchProjects: 6
        }
      },
      librarian: {
        ...baseStats,
        totalBooksRead: 189,
        currentLoans: 15,
        totalReservations: 2,
        favoriteBooks: 89,
        averageRating: 4.9,
        membershipLevel: 'Platinum',
        roleSpecific: {
          booksProcessed: 1247,
          usersAssisted: 3456,
          catalogEntriesCreated: 892,
          eventsOrganized: 34
        }
      },
      admin: {
        ...baseStats,
        totalBooksRead: 98,
        currentLoans: 5,
        totalReservations: 1,
        favoriteBooks: 45,
        averageRating: 4.5,
        membershipLevel: 'Platinum',
        roleSpecific: {
          systemsManaged: 12,
          usersManaged: 2456,
          backupsCompleted: 365,
          securityIncidents: 0
        }
      },
      administrator: {
        ...baseStats,
        totalBooksRead: 98,
        currentLoans: 5,
        totalReservations: 1,
        favoriteBooks: 45,
        averageRating: 4.5,
        membershipLevel: 'Platinum',
        roleSpecific: {
          systemsManaged: 12,
          usersManaged: 2456,
          backupsCompleted: 365,
          securityIncidents: 0
        }
      }
    };

    return statsData[currentUserRole] || statsData.student;
  };

  const mapFrontendToBackendRole = (role) => {
  const map = {
    student: 'etudiant',
    teacher: 'enseignant',
    librarian: 'bibliothecaire',
    admin: 'admin',
    administrator: 'admin',
  };
  return map[role] || 'etudiant';
};

const mapBackendToFrontendRole = (role) => {
  const map = {
    etudiant: 'student',
    enseignant: 'teacher',
    bibliothecaire: 'librarian',
    admin: 'admin',
  };
  return map[role] || 'student';
};

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const response = await api.get('/profile');
      const { user } = response.data;

      const backendRole = user.role;
      const frontendRole = mapBackendToFrontendRole(backendRole);
      const roleData = user[backendRole] || {};

      const profileData = {
        firstName: user.prenom,
        lastName: user.nom,
        email: user.email,
        phone: user.telephone,
        department: roleData.departement || '',
        grade: roleData.grade || '',
        role: frontendRole,
        birthDate: '', // Ajoute si dispo dans le backend
        address: '',   // idem
        bio: '',
        enrollmentDate: user.created_at || '',
        ...(backendRole === 'etudiant' && {
          niveau: roleData.niveau || '',
          filiere: roleData.filiere || '',
          studentId: roleData.matricule || ''
        }),
        ...(backendRole === 'enseignant' && {
          specialization: roleData.specialite || ''
        }),
        ...(backendRole === 'bibliothecaire' && {
          hireDate: roleData.dateRecrutement || ''
        }),
        ...(backendRole === 'admin' && {
          niveau: roleData.niveau || ''
        })
      };

      setFormData(profileData);
    } catch (error) {
      console.error('Erreur lors de la récupération du profil', error);
    }
  };

  fetchProfile();
}, []);

  const [formData, setFormData] = useState(getUserDataByRole());

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Enhanced user statistics basées sur le rôle
  const userStats = getUserStatsByRole();
    // Fonction pour obtenir le rôle actuel (avec support des variantes)
  const getCurrentRole = () => {
    const role = user?.role || user?.userType || 'student';
    // Normaliser les variantes de rôles
    if (role === 'administrator' || role === 'admin') return 'admin';
    return role;
  };
  
  // Fonction pour obtenir l'icône selon le rôle
  const getRoleIcon = () => {
    const roleIcons = {
      student: '🎓',
      teacher: '👨‍🏫',
      librarian: '📚',
      admin: '⚙️',
      administrator: '⚙️'
    };
    return roleIcons[getCurrentRole()] || '👤';
  };
    
  // Fonction pour obtenir le label du rôle
  const getRoleLabel = () => {
    const roleLabels = {
      student: 'Étudiant',
      teacher: 'Enseignant',
      librarian: 'Bibliothécaire',
      admin: 'Administrateur',
      administrator: 'Administrateur'
    };
    return roleLabels[getCurrentRole()] || 'Utilisateur';
  };

  // Fonction pour obtenir les statistiques rapides selon le rôle
  const getQuickStatsByRole = () => {
    const currentRole = getCurrentRole();
    const baseStats = [
      {
        value: userStats.totalBooksRead,
        label: 'Livres lus',
        icon: '📚',
        color: 'from-primary-500 to-primary-600'
      },
      {
        value: userStats.currentLoans,
        label: 'Emprunts actifs',
        icon: '📖',
        color: 'from-green-500 to-emerald-600'
      }
    ];

    const roleSpecificStats = {
      student: [
        ...baseStats,
        {
          value: userStats.totalReservations,
          label: 'Réservations',
          icon: '📅',
          color: 'from-purple-500 to-purple-600'
        },
        {
          value: userStats.favoriteBooks,
          label: 'Favoris',
          icon: '❤️',
          color: 'from-red-500 to-red-600'
        }
      ],
      teacher: [
        ...baseStats,
        {
          value: userStats.roleSpecific.studentsSupervised,
          label: 'Étudiants encadrés',
          icon: '👥',
          color: 'from-blue-500 to-blue-600'
        },
        {
          value: userStats.roleSpecific.publicationsCount,
          label: 'Publications',
          icon: '📄',
          color: 'from-yellow-500 to-yellow-600'
        }
      ],
      librarian: [
        ...baseStats,
        {
          value: userStats.roleSpecific.usersAssisted,
          label: 'Utilisateurs aidés',
          icon: '🤝',
          color: 'from-indigo-500 to-indigo-600'
        },
        {
          value: userStats.roleSpecific.booksProcessed,
          label: 'Livres traités',
          icon: '⚡',
          color: 'from-orange-500 to-orange-600'
        }
      ],
      admin: [
        ...baseStats,
        {
          value: userStats.roleSpecific.usersManaged,
          label: 'Utilisateurs gérés',
          icon: '👤',
          color: 'from-gray-500 to-gray-600'
        },
        {
          value: userStats.roleSpecific.systemsManaged,
          label: 'Systèmes gérés',
          icon: '⚙️',
          color: 'from-cyan-500 to-cyan-600'
        }
      ]
    };

    return roleSpecificStats[currentRole] || roleSpecificStats.student;
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

  const handleSaveProfile = async () => {
  try {
    const backendRole = mapFrontendToBackendRole(formData.role);
    const payload = {
      nom: formData.lastName,
      prenom: formData.firstName,
      email: formData.email,
      telephone: formData.phone,
      departement: formData.department,
      grade: formData.grade,
    };

    // Ajouter les champs spécifiques selon le rôle
    if (backendRole === 'etudiant') {
      payload.niveau = formData.niveau;
      payload.filiere = formData.filiere;
      payload.matricule = formData.studentId;
    } else if (backendRole === 'enseignant') {
      payload.specialite = formData.specialization;
    } else if (backendRole === 'admin') {
      payload.niveau = formData.niveau;
    }

    await api.put('/profile', payload);

    setIsEditing(false);
    const button = document.querySelector('[data-save-profile]');
    if (button) {
      button.classList.add('animate-pulse');
      setTimeout(() => button.classList.remove('animate-pulse'), 1000);
    }

    alert('Profil mis à jour avec succès');
  } catch (err) {
    console.error('Erreur lors de la mise à jour', err);
    alert('Erreur lors de la mise à jour du profil');
  }
};

  const handleChangePassword = async () => {
    try {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        alert("Les nouveaux mots de passe ne correspondent pas.");
        return;
      }

      const response = await api.post('/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        newPassword_confirmation: passwordData.confirmPassword
      });

      alert(response.data.message); // ou mieux : une alerte toast
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });

      // Feedback visuel
      const form = document.querySelector('[data-password-form]');
      if (form) {
        form.classList.add('animate-bounce');
        setTimeout(() => form.classList.remove('animate-bounce'), 500);
      }

    } catch (error) {
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const messages = Object.values(errors).flat().join('\n');
        alert(messages);
      } else {
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
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
  // Fonction pour rendre les informations spécifiques au rôle
  const renderRoleSpecificInfo = () => {
    const currentRole = getCurrentRole();
    
    switch (currentRole) {
      case 'student':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">📚 Informations académiques</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ID Étudiant</label>
              <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{formData.studentId}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filière</label>
              {isEditing ? (
                <input
                  type="text"
                  name="filiere"
                  value={formData.filiere || ''}
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
                  value={formData.niveau || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                >
                  <option value="">Sélectionner un niveau</option>
                  <option value="Licence 1">Licence 1</option>
                  <option value="Licence 2">Licence 2</option>
                  <option value="Licence 3">Licence 3</option>
                  <option value="Master 1">Master 1</option>
                  <option value="Master 2">Master 2</option>
                  <option value="Doctorat">Doctorat</option>
                </select>
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{formData.niveau || 'Non spécifié'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date d'inscription</label>
              <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">
                {formData.enrollmentDate ? new Date(formData.enrollmentDate).toLocaleDateString('fr-FR') : 'Non disponible'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Statistiques académiques</label>
              <div className="grid grid-cols-2 gap-4 px-4 py-3 bg-gray-50 rounded-xl">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{userStats.roleSpecific.coursesEnrolled}</div>
                  <div className="text-xs text-gray-600">Cours inscrits</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">{userStats.roleSpecific.gpa}</div>
                  <div className="text-xs text-gray-600">GPA</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'teacher':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">👨‍🏫 Informations professionnelles</h3>            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ID Employé</label>
              <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{formData.employeeId || 'Non spécifié'}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
              {isEditing ? (
                <select
                  name="grade"
                  value={formData.grade || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                >
                  <option value="">Sélectionner un grade</option>
                  <option value="Professeur">Professeur</option>
                  <option value="Professeur Assistant">Professeur Assistant</option>
                  <option value="Maître de Conférences">Maître de Conférences</option>
                  <option value="Chargé de Cours">Chargé de Cours</option>
                  <option value="Vacataire">Vacataire</option>
                </select>
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{formData.grade || 'Non spécifié'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Domaine de recherche</label>
              {isEditing ? (
                <textarea
                  name="researchDomain"
                  value={formData.researchDomain || ''}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  placeholder="Décrivez vos domaines de recherche..."
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{formData.researchDomain || 'Non spécifié'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date d'embauche</label>
              <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">
                {formData.hireDate ? new Date(formData.hireDate).toLocaleDateString('fr-FR') : 'Non disponible'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Statistiques d'enseignement</label>
              <div className="grid grid-cols-2 gap-4 px-4 py-3 bg-gray-50 rounded-xl">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{userStats.roleSpecific.coursesTeaching}</div>
                  <div className="text-xs text-gray-600">Cours enseignés</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">{userStats.roleSpecific.studentsSupervised}</div>
                  <div className="text-xs text-gray-600">Étudiants encadrés</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">{userStats.roleSpecific.publicationsCount}</div>
                  <div className="text-xs text-gray-600">Publications</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-orange-600">{userStats.roleSpecific.researchProjects}</div>
                  <div className="text-xs text-gray-600">Projets recherche</div>
                </div>
              </div>
            </div>
          </div>
        );      case 'librarian':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">📚 Informations professionnelles</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ID Employé</label>
              <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{formData.employeeId || 'Non spécifié'}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
              {isEditing ? (
                <select
                  name="grade"
                  value={formData.grade || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                >
                  <option value="">Sélectionner un grade</option>
                  <option value="Bibliothécaire en chef">Bibliothécaire en chef</option>
                  <option value="Bibliothécaire principal">Bibliothécaire principal</option>
                  <option value="Bibliothécaire">Bibliothécaire</option>
                  <option value="Assistant bibliothécaire">Assistant bibliothécaire</option>
                </select>
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{formData.grade || 'Non spécifié'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
              <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">
                {formData.certifications?.map((cert, index) => (
                  <div key={index} className="flex items-center gap-2 mb-1">
                    <span className="text-green-600">✓</span>
                    <span>{cert}</span>
                  </div>
                )) || <span className="text-gray-500">Aucune certification enregistrée</span>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date d'embauche</label>
              <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">
                {formData.hireDate ? new Date(formData.hireDate).toLocaleDateString('fr-FR') : 'Non disponible'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Statistiques de performance</label>
              <div className="grid grid-cols-2 gap-4 px-4 py-3 bg-gray-50 rounded-xl">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{userStats.roleSpecific.usersAssisted}</div>
                  <div className="text-xs text-gray-600">Utilisateurs aidés</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">{userStats.roleSpecific.booksProcessed}</div>
                  <div className="text-xs text-gray-600">Livres traités</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">{userStats.roleSpecific.catalogEntriesCreated}</div>
                  <div className="text-xs text-gray-600">Entrées catalogue</div>                </div>
              </div>
            </div>
          </div>
        );

      case 'admin':
      case 'administrator':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">⚙️ Informations administratives</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ID Employé</label>
              <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{formData.employeeId || 'Non spécifié'}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
              {isEditing ? (
                <select
                  name="grade"
                  value={formData.grade || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                >
                  <option value="">Sélectionner un grade</option>
                  <option value="Administrateur Système Senior">Administrateur Système Senior</option>
                  <option value="Administrateur Système">Administrateur Système</option>
                  <option value="Administrateur Principal">Administrateur Principal</option>
                  <option value="Administrateur">Administrateur</option>
                </select>
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{formData.grade || 'Non spécifié'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Niveau d'habilitation</label>
              <p className="px-4 py-3 bg-red-50 rounded-xl text-red-800 border border-red-200">
                🔐 {formData.clearanceLevel || 'Niveau standard'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date d'embauche</label>
              <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">
                {formData.hireDate ? new Date(formData.hireDate).toLocaleDateString('fr-FR') : 'Non disponible'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Statistiques d'administration</label>
              <div className="grid grid-cols-2 gap-4 px-4 py-3 bg-gray-50 rounded-xl">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{userStats.roleSpecific.systemsManaged}</div>
                  <div className="text-xs text-gray-600">Systèmes gérés</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">{userStats.roleSpecific.usersManaged}</div>
                  <div className="text-xs text-gray-600">Utilisateurs gérés</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">{userStats.roleSpecific.backupsCompleted}</div>
                  <div className="text-xs text-gray-600">Sauvegardes</div>
                </div>
                <div className="text-center">
                  <div className={`text-lg font-bold ${userStats.roleSpecific.securityIncidents === 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {userStats.roleSpecific.securityIncidents}
                  </div>
                  <div className="text-xs text-gray-600">Incidents sécurité</div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleDeleteAccount = async () => {
  const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.");
  if (!confirmDelete) return;

  try {
    const response = await api.delete('/delete-account');
    alert(response.data.message);

    // Rediriger vers la page d'accueil ou login après suppression
    window.location.href = '/login'; // ou utiliser navigate('/login') si tu utilises react-router

  } catch (error) {
    alert("Une erreur est survenue lors de la suppression du compte.");
    console.error(error);
  }
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
                </div>                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                    {formData.firstName} {formData.lastName}
                  </h1>
                  <p className="text-gray-600 text-lg mb-2">{formData.email}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Badge de rôle */}
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300">
                      {getRoleIcon()} {getRoleLabel()}
                    </span>
                    
                    {/* Badge de département */}
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                      📚 {formData.department}
                    </span>
                    
                    {/* Badge spécifique au rôle */}
                    {getCurrentRole() === 'student' && formData.niveau && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary-100 text-secondary-800">
                        🎓 {formData.niveau}
                      </span>
                    )}
                    
                    {getCurrentRole() === 'teacher' && formData.researchDomain && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        🔬 Recherche
                      </span>
                    )}
                    
                    {getCurrentRole() === 'librarian' && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        📖 Services documentaires
                      </span>
                    )}
                    
                    {getCurrentRole() === 'admin' && formData.clearanceLevel && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                        🔐 {formData.clearanceLevel}
                      </span>
                    )}
                    
                    {/* Badge de niveau */}
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getMembershipColor(userStats.membershipLevel)}`}>
                      👑 {userStats.membershipLevel}
                    </span>
                  </div>
                </div>
              </div>              {/* Quick stats adaptées au rôle */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {getQuickStatsByRole().map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br ${stat.color} text-white rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300 mb-2`}>
                      <span className="text-lg">{stat.icon}</span>
                    </div>
                    <div className="text-lg font-bold text-gray-800">{stat.value}</div>
                    <div className="text-xs font-medium text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>      {/* Enhanced Tabs */}
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
              </div>              <div>
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
                    <option value="Services Bibliothèque">Services Bibliothèque</option>
                    <option value="Administration Système">Administration Système</option>
                  </select>
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{formData.department}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Grade/Fonction</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">{formData.grade}</p>
                )}
              </div>
            </div>{/* Role-specific Information */}
            {renderRoleSpecificInfo()}
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
                <button
                  onClick={handleDeleteAccount}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
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
