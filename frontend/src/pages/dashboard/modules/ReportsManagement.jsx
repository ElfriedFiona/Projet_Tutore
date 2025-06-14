import React, { useState, useEffect } from 'react';
import { 
  BarChart3, PieChart, TrendingUp, Users, BookOpen, Receipt,
  Calendar, Download, Filter, Search, Eye, Settings,
  Clock, Star, AlertTriangle, CheckCircle, FileText,
  Printer, Mail, Share2, RefreshCw, ChevronDown,
  ArrowUpRight, ArrowDownRight, Minus
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart as RechartsPieChart,
  Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const ReportsManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState({});

  // Données mock pour les graphiques
  const loansData = [
    { name: 'Lun', emprunts: 12, retours: 8, nouveaux: 4 },
    { name: 'Mar', emprunts: 19, retours: 15, nouveaux: 7 },
    { name: 'Mer', emprunts: 15, retours: 12, nouveaux: 5 },
    { name: 'Jeu', emprunts: 22, retours: 18, nouveaux: 8 },
    { name: 'Ven', emprunts: 28, retours: 20, nouveaux: 12 },
    { name: 'Sam', emprunts: 8, retours: 6, nouveaux: 2 },
    { name: 'Dim', emprunts: 5, retours: 4, nouveaux: 1 }
  ];

  const categoriesData = [
    { name: 'Sciences', value: 45, color: '#8884d8' },
    { name: 'Informatique', value: 32, color: '#82ca9d' },
    { name: 'Histoire', value: 28, color: '#ffc658' },
    { name: 'Littérature', value: 24, color: '#ff7300' },
    { name: 'Mathématiques', value: 27, color: '#8dd1e1' }
  ];

  const userStatsData = [
    { month: 'Jan', etudiants: 145, enseignants: 42, total: 187 },
    { month: 'Fév', etudiants: 156, enseignants: 45, total: 201 },
    { month: 'Mar', etudiants: 142, enseignants: 43, total: 185 },
    { month: 'Avr', etudiants: 159, enseignants: 47, total: 206 },
    { month: 'Mai', etudiants: 167, enseignants: 48, total: 215 },
    { month: 'Juin', etudiants: 152, enseignants: 46, total: 198 }
  ];

  const finesData = [
    { name: 'Retards', amount: 45000, count: 90 },
    { name: 'Pertes', amount: 125000, count: 5 },
    { name: 'Dégradations', amount: 32000, count: 8 }
  ];

  // Statistiques générales
  const stats = {
    totalBooks: 1248,
    totalUsers: 215,
    activeLoans: 89,
    overdueLoans: 12,
    totalFines: 202000,
    newBooksThisMonth: 24,
    newUsersThisMonth: 8,
    popularBook: "Introduction à la Physique Quantique",
    topUser: "Marie Kouassi (15 emprunts)"
  };

  const generateReport = async (type) => {
    setLoading(true);
    try {
      // Simulation de génération de rapport
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(`Génération du rapport ${type}`);
    } catch (error) {
      console.error('Erreur lors de la génération:', error);
    } finally {
      setLoading(false);
    }
  };

  // Composant pour les cartes de statistiques
  const StatCard = ({ icon: Icon, title, value, change, trend, color = 'primary' }) => {
    const colorClasses = {
      primary: 'from-primary-600 to-primary-700',
      blue: 'from-blue-600 to-blue-700',
      green: 'from-green-600 to-green-700',
      red: 'from-red-600 to-red-700',
      yellow: 'from-yellow-600 to-yellow-700',
      purple: 'from-purple-600 to-purple-700'
    };

    const getTrendIcon = () => {
      if (trend === 'up') return <ArrowUpRight className="w-4 h-4 text-green-600" />;
      if (trend === 'down') return <ArrowDownRight className="w-4 h-4 text-red-600" />;
      return <Minus className="w-4 h-4 text-gray-400" />;
    };

    const getTrendColor = () => {
      if (trend === 'up') return 'text-green-600';
      if (trend === 'down') return 'text-red-600';
      return 'text-gray-400';
    };

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            {change && (
              <div className={`flex items-center mt-2 text-sm ${getTrendColor()}`}>
                {getTrendIcon()}
                <span className="ml-1">{change}</span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    );
  };

  // Composant pour les rapports rapides
  const QuickReport = ({ title, description, icon: Icon, onGenerate, loading: reportLoading }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-all duration-200">
      <div className="flex items-start space-x-3">
        <div className="p-2 bg-primary-100 rounded-lg">
          <Icon className="w-5 h-5 text-primary-600" />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-gray-900">{title}</h4>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
          <button
            onClick={onGenerate}
            disabled={reportLoading}
            className="mt-3 inline-flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            {reportLoading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                Génération...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-1" />
                Générer
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <BarChart3 className="w-8 h-8 mr-3 text-primary-600" />
            Rapports et Analyses
          </h2>
          <p className="text-gray-600 mt-1">
            Statistiques détaillées et rapports d'activité
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="7days">7 derniers jours</option>
            <option value="30days">30 derniers jours</option>
            <option value="3months">3 derniers mois</option>
            <option value="year">Cette année</option>
          </select>
          <button
            onClick={() => window.print()}
            className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            <Printer className="w-4 h-4 mr-2" />
            Imprimer
          </button>
        </div>
      </div>

      {/* Navigation par onglets */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
            { id: 'loans', label: 'Emprunts', icon: BookOpen },
            { id: 'users', label: 'Utilisateurs', icon: Users },
            { id: 'fines', label: 'Amendes', icon: Receipt },
            { id: 'quick', label: 'Rapports Rapides', icon: FileText }
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
              </button>
            );
          })}
        </nav>
      </div>

      {/* Contenu selon l'onglet */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Statistiques principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              icon={BookOpen} 
              title="Total Livres" 
              value={stats.totalBooks.toLocaleString()}
              change="+24 ce mois"
              trend="up"
              color="primary"
            />
            <StatCard 
              icon={Users} 
              title="Utilisateurs Actifs" 
              value={stats.totalUsers}
              change="+8 ce mois"
              trend="up"
              color="blue"
            />
            <StatCard 
              icon={Clock} 
              title="Emprunts Actifs" 
              value={stats.activeLoans}
              change="-5 cette semaine"
              trend="down"
              color="green"
            />
            <StatCard 
              icon={AlertTriangle} 
              title="Retards" 
              value={stats.overdueLoans}
              change="Stable"
              trend="stable"
              color="red"
            />
          </div>

          {/* Graphiques principaux */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Activité des emprunts */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité des Emprunts</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={loansData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="emprunts" stackId="1" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="retours" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Répartition par catégories */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Emprunts par Catégorie</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Tooltip />
                  <RechartsPieChart data={categoriesData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value">
                    {categoriesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </RechartsPieChart>
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Informations rapides */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Livre le Plus Populaire</h3>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{stats.popularBook}</p>
                  <p className="text-sm text-gray-600">23 emprunts ce mois</p>
                  <div className="flex items-center mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">4.8/5</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Utilisateur le Plus Actif</h3>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{stats.topUser}</p>
                  <p className="text-sm text-gray-600">Étudiant en Génie Informatique</p>
                  <p className="text-sm text-green-600 mt-1">Aucun retard</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'loans' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Évolution des emprunts */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Évolution des Emprunts</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={loansData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="emprunts" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="retours" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Nouveaux emprunts */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nouveaux Emprunts</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={loansData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="nouveaux" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Statistiques détaillées */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
              icon={BookOpen} 
              title="Emprunts Aujourd'hui" 
              value="15"
              change="+3 vs hier"
              trend="up"
              color="primary"
            />
            <StatCard 
              icon={CheckCircle} 
              title="Retours à Temps" 
              value="92%"
              change="+2% vs semaine dernière"
              trend="up"
              color="green"
            />
            <StatCard 
              icon={Clock} 
              title="Durée Moyenne" 
              value="11 jours"
              change="-1 jour vs mois dernier"
              trend="down"
              color="blue"
            />
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-6">
          {/* Évolution des utilisateurs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Évolution des Utilisateurs</h3>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={userStatsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="etudiants" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="enseignants" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Statistiques utilisateurs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard 
              icon={Users} 
              title="Étudiants" 
              value="167"
              change="+8 ce mois"
              trend="up"
              color="blue"
            />
            <StatCard 
              icon={Users} 
              title="Enseignants" 
              value="48"
              change="+1 ce mois"
              trend="up"
              color="green"
            />
            <StatCard 
              icon={CheckCircle} 
              title="Comptes Actifs" 
              value="96%"
              change="Stable"
              trend="stable"
              color="primary"
            />
            <StatCard 
              icon={Clock} 
              title="Dernière Connexion" 
              value="2h"
              change="Moyenne quotidienne"
              trend="stable"
              color="purple"
            />
          </div>
        </div>
      )}

      {activeTab === 'fines' && (
        <div className="space-y-6">
          {/* Répartition des amendes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Amendes par Type</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={finesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value.toLocaleString()} FCFA`, 'Montant']} />
                  <Bar dataKey="amount" fill="#ff7300" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nombre d'Incidents</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Tooltip />
                  <RechartsPieChart data={finesData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="count">
                    {finesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#ff7300', '#8884d8', '#82ca9d'][index]} />
                    ))}
                  </RechartsPieChart>
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Statistiques amendes */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard 
              icon={Receipt} 
              title="Total Amendes" 
              value="202 000 FCFA"
              change="+15 000 ce mois"
              trend="up"
              color="red"
            />
            <StatCard 
              icon={Clock} 
              title="En Attente" 
              value="45 000 FCFA"
              change="12 cas"
              trend="stable"
              color="yellow"
            />
            <StatCard 
              icon={CheckCircle} 
              title="Payées" 
              value="157 000 FCFA"
              change="89% du total"
              trend="up"
              color="green"
            />
            <StatCard 
              icon={AlertTriangle} 
              title="Moyenne/Incident" 
              value="1 960 FCFA"
              change="+200 vs mois dernier"
              trend="up"
              color="purple"
            />
          </div>
        </div>
      )}

      {activeTab === 'quick' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <QuickReport
              title="Rapport d'Inventaire"
              description="Liste complète des ouvrages avec statut et localisation"
              icon={BookOpen}
              onGenerate={() => generateReport('inventory')}
              loading={loading}
            />
            <QuickReport
              title="Rapport des Emprunts"
              description="Historique détaillé des emprunts par période"
              icon={Calendar}
              onGenerate={() => generateReport('loans')}
              loading={loading}
            />
            <QuickReport
              title="Rapport des Retards"
              description="Liste des emprunts en retard avec amendes"
              icon={AlertTriangle}
              onGenerate={() => generateReport('overdue')}
              loading={loading}
            />
            <QuickReport
              title="Rapport Financier"
              description="Récapitulatif des amendes et paiements"
              icon={Receipt}
              onGenerate={() => generateReport('financial')}
              loading={loading}
            />
            <QuickReport
              title="Rapport d'Activité"
              description="Statistiques d'utilisation du système"
              icon={TrendingUp}
              onGenerate={() => generateReport('activity')}
              loading={loading}
            />
            <QuickReport
              title="Rapport Utilisateurs"
              description="Liste des utilisateurs avec statistiques"
              icon={Users}
              onGenerate={() => generateReport('users')}
              loading={loading}
            />
          </div>

          {/* Rapports programmés */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rapports Programmés</h3>
            <div className="space-y-4">
              {[
                { name: 'Rapport Mensuel - Emprunts', frequency: 'Chaque 1er du mois', nextRun: '01/02/2024', status: 'active' },
                { name: 'Rapport Hebdomadaire - Retards', frequency: 'Tous les lundis', nextRun: '29/01/2024', status: 'active' },
                { name: 'Rapport Trimestriel - Inventaire', frequency: 'Tous les 3 mois', nextRun: '01/04/2024', status: 'paused' }
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{report.name}</h4>
                    <p className="text-sm text-gray-600">{report.frequency}</p>
                    <p className="text-xs text-gray-500">Prochaine exécution : {report.nextRun}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      report.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {report.status === 'active' ? 'Actif' : 'Suspendu'}
                    </span>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsManagement;
