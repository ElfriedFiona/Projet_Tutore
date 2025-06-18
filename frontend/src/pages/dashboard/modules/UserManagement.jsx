import React, { useState, useEffect } from 'react';
import { 
  Users, Search, Filter, Plus, Edit, Trash2, Eye, 
  UserPlus, UserCheck, UserX, Mail, Phone, MapPin,
  GraduationCap, BookOpen, Shield, User, Calendar,
  Download, Upload, RefreshCw, Settings, Award,
  Clock, CheckCircle, XCircle, AlertTriangle
} from 'lucide-react';

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data pour les utilisateurs
  const mockUsers = [
    {
      id: 'ADM001',
      firstName: 'Sarah',
      lastName: 'Kouame',
      email: 'sarah.kouame@enspd.ci',
      phone: '+225 07 11 22 33 44',
      role: 'administrator',
      status: 'active',
      program: null,
      year: null,
      employeeId: 'EMP2023001',
      department: 'Administration',
      createdDate: '2023-09-01',
      lastLogin: '2024-01-28',
      totalLoans: 0,
      activeLoans: 0,
      totalFines: 0,
      avatar: null
    },
    {
      id: 'LIB001',
      firstName: 'Jean',
      lastName: 'Bakayoko',
      email: 'jean.bakayoko@enspd.ci',
      phone: '+225 05 44 55 66 77',
      role: 'librarian',
      status: 'active',
      program: null,
      year: null,
      employeeId: 'EMP2023002',
      department: 'Bibliothèque',
      createdDate: '2023-09-15',
      lastLogin: '2024-01-27',
      totalLoans: 0,
      activeLoans: 0,
      totalFines: 0,
      avatar: null
    },
    {
      id: 'PROF001',
      firstName: 'Dr. Marie',
      lastName: 'Diabaté',
      email: 'marie.diabate@enspd.ci',
      phone: '+225 01 88 99 11 22',
      role: 'teacher',
      status: 'active',
      program: null,
      year: null,
      employeeId: 'EMP2023003',
      department: 'Génie Civil',
      createdDate: '2023-08-20',
      lastLogin: '2024-01-26',
      totalLoans: 23,
      activeLoans: 5,
      totalFines: 0,
      avatar: null
    },
    {
      id: 'ETU001',
      firstName: 'Marie',
      lastName: 'Kouassi',
      email: 'marie.k@etudiant.enspd.ci',
      phone: '+225 07 12 34 56 78',
      role: 'student',
      status: 'active',
      program: 'Génie Informatique',
      year: 'L3',
      studentId: 'GI2022001',
      department: null,
      createdDate: '2022-10-01',
      lastLogin: '2024-01-28',
      totalLoans: 45,
      activeLoans: 2,
      totalFines: 1500,
      avatar: null
    },
    {
      id: 'ETU002',
      firstName: 'Paul',
      lastName: 'Assi',
      email: 'paul.assi@etudiant.enspd.ci',
      phone: '+225 05 87 65 43 21',
      role: 'student',
      status: 'active',
      program: 'Génie Civil',
      year: 'L2',
      studentId: 'GC2023015',
      department: null,
      createdDate: '2023-10-01',
      lastLogin: '2024-01-25',
      totalLoans: 12,
      activeLoans: 1,
      totalFines: 0,
      avatar: null
    },
    {
      id: 'ETU003',
      firstName: 'Sophie',
      lastName: 'Bamba',
      email: 'sophie.b@etudiant.enspd.ci',
      phone: '+225 01 23 45 67 89',
      role: 'student',
      status: 'suspended',
      program: 'Génie Électrique',
      year: 'M1',
      studentId: 'GE2021008',
      department: null,
      createdDate: '2021-10-01',
      lastLogin: '2024-01-20',
      totalLoans: 67,
      activeLoans: 0,
      totalFines: 7500,
      avatar: null
    }
  ];

  // Statistiques des utilisateurs
  const userStats = {
    total: mockUsers.length,
    students: mockUsers.filter(u => u.role === 'student').length,
    teachers: mockUsers.filter(u => u.role === 'teacher').length,
    librarians: mockUsers.filter(u => u.role === 'librarian').length,
    administrators: mockUsers.filter(u => u.role === 'administrator').length,
    active: mockUsers.filter(u => u.status === 'active').length,
    suspended: mockUsers.filter(u => u.status === 'suspended').length,
    inactive: mockUsers.filter(u => u.status === 'inactive').length
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filtrer les utilisateurs
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.studentId && user.studentId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.employeeId && user.employeeId.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    const matchesTab = activeTab === 'all' || user.role === activeTab;

    return matchesSearch && matchesRole && matchesStatus && matchesTab;
  });

  // Composant pour les cartes de statistiques
  const StatCard = ({ icon: Icon, title, value, subtitle, color = 'primary' }) => {
    const colorClasses = {
      primary: 'from-primary-600 to-primary-700',
      blue: 'from-blue-600 to-blue-700',
      green: 'from-green-600 to-green-700',
      yellow: 'from-yellow-600 to-yellow-700',
      red: 'from-red-600 to-red-700',
      purple: 'from-purple-600 to-purple-700'
    };

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    );
  };

  // Composant pour les éléments d'utilisateurs
  const UserItem = ({ user }) => {
    const getRoleColor = (role) => {
      switch (role) {
        case 'administrator': return 'text-red-600 bg-red-100';
        case 'librarian': return 'text-blue-600 bg-blue-100';
        case 'teacher': return 'text-green-600 bg-green-100';
        case 'student': return 'text-purple-600 bg-purple-100';
        default: return 'text-gray-600 bg-gray-100';
      }
    };

    const getStatusColor = (status) => {
      switch (status) {
        case 'active': return 'text-green-600 bg-green-100';
        case 'suspended': return 'text-red-600 bg-red-100';
        case 'inactive': return 'text-gray-600 bg-gray-100';
        default: return 'text-gray-600 bg-gray-100';
      }
    };

    const getRoleText = (role) => {
      switch (role) {
        case 'administrator': return 'Administrateur';
        case 'librarian': return 'Bibliothécaire';
        case 'teacher': return 'Enseignant';
        case 'student': return 'Étudiant';
        default: return role;
      }
    };

    const getStatusText = (status) => {
      switch (status) {
        case 'active': return 'Actif';
        case 'suspended': return 'Suspendu';
        case 'inactive': return 'Inactif';
        default: return status;
      }
    };

    const getRoleIcon = (role) => {
      switch (role) {
        case 'administrator': return Shield;
        case 'librarian': return BookOpen;
        case 'teacher': return GraduationCap;
        case 'student': return User;
        default: return User;
      }
    };

    const RoleIcon = getRoleIcon(user.role);

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <RoleIcon className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{user.firstName} {user.lastName}</h4>
              <p className="text-sm text-gray-500">{user.email}</p>
              {user.studentId && (
                <p className="text-sm text-gray-500">ID: {user.studentId}</p>
              )}
              {user.employeeId && (
                <p className="text-sm text-gray-500">ID: {user.employeeId}</p>
              )}
            </div>
          </div>
          <div className="flex space-x-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
              {getRoleText(user.role)}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
              {getStatusText(user.status)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Informations</p>
            {user.program && (
              <p className="text-sm font-medium text-gray-900">{user.program} - {user.year}</p>
            )}
            {user.department && (
              <p className="text-sm font-medium text-gray-900">{user.department}</p>
            )}
            <p className="text-sm text-gray-500">{user.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Activité</p>
            <p className="text-sm text-gray-900">{user.totalLoans} emprunts total</p>
            <p className="text-sm text-gray-900">{user.activeLoans} emprunts actifs</p>
            {user.totalFines > 0 && (
              <p className="text-sm text-red-600 font-medium">{user.totalFines} FCFA d'amendes</p>
            )}
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Dates</p>
            <p className="text-sm text-gray-900">
              Créé: {new Date(user.createdDate).toLocaleDateString('fr-FR')}
            </p>
            <p className="text-sm text-gray-500">
              Dernière connexion: {new Date(user.lastLogin).toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>Membre depuis {new Date(user.createdDate).getFullYear()}</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setSelectedUser(user);
                // Action pour voir les détails
              }}
              className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded"
              title="Voir détails"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setSelectedUser(user);
                setShowEditModal(true);
              }}
              className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded"
              title="Modifier"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                // Action pour contacter l'utilisateur
                window.location.href = `mailto:${user.email}`;
              }}
              className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded"
              title="Contacter par email"
            >
              <Mail className="w-4 h-4" />
            </button>
            {user.status === 'active' ? (
              <button
                onClick={() => {
                  // Action pour suspendre l'utilisateur
                  console.log('Suspendre utilisateur:', user.id);
                }}
                className="p-2 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded"
                title="Suspendre"
              >
                <UserX className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  // Action pour réactiver l'utilisateur
                  console.log('Réactiver utilisateur:', user.id);
                }}
                className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded"
                title="Réactiver"
              >
                <UserCheck className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Modal d'ajout d'utilisateur
  const AddUserModal = () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: 'student',
      program: '',
      year: '',
      department: ''
    });

    if (!showAddModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">Ajouter un Nouvel Utilisateur</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prénom *
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom *
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rôle *
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="student">Étudiant</option>
                <option value="teacher">Enseignant</option>
                <option value="librarian">Bibliothécaire</option>
                <option value="administrator">Administrateur</option>
              </select>
            </div>
            {formData.role === 'student' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Programme d'études
                  </label>
                  <select
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Sélectionner un programme</option>
                    <option value="Génie Informatique">Génie Informatique</option>
                    <option value="Génie Civil">Génie Civil</option>
                    <option value="Génie Électrique">Génie Électrique</option>
                    <option value="Génie Mécanique">Génie Mécanique</option>
                    <option value="Génie Industriel">Génie Industriel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Année d'études
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Sélectionner une année</option>
                    <option value="L1">Licence 1</option>
                    <option value="L2">Licence 2</option>
                    <option value="L3">Licence 3</option>
                    <option value="M1">Master 1</option>
                    <option value="M2">Master 2</option>
                  </select>
                </div>
              </>
            )}
            {(formData.role === 'teacher' || formData.role === 'librarian' || formData.role === 'administrator') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Département
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Sélectionner un département</option>
                  <option value="Administration">Administration</option>
                  <option value="Bibliothèque">Bibliothèque</option>
                  <option value="Génie Informatique">Génie Informatique</option>
                  <option value="Génie Civil">Génie Civil</option>
                  <option value="Génie Électrique">Génie Électrique</option>
                  <option value="Génie Mécanique">Génie Mécanique</option>
                  <option value="Génie Industriel">Génie Industriel</option>
                </select>
              </div>
            )}
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => {
                setShowAddModal(false);
                setFormData({
                  firstName: '',
                  lastName: '',
                  email: '',
                  phone: '',
                  role: 'student',
                  program: '',
                  year: '',
                  department: ''
                });
              }}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              onClick={() => {
                // Logique de création d'utilisateur
                console.log('Nouveau utilisateur:', formData);
                setShowAddModal(false);
              }}
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Créer l'Utilisateur
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Users className="w-8 h-8 mr-3 text-primary-600" />
            Gestion des Utilisateurs
          </h2>
          <p className="text-gray-600 mt-1">
            Gérer tous les comptes utilisateurs du système
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Nouvel Utilisateur
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard 
          icon={Users} 
          title="Total" 
          value={userStats.total}
          color="primary"
        />
        <StatCard 
          icon={GraduationCap} 
          title="Étudiants" 
          value={userStats.students}
          color="purple"
        />
        <StatCard 
          icon={BookOpen} 
          title="Personnel" 
          value={userStats.teachers + userStats.librarians + userStats.administrators}
          color="blue"
        />
        <StatCard 
          icon={CheckCircle} 
          title="Actifs" 
          value={userStats.active}
          color="green"
        />
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher par nom, email, ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">Tous les rôles</option>
            <option value="student">Étudiants</option>
            <option value="teacher">Enseignants</option>
            <option value="librarian">Bibliothécaires</option>
            <option value="administrator">Administrateurs</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actifs</option>
            <option value="suspended">Suspendus</option>
            <option value="inactive">Inactifs</option>
          </select>
          <div className="flex space-x-2">
            <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              <Upload className="w-4 h-4 mr-2" />
              Importer
            </button>
          </div>
        </div>
      </div>

      {/* Navigation par onglets */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'all', label: 'Tous', count: userStats.total, icon: Users },
            { id: 'student', label: 'Étudiants', count: userStats.students, icon: GraduationCap },
            { id: 'teacher', label: 'Enseignants', count: userStats.teachers, icon: Award },
            { id: 'librarian', label: 'Bibliothécaires', count: userStats.librarians, icon: BookOpen },
            { id: 'administrator', label: 'Administrateurs', count: userStats.administrators, icon: Shield }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
                <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Liste des utilisateurs */}
      <div className="space-y-4">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Aucun utilisateur trouvé</p>
            <p className="text-sm text-gray-400 mt-1">
              Modifiez vos critères de recherche ou ajoutez un nouvel utilisateur
            </p>
          </div>
        ) : (
          filteredUsers.map(user => (
            <UserItem key={user.id} user={user} />
          ))
        )}
      </div>

      {/* Modals */}
      <AddUserModal />
    </div>
  );
};

export default UserManagement;
