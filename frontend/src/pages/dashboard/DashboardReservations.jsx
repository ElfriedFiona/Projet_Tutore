import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Eye, X, CheckCircle, AlertTriangle, BookOpen, User } from 'lucide-react';
import ResponsiveDashboardContainer, { 
  ResponsiveDashboardGrid, 
  ResponsiveDashboardHeader,
  ResponsiveDashboardCard,
  ResponsiveDashboardTabs,
  ResponsiveDashboardActions
} from '../../components/dashboard/ResponsiveDashboardContainer';
import useResponsiveDashboard from '../../hooks/useResponsiveDashboard';

const DashboardReservations = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  // Enhanced mock data with comprehensive information
  const activeReservations = [
    {
      id: 1,
      title: "Algorithmique et Programmation",
      author: "Thomas Cormen",
      isbn: "978-0262033848",
      reservationDate: "2024-11-20",
      expectedDate: "2024-12-05",
      status: "En attente",
      position: 2,
      totalQueue: 5,
      coverImage: "/images/books/book1.jpg",
      category: "Informatique",
      pages: 1312,
      priority: "normal"
    },
    {
      id: 2,
      title: "Intelligence Artificielle",
      author: "Stuart Russell",
      isbn: "978-0136042594",
      reservationDate: "2024-11-22",
      expectedDate: "2024-12-01",
      status: "Disponible",
      position: 1,
      totalQueue: 1,
      coverImage: "/images/books/book2.jpg",
      category: "IA",
      pages: 1152,
      priority: "urgent",
      availableUntil: "2024-12-03"
    },
    {
      id: 3,
      title: "Mathématiques Discrètes",
      author: "Kenneth Rosen",
      isbn: "978-0073383095",
      reservationDate: "2024-11-18",
      expectedDate: "2024-12-10",
      status: "En attente",
      position: 1,
      totalQueue: 3,
      coverImage: "/images/books/book3.jpg",
      category: "Mathématiques",
      pages: 1024,
      priority: "normal"
    }
  ];

  const reservationHistory = [
    {
      id: 4,
      title: "Base de Données",
      author: "Ramez Elmasri",
      isbn: "978-0321122267",
      reservationDate: "2024-10-15",
      completedDate: "2024-10-28",
      status: "Complétée",
      borrowed: true,
      coverImage: "/images/books/book4.jpg",
      category: "Informatique",
      pages: 864,
      rating: 4.5
    },
    {
      id: 5,
      title: "Réseaux Informatiques",
      author: "Andrew Tanenbaum",
      isbn: "978-0132126953",
      reservationDate: "2024-10-10",
      completedDate: "2024-10-20",
      status: "Expirée",
      borrowed: false,
      coverImage: "/images/books/book5.jpg",
      category: "Informatique",
      pages: 960
    },
    {
      id: 6,
      title: "Analyse Numérique",
      author: "Richard Burden",
      isbn: "978-1305253667",
      reservationDate: "2024-09-20",
      completedDate: "2024-10-05",
      status: "Complétée",
      borrowed: true,
      coverImage: "/images/books/book6.jpg",
      category: "Mathématiques",
      pages: 888,
      rating: 4.2
    }
  ];

  // Enhanced helper functions
  const handleCancelReservation = (reservationId) => {
    console.log('Annuler la réservation:', reservationId);
    const card = document.querySelector(`[data-reservation="${reservationId}"]`);
    if (card) {
      card.classList.add('animate-pulse');
      setTimeout(() => card.classList.remove('animate-pulse'), 1000);
    }
  };

  const handleBorrowBook = (reservationId) => {
    console.log('Emprunter le livre:', reservationId);
    const button = document.querySelector(`[data-borrow="${reservationId}"]`);
    if (button) {
      button.classList.add('animate-bounce');
      setTimeout(() => button.classList.remove('animate-bounce'), 500);
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case 'En attente':
        return {
          bg: 'bg-gradient-to-r from-secondary-50 to-secondary-100',
          text: 'text-secondary-700',
          border: 'border-secondary-200',
          icon: '⏳'
        };
      case 'Disponible':
        return {
          bg: 'bg-gradient-to-r from-green-50 to-emerald-50',
          text: 'text-green-700',
          border: 'border-green-200',
          icon: '✅'
        };
      case 'Complétée':
        return {
          bg: 'bg-gradient-to-r from-primary-50 to-primary-100',
          text: 'text-primary-700',
          border: 'border-primary-200',
          icon: '📖'
        };
      case 'Expirée':
        return {
          bg: 'bg-gradient-to-r from-red-50 to-pink-50',
          text: 'text-red-700',
          border: 'border-red-200',
          icon: '⚠️'
        };
      case 'Annulée':
        return {
          bg: 'bg-gradient-to-r from-neutral-50 to-neutral-100',
          text: 'text-neutral-700',
          border: 'border-neutral-200',
          icon: '❌'
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-neutral-50 to-neutral-100',
          text: 'text-neutral-700',
          border: 'border-neutral-200',
          icon: '📋'
        };
    }
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
    return icons[category] || '📚';
  };
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-secondary-100 text-secondary-800 border-secondary-200';
      case 'normal':
        return 'bg-primary-100 text-primary-800 border-primary-200';
      case 'low':
        return 'bg-neutral-100 text-neutral-800 border-neutral-200';
      default:
        return 'bg-primary-100 text-primary-800 border-primary-200';
    }
  };
  const getEstimatedWaitTime = (position) => {
    const weeksToWait = position * 2;
    return `${weeksToWait} semaine${weeksToWait > 1 ? 's' : ''}`;
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-sm ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  const getDaysRemaining = (date) => {
    const today = new Date();
    const target = new Date(date);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  return (
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
                  <span className="text-2xl">📋</span>
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                    Mes Réservations
                  </h1>
                  <p className="text-gray-600 text-lg">
                    Gérez vos réservations de livres en toute simplicité
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 sm:gap-6">
                <div className="text-center group">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300 mb-2">
                    <span className="text-xl font-bold">{activeReservations.length}</span>
                  </div>
                  <div className="text-sm font-medium text-gray-700">Réservations actives</div>
                </div>
                
                <div className="text-center group">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 text-white rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300 mb-2">
                    <span className="text-xl font-bold">{activeReservations.filter(r => r.status === 'Disponible').length}</span>
                  </div>
                  <div className="text-sm font-medium text-gray-700">Disponibles</div>
                </div>
                  <div className="text-center group">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-700 text-white rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300 mb-2">
                    <span className="text-xl font-bold">{activeReservations.filter(r => r.status === 'En attente').length}</span>
                  </div>
                  <div className="text-sm font-medium text-gray-700">En attente</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Books Alert */}
      {activeReservations.some(reservation => reservation.status === 'Disponible') && (
        <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-xl">✅</span>
            </div>
            <div>
              <h3 className="text-green-800 font-semibold">Livres disponibles !</h3>
              <p className="text-green-700 text-sm">
                Vous avez {activeReservations.filter(r => r.status === 'Disponible').length} livre(s) prêt(s) à être emprunté(s). 
                N'oubliez pas de les récupérer avant expiration !
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Tabs */}
      <div className="mb-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-1">
          <div className="flex space-x-1">            <button
              onClick={() => setActiveTab('active')}
              className={`flex-1 py-3 px-6 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                activeTab === 'active'
                  ? 'bg-gradient-to-r from-primary-500 to-primary-700 text-white shadow-lg transform'
                  : 'text-gray-600 hover:text-neutral-700 hover:bg-primary-50'
              }`}
            >
              {activeTab === 'active' && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-primary-600/20 animate-pulse"></div>
              )}
              <span className="relative z-10">📋 Réservations actives ({activeReservations.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-3 px-6 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                activeTab === 'history'
                  ? 'bg-gradient-to-r from-primary-500 to-primary-700 text-white shadow-lg transform'
                  : 'text-gray-600 hover:text-neutral-700 hover:bg-primary-50'
              }`}
            >
              {activeTab === 'history' && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-primary-600/20 animate-pulse"></div>
              )}
              <span className="relative z-10">📜 Historique ({reservationHistory.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'active' && (
        <div className="space-y-6">
          {activeReservations.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-12 text-center border border-white/50">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <span className="text-3xl">📋</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Aucune réservation active</h3>
              <p className="text-gray-600 mb-8 text-lg">Vous n'avez pas de réservations en cours. Explorez notre catalogue pour réserver vos livres préférés !</p>              <a
                href="/catalog"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-700 text-white font-medium rounded-2xl hover:from-primary-600 hover:to-primary-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span className="mr-2">🔍</span>
                Parcourir le catalogue
              </a>
            </div>
          ) : (
            activeReservations.map((reservation, index) => {
              const statusStyle = getStatusColor(reservation.status);
              const daysToExpire = reservation.availableUntil ? getDaysRemaining(reservation.availableUntil) : null;
              
              return (
                <div 
                  key={reservation.id} 
                  data-reservation={reservation.id}
                  className={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${
                    animate ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >                  {/* Status bar at top */}
                  <div className={`h-2 ${reservation.status === 'Disponible' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 
                    reservation.status === 'En attente' ? 'bg-gradient-to-r from-secondary-500 to-secondary-600' :
                    'bg-gradient-to-r from-neutral-400 to-neutral-500'}`}></div>
                  
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Enhanced book image */}
                      <div className="flex-shrink-0">
                        <div className="relative group">                          <div className="w-28 h-40 bg-gradient-to-br from-primary-100 via-secondary-100 to-primary-100 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                            <span className="text-4xl">{getBookIcon(reservation.category)}</span>
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white text-xs font-bold">{reservation.position}</span>
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
                                {reservation.title}
                              </h3>
                              <p className="text-gray-600 text-lg font-medium mb-2">par {reservation.author}</p>
                              
                              {/* Category and Priority */}
                              <div className="flex items-center gap-2 mb-2">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(reservation.category)}`}>
                                  {getBookIcon(reservation.category)} {reservation.category}
                                </span>
                                {reservation.priority && (
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(reservation.priority)}`}>
                                    {reservation.priority === 'urgent' ? '🔥' : reservation.priority === 'high' ? '⚡' : '📌'} {reservation.priority}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Detailed information */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                              <div className="space-y-2">
                                <div className="flex items-center text-sm text-gray-600">
                                  <span className="w-4 h-4 mr-2">📅</span>
                                  <span>Réservé le {new Date(reservation.reservationDate).toLocaleDateString('fr-FR')}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <span className="w-4 h-4 mr-2">⏰</span>
                                  <span>Attendu le {new Date(reservation.expectedDate).toLocaleDateString('fr-FR')}</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center text-sm text-gray-600">
                                  <span className="w-4 h-4 mr-2">📖</span>
                                  <span>{reservation.pages} pages</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <span className="w-4 h-4 mr-2">👥</span>
                                  <span>File d'attente: {reservation.totalQueue} personne(s)</span>
                                </div>
                              </div>
                            </div>

                            {/* Status and queue information */}
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                                <span className="mr-2">{statusStyle.icon}</span>
                                {reservation.status}
                              </span>
                                {reservation.status === 'En attente' && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                                  Position {reservation.position}/{reservation.totalQueue}
                                </span>
                              )}
                                {reservation.status === 'Disponible' && daysToExpire && (
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                  daysToExpire <= 1 ? 'bg-red-100 text-red-800 animate-pulse' : 'bg-secondary-100 text-secondary-800'
                                }`}>
                                  {daysToExpire > 0 ? `Expire dans ${daysToExpire} jour${daysToExpire > 1 ? 's' : ''}` : 'Expire aujourd\'hui !'}
                                </span>
                              )}
                            </div>

                            {/* Progress bar for waiting reservations */}
                            {reservation.status === 'En attente' && (
                              <div className="mb-4">
                                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                                  <span>Progression dans la file</span>
                                  <span>{Math.round(((reservation.totalQueue - reservation.position + 1) / reservation.totalQueue) * 100)}%</span>
                                </div>                                <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                                  <div 
                                    className="bg-gradient-to-r from-primary-500 to-primary-700 h-3 rounded-full transition-all duration-500 shadow-lg"
                                    style={{ width: `${((reservation.totalQueue - reservation.position + 1) / reservation.totalQueue) * 100}%` }}
                                  ></div>
                                </div>                                <div className="text-xs text-gray-500 mt-1">
                                  Temps d'attente estimé: {getEstimatedWaitTime(reservation.position)}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Action buttons */}
                          <div className="flex flex-col gap-3 sm:w-auto w-full">
                            {reservation.status === 'Disponible' ? (
                              <button
                                onClick={() => handleBorrowBook(reservation.id)}
                                data-borrow={reservation.id}
                                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                              >
                                <span className="mr-2">📚</span>
                                Emprunter maintenant
                              </button>
                            ) : (                              <button
                                onClick={() => handleCancelReservation(reservation.id)}
                                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                              >
                                <span className="mr-2">❌</span>
                                Annuler
                              </button>
                            )}
                            
                            <button className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-neutral-500 to-neutral-600 text-white font-medium rounded-xl hover:from-neutral-600 hover:to-neutral-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                              <span className="mr-2">ℹ️</span>
                              Détails
                            </button>
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
          {reservationHistory.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-12 text-center border border-white/50">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <span className="text-3xl">📜</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Aucun historique</h3>
              <p className="text-gray-600 text-lg">Votre historique de réservations apparaîtra ici.</p>
            </div>
          ) : (
            reservationHistory.map((reservation, index) => {
              const statusStyle = getStatusColor(reservation.status);
              
              return (
                <div 
                  key={reservation.id} 
                  className={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${
                    animate ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`h-2 ${reservation.status === 'Complétée' ? 'bg-gradient-to-r from-primary-400 to-primary-500' : 'bg-gradient-to-r from-red-400 to-red-500'}`}></div>
                  
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Book image */}
                      <div className="flex-shrink-0">                        <div className="w-28 h-40 bg-gradient-to-br from-primary-100 via-secondary-100 to-primary-100 rounded-2xl flex items-center justify-center shadow-lg">
                          <span className="text-4xl">{getBookIcon(reservation.category)}</span>
                        </div>
                      </div>

                      {/* Book information */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                          <div className="flex-1">
                            {/* Title and author */}
                            <div className="mb-4">
                              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                                {reservation.title}
                              </h3>
                              <p className="text-gray-600 text-lg font-medium mb-2">par {reservation.author}</p>
                              
                              {/* Category */}
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(reservation.category)}`}>
                                {getBookIcon(reservation.category)} {reservation.category}
                              </span>
                            </div>

                            {/* Reservation dates */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                              <div className="space-y-2">
                                <div className="flex items-center text-sm text-gray-600">
                                  <span className="w-4 h-4 mr-2">📅</span>
                                  <span>Réservé le {new Date(reservation.reservationDate).toLocaleDateString('fr-FR')}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <span className="w-4 h-4 mr-2">{reservation.status === 'Complétée' ? '✅' : '⚠️'}</span>
                                  <span>
                                    {reservation.status === 'Complétée' ? 'Emprunté' : 'Expiré'} le {new Date(reservation.completedDate).toLocaleDateString('fr-FR')}
                                  </span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center text-sm text-gray-600">
                                  <span className="w-4 h-4 mr-2">📖</span>
                                  <span>{reservation.pages} pages</span>
                                </div>
                                {reservation.rating && (
                                  <div className="flex items-center text-sm text-gray-600">
                                    <span className="w-4 h-4 mr-2">⭐</span>
                                    <div className="flex items-center space-x-1">
                                      {renderStars(reservation.rating)}
                                      <span className="ml-1">({reservation.rating}/5)</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Status and outcome */}
                            <div className="flex flex-wrap items-center gap-3">
                              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                                <span className="mr-2">{statusStyle.icon}</span>
                                {reservation.status}
                              </span>
                              
                              {reservation.status === 'Complétée' && reservation.borrowed && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                  ✓ Livre emprunté avec succès
                                </span>
                              )}
                              
                              {reservation.status === 'Expirée' && !reservation.borrowed && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                                  ✗ Réservation non utilisée
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Action button */}
                          <div className="flex flex-col gap-3 sm:w-auto w-full">
                            <button className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                              <span className="mr-2">🔄</span>
                              Réserver à nouveau
                            </button>
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

      {/* Enhanced Tips Section */}
      <div className="mt-8 bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 rounded-3xl p-6 sm:p-8 border border-purple-200 shadow-lg">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
            <span className="text-2xl">💡</span>
          </div>
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-800 to-pink-800 bg-clip-text text-transparent mb-4">
              Conseils pour vos réservations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="text-purple-600 mt-1 flex-shrink-0">⏰</span>
                  <span className="text-purple-800 text-sm">Les réservations sont valides pendant 48h une fois le livre disponible</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-purple-600 mt-1 flex-shrink-0">📧</span>
                  <span className="text-purple-800 text-sm">Vous recevrez une notification par email quand votre livre sera disponible</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="text-purple-600 mt-1 flex-shrink-0">📊</span>
                  <span className="text-purple-800 text-sm">Vous pouvez avoir maximum 5 réservations actives simultanément</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-purple-600 mt-1 flex-shrink-0">🔔</span>
                  <span className="text-purple-800 text-sm">Activez les notifications pour ne pas manquer vos livres disponibles</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardReservations;
