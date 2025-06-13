import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AppContext';
import { ResponsiveContainer } from '../common/ResponsiveComponents';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActiveMenu('home');
    else if (path.startsWith('/catalog')) setActiveMenu('catalog');
    else if (path.startsWith('/contact')) setActiveMenu('contact');
    // else if (path.startsWith('/dashboard/loans')) setActiveMenu('loans');
    // else if (path.startsWith('/dashboard/reservations')) setActiveMenu('reservations');
    else if (path.startsWith('/dashboard/profile')) setActiveMenu('profile');
    else if (path.startsWith('/login')) setActiveMenu('login');
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showMobileMenu]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowMobileMenu(false);
    setShowDropdown(false);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  // Améliorations responsive pour les liens de navigation
  const navLinkStyle = (isActive) => `
    text-xs sm:text-sm md:text-sm lg:text-base xl:text-base 
    py-2 px-2 sm:px-2 md:px-3 lg:px-4 xl:px-4 
    font-medium relative group
    ${isActive ? 'text-secondary-400' : 'text-white hover:text-secondary-400'} 
    transition-all duration-300 hover:bg-primary-500 hover:bg-opacity-50 rounded-md
    transform hover:scale-105 active:scale-95
  `;

  const activeUnderline = (
    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary-400 transform origin-left animate-growFromLeft rounded-full" />
  );

  return (
    <header
      className={`${isScrolled
        ? 'bg-primary-700 shadow-lg backdrop-blur-md'
        : 'bg-primary-600'
        } text-white fixed top-0 left-0 right-0 z-50 transition-all duration-300 light-mode-only`}
    >
      <ResponsiveContainer>
        <div className="py-2 xs:py-2 sm:py-3 md:py-3 lg:py-4 flex justify-between items-center">
          {/* Logo et navigation principale */}
          <div className="flex items-center flex-1 min-w-0">
            {/* Logo amélioré avec responsive */}
            <Link to="/" className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-2xl font-semibold flex items-center group shrink-0 transform hover:scale-105 transition-transform duration-300">
              <span className="text-secondary-400 mr-1 group-hover:text-white transition-colors duration-300">Biblio</span>
              <span className="text-white group-hover:text-secondary-400 transition-colors duration-300">ENSPD</span>
            </Link>

            {/* Navigation principale - améliorée pour responsive */}
            <nav className="hidden md:flex items-center ml-2 sm:ml-4 md:ml-6 lg:ml-8 xl:ml-10 space-x-0.5 sm:space-x-1 md:space-x-1 lg:space-x-2 xl:space-x-2">
              <Link
                to="/"
                className={navLinkStyle(activeMenu === 'home')}
              >
                <span className="hidden lg:inline">Accueil</span>
                {activeMenu === 'home' && activeUnderline}
              </Link>
              <Link
                to="/catalog"
                className={navLinkStyle(activeMenu === 'catalog')}
              >
                <span className="hidden lg:inline">Catalogue</span>
                {activeMenu === 'catalog' && activeUnderline}
              </Link>
              <Link
                to="/contact"
                className={navLinkStyle(activeMenu === 'contact')}
              >
                <span className="hidden lg:inline">Contact</span>
                {activeMenu === 'contact' && activeUnderline}
              </Link>
            </nav>
          </div>
          {/* Section utilisateur et bouton mobile - améliorée pour responsive */}
          <div className="flex items-center shrink-0 space-x-1 sm:space-x-2 md:space-x-3">
            {isAuthenticated ? (
              <div className="relative hidden md:block md:border-l md:border-primary-400 md:pl-2 lg:pl-3 xl:pl-4 group-hover:text-neutral-50" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-1 text-xs sm:text-sm py-1 px-1 sm:px-2 hover:bg-primary-500 rounded-md transition-all duration-300 transform hover:scale-105"
                  aria-expanded={showDropdown}
                  aria-haspopup="true"
                  aria-label="Menu utilisateur"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-secondary-400 mr-0.5 sm:mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <div className="flex items-center space-x-2 text-white">
                    <div className="w-8 h-8 bg-secondary-500 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {user?.firstName?.charAt(0) || "U"}
                      </span>
                    </div>
                    <span className="text-sm font-medium truncate max-w-[100px] text-neutral-400">
                      {user?.firstName || "Utilisateur"}
                    </span>
                    <svg className="w-4 h-4 text-white transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" className='text-neutral-400' />
                    </svg>
                  </div>
                </button>
                {showDropdown && (
                  <div
                    className="absolute right-0 mt-2 w-40 sm:w-44 md:w-48 lg:w-52 bg-primary-700 shadow-xl py-1 z-10 rounded-md border border-primary-400 animate-fade-in-down backdrop-blur-sm"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <Link
                      to="/dashboard/profile"
                      className="block px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm text-white hover:bg-primary-600 hover:text-secondary-400 transition-all duration-200 transform hover:translate-x-1"
                      onClick={() => setShowDropdown(false)}
                      role="menuitem"
                    >
                      Mon Profil
                    </Link>

                    {/* Liens basés sur le rôle de l'utilisateur */}
                    {(user?.role === 'admin' || user?.role === 'administrator') && (
                      <>
                        <hr className="border-primary-500 my-1" />
                        <Link
                          to="/dashboard/administrator"
                          className="block px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm text-white hover:bg-primary-600 hover:text-secondary-400 transition-all duration-200 transform hover:translate-x-1"
                          onClick={() => setShowDropdown(false)}
                          role="menuitem"
                        >
                          Dashboard
                        </Link>
                        <Link
                          to="/dashboard/user-management"
                          className="block px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm text-white hover:bg-primary-600 hover:text-secondary-400 transition-all duration-200 transform hover:translate-x-1"
                          onClick={() => setShowDropdown(false)}
                          role="menuitem"
                        >
                          Gestion Utilisateurs
                        </Link>                        <Link
                          to="/dashboard/permissions"
                          className="block px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm text-white hover:bg-primary-600 hover:text-secondary-400 transition-all duration-200 transform hover:translate-x-1"
                          onClick={() => setShowDropdown(false)}
                          role="menuitem"
                        >
                          Droits d'Accès
                        </Link>
                        <Link
                          to="/dashboard/system-config"
                          className="block px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm text-white hover:bg-primary-600 hover:text-secondary-400 transition-all duration-200 transform hover:translate-x-1"
                          onClick={() => setShowDropdown(false)}
                          role="menuitem"
                        >
                          Configuration
                        </Link>
                        <Link
                          to="/dashboard/system-reports"
                          className="block px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm text-white hover:bg-primary-600 hover:text-secondary-400 transition-all duration-200 transform hover:translate-x-1"
                          onClick={() => setShowDropdown(false)}
                          role="menuitem"
                        >
                          Rapports
                        </Link>
                        <Link
                          to="/dashboard/backups"
                          className="block px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm text-white hover:bg-primary-600 hover:text-secondary-400 transition-all duration-200 transform hover:translate-x-1"
                          onClick={() => setShowDropdown(false)}
                          role="menuitem"
                        >
                          Sauvegardes
                        </Link>
                      </>
                    )}

                    {user?.role === 'librarian' && (
                      <>
                        <hr className="border-primary-500 my-1" />
                        <Link
                          to="/dashboard/librarian"
                          className="block px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm text-white hover:bg-primary-600 hover:text-secondary-400 transition-all duration-200 transform hover:translate-x-1"
                          onClick={() => setShowDropdown(false)}
                          role="menuitem"
                        >
                          Dashboard
                        </Link>
                        <Link
                          to="/dashboard/catalog-management"
                          className="block px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm text-white hover:bg-primary-600 hover:text-secondary-400 transition-all duration-200 transform hover:translate-x-1"
                          onClick={() => setShowDropdown(false)}
                          role="menuitem"
                        >
                          Gestion Catalogue
                        </Link>
                        <Link
                          to="/dashboard/loans-management"
                          className="block px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm text-white hover:bg-primary-600 hover:text-secondary-400 transition-all duration-200 transform hover:translate-x-1"
                          onClick={() => setShowDropdown(false)}
                          role="menuitem"
                        >
                          Gestion Prêts
                        </Link>
                        <Link
                          to="/dashboard/fines-management"
                          className="block px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm text-white hover:bg-primary-600 hover:text-secondary-400 transition-all duration-200 transform hover:translate-x-1"
                          onClick={() => setShowDropdown(false)}
                          role="menuitem"
                        >
                          Gestion Amendes
                        </Link>
                      </>
                    )}

                    {(user?.userType === 'student' || user?.userType === 'teacher') && (
                      <>
                        <hr className="border-primary-500 my-1" />
                        <Link
                          to="/dashboard/loans"
                          className="block px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm text-white hover:bg-primary-600 hover:text-secondary-400 transition-all duration-200 transform hover:translate-x-1"
                          onClick={() => setShowDropdown(false)}
                          role="menuitem"
                        >
                          Mes Emprunts
                        </Link>
                        <Link
                          to="/dashboard/reservations"
                          className="block px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm text-white hover:bg-primary-600 hover:text-secondary-400 transition-all duration-200 transform hover:translate-x-1"
                          onClick={() => setShowDropdown(false)}
                          role="menuitem"
                        >
                          Mes Réservations
                        </Link>
                        <Link
                          to="/dashboard/favorites"
                          className="block px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm text-white hover:bg-primary-600 hover:text-secondary-400 transition-all duration-200 transform hover:translate-x-1"
                          onClick={() => setShowDropdown(false)}
                          role="menuitem"
                        >
                          Mes Favoris
                        </Link>
                      </>
                    )}

                    {user?.userType === 'teacher' && (
                      <>
                        <Link
                          to="/dashboard/recommendations"
                          className="block px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm text-white hover:bg-primary-600 hover:text-secondary-400 transition-all duration-200 transform hover:translate-x-1"
                          onClick={() => setShowDropdown(false)}
                          role="menuitem"
                        >
                          Mes Recommandations
                        </Link>
                        <Link
                          to="/dashboard/acquisitions"
                          className="block px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm text-white hover:bg-primary-600 hover:text-secondary-400 transition-all duration-200 transform hover:translate-x-1"
                          onClick={() => setShowDropdown(false)}
                          role="menuitem"
                        >
                          Mes Acquisitions
                        </Link>
                      </>
                    )}

                    <hr className="border-primary-500 my-1" />

                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        handleLogout();
                      }}
                      className="block w-full text-left px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm text-secondary-300 hover:bg-primary-600 hover:text-secondary-400 transition-all duration-200 transform hover:translate-x-1"
                      role="menuitem"
                    >
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex md:border-l md:border-primary-400 md:pl-2 lg:pl-3 xl:pl-4 items-center space-x-1 sm:space-x-2 lg:space-x-3">
                <Link
                  to="/register"
                  className="text-white hover:text-secondary-400 text-xs sm:text-sm transition-all duration-200 transform hover:scale-105"
                >
                  S'inscrire
                </Link>
                <Link
                  to="/login"
                  className="bg-secondary-500 hover:bg-secondary-600 text-white px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                >
                  <span className="md:hidden lg:inline">Se connecter</span>
                  <span className="hidden md:inline lg:hidden">Connexion</span>
                </Link>
              </div>
            )}
            {/* Bouton menu mobile simple */}
            <button
              className="md:hidden ml-2 flex items-center justify-center w-10 h-10 rounded-lg bg-primary-600 hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:ring-opacity-50 transition-colors duration-200"
              onClick={toggleMobileMenu}
              aria-label={showMobileMenu ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={showMobileMenu}
              aria-controls="mobile-menu"
            >
              {/* Icône hamburger simple */}
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`block w-5 h-0.5 bg-white rounded-sm transition-all duration-300 ${showMobileMenu ? 'rotate-45 translate-y-1.5' : ''
                    }`}
                />
                <span
                  className={`block w-5 h-0.5 bg-white rounded-sm mt-1 transition-all duration-300 ${showMobileMenu ? 'opacity-0' : 'opacity-100'
                    }`}
                />
                <span
                  className={`block w-5 h-0.5 bg-white rounded-sm mt-1 transition-all duration-300 ${showMobileMenu ? '-rotate-45 -translate-y-1.5' : ''
                    }`}
                />
              </div>
            </button>
          </div>
        </div>
      </ResponsiveContainer>

      {/* Menu mobile avec overlay amélioré et animation fluide */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-10 md:hidden ${showMobileMenu
          ? 'opacity-50'
          : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setShowMobileMenu(false)}
        aria-hidden="true"
      />

      <div
        id="mobile-menu"
        className={`absolute top-full left-0 right-0 md:hidden bg-primary-700 border-t border-primary-500 shadow-xl z-20 transform transition-all duration-300 ease-in-out origin-top backdrop-blur-md ${showMobileMenu
          ? 'scale-y-100 opacity-100'
          : 'scale-y-95 opacity-0 pointer-events-none'
          }`}
        role="menu"
        aria-labelledby="menu-button"
      >        <nav className="px-3 xs:px-4 sm:px-4 py-2 divide-y divide-primary-500 max-h-[calc(100vh-4rem)] overflow-y-auto">
          {/* Navigation mobile - liens améliorés */}
          <Link
            to="/"
            className={`block text-sm xs:text-base py-3 px-2 font-medium transition-all duration-200 transform hover:translate-x-2 ${activeMenu === 'home'
              ? 'text-secondary-400 bg-primary-600 border-l-4 border-secondary-400'
              : 'text-white hover:bg-primary-600 hover:text-secondary-400'
              }`}
            onClick={() => setShowMobileMenu(false)}
          >
            Accueil
          </Link>

          <Link
            to="/catalog"
            className={`block text-sm xs:text-base py-3 px-2 font-medium transition-all duration-200 transform hover:translate-x-2 ${activeMenu === 'catalog'
              ? 'text-secondary-400 bg-primary-600 border-l-4 border-secondary-400'
              : 'text-white hover:bg-primary-600 hover:text-secondary-400'
              }`}
            onClick={() => setShowMobileMenu(false)}
          >
            Catalogue
          </Link>

          <Link
            to="/contact"
            className={`block text-sm xs:text-base py-3 px-2 font-medium transition-all duration-200 transform hover:translate-x-2 ${activeMenu === 'contact'
              ? 'text-secondary-400 bg-primary-600 border-l-4 border-secondary-400'
              : 'text-white hover:bg-primary-600 hover:text-secondary-400'
              }`}
            onClick={() => setShowMobileMenu(false)}
          >
            Contact
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard/profile"
                className={`block text-sm xs:text-base py-3 px-2 font-medium transition-all duration-200 transform hover:translate-x-2 ${activeMenu === 'profile'
                  ? 'text-secondary-400 bg-primary-600 border-l-4 border-secondary-400'
                  : 'text-white hover:bg-primary-600 hover:text-secondary-400'
                  }`}
                onClick={() => setShowMobileMenu(false)}
              >
                Mon Profil
              </Link>

              <button
                onClick={handleLogout}
                className="block w-full text-left text-sm xs:text-base py-3 px-2 font-medium text-secondary-300 hover:bg-primary-600 hover:text-secondary-400 transition-all duration-200 transform hover:translate-x-2"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="block text-sm xs:text-base py-3 px-2 font-medium text-white hover:bg-primary-600 hover:text-secondary-400 transition-all duration-200 transform hover:translate-x-2"
                onClick={() => setShowMobileMenu(false)}
              >
                S'inscrire
              </Link>

              <Link
                to="/login"
                className="block text-sm xs:text-base py-3 px-2 font-medium text-secondary-400 hover:bg-primary-600 hover:text-secondary-500 transition-all duration-200 transform hover:translate-x-2"
                onClick={() => setShowMobileMenu(false)}
              >
                Se connecter
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;