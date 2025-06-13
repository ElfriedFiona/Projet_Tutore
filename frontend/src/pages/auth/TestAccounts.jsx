import React from 'react';
import { Link } from 'react-router-dom';
import { 
  User, Shield, BookOpen, GraduationCap, 
  UserCheck, Key, ArrowLeft, Info,
  UserCog, Users, Settings
} from 'lucide-react';

const TestAccounts = () => {
  const accounts = [
    {
      role: 'Administrator',
      icon: <UserCog className="w-6 h-6" />,
      email: 'administrator@enspd.cm',
      password: 'admin123',
      description: 'Accès complet au système - Dashboard Administrateur',
      features: [
        'Gestion complète des utilisateurs',
        'Configuration système',
        'Rapports et statistiques',
        'Sauvegardes et maintenance',
        'Gestion des droits d\'accès'
      ],
      color: 'red',
      dashboardPath: '/dashboard/administrator'
    },
    {
      role: 'Bibliothécaire',
      icon: <BookOpen className="w-6 h-6" />,
      email: 'librarian@enspd.cm',
      password: 'lib123',
      description: 'Gestion de la bibliothèque - Dashboard Bibliothécaire',
      features: [
        'Gestion du catalogue',
        'Emprunts et retours',
        'Création comptes étudiants',
        'Gestion amendes (≤ 5000 FCFA)',
        'Suivi des activités'
      ],
      color: 'blue',
      dashboardPath: '/dashboard/librarian'
    },
    {
      role: 'Enseignant',
      icon: <GraduationCap className="w-6 h-6" />,
      email: 'teacher@enspd.cm',
      password: 'teach123',
      description: 'Privilèges enseignant - Dashboard Standard+',
      features: [
        '10 emprunts (30 jours)',
        '3 prolongations possibles',
        'Demandes d\'acquisition',
        'Recommandations d\'ouvrages',
        '5 réservations'
      ],
      color: 'green',
      dashboardPath: '/dashboard'
    },
    {
      role: 'Étudiant',
      icon: <UserCheck className="w-6 h-6" />,
      email: 'student@enspd.cm',
      password: 'stud123',
      description: 'Accès étudiant - Dashboard Standard',
      features: [
        '3 emprunts (14 jours)',
        '1 prolongation possible',
        'Système de favoris',
        'Réservations (3 max)',
        'Gestion du profil'
      ],
      color: 'purple',
      dashboardPath: '/dashboard'
    },
    {
      role: 'Admin Legacy',
      icon: <Shield className="w-6 h-6" />,
      email: 'admin@example.com',
      password: 'password123',
      description: 'Ancien système admin - Page Admin classique',
      features: [
        'Interface d\'administration basique',
        'Statistiques globales',
        'Gestion basique',
        'Compatible ancien système'
      ],
      color: 'gray',
      dashboardPath: '/admin'
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-8">
      <div className="container mx-auto px-4">
        {/* En-tête */}
        <div className="mb-8">
          <Link 
            to="/login" 
            className="inline-flex items-center text-primary-600 hover:text-primary-800 mb-4 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la connexion
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <Key className="w-10 h-10 mr-3 text-primary-600" />
              Comptes de Test ENSPD
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Utilisez ces comptes pour tester les différents niveaux d'accès et dashboards 
              du système de bibliothèque universitaire
            </p>
          </div>
        </div>

        {/* Notice importante */}
        <div className="mb-8 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start">
            <Info className="w-6 h-6 text-amber-600 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-amber-800 mb-2">
                Information importante
              </h3>
              <p className="text-amber-700">
                Ces comptes sont configurés pour le développement et les tests. 
                Dans un environnement de production, les mots de passe seraient sécurisés 
                et la création de comptes se ferait via l'interface d'administration.
              </p>
            </div>
          </div>
        </div>

        {/* Comptes de test */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* En-tête colorée */}
              <div className={`bg-${account.color}-500 p-4 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {account.icon}
                    <h3 className="text-xl font-bold ml-3">{account.role}</h3>
                  </div>
                  <div className={`w-3 h-3 bg-${account.color}-300 rounded-full animate-pulse`}></div>
                </div>
                <p className="mt-2 text-sm opacity-90">{account.description}</p>
              </div>

              {/* Contenu */}
              <div className="p-6">
                {/* Identifiants */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Identifiants de connexion
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div>
                        <span className="text-sm text-gray-600">Email :</span>
                        <div className="font-mono text-sm font-medium text-gray-900">
                          {account.email}
                        </div>
                      </div>
                      <button
                        onClick={() => copyToClipboard(account.email)}
                        className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                      >
                        Copier
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div>
                        <span className="text-sm text-gray-600">Mot de passe :</span>
                        <div className="font-mono text-sm font-medium text-gray-900">
                          {account.password}
                        </div>
                      </div>
                      <button
                        onClick={() => copyToClipboard(account.password)}
                        className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                      >
                        Copier
                      </button>
                    </div>
                  </div>
                </div>

                {/* Fonctionnalités */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Settings className="w-4 h-4 mr-2" />
                    Fonctionnalités disponibles
                  </h4>
                  <ul className="space-y-2">
                    {account.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-700">
                        <span className={`w-2 h-2 bg-${account.color}-500 rounded-full mt-2 mr-3 flex-shrink-0`}></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <Link
                    to="/login"
                    state={{ email: account.email, password: account.password }}
                    className={`flex-1 bg-${account.color}-500 hover:bg-${account.color}-600 text-white px-4 py-2 rounded-lg text-center font-medium transition-colors`}
                  >
                    Se connecter
                  </Link>
                  <Link
                    to={account.dashboardPath}
                    className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-center font-medium transition-colors"
                  >
                    Voir Dashboard
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section guide rapide */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Users className="w-6 h-6 mr-3 text-primary-600" />
            Guide d'utilisation rapide
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                🎯 Pour tester les dashboards spécialisés :
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Connectez-vous avec un compte <strong>Administrator</strong> ou <strong>Bibliothécaire</strong></li>
                <li>Vous serez automatiquement redirigé vers le dashboard approprié</li>
                <li>Explorez les différents onglets et fonctionnalités</li>
                <li>Testez les permissions et restrictions de chaque rôle</li>
              </ol>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                🔐 Hiérarchie des permissions :
              </h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                  <strong>Administrator :</strong> Accès complet
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                  <strong>Bibliothécaire :</strong> Gestion bibliothèque
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                  <strong>Enseignant :</strong> Privilèges étendus
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                  <strong>Étudiant :</strong> Accès de base
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500">
          <p>
            💡 <strong>Astuce :</strong> Vous pouvez basculer entre les comptes pour tester 
            les différentes interfaces et niveaux d'accès sans vous déconnecter.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestAccounts;
