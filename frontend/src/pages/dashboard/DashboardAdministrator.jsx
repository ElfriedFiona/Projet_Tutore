import React, { useState, useEffect } from 'react';
import { 
  Shield, Users, BookOpen, Settings, BarChart3, Database, 
  UserCheck, Key, FileText, Download, Upload, Monitor,
  TrendingUp, AlertTriangle, Clock, Calendar, Star,
  Activity, Server, Lock, RefreshCw, Zap, Target,
  DollarSign, UserPlus, Edit, Trash2, Eye, Check, X
} from 'lucide-react';
import { useAuth } from '../../context/AppContext';
import { formatPrice, formatNumber } from '../../utils/formatters';
import UserManagement from './modules/UserManagement';
import AccessRightsManagement from './modules/AccessRightsManagement';
import SystemConfiguration from './modules/SystemConfiguration';
import ReportsManagement from './modules/ReportsManagement';
import BackupManagement from './modules/BackupManagement';

const DashboardAdministrator = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mock data for administrator dashboard
  const systemStats = {
    totalUsers: 2847,
    activeUsers: 1923,
    totalBooks: 15678,
    systemUptime: '99.8%',
    dailyTransactions: 234,
    storageUsed: '67%',
    totalRevenue: 2456750, // FCFA
    newRegistrations: 45
  };

  const userRoleStats = {
    students: 2134,
    teachers: 267,
    librarians: 8,
    administrators: 3
  };

  const systemAlerts = [
    { id: 1, type: 'warning', message: 'Espace de stockage à 67%', time: '10:30', priority: 'medium' },
    { id: 2, type: 'info', message: 'Sauvegarde automatique terminée', time: '02:00', priority: 'low' },
    { id: 3, type: 'error', message: '3 tentatives de connexion échouées', time: '14:45', priority: 'high' },
    { id: 4, type: 'success', message: 'Mise à jour système installée', time: '09:15', priority: 'medium' }
  ];

  const recentUsers = [
    { id: 1, name: 'Marie Kouassi', email: 'marie.k@etudiant.enspd.ci', role: 'student', status: 'active', created: '2024-01-15' },
    { id: 2, name: 'Dr. Jean Bakayoko', email: 'j.bakayoko@enspd.ci', role: 'teacher', status: 'active', created: '2024-01-14' },
    { id: 3, name: 'Sophie Traoré', email: 's.traore@etudiant.enspd.ci', role: 'student', status: 'pending', created: '2024-01-13' }
  ];

  const StatCard = ({ icon: Icon, title, value, subtitle, color = 'primary', trend = null }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold text-${color}-600 mt-1`}>{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          {trend && (
            <div className={`flex items-center mt-2 text-xs ${
              trend > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendingUp className="w-3 h-3 mr-1" />
              {Math.abs(trend)}% ce mois
            </div>
          )}
        </div>
        <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const AlertItem = ({ alert }) => {
    const getAlertColor = (type) => {
      switch (type) {
        case 'error': return 'red';
        case 'warning': return 'yellow';
        case 'success': return 'green';
        case 'info': return 'blue';
        default: return 'gray';
      }
    };

    const getAlertIcon = (type) => {
      switch (type) {
        case 'error': return <AlertTriangle className="w-4 h-4" />;
        case 'warning': return <AlertTriangle className="w-4 h-4" />;
        case 'success': return <Check className="w-4 h-4" />;
        case 'info': return <Activity className="w-4 h-4" />;
        default: return <Clock className="w-4 h-4" />;
      }
    };

    const color = getAlertColor(alert.type);

    return (
      <div className={`flex items-start space-x-3 p-3 bg-${color}-50 border border-${color}-200 rounded-lg`}>
        <div className={`text-${color}-600 mt-1`}>{getAlertIcon(alert.type)}</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-900">{alert.message}</p>
          <p className="text-xs text-gray-500">{alert.time}</p>
        </div>
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800`}>
          {alert.priority}
        </span>
      </div>
    );
  };

  const UserItem = ({ user }) => {
    const getRoleColor = (role) => {
      switch (role) {
        case 'administrator': return 'red';
        case 'librarian': return 'purple';
        case 'teacher': return 'blue';
        case 'student': return 'green';
        default: return 'gray';
      }
    };

    const getRoleLabel = (role) => {
      switch (role) {
        case 'administrator': return 'Administrateur';
        case 'librarian': return 'Bibliothécaire';
        case 'teacher': return 'Enseignant';
        case 'student': return 'Étudiant';
        default: return role;
      }
    };

    const color = getRoleColor(user.role);

    return (
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex-1">
          <h4 className="text-sm font-medium text-gray-900">{user.name}</h4>
          <p className="text-sm text-gray-600">{user.email}</p>
          <p className="text-xs text-gray-500">{user.created}</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800`}>
            {getRoleLabel(user.role)}
          </span>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {user.status}
          </span>
          <div className="flex space-x-1">
            <button className="text-blue-600 hover:text-blue-800">
              <Eye className="w-4 h-4" />
            </button>
            <button className="text-gray-600 hover:text-gray-800">
              <Edit className="w-4 h-4" />
            </button>
            <button className="text-red-600 hover:text-red-800">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const TabButton = ({ id, icon: Icon, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
        isActive 
          ? 'bg-primary-600 text-white shadow-md' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="font-medium">{label}</span>
    </button>
  );

  const QuickAction = ({ icon: Icon, label, color = 'primary', onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 hover:border-${color}-300`}
    >
      <div className={`w-10 h-10 bg-${color}-100 rounded-lg flex items-center justify-center`}>
        <Icon className={`w-5 h-5 text-${color}-600`} />
      </div>
      <span className="font-medium text-gray-900">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-purple-50">
      <div className="p-6">
        {/* En-tête */}
        <div className={`mb-8 transition-all duration-500 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-purple-800 bg-clip-text text-transparent flex items-center">
                <Shield className="w-10 h-10 mr-3 text-red-600" />
                Tableau de Bord Administrateur
              </h1>
              <p className="text-gray-600 mt-2">
                Bonjour {user?.firstName}, contrôlez l'ensemble du système
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">ENSPD - Administration Système</p>
              <p className="text-sm font-medium text-red-600">
                Accès Niveau : Administrateur
              </p>
            </div>
          </div>
        </div>

        {/* Navigation par onglets */}
        <div className="mb-8">
          <div className="flex space-x-2 bg-white p-2 rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
            <TabButton id="overview" icon={BarChart3} label="Vue d'ensemble" 
              isActive={activeTab === 'overview'} onClick={setActiveTab} />
            <TabButton id="users" icon={Users} label="Utilisateurs" 
              isActive={activeTab === 'users'} onClick={setActiveTab} />
            <TabButton id="system" icon={Settings} label="Système" 
              isActive={activeTab === 'system'} onClick={setActiveTab} />
            <TabButton id="security" icon={Lock} label="Sécurité" 
              isActive={activeTab === 'security'} onClick={setActiveTab} />
            <TabButton id="reports" icon={FileText} label="Rapports" 
              isActive={activeTab === 'reports'} onClick={setActiveTab} />
            <TabButton id="backup" icon={Database} label="Sauvegardes" 
              isActive={activeTab === 'backup'} onClick={setActiveTab} />
          </div>
        </div>

        {/* Contenu principal selon l'onglet actif */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Statistiques principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                icon={Users} 
                title="Total Utilisateurs" 
                value={formatNumber(systemStats.totalUsers)} 
                subtitle="Comptes créés"
                color="blue"
                trend={8.2}
              />
              <StatCard 
                icon={Activity} 
                title="Utilisateurs Actifs" 
                value={formatNumber(systemStats.activeUsers)} 
                subtitle="Dernière semaine"
                color="green"
                trend={5.1}
              />
              <StatCard 
                icon={BookOpen} 
                title="Total Ouvrages" 
                value={formatNumber(systemStats.totalBooks)} 
                subtitle="Dans le catalogue"
                color="purple"
                trend={2.3}
              />
              <StatCard 
                icon={Monitor} 
                title="Uptime Système" 
                value={systemStats.systemUptime} 
                subtitle="Ce mois"
                color="green"
              />
              <StatCard 
                icon={TrendingUp} 
                title="Transactions/Jour" 
                value={systemStats.dailyTransactions} 
                subtitle="Moyenne"
                color="blue"
                trend={12.5}
              />
              <StatCard 
                icon={Server} 
                title="Stockage Utilisé" 
                value={systemStats.storageUsed} 
                subtitle="Sur 2TB"
                color="yellow"
              />
              <StatCard 
                icon={DollarSign} 
                title="Revenus" 
                value={formatPrice(systemStats.totalRevenue)} 
                subtitle="Ce mois"
                color="green"
                trend={15.8}
              />
              <StatCard 
                icon={UserPlus} 
                title="Nouvelles Inscriptions" 
                value={systemStats.newRegistrations} 
                subtitle="Cette semaine"
                color="purple"
                trend={22.1}
              />
            </div>

            {/* Répartition des rôles utilisateurs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <UserCheck className="w-5 h-5 mr-2 text-blue-600" />
                  Répartition des Rôles
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Étudiants</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{width: '75%'}}></div>
                      </div>
                      <span className="font-medium">{formatNumber(userRoleStats.students)}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Enseignants</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: '15%'}}></div>
                      </div>
                      <span className="font-medium">{formatNumber(userRoleStats.teachers)}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Bibliothécaires</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{width: '5%'}}></div>
                      </div>
                      <span className="font-medium">{userRoleStats.librarians}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Administrateurs</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-red-600 h-2 rounded-full" style={{width: '2%'}}></div>
                      </div>
                      <span className="font-medium">{userRoleStats.administrators}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
                  Alertes Système ({systemAlerts.length})
                </h3>
                <div className="space-y-3">
                  {systemAlerts.map(alert => (
                    <AlertItem key={alert.id} alert={alert} />
                  ))}
                </div>
              </div>
            </div>

            {/* Actions administrateur */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-red-600" />
                Actions Administrateur
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <QuickAction icon={UserPlus} label="Créer Utilisateur" color="blue" />
                <QuickAction icon={Key} label="Gérer les Droits" color="red" />
                <QuickAction icon={Settings} label="Configuration" color="gray" />
                <QuickAction icon={Download} label="Exporter Données" color="green" />
                <QuickAction icon={Upload} label="Sauvegarde" color="purple" />
                <QuickAction icon={Monitor} label="Surveillance" color="yellow" />
                <QuickAction icon={RefreshCw} label="Redémarrer Service" color="red" />
                <QuickAction icon={FileText} label="Logs Système" color="gray" />
              </div>
            </div>
          </div>
        )}        {activeTab === 'users' && <UserManagement />}        {activeTab === 'system' && <SystemConfiguration />}        {activeTab === 'security' && <AccessRightsManagement />}        {activeTab === 'reports' && <ReportsManagement />}        {activeTab === 'backup' && <BackupManagement />}
      </div>
    </div>
  );
};

export default DashboardAdministrator;
