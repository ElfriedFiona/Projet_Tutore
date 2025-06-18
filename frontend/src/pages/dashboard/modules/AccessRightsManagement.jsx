import React, { useState, useEffect } from 'react';
import { 
  Shield, Settings, Users, Lock, Unlock, Key, Eye, Edit,
  CheckCircle, XCircle, AlertTriangle, Clock, Save,
  UserCheck, UserX, Crown, BookOpen, GraduationCap,
  Download, Upload, RefreshCw, Search, Filter
} from 'lucide-react';

const AccessRightsManagement = () => {
  const [activeTab, setActiveTab] = useState('roles');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Définition des permissions du système
  const systemPermissions = [
    {
      category: 'Catalogue',
      permissions: [
        { id: 'catalog_view', name: 'Consulter le catalogue', description: 'Voir les livres disponibles' },
        { id: 'catalog_search', name: 'Rechercher dans le catalogue', description: 'Utiliser la recherche avancée' },
        { id: 'catalog_add', name: 'Ajouter des ouvrages', description: 'Ajouter de nouveaux livres' },
        { id: 'catalog_edit', name: 'Modifier des ouvrages', description: 'Modifier les informations des livres' },
        { id: 'catalog_delete', name: 'Supprimer des ouvrages', description: 'Supprimer des livres du catalogue' }
      ]
    },
    {
      category: 'Emprunts',
      permissions: [
        { id: 'loans_request', name: 'Demander un emprunt', description: 'Faire une demande d\'emprunt' },
        { id: 'loans_manage', name: 'Gérer les emprunts', description: 'Traiter les demandes d\'emprunt' },
        { id: 'loans_return', name: 'Gérer les retours', description: 'Traiter les retours de livres' },
        { id: 'loans_renew', name: 'Prolonger les emprunts', description: 'Prolonger la durée d\'emprunt' },
        { id: 'loans_view_all', name: 'Voir tous les emprunts', description: 'Accéder à l\'historique complet' }
      ]
    },
    {
      category: 'Réservations',
      permissions: [
        { id: 'reservations_make', name: 'Faire des réservations', description: 'Réserver des livres' },
        { id: 'reservations_manage', name: 'Gérer les réservations', description: 'Traiter les réservations' },
        { id: 'reservations_cancel', name: 'Annuler des réservations', description: 'Annuler ses propres réservations' },
        { id: 'reservations_view_all', name: 'Voir toutes les réservations', description: 'Accéder à toutes les réservations' }
      ]
    },
    {
      category: 'Utilisateurs',
      permissions: [
        { id: 'users_view_profile', name: 'Voir son profil', description: 'Consulter ses informations personnelles' },
        { id: 'users_edit_profile', name: 'Modifier son profil', description: 'Modifier ses informations' },
        { id: 'users_create_student', name: 'Créer des comptes étudiants', description: 'Créer des comptes pour les étudiants' },
        { id: 'users_create_any', name: 'Créer tous types de comptes', description: 'Créer n\'importe quel type de compte' },
        { id: 'users_edit_any', name: 'Modifier tous les comptes', description: 'Modifier les informations de tous les utilisateurs' },
        { id: 'users_suspend', name: 'Suspendre des comptes', description: 'Suspendre ou réactiver des utilisateurs' }
      ]
    },
    {
      category: 'Amendes',
      permissions: [
        { id: 'fines_view_own', name: 'Voir ses amendes', description: 'Consulter ses propres amendes' },
        { id: 'fines_pay', name: 'Payer ses amendes', description: 'Effectuer le paiement de ses amendes' },
        { id: 'fines_manage_limited', name: 'Gérer amendes limitées', description: 'Gérer les amendes ≤ 5000 FCFA' },
        { id: 'fines_manage_all', name: 'Gérer toutes les amendes', description: 'Gérer les amendes sans limite' },
        { id: 'fines_waive', name: 'Annuler des amendes', description: 'Annuler des amendes' }
      ]
    },
    {
      category: 'Administration',
      permissions: [
        { id: 'admin_system_config', name: 'Configuration système', description: 'Modifier les paramètres système' },
        { id: 'admin_backup', name: 'Sauvegardes', description: 'Gérer les sauvegardes' },
        { id: 'admin_reports', name: 'Rapports avancés', description: 'Générer des rapports détaillés' },
        { id: 'admin_audit', name: 'Journal d\'audit', description: 'Consulter les logs d\'audit' },
        { id: 'admin_permissions', name: 'Gérer les permissions', description: 'Modifier les droits d\'accès' }
      ]
    }
  ];

  // Définition des rôles avec leurs permissions
  const systemRoles = [
    {
      id: 'student',
      name: 'Étudiant',
      description: 'Utilisateur étudiant avec des privilèges de base',
      color: 'purple',
      icon: GraduationCap,
      userCount: 156,
      maxLoans: 3,
      loanDuration: 14,
      maxRenewals: 1,
      maxReservations: 3,
      finePerDay: 500,
      permissions: [
        'catalog_view', 'catalog_search',
        'loans_request', 'loans_renew',
        'reservations_make', 'reservations_cancel',
        'users_view_profile', 'users_edit_profile',
        'fines_view_own', 'fines_pay'
      ]
    },
    {
      id: 'teacher',
      name: 'Enseignant',
      description: 'Membre du personnel enseignant avec privilèges étendus',
      color: 'green',
      icon: BookOpen,
      userCount: 45,
      maxLoans: 10,
      loanDuration: 30,
      maxRenewals: 3,
      maxReservations: 5,
      finePerDay: 500,
      permissions: [
        'catalog_view', 'catalog_search',
        'loans_request', 'loans_renew',
        'reservations_make', 'reservations_cancel',
        'users_view_profile', 'users_edit_profile',
        'fines_view_own', 'fines_pay'
      ]
    },
    {
      id: 'librarian',
      name: 'Bibliothécaire',
      description: 'Personnel de bibliothèque avec droits de gestion',
      color: 'blue',
      icon: BookOpen,
      userCount: 8,
      maxLoans: 0,
      loanDuration: 0,
      maxRenewals: 0,
      maxReservations: 0,
      finePerDay: 0,
      permissions: [
        'catalog_view', 'catalog_search', 'catalog_add', 'catalog_edit',
        'loans_manage', 'loans_return', 'loans_view_all',
        'reservations_manage', 'reservations_view_all',
        'users_view_profile', 'users_edit_profile', 'users_create_student',
        'fines_view_own', 'fines_manage_limited', 'fines_waive'
      ]
    },
    {
      id: 'administrator',
      name: 'Administrateur',
      description: 'Accès complet au système',
      color: 'red',
      icon: Crown,
      userCount: 3,
      maxLoans: 0,
      loanDuration: 0,
      maxRenewals: 0,
      maxReservations: 0,
      finePerDay: 0,
      permissions: systemPermissions.flatMap(cat => cat.permissions.map(p => p.id))
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filtrer les rôles
  const filteredRoles = systemRoles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Composant pour les cartes de statistiques
  const StatCard = ({ icon: Icon, title, value, subtitle, color = 'primary' }) => {
    const colorClasses = {
      primary: 'from-primary-600 to-primary-700',
      blue: 'from-blue-600 to-blue-700',
      green: 'from-green-600 to-green-700',
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

  // Composant pour les éléments de rôle
  const RoleItem = ({ role }) => {
    const getColorClasses = (color) => {
      switch (color) {
        case 'purple': return 'text-purple-600 bg-purple-100 border-purple-200';
        case 'green': return 'text-green-600 bg-green-100 border-green-200';
        case 'blue': return 'text-blue-600 bg-blue-100 border-blue-200';
        case 'red': return 'text-red-600 bg-red-100 border-red-200';
        default: return 'text-gray-600 bg-gray-100 border-gray-200';
      }
    };

    const Icon = role.icon;

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-lg border ${getColorClasses(role.color)}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">{role.name}</h4>
              <p className="text-sm text-gray-600">{role.description}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{role.userCount}</p>
            <p className="text-sm text-gray-500">utilisateurs</p>
          </div>
        </div>

        {role.id !== 'administrator' && role.id !== 'librarian' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-700">Emprunts max</p>
              <p className="text-lg font-semibold text-gray-900">{role.maxLoans}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Durée (jours)</p>
              <p className="text-lg font-semibold text-gray-900">{role.loanDuration}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Prolongations</p>
              <p className="text-lg font-semibold text-gray-900">{role.maxRenewals}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Amende/jour</p>
              <p className="text-lg font-semibold text-gray-900">{role.finePerDay} FCFA</p>
            </div>
          </div>
        )}

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Permissions ({role.permissions.length})</p>
          <div className="flex flex-wrap gap-1">
            {role.permissions.slice(0, 6).map(permId => {
              const permission = systemPermissions
                .flatMap(cat => cat.permissions)
                .find(p => p.id === permId);
              return permission ? (
                <span key={permId} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  {permission.name}
                </span>
              ) : null;
            })}
            {role.permissions.length > 6 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                +{role.permissions.length - 6} autres
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Dernière modification : Il y a 2 jours
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setSelectedRole(role);
                // Action pour voir les détails
              }}
              className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded"
              title="Voir détails"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setSelectedRole(role);
                setShowEditModal(true);
              }}
              className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded"
              title="Modifier permissions"
            >
              <Edit className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Modal de modification des permissions
  const EditPermissionsModal = () => {
    const [rolePermissions, setRolePermissions] = useState([]);

    useEffect(() => {
      if (selectedRole) {
        setRolePermissions(selectedRole.permissions);
      }
    }, [selectedRole]);

    if (!showEditModal || !selectedRole) return null;

    const togglePermission = (permissionId) => {
      setRolePermissions(prev => 
        prev.includes(permissionId)
          ? prev.filter(id => id !== permissionId)
          : [...prev, permissionId]
      );
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold">Modifier les Permissions - {selectedRole.name}</h3>
              <p className="text-sm text-gray-600">{selectedRole.description}</p>
            </div>
            <button
              onClick={() => {
                setShowEditModal(false);
                setSelectedRole(null);
              }}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            {systemPermissions.map(category => (
              <div key={category.category} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-primary-600" />
                  {category.category}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {category.permissions.map(permission => (
                    <div key={permission.id} className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id={permission.id}
                        checked={rolePermissions.includes(permission.id)}
                        onChange={() => togglePermission(permission.id)}
                        className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor={permission.id}
                          className="text-sm font-medium text-gray-900 cursor-pointer"
                        >
                          {permission.name}
                        </label>
                        <p className="text-xs text-gray-500">{permission.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Permissions sélectionnées : {rolePermissions.length}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedRole(null);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  // Logique de sauvegarde des permissions
                  console.log('Permissions mises à jour:', { role: selectedRole.id, permissions: rolePermissions });
                  setShowEditModal(false);
                  setSelectedRole(null);
                }}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Sauvegarder
              </button>
            </div>
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
            <Shield className="w-8 h-8 mr-3 text-primary-600" />
            Gestion des Droits d'Accès
          </h2>
          <p className="text-gray-600 mt-1">
            Configuration des rôles et permissions du système
          </p>
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Exporter Config
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            <Upload className="w-4 h-4 mr-2" />
            Importer Config
          </button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard 
          icon={Users} 
          title="Rôles Définis" 
          value={systemRoles.length}
          color="primary"
        />
        <StatCard 
          icon={Key} 
          title="Permissions Totales" 
          value={systemPermissions.reduce((acc, cat) => acc + cat.permissions.length, 0)}
          color="blue"
        />
        <StatCard 
          icon={UserCheck} 
          title="Utilisateurs Actifs" 
          value={systemRoles.reduce((acc, role) => acc + role.userCount, 0)}
          color="green"
        />
        <StatCard 
          icon={Settings} 
          title="Catégories" 
          value={systemPermissions.length}
          color="purple"
        />
      </div>

      {/* Recherche */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher un rôle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Navigation par onglets */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('roles')}
            className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
              activeTab === 'roles'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Users className="w-4 h-4 mr-2" />
            Rôles et Permissions
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
              activeTab === 'audit'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Eye className="w-4 h-4 mr-2" />
            Journal d'Audit
          </button>
        </nav>
      </div>

      {/* Contenu selon l'onglet */}
      {activeTab === 'roles' && (
        <div className="space-y-6">
          {filteredRoles.length === 0 ? (
            <div className="text-center py-12">
              <Shield className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Aucun rôle trouvé</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRoles.map(role => (
                <RoleItem key={role.id} role={role} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-center py-16 text-gray-500">
            <Eye className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>Journal d'audit des modifications de permissions</p>
            <p className="text-sm mt-2">
              Fonctionnalités : Historique des modifications, Auteur des changements, Dates
            </p>
          </div>
        </div>
      )}

      {/* Modals */}
      <EditPermissionsModal />
    </div>
  );
};

export default AccessRightsManagement;
