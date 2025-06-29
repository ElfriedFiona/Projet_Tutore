import React, { useState, useEffect } from 'react';
import { Clock, Calendar, RefreshCw, Eye, ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';
import ResponsiveDashboardContainer, { 
  ResponsiveDashboardGrid, 
  ResponsiveDashboardHeader,
  ResponsiveDashboardTabs,
  ResponsiveDashboardCard,
  ResponsiveDashboardActions
} from '../../components/dashboard/ResponsiveDashboardContainer';
import useResponsiveDashboard from '../../hooks/useResponsiveDashboard';
import api from '../../services/apiService'

const DashboardLoans = () => {
const [currentLoans, setCurrentLoans] = useState([]);
const [loanHistory, setLoanHistory] = useState([]);
const [activeTab, setActiveTab] = useState('current');
const [animate, setAnimate] = useState(false);
const { getGridConfig, isMobile } = useResponsiveDashboard();
const [activeLoansCount, setActiveLoansCount] = useState(0);

// Fonction pour formater un emprunt
const formatLoan = (e) => {
  return {
    id: e.id,
    title: e.ouvrage.titre || "Titre inconnu",
    author: e.ouvrage.auteur || "Auteur inconnu",
    isbn: e.ouvrage.isbn || "",
    borrowDate: e.dateEmprunt || e.created_at,
    dueDate: e.dateRetourPrevu || "",
    returnDate: e.dateRetourEffectif || "",
    status: e.statut === 'en cours' && new Date(e.dateRetourPrevu) < new Date()
      ? 'En retard'
      : e.statut === 'terminé'
      ? 'Retourné'
      : e.statut,
    renewals: e.nbProlongations || 0,
    maxRenewals: 3,
    coverImage: `http://localhost:8000/${e.ouvrage.imageCouverture}` || '/images/books/default.jpg',
    category: e.ouvrage.categorie?.nom || "Inconnu",
    pages: e.ouvrage.nbPages || 0,
    language: e.ouvrage.langue || "Français",
    condition: e.etatRetour || "",
  };
};

// --- Nouvelle fonction pour charger les emprunts ---
const fetchLoans = () => {
  api.get('/emprunts')
    .then(response => {
      const data = response.data;
      const actifs = data.filter(e => e.statut === 'en cours');
      const termines = data.filter(e => e.statut === 'terminé');

      setCurrentLoans(data.map(formatLoan));
      setLoanHistory(termines.map(formatLoan));
      setActiveLoansCount(actifs.length);
    })
    .catch(error => {
      console.error("Erreur lors du chargement des emprunts :", error);
    });
};

// Appeler fetchLoans au montage du composant
useEffect(() => {
  setAnimate(true); // Si c'est pour une animation à l'initialisation
  fetchLoans();
}, []); // Le tableau vide signifie que cet effet ne s'exécute qu'une fois au montage

const handleRenew = (loanId) => {
  api.post(`/emprunts/${loanId}/prolonger`)
    .then(() => {
      // Re-fetch data après un renouvellement réussi
      fetchLoans();
      alert("Prêt renouvelé avec succès !"); // Un petit feedback utilisateur est toujours bien
    })
    .catch(err => alert("Impossible de renouveler : " + err.response.data.message));
};

  const handleReturn = (loanId) => {
    api.post(`/emprunts/${loanId}/retour`, {
      etatRetour: 'Bon',
      notes: ''
    })
    .then((res) => {
      fetchLoans(); // recharge les emprunts
      alert(res.data.message); // utilise le message réel du backend
    })
    .catch(err => {
      const msg = err.response?.data?.message || "Une erreur est survenue.";
      alert("Erreur de retour : " + msg);
    });
  };


  // Enhanced helper functions
  // const handleRenew = (loanId) => {
  //   console.log('Renouveler l\'emprunt:', loanId);
  //   const button = document.querySelector(`[data-renew="${loanId}"]`);
  //   if (button) {
  //     button.classList.add('animate-pulse');
  //     setTimeout(() => button.classList.remove('animate-pulse'), 1000);
  //   }
  // };

  // const handleReturn = (loanId) => {
  //   console.log('Retourner le livre:', loanId);
  //   const card = document.querySelector(`[data-loan="${loanId}"]`);
  //   if (card) {
  //     card.classList.add('animate-bounce');
  //     setTimeout(() => card.classList.remove('animate-bounce'), 500);
  //   }
  // };

  const getStatusColor = (status) => {
    switch (status) {
      case 'En cours':
        return {
          bg: 'bg-gradient-to-r from-emerald-50 to-green-50',
          text: 'text-emerald-700',
          border: 'border-emerald-200',
          icon: '✅'
        };
      case 'En retard':
        return {
          bg: 'bg-gradient-to-r from-red-50 to-pink-50',
          text: 'text-red-700',
          border: 'border-red-200',
          icon: '⚠️'
        };
      case 'Retourné':
        return {
          bg: 'bg-gradient-to-r from-gray-50 to-slate-50',
          text: 'text-gray-700',
          border: 'border-gray-200',
          icon: '📝'
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-gray-50 to-slate-50',
          text: 'text-gray-700',
          border: 'border-gray-200',
          icon: '📖'
        };
    }
  };

  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUrgencyLevel = (daysRemaining) => {
    if (daysRemaining < 0) return 'overdue';
    if (daysRemaining <= 3) return 'urgent';
    if (daysRemaining <= 7) return 'warning';
    return 'normal';
  };
  const getCategoryColor = (category) => {
    const colors = {
      'Informatique': 'bg-primary-100 text-primary-800',
      'Mathématiques': 'bg-secondary-100 text-secondary-800',
      'Physique': 'bg-primary-200 text-primary-800',
      'IA': 'bg-secondary-200 text-secondary-800',
      'Art': 'bg-secondary-100 text-secondary-700',
      'Chimie': 'bg-primary-100 text-primary-700',
      'Psychologie': 'bg-neutral-200 text-neutral-800'
    };
    return colors[category] || 'bg-neutral-100 text-neutral-800';
  };

  const getBookIcon = (category) => {
    const icons = {
      'Informatique': '💻',
      'Mathématiques': '📐',
      'Physique': '⚛️',
      'IA': '🤖',
      'Art': '🎨',
      'Chimie': '🧪',
      'Psychologie': '🧠'
    };
    return icons[category] || '📖';
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-sm ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  }; return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-4 sm:p-6">
      {/* Enhanced Header */}
      <div className={`mb-8 transition-all duration-700 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 sm:p-8 border border-white/50 relative overflow-hidden">
          {/* Decoration background */}          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-secondary-500/5 to-primary-500/5"></div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary-400/10 to-secondary-400/10 rounded-full -translate-y-20 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-secondary-400/10 to-primary-400/10 rounded-full translate-y-16 -translate-x-16"></div>

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">📚</span>
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                    Mes Emprunts
                  </h1>
                  <p className="text-gray-600 text-lg">
                    Gérez vos emprunts de livres en toute simplicité
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 sm:gap-6">
                <div className="text-center group">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300 mb-2">
                    <span className="text-xl font-bold">{activeLoansCount}</span>
                  </div>
                  <div className="text-sm font-medium text-gray-700">Emprunts actifs</div>
                </div>

                <div className="text-center group">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 text-white rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300 mb-2">
                    <span className="text-xl font-bold">{loanHistory.length}</span>
                  </div>
                  <div className="text-sm font-medium text-gray-700">Retournés</div>
                </div>

                <div className="text-center group">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300 mb-2">
                    <span className="text-xl font-bold">{currentLoans.filter(loan => loan.status === 'En retard').length}</span>
                  </div>
                  <div className="text-sm font-medium text-gray-700">En retard</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overdue Alert */}
      {currentLoans.some(loan => loan.status === 'En retard') && (
        <div className="mb-6 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-4 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 text-xl">⚠️</span>
            </div>
            <div>
              <h3 className="text-red-800 font-semibold">Attention: Livres en retard</h3>
              <p className="text-red-700 text-sm">
                Vous avez {currentLoans.filter(loan => loan.status === 'En retard').length} livre(s) en retard.
                Veuillez les retourner rapidement pour éviter des pénalités.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Tabs */}
      <div className="mb-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-1">
          <div className="flex space-x-1 gap-4 p-2 w-full">
            <button
              onClick={() => setActiveTab('current')} className={`w-full py-3 px-6 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden ${activeTab === 'current'
                  ? 'bg-gradient-to-r from-primary-500 to-primary-700 text-white shadow-lg transform'
                  : 'text-gray-600 hover:text-neutral-800 hover:bg-primary-50'
                }`}
            >
              {activeTab === 'current' && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-primary-400/20 animate-pulse"></div>
              )}
              <span className="relative z-10">📖 Emprunts actuels ({currentLoans.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('history')} className={`w-full py-3 px-6 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden ${activeTab === 'history'
                  ? 'bg-gradient-to-r from-primary-500 to-primary-700 text-white shadow-lg transform'
                  : 'text-gray-600 hover:text-neutral-800 hover:bg-primary-50'
                }`}
            >
              {activeTab === 'history' && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-primary-400/20 animate-pulse"></div>
              )}
              <span className="relative z-10">📜 Historique ({loanHistory.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'current' && (
        <div className="space-y-6">
          {currentLoans.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-12 text-center border border-white/50">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Aucun emprunt actuel</h3>
              <p className="text-gray-600 mb-8 text-lg">Vous n'avez pas d'emprunts en cours. Explorez notre catalogue pour découvrir de nouveaux livres !</p>
              <a
                href="/catalog"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-700 text-white font-medium rounded-2xl hover:from-primary-600 hover:to-primary-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span className="mr-2">🔍</span>
                Parcourir le catalogue
              </a>
            </div>
          ) : (
            currentLoans.map((loan, index) => {
              const statusStyle = getStatusColor(loan.status);
              const daysRemaining = getDaysRemaining(loan.dueDate);
              const urgencyLevel = getUrgencyLevel(daysRemaining);

              return (
                <div
                  key={loan.id}
                  data-loan={loan.id}
                  className={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${animate ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Status bar at top */}
                  <div className={`h-2 ${urgencyLevel === 'overdue' ? 'bg-gradient-to-r from-red-500 to-pink-600' :
                    urgencyLevel === 'urgent' ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                      urgencyLevel === 'warning' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                        'bg-gradient-to-r from-green-500 to-emerald-500'}`}></div>

                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Enhanced book image */}
                      <div className="flex-shrink-0">
                        <div className="relative group">
                          {/* MODIFICATION ICI : Remplacement de l'icône par l'image de couverture */}
                          <img
                            src={loan.coverImage} 
                            alt={`Couverture de ${loan.title}`}
                            className="w-28 h-40 object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105"
                          />
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white text-xs font-bold">{loan.renewals}</span>
                          </div>
                        </div>
                      </div>

                      {/* Book information */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                          <div className="flex-1">
                            {/* Title and author */}
                            <div className="mb-4">
                              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 line-clamp-2">
                                {loan.title}
                              </h3>
                              <p className="text-gray-600 text-lg font-medium mb-2">par {loan.author}</p>

                              {/* Category */}
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(loan.category)}`}>
                                {/* MODIFICATION ICI : Remplacement de l'icône de catégorie par un emoji générique de livre */}
                                <span className="mr-1">📚</span> {loan.category}
                              </span>
                            </div>

                            {/* Detailed information */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                              <div className="space-y-2">
                                <div className="flex items-center text-sm text-gray-600">
                                  <span className="w-4 h-4 mr-2">📅</span>
                                  <span>Emprunté le {new Date(loan.borrowDate).toLocaleDateString('fr-FR')}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <span className="w-4 h-4 mr-2">⏰</span>
                                  <span>À rendre le {new Date(loan.dueDate).toLocaleDateString('fr-FR')}</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center text-sm text-gray-600">
                                  <span className="w-4 h-4 mr-2">📖</span>
                                  <span>{loan.pages} pages</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <span className="w-4 h-4 mr-2">⭐</span>
                                  <span>État: {loan.condition}</span>
                                </div>
                              </div>
                            </div>

                            {/* Status and deadline */}
                            <div className="flex flex-wrap items-center gap-3">
                              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                                <span className="mr-2">{statusStyle.icon}</span>
                                {loan.status}
                              </span>

                              {loan.status === 'En cours' && (
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${urgencyLevel === 'urgent' ? 'bg-orange-100 text-orange-800' :
                                  urgencyLevel === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-green-100 text-green-800'
                                  }`}>
                                  {daysRemaining > 0 ? `${daysRemaining} jour${daysRemaining > 1 ? 's' : ''} restant${daysRemaining > 1 ? 's' : ''}` : 'À rendre aujourd\'hui'}
                                </span>
                              )}

                              {loan.status === 'En retard' && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 animate-pulse">
                                  {Math.abs(daysRemaining)} jour{Math.abs(daysRemaining) > 1 ? 's' : ''} de retard
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Action buttons */}
                          <div className="flex flex-col gap-3 sm:w-auto w-full">
                            {loan.renewals < loan.maxRenewals && (
                              <button
                                onClick={() => handleRenew(loan.id)}
                                data-renew={loan.id}
                                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-700 text-white font-medium rounded-xl hover:from-primary-600 hover:to-primary-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                              >
                                <span className="mr-2">🔄</span>
                                Renouveler
                              </button>
                            )}
                            <button
                              onClick={() => handleReturn(loan.id)}
                              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-medium rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                              <span className="mr-2">📚</span>
                              Retourner
                            </button>

                            {loan.renewals >= loan.maxRenewals && (
                              <div className="text-center">
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                  Renouvellements épuisés
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-6">
          {loanHistory.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-12 text-center border border-white/50">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <span className="text-3xl">📜</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Aucun historique</h3>
              <p className="text-gray-600 text-lg">Vous n'avez pas encore retourné de livres.</p>
            </div>
          ) : (
            loanHistory.map((loan, index) => {
              const statusStyle = getStatusColor(loan.status);

              return (
                <div
                  key={loan.id}
                  className={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${animate ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="h-2 bg-gradient-to-r from-gray-400 to-gray-500"></div>

                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Book image */}
                      <div className="flex-shrink-0">
                        <div className="w-28 h-40 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 rounded-2xl flex items-center justify-center shadow-lg">
                          <span className="text-4xl">{getBookIcon(loan.category)}</span>
                        </div>
                      </div>

                      {/* Book information */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                          <div className="flex-1">
                            {/* Title and author */}
                            <div className="mb-4">
                              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                                {loan.title}
                              </h3>
                              <p className="text-gray-600 text-lg font-medium mb-2">par {loan.author}</p>

                              {/* Category */}
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(loan.category)}`}>
                                {getBookIcon(loan.category)} {loan.category}
                              </span>
                            </div>

                            {/* Loan dates */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                              <div className="space-y-2">
                                <div className="flex items-center text-sm text-gray-600">
                                  <span className="w-4 h-4 mr-2">📅</span>
                                  <span>Emprunté le {new Date(loan.borrowDate).toLocaleDateString('fr-FR')}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <span className="w-4 h-4 mr-2">✅</span>
                                  <span>Retourné le {new Date(loan.returnDate).toLocaleDateString('fr-FR')}</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center text-sm text-gray-600">
                                  <span className="w-4 h-4 mr-2">📖</span>
                                  <span>{loan.pages} pages</span>
                                </div>
                                {loan.rating && (
                                  <div className="flex items-center text-sm text-gray-600">
                                    <span className="w-4 h-4 mr-2">⭐</span>
                                    <div className="flex items-center space-x-1">
                                      {renderStars(loan.rating)}
                                      <span className="ml-1">({loan.rating}/5)</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Status */}
                            <div className="flex flex-wrap items-center gap-3">
                              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                                <span className="mr-2">{statusStyle.icon}</span>
                                {loan.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardLoans;
