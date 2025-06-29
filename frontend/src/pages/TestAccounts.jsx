import React from 'react';
import { useAuth } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, BookOpen, GraduationCap, Users, 
  LogIn, ArrowRight, Check, Star
} from 'lucide-react';

const TestAccounts = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const testAccounts = [
    {
      id: 'administrator',
      name: 'Administrateur Système',
      email: 'administrator@enspd.cm',
      password: 'admin123',
      role: 'administrator',
      icon: Shield,
      color: 'red',
      description: 'Accès complet au système',
      features: [
        'Gestion complète des utilisateurs',
        'Configuration système',
        'Rapports et statistiques',
        'Sauvegardes et maintenance',
        'Gestion des droits d\'accès'
      ],
      dashboard: '/dashboard/administrator'
    },
    {
      id: 'librarian',
      name: 'Bibliothécaire',
      email: 'librarian@enspd.cm',
      password: 'lib123',
      role: 'librarian',
      icon: BookOpen,
      color: 'blue',
      description: 'Gestion de la bibliothèque',
      features: [
        'Gestion du catalogue',
        'Emprunts et retours',
        'Création comptes étudiants',
        'Gestion amendes (≤ 5000 FCFA)',
        'Suivi des activités'
      ],
      dashboard: '/dashboard/librarian'
    },
    {
      id: 'teacher',
      name: 'Enseignant',
      email: 'teacher@enspd.cm',
      password: 'teach123',
      role: 'teacher',
      icon: GraduationCap,
      color: 'green',
      description: 'Privilèges enseignant',
      features: [
        '10 emprunts (30 jours)',
        '3 prolongations possibles',
        'Demandes d\'acquisition',
        'Recommandations d\'ouvrages',
        '5 réservations'
      ],
      dashboard: '/dashboard'
    },
    {
      id: 'student',
      name: 'Étudiant',
      email: 'student@enspd.cm',
      password: 'stud123',
      role: 'student',
      icon: Users,
      color: 'purple',
      description: 'Accès étudiant standard',
      features: [
        '3 emprunts (14 jours)',
        '1 prolongation possible',
        'Système de favoris',
        '3 réservations maximum',
        'Gestion du profil'
      ],
      dashboard: '/dashboard'
    }
  ];
  const handleLogin = async (account) => {
    try {
      await login({ email: account.email, password: account.password });
      navigate(account.dashboard);
    } catch (error) {
      console.error('Erreur de connexion:', error);
    }
  };

  const getColorClasses = (color) => {
    const colors = {
      red: {
        bg: 'from-red-500 to-red-600',
        border: 'border-red-200',
        text: 'text-red-600',
        bgLight: 'bg-red-50',
        button: 'bg-red-600 hover:bg-red-700'
      },
      blue: {
        bg: 'from-blue-500 to-blue-600',
        border: 'border-blue-200',
        text: 'text-blue-600',
        bgLight: 'bg-blue-50',
        button: 'bg-blue-600 hover:bg-blue-700'
      },
      green: {
        bg: 'from-green-500 to-green-600',
        border: 'border-green-200',
        text: 'text-green-600',
        bgLight: 'bg-green-50',
        button: 'bg-green-600 hover:bg-green-700'
      },
      purple: {
        bg: 'from-purple-500 to-purple-600',
        border: 'border-purple-200',
        text: 'text-purple-600',
        bgLight: 'bg-purple-50',
        button: 'bg-purple-600 hover:bg-purple-700'
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🧪 Comptes de Test - ENSPD Bibliothèque
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Testez les différents niveaux d'accès de l'application avec des comptes préconfigurés. 
            Chaque rôle dispose d'un dashboard spécialisé et de permissions adaptées.
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <Check className="w-4 h-4 mr-1" />
              Mode Développement
            </div>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              <Star className="w-4 h-4 mr-1" />
              Données de démonstration
            </div>
          </div>
        </div>

        {/* Account Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {testAccounts.map((account) => {
            const colors = getColorClasses(account.color);
            const Icon = account.icon;

            return (
              <div
                key={account.id}
                className={`bg-white rounded-2xl shadow-xl border-2 ${colors.border} hover:shadow-2xl transition-all duration-300 hover:scale-105`}
              >
                {/* Card Header */}
                <div className={`bg-gradient-to-r ${colors.bg} p-6 rounded-t-2xl`}>
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white text-center mb-2">
                    {account.name}
                  </h3>
                  <p className="text-white/90 text-center text-sm">
                    {account.description}
                  </p>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* Credentials */}
                  <div className={`${colors.bgLight} rounded-lg p-4 mb-6`}>
                    <h4 className={`font-semibold ${colors.text} mb-2`}>
                      Identifiants de connexion :
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email :</span>
                        <code className="bg-white px-2 py-1 rounded text-xs">
                          {account.email}
                        </code>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mot de passe :</span>
                        <code className="bg-white px-2 py-1 rounded text-xs">
                          {account.password}
                        </code>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Fonctionnalités :
                    </h4>
                    <ul className="space-y-2">
                      {account.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600">
                          <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Login Button */}                  <button
                    onClick={() => handleLogin(account)}
                    disabled={loading}
                    className={`w-full flex items-center justify-center px-4 py-3 rounded-xl text-white font-semibold ${colors.button} transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    {loading ? 'Connexion...' : 'Se connecter'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            📋 Instructions d'Utilisation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">🚀 Test Rapide :</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Cliquez sur "Se connecter" sur la carte de votre choix</li>
                <li>Vous serez automatiquement connecté et redirigé</li>
                <li>Explorez le dashboard correspondant à votre rôle</li>
                <li>Testez les fonctionnalités spécifiques</li>
                <li>Déconnectez-vous pour tester un autre rôle</li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">🔍 Points à Vérifier :</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Navigation différente selon le rôle</li>
                <li>Permissions d'accès restrictives</li>
                <li>Formatage des montants en FCFA</li>
                <li>Interfaces adaptées à chaque utilisateur</li>
                <li>Fonctionnalités spécialisées par rôle</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Back to App */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            ← Retour à l'application
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestAccounts;
