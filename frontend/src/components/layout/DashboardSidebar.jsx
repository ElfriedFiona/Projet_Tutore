import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import useBreakpoint from '../../hooks/useBreakpoint';
import '../../styles/sidebar.css';

const DashboardSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userType, setUserType] = useState('student');

  // Hook pour gérer les breakpoints responsives
  const { isMobile, isTablet, isDesktop, breakpoint } = useBreakpoint();  // Gérer le resize pour fermer le menu mobile automatiquement et ajuster l'état
  useEffect(() => {
    // Fermer le menu mobile automatiquement sur desktop
    if (isDesktop) {
      setIsMobileMenuOpen(false);
    }
  }, [isDesktop]);

  // Mettre à jour la marge du contenu principal selon l'état et la taille d'écran
  useEffect(() => {
    const updateContentMargin = () => {
      const main = document.querySelector('main');
      if (!main) return;

      if (isDesktop) {
        // Desktop: marge selon l'état collapsed
        main.style.marginLeft = isCollapsed ? '4rem' : '16rem'; // w-16 = 4rem, w-64 = 16rem
        main.style.transition = 'margin-left 0.3s ease-in-out';
      } else if (isTablet) {
        // Tablet: sidebar collapsée fixe
        main.style.marginLeft = '4rem'; // w-16 = 4rem
        main.style.transition = 'margin-left 0.3s ease-in-out';
      } else {
        // Mobile: pas de marge (overlay)
        main.style.marginLeft = '0';
        main.style.transition = 'margin-left 0.3s ease-in-out';
      }
    };

    updateContentMargin();
  }, [isCollapsed, isDesktop, isTablet, isMobile]);

  // Menu items for different user types
  const studentMenuItems = [
    {
      name: 'Catalogue',
      path: '/catalog',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      name: 'Mes Emprunts',
      path: '/dashboard/loans',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      badge: '3'
    },
    {
      name: 'Mes Réservations',
      path: '/dashboard/reservations',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h3z" />
        </svg>
      ),
      badge: '2'
    },
    {
      name: 'Mes Favoris',
      path: '/dashboard/favorites',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      name: 'Mon Profil',
      path: '/dashboard/profile',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
  ];

  const teacherMenuItems = [
    ...studentMenuItems,
    {
      name: 'Mes Recommandations',
      path: '/dashboard/recommendations',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      badge: '2'
    }
  ];

  const librarianMenuItems = [
    {
      name: 'Tableau de Bord',
      path: '/dashboard/librarian',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      name: 'Gestion Catalogue',
      path: '/dashboard/catalog-management',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      name: 'Prêts et Retours',
      path: '/dashboard/loans-management',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      badge: '23'
    },
    {
      name: 'Gestion Amendes',
      path: '/dashboard/fines-management',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      )
    },
    {
      name: 'Mon Profil',
      path: '/dashboard/profile',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
  ];

  const administratorMenuItems = [
    {
      name: 'Tableau de Bord',
      path: '/dashboard/administrator',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      name: 'Système & Sécurité',
      path: '/dashboard/system',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      name: 'Gestion Utilisateurs',
      path: '/dashboard/user-management',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      )
    },
    {
      name: 'Droits d\'Accès',
      path: '/dashboard/permissions',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      )
    },
    {
      name: 'Rapports',
      path: '/dashboard/reports',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      name: 'Sauvegardes',
      path: '/dashboard/backups',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      )
    },
    {
      name: 'Mon Profil',
      path: '/dashboard/profile',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
  ];

  // Determine menu items based on user role
  const getMenuItems = () => {
    if (userType === 'admin' || userType === 'administrator') {
      return administratorMenuItems;
    } else if (userType === 'librarian') {
      return librarianMenuItems;
    } else if (userType === 'teacher') {
      return teacherMenuItems;
    } else {
      return studentMenuItems;
    }
  };

  const menuItems = getMenuItems();

  // Mock user data for display - utilise l'état local au lieu du contexte
  const mockUser = {
    firstName: userType === 'admin' || userType === 'administrator' ? 'Admin' :
      userType === 'librarian' ? 'Bibliothécaire' :
        userType === 'teacher' ? 'Professeur' : 'Étudiant',
    lastName: 'Test',
    userType: userType
  };

  // Fonction pour changer le type d'utilisateur (navigation manuelle)
  const handleUserTypeChange = (newUserType) => {
    setUserType(newUserType);
  };

  // Fonction pour gérer le toggle de la sidebar desktop
  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Fonction pour gérer le menu mobile
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Fermer le menu mobile lors du clic sur un lien
  const handleMenuItemClick = () => {
    setIsMobileMenuOpen(false);
  };
  return (
    <>
      {/* Bouton menu burger pour mobile/tablet (visible jusqu'à md) */}      
      <button
        className={`
          md:hidden fixed top-4 left-4 z-[9999] p-3 
          bg-gradient-to-r from-primary-500 to-primary-600 
          rounded-lg shadow-lg border border-primary-200
          hover:from-primary-600 hover:to-primary-700
          transform transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'hidden' : 'hover:scale-105'}
          focus:outline-none focus:ring-4 focus:ring-primary-200
          animate-pulse-glow
        `}
        onClick={handleMobileMenuToggle}
        aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={isMobileMenuOpen}
      >
        <div className={`transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180' : ''}`}>
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </div>
      </button>

      {/* Overlay pour mobile/tablet avec animation */}
      {isMobileMenuOpen && (
        <div
          className={`
            lg:hidden fixed inset-0 z-40
            bg-black transition-all duration-300 ease-in-out
            ${isMobileMenuOpen ? 'bg-opacity-50' : 'bg-opacity-0'}
          `}
          onClick={handleMobileMenuToggle}
        />
      )}      
      
      {/* Sidebar Mobile/Tablet - Overlay jusqu'à lg avec largeur responsive */}
      <div className={`
        lg:hidden fixed inset-y-0 left-0 z-50 
        w-64 md:w-72
        bg-white border-r border-gray-200 shadow-2xl
        transform transition-all duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        flex flex-col
      `}>
        {/* Header mobile */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-primary-600">
          <Link to="/" className="flex items-center">
            <div className="flex flex-col items-center">
              <span className="text-secondary-400 text-lg">Biblio</span>
              <span className="text-white text-xl">ENSPD</span>
            </div>
          </Link>
          <button
            onClick={handleMobileMenuToggle}
            className="p-2 rounded-lg text-neutral-500 hover:bg-primary-700 transition-colors"
            aria-label="Fermer le menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profil utilisateur mobile */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-400 to-secondary-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">
                {mockUser?.firstName?.[0]}{mockUser?.lastName?.[0]}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {mockUser?.firstName} {mockUser?.lastName}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {mockUser?.userType === 'student' ? 'Étudiant' :
                  mockUser?.userType === 'teacher' ? 'Enseignant' :
                    mockUser?.userType === 'librarian' ? 'Bibliothécaire' : 'Administrateur'}
              </p>
            </div>
          </div>

          {/* Sélecteur de rôle mobile */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Simuler le rôle :
            </label>
            <select
              value={userType}
              onChange={(e) => handleUserTypeChange(e.target.value)}
              className="w-full text-xs bg-gray-50 border border-gray-200 rounded-md px-2 py-1 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="student">👨‍🎓 Étudiant</option>
              <option value="teacher">👨‍🏫 Enseignant</option>
              <option value="librarian">📚 Bibliothécaire</option>
              <option value="administrator">🛡️ Administrateur</option>
            </select>
          </div>
        </div>        {/* Navigation mobile avec scrollbar personnalisée */}
        <nav className="flex-1 p-4 overflow-y-auto sidebar-nav">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={item.path} style={{ animationDelay: `${index * 0.1}s` }}>
                <NavLink
                  to={item.path}
                  onClick={handleMenuItemClick}
                  className={({ isActive }) =>
                    `nav-item flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${isActive
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700'
                    }`
                  }
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                  {item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full badge-bounce">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer mobile */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => {
              handleMenuItemClick();
              window.location.href = '/';
            }}
            className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 w-full"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="font-medium">Retour à l'accueil</span>
          </button>
          <div className="mt-3 text-xs text-gray-500 text-center">
            Version 1.0.0
          </div>        </div>
      </div>

      {/* Sidebar Tablet - visible de md à lg (768px à 1024px) */}
      <div className={`
        hidden md:flex lg:hidden
        w-16 fixed left-0 top-0 h-screen z-50
        bg-white border-r border-gray-200 shadow-lg shadow-gray-300/50
        transition-all duration-300 ease-in-out
        flex-col
      `}>
        {/* En-tête tablet avec logo compact */}
        <div className="flex flex-col py-4 justify-start items-center border-b border-gray-200 bg-primary-600">
          <Link
            to="/"
            className="font-semibold flex items-center group transform hover:scale-105 transition-all duration-300 justify-center py-2"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-secondary-600 rounded-lg group-hover:bg-white transition-colors duration-300">
              <span className="text-white text-lg font-bold group-hover:text-secondary-600 transition-colors duration-300">
                B
              </span>
            </div>
          </Link>
        </div>        {/* Navigation tablet - icônes seulement avec animations */}
        <nav className="flex-1 p-2 overflow-y-auto sidebar-nav">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={item.path} style={{ animationDelay: `${index * 0.05}s` }}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-item flex items-center justify-center p-3 rounded-lg transition-all duration-200 group relative sidebar-focus ${isActive
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700'
                    }`
                  }
                  title={item.name}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center badge-bounce">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer tablet */}
        <div className="p-2 border-t border-gray-200">
          <button
            onClick={() => {
              window.location.href = '/';
            }}
            className="flex items-center justify-center p-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 w-full"
            title="Retour à l'accueil"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>

      {/* Sidebar Desktop - visible à partir de lg */}
      <div className={`
        hidden lg:flex
        ${isCollapsed ? 'w-18' : 'w-64'} 
        fixed left-0 top-0 h-screen z-50
        bg-white border-r border-gray-200 shadow-lg shadow-gray-300/50
        transition-all duration-300 ease-in-out
        flex-col
      `}>
        {/* En-tête de la sidebar avec logo desktop */}
        <div className={`flex ${isCollapsed ? 'flex-col py-4 justify-start' : 'flex-row p-4 justify-between'} items-center border-b border-gray-200 bg-primary-600`}>
          {/* Logo adaptatif */}
          <Link
            to="/"
            className={`font-semibold flex items-center group transform hover:scale-105 transition-all duration-300 
                       ${isCollapsed ? 'justify-center py-4' : ''}`}
          >
            <div className={`transition-all duration-300 ${isCollapsed ? 'transform scale-90' : ''}`}>
              {!isCollapsed ? (
                <div className="flex gap-1 items-center">
                  <span className="text-secondary-400 text-lg group-hover:text-white transition-colors duration-300">
                    Biblio
                  </span>
                  <span className="text-white text-xl group-hover:text-secondary-400 transition-colors duration-300">
                    ENSPD
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-center w-10 h-10 bg-secondary-600 rounded-lg group-hover:bg-white transition-colors duration-300">
                  <span className="text-white text-lg font-bold group-hover:text-secondary-600 transition-colors duration-300">
                    B
                  </span>
                </div>
              )}
            </div>
          </Link>

          {/* Bouton toggle sidebar desktop */}
          {!isCollapsed && (
            <button
              onClick={handleToggle}
              className="p-2 rounded-lg text-white hover:bg-primary-700 transition-all duration-300"
              aria-label="Réduire le menu"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Bouton d'expansion pour sidebar collapsée */}
        {isCollapsed && (
          <button
            onClick={handleToggle}
            className="absolute -right-3 top-20 p-1.5 bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg transition-all duration-300 z-20"
            aria-label="Agrandir le menu"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        )}

        {/* Profil utilisateur desktop */}
        {!isCollapsed && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-400 to-secondary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {mockUser?.firstName?.[0]}{mockUser?.lastName?.[0]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {mockUser?.firstName} {mockUser?.lastName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {mockUser?.userType === 'student' ? 'Étudiant' :
                    mockUser?.userType === 'teacher' ? 'Enseignant' :
                      mockUser?.userType === 'librarian' ? 'Bibliothécaire' : 'Administrateur'}
                </p>
              </div>
            </div>

            {/* Sélecteur de rôle desktop */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Simuler le rôle :
              </label>
              <select
                value={userType}
                onChange={(e) => handleUserTypeChange(e.target.value)}
                className="w-full text-xs bg-gray-50 border border-gray-200 rounded-md px-2 py-1 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="student">👨‍🎓 Étudiant</option>
                <option value="teacher">👨‍🏫 Enseignant</option>
                <option value="librarian">📚 Bibliothécaire</option>
                <option value="administrator">🛡️ Administrateur</option>
              </select>
            </div>
          </div>
        )}        {/* Navigation desktop avec animations */}
        <nav className="flex-1 p-4 overflow-y-auto sidebar-nav">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={item.path} style={{ animationDelay: `${index * 0.1}s` }}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-item flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group sidebar-focus ${isActive
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700'
                    }`
                  }
                  title={isCollapsed ? item.name : ''}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!isCollapsed && (
                    <>
                      <span className="font-medium">{item.name}</span>
                      {item.badge && (
                        <span className="ml-auto bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full badge-bounce">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                  {isCollapsed && item.badge && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center badge-bounce">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer desktop */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => {
              window.location.href = '/';
            }}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 w-full ${isCollapsed ? 'justify-center' : ''
              }`}
            title={isCollapsed ? 'Retour à l\'accueil' : ''}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {!isCollapsed && <span className="font-medium">Retour à l'accueil</span>}
          </button>

          {!isCollapsed && (
            <div className="mt-3 text-xs text-gray-500 text-center">
              Version 1.0.0
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
