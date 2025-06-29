import React, { useState, useEffect } from 'react';
import {
  BookOpen, Users, AlertTriangle, Plus, Search, Filter,
  Edit, Trash2, Check, X, DollarSign, Calendar,
  BarChart3, FileText, Star, TrendingUp, Clock,
  UserPlus, BookMarked, Receipt, Settings
} from 'lucide-react';
import { formatPrice } from '../../utils/formatters';
import CatalogManagement from './modules/CatalogManagement';
import LoanManagement from './modules/LoanManagement';
import FineManagement from './modules/FineManagement';
// Removed: import RoleNavigator from '../../components/demo/RoleNavigator'; // <-- LIGNE SUPPRIMÉE

const DashboardLibrarian = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mock data for librarian dashboard
  const stats = {
    totalBooks: 12543,
    totalLoans: 456,
    overdueLoans: 23,
    pendingReservations: 67,
    finesCollected: 125000, // FCFA
    newStudentAccounts: 12
  };

  const recentActivities = [
    { id: 1, type: 'loan', user: 'Marie Dupont', book: 'Introduction à la Physique', time: '10:30', status: 'approved' },
    { id: 2, type: 'return', user: 'Jean Kouadio', book: 'Histoire du Cameroun', time: '11:15', status: 'completed' },
    { id: 3, type: 'fine', user: 'Sophie Bamba', amount: 1500, time: '14:20', status: 'paid' },
    { id: 4, type: 'reservation', user: 'Paul Assi', book: 'Mathématiques Avancées', time: '15:45', status: 'pending' }
  ];

  const overdueBooks = [
    { id: 1, user: 'Alice Martin', book: 'Chimie Organique', daysOverdue: 5, fine: 2500 },
    { id: 2, user: 'Bob Traore', book: 'Littérature Française', daysOverdue: 3, fine: 1500 },
    { id: 3, user: 'Claire Yao', book: 'Biologie Cellulaire', daysOverdue: 8, fine: 4000 }
  ];

  const StatCard = ({ icon: Icon, title, value, subtitle, color = 'primary' }) => (
    <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold text-${color}-600 mt-1`}>{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => {
    const getActivityIcon = (type) => {
      switch (type) {
        case 'loan': return <BookOpen className="w-4 h-4 text-blue-500" />;
        case 'return': return <Check className="w-4 h-4 text-green-500" />;
        case 'fine': return <DollarSign className="w-4 h-4 text-yellow-500" />;
        case 'reservation': return <BookMarked className="w-4 h-4 text-purple-500" />;
        default: return <Clock className="w-4 h-4 text-gray-500" />;
      }
    };

    const getActivityText = (activity) => {
      switch (activity.type) {
        case 'loan':
          return `${activity.user} a emprunté "${activity.book}"`;
        case 'return':
          return `${activity.user} a retourné "${activity.book}"`;
        case 'fine':
          return `${activity.user} a payé une amende de ${formatPrice(activity.amount)}`;
        case 'reservation':
          return `${activity.user} a réservé "${activity.book}"`;
        default:
          return 'Activité inconnue';
      }
    };

    return (
      <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
        <div className="mt-1">{getActivityIcon(activity.type)}</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-900">{getActivityText(activity)}</p>
          <p className="text-xs text-gray-500">{activity.time}</p>
        </div>
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          activity.status === 'completed' || activity.status === 'paid' || activity.status === 'approved'
            ? 'bg-green-100 text-green-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {activity.status}
        </span>
      </div>
    );
  };

  const OverdueItem = ({ item }) => (
    <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex-1">
        <h4 className="text-sm font-medium text-gray-900">{item.book}</h4>
        <p className="text-sm text-gray-600">{item.user}</p>
        <p className="text-xs text-red-600">{item.daysOverdue} jours de retard</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-red-700">{formatPrice(item.fine)}</p>
        <div className="flex space-x-2 mt-2">
          <button className="text-xs bg-primary-600 text-white px-2 py-1 rounded hover:bg-primary-700">
            Contacter
          </button>
          <button className="text-xs bg-yellow-600 text-white px-2 py-1 rounded hover:bg-yellow-700">
            Rappel
          </button>
        </div>
      </div>
    </div>
  );

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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="p-6">
        {/* Removed: <RoleNavigator /> */} {/* <-- LIGNE SUPPRIMÉE */}

        {/* En-tête */}
        <div className={`mb-8 transition-all duration-500 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent flex items-center">
                <BookOpen className="w-10 h-10 mr-3 text-primary-600" />
                Tableau de Bord Bibliothécaire
              </h1>
              <p className="text-gray-600 mt-2">
                Bonjour Bibliothécaire, gérez efficacement votre bibliothèque
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">ENSPD - Bibliothèque</p>
              <p className="text-sm font-medium text-primary-600">
                {new Date().toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation par onglets */}
        <div className="mb-8">
          <div className="flex space-x-2 bg-white p-2 rounded-xl shadow-sm border border-gray-200">
            <TabButton id="overview" icon={BarChart3} label="Vue d'ensemble"
              isActive={activeTab === 'overview'} onClick={setActiveTab} />
            <TabButton id="loans" icon={BookOpen} label="Emprunts"
              isActive={activeTab === 'loans'} onClick={setActiveTab} />
            <TabButton id="users" icon={Users} label="Utilisateurs"
              isActive={activeTab === 'users'} onClick={setActiveTab} />
            <TabButton id="catalog" icon={BookMarked} label="Catalogue"
              isActive={activeTab === 'catalog'} onClick={setActiveTab} />
            <TabButton id="fines" icon={Receipt} label="Amendes"
              isActive={activeTab === 'fines'} onClick={setActiveTab} />
          </div>
        </div>

        {/* Contenu principal selon l'onglet actif */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Statistiques principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard
                icon={BookOpen}
                title="Total Ouvrages"
                value={stats.totalBooks.toLocaleString()}
                subtitle="Dans le catalogue"
                color="primary"
              />
              <StatCard
                icon={Users}
                title="Emprunts Actifs"
                value={stats.totalLoans}
                subtitle="En cours"
                color="green"
              />
              <StatCard
                icon={AlertTriangle}
                title="Retards"
                value={stats.overdueLoans}
                subtitle="À traiter"
                color="red"
              />
              <StatCard
                icon={BookMarked}
                title="Réservations"
                value={stats.pendingReservations}
                subtitle="En attente"
                color="purple"
              />
              <StatCard
                icon={DollarSign}
                title="Amendes Collectées"
                value={formatPrice(stats.finesCollected)}
                subtitle="Ce mois"
                color="yellow"
              />
              <StatCard
                icon={UserPlus}
                title="Nouveaux Comptes"
                value={stats.newStudentAccounts}
                subtitle="Cette semaine"
                color="blue"
              />
            </div>

            {/* Actions rapides */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-primary-600" />
                Actions Rapides
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <QuickAction icon={Plus} label="Ajouter un Ouvrage" />
                <QuickAction icon={UserPlus} label="Créer un Compte" color="green" />
                <QuickAction icon={BookOpen} label="Nouveau Prêt" color="blue" />
                <QuickAction icon={Receipt} label="Gérer les Amendes" color="yellow" />
              </div>
            </div>

            {/* Activités récentes et livres en retard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-primary-600" />
                  Activités Récentes
                </h3>
                <div className="space-y-2">
                  {recentActivities.map(activity => (
                    <ActivityItem key={activity.id} activity={activity} />
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                  Livres en Retard ({overdueBooks.length})
                </h3>
                <div className="space-y-3">
                  {overdueBooks.map(item => (
                    <OverdueItem key={item.id} item={item} />
                  ))}
                </div>
                {overdueBooks.length > 3 && (
                  <button className="w-full mt-4 text-center text-primary-600 hover:text-primary-800 font-medium">
                    Voir tous les retards
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        {activeTab === 'loans' && <LoanManagement />}

        {activeTab === 'users' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Gestion des Utilisateurs</h3>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
                <UserPlus className="w-4 h-4 mr-2" />
                Créer un Compte Étudiant
              </button>
            </div>
            <div className="text-center py-16 text-gray-500">
              <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>Interface de gestion des utilisateurs en développement</p>
              <p className="text-sm mt-2">
                Permissions limitées : Création de comptes étudiants uniquement
              </p>
            </div>
          </div>
        )}
        {activeTab === 'catalog' && <CatalogManagement />}
        {activeTab === 'fines' && <FineManagement />}
      </div>
    </div>
  );
};

export default DashboardLibrarian;