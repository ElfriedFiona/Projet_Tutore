import { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';

const Admin = () => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [statistics, setStatistics] = useState({
    totalBooks: 0,
    availableBooks: 0,
    totalUsers: 0,
    activeLoans: 0,
    pendingReservations: 0
  });
  
  useEffect(() => {
    // Simulate fetching admin statistics
    const fetchStatistics = async () => {
      // In a real app, this would be an actual API call
      try {
        setTimeout(() => {
          setStatistics({
            totalBooks: 12458,
            availableBooks: 10245,
            totalUsers: 3789,
            activeLoans: 2213,
            pendingReservations: 542
          });
          showToast('Statistiques chargées avec succès', 'success');
        }, 1000);
      } catch (error) {
        console.error("Erreur:", error);
        showToast('Erreur lors du chargement des statistiques', 'error');
      }
    };
    
    fetchStatistics();
  }, [showToast]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-white">
        <span className="text-indigo-400">Admin</span>istration
      </h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <div className="bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2 text-white">Menu d'administration</h2>
            
            <nav className="space-y-1">
              <button
                onClick={() => handleTabChange('dashboard')}
                className={`w-full text-left px-4 py-2 rounded-md flex items-center transition-all duration-200 ${
                  activeTab === 'dashboard' 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/50' 
                    : 'hover:bg-gray-700 text-gray-300 hover:text-white'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
                Tableau de bord
              </button>
              
              <button
                onClick={() => handleTabChange('books')}
                className={`w-full text-left px-4 py-2 rounded-md flex items-center transition-all duration-200 ${
                  activeTab === 'books' 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/50' 
                    : 'hover:bg-gray-700 text-gray-300 hover:text-white'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 005.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                Gestion des livres
              </button>
              
              <button
                onClick={() => handleTabChange('users')}
                className={`w-full text-left px-4 py-2 rounded-md flex items-center transition-all duration-200 ${
                  activeTab === 'users' 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/50' 
                    : 'hover:bg-gray-700 text-gray-300 hover:text-white'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                Gestion des utilisateurs
              </button>
              
              <button
                onClick={() => handleTabChange('loans')}
                className={`w-full text-left px-4 py-2 rounded-md flex items-center transition-all duration-200 ${
                  activeTab === 'loans' 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/50' 
                    : 'hover:bg-gray-700 text-gray-300 hover:text-white'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                </svg>
                Gestion des emprunts
              </button>
              
              <button
                onClick={() => handleTabChange('reservations')}
                className={`w-full text-left px-4 py-2 rounded-md flex items-center transition-all duration-200 ${
                  activeTab === 'reservations' 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/50' 
                    : 'hover:bg-gray-700 text-gray-300 hover:text-white'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Gestion des réservations
              </button>
              
              <button
                onClick={() => handleTabChange('reports')}
                className={`w-full text-left px-4 py-2 rounded-md flex items-center transition-all duration-200 ${
                  activeTab === 'reports' 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/50' 
                    : 'hover:bg-gray-700 text-gray-300 hover:text-white'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z" clipRule="evenodd" />
                </svg>
                Rapports
              </button>
            </nav>
          </div>
        </div>
        
        {/* Main content */}
        <div className="md:w-3/4">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700 hover:border-indigo-500/30 transition-colors duration-300">
                <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                  </svg>
                  Statistiques globales
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-gray-900/50 p-5 rounded-lg border border-gray-700 hover:border-indigo-600 transition-all duration-300 hover:transform hover:scale-[1.02]">
                    <p className="text-gray-400">Livres au total</p>
                    <p className="text-3xl font-bold text-white">{statistics.totalBooks}</p>
                    <div className="h-1 w-3/4 bg-indigo-600/50 mt-2 rounded-full"></div>
                  </div>
                  
                  <div className="bg-gray-900/50 p-5 rounded-lg border border-gray-700 hover:border-green-600 transition-all duration-300 hover:transform hover:scale-[1.02]">
                    <p className="text-gray-400">Livres disponibles</p>
                    <p className="text-3xl font-bold text-green-400">{statistics.availableBooks}</p>
                    <div className="flex items-center mt-1">
                      <div className="h-1 rounded-full bg-green-500 mr-2" style={{ width: `${Math.round((statistics.availableBooks / statistics.totalBooks) * 100)}%` }}></div>
                      <p className="text-xs text-gray-400">
                        {Math.round((statistics.availableBooks / statistics.totalBooks) * 100)}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/50 p-5 rounded-lg border border-gray-700 hover:border-purple-600 transition-all duration-300 hover:transform hover:scale-[1.02]">
                    <p className="text-gray-400">Utilisateurs</p>
                    <p className="text-3xl font-bold text-purple-400">{statistics.totalUsers}</p>
                    <div className="h-1 w-1/2 bg-purple-600/50 mt-2 rounded-full"></div>
                  </div>
                  
                  <div className="bg-gray-900/50 p-5 rounded-lg border border-gray-700 hover:border-yellow-600 transition-all duration-300 hover:transform hover:scale-[1.02]">
                    <p className="text-gray-400">Emprunts actifs</p>
                    <p className="text-3xl font-bold text-yellow-400">{statistics.activeLoans}</p>
                    <div className="h-1 w-1/3 bg-yellow-600/50 mt-2 rounded-full"></div>
                  </div>
                  
                  <div className="bg-gray-900/50 p-5 rounded-lg border border-gray-700 hover:border-red-600 transition-all duration-300 hover:transform hover:scale-[1.02]">
                    <p className="text-gray-400">Réservations en attente</p>
                    <p className="text-3xl font-bold text-red-400">{statistics.pendingReservations}</p>
                    <div className="h-1 w-1/4 bg-red-600/50 mt-2 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700 hover:border-indigo-500/30 transition-colors duration-300">
                <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Activité récente
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-900/50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Utilisateur
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Action
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Livre
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      <tr className="hover:bg-gray-700/50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          23 mai 2025, 09:45
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-white">Marie Dubois</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-900/30 text-green-400 border border-green-800">
                            Emprunt
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-300">
                          Les Misérables
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-700/50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          23 mai 2025, 09:30
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-white">Pierre Martin</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-900/30 text-blue-400 border border-blue-800">
                            Retour
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-300">
                          Introduction à l'algorithmique
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-700/50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          23 mai 2025, 09:15
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-white">Sophie Bernard</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-900/30 text-purple-400 border border-purple-800">
                            Réservation
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-300">
                          Histoire de France
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex-1 border border-gray-700 hover:border-indigo-500/30 transition-colors duration-300">
                  <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Livres populaires
                  </h2>
                  <ol className="space-y-3">
                    <li className="flex justify-between items-center p-2 bg-gray-900/30 rounded-md hover:bg-indigo-900/20 transition-colors duration-200">
                      <span className="flex items-center">
                        <span className="text-indigo-400 font-bold mr-2">1.</span> 
                        Introduction à l'algorithmique
                      </span>
                      <span className="text-gray-400 text-sm bg-gray-900/50 px-2 py-1 rounded">89 emprunts</span>
                    </li>
                    <li className="flex justify-between items-center p-2 bg-gray-900/30 rounded-md hover:bg-indigo-900/20 transition-colors duration-200">
                      <span className="flex items-center">
                        <span className="text-indigo-400 font-bold mr-2">2.</span> 
                        Les Misérables
                      </span>
                      <span className="text-gray-400 text-sm bg-gray-900/50 px-2 py-1 rounded">72 emprunts</span>
                    </li>
                    <li className="flex justify-between items-center p-2 bg-gray-900/30 rounded-md hover:bg-indigo-900/20 transition-colors duration-200">
                      <span className="flex items-center">
                        <span className="text-indigo-400 font-bold mr-2">3.</span> 
                        Apprendre Python
                      </span>
                      <span className="text-gray-400 text-sm bg-gray-900/50 px-2 py-1 rounded">65 emprunts</span>
                    </li>
                    <li className="flex justify-between items-center p-2 bg-gray-900/30 rounded-md hover:bg-indigo-900/20 transition-colors duration-200">
                      <span className="flex items-center">
                        <span className="text-indigo-400 font-bold mr-2">4.</span> 
                        Histoire de France
                      </span>
                      <span className="text-gray-400 text-sm bg-gray-900/50 px-2 py-1 rounded">57 emprunts</span>
                    </li>
                    <li className="flex justify-between items-center p-2 bg-gray-900/30 rounded-md hover:bg-indigo-900/20 transition-colors duration-200">
                      <span className="flex items-center">
                        <span className="text-indigo-400 font-bold mr-2">5.</span> 
                        Marketing Management
                      </span>
                      <span className="text-gray-400 text-sm bg-gray-900/50 px-2 py-1 rounded">45 emprunts</span>
                    </li>
                  </ol>
                </div>
                
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex-1 border border-gray-700 hover:border-indigo-500/30 transition-colors duration-300">
                  <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    Actions rapides
                  </h2>
                  <div className="space-y-3">
                    <button className="w-full py-3 px-4 text-left bg-indigo-900/20 hover:bg-indigo-900/40 text-indigo-300 hover:text-indigo-200 rounded-md transition-colors duration-200 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                        <path d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                      </svg>
                      Ajouter un nouveau livre
                    </button>
                    <button className="w-full py-3 px-4 text-left bg-green-900/20 hover:bg-green-900/40 text-green-300 hover:text-green-200 rounded-md transition-colors duration-200 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                      </svg>
                      Nouvel utilisateur
                    </button>
                    <button className="w-full py-3 px-4 text-left bg-yellow-900/20 hover:bg-yellow-900/40 text-yellow-300 hover:text-yellow-200 rounded-md transition-colors duration-200 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
                      </svg>
                      Nouvel emprunt
                    </button>
                    <button className="w-full py-3 px-4 text-left bg-purple-900/20 hover:bg-purple-900/40 text-purple-300 hover:text-purple-200 rounded-md transition-colors duration-200 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
                      </svg>
                      Générer un rapport
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'books' && (
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 005.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                Gestion des livres
              </h2>
              <div className="bg-indigo-900/20 p-6 rounded-lg border border-indigo-800 text-center">
                <p className="text-indigo-300">
                  Interface de gestion des livres à implémenter.
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 'users' && (
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                Gestion des utilisateurs
              </h2>
              <div className="bg-indigo-900/20 p-6 rounded-lg border border-indigo-800 text-center">
                <p className="text-indigo-300">
                  Interface de gestion des utilisateurs à implémenter.
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 'loans' && (
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                </svg>
                Gestion des emprunts
              </h2>
              <div className="bg-indigo-900/20 p-6 rounded-lg border border-indigo-800 text-center">
                <p className="text-indigo-300">
                  Interface de gestion des emprunts à implémenter.
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 'reservations' && (
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Gestion des réservations
              </h2>
              <div className="bg-indigo-900/20 p-6 rounded-lg border border-indigo-800 text-center">
                <p className="text-indigo-300">
                  Interface de gestion des réservations à implémenter.
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 'reports' && (
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z" clipRule="evenodd" />
                </svg>
                Rapports
              </h2>
              <div className="bg-indigo-900/20 p-6 rounded-lg border border-indigo-800 text-center">
                <p className="text-indigo-300">
                  Interface de génération de rapports à implémenter.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
